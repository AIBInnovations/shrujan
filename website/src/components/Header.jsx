import { useState } from 'react'
import {
  SearchIcon,
  UserIcon,
  HeartIcon,
  BagIcon,
  ChevronDown,
  MenuIcon,
  CloseIcon,
} from './Icons.jsx'

const NAV = ['New In', 'Women', 'Men', 'Collections', 'Craft', 'Stories']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar__inner">
          <button className="topbar__region" type="button" aria-label="Change region and currency">
            India&nbsp;|&nbsp;INR ₹ <ChevronDown />
          </button>
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
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </nav>

        {/* The brand block is absolutely positioned so it rises into the
            topbar row and masks its border — the line breaks around the logo. */}
        <a className="brand" href="#" aria-label="Shrujan home">
          <img className="brand__logo" src="/logo-shrujan.png" alt="Shrujan" />
          <span className="brand__tag">Heritage by Hand</span>
        </a>

        <div className="header-utils">
          <a className="utility-link" href="#" aria-label="Search">
            <span>Search</span> <SearchIcon />
          </a>
          <a className="utility-link" href="#" aria-label="Account">
            <span>Account</span> <UserIcon />
          </a>
          <a className="utility-link" href="#" aria-label="Wishlist">
            <span>Wishlist</span> <HeartIcon />
          </a>
          <a className="utility-link" href="#" aria-label="Shopping bag, 0 items">
            <span>Bag&nbsp;(0)</span> <BagIcon />
          </a>
        </div>
      </div>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Mobile">
        {NAV.map((item) => (
          <a key={item} href="#" onClick={() => setMenuOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  )
}
