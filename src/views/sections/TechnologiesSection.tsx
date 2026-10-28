import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTechnologyController } from '../../controllers/useTechnologyController'
import { technologyCategories } from '../../data/technologies'
import { getProject } from '../../services/projectService'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TechnologyIcon } from '../components/technologies/TechnologyIcon'
export function TechnologiesSection() {
  const controller = useTechnologyController()
  return (
    <section id="technologies" className="section technologies-section">
      <div className="container">
        <SectionHeading
          number="03"
          label="TECHNOLOGIES"
          title={
            <>
              Technical <em>skills.</em>
            </>
          }
          text="Technologies I have used or explored. Select a tool to review related projects."
        >
          <div className="toolkit-doodle" aria-hidden="true">
            {'</>'}
            <svg viewBox="0 0 150 50">
              <path d="M3 25Q56 3 142 25L130 10M142 25L122 34" />
            </svg>
          </div>
        </SectionHeading>
        <div className="filter-bar wrap" role="group" aria-label="Technology categories">
          {['All tools', ...technologyCategories].map((category) => (
            <button
              key={category}
              className={`filter-button ${category === controller.category ? 'selected' : ''}`}
              aria-pressed={category === controller.category}
              onClick={() => controller.setCategory(category)}
            >
              {category}
              {category === 'All tools' && <span>35</span>}
            </button>
          ))}
        </div>
        <motion.div layout className="technology-badges">
          <AnimatePresence mode="popLayout">
            {controller.technologies.map((technology, index) => (
              <motion.button
                layout
                key={technology.name}
                className={`technology-badge ${technology.name === controller.selected ? 'selected' : ''}`}
                aria-pressed={technology.name === controller.selected}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.015, 0.25) }}
                onClick={() =>
                  controller.setSelected(
                    technology.name === controller.selected ? null : technology.name,
                  )
                }
              >
                <TechnologyIcon name={technology.icon} />
                {technology.name}
                <span className="badge-plus">+</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {controller.active && (
            <motion.div
              className="technology-detail"
              role="region"
              aria-label={`${controller.active.name} related projects`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div>
                <span className="eyebrow">{controller.active.category}</span>
                <h3>{controller.active.name}</h3>
                {controller.active.projects.length ? (
                  <p>Related project experience.</p>
                ) : (
                  <p>{controller.active.description}</p>
                )}
              </div>
              <div className="related-tech-projects">
                {controller.active.projects.map((id) => {
                  const project = getProject(id)
                  return (
                    project && (
                      <Link key={id} to={`/work/${id}`}>
                        {project.name}
                        <ArrowUpRight size={16} />
                      </Link>
                    )
                  )
                })}
              </div>
              <button
                className="icon-button"
                aria-label="Close technology details"
                onClick={() => controller.setSelected(null)}
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="section-footnote mono">
          <span className="status-dot" /> Select a technology to view related projects.
        </p>
      </div>
    </section>
  )
}
