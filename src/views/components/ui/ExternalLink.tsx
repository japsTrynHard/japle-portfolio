import type { ReactNode } from 'react'
export function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={className}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
