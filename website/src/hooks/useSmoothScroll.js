import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Lenis smooth scrolling, driven by GSAP's ticker.
 *
 * Lenis is used rather than ScrollSmoother because it needs no wrapper markup,
 * which keeps the same setup portable to a Shopify theme (see SMOOTH-SCROLL.md).
 *
 * Two things matter for correctness:
 *  - ScrollTrigger must be told to update on every Lenis frame, or scroll-linked
 *    animations (the spinning seal, the orbiting arc, the parallax) lag behind.
 *  - Lenis must be stepped from GSAP's ticker, not its own rAF, so both run on
 *    one loop instead of fighting for frames.
 */
/* The live instance, so route changes can reset scroll through Lenis rather
   than around it. window.scrollTo only moves the native position — Lenis holds
   its own and reasserts it on the next frame, which on a shorter page clamps
   to the bottom. That is the "new page opens at the bottom" bug. */
let lenisInstance = null

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true, force: true })
    return
  }
  window.scrollTo(0, 0) // reduced-motion visitors never get a Lenis instance
}

/* Overlays (the press/journal lightbox) must freeze the page behind them.
   Lenis holds its own scroll position, so `overflow: hidden` on the body is not
   enough — the wheel still drives Lenis and the page creeps under the overlay.
   Pause Lenis itself; fall back to a body lock for reduced-motion visitors, who
   never get an instance. */
export function stopScroll() {
  if (lenisInstance) {
    lenisInstance.stop()
    return
  }
  document.body.style.overflow = 'hidden'
}

export function startScroll() {
  if (lenisInstance) {
    lenisInstance.start()
    return
  }
  document.body.style.overflow = ''
}

/* Lenis measures the document once and caches the result as its scroll limit,
   re-measuring only on a resize. On a route change the document height is
   whatever the *previous* page was until something tells it otherwise, so a
   scrollTo() aimed further down than that silently clamps — which is how a
   footer anchor on a 12,000px page ended up stopping at 2,798px, the bottom of
   the page that had just been unmounted. Re-measure before every programmatic
   scroll; it is a couple of layout reads and it makes the target reachable. */
function remeasure() {
  lenisInstance?.resize()
}

export function scrollToY(y, opts = {}) {
  if (lenisInstance) {
    remeasure()
    lenisInstance.scrollTo(y, opts)
    return
  }
  window.scrollTo({ top: y, behavior: opts.immediate ? 'auto' : 'smooth' })
}

/* The offset every anchor lands on: enough to clear the fixed header. */
export const HASH_OFFSET = 96

/**
 * Scroll to an element and keep correcting until it stops moving.
 *
 * Aiming once is not enough on the long pages. Sections below the fold hold
 * lazy images with no intrinsic size, so they take up no height until they
 * decode — and they only start decoding as the scroll brings them near the
 * viewport. The target therefore moves *while we travel towards it*.
 *
 * So re-aim on a short interval and stop once the number has held still three
 * times over, rather than after a fixed delay. Nothing is re-scrolled while
 * the target is not moving, so an already-settled page gets exactly one
 * scroll. Returns a cancel function.
 */
export function scrollToAnchor(hash, { offset = HASH_OFFSET, onMissing } = {}) {
  let last = -1
  let stable = 0
  let tries = 0
  let timer = 0
  let raf = 0

  const aim = () => {
    const target = typeof hash === 'string' ? document.querySelector(hash) : hash
    if (!target) {
      onMissing?.()
      return
    }

    const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset)
    if (Math.abs(y - last) < 4) {
      stable += 1
    } else {
      stable = 0
      last = y
      scrollToY(y)
    }

    tries += 1
    if (stable < 3 && tries < 24) timer = setTimeout(aim, 130)
  }

  raf = requestAnimationFrame(aim)
  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(timer)
  }
}

export default function useSmoothScroll() {
  useEffect(() => {
    // stop the browser restoring a previous position on top of ours
    const priorRestoration = history.scrollRestoration
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

    // Honour the OS setting: no hijacked scrolling for people who opt out.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const lenis = new Lenis({
      duration: 1.05,
      // gentle exponential ease-out; no overshoot, matching the site's motion
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // leave touch devices on native scrolling — it already feels right there
      syncTouch: false,
    })

    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000) // GSAP passes seconds, Lenis wants ms
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // In-page anchors should glide rather than jump.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      if (!hash || hash.length < 2) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      // Same settling loop the router uses for cross-page anchors — an
      // in-page jump to the footer has exactly the same moving-target problem.
      scrollToAnchor(target)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenisInstance = null
      if ('scrollRestoration' in history) history.scrollRestoration = priorRestoration
      lenis.destroy()
    }
  }, [])
}
