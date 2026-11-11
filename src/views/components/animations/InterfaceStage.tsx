import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  Layers3,
  LockKeyhole,
  Smartphone,
} from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import '../../../styles/interface-stage.css'

type InterfaceMode = 'web' | 'mobile' | 'api'

const modes = [
  {
    id: 'web',
    label: 'Web',
    icon: Code2,
    title: 'Interfaces made to be used.',
    description:
      'React interfaces with responsive layouts, clear navigation, and application workflows.',
    technology: 'React / TypeScript',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: Smartphone,
    title: 'The same care. A smaller screen.',
    description:
      'Flutter applications that connect useful mobile experiences with authentication and data.',
    technology: 'Flutter / Dart',
  },
  {
    id: 'api',
    label: 'APIs & data',
    icon: Database,
    title: 'Connecting the moving parts.',
    description:
      'Hands-on integration with authentication, databases, and APIs using Firebase and Supabase.',
    technology: 'Firebase / Supabase',
  },
] as const

export function InterfaceStage() {
  const [selected, setSelected] = useState<InterfaceMode>('web')
  const reduced = useReducedMotion()
  const active = modes.find((mode) => mode.id === selected)!

  return (
    <div className="interface-stage" data-interface-mode={selected}>
      <div className="interface-stage__heading">
        <span className="interface-stage__heading-icon" aria-hidden="true">
          <Braces size={17} />
        </span>
        <span>Interfaces. Logic. Connections.</span>
        <span className="interface-stage__study">INTERFACE STUDY</span>
      </div>

      <div
        className="interface-stage__controls"
        role="group"
        aria-label="Explore development areas"
      >
        {modes.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            className="interface-stage__control"
            aria-pressed={selected === id}
            aria-controls="interface-stage-description"
            onClick={() => setSelected(id)}
          >
            {selected === id && (
              <motion.span
                className="interface-stage__selection"
                layoutId="interface-stage-selection"
                transition={
                  reduced ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 34 }
                }
              />
            )}
            <Icon size={15} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="interface-stage__canvas" aria-hidden="true">
        <div className="interface-stage__canvas-label">DESIGN → DEVELOP → CONNECT</div>
        <svg
          className="interface-stage__connections"
          viewBox="0 0 560 390"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            className="interface-stage__connection-base"
            d="M260 140H446V216M260 140V312H330M446 216V312H330"
          />
          <motion.path
            className="interface-stage__connection-signal"
            d={
              selected === 'mobile'
                ? 'M260 140H446V216'
                : selected === 'api'
                  ? 'M446 216V312H330'
                  : 'M330 312H260V140'
            }
            key={selected}
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.65, ease: 'easeInOut' }}
          />
          <circle cx="446" cy="216" r="4" className="interface-stage__junction" />
          <circle cx="330" cy="312" r="4" className="interface-stage__junction" />
        </svg>

        <motion.div
          className="interface-stage__browser interface-stage__panel"
          animate={{
            y: selected === 'web' ? -5 : 0,
            rotate: selected === 'web' ? -1 : -2,
            scale: selected === 'web' ? 1.02 : 1,
          }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 24 }}
        >
          <div className="interface-stage__browser-bar">
            <span className="interface-stage__window-marks">
              <i />
              <i />
              <i />
            </span>
            <span>interface / web</span>
            <Code2 size={12} />
          </div>
          <div className="interface-stage__app">
            <div className="interface-stage__app-nav">
              <span className="interface-stage__app-mark">JL</span>
              <span>WORKSPACE</span>
              <span className="interface-stage__avatar">J</span>
            </div>
            <div className="interface-stage__app-body">
              <div className="interface-stage__app-copy">
                <span className="interface-stage__eyebrow">A CLEARER WAY THROUGH.</span>
                <strong>Useful by design.</strong>
                <p>Interface → interaction → integration.</p>
              </div>
              <div className="interface-stage__app-blocks">
                <span />
                <span />
                <span />
              </div>
              <div className="interface-stage__app-task">
                <span className="interface-stage__task-icon">
                  <Check size={11} />
                </span>
                <span>Make the next step clear.</span>
                <ArrowUpRight size={12} />
              </div>
            </div>
          </div>
          <div className="interface-stage__panel-caption">
            <Code2 size={11} />
            <span>REACT INTERFACES</span>
            <i />
          </div>
        </motion.div>

        <motion.div
          className="interface-stage__phone interface-stage__panel"
          animate={{
            y: selected === 'mobile' ? -8 : 0,
            rotate: selected === 'mobile' ? 2 : 5,
            scale: selected === 'mobile' ? 1.04 : 1,
          }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 24 }}
        >
          <div className="interface-stage__phone-camera" />
          <div className="interface-stage__phone-top">
            <span>9:41</span>
            <span>•••</span>
          </div>
          <div className="interface-stage__phone-content">
            <span className="interface-stage__eyebrow">ON THE GO</span>
            <strong>Good to go.</strong>
            <div className="interface-stage__phone-card">
              <Layers3 size={24} />
              <span>
                One connected
                <br />
                experience.
              </span>
            </div>
            <div className="interface-stage__phone-row">
              <i />
              <span />
              <Check size={10} />
            </div>
            <div className="interface-stage__phone-row">
              <i />
              <span />
              <Check size={10} />
            </div>
            <div className="interface-stage__phone-action">
              Continue <ArrowUpRight size={11} />
            </div>
          </div>
          <div className="interface-stage__phone-home" />
        </motion.div>

        <motion.div
          className="interface-stage__endpoint interface-stage__panel"
          animate={{ y: selected === 'api' ? -3 : 0, scale: selected === 'api' ? 1.025 : 1 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 24 }}
        >
          <div className="interface-stage__endpoint-heading">
            <span>
              <Database size={13} /> APPLICATION DATA
            </span>
            <LockKeyhole size={12} />
          </div>
          <div className="interface-stage__code">
            <span className="interface-stage__code-number">01</span>
            <code>
              <span>const</span> experience = {'{'}
            </code>
            <span className="interface-stage__code-number">02</span>
            <code>
              {' '}
              auth: <b>'connected'</b>,
            </code>
            <span className="interface-stage__code-number">03</span>
            <code>
              {' '}
              data: <b>'in sync'</b>
            </code>
            <span className="interface-stage__code-number">04</span>
            <code>{'}'}</code>
          </div>
        </motion.div>
        <div className="interface-stage__canvas-footnote">
          <span>WEB</span>
          <i />
          <span>MOBILE</span>
          <i />
          <span>APIs</span>
        </div>
      </div>

      <div
        className="interface-stage__description"
        id="interface-stage-description"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="interface-stage__description-top">
          <span>{active.technology}</span>
          <span>0{modes.findIndex((mode) => mode.id === selected) + 1} / 03</span>
        </div>
        <motion.div
          key={selected}
          initial={reduced ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.22 }}
        >
          <h3>{active.title}</h3>
          <p>{active.description}</p>
        </motion.div>
      </div>
    </div>
  )
}
