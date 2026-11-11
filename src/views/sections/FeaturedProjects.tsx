import { projects } from '../../data/projects'
import { Gallery } from '../components/galleries/Gallery'
import { Reveal } from '../components/animations/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import '../../styles/work-redesign.css'
export function FeaturedProjects() {
  return (
    <section id="featured" className="section container work-spotlight">
      <SectionHeading
        number="01"
        label="PROJECT EXPERIENCE"
        title={
          <>
            Featured <em>projects.</em>
          </>
        }
        text="Review my applications, technology choices, and individual contributions."
      >
        <span className="section-note mono">WEB · MOBILE · AI INTEGRATION</span>
      </SectionHeading>
      <Reveal direction="scale" className="work-spotlight-stage">
        <Gallery projects={projects} featured />
      </Reveal>
      <div className="work-spotlight-footer">
        <span>REAL INTERFACES. INDIVIDUAL CONTRIBUTIONS.</span>
        <a href="#projects">
          Explore all six projects <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
