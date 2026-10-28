import { useEffect, useState, useSyncExternalStore } from 'react'
export type Theme = 'dark' | 'light' | 'system'
const systemQuery = '(prefers-color-scheme: dark)'
function subscribeSystemTheme(onChange: () => void) {
  const media = window.matchMedia(systemQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}
function systemIsDark() {
  return window.matchMedia(systemQuery).matches
}
export function useThemeController() {
  const prefersDark = useSyncExternalStore(subscribeSystemTheme, systemIsDark, () => false)
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      if (localStorage.getItem('japle-theme-revision') !== 'dark-default-v3') return 'dark'
      const value = localStorage.getItem('japle-theme')
      return value === 'light' || value === 'system' ? value : 'dark'
    } catch {
      return 'dark'
    }
  })
  const resolvedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme
  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolvedTheme
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          'content',
          document.documentElement.dataset.theme === 'dark' ? '#18191a' : '#f8fafc',
        )
    }
    apply()
    try {
      localStorage.setItem('japle-theme', theme)
      localStorage.setItem('japle-theme-revision', 'dark-default-v3')
    } catch {
      /* Preference remains functional without storage. */
    }
  }, [theme, resolvedTheme])
  return {
    theme,
    setTheme,
    isDark: resolvedTheme === 'dark',
    toggleTheme: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
  }
}
