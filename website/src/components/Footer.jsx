import { useState } from 'react'
import { ArrowRight } from './Icons.jsx'

const LINKS = ['About', 'Shop', 'Collections', 'Craft', 'Support']

const CONTACT = [
  { label: 'Write to us', value: 'atelier@shrujan.com', href: 'mailto:atelier@shrujan.com' },
  { label: 'Call the studio', value: '+91 2832 240 272', href: 'tel:+912832240272' },
  { label: 'Visit', value: 'Bhujodi Road, Bhuj · Kutch', href: '#' },
]

function Social({ label, children }) {
  return (
    <a className="footer__social" href="#" aria-label={label}>
      {children}
    </a>
  )
}

export default function Footer() {
  const [sent, setSent] = useState(false)

  return (
    <footer className="footer">
      {/* Two masked blocks straddle the footer edge and invert across it:
          maroon above on the beige canvas, beige below on the maroon panel.
          Masked blocks rather than <img> so both colours are exact tokens. */}
      <span className="footer__wordmark" role="img" aria-label="Shrujan" />
      <span className="footer__wordmark-lower" aria-hidden="true" />

      <div className="footer__inner">
        {/* ---- contact / letters card ---- */}
        <div className="fcard">
          <div className="fcard__media">
            <img src="/cta-sarree.png" alt="Model in a crimson hand-embroidered bridal sari" loading="lazy" />
          </div>

          <div className="fcard__body">
            <p className="fcard__eyebrow">Letters from the Loom</p>
            <h3 className="fcard__title">Stay close to the craft</h3>
            <p className="fcard__copy">
              New collections, artisan stories and early access to festive edits,
              once a month, written slowly.
            </p>

            {sent ? (
              <p className="fcard__sent" role="status">
                Shukriya. Your first letter is on its way.
              </p>
            ) : (
              <form
                className="fcard__form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <input type="email" required placeholder="Your email address" aria-label="Email address" />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRight width="17" height="17" />
                </button>
              </form>
            )}

            <ul className="fcard__contact">
              {CONTACT.map((c) => (
                <li key={c.label}>
                  <span>{c.label}</span>
                  <a href={c.href}>{c.value}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- links + brand ---- */}
        <div className="footer__grid">
          <nav className="footer__nav" aria-label="Footer">
            {LINKS.map((link) => (
              <a href="#" key={link}>
                {link}
              </a>
            ))}
          </nav>

          <div className="footer__about">
            <p>
              Heritage by hand. Clothing rooted in the living embroidery traditions of
              Kutch, made slowly and worn for generations.
            </p>
          </div>

          <div className="footer__follow">
            <span>Follow us on</span>
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
              <Social label="YouTube">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M21.5 8.2a2.5 2.5 0 0 0-1.76-1.77C18.16 6 12 6 12 6s-6.16 0-7.74.43A2.5 2.5 0 0 0 2.5 8.2 26 26 0 0 0 2.07 12c0 1.3.14 2.6.43 3.8a2.5 2.5 0 0 0 1.76 1.77C5.84 18 12 18 12 18s6.16 0 7.74-.43a2.5 2.5 0 0 0 1.76-1.77c.29-1.2.43-2.5.43-3.8s-.14-2.6-.43-3.8ZM10.1 14.6V9.4l5.1 2.6Z" />
                </svg>
              </Social>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Shrujan. All rights reserved.</span>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
