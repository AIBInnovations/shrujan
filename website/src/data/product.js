/* Product detail data.

   Every catalogue image belongs to a numbered family in /public
   (sj-kanchli-1..6, sj-tops-1-1..10 and so on), so a product's gallery is
   derived from its own image rather than hand-listed per product. */

export const FAMILIES = {
  'sj-cushion-covers': 6,
  'sj-dresses': 6,
  'sj-dupattas': 5,
  'sj-kanchli': 6,
  'sj-pant': 4,
  'sj-potlis-batwas': 3,
  'sj-stoles': 2,
  'sj-tops-1': 10,
  'sj-tote-bags': 3,
  'sj-wall-hangings': 4,
}

/* Store handles are unique; titles are not — several products across the
   collections are just 'Dupatta' or 'Tote Bag', and a title-derived URL would
   send all of them to the same page. Use the handle where we have one. */
export const productSlug = (p) => p.slug ?? slugify(p.name)

export const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/* Real products carry their own `gallery` from the live store. Everything else
   falls back to deriving one from the numbered image families in /public. */
export function galleryFor(img, gallery) {
  if (gallery?.length) return gallery.slice(0, 5)
  return derivedGallery(img)
}

function derivedGallery(img) {
  const file = decodeURIComponent(img).replace(/^\//, '').replace(/\.webp$/, '')
  const family = Object.keys(FAMILIES).find((f) => file.startsWith(`${f}-`))
  if (!family) return [img]

  const shots = Array.from({ length: FAMILIES[family] }, (_, i) => `/${family}-${i + 1}.webp`)
  // lead with the catalogue shot, then the rest of the family
  return [img, ...shots.filter((s) => s !== img)].slice(0, 5)
}

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const SPECS = [
  'Hand-embroidered',
  'Naturally dyed',
  'Handloom cloth',
  'Made in Kutch',
]

export const DETAILS = [
  {
    q: 'The craft',
    a: 'Worked entirely by hand, stitch by counted stitch, on cloth woven on pit looms a few kilometres from our Bhuj atelier. The motifs are never drawn on first — the embroiderer holds the geometry in her head and works it from memory, which is why no two pieces finish identically.',
  },
  {
    q: 'Fabric & fit',
    a: 'Handloom cotton with a soft, dry handle that softens further with every wash. Cut to drape generously rather than to cling. If you are between sizes, take the smaller one — these relax with wear.',
  },
  {
    q: 'How to care for it',
    a: 'Cold hand wash, separately, for the first three washes. No wringing and no direct sun on the embroidered face. Natural dyes will shift very slightly in the first month and then hold — that settling is the dye, not a fault.',
  },
  {
    q: 'Shipping & returns',
    a: 'Ready pieces leave Bhuj within 48 hours and arrive in 3–6 days across India, 8–14 days worldwide with duties settled at checkout. Returns and exchanges within 14 days on unworn pieces with tags intact.',
  },
  {
    q: 'The maker',
    a: 'Every piece carries the name of the woman who embroidered it, and she is paid per piece, on time, directly. That arrangement was unusual when Shrujan began in 1969 and it still is.',
  },
]

export const REVIEW_FACES = [
  '/cat-c1.webp',
  '/frame-r5t25.webp',
  '/cat-c5.webp',
  '/frame-r2t5.webp',
]


export const SPEC_TABLE = [
  { k: 'Fabric', v: 'Handloom cotton, woven in Bhujodi' },
  { k: 'Craft', v: 'Hand embroidery, worked over 3–6 weeks' },
  { k: 'Dye', v: 'Madder, indigo and pomegranate — no synthetics' },
  { k: 'Finish', v: 'Cut and finished in the Bhuj atelier' },
  { k: 'Care', v: 'Cold hand wash separately · no wringing · dry in shade' },
  { k: 'Origin', v: 'Kutch, Gujarat, India' },
]

export const REVIEWS = [
  {
    name: 'Meera S.',
    place: 'Mumbai',
    stars: 5,
    body: 'The fall, the finish, the way the border sits. Five years on it has not lost a single stitch.',
  },
  {
    name: 'Ananya I.',
    place: 'Bengaluru',
    stars: 5,
    body: 'Three people asked where it was from before dinner. It photographs even better than it looks.',
  },
  {
    name: 'Nisha B.',
    place: 'Chandigarh',
    stars: 5,
    body: 'Ordered with three weeks to spare. It came early, altered to measure, and fit like it was drafted on me.',
  },
]
