import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { Search, ListChecks, PenTool, Code2, FlaskConical, RefreshCcw, Rocket } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
const steps = [
  { name: 'Discover', text: 'Define the problem and user requirements.', icon: Search },
  { name: 'Plan', text: 'Outline features, data, and application flow.', icon: ListChecks },
  { name: 'Design', text: 'Plan screens, navigation, and interface behavior.', icon: PenTool },
  { name: 'Build', text: 'Implement interfaces and supporting integrations.', icon: Code2 },
  {
    name: 'Test',
    text: 'Check core flows, responsiveness, and accessibility.',
    icon: FlaskConical,
  },
  { name: 'Improve', text: 'Fix issues and incorporate feedback.', icon: RefreshCcw },
  { name: 'Deploy', text: 'Build and prepare the application for release.', icon: Rocket },
]
export function JourneySection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  return (
    <section className="section container journey-section" ref={ref}>
      <SectionHeading
        number="06"
        label="DEVELOPMENT PROCESS"
        title={
          <>
            My development <em>workflow.</em>
          </>
        }
        text="A structured approach to requirements, implementation, testing, and deployment."
      />
      <div className="journey-track">
        <svg
          className="journey-line journey-line-desktop"
          viewBox="0 0 1000 2"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 1H1000" />
          <motion.path d="M0 1H1000" style={{ pathLength: reduced ? 1 : scrollYProgress }} />
        </svg>
        <svg
          className="journey-line journey-line-mobile"
          viewBox="0 0 2 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M1 0V1000" />
          <motion.path d="M1 0V1000" style={{ pathLength: reduced ? 1 : scrollYProgress }} />
        </svg>
        {steps.map((step, index) => (
          <motion.div
            key={step.name}
            className="journey-step"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
          >
            <span className="journey-icon">
              <step.icon size={21} />
            </span>
            <span className="mono">0{index + 1}</span>
            <h3>{step.name}</h3>
            <p>{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
