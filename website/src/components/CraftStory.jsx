import { ArrowRight } from './Icons.jsx'

const SHOTS = [
  {
    img: '/bottom left.png',
    alt: 'Master weaver working threads at his handloom',
    caption: 'At the loom, Bhujodi',
  },
  {
    img: '/top right.png',
    alt: 'Artisan hand embroidering mirror-work flowers with a fine needle',
    caption: 'Suf, stitched from the reverse',
  },
]

const STATS = [
  { value: '1969', label: 'Founded by Chanda Shroff' },
  { value: '5', label: 'Decades of craft revival' },
  { value: '12', label: 'Living craft traditions' },
  { value: 'LLDC', label: 'Living & Learning Design Centre' },
]

export default function CraftStory() {
  return (
    <section className="section container" id="craft">
      <div className="craft">
        <div className="craft__body">
          <p className="eyebrow" data-reveal>
            Our Craft
          </p>
          <h2 className="section-title" data-reveal>
            Every stitch carries
            <br />
            <em>a signature</em>
          </h2>
          <div className="craft__copy" data-reveal>
            <p>
              Shrujan began in 1969 with Chanda Shroff, known as Kaki, who went to
              Kutch after a famine and found women whose embroidery was extraordinary
              and whose earnings were not. She turned that skill into a livelihood.
            </p>
            <p>
              From her vision to the hands of thousands of women across Kutch, Shrujan
              has quietly safeguarded the region&rsquo;s living craft traditions for
              over five decades, preserving the knowledge and the dignity behind it.
            </p>
          </div>

          <a className="arrow-link craft__link" href="#" data-reveal>
            Explore the Craft <ArrowRight width="16" height="16" />
          </a>
        </div>

        <div className="craft__gallery" data-reveal>
          {SHOTS.map((shot, i) => (
            <figure className="craft__shot" key={shot.caption}>
              <div className="craft__shot-media" data-parallax={i === 0 ? '' : undefined}>
                <img src={shot.img} alt={shot.alt} loading="lazy" />
              </div>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="craft__stats" data-reveal-child>
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <p className="stat__value">{s.value}</p>
            <p className="stat__label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
