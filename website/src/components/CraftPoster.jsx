import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons.jsx'

gsap.registerPlugin(ScrollTrigger)

/* From the Studio Archive — the Kaarigar art, hung between the marquee and
   the heritage spotlight. The six painted panels sit straight on the page
   ground (the artwork carries its own transparency — no card behind it).
   One move on scroll: the art arrives black-and-white and takes its colour
   back as the section moves through the viewport, scrubbed to the scroll
   the same way the reels seal and the spotlight arc are. */

function StampSeal() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id="poster-arc" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="1" />
      <text>
        <textPath href="#poster-arc" startOffset="0">
          SHRUJAN · BHUJ · SINCE 1969 · KUTCH ·
        </textPath>
      </text>
      <text x="60" y="65" textAnchor="middle" className="poster-stamp__glyph">
        ✦
      </text>
    </svg>
  )
}

export default function CraftPoster() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.poster__art img',
          { filter: 'grayscale(1)' },
          {
            filter: 'grayscale(0)',
            ease: 'none',
            scrollTrigger: {
              trigger: '.poster__art',
              start: 'top 88%',
              end: 'center 48%',
              scrub: 0.6,
            },
          },
        )
      })

      // reduced motion: the art simply is there, in colour
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.poster__art img', { clearProps: 'filter' })
      })
    },
    { scope: root },
  )

  return (
    <section
      className="section poster"
      id="kaarigar"
      ref={root}
      aria-label="Kaarigar — the makers of Kutch, from the studio archive"
    >
      <div className="container poster__stage">
        {/* ---- curator's note, top right ---- */}
        <div className="poster__note poster__note--tr" data-reveal>
          <p className="eyebrow">From the Studio Archive</p>
          <p className="poster__lead">
            Six pairs of hands,
            <br />
            <em>one piece of cloth.</em>
          </p>
          <p className="poster__copy">
            Kadhai, ajrakh, discharge, bunai, mitti kala, tie-dye — the living
            crafts of Kutch, painted the way our first posters were.
          </p>
        </div>

        {/* ---- the art, centred on the page ground ---- */}
        <figure className="poster__art">
          <img
            src="/art.png"
            alt="Hand-painted panels titled Kaarigar: six Kutchi artisans at work across embroidery, ajrakh block printing, discharge printing, weaving, pottery and tie-dye"
            loading="lazy"
          />
          <figcaption className="poster__caption">
            <span aria-hidden="true">—</span> कारीगर · The Makers of Kutch{' '}
            <span aria-hidden="true">—</span>
          </figcaption>
        </figure>

        {/* ---- plate line, bottom left ---- */}
        <div className="poster__note poster__note--bl" data-reveal>
          <p className="poster__plate">Archive print no. 07 · hand-lettered, Bhuj</p>
          <p className="poster__lead poster__lead--quiet">
            <em>Every Shrujan piece passes through hands like these.</em>
          </p>
          <Link className="arrow-link poster__link" to="/pages/video">
            Meet the crafts <ArrowRight width="15" height="15" />
          </Link>
        </div>

        {/* ---- ink stamp ---- */}
        <span className="poster__stamp" aria-hidden="true">
          <StampSeal />
        </span>
      </div>
    </section>
  )
}
