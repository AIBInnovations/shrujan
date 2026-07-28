import { ArrowRight } from './Icons.jsx'

const FEATURED = {
  tag: 'Craft Notes',
  title: '5 Kutch embroidery styles and how to tell them apart',
  excerpt:
    'Suf, Kharek, Paako, Rabari, Mutava. Each village stitches its own signature. A field guide to reading the motifs, mirrors and thread counts that set them apart.',
  img: '/top right.png',
  alt: 'Close crop of mirror-work embroidery in crimson and gold threads',
  author: 'Kanta Ben Rabari',
  role: 'Master Artisan · Bhuj',
  avatar:
    '/cat-c4.png',
}

const POSTS = [
  {
    tag: 'Care Guide',
    title: 'How to care for handwoven cloth',
    img: '/hero-bottom-2.png',
    alt: 'Block-printing tools resting on embroidered plum cloth',
  },
  {
    tag: 'Trousseau',
    title: 'A wedding in Kutch, stitched over two years',
    img: '/look-b2.png',
    alt: 'Model in a red bridal lehenga with a net dupatta',
  },
  {
    tag: 'Lookbook',
    title: 'The Autumn Edit: colours of the salt desert',
    img: '/look-b1.png',
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
      <a className="journal-feature" href="#" data-reveal>
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
      </a>

      {/* ---- three recent posts ---- */}
      <div className="journal-grid" data-reveal-child>
        {POSTS.map((post) => (
          <a className="journal-card" href="#" key={post.title}>
            <div className="journal-card__media">
              <img src={post.img} alt={post.alt} loading="lazy" />
              <span className="journal-pill">{post.tag}</span>
              <span className="journal-card__arrow" aria-hidden="true">
                <ArrowRight width="15" height="15" />
              </span>
            </div>
            <h3 className="journal-card__title">{post.title}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}
