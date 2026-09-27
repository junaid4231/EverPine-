# Everpine Events — website

Production website for **Everpine Events**, a Christmas décor supply & installation service in Dubai and Sharjah.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · CSS Modules + design tokens · WhatsApp enquiries (no email service) · Vercel Analytics
- **Rendering:** every page is statically generated at build time. The only server code is the quote-form server action, the 404 catch-all and a small `proxy.ts` that serves English without a `/en` prefix.
- **Content:** all copy lives in typed files under `content/en/`, and all business facts live in `lib/site-config.ts`. No CMS: for ~20 pages edited a few times a year, typed files are faster, safer and free.

---

## Quick start

```bash
npm install
cp .env.example .env.local      # fill in values (see below)
npm run dev                     # http://localhost:3000
npm run check                   # typecheck + lint + build + SEO/schema validation
```

Requires Node 20.9+.

## Deploy to Vercel

1. Push this folder to a GitHub/GitLab repo and **Import** it in Vercel. The framework (Next.js) is auto-detected, so no settings need changing.
2. In **Settings → Environment Variables** (Production), add:

| Variable | Required | Example / notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | `https://www.everpineevents.ae`, the canonical domain with no trailing slash. **The production build fails on purpose if this is missing or a placeholder**, so canonicals can never point at localhost. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes (for enquiries) | e.g. `+971501234567`. Turns on all WhatsApp buttons; the quote form sends a prefilled WhatsApp message. |
| `NEXT_PUBLIC_PHONE_NUMBER` | Optional | A different number for "Call" buttons. |
| `GOOGLE_SITE_VERIFICATION` | Optional | Search Console HTML-tag token (content value only) |
| `NEXT_PUBLIC_GA_ID` | Optional | `G-XXXXXXX`. When set, a consent banner appears and GA4 loads only after acceptance. |

3. Add the domain in **Settings → Domains**. Pick www or the bare domain as primary and set the other (plus the `*.vercel.app` alias) to **redirect** to it.
4. Deploy. Preview deployments are automatically `noindex`, and robots.txt disallows crawling on them. Only `VERCEL_ENV=production` on the real domain is indexable.
5. Enable **Analytics** in the Vercel project (Web Analytics).

Hosting somewhere other than Vercel? Set `SITE_INDEXABLE=true` on the one production host. Without it the site stays `noindex`.

## Editing content

| What | Where |
|---|---|
| Phone / WhatsApp (shows every call & WhatsApp button once set) | `lib/site-config.ts` → `phone`, `whatsapp` |
| Package prices, tree heights, contents | `lib/site-config.ts` → `packages` |
| Season mode (booking / in-season / off-season) | `lib/site-config.ts` → `season.mode` (`'auto'` derives it from the date) |
| Social links, legal name | `lib/site-config.ts` |
| Page copy, FAQs, guides | `content/en/pages.ts`, `content/en/services.ts`, `content/en/common.ts` |
| Image alt text & captions, gallery tags | `content/en/images.ts` |
| Add / replace a photo | Put a JPG (≤2000 px long edge) in `assets/images/` with a descriptive kebab-case name, add it to `lib/images.ts` and `content/en/images.ts` |
| Privacy policy | `content/en/pages.ts` → `privacy` (set `legalReviewed: true` after legal review) |

Inline markup in content strings: `[link text](/path)` and `**bold**`.

Everything marked `// TODO: confirm with client` is a working assumption. See `CLIENT-CONFIRMATIONS.md`.

> **Note:** the season copy and footer year are computed at **build time**. Redeploy at least once a year (e.g., each August) so "Christmas {year}" stays current; the annual content refresh in `SEO-STRATEGY.md` covers this.

## Adding Arabic later

Routing already runs through `app/[locale]`, and hreflang/sitemap/`<html dir>` are locale-aware.

1. Create `content/ar/` with the same exports as `content/en/` (TypeScript will flag anything missing).
2. Add `'ar'` to `locales` in `lib/i18n.ts` and register it in `content/index.ts`.
3. Add an Arabic font pair in `app/fonts.ts` (IBM Plex Sans Arabic + Noto Naskh Arabic recommended).

Arabic pages will live at `/ar/...` with `dir="rtl"`.

## Project map

```
app/[locale]/…          pages (home, packages, services, cities, gallery, guides, contact, …)
app/og/[locale]/[key]   build-time 1200×630 social images
app/sitemap.ts · robots.ts · manifest.ts · icon.svg · apple-icon.png
components/             UI (Collection, ServicesIndex, Plates, PageHero, QuoteForm, TreeCalculator, …)
content/en/             all copy, typed
lib/site-config.ts      business facts & flags
lib/seo.ts · schema.ts  metadata + JSON-LD builders
proxy.ts                serves English at / (rewrite) and 308s /en/* to the unprefixed URL
scripts/validate-schema.mjs  post-build SEO/schema/privacy checks
```

## Quality gates

`npm run check` runs:

- `tsc --noEmit`
- ESLint (Next core-web-vitals + TypeScript rules)
- the production build
- `scripts/validate-schema.mjs`, which checks:
  - every JSON-LD block parses and has its required properties
  - FAQ markup matches visible text
  - there is no address and no fabricated ratings, awards or opening hours in the schema
  - there is exactly one `<h1>` per page, a unique title and meta description, and a canonical on the production host
  - the private inbox never appears in client output
  - zod never ships to the browser

## Visual system

**Theme:** "Gift & Glow in a Gulf villa", a night-first design. It uses a midnight base, lamplight-gold accents, lacquer-red ribbon, and ivory sections as pauses. Tokens are in `app/globals.css`.

**Signature elements:**

- **Villa-window arch** frames on every photo (the `.arch` class, with a fine gold arch line).
- **Lights switch on:** the home hero photo opens dusk-dim and warms up (`lightsOn` in `app/[locale]/home.module.css`).
- **Hanging ornaments:** SVG baubles on threads that sway gently (`components/Ornaments.tsx`). They hang over photos, never over headlines.
- **Scroll garland:** the bulbs under the header light up as you scroll (`components/GarlandProgress.tsx`).
- **Mashrabiya lattice:** a faint gold ogee trellis in hero backgrounds (the `.lattice` class).
- **Ribbon & bow:** unwraps into the packages (`components/Ribbon.tsx`). **Gift-tag** price labels (`.gift-tag`).
- **Photo-filled word:** "Glow", filled with the villa-lights photograph (`components/PhotoWord.tsx`).
- **Palette switcher:** on the home page.
- **Cursor-following arch preview:** on the services list (desktop).
- **Services marquee** and **film grain**.
- **Scroll reveals:** `data-reveal` and `data-reveal="arch"`, driven by a tiny inline script. Content is always visible without JS, and everything respects reduced motion.

**Typography:** Cormorant Garamond (display, with gold-italic accents) and Hanken Grotesk (text).

## Provisional identity

No logo was supplied, so the wordmark ("Everpine" in Cormorant Garamond + "EVENTS") and the pine-tier "E" monogram (`components/Logo.tsx`, `app/icon.svg`, `/brand/everpine-logo.png`) are provisional. Replace them when the final logo arrives.
