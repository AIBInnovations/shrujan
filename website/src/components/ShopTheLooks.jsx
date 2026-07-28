import { useState } from 'react'
import { ChevronLeft, ChevronRight } from './Icons.jsx'

/* Full-bleed lookbook slides with shoppable hotspots pinned to each look. */
const LOOKS = [
  {
    img: '/look-b1.png',
    alt: 'Model in a maroon silk sari with gold zari embroidery beside brass urns',
    focus: '50% 12%',
    hotspots: [
      {
        x: 53,
        y: 52,
        name: 'Maroon Silk Zari Sari',
        price: '₹ 22,400',
        thumb: '/cat-c1.png',
      },
      {
        x: 46,
        y: 27,
        name: 'Embroidered Silk Blouse',
        price: '₹ 6,800',
        thumb: '/look-b1.png',
      },
    ],
  },
  {
    img: '/look-b2.png',
    alt: 'Model in a red bridal lehenga with a net dupatta',
    focus: '50% 12%',
    hotspots: [
      {
        x: 39,
        y: 62,
        name: 'Bridal Red Lehenga',
        price: '₹ 64,000',
        thumb: '/cat-c3.png',
      },
      {
        x: 49,
        y: 40,
        name: 'Sequinned Net Dupatta',
        price: '₹ 11,200',
        thumb: '/look-b2.png',
      },
    ],
  },
  {
    img: '/look-b3.png',
    alt: 'Model in an ivory chikankari kurta set with a red-bordered dupatta',
    focus: '50% 12%',
    hotspots: [
      {
        x: 47,
        y: 48,
        name: 'Ivory Chikankari Kurta Set',
        price: '₹ 14,800',
        thumb: '/cat-c5.png',
      },
      {
        x: 56,
        y: 62,
        name: 'Gota Border Dupatta',
        price: '₹ 7,600',
        thumb: '/look-b3.png',
      },
    ],
  },
]

export default function ShopTheLooks() {
  const [index, setIndex] = useState(0)
  const [openSpot, setOpenSpot] = useState(0)

  const go = (dir) => {
    setIndex((i) => (i + dir + LOOKS.length) % LOOKS.length)
    setOpenSpot(0)
  }

  const look = LOOKS[index]

  return (
    <section className="looks" aria-label="Shop the looks">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Styled by the Studio</p>
        <h2 className="section-title">Shop the looks</h2>
        <p className="section-intro__copy">
          Complete outfits as our Bhuj stylists put them together. Tap a marker to
          shop the piece.
        </p>
      </div>

      <div className="looks__stage" data-reveal>
        {LOOKS.map((l, i) => (
          <img
            key={l.img}
            className={`looks__slide${i === index ? ' is-active' : ''}`}
            src={l.img}
            alt={l.alt}
            style={{ objectPosition: l.focus }}
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i !== index}
          />
        ))}
        <span className="looks__scrim" aria-hidden="true" />

        {/* shoppable hotspots for the active look */}
        {look.hotspots.map((h, i) => (
          <div
            className={`looks-spot${openSpot === i ? ' is-open' : ''}`}
            key={h.name}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <button
              className="looks-spot__dot"
              type="button"
              aria-label={`Show ${h.name}`}
              aria-expanded={openSpot === i}
              onClick={() => setOpenSpot(openSpot === i ? -1 : i)}
            />
            <div className="looks-spot__card">
              <img src={h.thumb} alt="" loading="lazy" />
              <div>
                <p className="looks-spot__name">{h.name}</p>
                <p className="looks-spot__price">{h.price}</p>
                <a className="looks-spot__link" href="#">
                  Quick view
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* control block */}
        <div className="looks__controls">
          <p className="looks__label">Shop the Looks</p>
          <div className="looks__nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous look">
              <ChevronLeft />
            </button>
            <span className="looks__count">
              {index + 1} / {LOOKS.length}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Next look">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
