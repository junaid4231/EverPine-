/**
 * Post-build checks over the prerendered HTML in .next/server/app:
 *  - every JSON-LD block parses and has required properties per type
 *  - FAQPage questions are visibly present on the same page
 *  - no postal address in schema; no private inbox address anywhere in client output
 *  - each page has exactly one <h1>, a canonical, a unique <title> and meta description
 * Run: npm run build && npm run test:schema
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = '.next/server/app/en'
const STATIC = '.next/static'
const errors = []
const warn = (m) => errors.push(m)

function walk(dir, ext, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p, ext, out)
    else if (p.endsWith(ext)) out.push(p)
  }
  return out
}

const htmlFiles = [join('.next/server/app', 'en.html'), ...walk(ROOT, '.html')]
const REQUIRED = {
  LocalBusiness: ['name', 'url', 'areaServed', '@id'],
  WebSite: ['name', 'url'],
  Service: ['name', 'provider', 'areaServed'],
  Offer: ['price', 'priceCurrency', 'itemOffered'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement'],
  Article: ['headline', 'datePublished', 'author', 'image'],
  ImageGallery: ['name', 'image'],
  ItemList: ['itemListElement'],
}
const titles = new Map()
const descs = new Map()
let blocks = 0

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, '')

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const page = file.replace('.next/server/app', '').replace('.html', '') || '/'
  if (/404/.test(html.match(/<title>(.*?)<\/title>/)?.[1] ?? '')) continue
  const h1s = (html.match(/<h1[\s>]/g) || []).length
  if (h1s !== 1) warn(`${page}: expected 1 <h1>, found ${h1s}`)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  if (!canonical) warn(`${page}: missing canonical`)
  const expectedHost = process.env.NEXT_PUBLIC_SITE_URL && new URL(process.env.NEXT_PUBLIC_SITE_URL).host
  if (expectedHost) {
    for (const u of html.matchAll(/"(https?:\/\/[^"\s]+)"/g)) {
      const host = new URL(u[1]).host
      if (/localhost|vercel\.app/.test(host)) warn(`${page}: URL on non-production host ${u[1]}`)
    }
    if (canonical && new URL(canonical).host !== expectedHost) warn(`${page}: canonical host ${new URL(canonical).host} ≠ ${expectedHost}`)
  }
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1]
  if (!title) warn(`${page}: missing title`)
  if (!desc) warn(`${page}: missing description`)
  if (title) { if (titles.has(title)) warn(`${page}: duplicate title with ${titles.get(title)}`); titles.set(title, page) }
  if (desc) { if (descs.has(desc)) warn(`${page}: duplicate description with ${descs.get(desc)}`); descs.set(desc, page) }
  if (title && decode(title).length > 70) warn(`${page}: title ${decode(title).length} chars (>70): ${decode(title)}`)
  if (desc && (decode(desc).length > 165 || decode(desc).length < 70)) warn(`${page}: description ${decode(desc).length} chars`)

  const visible = text(html)
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    blocks++
    let data
    try { data = JSON.parse(m[1]) } catch (e) { warn(`${page}: invalid JSON-LD (${e.message})`); continue }
    if (data['@context'] !== 'https://schema.org') warn(`${page}: missing @context`)
    const nodes = []
    const collect = (n) => {
      if (Array.isArray(n)) return n.forEach(collect)
      if (n && typeof n === 'object') { if (n['@type']) nodes.push(n); Object.values(n).forEach(collect) }
    }
    collect(data['@graph'] ?? data)
    for (const n of nodes) {
      const req = REQUIRED[n['@type']]
      if (req) for (const k of req) if (n[k] === undefined) warn(`${page}: ${n['@type']} missing ${k}`)
      if (n.address) warn(`${page}: ${n['@type']} has an address (service-area business must not)`)
      if (n['@type'] === 'Offer' && (typeof n.price !== 'number' || n.priceCurrency !== 'AED')) warn(`${page}: Offer price/currency invalid`)
      if (n['@type'] === 'Question') {
        if (!visible.includes(n.name.replace(/\s+/g, ''))) warn(`${page}: FAQ question not visible on page: "${n.name}"`)
        const ans = n.acceptedAnswer?.text ?? ''
        if (!visible.includes(ans.replace(/\s+/g, '').slice(0, 60))) warn(`${page}: FAQ answer not visible: "${ans.slice(0, 40)}"`)
      }
      for (const bad of ['aggregateRating', 'review', 'award', 'foundingDate', 'openingHours']) if (n[bad]) warn(`${page}: ${bad} present — must not be fabricated`)
    }
  }
}

// Private inbox must never ship to the browser.
const clientFiles = [...htmlFiles, ...walk(STATIC, '.js')]
for (const f of clientFiles) {
  const src = readFileSync(f, 'utf8')
  if (src.includes('skyscramper')) warn(`PRIVATE INBOX LEAKED in ${f}`)
  if (f.endsWith('.js') && /ZodError|\$ZodType/.test(src)) warn(`zod shipped to the browser in ${f}`)
}

console.log(`Checked ${htmlFiles.length} pages, ${blocks} JSON-LD blocks, ${clientFiles.length} client files.`)
if (errors.length) {
  console.error(`\n${errors.length} issue(s):\n- ` + errors.join('\n- '))
  process.exit(1)
}
console.log('All checks passed.')
