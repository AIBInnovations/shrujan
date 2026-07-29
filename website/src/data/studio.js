/* Studio Collection — the three strands the house publishes as separate pages:
   Heritage, Avinya and Gifting & Collaborations.

   Headline copy follows shrujan.com (about-shrujan-2?view=heritage, /avinya and
   size-chart?view=gifting, which is where the brand hangs the gifting page).
   The supporting detail — the marks, the steps, the facts — is ours, written to
   give each page something to read between the masthead and the callback form,
   since the source pages are a hero and a form and little else. */

export const STRANDS = [
  {
    key: 'heritage',
    no: '01',
    label: 'Heritage',
    to: '/pages/studio-collection/heritage',
    copy: 'Heirloom textiles made to be collected, preserved and passed on.',
    img: '/frame-r2t24.webp',
    alt: 'Densely hand-embroidered heritage textile in crimson and gold',
  },
  {
    key: 'avinya',
    no: '02',
    label: 'Avinya',
    to: '/pages/studio-collection/avinya',
    copy: 'Artisans in teams of two and three, co-creating original work.',
    img: '/story-origin-3.webp',
    alt: 'Craftswomen of Kutch working together on embroidery',
  },
  {
    key: 'gifting',
    no: '03',
    label: 'Gifting & Collaborations',
    to: '/pages/studio-collection/gifting',
    copy: 'Handcrafted gifts and custom commissions, for organisations and occasions.',
    img: '/sj-jat-garasiya-party-bag-1.webp',
    alt: 'Hand-embroidered Jat Garasiya party bag',
  },
]

/* 9:00 AM to 5:30 PM in half hours — the slot list the brand's callback form
   offers. Generated rather than typed out so the range stays edit-in-one-place. */
export const TIME_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const mins = 9 * 60 + i * 30
  const h24 = Math.floor(mins / 60)
  const h12 = h24 > 12 ? h24 - 12 : h24
  return `${h12}:${String(mins % 60).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`
})

export const HERITAGE = {
  eyebrow: 'Studio Collection · Heritage',
  /* head/em/tail rather than markup: this is a .js module, and only .jsx goes
     through the React transform */
  title: { head: 'Heirlooms, made to be ', em: 'handed on', tail: '' },
  lede: "Heirloom textiles that carry the depth and detail of Kutch's craft traditions. Each piece is made with exceptional skill, and intended to be collected, preserved and passed on.",
  /* an heirloom in its setting — fine gold work on maroon silk against an old
     carved chest — rather than the 720×1280 video still that was here, which a
     full-bleed masthead had to upscale nearly two-fold */
  hero: '/cta-band.webp',
  heroAlt: 'A maroon silk sari with fine gold embroidery, beside an antique carved chest',
  meta: [
    { value: '12', label: 'Living traditions' },
    { value: '6–14', label: 'Months on the frame' },
    { value: '1', label: 'Of its kind' },
  ],

  lead: 'A heritage piece is not a season’s product. It is the fullest expression of a craft a community has kept for generations, made at the pace that craft asks for.',
  body: [
    'The embroideries of Kutch are not one tradition but a dozen — Ahir, Mutwa, Jat, Rabari, Suf, Pakko, Kharek — each with its own grammar of stitch, motif and colour, passed from mother to daughter rather than written down. A heritage commission asks an artisan to work at the top of that vocabulary, without abridging it for time.',
    'That is why these pieces take months rather than weeks. Suf is counted from the reverse of the cloth with no pattern ever drawn. Pakko is worked so tightly the ground disappears. Mirror-work is cut, set and secured one disc at a time. None of it can be hurried without becoming something else.',
  ],

  marks: [
    {
      no: '01',
      title: 'One pair of hands',
      copy: 'A heritage piece is never split across a workshop. One embroiderer carries it from the first counted thread to the last, and her name goes on it.',
    },
    {
      no: '02',
      title: 'The community canon',
      copy: 'Every motif belongs to a community, and is stitched in the vocabulary that community has kept — not a house style drawn over the top of it.',
    },
    {
      no: '03',
      title: 'Natural cloth, natural dye',
      copy: 'Handloom cotton, mulberry silk and desert wool, coloured with madder, indigo and pomegranate rind. Nothing synthetic touches the ground cloth.',
    },
    {
      no: '04',
      title: 'Recorded before it leaves',
      copy: 'Each piece is photographed, measured and documented at the LLDC in Bhuj, so the record of how it was made outlives the cloth itself.',
    },
  ],

  /* .origin__gallery is a three-column grid — keep the count a multiple of
     three or the last row leaves dead cells */
  gallery: [
    { src: '/frame-r3t26.webp', alt: 'Heritage embroidery worked in fine counted thread' },
    { src: '/frame-r1t20.webp', alt: 'Mirror-work set into a hand-embroidered panel' },
    { src: '/frame-r5t25.webp', alt: 'Detail of a heritage textile in indigo and madder' },
    { src: '/frame-r2t5.webp', alt: 'Border of a hand-embroidered heritage cloth' },
    { src: '/frame-r1t12.webp', alt: 'Hand-embroidered panel in madder and indigo' },
    { src: '/frame-r3t6.webp', alt: 'Kutchi mirror-work across a silk ground' },
  ],

  pull: 'These are made once, at the pace the craft asks for. When a piece is gone, it is not made again.',

  form: {
    eyebrow: 'Enquire',
    title: 'Interested to explore the Heritage Collection?',
    copy: 'Tell us what you are looking for and when you are free. Someone from the Bhuj studio will call you back.',
    cta: 'Request a callback',
  },
}

export const AVINYA = {
  eyebrow: 'Studio Collection · Avinya',
  title: { head: 'Avinya — change, and ', em: 'new beginnings', tail: '' },
  lede: 'A collaboration between Shrujan and the LLDC that brings the artisans of Kutch together to make original work, rooted in their own perspective and their own hand.',
  ghost: 'Avinya',
  meta: [
    { value: '2–3', label: 'Artisans per team' },
    { value: '12', label: 'Craft traditions' },
    { value: '1969', label: 'Building since' },
  ],

  gloss: {
    word: 'Avinya',
    language: 'Sanskrit',
    meaning: 'innovation and beauty',
    note: 'It signifies change, and new beginnings.',
  },

  lead: 'Avinya puts artisans into teams of two and three and asks them to make something together — not to execute a design handed down to them.',
  body: [
    'For most of the women in these teams it is the first time they have worked this way: jointly, across craft traditions, with no brief to follow and no pattern to copy. The work that comes out of it is argued into being between them.',
    'That is the point. Shrujan has worked since 1969 towards an empowered, self-reliant craft community, and a self-reliant maker is one whose own judgement is in the piece. Avinya is where heritage, contemporary design and the artisan’s own voice are allowed to meet without one being subordinated to the others.',
  ],

  steps: [
    {
      no: '01',
      title: 'Pairing',
      copy: 'Artisans are placed in teams of two or three, often alongside someone from a craft other than their own — an embroiderer with a weaver, a dyer with a printer.',
    },
    {
      no: '02',
      title: 'Co-creation',
      copy: 'The team develops the work together. Nothing is handed down to be executed; the idea is reached between them, and changes as they make it.',
    },
    {
      no: '03',
      title: 'Experiment',
      copy: 'Material, scale and technique are tested against each other. Some of the combinations that come out of it have not been attempted in Kutch before.',
    },
    {
      no: '04',
      title: 'Attribution',
      copy: 'The finished work carries the name of everyone who made it. The artisan’s voice stays attached to the piece after it leaves the studio.',
    },
  ],

  works: [
    { src: '/journal-4.webp', alt: 'Artisans of Kutch at work on a collaborative piece' },
    { src: '/journal-9.webp', alt: 'Hands working thread across a shared frame' },
    { src: '/journal-2.webp', alt: 'Craftswomen comparing embroidery samples' },
  ],

  pull: 'For most of the women in these teams, it is the first time they have made something that was not asked for.',

  form: {
    eyebrow: 'Enquire',
    title: 'Commission an Avinya work',
    copy: 'Avinya pieces are made in small numbers and released as the teams finish them. Leave your details and we will call when the next works come off the frame.',
    cta: 'Request a callback',
  },
}

export const GIFTING = {
  eyebrow: 'Studio Collection · Gifting & Collaborations',
  title: { head: 'Gifts that carry a craft, and ', em: 'a name', tail: '' },
  lede: 'We work with organisations and individuals to create refined handcrafted gifts that reflect care, craft and cultural meaning.',
  /* a spread of giftable pieces — tote, potli, cushion, dupattas — and wide
     enough (2200px) for the masthead's 21:9 band */
  hero: '/shop-hero.webp',
  heroAlt: 'An embroidered tote, potli and cushion beside models in Kutchi dupattas',
  meta: [
    { value: '25+', label: 'Minimum order' },
    { value: '4–12', label: 'Weeks to deliver' },
    { value: '40', label: 'Villages at work' },
  ],

  offers: [
    {
      no: '01',
      title: 'Corporate & Institutional Gifting',
      copy: 'Meaningful, high-quality gifts rooted in craft, for organisations marking a milestone, a partnership or an occasion. Chosen for craftsmanship and cultural integrity, so the gift carries depth as well as value.',
      facts: ['From 25 pieces', '4–8 weeks', 'Presentation packaging'],
      img: '/sj-jat-garasiya-mobile-pouch-31-1.webp',
      alt: 'Hand-embroidered mobile pouches in Jat Garasiya work',
    },
    {
      no: '02',
      title: 'Wedding & Occasion Gifting',
      copy: 'Handcrafted pieces chosen for celebrations — for how they look, and for the artisan skill and the story they carry with them.',
      facts: ['From 50 pieces', '6–10 weeks', 'Custom colourways'],
      img: '/sj-jat-garasiya-party-bag-copy-1-1.webp',
      alt: 'Hand-embroidered party bags arranged together',
    },
    {
      no: '03',
      title: 'Custom Collaborations',
      copy: 'Some projects call for something more specific. We take on custom commissions involving particular colours, materials or craft techniques, developed through dialogue and aligned with Shrujan’s craft values.',
      facts: ['By commission', '12+ weeks', 'Developed with the artisans'],
      img: '/sj-handloom-weaving-cushion-cover-5-1.webp',
      alt: 'Handloom cushion covers in natural dyed cotton',
    },
  ],

  steps: [
    { no: '01', title: 'The brief', copy: 'Numbers, budget, occasion and how long you have. We will tell you honestly what is possible in the time.' },
    { no: '02', title: 'Selection', copy: 'We put a shortlist together from the crafts that suit the brief, with samples where the order justifies them.' },
    { no: '03', title: 'The making', copy: 'The order goes to the villages best suited to it. Artisans are paid per piece, on time, for every unit made.' },
    { no: '04', title: 'Delivery', copy: 'Packed, documented and shipped — with a card naming the craft and the community behind the piece.' },
  ],

  pull: 'A gift that names the woman who made it says something a logo cannot.',

  form: {
    eyebrow: 'Enquire',
    title: 'Start a gifting conversation',
    copy: 'Tell us the occasion, the numbers and the date you need them by. We will come back with what the crafts can do in that time.',
    cta: 'Request a callback',
  },
}
