import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, FileText, Menu, X } from 'lucide-react'
import { motion, useScroll, useSpring } from 'motion/react'
import { ThemeGlyph } from '../ui/ThemeGlyph'
import { useThemeController } from '../../../controllers/useThemeController'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
const links = [
  ['Home', 'home'],
  ['Projects', 'projects'],
  ['Technologies', 'technologies'],
  ['About', 'about'],
  ['Resume', 'resume'],
  ['Contact', 'contact'],
]
export function Header() {
  const { isDark, toggleTheme } = useThemeController()
  const reducedMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  useEffect(() => {
    if (pathname !== '/') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-10% 0px -65% 0px', threshold: 0 },
    )
    const seen = new WeakSet<Element>()
    const attach = () =>
      links.forEach(([, id]) => {
        const element = document.getElementById(id)
        if (element && !seen.has(element)) {
          seen.add(element)
          observer.observe(element)
        }
      })
    attach()
    const changes = new MutationObserver(attach)
    changes.observe(document.getElementById('main-content')!, { childList: true, subtree: true })
    return () => {
      changes.disconnect()
      observer.disconnect()
    }
  }, [pathname])
  return (
    <header className="site-header">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="nav-wrap">
        <Link
          to="/#home"
          className="wordmark"
          aria-label="Japle Ligaya home"
          onClick={() => setOpen(false)}
        >
          japle<span className="wordmark-dot">.dev</span>
        </Link>
        <nav
          aria-label="Main navigation"
          id="main-navigation"
          className={open ? 'main-nav open' : 'main-nav'}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false)
              document.getElementById('menu-toggle')?.focus()
            }
          }}
        >
          {links.map(([label, id]) => (
            <Link
              key={id}
              to={`/#${id}`}
              className={
                (pathname.startsWith('/work') ? id === 'projects' : active === id)
                  ? 'nav-link active'
                  : 'nav-link'
              }
              aria-current={
                (pathname.startsWith('/work') ? id === 'projects' : active === id)
                  ? 'location'
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="theme-switch"
            role="switch"
            aria-label="Dark mode"
            aria-checked={isDark}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            <span className="theme-switch-track" aria-hidden="true">
              <span className="theme-switch-thumb">
                <ThemeGlyph dark={isDark} />
              </span>
            </span>
            <span className="theme-switch-label" aria-hidden="true">
              {isDark ? 'Dark' : 'Light'}
            </span>
          </button>
          <Link
            to="/#resume"
            className="nav-resume"
            aria-label="View Resume / CV"
            onClick={() => {
              setOpen(false)
              if (pathname === '/')
                document
                  .getElementById('resume')
                  ?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })
            }}
          >
            <FileText size={17} />
            <span className="nav-resume-label">Resume / CV</span>
            <span className="nav-resume-short">CV</span>
          </Link>
          <a href="mailto:ligayajaple@gmail.com" className="nav-contact">
            Contact me <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-toggle"
            className="icon-button mobile-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
