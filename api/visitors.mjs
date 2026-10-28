import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'

const cookieName = '__Host-portfolio_visitor'
function sign(id, secret) {
  return createHmac('sha256', secret).update(`portfolio-visitor:${id}`).digest('base64url')
}
function visitorId(cookie, secret) {
  const value = cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1)
  if (!value) return null
  const [id, signature] = value.split('.')
  if (!/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(id) || !signature) return null
  const expected = Buffer.from(sign(id, secret))
  const supplied = Buffer.from(signature)
  return expected.length === supplied.length && timingSafeEqual(expected, supplied) ? id : null
}

// One atomic Redis operation: count a visit once per 30-minute session,
// refresh presence, and remove visitors whose heartbeat expired.
export const presenceScript = `
local clock = redis.call('TIME')
local now = tonumber(clock[1]) * 1000 + math.floor(tonumber(clock[2]) / 1000)
local fresh = redis.call('SET', KEYS[1], '1', 'NX', 'EX', 1800)
if fresh then redis.call('INCR', KEYS[2]) end
redis.call('EXPIRE', KEYS[1], 1800)
redis.call('ZREMRANGEBYSCORE', KEYS[3], '-inf', now - 75000)
redis.call('ZADD', KEYS[3], now, ARGV[1])
redis.call('EXPIRE', KEYS[3], 150)
return {redis.call('GET', KEYS[2]) or '0', redis.call('ZCARD', KEYS[3])}
`

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Vary', 'Cookie, Origin')
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
  if (
    /bot|crawler|spider|headless|preview|lighthouse|pagespeed|uptimerobot|pingdom/i.test(
      req.headers['user-agent'] || '',
    ) ||
    /prefetch|prerender/i.test(`${req.headers.purpose || ''} ${req.headers['sec-purpose'] || ''}`)
  ) {
    return res.status(204).end()
  }
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return res.status(503).json({ error: 'Visitor stats unavailable' })
  const secret = process.env.VISITOR_COOKIE_SECRET || token
  const existing = visitorId(req.headers.cookie || '', secret)
  const session = existing || randomUUID()
  const cookie = `${cookieName}=${session}.${sign(session, secret)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`
  // Count only after the browser confirms it can retain its signed identity.
  if (!existing) {
    res.setHeader('Set-Cookie', cookie)
    return res.status(202).json({ confirmCookie: true })
  }
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
    res.setHeader('Set-Cookie', cookie)
    return res.status(200).json({ online, total })
  } catch {
    return res.status(503).json({ error: 'Visitor stats unavailable' })
  }
}
