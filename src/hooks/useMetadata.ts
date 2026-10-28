import { useEffect } from 'react'
export function useMetadata(title: string, description: string) {
  useEffect(() => {
    document.title = title
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]'])
      document.querySelector(selector)?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    const domain = import.meta.env.VITE_SITE_URL as string | undefined
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (domain) {
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = new URL(window.location.pathname, domain).href
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', link.href)
      document
        .querySelector('meta[property="og:image"]')
        ?.setAttribute('content', new URL('/images/social-preview.png', domain).href)
    }
  }, [title, description])
}
