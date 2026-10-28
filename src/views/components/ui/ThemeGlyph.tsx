import { useId } from 'react'
import { motion } from 'motion/react'
export function ThemeGlyph({ dark }: { dark: boolean }) {
  const id = useId()
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <defs>
        <mask id={id}>
          <rect width="24" height="24" fill="white" />
          <motion.circle
            r="6.5"
            fill="black"
            animate={{ cx: dark ? 16 : 31, cy: dark ? 7 : -5 }}
            transition={{ duration: 0.5 }}
          />
        </mask>
      </defs>
      <motion.circle
        cx="12"
        cy="12"
        r="6"
        fill="currentColor"
        mask={`url(#${id})`}
        animate={{ rotate: dark ? -30 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ opacity: dark ? 0 : 1, rotate: dark ? 45 : 0, scale: dark ? 0.5 : 1 }}
        style={{ transformOrigin: '12px 12px' }}
        transition={{ duration: 0.4 }}
      >
        <path d="M12 1V3M12 21V23M1 12H3M21 12H23M4 4L5.5 5.5M18.5 18.5L20 20M4 20L5.5 18.5M18.5 5.5L20 4" />
      </motion.g>
    </svg>
  )
}
