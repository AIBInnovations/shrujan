# Smooth scroll

Uses **Lenis** (`npm i lenis`), driven by GSAP's ticker.

## Why Lenis and not ScrollSmoother

GSAP 3.13+ made ScrollSmoother free, and it is already in `node_modules`. Lenis
was chosen anyway because:

- **No wrapper markup.** ScrollSmoother needs `#smooth-wrapper > #smooth-content`
  around the whole page. On Shopify that means restructuring `theme.liquid`, and
  every app/section that injects markup has to land inside the wrapper.
- **`position: sticky` keeps working.** ScrollSmoother transforms the content
  element, which breaks sticky and fixed children unless they sit outside the
  wrapper. Lenis scrolls the window normally, so a sticky header needs no
  special handling — worth having if the header ever becomes sticky.
- **~3 kB**, no licence considerations, same ScrollTrigger integration.

## How it is wired here

`src/hooks/useSmoothScroll.js`, called once from `App.jsx`. Two details matter:

1. `lenis.on('scroll', ScrollTrigger.update)` — otherwise scroll-linked
   animations (the rotating seal, the orbiting arc, the parallax) lag a frame
   behind the content.
2. Lenis is stepped from `gsap.ticker` rather than its own `requestAnimationFrame`,
   so both run on a single loop. `lagSmoothing(0)` stops GSAP from skipping
   catch-up frames mid-scroll.

It also intercepts in-page `#anchor` clicks so they glide, and it **no-ops
entirely under `prefers-reduced-motion: reduce`**.

`html { scroll-behavior: auto }` is required — native smooth scrolling fights Lenis.

## Dropping this into Shopify

**1.** Add the script before `</body>` in `layout/theme.liquid`:

```liquid
<script src="https://unpkg.com/lenis@1.3.25/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
<script>
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    var lenis = new Lenis({
      duration: 1.05,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      syncTouch: false
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      if (!hash || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -24 });
    });
  })();
</script>
```

Prefer self-hosting the two libraries as theme assets rather than CDN links, so
a CDN outage cannot break scrolling on the storefront.

**2.** Add to the theme stylesheet:

```css
html { scroll-behavior: auto; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }
```

**3.** Shopify-specific gotchas:

- **Theme editor.** Sections re-render on edit; call `ScrollTrigger.refresh()`
  on `shopify:section:load` so trigger positions stay correct.
- **Cart drawers / modals.** Call `lenis.stop()` when one opens and
  `lenis.start()` when it closes, or the page scrolls behind the overlay.
- **Sticky header.** Works unchanged — this is the main reason for Lenis here.
