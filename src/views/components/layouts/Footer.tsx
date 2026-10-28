import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { VisitorStats } from '../ui/VisitorStats'
import { ExternalLink } from '../ui/ExternalLink'
export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link className="wordmark" to="/#home">
          japle<span className="wordmark-dot">.dev</span>
        </Link>
        <p>Full-Stack Web & Mobile Developer</p>
        <Link to="/#home" className="text-link">
          Back to top <ArrowUp size={16} />
        </Link>
      </div>
      <VisitorStats />
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Japle A. Ligaya</span>
        <span>React · Flutter · Supabase · Firebase</span>
        <ExternalLink href="https://github.com/japsTrynHard">
          GitHub <ArrowUpRight size={13} />
        </ExternalLink>
      </div>
    </footer>
  )
}
