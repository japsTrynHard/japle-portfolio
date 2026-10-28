import { useSyncExternalStore } from 'react'
const query = '(prefers-reduced-motion: reduce)'
function subscribe(onChange: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}
function snapshot() {
  return window.matchMedia(query).matches
}
// A live subscription also stops galleries/cursor effects when this preference
// changes while the portfolio is open, without requiring a reload.
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, () => true)
}
