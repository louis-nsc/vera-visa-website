# Vera Visa Website — Claude Code Context

## What this project is
A full rebuild of **vera-visa.com** (a visa agency in Chiang Mai, Thailand) using Astro + React + the Vera Visa Design System, deployed to Vercel.

The goal is a pixel-perfect, SEO-preserving replacement for the current WordPress site. Every existing URL must return 200 with matching or improved meta tags. No CMS — content lives in `.astro` pages and `.mdx` files.

## Design system location
`../Vera Visa Design System/` — read `readme.md` and `SKILL.md` there before touching any UI. The DS exports:
- CSS tokens via `styles.css` (import this once in `src/styles/global.css`)
- React components (Button, Eyebrow, StatusDot, StatusCard, ServiceCard, ProcessSteps, Testimonial)
- Utility classes: `.vv-cta`, `.vv-link`, `.vv-benefit-grid` etc. in `utilities.css`

Key DS rules: orange (`--signal #FF630F`) marks one thing per element, never a wash. No shadows. 4px card radius. IBM Plex Mono for eyebrows/data. Fraunces for headlines. Inter for body.

## Current build status
See `PLAN.md` — each phase has a checkbox. Check them off as phases complete.

## Tech stack
- **Astro 5** with `@astrojs/react` and `@astrojs/sitemap`
- **React 18** — islands only (interactive components: TabBar, AccordionSection, ContactForm, GoogleReviews)
- **TypeScript** throughout
- **Vercel** — `@astrojs/vercel` adapter, serverless function for contact form
- **Styling** — Vera Visa Design System CSS (no Tailwind, no CSS-in-JS)

## URL rules (non-negotiable)
All existing vera-visa.com URLs must remain at their exact slugs. Astro config uses `trailingSlash: 'always'`. Blog/guide articles live at root level (`/retirement-visa-americans/`), not under `/blog/`.

## SEO rules
- Every page needs: `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG tags, Twitter card
- Structured data per page type: LocalBusiness (homepage/about), Service (visa pages), FAQPage (accordion content), BreadcrumbList (inner pages), Article (blog posts)
- Fix vs. current WP site: homepage title was 95 chars (fix to ≤65), meta description was a bare service list (replace with real sentence), no structured data existed at all

## Key content
- **Visa types**: DTV, Education (ED), Marriage, Retirement, Guardian, Business/Work Permit, Volunteer (Non-O)
- **Team**: Pupae, Tofu & Big (co-founders)
- **Office**: Icon Park Hotel, 310 2F, Room 215, Chiang Mai
- **Primary CTA everywhere**: WhatsApp (`https://wa.me/66XXXXXXXXX`) — "Chat on WhatsApp →"
- **WA number**: update the placeholder `66XXXXXXXXX` with the real number before launch

## Component conventions
- Static, layout-only components → `.astro`
- Interactive (state, events) → `.tsx` with `client:load` or `client:idle` or `client:visible`
- Design system components port to Astro using the same class names and token variables
- Never hardcode hex colours — always use DS CSS variables (`var(--ink)`, `var(--signal)`, etc.)

## Directory structure
```
src/
  components/
    core/         Button.astro, Eyebrow.astro, StatusDot.astro
    patterns/     StatusCard.astro, ServiceCard.astro, BenefitGrid.astro, ...
    sections/     QuickFactsStrip.astro, RelatedGuides.astro, FinalCtaBand.astro
    interactive/  TabBar.tsx, AccordionSection.tsx, ContactForm.tsx, GoogleReviews.tsx
    layout/       Nav.astro, Footer.astro
  content/
    config.ts
    blog/         *.mdx (guide articles)
  data/           services.ts, testimonials.ts, navigation.ts
  layouts/        BaseLayout.astro, ServicePageLayout.astro, BlogLayout.astro
  pages/          one .astro file per URL
  styles/         global.css (imports DS styles.css)
```
