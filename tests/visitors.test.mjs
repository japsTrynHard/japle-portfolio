import { test, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/visitors.mjs'

const originalFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = originalFetch
  delete process.env.KV_REST_API_URL
  delete process.env.KV_REST_API_TOKEN
})
function response() {
  return {
    headers: {},
    code: 200,
    body: null,
    setHeader(k, v) {
      this.headers[k] = v
    },
    status(n) {
      this.code = n
      return this
    },
    json(value) {
      this.body = value
      return this
    },
    end() {
      return this
    },
  }
}
const request = (headers = {}) => ({
  method: 'POST',
  headers: { host: 'portfolio.vercel.app', ...headers },
})

test('rejects cross-site writes and malformed origins before accessing storage', async () => {
  for (const origin of ['https://other.example', 'invalid']) {
    const res = response()
    await handler(request({ origin }), res)
    assert.equal(res.code, 403)
  }
})
test('missing storage and provider failures return no invented count', async () => {
  const unavailable = response()
  await handler(request(), unavailable)
  assert.equal(unavailable.code, 503)
  assert.equal(unavailable.body.total, undefined)
  process.env.KV_REST_API_URL = 'https://redis.example'
  process.env.KV_REST_API_TOKEN = 'test-only'
  globalThis.fetch = async () => {
    throw Error('offline')
  }
  const offline = response()
  await handler(request(), offline)
  assert.equal(offline.code, 503)
})
test('reuses the browser session across tabs and returns server counts with private cookie', async () => {
  process.env.KV_REST_API_URL = 'https://redis.example'
  process.env.KV_REST_API_TOKEN = 'test-only'
  const session = 'f470f10a-8a1b-48bb-bcad-b609a2e26a37'
  let command
  globalThis.fetch = async (_url, options) => {
    command = JSON.parse(options.body)
    return { ok: true, json: async () => ({ result: ['67', 1] }) }
  }
  const res = response()
  await handler(request({ cookie: `portfolio_session=${session}` }), res)
  assert.deepEqual(res.body, { total: 67, online: 1 })
  assert.equal(command[3], `japle:visit:${session}`)
  assert.match(res.headers['Set-Cookie'], /HttpOnly; Secure; SameSite=Lax/)
  assert.equal(res.headers['Cache-Control'], 'no-store')
})
test('bots and GET requests do not add visits', async () => {
  const bot = response()
  await handler(request({ 'user-agent': 'Googlebot' }), bot)
  assert.equal(bot.code, 204)
  const get = response()
  await handler({ ...request(), method: 'GET' }, get)
  assert.equal(get.code, 405)
})
