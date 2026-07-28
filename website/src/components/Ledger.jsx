import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { ArrowRight } from './Icons.jsx'

/* This Week's Index — products as a typographic list, not cards.
   Hovering a line dims the rest and pulls a preview plate along under the
   cursor. Every other product section on this page is image-first; this one
   is type-first, which is the whole point of putting it here. */

const INDEX = [
  {
    name: 'Indigo Mirror-Work Jacket',
    craft: 'Aabhla · Kutch',
    maker: 'Hansiba, Bhirandiara',
    days: '18 days on the frame',
    price: '₹ 15,600',
    img: '/frame-r1t20.jpg',
    alt: 'Model in an indigo mirror-work jacket over an olive dress',
  },
  {
    name: 'Coral Kutchi Sari',
    craft: 'Kutchi hand-embroidery',
    maker: 'Jiviben, Sumrasar',
    days: '26 days on the frame',
    price: '₹ 6,400',
    img: '/frame-r2t5.jpg',
    alt: 'Model in a coral Kutchi hand-embroidered sari',
  },
  {
    name: 'Red Bridal Lehenga',
    craft: 'Zardozi · Bhuj atelier',
    maker: 'Atelier team of nine',
    days: '94 days on the frame',
    price: '₹ 64,000',
    img: '/look-b2.png',
    alt: 'Model in a red bridal lehenga with a net dupatta',
  },
  {
    name: 'Ivory Chikankari Set',
    craft: 'Chikankari · Lucknow',
    maker: 'Rehana, Chowk',
    days: '31 days on the frame',
    price: '₹ 14,800',
    img: '/look-b3.png',
    alt: 'Model in an ivory chikankari kurta set with a red-bordered dupatta',
  },
  {
    name: 'Gold Chandbali Earrings',
    craft: 'Brass & pearl · Bhuj',
    maker: 'Devji, Old Market',
    days: '4 days at the bench',
    price: '₹ 3,200',
    img: '/hero-bottom.png',
    alt: 'Gold chandbali earrings with pearls on a brass plate',
  },
  {
    name: 'Zari Silk Gift Length',
    craft: 'Zari · Varanasi',
    maker: 'Ashraf, Madanpura',
    days: '12 days on the loom',
    price: '₹ 4,200',
    img: '/hero-beside-right.png',
    alt: 'Close crop of crimson silk with gold zari embroidery',
  },
]

export default function Ledger() {
  const root = useRef(null)
  const list = useRef(null)
  const preview = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  // Last cursor position in viewport coordinates. The plate is positioned in
  // section coordinates, so scrolling has to re-derive one from the other.
  const cursor = useRef(null)

  const [active, setActive] = useState(-1)
  // The plate only makes sense when a pointer is driving it — keyboard focus
  // gets the dimming and the row highlight, but no plate parked at 0,0.
  const [pointing, setPointing] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Only wire the cursor-follow where there's a cursor to follow.
      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        xTo.current = gsap.quickTo(preview.current, 'x', { duration: 0.5, ease: 'power3' })
        yTo.current = gsap.quickTo(preview.current, 'y', { duration: 0.5, ease: 'power3' })

        // The cursor can sit still while the page moves under it: re-test what
        // is beneath it on every scroll frame and re-pin the plate, or it
        // drifts off with the section and the wrong row stays lit.
        let queued = false

        const resync = () => {
          queued = false
          const at = cursor.current
          if (!at || !xTo.current) return

          const under = document.elementFromPoint(at.x, at.y)
          const row = under?.closest?.('.ledger-row')

          if (!row || !list.current?.contains(row)) {
            setActive(-1)
            setPointing(false)
            cursor.current = null
            return
          }

          const r = root.current.getBoundingClientRect()
          // second arg makes quickTo snap rather than ease — the plate must
          // stay welded to the cursor while the page moves
          xTo.current(at.x - r.left, at.x - r.left)
          yTo.current(at.y - r.top, at.y - r.top)
          setActive(Number(row.dataset.index))
        }

        const onScroll = () => {
          if (queued || !cursor.current) return
          queued = true
          requestAnimationFrame(resync)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
      })
    },
    { scope: root },
  )

  const track = (e) => {
    if (!xTo.current) return
    cursor.current = { x: e.clientX, y: e.clientY }
    const r = root.current.getBoundingClientRect()
    xTo.current(e.clientX - r.left)
    yTo.current(e.clientY - r.top)
  }

  const enter = (i, e) => {
    // Jump the plate to the cursor on first entry, or it flies in from 0,0.
    if (!pointing && xTo.current) {
      const r = root.current.getBoundingClientRect()
      gsap.set(preview.current, { x: e.clientX - r.left, y: e.clientY - r.top })
    }
    cursor.current = { x: e.clientX, y: e.clientY }
    setPointing(true)
    setActive(i)
  }

  const leave = () => {
    cursor.current = null
    setActive(-1)
    setPointing(false)
  }

  return (
    <section
      className={
        'section container ledger' +
        (active > -1 ? ' is-browsing' : '') +
        (pointing && active > -1 ? ' is-pointing' : '')
      }
      id="index"
      ref={root}
    >
      <div className="section-head" data-reveal>
        <div className="section-head__titles">
          <p className="eyebrow">Fresh from the atelier</p>
          <h2 className="section-title">
            This week&apos;s <em>index</em>
          </h2>
        </div>

        <p className="ledger__note">
          Six pieces, listed in the order they left the Bhuj studio — with the
          hands that made them and the time each one took.
        </p>
      </div>

      {/* The plate rides the cursor. GSAP owns the outer element's transform,
          so the scale-in lives on an inner wrapper — a CSS `scale` on the same
          element composites after `transform` and would drag the position with
          it. All six images are preloaded; one is faded in. */}
      <div className="ledger__preview" ref={preview} aria-hidden="true">
        <div className="ledger__plate">
          {INDEX.map((p, i) => (
            <img
              key={p.name}
              src={p.img}
              alt=""
              loading="lazy"
              className={active === i ? 'is-shown' : undefined}
            />
          ))}
        </div>
      </div>

      {/* Tracking lives on the list, not the section: leaving the list for the
          heading or the button below has to clear the plate too. */}
      <ol
        className="ledger__list"
        data-reveal-child
        ref={list}
        onPointerMove={track}
        onPointerLeave={leave}
      >
        {INDEX.map((p, i) => (
          <li key={p.name}>
            <a
              className={`ledger-row${active === i ? ' is-active' : ''}`}
              href="#"
              data-index={i}
              onPointerEnter={(e) => enter(i, e)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(-1)}
            >
              <span className="ledger-row__no">{String(i + 1).padStart(2, '0')}</span>

              {/* stands in for the cursor plate where there is no hover */}
              <span className="ledger-row__thumb">
                <img src={p.img} alt={p.alt} loading="lazy" />
              </span>

              <span className="ledger-row__name">{p.name}</span>
              <span className="ledger-row__craft">{p.craft}</span>

              <span className="ledger-row__maker">
                {p.maker}
                <em>{p.days}</em>
              </span>

              <span className="ledger-row__price">{p.price}</span>

              <span className="ledger-row__go" aria-hidden="true">
                <ArrowRight width="16" height="16" />
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="ledger__more" data-reveal>
        <a className="btn btn--ghost" href="#">
          Browse everything new <ArrowRight width="16" height="16" />
        </a>
      </div>
    </section>
  )
}
