import { ArrowRight } from './Icons.jsx'
import { Link } from 'react-router-dom'

/* Our Craft — a heritage wall. Eight archive photographs hung in two
   staggered rows; hovering a frame widens it while the others in its row
   give way — the same flex-grow move the old category band used, but on
   landscape frames, never tall slivers. Gerua dots sit in the offsets the
   second row leaves free. */

const ROWS = [
  [
    { img: '/story-origin-1.webp', alt: 'Archive photograph from the founding years of Shrujan', cap: 'The first stitches, 1969' },
    { img: '/story-chanda.webp', alt: 'Chanda Shroff, the founder of Shrujan', cap: 'Chanda “Kaki” Shroff' },
    { img: '/craft-hero.webp', alt: 'Embroiderers of Kutch working together outside their village', cap: 'The embroiderers of Kutch' },
    { img: '/story-origin-2.webp', alt: 'Archive photograph of early Shrujan embroidery work', cap: 'From the archive' },
  ],
  [
    { img: '/story-dignity.webp', alt: 'An artisan at work, photographed in her village', cap: 'Dignity in work' },
    { img: '/story-origin-3.webp', alt: 'Archive photograph of a village workshop', cap: 'Village workshops' },
    { img: '/story-continuity.webp', alt: 'A younger embroiderer learning the craft', cap: 'Craft, carried forward' },
    { img: '/story-origin-4.webp', alt: 'Archive photograph of Shrujan artisans', cap: 'Five decades on' },
  ],
]

const STATS = [
  { value: '1969', label: 'Founded by Chanda Shroff' },
  { value: '5', label: 'Decades of craft revival' },
  { value: '12', label: 'Living craft traditions' },
  { value: '4,000+', label: 'Artisan women at work' },
]

export default function CraftStory() {
  return (
    <section className="section container" id="craft">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Our Craft</p>
        <h2 className="section-title">
          Every stitch carries <em>a signature</em>
        </h2>
      </div>

      {/* one reveal for the whole wall — per-tile reveals would leave GSAP
          transforms behind the flex-grow hover */}
      <div className="craft-wall" data-reveal>
        {ROWS.map((row, r) => (
          <div
            className={`craft-wall__row${r === 1 ? ' craft-wall__row--offset' : ''}`}
            key={r}
          >
            {row.map((t) => (
              <figure className="craft-wall__tile" key={t.img}>
                <img src={t.img} alt={t.alt} loading="lazy" />
                <figcaption>{t.cap}</figcaption>
              </figure>
            ))}
          </div>
        ))}

        <span className="craft-wall__dot craft-wall__dot--a" aria-hidden="true" />
        <span className="craft-wall__dot craft-wall__dot--b" aria-hidden="true" />
        <span className="craft-wall__dot craft-wall__dot--c" aria-hidden="true" />
      </div>

      <div className="craft-wall__more" data-reveal>
        <Link className="arrow-link" to="/pages/video">
          Explore the Craft <ArrowRight width="16" height="16" />
        </Link>
      </div>

      {/* ── stats ── */}
      <div className="craft__stats" data-reveal-child>
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <p className="stat__value">{s.value}</p>
            <p className="stat__label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
