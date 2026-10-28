import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
export default function NotFoundPage() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404 / PAGE NOT FOUND</span>
      <h1>
        Page
        <br />
        <em>not found.</em>
      </h1>
      <p>The requested page is unavailable. Return to the homepage to view my projects.</p>
      <Link className="button primary" to="/#home">
        <ArrowLeft size={16} /> Back home
      </Link>
    </section>
  )
}
