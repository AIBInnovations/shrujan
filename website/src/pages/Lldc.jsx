import PageHero from '../components/PageHero.jsx'
import { ArrowRight } from '../components/Icons.jsx'

/* LLDC — the Living & Learning Design Centre.

   Copy and photography are the institution's own, taken from the LLDC page on
   shrujan.com and from shrujanlldc.org: the two paragraphs the brand publishes,
   the current show in Gallery One, the six things on the campus, and the
   visitor information as they state it.

   Everything the old version of this page asserted — an opening year, four
   galleries, an eight-acre campus, ₹100 entry, Tuesday-to-Sunday hours, guided
   tours at 11 and 3 — was invented and none of it was right. It is all replaced
   here with what the LLDC actually publishes. */

const SHOW = [
  {
    src: '/lldc-gallery-1.webp',
    alt: 'Mannequins in the embroidered dress of Kutchi communities, in a museum gallery',
  },
  {
    src: '/lldc-gallery-2.webp',
    alt: 'Gallery wall of framed embroidery panels beside costumed figures',
  },
  {
    src: '/lldc-gallery-3.webp',
    alt: 'A curved gallery of Kutchi costume under museum lighting',
  },
]

const FIGURES = [
  { value: '3', label: 'Galleries' },
  { value: '12', label: 'Kutchi communities' },
  { value: '126', label: 'Seats in the auditorium' },
  { value: '15 km', label: 'From Bhuj' },
]

/* The six the LLDC lists under Amenities, in its own words. */
const CAMPUS = [
  {
    name: 'The Museum',
    copy: 'Three galleries, a library and the crafts studios — the whole complex built around the collection.',
    img: '/lldc-hero.webp',
    alt: 'Figures in the ceremonial dress of twelve Kutchi communities, arranged in a circular gallery',
    size: 'wide',
  },
  {
    name: 'Crafts Studio',
    copy: 'A working space for craftspeople — weaving, block-printing, pottery and the metal work of Kutch.',
    img: '/lldc-studio.webp',
    alt: 'A potter throwing a vessel on the wheel in the LLDC crafts studio',
  },
  {
    name: 'Auditorium',
    copy: 'A 126-seater, fully equipped with audio-visual facilities.',
    img: '/lldc-auditorium.webp',
    alt: 'An audience watching a craft film in the LLDC auditorium',
  },
  {
    name: 'Hands On Area',
    copy: 'Inspired by the crafts? This is where you try them yourself.',
    img: '/lldc-hands-on.webp',
    alt: 'A child block-printing cloth under an instructor’s hand',
    size: 'wide',
  },
  {
    name: 'The Shop',
    copy: 'Make sure you take back a little bit of Kutch with you.',
    img: '/sj-jat-garasiya-party-bag-1.webp',
    alt: 'Hand-embroidered Jat Garasiya bag',
  },
  {
    name: 'The Cafe',
    copy: 'Refresh yourself with a hot cup of masala chai.',
    img: '/lldc-cafe.webp',
    alt: 'The LLDC courtyard cafe at dusk, tables under a pergola',
    /* three wide among six fills the three-column mosaic exactly */
    size: 'wide',
  },
]

/* Exactly as the LLDC publishes it, but read as three plates rather than one
   flat table — the hours and the ticket price are what a visitor is actually
   looking for, and a nine-row key/value list buried both.

   Their own site quotes two different admission prices: ₹200/₹50 on the home
   page and ₹100/₹20 on the About page. The home page's pair is used here as
   the likelier current one. */
const PLATES = [
  {
    label: 'Hours',
    head: '10 AM – 6 PM',
    lines: ['Last entry at 5:15 PM', 'Closed Mondays and public holidays'],
  },
  {
    label: 'Admission',
    head: '₹ 200',
    lines: ['Adults', '₹ 50 — children, 5 to 12 years', 'A wheelchair is available'],
  },
  {
    label: 'Getting there',
    head: '15 km from Bhuj',
    lines: [
      'Ajrakhpur, on the Bhuj–Bhachau highway',
      'State transport and private buses run there, as do shared chhakada-rickshaws',
      'Bhuj itself: rail from Ahmedabad, Mumbai and Delhi, flights from Mumbai and Delhi',
    ],
  },
]

export default function Lldc() {
  return (
    <div className="page">
      {/* framed and centred, the way the Craft masthead sits */}
      <PageHero
        variant="cover"
        frame
        eyebrow="Living & Learning Design Centre"
        title={
          <>
            The crafts of Kutch, <em>kept and taught</em>
          </>
        }
        /* no stat row here: the framed masthead holds its type in the upper
           third because the middle of this photograph is faces and cloth, and
           the figures landed straight on the mannequins. They run under the
           opening copy instead. */
        image="/lldc-hero.webp"
        alt="Figures in the ceremonial dress of twelve Kutchi communities, arranged in a circular gallery at the LLDC"
      />

      {/* ---- what it is ---- */}
      <section className="section container">
        <div className="origin" data-reveal>
          <p className="origin__lead">
            The Living and Learning Design Centre is a museum and cultural institution
            dedicated to the crafts of Kutch, working to preserve, document and share the
            region&rsquo;s craft traditions.
          </p>
          <div className="origin__body">
            <p>
              Through its galleries, research initiatives and archives, the LLDC offers
              deeper insight into materials, processes, histories and the communities that
              sustain these living traditions. It is a space for learning, dialogue and
              exchange — for artisans, students, researchers and visitors alike.
            </p>
            <p>
              It is, however, much more than a museum. Dedicated to the craftspeople of
              Kutch, it is a multi-dimensional crafts education and resource centre that
              trains and supports them in traditional crafts, so that they are capable of
              earning a dignified livelihood.
            </p>
          </div>
        </div>

        <div className="craft__stats" data-reveal-child>
          {FIGURES.map((f) => (
            <div className="stat" key={f.label}>
              <p className="stat__value">{f.value}</p>
              <p className="stat__label">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- the current show ---- */}
      <section className="section container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">On now, in Gallery One</p>
          <h2 className="section-title">The Living Embroideries of Kutch</h2>
          <p className="section-intro__copy">
            An ongoing show celebrating the rich, diverse and awe-inspiring embroideries of
            twelve different Kutchi communities. The exhibits include traditionally
            embroidered textiles alongside specially commissioned pieces and contemporary
            expressions — all at the highest levels of creative and technical excellence.
          </p>
        </div>

        {/* its own strip, not the story page's 4:3 gallery — these are the
            museum's panoramic gallery views and that ratio guillotined them */}
        <div className="lldc-show" data-reveal-child>
          {SHOW.map((im) => (
            <figure key={im.src}>
              <img src={im.src} alt={im.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* ---- the campus ---- */}
      <section className="section container lldc" aria-label="On the campus">
        <div className="section-head" data-reveal>
          <div className="section-head__titles">
            <p className="eyebrow">On the campus</p>
            <h2 className="section-title">
              What is <em>here</em>
            </h2>
          </div>
        </div>

        <div className="lldc__mosaic" data-reveal-child>
          {CAMPUS.map((c) => (
            <article
              className={`lldc-card${c.size === 'wide' ? ' lldc-card--wide' : ''}`}
              key={c.name}
            >
              <div className="lldc-card__media">
                <img src={c.img} alt={c.alt} loading="lazy" />
              </div>
              <div className="lldc-card__body">
                <h3 className="lldc-card__name">{c.name}</h3>
                <p className="lldc-card__copy">{c.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---- visitor information ---- */}
      <section className="section container lldc-visit">
        <div className="lldc-visit__head" data-reveal>
          <p className="eyebrow">Plan your visit</p>
          <h2 className="section-title">Before you come</h2>
        </div>

        <div className="visit-plates" data-reveal-child>
          {PLATES.map((p) => (
            <div className="plate" key={p.label}>
              <p className="plate__label">{p.label}</p>
              <p className="plate__head">{p.head}</p>
              <ul className="plate__lines">
                {p.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* address, contact and the one house rule, on the dark strip */}
        <div className="visit-bar" data-reveal>
          <div className="visit-bar__col">
            <p className="visit-bar__label">The museum</p>
            <p className="visit-bar__value">
              705, Bhuj&ndash;Bhachau Highway
              <br />
              Ajrakhpur 370105, Kutch, Gujarat
            </p>
          </div>

          <div className="visit-bar__col">
            <p className="visit-bar__label">Contact</p>
            <p className="visit-bar__value">
              <a href="mailto:info@shrujanlldc.org">info@shrujanlldc.org</a>
              <br />
              <a href="tel:+912832229090">(0) 2832 229090</a>
            </p>
          </div>

          <div className="visit-bar__col visit-bar__col--note">
            <p className="visit-bar__label">Please note</p>
            <p className="visit-bar__value">
              Photography and videography are not permitted in any of the galleries.
            </p>
          </div>
        </div>
      </section>

      <section className="section container page-cta" data-reveal>
        <p>The museum keeps its own site, with events, the virtual tour and booking.</p>
        <a
          className="btn"
          href="https://shrujanlldc.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          Visit the LLDC website <ArrowRight width="16" height="16" />
        </a>
      </section>
    </div>
  )
}
