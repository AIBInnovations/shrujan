import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons.jsx'
import { MAKES, BAGS } from '../data/catalogue.js'

/* Everything the same hands make, in a bento that echoes the hero. The full
   range, clothing included — the wardrobe band higher up the page is a
   shortcut into part of this, not a separate list. */

export default function House() {
  return (
    <section className="section container house" id="house">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Everything Shrujan makes</p>
        <h2 className="section-title">
          What Shrujan has <em>mastered</em>
        </h2>
        <p className="section-intro__copy">
          The same counted stitches, worked into what you wear, what you carry and
          the cloth that dresses the house.
        </p>
      </div>

      {/* no data-reveal-child: these tiles stay put rather than
          staggering in on scroll */}
      <div className="house__grid">
        {MAKES.map((c) => (
          <Link
            className="house-tile"
            to={`/pages/shop-shrujan?c=${c.key}`}
            key={c.key}
          >
            <img src={c.img} alt={c.alt} loading="lazy" />
            <span className="house-tile__scrim" aria-hidden="true" />
            {/* no piece count: it dates the tile the moment stock moves, and
                the number was the weakest thing in the caption anyway */}
            <span className="house-tile__body">
              <span className="house-tile__name">{c.name}</span>
              <span className="house-tile__note">{c.copy}</span>
            </span>
            <span className="house-tile__arrow" aria-hidden="true">
              <ArrowRight width="16" height="16" />
            </span>
          </Link>
        ))}
      </div>

      {/* the bag sub-collections, gathered on one line under the grid */}
      <div className="house__strip" data-reveal>
        <span className="house__strip-label">All bags</span>
        <ul className="house__strip-links">
          {BAGS.map((b) => (
            <li key={b.key}>
              <Link to={`/pages/shop-shrujan?c=${b.key}`}>
                {b.name} <ArrowRight width="13" height="13" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
