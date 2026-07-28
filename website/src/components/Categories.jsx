import { ArrowRight } from './Icons.jsx'

/* Shop by category — an expanding accordion band rather than a card grid,
   so it doesn't read as a second run of the bestseller rail. Collapsed
   panels carry the name up their spine; hovering one opens it and swaps in
   the horizontal block. Below 900px it stacks into landscape bands. */

const CATEGORIES = [
  {
    name: 'Kurtas & Tops',
    copy: 'Everyday ease, hand-finished at the hem.',
    count: '48 pieces',
    img: '/cat-c4.png',
    alt: 'Model in a maroon embroidered kurta set with palazzo and dupatta',
  },
  {
    name: 'Saris',
    copy: 'Handloom silk and cotton, woven in Bhujodi.',
    count: '120 pieces',
    img: '/cat-c1.png',
    alt: 'Model in a maroon silk sari with gold zari embroidery',
  },
  {
    name: 'Dupattas & Stoles',
    copy: 'The quickest way to lift a plain outfit.',
    count: '64 pieces',
    img: '/cat-c5.png',
    alt: 'Model in an ivory kurta with a maroon embroidered dupatta',
  },
  {
    name: 'Kanchli',
    copy: 'The backless jacket Kutch is known for.',
    count: '22 pieces',
    img: '/cat-c3.png',
    alt: 'Model in a maroon embroidered lehenga',
  },
  {
    name: 'Home Decor',
    copy: 'The same embroidery, made for the house.',
    count: '35 pieces',
    img: '/cat-c2.png',
    alt: 'Model in a handwoven maroon sari with a gold border',
  },
]

export default function Categories() {
  return (
    <section className="section container" id="categories">
      <div className="section-head section-head--center" data-reveal>
        <p className="eyebrow">Explore the House</p>
        <h2 className="section-title">Shop by category</h2>
        <a className="arrow-link" href="#">
          View All <ArrowRight width="16" height="16" />
        </a>
      </div>

      <div className="catbar" data-reveal-child>
        {CATEGORIES.map((c, i) => (
          <a className="catpanel" href="#" key={c.name}>
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
              <span className="catpanel__foot">
                <span className="catpanel__count">{c.count}</span>
                <span className="catpanel__cta">
                  Explore <ArrowRight width="15" height="15" />
                </span>
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
