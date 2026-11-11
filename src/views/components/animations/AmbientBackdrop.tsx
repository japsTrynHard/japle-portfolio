import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { SiFlutter, SiJavascript, SiPython, SiReact, SiTypescript } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { Braces, Database } from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import '../../../styles/code-atmosphere.css'

const particles = [
  { id: 'react', Icon: SiReact, x: 1.8, y: 18, size: 38, duration: 23, direction: 1, tone: 'blue' },
  {
    id: 'flutter',
    Icon: SiFlutter,
    x: 94,
    y: 31,
    size: 32,
    duration: 27,
    direction: -1,
    tone: 'blue',
  },
  {
    id: 'typescript',
    Icon: SiTypescript,
    x: 1.5,
    y: 72,
    size: 29,
    duration: 25,
    direction: -1,
    tone: 'red',
  },
  {
    id: 'python',
    Icon: SiPython,
    x: 94,
    y: 84,
    size: 38,
    duration: 29,
    direction: 1,
    tone: 'blue',
  },
  { id: 'java', Icon: FaJava, x: 96, y: 56, size: 36, duration: 22, direction: 1, tone: 'red' },
  {
    id: 'javascript',
    Icon: SiJavascript,
    x: 21,
    y: 95,
    size: 23,
    duration: 26,
    direction: -1,
    tone: 'neutral',
  },
  {
    id: 'braces',
    Icon: Braces,
    x: 49,
    y: 11,
    size: 26,
    duration: 24,
    direction: 1,
    tone: 'neutral',
  },
  {
    id: 'database',
    Icon: Database,
    x: 55,
    y: 91,
    size: 26,
    duration: 28,
    direction: -1,
    tone: 'blue',
  },
] as const

type Reaction = (x: number, y: number, width: number, height: number, active: boolean) => void
type Register = (id: string, react: Reaction) => () => void

function CodeParticle({
  particle,
  register,
  reduced,
}: {
  particle: (typeof particles)[number]
  register: Register
  reduced: boolean
}) {
  const x = useMotionValue(0),
    y = useMotionValue(0),
    proximity = useMotionValue(0),
    rotate = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 100, damping: 22 })
  const springY = useSpring(y, { stiffness: 100, damping: 22 })
  const springProximity = useSpring(proximity, { stiffness: 85, damping: 22 })
  const springRotate = useSpring(rotate, { stiffness: 90, damping: 23 })
  const opacity = useTransform(springProximity, [0, 1], [0.2, 0.48])
  const scale = useTransform(springProximity, [0, 1], [1, 1.16])
  useEffect(
    () =>
      register(particle.id, (pointerX, pointerY, width, height, active) => {
        const dx = pointerX - ((width * particle.x) / 100 + particle.size / 2)
        const dy = pointerY - ((height * particle.y) / 100 + particle.size / 2)
        const power = active && !reduced ? Math.max(0, 1 - Math.hypot(dx, dy) / 260) : 0
        x.set(-dx * power * 0.13)
        y.set(-dy * power * 0.13)
        proximity.set(power)
        rotate.set(-dx * power * 0.06)
      }),
    [particle, register, reduced, x, y, proximity, rotate],
  )
  const Icon = particle.Icon
  return (
    <span
      className="code-particle"
      data-code-icon={particle.id}
      data-tone={particle.tone}
      style={
        {
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          '--code-size': `${particle.size}px`,
          '--code-duration': `${particle.duration}s`,
          '--code-delay': `${-particle.duration * 0.37}s`,
          '--code-direction': particle.direction,
        } as CSSProperties
      }
    >
      <motion.span
        className="code-particle__reactor"
        style={{ x: springX, y: springY, rotate: springRotate, scale, opacity }}
      >
        <span className="code-particle__drift">
          <Icon />
        </span>
      </motion.span>
    </span>
  )
}

export function AmbientBackdrop() {
  const reduced = useReducedMotion()
  const { pathname } = useLocation()
  const [scene, setScene] = useState(pathname.startsWith('/work/') ? 'case' : 'home')
  const [paused, setPaused] = useState(() => document.hidden)
  const [pointerEnabled, setPointerEnabled] = useState(false)
  const reactions = useRef(new Map<string, Reaction>())
  const fieldX = useMotionValue(0),
    fieldY = useMotionValue(0)
  const lightX = useMotionValue(-500),
    lightY = useMotionValue(-500),
    lightOpacity = useMotionValue(0)
  const softX = useSpring(fieldX, { stiffness: 32, damping: 22 }),
    softY = useSpring(fieldY, { stiffness: 32, damping: 22 })
  const softLightX = useSpring(lightX, { stiffness: 65, damping: 25 }),
    softLightY = useSpring(lightY, { stiffness: 65, damping: 25 })
  const softLightOpacity = useSpring(lightOpacity, { stiffness: 45, damping: 22 })
  const register = useCallback<Register>((id, react) => {
    reactions.current.set(id, react)
    return () => {
      reactions.current.delete(id)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0,
      latestX = 0,
      latestY = 0,
      enabled = media.matches && !reduced
    const reset = () => {
      fieldX.set(0)
      fieldY.set(0)
      lightOpacity.set(0)
      reactions.current.forEach((react) => react(0, 0, innerWidth, innerHeight, false))
    }
    const capability = () => {
      enabled = media.matches && !reduced
      setPointerEnabled(enabled)
      if (!enabled) reset()
    }
    capability()
    const update = () => {
      frame = 0
      if (!enabled || document.hidden) return
      fieldX.set((latestX / innerWidth - 0.5) * 14)
      fieldY.set((latestY / innerHeight - 0.5) * 12)
      lightX.set(latestX)
      lightY.set(latestY)
      lightOpacity.set(1)
      reactions.current.forEach((react) => react(latestX, latestY, innerWidth, innerHeight, true))
    }
    const move = (event: PointerEvent) => {
      if (!enabled || document.hidden || event.pointerType !== 'mouse') return
      latestX = event.clientX
      latestY = event.clientY
      if (!frame) frame = requestAnimationFrame(update)
    }
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) reset()
    }
    const visibility = () => {
      setPaused(document.hidden)
      if (document.hidden) reset()
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerout', leave, { passive: true })
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', visibility)
    media.addEventListener('change', capability)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerout', leave)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', visibility)
      media.removeEventListener('change', capability)
      reset()
    }
  }, [reduced, fieldX, fieldY, lightX, lightY, lightOpacity])

  useEffect(() => {
    if (pathname.startsWith('/work/')) {
      setScene('case')
      return
    }
    setScene('home')
    const scenes: Record<string, string> = {
      home: 'home',
      featured: 'featured',
      projects: 'projects',
      technologies: 'technologies',
      expertise: 'technologies',
      about: 'about',
      journey: 'about',
      resume: 'resume',
      contact: 'contact',
    }
    const seen = new WeakSet<Element>(),
      visible = new Map<Element, IntersectionObserverEntry>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target, entry)
          else visible.delete(entry.target)
        }
        const nearest = Array.from(visible.values()).sort(
          (a, b) =>
            Math.abs(a.boundingClientRect.top - innerHeight * 0.3) -
            Math.abs(b.boundingClientRect.top - innerHeight * 0.3),
        )[0]
        if (nearest && scenes[nearest.target.id]) setScene(scenes[nearest.target.id])
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: 0 },
    )
    const attach = () => {
      for (const id of Object.keys(scenes)) {
        const element = document.getElementById(id)
        if (element && !seen.has(element)) {
          seen.add(element)
          observer.observe(element)
        }
      }
    }
    attach()
    const mutation = new MutationObserver(attach),
      main = document.getElementById('main-content')
    if (main) mutation.observe(main, { childList: true, subtree: true })
    return () => {
      mutation.disconnect()
      observer.disconnect()
    }
  }, [pathname])

  return (
    <div
      className="code-atmosphere"
      aria-hidden="true"
      data-scene={scene}
      data-paused={paused}
      data-pointer={pointerEnabled}
      data-reduced-motion={reduced}
    >
      <div className="code-atmosphere__edge-line code-atmosphere__edge-line--left" />
      <div className="code-atmosphere__edge-line code-atmosphere__edge-line--right" />
      <motion.div
        className="code-atmosphere__cursor-light"
        style={{ x: softLightX, y: softLightY, opacity: softLightOpacity }}
      />
      <motion.div className="code-atmosphere__field" style={{ x: softX, y: softY }}>
        <div className="code-atmosphere__scene">
          {particles.map((particle) => (
            <CodeParticle
              key={particle.id}
              particle={particle}
              register={register}
              reduced={reduced}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
