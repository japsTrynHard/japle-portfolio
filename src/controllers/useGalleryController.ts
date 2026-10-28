import { useReducedMotion } from '../hooks/useReducedMotion'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function useGalleryController(count: number) {
  const reducedMotion = useReducedMotion()
  const [viewportRef, api] = useEmblaCarousel({ loop: count > 1, duration: reducedMotion ? 0 : 38 })
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [onscreen, setOnscreen] = useState(false)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [fullscreen, setFullscreen] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [mediaPlaying, setMediaPlaying] = useState(false)
  const running =
    count > 1 &&
    !reducedMotion &&
    !paused &&
    !hovered &&
    !focused &&
    onscreen &&
    visible &&
    !fullscreen &&
    !interacting &&
    !mediaPlaying
  useEffect(() => {
    if (!api) return
    const select = () => setSelected(api.selectedScrollSnap())
    const down = () => setInteracting(true)
    const up = () => setInteracting(false)
    api.on('select', select).on('reInit', select).on('pointerDown', down).on('pointerUp', up)
    const observer = new IntersectionObserver((entries) => setOnscreen(entries[0].isIntersecting), {
      threshold: 0.25,
    })
    observer.observe(api.rootNode())
    return () => {
      api.off('select', select).off('reInit', select).off('pointerDown', down).off('pointerUp', up)
      observer.disconnect()
    }
  }, [api])
  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  useEffect(() => {
    if (!running || !api) return
    const timer = window.setTimeout(() => api.scrollNext(), 5000)
    return () => window.clearTimeout(timer)
  }, [api, selected, running])
  const previous = useCallback(() => api?.scrollPrev(), [api])
  const next = useCallback(() => api?.scrollNext(), [api])
  const goTo = useCallback((index: number) => api?.scrollTo(index), [api])
  return {
    viewportRef,
    selected,
    paused,
    setPaused,
    setHovered,
    setFocused,
    fullscreen,
    setFullscreen,
    running,
    previous,
    next,
    goTo,
    reducedMotion,
    onscreen,
    visible,
    setMediaPlaying,
  }
}
