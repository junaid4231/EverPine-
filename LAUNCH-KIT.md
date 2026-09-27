# Everpine Events — Launch kit (off-site SEO)

Everything here needs the owner's own accounts, so it's written to copy, paste and verify. Fill each `[PHONE]` and `[DOMAIN]` placeholder once, identically everywhere.

**One rule for everything below:** never add reviews, client names, counts, years in business, awards or opening hours you can't prove. The same is true for any directory profile.

---

## 1. Google Search Console

The site supports verification through the `GOOGLE_SITE_VERIFICATION` environment variable.

**Recommended: domain property (covers www, non-www, http and https)**

1. Open search.google.com/search-console → **Add property** → **Domain** → enter `[DOMAIN]` without `https://` or `www`.
2. Google shows a TXT record. Add it at your domain registrar or DNS host (GoDaddy, Namecheap, Cloudflare or similar) as a **TXT** record on the root (`@`).
3. Wait a few minutes, then click **Verify**. DNS changes can take up to 24 hours.

**Alternative: URL-prefix property (HTML tag)**

1. **Add property** → **URL prefix** → `https://www.[DOMAIN]` → **HTML tag**.
2. Copy only the `content` value, e.g. `abc123XYZ`.
3. In Vercel → Project → Settings → Environment Variables (Production), add `GOOGLE_SITE_VERIFICATION = abc123XYZ`. Redeploy.
4. Click **Verify** in Search Console.

**After verifying**

1. Go to **Sitemaps** → enter `sitemap.xml` → **Submit**. The status should show **Success** with 19 discovered URLs.
2. Go to **URL Inspection** → inspect the home page → **Request indexing**. Repeat for `/packages`, `/christmas-decoration-dubai`, `/christmas-decoration-sharjah` and `/services/christmas-tree-installation`.
3. Two weeks later, check **Pages** (indexing report). Anything "Crawled – currently not indexed" can be re-requested once.
4. Four to six weeks later, check **Performance → Queries**. Replace the estimates in `SEO-STRATEGY.md` with this real data.
5. Check **Core Web Vitals** (field data) once traffic builds.

Also add the site to **Bing Webmaster Tools** (bing.com/webmasters). You can import it straight from Search Console, then submit the same sitemap.

---

## 2. Google Business Profile (GBP)

### Setup choices

- **Business type:** *Service-area business*. **Hide the address**; don't show a storefront.
- **Service areas:** Dubai, Sharjah. Add specific areas only if you want them shown (see below).
- **Website:** `https://www.[DOMAIN]`
- **Phone:** `[PHONE]`, the same number used on the website.
- **Hours:** only set hours you actually keep. If enquiries are answered any time, leave hours unset rather than inventing them.

### Categories

These are recommended categories from Google's current list. Type each one into GBP to confirm it appears for the UAE.

| Role | Category | Why |
|---|---|---|
| **Primary** | **Interior Decorator** | Closest match to decorating homes and businesses. Google has no "Christmas decorator" category. |
| Secondary | Event planner | Matches "Christmas décor for businesses / events" searches |
| Secondary | Lighting contractor | House lighting installation |
| Secondary | Party equipment rental service | Tree rental (seasonal) |
| Secondary (optional) | Christmas store | Only if customers can buy trees and décor from you as products, not just as an installed service |

Revisit this in September each year. The primary category has the most weight, so if the profile ranks poorly for "christmas decoration", test **Event planner** as primary for a season and compare the Insights.

### Business description

Paste this. It is 689 characters; the limit is 750.

> Everpine Events supplies, delivers, installs and styles Christmas décor for villas, apartments, offices, hotels, restaurants and shops in Dubai and Sharjah. Choose one of three packages — Basic (AED 5,500), Silver (AED 14,800) or Gold (AED 24,700) — or ask for a custom design. We install full Christmas trees from 2.4 m to 3.6 m, garland door arches and wreaths, staircase and railing garlands, table decoration, Christmas-themed vases and figurines, and house lighting for villa exteriors. Delivery, installation and styling are included in every package; post-Christmas removal is available separately. Trees can be bought or rented. Limited installation slots each season — book early.

### Services and prices

Add these under **Services** (Edit profile → Services).

| Service | Price to show | Description (≤300 chars) |
|---|---|---|
| Basic Christmas décor package | AED 5,500 | 2.4 m Christmas tree, cloth tree skirt, door arch and wreath. Delivery, installation and styling included. Final quote confirmed on enquiry. |
| Silver Christmas décor package | AED 14,800 | 2.7 m tree, tree skirt, gift boxes, door arch, wreath and stair decoration. Delivery, installation and styling included. |
| Gold Christmas décor package | AED 24,700 | 3–3.6 m tree, tree skirt, gift boxes, door arch, wreath, stair decoration, table decoration, figurines and house lighting. Delivery, installation and styling included. |
| Christmas tree supply & installation | No price (quote) | Trees from 2.4 m to 3.6 m and beyond, delivered, assembled and styled in your palette. Buy or rent. |
| Christmas lighting installation | No price (quote) | House lighting along rooflines, balconies and arches, plus lit trees, garlands and entrances. |
| Christmas door arches & wreaths | No price (quote) | Garland arches and wreaths for villa entrances, apartments and shopfronts. |
| Staircase & railing decoration | No price (quote) | Garlands for staircases, balustrades, balconies, mantels and media walls. |
| Christmas table decoration | No price (quote) | Runners, centrepieces, dressed vases and planters, and figurines. |
| Commercial Christmas decoration | No price (quote) | Offices, hotels, restaurants and retail in Dubai and Sharjah. |
| Post-Christmas removal | No price (quote) | We take everything down and clear it away after the season. |

### Service areas

Enter **Dubai** and **Sharjah** (the emirates or cities). GBP allows up to 20 areas. If you want to add specific communities, use ones you really serve, for example:

- Palm Jumeirah
- Emirates Hills
- Arabian Ranches
- Dubai Hills Estate
- Jumeirah
- Al Barsha
- Business Bay
- Downtown Dubai
- Al Zahia
- Aljada
- Tilal City
- Al Majaz
- Muwaileh

### First four posts

Post from September. Use "Book" or "Learn more" buttons pointing to the URLs shown. Each post should have one real installation photo.

1. **Now booking (September).** "Now booking Christmas [YEAR] installations in Dubai and Sharjah. Choose Basic, Silver or Gold — tree, door arch, wreath and more, delivered, installed and styled by our team. Limited installation slots each season." → `/packages` · Photo: villa at dusk with lights.
2. **House lighting (October).** "Make the villa glow after sunset. House lighting along rooflines, balconies and arches — included in our Gold package or booked on its own." → `/services/christmas-lighting` · Photo: villa façade with icicle lights.
3. **Door arches (October/November).** "The front door is where hospitality starts. Full garland arches and matching wreaths — evergreen, frosted or all-bauble — in every package." → `/services/door-arches-and-wreaths` · Photo: emerald & gold arch.
4. **Businesses (November).** "Offices, hotels, restaurants and shops: brief us early for reception trees, entrance arches and frontage lighting across Dubai and Sharjah." → `/commercial-christmas-decor` · Photo: tall bronze tree in a lounge.

After these, post weekly through December (new installation photos with permission, removal booking in late December, "now booking for next season" in January).

### The 10 Q&A entries

> **Note:** Google discontinued the Q&A feature on Business Profiles on 3 November 2025. Google now builds answers from your profile, your posts and your website, so these Q&As do their work in three places:
> - The site's FAQ (already built in).
> - Weave them into posts, for example one question per post in November.
> - Reuse them when answering customers on WhatsApp.

1. **How much does Christmas decoration cost?** Our packages are AED 5,500 (Basic), AED 14,800 (Silver) and AED 24,700 (Gold), with delivery, installation and styling included. Custom and commercial work is quoted individually.
2. **Which areas do you cover?** Dubai and Sharjah — villas, apartments, offices, hotels, restaurants and shops.
3. **What size Christmas trees do you install?** 2.4 m (Basic), 2.7 m (Silver) and 3–3.6 m (Gold). Other heights are quoted on request.
4. **Can I rent a Christmas tree instead of buying?** Yes. Trees are supplied to keep, and seasonal rental is available on request.
5. **Do you install outdoor Christmas lights on villas?** Yes. House lighting is included in the Gold package and can be booked on its own.
6. **Do you take the decorations down after Christmas?** Yes, post-Christmas removal is available as a separate service.
7. **When should I book?** As early as possible. Installation slots are limited each season.
8. **Do you decorate offices and restaurants?** Yes. Commercial projects are quoted individually.
9. **Can I choose the colours?** Yes: classic red and gold, frost and silver, emerald and gold, bronze and champagne, peppermint, or quiet neutrals. You can also send a photo of your room and we'll suggest a palette.
10. **How do I book?** Message us on WhatsApp or fill in the quote form at [DOMAIN]/contact with your area, property type, package and preferred date.

### Photo upload plan

Upload from the site's `assets/images` folder. These are already cropped and descriptively named. Don't geotag or caption photos with client names or addresses.

| Slot | File |
|---|---|
| **Cover** | `villa-balcony-red-bow-warm-string-lights-dusk.jpg` |
| **Logo** | `/brand/everpine-logo.png` (provisional). Download it from the live site, or crop to square: use `/icons/icon-512.png`. |
| Exterior / lighting (3) | `villa-facade-icicle-lights-reindeer-dusk.jpg`, `black-door-arch-red-white-gold-baubles-lit-reindeer-night.jpg`, `lit-garland-arch-wood-door-cone-lights-evening.jpg` |
| Entrances (4) | `emerald-gold-bauble-arch-sunburst-door.jpg`, `flocked-lit-garland-arch-wood-door-frosted-wreath.jpg`, `double-door-arch-red-bows-twin-wreaths-oversized-baubles.jpg`, `evergreen-door-arch-red-gold-baubles-wreath-white-door.jpg` |
| Interior / trees (4) | `frosted-tree-poinsettias-gift-boxes-pool-view.jpg`, `red-gold-tree-poinsettias-faux-fur-skirt-living-room.jpg`, `green-gold-tree-velvet-bow-neutral-living-room.jpg`, `tall-bronze-champagne-tree-lounge-window.jpg` |
| Stairs / tables (3) | `staircase-frosted-garland-red-gold-baubles-candles.jpg`, `onyx-counter-garland-runner-reindeer-figurines.jpg`, `table-runner-poinsettia-pinecones-marble-table.jpg` |
| Team at work (2) | `stylist-placing-red-baubles-on-tree.jpg`, `dining-centrepiece-installation-in-progress.jpg` |
| Commercial (2) | `red-bauble-arch-shopfront-evening.jpg`, `gold-lit-tree-red-bauble-base-atrium.jpg` |

**Schedule:** upload about 10 at setup, then 2–3 new photos every week from October to December. Fresh photos are a ranking and engagement signal.

---

## 3. UAE citations (directory listings)

### Standard listing

Use this identically everywhere. Consistency (the same name, phone and website on every listing) matters more than the number of listings.

```
Business name:  Everpine Events
Phone:          [PHONE]                       (same format everywhere, e.g. +971 5X XXX XXXX)
Website:        https://www.[DOMAIN]
Email:          info@[DOMAIN]
Address:        Service-area business — Dubai & Sharjah (no public address)
Category:       Christmas decoration / Interior decorator / Event decoration
Short description (≈160 chars):
  Christmas décor supplied, delivered, installed and styled for villas, homes and businesses in Dubai & Sharjah. Packages from AED 5,500.
Long description:
  Everpine Events supplies, delivers, installs and styles Christmas décor for villas, apartments, offices, hotels, restaurants and shops in Dubai and Sharjah. Three packages — Basic AED 5,500, Silver AED 14,800, Gold AED 24,700 — or a custom design: Christmas trees from 2.4 m to 3.6 m, door arches and wreaths, staircase and railing garlands, table décor, vases, figurines and villa house lighting. Delivery, installation and styling included; post-Christmas removal available separately. Limited installation slots each season — book early.
```

### Prioritised list

Check each site's current terms before submitting. Some require a trade licence, and some are paid.

| # | Where | Why | Notes |
|---|---|---|---|
| 1 | **Google Business Profile** | Map pack and "near me" | Above |
| 2 | **Apple Business Connect** (businessconnect.apple.com) | Apple Maps and Siri on iPhones, which are common in the UAE | Service area supported |
| 3 | **Bing Places for Business** | Bing, Copilot, and data used by some voice assistants | Import from GBP |
| 4 | **Instagram Business profile** + **Facebook Page** | Main discovery channels for décor in the UAE; `sameAs` in schema | Add the URLs to `socials` in `lib/site-config.ts` |
| 5 | **Yellow Pages UAE** (yellowpages-uae.com) | Long-standing UAE directory that ranks for service queries | |
| 6 | **Connect.ae** | UAE business directory | |
| 7 | **2GIS Dubai** (2gis.ae) | Map app used in the UAE | |
| 8 | **ATN Info** (atninfo.com) | UAE business directory, ranks for "decorators Dubai/Sharjah" | |
| 9 | **dubizzle** (Services section) | High UAE traffic for home services | Check the listing rules for businesses |
| 10 | **Hafla** (hafla.com) — vendor listing | UAE event marketplace that ranks for "christmas tree rental" | Only if you want marketplace leads; listing terms are set by Hafla |
| 11 | **ServiceMarket** (servicemarket.com) — partner | UAE home-services marketplace | Only if they accept seasonal décor partners |
| 12 | **Dubai Chamber** / **Sharjah Chamber** member directories | Authority citations | Only if you're a member |

---

## 4. Reviews

Google reviews are the biggest map-pack factor you control. Ask every happy customer, but never offer incentives, never write reviews yourself, and never "gate" (ask only happy customers).

**Get your review link:** GBP → **Ask for reviews** → copy the short link (`https://g.page/r/...`). Call it `[REVIEW LINK]`.

**Timing**

| When | Why |
|---|---|
| **Same evening as installation, about 2–4 hours after the team leaves** | The "wow" moment, while the house is lit and they're sending photos to family |
| **One gentle reminder 5–7 days later**, if no review yet | Guests have now seen it |
| **After removal in January** (separate, short) | Captures the full-service experience |

### WhatsApp: installation day

> Hi [First name], thank you for having the Everpine team today — we hope the house feels like Christmas tonight. 🎄
> If you have a minute, a Google review would mean a lot to a small business like ours: [REVIEW LINK]
> And if anything isn't quite right, just reply here and we'll fix it.

### WhatsApp: reminder (5–7 days)

> Hi [First name], hope you're enjoying the tree! If you get a moment this week, we'd be grateful for a quick Google review: [REVIEW LINK]. Thank you — Everpine Events

### Email: installation day

> **Subject:** Thank you from Everpine Events
>
> Dear [First name],
>
> Thank you for choosing Everpine Events. We hope you enjoy coming home to it this season.
>
> If you're happy with your installation, would you share a few words on Google? It takes a minute and helps other families and businesses in Dubai and Sharjah find us: [REVIEW LINK]
>
> If anything needs adjusting, simply reply to this email.
>
> Warm wishes,
> The Everpine team

### Email: after removal (January)

> **Subject:** All packed away — thank you
>
> Dear [First name],
>
> Everything is down and cleared away. Thank you for letting us be part of your Christmas.
> If you haven't yet, we'd love a Google review: [REVIEW LINK]. And when you're ready to plan next season, we're here.
>
> The Everpine team

**Replying:** respond to every review within 48 hours, by first name, mentioning the service ("the staircase garland"). Don't mention addresses or other clients.

**On the website:** once there are genuine reviews, you may quote them with the reviewer's permission. Don't add review stars to the site's schema; Google ignores self-served ratings for local businesses.

---

## 5. Link building

These are realistic opportunities for a new UAE décor business, in order of value per hour. Aim for 5–10 good links in the first season.

1. **Christmas guides by UAE lifestyle media.** Every autumn these outlets publish "where to buy a Christmas tree in Dubai" or "Christmas in Dubai" guides:
   - MyBayut (it already runs "Where to buy Christmas trees in Dubai" and Christmas décor ideas)
   - Time Out Dubai
   - What's On
   - Lovin Dubai
   - Grazia Middle East
   - Curly Tales
   - Khaleej Times and Gulf News lifestyle sections
   - Sassy Mama Dubai
   - ExpatWoman

   **Pitch in September–October**, before the guides are written. Offer a photo and a one-line, factual description with prices.
2. **Parent and community groups.** For example, school PTA Christmas fairs and community Facebook groups for villa communities such as Arabian Ranches, The Springs and Al Zahia. Sponsoring a school Christmas fair or decorating its stage often earns a thank-you link on the school or PTA site, plus real local word of mouth. Follow each group's rules on business posts.
3. **Venue and event partners.** Wedding and event planners, restaurant groups, hotel F&B teams, and venues that host December events. Offer to be their recommended Christmas-décor supplier, with a mutual listing on their "partners" or "suppliers" page.
4. **Adjacent trades that don't compete.** Florists, interior designers, landscapers, property managers and holiday-home operators (their guests want trees in December). Swap referrals and mutual "trusted partners" links.
5. **Supplier and brand pages.** If you use a named tree or lighting brand, ask whether they list UAE installers.
6. **Your own guides as linkable assets.** The tree-size calculator and the office décor planning guide are genuinely useful. Mention them when pitching office managers, facilities companies and parenting blogs.
7. **Local business features.** For example, Dubai SME and Sharjah entrepreneur profiles, and "small business Christmas" roundups.

**Avoid:** paid link packages, PBNs, link swaps with unrelated sites, and directories that exist only to sell links.

### Outreach template (editors and bloggers)

> **Subject:** Christmas décor installation in Dubai & Sharjah — for your festive guide
>
> Hi [Name],
>
> I enjoyed your [article title] last year. If you're updating it for Christmas [YEAR], Everpine Events might be useful to your readers: we supply, deliver, install and style Christmas décor for homes and businesses in Dubai and Sharjah — trees from 2.4 m to 3.6 m, door arches, staircase garlands and villa house lighting — with published packages from AED 5,500.
>
> Happy to share high-resolution photos of our installations and any details you need. Our site: https://www.[DOMAIN]
>
> Thank you,
> [Your name] · Everpine Events · [PHONE]

### Outreach template (venue and trade partners)

> Hi [Name], I run Everpine Events — we install Christmas trees, entrance arches and lighting for homes and businesses across Dubai and Sharjah. Many of your [clients/guests] ask about Christmas décor in December; would you be open to us being a recommended supplier, with a mutual mention on our websites? Happy to show you our recent work. — [Your name], [PHONE]

---

## 6. Launch-day checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain; production deploy succeeded
- [ ] www / non-www / `*.vercel.app` redirect to the primary domain (Vercel → Domains)
- [ ] Phone and WhatsApp number set in `lib/site-config.ts`; buttons appear site-wide
- [ ] `info@[DOMAIN]` mailbox exists and is monitored
- [ ] Resend domain verified; test the quote form end to end, and confirm the email arrives and reply-to works
- [ ] Privacy policy reviewed; `legalReviewed: true`
- [ ] Search Console verified and sitemap submitted; Bing imported
- [ ] Rich Results Test run on `/`, `/packages`, `/faq`, one service page and one guide
- [ ] PageSpeed Insights (mobile) run on `/` and `/packages` on the live domain
- [ ] GBP live with categories, services, areas, photos and first post
- [ ] Instagram and Facebook created; URLs added to `socials`
