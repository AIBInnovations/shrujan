import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon, ChevronLeft, ChevronRight } from './Icons.jsx'
import { stopScroll, startScroll } from '../hooks/useSmoothScroll.js'

/* Full-screen viewer for the Photo Journal and the press tearsheets.
   The press scans are magazine pages — at grid size they are only a shape, so
   being able to open one and actually read it is the point, not decoration.

   Rendered through a portal so no ancestor's transform, overflow or stacking
   context can clip or trap it; several sections on this site create both.

   `items` is [{ src, alt, caption }]; `index` is the open frame, or -1 closed. */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const open = index >= 0 && index < items.length

  const step = useCallback(
    (delta) => {
      if (!items.length) return
      onIndex((index + delta + items.length) % items.length) // wrap both ways
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    stopScroll()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      startScroll()
    }
  }, [open, step, onClose])

  if (!open) return null
  const item = items[index]

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || item.alt || 'Image viewer'}
      onClick={onClose}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <CloseIcon width="20" height="20" />
      </button>

      {items.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation()
            step(-1)
          }}
        >
          <ChevronLeft width="20" height="20" />
        </button>
      )}

      {/* stopPropagation so clicking the picture itself does not close */}
      <figure className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt || ''} />
        {(item.caption || items.length > 1) && (
          <figcaption className="lightbox__cap">
            <span>{item.caption || item.alt}</span>
            {items.length > 1 && (
              <span className="lightbox__count">
                {index + 1} / {items.length}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      {items.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation()
            step(1)
          }}
        >
          <ChevronRight width="20" height="20" />
        </button>
      )}
    </div>,
    document.body,
  )
}
