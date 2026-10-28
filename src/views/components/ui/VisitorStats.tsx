import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import {
  cachedVisitorStats,
  refreshVisitorStats,
  visitorCacheKey,
} from '../../../services/visitorService'
import type { VisitorCounts } from '../../../services/visitorService'

export function VisitorStats() {
  const [counts, setCounts] = useState<VisitorCounts | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let failures = 0
    let stopped = false
    let active = false
    const controller = new AbortController()
    const refresh = async () => {
      if (stopped || active || document.hidden) return
      if (!navigator.onLine) {
        setUnavailable(true)
        return
      }
      active = true
      let success = false
      try {
        const data = await refreshVisitorStats(controller.signal)
        if (!stopped) {
          setCounts(data)
          setUnavailable(false)
        }
        failures = 0
        success = true
      } catch {
        if (!stopped) {
          failures += 1
          setUnavailable(true)
        }
      } finally {
        active = false
        if (!stopped)
          timer = setTimeout(
            refresh,
            success ? 30000 : Math.min(300000, 30000 * 2 ** Math.min(failures, 4)),
          )
      }
    }
    const onVisibility = () => {
      clearTimeout(timer)
      if (!document.hidden && navigator.onLine) void refresh()
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== visitorCacheKey) return
      const snapshot = cachedVisitorStats()
      if (snapshot && navigator.onLine) {
        setCounts(snapshot.counts)
        setUnavailable(false)
      }
    }
    const onOffline = () => {
      clearTimeout(timer)
      setUnavailable(true)
    }
    timer = setTimeout(refresh, 0)
    window.addEventListener('storage', onStorage)
    window.addEventListener('online', onVisibility)
    window.addEventListener('offline', onOffline)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stopped = true
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('online', onVisibility)
      window.removeEventListener('offline', onOffline)
      controller.abort()
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])
  return (
    <div
      className="visitor-stats"
      aria-label="Portfolio visitor statistics"
      title="Updates every 30 seconds. Online means a visible browser in the last 75 seconds. Tabs and reloads share one visit; a new visit starts after 30 minutes away."
    >
      {unavailable ? (
        <span className="visitor-unavailable">Visitor stats temporarily unavailable</span>
      ) : counts ? (
        <>
          <span className="visitor-online-dot" aria-hidden="true" />
          <span>
            <strong>{counts.online.toLocaleString()}</strong> online now
          </span>
          <span aria-hidden="true">·</span>
          <Eye size={14} aria-hidden="true" />
          <span>
            <strong>{counts.total.toLocaleString()}</strong> total visits
          </span>
        </>
      ) : (
        <span className="visitor-unavailable">Loading visitor stats…</span>
      )}
    </div>
  )
}
