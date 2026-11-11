import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import '../../../styles/pixel-effects.css'

type Pixel = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  born: number
  life: number
  tone: number
  alpha: number
}
type EffectKind = 'trail' | 'hover' | 'click' | 'collision'
const actions = 'button,a,[role="button"],[role="tab"]'
const ignored = 'input,textarea,select,video,object,iframe,[contenteditable="true"],[inert]'
const limit = 160

export function PixelEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.dataset.reducedMotion = String(reduced)
    canvas.dataset.active = 'false'
    if (reduced) return
    const context = canvas.getContext('2d')
    if (!context) return
    const pointer = matchMedia('(hover: hover) and (pointer: fine)')
    let width = innerWidth,
      height = innerHeight,
      frame = 0,
      bursts = 0,
      lastTrail = -Infinity,
      lastHover = -Infinity,
      lastClick = -Infinity,
      previousX = 0,
      previousY = 0
    let focused = document.hasFocus()
    let pixels: Pixel[] = []
    let palette: string[] = []

    const readPalette = () => {
      const theme = getComputedStyle(document.documentElement)
      palette = ['--highlight', '--signal-red-text', '--text'].map((token) =>
        theme.getPropertyValue(token).trim(),
      )
    }
    const clear = () => {
      cancelAnimationFrame(frame)
      frame = 0
      pixels = []
      context.clearRect(0, 0, width, height)
      canvas.dataset.active = 'false'
      lastTrail = -Infinity
    }
    const resize = () => {
      clear()
      width = innerWidth
      height = innerHeight
      const ratio = Math.min(devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.imageSmoothingEnabled = false
    }
    const draw = (now: number) => {
      frame = 0
      if (document.hidden || !focused) {
        clear()
        return
      }
      context.clearRect(0, 0, width, height)
      pixels = pixels.filter((pixel) => now - pixel.born < pixel.life)
      for (const pixel of pixels) {
        const age = (now - pixel.born) / 1000
        const progress = (now - pixel.born) / pixel.life
        const x = Math.round((pixel.x + pixel.vx * age) / 3) * 3
        const y = Math.round((pixel.y + pixel.vy * age + 35 * age * age) / 3) * 3
        const size = Math.max(2, Math.round((pixel.size * (1 - progress * 0.3)) / 2) * 2)
        context.globalAlpha = pixel.alpha * (1 - progress) ** 1.3
        context.fillStyle = palette[pixel.tone]
        context.fillRect(x, y, size, size)
      }
      context.globalAlpha = 1
      canvas.dataset.active = String(pixels.length > 0)
      if (pixels.length) frame = requestAnimationFrame(draw)
    }
    const start = (kind: EffectKind) => {
      if (pixels.length > limit) pixels.splice(0, pixels.length - limit)
      canvas.dataset.lastEffect = kind
      canvas.dataset.active = 'true'
      if (kind !== 'trail') canvas.dataset.bursts = String(++bursts)
      if (!frame) frame = requestAnimationFrame(draw)
    }
    const burst = (x: number, y: number, kind: Exclude<EffectKind, 'trail'>, count = 16) => {
      if (document.hidden || !focused || !Number.isFinite(x) || !Number.isFinite(y)) return
      const now = performance.now()
      for (let index = 0; index < count; index++) {
        const direction = ((index % 8) * Math.PI) / 4
        const speed = 45 + (index % 3) * 35
        pixels.push({
          x: x + (index % 2 ? 3 : -3),
          y: y + (index % 3 ? 3 : -3),
          vx: Math.cos(direction) * speed,
          vy: Math.sin(direction) * speed,
          size: kind === 'hover' ? 4 : 4 + (index % 2) * 2,
          born: now,
          life: kind === 'hover' ? 270 : 380 + (index % 4) * 45,
          tone: index % 3,
          alpha: kind === 'hover' ? 0.65 : 0.9,
        })
      }
      start(kind)
    }
    const actionFor = (target: EventTarget | null) => {
      if (!(target instanceof Element) || target.closest(ignored)) return null
      const action = target.closest<HTMLElement>(actions)
      return action && !action.matches(':disabled') && !action.closest('[aria-disabled="true"]')
        ? action
        : null
    }
    const move = (event: PointerEvent) => {
      if (
        !pointer.matches ||
        !focused ||
        document.hidden ||
        event.pointerType !== 'mouse' ||
        (event.target instanceof Element && event.target.closest(ignored))
      )
        return
      const now = performance.now()
      if (now - lastTrail < 34) return
      const dx = event.clientX - previousX,
        dy = event.clientY - previousY,
        distance = Math.hypot(dx, dy)
      if (distance < 7 && lastTrail !== -Infinity) return
      previousX = event.clientX
      previousY = event.clientY
      lastTrail = now
      for (let index = 0; index < 3; index++) {
        pixels.push({
          x: event.clientX + (index - 1) * 5,
          y: event.clientY + (index % 2 ? 4 : -4),
          vx: (-dx / Math.max(distance, 1)) * 22 + (index - 1) * 10,
          vy: (-dy / Math.max(distance, 1)) * 22,
          size: index === 1 ? 4 : 2,
          born: now,
          life: 210 + index * 35,
          tone: index % 3,
          alpha: 0.65,
        })
      }
      start('trail')
    }
    const hover = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== 'mouse') return
      const action = actionFor(event.target)
      if (!action || action === actionFor(event.relatedTarget)) return
      const now = performance.now()
      if (now - lastHover < 90) return
      lastHover = now
      burst(event.clientX, event.clientY, 'hover', 8)
    }
    const click = (event: MouseEvent) => {
      const action = actionFor(event.target)
      if (!action) return
      const now = performance.now()
      if (now - lastClick < 70) return
      lastClick = now
      const bounds = action.getBoundingClientRect()
      burst(
        event.detail === 0 ? bounds.left + bounds.width / 2 : event.clientX,
        event.detail === 0 ? bounds.top + bounds.height / 2 : event.clientY,
        'click',
        18,
      )
    }
    const collision = (event: Event) => {
      if (!(event instanceof CustomEvent)) return
      const point = event.detail as { x?: unknown; y?: unknown } | null
      if (typeof point?.x === 'number' && typeof point.y === 'number')
        burst(point.x, point.y, 'collision', 14)
    }
    const visibility = () => {
      if (document.hidden) clear()
    }
    const blur = () => {
      focused = false
      clear()
    }
    const focus = () => {
      focused = true
      lastTrail = -Infinity
    }
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) clear()
    }
    readPalette()
    resize()
    const themeObserver = new MutationObserver(readPalette)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', hover, { passive: true })
    window.addEventListener('pointerout', leave, { passive: true })
    window.addEventListener('click', click, { capture: true, passive: true })
    window.addEventListener('portfolio:pixel-burst', collision)
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('blur', blur)
    window.addEventListener('focus', focus)
    document.addEventListener('visibilitychange', visibility)
    pointer.addEventListener('change', clear)
    return () => {
      clear()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', hover)
      window.removeEventListener('pointerout', leave)
      window.removeEventListener('click', click, true)
      window.removeEventListener('portfolio:pixel-burst', collision)
      window.removeEventListener('resize', resize)
      window.removeEventListener('blur', blur)
      window.removeEventListener('focus', focus)
      document.removeEventListener('visibilitychange', visibility)
      pointer.removeEventListener('change', clear)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="pixel-effects"
      aria-hidden="true"
      data-active="false"
      data-bursts="0"
      data-reduced-motion={reduced}
    />
  )
}
