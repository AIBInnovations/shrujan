import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import { STRANDS } from '../data/studio.js'

/* Studio Collection — the parent of the three strands the brand publishes
   separately (Heritage, Avinya, Gifting), and the limited line itself.
   Structure: the three strands up top so the page is a way in rather than a
   dead end, then numbered editorial spreads that alternate side to side. No
   grid, no cards for those: each piece gets a full row to itself, which is the
   point of a small collection. */

const SPREADS = [
  {
    no: '01',
    name: 'The Kanchli, reworked',
    craft: 'Aabhla · Kutch',
    copy: 'The Kutchi bodice cut for a modern silhouette, the mirror-work kept exactly as it has always been stitched. Sixty hours on the frame before a single seam is closed.',
    facts: ['Hand-embroidered', '60 hours', 'Edition of 24'],
    img: '/sj-black-pakko-hand-embroidered-kanchli-1.webp',
    alt: 'Model in a dark embroidered kanchli with a black silk drape',
  },
  {
    no: '02',
    name: 'Bandhani, tied by hand',
    craft: 'Bandhani · Kutch',
    copy: 'Thousands of points tied one at a time before the cloth ever meets dye. The pattern only reveals itself when the knots come loose — no two lengths finish alike.',
    facts: ['Natural dye', '3 weeks', 'Edition of 18'],
    img: '/sj-dupatta-copy-2-1.webp',
    alt: 'Blue and orange bandhani dupatta over an ivory kurta',
  },
  {
    no: '03',
    name: 'Suf, counted from the reverse',
    craft: 'Suf · Kutch',
    copy: 'Suf is worked from the back of the cloth, counted thread by thread, with no pattern ever drawn. The embroiderer holds the whole geometry in her head.',
    facts: ['Counted thread', 'No pattern drawn', 'Edition of 12'],
    img: '/sj-green-hand-woven-top-1.webp',
    alt: 'Model in a green embroidered shirt',
  },
  {
    no: '04',
    name: 'Handloom, woven in Bhujodi',
    craft: 'Handloom · Bhujodi',
    copy: 'Woven on pit looms a few kilometres from the atelier, in wool and cotton spun for the desert winter. It softens with every wash rather than fading.',
    facts: ['Pit loom', 'Wool & cotton', 'Edition of 30'],
    img: '/sj-shawl-copy-3-1.webp',
    alt: 'Pink and grey handwoven stole',
  },
]

export default function StudioCollection() {
  return (
    <div className="page">
      {/* framed and centred, the way the Craft and LLDC mastheads sit */}
      <PageHero
        variant="cover"
        frame
        eyebrow="Studio Collection"
        title={
          <>
            Small runs, <em>signed</em> by the maker
          </>
        }
        image="/look-b2.webp"
        alt="Model in a red bridal lehenga with a net dupatta"
      />

      {/* ---- the three strands, each its own page ---- */}
      <section className="section container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">Studio Collection</p>
          <h2 className="section-title">Three strands, three ways in</h2>
        </div>

        <ul className="strand-cards" data-reveal-child>
          {STRANDS.map((s) => (
            <li key={s.key}>
              <Link className="strand-card" to={s.to}>
                <span className="strand-card__media">
                  <img src={s.img} alt={s.alt} loading="lazy" />
                </span>
                <span className="strand-card__no">{s.no}</span>
                <span className="strand-card__name">{s.label}</span>
                <span className="strand-card__copy">{s.copy}</span>
                <span className="strand-card__cta">
                  Open <ArrowRight width="15" height="15" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="section container studio">
        {SPREADS.map((s) => (
          <article className="studio-row" key={s.no} data-reveal>
            <div className="studio-row__media" data-parallax>
              <img src={s.img} alt={s.alt} loading="lazy" />
            </div>

            <div className="studio-row__body">
              <span className="studio-row__no" aria-hidden="true">
                {s.no}
              </span>
              <p className="studio-row__craft">{s.craft}</p>
              <h2 className="studio-row__name">{s.name}</h2>
              <p className="studio-row__copy">{s.copy}</p>

              <ul className="studio-row__facts">
                {s.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <a
                className="arrow-link studio-row__link"
                href={`mailto:marketing@shrujan.com?subject=${encodeURIComponent(
                  `Studio enquiry — ${s.name}`,
                )}`}
              >
                Enquire about this piece <ArrowRight width="16" height="16" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <section className="section container page-cta" data-reveal>
        <p>The next collection opens to the list first.</p>
        <a className="btn" href="#letters">
          Join the studio list <ArrowRight width="16" height="16" />
        </a>
      </section>
    </div>
  )
}
