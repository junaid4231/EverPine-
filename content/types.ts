import type { ImageId } from '@/lib/images'
import type { PackageId, PackageInclude, SeasonMode, AreaId } from '@/lib/site-config'

/**
 * Inline text supports two tiny markups, rendered by <Rich>:
 *   [link text](/path)   and   **bold**
 */
export type RichText = string

export interface Faq {
  q: string
  a: RichText
}

export interface PageMeta {
  title: string
  description: string
}

export interface Section {
  heading: string
  body: RichText[]
  list?: RichText[]
}

export interface ServiceId {
  id:
    | 'trees'
    | 'railings'
    | 'door-arches'
    | 'wreaths'
    | 'lighting'
    | 'tables'
    | 'vases'
    | 'figurines'
    | 'stairs'
    | 'removal'
}

export interface ServiceIndexEntry {
  id: ServiceId['id']
  name: string
  line: string
  /** Slug of the service page that covers it. */
  page: ServicePageSlug
  image: ImageId
}

export type ServicePageSlug =
  | 'christmas-tree-installation'
  | 'christmas-lighting'
  | 'door-arches-and-wreaths'
  | 'staircase-and-railing-decoration'
  | 'table-decoration-vases-figurines'
  | 'christmas-decoration-removal'

export interface ServicePage {
  slug: ServicePageSlug
  meta: PageMeta
  /** Short name used in nav, breadcrumbs and schema. */
  name: string
  eyebrow: string
  h1: string
  /** Phrase within h1 set in gold italic. */
  accent?: string
  intro: RichText
  hero: ImageId
  sections: Section[]
  /** Images shown between sections, with plate captions from the image registry. */
  plates: ImageId[]
  inPackages: PackageId[]
  packageNote: RichText
  faqs: Faq[]
  related: { href: string; label: string }[]
  whatsappService: string
}

export interface PackageCopy {
  name: string
  numeral: string
  tagline: string
  summary: string
  idealFor: string
  image: ImageId
  detailImage: ImageId
}

export interface ImageCopy {
  alt: string
  caption: string
  types: GalleryType[]
  palette: GalleryPalette
  /** Hide from gallery (still usable elsewhere). */
  galleryHidden?: boolean
}

export type GalleryType = 'trees' | 'entrances' | 'stairs' | 'tables' | 'lighting' | 'commercial' | 'process'
export type GalleryPalette = 'red-gold' | 'frost-silver' | 'emerald-gold' | 'bronze-champagne' | 'peppermint' | 'quiet-neutral'

export interface CityPage {
  area: AreaId
  meta: PageMeta
  h1: string
  eyebrow: string
  intro: RichText
  hero: ImageId
  sections: Section[]
  communities: { heading: string; note: RichText; groups: { label: string; items: string[] }[] }
  packageAdvice: { heading: string; items: { pkg: PackageId | 'custom'; text: RichText }[] }
  plates: ImageId[]
  faqs: Faq[]
  /**
   * Landing-page overrides. City pages (Dubai, Sharjah) leave these unset and live at
   * /christmas-decoration-<area>; audience pages (villa, luxury) set their own path.
   */
  path?: string
  /** Breadcrumb / schema name. Defaults to "Christmas decoration in <area>". */
  crumb?: string
  /** Phrase within h1 set in gold italic. Defaults to the area name. */
  accent?: string
  serviceType?: string
  ogKey?: string
  /** WhatsApp prefill. Defaults to the city message. */
  message?: string
  /** "Related" links shown under the FAQs. Defaults to the other city. */
  related?: { href: string; label: string }[]
}

export interface GuideStep {
  heading: string
  body: RichText[]
  list?: RichText[]
}

export interface SeasonCopy {
  eyebrow: string
  line: string
  ctaPrimary: string
}

export interface Dictionary {
  locale: string
  site: {
    tagline: string
    description: string
  }
  nav: {
    home: string
    packages: string
    services: string
    commercial: string
    gallery: string
    about: string
    faq: string
    contact: string
    guides: string
    dubai: string
    sharjah: string
    menu: string
    close: string
    skip: string
    primary: string
    footer: string
    breadcrumb: string
  }
  cta: {
    whatsapp: string
    whatsappShort: string
    call: string
    email: string
    quote: string
    viewPackages: string
    choose: (pkg: string) => string
    enquireForm: string
    bookEarly: string
    seeGallery: string
    readGuide: string
  }
  season: Record<SeasonMode, SeasonCopy>
  whatsappMessages: {
    general: string
    package: (name: string, price: string) => string
    service: (service: string) => string
  }
  packages: {
    heading: string
    intro: string
    includeLabels: Record<PackageInclude, string>
    items: Record<PackageId, PackageCopy>
    priceNote: string
    included: string
    notIncluded: string
    heightLabel: string
    ceilingLabel: string
    whatArrives: string
    from: string
  }
  servicesIndex: ServiceIndexEntry[]
  servicePages: ServicePage[]
  images: Record<ImageId, ImageCopy>
  gallery: {
    typeLabels: Record<GalleryType, string>
    paletteLabels: Record<GalleryPalette, string>
    all: string
    filterBy: string
    showing: (n: number) => string
  }
  areas: Record<AreaId, string>
  footer: {
    statement: string
    servicesHeading: string
    areasHeading: string
    companyHeading: string
    contactHeading: string
    contactPending: string
    legal: string
    privacy: string
    provisional: string
  }
  form: FormCopy
  ui: UiCopy
  consent: {
    text: string
    accept: string
    decline: string
    privacyLink: string
  }
}

export interface FormCopy {
  heading: string
  intro: string
  fields: {
    name: string
    phone: string
    email: string
    area: string
    propertyType: string
    package: string
    date: string
    dateHint: string
    message: string
    messagePlaceholder: string
    optional: string
  }
  propertyTypes: Record<PropertyType, string>
  packageOptions: Record<PackageId | 'custom', string>
  submit: string
  sending: string
  privacyNote: RichText
  success: { heading: string; body: string }
  whatsapp: {
    submit: string
    successHeading: string
    successBody: string
    open: string
    greeting: string
    labels: { name: string; phone: string; email: string; area: string; propertyType: string; package: string; date: string; notes: string }
  }
  errors: {
    generic: string
    rateLimited: string
    notConfigured: string
    required: string
    email: string
    phone: string
    date: string
    tooLong: string
  }
}

export interface UiCopy {
  closingDefault: string
  threeCompositions: string
  chooseComposition: [string, string]
  tree: string
  removalLink: string
  treeSizeLink: string
  questions: string
  related: string
  alsoIn: string
  faq: string
  allQuestions: string
  houseLighting: string
  plate: string
  christmasDecorationIn: (area: string) => string
  cityFaqHeading: (area: string) => string
  questionsAbout: (topic: string) => string
  christmasDecoratorsIn: (area: string) => string
  villaDubai: string
  luxuryDubai: string
  cityMessage: (area: string) => string
  custom: string
  onQuote: string
  businessFaqHeading: string
  businessCtaHeading: string
  businessService: string
  galleryType: string
  galleryPalette: string
  galleryCtaHeading: string
  faqSections: string
  faqCtaHeading: string
  quickAnswers: string
  updated: (date: string) => string
  lastUpdated: (date: string) => string
  treeSizeGuide: string
  officeGuide: string
  treeSizeGuideShort: string
  officeGuideShort: string
  included: string
  notIncluded: string
  deliveryInstallStyling: string
  packagePrice: string
  teaserHeading: [string, string]
  compareAll: string
  newInTier: string
  finalQuote: string
  nights: string
  night: string
  xmasToday: string
}

export type PropertyType = 'villa' | 'apartment' | 'townhouse' | 'office' | 'hotel' | 'restaurant' | 'retail' | 'other'
