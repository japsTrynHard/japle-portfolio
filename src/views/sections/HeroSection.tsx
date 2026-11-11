import { motion } from 'motion/react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Braces, MapPin } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { InterfaceStage } from '../components/animations/InterfaceStage'

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  const reduced = useReducedMotion()
  return (
    <section id="home" className="hero-section identity-hero container">
      <div className="identity-topline">
        <span className="identity-file mono">
          <Braces size={15} /> portfolio / japle-ligaya
        </span>
        <span className="identity-availability">
          <span className="status-dot" /> Seeking a developer internship
        </span>
      </div>
      <div className="identity-heading">
        <p className="identity-greeting">Hello, I&apos;m</p>
        <h1 className="hero-identity" aria-label="Japle Ligaya">
          {['Japle', 'Ligaya'].map((name, index) => (
            <span className="hero-line" key={name}>
              <motion.span
                initial={reduced ? false : { y: '110%', rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.95, delay: 0.08 + index * 0.12, ease }}
              >
                {name}
                <span className="identity-period" aria-hidden="true">
                  {index === 1 ? '.' : ''}
                </span>
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="identity-rule"
          aria-hidden="true"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <span />
        </motion.div>
      </div>
      <div className="identity-workbench">
        <motion.div
          className="identity-copy"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          <div className="identity-role-label mono">
            <span>01</span> THE DEVELOPER
          </div>
          <h2 className="identity-role">
            Full-Stack Web <span>&amp; Mobile Developer</span>
          </h2>
          <p className="hero-description">
            <span className="hero-tagline">Flutter mobile apps. React web applications.</span>
            <br />
            Hands-on experience with authentication, databases, and AI integrations.
          </p>
          <div className="hero-ctas">
            <a className="button primary" href="#projects">
              View my projects <ArrowDownRight size={19} />
            </a>
            <a className="button ghost" href="#contact">
              Contact me <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="identity-location">
            <MapPin size={14} />
            <span>Based in the Philippines</span>
            <span className="identity-location-line" />
            <span>Web. Mobile. APIs.</span>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual identity-visual"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.32, ease }}
        >
          <InterfaceStage />
        </motion.div>
      </div>
      <div className="identity-bottom">
        <a href="#featured" className="identity-scroll">
          <ArrowDown size={16} />
          <span>Explore the work</span>
        </a>
        <span className="mono identity-stack">
          React <span>/</span> Flutter <span>/</span> Supabase <span>/</span> Firebase
        </span>
        <span className="mono identity-build">
          <span aria-hidden="true">{'</>'}</span> Built with intention.
        </span>
      </div>
    </section>
  )
}
