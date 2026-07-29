import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import useSmoothScroll, { scrollToAnchor, scrollToTop } from './hooks/useSmoothScroll.js'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import ShopShrujan from './pages/ShopShrujan.jsx'
import StudioCollection from './pages/StudioCollection.jsx'
import StudioHeritage from './pages/StudioHeritage.jsx'
import StudioAvinya from './pages/StudioAvinya.jsx'
import StudioGifting from './pages/StudioGifting.jsx'
import CraftTraditions from './pages/CraftTraditions.jsx'
import ShrujanStory from './pages/ShrujanStory.jsx'
import Lldc from './pages/Lldc.jsx'
import VisitExperience from './pages/VisitExperience.jsx'
import Product from './pages/Product.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const main = useRef(null)
  const { pathname, hash } = useLocation()

  useSmoothScroll()

  // A client-side route change keeps the old scroll position, so a new page
  // opens partway down. Reset through Lenis — see scrollToTop — then re-measure.
  // Do NOT kill every ScrollTrigger here: child effects run before the parent's,
  // so the incoming page has already registered its own and a blanket kill
  // wipes them out. The outgoing page's triggers are reverted by its useGSAP.
  //
  // `hash` is in the dependency list, not just `pathname`: the Story menu
  // links five sections of one page, so moving from #origins to #values never
  // changes the pathname and an effect keyed on it alone would not run at all.
  useEffect(() => {
    // A link that names a section wants that section, not the top of the page.
    // scrollToAnchor keeps correcting while the incoming page settles — see
    // the note on it for why one measurement is never enough here.
    if (hash) {
      ScrollTrigger.refresh()
      return scrollToAnchor(hash, { onMissing: scrollToTop })
    }

    scrollToTop()
    const id = requestAnimationFrame(() => {
      scrollToTop() // again after layout, in case the new page shifted height
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Quiet Premium scroll reveals, signature ease, no overshoot.
        // opacity rather than autoAlpha: autoAlpha sets visibility:hidden, and
        // Chrome will not fetch loading="lazy" images inside a hidden subtree,
        // so whole sections arrived blank until their reveal fired.
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
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
            { opacity: 0, y: 32 },
            {
              opacity: 1,
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
        gsap.set('[data-reveal], [data-reveal-child] > *', { clearProps: 'all', opacity: 1 })
      })
    },
    // re-runs per route: each page mounts a fresh set of [data-reveal] nodes
    { scope: main, dependencies: [pathname], revertOnUpdate: true },
  )

  return (
    <>
      <Header />
      <main ref={main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/shop-shrujan" element={<ShopShrujan />} />
          <Route path="/pages/studio-collection" element={<StudioCollection />} />
          <Route path="/pages/studio-collection/heritage" element={<StudioHeritage />} />
          <Route path="/pages/studio-collection/avinya" element={<StudioAvinya />} />
          <Route path="/pages/studio-collection/gifting" element={<StudioGifting />} />
          <Route path="/pages/video" element={<CraftTraditions />} />
          <Route path="/pages/the-shrujan-story" element={<ShrujanStory />} />
          <Route path="/pages/lldc" element={<Lldc />} />
          <Route path="/pages/visit-experience" element={<VisitExperience />} />
          <Route path="/products/:slug" element={<Product />} />
          {/* anything else falls back to the storefront rather than a blank screen */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
