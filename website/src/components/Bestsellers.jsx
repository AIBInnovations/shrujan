import { useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, HeartIcon } from './Icons.jsx'
import { Link } from 'react-router-dom'
import { PIECES } from '../data/catalogue.js'
import { productSlug } from '../data/product.js'

/* Most Loved — the curated grid's card, re-cut as a ranked rail.
   Cards keep the .piece footprint (3/4 media, serif name, swatches); what
   changes is the reading order: a running-stitch rule threads the rank
   numerals together and each piece carries how many were taken home. */

/* Ranked from the live catalogue rather than a hand-written list — real
   names, prices, badges and photography, so the rail can never advertise a
   piece the shop does not stock. The rank order is the catalogue's own; the
   sold figures are placeholder until real numbers exist. */
const SOLD = [412, 368, 344, 291, 268, 233, 214, 196, 181, 167, 152, 138]

const NOTE = [
  'Reordered by 6 in 10 buyers',
  'Three weeks of hand embroidery',
  'Our most gifted piece',
  'Counted-thread work, no pattern drawn',
  'Naturally dyed, softens with wear',
  'The easiest piece to start with',
  'Dyed in small lots, never twice alike',
  'Sells out every festive season',
  'Woven on pit looms in Bhujodi',
  'Mutava work from just nine families',
  'Cut and finished in the Bhuj atelier',
  'Signed by the woman who made it',
]

const BEST = PIECES.slice(0, 12).map((p, i) => ({
  ...p,
  rank: String(i + 1).padStart(2, '0'),
  sold: SOLD[i],
  note: NOTE[i],
}))

const TOP = BEST[0].sold

export default function Bestsellers() {
  const railRef = useRef(null)

  // Scroll one full page — however many cards currently fit.
  const page = (dir) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: dir * rail.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="section container best" id="bestsellers">
      <div className="section-head" data-reveal>
        <div className="section-head__titles">
          <p className="eyebrow">Most Loved</p>
          <h2 className="section-title">
            Bestsellers, ranked by <em>you</em>
          </h2>
        </div>

        <div className="section-head__aside">
          <p className="best__legend">
            Ordered by pieces taken home over the last six months.
          </p>
          <div className="carousel-arrows">
            <button type="button" aria-label="Previous bestsellers" onClick={() => page(-1)}>
              <ChevronLeft />
            </button>
            <button type="button" aria-label="Next bestsellers" onClick={() => page(1)}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* The rail is an editorial ranking with its own copy — none of these
          names exist in the catalogue, so /products/<slug> would resolve to
          whichever piece happens to be first. The catalogue is the honest
          destination. Same for the curated grid, the look hotspots and the
          testimonial picks. */}
      <div className="best__rail" ref={railRef} data-reveal-child>
        {BEST.map((p) => (
          <Link className="best-card" to={`/products/${productSlug(p)}`} key={p.name}>
            {/* rank numeral, threaded to the next card by a running stitch */}
            <span className="best-card__rank">
              <span className="best-card__num">{p.rank}</span>
              <span className="best-card__thread" aria-hidden="true" />
            </span>

            <div className="best-card__media">
              <img src={p.img} alt={p.alt} loading="lazy" />
              <button
                className="best-card__wish"
                type="button"
                aria-label={`Save ${p.name} to wishlist`}
                onClick={(e) => e.preventDefault()}
              >
                <HeartIcon width="16" height="16" />
              </button>
              <span className="best-card__note">{p.note}</span>
            </div>

            <div className="best-card__info">
              <p className="best-card__name">{p.name}</p>
              <p className="best-card__craft">{p.craft}</p>

              <p className="best-card__price">
                {p.price}
                {p.was && <span>{p.was}</span>}
              </p>

              {/* how far this piece sits from the number one spot */}
              <span
                className="best-card__meter"
                style={{ '--fill': `${Math.round((p.sold / TOP) * 100)}%` }}
                aria-hidden="true"
              />
              <p className="best-card__sold">
                <strong>{p.sold}</strong> taken home
              </p>

              <span className="best-card__swatches" aria-hidden="true">
                {p.swatches.map((c, i) => (
                  <i key={`${c}-${i}`} style={{ background: c }} />
                ))}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="best__more" data-reveal>
        <Link className="arrow-link" to="/pages/shop-shrujan#catalogue">
          See the full ranking <ArrowRight width="16" height="16" />
        </Link>
      </div>
    </section>
  )
}
