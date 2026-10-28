import { expect, test } from '@playwright/test'
import { mediaManifest } from '../../src/data/mediaManifest'
import type { ProjectId } from '../../src/models/Project'
const routes = [
  ['carmelink', 'CarmeLink'],
  ['promptwise', 'PromptWise'],
  ['autosched-ai', 'AutoSched AI'],
  ['bayanihan-link', 'Bayanihan Link'],
  ['rodelconnect', 'RodelConnect'],
  ['map-explorer', 'Map Explorer PH'],
]
test('homepage, real contact destinations, theme persistence, and visual baseline', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Japle Ligaya')
  await expect(page.locator('.hero-visual')).toHaveCSS('opacity', '1')
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'artifacts/home-desktop.png' })
  await expect(page.locator('.project-card')).toHaveCount(6)
  await expect(page.locator('.technology-badge')).toHaveCount(35)
  await expect(page.locator('.email-card')).toHaveAttribute('href', 'mailto:ligayajaple@gmail.com')
  await expect(page.locator('.contact-card').filter({ hasText: 'Facebook' })).toHaveAttribute(
    'href',
    'https://www.facebook.com/LgyJpl/',
  )
  await page.getByRole('switch', { name: 'Dark mode' }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('switch', { name: 'Dark mode' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('switch', { name: 'Dark mode' }).click()
  await expect(page.locator('.hero-visual')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'artifacts/home-light.png' })
  await page.evaluate(() => localStorage.setItem('japle-theme', 'system'))
  await page.reload()
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('switch', { name: 'Dark mode' })).toBeChecked()
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByRole('switch', { name: 'Dark mode' })).not.toBeChecked()
  expect(errors).toEqual([])
})
test('project filters, technology selection, expertise keyboard navigation, and real CVs', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Personal', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(3)
  await page.getByRole('button', { name: 'Collaboration', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(3)
  await page.getByRole('button', { name: /All projects/ }).click()
  await expect(page.locator('.project-card')).toHaveCount(6)
  await page.getByRole('button', { name: 'Languages', exact: true }).click()
  await expect(page.locator('.technology-badge')).toHaveCount(8)
  await page.getByRole('button', { name: 'Dart', exact: false }).click()
  await expect(
    page.getByRole('region', { name: 'Dart related projects' }).getByRole('link'),
  ).toHaveCount(4)
  await page.getByRole('button', { name: 'Python', exact: false }).click()
  await expect(
    page.getByRole('region', { name: 'Python related projects' }).getByRole('link'),
  ).toHaveCount(0)
  const tab = page.getByRole('tab', { name: /Full-stack development/ })
  await tab.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('tab', { name: /Mobile applications/ })).toBeFocused()
  await expect(page.getByRole('tabpanel')).toContainText('Develop Flutter')
  await page.getByRole('button', { name: /With Photo/ }).click()
  await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
    'href',
    '/resumes/japle-with-photo.pdf',
  )
  await expect(page.locator('.resume-document object')).toHaveAttribute(
    'data',
    /japle-with-photo.pdf/,
  )
  await page.getByRole('button', { name: 'Zoom in resume' }).click()
  await expect(page.locator('.resume-document object')).toHaveAttribute('data', /zoom=125/)
  await page.getByRole('button', { name: 'Fit resume to width' }).click()
  await expect(page.locator('.resume-document object')).toHaveAttribute('data', /view=FitH/)
  await page.getByRole('button', { name: /ATS-Friendly/ }).click()
  await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
    'href',
    '/resumes/japle-ats.pdf',
  )
  await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
    'download',
    'Japle_A_Ligaya_Resume_ATS.pdf',
  )
  await page.locator('#resume').screenshot({ path: 'artifacts/resume.png' })
})
test('all six case-study routes, galleries, and local demos render without runtime errors', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const [slug, name] of routes) {
    const response = await page.goto(`/work/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(name)
    await expect(page).toHaveTitle(`${name} — Japle Ligaya`)
    await expect(page.locator('.project-gallery .gallery-slide')).toHaveCount(
      mediaManifest[slug as ProjectId].items.length,
    )
    await page.locator('.demo-shell').scrollIntoViewIfNeeded()
    await expect(page.locator('.demo-content')).not.toHaveText('Opening the interactive preview…')
    await expect(page.locator('.demo-content button').first()).toBeVisible()
    if (slug === 'autosched-ai' || slug === 'bayanihan-link')
      await expect(page.locator('.case-links a').filter({ hasText: 'Source' })).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  expect(errors).toEqual([])
})
test('gallery navigation, fullscreen focus trap, keyboard controls, and browser history', async ({
  page,
}) => {
  await page.goto('/work/promptwise')
  const gallery = page.getByRole('region', { name: 'PromptWise media gallery' })
  await gallery.getByRole('button', { name: 'Next slide' }).click()
  await expect(gallery.locator('.gallery-count')).toHaveText(
    `02 / ${mediaManifest.promptwise.items.length}`,
  )
  await gallery.getByRole('button', { name: 'Open PromptWise media fullscreen' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close fullscreen' })).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(dialog).toContainText(`3 of ${mediaManifest.promptwise.items.length}`)
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Previous', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(
    gallery.getByRole('button', { name: 'Open PromptWise media fullscreen' }),
  ).toBeFocused()
  await page.locator('.case-back').click()
  await expect(page).toHaveURL('/#projects')
  await page.goBack()
  await expect(page).toHaveURL('/work/promptwise')
})
test('missing CV files keep the availability-aware fallback', async ({ page }) => {
  await page.route('**/resumes/*.pdf', (route) =>
    route.fulfill({ status: 404, contentType: 'text/plain', body: 'Not available' }),
  )
  await page.goto('/#resume')
  await expect(page.getByText('Resume file not yet available')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Download PDF' })).toBeDisabled()
})
test('larger default design, restrained ambient logos, and interactive cursor', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1000 })
  await page.goto('/')
  await expect(page.locator('html')).toHaveCSS('font-size', '20px')
  await expect(page.locator('.ambient-symbol')).toHaveCount(8)
  await page.locator('.project-card').first().hover()
  await expect(page.locator('.interactive-cursor')).toHaveClass(/cursor-view/)
  await expect(page.locator('.interactive-cursor')).toHaveCSS('pointer-events', 'none')
  await page.locator('.journey-section').scrollIntoViewIfNeeded()
  expect(
    await page.evaluate(
      () =>
        document.querySelector('.about-visual')!.getBoundingClientRect().bottom <=
        document.querySelector('#about')!.getBoundingClientRect().bottom + 1,
    ),
  ).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.interactive-cursor')).toHaveCount(0)
  await expect(page.locator('.ambient-symbol').first()).toHaveCSS('animation-name', 'none')
})
test('carousel autoplay pauses on hover, focus, outside viewport, and explicit pause', async ({
  page,
}) => {
  await page.goto('/')
  const gallery = page.getByRole('region', { name: 'Featured projects' })
  await gallery.scrollIntoViewIfNeeded()
  await page.mouse.move(1, 1)
  await expect(gallery.locator('.progress-running')).toHaveCount(1)
  await expect(gallery.locator('.gallery-count')).toHaveText('02 / 06', { timeout: 8000 })
  await gallery.hover()
  await expect(gallery.locator('.progress-running')).toHaveCount(0)
  await page.mouse.move(1, 1)
  await gallery.getByRole('button', { name: 'Pause slideshow' }).click()
  await expect(gallery.getByRole('button', { name: 'Play slideshow' })).toBeVisible()
  await expect(gallery.locator('.progress-running')).toHaveCount(0)
  await gallery.getByRole('button', { name: 'Play slideshow' }).click()
  await page.mouse.move(1, 1)
  await page.locator('.wordmark').first().focus()
  await expect(gallery.locator('.progress-running')).toHaveCount(1)
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await expect(gallery.locator('.progress-running')).toHaveCount(0)
})
test('responsive layouts, mobile navigation, touch swipe, and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [360, 390, 768, 1150, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (width === 1150)
      expect(
        await page
          .locator('.hero-line')
          .first()
          .evaluate(
            (node) =>
              node.getBoundingClientRect().height <
              parseFloat(getComputedStyle(node).fontSize) * 1.5,
          ),
      ).toBe(true)
    if (width === 390) await page.screenshot({ path: 'artifacts/home-mobile.png' })
    if (width === 768) await page.screenshot({ path: 'artifacts/home-tablet.png' })
    await expect(page.locator('.progress-running')).toHaveCount(0)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('navigation').getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(page).toHaveURL('/#projects')
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await page.getByRole('link', { name: 'View Resume / CV' }).click()
  await expect(page).toHaveURL('/#resume')
  await expect(page.locator('#resume')).toBeInViewport()
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.getByRole('link', { name: 'View Resume / CV' }).click()
  await expect(page.locator('#resume')).toBeInViewport()
  for (const [slug] of routes) {
    await page.goto(`/work/${slug}`)
    await page.locator('.demo-shell').scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (slug === 'rodelconnect') await page.screenshot({ path: 'artifacts/booking-mobile.png' })
  }
  await page.getByRole('link', { name: 'View Resume / CV' }).click()
  await expect(page).toHaveURL('/#resume')
  await expect(page.locator('#resume')).toBeInViewport()
})
test('keyboard skip link, 404 navigation, contact copy feedback, and project screenshots', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
  await page.getByRole('button', { name: 'Copy email' }).click()
  await expect(page.getByRole('button', { name: 'Email copied!' })).toBeVisible()
  await page.goto('/work/not-a-project')
  await expect(page.getByRole('heading', { name: /Page not found/ })).toBeVisible()
  await page.getByRole('link', { name: 'Back home' }).click()
  await expect(page).toHaveURL('/#home')
  await page.goto('/work/carmelink')
  await expect(page.locator('.case-hero-top>div')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'artifacts/project-desktop.png' })
})
test('one configured image, failed media fallback, and disabled single-slide controls', async ({
  page,
}) => {
  await page.route('**/src/data/mediaManifest.ts*', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: `export const mediaManifest = ${JSON.stringify({
        ...Object.fromEntries(routes.map(([id]) => [id, { items: [] }])),
        carmelink: {
          items: [
            {
              id: 'test-image',
              type: 'image',
              src: '/images/projects/intentionally-missing.webp',
              alt: 'Test missing asset',
              caption: 'Test configuration caption',
              order: 0,
            },
          ],
        },
      })}`,
    }),
  )
  await page.goto('/work/carmelink')
  const gallery = page.getByRole('region', { name: 'CarmeLink media gallery' })
  await gallery.scrollIntoViewIfNeeded()
  await expect(gallery.locator('.gallery-slide')).toHaveCount(1)
  await expect(gallery.getByRole('status')).toContainText('Media unavailable')
  await expect(gallery.getByRole('button', { name: 'Next slide' })).toBeDisabled()
  await expect(gallery.getByRole('button', { name: 'Previous slide' })).toBeDisabled()
  await expect(gallery.locator('.gallery-caption').first()).toHaveText('Test configuration caption')
})
test('native touch swipe and drag-and-drop geography controls', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:5173',
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  })
  try {
    const page = await context.newPage()
    await page.goto('/')
    const gallery = page.getByRole('region', { name: 'Featured projects' })
    await gallery.locator('.gallery-viewport').scrollIntoViewIfNeeded()
    const box = await gallery.locator('.gallery-viewport').boundingBox()
    if (!box) throw new Error('Missing touch carousel viewport')
    const session = await context.newCDPSession(page)
    const y = Math.max(110, box.y + 100)
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: 330, y }],
    })
    for (let x = 300; x >= 55; x -= 35)
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] })
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await expect(gallery.locator('.gallery-count')).toHaveText('02 / 06')
    await page.goto('/work/map-explorer')
    const piece = page.getByRole('button', { name: 'Ilocos Region, Region I' })
    await piece.dragTo(page.getByRole('button', { name: 'Place selected region in Luzon' }))
    await expect(page.getByRole('status')).toContainText('Ilocos Region matched to Luzon')
  } finally {
    await context.close()
  }
})
