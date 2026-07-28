import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const INSTAGRAM = 'https://www.instagram.com/shrujanindia/reels/'

const REELS = [
  { src: '/reel-1.mp4', poster: '/reel-1-poster.jpg', title: 'Indigo mirror-work jacket', meta: '0:27' },
  { src: '/reel-2.mp4', poster: '/reel-2-poster.jpg', title: 'Coral Kutchi embroidered sari', meta: '0:33' },
  { src: '/reel-3.mp4', poster: '/reel-3-poster.jpg', title: 'Sheer embroidered kurta', meta: '0:32' },
  { src: '/reel-4.mp4', poster: '/reel-4-poster.jpg', title: 'Shrujan, since 1969', meta: '0:11' },
  { src: '/reel-5.mp4', poster: '/reel-5-poster.jpg', title: 'Turquoise Kutchi sari', meta: '0:30' },
]

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Reels() {
  const root = useRef(null)
  const railRef = useRef(null)

  // Play only what's on screen — five autoplaying videos at once is wasteful.
  useEffect(() => {
    const vids = railRef.current?.querySelectorAll('video') ?? []
    if (!('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target
          if (entry.isIntersecting) v.play().catch(() => {})
          else v.pause()
        })
      },
      { threshold: 0.35 },
    )

    vids.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.reels__seal',
          { rotation: -60 },
          {
            rotation: 120,
            ease: 'none',
            scrollTrigger: { trigger: '.reels', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section className="section reels" id="reels" ref={root} aria-label="Shrujan in motion">
      <div className="container">
        <div className="reels__head">
          <div className="reels__titles" data-reveal>
            <p className="eyebrow">Shrujan in Motion</p>
            <h2 className="section-title">
              Watch the craft
              <br />
              <em>come alive</em>
            </h2>
          </div>

          <a
            className="reels__seal-link"
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Shrujan reels on Instagram"
          >
            <span className="reels__seal" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="reel-arc" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text>
                  <textPath href="#reel-arc" startOffset="0">
                    WATCH THE CRAFT · SHRUJAN IN MOTION ·
                  </textPath>
                </text>
              </svg>
            </span>
            <span className="reels__seal-badge" aria-hidden="true">
              <InstagramGlyph />
            </span>
          </a>

          <div className="reels__note" data-reveal>
            <p>
              Forty seconds inside the workshop: a needle counting threads, madder
              boiling, a sari taking its first drape.
            </p>
          </div>
        </div>
      </div>

      <div className="reels__rail-wrap">
        <div className="reels__rail" data-reveal-child ref={railRef}>
          {REELS.map((r) => (
            <a
              className="reel"
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              key={r.src}
            >
              <div className="reel__media">
                <video
                  src={r.src}
                  poster={r.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={r.title}
                />
                <span className="reel__scrim" aria-hidden="true" />
                <span className="reel__meta">{r.meta}</span>
              </div>
              <p className="reel__title">{r.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
