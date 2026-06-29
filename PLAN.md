# Vera Visa Website — Build Plan

**Stack:** Astro 5 + React 18 + Vera Visa Design System → Vercel  
**Goal:** Replace vera-visa.com word-for-word, preserving every URL and improving SEO.  
**Updated:** 2026-06-29

---

## Phase 1 — Foundation ✅
> Everything else depends on this. Get a deployed preview URL before writing any content.

- [x] `npm create astro@latest` — TypeScript, strict, no starter template
- [x] Install integrations: `@astrojs/react`, `@astrojs/sitemap`, `@astrojs/vercel`
- [x] `astro.config.mjs`: set `trailingSlash: 'always'`, `site: 'https://vera-visa.com'`, output: `'server'` (for contact form serverless function)
- [x] `tsconfig.json`: path alias `@ds` → `../Vera Visa Design System`
- [x] `src/styles/global.css`: single `@import` of DS `styles.css` (via `@ds` Vite alias)
- [x] `BaseLayout.astro`: accepts props `title`, `description`, `canonicalUrl`, `ogTitle`, `ogDescription`, `ogImage`, `ogType`, `schema`; outputs full `<head>` block with all meta + OG + Twitter + JSON-LD
- [x] `Nav.astro`: logo, nav links (Services dropdown, About, Contact), WhatsApp CTA button — matches current site nav
- [x] `Footer.astro`: Company column, Get In Touch column, WhatsApp link, office address
- [x] `vercel.json`: configure trailing slash redirects
- [ ] Push to GitHub, connect Vercel, get preview URL live
- [x] Commit: `feat: project scaffold and layout shell`

---

## Phase 2 — Service page engine ✅
> Build the shared machinery once. All 7 visa service pages use the same components.

- [x] `ServicePageLayout.astro`: wraps `BaseLayout`, accepts all SEO props + page-specific hero data
- [x] `QuickFactsStrip.astro`: `repeat(auto-fit, minmax(132px,1fr))` sand stat cards, accepts `facts: {label, value}[]`
- [x] `BenefitGrid.astro`: numbered 01–N grid, `.vv-benefit-grid` pattern, accepts `items: {title, body}[]`
- [x] `ExpertInsightCallout.astro`: sand bg, 2px signal left border, mono kicker, italic body
- [x] `CtaCallout.astro`: same visual as ExpertInsight but for conversion prompts; accepts kicker + body + link text
- [x] `ProcessComparisonCards.astro`: Route A / Route B two-column cards + stat cards below
- [x] `RelatedGuides.astro`: mono eyebrow + link list with `→` and `border-bottom: 1px solid var(--line)`
- [x] `FinalCtaBand.astro`: `--ink` section, centred H2 + subtext + WhatsApp button
- [x] `TabBar.tsx` (React island): sticky, Plex Mono tabs, `--signal` underline, NO border-color transition, horizontal scroll on mobile, tab order: Eligibility → Requirements → Process → Benefits → Restrictions
- [x] `AccordionSection.tsx` (React island): chevron, `defaultOpen` prop, `--signal` on open
- [x] Commit: `feat: service page shared components`

---

## Phase 3 — DTV visa page (first service page) ✅
> Template is already built in the design system. Validates Phase 2 machinery.

- [x] `dtv-visa-chiang-mai.astro`: port `DTV Visa Chiang Mai/DtvVisa.dc.html` to Astro
- [x] Wire all Phase 2 components
- [x] SEO head: title, description, canonical, OG, Service schema, FAQPage schema (from accordion content), BreadcrumbList
- [ ] Verify at preview URL, check all tabs + accordions work
- [x] Commit: `feat: dtv visa page`

---

## Phase 4 — Remaining visa service pages
> Same template as DTV, swap content. Content is word-for-word from vera-visa.com.

- [ ] `retirement-visa-chiang-mai.astro` (highest traffic — do first)
  - H1: "Retirement Visa Chiang Mai"
  - Title: "Retirement Visa Chiang Mai — Requirements, Cost & Guide 2026 | Vera Visa" 
  - Description: "At Vera Visa, we understand all Thai retirement visa requirements for 2026, ensuring you spend your time enjoying the mountains and cafes rather than stuck in paperwork."
  - OG title: "Retirement Visa Chiang Mai 2026 — Requirements, Cost & Full Guide | Vera Visa"
  - Sections from crawl: Benefits (6 cards), Quick Facts, Eligibility tab, Requirements tab, Process tab (In-Person + E-Visa routes), Benefits tab (+ dark pricing card), Restrictions tab (FAQ accordions), Related Guides
- [ ] `guardian-visa-chiang-mai.astro`
- [ ] `volunteer-visa-chiang-mai.astro`
- [ ] `ed-visa-chiang-mai.astro`
- [ ] `marriage-visa-chiang-mai.astro`
- [ ] `business-visa-chiang-mai.astro`
- [ ] Commit per page: `feat: [visa-type] service page`

---

## Phase 5 — Marketing pages

- [ ] `index.astro` (homepage)
  - Title: "Visa Agent Chiang Mai — DTV, Retirement, ED & Marriage Visas | Vera Visa" (≤65 chars)
  - Description: "Vera Visa Agency helps expats, retirees, and remote workers get legal visa status in Chiang Mai. Free consultation — handled end to end."
  - Sections (from homepage H-tag crawl): Hero (status card), Services grid (6 visa type cards), 4-step Process, Testimonial (Yi Mon Thant, 5 stars), Who We Serve (6 audience segments), Contact CTA
  - Structured data: LocalBusiness, WebSite, BreadcrumbList
- [ ] `about.astro`
  - Title: "About Vera Visa Agency Chiang Mai"
  - Description: "Learn more about Vera Visa Agency Chiang Mai. Stress-free visa solutions for long stays in The Land of Smiles with a team that cares."
  - Team: Pupae, Tofu & Big (co-founders)
  - Office: Icon Park Hotel, 310 2F Room 215, Chiang Mai
- [ ] `visa-agent-chiang-mai.astro`
  - Title: "Visa Agent Chiang Mai — Thailand Visa Services You Can Trust | Vera Visa"
  - Description: "Vera Visa is Chiang Mai's specialist visa agency. We handle the paperwork, the appointments, and the follow-ups — so you can focus on enjoying Thailand."
- [ ] Commit: `feat: homepage, about, visa-agent pages`

---

## Phase 6 — Blog / guide articles

- [ ] Astro content collections: `src/content/config.ts` with `blog` collection schema (title, description, ogTitle, ogDescription, publishedTime, modifiedTime, ogImage)
- [ ] `BlogLayout.astro`: extends BaseLayout, adds Article schema, published date, related guides sidebar
- [ ] Individual page files (each renders its MDX via BlogLayout):
  - [ ] `retirement-visa-americans.astro` + `content/blog/retirement-visa-americans.mdx`
    - Title: "Thailand Retirement Visa for US Citizens 2026"
    - Description: "American citizens: get your Thailand retirement visa in Chiang Mai. Does your US income qualify? Social Security, IRA withdrawals, step-by-step process."
  - [ ] `retirement-visa-australians.astro` + `content/blog/retirement-visa-australians.mdx`
    - Title: "Thailand Retirement Visa for Australians 2026"
    - Description: "Australian retirees: get your Thailand retirement visa. Does your Age Pension qualify? Super withdrawals, health insurance, Chiang Mai application steps."
  - [ ] `dtv-visa-americans.astro` + `content/blog/dtv-visa-americans.mdx`
    - Title: "Thailand DTV Visa for Americans 2026"
  - [ ] `volunteer-visa-thailand.astro` + `content/blog/volunteer-visa-thailand.mdx`
    - Title: "How the Non-O Visa Works for Long-Term Volunteers"
  - [ ] `marriage-visa-thailand-cost.astro` + `content/blog/marriage-visa-thailand-cost.mdx`
    - Title: "Marriage Visa Thailand Cost — What It Really Costs in Chiang Mai"
- [ ] `category/volunteer-visa.astro`: lists all volunteer visa content (preserves the indexing `/category/volunteer-visa/` URL)
- [ ] Commit: `feat: blog engine and guide articles`

---

## Phase 7 — Features

- [ ] `ContactForm.tsx` (React island, `client:idle`)
  - Primary: WhatsApp CTA button with pre-filled message
  - Secondary: name + email + message form → Vercel serverless function (`src/pages/api/contact.ts`) → email
- [ ] `GoogleReviews.tsx` (React island, `client:visible`)
  - Static seed data from current site reviews (Yi Mon Thant + others)
  - Overall rating: 5 stars on Google, display as star row + review cards in Testimonial style
  - Upgrade path: Google Places API (add later, no component interface change needed)
- [ ] Structured data pass: audit every page for missing schemas, add FAQPage to all accordion pages
- [ ] `sitemap.xml.ts`: programmatic sitemap, `changefreq: 'monthly'` for service pages, `'weekly'` for homepage
- [ ] `robots.txt.ts`: allow all, disallow `/api/`, point to sitemap
- [ ] Commit: `feat: contact form, reviews widget, sitemap, robots`

---

## Phase 8 — QA & launch prep

- [ ] Core Web Vitals baseline run (Vercel Analytics or PageSpeed Insights)
- [ ] Check every page title ≤65 chars, every description 120–158 chars
- [ ] Validate all structured data via Google's Rich Results Test
- [ ] Confirm canonical tag on every page matches the exact URL
- [ ] Map any legacy WordPress URLs that may have inbound links: `/wp-content/`, `/feed/`, `/wp-json/` → return 404 gracefully (Astro does this by default)
- [ ] Submit sitemap to Google Search Console on DNS cutover
- [ ] Monitor Google Search Console for coverage errors for 2 weeks post-launch
- [ ] Commit: `chore: launch QA pass`

---

## URL map (complete — must all return 200)

| URL | Page file | Status |
|---|---|---|
| `/` | `pages/index.astro` | ⬜ |
| `/about/` | `pages/about.astro` | ⬜ |
| `/visa-agent-chiang-mai/` | `pages/visa-agent-chiang-mai.astro` | ⬜ |
| `/dtv-visa-chiang-mai/` | `pages/dtv-visa-chiang-mai.astro` | ⬜ |
| `/retirement-visa-chiang-mai/` | `pages/retirement-visa-chiang-mai.astro` | ⬜ |
| `/guardian-visa-chiang-mai/` | `pages/guardian-visa-chiang-mai.astro` | ⬜ |
| `/volunteer-visa-chiang-mai/` | `pages/volunteer-visa-chiang-mai.astro` | ⬜ |
| `/ed-visa-chiang-mai/` | `pages/ed-visa-chiang-mai.astro` | ⬜ |
| `/marriage-visa-chiang-mai/` | `pages/marriage-visa-chiang-mai.astro` | ⬜ |
| `/business-visa-chiang-mai/` | `pages/business-visa-chiang-mai.astro` | ⬜ |
| `/retirement-visa-americans/` | `pages/retirement-visa-americans.astro` | ⬜ |
| `/retirement-visa-australians/` | `pages/retirement-visa-australians.astro` | ⬜ |
| `/dtv-visa-americans/` | `pages/dtv-visa-americans.astro` | ⬜ |
| `/volunteer-visa-thailand/` | `pages/volunteer-visa-thailand.astro` | ⬜ |
| `/marriage-visa-thailand-cost/` | `pages/marriage-visa-thailand-cost.astro` | ⬜ |
| `/category/volunteer-visa/` | `pages/category/volunteer-visa.astro` | ⬜ |

---

## SEO checklist per page type

### Every page
- [ ] `<title>` ≤65 chars, includes primary keyword
- [ ] `<meta name="description">` 120–158 chars, natural sentence
- [ ] `<link rel="canonical">` = exact URL
- [ ] `og:title`, `og:description`, `og:url`, `og:image`, `og:type`
- [ ] `twitter:card = summary_large_image`
- [ ] `BreadcrumbList` JSON-LD (all except homepage)

### Visa service pages (additional)
- [ ] `Service` JSON-LD: name, description, provider (LocalBusiness), areaServed
- [ ] `FAQPage` JSON-LD: one entry per accordion row

### Homepage
- [ ] `LocalBusiness` JSON-LD: name, address, telephone, url, openingHours
- [ ] `WebSite` JSON-LD with potentialAction searchbox

### Blog/guide articles
- [ ] `Article` JSON-LD: headline, datePublished, dateModified, author, publisher

---

## Known SEO improvements over current WP site

| Issue | Current | New site |
|---|---|---|
| Homepage title length | 95 chars (too long) | ≤65 chars |
| Homepage meta description | Bare list of service names | Natural descriptive sentence |
| Duplicate meta tags | Yes (WP/Yoast artefact) | No (Astro single source) |
| Structured data | None | LocalBusiness + Service + FAQPage + Article + BreadcrumbList |
| Render-blocking scripts | 7 (WordPress plugins) | 0 |
| HTML content rate | 0.8% (WordPress bloat) | ~15–25% (lean Astro output) |

---

## WhatsApp number
> Replace `66XXXXXXXXX` with the real number before launch.  
> Current placeholder used across all CTA buttons.

---

## Notes / decisions log

**2026-06-29** — Phase 1 complete. Scaffold built manually (not via CLI) to keep non-interactive. Key deviations from plan:
- DS CSS imported via Vite `@ds` alias + `server.fs.allow` rather than a raw relative path — Vite's root restriction blocks imports outside the project dir without this.
- Nav dropdown implemented with CSS `:hover`/`:focus-within` rather than React state — avoids hydration cost for a purely navigational element. A React island can replace it later if mobile drawer UX is needed.
- `src/content.config.ts` created alongside the file structure (not in Phase 6 plan) to suppress Astro deprecation warnings for the auto-generated blog collection.
- Astro 5.18.2 installed; `@astrojs/vercel` v8 uses a unified adapter (no `/serverless` suffix).

**2026-06-29** — Project initialised. Plan agreed. Key decisions:
- Blog/guide articles stay at root-level URLs (no `/blog/` prefix) to preserve SEO equity
- `/category/volunteer-visa/` replicated as real Astro page (not 301 redirected) — it's indexing
- Google Reviews: static seed data at launch, Places API upgrade later
- Contact form: Vercel serverless function, no third-party service
- No CMS — content in `.astro` + `.mdx` + TypeScript data files
