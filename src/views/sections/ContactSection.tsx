import { useId, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { SiFacebook, SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { motion } from 'motion/react'
import { contactLinks, email } from '../../data/contactLinks'
import { Magnetic } from '../components/animations/Magnetic'
import { Reveal } from '../components/animations/Reveal'
import { ExternalLink } from '../components/ui/ExternalLink'
const icons = {
  mail: Mail,
  github: SiGithub,
  linkedin: FaLinkedinIn,
  instagram: SiInstagram,
  facebook: SiFacebook,
}
export function ContactSection() {
  const instagramGradientId = useId()
  const [copyState, setCopyState] = useState('Copy email')
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopyState('Email copied!')
    } catch {
      setCopyState('Select the email to copy it')
    }
  }
  return (
    <section id="contact" className="section container contact-section">
      <svg width="0" height="0" className="social-icon-defs" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={instagramGradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="25%" stopColor="#fa7e1e" />
            <stop offset="50%" stopColor="#d62976" />
            <stop offset="75%" stopColor="#962fbf" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
      </svg>
      <Reveal>
        <p className="eyebrow">
          <span>08 /</span> INTERNSHIP & ENTRY-LEVEL OPPORTUNITIES
        </p>
        <div className="contact-heading">
          <h2>
            Contact <em>me.</em>
            <span>↗</span>
          </h2>
          <svg
            className="paper-plane"
            viewBox="0 0 230 140"
            fill="none"
            aria-label="Hand-drawn paper plane"
            role="img"
          >
            <motion.path
              d="M8 116C72 140 85 61 51 75C13 89 74 146 126 90L162 56"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.7 }}
            />
            <g
              className="plane-body"
              stroke="var(--highlight)"
              strokeWidth="2"
              strokeLinejoin="round"
            >
              <path d="M139 39L212 13L190 83L175 54L139 39Z" fill="var(--bg)" />
              <path d="M175 54L212 13L165 67L163 49M165 67L176 58" />
            </g>
          </svg>
        </div>
        <p className="contact-intro">
          Looking for a developer with hands-on React and Flutter project experience? Contact me to
          discuss software development internships or entry-level opportunities.
        </p>
      </Reveal>
      <div className="contact-grid">
        {contactLinks.map((contact, index) => {
          const Icon = icons[contact.icon as keyof typeof icons]
          return (
            <Reveal
              key={contact.label}
              delay={index * 0.06}
              className={index === 0 ? 'contact-email-wrap' : ''}
            >
              <Magnetic>
                <ExternalLink
                  href={contact.href}
                  className={`contact-card ${index === 0 ? 'email-card' : ''}`}
                >
                  <span className="contact-card-icon" data-social={contact.icon} aria-hidden="true">
                    <Icon
                      size={23}
                      style={
                        contact.icon === 'instagram'
                          ? { fill: `url(#${instagramGradientId})` }
                          : undefined
                      }
                    />
                  </span>
                  <div>
                    <span className="mono">
                      {index === 0 ? 'EMAIL FOR OPPORTUNITIES' : contact.handle}
                    </span>
                    <h3>{index === 0 ? email : contact.label}</h3>
                  </div>
                  <ArrowUpRight className="contact-arrow" size={22} />
                </ExternalLink>
              </Magnetic>
              {index === 0 && (
                <button className="copy-email" onClick={copyEmail} aria-live="polite">
                  {copyState === 'Email copied!' ? <Check size={14} /> : <Copy size={14} />}{' '}
                  {copyState}
                </button>
              )}
            </Reveal>
          )
        })}
      </div>
      <div className="contact-closing">
        <span className="status-dot" />
        <span>Seeking opportunities to contribute to a software development team.</span>
      </div>
    </section>
  )
}
