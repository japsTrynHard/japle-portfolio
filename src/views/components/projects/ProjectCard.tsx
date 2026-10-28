import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { Project } from '../../../models/Project'
import { getProjectMedia } from '../../../services/projectService'
import { MediaView } from '../galleries/MediaView'
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 170, damping: 23 }),
    rotateY = useSpring(y, { stiffness: 170, damping: 23 })
  const reduced = useReducedMotion()
  return (
    <motion.article
      className="project-card"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      <Link
        data-cursor="view"
        ref={ref}
        to={`/work/${project.id}`}
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== 'mouse') return
          const rect = event.currentTarget.getBoundingClientRect()
          x.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5)
          y.set(((event.clientX - rect.left) / rect.width - 0.5) * 5)
        }}
        onPointerLeave={() => {
          x.set(0)
          y.set(0)
        }}
      >
        <div className="project-card-media">
          <MediaView media={getProjectMedia(project.id)[0]} project={project} previewOnly />
          <span className="project-open">
            <ArrowUpRight size={22} />
          </span>
        </div>
        <div className="project-card-heading">
          <h3>{project.name}</h3>
          <span className="mono">0{index + 1}</span>
        </div>
        <p>{project.tagline}</p>
        <div className="project-card-bottom">
          <span>{project.category}</span>
          <span className="project-kind">{project.kind}</span>
        </div>
      </Link>
    </motion.article>
  )
}
