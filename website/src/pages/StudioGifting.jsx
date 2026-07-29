import PageHero from '../components/PageHero.jsx'
import StrandRail from '../components/StrandRail.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { GIFTING as G } from '../data/studio.js'

/* Gifting & Collaborations — the third strand, and the most transactional of
   the three, so it is the one that states numbers and lead times plainly. The
   three offers reuse the alternating studio spread; the enquiry form carries an
   extra field, because a gifting brief is useless without a quantity. */

export default function StudioGifting() {
  return (
    <div className="page">
      {/* plain, and deliberately not `frame` — that modifier is built for the
          cover variant and forces a viewport-height box, which without a
          background image is just a hole */}
      <PageHero
        variant="plain"
        eyebrow={G.eyebrow}
        title={
          <>
            {G.title.head}
            <em>{G.title.em}</em>
            {G.title.tail}
          </>
        }
        lede={G.lede}
        meta={G.meta}
        image={G.hero}
        alt={G.heroAlt}
      />

      <StrandRail current="gifting" />

      {/* ---- the three ways we work ---- */}
      <section className="section container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">Three ways to work with us</p>
          <h2 className="section-title">From a hundred pouches to a single commission</h2>
        </div>

        <div className="studio">
          {G.offers.map((o) => (
            <article className="studio-row" key={o.no} data-reveal>
              {/* no data-parallax: the drift shifted these product shots inside
                  their frames on every scroll and read as misalignment */}
              <div className="studio-row__media">
                <img src={o.img} alt={o.alt} loading="lazy" />
              </div>

              <div className="studio-row__body">
                <span className="studio-row__no" aria-hidden="true">
                  {o.no}
                </span>
                <h3 className="studio-row__name">{o.title}</h3>
                <p className="studio-row__copy">{o.copy}</p>

                <ul className="studio-row__facts">
                  {o.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <a className="arrow-link studio-row__link" href="#gifting-enquiry">
                  Enquire about this
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---- how an order runs ---- */}
      <section className="section container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">How an order runs</p>
          <h2 className="section-title">Brief to delivery, start to finish</h2>
        </div>

        <ol className="steps" data-reveal-child>
          {G.steps.map((s) => (
            <li className="step" key={s.no}>
              <span className="step__no">{s.no}</span>
              <div className="step__body">
                <h3 className="step__title">{s.title}</h3>
                <p className="step__copy">{s.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <blockquote className="origin__pull" data-reveal>
          {G.pull}
        </blockquote>
      </section>

      <EnquiryForm
        id="gifting-enquiry"
        eyebrow={G.form.eyebrow}
        title={G.form.title}
        copy={G.form.copy}
        cta={G.form.cta}
        extra={{ label: 'Quantity and occasion', placeholder: '150 pieces, Diwali' }}
      />
    </div>
  )
}
