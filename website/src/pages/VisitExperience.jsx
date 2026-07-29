import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons.jsx'

/* Visit & Experience — the live site splits this into two quite different
   invitations, so the page does too: come to the campus and watch the work
   happen, or come to Kutch and see where it comes from. The hours, the phone
   numbers and the nature of a campus visit are the brand's own published
   details; the writing around them is ours. */

const WAYS = [
  {
    no: '01',
    kicker: 'By appointment',
    name: 'The Shrujan Campus',
    copy: 'A behind-the-scenes visit, arranged in advance. You follow a piece from an idea through sampling and into production, and see how the design studio and the artisan communities actually work together. It is a visit about process, not a shop.',
    points: ['Design studio & sampling', 'Pre and post production', 'The coordination team'],
    img: '/visit-campus.webp',
    alt: 'The Shrujan studio floor, with racks of finished cloth and staff at work',
    cta: 'Enquire about a visit',
    href: 'mailto:marketing@shrujan.com?subject=Campus%20visit',
  },
  {
    no: '02',
    kicker: 'Any time in season',
    name: 'Kutch itself',
    copy: 'The district the work comes from: craft villages within an hour of Bhuj, a museum built for the embroidery, and a landscape that turns to salt flat and back again. Come for a day, or plan a week around it.',
    points: ['Craft villages & workshops', 'The LLDC museum', 'Palaces, port towns, the Rann'],
    img: '/visit-lakhpat.webp',
    alt: 'The walled fort at Lakhpat above the salt flat',
    cta: 'Plan your trip',
    href: 'tel:+919099974319',
  },
]

const PLACES = [
  {
    no: '01',
    name: 'The Shrujan Campus',
    where: 'Bhuj · by appointment',
    copy: 'The design studio, sampling rooms and production floor, 10am to 7pm.',
    img: '/visit-design-studio.webp',
    alt: 'Designers at work on patterns in the Shrujan studio',
  },
  {
    no: '02',
    name: 'LLDC Museum',
    where: 'Ajrakhpur · 20 min from Bhuj',
    copy: 'The Living & Learning Design Centre — galleries, archive and teaching studios.',
    img: '/visit-lldc.webp',
    alt: 'A round white gallery building on the design centre campus',
    to: '/pages/lldc',
  },
  {
    no: '03',
    name: 'Bhujodi Weavers',
    where: 'Bhujodi · 8 km east',
    copy: 'Pit looms in working homes, weaving wool and cotton for the desert winter.',
    img: '/bottom left.webp',
    alt: 'Master weaver working threads at his handloom',
  },
  {
    no: '04',
    name: 'Ajrakhpur Block Printers',
    where: 'Ajrakhpur',
    copy: 'Resist printing in madder and indigo, sixteen stages deep, done in the open air.',
    img: '/visit-ajrakhpur.webp',
    alt: 'A printer working a block along a long table of cloth',
  },
  {
    no: '05',
    name: 'The Banni Villages',
    where: 'Northern Kutch',
    copy: 'Suf, Mutava and Jat embroidery, in the grasslands the stitches are named after.',
    img: '/visit-banni.webp',
    alt: 'Artisan women embroidering together at the centre',
  },
  {
    no: '06',
    name: 'Vijay Vilas & Lakhpat',
    where: 'Mandvi and the western edge',
    copy: 'A seaside palace and a walled port town the sea left behind.',
    img: '/visit-vijay-vilas.webp',
    alt: 'Vijay Vilas Palace at Mandvi',
  },
]

const PRACTICAL = [
  { k: 'Open', v: '10 AM to 7 PM' },
  { k: 'Campus visits', v: 'By appointment — email or call ahead' },
  { k: 'Email', v: 'marketing@shrujan.com' },
  { k: 'Call', v: '+91 9099 974319 · +91 90818 99882' },
  { k: 'Nearest airport', v: 'Bhuj (BHJ)' },
]

const ITINERARY = [
  { k: 'Half a day', v: 'The campus in the morning, LLDC in the afternoon.' },
  { k: 'One day', v: 'Add the Bhujodi looms and an hour in the Bhuj bazaar.' },
  { k: 'Two days', v: 'Ajrakhpur printing and a Banni village, with an interpreter.' },
  { k: 'A week', v: 'All of it, plus Mandvi, Lakhpat and the Rann at full moon.' },
  { k: 'Best season', v: 'November to February. The desert is unforgiving either side of it.' },
]

export default function VisitExperience() {
  return (
    <div className="page">
      {/* ---- hero: the Rann, with the title centred over it — the same
             treatment the shop banner uses, so the two read as one family ---- */}
      <header className="visit-hero">
        <div className="visit-hero__bg" aria-hidden="true">
          <img src="/kutch-rann.webp" alt="" fetchpriority="high" />
          <span className="visit-hero__scrim" />
        </div>

        <div className="container visit-hero__inner">
          <p className="visit-hero__eyebrow">Visit &amp; Experience</p>
          <h1 className="visit-hero__title">Kutch</h1>
          <p className="visit-hero__lede">
            Stand where it is made — the studio, the museum and the villages.
          </p>
          <a className="visit-hero__cta" href="#places">
            Explore
          </a>
        </div>
      </header>

      {/* ---- two ways to come ---- */}
      <section className="section container ways" aria-label="Two ways to visit">
        {WAYS.map((w) => (
          <article className="way" key={w.no}>
            <div className="way__media">
              <img src={w.img} alt={w.alt} loading="lazy" />
              <span className="way__no" aria-hidden="true">
                {w.no}
              </span>
            </div>

            <div className="way__body">
              <p className="way__kicker">{w.kicker}</p>
              <h2 className="way__name">{w.name}</h2>
              <p className="way__copy">{w.copy}</p>

              <ul className="way__points">
                {w.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>

              <a className="arrow-link way__cta" href={w.href}>
                {w.cta} <ArrowRight width="15" height="15" />
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* ---- what is here: contained cards, one per stop ---- */}
      <section className="section container stops" id="places">
        <div className="stops__head" data-reveal>
          <p className="eyebrow">Where to go</p>
          <h2 className="section-title">
            Six stops, <em>all near Bhuj</em>
          </h2>
          <p className="stops__lede">
            The workrooms, the museum, and the villages the stitches are named after —
            none of them more than a couple of hours apart.
          </p>
        </div>

        <div className="stops__grid" data-reveal-child>
          {PLACES.map((p) => {
            const inner = (
              <>
                <span className="stop__media">
                  <img src={p.img} alt={p.alt} loading="lazy" />
                  <span className="stop__no" aria-hidden="true">
                    {p.no}
                  </span>
                </span>

                <span className="stop__where">{p.where}</span>
                <span className="stop__name">{p.name}</span>
                <span className="stop__copy">{p.copy}</span>

                {p.to && (
                  <span className="stop__go">
                    Read more <ArrowRight width="14" height="14" />
                  </span>
                )}
              </>
            )

            /* only the museum has a page of its own; the rest are cards, not
               links pretending to go somewhere */
            return p.to ? (
              <Link className="stop stop--link" to={p.to} key={p.name}>
                {inner}
              </Link>
            ) : (
              <article className="stop" key={p.name}>
                {inner}
              </article>
            )
          })}
        </div>
      </section>

      {/* ---- planning: durations as cards, practicals beside them ---- */}
      <section className="section container plan">
        <div className="plan__head" data-reveal>
          <p className="eyebrow">How long to stay</p>
          <h2 className="section-title">
            Plan the <em>trip</em>
          </h2>
        </div>

        <div className="plan__grid">
          <div className="plan__main">
            <ol className="plan__steps" data-reveal-child>
              {ITINERARY.filter((r) => r.k !== 'Best season').map((r, i) => (
                <li className="stay" key={r.k}>
                  <span className="stay__no" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="stay__len">{r.k}</span>
                  <span className="stay__what">{r.v}</span>
                </li>
              ))}
            </ol>

            {/* the aside runs taller than four cards, so the invitation fills
                what was an empty column rather than sitting alone below */}
            <div className="plan__invite" data-reveal>
              <p className="plan__invite-copy">
                Tell us when you are coming and we will open the studio.
              </p>
              <a
                className="btn btn--ghost plan__invite-cta"
                href="mailto:marketing@shrujan.com?subject=Visiting%20Shrujan"
              >
                Write to the studio <ArrowRight width="16" height="16" />
              </a>
            </div>
          </div>

          <aside className="plan__aside" data-reveal>
            <p className="plan__season">
              <span className="plan__pill">Best season</span>
              {ITINERARY.find((r) => r.k === 'Best season').v}
            </p>

            <dl className="plan__facts">
              {PRACTICAL.map((r) => (
                <div key={r.k}>
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
            </dl>

            <a className="btn plan__cta" href="tel:+919099974319">
              Call to plan <ArrowRight width="16" height="16" />
            </a>
          </aside>
        </div>
      </section>

    </div>
  )
}
