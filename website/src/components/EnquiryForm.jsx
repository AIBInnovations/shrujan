import { useState } from 'react'
import { ArrowRight } from './Icons.jsx'
import { TIME_SLOTS } from '../data/studio.js'

/* The callback form the brand puts at the foot of all three Studio pages —
   same fields, same slot list. There is no backend behind this build, so the
   submit is intercepted and answered on the spot rather than pretending to
   send; nothing is transmitted anywhere. */

export default function EnquiryForm({ eyebrow, title, copy, cta, id = 'enquire', extra }) {
  const [sent, setSent] = useState(false)

  return (
    <section className="section container enquiry" id={id}>
      <div className="enquiry__intro" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        <p className="enquiry__copy">{copy}</p>

        <dl className="enquiry__reach">
          <div>
            <dt>Call</dt>
            <dd>
              <a href="tel:+919099974319">+91 9099 974319</a>
            </dd>
          </div>
          <div>
            <dt>Write</dt>
            <dd>
              <a href="mailto:marketing@shrujan.com">marketing@shrujan.com</a>
            </dd>
          </div>
          <div>
            <dt>Studio hours</dt>
            <dd>10 AM – 7 PM, Bhuj</dd>
          </div>
        </dl>
      </div>

      {sent ? (
        <div className="enquiry__done" role="status" data-reveal>
          <p className="enquiry__done-title">Thank you — we have your request.</p>
          <p>
            Someone from the Bhuj studio will call you in your chosen slot. If it is
            urgent, reach us on <a href="tel:+919099974319">+91 9099 974319</a>.
          </p>
          <button className="arrow-link" type="button" onClick={() => setSent(false)}>
            Send another enquiry <ArrowRight width="16" height="16" />
          </button>
        </div>
      ) : (
        <form
          className="enquiry__form"
          data-reveal
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <p className="field">
            <label htmlFor={`${id}-name`}>
              Name <span aria-hidden="true">*</span>
            </label>
            <input id={`${id}-name`} name="name" type="text" required autoComplete="name" />
          </p>

          <p className="field">
            <label htmlFor={`${id}-phone`}>
              Contact number <span aria-hidden="true">*</span>
            </label>
            <input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" />
          </p>

          <p className="field">
            <label htmlFor={`${id}-city`}>City</label>
            <input id={`${id}-city`} name="city" type="text" autoComplete="address-level2" />
          </p>

          <p className="field">
            <label htmlFor={`${id}-email`}>Email</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" />
          </p>

          {extra && (
            <p className="field">
              <label htmlFor={`${id}-extra`}>{extra.label}</label>
              <input id={`${id}-extra`} name="extra" type="text" placeholder={extra.placeholder} />
            </p>
          )}

          <p className="field field--wide">
            <label htmlFor={`${id}-looking`}>What are you looking for?</label>
            <textarea id={`${id}-looking`} name="looking" rows="3" />
          </p>

          <p className="field">
            <label htmlFor={`${id}-slot`}>Preferred time slot</label>
            <select id={`${id}-slot`} name="slot" defaultValue="">
              <option value="" disabled>
                Choose a time
              </option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </p>

          <div className="enquiry__submit">
            <button className="btn" type="submit">
              {cta} <ArrowRight width="16" height="16" />
            </button>
            <span className="enquiry__note">
              <span aria-hidden="true">*</span> Required. We only use these details to call
              you back.
            </span>
          </div>
        </form>
      )}
    </section>
  )
}
