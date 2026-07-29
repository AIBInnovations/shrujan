import { ArrowRight } from './Icons.jsx'

const PRINCIPLES = [
  {
    no: '01',
    title: 'Hand Embroidery',
    copy: 'Every motif counted and stitched by hand. No machine ever touches the cloth.',
    img: '/top right.webp',
    alt: 'Close crop of mirror-work embroidery in crimson and gold threads',
  },
  {
    no: '02',
    title: 'Natural Dyes',
    copy: 'Madder, indigo and pomegranate on handloom cotton and mulberry silk.',
    img: '/frame-r5t15.webp',
    alt: 'Close crop of turquoise Kutchi mirror-work embroidery',
  },
  {
    no: '03',
    title: 'Fair Wages',
    copy: 'Paid per piece, on time, directly to the woman whose hands made it.',
    img: '/bottom left.webp',
    alt: 'Master weaver working threads at his handloom',
  },
  {
    no: '04',
    title: 'Made to Last',
    copy: 'Finished to be worn today, repaired for free, and handed down tomorrow.',
    /* not the crimson bridal sari: that frame already carries Bestsellers and
       two of the testimonial cells on this same page */
    img: '/bottom right.webp',
    alt: 'Model in a mehendi-green hand-embroidered kurta set',
  },
]

export default function Showcase() {
  return (
    <section className="section container manifesto" id="promise">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">The future of heritage is here</p>
        <h2 className="section-title">
          Craft that cares: <em>four promises</em> in every piece
        </h2>
        <p className="section-intro__copy">
          Living embroidery, natural cloth and honest making, held to the same four
          standards since 1969.
        </p>
      </div>

      <ol className="manifesto__grid" data-reveal-child>
        {PRINCIPLES.map((p) => (
          <li className="seal" key={p.no}>
            <span className="seal__no">{p.no}</span>

            <span className="seal__ring">
              <img src={p.img} alt={p.alt} loading="lazy" />
            </span>

            <h3 className="seal__title">{p.title}</h3>
            <p className="seal__copy">{p.copy}</p>
          </li>
        ))}
      </ol>

      <div className="manifesto__more" data-reveal>
        <a className="arrow-link" href="#craft">
          How we make it <ArrowRight width="16" height="16" />
        </a>
      </div>
    </section>
  )
}
