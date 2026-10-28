import { randomUUID } from 'node:crypto'

// One atomic Redis operation: count a visit once per 30-minute session,
// refresh presence, and remove visitors whose heartbeat expired.
export const presenceScript = `
local fresh = redis.call('SET', KEYS[1], '1', 'NX', 'EX', 1800)
if fresh then redis.call('INCR', KEYS[2]) end
redis.call('EXPIRE', KEYS[1], 1800)
redis.call('ZREMRANGEBYSCORE', KEYS[3], '-inf', ARGV[1] - 75000)
redis.call('ZADD', KEYS[3], ARGV[1], ARGV[2])
return {redis.call('GET', KEYS[2]) or '0', redis.call('ZCARD', KEYS[3])}
`

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const origin = req.headers.origin
  let originHost
  try {
    originHost = origin ? new URL(origin).host : null
  } catch {
    return res.status(403).json({ error: 'Origin not allowed' })
  }
  if (
    req.headers['sec-fetch-site'] === 'cross-site' ||
    (origin && originHost !== req.headers.host)
  ) {
    return res.status(403).json({ error: 'Origin not allowed' })
  }
  if (/bot|crawler|spider|headless|preview/i.test(req.headers['user-agent'] || '')) {
    return res.status(204).end()
  }
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return res.status(503).json({ error: 'Visitor stats unavailable' })
  const existing = /(?:^|;\s*)portfolio_session=([a-f0-9-]{36})(?:;|$)/.exec(
    req.headers.cookie || '',
  )?.[1]
  const session = existing || randomUUID()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        'EVAL',
        presenceScript,
        '3',
        `japle:visit:${session}`,
        'japle:visits:total',
        'japle:visitors:online',
        Date.now().toString(),
        session,
      ]),
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) throw new Error('Stats request failed')
    const data = await response.json()
    if (data.error || !Array.isArray(data.result)) throw new Error('Invalid stats response')
    const [total, online] = data.result.map(Number)
    if (![total, online].every((n) => Number.isSafeInteger(n) && n >= 0))
      throw new Error('Invalid counts')
    res.setHeader(
      'Set-Cookie',
      `portfolio_session=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=1800`,
    )
    return res.status(200).json({ online, total })
  } catch {
    return res.status(503).json({ error: 'Visitor stats unavailable' })
  }
}
