import { useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, HeartIcon } from './Icons.jsx'
import { Link } from 'react-router-dom'
import { PIECES } from '../data/catalogue.js'
import { productSlug } from '../data/product.js'

/* Most Loved — the curated grid's card, re-cut as a ranked rail.
   Cards keep the .piece footprint (3/4 media, serif name, swatches); what
   changes is the reading order: a running-stitch rule threads the rank
   numerals together and each piece carries how many were taken home. */

/* Real pieces, pulled from the catalogue by their store handle, so the rail
   can never advertise something the shop does not stock — and so a card opens
   the piece it shows. Picked one per collection rather than by price, because
   a ranking that is nine kanchli in a row tells you nothing about the range.
   The sold figures stand in until real ones exist. */

const PICKS = [
  ['kanchli-copy', 412, 'Reordered by 6 in 10 buyers'],
  ['green-hand-woven-top', 368, 'Handwoven, then cut in the atelier'],
  ['pakko-embroidered-divya-bag', 344, 'Our most gifted piece'],
  ['mashroo-pant', 291, 'Mashroo silk, woven in Bhuj'],
  ['shawl-copy-3', 268, 'Warm enough for a desert winter'],
  ['dress-copy-3', 233, 'Khadi, and it softens with every wash'],
  ['jat-garasiya-kunathiya-bag-1', 214, 'Jat Garasiya work, counted thread'],
  ['beige-hand-embroidered-kanchli-copy', 196, 'Three weeks of hand embroidery'],
  ['jat-garasiya-hand-embroidered-cushion-cover', 181, 'The easiest way to start'],
  ['ahir-batwa', 167, 'Ahir stitch, sells out every festive season'],
  ['hand-bag-copy-23', 152, 'Carried daily by half the studio'],
  ['jat-garasiya-mobile-pouch-1', 138, 'The one people buy in threes'],
]

const BEST = PICKS.map(([slug, sold, note], i) => {
  const piece = PIECES.find((p) => p.slug === slug)
  return { ...piece, rank: String(i + 1).padStart(2, '0'), sold, note }
})

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

      {/* Every card is a real piece, so it opens that piece. */}
      <div className="best__rail" ref={railRef} data-reveal-child>
        {BEST.map((p) => (
          <Link className="best-card" to={`/products/${productSlug(p)}`} key={p.slug}>
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
