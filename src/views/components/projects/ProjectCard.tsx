import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { Project } from '../../../models/Project'
import { getProjectMedia } from '../../../services/projectService'
import { MediaView } from '../galleries/MediaView'
import '../../../styles/work-redesign.css'
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 170, damping: 23 }),
    rotateY = useSpring(y, { stiffness: 170, damping: 23 })
  const reduced = useReducedMotion()
  return (
    <article className={`project-card work-entry work-entry-${index % 2 ? 'reverse' : 'forward'}`}>
      <Link
        data-cursor="view"
        to={`/work/${project.id}`}
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== 'mouse') return
          const rect = event.currentTarget.getBoundingClientRect()
          x.set(-((event.clientY - rect.top) / rect.height - 0.5) * 2)
          y.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
        }}
        onPointerLeave={() => {
          x.set(0)
          y.set(0)
        }}
      >
        <motion.div
          className="project-card-media work-entry-media"
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
        >
          <div className="work-media-topbar" aria-hidden="true">
            <span className="work-media-lights">
              <i />
              <i />
              <i />
            </span>
            <span>{project.id} / application preview</span>
            <span>↗</span>
          </div>
          <MediaView media={getProjectMedia(project.id)[0]} project={project} previewOnly />
          <span className="work-media-caption">
            <span>APPLICATION PREVIEW</span>
            <span>{project.stack[0]}</span>
          </span>
        </motion.div>
        <div className="work-entry-copy">
          <div className="work-entry-kicker">
            <span className="work-entry-index">{String(index + 1).padStart(2, '0')}</span>
            <span>
              {project.kind === 'Personal' ? 'PERSONAL APPLICATION' : 'TEAM CONTRIBUTION'}
            </span>
          </div>
          <div className="project-card-heading">
            <h3>{project.name}</h3>
          </div>
          <p className="work-entry-tagline">{project.tagline}</p>
          <div className="work-entry-role">
            <span>MY ROLE</span>
            <strong>{project.role}</strong>
          </div>
          <div className="work-entry-stack" aria-label="Project technologies">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-card-bottom">
            <span className="work-entry-cta">
              View case study <ArrowUpRight size={17} />
            </span>
            <span className="project-kind">{project.kind}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
