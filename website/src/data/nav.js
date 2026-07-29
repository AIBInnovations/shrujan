/* Primary navigation, mirroring the top-level menu on shrujan.com.

   `label` is what the bar shows and `full` is the real menu name. They differ
   because the brand block is absolutely centred and sits ON TOP of this row at
   z-index 5 — so the nav has roughly 500px before its links disappear under an
   opaque panel and stop being clickable. The site's own long labels
   ("The Shrujan Story", "Visit & Experience") blow straight past that.

   Each dropdown is one `panel`, read left to right:

     lead      a picture card with the section's own pitch reversed out of it
     main      the two or three real destinations, each with a thumbnail
     more      everything else, as a plain list of arrow links
     featured  one thing worth reading, given its own card

   Titles carry *asterisks* around the words that set in italic — see Em() in
   Header.jsx. Marking it here rather than as JSX keeps this file plain data.

   Every `to` resolves: the routes exist and each #anchor is on the page it
   names. Craft and LLDC are single pages, so they stay plain links. */

export const NAV = [
  {
    label: 'Story',
    full: 'The Shrujan Story',
    to: '/pages/the-shrujan-story',
    panel: {
      lead: {
        eyebrow: 'Story',
        title: 'Fifty years, *stitched by hand*',
        copy: 'From thirty saris in a drought year to four thousand women at the frame. Told in five chapters.',
        cta: 'Read the story',
        to: '/pages/the-shrujan-story',
        img: '/story-chanda.webp',
        alt: 'Chanda Shroff, who founded Shrujan in 1969',
        /* the only portrait source among the lead images: in a 4:3 card
           `cover` shows half its height, and centred that cut off the top of
           her head. Optional — the others are all wider than the card, so
           their vertical position makes no difference. */
        pos: 'center 15%',
      },
      main: {
        group: 'The five chapters',
        items: [
          {
            label: 'Origins',
            sub: 'Where it began',
            to: '/pages/the-shrujan-story#origins',
            img: '/story-origin-1.webp',
            alt: 'Archival photograph of the first embroiderers',
          },
          {
            label: 'Philosophy & Values',
            sub: 'What we hold to',
            to: '/pages/the-shrujan-story#values',
            img: '/story-dignity.webp',
            alt: 'An embroiderer at work in her own home',
          },
          {
            label: 'The People of Shrujan',
            sub: 'Hands, and names',
            to: '/pages/the-shrujan-story#people',
            img: '/story-ami.webp',
            alt: 'A Shrujan artisan photographed at the studio',
          },
        ],
      },
      more: {
        group: 'Explore further',
        items: [
          { label: 'Photo Journal', to: '/pages/the-shrujan-story#journal' },
          { label: 'In the Media', to: '/pages/the-shrujan-story#press' },
          { label: 'Craft Traditions', to: '/pages/video' },
          { label: 'The Design Centre', to: '/pages/lldc' },
          { label: 'Visit the Campus', to: '/pages/visit-experience' },
        ],
      },
      featured: {
        group: 'Featured',
        img: '/story-continuity.webp',
        alt: 'A younger embroiderer learning at the frame',
        title: '*Continuity*',
        sub: 'The next generation at the frame',
        cta: 'Read the story',
        to: '/pages/the-shrujan-story#people',
      },
    },
  },

  {
    label: 'Shop',
    full: 'Shop Shrujan',
    to: '/pages/shop-shrujan',
    panel: {
      lead: {
        eyebrow: 'Shop',
        title: 'Worn slowly, *kept for years*',
        copy: 'Hand-embroidered cloth from the villages of Kutch, cut and finished in the Bhuj atelier.',
        cta: 'Shop everything',
        to: '/pages/shop-shrujan',
        img: '/shop-hero.webp',
        alt: 'Embroidered bags, a handwoven cushion and models in Shrujan cloth',
      },
      main: {
        group: 'What to wear',
        items: [
          {
            label: 'Kanchli',
            sub: 'The Kutchi bodice',
            to: '/pages/shop-shrujan?c=kanchli',
            img: '/sj-black-pakko-hand-embroidered-kanchli-1.webp',
            alt: 'Model in a black Pakko-embroidered kanchli',
          },
          {
            label: 'Kurtas & Tops',
            sub: 'Everyday handloom',
            to: '/pages/shop-shrujan?c=kurtas-and-tops',
            img: '/sj-green-hand-woven-top-1.webp',
            alt: 'Model in a green handwoven shirt',
          },
          {
            label: 'Dresses',
            sub: 'Long, easy cuts',
            to: '/pages/shop-shrujan?c=dresses',
            img: '/sj-hand-block-printed-dress-1.webp',
            alt: 'Model in a block-printed sleeveless dress',
          },
        ],
      },
      more: {
        group: 'Bags & home',
        items: [
          { label: 'Hand Bags', to: '/pages/shop-shrujan?c=hand-bags' },
          { label: 'Crossbody & Sling', to: '/pages/shop-shrujan?c=crossbody-and-sling' },
          { label: 'Potlis & Batwas', to: '/pages/shop-shrujan?c=potlis-and-batwas' },
          { label: 'Tote Bags', to: '/pages/shop-shrujan?c=tote-bags' },
          { label: 'Home Decor', to: '/pages/shop-shrujan?c=home-decor' },
          { label: 'Accessories', to: '/pages/shop-shrujan?c=accessories' },
        ],
      },
      featured: {
        group: 'Featured',
        img: '/craft-hero.webp',
        alt: 'Embroiderers of Kutch working together outside their village',
        title: '*Shop by craft*',
        sub: 'The hands behind every piece',
        cta: 'Watch the films',
        to: '/pages/video',
      },
    },
  },

  {
    label: 'Studio',
    full: 'Studio Collection',
    to: '/pages/studio-collection',
    panel: {
      lead: {
        eyebrow: 'Studio',
        title: 'Where *tradition* meets *tomorrow*',
        copy: 'Three strands. Endless conversations. A few co-creations. Always rooted in craft.',
        cta: 'Explore studio',
        to: '/pages/studio-collection',
        img: '/story-origin-3.webp',
        alt: 'Craftswomen of Kutch working together on embroidery',
      },
      main: {
        group: 'All three strands',
        items: [
          {
            label: 'Heritage',
            sub: 'Living traditions',
            to: '/pages/studio-collection/heritage',
            img: '/frame-r2t24.webp',
            alt: 'Densely hand-embroidered heritage textile in crimson and gold',
          },
          {
            label: 'Avinya',
            sub: 'Contemporary expressions',
            to: '/pages/studio-collection/avinya',
            img: '/story-origin-3.webp',
            alt: 'Craftswomen co-creating original work',
          },
          {
            label: 'Gifting & Collaborations',
            sub: 'Craft in dialogue',
            to: '/pages/studio-collection/gifting',
            img: '/sj-jat-garasiya-party-bag-1.webp',
            alt: 'Hand-embroidered Jat Garasiya party bag',
          },
        ],
      },
      more: {
        group: 'Explore further',
        items: [
          { label: 'Artisan Stories', to: '/pages/the-shrujan-story#people' },
          { label: 'Process & Techniques', to: '/pages/video' },
          { label: 'Materials & Motifs', to: '/pages/video#ajrakh' },
          { label: 'Studio Journal', to: '/pages/the-shrujan-story#journal' },
          { label: 'Behind the Scenes', to: '/pages/lldc' },
        ],
      },
      featured: {
        group: 'Featured',
        img: '/lldc-studio.webp',
        alt: 'The design studio at the Living & Learning Design Centre',
        title: '*In Conversation*',
        sub: 'Craft, people and places',
        cta: 'Read our journal',
        to: '/pages/the-shrujan-story#journal',
      },
    },
  },

  { label: 'Craft', full: 'Craft Traditions of Kutch', to: '/pages/video' },
  { label: 'LLDC', full: 'Living & Learning Design Centre', to: '/pages/lldc' },

  {
    label: 'Visit',
    full: 'Visit & Experience',
    to: '/pages/visit-experience',
    panel: {
      lead: {
        eyebrow: 'Visit',
        title: 'Come to *Kutch*',
        copy: 'The campus, the museum and the villages where the cloth is made. November to February is the season.',
        cta: 'Plan your visit',
        to: '/pages/visit-experience',
        img: '/visit-campus.webp',
        alt: 'The Shrujan campus on Bhujodi Road',
      },
      main: {
        group: 'Where to go',
        items: [
          {
            label: 'Shrujan Campus',
            sub: 'Bhujodi Road, Bhuj',
            to: '/pages/visit-experience#places',
            img: '/visit-campus.webp',
            alt: 'The Shrujan campus buildings',
          },
          {
            label: 'LLDC Museum',
            sub: 'Four galleries, Ajrakhpur',
            to: '/pages/lldc',
            img: '/visit-lldc.webp',
            alt: 'A gallery inside the Living & Learning Design Centre',
          },
          {
            label: 'The Craft Villages',
            sub: 'Looms and print tables',
            to: '/pages/video',
            img: '/visit-ajrakhpur.webp',
            alt: 'Block printers at work in Ajrakhpur',
          },
        ],
      },
      more: {
        group: 'Plan your trip',
        items: [
          { label: 'Where to go', to: '/pages/visit-experience#places' },
          { label: 'How long to stay', to: '/pages/visit-experience#plan' },
          { label: 'The Design Centre', to: '/pages/lldc' },
          { label: 'Craft Traditions', to: '/pages/video' },
          { label: 'Frequently Asked', to: '/#support' },
        ],
      },
      featured: {
        group: 'Featured',
        img: '/visit-banni.webp',
        alt: 'The Banni grasslands of northern Kutch',
        title: '*The Banni villages*',
        sub: 'Where Suf, Mutava and Jat come from',
        cta: 'Watch the films',
        to: '/pages/video#embroidery',
      },
    },
  },
]
