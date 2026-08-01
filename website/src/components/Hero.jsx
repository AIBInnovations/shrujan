import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons.jsx'

const IMG = {
  season: '/look-b2.webp',
  thread: '/craft-hero.webp',
  accessories: '/craft-embroidery-poster.webp',
  story: '/story-origin-2.webp',
}

const CRAFT_VIDEOS = [
  '/craft-embroidery.mp4',
  '/craft-ajrakh.mp4',
  '/craft-weaving.mp4',
  '/craft-tiedye.mp4',
  '/craft-discharge.mp4',
  '/craft-pottery.mp4',
]

const CRAFT_POSTERS = [
  '/craft-embroidery-poster.webp',
  '/craft-ajrakh-poster.webp',
  '/craft-weaving-poster.webp',
  '/craft-tiedye-poster.webp',
  '/craft-discharge-poster.webp',
  '/craft-pottery-poster.webp',
]

const CLIP_DURATION = 4000 // ms of each craft shown
const CLIP_SEEK = 6      // seconds into each video to start (middle section)

function CraftMontage() {
  const [idx, setIdx] = useState(0)
  const videoRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true

    const advance = () => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIdx((i) => (i + 1) % CRAFT_VIDEOS.length)
      }, CLIP_DURATION)
    }

    const onSeeked = () => {
      v.play().catch(() => {})
      advance()
    }

    const onLoaded = () => {
      // seek to middle section; seeked fires when ready
      const target = Math.min(CLIP_SEEK, Math.max(0, v.duration / 2 - 2))
      v.currentTime = target
    }

    v.addEventListener('loadedmetadata', onLoaded)
    v.addEventListener('seeked', onSeeked)
    v.load()

    return () => {
      clearTimeout(timerRef.current)
      v.removeEventListener('loadedmetadata', onLoaded)
      v.removeEventListener('seeked', onSeeked)
    }
  }, [idx])

  return (
    <video
      ref={videoRef}
      key={idx}
      className="hero-montage__video"
      poster={CRAFT_POSTERS[idx]}
      playsInline
      muted
      preload="auto"
    >
      <source src={CRAFT_VIDEOS[idx]} type="video/mp4" />
    </video>
  )
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
      {/* ---- 1 · craft montage — opens Craft Traditions, the page the
           films come from ---- */}
      <Link className="hero-cell hero-cell--model" to="/pages/video" data-hero="cell">
        <CraftMontage />
        <span className="hero-cell__scrim hero-cell__scrim--montage" aria-hidden="true" />
        <span className="hero-cell__label hero-cell__label--montage">
          <i className="hero-cell__dash" aria-hidden="true" />
          Woven in Kutch,
          <br />Worn by the World
          <span className="hero-cell__sub">
            Six living crafts, one desert. Hand-embroidered by the women of Kutch since 1969.
          </span>
          <em>Heritage by Hand</em>
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
