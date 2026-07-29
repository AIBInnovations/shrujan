import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { ArrowRight, HeartIcon, PlusIcon, Phool } from '../components/Icons.jsx'
import { scrollToY } from '../hooks/useSmoothScroll.js'
import { PIECES } from '../data/catalogue.js'
import {
  DETAILS,
  REVIEWS,
  REVIEW_FACES,
  SIZES,
  SPECS,
  galleryFor,
  productSlug,
} from '../data/product.js'

/* Product detail — three columns.
   The rail and the shot are pinned together and stay put; only the buying
   column on the right moves as you scroll. Scroll position through the
   section picks the shot, which cross-fades in, and the rail jumps to it. */

function Stars({ n = 5 }) {
  return (
    <span className="pdp__stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
          <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9Z" />
        </svg>
      ))}
    </span>
  )
}

export default function Product() {
  const { slug } = useParams()
  const uid = useId()

  const piece = useMemo(
    () => PIECES.find((p) => productSlug(p) === slug) ?? PIECES[0],
    [slug],
  )
  const shots = useMemo(() => galleryFor(piece.img, piece.gallery), [piece])

  // same craft first, topped up with the rest of the catalogue
  const alsoLike = useMemo(() => {
    const family = piece.craft.split('·')[0].trim().toLowerCase()
    const others = PIECES.filter((p) => productSlug(p) !== productSlug(piece))
    const sameCraft = others.filter((p) => p.craft.toLowerCase().includes(family))
    return [...sameCraft, ...others.filter((p) => !sameCraft.includes(p))].slice(0, 5)
  }, [piece])

  // the lower row must not repeat what the recommendation row already showed
  const others = useMemo(() => {
    const shown = new Set([productSlug(piece), ...alsoLike.map(productSlug)])
    return PIECES.filter((p) => !shown.has(productSlug(p))).slice(0, 5)
  }, [piece, alsoLike])

  const [active, setActive] = useState(0)
  const [size, setSize] = useState('M')
  const [mode, setMode] = useState('ready')
  const [open, setOpen] = useState(0)

  const pdpRef = useRef(null)
  const detailsRef = useRef(null)

  // "Size guide" opens the fit panel rather than pointing at a page that does
  // not exist. Found by label, so reordering DETAILS cannot silently open the
  // wrong one.
  const showFit = () => {
    const i = DETAILS.findIndex((d) => d.q === 'Fabric & fit')
    if (i < 0) return
    setOpen(i)
    const el = detailsRef.current
    if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 120)
  }

  // reset when navigating between products
  useEffect(() => {
    setActive(0)
    setSize('M')
    setMode('ready')
  }, [slug])

  // Scroll drives the gallery. The section is divided into as many bands as
  // there are shots, and progress through it picks the one on screen — so the
  // image changes only when you move, never on its own.
  useEffect(() => {
    if (shots.length < 2) return
    let queued = false

    const read = () => {
      queued = false
      const el = pdpRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      if (travel <= 0) return
      const progress = Math.min(1, Math.max(0, -r.top / travel))
      setActive(Math.min(shots.length - 1, Math.floor(progress * shots.length)))
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(read)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    read()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [shots.length])

  // Thumbnails scroll to that shot's band rather than setting state directly,
  // so scroll position stays the single source of truth for what is showing.
  const jumpTo = (i) => {
    const el = pdpRef.current
    if (!el) return
    const travel = el.offsetHeight - window.innerHeight
    if (travel <= 0) return
    const top = el.offsetTop + (travel * (i + 0.5)) / shots.length
    scrollToY(top) // through Lenis, or it fights the smooth scroller
  }

  return (
    <div className="page pdp-page">
      <div className="container pdp" ref={pdpRef}>
        {/* Rail and shots share a wrapper on purpose: a sticky element stops
            at the bottom of its containing block, and .pdp includes the taller
            buying column — so without this the rail kept sticking well past
            the last shot. */}
        <div className="pdp__media">
          {/* ---- left: thumbnail rail ---- */}
          <div className="pdp__rail" aria-label="Product images">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`pdp__thumb${active === i ? ' is-active' : ''}`}
              aria-label={`View image ${i + 1} of ${shots.length}`}
              aria-current={active === i ? 'true' : undefined}
              onClick={() => jumpTo(i)}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>

          {/* ---- middle: the pinned shot ---- */}
          <div className="pdp__stage">
            {shots.map((src, i) => (
              <figure
                className={`pdp__shot${active === i ? ' is-active' : ''}`}
                key={src}
                aria-hidden={active !== i}
              >
                <img
                  src={src}
                  alt={i === 0 ? piece.alt : ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : undefined}
                />
              </figure>
            ))}

            {piece.badge && <span className="pdp__badge">{piece.badge}</span>}
          </div>
        </div>

        {/* ---- right: the buying column ---- */}
        <div className="pdp__buy">
          <div className="pdp__rating">
            <Stars />
            <span>5.0</span>
            <a href="#reviews">126 reviews</a>
          </div>

          <h1 className="pdp__name">{piece.name}</h1>
          <p className="pdp__craft">{piece.craft}</p>

          <p className="pdp__copy">
            Counted and stitched by hand on naturally dyed handloom cloth, then cut and
            finished in our Bhuj atelier. Made to be worn often and kept for a long time.
          </p>

          {/* specification chips */}
          <div className="pdp__block">
            <p className="pdp__label">Made with</p>
            <ul className="pdp__specs">
              {SPECS.map((sp) => (
                <li key={sp}>{sp}</li>
              ))}
            </ul>
          </div>

          {/* size */}
          <div className="pdp__block">
            <div className="pdp__label-row">
              <p className="pdp__label">Size</p>
              {/* There is no separate size-guide page, and inventing one
                  would only be a link to nowhere. The fit advice already
                  lives in the "Fabric & fit" panel below, so this opens it
                  and takes the reader there. */}
              <button type="button" className="pdp__size-guide" onClick={showFit}>
                Size guide
              </button>
            </div>
            <div className="pdp__sizes" role="group" aria-label="Size">
              {SIZES.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className={`pdp__size${size === sz ? ' is-active' : ''}`}
                  aria-pressed={size === sz}
                  onClick={() => setSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* how it is made for you */}
          <div className="pdp__options" role="radiogroup" aria-label="How it is made">
            <label className={`pdp__option${mode === 'ready' ? ' is-active' : ''}`}>
              <input
                type="radio"
                name={`${uid}-mode`}
                checked={mode === 'ready'}
                onChange={() => setMode('ready')}
              />
              <span className="pdp__option-body">
                <span className="pdp__option-title">Ready to ship</span>
                <span className="pdp__option-note">Leaves Bhuj in 48 hours</span>
              </span>
              <span className="pdp__option-price">{piece.price}</span>
            </label>

            <label className={`pdp__option${mode === 'measure' ? ' is-active' : ''}`}>
              <input
                type="radio"
                name={`${uid}-mode`}
                checked={mode === 'measure'}
                onChange={() => setMode('measure')}
              />
              <span className="pdp__option-body">
                <span className="pdp__option-title">Made to your measure</span>
                <span className="pdp__option-note">Cut for you · 2–3 weeks</span>
              </span>
              <span className="pdp__option-price">+ ₹ 1,200</span>
            </label>
          </div>

          <div className="pdp__cta">
            <button type="button" className="btn pdp__add">
              Add to bag — {piece.price}
            </button>
            <button type="button" className="pdp__wish" aria-label="Save to wishlist">
              <HeartIcon width="17" height="17" />
            </button>
          </div>

          <p className="pdp__reassure">
            <Phool size={13} aria-hidden="true" /> Free alterations for as long as you own it
          </p>

          {/* accordions */}
          <div className="pdp__details" ref={detailsRef}>
            {DETAILS.map((d, i) => {
              const isOpen = open === i
              const panelId = `${uid}-detail-${i}`
              return (
                <div className={`pdp__detail${isOpen ? ' is-open' : ''}`} key={d.q}>
                  <button
                    type="button"
                    className="pdp__detail-summary"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{d.q}</span>
                    <span className="pdp__detail-icon" aria-hidden="true">
                      <PlusIcon />
                    </span>
                  </button>
                  {/* animated with grid-template-rows 0fr -> 1fr: the panel
                      needs no measured height, so it works whatever the copy */}
                  <div className="pdp__detail-panel" id={panelId} role="region">
                    <div className="pdp__detail-inner">
                      <p>{d.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* worn by */}
          <div className="pdp__worn">
            <div className="pdp__label-row">
              <p className="pdp__label">Worn by</p>
              <a href="#reviews">All 126 reviews</a>
            </div>
            <div className="pdp__faces">
              {REVIEW_FACES.map((f) => (
                <img key={f} src={f} alt="" loading="lazy" />
              ))}
            </div>
            <blockquote className="pdp__quote">
              “Five years on it has not lost a single stitch.”
              <cite>Meera S. · Mumbai</cite>
            </blockquote>
          </div>

          <Link className="arrow-link pdp__back" to="/pages/shop-shrujan">
            Back to the catalogue <ArrowRight width="15" height="15" />
          </Link>
        </div>
      </div>

      {/* ---- reviews ---- */}
      <section className="section container pdp-reviews" id="reviews">
        <div className="section-head" data-reveal>
          <div className="section-head__titles">
            <p className="eyebrow">126 reviews</p>
            <h2 className="section-title">
              What buyers <em>say</em>
            </h2>
          </div>
          <a className="arrow-link" href="#write-review">
            Write a review <ArrowRight width="16" height="16" />
          </a>
        </div>

        <div className="reviews" data-reveal-child>
          <aside className="review-add" id="write-review">
            <p className="review-add__score">5.0</p>
            <Stars />
            <p className="review-add__count">Based on 126 reviews</p>
            <button type="button" className="btn">
              Write a review
            </button>
            <p className="review-add__note">
              Bought this piece? Tell us how it wears — we send every review back to
              the woman who made it.
            </p>
          </aside>

          {REVIEWS.map((r, i) => (
            <article className="review" key={r.name}>
              <Stars n={r.stars} />
              <p className="review__body">{r.body}</p>
              <div className="review__who">
                <img src={REVIEW_FACES[i % REVIEW_FACES.length]} alt="" loading="lazy" />
                <span>
                  <span className="review__name">{r.name}</span>
                  <span className="review__place">{r.place}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---- recommendation ---- */}
      <section className="section container pdp-rec" aria-label="Recommended">
        <div className="section-head" data-reveal>
          <div className="section-head__titles">
            <p className="eyebrow">You may also like</p>
            <h2 className="section-title">
              More from the <em>same hands</em>
            </h2>
          </div>
        </div>

        {/* the home page's product card, verbatim — same grid, same card */}
        <div className="curated__grid" data-reveal-child>
          {alsoLike.map((p) => (
            <Link className="piece" to={`/products/${productSlug(p)}`} key={productSlug(p)}>
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
      </section>

      {/* ---- the rest of the catalogue ---- */}
      <section className="section container pdp-other" aria-label="Other products">
        <div className="section-head" data-reveal>
          <div className="section-head__titles">
            <p className="eyebrow">Elsewhere in the catalogue</p>
            <h2 className="section-title">
              Other <em>pieces</em>
            </h2>
          </div>
          <Link className="arrow-link" to="/pages/shop-shrujan">
            Shop everything <ArrowRight width="16" height="16" />
          </Link>
        </div>

        <div className="curated__grid" data-reveal-child>
          {others.map((p) => (
            <Link className="piece" to={`/products/${productSlug(p)}`} key={productSlug(p)}>
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
      </section>

    </div>
  )
}
