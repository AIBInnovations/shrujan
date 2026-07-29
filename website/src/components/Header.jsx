import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV } from '../data/nav.js'
import {
  SearchIcon,
  UserIcon,
  HeartIcon,
  BagIcon,
  ChevronDown,
  MenuIcon,
  CloseIcon,
  ArrowRight,
} from './Icons.jsx'

/* Panel titles arrive as plain strings with *asterisks* around the words that
   set in italic, so nav.js can stay a data file with no JSX in it. */
function Em({ text }) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      part
    ),
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  // Which dropdown is open. Controlled rather than CSS :hover/:focus-within,
  // because the clicked link keeps focus across a route change and would hold
  // its panel open on the new page.
  const [openKey, setOpenKey] = useState(null)
  const { pathname } = useLocation()
  // After navigating, the nav re-renders under a stationary cursor and fires
  // mouseenter again, which reopens the panel on the new page. Ignore hover
  // until the pointer genuinely moves.
  const ignoreHover = useRef(false)
  const firstRoute = useRef(true)
  const [fixed, setFixed] = useState(false)   // lifted out of flow, past the hero
  const [shown, setShown] = useState(false)   // slid down into view
  const [anim, setAnim] = useState(false)     // transitions on, after the first frame
  const [height, setHeight] = useState(0)
  const barRef = useRef(null)
  const lastY = useRef(0)
  const ticking = useRef(false)
  const unfix = useRef(null)

  // Keep the header's height so the spacer can hold its place in the document
  // the moment it goes fixed — otherwise the page jumps up by that height.
  useEffect(() => {
    const measure = () => {
      const h = barRef.current?.offsetHeight ?? 0
      setHeight(h)
      // published so sticky sub-navs and :target offsets can clear the floating
      // bar without hard-coding a height that changes with the breakpoint
      document.documentElement.style.setProperty('--header-h', `${h}px`)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // In flow over the hero, so the hero does not slide underneath it. Past the
  // hero it becomes a floating bar: away while reading down, back on scroll up.
  useEffect(() => {
    const heroEnd = () => {
      const hero = document.querySelector('.hero')
      return hero ? hero.offsetTop + hero.offsetHeight : 620
    }

    const read = () => {
      const y = window.scrollY
      const past = y > heroEnd()
      const delta = y - lastY.current
      const h = barRef.current?.offsetHeight ?? 120

      if (past) {
        // in the floating zone: away while reading down, back on scroll up
        clearTimeout(unfix.current)
        setFixed(true)
        if (Math.abs(delta) > 4) {
          setShown(delta < 0)
          lastY.current = y
        }
      } else if (y <= h) {
        // at the top the fixed and in-flow positions coincide, so hand over
        // instantly — animating here would show the bar leave and come back
        clearTimeout(unfix.current)
        setFixed(false)
        setShown(false)
        lastY.current = y
      } else {
        // scrolling up out of the floating zone: let it slide away first, then
        // drop back into flow once it is off-screen, so nothing snaps
        setShown(false)
        clearTimeout(unfix.current)
        unfix.current = setTimeout(() => setFixed(false), 520)
        lastY.current = y
      }
      ticking.current = false
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(read)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    read()
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(unfix.current)
    }
  }, [])

  // Enable the slide only after it is already fixed and off-screen, so going
  // fixed does not animate a visible upward flick.
  useEffect(() => {
    if (!fixed) {
      setAnim(false)
      return
    }
    const id = requestAnimationFrame(() => setAnim(true))
    return () => cancelAnimationFrame(id)
  }, [fixed])

  useEffect(() => {
    if (!shown) setMenuOpen(false)
  }, [shown])

  // Close every panel on navigation. Without this the clicked link keeps focus
  // and the cursor stays put, so the panel rides along onto the new page.
  useEffect(() => {
    setOpenKey(null)
    setMenuOpen(false)
    document.activeElement?.blur?.()

    // Not on first render: arming the guard on mount would swallow the very
    // first hover, since mouseenter fires before the release can run.
    if (firstRoute.current) {
      firstRoute.current = false
      return
    }

    // Briefly ignore hover so the click's own synthetic mousemove, and the
    // mouseenter fired when the panel closes under a stationary cursor, cannot
    // reopen it. The user must move away and back.
    ignoreHover.current = true
    const t = setTimeout(() => {
      ignoreHover.current = false
    }, 400)
    return () => clearTimeout(t)
  }, [pathname])

  // Escape closes an open panel
  useEffect(() => {
    if (!openKey) return
    const onKey = (e) => e.key === 'Escape' && setOpenKey(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openKey])

  return (
    <>
      {/* holds the header's place in the document once it lifts out of flow */}
      {fixed && <div style={{ height }} aria-hidden="true" />}

      <header
        ref={barRef}
        className={`site-header${fixed ? ' is-fixed' : ''}${shown ? ' is-shown' : ''}${
          anim ? ' is-anim' : ''
        }`}
      >
      <div className="topbar">
        <div className="topbar__inner">
          <div className="topbar__selects">
            <button className="topbar__select" type="button" aria-label="Change currency">
              INR <ChevronDown width="11" height="11" />
            </button>
            <span className="topbar__sep" aria-hidden="true" />
            <button className="topbar__select" type="button" aria-label="Change language">
              EN <ChevronDown width="11" height="11" />
            </button>
          </div>
          <span className="topbar__note">Complimentary shipping on orders above ₹5,000</span>
        </div>
      </div>

      <div className="site-header__inner">
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item) => (
            <div
              className={`nav-item${item.panel ? ' has-menu' : ''}${
                openKey === item.label ? ' is-open' : ''
              }`}
              key={item.label}
              onMouseEnter={() => {
                if (item.panel && !ignoreHover.current) setOpenKey(item.label)
              }}
              onMouseLeave={() => item.panel && setOpenKey(null)}
              onFocus={() => {
                if (item.panel && !ignoreHover.current) setOpenKey(item.label)
              }}
              onBlur={(e) => {
                if (item.panel && !e.currentTarget.contains(e.relatedTarget)) setOpenKey(null)
              }}
            >
              <Link className="nav-item__link" to={item.to} aria-label={item.full}>
                {item.label}
                {item.panel && <ChevronDown width="12" height="12" aria-hidden="true" />}
              </Link>

              {item.panel && (
                <div className="nav-panel">
                  {/* The sheet spans the whole header rather than hanging off
                      the link, so a panel reads as the header opening rather
                      than a tooltip appearing. */}
                  <div className="nav-panel__sheet">
                    <span className="nav-panel__orn" aria-hidden="true" />

                    <div className="nav-panel__inner">
                      {/* 1 · the lead card */}
                      <Link className="navlead" to={item.panel.lead.to}>
                        <img src={item.panel.lead.img} alt="" loading="lazy" />
                        <span className="navlead__scrim" aria-hidden="true" />
                        <span className="navlead__body">
                          <span className="navlead__eyebrow">{item.panel.lead.eyebrow}</span>
                          <span className="navlead__title">
                            <Em text={item.panel.lead.title} />
                          </span>
                          <span className="navlead__copy">{item.panel.lead.copy}</span>
                          <span className="navlead__cta">
                            {item.panel.lead.cta}
                            <ArrowRight width="14" height="14" />
                          </span>
                        </span>
                      </Link>

                      {/* 2 · the real destinations, each with a thumbnail */}
                      <div className="navcol navcol--main">
                        <p className="navcol__group">{item.panel.main.group}</p>
                        <ul className="navthumbs">
                          {item.panel.main.items.map((sub) => (
                            <li key={sub.label}>
                              <Link to={sub.to}>
                                <span className="navthumbs__media">
                                  <img src={sub.img} alt="" loading="lazy" />
                                </span>
                                <span className="navthumbs__text">
                                  <span className="navthumbs__label">{sub.label}</span>
                                  <span className="navthumbs__sub">{sub.sub}</span>
                                </span>
                                <ArrowRight
                                  className="navthumbs__go"
                                  width="15"
                                  height="15"
                                  aria-hidden="true"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 3 · everything else */}
                      <div className="navcol navcol--more">
                        <p className="navcol__group">{item.panel.more.group}</p>
                        <ul className="navlinks">
                          {item.panel.more.items.map((sub) => (
                            <li key={sub.label}>
                              <Link to={sub.to}>
                                <span>{sub.label}</span>
                                <ArrowRight width="15" height="15" aria-hidden="true" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 4 · one thing worth reading */}
                      <div className="navcol navcol--featured">
                        <p className="navcol__group">{item.panel.featured.group}</p>
                        <Link className="navfeat" to={item.panel.featured.to}>
                          <span className="navfeat__media">
                            <img
                              src={item.panel.featured.img}
                              alt={item.panel.featured.alt}
                              loading="lazy"
                            />
                          </span>
                          <span className="navfeat__title">
                            <Em text={item.panel.featured.title} />
                          </span>
                          <span className="navfeat__sub">{item.panel.featured.sub}</span>
                          <span className="navfeat__cta">
                            {item.panel.featured.cta}
                            <ArrowRight width="14" height="14" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* The brand block is absolutely positioned so it rises into the
            topbar row and masks its border — the line breaks around the logo. */}
        <Link className="brand" to="/" aria-label="Shrujan home">
          <img className="brand__logo" src="/logo-shrujan.png" alt="Shrujan" />
          <span className="brand__tag">Heritage by Hand</span>
        </Link>

        {/* Search and Bag lead into the catalogue, which is the only place
            either can go in this build. Account and Wishlist are <button>s,
            not links: there is no account system and no saved list behind
            them, and an <a href="#"> would claim a destination that does not
            exist — a button that has yet to be wired at least says so to a
            screen reader instead of jumping the page to the top. */}
        <div className="header-utils">
          <Link className="utility-link" to="/pages/shop-shrujan#catalogue" aria-label="Search">
            <span>Search</span> <SearchIcon />
          </Link>
          <button className="utility-link" type="button" aria-label="Account" aria-disabled="true">
            <span>Account</span> <UserIcon />
          </button>
          <button className="utility-link" type="button" aria-label="Wishlist" aria-disabled="true">
            <span>Wishlist</span> <HeartIcon />
          </button>
          <Link
            className="utility-link"
            to="/pages/shop-shrujan#catalogue"
            aria-label="Shopping bag, 0 items"
          >
            <span>Bag&nbsp;(0)</span> <BagIcon />
          </Link>
        </div>
      </div>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Mobile">
        {NAV.map((item) => (
          <div className="mobile-nav__group" key={item.label}>
            <Link to={item.to} onClick={() => setMenuOpen(false)}>
              {item.full}
            </Link>
            {item.panel && (
              /* the phone gets the destinations as one flat list — the
                 four-zone composition has nowhere to go at 390px */
              <ul className="mobile-nav__sub">
                {[...item.panel.main.items, ...item.panel.more.items].map((sub, i) => (
                  <li key={`${sub.label}-${i}`}>
                    <Link to={sub.to} onClick={() => setMenuOpen(false)}>
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        </nav>
      </header>
    </>
  )
}
