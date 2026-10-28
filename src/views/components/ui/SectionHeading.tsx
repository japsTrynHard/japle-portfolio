import type { ReactNode } from 'react'
import { Reveal } from '../animations/Reveal'
export function SectionHeading({
  number,
  label,
  title,
  text,
  children,
}: {
  number: string
  label: string
  title: ReactNode
  text?: string
  children?: ReactNode
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number} /</span> {label}
        </p>
        <h2>{title}</h2>
        {text && <p className="section-intro">{text}</p>}
      </div>
      {children}
    </Reveal>
  )
}
