import PageHero from '../components/PageHero.jsx'
import StrandRail from '../components/StrandRail.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { AVINYA as A } from '../data/studio.js'

/* Avinya — the second strand, and the one that is about a way of working rather
   than a kind of object. It opens on the word itself (the ghost masthead, the
   same one the Story page uses for 1969), then the four stages of a
   co-creation, because that process is the whole proposition. */

export default function StudioAvinya() {
  return (
    <div className="page">
      <PageHero
        variant="ghost"
        ghost={A.ghost}
        eyebrow={A.eyebrow}
        title={
          <>
            {A.title.head}
            <em>{A.title.em}</em>
            {A.title.tail}
          </>
        }
        lede={A.lede}
        meta={A.meta}
      />

      <StrandRail current="avinya" />

      {/* ---- the word, then the working method ---- */}
      <section className="section container">
        <figure className="gloss" data-reveal>
          <figcaption className="gloss__head">
            <span className="gloss__word">{A.gloss.word}</span>
            <span className="gloss__lang">{A.gloss.language}</span>
          </figcaption>
          <p className="gloss__meaning">{A.gloss.meaning}</p>
          <p className="gloss__note">{A.gloss.note}</p>
        </figure>

        <div className="origin" data-reveal>
          <p className="origin__lead">{A.lead}</p>
          <div className="origin__body">
            {A.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- how a collaboration runs ---- */}
      <section className="section container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">Four stages, two or three hands</h2>
        </div>

        <ol className="steps" data-reveal-child>
          {A.steps.map((s) => (
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
          {A.pull}
        </blockquote>
      </section>

      {/* ---- the work ---- */}
      <section className="section container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">In the studio</p>
          <h2 className="section-title">Made between them</h2>
        </div>

        <div className="origin__gallery" data-reveal-child>
          {A.works.map((im) => (
            <figure className="origin__shot" key={im.src}>
              <img src={im.src} alt={im.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <EnquiryForm
        id="avinya-enquiry"
        eyebrow={A.form.eyebrow}
        title={A.form.title}
        copy={A.form.copy}
        cta={A.form.cta}
      />
    </div>
  )
}
