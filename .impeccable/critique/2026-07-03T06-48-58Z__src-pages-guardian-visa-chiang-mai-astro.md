---
target: guardian visa page (src/pages/guardian-visa-chiang-mai.astro)
total_score: 30
p0_count: 0
p1_count: 1
timestamp: 2026-07-03T06-48-58Z
slug: src-pages-guardian-visa-chiang-mai-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/console-evidence agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Tab underline, accordion chevron, status card all respond correctly |
| 2 | Match Between System / Real World | 4 | Plain language throughout, THB figures concrete, 90-day report explained inline |
| 3 | User Control and Freedom | 3 | Deep-linking confirmed working (3/3 trials) |
| 4 | Consistency and Standards | 4 | Fully consistent with the established pattern library |
| 5 | Error Prevention | 3 | No form to break; WhatsApp links correct |
| 6 | Recognition Rather Than Recall | 2 | The persona's core anxiety (enrollment contingency) was the 4th collapsed item in a tab labeled "Restrictions," disconnected from where the dependency is created (Eligibility) |
| 7 | Flexibility and Efficiency of Use | 3 | Deep-linkable tabs/accordions support sharing a specific answer |
| 8 | Aesthetic and Minimalist Design | 3 | Benefits tab's two-column + stat-card layout is disproportionate next to flat Eligibility/Requirements content |
| 9 | Error Recovery | 2 | No proactive warning that visa status is contingent and time-sensitive; the one relevant line was reactive and buried |
| 10 | Help and Documentation | 3 | Three well-placed ExpertInsightCallouts, but none addresses the enrollment-change scenario proactively; FAQ schema also omits it |
| **Total** | | **30/40** | **Good — recurring pattern confirmed, plus a real persona-specific gap** |

## Anti-Patterns Verdict

**LLM assessment:** Clean — no gradient blobs, no glassmorphism, no icon-grid services, no emoji. Fraunces/IBM Plex Mono correctly used only at Title-size+.

**Deterministic scan:** Clean except the two known accepted font exceptions.

**Console/interaction evidence:** No hydration mismatch, no console errors. Deep-linking confirmed working 3/3 clean trials. The TabBar ResizeObserver fix (from the education-page pass) specifically verified working here too, via a CDP resize applied after mount — end-fade correctly appeared once real overflow existed.

## Overall Impression

Confirms the same recurring pattern (Financial Requirements as flat prose vs. Benefits' bespoke layout) found on retirement, DTV, and education pages. But the more important finding here is persona-specific: this audience's actual core anxiety — what happens to my legal status if my child's schooling changes — was answered accurately but was the hardest-to-find, least-prioritized, least-reassuring content on the page, arriving last under a tab labeled "Restrictions" (bureaucratic-gatekeeping register, not reassurance) with no cross-link from where the dependency is actually created.

## What's Working

1. **QuickFactsStrip is an effective anxiety-reducer** — seven concrete data points scannable in one glance, PRODUCT.md's specificity principle working exactly as intended.
2. **The financial-threshold framing ("same as the marriage visa") is smart copy** — normalizes an unfamiliar number by anchoring it to something the site already explains elsewhere.
3. **ExpertInsightCallout usage is well-judged**, placed at natural pause points with genuinely useful insider information.

## Priority Issues

**[P0] Confirms the recurring pattern: Financial Requirements is flat prose while Benefits gets a bespoke layout.** The 400,000 THB financial requirement — gating whether a family can pursue this visa at all — had less visual weight than the 1,900 THB renewal fee.
**Fix:** Applied the retirement page's 3-path visual chooser to Financial Requirements.

**[P1] The persona's core anxiety was under-served and mis-located.** The enrollment-contingency answer was the 4th collapsed accordion in "Restrictions," disconnected from where the dependency is created (the Eligibility tab's "Child's School Enrolment" accordion).
**Fix:** Added an explicit cross-link note directly in "Child's School Enrolment" pointing to the contingency answer, and made that contingency accordion the default-open item in Restrictions instead of the work-permit question.

**[P2] QuickFactsStrip omitted the one dynamic risk factor unique to this visa type.** All 7 facts were static/structural with no card flagging that the visa is tied to continued enrollment.
**Fix:** Added an 8th fact ("Visa Basis: Tied to enrolment") and sharpened "Child Req." from "Enrolled in school" to "Enrolled & attending."

**[P3] Tab label "Restrictions" reads as legal fine print rather than the practical questions actually inside it.** Left as-is — renaming just this page's tab would break the consistent tab vocabulary (Eligibility/Requirements/Process/Benefits/Restrictions) used across every visa service page, which was itself flagged positively as a consistency strength in every prior critique. The actual problem (content buried/mis-prioritized) is solved by the P1 fix instead.

## Persona Red Flags

**Baseline persona (less tech-fluent, converts on hero + QuickFacts):** Converts fine but never discovers the enrollment-contingency risk before messaging — now surfaced earlier via the Eligibility-tab cross-link.

**Research-first careful reader:** Previously ended their read-through on the page's least-reassuring, least-designed content, right before the final CTA. Now the contingency answer is the first thing they see on opening Restrictions, and they've already been pointed there from Eligibility.

**Project persona — "Enrollment-Contingent Parent":** Core question was accurately answered but hardest to find. Both the cross-link and the default-open reordering directly address this persona's stated friction points.

## Minor Observations

- FAQ schema's 4 questions don't include the enrollment-contingency scenario — a real SEO gap for a searcher typing "what if my child leaves school guardian visa thailand," left for a future content pass since it requires schema authoring, not a layout fix.
- Re-entry permit fee tiers (1,000 THB single / 3,800 THB multiple) are still inline prose rather than a data pairing — minor, left as-is for this pass.

## Questions to Consider

1. Is the Financial-Requirements-flat-vs-Benefits-bespoke pattern going to recur on marriage/volunteer/work-permits pages too? (Confirmed on 4/4 pages checked so far.)
2. Should FAQ schema authoring be driven by "what will an anxious parent actually search for" rather than "the flat, safe set of questions to formalize"?
