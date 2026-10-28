import { chromium, expect } from '@playwright/test'
const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 948 } })
  await page.goto('http://127.0.0.1:5173/')
  await expect(page.locator('.hero-visual')).toHaveCSS('opacity', '1')
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'artifacts/revision-home-1920.png' })
  await page.locator('#about').scrollIntoViewIfNeeded()
  await expect(page.locator('.about-copy p').first()).toBeVisible()
  await expect(page.locator('.about-copy>div')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'artifacts/revision-about-1920.png' })
  await page.goto('http://127.0.0.1:5173/work/promptwise')
  await page.locator('.project-gallery').scrollIntoViewIfNeeded()
  await expect(page.locator('.project-gallery .gallery-slide:not([inert]) img')).toHaveJSProperty(
    'complete',
    true,
  )
  await expect(page.locator('.project-gallery').locator('..')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'artifacts/revision-gallery-1920.png' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://127.0.0.1:5173/')
  await expect(page.locator('.hero-visual')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'artifacts/revision-home-mobile.png' })
  await page.locator('#about').scrollIntoViewIfNeeded()
  await expect(page.locator('.about-copy>div')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'artifacts/revision-about-mobile.png' })
  await page.goto('http://127.0.0.1:5173/work/carmelink')
  await page.locator('.project-gallery').scrollIntoViewIfNeeded()
  await expect(page.locator('.project-gallery').locator('..')).toHaveCSS('opacity', '1')
  await expect(page.locator('.case-gallery-heading').locator('..')).toHaveCSS('opacity', '1')
  await expect(page.locator('.project-gallery .gallery-slide:not([inert]) img')).toHaveJSProperty(
    'complete',
    true,
  )
  await page.screenshot({ path: 'artifacts/revision-gallery-mobile.png' })
} finally {
  await browser.close()
}
