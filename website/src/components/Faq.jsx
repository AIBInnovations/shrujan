import { useId, useState } from 'react'
import { PlusIcon } from './Icons.jsx'

const FAQS = [
  {
    q: 'Are your pieces handcrafted?',
    a: 'Yes. Every garment is embroidered by artisan women across forty villages of Kutch. No machine embroidery, ever. Each piece carries the name of the hands that made it.',
  },
  {
    q: 'What size options are available?',
    a: 'Our pieces come in XS to XXL, and every silhouette is cut to drape generously. Made-to-measure is available on request for saris, lehengas and bridal commissions.',
  },
  {
    q: 'How long will my order take to reach me?',
    a: 'Ready pieces ship from Bhuj within 48 hours and arrive in 3–6 days across India. Made-to-order embroidery takes 2–3 weeks. Good things, stitched slowly.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'We ship worldwide. International orders arrive in 8–14 days, fully tracked, with duties settled at checkout so there are no surprises.',
  },
  {
    q: 'What is your return & exchange policy?',
    a: 'Easy returns and exchanges within 14 days for unworn pieces with tags intact. Hand-embroidered commissions and altered garments are made to order and non-returnable.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  const uid = useId()

  return (
    <section className="section container faq-section" id="support">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Help &amp; Support</p>
        <h2 className="section-title">Everything you need to know</h2>
        <p className="section-intro__copy">
          Thoughtful answers for a seamless shopping experience.
        </p>
      </div>

      <div className="faq" data-reveal>
        {FAQS.map((item, i) => {
          const isOpen = open === i
          const panelId = `${uid}-panel-${i}`
          return (
            <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
              <button
                className="faq__summary"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="faq__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq__q">{item.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  <PlusIcon />
                </span>
              </button>

              {/* 0fr → 1fr gives a smooth height transition without JS measuring */}
              <div className="faq__panel" id={panelId} role="region">
                <div className="faq__panel-inner">
                  <p className="faq__a">{item.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
