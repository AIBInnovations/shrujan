/* The Shrujan Story, taken from the brand's own pages on shrujan.com.
   Copy is theirs; only the layout is ours. */

export const ORIGIN = {
  eyebrow: 'Origins',
  title: 'A livelihood, stitched from what they already knew',
  lead:
    'Shrujan is the first social enterprise in the crafts sector to empower embroidery craftswomen of Kutch to use their skill and artistry to earn a dignified livelihood. Today, more than two thousand craftswomen in sixty-six remote villages are part of the Shrujan family.',
  body: [
    'Shrujan’s journey began in 1969 when Kutch was ravaged by drought. Mumbai-based Chanda Shroff volunteered for drought-relief work in the village of Dhaneti. She observed that the women dressed in exquisitely embroidered traditional clothing were reluctant to accept charity.',
    'It was her genius that recognized that the very skill that the craftswomen possessed could empower them; that, for the first time, embroidery could become an income-generating, dignity-providing resource.',
    'Shrujan’s craftswomen work from home. Our production team reaches fabrics and threads to them in their villages. The women do not have to pay for the materials. Shrujan pays them their fair dues at their doorstep, as soon as they have completed the embroidery.',
  ],
  pull:
    'Sustainable practices, slow fashion, ethical fair trade, minimal wastage. Shrujan takes a tiny bit of pride for having consciously practised these values from the first day.',
  stats: [
    { value: '1969', label: 'The year it began' },
    { value: '2,000+', label: 'Craftswomen today' },
    { value: '66', label: 'Remote villages' },
    { value: '50+', label: 'Years of livelihood' },
  ],
  images: [
    { src: '/story-origin-2.webp', alt: 'Craftswomen of Kutch at work on embroidery' },
    { src: '/story-origin-1.webp', alt: 'Embroidery in progress on handloom cloth' },
    { src: '/story-origin-3.webp', alt: 'Shrujan craftswomen gathered in a village' },
  ],
}

export const VALUES = [
  {
    key: 'dignity',
    title: 'Dignity and Respect',
    copy:
      'At Shrujan, dignity is central to how we work. The artisans we collaborate with and the team that supports the work are valued for their skill, commitment and integrity. We believe in fairness, mutual respect and the importance of creating an environment where people can grow through learning and experience. Our work is built on long-term relationships and a shared love for craft.',
    img: '/story-dignity.webp',
    alt: 'Artisans working together at Shrujan',
  },
  {
    key: 'continuity',
    title: 'Continuity of Craft',
    copy:
      'Shrujan works to ensure that the craft traditions of Kutch remain alive, relevant and respected. This is not preservation as nostalgia, but continuity as a living process. Knowledge passes through generations, adapts thoughtfully and finds a place in contemporary life without losing its roots.',
    img: '/story-continuity.webp',
    alt: 'Hands passing embroidery knowledge between generations',
  },
  {
    key: 'conscious',
    title: 'Conscious Practice',
    copy:
      'At Shrujan, consciousness is expressed through everyday decisions. From the materials we use to the systems we build, care and responsibility guide our choices. We work with natural fibres, minimise waste and pay attention to detail in how we design, produce and present our work. Thoughtfulness, not speed, shapes how we work.',
    img: '/story-conscious.webp',
    alt: 'Naturally dyed yarn and handwoven cloth',
  },
]

/* Photo Journal. Shrujan publishes these twelve frames with no captions of
   their own, so the descriptions here are written from the photographs — what
   is actually in frame, nothing asserted about who or when.

   Order and span are ours. The archive holds exactly four portrait frames and
   eight landscape, which is what lets the bento close as a flush 4 x 7 block:
   every column carries two landscape cells and one portrait. The portraits sit
   at positions 3, 6, 11 and 12 because the grid placement in pages.css gives
   those four the tall slots — reordering this list without changing that CSS
   will stretch a landscape photo into a portrait cell. */
export const JOURNAL = [
  { src: '/journal-1.webp',  span: 'wide', alt: 'An early village visit, cloth and bundles laid out under the trees' },
  { src: '/journal-4.webp',  span: 'wide', alt: 'Finished embroidery reviewed together in the Shrujan workroom' },
  { src: '/journal-3.webp',  span: 'tall', alt: 'A craftswoman bent over her embroidery frame' },
  { src: '/journal-5.webp',  span: 'wide', alt: 'A gathering of craftswomen at the Shrujan campus' },
  { src: '/journal-7.webp',  span: 'wide', alt: 'Craftswomen seated in the exhibition hall, textiles hung on the walls' },
  { src: '/journal-6.webp',  span: 'tall', alt: 'A senior craftswoman photographed with her work' },
  { src: '/journal-8.webp',  span: 'wide', alt: 'Embroidered odhanis beside a mirrored mud-work wall' },
  { src: '/journal-9.webp',  span: 'wide', alt: 'Two craftswomen embroidering a length of yellow cloth' },
  { src: '/journal-2.webp',  span: 'wide', alt: 'Craftswomen embroidering together in the courtyard of a village home' },
  { src: '/journal-10.webp', span: 'wide', alt: 'A craftswoman beside a finished embroidered panel' },
  { src: '/journal-11.webp', span: 'tall', alt: 'A craftswoman in traditional jewellery with a completed textile' },
  { src: '/journal-12.webp', span: 'tall', alt: 'Traditional dress against the carved wall of a Kutch home' },
]

/* In the Media. Shrujan's press page carries scans and nothing else — no
   titles, dates or credits in the markup — so every field below was read off
   the tearsheets themselves: mastheads, folios and bylines. Nothing here is
   paraphrased from the filenames, which are wrong in at least one place (the
   Apparel feature is filed under its author's name, not the magazine's). */
export const PRESS = [
  {
    key: 'abhiyaan',
    publication: 'Abhiyaan',
    section: 'પાંજોકચ્છ · Panjo Kutch',
    headline: '‘મશીનો’નું કચ્છી ભરતકામ પર આક્રમણ',
    // the Gujarati is the headline as printed; this is a plain-sense reading
    translation: '‘Machines’ encroach on Kutchi embroidery',
    byline: 'સુચિતા બોધાણી કનર · Suchita Bodhani Kanar',
    date: '17 February 2018',
    issue: 'Issue No. 1662',
    note: 'A two-page report in the Gujarati weekly on machine embroidery spreading through Kutch, and what it means for the hand-embroidery traditions the craftswomen still work in.',
    pages: ['/press-abhiyaan-1.webp', '/press-abhiyaan-2.webp'],
  },
  {
    key: 'indian-express',
    publication: 'The Indian Express',
    section: 'Lifestyle · Fashion',
    headline: 'Wonder weaves: How these Kutchi women wove themselves a successful life and career',
    translation: null,
    byline: null,
    date: '4 July 2018',
    issue: null,
    note: 'On the embroidery traditions of Kutch and the craftswomen who turned them into a livelihood and a career.',
    pages: ['/press-ie-1.webp', '/press-ie-2.webp'],
  },
  {
    key: 'apparel',
    publication: 'Apparel',
    section: 'Brand Profile',
    headline: 'Inspiring Creativity',
    translation: null,
    byline: 'Brinda Gill',
    date: 'September 2018',
    issue: 'Pages 62–65',
    note: 'A four-page profile of Shrujan as a pioneering not-for-profit nurturing traditional Kutchi hand embroidery for the urban market, five decades on from its founding.',
    pages: [
      '/press-brinda-1.webp',
      '/press-brinda-2.webp',
      '/press-brinda-3.webp',
      '/press-brinda-4.webp',
    ],
  },
]

/* The five chapters, in the order the page presents them. Used for the sticky
   chapter rail and mirrored by the Story dropdown in the header. */
export const CHAPTERS = [
  { id: 'origins', label: 'Origins' },
  { id: 'values',  label: 'Philosophy & Values' },
  { id: 'people',  label: 'The People of Shrujan' },
  { id: 'journal', label: 'Photo Journal' },
  { id: 'press',   label: 'In the Media' },
]

export const PEOPLE = [
  {
    name: 'Chanda Shroff',
    role: 'Founder',
    copy: 'She is the first Indian Laureate to be honoured with the prestigious Rolex Award for Enterprise.',
    img: '/story-chanda.webp',
  },
  {
    name: 'Dipesh Shroff',
    role: 'Chairman',
    copy: 'As Chairman, Dipesh provides steady guidance and oversight to the organisation. He supports Shrujan’s long-term direction while upholding the principles on which it was founded.',
    img: '/story-dipesh.webp',
  },
  {
    name: 'Ami Shroff',
    role: 'Trustee',
    copy: 'Ami Shroff carries forward Shrujan’s vision with a deep sense of responsibility toward both craft and community.',
    img: '/story-ami.webp',
  },
  {
    name: 'Rajiv Bhatt',
    role: 'Chief Executive Officer',
    copy: 'Rajiv serves as Chief Executive Officer of Shrujan, where he guides the organisation’s strategy and day-to-day functioning.',
    img: '/story-rajiv.webp',
  },
]
