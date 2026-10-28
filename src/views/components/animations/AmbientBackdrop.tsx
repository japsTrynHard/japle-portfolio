import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { SiPython, SiReact, SiTypescript, SiFlutter, SiDart, SiJavascript } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { Braces } from 'lucide-react'
const symbols = [SiPython, FaJava, SiReact, SiTypescript, SiFlutter, SiDart, SiJavascript, Braces]
export function AmbientBackdrop() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const pointerX = useMotionValue(0),
    pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 25, damping: 25 }),
    y = useSpring(pointerY, { stiffness: 25, damping: 25 })
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (reduced || event.pointerType !== 'mouse') return
      pointerX.set((event.clientX / innerWidth - 0.5) * 14)
      pointerY.set((event.clientY / innerHeight - 0.5) * 14)
    }
    const visibility = () => {
      if (ref.current) ref.current.dataset.paused = String(document.hidden)
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [reduced, pointerX, pointerY])
  return (
    <div ref={ref} className="ambient-backdrop" aria-hidden="true">
      <div className="ambient-grid" />
      <motion.div className="ambient-world" style={{ x, y }}>
        {symbols.map((Icon, index) => (
          <span
            className={`ambient-symbol ambient-symbol-${index + 1}`}
            key={index}
            style={
              {
                '--float-duration': `${19 + index * 2}s`,
                '--float-delay': `${-index * 3}s`,
                '--symbol-angle': `${index % 2 ? 12 : -10}deg`,
              } as CSSProperties
            }
          >
            <Icon />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
