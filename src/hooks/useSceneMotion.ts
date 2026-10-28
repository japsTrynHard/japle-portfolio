import { useEffect } from 'react'
export function useSceneMotion() {
  useEffect(() => {
    const selector =
      '.hero-section,.developer-art,.project-cover,.architecture-mini,.system-diagram,.paper-plane'
    const seen = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          (entry.target as HTMLElement).dataset.motionActive = String(
            entry.isIntersecting && !document.hidden,
          )
      },
      { rootMargin: '100px' },
    )
    const attach = () =>
      document.querySelectorAll(selector).forEach((element) => {
        if (!seen.has(element)) {
          seen.add(element)
          observer.observe(element)
        }
      })
    attach()
    const mutation = new MutationObserver((records) => {
      const release = (element: Element) => {
        observer.unobserve(element)
        seen.delete(element)
      }
      for (const record of records)
        for (const node of Array.from(record.removedNodes))
          if (node instanceof Element) {
            if (node.matches(selector)) release(node)
            node.querySelectorAll(selector).forEach(release)
          }
      attach()
    })
    mutation.observe(document.getElementById('root')!, { childList: true, subtree: true })
    const visibility = () => {
      document.querySelectorAll(selector).forEach((element) => {
        if (document.hidden) (element as HTMLElement).dataset.motionActive = 'false'
        else {
          observer.unobserve(element)
          observer.observe(element)
        }
      })
    }
    document.addEventListener('visibilitychange', visibility)
    return () => {
      mutation.disconnect()
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])
}
