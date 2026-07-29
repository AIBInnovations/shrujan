import { KANCHLI } from './kanchli.js'
import { LIVE_PIECES } from './live.js'
import { APPAREL } from './apparel.js'

/* Real Shrujan catalogue, mirroring the collection structure on shrujan.com.
   Imagery is the brand's own product photography, pulled from their store. */

const PLACEHOLDER = [
  { name: 'Embroidered Kanchli', craft: 'Aabhla · Kutch', price: '₹ 8,900', was: null,
    tag: 'Festive', badge: 'Bestseller', swatches: ['#2f3a30', '#8d2f26', '#c7a56a'],
    img: '/sj-black-pakko-hand-embroidered-kanchli-1.webp', alt: 'Model in a black Pakko-embroidered kanchli' },
  { name: 'Bandhani Silk Dupatta', craft: 'Bandhani · Kutch', price: '₹ 6,400', was: '₹ 7,200',
    tag: 'Festive', badge: null, swatches: ['#2b3d63', '#c96a1f', '#f2ede0'],
    img: '/sj-dupatta-copy-1-1.webp', alt: 'Model in an ivory anarkali with a red bandhani dupatta' },
  { name: 'Embroidered Tote', craft: 'Suf · Bhuj', price: '₹ 4,600', was: null,
    tag: 'Gifting', badge: null, swatches: ['#1f4740', '#8d2f26', '#c7a56a'],
    img: '/sj-hand-bag-copy-23-1.webp', alt: 'Embroidered tote bag carried over the arm' },
  { name: 'Silk Potli Batwa', craft: 'Mutava · Kutch', price: '₹ 2,800', was: null,
    tag: 'Gifting', badge: 'Few left', swatches: ['#2b3d63', '#1f7a8c', '#c7a56a'],
    img: '/sj-ahir-batwa-1-1.webp', alt: 'Orange Ahir-embroidered potli bag with a drawstring' },
  { name: 'Handwoven Cushion Cover', craft: 'Handloom · Bhujodi', price: '₹ 1,900', was: null,
    tag: 'Everyday', badge: null, swatches: ['#2b3d63', '#1f7a8c', '#c96a1f'],
    img: '/sj-handloom-weaving-cushion-cover-3-1.webp', alt: 'Block-printed cushion cover in purple and ivory' },
  { name: 'Kutchi Wall Hanging', craft: 'Suf · Kutch', price: '₹ 5,400', was: null,
    tag: 'Everyday', badge: null, swatches: ['#b8a68a', '#8d2f26', '#2b3d63'],
    img: '/sj-wall-hangings-4.webp', alt: 'Embroidered wall hanging with tassels' },
  { name: 'Linen Shift Dress', craft: 'Natural dye · Bhuj', price: '₹ 7,800', was: '₹ 8,900',
    tag: 'Everyday', badge: 'New in', swatches: ['#b06a6a', '#75665f', '#f2ede0'],
    img: '/sj-handcrafted-halter-dress-1.webp', alt: 'Model in a printed halter-neck dress' },
  { name: 'Embroidered Cotton Shirt', craft: 'Paako · Kutch', price: '₹ 5,200', was: null,
    tag: 'Everyday', badge: null, swatches: ['#4a6b46', '#f2ede0', '#c7a56a'],
    img: '/sj-green-hand-woven-top-1.webp', alt: 'Model in a green handwoven shirt' },
  { name: 'Embroidered Palazzo', craft: 'Kutchi hand-embroidery', price: '₹ 4,900', was: null,
    tag: 'Everyday', badge: null, swatches: ['#5b6b8c', '#571c16', '#c7a56a'],
    img: '/sj-pant-2.webp', alt: 'Model in embroidered lilac palazzo trousers' },
  { name: 'Wool Kutchi Stole', craft: 'Handloom · Bhujodi', price: '₹ 3,600', was: null,
    tag: 'Gifting', badge: null, swatches: ['#a8306a', '#5b6b8c', '#c7a56a'],
    img: '/sj-shawl-1-1.webp', alt: 'Green handwoven stole with fringing' },
  { name: 'Bandhani Anarkali Set', craft: 'Bandhani · Kutch', price: '₹ 18,400', was: null,
    tag: 'Bridal', badge: 'Made to order', swatches: ['#8d2f26', '#2b3d63', '#f2ede0'],
    img: '/sj-dupatta-copy-2-1.webp', alt: 'Model in an ivory anarkali with a black and gold dupatta' },
  { name: 'Ceremonial Kanchli', craft: 'Zardozi · Bhuj atelier', price: '₹ 24,800', was: null,
    tag: 'Bridal', badge: null, swatches: ['#571c16', '#c7a56a', '#8d2f26'],
    img: '/sj-megenta-pink-hand-embroidered-kanchli-1.webp', alt: 'Model in a magenta hand-embroidered kanchli' },
  { name: 'Mirror-Work Sling', craft: 'Aabhla · Kutch', price: '₹ 3,400', was: null,
    tag: 'Bridal', badge: null, swatches: ['#2b3d63', '#1f7a8c', '#c7a56a'],
    img: '/sj-ahir-batwa-copy-1-1.webp', alt: 'Navy embroidered potli bag with a drawstring' },
  { name: 'Festive Kurta Set', craft: 'Chikankari · Lucknow', price: '₹ 12,600', was: null,
    tag: 'Bridal', badge: null, swatches: ['#f2ede0', '#c7a56a', '#8d2f26'],
    img: '/sj-ahir-hand-embroidered-halter-top-1.webp', alt: 'Model in an embroidered halter top' },
  { name: 'Block-Print Tunic', craft: 'Ajrakh · Ajrakhpur', price: '₹ 4,200', was: null,
    tag: 'Bridal', badge: null, swatches: ['#f2ede0', '#8d2f26', '#75665f'],
    img: '/sj-hand-block-printed-dress-1.webp', alt: 'Model in a block-printed sleeveless dress' },
  { name: 'Striped Cushion Pair', craft: 'Handloom · Bhujodi', price: '₹ 3,400', was: null,
    tag: 'Festive', badge: null, swatches: ['#1f7a8c', '#c96a1f', '#2b3d63'],
    img: '/sj-handloom-weaving-cushion-cover-5-1.webp', alt: 'Handwoven cushion cover striped in indigo and ivory' },
  { name: 'Suf Wall Panel', craft: 'Suf · Kutch', price: '₹ 6,800', was: null,
    tag: 'Festive', badge: null, swatches: ['#b8a68a', '#2b3d63', '#8d2f26'],
    img: '/sj-wall-hangings-4.webp', alt: 'Embroidered wall hanging with tassels' },
  { name: 'Embroidered Jacket', craft: 'Paako · Kutch', price: '₹ 9,600', was: null,
    tag: 'Gifting', badge: null, swatches: ['#1f7a8c', '#f2ede0', '#c7a56a'],
    img: '/sj-cotton-handwoven-top-1.webp', alt: 'Model in a striped handwoven sleeveless top' },
  { name: 'Indigo Embroidered Pant', craft: 'Kutchi hand-embroidery', price: '₹ 4,400', was: null,
    tag: 'Gifting', badge: null, swatches: ['#2b3d63', '#c7a56a', '#f2ede0'],
    img: '/sj-pant-1.webp', alt: 'Model in indigo embroidered trousers' },
  { name: 'Handwoven Muffler', craft: 'Handloom · Bhujodi', price: '₹ 2,200', was: null,
    tag: 'Everyday', badge: null, swatches: ['#a8306a', '#5b6b8c', '#c7a56a'],
    img: '/sj-shawl-copy-2-1.webp', alt: 'Red handwoven stole with fringing' },
]

/* The catalogue is the live store: real products, real prices, real photography,
   each carrying the collection it belongs to. The older placeholder rows are
   kept for the home-page sections that still reference them, but they are not
   part of the shop grid — they have no collection and would have shown up
   under every filter. */
export const PIECES = [...KANCHLI, ...LIVE_PIECES, ...APPAREL]

export const ALL_PIECES = [...PIECES, ...PLACEHOLDER]

/* url-safe key for a collection, so the header can deep-link to one */
export const collectionKey = (name) =>
  name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const COLLECTIONS_LIVE = [...new Set(PIECES.map((p) => p.collection).filter(Boolean))]

/* Short line per collection for the home-page category band. */
const BLURB = {
  'Kanchli': 'The Kutchi bodice, cut and stitched the traditional way',
  'Kurtas & Tops': 'Everyday silhouettes in naturally dyed handloom cloth',
  'Dresses': 'Long, easy cuts in mulmul and handwoven cotton',
  'Pants & Palazzos': 'Wide, soft legs in cotton and khadi',
  'Accessories': 'Dupattas, stoles and shawls finished with hand borders',
  'Hand Bags': 'Structured bags, embroidered panel by panel',
  'Crossbody & Sling': 'Small bags for a long day, worn across the body',
  'Pouches': 'Pouches and purses in offcuts too good to waste',
  'Potlis & Batwas': 'Drawstring potlis in silk, for the festive months',
  'Tote Bags': 'Roomy totes in handwoven cotton',
  'Home Decor': 'The same embroidery, made for the house',
}

/* Derived from the catalogue rather than hand-listed, so a category can never
   name a collection that has no products, and its image is guaranteed to be
   one we actually have. (A hardcoded list previously pointed at files that had
   been cleaned up, and the band rendered empty.) */
export const COLLECTIONS = COLLECTIONS_LIVE.map((name) => {
  const items = PIECES.filter((p) => p.collection === name)
  return {
    key: collectionKey(name),
    name,
    copy: BLURB[name] ?? 'Hand-embroidered in the villages of Kutch',
    count: `${items.length} ${items.length === 1 ? 'piece' : 'pieces'}`,
    img: items[0].img,
    alt: items[0].alt,
  }
})

/* What you wear, in the order the house presents it — the four cut-and-sewn
   collections plus Accessories, which is dupattas, stoles, shawls and
   mufflers: worn, not carried. */
export const CLOTHING_ORDER = [
  'Kanchli',
  'Kurtas & Tops',
  'Dresses',
  'Pants & Palazzos',
  'Accessories',
]

/* The clothing band runs as tall vertical panels, so it wants full-length
   studio shots rather than the square product crops the catalogue supplies.
   These are the original five from the shoot — one lighting setup, one
   backdrop, so the band reads as a single frieze instead of five stray
   photographs. Product photography breaks that; the reel stills broke it too.
   Matched to what each frame actually shows, not to the file order. */
const CLOTHING_THUMB = {
  'Kanchli': ['/cat-c3.webp', 'Model in a maroon embroidered lehenga with a fitted bodice'],
  'Kurtas & Tops': ['/cat-c4.webp', 'Model in a maroon embroidered kurta with palazzo and dupatta'],
  'Dresses': ['/cat-c1.webp', 'Model in a maroon silk drape with gold zari borders'],
  'Pants & Palazzos': ['/cat-c2.webp', 'Model in a handwoven maroon drape with a gold border'],
  'Accessories': ['/cat-c5.webp', 'Model in an ivory kurta holding out a maroon embroidered dupatta'],
}

export const CLOTHING = CLOTHING_ORDER
  .map((name) => COLLECTIONS.find((c) => c.name === name))
  .filter(Boolean)
  .map((c) => {
    const t = CLOTHING_THUMB[c.name]
    return t ? { ...c, img: t[0], alt: t[1] } : c
  })

/* The "mastered" grid, listed out rather than filtered, because the bento it
   feeds assigns every cell by hand — the count and the order are part of the
   layout, so both live somewhere you can read them.

   Seven, over two rows — the same count and the same rhythm as the hero grid
   the bento echoes. The cut-and-sewn garment collections are left to the
   wardrobe band above; Kanchli stays because it opens the grid as the tall
   feature. Home Decor is reached from the shop rail rather than from here. */
export const MAKES_ORDER = [
  'Kanchli',
  'Accessories',
  'Crossbody & Sling',
  'Hand Bags',
  'Tote Bags',
  'Potlis & Batwas',
  'Pouches',
]

export const MAKES = MAKES_ORDER
  .map((name) => COLLECTIONS.find((c) => c.name === name))
  .filter(Boolean)

/* The bag sub-collections, for the strip under the house grid. */
const BAG_NAMES = ['Potlis & Batwas', 'Tote Bags', 'Crossbody & Sling', 'Hand Bags', 'Pouches']

export const BAGS = BAG_NAMES
  .map((name) => COLLECTIONS.find((c) => c.name === name))
  .filter(Boolean)
