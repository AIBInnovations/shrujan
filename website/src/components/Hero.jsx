import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons.jsx'

/* Each cell shows what its own page opens with, so the bento reads as six
   doors rather than six pretty pictures. Previously the craft cell was a
   generic zari crop and the LLDC cell was a pair of earrings — neither said
   anything about where it led. */
const IMG = {
  model: '/hero-left.webp',              // Shop — a piece being worn
  season: '/look-b2.webp',               // Studio — that page's own cover
  thread: '/craft-hero.webp',            // Craft Traditions — its masthead
  accessories: '/craft-embroidery-poster.webp', // LLDC — inside the centre
  story: '/story-origin-2.webp',         // The Shrujan Story — the archive
}

/* Line-art mandala for the ivory message panel */
function Mandala({ size = 64, ...props }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      {petals.map((deg) => (
        <ellipse key={deg} cx="32" cy="14" rx="5.5" ry="12" transform={`rotate(${deg} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="5" />
    </svg>
  )
}

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out', duration: 0.9 },
        })

        tl.fromTo(
          '[data-hero="cell"]',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          0,
        )
          .fromTo(
            '.hero-message__title .line > span',
            { yPercent: 110 },
            { yPercent: 0, duration: 1, stagger: 0.12, ease: 'power4.out' },
            0.35,
          )
          .fromTo(
            '[data-hero="rule"]',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.6 },
            0.8,
          )
          .fromTo('[data-hero="copy"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0.9)
          .fromTo('[data-hero="cta"]', { opacity: 0, y: 14 }, { opacity: 1, y: 0 }, 1.02)
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-hero], .hero-message__title .line > span', { clearProps: 'all', opacity: 1 })
      })
    },
    { scope: root },
  )

  return (
    <section className="hero" ref={root} aria-label="Tradition, styled forward">
      {/* ---- 1 · Shop Shrujan ---- */}
      <Link className="hero-cell hero-cell--model" to="/pages/shop-shrujan" data-hero="cell">
        <img
          src={IMG.model}
          alt="Model in a rust-red ajrakh kurta with gold jewellery before an arched wall"
          fetchPriority="high"
        />
        <span className="hero-cell__label">
          <i className="hero-cell__dash" aria-hidden="true" />
          <em>Shop</em>
          Shrujan
          <span className="hero-cell__sub">
            Saris, kurtas and dupattas, hand-embroidered by the women of Kutch.
          </span>
          <ArrowRight width="16" height="16" />
        </span>
      </Link>

      {/* ---- 2 · ivory message panel ---- */}
      <div className="hero-cell hero-cell--message" data-hero="cell">
        <span className="hero-message__ornament" aria-hidden="true">
          <Mandala size={58} />
        </span>
        <h1 className="hero-message__title">
          <span className="line">
            <span className="t-ink">Tradition,</span>
          </span>
          <span className="line">
            <span className="t-red">Styled</span>
          </span>
          <span className="line">
            <span className="t-red">Forward</span>
          </span>
        </h1>
        <span className="hero-message__rule" data-hero="rule" aria-hidden="true" />
        <p className="hero-message__copy" data-hero="copy">
          Where centuries-old craftsmanship meets contemporary design. Timeless pieces
          for today&rsquo;s tastemakers.
        </p>
        <a className="hero-message__cta" href="#categories" data-hero="cta">
          Shop the Collection <ArrowRight width="17" height="17" />
        </a>
      </div>

      {/* ---- 3 · Studio Collection ---- */}
      <Link className="hero-cell hero-cell--season" to="/pages/studio-collection" data-hero="cell">
        <img src={IMG.season} alt="Model in a red hand-embroidered bridal lehenga in a studio setting" />
        <span className="hero-cell__scrim" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--bottom">
          <em>Studio</em>
          Collection
          <ArrowRight width="16" height="16" />
        </span>
      </Link>

      {/* ---- 4 · Craft Traditions of Kutch ---- */}
      <Link className="hero-cell hero-cell--thread" to="/pages/video" data-hero="cell">
        <img src={IMG.thread} alt="Embroiderers of Kutch working together outside their village" />
        <span className="hero-cell__scrim" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--bottom">
          <em>Craft Traditions</em>
          of Kutch
          <ArrowRight width="16" height="16" />
        </span>
      </Link>

      {/* ---- 5 · The Shrujan Story ----
           An <a>, not a <div>, so all six bento cards are clickable as a set.
           The inner "read more" is a <span> for that reason: an anchor inside
           an anchor is invalid and browsers unnest it. */}
      <Link className="hero-cell hero-cell--story" to="/pages/the-shrujan-story" data-hero="cell">
        <img src={IMG.story} alt="" aria-hidden="true" />
        <span className="hero-cell__scrim hero-cell__scrim--story" aria-hidden="true" />
        <p className="hero-story__title">
          Rooted in heritage.
          <br />
          Made for tomorrow.
        </p>
        <p className="hero-story__copy">Supporting artisans since 1969.</p>
        <span className="hero-story__link">
          The Shrujan Story <ArrowRight width="15" height="15" />
        </span>
      </Link>

      {/* ---- 6 · LLDC ---- */}
      <Link className="hero-cell hero-cell--accessories" to="/pages/lldc" data-hero="cell">
        <img src={IMG.accessories} alt="An artisan at work in the Living &amp; Learning Design Centre studio" />
        <span className="hero-cell__scrim" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--bottom">
          <em>LLDC</em>
          Living &amp; Learning
          <br />
          Design Centre
          <ArrowRight width="16" height="16" />
        </span>
      </Link>

      {/* ---- 7 · Visit & Experience ---- */}
      <Link className="hero-cell hero-cell--india" to="/pages/visit-experience" data-hero="cell">
        <span className="hero-india__map" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--bottom hero-cell__label--ink">
          <em>Visit &amp;</em>
          Experience
          <ArrowRight width="16" height="16" />
        </span>
      </Link>
    </section>
  )
}
