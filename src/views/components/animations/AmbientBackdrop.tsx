import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useLocation } from 'react-router-dom'
import {
  SiDart,
  SiFlutter,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { Braces, Database } from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import '../../../styles/code-atmosphere.css'

const particles = [
  {
    id: 'react',
    Icon: SiReact,
    x: 0.6,
    y: 18,
    size: 48,
    duration: 14,
    direction: 1,
    tone: 'blue',
    edge: 'left',
    delay: -1,
  },
  {
    id: 'flutter',
    Icon: SiFlutter,
    x: 96,
    y: 26,
    size: 46,
    duration: 18,
    direction: 1,
    tone: 'blue',
    edge: 'right',
    delay: -4,
  },
  {
    id: 'typescript',
    Icon: SiTypescript,
    x: 0.5,
    y: 66,
    size: 44,
    duration: 16,
    direction: -1,
    tone: 'red',
    edge: 'left',
    delay: -3,
  },
  {
    id: 'python',
    Icon: SiPython,
    x: 96,
    y: 80,
    size: 50,
    duration: 22,
    direction: 1,
    tone: 'blue',
    edge: 'right',
    delay: -2,
  },
  {
    id: 'java',
    Icon: FaJava,
    x: 96,
    y: 53,
    size: 48,
    duration: 20,
    direction: 1,
    tone: 'red',
    edge: 'right',
    delay: -6,
  },
  {
    id: 'javascript',
    Icon: SiJavascript,
    x: 20,
    y: 95,
    size: 42,
    duration: 23,
    direction: -1,
    tone: 'neutral',
    edge: 'gap',
    delay: -8,
  },
  {
    id: 'braces',
    Icon: Braces,
    x: 47,
    y: 11,
    size: 44,
    duration: 24,
    direction: 1,
    tone: 'neutral',
    edge: 'gap',
    delay: -7,
  },
  {
    id: 'database',
    Icon: Database,
    x: 56,
    y: 92,
    size: 44,
    duration: 25,
    direction: -1,
    tone: 'blue',
    edge: 'gap',
    delay: -4,
  },
  {
    id: 'html',
    Icon: SiHtml5,
    x: 0.6,
    y: 25,
    size: 46,
    duration: 14,
    direction: -1,
    tone: 'red',
    edge: 'left',
    delay: -1,
  },
  {
    id: 'node',
    Icon: SiNodedotjs,
    x: 0.5,
    y: 59,
    size: 48,
    duration: 16,
    direction: 1,
    tone: 'blue',
    edge: 'left',
    delay: -3,
  },
  {
    id: 'dart',
    Icon: SiDart,
    x: 96,
    y: 33,
    size: 46,
    duration: 18,
    direction: -1,
    tone: 'neutral',
    edge: 'right',
    delay: -4,
  },
  {
    id: 'git',
    Icon: SiGit,
    x: 96,
    y: 60,
    size: 44,
    duration: 20,
    direction: -1,
    tone: 'blue',
    edge: 'right',
    delay: -6,
  },
  {
    id: 'supabase',
    Icon: SiSupabase,
    x: 96,
    y: 87,
    size: 46,
    duration: 22,
    direction: -1,
    tone: 'red',
    edge: 'right',
    delay: -2,
  },
  {
    id: 'vite',
    Icon: SiVite,
    x: 78,
    y: 95,
    size: 42,
    duration: 21,
    direction: 1,
    tone: 'blue',
    edge: 'gap',
    delay: -5,
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
  const opacity = useTransform(springProximity, [0, 1], [0.3, 0.58])
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
      data-edge={particle.edge}
      style={
        {
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          '--code-size': `${particle.size}px`,
          '--code-duration': `${particle.duration}s`,
          '--code-delay': `${particle.delay}s`,
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
  const [collisions, setCollisions] = useState(0)
  const atmosphere = useRef<HTMLDivElement>(null)
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
    if (reduced || paused) return
    const root = atmosphere.current
    if (!root) return
    let frame = 0,
      lastCheck = 0,
      lastBurst = -Infinity
    const touching = new Set<string>(),
      cooldown = new Map<string, number>()
    const impactTimers = new Map<HTMLElement, ReturnType<typeof setTimeout>>()
    const impact = (element: HTMLElement) => {
      const pending = impactTimers.get(element)
      if (pending) clearTimeout(pending)
      element.dataset.collision = 'true'
      impactTimers.set(
        element,
        setTimeout(() => {
          delete element.dataset.collision
          impactTimers.delete(element)
        }, 460),
      )
    }
    const check = (now: number) => {
      if (document.hidden) return
      frame = requestAnimationFrame(check)
      if (now - lastCheck < 80) return
      lastCheck = now
      const icons = Array.from(root.querySelectorAll<HTMLElement>('.code-particle'))
        .map((element) => ({
          element,
          rect: element.querySelector('svg')!.getBoundingClientRect(),
        }))
        .filter(
          ({ rect }) =>
            rect.width > 0 &&
            rect.height > 0 &&
            rect.right > 0 &&
            rect.left < innerWidth &&
            rect.bottom > 0 &&
            rect.top < innerHeight,
        )
      const contacts = new Set<string>()
      for (let a = 0; a < icons.length; a++)
        for (let b = a + 1; b < icons.length; b++) {
          const first = icons[a],
            second = icons[b]
          const left = Math.max(first.rect.left, second.rect.left),
            right = Math.min(first.rect.right, second.rect.right)
          const top = Math.max(first.rect.top, second.rect.top),
            bottom = Math.min(first.rect.bottom, second.rect.bottom)
          if (right - left < 3 || bottom - top < 3) continue
          const key = first.element.dataset.codeIcon + ':' + second.element.dataset.codeIcon
          contacts.add(key)
          if (
            touching.has(key) ||
            now - (cooldown.get(key) ?? -Infinity) < 3500 ||
            now - lastBurst < 600
          )
            continue
          cooldown.set(key, now)
          lastBurst = now
          impact(first.element)
          impact(second.element)
          setCollisions((count) => count + 1)
          window.dispatchEvent(
            new CustomEvent('portfolio:pixel-burst', {
              detail: { x: (left + right) / 2, y: (top + bottom) / 2, kind: 'collision' },
            }),
          )
        }
      touching.clear()
      contacts.forEach((key) => touching.add(key))
    }
    frame = requestAnimationFrame(check)
    return () => {
      cancelAnimationFrame(frame)
      impactTimers.forEach((timer, element) => {
        clearTimeout(timer)
        delete element.dataset.collision
      })
    }
  }, [reduced, paused])

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
      ref={atmosphere}
      data-collisions={collisions}
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
