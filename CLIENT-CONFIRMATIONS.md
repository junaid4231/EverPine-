# Everpine Events — open items for the client

Everything the site currently assumes or leaves as a placeholder. Items marked **Before launch** block going live. Each row names the file to edit, or who should change it.

## Confirmed by the client (Sept 2026)

- **Trees:** sold by default; seasonal rental also offered ("rental, but mostly sale").
- **Photos:** all 32 images used are Everpine's own installations.
- **House lighting:** included in the Gold package, and also available on its own.

## Before launch

| # | Item | Current state | Where |
|---|---|---|---|
| 1 | **WhatsApp number** | Not set — WhatsApp buttons are hidden and the quote form falls back to email | Vercel env `NEXT_PUBLIC_WHATSAPP_NUMBER` (e.g. `+9715XXXXXXXX`). Once set, every WhatsApp button appears and the quote form sends the enquiry as a prefilled WhatsApp message. Optional `NEXT_PUBLIC_PHONE_NUMBER` for a different call number |
| 2 | **Domain** | Placeholder; the production build refuses to run without it | Vercel env `NEXT_PUBLIC_SITE_URL` |
| 3 | **info@[domain] mailbox exists and is monitored** | Email is shown automatically once the domain is set | Email host |
| 4 | **Resend account + verified sending domain** | The form works but shows "temporarily unavailable" in production until this is set | Vercel env `RESEND_API_KEY`, `QUOTE_FROM_EMAIL` |
| 5 | **Privacy policy legal review** | Draft written for the UAE PDPL; a "pending review" notice is visible | `content/en/pages.ts` → `privacy`, then set `legalReviewed: true` |
| 6 | **Data retention period** for enquiries | Generic wording | `privacy` → "How long we keep it" |
| 7 | **Legal / trade-licence name** | Not shown; footer and schema use "Everpine Events" | `site-config.ts` → `legalName` |

## Working assumptions to confirm

| # | Assumption in the copy | Where |
|---|---|---|
| 8 | **Scope of house lighting in Gold**: façade/rooflines only, or also garden? Is there a size limit? | `site-config.ts` comment; `services.ts` lighting page |
| 9 | **Are tree lights included in every package?** Every photo shows lit trees, and copy says trees are "dressed — lights, baubles, picks and ribbons". | `services.ts` (tree page), `common.ts` |
| 10 | **Tree type** (artificial or real) is deliberately never stated; copy says "full, lifelike tree" | `site-config.ts` → `treeType` |
| 11 | **Rental terms**: rental is "quoted on request", and rented trees are collected at the removal visit | `services.ts` (tree + removal pages) |
| 12 | **Package prices apply in both Dubai and Sharjah** ("the same three packages are available in Sharjah") | `pages.ts` → Sharjah |
| 13 | **Clients can choose any palette within a package** (red & gold, frost & silver, emerald & gold, bronze & champagne, peppermint, quiet neutrals) | `services.ts`, `pages.ts` FAQ |
| 14 | **Custom/commercial work is quoted individually** | throughout |
| 15 | **Removal is a separate service**, quoted on request, taking down everything installed | removal page |
| 16 | **Installation process**: team delivers, assembles, dresses, walks the client through; someone must let the team in; arrival window agreed on booking | tree page, FAQ |
| 17 | **Businesses**: installation time agreed around opening hours; work to building access and safety rules | commercial page |
| 18 | **Towers**: residents book the service lift and notify building management | Dubai/Sharjah pages, FAQ |
| 19 | **Villa communities may have rules on exterior décor**, so clients should check | lighting page, city pages |
| 20 | **Areas listed on the city pages** are all areas you serve (Dubai: Palm Jumeirah, Emirates Hills … Sharjah: Al Zahia, Aljada …) | `pages.ts` → `cities` |
| 21 | **Audiences**: villas, apartments, townhouses, offices, hotels, restaurants, retail | throughout |
| 22 | **"Limited installation slots each season — book early"** (no dates or lead times stated) | `common.ts` → `season` |

## Images

| # | Item |
|---|---|
| 23 | **Café photo** (`bronze-copper-bauble-wall-illuminated-arch.jpg`) shows the café's name and logo. You've confirmed it's your work; we recommend **written permission from the café** before launch, or removing it from the commercial page and gallery. |
| 24 | `silver-gold-frosted-arch-carved-white-door.jpg` has a paper box and debris on the floor. It's kept low in the gallery only. A clean re-shoot or a professional retouch would let it lead the door-arch page. |
| 25 | `modern-entrance-silver-gold-door-arch-night.jpg` is hidden from the gallery because of floor debris. Retouch it, then remove `galleryHidden` in `content/en/images.ts`. |
| 26 | Excluded entirely: the collage (IMG_5377), the apartment tree with a person in frame (IMG_4808), and the room with personal religious items (IMG_5098). |
| 27 | `villa-balcony…dusk` and `villa-facade…dusk` appear lightly enhanced. You've confirmed they're real installations; please make sure the lighting shown is representative. |

## Brand & accounts

| # | Item | Where |
|---|---|---|
| 28 | ~~**Logo**~~ — done: the client's vector logo is now used everywhere (header, footer, favicon, app icons, social images and schema logo). | `components/Logo.tsx`, `public/brand/*` |
| 29 | **Instagram / Facebook / TikTok URLs** | `site-config.ts` → `socials` |
| 30 | **Google Analytics 4**: do you want it? If so, provide `G-XXXXXXX`. A consent banner is added automatically. | Vercel env `NEXT_PUBLIC_GA_ID` |
| 31 | **Search Console token** (if using the HTML-tag method) | Vercel env `GOOGLE_SITE_VERIFICATION` |
| 32 | **Arabic launch timing**: routing and content structure are ready | see README |
| 33 | **About page trust details**: founder or team names, trade licence, anything true and publishable. Currently it describes the approach only; nothing is invented. | `pages.ts` → `about` |
| 34 | **New landing-page areas** (29 Sept): Jumeirah Islands and The Lakes on the villa page, and Bluewaters on the luxury page. Remove any you don't serve | `pages.ts` → `landings` |
| 35 | **Custom scope named on villa/luxury pages**: second trees, majlis, gardens and terraces, and trees taller than 3.6 m, all on a custom quote | `pages.ts` → `landings` |
