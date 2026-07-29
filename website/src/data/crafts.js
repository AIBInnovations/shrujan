/* Craft Traditions of Kutch — the six films and their text, taken from the
   live page at shrujan.com/pages/video. Copy is the site's own, lightly
   corrected for obvious typos ("maddar" → madder, "earthernware" →
   earthenware, "to bring practised" → to being practised); nothing has been
   rewritten or invented.

   `facts` are pulled straight out of each craft's own paragraphs — they exist
   so the short entries (weaving is a single paragraph) still carry enough
   weight to hold a full screen beside the sticky player.

   Order matches the live page. Video and poster files live in /public and are
   the site's own assets, re-encoded to 720p for the web. */

export const CRAFTS = [
  {
    no: '01',
    slug: 'embroidery',
    name: 'Embroidery',
    short: 'Embroidery',
    tag: 'Needle & thread',
    src: '/craft-embroidery.mp4',
    poster: '/craft-embroidery-poster.webp',
    facts: [
      ['Practice', 'Hand embroidery'],
      ['Made in', 'Villages across Kutch'],
      ['Turning point', 'The late 1960s'],
    ],
    body: [
      'Kutch has about forty-six thousand square kilometres of land. The astonishing diversity of crafts found in this relatively small region is perhaps unmatched anywhere in the world. Kutch has a vibrant crafts tradition that has been enriched over the centuries by the communities that have migrated to this region.',
      "Hand embroidery is among the most famous crafts of Kutch. What makes this craft special is its sheer abundance and variety — which is why we speak of the 'embroideries' of Kutch, in the plural. Traditionally embroidery was a personal craft. Women used to decorate day-to-day as well as ceremonial clothing, household items and adornments for animals. Each community had its own distinct embroidery style that was passed on from mother to daughter.",
      'It was in the late 1960s that a fundamental shift took place in the role of embroidery. In addition to being practised as a personal craft, it also became, for the first time, a means of livelihood for women. Shrujan has been instrumental in this transformation. It has created a market for embroidered products and has provided the embroiderers with a platform to showcase their work and earn a sustainable income.',
    ],
  },
  {
    no: '02',
    slug: 'ajrakh',
    short: 'Ajrakh',
    name: 'Ajrakh block print',
    tag: 'Resist printing',
    src: '/craft-ajrakh.mp4',
    poster: '/craft-ajrakh-poster.webp',
    facts: [
      ['Technique', 'Resist block print'],
      ['Dyes', 'Natural indigo & madder'],
      ['Reach', 'Haute couture collections'],
    ],
    body: [
      'It is a resist block printing technique which uses natural dyes such as indigo and madder.',
      'Kutch is home to some of the most renowned masters of Ajrakh. These living treasures have taken this ancient craft to the world stage. Several international designers have earned fame and prestige by the use of this craft in their haute couture collections.',
      "Shrujan supports Ajrakh in various ways: it collaborates with this craft sector to expand the Ajrakh design language; promotes its craftspeople not only as skilled technicians but also as creative artists; and provides resources and opportunities to gifted young designers so that they can explore their love of Ajrakh to their hearts' content.",
    ],
  },
  {
    no: '03',
    slug: 'discharge',
    short: 'Discharge',
    name: 'Steam discharge block print',
    tag: 'Bleach & colour',
    src: '/craft-discharge.mp4',
    poster: '/craft-discharge-poster.webp',
    facts: [
      ['Technique', 'Hand block print'],
      ['Paste', 'Safolite, soda ash, maize gum'],
      ['Finish', 'Rolled, then steamed'],
    ],
    body: [
      'Discharge printing is another hand block printing technique. Carved wooden blocks are dipped in a paste and stamped on pre-coloured fabric.',
      'The paste is made from safolite, soda ash and maize gum; liquid vat dye is also added to it. The paste thus becomes a bleaching agent as well as a colourant.',
      'As the paste dries on the fabric, the design is barely visible and this is just one of the reasons that make discharge printing a challenging process.',
      'After the paste has completely dried, the fabric is carefully rolled up and steamed. The heat and moisture from the steam takes away or discharges the fabric colour and, at the same time, adds another colour onto the stamped design.',
      'Many unpredictable factors such as atmospheric humidity impact this printing technique. The printer himself does not know what the design will actually look like, till the roll of fabric is finally opened up. This uncertainty, this element of surprise, is what makes discharge printing so exciting and challenging.',
    ],
  },
  {
    no: '04',
    slug: 'weaving',
    short: 'Weaving',
    name: 'Kutch weaving',
    tag: 'On the handloom',
    src: '/craft-weaving.mp4',
    poster: '/craft-weaving-poster.webp',
    facts: [
      ['Structure', 'Basket weave, extra weft'],
      ['Worked on', 'The handloom'],
      ["Shrujan's part", 'New fibres and textures'],
    ],
    body: [
      'This craft creates the basic basket weave with an extra weft added for making designs. Shrujan’s contribution has been to introduce a variety of fibres, textures, colours and designs to help create new and contemporary expressions of traditional Kutch hand weaving.',
    ],
  },
  {
    no: '05',
    slug: 'pottery',
    short: 'Pottery',
    name: 'Pottery',
    tag: 'Local clay',
    src: '/craft-pottery.mp4',
    poster: '/craft-pottery-poster.webp',
    facts: [
      ['Material', 'Unglazed terracotta'],
      ['Formed on', 'The potter’s wheel'],
      ['Signature', 'The gowmukh water jug'],
    ],
    body: [
      'Kutch was once famous for its terracotta pottery. Master potters shaped local clay on the potter’s wheel to create unglazed earthenware vessels. These were painted, as was the tradition, by the women in their families. Traditional water carriers as well as large size forms of elephants and camels also featured in the potters’ repertoire. So integral was pottery to Kutch that there was at least one family of potters in every village.',
      'In earlier times, Kutch terracotta pottery was also traded with the outside world from the sea ports of Mandvi, Mundra and Lakhpat.',
      'The role of pottery however began to decline when the centre of sea trade shifted from Kutch to Bombay. It also lost its domestic importance when modernization came to Kutch and a variety of mass-produced materials became easily available.',
      'With no local or international markets, only a few families were willing to practice pottery. They focused primarily on creating water carriers. However, a few master potters such as Buddhachhacha Kumbhar continued creating large size animal forms.',
      'Chanda Shroff decided to work with Buddhachhacha’s son and grandson. She wanted Kutch terracotta pottery to regain its stature as one of the renowned crafts of Kutch.',
      'She studied the intricacies of the craft and elevated the quality of its every aspect. She inspired and motivated Usmaan Ganni, Buddhachhacha’s grandson, to take up the family craft, and even try his hand at new forms.',
      'Usmaan is now a sought-after potter who works from Shrujan’s Design Studio. He paints his terracotta creations and has developed an ingenious technique to stone polish them so that they look like glazed pottery.',
      'Slowly, terracotta pottery is gaining popularity. More and more potters are shaping traditional as well as contemporary forms. The most popular product however, is still the gowmukh water jug that Chanda Shroff had designed more than a decade ago.',
    ],
  },
  {
    no: '06',
    slug: 'tie-dye',
    short: 'Tie-dye',
    name: 'Tie-dye',
    tag: 'Tied, then dyed',
    src: '/craft-tiedye.mp4',
    poster: '/craft-tiedye-poster.webp',
    facts: [
      ['Family', 'Resist dyeing'],
      ['Three ways', 'Bandhani, Shibori, clamp'],
      ['Shown at', 'India Art Fair'],
    ],
    body: [
      'Tie-dye is a term used to describe a number of traditional resist-dyeing techniques. These include stitching, twisting, folding, pleating, crumpling fabric and binding it using string, rubber band, clamp and other devices.',
      'The fabric is then dyed. The areas which are tied or constricted resist the penetration of the dye and, when opened up, reveal unique and unusual patterns.',
      'There are three types of tie-dye techniques practised in Kutch: the centuries-old, traditional bandhani; the Japanese-inspired Shibori and the contemporary clamp technique. Shrujan supports innovations in all three techniques.',
      'Shrujan has taken the tie-dye of Kutch to prestigious markets and platforms such as India Art Fair and shown the world that in the hands of master tie-dyers, this craft can be playful and sophisticated; rainbow-hued and monochromatic; traditional and avant garde.',
    ],
  },
]

/* The page's own opening, as it reads on the live site. */
export const CRAFT_INTRO = [
  'Kutch is home to a remarkable range of craft practices shaped by landscape, community and generations of knowledge. From textiles and natural dyes to pottery, weaving, metal and more, each craft carries its own materials, techniques and cultural memory.',
  'Shrujan works closely with many of these traditions, learning from artisans and supporting processes that allow their knowledge to remain alive and relevant. What you see here is not a catalogue, but an introduction to living practices — each with its own story, skill and sense of place.',
]
