import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Showcase from './components/Showcase.jsx'
import Categories from './components/Categories.jsx'
import ShopTheLooks from './components/ShopTheLooks.jsx'
import Reels from './components/Reels.jsx'
import Ledger from './components/Ledger.jsx'
import Testimonials from './components/Testimonials.jsx'
import Trousseau from './components/Trousseau.jsx'
import Faq from './components/Faq.jsx'
import Spotlight from './components/Spotlight.jsx'
import Bestsellers from './components/Bestsellers.jsx'
import CraftStory from './components/CraftStory.jsx'
import Journal from './components/Journal.jsx'
import ShopCta from './components/ShopCta.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const main = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Quiet Premium scroll reveals — signature ease, no overshoot.
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })

        // Grids reveal as a micro-cascade.
        gsap.utils.toArray('[data-reveal-child]').forEach((group) => {
          gsap.fromTo(
            group.children,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.09,
              scrollTrigger: { trigger: group, start: 'top 86%', once: true },
            },
          )
        })

        // Gentle image drift inside fixed frames.
        gsap.utils.toArray('[data-parallax] img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: 0 },
            {
              yPercent: -7,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            },
          )
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-reveal], [data-reveal-child] > *', { clearProps: 'all', autoAlpha: 1 })
      })
    },
    { scope: main },
  )

  return (
    <>
      <Header />
      <main ref={main}>
        <Hero />
        <Marquee />
        <Spotlight />
        <Bestsellers />
        <Categories />
        <Showcase />
        <ShopTheLooks />
        <Reels />
        <Ledger />
        <CraftStory />
        <Trousseau />
        <Testimonials />
        <Journal />
        <Faq />
        <ShopCta />
      </main>
      <Footer />
    </>
  )
}
