import { writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
const domain =
  process.env.VITE_SITE_URL || loadEnv('production', process.cwd(), 'VITE_').VITE_SITE_URL
const destination = resolve('public/sitemap.xml')
if (!domain) {
  await rm(destination, { force: true })
  await writeFile(resolve('public/robots.txt'), 'User-agent: *\nAllow: /\n')
  console.log('Sitemap deferred: set VITE_SITE_URL to your actual deployed origin.')
} else {
  const origin = new URL(domain).origin
  const paths = [
    '/',
    '/work/carmelink',
    '/work/promptwise',
    '/work/autosched-ai',
    '/work/bayanihan-link',
    '/work/rodelconnect',
    '/work/map-explorer',
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>\n`
  await writeFile(destination, xml)
  await writeFile(
    resolve('public/robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  )
  console.log('Generated sitemap.xml for the configured deployment origin.')
}
