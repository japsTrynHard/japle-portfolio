import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Globe, LockKeyhole } from 'lucide-react'
import { motion } from 'motion/react'
import { SiGithub } from 'react-icons/si'
import { getProject, getProjectMedia } from '../../services/projectService'
import { projects } from '../../data/projects'
import { useMetadata } from '../../hooks/useMetadata'
import { MediaView } from '../components/galleries/MediaView'
import { Gallery } from '../components/galleries/Gallery'
import { ProjectDemo } from '../components/projects/ProjectDemo'
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram'
import { Reveal } from '../components/animations/Reveal'
import { ExternalLink } from '../components/ui/ExternalLink'
import { ProjectCard } from '../components/projects/ProjectCard'
import NotFoundPage from './NotFoundPage'
export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  useMetadata(
    project ? `${project.name} — Japle Ligaya` : 'Project not found — Japle Ligaya',
    project?.overview ?? 'This project could not be found.',
  )
  const reduced = useReducedMotion()
  if (!project) return <NotFoundPage />
  const index = projects.indexOf(project),
    next = projects[(index + 1) % projects.length]
  return (
    <article className="case-study" key={project.id}>
      <section className="case-hero container">
        <Link to="/#projects" className="text-link case-back">
          <ArrowLeft size={16} /> Back to all work
        </Link>
        <div className="case-hero-top">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="eyebrow">
              CASE STUDY / 0{index + 1} <span>— {project.kind.toUpperCase()}</span>
            </p>
            <h1>
              {project.name}
              <span className="wordmark-dot">.</span>
            </h1>
            <p className="case-tagline">{project.tagline}</p>
          </motion.div>
          <span className="case-hero-index">
            0{index + 1}
            <ArrowUpRight size={45} />
          </span>
        </div>
        <p className="case-full-title">{project.title}</p>
        <div className="case-meta">
          <div>
            <span className="mono">MY ROLE</span>
            <strong>{project.role}</strong>
          </div>
          <div>
            <span className="mono">DISCIPLINE</span>
            <strong>{project.category}</strong>
          </div>
          <div className="case-links">
            {project.github ? (
              <ExternalLink className="button secondary" href={project.github}>
                <SiGithub size={16} /> Source <ArrowUpRight size={14} />
              </ExternalLink>
            ) : (
              <span className="private-source">
                <LockKeyhole size={14} /> Private repository
              </span>
            )}
            {project.live && (
              <ExternalLink className="button primary" href={project.live}>
                <Globe size={16} /> Visit live <ArrowUpRight size={14} />
              </ExternalLink>
            )}
          </div>
        </div>
        <Reveal direction="scale">
          <div className="case-main-cover">
            <MediaView
              project={project}
              media={getProjectMedia(project.id)[0]}
              active
              previewOnly
            />
          </div>
        </Reveal>
      </section>
      <section className="case-section container">
        <div className="case-section-label">
          <span className="eyebrow">01 / PROJECT OVERVIEW</span>
          <h2>
            Project
            <br />
            <em>overview.</em>
          </h2>
        </div>
        <div className="case-prose">
          <Reveal>
            <p className="large-copy">{project.overview}</p>
            <h3>Intended users</h3>
            <p>{project.users}</p>
            <div className="problem-solution">
              <div>
                <span className="mono">THE PROBLEM</span>
                <p>{project.problem}</p>
              </div>
              <div>
                <span className="mono">THE APPROACH</span>
                <p>{project.solution}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="case-section container">
        <div className="case-section-label">
          <span className="eyebrow">02 / FEATURES</span>
          <h2>
            Features
            <br />
            <em>and workflow.</em>
          </h2>
          <p className="muted">
            {project.kind === 'Collaboration'
              ? 'Team application capabilities. My contributions are listed below.'
              : 'Core application features.'}
          </p>
        </div>
        <div className="case-prose">
          <Reveal>
            <div className="feature-list">
              {project.features.map((feature) => (
                <div key={feature}>
                  <Check size={17} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="case-workflow">
              {project.workflow.map((step, i) => (
                <div key={step}>
                  <span className="mono">0{i + 1}</span>
                  <strong>{step}</strong>
                  {i < project.workflow.length - 1 && <ArrowRight size={18} />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="case-wide-section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">03 / ARCHITECTURE</p>
            <h2>
              System <em>architecture.</em>
            </h2>
            <p className="section-intro">
              High-level application architecture. Service relationships are simplified.
            </p>
          </Reveal>
          <ArchitectureDiagram nodes={project.architecture} />
          <div className="tag-list case-stack">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="section container case-gallery-section">
        <Reveal>
          <p className="eyebrow">04 / APPLICATION INTERFACES</p>
          <div className="case-gallery-heading">
            <h2>
              Application
              <br />
              <em>screenshots.</em>
            </h2>
            <p className="section-intro">
              {getProjectMedia(project.id).some((media) => media.type !== 'cover')
                ? 'Screenshots from the application. Open a screen in full view to inspect the interface.'
                : 'Original animated project artwork is shown where authentic media has not been added. Illustrations are not application screenshots.'}
            </p>
          </div>
        </Reveal>
        <Reveal direction="scale">
          <Gallery projects={[project]} />
        </Reveal>
      </section>
      <section className="section container">
        <Reveal>
          <p className="eyebrow">05 / FUNCTIONAL PREVIEW</p>
          <h2>
            Interactive
            <br />
            <em>demo.</em>
          </h2>
          <p className="section-intro demo-intro">
            An original portfolio demonstration inspired by the project. All data is fictional; it
            runs in your browser without production services.
          </p>
        </Reveal>
        <Reveal>
          <ProjectDemo id={project.id} />
        </Reveal>
      </section>
      <section className="case-section container">
        <div className="case-section-label">
          <span className="eyebrow">06 / MY CONTRIBUTION</span>
          <h2>
            My role
            <br />
            <em>and contributions.</em>
          </h2>
        </div>
        <div className="case-prose">
          <Reveal>
            <h3>{project.role}</h3>
            <ul className="contribution-list">
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>Engineering considerations</h3>
            <p>{project.challenge}</p>
            <h3>Project outcome</h3>
            <p>{project.outcome}</p>
            <div className="limitations">
              <span className="eyebrow">SCOPE & LIMITATIONS</span>
              <p>{project.limitations}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section container related-section">
        <p className="eyebrow">RELATED WORK</p>
        <h2>
          Related <em>projects.</em>
        </h2>
        <div className="project-grid">
          {[next, projects[(index + 2) % projects.length]].map((item) => (
            <ProjectCard key={item.id} project={item} index={projects.indexOf(item)} />
          ))}
        </div>
      </section>
      <Link to={`/work/${next.id}`} className="next-project">
        <div className="container">
          <span className="eyebrow">UP NEXT / 0{projects.indexOf(next) + 1}</span>
          <span className="next-project-name">
            {next.name}
            <ArrowUpRight />
          </span>
          <span>{next.tagline}</span>
        </div>
      </Link>
    </article>
  )
}
