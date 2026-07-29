import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import PageHero from '../components/PageHero.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import { CRAFTS, CRAFT_INTRO } from '../data/crafts.js'
import { scrollToY } from '../hooks/useSmoothScroll.js'
import { Link } from 'react-router-dom'

/* Craft Traditions of Kutch — /pages/video.

   Six long-form craft entries, one film each. Rendering six <video> elements
   would mean six posters and six media pipelines on a page most people scroll
   past once, so the films share a single player that lives in a sticky column
   and swaps source as the reader moves from one craft to the next. The text
   column is what drives it: a ScrollTrigger per article reports which craft
   owns the viewport, and the player follows.

   That layout also survives the phone. The media column simply becomes the
   top of the stack and stays sticky there, so the film is still on screen
   while its own paragraphs scroll underneath. */

const STICKY_TOP = 96 // clears the fixed header at its tallest

export default function CraftTraditions() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(null) // slug whose full text is expanded
  // The films run to ~10MB each. Nothing plays — and so nothing downloads
  // beyond its poster — until the player has actually reached the viewport.
  const [armed, setArmed] = useState(false)

  const root = useRef(null)
  const videoRef = useRef(null)
  const articles = useRef([])
  const craft = CRAFTS[active]

  // Swapping the <source> alone will not restart playback; the element has to
  // be told to reload before it will pick the new file up.
  useEffect(() => {
    const v = videoRef.current
    if (!v || !armed) return
    // React does not reliably reflect the `muted` attribute onto the element,
    // and an unmuted <video> is refused autoplay outright — set the property.
    v.muted = true
    v.load()
    v.play().catch(() => {})
  }, [active, armed])

  // Expanding an entry changes every article boundary below it, and the
  // triggers were measured against the old ones.
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [open])

  useGSAP(
    () => {
      // Deliberately outside matchMedia: these triggers animate nothing, they
      // only report which craft owns the viewport. Skipping them for
      // reduced-motion visitors would leave the player stuck on craft 01 while
      // they read craft 05.
      articles.current.forEach((el, i) => {
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          // onToggle rather than onEnter/onEnterBack, so scrolling up reports
          // the same boundaries scrolling down did
          start: `top ${STICKY_TOP + 180}px`,
          end: `bottom ${STICKY_TOP + 180}px`,
          onToggle: (self) => self.isActive && setActive(i),
        })
      })

      ScrollTrigger.create({
        trigger: '.craft-atlas',
        start: 'top 70%',
        once: true,
        onEnter: () => setArmed(true),
      })
    },
    { scope: root, revertOnUpdate: true },
  )

  // The index chips scroll the matching article to just under the player.
  const goTo = (i) => {
    const el = articles.current[i]
    if (!el) return
    setActive(i)
    scrollToY(el.getBoundingClientRect().top + window.scrollY - STICKY_TOP - 40)
  }

  return (
    <div className="page" ref={root}>
      <PageHero
        variant="cover"
        frame
        image="/craft-hero.webp"
        alt="Embroiderers of Kutch at work together outside their village, hand-stitching cloth across their laps"
        eyebrow="Craft Traditions of Kutch"
        title={
          <>
            Six living crafts, <em>one desert</em>
          </>
        }
      />

      {/* ---- the page's own opening, set as an editorial spread ---- */}
      <section className="section container craft-open" data-reveal>
        <p className="craft-open__lead">
          Each craft carries its own materials, techniques and{' '}
          <em>cultural memory</em>.
        </p>
        <div className="craft-open__copy">
          {CRAFT_INTRO.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      {/* ---- the atlas: one sticky player, six articles ---- */}
      <section className="section craft-atlas" aria-label="The crafts">
        <div className="container craft-atlas__grid">
          <div className="craft-atlas__media">
            <div className="craft-stage">
              {/* one element, six sources — see the note at the top of the
                  file. No `key`: remounting would throw away the element the
                  browser has already warmed up.
                  No `controls` either — the films run as a silent loop beside
                  the text, so a scrubber and a timer would only put browser
                  chrome over the footage every time the cursor passed. */}
              <video
                ref={videoRef}
                className="craft-stage__video"
                poster={craft.poster}
                playsInline
                muted
                loop
                preload="none"
                tabIndex={-1}
              >
                <source src={craft.src} type="video/mp4" />
              </video>

              <div className="craft-stage__tag" aria-hidden="true">
                <span className="craft-stage__no">{craft.no}</span>
                <span className="craft-stage__name">{craft.name}</span>
              </div>
            </div>

            {/* index — doubles as the progress read-out for the sticky player */}
            <ol className="craft-index">
              {CRAFTS.map((c, i) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    className={`craft-index__pick${i === active ? ' is-active' : ''}`}
                    aria-current={i === active ? 'true' : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className="craft-index__no">{c.no}</span>
                    <span className="craft-index__name">{c.short}</span>
                  </button>
                </li>
              ))}
            </ol>

            <p className="craft-credit">
              Films from the{' '}
              <Link to="/pages/lldc">Living &amp; Learning Design Centre</Link>, Bhuj
            </p>
          </div>

          <div className="craft-atlas__text">
            {CRAFTS.map((c, i) => {
              // Pottery runs to eight paragraphs and weaving to one; showing
              // the first two and folding the rest keeps the entries roughly
              // the same height, which is what the sticky player needs.
              const isOpen = open === c.slug
              const shown = isOpen ? c.body : c.body.slice(0, 2)
              const hidden = c.body.length - shown.length

              return (
                <article
                  key={c.slug}
                  id={c.slug}
                  className={`craft-entry${i === active ? ' is-active' : ''}`}
                  ref={(el) => {
                    // braces on purpose: React 19 treats a returned value from
                    // a ref callback as a cleanup function
                    articles.current[i] = el
                  }}
                >
                  <p className="craft-entry__eyebrow">
                    <span aria-hidden="true">{c.no}</span> {c.tag}
                  </p>
                  <h2 className="craft-entry__title">{c.name}</h2>

                  <dl className="craft-facts">
                    {c.facts.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="craft-entry__body" id={`${c.slug}-body`}>
                    {shown.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>

                  {c.body.length > 2 && (
                    <button
                      type="button"
                      className="craft-entry__more arrow-link"
                      aria-expanded={isOpen}
                      aria-controls={`${c.slug}-body`}
                      onClick={() => setOpen(isOpen ? null : c.slug)}
                    >
                      {isOpen ? 'Read less' : `Read more · ${hidden} more`}
                    </button>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section container page-cta" data-reveal>
        <p>See these crafts on the cloth itself.</p>
        <Link className="btn" to="/pages/shop-shrujan">
          Shop by craft <ArrowRight width="16" height="16" />
        </Link>
      </section>
    </div>
  )
}
