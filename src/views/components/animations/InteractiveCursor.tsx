import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'motion/react'
type CursorMode = 'idle' | 'link' | 'view' | 'drag' | 'text'
export function InteractiveCursor() {
  const reduced = useReducedMotion()
  const [mode, setMode] = useState<CursorMode>('idle')
  const [fine, setFine] = useState(() => matchMedia('(hover: hover) and (pointer: fine)').matches)
  const x = useMotionValue(-100),
    y = useMotionValue(-100),
    opacity = useMotionValue(0)
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (reduced || !fine) return
    let visible = false
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x.set(Math.round(event.clientX / 3) * 3)
      y.set(Math.round(event.clientY / 3) * 3)
      if (!visible) {
        opacity.set(1)
        visible = true
      }
    }
    const over = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('input,textarea,select,video,object')) setMode('text')
      else if (target?.closest('[data-cursor="view"]')) setMode('view')
      else if (target?.closest('a,button,[role="tab"]')) setMode('link')
      else if (target?.closest('.gallery-viewport')) setMode('drag')
      else setMode('idle')
    }
    const hide = () => {
      opacity.set(0)
      visible = false
    }
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide()
    }
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Tab') hide()
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerout', leave, { passive: true })
    window.addEventListener('blur', hide)
    window.addEventListener('keydown', keyboard)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerout', leave)
      window.removeEventListener('blur', hide)
      window.removeEventListener('keydown', keyboard)
      opacity.set(0)
    }
  }, [reduced, fine, x, y, opacity])
  if (reduced || !fine) return null
  return (
    <motion.div
      className={`interactive-cursor cursor-${mode}`}
      style={{ x, y, opacity }}
      aria-hidden="true"
    >
      <div className="cursor-ring">
        <i className="pixel-corner pixel-corner--tl" />
        <i className="pixel-corner pixel-corner--tr" />
        <i className="pixel-corner pixel-corner--bl" />
        <i className="pixel-corner pixel-corner--br" />
        <span className="cursor-label">
          {mode === 'view' ? 'View ↗' : mode === 'drag' ? '↔' : ''}
        </span>
      </div>
    </motion.div>
  )
}
