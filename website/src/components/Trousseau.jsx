import { useState } from 'react'
import { ArrowRight, HeartIcon } from './Icons.jsx'

const FILTERS = ['All', 'Bridal', 'Festive', 'Everyday', 'Gifting']

const PIECES = [
  {
    name: 'Zardozi Lehenga', craft: 'Zardozi · Bhuj atelier', price: '₹ 68,500', was: '₹ 74,000',
    tag: 'Bridal', badge: 'Made to order', swatches: ['#8d2f26', '#3b2434', '#c7a56a'],
    img: '/cat-c3.png',
    alt: 'Model in a maroon embroidered lehenga',
  },
  {
    name: 'Chikankari Kurta Set', craft: 'Chikankari · Lucknow', price: '₹ 16,500', was: '₹ 18,900',
    tag: 'Festive', badge: null, swatches: ['#f2ede0', '#cfd6c3', '#e8cfc4'],
    img: '/cat-c5.png',
    alt: 'Model in an ivory kurta with a maroon embroidered dupatta',
  },
  {
    name: 'Indigo Mirror-Work Jacket', craft: 'Aabhla · Kutch', price: '₹ 15,600', was: null,
    tag: 'Everyday', badge: null, swatches: ['#2b3d63', '#75665f', '#f2ede0'],
    img: '/frame-r1t20.jpg',
    alt: 'Model in an indigo mirror-work jacket over an olive dress',
  },
  {
    name: 'Turquoise Embroidered Stole', craft: 'Kutchi hand-embroidery', price: '₹ 2,400', was: null,
    tag: 'Gifting', badge: null, swatches: ['#b23127', '#c7a56a', '#2f6b52'],
    img: '/frame-r5t15.jpg',
    alt: 'Close crop of turquoise Kutchi mirror-work embroidery',
  },
  {
    name: 'Kora Silk Banarasi Sari', craft: 'Handloom · Varanasi', price: '₹ 24,800', was: null,
    tag: 'Bridal', badge: 'Bestseller', swatches: ['#b23127', '#7d1f45', '#c7a56a'],
    img: '/cat-c1.png',
    alt: 'Model in a maroon silk sari with gold zari embroidery',
  },
  {
    name: 'Organza Embroidered Dupatta', craft: 'Suf · Kutch', price: '₹ 8,900', was: null,
    tag: 'Festive', badge: 'Few left', swatches: ['#2f6b52', '#b23127', '#3b2434'],
    img: '/frame-r2t14.jpg',
    alt: 'Model in a coral Kutchi embroidered sari',
  },
  {
    name: 'Ajrakh Cotton Kurta', craft: 'Block print · Ajrakhpur', price: '₹ 4,900', was: '₹ 5,800',
    tag: 'Everyday', badge: 'New in', swatches: ['#8d2f26', '#2b3d63', '#75665f'],
    img: '/hero-left.png',
    alt: 'Model in a rust-red ajrakh kurta with gold jewellery',
  },
  {
    name: 'Suf Embroidered Pouch', craft: 'Suf · Kutch', price: '₹ 1,800', was: null,
    tag: 'Gifting', badge: null, swatches: ['#8d2f26', '#2b3d63', '#c7a56a'],
    img: '/top right.png',
    alt: 'Close crop of mirror-work embroidery in crimson and gold threads',
  },
  {
    name: 'Violet Kutchi Sari', craft: 'Kutchi hand-embroidery', price: '₹ 21,300', was: null,
    tag: 'Bridal', badge: null, swatches: ['#4a2050', '#b23127', '#c7a56a'],
    img: '/frame-r5t25.jpg',
    alt: 'Model in a violet hand-embroidered Kutchi sari',
  },
  {
    name: 'Silver Suf Jacket', craft: 'Suf · Bhuj atelier', price: '₹ 24,200', was: null,
    tag: 'Festive', badge: 'Bestseller', swatches: ['#c7a56a', '#f2ede0', '#75665f'],
    img: '/frame-r3t16.jpg',
    alt: 'Model in a silver-grey Suf embroidered jacket',
  },
  {
    name: 'Handloom Maroon Sari', craft: 'Handloom · Bhujodi', price: '₹ 3,900', was: '₹ 4,600',
    tag: 'Everyday', badge: null, swatches: ['#f2ede0', '#cfd6c3', '#c7a56a'],
    img: '/cat-c2.png',
    alt: 'Model in a handwoven maroon sari with a gold border',
  },
  {
    name: 'Coral Kutchi Sari', craft: 'Kutchi hand-embroidery', price: '₹ 6,400', was: null,
    tag: 'Gifting', badge: null, swatches: ['#c7a56a', '#b23127', '#2f6b52'],
    img: '/frame-r2t5.jpg',
    alt: 'Model in a coral Kutchi hand-embroidered sari',
  },
  {
    name: 'Bridal Mirror Odhani', craft: 'Aabhla · Kutch', price: '₹ 12,900', was: '₹ 14,500',
    tag: 'Bridal', badge: null, swatches: ['#8d2f26', '#c7a56a', '#3b2434'],
    img: '/cta-sarree.png',
    alt: 'Model in a crimson hand-embroidered bridal sari',
  },
  {
    name: 'Plum Embroidered Jacket', craft: 'Paako · Kutch', price: '₹ 19,800', was: null,
    tag: 'Festive', badge: null, swatches: ['#3b2434', '#c7a56a', '#8d2f26'],
    img: '/hero-right.png',
    alt: 'Model in a plum embroidered jacket set in an arched niche',
  },
  {
    name: 'Everyday Ajrakh Jacket', craft: 'Block print · Ajrakhpur', price: '₹ 7,200', was: null,
    tag: 'Everyday', badge: null, swatches: ['#2b3d63', '#8d2f26', '#75665f'],
    img: '/hero-bottom-2.png',
    alt: 'Block-printing tools with embroidered plum cloth',
  },
  {
    name: 'The Shrujan Gift Card', craft: 'Delivered by email', price: '₹ 2,000+', was: null,
    tag: 'Gifting', badge: null, swatches: ['#c7a56a', '#3b2434', '#f2ede0'],
    img: '/hero-bottom.png',
    alt: 'Gold chandbali earrings with pearls on a brass plate',
  },
  {
    name: 'Indigo Jacket, Reverse', craft: 'Aabhla · Kutch', price: '₹ 86,000', was: null,
    tag: 'Bridal', badge: 'Commission', swatches: ['#8d2f26', '#e8cfc4', '#c7a56a'],
    img: '/frame-r1t12.jpg',
    alt: 'Back view of an indigo mirror-work jacket',
  },
  {
    name: 'Terracotta Festive Set', craft: 'Mutava · Kutch', price: '₹ 21,600', was: null,
    tag: 'Festive', badge: null, swatches: ['#a8562f', '#3b2434', '#c7a56a'],
    img: '/bottom right.png',
    alt: 'Model in an embroidered jacket set against a terracotta wall',
  },
  {
    name: 'Maroon Embroidered Kurta Set', craft: 'Handloom · Bhuj', price: '₹ 5,400', was: null,
    tag: 'Everyday', badge: 'Made to order', swatches: ['#75665f', '#f2ede0', '#2b3d63'],
    img: '/cat-c4.png',
    alt: 'Model in a maroon embroidered kurta set',
  },
  {
    name: 'Zari Fabric Gift Length', craft: 'Zari · Varanasi', price: '₹ 4,200', was: null,
    tag: 'Gifting', badge: null, swatches: ['#b23127', '#c7a56a', '#4a2050'],
    img: '/hero-beside-right.png',
    alt: 'Close crop of crimson silk with gold zari embroidery',
  },
]


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
          <a className="piece" href="#" key={p.name}>
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
                {p.swatches.map((c) => (
                  <i key={c} style={{ background: c }} />
                ))}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="curated__more" data-reveal>
        <a className="btn btn--ghost" href="#">
          View the full edit <ArrowRight width="16" height="16" />
        </a>
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
