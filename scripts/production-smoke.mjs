import { chromium, expect } from '@playwright/test'
const origin = process.env.PORTFOLIO_PREVIEW_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const errors = []
  const consoleErrors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  const paths = [
    '/',
    '/work/carmelink',
    '/work/promptwise',
    '/work/autosched-ai',
    '/work/bayanihan-link',
    '/work/rodelconnect',
    '/work/map-explorer',
  ]
  for (const path of paths) {
    const response = await page.goto(`${origin}${path}`)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    if (path !== '/')
      expect(await page.locator('.project-gallery .gallery-slide').count()).toBeGreaterThan(1)
  }
  await page.goto(origin)
  await expect(page.locator('.hero-visual')).toHaveCSS('opacity', '1')
  await page.evaluate(() => document.fonts.ready)
  const frames = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const deltas = []
        let previous = 0
        function sample(time) {
          if (previous) deltas.push(time - previous)
          previous = time
          if (deltas.length < 120) requestAnimationFrame(sample)
          else
            resolve({
              fps: Math.round(
                1000 / (deltas.reduce((sum, value) => sum + value, 0) / deltas.length),
              ),
              framesOver33ms: deltas.filter((value) => value > 33.4).length,
              sampleFrames: deltas.length,
            })
        }
        requestAnimationFrame(sample)
      }),
  )
  expect(errors).toEqual([])
  expect(consoleErrors).toEqual([])
  console.log(
    JSON.stringify(
      {
        productionRoutes: paths.length,
        runtimeErrors: errors.length,
        consoleErrors: consoleErrors.length,
        heroAnimationSample: frames,
      },
      null,
      2,
    ),
  )
} finally {
  await browser.close()
}
