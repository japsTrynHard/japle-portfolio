import { useState } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
const posts = [
  {
    category: 'Jobs',
    title: 'Weekend shop assistant',
    text: 'A fictional neighborhood shop is looking for help organizing shelves. Sample opportunity only.',
    place: 'San Miguel · fictional post',
  },
  {
    category: 'Help',
    title: 'A few extra hands for a clean-up',
    text: 'A sample community clean-up invitation. No real event or registration is associated with this post.',
    place: 'San Miguel · fictional post',
  },
  {
    category: 'Emergency',
    title: 'Sample assistance request',
    text: 'Illustrative category preview only. This demo does not submit emergency reports or contact responders.',
    place: 'San Miguel · fictional post',
  },
  {
    category: 'Lost & Found',
    title: 'Found: a blue umbrella',
    text: 'An entirely fictional lost-and-found listing, included to demonstrate filtering.',
    place: 'San Miguel · fictional post',
  },
]
export function BayanihanDemo() {
  const [category, setCategory] = useState('All'),
    [expanded, setExpanded] = useState<string | null>(null)
  return (
    <div>
      <div className="demo-tabs" role="group" aria-label="Community feed categories">
        {['All', 'Jobs', 'Help', 'Emergency', 'Lost & Found'].map((item) => (
          <button
            key={item}
            className={category === item ? 'selected' : ''}
            aria-pressed={category === item}
            onClick={() => {
              setCategory(item)
              setExpanded(null)
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="demo-fine-print" aria-live="polite">
        {posts.filter((post) => category === 'All' || post.category === category).length} fictional
        posts
      </p>
      <div className="feed-posts">
        {posts
          .filter((post) => category === 'All' || post.category === category)
          .map((post) => (
            <article key={post.title}>
              <span className="feed-category">{post.category}</span>
              <h3>{post.title}</h3>
              <p>
                <MapPin size={12} />
                {post.place}
              </p>
              <button
                className="text-link"
                aria-expanded={expanded === post.title}
                onClick={() => setExpanded(expanded === post.title ? null : post.title)}
              >
                {expanded === post.title ? 'Close details' : 'Read sample post'}
                <ArrowUpRight size={15} />
              </button>
              {expanded === post.title && <div className="feed-detail">{post.text}</div>}
            </article>
          ))}
      </div>
    </div>
  )
}
