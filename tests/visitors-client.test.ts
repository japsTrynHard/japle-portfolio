import { afterEach, expect, test, vi } from 'vitest'
import {
  cachedVisitorStats,
  refreshVisitorStats,
  visitorCacheKey,
} from '../src/services/visitorService'

afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})
test('concurrent first tabs share one heartbeat and cookie initialization', async () => {
  let queue = Promise.resolve()
  vi.stubGlobal('navigator', {
    locks: {
      request: (_name: string, _options: unknown, task: () => Promise<unknown>) => {
        const result = queue.then(task)
        queue = result.then(() => undefined)
        return result
      },
    },
  })
  const fetchMock = vi
    .fn()
    .mockResolvedValue({ ok: true, status: 200, json: async () => ({ online: 1, total: 9 }) })
  vi.stubGlobal('fetch', fetchMock)
  const results = await Promise.all(
    Array.from({ length: 8 }, () => refreshVisitorStats(new AbortController().signal)),
  )
  expect(fetchMock).toHaveBeenCalledTimes(1)
  expect(results).toEqual(Array(8).fill({ online: 1, total: 9 }))
})
test('expired, future and malformed snapshots cannot masquerade as live counts', () => {
  for (const value of [
    { at: Date.now() - 76000, counts: { online: 1, total: 9 } },
    { at: Date.now() + 10000, counts: { online: 1, total: 9 } },
    { at: Date.now(), counts: { online: -1, total: 9 } },
    { at: Date.now(), counts: { online: '1', total: 9 } },
  ]) {
    localStorage.setItem(visitorCacheKey, JSON.stringify(value))
    expect(cachedVisitorStats()).toBeNull()
  }
})
test('storage-disabled browsers can fetch and failures never save invented counts', async () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw Error('disabled')
  })
  vi.stubGlobal(
    'fetch',
    vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200, json: async () => ({ online: 2, total: 9 }) }),
  )
  expect(await refreshVisitorStats(new AbortController().signal)).toEqual({ online: 2, total: 9 })
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }))
  await expect(refreshVisitorStats(new AbortController().signal)).rejects.toThrow(
    'Stats unavailable',
  )
  expect(cachedVisitorStats()).toBeNull()
})

test('confirms a cookie once and stops when cookies are blocked', async () => {
  const mock = vi
    .fn()
    .mockResolvedValueOnce({ ok: true, status: 202 })
    .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ online: 1, total: 10 }) })
  vi.stubGlobal('fetch', mock)
  expect(await refreshVisitorStats(new AbortController().signal)).toEqual({ online: 1, total: 10 })
  expect(mock).toHaveBeenCalledTimes(2)
  localStorage.clear()
  mock.mockReset().mockResolvedValue({ ok: true, status: 202 })
  await expect(refreshVisitorStats(new AbortController().signal)).rejects.toThrow(
    'Stats unavailable',
  )
  expect(mock).toHaveBeenCalledTimes(2)
})
