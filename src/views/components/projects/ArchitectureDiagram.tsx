import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { ArrowRight, Layers3 } from 'lucide-react'
import { motion } from 'motion/react'
export function ArchitectureDiagram({ nodes }: { nodes: string[] }) {
  const reduced = useReducedMotion()
  return (
    <div className="system-diagram" aria-label="Conceptual system architecture">
      {nodes.map((node, index) => (
        <div className="system-diagram-item" key={node}>
          <motion.div
            className="system-node"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Layers3 size={23} />
            <span className="mono">0{index + 1}</span>
            <strong>{node}</strong>
          </motion.div>
          {index < nodes.length - 1 && (
            <span className="system-connector">
              <svg viewBox="0 0 80 16" aria-hidden="true">
                <path d="M0 8H78" />
                <circle className="connection-dot" cx="5" cy="8" r="3" />
              </svg>
              <ArrowRight size={16} />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
