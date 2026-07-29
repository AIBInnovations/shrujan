import { useState } from 'react'
import { ArrowRight, HeartIcon } from './Icons.jsx'
import { PIECES } from '../data/catalogue.js'
import { Link } from 'react-router-dom'

const FILTERS = ['All', 'Bridal', 'Festive', 'Everyday', 'Gifting']

const PROMISES = [
  { title: 'Complimentary shipping', copy: 'On every order above ₹5,000' },
  { title: '14-day easy returns', copy: 'Unworn pieces, tags intact' },
  { title: 'Signed by the artisan', copy: 'Every piece carries her name' },
  { title: 'Made to measure', copy: 'Free alterations on request' },
]

export default function Trousseau() {
  const [filter, setFilter] = useState('All')

  const shown = (filter === 'All' ? PIECES : PIECES.filter((p) => p.tag === filter)).slice(0, 5)

  return (
    <section className="section container" id="curated">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Handpicked for you</p>
        <h2 className="section-title">Curated pieces, chosen with care</h2>
        <p className="section-intro__copy">
          Timeless silhouettes, handcrafted details, edited by our Bhuj studio for the
          moments that matter.
        </p>
      </div>

      {/* ---- occasion filters ---- */}
      <div className="curated__filters" data-reveal role="tablist" aria-label="Filter by occasion">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={`curated__filter${filter === f ? ' is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ---- product grid ---- */}
      <div className="curated__grid" data-reveal-child key={filter}>
        {shown.map((p) => (
          <Link className="piece" to="/pages/shop-shrujan#catalogue" key={p.name}>
            <div className="piece__media">
              <img src={p.img} alt={p.alt} loading="lazy" />
              {p.badge && <span className="piece__badge">{p.badge}</span>}
              <button
                className="piece__wish"
                type="button"
                aria-label={`Save ${p.name} to wishlist`}
                onClick={(e) => e.preventDefault()}
              >
                <HeartIcon width="16" height="16" />
              </button>
              <span className="piece__quick">Add to bag</span>
            </div>

            <div className="piece__info">
              <p className="piece__name">{p.name}</p>
              <p className="piece__craft">{p.craft}</p>
              <p className="piece__price">
                {p.price}
                {p.was && <span>{p.was}</span>}
              </p>
              <span className="piece__swatches" aria-hidden="true">
                {p.swatches.map((c, i) => (
                  <i key={`${c}-${i}`} style={{ background: c }} />
                ))}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="curated__more" data-reveal>
        <Link className="btn btn--ghost" to="/pages/shop-shrujan#catalogue">
          View the full edit <ArrowRight width="16" height="16" />
        </Link>
      </div>

      {/* ---- promises ---- */}
      <div className="curated__promises" data-reveal-child>
        {PROMISES.map((p) => (
          <div className="promise" key={p.title}>
            <p className="promise__title">{p.title}</p>
            <p className="promise__copy">{p.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
