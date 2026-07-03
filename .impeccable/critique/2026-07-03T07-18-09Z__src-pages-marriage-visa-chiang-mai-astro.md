---
target: marriage visa page (src/pages/marriage-visa-chiang-mai.astro)
total_score: 28
p0_count: 1
p1_count: 1
timestamp: 2026-07-03T07-18-09Z
slug: src-pages-marriage-visa-chiang-mai-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/console-evidence agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Tab underline, aria-selected/aria-expanded all correctly wired; deep-linking works |
| 2 | Match Between System / Real World | 3 | Amphoe, Kor Ror 3, 90-day report explained inline |
| 3 | User Control and Freedom | 3 | Tabs/accordions independently togglable, hash back/forward works |
| 4 | Consistency and Standards | 2 | This page's biggest miss: retirement and guardian already carry the 3-card financial layout; marriage still had the old flat list — inconsistent with its own sibling pages |
| 5 | Error Prevention | 3 | Deposit-timing warning is exactly the right proactive content, previously buried in flat prose |
| 6 | Recognition Rather Than Recall | 3 | QuickFactsStrip surfaces the two key numbers up front |
| 7 | Flexibility and Efficiency of Use | 3 | Deep-linkable tabs/accordions |
| 8 | Aesthetic and Minimalist Design | 3 | Calm spacing and rhythm hold up elsewhere on the page |
| 9 | Error Recovery | 2 | "What if the marriage ends?" had identical visual/tonal weight to routine procedural FAQs despite being the most sensitive question on the page |
| 10 | Help and Documentation | 3 | Two ExpertInsightCallouts, CtaCallout, and RelatedGuides all support self-serve research |
| **Total** | | **28/40** | **Good — the recurring pattern here was literally an unported fix, not a fresh miss** |

## Anti-Patterns Verdict

**LLM assessment:** Clean — no fresh AI-slop patterns. The core issue was an *unported* fix (the `.fin-routes` pattern already shipped on two sibling pages), not slop.

**Deterministic scan:** Clean except the two known accepted font exceptions.

**Console/interaction evidence:** No hydration mismatch, no console errors. Deep-linking confirmed working 3/3 clean trials. The TabBar ResizeObserver fix specifically re-verified here via a post-mount CDP resize — confirmed working.

## Overall Impression

This page's core finding was different in kind from prior pages: the recurring financial-requirements pattern wasn't a fresh design gap here, it was a fix that already existed verbatim on two sibling pages (retirement, guardian) and simply hadn't been ported to marriage yet — meaning the site was inconsistent with itself. Given this was the third occurrence of both the `.fin-routes` and `.req-note` patterns as hand-copied markup+CSS, both were extracted into shared components (`FinancialRoutes.astro`, `RequirementNote.astro`) during this pass and back-ported to all four existing usages, closing off the "unported fix" failure mode structurally rather than relying on catching it again by hand on the next page.

The critique also surfaced a genuine content gap distinct from the systemic pattern: the page never named or defused the anxiety a foreign spouse might feel about their relationship itself being scrutinized or doubted by immigration — the eligibility copy led with what *doesn't* qualify before what does, without ever reassuring the reader that meeting the two stated requirements is genuinely sufficient.

## What's Working

1. **Same-Sex Marriage accordion is a genuine strength** — specific (names the Marriage Equality Act, the exact date, "first in Southeast Asia"), unhedged, and proactively answers a question this audience would otherwise have to dig for or fear asking.
2. **QuickFactsStrip + status card front-load the two make-or-break numbers** before the user opens any accordion.
3. **RelatedGuides correctly cross-links** to "Marriage Visa Thailand Cost" and the divorce-adjacent Guardian visa — sound information architecture for a life-circumstance-driven decision tree.

## Priority Issues

**[P0] Financial Requirements was the pre-fix flat bullet-list version, while the identical fix already existed on two sibling pages.**
**Fix:** Ported the shared `FinancialRoutes` component (now extracted) with marriage's three routes.

**[P1] Genuine-marriage anxiety was never named or defused.** The eligibility copy opened with what doesn't qualify (common-law relationships) before what does, and never reassured the reader that the two stated requirements are genuinely sufficient.
**Fix:** Reframed the "Legal Marriage to a Thai National" accordion to lead with what qualifies, and added an explicit line: "immigration is checking paperwork, not judging your relationship."

**[P2] "What if the marriage ends?" had no tonal separation from routine procedural FAQs** despite touching divorce and bereavement.
**Fix:** Added a softer lead-in acknowledging this is a hard question, and reframed the closing line from purely instructional to explicitly supportive ("plan the transition with you, not just at you").

**[P3] Nav consistency check — confirmed non-issue.** Marriage Visa is correctly listed in the nav dropdown and the URL matches the non-negotiable URL rule exactly.

## Structural Fix: Shared Components Extracted

Both the `.fin-routes`/`.fin-route` pattern (now on its 3rd hand-copied page) and the `.req-note` pattern (already on its 3rd hand-copied page across DTV/education/guardian) were extracted into `src/components/sections/FinancialRoutes.astro` and `src/components/sections/RequirementNote.astro` respectively, and all 4 existing usages (retirement, guardian, DTV, education) were refactored to use the shared components instead of duplicated inline markup+CSS. This directly addresses Assessment A's provocative question: "why does a design review need to catch its absence on a third page instead of a shared component making the omission structurally impossible?"

## Persona Red Flags

**Anxious retiree-adjacent spouse (combination-route reader):** Previously had to parse dense prose to self-classify into the right financial path — now resolved by the visual chooser.

**Foreign spouse whose Thai partner handles logistics, worried about the relationship being doubted (project persona):** Core worry was completely unaddressed by the page's copy. Now explicitly named and defused in the first paragraph of the eligibility accordion.

## Minor Observations

- `ExpertInsightCallout` and `CtaCallout` both use italic body text for rhetorically different purposes (a warning vs. a sales pitch) — a pattern-level nit worth checking sitewide at some point, not specific to this page.
- Same-sex marriage accordion is the 4th of 4 in Eligibility — some skimming users may tab away before reaching it, though this wasn't addressed in this pass (would require reordering, a bigger content-architecture call than a polish fix).

## Questions to Consider

1. Now that `FinancialRoutes` and `RequirementNote` are shared components, will they naturally get used correctly on volunteer/work-permits if those pages have analogous financial-threshold content, or does the pattern need to be documented somewhere for future page authors to discover it?
2. Should tab order itself (Eligibility, Requirements, Process, Benefits, Restrictions) be reconsidered given how consistently "Benefits" outshines "Eligibility" in visual investment across every page checked so far — or is the fix always "bring Eligibility up to Benefits' level" rather than reordering?
