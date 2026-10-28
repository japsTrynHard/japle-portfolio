import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'scale'
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              y: direction === 'up' ? 35 : 0,
              x: direction === 'left' ? -35 : 0,
              scale: direction === 'scale' ? 0.94 : 1,
            }
      }
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
