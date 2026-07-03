---
target: src/pages/thailand-visa-for-americans.astro,src/pages/thailand-visa-for-australians.astro,src/pages/thailand-visa-for-canadians.astro,src/pages/thailand-visa-for-uk-citizens.astro
p0_count: 1
p1_count: 4
timestamp: 2026-07-03T08-18-17Z
slug: src-pages-thailand-visa-for-canadians-astro
---
# Nationality Hub Pages — Critique Snapshot

Pages: thailand-visa-for-americans.astro, thailand-visa-for-australians.astro, thailand-visa-for-canadians.astro, thailand-visa-for-uk-citizens.astro

## Assessment B (deterministic + browser) — clean baseline
Detector: zero findings across all 4 files. No recurrence of the sitewide `1.4fr 1fr` grid bug. No console errors, no failed network requests, no mobile horizontal overflow. No React islands on these pages (static Astro), so no tab/accordion regressions possible.

## Assessment A (design judgment) — fixes applied

### Canadians page (most issues found)
- **P0 — Fixed.** Hero CTA (`.hub-cta`) used raw `--signal` as body-size text-link color with only a border-bottom, violating the DS's own documented WCAG AA rule (raw Visa Stamp Orange fails AA at body size — that's why `--signal-deep`/`--signal-deeper` exist). Rebuilt as the filled-pill button (`background: var(--signal); color: var(--paper)`) matching all 3 sibling pages.
- **P1 — Fixed.** `.other-link` was a locally-forked duplicate of the shared `.vv-link` utility used by the other 3 pages. Swapped all 3 usages to `.vv-link` and deleted the dead CSS rule.
- **P1 — Fixed.** DTV and Retirement sections had no nationality-specific deep-link (unlike siblings). Added a link to `/retirement-visa-canadians/` (confirmed this guide page exists) + the general service page; DTV has no Canada-specific guide yet, so linked only to the general `/dtv-visa-chiang-mai/` service page.
- **P2 — Fixed.** Marriage Equality Act date was stated twice inconsistently in the same paragraph ("22 January 2025" then a parenthetical "23 January 2025"). Removed the duplicate parenthetical and kept the correct date (23 January, matching sibling pages).
- **P2 — Fixed.** Marriage section was missing the "Full marriage visa guide →" link present on all 3 sibling pages. Added it.

### UK citizens page
- **P1 — Fixed.** The O-X visa had its own table row and its own "which visa fits you" situation card, but was only introduced as a trailing sentence inside the O-A Retirement section's prose — an information-architecture inconsistency. Gave it its own subsection (`visa-label` + `visa-h2` + `visa-facts`), matching how DTV/Retirement/Marriage are each presented.
- **P1 — Fixed.** The at-a-glance table promised "every long-stay Thailand visa for UK nationals" but omitted the Volunteer visa, present on all 3 sibling pages' tables and in this page's own "Other long-stay options" grid. Added the Volunteer row.

### Americans & Australians pages
- **P2 — Fixed.** Each page's "considerations" list restated its FAQ answers almost verbatim with no new information. Rewrote both lists as action-oriented preparation checklists ("start your FBI/AFP check early," "lock in compliant health insurance before you apply," etc.) so the FAQ stays purely declarative reference and the considerations list adds sequencing/action value instead of duplicating facts.

### Not changed (documented, not blocking)
- Cross-page: none of the 4 pages reuse `FinancialRoutes`/`RequirementNote`/`BenefitsSplit` — each has its own local `.fact`/`.visa-facts`/`.situation-card` CSS. Currently renders correctly and consistently across all 4; flagged as a future extraction candidate (a `FactRow.astro`-style component) if these pages need further edits, not urgent since it isn't broken today.
- Minor P3 nitpicks (heading-copy divergence, THB-to-GBP rounding precision) left as-is — cosmetic, non-blocking.

## Verification
- Detector clean (`detect.mjs`) on all 4 files after fixes.
- Browser-verified: Canadians CTA renders as filled button (`rgb(237,92,13)` bg / white text, confirmed via computed styles) at desktop and mobile; all 7 vv-link instances render correctly with zero stale `.other-link` references; UK page's O-X subsection and 7-row table (including Volunteer) render correctly; no console errors on any of the 4 pages; no mobile horizontal overflow (375px width, scrollWidth === clientWidth on both Canadians and UK pages).
