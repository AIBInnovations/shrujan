/* Line icons — 1.5px stroke, monochrome, per the design system's icon rules. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.35-4.35" />
    </svg>
  )
}

export function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.75 19.5c1.6-3.1 4.1-4.5 7.25-4.5s5.65 1.4 7.25 4.5" />
    </svg>
  )
}

export function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M12 19.8S4.5 15.3 4.5 9.9c0-2.6 2-4.4 4.2-4.4 1.5 0 2.7.8 3.3 2 .6-1.2 1.8-2 3.3-2 2.2 0 4.2 1.8 4.2 4.4 0 5.4-7.5 9.9-7.5 9.9Z" />
    </svg>
  )
}

export function BagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M5.5 8h13l-.9 12h-11.2Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  )
}

export function ArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  )
}

export function ChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  )
}

export function ChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </svg>
  )
}

export function ChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

/* The Shrujan phool — a four-petal lozenge ornament used as the brand mark. */
export function Phool({ size = 22, ...props }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" {...props}>
      <path d="M16 2c1.3 4.6 3 7.4 5.2 8.8C23.4 12.2 26 13 30 13.4v.2c-4 .4-6.6 1.2-8.8 2.6C19 17.6 17.3 20.4 16 25c-1.3-4.6-3-7.4-5.2-8.8C8.6 14.8 6 14 2 13.6v-.2c4-.4 6.6-1.2 8.8-2.6C13 9.4 14.7 6.6 16 2Z" />
      <circle cx="16" cy="28.5" r="1.6" />
    </svg>
  )
}
