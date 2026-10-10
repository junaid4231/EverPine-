import type { ServiceIndexEntry, ServicePage } from '@/content/types'

/** All ten services, in the order they appear in the services index. */
export const servicesIndex: ServiceIndexEntry[] = [
  {
    id: 'trees',
    name: 'Christmas trees',
    line: 'Supplied, delivered, assembled, lit and dressed — 2.4 m to 3.6 m and beyond.',
    page: 'christmas-tree-installation',
    image: 'red-gold-tree-poinsettias-faux-fur-skirt-living-room',
  },
  {
    id: 'door-arches',
    name: 'Door arches',
    line: 'Full garland arches that frame the front door, from evergreen to frosted to all-bauble.',
    page: 'door-arches-and-wreaths',
    image: 'arched-entrance-evergreen-garland-large-red-bow',
  },
  {
    id: 'wreaths',
    name: 'Wreaths',
    line: 'Single or paired, bowed or frosted, matched to the arch around them.',
    page: 'door-arches-and-wreaths',
    image: 'greenery-garland-glass-entrance-wreath',
  },
  {
    id: 'lighting',
    name: 'Christmas lighting',
    line: 'House lighting along eaves, balconies and arches — plus lit trees, garlands and entrances.',
    page: 'christmas-lighting',
    image: 'lit-garland-arch-wood-door-cone-lights-evening',
  },
  {
    id: 'stairs',
    name: 'Stair decoration',
    line: 'Garlands along the balustrade, clusters at the newel post, candlelight on the steps.',
    page: 'staircase-and-railing-decoration',
    image: 'staircase-frosted-garland-red-gold-baubles-candles',
  },
  {
    id: 'railings',
    name: 'Railing decoration',
    line: 'Balconies, mezzanines, mantels and media walls, garlanded to match the house.',
    page: 'staircase-and-railing-decoration',
    image: 'media-wall-garland-poinsettias-stockings',
  },
  {
    id: 'tables',
    name: 'Table decoration',
    line: 'Runners and centrepieces for dining tables, islands and entrance consoles.',
    page: 'table-decoration-vases-figurines',
    image: 'table-runner-poinsettia-pinecones-marble-table',
  },
  {
    id: 'vases',
    name: 'Christmas-themed vases',
    line: 'Vases and planters dressed for the season — even the olive tree joins in.',
    page: 'table-decoration-vases-figurines',
    image: 'olive-tree-planter-baubles-nutcracker-reindeer',
  },
  {
    id: 'figurines',
    name: 'Christmas figurines',
    line: 'Reindeer, nutcrackers and seasonal figures, placed where they’ll be noticed.',
    page: 'table-decoration-vases-figurines',
    image: 'onyx-counter-garland-runner-reindeer-figurines',
  },
  {
    id: 'removal',
    name: 'Post-Christmas removal',
    line: 'When the season ends, we take it all down and clear it away.',
    page: 'christmas-decoration-removal',
    image: 'peppermint-tree-installation-protective-sheeting',
  },
]

export const servicePages: ServicePage[] = [
  /* ───────────────────────────── Trees ───────────────────────────── */
  {
    slug: 'christmas-tree-installation',
    name: 'Christmas tree supply & installation',
    meta: {
      title: 'Christmas Tree Installation Dubai: Prices & Rental',
      description:
        'Christmas trees from 2.4 m to 3.6 m, delivered, assembled, lit and styled in your home or business in Dubai and Sharjah. Buy or rent. Packages from AED 5,500.',
    },
    eyebrow: 'Service · Christmas trees',
    h1: 'Christmas tree supply & installation in Dubai and Sharjah',
    accent: 'installation',
    intro:
      'A full, lifelike tree, delivered to your door, assembled, lit and dressed by our stylists — sized to your ceiling and finished in the palette you choose. You don’t lift a box.',
    hero: 'red-gold-tree-poinsettias-faux-fur-skirt-living-room',
    sections: [
      {
        heading: 'Heights we install',
        body: [
          'Every package is built around a tree of a set height, so you know exactly what will arrive. If your space calls for something else, we quote it separately.',
        ],
        list: [
          '**2.4 m** — the [Basic package](/packages#basic). Suits most apartments and rooms with standard ceilings.',
          '**2.7 m** — the [Silver package](/packages#silver). For taller living rooms and townhouses.',
          '**3–3.6 m** — the [Gold package](/packages#gold). For double-height halls, villa living rooms and lobbies.',
          '**Other heights** — smaller or taller trees are available on a custom quote.',
        ],
      },
      {
        heading: 'Christmas tree prices in Dubai and Sharjah',
        body: [
          'Our trees are priced as part of a styled package, with delivery, installation and styling included:',
        ],
        list: [
          '**2.4 m tree — AED 5,500** with a cloth tree skirt, door arch and wreath ([Basic](/packages#basic)).',
          '**2.7 m tree — AED 14,800** with skirt, gift boxes, door arch, wreath and stair decoration ([Silver](/packages#silver)).',
          '**3–3.6 m tree — AED 24,700** with the above plus table decoration, figurines and house lighting ([Gold](/packages#gold)).',
          '**Other heights and tree rental** — quoted on request. Final quote confirmed on enquiry.',
        ],
      },
      {
        heading: 'Choosing the right size',
        body: [
          'Measure from floor to ceiling where the tree will stand, not in the middle of the room — bulkheads, downlights and chandeliers all steal height. Then allow roughly 30 cm above the tree for the topper and for us to place it.',
          'Our [tree size guide](/guides/christmas-tree-size-ceiling-height) has a quick calculator that turns your ceiling height into a recommended tree and package.',
        ],
      },
      {
        heading: 'Palettes',
        body: [
          'Tell us the look you want, or send a photo of your room and we’ll suggest one. Palettes from our recent installations:',
        ],
        list: [
          '**Classic red & gold** — poinsettias, gold baubles, a faux-fur skirt.',
          '**Frost & silver** — flocked branches, silver and champagne.',
          '**Emerald & gold** — deep green baubles layered with gold.',
          '**Bronze & champagne** — warm metallics that sit well with wood and stone.',
          '**Peppermint** — red and white swirls for a playful family room.',
          '**Quiet neutrals** — green, gold and a single velvet bow.',
        ],
      },
      {
        heading: 'What installation involves',
        body: ['On installation day our team arrives with everything needed and dresses the whole house, not just the tree. Depending on your package or the pieces you choose, we:'],
        list: [
          'Deliver the tree and all décor to your door.',
          'Assemble the tree in position and shape it so it looks full from every side you’ll see it.',
          'Dress it — lights, baubles, picks and ribbons layered from the inside out.',
          'Add the topper, the skirt and, in the Silver and Gold packages, gift boxes beneath.',
          'Dress the entrance — a full garland arch around the door, the wreath and bows, fixed neatly to the frame.',
          'Garland the staircase and railings, with baubles, ribbons and candles carried up every step.',
          'Style tables and consoles — runners, centrepieces, Christmas vases and figurines — in the same palette as the tree.',
          'Walk you through the finished house before we leave.',
        ],
      },
      {
        heading: 'Christmas tree rental or purchase',
        body: [
          'Most clients keep their tree. If you’d rather not store one through the year, seasonal rental is also available — mention it when you enquire and we’ll quote both.',
        ],
      },
    ],
    plates: ['classic-green-tree-red-silver-baubles-apartment', 'tall-flocked-tree-burgundy-gold-baubles-lounge', 'champagne-gold-tree-star-topper-office-window'],
    inPackages: ['basic', 'silver', 'gold'],
    packageNote: 'A styled tree is the centre of every package — 2.4 m in Basic, 2.7 m in Silver and 3–3.6 m in Gold.',
    faqs: [
      {
        q: 'How much does a Christmas tree with installation cost in Dubai?',
        a: 'Our trees come as styled packages with delivery, installation and styling included: AED 5,500 with a 2.4 m tree, AED 14,800 with a 2.7 m tree and AED 24,700 with a 3–3.6 m tree. Other heights and rental are quoted on request.',
      },
      {
        q: 'What size Christmas tree should I choose?',
        a: 'Measure the ceiling where the tree will stand and allow about 30 cm above the tree for the topper. A 2.7 m ceiling suits a 2.4 m tree; 3 m suits 2.7 m; double-height spaces suit 3–3.6 m. Our [tree size guide](/guides/christmas-tree-size-ceiling-height) works it out for you.',
      },
      {
        q: 'Do I keep the tree?',
        a: 'Yes — trees are supplied for you to keep. Seasonal rental is also available if you’d prefer not to store one; ask when you enquire.',
      },
      {
        q: 'Can you install a tree in an apartment tower?',
        a: 'Yes. Most towers ask residents to book the service lift and let building management know about deliveries — we’ll tell you what to arrange when we confirm your date.',
      },
      {
        q: 'Will you take the tree down after Christmas?',
        a: 'Removal is available as a separate service. See [post-Christmas removal](/services/christmas-decoration-removal).',
      },
    ],
    related: [
      { href: '/guides/christmas-tree-size-ceiling-height', label: 'Tree size guide' },
      { href: '/services/table-decoration-vases-figurines', label: 'Table decoration' },
      { href: '/gallery', label: 'Gallery' },
    ],
    whatsappService: 'a Christmas tree',
  },

  /* ───────────────────────────── Lighting ───────────────────────────── */
  {
    slug: 'christmas-lighting',
    name: 'Christmas lighting',
    meta: {
      title: 'Christmas Lights Installation for Villas in Dubai',
      description:
        'House lighting for villas — eaves, balconies, arches and rooflines — plus lit trees, garlands and entrances. Included in the Gold package or booked on its own.',
    },
    eyebrow: 'Service · Christmas lighting',
    h1: 'Christmas lights installation for villas & businesses in Dubai and Sharjah',
    accent: 'Christmas lights',
    intro:
      'Evenings are when a Gulf Christmas happens. We outline the house in warm light — rooflines, balconies, arches — so it glows from the street the moment the sun goes down.',
    hero: 'lit-flocked-tree-red-baubles-terrace-night',
    sections: [
      {
        heading: 'House lighting',
        body: [
          'We follow the architecture rather than fighting it. Icicle lights along the eaves and parapets, strands tracing balconies and arched windows, and a single accent — a lit reindeer on the roof, a red bow on the balcony — to give the façade a focal point.',
          'House lighting is part of the [Gold package](/packages#gold) and can also be booked on its own.',
        ],
      },
      {
        heading: 'Lit trees, garlands and entrances',
        body: [
          'Trees, garlands and door arches can all be lit, and entrances can be finished with lit cone trees, candle-style lights and illuminated figures.',
        ],
      },
      {
        heading: 'For businesses',
        body: [
          'Shopfronts, restaurant terraces and hotel entrances benefit most from light: it’s what people see first in the evening. We’ll plan lighting as part of a [commercial installation](/commercial-christmas-decor).',
        ],
      },
      {
        heading: 'Before we light a façade',
        body: ['A few things are worth checking when you enquire:'],
        list: [
          '**Community or building rules.** Some master communities and buildings have guidelines on exterior decorations. It’s worth checking with your community or building management first.',
          '**Power.** Let us know where your outdoor sockets are; photos help.',
          '**Photos of the front of the house.** A daylight photo of the façade lets us plan the lines before we arrive.',
        ],
      },
    ],
    plates: ['villa-balcony-red-bow-warm-string-lights-dusk', 'lit-garland-arch-wood-door-cone-lights-evening', 'red-bauble-tree-candle-lights-entrance-garland'],
    inPackages: ['gold'],
    packageNote: 'House lighting is included in the Gold package. Lighting can also be booked on its own, with or without other décor.',
    faqs: [
      {
        q: 'Is house lighting included in a package?',
        a: 'Yes — house lighting is included in the [Gold package](/packages#gold). It can also be booked on its own.',
      },
      {
        q: 'Can I book Christmas lights without a package?',
        a: 'Yes. Send us a photo of the front of your house and we’ll quote lighting on its own.',
      },
      {
        q: 'Do I need permission from my community to light my villa?',
        a: 'Some master communities and buildings have guidelines on exterior decorations. Check with your community or building management before installation; we’re happy to tell you what details they might ask for.',
      },
      {
        q: 'Do you light shopfronts and restaurant entrances?',
        a: 'Yes. See [Christmas décor for businesses](/commercial-christmas-decor).',
      },
    ],
    related: [
      { href: '/packages#gold', label: 'Gold package' },
      { href: '/services/door-arches-and-wreaths', label: 'Door arches & wreaths' },
      { href: '/christmas-decoration-dubai', label: 'Christmas décor in Dubai' },
    ],
    whatsappService: 'Christmas house lighting',
  },

  /* ───────────────────────────── Door arches & wreaths ───────────────────────────── */
  {
    slug: 'door-arches-and-wreaths',
    name: 'Door arches & wreaths',
    meta: {
      title: 'Christmas Door Arches & Wreaths in Dubai & Sharjah',
      description:
        'Garland door arches and wreaths for villa entrances, apartments and shopfronts in Dubai and Sharjah — evergreen, frosted or all-bauble. Included in every package.',
    },
    eyebrow: 'Service · Door arches & wreaths',
    h1: 'Christmas door arches & wreaths',
    accent: 'wreaths',
    intro:
      'In the Gulf, the front door is where hospitality starts. A full garland arch and a wreath turn it into an invitation for villas, apartments and shopfronts across Dubai and Sharjah — and they’re part of every Everpine package.',
    hero: 'wood-door-garland-arch-red-white-baubles-wreath',
    sections: [
      {
        heading: 'Arch styles',
        body: ['An arch is built to the door it frames. The styles clients return to:'],
        list: [
          '**Evergreen with bauble clusters** — lush garland, red and gold gathered at intervals.',
          '**Frosted** — flocked garland with silver, champagne and white, often lit.',
          '**All-bauble** — baubles packed densely over the garland in one or two colours, like the emerald and gold arch below.',
          '**Playful** — peppermint swirls, candy canes and stars for a family home.',
        ],
      },
      {
        heading: 'Any doorway',
        body: [
          'Pivot doors, double doors, arched entrances, recessed porches and glass shopfronts each need a different build. We size the arch to the frame and the recess, and add oversized baubles, gift boxes or lit figures at the threshold when there’s room.',
        ],
      },
      {
        heading: 'Wreaths',
        body: [
          'A single wreath for a single door, a matched pair for double doors — tied with velvet bows, frosted, or dressed in the arch’s colours so the entrance reads as one composition.',
        ],
      },
    ],
    plates: ['flocked-lit-garland-arch-wood-door-frosted-wreath', 'emerald-gold-bauble-arch-sunburst-door', 'double-door-arch-red-bows-twin-wreaths-oversized-baubles', 'arched-entrance-evergreen-garland-large-red-bow'],
    inPackages: ['basic', 'silver', 'gold'],
    packageNote: 'A door arch and a wreath are included in every package.',
    faqs: [
      {
        q: 'Is a door arch included in the packages?',
        a: 'Yes — every package, from [Basic](/packages#basic) upwards, includes a door arch and a wreath.',
      },
      {
        q: 'Can you decorate a double or arched door?',
        a: 'Yes. Arches are built to the frame, so double doors, arched doorways, pivot doors and glass shopfronts are all possible. A photo of the entrance helps us plan.',
      },
      {
        q: 'Can the arch be lit?',
        a: 'Yes, arches can be lit. Lighting is especially effective on entrances that are seen in the evening.',
      },
      {
        q: 'Do you decorate apartment doors?',
        a: 'Yes. Some buildings have rules for corridors, so it’s worth checking with building management first.',
      },
    ],
    related: [
      { href: '/packages', label: 'All packages' },
      { href: '/services/christmas-lighting', label: 'Christmas lighting' },
      { href: '/gallery', label: 'Gallery' },
    ],
    whatsappService: 'a Christmas door arch and wreath',
  },

  /* ───────────────────────────── Stairs & railings ───────────────────────────── */
  {
    slug: 'staircase-and-railing-decoration',
    name: 'Staircase & railing decoration',
    meta: {
      title: 'Staircase & Railing Christmas Decoration, Dubai',
      description:
        'Christmas garlands for staircases, glass balustrades, balconies, mezzanines and media walls, styled to match your tree. Included from the Silver package.',
    },
    eyebrow: 'Service · Stairs & railings',
    h1: 'Staircase & railing Christmas decoration',
    accent: 'Christmas decoration',
    intro:
      'The staircase is usually the tallest line in a villa, and the one guests see first. Dressed with garland, it carries the tree’s palette through the whole house.',
    hero: 'staircase-frosted-garland-red-gold-baubles-candles',
    sections: [
      {
        heading: 'Staircases',
        body: [
          'We run garland along the handrail, gather clusters of baubles at the newel post and landing, and can add candle-style lights along the steps. Glass balustrades, metal railings and timber banisters each need a different fixing, so tell us what yours is when you enquire and we’ll agree the approach before installation.',
        ],
      },
      {
        heading: 'Railings, mantels and media walls',
        body: [
          'The same garland works along mezzanine and balcony railings, across a mantel, or framing a media wall — a good option in apartments without a staircase.',
        ],
      },
      {
        heading: 'Keeping steps clear',
        body: [
          'Décor stays on the rail and the outer edge of the steps, leaving the walking line clear. On busy family staircases we’ll suggest where to keep it lighter.',
        ],
      },
    ],
    plates: ['media-wall-garland-poinsettias-stockings', 'red-gold-tree-velvet-ribbons-gold-collar-villa', 'dining-centrepiece-installation-in-progress'],
    inPackages: ['silver', 'gold'],
    packageNote: 'Stair decoration is included in the Silver and Gold packages.',
    faqs: [
      {
        q: 'Which packages include stair decoration?',
        a: 'The [Silver](/packages#silver) and [Gold](/packages#gold) packages both include stair decoration.',
      },
      {
        q: 'Can you decorate a glass balustrade?',
        a: 'Yes — the staircase in our photographs has a glass balustrade. Let us know your railing type when you enquire so we can agree the fixing method.',
      },
      {
        q: 'I live in an apartment without stairs. What’s the alternative?',
        a: 'Garland works just as well on a balcony railing, a mantel or around a media wall.',
      },
    ],
    related: [
      { href: '/packages#silver', label: 'Silver package' },
      { href: '/services/christmas-tree-installation', label: 'Christmas trees' },
      { href: '/gallery', label: 'Gallery' },
    ],
    whatsappService: 'staircase decoration',
  },

  /* ───────────────────────────── Tables, vases, figurines ───────────────────────────── */
  {
    slug: 'table-decoration-vases-figurines',
    name: 'Table decoration, vases & figurines',
    meta: {
      title: 'Christmas Table Decoration, Vases & Figurines',
      description:
        'Christmas table runners, centrepieces, dressed vases and figurines for dining tables, islands and consoles in Dubai and Sharjah. Included in Gold.',
    },
    eyebrow: 'Service · Tables, vases & figurines',
    h1: 'Christmas table decoration, vases & figurines',
    accent: 'figurines',
    intro:
      'The details people notice up close: a runner along the dining table, reindeer on the kitchen island, an olive tree dressed for the season. For homes in Dubai and Sharjah, this is where a decorated house becomes a styled one.',
    hero: 'onyx-counter-garland-runner-reindeer-figurines',
    sections: [
      {
        heading: 'Runners and centrepieces',
        body: [
          'Long, low evergreen runners for dining tables and kitchen islands, layered with poinsettias, pine cones, baubles and ribbon — kept low enough to talk across. Marble, onyx and dark timber all take them beautifully.',
        ],
      },
      {
        heading: 'Christmas-themed vases',
        body: [
          'Vases and planters you already own can join in: a potted olive or ficus hung with baubles, a vase of seasonal stems, a cluster of dressed vessels on a console.',
        ],
      },
      {
        heading: 'Figurines',
        body: [
          'White and velvet reindeer, nutcrackers and seasonal figures, placed with intent — on the console by the door, at the foot of the tree, along the island.',
        ],
      },
      {
        heading: 'Consoles and entrance tables',
        body: [
          'An entrance console with a garland and a pair of figures is often the first thing guests see indoors. We style it to echo the arch outside.',
        ],
      },
    ],
    plates: ['table-runner-poinsettia-pinecones-marble-table', 'olive-tree-planter-baubles-nutcracker-reindeer', 'candy-cane-peppermint-tree-gingerbread-figures'],
    inPackages: ['gold'],
    packageNote: 'Table decoration and figurines are included in the Gold package, and can be added to any other package on request.',
    faqs: [
      {
        q: 'Which package includes table decoration?',
        a: 'Table decoration and figurines are included in the [Gold package](/packages#gold). They can also be quoted on their own or added to Basic or Silver.',
      },
      {
        q: 'Will a runner get in the way at dinner?',
        a: 'We keep runners low and leave room for place settings. Tell us how you use the table and we’ll style around it.',
      },
      {
        q: 'Can you decorate my own vases and plants?',
        a: 'Yes — dressing a planter or vase you already own is a lovely way to bring the palette into the room.',
      },
    ],
    related: [
      { href: '/packages#gold', label: 'Gold package' },
      { href: '/services/staircase-and-railing-decoration', label: 'Stairs & railings' },
      { href: '/gallery', label: 'Gallery' },
    ],
    whatsappService: 'Christmas table decoration',
  },

  /* ───────────────────────────── Removal ───────────────────────────── */
  {
    slug: 'christmas-decoration-removal',
    name: 'Post-Christmas removal',
    meta: {
      title: 'Christmas Decoration Removal in Dubai & Sharjah',
      description:
        'Post-Christmas removal in Dubai and Sharjah: we take down trees, door arches, garlands and lights and clear them away. Book your date when you order.',
    },
    eyebrow: 'Service · After the season',
    h1: 'Christmas decoration removal in Dubai & Sharjah',
    accent: 'removal',
    intro:
      'Taking Christmas down is the part nobody looks forward to. Book removal and our team comes back after the season to take everything down and clear it away.',
    hero: 'peppermint-tree-installation-protective-sheeting',
    sections: [
      {
        heading: 'When',
        body: [
          'Most homes keep their décor up until the New Year; many wait until after Epiphany on 6 January or Orthodox Christmas on 7 January. Businesses often want the space back sooner. Choose the date that suits you — the earlier you book it, the easier it is to hold.',
        ],
      },
      {
        heading: 'What we take down',
        body: ['Everything we installed:'],
        list: [
          'The tree — undressed and dismantled.',
          'Door arches, wreaths and garlands.',
          'House lighting and lit décor.',
          'Table décor and figurines.',
        ],
      },
      {
        heading: 'Rented trees',
        body: [
          'If you rented your tree, we collect it as part of the removal visit.',
        ],
      },
    ],
    plates: ['stylist-placing-red-baubles-on-tree', 'dining-centrepiece-installation-in-progress'],
    inPackages: [],
    packageNote: 'Removal isn’t part of the packages. It’s quoted separately — add it when you enquire, or book it later in the season.',
    faqs: [
      {
        q: 'Is removal included in the packages?',
        a: 'No. Removal is a separate service, quoted when you enquire or later in the season.',
      },
      {
        q: 'When should I book removal?',
        a: 'Ideally when you book your installation — booking early gives you the widest choice of dates.',
      },
      {
        q: 'Can you remove decorations another company installed?',
        a: 'Ask us — send a few photos and we’ll let you know.',
      },
    ],
    related: [
      { href: '/packages', label: 'Packages' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Get a quote' },
    ],
    whatsappService: 'post-Christmas removal',
  },
]
