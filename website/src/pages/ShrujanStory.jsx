import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import { scrollToY } from '../hooks/useSmoothScroll.js'
import { ORIGIN, VALUES, PEOPLE, JOURNAL, PRESS, CHAPTERS } from '../data/story.js'

/* The Shrujan Story — the five chapters the brand publishes as separate pages,
   gathered into one: Origins, Philosophy & Values, The People of Shrujan,
   Photo Journal and In the Media. All copy and photography is Shrujan's own;
   only the arrangement is ours.

   The chapter rail sits under the masthead and scrolls away with it. It is
   intentionally not pinned: held on screen it tracked down the whole page and
   sat over the body copy. */

export default function ShrujanStory() {
  const [lightbox, setLightbox] = useState({ items: [], index: -1 })
  const [active, setActive] = useState('origins')
  const { hash, key } = useLocation()

  const openLightbox = (items, index) => setLightbox({ items, index })
  const closeLightbox = () => setLightbox((s) => ({ ...s, index: -1 }))

  // Land a section clear of the floating header, which reappears on scroll up.
  // Measured rather than assumed: the bar's height changes with the breakpoint.
  const jumpOffset = () => (document.querySelector('.site-header')?.offsetHeight ?? 0) + 28

  // Deep links (/pages/the-shrujan-story#press) and the header's Story dropdown.
  // App resets scroll to the top on every pathname change, so this has to run
  // after that — hence the double rAF rather than a plain effect body.
  useEffect(() => {
    if (!hash) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (!el) return
        scrollToY(el.getBoundingClientRect().top + window.scrollY - jumpOffset())
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [hash, key])

  // Light up the chapter the reader is actually in. rootMargin biases the
  // decision to the upper third so a section counts as "current" once its head
  // is near the top, not when it happens to cross the middle.
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean)
    if (!sections.length) return

    // A callback only carries the sections whose state CHANGED, so it cannot be
    // read on its own — when one scrolls out its entry arrives alone and would
    // look like the answer. Keep the live set across callbacks and decide from
    // that.
    const inBand = new Set()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) inBand.add(e.target)
          else inBand.delete(e.target)
        })
        if (!inBand.size) return
        // At a boundary two sections straddle the band: the outgoing one's top
        // is far above, the incoming one's is just inside. Take the greatest
        // top — the last section to have started — or the rail reads one behind.
        const current = [...inBand].sort(
          (a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top,
        )[0]
        setActive(current.id)
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const jumpTo = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    scrollToY(el.getBoundingClientRect().top + window.scrollY - jumpOffset())
  }

  return (
    <>
      <PageHero
        variant="ghost"
        ghost="1969"
        eyebrow="The Shrujan Story"
        title="Fifty years of dignity, stitched by hand"
        lede="The first social enterprise in the crafts sector to turn embroidery into a livelihood for the craftswomen of Kutch."
        meta={ORIGIN.stats.slice(0, 3)}
        image="/story-origin-2.webp"
        alt="Craftswomen of Kutch at work on embroidery"
      />

      {/* ---- chapter rail ---- */}
      <nav className="chapters" aria-label="Story chapters">
        <div className="container chapters__inner">
          <ol className="chapters__list">
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className={`chapters__link${active === c.id ? ' is-active' : ''}`}
                  aria-current={active === c.id ? 'true' : undefined}
                  onClick={(e) => jumpTo(e, c.id)}
                >
                  <span className="chapters__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="chapters__label">{c.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* ---- 01 Origins ---- */}
      <section className="section container" id="origins">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">{ORIGIN.eyebrow}</p>
          <h2 className="section-title">{ORIGIN.title}</h2>
        </div>

        <div className="origin" data-reveal>
          <p className="origin__lead">{ORIGIN.lead}</p>
          <div className="origin__body">
            {ORIGIN.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="origin__gallery" data-reveal-child>
          {ORIGIN.images.map((im) => (
            <figure className="origin__shot" key={im.src}>
              <img src={im.src} alt={im.alt} loading="lazy" />
            </figure>
          ))}
        </div>

        <blockquote className="origin__pull" data-reveal>
          {ORIGIN.pull}
        </blockquote>

        <div className="craft__stats" data-reveal-child>
          {ORIGIN.stats.map((s) => (
            <div className="stat" key={s.label}>
              <p className="stat__value">{s.value}</p>
              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- 02 Philosophy & Values ---- */}
      <section className="section container" id="values">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">Philosophy &amp; Values</p>
          <h2 className="section-title">What the work is built on</h2>
        </div>

        <div className="values" data-reveal-child>
          {VALUES.map((v, i) => (
            <article className={`value value--${v.key}`} key={v.key}>
              <div className="value__media">
                <img src={v.img} alt={v.alt} loading="lazy" />
              </div>
              <div className="value__body">
                <p className="value__no">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="value__title">{v.title}</h3>
                <p className="value__copy">{v.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---- 03 The People of Shrujan ---- */}
      <section className="section container" id="people">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">The People of Shrujan</p>
          <h2 className="section-title">The hands behind the house</h2>
        </div>

        <div className="people" data-reveal-child>
          {PEOPLE.map((p) => (
            <article className="person" key={p.name}>
              <div className="person__media">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <h3 className="person__name">{p.name}</h3>
              <p className="person__role">{p.role}</p>
              <p className="person__copy">{p.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---- 04 Photo Journal ---- */}
      <section className="section container" id="journal">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">Photo Journal</p>
          <h2 className="section-title">Fifty years, from the archive</h2>
          <p className="section-intro__copy">
            Frames from the Shrujan archive, from the earliest village visits to the
            craftswomen at work today.
          </p>
        </div>

        <div className="journal-bento" data-reveal-child>
          {JOURNAL.map((j, i) => (
            <button
              type="button"
              className={`jshot jshot--${j.span}`}
              key={j.src}
              onClick={() =>
                openLightbox(
                  JOURNAL.map((x) => ({ src: x.src, alt: x.alt, caption: x.alt })),
                  i,
                )
              }
              aria-label={`Open photograph: ${j.alt}`}
            >
              <img src={j.src} alt={j.alt} loading="lazy" />
              <span className="jshot__cap">{j.alt}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ---- 05 In the Media ---- */}
      <section className="section container" id="press">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">In the Media</p>
          <h2 className="section-title">Written about elsewhere</h2>
          <p className="section-intro__copy">
            Tearsheets as they were printed. Open any page to read it full size.
          </p>
        </div>

        <div className="press" data-reveal-child>
          {PRESS.map((p) => (
            <article className="press__item" key={p.key}>
              <div className="press__meta">
                {p.section && <p className="press__section">{p.section}</p>}
                <h3 className="press__pub">{p.publication}</h3>
                <p className="press__head" lang={p.translation ? 'gu' : undefined}>
                  {p.headline}
                </p>
                {p.translation && <p className="press__trans">{p.translation}</p>}
                {p.byline && <p className="press__byline">By {p.byline}</p>}
                <p className="press__note">{p.note}</p>
                <ul className="press__facts">
                  {p.date && <li>{p.date}</li>}
                  {p.issue && <li>{p.issue}</li>}
                  <li>
                    {p.pages.length} page{p.pages.length > 1 ? 's' : ''}
                  </li>
                </ul>
              </div>

              <div className="press__sheets">
                {p.pages.map((src, i) => (
                  <button
                    type="button"
                    className="press__sheet"
                    key={src}
                    onClick={() =>
                      openLightbox(
                        p.pages.map((s, n) => ({
                          src: s,
                          alt: `${p.publication}: ${p.headline}, page ${n + 1}`,
                          caption: `${p.publication} · ${p.headline} · page ${n + 1} of ${p.pages.length}`,
                        })),
                        i,
                      )
                    }
                    aria-label={`Read ${p.publication}, page ${i + 1}`}
                  >
                    <img src={src} alt={`${p.publication}, page ${i + 1}`} loading="lazy" />
                    <span className="press__pageno">{String(i + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="curated__more" data-reveal>
          <Link className="btn btn--ghost" to="/pages/lldc">
            The Living &amp; Learning Design Centre <ArrowRight width="16" height="16" />
          </Link>
        </div>
      </section>

      <Lightbox
        items={lightbox.items}
        index={lightbox.index}
        onClose={closeLightbox}
        onIndex={(i) => setLightbox((s) => ({ ...s, index: i }))}
      />
    </>
  )
}
