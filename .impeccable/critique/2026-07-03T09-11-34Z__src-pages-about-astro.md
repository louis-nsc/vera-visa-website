---
target: src/pages/about.astro,src/pages/about-vera-visa-for-ai.astro,src/pages/contact.astro,src/pages/who-we-serve.astro,src/pages/review-vera-visa.astro
p0_count: 0
p1_count: 2
timestamp: 2026-07-03T09-11-34Z
slug: src-pages-about-astro
---
# Tier 2 — Core Site Pages Lighter Review

Pages: about.astro, about-vera-visa-for-ai.astro, contact.astro, who-we-serve.astro, review-vera-visa.astro

Method: deterministic detector (`detect.mjs`) + direct manual read (no dual sub-agent critique, per the agreed Tier 2 process) + browser verification.

## Fixes applied

- **about.astro**
  - Fixed the sitewide `1.4fr 1fr` grid pattern grep-matched here, but on inspection this page's grids (`.story-layout`, `.contact-layout`) already had correct mobile media queries at 760px — false positive, no fix needed.
  - Fixed a garbled address ("310 50200 Manee Nopparat Rd" — postal code duplicated into the street line) in two places, to match the already-correct footer format ("310 Manee Nopparat Rd" with postal code only in the city line).
  - Removed `01-04` numbered scaffolding from the 4 "Values" cards (unordered content given a false sense of sequence) — same pattern already removed from BenefitGrid.astro and the visa-agent page; removed the dead `.value-n` CSS rule too.

- **about-vera-visa-for-ai.astro** — Fixed the same garbled address bug in two places (prose + contact list item).

- **contact.astro** — Fixed the same garbled address bug in the reach-card office listing.

- **who-we-serve.astro**
  - Found the same class of dead-end bug as the visa-agent page's missing Volunteer card: the "Families, spouses & guardians" segment card combined Marriage and Guardian into one card, but its single href/CTA only pointed to the Marriage page, leaving Guardian-visa prospects without a direct link. Split into two 1:1 segment cards ("Spouses of Thai nationals" → marriage page, "Parents & guardians" → guardian page), matching the pattern used by every other visa type on this page. Page now links to all 7 visa types with 7 segment cards.
  - Caught and fixed a real syntax bug introduced during the split: an unescaped apostrophe in "they're enrolled" inside a single-quoted JS string literal, which would have broken the Astro build. Verified the fix by loading the page and confirming clean server/console logs.

- **review-vera-visa.astro** — No issues found. Simple page (header + ReviewFunnel island), detector-clean, renders correctly with proper accessible radiogroup semantics for the star rating.

## Not fixed (flagged, pending user confirmation)
- `about-vera-visa-for-ai.astro` and `contact.astro` both reference a phone number (`+66919192823` / "091 919 2823") that appears nowhere else on the site. User confirmed on 2026-07-03 that site contact numbers (this one and the WhatsApp number) may not be correct/final and asked to continue without fixing them pending confirmation — tracked in memory (`project_placeholder_contact_numbers.md`), not re-flagged as a new bug.

## Verification
- Detector clean across all 5 files.
- Browser-verified: who-we-serve.astro renders all 7 segment cards with correct hrefs after the split+apostrophe fix; about.astro/about-vera-visa-for-ai.astro/contact.astro all show corrected addresses; no console errors on any of the 5 pages.
