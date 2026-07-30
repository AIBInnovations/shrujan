import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* Heritage spotlight — centred heading over a model cutout with floating stats */

export default function Spotlight() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // The arc orbits the circle as the section scrolls through the viewport.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.spotlight__arc circle',
          { rotation: -250, svgOrigin: '50 50' },
          {
            rotation: 110,
            svgOrigin: '50 50',
            ease: 'none',
            scrollTrigger: {
              trigger: '.spotlight__stage',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.spotlight__arc circle', { rotation: -118, svgOrigin: '50 50' })
      })
    },
    { scope: root },
  )

  return (
    <section className="section container spotlight" id="heritage" ref={root}>
      {/* ---- centred heading ---- */}
      <div className="spotlight__head" data-reveal>
        <p className="eyebrow">Heritage &amp; Innovation</p>

        <h2 className="spotlight__title">
          <span className="spotlight__line">
            Heritage elegance
            <span className="spotlight__chip">
              <img src="/hero-beside-right.webp" alt="" loading="lazy" />
            </span>
            redefined
          </span>
          <span className="spotlight__line">
            <span className="spotlight__chip">
              <img src="/top right.webp" alt="" loading="lazy" />
            </span>
            through living craft
          </span>
        </h2>
      </div>

      {/* ---- copy top-left ---- */}
      <div className="spotlight__split" data-reveal>
        <p className="spotlight__copy">
          Shrujan merges centuries-old embroidery with contemporary silhouettes,
          a refined and craft-driven wardrobe that aligns seamlessly with your life.
        </p>
      </div>

      {/* ---- model over circle with floating stats ---- */}
      <div className="spotlight__stage" data-reveal>
        {/* The figure wrapper is unpositioned on desktop, so every absolute
            child inside still resolves against the stage and the composed
            layout is untouched. On phones it becomes the positioned frame the
            artwork centres in, while the stats drop into normal flow below. */}
        <div className="spotlight__figure">
          <span className="spotlight__circle" aria-hidden="true" />

          <svg className="spotlight__arc" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="48.5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="82 223" />
          </svg>

          <p className="spotlight__ghost" aria-hidden="true">
            100%
            <span>Hand-embroidered</span>
          </p>

          <img
            className="spotlight__model"
            src="/model.webp"
            alt="Model in a crimson mirror-work jacket draped with a hand-embroidered patola sari"
            loading="lazy"
          />

          {/* two small plates balancing the circle */}
          <figure className="spotlight__plate spotlight__plate--tr" aria-hidden="true">
            <img src="/cat-c1.webp" alt="" loading="lazy" />
          </figure>
          <figure className="spotlight__plate spotlight__plate--bl" aria-hidden="true">
            <img src="/top right.webp" alt="" loading="lazy" />
          </figure>
        </div>

        <div className="spotlight__stat spotlight__stat--women">
          <strong>4,000+</strong>
          <span>Artisan women behind every piece</span>
        </div>

        <div className="spotlight__stat spotlight__stat--crafts">
          <strong>12</strong>
          <span>Living craft traditions of Kutch</span>
        </div>

        <p className="spotlight__note">Every piece signed by the hands that made it</p>

        <div className="spotlight__stat spotlight__stat--villages">
          <strong>40</strong>
          <span>Villages across the Kutch desert</span>
        </div>
      </div>

      {/* ---- closing copy, bottom-right ---- */}
      <div className="spotlight__outro" data-reveal>
        <p>
          Naturally dyed cloth, hand-embroidered over weeks and finished in our Bhuj
          atelier, made to be worn today and handed down tomorrow.
        </p>
      </div>
    </section>
  )
}
