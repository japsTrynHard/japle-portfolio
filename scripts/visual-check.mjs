import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  })
  await page.goto('http://127.0.0.1:5173/')
  await page.evaluate(() => document.fonts.ready)
  for (const id of ['featured', 'projects', 'technologies', 'about', 'resume', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    if (id === 'technologies')
      await page.waitForFunction(() =>
        [...document.querySelectorAll('.technology-badge')].every(
          (element) => Number(getComputedStyle(element).opacity) >= 0.99,
        ),
      )
    await page.locator(`#${id}`).screenshot({ path: `artifacts/section-${id}.png` })
  }
  await page.goto('http://127.0.0.1:5173/work/promptwise')
  await page.locator('.project-gallery').scrollIntoViewIfNeeded()
  await page.locator('.project-gallery').screenshot({ path: 'artifacts/project-gallery.png' })
  await page.goto('http://127.0.0.1:5173/images/social-preview.svg')
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.screenshot({ path: 'public/images/social-preview.png' })
  console.log('Visual QA screenshots saved in artifacts/. Social preview PNG generated.')
} finally {
  await browser.close()
}
