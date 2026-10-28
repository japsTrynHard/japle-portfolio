export interface VisitorCounts {
  online: number
  total: number
}
interface Snapshot {
  counts: VisitorCounts
  at: number
}
export const visitorCacheKey = 'japle-visitor-stats-v2'
export function validCounts(value: unknown): value is VisitorCounts {
  if (!value || typeof value !== 'object') return false
  const data = value as VisitorCounts
  return [data.online, data.total].every((n) => Number.isSafeInteger(n) && n >= 0)
}
export function cachedVisitorStats(): Snapshot | null {
  try {
    const value = JSON.parse(localStorage.getItem(visitorCacheKey) || 'null')
    if (!value || !validCounts(value.counts) || !Number.isFinite(value.at)) return null
    const age = Date.now() - value.at
    return age >= 0 && age < 75000 ? value : null
  } catch {
    return null
  }
}

export async function refreshVisitorStats(signal: AbortSignal): Promise<VisitorCounts> {
  const refresh = async () => {
    signal.throwIfAborted()
    const cached = cachedVisitorStats()
    // Share a recent heartbeat across tabs and reloads, including initial cookie creation.
    if (cached && Date.now() - cached.at < 25000) return cached.counts
    const send = () =>
      fetch('/api/visitors', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      })
    let response = await send()
    if (response.status === 202) response = await send()
    if (!response.ok || response.status === 204 || response.status === 202)
      throw new Error('Stats unavailable')
    const data: unknown = await response.json()
    if (!validCounts(data)) throw new Error('Invalid visitor counts')
    try {
      localStorage.setItem(visitorCacheKey, JSON.stringify({ counts: data, at: Date.now() }))
    } catch {
      /* Cookies still deduplicate visits when storage is disabled. */
    }
    return data
  }
  return navigator.locks
    ? navigator.locks.request('japle-visitor-heartbeat', { signal }, refresh)
    : refresh()
}
