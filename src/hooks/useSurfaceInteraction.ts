import { useEffect } from 'react'

const surfaces = '.resume-option,.technology-badge,.expertise-tab,.contact-card,.interface-stage'

export function useSurfaceInteraction() {
  useEffect(() => {
    const media = matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    let frame = 0
    let pointer: PointerEvent | null = null
    const update = () => {
      frame = 0
      if (!pointer || !(pointer.target instanceof Element)) return
      const surface = pointer.target.closest<HTMLElement>(surfaces)
      if (!surface) return
      const bounds = surface.getBoundingClientRect()
      surface.style.setProperty(
        '--surface-x',
        `${Math.round((pointer.clientX - bounds.left) / 4) * 4}px`,
      )
      surface.style.setProperty(
        '--surface-y',
        `${Math.round((pointer.clientY - bounds.top) / 4) * 4}px`,
      )
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pointer = event
      if (!frame) frame = requestAnimationFrame(update)
    }
    const configure = () => {
      window.removeEventListener('pointermove', move)
      if (media.matches) window.addEventListener('pointermove', move, { passive: true })
      else {
        cancelAnimationFrame(frame)
        frame = 0
        pointer = null
      }
    }
    configure()
    media.addEventListener('change', configure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      media.removeEventListener('change', configure)
    }
  }, [])
}
