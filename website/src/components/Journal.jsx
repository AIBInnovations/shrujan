import { ArrowRight } from './Icons.jsx'
import { Link } from 'react-router-dom'

const FEATURED = {
  tag: 'Craft Notes',
  title: '5 Kutch embroidery styles and how to tell them apart',
  excerpt:
    'Suf, Kharek, Paako, Rabari, Mutava. Each village stitches its own signature. A field guide to reading the motifs, mirrors and thread counts that set them apart.',
  img: '/top right.webp',
  alt: 'Close crop of mirror-work embroidery in crimson and gold threads',
  author: 'Kanta Ben Rabari',
  role: 'Master Artisan · Bhuj',
  avatar:
    '/cat-c4.webp',
}

const POSTS = [
  {
    tag: 'Care Guide',
    title: 'How to care for handwoven cloth',
    img: '/hero-bottom-2.webp',
    alt: 'Block-printing tools resting on embroidered plum cloth',
  },
  {
    tag: 'Trousseau',
    title: 'A wedding in Kutch, stitched over two years',
    img: '/look-b2.webp',
    alt: 'Model in a red bridal lehenga with a net dupatta',
  },
  {
    tag: 'Lookbook',
    title: 'The Autumn Edit: colours of the salt desert',
    img: '/look-b1.webp',
    alt: 'Model in a maroon silk sari with gold zari embroidery beside brass urns',
  },
]

export default function Journal() {
  return (
    <section className="section container journal" id="journal">
      <div className="journal__head" data-reveal>
        <p className="eyebrow">The Journal</p>
        <h2 className="section-title">
          Stories from the loom,
          <br />
          straight from the villages
        </h2>
      </div>

      {/* ---- featured post ---- */}
      {/* The journal itself is the photo-journal chapter of the story page;
          there are no individual post routes to send these to. */}
      <Link className="journal-feature" to="/pages/the-shrujan-story#journal" data-reveal>
        <div className="journal-feature__media">
          <img src={FEATURED.img} alt={FEATURED.alt} loading="lazy" />
        </div>

        <div className="journal-feature__body">
          <span className="journal-pill journal-pill--dark journal-feature__tag">{FEATURED.tag}</span>
          <h3 className="journal-feature__title">{FEATURED.title}</h3>
          <p className="journal-feature__excerpt">{FEATURED.excerpt}</p>

          <span className="arrow-link journal-feature__link">
            Read the story <ArrowRight width="16" height="16" />
          </span>

          <div className="journal-feature__foot">
            <div className="journal-author">
              <img src={FEATURED.avatar} alt="" loading="lazy" />
              <div>
                <p className="journal-author__name">{FEATURED.author}</p>
                <p className="journal-author__role">{FEATURED.role}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* ---- three recent posts ---- */}
      <div className="journal-grid" data-reveal-child>
        {POSTS.map((post) => (
          <Link className="journal-card" to="/pages/the-shrujan-story#journal" key={post.title}>
            <div className="journal-card__media">
              <img src={post.img} alt={post.alt} loading="lazy" />
              <span className="journal-pill">{post.tag}</span>
              <span className="journal-card__arrow" aria-hidden="true">
                <ArrowRight width="15" height="15" />
              </span>
            </div>
            <h3 className="journal-card__title">{post.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
