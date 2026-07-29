import { Link } from 'react-router-dom'
import { STRANDS } from '../data/studio.js'

/* The three Studio strands, carried across the top of each of their pages so a
   reader who arrived from the dropdown can move between them without going back
   up to the header. Same numbered-row form as the Story chapter rail, but these
   are routes rather than in-page anchors. */

export default function StrandRail({ current }) {
  return (
    <nav className="strands" aria-label="Studio Collection">
      <div className="container strands__inner">
        <ol className="strands__list">
          {STRANDS.map((s) => (
            <li key={s.key}>
              <Link
                to={s.to}
                className={`strands__link${current === s.key ? ' is-active' : ''}`}
                aria-current={current === s.key ? 'page' : undefined}
              >
                <span className="strands__no">{s.no}</span>
                <span className="strands__label">{s.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
