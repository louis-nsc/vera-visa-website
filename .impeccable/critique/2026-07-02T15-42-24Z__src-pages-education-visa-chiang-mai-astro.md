---
target: education visa page (src/pages/education-visa-chiang-mai.astro)
total_score: 29
p0_count: 0
p1_count: 1
timestamp: 2026-07-02T15-42-24Z
slug: src-pages-education-visa-chiang-mai-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/console-evidence agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Tab underline and accordion chevron respond correctly |
| 2 | Match Between System / Real World | 3 | ED, MOE-registered, 90-day report explained inline; "Non-Imm ED" used before its gloss on first hero mention |
| 3 | User Control and Freedom | 3 | Deep-linkable tabs/accordions confirmed working (3/3 clean trials) |
| 4 | Consistency and Standards | 4 | Fully consistent with the DTV/retirement pattern library |
| 5 | Error Prevention | 3 | No forms to break; nothing to prevent errors on |
| 6 | Recognition Rather Than Recall | 2 | Benefits tab restates points already in the top-of-page BenefitGrid — three near-duplicate statements of the same facts across the page |
| 7 | Flexibility and Efficiency of Use | 2 | No routing/decision aid for "which program type am I" (Muay Thai vs. university vs. language school) |
| 8 | Aesthetic and Minimalist Design | 3 | Requirements tab lists 10 bullet items with no grouping/hierarchy |
| 9 | Error Recovery | 3 | ExpertInsightCallouts proactively flag common mistakes |
| 10 | Help and Documentation | 3 | FAQ schema is specific and useful; no on-page glossary for "MOE" at its QuickFactsStrip mention |
| **Total** | | **29/40** | **Good — recurring pattern confirmed, plus new content-architecture gaps** |

## Anti-Patterns Verdict

**LLM assessment:** Clean — no emoji, no gradient-mesh, no generic SaaS card look, no fake social proof. Copy is concrete and specific throughout.

**Deterministic scan:** Clean except the two known accepted font exceptions on BaseLayout.astro.

**Console/interaction evidence:** No hydration mismatch, no console errors, no failed network requests. Deep-linking confirmed working cleanly across 3/3 fresh trials with different tab/accordion targets.

**Real bug found and fixed during this pass:** the mobile tab-bar edge-fade cue (added in the retirement-page pass) only recalculated on `window resize` and `scroll` events, missing cases where the tab strip's own box changes size for another reason — confirmed reproducible via a CDP viewport override applied after mount. Fixed by adding a `ResizeObserver` on the tab strip element itself in `TabBar.tsx`, verified corrected on a fresh server.

## Overall Impression

This page confirms the pattern found on both retirement and DTV: the highest-stakes content (which documents you actually need, and specifically which ones matter for spotting a fraudulent "MOE-registered" claim) gets flat, undifferentiated treatment while the Benefits tab gets a bespoke layout. It also surfaces two issues unique to this page: real content redundancy across three separate surfaces saying the same things, and a missing decision path for a persona this page explicitly needs to serve (soft-power enrollee vs. academic enrollee), which have meaningfully different risk profiles the page doesn't distinguish.

## What's Working

1. **Copy craft and brand voice are excellent** — "Study your way in," and ExpertInsightCallout copy like "don't assume any school offering 'visa support' is officially approved" are calm-expert-friend tone done exactly right.
2. **FAQ schema content is specific and genuinely useful**, not boilerplate — attendance checks, 90-day increments, no-work rule.
3. **Hero/status-card/QuickFactsStrip trio is visually polished and restrained**, correctly respecting the One Stamp Rule and the DS's flat-card conventions.

## Priority Issues

**[P1] Content redundancy across three surfaces.** "No income/savings requirement" and "renewable each term" are each said 2-3 times in near-identical language across QuickFactsStrip, BenefitGrid, and the Benefits tab.
**Fix:** Differentiate each surface's job — QuickFactsStrip = pure data lookup, BenefitGrid = the "why," Benefits tab should add net-new information rather than restate the top-of-page grid.
**Suggested command:** `/impeccable distill`

**[P2] Confirms the recurring pattern: Requirements tab is flat prose while Benefits gets a bespoke layout — and here the highest-stakes item is a fraud-risk warning, not just a paperwork checklist.** The MOE-registration-certificate requirement — called out in the page's own ExpertInsightCallout as "the most common ED visa mistake" — is bullet #5 of 7 in a flat list, styled identically to a passport photo requirement.
**Fix:** Give the MOE-registration item its own visual flag/callout treatment; simplify Benefits to plain prose consistent with its lower stakes.
**Suggested command:** `/impeccable clarify`

**[P3] No structured decision path for "which program type am I."** A prospective Muay Thai/cooking-program enrollee and a university-bound student are both routed through one flat bullet list ("Approved Schools & Programs") with no distinction in paperwork intensity or risk profile between them — despite the page's own copy warning that soft-power programs carry more fraud risk.
**Fix:** A lightweight two-path comparison (soft-power vs. academic), reusing the `ProcessComparisonCards` pattern already built and used elsewhere on this exact page for Route A/B.
**Suggested command:** `/impeccable clarify`

**[P4] Attendance-check verification is unclear for non-academic programs.** Two separate accordions discuss immigration attendance checks in general terms, but never clarify how attendance is tracked for a Muay Thai academy vs. a university with registrar records.
**Suggested command:** `/impeccable clarify`

## Persona Red Flags

**24-year-old grad student (language school, gap year):** Well served — QuickFactsStrip answers "can I work?" immediately, Eligibility tab confirms their path, ExpertInsightCallout reassures. Low friction.

**UK parent researching university enrollment for their 19-year-old:** Moderate friction — the university-specific requirements accordion isn't open by default, and the tab's generic intro line ("the school letter is the key document") undersells that university enrollment has meaningfully different paperwork (transcripts, tuition proof) than a language school.

**Project persona — deciding between Muay Thai training camp and academic enrollment:** This persona's core anxiety (does this informal-sounding option even count, and is the paperwork the same) is technically answered but scattered — the fraud warning lives in Eligibility, the document checklist lives in Requirements, and nothing connects "the type of school you pick determines your risk" to "here's what to verify before you pay." The strongest concrete case for P3.

## Minor Observations

- `ExpertInsightCallout` and `CtaCallout` are near-identical components with different prop orderings — a components-inventory redundancy worth flagging separately, not blocking.
- "MOE-registered" appears in QuickFactsStrip without spelling out "Ministry of Education" at that specific touchpoint, even though it's explained elsewhere on the page — a QuickFactsStrip's whole purpose is scannability without reading further.

## Questions to Consider

1. If Benefits closes softer stakes and Requirements carries the actual make-or-break paperwork, why does the page's visual budget reward the former and punish the latter?
2. Given this audience plausibly splits into "casual soft-power visa" and "genuine academic," should Education Visa remain one generic tab-set, or does that quietly under-serve the university-parent persona?
3. The most important sentence on the page for the soft-power persona (the MOE-fraud warning) sits in the same visually unremarkable sand callout as three lower-stakes tips — why isn't it elevated the way the dark stat card was for Benefits?
