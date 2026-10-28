import { useReducedMotion } from '../../hooks/useReducedMotion'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Code2, Sparkles } from 'lucide-react'
import { DeveloperIllustration } from '../components/animations/DeveloperIllustration'
export function HeroSection() {
  const reduced = useReducedMotion()
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const moveX = useSpring(x, { stiffness: 70, damping: 25 }),
    moveY = useSpring(y, { stiffness: 70, damping: 25 })
  return (
    <section
      id="home"
      className="hero-section container"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return
        const bounds = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.025)
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.025)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <div className="hero-topline">
        <span className="eyebrow">
          <span className="status-dot" /> SEEKING A DEVELOPER INTERNSHIP
        </span>
        <span className="mono hero-location">BASED IN THE PHILIPPINES ↗</span>
      </div>
      <div className="hero-composition">
        <div className="hero-copy">
          <motion.p
            className="hero-name"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Hello, I'm
          </motion.p>
          <h1 className="hero-identity" aria-label="Japle Ligaya">
            {['Japle', 'Ligaya.'].map((line, i) => (
              <span className="hero-line" key={line}>
                <motion.span
                  initial={reduced ? false : { y: '110%', rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 0 ? (
                    line.split('').map((letter, index) => (
                      <motion.span
                        className="hero-letter"
                        key={index}
                        initial={reduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.18 + index * 0.055 }}
                      >
                        {letter}
                      </motion.span>
                    ))
                  ) : (
                    <>
                      <em className="hero-surname">
                        {line.split('').map((letter, index) => (
                          <motion.span
                            className="hero-letter"
                            key={index}
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.38 + index * 0.055 }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                        <svg viewBox="0 0 360 16" aria-hidden="true">
                          <motion.path
                            d="M4 10Q142 1 353 7M60 15Q210 7 329 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            initial={{ pathLength: reduced ? 1 : 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.1, delay: 0.7 }}
                          />
                        </svg>
                      </em>
                      <span className="hero-star" aria-hidden="true">
                        ✳
                      </span>
                    </>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="hero-role hero-profession">
              <Code2 size={20} />
              <span>Full-Stack & Mobile Application Developer</span>
            </div>
            <p className="hero-description">
              <span className="hero-tagline">Flutter mobile apps. React web applications.</span>
              <br />
              Hands-on experience with authentication, databases, and AI integrations.
            </p>
            <div className="hero-ctas">
              <a className="button primary magnetic" href="#projects">
                View my projects <ArrowDownRight size={19} />
              </a>
              <a className="button ghost" href="#contact">
                Contact me <ArrowUpRight size={17} />
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="hero-visual"
          style={{ x: moveX, y: moveY }}
          initial={reduced ? false : { opacity: 0, scale: 0.9, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <DeveloperIllustration />
          <div className="art-caption">
            <Sparkles size={15} />
            <span>Flutter · React · Supabase · Firebase</span>
          </div>
        </motion.div>
      </div>
      <div className="hero-bottom">
        <a href="#featured" className="scroll-cue">
          <span className="scroll-cue-icon">
            <ArrowDown size={16} />
          </span>{' '}
          SCROLL TO EXPLORE
        </a>
        <span className="hero-signature">
          Web. Mobile. <em>APIs.</em>
        </span>
        <span className="mono">01 — 09</span>
      </div>
    </section>
  )
}
