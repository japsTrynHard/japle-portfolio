import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { ReactNode } from 'react'
export function Magnetic({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0),
    rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 180, damping: 17 }),
    y = useSpring(rawY, { stiffness: 180, damping: 17 })
  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse' || reduced) return
        const box = event.currentTarget.getBoundingClientRect()
        rawX.set((event.clientX - box.left - box.width / 2) * 0.08)
        rawY.set((event.clientY - box.top - box.height / 2) * 0.08)
      }}
      onPointerLeave={() => {
        rawX.set(0)
        rawY.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
