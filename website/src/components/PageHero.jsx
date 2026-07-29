/* Page masthead. The eyebrow / title / lede / stats block is shared so the
   six pages stay one family, but `variant` changes the whole composition
   around it — otherwise every page opens with the same rectangle of text and
   reads as a template.

   cover   Studio   · text reversed out over a full-bleed image
   dark    Craft    · maroon cinema panel, since the page is film-led
   ghost   Story    · the founding year set huge behind the title
   plaque  LLDC     · text beside a museum-style visiting card
   map     Visit    · text beside the India panel from the hero
*/

export default function PageHero({
  variant = 'plain',
  eyebrow,
  title,
  lede,
  meta,
  aside,
  actions,
  image,
  alt,
  ghost,
  frame,
}) {
  const dark = variant === 'cover' || variant === 'dark'

  return (
    <header
      // `frame` sets the masthead in from the page edges on the same 6px and
      // the same corner radius the home hero uses for its cells, instead of
      // bleeding to the browser edge
      className={`page-hero page-hero--${variant}${frame ? ' page-hero--frame' : ''}`}
      data-reveal
    >
      {variant === 'cover' && (
        <div className="page-hero__bg" aria-hidden="true">
          <img src={image} alt="" fetchPriority="high" />
          <span className="page-hero__scrim" />
        </div>
      )}

      {variant === 'ghost' && (
        <span className="page-hero__ghost" aria-hidden="true">
          {ghost}
        </span>
      )}

      <div className="container page-hero__grid">
        <div className="page-hero__text">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-hero__title">{title}</h1>
          {lede && <p className="page-hero__lede">{lede}</p>}

          {actions && <div className="page-hero__actions">{actions}</div>}

          {meta?.length > 0 && (
            <ul className="page-meta">
              {meta.map((m) => (
                <li key={m.label}>
                  <span className="page-meta__value">{m.value}</span>
                  <span className="page-meta__label">{m.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>

      {/* the plain variant keeps the old wide band under the text */}
      {variant === 'plain' && image && (
        <figure className="container page-hero__media" data-parallax>
          <img src={image} alt={alt} fetchPriority="high" />
        </figure>
      )}

      {dark && <span className="page-hero__rule" aria-hidden="true" />}
    </header>
  )
}
