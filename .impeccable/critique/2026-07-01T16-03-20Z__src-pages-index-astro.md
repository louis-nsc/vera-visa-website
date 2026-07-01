---
target: homepage (src/pages/index.astro)
total_score: 35
p0_count: 0
p1_count: 1
timestamp: 2026-07-01T16-03-20Z
slug: src-pages-index-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/console-evidence agent) — re-run after polish pass

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Hamburger genuinely toggles icon/label/aria-expanded, verified live |
| 2 | Match Between System / Real World | 4 | "O · Spouse" / "O · Guardian" now unambiguous |
| 3 | User Control and Freedom | 3 | Hamburger closes cleanly; no sticky back-to-top on long mobile scroll |
| 4 | Consistency and Standards | 3 | ServiceCard fix is solid, but testimonials.ts still has "Marriage (O)" — the same ambiguity recurring in a second data source |
| 5 | Error Prevention | 4 | Honeypot, required fields, disabled-while-submitting all present |
| 6 | Recognition Rather Than Recall | 4 | Codes, THB figures, week counts all visible inline |
| 7 | Flexibility and Efficiency of Use | 3 | Testimonial show-more is good progressive disclosure; six-card mobile default is a long scroll before reaching Contact |
| 8 | Aesthetic and Minimalist Design | 4 | One Stamp Rule verified via computed styles, not just screenshot — holds up |
| 9 | Error Recovery | 3 | Good form-level fallback messaging; still no per-field inline validation |
| 10 | Help and Documentation | 3 | Copy explains jargon inline per DESIGN.md's own principle; no separate glossary |
| **Total** | | **35/40** | **Good — up from 24/40** |

## Anti-Patterns Verdict

**LLM assessment:** Not slop, unchanged verdict from the first run — the fixes made the system read more intentional, not less (the rebuilt hero stamp in particular). No new AI-slop tells introduced.

**Deterministic scan:** Clean except the two known, accepted brand-identity font exceptions (`overused-font`/`single-font` on the Google Fonts `<link>` in BaseLayout.astro). The prior `design-system-radius` finding at index.astro:327 is confirmed gone — verified by explicit re-scan with zero matches for that rule.

**Hydration mismatch:** Confirmed gone. Verified independently by both agents across multiple reload cycles — zero console warnings, versus 15 occurrences (7+8) in the original run.

**Nav responsive behavior:** Verified via live `getComputedStyle`, not just source inspection — `.nav__burger`/`.nav__links` correctly swap `display` at both 1440px and 390px.

## Overall Impression

All four things fixed in the polish pass hold up under independent re-verification: the hamburger nav is a complete, correctly-wired fix (not just present but functionally synced); the hydration bug is gone; the One Stamp Rule is genuinely respected (computed styles confirm it, not just visual impression); and the visa-code disambiguation reads cleanly in the ServiceCard grid. The re-run surfaced one real miss — the same "O" ambiguity the fix targeted still exists in `testimonials.ts`, one component fix didn't reach — plus a new tradeoff: solving the desktop testimonial-orphan problem by raising the default count to 6 created a longer mobile scroll than before.

## What's Working

1. **The hamburger fix is complete, not cosmetic** — aria-expanded/aria-label/icon-morph all verified in sync across click and resize events, independently confirmed by both agents.
2. **The One Stamp Rule discipline holds under inspection** — computed `background-color`/`color` values confirm the footer CTA is genuinely secondary and the process numerals are genuinely de-colored, not just visually close enough in a screenshot.
3. **The visa-code fix reads well in its actual context** — "O · Spouse" / "O · Guardian" stay legible at both the mono uppercase treatment and at mobile width.

## Priority Issues

**[P1] The "O" ambiguity fix didn't reach `src/data/testimonials.ts`.** Line 19 still reads `visaType: 'Marriage (O)'`, rendering as "MARRIAGE (O) · CHIANG MAI" on the second testimonial card — the same zero-confusable pattern the ServiceCard fix eliminated, two scroll-lengths below where it was fixed.
**Fix:** Rename to `'Marriage (O · Spouse)'` or simplify to `'Marriage Visa'` for consistency with other entries like `'Education (ED)'`.
**Suggested command:** `/impeccable clarify`

**[P2] Raising the testimonial default to 6 fixed the desktop orphan but lengthens the mobile scroll.** Six stacked cards (up to 574px each) between "How it works" and "Who We Serve" is a meaningfully longer low-value scroll segment on a 390px viewport than the original 3-card default.
**Fix:** Consider a viewport-aware default (e.g., 3 on mobile, 6 on desktop/tablet) via a container query or resize-aware state, rather than one fixed count for all breakpoints.
**Suggested command:** `/impeccable adapt`

**[P3] Footer address has the postal code mid-string.** `Footer.astro` renders "310 50200 Manee Nopparat Rd" (postal code between street number and street name), while the LocalBusiness schema in `index.astro` correctly separates it. Minor, but a detail-oriented visa applicant is exactly the persona likely to notice and second-guess it.
**Fix:** Reorder to "310 Manee Nopparat Rd" with the postal code on its own line, matching the schema.
**Suggested command:** `/impeccable polish`

## Persona Red Flags

**Jordan:** Mobile flow now works cleanly through Services (legible codes, working hamburger), but hits the six-card testimonial wall before reaching Contact — scroll-tax rather than added reassurance once trust is already established.

**Riley (spouse/guardian applicant):** Directly benefits from the ServiceCard fix, but hits "Marriage (O)" in testimonials two scroll-lengths later — a small regression in the exact trust dimension the fix targeted.

**Casey:** Benefits most from the hamburger fix and the de-colored process numerals (less visual noise under stress). No new red flags; shares the testimonial-length friction with Jordan.

## Minor Observations

- The mobile drawer is a static in-flow element (pushes content down) rather than a fixed overlay — a legitimate simple pattern, but doesn't dim/lock background scroll. Not observed as broken, just worth knowing it isn't a modal.
- `preview_click` (the automation tool) failed to register a click on `.nav__burger` at a resized viewport, while a JS-dispatched `.click()` on the same element worked instantly — a tool quirk, not a site bug, but worth flagging for future automated audits so a false "broken hamburger" report doesn't get filed.
- Nav dropdown and mobile drawer sub-links haven't been audited for keyboard-only tab order in this pass — same Nav.astro ships sitewide, worth a follow-up.

## Questions to Consider

1. If "specificity is a trust signal" is the core brand thesis, why do 5 of 8 testimonials fall back to generic "Visa Services" as the eyebrow instead of the reviewer's actual visa type? That's arguably a bigger specificity gap than any remaining visual item.
2. Is raising testimonial count really the right lever for the desktop-orphan problem, or would 3-4 shorter, hand-picked quotes with a per-card "read more" serve the anxious-mobile persona better than laddering the total count?
3. Now that hamburger/hydration/shadow-doctrine issues are closed on the homepage, is a sitewide sweep planned for the same "O" ambiguity and box-shadow doctrine on the visa detail pages, given this run found the ambiguity recurring in a data file a component-level fix didn't reach?
