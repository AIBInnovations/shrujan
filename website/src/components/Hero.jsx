import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from './Icons.jsx'

const IMG = {
  model: '/hero-left.png',
  season: '/hero-right.png',
  thread: '/hero-beside-right.png',
  accessories: '/hero-bottom.png',
  story: '/hero-bottom-2.png',
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
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 },
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
          .fromTo('[data-hero="copy"]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.9)
          .fromTo('[data-hero="cta"]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 1.02)
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-hero], .hero-message__title .line > span', { clearProps: 'all', autoAlpha: 1 })
      })
    },
    { scope: root },
  )

  return (
    <section className="hero" ref={root} aria-label="Tradition, styled forward">
      {/* ---- 1 · model ---- */}
      <a className="hero-cell hero-cell--model" href="#" data-hero="cell">
        <img
          src={IMG.model}
          alt="Model in a rust-red ajrakh kurta with gold jewellery before an arched wall"
          fetchpriority="high"
        />
        <span className="hero-cell__label">
          <i className="hero-cell__dash" aria-hidden="true" />
          Handcrafted
          <br />
          Heritage.
          <br />
          Modern
          <br />
          Soul.
        </span>
      </a>

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

      {/* ---- 3 · new season ---- */}
      <a className="hero-cell hero-cell--season" href="#" data-hero="cell">
        <img src={IMG.season} alt="Model in a plum embroidered jacket set standing in an arched sand niche" />
        <span className="hero-cell__scrim" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--bottom">
          <em>New Season</em>
          Statement Looks
          <ArrowRight width="16" height="16" />
        </span>
      </a>

      {/* ---- 4 · craft in every thread ---- */}
      <a className="hero-cell hero-cell--thread" href="#" data-hero="cell">
        <img src={IMG.thread} alt="Close crop of crimson silk with gold zari embroidery and sequin borders" />
        <span className="hero-cell__scrim" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--bottom">
          <em>Craft</em>
          In Every Thread
          <ArrowRight width="16" height="16" />
        </span>
      </a>

      {/* ---- 5 · plum story panel ---- */}
      <div className="hero-cell hero-cell--story" data-hero="cell">
        <img src={IMG.story} alt="" aria-hidden="true" />
        <span className="hero-cell__scrim hero-cell__scrim--story" aria-hidden="true" />
        <p className="hero-story__title">
          Rooted in heritage.
          <br />
          Made for tomorrow.
        </p>
        <p className="hero-story__copy">
          Supporting artisans.
          <br />
          Preserving traditions.
          <br />
          Creating lasting impact.
        </p>
        <a className="hero-story__link" href="#craft">
          Our Story <ArrowRight width="15" height="15" />
        </a>
      </div>

      {/* ---- 6 · accessories ---- */}
      <a className="hero-cell hero-cell--accessories" href="#" data-hero="cell">
        <img src={IMG.accessories} alt="Gold chandbali earrings with pearls resting on a brass plate" />
        <span className="hero-cell__scrim" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--bottom">
          Accessories that
          <br />
          complete the story
          <ArrowRight width="16" height="16" />
        </span>
      </a>

      {/* ---- 7 · crafted in India ---- */}
      <a className="hero-cell hero-cell--india" href="#craft" data-hero="cell">
        <span className="hero-india__map" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--bottom hero-cell__label--ink">
          <em>Crafted</em>
          In India
          <ArrowRight width="16" height="16" />
        </span>
      </a>
    </section>
  )
}
