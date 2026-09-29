# Everpine Events — SEO audit & action plan (29 Sept 2026)

**Goal:** top 3 in Dubai for "Christmas decoration Dubai", "Christmas decorators Dubai" and related terms, in time for bookings (Oct–Dec 2026).

## 1. The honest picture

**The site is technically excellent and not yet live.** It isn't indexed. A search for "Everpine Events" finds only the GitHub repo. The domain, phone and WhatsApp number are still unset, and there is no Google Business Profile and there are no reviews. Until the site is launched, Google can't rank a single page.

**What "top 3" means for these keywords:**

- **The map pack (3 local results).** This is fastest to win. It shows for "Christmas decorators near me" and often for "Christmas decorators Dubai". It is driven by the **Google Business Profile**, its category, reviews, photos and proximity, not by the website. A new profile with 10–20 genuine reviews and weekly posts can appear there within weeks.
- **Organic top 3.** This is realistic within this season for the long-tail and modifier terms: villa, luxury, office, Sharjah, prices, packages, tree installation. For the head terms ("Christmas decoration Dubai", "Christmas decorators Dubai") on a brand-new domain with no backlinks, expect **page 1 in weeks to a few months**. Top 3 depends on links and reviews. Nobody can promise top 3 on a new domain in one month, and anyone who does is selling link spam that gets sites penalised.
- **Google Ads.** This is the only way to be guaranteed at the top of the page next month. A small Search campaign on these exact keywords, from mid-October to 20 December, covers the gap while organic rankings build.

## 2. Who ranks today (live search, 29 Sept 2026)

| Competitor | Page | What they do | Weakness |
|---|---|---|---|
| Bella Entertainment | /professional-christmas-decorators-in-dubai/ | ~2,200 words; H1 and title exact-match "Professional Christmas Decorators Dubai"; events and corporate focus | No prices, no FAQs, generic imagery |
| AtDoorStep | /dubai/christmas-decoration | ~3,500 words, 10 FAQs, area list, "from AED 199" | Marketplace; 0 reviews on the page |
| Handyman-Dubai | /christmas-decoration-dubai | ~2,800 words, exact-match H1 | Handyman firm; no portfolio, no prices |
| Irony Home | home + service page | Brand authority (shop), luxury positioning | Service page thin (~900 words), no prices |
| Others | duo-star, balloondekor, hopeplants, shrihmanagement, Hafla | Generalists | Christmas is one page among many |

**Our edge:**

- We are the only specialist with **published prices**.
- We have a **real portfolio** of 32 installation photos.
- We have **dedicated pages** for each intent.

**Our gap:**

- **Authority:** zero links, zero reviews, no GBP.
- **Page depth:** the Dubai page was about 575 words before this work.

## 3. On-site changes made today

| # | Change | Why |
|---|---|---|
| 1 | **New page `/villa-christmas-decoration-dubai`**: villa composition, exterior lights, double-height trees, 16 villa communities, 5 FAQs, Service + FAQ + Breadcrumb schema | Targets "Villa Christmas decorators Dubai"; no competitor has a villa page |
| 2 | **New page `/luxury-christmas-decoration-dubai`**: bespoke approach, palettes, statement trees, process, 4 FAQs | Targets "Luxury Christmas decoration Dubai" |
| 3 | **Dubai page rebuilt** as the "Christmas decorators" page: H1 "Christmas decorators in Dubai"; 8 sections (what decorators do, villas, apartments, office decorators, luxury, **prices**, when to book, how booking works); "Christmas decorators near you in Dubai" areas block; FAQs grown from 4 to 8 (cost, near me, best for villas, what's supplied, offices, when to book) | Targets decorators / decorator / services / professional / near me. Now ~1,300 words of specific, useful copy |
| 4 | **Home:** title now leads with the head term, "Christmas Decoration Dubai \| Christmas Decorators · Everpine". New crawlable section "Professional Christmas decorators in Dubai" (~250 words), linking every landing page with keyword anchors. Services H2, areas H2 (previously hidden) and FAQ H2 now carry keywords | Home is the strongest page, so it holds the head term and "company" |
| 5 | **Commercial page:** title and H1 now "Office Christmas decorators in Dubai (and Sharjah)"; audience H2s now descriptive ("Office Christmas decoration" and so on); 2 new FAQs | Targets "Office Christmas decorators Dubai" |
| 6 | **Services hub:** title "Christmas Decoration Services in Dubai & Sharjah", H1 "…in Dubai" | Targets "Christmas decoration services Dubai" |
| 7 | **Schema:** the LocalBusiness now has `knowsAbout`, `slogan` and a `hasOfferCatalog` listing all 9 services and landing pages | Stronger entity signal for Google and AI answers |
| 8 | **Image sitemap:** all visible gallery photos added to `sitemap.xml` | Google Images traffic for "Christmas decoration ideas Dubai" |
| 9 | **Internal links:** new pages added to the footer, mobile menu, sitemap, OG images, and the Dubai, home and luxury/villa cross-links. City/landing pages show a "related" link list | Passes authority to the new pages; no orphans |
| 10 | `contentUpdated` set to 2026-09-29, so the sitemap `lastmod` is fresh | Recrawl signal |

**Keyword → page map (no cannibalisation)**

| Keyword | Page |
|---|---|
| Christmas decoration Dubai · Christmas decoration company Dubai | `/` |
| Christmas decorators Dubai / in Dubai / decorator Dubai / professional / near me | `/christmas-decoration-dubai` (plus GBP for "near me") |
| Christmas decoration services Dubai | `/services` (and Dubai page) |
| Villa Christmas decorators Dubai | `/villa-christmas-decoration-dubai` |
| Luxury Christmas decoration Dubai | `/luxury-christmas-decoration-dubai` |
| Office Christmas decorators Dubai | `/commercial-christmas-decor` |
| Christmas decoration price / packages Dubai | `/packages` |

**Verified:**

- The production build passes.
- TypeScript and ESLint are clean.
- `validate-schema` passes on 21 pages and 42 JSON-LD blocks. That covers exactly one H1 per page, unique titles ≤70 characters and unique descriptions.
- The sitemap has 21 URLs plus image entries.

## 4. What only you can do. Priority order, starting this week

1. **Launch the site on the real domain (today or tomorrow).** In Vercel set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, and optionally `NEXT_PUBLIC_PHONE_NUMBER`, then redeploy. Every day unindexed is a day lost. The phone number also matters for ranking: it appears in the schema and footer and should match GBP exactly.
2. **Search Console.** Verify the domain, submit `sitemap.xml`, and use URL Inspection → *Request indexing* on:
   - `/`
   - `/christmas-decoration-dubai`
   - `/villa-christmas-decoration-dubai`
   - `/luxury-christmas-decoration-dubai`
   - `/commercial-christmas-decor`
   - `/packages`

   Do the same in Bing Webmaster Tools; it also feeds ChatGPT and Copilot answers.
3. **Google Business Profile (the biggest lever for "near me" and the map pack).**
   - Set it up as a service-area business covering Dubai and Sharjah, with the primary category **Interior decorator**. Add the secondary categories from `LAUNCH-KIT.md`.
   - Add all 10 services with prices and 10+ real photos. Post weekly.
   - Verification can take days, so **start now**.
4. **Reviews.**
   - Ask every past Everpine client for a Google review this week. Past seasons' clients count.
   - Target 10 by mid-October and 25+ by December.
   - Reply to each one, mentioning the service ("villa lighting", "door arch"). Review text with keywords helps the map pack.
   - Never buy or write reviews.
5. **Instagram + Facebook.** Create the profiles and send me the URLs. They go into `socials` in `site-config.ts`, so the schema `sameAs` links the brand.
6. **Citations, all with the same name, phone and website:** Apple Business Connect, Bing Places, Yellow Pages UAE, Connect.ae, 2GIS, ATN Info, dubizzle Services, Hafla vendor listing.
7. **Links: pitch now, while the Christmas guides are being written.** Pitch MyBayut, Time Out Dubai, What's On, Lovin Dubai, Sassy Mama, ExpatWoman, Curly Tales and Khaleej Times lifestyle. Aim for 5–10 real links. The templates are in `LAUNCH-KIT.md`.
8. **Google Ads, recommended for this season.**
   - Run exact and phrase match on the 11 keywords.
   - Geo-target Dubai and Sharjah, from 15 Oct to 20 Dec.
   - Send each ad group to its matching landing page. This guarantees top-of-page visibility while organic rankings build.

## 5. Don't

- Don't create per-area doorway pages (e.g. "Christmas decorators Palm Jumeirah") without a real project to show on each.
- Don't buy links or use PBNs.
- Don't add `aggregateRating` stars to the site.
- Don't stuff keywords. The copy was written for people first.

## 6. Measure

Check weekly from launch:

- Search Console → Performance → Queries, filtered for "christmas".
- GBP Insights: calls, website clicks, direction requests.
- WhatsApp clicks: the `whatsapp_click` events.

Review in mid-November and add FAQs or sections for the queries people actually use.

## 7. New assumptions for the client to confirm

- Villa-community list now also includes **Jumeirah Islands** and **The Lakes**. The luxury page lists **Bluewaters** under apartments. Remove any area you don't serve.
- The villa and luxury pages mention decorating **majlis**, **gardens** and **terraces**, plus **second trees**, all on a custom quote. Confirm you offer these.
