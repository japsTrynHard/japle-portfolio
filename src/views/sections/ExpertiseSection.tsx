import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Braces, Layers3, Smartphone, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/animations/Reveal'
const expertise = [
  {
    title: 'Full-stack development',
    icon: Braces,
    subtitle: 'Build connected web applications.',
    text: 'Implement user interfaces, authentication, and database workflows. My personal full-stack projects include Bayanihan Link with React and Firebase, and PromptWise with Flutter and Supabase.',
    tags: ['React', 'Supabase', 'Firebase'],
    project: 'bayanihan-link',
    name: 'Bayanihan Link',
    nodes: ['Interface', 'Application logic', 'Services', 'Data'],
  },
  {
    title: 'Mobile applications',
    icon: Smartphone,
    subtitle: 'Develop Flutter mobile applications.',
    text: 'Build mobile interfaces for learning and productivity applications, including class schedules, academic tasks, prompt-writing practice, and learning progress.',
    tags: ['Flutter', 'Dart', 'Mobile UI'],
    project: 'autosched-ai',
    name: 'AutoSched AI',
    nodes: ['User input', 'Flutter', 'Cloud services', 'Your device'],
  },
  {
    title: 'AI-assisted systems',
    icon: Sparkles,
    subtitle: 'Integrate AI and OCR features.',
    text: 'Connect Google ML Kit, Groq, and Supabase Edge Functions to scheduling and learning workflows, with review steps for extracted or generated content.',
    tags: ['Edge Functions', 'Groq', 'ML Kit'],
    project: 'promptwise',
    name: 'PromptWise',
    nodes: ['Input', 'AI integration', 'Human review', 'Output'],
  },
  {
    title: 'Frontend & UI/UX',
    icon: Layers3,
    subtitle: 'Improve usability across web and mobile.',
    text: 'Develop responsive layouts, navigation, and guided user flows. My collaborative contributions focus on frontend development, UI/UX improvements, and selected supporting implementation.',
    tags: ['UI/UX', 'Responsive design', 'Collaboration'],
    project: 'carmelink',
    name: 'CarmeLink',
    nodes: ['Understand', 'Design', 'Prototype', 'Refine'],
  },
]
export function ExpertiseSection() {
  const [selected, setSelected] = useState(0)
  const active = expertise[selected]
  return (
    <section className="section container expertise-section">
      <SectionHeading
        number="04"
        label="WHAT I CAN CONTRIBUTE"
        title={
          <>
            What I bring to <em>your team.</em>
          </>
        }
      />
      <div className="expertise-layout">
        <Reveal className="expertise-tabs">
          <div role="tablist" aria-label="Explore expertise" aria-orientation="vertical">
            {expertise.map((item, index) => (
              <button
                key={item.title}
                id={`expertise-tab-${index}`}
                role="tab"
                aria-controls={`expertise-panel-${index}`}
                aria-selected={selected === index}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => {
                  const step = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0
                  if (step) {
                    event.preventDefault()
                    const next = (selected + step + expertise.length) % expertise.length
                    setSelected(next)
                    document.getElementById(`expertise-tab-${next}`)?.focus()
                  }
                }}
                className={selected === index ? 'expertise-tab active' : 'expertise-tab'}
              >
                <item.icon size={22} />
                <span>{item.title}</span>
                <span className="mono">0{index + 1}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <div
          className="expertise-panel"
          role="tabpanel"
          id={`expertise-panel-${selected}`}
          aria-labelledby={`expertise-tab-${selected}`}
          tabIndex={0}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="architecture-mini" aria-label="Conceptual workflow">
                {active.nodes.map((node, i) => (
                  <div key={node}>
                    <span className="architecture-node">
                      <active.icon size={i === 0 ? 24 : 17} />
                      <span>{node}</span>
                    </span>
                    {i < 3 && <span className="architecture-connector" />}
                  </div>
                ))}
              </div>
              <h3>{active.subtitle}</h3>
              <p>{active.text}</p>
              <div className="tag-list">
                {active.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link className="text-link" to={`/work/${active.project}`}>
                View {active.name} <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
