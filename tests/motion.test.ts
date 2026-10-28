import { act, renderHook } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { useReducedMotion } from '../src/hooks/useReducedMotion'
it('reacts to reduced-motion preference changes and releases its listener', () => {
  const listeners = new Set<() => void>()
  let matches = false
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return matches
    },
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  }))
  const { result, unmount } = renderHook(() => useReducedMotion())
  expect(result.current).toBe(false)
  act(() => {
    matches = true
    listeners.forEach((listener) => listener())
  })
  expect(result.current).toBe(true)
  unmount()
  expect(listeners.size).toBe(0)
})
