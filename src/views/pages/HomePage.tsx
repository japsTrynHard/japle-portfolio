import { lazy, Suspense, useEffect } from 'react'
import { useMetadata } from '../../hooks/useMetadata'
import { HeroSection } from '../sections/HeroSection'
import { FeaturedProjects } from '../sections/FeaturedProjects'
import { ProjectsSection } from '../sections/ProjectsSection'
import { TechnologiesSection } from '../sections/TechnologiesSection'
import { ExpertiseSection } from '../sections/ExpertiseSection'
const AboutSection = lazy(() =>
  import('../sections/AboutSection').then((module) => ({ default: module.AboutSection })),
)
import { JourneySection } from '../sections/JourneySection'
import { ResumeSection } from '../sections/ResumeSection'
import { ContactSection } from '../sections/ContactSection'
export default function HomePage() {
  useMetadata(
    'Japle Ligaya — Full-Stack & Mobile Developer',
    'Japle Ligaya: full-stack and mobile developer seeking a software development internship. Review my React and Flutter projects, technical skills, and contributions.',
  )
  useEffect(() => {
    const hash = window.location.hash
    if (hash)
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' }),
      )
  }, [])
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <ProjectsSection />
      <TechnologiesSection />
      <ExpertiseSection />
      <Suspense
        fallback={
          <section className="section container" id="about">
            <p className="eyebrow">DEVELOPER PROFILE</p>
            <h2>
              Development <em>experience.</em>
            </h2>
          </section>
        }
      >
        <AboutSection />
      </Suspense>
      <JourneySection />
      <ResumeSection />
      <ContactSection />
    </>
  )
}
