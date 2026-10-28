import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const configured = loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL
  const origin = configured ? new URL(configured).origin : undefined
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-deployment-metadata',
        transformIndexHtml(html) {
          if (!origin) return html
          return html
            .replace(
              'content="/images/social-preview.png"',
              `content="${origin}/images/social-preview.png"`,
            )
            .replace(
              '</head>',
              `<link rel="canonical" href="${origin}/" /><meta property="og:url" content="${origin}/" /></head>`,
            )
        },
      },
    ],
  }
})
