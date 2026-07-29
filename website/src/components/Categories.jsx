import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons.jsx'
import { CLOTHING as CATEGORIES } from '../data/catalogue.js'

/* Shop by category — an expanding accordion band rather than a card grid,
   so it doesn't read as a second run of the bestseller rail. Collapsed
   panels carry the name up their spine; hovering one opens it and swaps in
   the horizontal block. Below 900px it stacks into landscape bands.

   The wardrobe only here — the things you wear. Bags and home cloth
   are covered by the "Everything Shrujan makes" grid further down, and running
   all eleven in both places made the page repeat itself. Each panel is derived
   from the live catalogue, so it names a real collection, shows its real count
   and opens that filter on the shop page. */


export default function Categories() {
  return (
    <section className="section container" id="categories">
      <div className="section-head section-head--center" data-reveal>
        <p className="eyebrow">Explore the House</p>
        <h2 className="section-title">What to wear</h2>
        <Link className="arrow-link" to="/pages/shop-shrujan">
          View All <ArrowRight width="16" height="16" />
        </Link>
      </div>

      <div className="catbar" data-reveal-child>
        {CATEGORIES.map((c, i) => (
          <Link
            className="catpanel"
            to={`/pages/shop-shrujan?c=${c.key}`}
            key={c.key}
          >
            <img src={c.img} alt={c.alt} loading="lazy" />
            <span className="catpanel__scrim" aria-hidden="true" />

            <span className="catpanel__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* collapsed state — the name runs up the spine */}
            <span className="catpanel__spine" aria-hidden="true">
              {c.name}
            </span>

            {/* open state — crossfades in as the panel widens */}
            <span className="catpanel__open">
              <span className="catpanel__name">{c.name}</span>
              <span className="catpanel__copy">{c.copy}</span>
              {/* no piece count here either — see the note in House.jsx */}
              <span className="catpanel__foot">
                <span className="catpanel__cta">
                  Explore <ArrowRight width="15" height="15" />
                </span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
