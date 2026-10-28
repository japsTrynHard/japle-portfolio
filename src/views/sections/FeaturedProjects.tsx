import { projects } from '../../data/projects'
import { Gallery } from '../components/galleries/Gallery'
import { Reveal } from '../components/animations/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
export function FeaturedProjects() {
  return (
    <section id="featured" className="section container">
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
      <Reveal direction="scale">
        <Gallery projects={projects} featured />
      </Reveal>
    </section>
  )
}
