import { Phool } from './Icons.jsx'

const CRAFTS = ['Suf', 'Kharek', 'Paako', 'Ahir', 'Rabari', 'Mutava', 'Jat Garasia', 'Neran']

function Group({ hidden }) {
  return (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {CRAFTS.map((craft) => (
        <span className="marquee__item" key={craft}>
          {craft}
          <Phool size={11} />
        </span>
      ))}
    </div>
  )
}

/* The eight living embroidery schools of Kutch, on a slow loom-like loop. */
export default function Marquee() {
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        <Group />
        <Group hidden />
      </div>
    </div>
  )
}
