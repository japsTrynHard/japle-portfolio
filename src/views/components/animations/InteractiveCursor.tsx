import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
type CursorMode = 'idle' | 'link' | 'view' | 'drag' | 'text'
export function InteractiveCursor() {
  const reduced = useReducedMotion()
  const [mode, setMode] = useState<CursorMode>('idle')
  const x = useMotionValue(-100),
    y = useMotionValue(-100),
    opacity = useMotionValue(0)
  const softX = useSpring(x, { stiffness: 420, damping: 36 }),
    softY = useSpring(y, { stiffness: 420, damping: 36 })
  useEffect(() => {
    if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let visible = false
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX)
      y.set(event.clientY)
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
    }
  }, [reduced, x, y, opacity])
  if (reduced) return null
  return (
    <motion.div
      className={`interactive-cursor cursor-${mode}`}
      style={{ x: softX, y: softY, opacity }}
      aria-hidden="true"
    >
      <div className="cursor-ring">
        <span>{mode === 'view' ? 'View ↗' : mode === 'drag' ? '↔' : ''}</span>
      </div>
    </motion.div>
  )
}
