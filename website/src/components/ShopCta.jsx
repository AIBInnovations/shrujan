import { ArrowRight } from './Icons.jsx'

/* Closing invitation — a flush two-cell block in the hero's language:
   one photograph, one solid plum panel. No ornament. */
export default function ShopCta() {
  return (
    <section className="shopcta" aria-label="Shop the collection">
      <div className="shopcta__grid" data-reveal>
        <div className="shopcta__media">
          <img
            src="/cta-band.png"
            alt="Model in a maroon silk sari with a gold zari border"
            loading="lazy"
          />
        </div>

        <div className="shopcta__panel">
          <p className="shopcta__eyebrow">The Festive Edit</p>

          <h2 className="shopcta__title">
            Wear your
            <br />
            <em>heritage</em> forward
          </h2>

          <p className="shopcta__copy">
            Twenty new pieces from forty villages, hand-embroidered, naturally dyed,
            and signed by the women who made them.
          </p>

          <div className="shopcta__actions">
            <a className="btn" href="#categories">
              Shop the collection
            </a>
            <a className="arrow-link shopcta__link" href="#support">
              Book a styling call <ArrowRight width="16" height="16" />
            </a>
          </div>

          <ul className="shopcta__micro">
            <li>Shipping over ₹5,000</li>
            <li>14-day returns</li>
            <li>Free alterations</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
