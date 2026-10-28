import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface Counts {
  online: number
  total: number
}

export function VisitorStats() {
  const [counts, setCounts] = useState<Counts | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let stopped = false
    let active = false
    const controller = new AbortController()
    const refresh = async () => {
      if (stopped || active || document.hidden) return
      active = true
      let success = false
      try {
        const response = await fetch('/api/visitors', { method: 'POST', signal: controller.signal })
        if (!response.ok || response.status === 204) throw new Error('Unavailable')
        const data: Counts = await response.json()
        if (![data.online, data.total].every((n) => Number.isSafeInteger(n) && n >= 0))
          throw new Error('Invalid counts')
        if (!stopped) {
          setCounts(data)
          setUnavailable(false)
        }
        success = true
      } catch {
        if (!stopped) setUnavailable(true)
      } finally {
        active = false
        if (!stopped) timer = setTimeout(refresh, success ? 30000 : 60000)
      }
    }
    const onVisibility = () => {
      clearTimeout(timer)
      if (!document.hidden) void refresh()
    }
    void refresh()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stopped = true
      controller.abort()
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])
  return (
    <div
      className="visitor-stats"
      aria-label="Portfolio visitor statistics"
      title="Updates every 30 seconds. Online means active in the last 75 seconds; visits are counted once per browsing session."
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
