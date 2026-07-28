import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from './Icons.jsx'

const A = {
  meera: '/cat-c1.png',
  ananya: '/cat-c5.png',
  radhika: '/frame-r5t25.jpg',
  sana: '/frame-r2t5.jpg',
  kavya: '/cat-c2.png',
  nisha: '/frame-r3t16.jpg',
  divya: '/cat-c4.png',
  farah: '/cta-band.png',
  tara: '/frame-r1t20.jpg',
  ishita: '/cat-c3.png',
  aditi: '/frame-r3t26.jpg',
  rhea: '/frame-r5t5.jpg',
}

const TESTIMONIALS = [
  {
    name: 'Meera Shah',
    role: 'Mumbai',
    avatar: A.meera,
    label: 'Kora Silk Sari',
    quote:
      '“What stood out most was the attention to detail: the fall, the finish, the way the border sits. Five years on it has not lost a single stitch.”',
    bought: [
      { img: '/cat-c1.png', name: 'Kora Silk Sari' },
      { img: '/frame-r1t4.jpg', name: 'Ivory Zari Blouse' },
    ],
  },
  {
    name: 'Ananya Iyer',
    role: 'Bengaluru',
    avatar: A.ananya,
    label: 'Chikankari Set',
    quote:
      '“I wore mine to my sister’s mehendi and three people asked where it was from before dinner. It photographs even better than it looks.”',
    bought: [
      { img: '/look-b1.png', name: 'Chikankari Kurta Set' },
      { img: '/frame-r1t12.jpg', name: 'Chanderi Dupatta' },
    ],
  },
  {
    name: 'Radhika Menon',
    role: 'Kochi',
    avatar: A.radhika,
    label: 'Zardozi Lehenga',
    quote:
      '“Knowing the name of the woman who embroidered it changes how you wear it. You carry it with respect, not just with pride.”',
    bought: [
      { img: '/cta-sarree.png', name: 'Zardozi Lehenga' },
      { img: '/frame-r5t25.jpg', name: 'Crimson Silk Odhani' },
    ],
  },
  {
    name: 'Sana Qureshi',
    role: 'Hyderabad',
    avatar: A.sana,
    label: 'Phulkari Kurta',
    quote:
      '“It arrived wrapped in mulmul with a handwritten note about the artisan. It felt like receiving heritage, not a parcel.”',
    bought: [
      { img: '/cat-c2.png', name: 'Phulkari Kurta' },
      { img: '/frame-r2t5.jpg', name: 'Bagh Phulkari Stole' },
    ],
  },
  {
    name: 'Kavya Nair',
    role: 'Chennai',
    avatar: A.kavya,
    label: 'Indigo Mulmul Sari',
    quote:
      '“The indigo has softened beautifully with every wash instead of fading. It drapes better in year three than it did on day one.”',
    bought: [
      { img: '/look-b2.png', name: 'Indigo Mulmul Sari' },
      { img: '/frame-r2t14.jpg', name: 'Ajrakh Print Blouse' },
    ],
  },
  {
    name: 'Nisha Bhatia',
    role: 'Chandigarh',
    avatar: A.nisha,
    label: 'Zari Jacket Set',
    quote:
      '“I ordered for my engagement with three weeks to spare. It came early, altered exactly to measure, and fit like it was drafted on me.”',
    bought: [
      { img: '/frame-r3t16.jpg', name: 'Zari Jacket Set' },
      { img: '/cat-c4.png', name: 'Tissue Silk Sharara' },
    ],
  },
  {
    name: 'Divya Reddy',
    role: 'Hyderabad',
    avatar: A.divya,
    label: 'Organza Dupatta',
    quote:
      '“Weightless, but the embroidery still has body. I have worn it over three different outfits and it lifts every one of them.”',
    bought: [
      { img: '/frame-r3t26.jpg', name: 'Organza Suf Dupatta' },
      { img: '/look-b3.png', name: 'Chanderi Anarkali' },
    ],
  },
  {
    name: 'Farah Sheikh',
    role: 'Lucknow',
    avatar: A.farah,
    label: 'Bridal Trousseau',
    quote:
      '“Two years in the making and worth every month. My mother cried when she saw the mirror work on the dupatta.”',
    bought: [
      { img: '/hero-right.png', name: 'Mirror-Work Bridal Set' },
      { img: '/frame-r5t15.jpg', name: 'Gota Patti Dupatta' },
    ],
  },
  {
    name: 'Tara Deshpande',
    role: 'Pune',
    avatar: A.tara,
    label: 'Banarasi Silk Sari',
    quote:
      '“I have bought silk at four times this price that did not come close. The zari is real and it shows in the light.”',
    bought: [
      { img: '/frame-r1t20.jpg', name: 'Banarasi Silk Sari' },
      { img: '/hero-bottom-2.png', name: 'Katan Silk Blouse' },
    ],
  },
  {
    name: 'Ishita Ghosh',
    role: 'Kolkata',
    avatar: A.ishita,
    label: 'Kantha Stole',
    quote:
      '“Every running stitch is slightly different, which is exactly the point. Nothing about it looks machine-made.”',
    bought: [
      { img: '/cat-c3.png', name: 'Kantha Silk Stole' },
      { img: '/frame-r3t6.jpg', name: 'Tussar Kantha Sari' },
    ],
  },
  {
    name: 'Aditi Rao',
    role: 'Bengaluru',
    avatar: A.aditi,
    label: 'Suf Embroidered Kurta',
    quote:
      '“The customer care team sent me photographs from the workshop while it was being stitched. That is not something you forget.”',
    bought: [
      { img: '/frame-r2t24.jpg', name: 'Suf Embroidered Kurta' },
      { img: '/top right.png', name: 'Kutchi Cotton Palazzo' },
    ],
  },
  {
    name: 'Rhea Kapoor',
    role: 'Delhi',
    avatar: A.rhea,
    label: 'Ajrakh Kurta Set',
    quote:
      '“It has become my default for every festive lunch. Comfortable enough to sit through a long meal, sharp enough for photographs.”',
    bought: [
      { img: '/frame-r5t5.jpg', name: 'Ajrakh Kurta Set' },
      { img: '/cat-c5.png', name: 'Indigo Cotton Stole' },
    ],
  },
]

function Stars() {
  return (
    <span className="tw-rating__stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9Z" />
        </svg>
      ))}
    </span>
  )
}

export default function Testimonials() {
  const trackRef = useRef(null)

  // Scroll one full page (whatever number of cells currently fit).
  const page = (dir) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="section container" aria-label="What our customers say">
      <div className="tw__intro" data-reveal>
        <p className="eyebrow">Loved &amp; Worn</p>
        <h2 className="section-title">What our customers say</h2>
        <p className="tw__intro-copy">
          Four thousand women, forty villages and one promise: cloth that is made
          slowly and kept for a lifetime.
        </p>
      </div>

      <div className="tw" data-reveal>
        <header className="tw__head">
          <p className="tw__title">
            Kind <em>Words.</em>
          </p>

          <div className="tw__meta">
            <div className="tw-rating">
              <Stars />
              <span className="tw-rating__count">1,240 Reviews</span>
            </div>

            <div className="tw-loved">
              <span className="tw-loved__stack" aria-hidden="true">
                {[A.meera, A.ananya, A.radhika].map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" />
                ))}
              </span>
              <span className="tw-loved__label">
                Loved by 4,000+
                <br />
                women across India
              </span>
            </div>

            <div className="carousel-arrows">
              <button type="button" aria-label="Previous testimonials" onClick={() => page(-1)}>
                <ChevronLeft />
              </button>
              <button type="button" aria-label="Next testimonials" onClick={() => page(1)}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </header>

        <div className="tw__grid" ref={trackRef}>
          {TESTIMONIALS.map((t, i) => (
            <article className={`tw-cell${i % 2 ? ' tw-cell--flip' : ''}`} key={t.name}>
              <div className="tw-cell__inner">
                <div className="tw-cell__face tw-cell__face--front">
                  <div className="tw-cell__person">
                    <img src={t.avatar} alt="" loading="lazy" />
                    <div>
                      <p className="tw-cell__name">{t.name}</p>
                      <p className="tw-cell__role">{t.role}</p>
                    </div>
                  </div>

                  <p className="tw-cell__label">{t.label}</p>

                  <blockquote className="tw-cell__quote">{t.quote}</blockquote>
                </div>

                {/* back — the pieces she actually took home */}
                <div className="tw-cell__face tw-cell__face--back">
                  <p className="tw-buys__eyebrow">
                    {t.name.split(' ')[0]} took home
                  </p>

                  <ul className="tw-buys">
                    {t.bought.map((b) => (
                      <li className="tw-buys__item" key={b.name}>
                        <span className="tw-buys__frame">
                          <img src={b.img} alt={b.name} loading="lazy" />
                        </span>
                        <span className="tw-buys__name">{b.name}</span>
                      </li>
                    ))}
                  </ul>

                  <a className="tw-buys__link" href="#">
                    Shop her picks
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
