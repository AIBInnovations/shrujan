import { useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, HeartIcon } from './Icons.jsx'

/* Most Loved — the curated grid's card, re-cut as a ranked rail.
   Cards keep the .piece footprint (3/4 media, serif name, swatches); what
   changes is the reading order: a running-stitch rule threads the rank
   numerals together and each piece carries how many were taken home. */

const BEST = [
  {
    rank: '01',
    name: 'Kora Silk Banarasi Sari',
    craft: 'Handloom · Varanasi',
    price: '₹ 24,800',
    was: null,
    sold: 412,
    note: 'Reordered by 6 in 10 buyers',
    swatches: ['#b23127', '#7d1f45', '#c7a56a'],
    img: '/cat-c1.png',
    alt: 'Model in a maroon silk sari with gold zari embroidery',
  },
  {
    rank: '02',
    name: 'Silver Suf Jacket',
    craft: 'Suf · Bhuj atelier',
    price: '₹ 24,200',
    was: null,
    sold: 368,
    note: 'Three weeks of hand embroidery',
    swatches: ['#c7a56a', '#f2ede0', '#75665f'],
    img: '/frame-r3t16.jpg',
    alt: 'Model in a silver-grey Suf embroidered jacket',
  },
  {
    rank: '03',
    name: 'Chikankari Kurta Set',
    craft: 'Chikankari · Lucknow',
    price: '₹ 16,500',
    was: '₹ 18,900',
    sold: 344,
    note: 'Our most gifted festive set',
    swatches: ['#f2ede0', '#cfd6c3', '#e8cfc4'],
    img: '/cat-c5.png',
    alt: 'Model in an ivory kurta with a maroon embroidered dupatta',
  },
  {
    rank: '04',
    name: 'Bridal Mirror Odhani',
    craft: 'Aabhla · Kutch',
    price: '₹ 12,900',
    was: '₹ 14,500',
    sold: 291,
    note: 'Worn by 200+ brides this season',
    swatches: ['#8d2f26', '#c7a56a', '#3b2434'],
    img: '/cta-sarree.png',
    alt: 'Model in a crimson hand-embroidered bridal sari',
  },
  {
    rank: '05',
    name: 'Ajrakh Cotton Kurta',
    craft: 'Block print · Ajrakhpur',
    price: '₹ 4,900',
    was: '₹ 5,800',
    sold: 268,
    note: 'Naturally dyed, softens with wear',
    swatches: ['#8d2f26', '#2b3d63', '#75665f'],
    img: '/hero-left.png',
    alt: 'Model in a rust-red ajrakh kurta with gold jewellery',
  },
  {
    rank: '06',
    name: 'Turquoise Stole',
    craft: 'Kutchi hand-embroidery',
    price: '₹ 2,400',
    was: null,
    sold: 233,
    note: 'The easiest piece to start with',
    swatches: ['#b23127', '#c7a56a', '#2f6b52'],
    img: '/frame-r5t15.jpg',
    alt: 'Close crop of turquoise Kutchi mirror-work embroidery',
  },
  {
    rank: '07',
    name: 'Violet Kutchi Sari',
    craft: 'Kutchi hand-embroidery',
    price: '₹ 21,300',
    was: null,
    sold: 214,
    note: 'Dyed in small lots, never twice alike',
    swatches: ['#4a2050', '#b23127', '#c7a56a'],
    img: '/frame-r5t25.jpg',
    alt: 'Model in a violet hand-embroidered Kutchi sari',
  },
  {
    rank: '08',
    name: 'Plum Embroidered Jacket',
    craft: 'Paako · Kutch',
    price: '₹ 19,800',
    was: null,
    sold: 196,
    note: 'Sells out every festive season',
    swatches: ['#3b2434', '#c7a56a', '#8d2f26'],
    img: '/hero-right.png',
    alt: 'Model in a plum embroidered jacket set in an arched niche',
  },
  {
    rank: '09',
    name: 'Organza Suf Dupatta',
    craft: 'Suf · Kutch',
    price: '₹ 8,900',
    was: null,
    sold: 181,
    note: 'Counted-thread work, no pattern drawn',
    swatches: ['#2f6b52', '#b23127', '#3b2434'],
    img: '/frame-r2t14.jpg',
    alt: 'Model in a coral Kutchi embroidered sari',
  },
  {
    rank: '10',
    name: 'Handloom Maroon Sari',
    craft: 'Handloom · Bhujodi',
    price: '₹ 3,900',
    was: '₹ 4,600',
    sold: 167,
    note: 'Woven on pit looms in Bhujodi',
    swatches: ['#f2ede0', '#cfd6c3', '#c7a56a'],
    img: '/cat-c2.png',
    alt: 'Model in a handwoven maroon sari with a gold border',
  },
  {
    rank: '11',
    name: 'Terracotta Festive Set',
    craft: 'Mutava · Kutch',
    price: '₹ 21,600',
    was: null,
    sold: 152,
    note: 'Mutava work from just nine families',
    swatches: ['#a8562f', '#3b2434', '#c7a56a'],
    img: '/bottom right.png',
    alt: 'Model in an embroidered jacket set against a terracotta wall',
  },
  {
    rank: '12',
    name: 'Suf Embroidered Pouch',
    craft: 'Suf · Kutch',
    price: '₹ 1,800',
    was: null,
    sold: 138,
    note: 'Our most gifted small piece',
    swatches: ['#8d2f26', '#2b3d63', '#c7a56a'],
    img: '/top right.png',
    alt: 'Close crop of mirror-work embroidery in crimson and gold threads',
  },
]

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

      <div className="best__rail" ref={railRef} data-reveal-child>
        {BEST.map((p) => (
          <a className="best-card" href="#" key={p.name}>
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
                {p.swatches.map((c) => (
                  <i key={c} style={{ background: c }} />
                ))}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="best__more" data-reveal>
        <a className="arrow-link" href="#">
          See the full ranking <ArrowRight width="16" height="16" />
        </a>
      </div>
    </section>
  )
}
