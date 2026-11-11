import { AnimatePresence, motion } from 'motion/react'
import { useProjectController } from '../../controllers/useProjectController'
import { projects } from '../../data/projects'
import { ProjectCard } from '../components/projects/ProjectCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import '../../styles/work-redesign.css'
export function ProjectsSection() {
  const controller = useProjectController()
  const reduced = useReducedMotion()
  return (
    <section id="projects" className="section container work-section">
      <SectionHeading
        number="02"
        label="SELECTED WORK"
        title={
          <>
            Projects and <em>contributions.</em>
          </>
        }
        text="Three personal full-stack applications and three team projects focused on frontend and UI/UX."
      >
        <span className="section-total">
          06 <span>PROJECTS</span>
        </span>
      </SectionHeading>
      <div className="work-filter-line">
        <div className="filter-bar" role="group" aria-label="Filter projects">
          {['All projects', 'Personal', 'Collaboration'].map((filter) => (
            <button
              key={filter}
              aria-pressed={filter === controller.filter}
              className={`filter-button ${filter === controller.filter ? 'selected' : ''}`}
              onClick={() => controller.setFilter(filter)}
            >
              {filter}
              {filter === 'All projects' && <span>06</span>}
            </button>
          ))}
        </div>
        <span className="work-filter-count" aria-live="polite">
          {String(controller.projects.length).padStart(2, '0')} / 06 projects
        </span>
      </div>
      <motion.div layout={!reduced} className="project-grid work-project-list">
        <AnimatePresence mode="popLayout">
          {controller.projects.map((project) => (
            <motion.div
              layout={!reduced}
              key={project.id}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
            >
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
