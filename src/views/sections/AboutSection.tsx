import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, GraduationCap, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { Reveal } from '../components/animations/Reveal'
gsap.registerPlugin(ScrollTrigger)
export function AboutSection() {
  const section = useRef<HTMLElement>(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          '.story-word',
          { opacity: 0.55 },
          {
            opacity: 1,
            stagger: 0.13,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-statement',
              start: 'top 83%',
              end: 'bottom 48%',
              scrub: 0.5,
            },
          },
        )
        ScrollTrigger.create({
          trigger: '.about-layout',
          start: 'top 135px',
          end: () => {
            const layout = section.current?.querySelector<HTMLElement>('.about-layout')
            const visual = section.current?.querySelector<HTMLElement>('.about-visual')
            const room =
              layout && visual
                ? layout.offsetHeight -
                  parseFloat(getComputedStyle(layout).paddingTop) -
                  visual.offsetHeight
                : 0
            return `+=${Math.max(1, room)}`
          },
          pin: '.about-visual',
          pinSpacing: false,
          invalidateOnRefresh: true,
        })
      }, section)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  return (
    <section id="about" className="section about-section" ref={section}>
      <div className="container">
        <p className="eyebrow">
          <span>05 /</span> DEVELOPER PROFILE
        </p>
        <div className="about-layout">
          <div className="about-visual">
            <div className="portrait-composition">
              <div className="portrait-main">
                <img
                  src="/images/profile/japle-professional.webp"
                  alt="Japle Ligaya wearing a black blazer and National University lanyard"
                  width="431"
                  height="575"
                  loading="lazy"
                />
                <span className="portrait-name">
                  Japle A. Ligaya<span>WEB + MOBILE</span>
                </span>
              </div>
              <div className="portrait-candid">
                <img
                  src="/images/profile/japle-casual.webp"
                  alt="A casual portrait of Japle in a black hoodie"
                  width="1100"
                  height="1467"
                  loading="lazy"
                />
                <span>Personal photo</span>
              </div>
              <span className="portrait-spark" aria-hidden="true">
                ✳
              </span>
              <span className="portrait-note mono">WEB + MOBILE DEVELOPMENT</span>
            </div>
            <p className="profile-caption">
              Available for software development internship opportunities.
            </p>
          </div>
          <div className="about-copy">
            <h2 className="about-statement">
              {'Hands-on experience in application development and team projects.'
                .split(' ')
                .map((word, i) => (
                  <span className="story-word" key={i}>
                    {word}{' '}
                  </span>
                ))}
            </h2>
            <Reveal>
              <p>{profile.introduction}</p>
              <p>
                My personal projects cover frontend and backend development. In team projects, I
                contribute frontend interfaces, navigation, responsive layouts, and selected
                supporting features. Each case study explains my role and the technologies involved.
              </p>
              <div className="about-facts">
                <div>
                  <GraduationCap size={20} />
                  <span>
                    Information Technology
                    <br />
                    <strong>{profile.education}</strong>
                  </span>
                </div>
                <div>
                  <MapPin size={20} />
                  <span>
                    Based in the Philippines
                    <br />
                    <strong>San Miguel, Bulacan</strong>
                  </span>
                </div>
              </div>
              <a className="text-link" href="#resume">
                Review my resume <ArrowUpRight size={18} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
