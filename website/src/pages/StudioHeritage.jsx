import PageHero from '../components/PageHero.jsx'
import StrandRail from '../components/StrandRail.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { HERITAGE as H } from '../data/studio.js'

/* Heritage — the first of the three Studio strands. Opens on a full-bleed
   textile so the cloth makes the argument before the copy does, then the four
   marks that decide whether a piece is heritage at all, then the callback form
   the brand's own page is built around. */

export default function StudioHeritage() {
  return (
    <div className="page">
      {/* framed and centred, as Craft, LLDC and the Studio parent all sit. No
          lede or stat row over the photograph: this masthead holds its type in
          the upper third, and anything below it lands on the cloth. */}
      <PageHero
        variant="cover"
        frame
        eyebrow={H.eyebrow}
        title={
          <>
            {H.title.head}
            <em>{H.title.em}</em>
            {H.title.tail}
          </>
        }
        image={H.hero}
        alt={H.heroAlt}
      />

      <StrandRail current="heritage" />

      {/* ---- what makes it heritage ---- */}
      <section className="section container">
        <div className="origin" data-reveal>
          {/* the masthead's lede, now that it is off the photograph */}
          <p className="origin__lead">{H.lede}</p>
          <div className="origin__body">
            <p>{H.lead}</p>
            {H.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="craft__stats" data-reveal-child>
          {H.meta.map((m) => (
            <div className="stat" key={m.label}>
              <p className="stat__value">{m.value}</p>
              <p className="stat__label">{m.label}</p>
            </div>
          ))}
        </div>

        <ol className="marks" data-reveal-child>
          {H.marks.map((m) => (
            <li className="mark" key={m.no}>
              <span className="mark__no">{m.no}</span>
              <h3 className="mark__title">{m.title}</h3>
              <p className="mark__copy">{m.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- the cloth itself ---- */}
      <section className="section container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">From the archive</p>
          <h2 className="section-title">Work at the top of the vocabulary</h2>
        </div>

        {/* its own grid: the story page's gallery runs a wider first column and
            crops 4:3, which left the rows ragged and cut the heads off these
            portrait frames */}
        <div className="arch-grid" data-reveal-child>
          {H.gallery.map((im) => (
            <figure key={im.src}>
              <img src={im.src} alt={im.alt} loading="lazy" />
            </figure>
          ))}
        </div>

        <blockquote className="origin__pull" data-reveal>
          {H.pull}
        </blockquote>
      </section>

      <EnquiryForm
        id="heritage-enquiry"
        eyebrow={H.form.eyebrow}
        title={H.form.title}
        copy={H.form.copy}
        cta={H.form.cta}
        extra={{ label: 'Craft or piece of interest', placeholder: 'Suf, Pakko, Mutwa…' }}
      />
    </div>
  )
}
