import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HeartIcon,
  Phool,
} from '../components/Icons.jsx'
import { PIECES, collectionKey } from '../data/catalogue.js'
import { productSlug } from '../data/product.js'

/* Shop Shrujan — the catalogue, redesigned end to end.
   The page runs: maroon masthead → what every piece comes with → categories as
   a medallion rail → one collection given a full spread → commission band →
   the catalogue browsable by collection → why it costs what it costs.
   The collection rail is the spine; everything above it earns the grid its
   context instead of dropping the visitor into a wall of product. */

/* Filter by COLLECTION, not craft. The store's titles rarely name a craft, so
   inferring one put 72 of 84 products in a single "Kutchi hand-embroidery"
   bucket — every craft filter then showed either almost nothing or the same
   pieces over again. Collection is what the live site organises by, and every
   product carries a real one. */
const ALL = 'Everything'

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price, low to high' },
  { key: 'price-desc', label: 'Price, high to low' },
  { key: 'name', label: 'Name, A–Z' },
]

/* '₹ 25,000' -> 25000, so the price sorts numerically rather than as text */
const priceValue = (p) => Number(String(p.price).replace(/[^0-9.]/g, '')) || 0

/* small line marks for the assurance strip */
const Needle = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <path d="M4 20 19 5" strokeLinecap="round" />
    <circle cx="20.2" cy="3.8" r="1.6" />
    <path d="M7 17.5c1.8.6 3 .2 3.6-1.2" strokeLinecap="round" />
  </svg>
)
const Leaf = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <path d="M20 4c0 8-4.6 13-11 13H5c0-8 4.6-13 11-13Z" strokeLinejoin="round" />
    <path d="M5 20c2.4-4.4 5.6-7.4 9.5-9.3" strokeLinecap="round" />
  </svg>
)
const Truck = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <path d="M2 7h11v9H2zM13 10h4.5l3 3v3H13z" strokeLinejoin="round" />
    <circle cx="6.5" cy="18" r="1.7" />
    <circle cx="17" cy="18" r="1.7" />
  </svg>
)
const Ruler = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <rect x="2.5" y="8.5" width="19" height="7" rx="1.4" />
    <path d="M7 8.5v3M11 8.5v4.4M15 8.5v3M19 8.5v4.4" strokeLinecap="round" />
  </svg>
)

const ASSURANCES = [
  { Icon: Needle, title: 'Hand-embroidered', copy: 'No machine touches the cloth' },
  { Icon: Leaf, title: 'Naturally dyed', copy: 'Madder, indigo, pomegranate' },
  { Icon: Ruler, title: 'Made to measure', copy: 'Free alterations on request' },
  { Icon: Truck, title: 'Ships in 48 hours', copy: 'From the Bhuj atelier' },
  { Icon: HeartIcon, title: 'Signed by her', copy: 'Every piece carries her name' },
]

/* the collection given a full spread below the rail */
const SPOTLIGHT = {
  no: '01',
  name: 'Kanchli',
  craft: 'Suf · Paako · Aabhla',
  copy: 'The Kutchi bodice, cut and stitched the way it has been for generations. Sixty hours on the frame before a single seam is closed, and no two are alike — the embroiderer holds the whole geometry in her head as she works.',
  facts: [
    ['60 hrs', 'On the frame'],
    ['3', 'Crafts in one piece'],
    ['24', 'Pieces online'],
  ],
  img: '/sj-red-hand-ahir-embroidered-kanchli-1.webp',
  alt: 'Model in a dark embroidered kanchli with a black silk drape',
  side: '/sj-megenta-pink-hand-embroidered-kanchli-1.webp',
  sideAlt: 'Model in a ceremonial embroidered kanchli',
}

const WHY = [
  {
    no: '01',
    title: 'She is paid per piece, on time',
    copy: 'Directly, and at a rate she agreed to. That arrangement was rare in 1969 and it still is.',
    img: '/bottom left.webp',
    alt: 'Master weaver working threads at his handloom',
  },
  {
    no: '02',
    title: 'Nothing is rushed',
    copy: 'A kanchli takes sixty hours. A bridal odhani takes months. We quote the real time, not a delivery promise.',
    img: '/top right.webp',
    alt: 'Close crop of mirror-work embroidery in crimson and gold threads',
  },
  {
    no: '03',
    title: 'It is repaired, not replaced',
    copy: 'Send it back whenever it needs work. Alterations and repairs are free for as long as you own it.',
    img: '/frame-r3t6.webp',
    alt: 'Embroidered cloth stretched on a wooden frame',
  },
]

/* a rotating tint, so grids carry colour of their own rather than reading as
   rectangles on flat ivory */
const TINTS = ['var(--ivory-2)', 'var(--gerua-100)', 'var(--mehendi-200)', 'var(--sand)']

/* The native <select> renders as the operating system's own popup — grey,
   system font, nothing to do with this site. This is a listbox built from
   scratch so it can be styled, with the keyboard behaviour a select gives you
   for free put back by hand: arrows to move, enter to pick, escape to close,
   and a click anywhere outside to dismiss. */
function SortMenu({ value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const wrap = useRef(null)
  const current = options.find((o) => o.key === value) ?? options[0]

  useEffect(() => {
    if (!open) return
    const outside = (e) => {
      if (!wrap.current?.contains(e.target)) setOpen(false)
    }
    const esc = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const pick = (key) => {
    onChange(key)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        setCursor(Math.max(0, options.findIndex((o) => o.key === value)))
        setOpen(true)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => (c + 1) % options.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => (c - 1 + options.length) % options.length)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(options[cursor].key)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div className={`sortmenu${open ? ' is-open' : ''}`} ref={wrap}>
      <button
        type="button"
        className="sortmenu__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setCursor(Math.max(0, options.findIndex((o) => o.key === value)))
          setOpen((v) => !v)
        }}
        onKeyDown={onKeyDown}
      >
        <span className="sortmenu__label">Sort</span>
        <span className="sortmenu__value">{current.label}</span>
        <ChevronDown width="13" height="13" aria-hidden="true" />
      </button>

      <ul className="sortmenu__list" role="listbox" aria-label="Sort by" tabIndex={-1}>
        {options.map((o, i) => (
          <li
            key={o.key}
            role="option"
            aria-selected={o.key === value}
            className={`sortmenu__option${o.key === value ? ' is-selected' : ''}${
              i === cursor ? ' is-cursor' : ''
            }`}
            onPointerEnter={() => setCursor(i)}
            onClick={() => pick(o.key)}
          >
            {o.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Ornament() {
  return (
    <span className="orn" aria-hidden="true">
      <i />
      <Phool size={15} />
      <i />
    </span>
  )
}

export default function ShopShrujan() {
  const [params, setParams] = useSearchParams()
  const catRail = useRef(null)

  const collections = useMemo(
    () => [ALL, ...new Set(PIECES.map((p) => p.collection).filter(Boolean))],
    [],
  )

  // the URL is the source of truth, so a header link lands on the right filter
  const active =
    collections.find((c) => collectionKey(c) === params.get('c')) ?? ALL

  const setActive = (c) => {
    if (c === ALL) setParams({}, { replace: true })
    else setParams({ c: collectionKey(c) }, { replace: true })
  }

  const [sort, setSort] = useState('featured')

  const shown = useMemo(() => {
    const list = active === ALL ? PIECES : PIECES.filter((p) => p.collection === active)
    if (sort === 'featured') return list
    const out = [...list] // never sort the source array in place
    if (sort === 'price-asc') out.sort((a, b) => priceValue(a) - priceValue(b))
    if (sort === 'price-desc') out.sort((a, b) => priceValue(b) - priceValue(a))
    if (sort === 'name') out.sort((a, b) => a.name.localeCompare(b.name))
    return out
  }, [active, sort])

  /* One medallion per real collection, fronted by the first product in it —
     the tiles used to come from a hardcoded list that no longer matched the
     catalogue, so clicking one only jumped to the grid without filtering. */
  const tiles = useMemo(
    () =>
      collections
        .filter((c) => c !== ALL)
        .map((name) => {
          const items = PIECES.filter((p) => p.collection === name)
          return { name, count: items.length, img: items[0].img, alt: items[0].alt }
        }),
    [collections],
  )

  // arriving from a header link should land on the grid, not the masthead
  useEffect(() => {
    if (!params.get('c')) return
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [params])

  const page = (dir) => {
    const rail = catRail.current
    if (!rail) return
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="page">
      {/* ---- hero banner ---- */}
      <section className="shop-banner" aria-label="The handcrafted edit">
        <div className="shop-banner__frame">
          <img
            src="/shop-hero.webp"
            alt="Embroidered tote and potli, a handwoven cushion, and models in a bandhani dupatta and an embroidered blouse"
            fetchPriority="high"
          />

          {/* real text, not baked into the artwork — it reflows, scales and
              can actually be read by search and screen readers */}
          <div className="shop-banner__overlay">
            <p className="shop-banner__eyebrow">Handcrafted Edit</p>
            <h1 className="shop-banner__title">Collection</h1>
            <p className="shop-banner__copy">
              A curated selection of textiles, accessories
              <br />
              and handcrafted essentials.
            </p>
            <a className="shop-banner__view" href="#catalogue">
              View
            </a>
          </div>
        </div>
      </section>

      {/* ---- what every piece comes with ---- */}
      <section className="shop-assure" aria-label="What every piece comes with">
        <ul className="container shop-assure__row" data-reveal-child>
          {ASSURANCES.map(({ Icon, title, copy }) => (
            <li key={title}>
              <span className="shop-assure__mark" aria-hidden="true">
                <Icon width="19" height="19" />
              </span>
              <span className="shop-assure__title">{title}</span>
              <span className="shop-assure__copy">{copy}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- categories as medallions ---- */}
      <section className="section container shop-cats" aria-label="Collections">
        <div className="shop-head" data-reveal>
          <Ornament />
          <h2 className="section-title">Shop by collection</h2>
          <p className="shop-head__copy">
            From the Kutchi bodice to the cloth for your walls — each collection worked
            in the craft it has always been made in.
          </p>
        </div>

        <div className="shop-cats__wrap">
          <div className="shop-cats__rail" ref={catRail} data-reveal-child>
            {tiles.map((c, i) => (
              <button
                type="button"
                className="medallion"
                key={c.name}
                onClick={() => setActive(c.name)}
              >
                <span
                  className="medallion__disc"
                  style={{ '--tint': TINTS[i % TINTS.length] }}
                >
                  <img src={c.img} alt={c.alt} loading="lazy" />
                </span>
                <span className="medallion__name">{c.name}</span>
                <span className="medallion__sub">
                  {c.count} {c.count === 1 ? 'piece' : 'pieces'}
                </span>
                <span className="medallion__go" aria-hidden="true">
                  Shop <ArrowRight width="13" height="13" />
                </span>
              </button>
            ))}
          </div>

          <div className="carousel-arrows shop-cats__arrows">
            <button type="button" aria-label="Previous collections" onClick={() => page(-1)}>
              <ChevronLeft />
            </button>
            <button type="button" aria-label="Next collections" onClick={() => page(1)}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* ---- collection rail + product grid ---- */}
      <section className="section container shop-body" id="catalogue">
        <aside className="shop-rail" data-reveal>
          <p className="shop-rail__title">
            <Phool size={13} aria-hidden="true" /> Browse by collection
          </p>
          <ul className="shop-rail__list">
            {collections.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  className={`shop-rail__item${active === c ? ' is-active' : ''}`}
                  aria-pressed={active === c}
                  onClick={() => setActive(c)}
                >
                  {c}
                  {/* a count belongs on a real collection, not on "Everything" */}
                  {c !== ALL && (
                    <span className="shop-rail__n">
                      {PIECES.filter((p) => p.collection === c).length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <p className="shop-rail__note">
            Suf is counted from the reverse. Paako is worked from the front. Aabhla
            cages a mirror in thread. The stitch is the difference.
          </p>
        </aside>

        <div className="shop-main">
          <div className="shop-main__bar" data-reveal>
            <p className="shop-main__count">
              {shown.length} {shown.length === 1 ? 'piece' : 'pieces'}
              {active !== ALL && <> in {active}</>}
            </p>
            <div className="shop-sort">
              {active !== ALL && (
                <button type="button" className="shop-main__clear" onClick={() => setActive(ALL)}>
                  Clear filter
                </button>
              )}

              <SortMenu value={sort} options={SORTS} onChange={setSort} />
            </div>
          </div>

          {shown.length === 0 ? (
            <p className="shop-main__empty">
              Nothing online in this collection right now.{' '}
              <a href="mailto:marketing@shrujan.com?subject=Collection%20enquiry">Ask the studio</a>.
            </p>
          ) : (
            <div className="curated__grid shop-grid" data-reveal-child key={`${active}-${sort}`}>
              {shown.map((p, i) => (
                <Link className="piece shop-piece" to={`/products/${productSlug(p)}`} key={productSlug(p)}>
                  <div className="piece__media" style={{ '--tint': TINTS[i % TINTS.length] }}>
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
          )}
        </div>
      </section>

      {/* ---- one collection, given a full spread ---- */}
      <section className="section container spotlight-col" aria-label={SPOTLIGHT.name}>
        <div className="spotlight-col__media" data-reveal>
          <img src={SPOTLIGHT.img} alt={SPOTLIGHT.alt} loading="lazy" />
          <figure className="spotlight-col__inset">
            <img src={SPOTLIGHT.side} alt={SPOTLIGHT.sideAlt} loading="lazy" />
          </figure>
        </div>

        <div className="spotlight-col__body" data-reveal>
          <p className="spotlight-col__no" aria-hidden="true">
            {SPOTLIGHT.no} / {String(tiles.length).padStart(2, '0')}
          </p>
          <p className="eyebrow">{SPOTLIGHT.craft}</p>
          <h2 className="spotlight-col__name">{SPOTLIGHT.name}</h2>
          <p className="spotlight-col__copy">{SPOTLIGHT.copy}</p>

          <ul className="spotlight-col__facts">
            {SPOTLIGHT.facts.map(([v, l]) => (
              <li key={l}>
                <strong>{v}</strong>
                <span>{l}</span>
              </li>
            ))}
          </ul>

          <a className="btn" href="#catalogue">
            Shop the collection <ArrowRight width="16" height="16" />
          </a>
        </div>
      </section>

      {/* ---- why it costs what it costs ---- */}
      <section className="section container shop-why" aria-label="Why Shrujan">
        <div className="shop-head" data-reveal>
          <Ornament />
          <h2 className="section-title">Why it costs what it costs</h2>
        </div>

        <div className="shop-why__grid" data-reveal-child>
          {WHY.map((w) => (
            <article className="why-card" key={w.no}>
              <div className="why-card__media">
                <img src={w.img} alt={w.alt} loading="lazy" />
                <span className="why-card__no" aria-hidden="true">
                  {w.no}
                </span>
              </div>
              <h3 className="why-card__title">{w.title}</h3>
              <p className="why-card__copy">{w.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container page-cta" data-reveal>
        <p>Not sure which craft you are looking at?</p>
        <Link className="btn btn--ghost" to="/pages/video">
          Learn to read the stitches <ArrowRight width="16" height="16" />
        </Link>
      </section>
    </div>
  )
}
