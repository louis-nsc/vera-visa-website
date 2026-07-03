---
target: src/pages/visa-agent-chiang-mai.astro
p0_count: 1
p1_count: 3
timestamp: 2026-07-03T08-49-10Z
slug: src-pages-visa-agent-chiang-mai-astro
---
# Visa Agent Overview Page — Critique Snapshot

## Assessment B (deterministic + browser) — clean baseline
Detector: zero findings. No recurrence of the `1.4fr 1fr` grid bug. No console errors, no failed network requests. No React islands on this page. No mobile overflow; all grids correctly resolve to single-column at 375px.

## Assessment A (design judgment) — fixes applied

- **P0 — Fixed.** The services grid and its own heading ("Six visa types. One local team.") completely omitted the Volunteer visa — a real, linked visa type on 3+ other pages and one of the site's 7 official visa types per CLAUDE.md. This left volunteer-visa prospects with no path from this hub page. Added the 7th ServiceCard (Non-O · Volunteer Visa → /volunteer-visa-chiang-mai/), corrected the heading to "Seven visa types," and added volunteer to the ogDescription (which also omitted it).
- **P1 — Fixed.** The "why use an agent" section's document-error card stayed abstract with no concrete consequence. Added a specific cost: a rejected application means resubmitting from scratch — the visa fee paid again and 2–4 weeks lost while immigration reprocesses paperwork.
- **P1 — Fixed.** No fee/pricing framing anywhere, despite the page's entire premise being the DIY-vs-agent cost tradeoff. Added a qualitative framing line under the section heading: "Government visa fees are fixed either way — what actually varies is whether your application is right the first time."
- **P1 — Fixed.** "How we work" step 5 restated the same three obligations (90-day reports, re-entry permits, annual renewals) from the "why" section's card 4 almost verbatim two sections later. Reworded step 5 to focus on the mechanics of proactive deadline tracking instead of re-listing the same facts.
- **P2 — Fixed.** The 4 "why" cards used `01–04` numeral scaffolding implying a false sense of ranked/sequential order for content that is actually unordered — the same AI-slop-adjacent pattern already removed from BenefitGrid.astro elsewhere on the site. Removed the numerals and the dead `.why-n` CSS rule; kept ordinal numbering only on the "how we work" steps, which are genuinely sequential.
- **P2 — Fixed.** Title tag was under-optimized relative to sibling pages despite having budget to spare (33 of 65 chars used). Changed to "Visa Agent Chiang Mai | DTV, Retirement & More — Vera Visa" (58 chars).

### Not changed (documented, not blocking)
- P3: single testimonial is thin proof for a claim of "hundreds of expats... every visa type" — a copy/proof-sourcing issue, not a design defect; left as-is.
- The hero accent word and why-card numerals were flagged as a low-confidence One Stamp Rule concern by Assessment A, but resolved as moot once the why-card numerals were removed entirely per the P2 fix above.

## Verification
- Detector clean (`detect.mjs`) after all fixes.
- Browser-verified: services grid renders 7 cards including Volunteer; heading reads "Seven visa types. One local team."; `.why-n` numerals fully removed (0 found in DOM); no console errors; both `.services-grid` and `.why-grid` collapse to 1 column with no horizontal overflow at 375px mobile width.
