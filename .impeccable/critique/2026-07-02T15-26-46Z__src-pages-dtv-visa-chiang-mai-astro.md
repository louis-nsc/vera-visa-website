---
target: DTV visa page (src/pages/dtv-visa-chiang-mai.astro)
total_score: 31
p0_count: 1
p1_count: 1
timestamp: 2026-07-02T15-26-46Z
slug: src-pages-dtv-visa-chiang-mai-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/console-evidence agent)

Note on Assessment B's deep-link finding: B reported the hash-based deep-linking feature (shipped in the retirement-page pass) as flaky/non-deterministic across repeated trials. I investigated directly: the dev server process had been running for hours accumulating heavy HMR churn from today's edits, and repeated `window.location.href` reassignment that changes only the hash (not the path) does not reliably force a full page reload/remount in all cases, which corrupts trial independence. After killing the stale process, starting a genuinely fresh server, and re-testing with cache-busted URLs (`?t=<timestamp>#<hash>`) to guarantee true fresh loads, the feature succeeded in 4/4 clean trials across three different tab/accordion targets. Treating this as a testing-methodology artifact, not a real product bug — no redesign applied.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Tab underline/chevron states clear; no loading state needed (static content) |
| 2 | Match Between System / Real World | 4 | DTV jargon (TM30, 90-day report, soft power activities) explained inline for a remote-worker audience |
| 3 | User Control and Freedom | 3 | Deep-linking works; no back-to-top, though page length doesn't really need one |
| 4 | Consistency and Standards | 4 | Fully consistent with DS and the retirement page's structure — no drift |
| 5 | Error Prevention | 3 | No form to test; the documents checklist itself prevents the user's real error (incomplete application) |
| 6 | Recognition Rather Than Recall | 2 | Requirements tab gives no visual priority to the one make-or-break item (financial evidence) among five equal-weight accordions |
| 7 | Flexibility and Efficiency of Use | 3 | Tabs let an informed user jump straight to what they need |
| 8 | Aesthetic and Minimalist Design | 3 | Requirements tab is flat bullet lists next to a Benefits tab with a bespoke two-column + stat-card layout — a real hierarchy imbalance |
| 9 | Error Recovery | 2 | The one relevant warning ("most rejections come from mismatched income evidence") isn't reinforced next to the actual document-assembly list |
| 10 | Help and Documentation | 4 | ExpertInsightCallout present in every relevant tab; FAQ schema covers real questions; RelatedGuides links to deep dives |
| **Total** | | **31/40** | **Good — same shape of gap as the retirement page** |

## Anti-Patterns Verdict

**LLM assessment:** Clean. No side-stripe borders, no box-shadow, no numbered scaffolding, no generic gradients or icon-grid services. This page faithfully reuses the established pattern library with no ad-hoc drift.

**Deterministic scan:** Clean — zero findings across the full target set.

**Console/interaction evidence:** No hydration mismatch, no console errors, no failed network requests. Tab switching and accordion toggling both verified via actual ARIA state changes. Mobile tab overflow fades confirmed toggling correctly based on real scroll position.

## Overall Impression

The DTV page reuses the retirement page's exact template faithfully — no new systemic issues, no drift. But it recreates the *same* design-priority gap the retirement critique found: the page's single most decision-relevant content (financial eligibility) gets the least visual investment, while the Benefits tab (largely stuff this audience has often already read on nomad forums) gets the richest treatment. This page adds one wrinkle the retirement page didn't have: the copy itself declines to state the actual minimum bank balance figure, which directly contradicts PRODUCT.md's "specificity is a trust signal" principle at the exact moment it matters most.

## What's Working

1. **Plain-language jargon-glossing is excellent for this specific audience.** TM30, 90-day reports, and "soft power activities" are all explained without condescension for readers who are tech-savvy but Thai-immigration novices.
2. **ProcessComparisonCards is the best-executed section on the page** — two clear application routes with fee/timing surfaced as scannable stat chips, directly usable as the template for fixing the Requirements tab.
3. **The Restrictions tab implicitly answers the "is this better than tourist-visa border runs" comparison** the target persona is actually making, without ever naming the competitor approach.

## Priority Issues

**[P0] The highest-stakes content (Financial Solvency Evidence) has the least visual weight on the page — the same pattern found on the retirement page.** It renders as a plain bullet list, visually identical to the comparatively trivial "Core Identity & Travel Documents" accordion, while the Benefits tab gets a bespoke two-column layout and dark stat card two sections later.
**Fix:** Give the Financial Solvency accordion a bordered inset/stat-chip treatment analogous to `.pc-stat` in `ProcessComparisonCards.astro`.
**Suggested command:** `/impeccable clarify`

**[P1] The minimum bank balance figure is the one place on the page that declines to state a real number, contradicting the site's own specificity principle.** "Evidence of minimum account balance (confirmed against current DTV requirements at the time of your application)" is parenthetical and easy to miss, at exactly the moment a fast-verdict-seeking persona needs certainty most.
**Fix:** Since the real current figure isn't available to state, make the caveat visually prominent (a small inline note, not buried parenthetical) so it reads as deliberate transparency rather than a gap.
**Suggested command:** `/impeccable clarify`

**[P2] No accordion in the Requirements tab is open by default, unlike Eligibility and Restrictions (both open their first/most-important item).** Given this is the tab a comparison-shopping persona clicks first, starting Financial Solvency open would match the pattern already established elsewhere on this exact page.
**Suggested command:** `/impeccable clarify`

**[P3] "20+" minimum-age quick fact can briefly misread as a typo next to values like "180 days" and "5 years."**
**Fix:** "Age 20+" or "20 years+".
**Suggested command:** `/impeccable polish`

## Persona Red Flags

**Jordan (newcomer to DTV):** Converts on vibes + specificity signals from the hero alone (five-year visa, 180 days, real fee number) before even reaching the weaker Requirements tab — this page serves Jordan well.

**Riley (deliberate stress-tester):** Opens every Requirements accordion methodically, hits the unstated bank-balance figure, and may now go verify elsewhere instead of messaging WhatsApp immediately — undermining the "one chat resolves it" promise made elsewhere on the page.

**Project persona — 29-year-old remote contractor comparison-shopping DTV vs. border runs:** Goes straight to Requirements to self-qualify and hits the same unstated-minimum gap at the worst moment for someone wanting a fast verdict. The strongest differentiator vs. border runs (no 90-day TM30 reports) is buried as the 4th bullet in a plain list rather than surfaced near the hero.

## Minor Observations

- `QuickFactsStrip` value "Embassy / E-Visa" wraps awkwardly at ~900–1100px — worth a breakpoint check.
- The Benefits tab's two-column grid is inline-styled directly in the page rather than using the file's own `.panel-h2`/`.panel-intro` class pattern — a maintainability nit, not a visual bug.
- ExpertInsightCallout appears in Eligibility/Requirements/Process but not Benefits/Restrictions — inconsistent presence worth a look if Restrictions ever needs its own nuance callout.

## Questions to Consider

1. Is the Requirements-tab-under-invested-relative-to-Benefits-tab pattern present on every other visa-type page using this same layout? (Confirmed recurring on retirement and DTV — worth checking guardian/marriage/education/volunteer/work-permits too as this pass continues.)
2. Is the unstated minimum-balance figure a content/ops gap (get the real number from the team) rather than something a design fix alone can resolve?
3. Given this persona's explicit border-runs comparison, would a compact cost/hassle callout specific to that comparison outperform relying on the reader to piece it together from scattered bullets?
