import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons.jsx'

/* The footer as the page's closing seal rather than a link dump: the mark set
   inside a mandala medallion, then the letter sign-up, then a real sitemap.
   The old version carried five links total for a site with six sections and
   three studio strands, so most of what the header reaches was unreachable
   from the bottom of the page. */

const SITEMAP = [
  {
    group: 'Explore',
    items: [
      { label: 'The Shrujan Story', to: '/pages/the-shrujan-story' },
      { label: 'Origins', to: '/pages/the-shrujan-story#origins' },
      { label: 'Philosophy & Values', to: '/pages/the-shrujan-story#values' },
      { label: 'The People of Shrujan', to: '/pages/the-shrujan-story#people' },
      { label: 'In the Media', to: '/pages/the-shrujan-story#press' },
    ],
  },
  {
    group: 'Shop',
    items: [
      { label: 'All of Shrujan', to: '/pages/shop-shrujan' },
      { label: 'Bags', to: '/pages/shop-shrujan?c=hand-bags' },
      { label: 'Kanchli', to: '/pages/shop-shrujan?c=kanchli' },
      { label: 'Kurtas & Tops', to: '/pages/shop-shrujan?c=kurtas-and-tops' },
      { label: 'Home Decor', to: '/pages/shop-shrujan?c=home-decor' },
      { label: 'Accessories', to: '/pages/shop-shrujan?c=accessories' },
    ],
  },
  {
    group: 'Studio',
    items: [
      { label: 'Studio Collection', to: '/pages/studio-collection' },
      { label: 'Heritage', to: '/pages/studio-collection/heritage' },
      { label: 'Avinya', to: '/pages/studio-collection/avinya' },
      { label: 'Gifting & Collaborations', to: '/pages/studio-collection/gifting' },
    ],
  },
  {
    group: 'Visit & Help',
    items: [
      { label: 'Craft Traditions of Kutch', to: '/pages/video' },
      { label: 'Living & Learning Design Centre', to: '/pages/lldc' },
      { label: 'Visit & Experience', to: '/pages/visit-experience' },
      // the FAQ block that answers "support" questions lives on the home page
      { label: 'Frequently Asked', to: '/#support' },
    ],
  },
]

/* Shrujan's own published details. The second number sits under the same
   label rather than inventing one for it — both reach the same desk. */
const CONTACT = [
  { label: 'Write to us', value: 'marketing@shrujan.com', href: 'mailto:marketing@shrujan.com' },
  { label: 'Call the studio', value: '+91 9099 974319', href: 'tel:+919099974319' },
  { label: '', value: '+91 90818 99882', href: 'tel:+919081899882' },
  { label: 'Visit', value: 'Bhujodi Road, Bhuj · Kutch', to: '/pages/visit-experience' },
  { label: 'Studio hours', value: '10 AM to 7 PM' },
]

/* The brand's own accounts, as linked from shrujan.com. There is no Shrujan
   YouTube channel, so that mark is not rendered rather than pointed at a
   guess. */
const SOCIALS = {
  Instagram: 'https://www.instagram.com/shrujanindia/',
  Facebook: 'https://www.facebook.com/shrujanindia',
  Pinterest: 'https://www.pinterest.com/shrujancreations/',
}

function Social({ label, children }) {
  return (
    <a
      className="footer__social"
      href={SOCIALS[label]}
      aria-label={label}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const [sent, setSent] = useState(false)

  return (
    <footer className="footer">
      {/* the mandala stencil the promises band runs on, clipped to its own
          layer so it can bleed off every edge */}
      <span className="footer__weave" aria-hidden="true">
        <span className="footer__mandala footer__mandala--left" />
        <span className="footer__mandala footer__mandala--right" />
      </span>

      <div className="footer__inner">
        {/* ---- letters left, the mark and the socials right ---- */}
        <div className="ftop">
          {/* #letters — the studio-list CTA on the collection page aims here */}
          <div className="fletters" id="letters">
            <p className="fletters__eyebrow">Letters from the Loom</p>
            <h2 className="fletters__title">Stay close to the craft</h2>
            <p className="fletters__copy">
              New collections, artisan stories and early access to festive edits — once a
              month, written slowly.
            </p>

            {sent ? (
              <p className="fletters__sent" role="status">
                Shukriya. Your first letter is on its way.
              </p>
            ) : (
              <form
                className="fletters__form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  aria-label="Email address"
                />
                <button type="submit">
                  Subscribe <ArrowRight width="16" height="16" />
                </button>
              </form>
            )}
          </div>

          <div className="fbrand">
            {/* masked rather than an <img>: the artwork is near-white, and this
                way the mark is an exact palette token */}
            <span className="fbrand__mark" role="img" aria-label="Shrujan" />
            {/* broken deliberately: at this tracking the single line wrapped to
                three ragged ones against the right rail */}
            <p className="fbrand__tag">
              Heritage by Hand
              <span>Kutch, since 1969</span>
            </p>

            <div className="footer__socials">
              <Social label="Instagram">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="3.9" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </Social>
              <Social label="Facebook">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.5-4.05 4.2v2.2H7.5V13h2.7v8Z" />
                </svg>
              </Social>
              <Social label="Pinterest">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M12 3a9 9 0 0 0-3.3 17.36c-.08-.72-.15-1.83.03-2.62.16-.7 1.06-4.5 1.06-4.5s-.27-.54-.27-1.34c0-1.26.73-2.2 1.63-2.2.77 0 1.14.58 1.14 1.27 0 .78-.49 1.94-.75 3.02-.21.9.46 1.64 1.35 1.64 1.62 0 2.87-1.71 2.87-4.18 0-2.19-1.57-3.72-3.82-3.72-2.6 0-4.13 1.95-4.13 3.97 0 .79.3 1.63.68 2.09.08.09.09.17.06.26l-.25 1.02c-.4.17-.13.2-.3.12-1.11-.52-1.8-2.14-1.8-3.44 0-2.8 2.03-5.37 5.87-5.37 3.08 0 5.47 2.2 5.47 5.13 0 3.06-1.93 5.52-4.6 5.52-.9 0-1.75-.47-2.04-1.02l-.55 2.12c-.2.77-.74 1.73-1.1 2.32A9 9 0 1 0 12 3Z" />
                </svg>
              </Social>
            </div>
          </div>
        </div>

        {/* ---- sitemap, with the studio's own details as its last column so
             the contact details do not cost a whole extra row ---- */}
        <nav className="fmap" aria-label="Footer">
          {SITEMAP.map((col) => (
            <div className="fmap__col" key={col.group}>
              <p className="fmap__group">{col.group}</p>
              <ul>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="fmap__col">
            <p className="fmap__group">Reach us</p>
            <ul className="freach">
              {CONTACT.map((c) => (
                // keyed on the value: the second phone number runs under the
                // first one's label, so the labels are not unique
                <li key={c.value}>
                  <span className="freach__label">{c.label}</span>
                  {c.to ? (
                    <Link to={c.to}>{c.value}</Link>
                  ) : c.href ? (
                    <a href={c.href}>{c.value}</a>
                  ) : (
                    <span className="freach__value">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ---- bottom bar ---- */}
        <div className="footer__bottom">
          <span>© 2026 Shrujan. All rights reserved.</span>

          {/* This build has no policy routes of its own — the fallback route
              would quietly render the home page instead of 404ing — so these
              point at the live, published policies. Swap them for local routes
              once that copy is written. */}
          <div className="footer__legal">
            <a
              href="https://shrujan.com/policies/privacy-policy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Privacy Policy
            </a>
            <a
              href="https://shrujan.com/policies/terms-of-service"
              target="_blank"
              rel="noreferrer noopener"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
