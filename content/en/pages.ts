import type { CityPage, Faq, GuideStep, PageMeta, Section } from '@/content/types'
import type { ImageId } from '@/lib/images'
import { hasWhatsApp } from '@/lib/site-config'

/* ──────────────────────────────── Shared FAQs ──────────────────────────────── */

export const faqs = {
  pricing: [
    {
      q: 'How much does Christmas decoration cost in Dubai?',
      a: 'Our packages are **AED 5,500** (Basic), **AED 14,800** (Silver) and **AED 24,700** (Gold), with delivery, installation and styling included. Custom and commercial work is quoted individually. Final quote confirmed on enquiry.',
    },
    {
      q: 'What’s included in the package price?',
      a: 'Everything listed in the package, plus delivery, installation and styling by our team. Removal after the season is a separate service. See the [full package details](/packages).',
    },
    {
      q: 'Can I customise a package?',
      a: 'Yes. Packages are a starting point — you can change the palette, add pieces such as table décor or house lighting, or ask for a fully custom design.',
    },
    {
      q: 'Is removal included?',
      a: 'No — [post-Christmas removal](/services/christmas-decoration-removal) is available as a separate service. You can book it with your installation.',
    },
  ],
  trees: [
    {
      q: 'Do I keep the tree, or can I rent one?',
      a: 'Trees are supplied for you to keep. Seasonal rental is also available — ask when you enquire and we’ll quote both.',
    },
    {
      q: 'What size tree fits my ceiling?',
      a: 'Allow about 30 cm between the top of the tree and the ceiling. Try our [tree size calculator](/guides/christmas-tree-size-ceiling-height).',
    },
    {
      q: 'Can I choose the colours?',
      a: 'Yes. Popular palettes include classic red and gold, frost and silver, emerald and gold, bronze and champagne, peppermint and quiet neutrals — or send us a photo of your room and we’ll suggest one.',
    },
  ],
  booking: [
    {
      q: 'When should I book?',
      a: 'As early as you can. There are limited installation slots each season, and the dates closest to Christmas go first.',
    },
    {
      q: 'How do I book?',
      a: hasWhatsApp
        ? 'Send us a message on WhatsApp, or fill in the [quote form](/contact#quote) with your area, property type, package and preferred date. We’ll reply to confirm the details and your quote.'
        : 'Fill in the [quote form](/contact#quote) with your area, property type, package and preferred date, and we’ll reply to confirm the details and your quote.',
    },
    {
      q: 'Which areas do you cover?',
      a: 'Dubai and Sharjah — homes, villas, apartments, offices, hotels, restaurants and shops. See [Dubai](/christmas-decoration-dubai) and [Sharjah](/christmas-decoration-sharjah).',
    },
    {
      q: 'Do I need to be home during installation?',
      a: 'Someone needs to let our team in and agree placement at the start. We’ll confirm the arrival window when we book your date.',
    },
  ],
  lighting: [
    {
      q: 'Do you install outdoor lights on villas?',
      a: 'Yes. House lighting is included in the [Gold package](/packages#gold) and can also be booked on its own. See [Christmas lighting](/services/christmas-lighting).',
    },
  ],
  commercial: [
    {
      q: 'Do you decorate offices, hotels and restaurants?',
      a: 'Yes. Commercial projects are quoted individually. See [Christmas décor for businesses](/commercial-christmas-decor).',
    },
  ],
} satisfies Record<string, Faq[]>

/* ──────────────────────────────── Home ──────────────────────────────── */

export const home = {
  meta: {
    title: 'Christmas Decoration Company in Dubai & Sharjah · Everpine',
    description:
      'Christmas trees, door arches, wreaths, stair garlands, table décor and house lighting — delivered, installed and styled in Dubai & Sharjah. From AED 5,500.',
  } satisfies PageMeta,
  hero: {
    h1a: 'Christmas decoration,',
    h1b: 'installed',
    h1c: 'for you in Dubai & Sharjah',
    sub: 'Trees, door arches, garlands, table styling and house lighting — supplied, delivered and styled in your villa, home or business.',
    image: 'red-velvet-bow-tree-gold-baubles-gift-boxes' as ImageId,
  },
  statement: {
    eyebrow: 'The Everpine way',
    text: 'You choose the look and the day. We bring everything, build it and style it — down to the last bow — so the house is ready when you walk in.',
    detail:
      'No boxes to carry, no ladders, no evenings lost to tangled lights. Just a tree that fills the room, an entrance that greets your guests, and a staircase dressed to match.',
    image: 'stylist-placing-red-baubles-on-tree' as ImageId,
    /** Headline that "streams" in word by word as it scrolls through the viewport. */
    stream: [
      { t: 'You choose the look and the day. We bring everything, build it and style it,' },
      { t: 'down to the last bow,', em: true },
      { t: 'so the house is ready when you walk in.' },
    ] as { t: string; em?: boolean }[],
    promises: [
      { word: 'Delivered', text: 'Tree, garlands, lights, ribbons and figurines arrive with our team. No boxes, no trips to the shops.' },
      { word: 'Installed', text: 'Built in position and shaped so it looks full from every side you’ll see it.' },
      { word: 'Styled', text: 'Dressed by hand, bauble by bauble, in the palette you choose — then walked through with you.' },
    ],
  },
  services: {
    eyebrow: 'Services',
    heading: 'Everything the season needs, front door to dining table',
    intro: 'Book a package, or choose individual pieces. Every service includes delivery, installation and styling.',
  },
  marquee: ['Christmas trees', 'Door arches', 'Wreaths', 'House lighting', 'Staircase garlands', 'Table styling', 'Figurines', 'Removal after the season'],
  glow: { word: 'Glow', caption: 'House lighting — rooflines, balconies and arches, switched on at dusk.' },
  palettes: {
    eyebrow: 'Palettes',
    heading: ['Choose your', 'palette'],
    intro: 'Every installation is styled in one palette, carried from the front door to the dining table. Tap a palette to see it in a real Everpine installation.',
    legend: 'Palettes',
    items: [
      { id: 'red-gold', name: 'Classic red & gold', swatches: ['#a3202a', '#d4b06a', '#1f4a36', '#f5efe4'], image: 'red-bauble-tree-candle-lights-entrance-garland', text: 'Lacquer-red baubles, gold accents, deep evergreen — the Christmas everyone remembers.' },
      { id: 'frost-silver', name: 'Frost & silver', swatches: ['#eef2f5', '#b9c2cc', '#d9c79a', '#8e98a3'], image: 'flocked-lit-garland-arch-wood-door-frosted-wreath', text: 'Flocked branches, silver and champagne, lit warm so it glows rather than glitters.' },
      { id: 'emerald-gold', name: 'Emerald & gold', swatches: ['#155c3b', '#0e3b27', '#d4b06a', '#f0dca8'], image: 'emerald-gold-bauble-arch-sunburst-door', text: 'Deep green baubles layered with gold — rich against white stone and dark doors.' },
      { id: 'bronze-champagne', name: 'Bronze & champagne', swatches: ['#8a5a3c', '#c79a6b', '#e9d3b4', '#5b3a2a'], image: 'tall-bronze-champagne-tree-lounge-window', text: 'Warm metallics that sit beautifully with timber, travertine and hotel lounges.' },
      { id: 'peppermint', name: 'Peppermint', swatches: ['#c81f2e', '#ffffff', '#e8b4b8', '#1f4a36'], image: 'peppermint-candy-door-arch-wrought-iron-doors', text: 'Red and white swirls, candy canes and stars — playful, for the family home.' },
      { id: 'quiet-neutral', name: 'Quiet neutrals', swatches: ['#3f5b45', '#c8b58a', '#e9e2d3', '#2a2f2a'], image: 'green-gold-tree-velvet-bow-neutral-living-room', text: 'Green, gold and a single velvet bow — understated luxury for calm interiors.' },
    ] as { id: string; name: string; swatches: string[]; image: ImageId; text: string }[],
  },
  gulf: {
    eyebrow: 'A Gulf Christmas',
    heading: 'Designed for warm evenings',
    headingParts: ['Designed for', 'warm evenings'],
    body: [
      'Christmas here isn’t snow on the windowsill. It’s doors open to guests, dinner that runs late, and a house that glows against a dusk-blue sky.',
      'So we design for that: entrances framed for arrivals, staircases and tables that carry the palette through marble and stone, and house lighting that comes into its own after sunset.',
    ],
    images: ['arched-villa-entrance-garland-giant-red-bow', 'onyx-counter-garland-runner-reindeer-figurines'] as ImageId[],
  },
  process: {
    eyebrow: 'How it works',
    heading: 'Three steps, one visit',
    headingParts: ['Three steps,', 'one visit'],
    steps: [
      {
        title: 'Choose',
        body: 'Pick a package or tell us what you have in mind. Send your area, property type, a photo of the space and your preferred date.',
        image: 'olive-tree-planter-baubles-nutcracker-reindeer' as ImageId,
      },
      {
        title: 'Confirm',
        body: 'We reply to confirm the details, palette and final quote, and reserve your installation slot.',
        image: 'spiral-red-peppermint-garland-tree-greenery' as ImageId,
      },
      {
        title: 'Come home to it',
        body: 'Our team delivers everything, installs it and styles it. When the season ends, removal is available too.',
        image: 'dining-centrepiece-installation-in-progress' as ImageId,
      },
    ],
  },
  gallery: {
    eyebrow: 'Plates from the season',
    heading: 'Christmas decoration, installed by Everpine',
    images: [
      'double-door-arch-red-bows-twin-wreaths-oversized-baubles',
      'tall-bronze-champagne-tree-lounge-window',
      'emerald-gold-bauble-arch-sunburst-door',
      'flocked-lit-garland-arch-wood-door-frosted-wreath',
      'gold-lit-tree-red-bauble-base-atrium',
    ] as ImageId[],
  },
  areas: {
    eyebrow: 'Where we work',
    heading: 'Dubai and Sharjah',
    lead: 'Looking for [Christmas decoration in Dubai](/christmas-decoration-dubai) or [Christmas decoration in Sharjah](/christmas-decoration-sharjah)? Both pages cover the areas we work in, access in towers and villa communities, and which package suits which home.',
    dubai: 'Villas, apartments, offices, hotels and restaurants across Dubai — from the Palm to the Ranches.',
    sharjah: 'Family villas, townhouses and apartments across Sharjah — from Al Majaz to Al Zahia.',
  },
  faqHeading: 'Questions, answered',
  reserve: {
    line: 'Book now to reserve your slot',
    sub: 'Installation dates are limited each season, and December goes first.',
    cta: 'Reserve on WhatsApp',
    ctaForm: 'Reserve your slot',
  },
  closing: {
    heading: 'Evenings in December are the first to go.',
    body: 'Limited installation slots each season — book early.',
  },
}

/* ──────────────────────────────── Packages page ──────────────────────────────── */

export const packagesPage = {
  meta: {
    title: 'Christmas Decoration & Tree Packages: Prices, Dubai',
    description:
      'Three Christmas décor packages with clear prices — Basic AED 5,500, Silver AED 14,800, Gold AED 24,700 — delivered, installed and styled in Dubai & Sharjah.',
  } satisfies PageMeta,
  eyebrow: 'Packages',
  h1: 'Christmas decoration packages',
  intro:
    'Three compositions with clear prices, each delivered, installed and styled by our team in Dubai and Sharjah. The photographs show Everpine installations; your own is styled for your space and palette.',
  compare: {
    heading: 'Side by side',
    caption: 'What each package includes',
  },
  beyond: {
    heading: 'Beyond the packages',
    items: [
      {
        title: 'Custom designs',
        body: 'A taller tree, a second tree, more rooms, a particular palette — tell us and we’ll quote it.',
        href: '/contact',
      },
      {
        title: 'House lighting on its own',
        body: 'Included in Gold, and available by itself for any villa.',
        href: '/services/christmas-lighting',
      },
      {
        title: 'Tree rental',
        body: 'Trees are supplied to keep, with seasonal rental available on request.',
        href: '/services/christmas-tree-installation',
      },
      {
        title: 'Removal after Christmas',
        body: 'We come back, take everything down and clear it away. Quoted separately.',
        href: '/services/christmas-decoration-removal',
      },
      {
        title: 'Businesses',
        body: 'Offices, hotels, restaurants and shops are quoted individually.',
        href: '/commercial-christmas-decor',
      },
    ],
  },
  faqHeading: 'Pricing questions',
}

/* ──────────────────────────────── Commercial ──────────────────────────────── */

export const commercial = {
  meta: {
    title: 'Office Christmas Decoration in Dubai & Sharjah',
    description:
      'Christmas trees, entrance arches, garlands and lighting for offices, hotels, restaurants and shops in Dubai and Sharjah — designed, installed and removed.',
  } satisfies PageMeta,
  eyebrow: 'For businesses',
  h1: 'Office, hotel & restaurant Christmas decoration in Dubai and Sharjah',
  intro:
    'Your guests, clients and team notice Christmas before anything else. We design and install Christmas decoration for offices, hotels, restaurants and shops across Dubai and Sharjah — from DIFC and Business Bay to Al Majaz — striking from the entrance, practical around daily operations, and taken down when you need the space back.',
  hero: 'tall-bronze-champagne-tree-lounge-window' as ImageId,
  audiences: [
    {
      id: 'offices',
      title: 'Offices',
      body: 'Reception is the first impression, so it gets the tree. Then the lift lobby, meeting rooms and pantry, in a palette that sits well with your brand. Tell us your working hours and we’ll agree an installation time around them.',
      image: 'champagne-gold-tree-star-topper-office-window' as ImageId,
    },
    {
      id: 'hotels',
      title: 'Hotels & hospitality',
      body: 'Tall lobby trees, framed entrances and lounge styling that photograph well — because guests will photograph them. We work to your property’s access and safety requirements.',
      image: 'lit-flocked-tree-red-baubles-terrace-night' as ImageId,
    },
    {
      id: 'restaurants',
      title: 'Restaurants & cafés',
      body: 'A shopfront arch or a feature wall that makes people stop outside, and table-level details that carry the theme through service.',
      image: 'bronze-copper-bauble-wall-illuminated-arch' as ImageId,
    },
    {
      id: 'retail',
      title: 'Retail',
      body: 'Entrances, windows and a tree inside the door. Lit décor keeps a frontage visible in the evening.',
      image: 'glass-entrance-garland-arch-red-bows-baubles' as ImageId,
    },
  ],
  related:
    'Most commercial projects combine a [tall Christmas tree](/services/christmas-tree-installation) for reception, entrance [door arches and wreaths](/services/door-arches-and-wreaths) and [Christmas lighting](/services/christmas-lighting) for the frontage. For homes, see our [packages](/packages) and the [Dubai](/christmas-decoration-dubai) and [Sharjah](/christmas-decoration-sharjah) pages.',
  howItWorks: {
    heading: 'How commercial projects work',
    steps: [
      { title: 'Brief', body: 'Send photos or a floor plan, ceiling heights, the zones you want decorated, your palette or brand colours, and access times.' },
      { title: 'Proposal & quote', body: 'We propose the pieces for each zone and send a quote.' },
      { title: 'Installation', body: 'We install on the agreed date and time, working to your building’s access and safety requirements.' },
      { title: 'Removal', body: 'We return after the season to take everything down and clear it away.' },
    ],
  },
  checklist: {
    heading: 'Before you brief us',
    items: [
      'Approval from your landlord or facilities management, if required.',
      'Permitted installation hours and service-lift booking.',
      'Fire exits, sprinklers, alarms and extinguishers must stay clear and visible — we plan around them.',
      'Your preferred removal date.',
    ],
  },
  faqs: [
    {
      q: 'Are the packages suitable for businesses?',
      a: 'The packages are designed for homes. Commercial spaces vary so much that we quote them individually — though a small office or boutique may suit a package with a few changes.',
    },
    {
      q: 'Can you install outside business hours?',
      a: 'Tell us your hours and access rules when you brief us, and we’ll agree an installation time with you.',
    },
    {
      q: 'Do you remove the décor after Christmas?',
      a: 'Yes, removal is available as a separate service. Book your preferred date with the installation.',
    },
    {
      q: 'Can you work to our brand colours?',
      a: 'Yes. Send your brand palette with the brief and we’ll design around it.',
    },
  ] satisfies Faq[],
}

/* ──────────────────────────────── Cities ──────────────────────────────── */

export const cities: Record<'dubai' | 'sharjah', CityPage> = {
  dubai: {
    area: 'dubai',
    meta: {
      title: 'Christmas Decorators in Dubai: Villas & Homes',
      description:
        'Christmas decorators in Dubai: trees, door arches, garlands, table décor and villa lighting, delivered, installed and styled across Dubai. Packages from AED 5,500.',
    },
    eyebrow: 'Dubai',
    h1: 'Christmas decoration in Dubai',
    intro:
      'From Palm Jumeirah villas to Downtown apartments and DIFC offices, we deliver, install and style Christmas across Dubai — tree, entrance, staircase, table and house lighting.',
    hero: 'arched-villa-entrance-garland-giant-red-bow',
    sections: [
      {
        heading: 'Villas',
        body: [
          'Villa communities are where the full composition comes into its own: a 3 m-plus tree in a double-height hall, a staircase dressed to match, and house lighting along the rooflines so the house glows after sunset. The [Gold package](/packages#gold) covers all of it.',
          'Many master communities have guidelines on exterior decorations. Check with your community management before we light the façade — a quick email usually does it.',
        ],
      },
      {
        heading: 'Apartments and towers',
        body: [
          'In towers, most of the planning is access. Buildings typically ask residents to book the service lift and notify management about deliveries, and some restrict loading times. When we confirm your date we’ll tell you exactly what to arrange.',
          'A 2.4 m tree suits most apartment ceilings — check yours with our [tree size guide](/guides/christmas-tree-size-ceiling-height).',
        ],
      },
      {
        heading: 'Offices, hotels and restaurants',
        body: [
          'Across DIFC, Business Bay, Downtown, Dubai Marina, JLT and Dubai Media City, businesses want décor that’s striking at the entrance and works around daily operations. See [Christmas décor for businesses](/commercial-christmas-decor).',
        ],
      },
    ],
    communities: {
      heading: 'Areas we cover in Dubai',
      note: 'We work across Dubai. These are some of the communities and districts we cover — if yours isn’t listed, just ask.',
      groups: [
        {
          label: 'Villa communities',
          items: [
            'Palm Jumeirah',
            'Emirates Hills',
            'Jumeirah',
            'Umm Suqeim',
            'Al Barsha',
            'Arabian Ranches',
            'Dubai Hills Estate',
            'Al Barari',
            'DAMAC Hills',
            'Tilal Al Ghaf',
            'The Springs & The Meadows',
            'Jumeirah Golf Estates',
            'Mudon',
            'Mirdif',
          ],
        },
        {
          label: 'Apartments & business districts',
          items: [
            'Downtown Dubai',
            'Business Bay',
            'DIFC',
            'Dubai Marina',
            'JBR',
            'JLT',
            'Dubai Media City',
            'City Walk',
            'Jumeirah Village Circle',
            'Dubai Creek Harbour',
          ],
        },
      ],
    },
    packageAdvice: {
      heading: 'Which package suits your Dubai home?',
      items: [
        { pkg: 'basic', text: '**Apartments** with standard ceilings — a 2.4 m tree plus a finished front door.' },
        { pkg: 'silver', text: '**Townhouses and villas with a staircase** — a 2.7 m tree, gift boxes and a dressed staircase.' },
        { pkg: 'gold', text: '**Villas with double-height spaces** — a 3–3.6 m tree, table styling, figurines and house lighting.' },
        { pkg: 'custom', text: '**Offices, hotels and restaurants** — quoted individually.' },
      ],
    },
    plates: ['villa-facade-icicle-lights-reindeer-dusk', 'gold-champagne-tree-star-picks-villa-lounge', 'red-gold-tree-velvet-ribbons-gold-collar-villa'],
    faqs: [
      {
        q: 'Do you cover all of Dubai?',
        a: 'Yes — villas, apartments and businesses across Dubai. If you’re unsure about your area, ask when you enquire.',
      },
      {
        q: 'Can you install a Christmas tree in a Dubai apartment tower?',
        a: 'Yes. You’ll usually need to book the service lift and let building management know about the delivery; we’ll tell you what to arrange when we confirm your date.',
      },
      {
        q: 'Can you put Christmas lights on my villa in Dubai?',
        a: 'Yes. House lighting is included in the [Gold package](/packages#gold) and can be booked on its own. Check your community’s guidelines on exterior decorations first.',
      },
      {
        q: 'How much does Christmas decoration cost in Dubai?',
        a: 'Packages are AED 5,500, AED 14,800 and AED 24,700, including delivery, installation and styling. Final quote confirmed on enquiry.',
      },
    ],
  },
  sharjah: {
    area: 'sharjah',
    meta: {
      title: 'Christmas Decoration in Sharjah: Villas & Homes',
      description:
        'Christmas décor in Sharjah: trees, door arches, wreaths, staircase garlands and villa lighting, delivered, installed and styled. Packages from AED 5,500.',
    },
    eyebrow: 'Sharjah',
    h1: 'Christmas decoration in Sharjah',
    intro:
      'The same full service we offer in Dubai, for homes across Sharjah: the tree delivered and styled, the front door framed, the staircase dressed and — for villas — the house lit for the evenings.',
    hero: 'arched-entrance-evergreen-garland-large-red-bow',
    sections: [
      {
        heading: 'Family villas and townhouses',
        body: [
          'Sharjah’s newer villa communities — Al Zahia, Aljada, Tilal City, Masaar and Sharjah Sustainable City among them — have generous entrances and staircases that suit the [Silver](/packages#silver) and [Gold](/packages#gold) packages. Larger family homes often have a formal entrance hall; that’s where a tall tree belongs.',
          'As in Dubai, communities may have guidelines on exterior decorations, so check with your community management before house lighting goes up.',
        ],
      },
      {
        heading: 'Apartments',
        body: [
          'In Al Majaz, Al Khan, Al Taawun, Al Nahda and Muwaileh, most homes are apartments, where the [Basic package](/packages#basic) — a 2.4 m tree, door arch and wreath — fits well. Let us know if your building needs a service-lift booking or a delivery notice.',
        ],
      },
      {
        heading: 'Scheduling',
        body: [
          'Roads between Dubai and Sharjah are busiest at commuting peaks, so we agree an arrival window with you when we confirm your date rather than a single time.',
        ],
      },
    ],
    communities: {
      heading: 'Areas we cover in Sharjah',
      note: 'We work across Sharjah city and its newer communities. If yours isn’t listed, just ask.',
      groups: [
        {
          label: 'Villa & townhouse communities',
          items: ['Al Zahia', 'Aljada', 'Tilal City', 'Masaar', 'Sharjah Sustainable City', 'Al Rahmaniya', 'Al Suyoh', 'Maryam Island'],
        },
        {
          label: 'City neighbourhoods',
          items: ['Al Majaz', 'Al Khan', 'Al Taawun', 'Al Nahda', 'Muwaileh', 'Al Qasimia', 'University City'],
        },
      ],
    },
    packageAdvice: {
      heading: 'Which package suits your Sharjah home?',
      items: [
        { pkg: 'basic', text: '**Apartments** — a 2.4 m tree, door arch and wreath.' },
        { pkg: 'silver', text: '**Townhouses** — a 2.7 m tree, gift boxes and a dressed staircase.' },
        { pkg: 'gold', text: '**Family villas** — the full composition, with house lighting.' },
        { pkg: 'custom', text: '**Businesses and larger homes** — quoted individually.' },
      ],
    },
    plates: ['evergreen-door-arch-red-gold-baubles-wreath-white-door', 'red-gold-tree-poinsettias-faux-fur-skirt-living-room', 'double-door-arch-red-bows-twin-wreaths-oversized-baubles'],
    faqs: [
      {
        q: 'Do you install Christmas decorations in Sharjah?',
        a: 'Yes — trees, door arches, wreaths, staircase and table décor, and house lighting, delivered, installed and styled in homes and businesses across Sharjah.',
      },
      {
        q: 'Are the same packages available in Sharjah?',
        a: 'Yes, all three packages are available in Sharjah. Final quote confirmed on enquiry.',
      },
      {
        q: 'Which package suits a Sharjah villa?',
        a: 'Silver suits most townhouses and villas with a staircase; Gold adds a taller tree, table styling, figurines and house lighting. See [all packages](/packages).',
      },
      {
        q: 'Can you install a tree in a Sharjah apartment building?',
        a: 'Yes. If your building needs a service-lift booking or delivery notice, we’ll tell you what to arrange when we confirm your date.',
      },
    ],
  },
}

/* ──────────────────────────────── Gallery ──────────────────────────────── */

export const galleryPage = {
  meta: {
    title: 'Christmas Decoration Gallery & Ideas',
    description:
      'Christmas decoration ideas from Everpine installations in the UAE: door arches, frosted trees, staircase garlands, table décor and villa lighting.',
  } satisfies PageMeta,
  eyebrow: 'Gallery',
  h1: 'Christmas decoration gallery',
  intro:
    'Installations by Everpine: trees, door arches, staircases, tables and house lighting. Filter by what you’re planning, or by palette, and send us the ones you love.',
}

/* ──────────────────────────────── About ──────────────────────────────── */

export const about = {
  meta: {
    title: 'About Everpine Events — Christmas Décor Studio',
    description:
      'Everpine Events is a Christmas décor and installation studio for villas, homes and businesses in Dubai and Sharjah. How we work and what we believe.',
  } satisfies PageMeta,
  eyebrow: 'About',
  h1: 'Evergreen, by name and by nature',
  intro:
    'Everpine Events designs, supplies, installs and styles Christmas décor for villas, homes and businesses in Dubai and Sharjah.',
  sections: [
    {
      heading: 'What we do',
      body: [
        'We take care of the whole of Christmas décor: the tree, the entrance, the staircase, the table, the lights — and, when the season ends, taking it all down again. Clients choose a package or a custom design; our team does the rest.',
      ],
    },
    {
      heading: 'How we think about it',
      body: [
        'A Christmas in the Gulf looks different from the ones on greeting cards. It’s warm, it’s social, and it happens after sunset. Our designs start from the house — its entrance, its stone and marble, its light in the evening — rather than from a catalogue.',
        'We believe in fewer, fuller pieces over lots of small ones: a tree that fills its corner, an arch dense enough to frame the door properly, a garland that runs the whole length of the rail.',
      ],
    },
    {
      heading: 'How we work',
      body: ['Every project follows the same simple path:'],
      list: [
        'You choose a package or describe what you want.',
        'We confirm the details, palette and final quote, and reserve your installation slot.',
        'Our team delivers, installs and styles everything.',
        'After the season, removal is available.',
      ],
    },
  ] satisfies Section[],
  images: ['stylist-placing-red-baubles-on-tree', 'dining-centrepiece-installation-in-progress', 'peppermint-tree-installation-protective-sheeting'] as ImageId[],
}

/* ──────────────────────────────── FAQ page ──────────────────────────────── */

export const faqPage = {
  meta: {
    title: 'Christmas Decoration FAQ: Prices, Trees & Booking',
    description:
      'Answers about Everpine’s Christmas decoration packages in Dubai and Sharjah: prices, what’s included, tree sizes, rental, booking, lighting and removal.',
  } satisfies PageMeta,
  eyebrow: 'FAQ',
  h1: 'Frequently asked questions',
  intro: 'Everything clients ask before booking. Can’t find your question? Send it to us.',
  groups: [
    { id: 'pricing', heading: 'Packages & pricing', faqs: faqs.pricing },
    { id: 'trees', heading: 'Trees', faqs: faqs.trees },
    { id: 'booking', heading: 'Booking & installation', faqs: faqs.booking },
    { id: 'lighting', heading: 'Lighting', faqs: faqs.lighting },
    { id: 'commercial', heading: 'Businesses', faqs: faqs.commercial },
  ],
}

/* ──────────────────────────────── Contact ──────────────────────────────── */

export const contact = {
  meta: {
    title: 'Get a Christmas Décor Quote — Dubai & Sharjah',
    description:
      'Request a quote for Christmas decoration in Dubai or Sharjah. Choose a package or describe your space, and we’ll reply to confirm details and price.',
  } satisfies PageMeta,
  eyebrow: 'Get a quote',
  h1: 'Let’s plan your Christmas',
  intro:
    'Tell us about your space, your preferred date and the look you have in mind. The fastest way to reach us is WhatsApp; the form works just as well.',
  /** Used while no WhatsApp number is configured. */
  introFormOnly: 'Tell us about your space, your preferred date and the look you have in mind, and we’ll reply to confirm the details and your quote.',
  next: {
    heading: 'What happens next',
    steps: [
      'We read your enquiry and reply to confirm the details.',
      'We agree the palette and send your final quote.',
      'We reserve your installation slot.',
    ],
  },
  image: 'flocked-lit-garland-arch-wood-door-frosted-wreath' as ImageId,
}

/* ──────────────────────────────── Privacy ──────────────────────────────── */

export const privacy = {
  meta: {
    title: 'Privacy Policy',
    description: 'How Everpine Events collects, uses and protects personal data submitted through this website.',
  } satisfies PageMeta,
  h1: 'Privacy policy',
  updated: '26 September 2026',
  /** Shown while `legalReviewed` is false. */
  reviewNotice: 'This policy is pending review by Everpine Events and its legal advisers.',
  legalReviewed: false, // TODO: set true after client + legal review
  sections: [
    {
      heading: 'Who we are',
      body: [
        'This website is operated by Everpine Events (“Everpine”, “we”, “us”), a Christmas décor and installation business serving Dubai and Sharjah, United Arab Emirates. We are the controller of the personal data described in this policy.',
      ],
    },
    {
      heading: 'The law we follow',
      body: [
        'We handle personal data in line with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL) and its implementing regulations, as they apply to us.',
      ],
    },
    {
      heading: 'What we collect',
      body: ['When you send an enquiry through our quote form, we collect:'],
      list: [
        'your name, phone number and email address;',
        'your area (Dubai or Sharjah) and property type;',
        'the package you’re interested in, your preferred installation date and any message you write.',
      ],
    },
    {
      heading: 'What we also receive',
      body: [
        'If you contact us on WhatsApp, by phone or by email, we receive the details you share there. WhatsApp is operated by Meta under its own privacy policy.',
        'Our hosting provider records basic technical data (such as IP address and browser type) in server logs to keep the site secure. We use Vercel Web Analytics, which measures page visits without cookies and without identifying you.',
        'If Google Analytics is enabled on this site, it runs only after you accept it in the cookie banner. It uses cookies to measure how visitors use the site. You can decline, and the site works the same.',
      ],
    },
    {
      heading: 'Why we use it',
      body: ['We use your details to:'],
      list: [
        'reply to your enquiry and prepare your quote;',
        'arrange, carry out and follow up on your installation or removal;',
        'keep records needed for our business and legal obligations.',
      ],
    },
    {
      heading: 'Our basis for using it',
      body: [
        'We process enquiry data because you ask us to (to take steps before entering into a contract with you) and with your consent, which you give by submitting the form. Analytics cookies are used only with your consent.',
        'We do not sell your personal data, and we do not use it for marketing without your separate consent.',
      ],
    },
    {
      heading: 'Who we share it with',
      body: ['We share personal data only with service providers who help us run the website and respond to you:'],
      list: [
        '**Vercel** — website hosting and privacy-friendly analytics;',
        '**WhatsApp (Meta)** — enquiries you choose to send us on WhatsApp, including from our quote form, are delivered through WhatsApp under its own privacy policy;',
        '**Google** — only if Google Analytics is enabled and you accept it.',
      ],
    },
    {
      heading: 'Transfers outside the UAE',
      body: [
        'These providers may process data on servers outside the UAE. Where that happens, we rely on the safeguards the PDPL allows, such as contractual protections offered by the provider.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'We keep enquiry data for as long as we need it to respond to you and, if you become a client, for the duration of our relationship and any period required by law. We then delete or anonymise it.', // TODO: confirm retention period with client
      ],
    },
    {
      heading: 'Your rights',
      body: ['Under the PDPL you may ask us to:'],
      list: [
        'give you access to the personal data we hold about you;',
        'correct inaccurate data;',
        'delete your data, or restrict how we use it;',
        'stop processing, where the law allows;',
        'transfer your data to another provider, where applicable.',
      ],
    },
    {
      heading: 'Security',
      body: [
        'The site is served over HTTPS, and form submissions are sent directly to our inbox rather than stored in a website database. Access to enquiries is limited to people who need it to respond to you.',
      ],
    },
    {
      heading: 'Contact',
      body: ['To exercise your rights or ask a question about this policy, contact us using the details on our [contact page](/contact).'],
    },
    {
      heading: 'Changes',
      body: ['We may update this policy. The date at the top shows when it last changed.'],
    },
  ] satisfies Section[],
}

/* ──────────────────────────────── 404 ──────────────────────────────── */

export const notFound = {
  title: 'Page not found',
  h1: 'This page has been packed away.',
  body: 'The page you’re looking for doesn’t exist or has moved. These might help:',
  links: [
    { href: '/', label: 'Home' },
    { href: '/packages', label: 'Packages' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Get a quote' },
  ],
}

/* ──────────────────────────────── Guides ──────────────────────────────── */

export const guides = {
  hub: {
    eyebrow: 'Guides',
    heading: 'Planning guides',
  },
  treeSize: {
    slug: 'christmas-tree-size-ceiling-height',
    meta: {
      title: 'Christmas Tree Size for Your Ceiling: Calculator',
      description:
        'Work out the right Christmas tree height and width for your ceiling in seconds. Simple rule, a quick calculator, and tips for UAE apartments and villas.',
    } satisfies PageMeta,
    eyebrow: 'Guide',
    h1: 'What size Christmas tree fits your ceiling?',
    intro:
      'The most common Christmas décor mistake is a tree that’s the wrong height — too short and it looks lost, too tall and the topper bends against the ceiling. Here’s how to get it right.',
    image: 'red-gold-tree-poinsettias-faux-fur-skirt-living-room' as ImageId,
    rule: {
      heading: 'The rule',
      body: 'Tree height = ceiling height − about 30 cm.',
      detail:
        'The 30 cm covers the topper (a star or bow typically adds 15–30 cm) and leaves room to place it. If your topper is especially tall, allow a little more.',
    },
    calculator: {
      heading: 'Tree size calculator',
      label: 'Ceiling height where the tree will stand',
      unit: 'metres',
      resultLabel: 'Recommended maximum tree height',
      widthLabel: 'Approximate width of a full tree',
      packageLabel: 'Matching package',
      tooLow: 'Your ceiling is lower than our smallest package tree needs. Ask us about a custom height.',
      custom: 'For a space this tall, ask us about a custom tree above 3.6 m.',
      customLabel: 'Custom',
      between: 'Between package sizes — the next smaller package tree will fit comfortably, or ask about a custom height.',
    },
    steps: [
      {
        heading: 'Measure in the right place',
        body: [
          'Measure from the floor to the ceiling at the exact spot where the tree will stand. Many UAE apartments and villas have bulkheads, cove lighting or dropped ceilings around the edges of a room — often exactly where a tree goes.',
        ],
        list: [
          'Check for downlights, AC grilles and chandeliers directly above.',
          'In double-height halls, measure to the lowest point above the tree, not the highest.',
          'On a stair landing, measure from the landing floor, not the ground floor.',
        ],
      },
      {
        heading: 'Plan for width, too',
        body: [
          'A full tree is typically a little over half as wide as it is tall at its base — so a 2.4 m tree needs roughly 1.3–1.5 m of floor, and a 3 m tree about 1.7–1.9 m. Add space around it so people can walk past without brushing the branches, and so the skirt and gift boxes have room.',
        ],
      },
      {
        heading: 'Heights by space',
        body: ['As a starting point:'],
        list: [
          '**Ceiling around 2.7 m** (many apartments) → **2.4 m tree** — our [Basic package](/packages#basic).',
          '**Ceiling around 3.0 m** (taller living rooms, townhouses) → **2.7 m tree** — our [Silver package](/packages#silver).',
          '**Ceiling 3.3 m and above** (villa halls, double-height spaces) → **3–3.6 m tree** — our [Gold package](/packages#gold).',
        ],
      },
      {
        heading: 'Where to put it',
        body: ['A few placement habits make a big difference:'],
        list: [
          'Near a socket, so cables don’t cross walkways.',
          'Where it can be seen from the entrance — and, for villas, through a front window after dark.',
          'Clear of doors, sliding windows and the direct blast of an AC vent.',
          'Not in front of anything you’ll need to reach through the season.',
        ],
      },
    ] satisfies GuideStep[],
    faqs: [
      {
        q: 'How much space should I leave between the tree and the ceiling?',
        a: 'About 30 cm, to fit the topper and allow room to place it.',
      },
      {
        q: 'What size tree is best for a 2.7 m ceiling?',
        a: 'A 2.4 m tree — the height in our [Basic package](/packages#basic).',
      },
      {
        q: 'What size tree for a double-height ceiling?',
        a: 'Usually 3 m or more. Our [Gold package](/packages#gold) includes a 3–3.6 m tree; taller trees are available on a custom quote.',
      },
    ] satisfies Faq[],
  },
  office: {
    slug: 'office-christmas-decor-planning',
    meta: {
      title: 'How to Plan Office Christmas Décor: Zones & Brief',
      description:
        'How to plan office Christmas décor: choosing zones, palette and budget, building approvals, fire-safety basics, and a brief checklist for your decorator.',
    } satisfies PageMeta,
    eyebrow: 'Guide',
    h1: 'How to plan your office Christmas décor',
    intro:
      'Office Christmas décor is mostly a planning job. Get the zones, approvals and brief right, and installation is the easy part. This guide walks through it in the order you’ll need it — and if you’d rather hand it over, see our [office Christmas decoration in Dubai and Sharjah](/commercial-christmas-decor).',
    image: 'spiral-red-bauble-garland-tree-plants-interior' as ImageId,
    steps: [
      {
        heading: '1. Start with the zones',
        body: [
          'Walk the route a visitor takes and list each space in order. Put most of the budget where the most people see it.',
        ],
        list: [
          '**Reception** — the tree, and often an arch or garland around the entrance.',
          '**Lift lobby** — a garland or a small tree; lobbies are often shared, so check with the building.',
          '**Meeting rooms and boardroom** — table décor for client-facing rooms.',
          '**Pantry and open-plan areas** — lighter touches for the team.',
        ],
      },
      {
        heading: '2. Decide the palette',
        body: [
          'Classic red and gold reads as festive at a glance. Brand colours can work beautifully too — a tree in your palette feels considered rather than generic. Frost and silver or bronze and champagne suit neutral, modern interiors.',
        ],
      },
      {
        heading: '3. Check the building',
        body: ['Before you book, find out:'],
        list: [
          'whether your landlord or facilities management must approve décor, especially in shared areas;',
          'when installation is allowed, and whether the service lift must be booked;',
          'any rules on lit décor or extension cables.',
        ],
      },
      {
        heading: '4. Keep it safe',
        body: [
          'Décor must never block fire exits, escape routes, sprinklers, alarms or extinguishers. Keep cables out of walkways, and follow any safety requirements set by your building. A good decorator plans around these from the start.',
        ],
      },
      {
        heading: '5. Set the budget by zone',
        body: [
          'Give each zone a share of the budget rather than one number for the whole office. It makes quotes easier to compare, and easier to scale up or down.',
        ],
      },
      {
        heading: '6. Write the brief',
        body: ['Send your decorator:'],
        list: [
          'photos or a floor plan of each zone, with ceiling heights;',
          'your palette or brand colours;',
          'access times, lift booking rules and on-site contact;',
          'your preferred installation and removal dates.',
        ],
      },
      {
        heading: '7. Book early',
        body: [
          'Decorators have limited installation slots each season, and dates close to December go first. Once you have approval and a brief, book — and book the removal date at the same time.',
        ],
      },
    ] satisfies GuideStep[],
    faqs: [
      {
        q: 'Who removes office Christmas decorations?',
        a: 'Your decorator can, if they offer removal. We do — it’s quoted separately; book the date with your installation.',
      },
      {
        q: 'Do I need building approval to decorate our office?',
        a: 'Often, yes, especially for shared lobbies. Check with your landlord or facilities management before installation.',
      },
    ] satisfies Faq[],
  },
}

/* ──────────────────────────────── Services hub ──────────────────────────────── */

export const servicesHub = {
  meta: {
    title: 'Our Christmas Décor Services: Trees, Arches & Lights',
    description:
      'Every Christmas décor service we offer in Dubai and Sharjah: trees, door arches, wreaths, lighting, stair garlands, table décor, figurines and removal.',
  } satisfies PageMeta,
  eyebrow: 'Services',
  h1: 'Christmas decoration services',
  intro:
    'Ten services, one team. Each is supplied, delivered, installed and styled by Everpine in Dubai and Sharjah — book them as part of a package, or on their own.',
  sections: [
    {
      heading: 'Trees',
      body: [
        'The centre of every package: a full, lifelike tree delivered, assembled and dressed in your palette — 2.4 m in Basic, 2.7 m in Silver, 3–3.6 m in Gold, other heights on request. Trees are supplied to keep, with seasonal rental available. See [Christmas tree installation](/services/christmas-tree-installation).',
      ],
    },
    {
      heading: 'Entrances: door arches & wreaths',
      body: [
        'A full garland arch around the front door and a matching wreath — evergreen, frosted or all-bauble — built to fit pivot, double and arched doors and glass shopfronts. Included in every package. See [door arches & wreaths](/services/door-arches-and-wreaths).',
      ],
    },
    {
      heading: 'Stairs, railings, tables & figurines',
      body: [
        'Garlands along staircases, balconies, mantels and media walls (included from Silver); runners and centrepieces for dining tables and islands, dressed vases and planters, and reindeer or nutcracker figurines (included in Gold). See [stairs & railings](/services/staircase-and-railing-decoration) and [tables, vases & figurines](/services/table-decoration-vases-figurines).',
      ],
    },
    {
      heading: 'Lighting',
      body: [
        'House lighting along rooflines, balconies and arches so a villa glows after sunset, plus lit trees, garlands and entrances. Included in Gold, or booked on its own. See [Christmas lighting](/services/christmas-lighting).',
      ],
    },
    {
      heading: 'After the season',
      body: [
        'When Christmas is over we come back, take everything down and clear it away. Quoted separately — see [post-Christmas removal](/services/christmas-decoration-removal).',
      ],
    },
  ] satisfies Section[],
}
