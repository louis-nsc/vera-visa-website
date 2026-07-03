---
target: volunteer visa page (src/pages/volunteer-visa-chiang-mai.astro)
total_score: 30
p0_count: 0
p1_count: 1
timestamp: 2026-07-03T07-35-22Z
slug: src-pages-volunteer-visa-chiang-mai-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/console-evidence agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Sticky tabbar, accordion chevron, edge-fade cues all work correctly |
| 2 | Match Between System / Real World | 4 | Plain, correct language throughout ("Registered NGO," "placement letter," "90-day report") |
| 3 | User Control and Freedom | 3 | Hash deep-linking and back/forward work via shared components |
| 4 | Consistency and Standards | 3 | Consistent with sibling pages structurally, but Benefits tab was visually inconsistent within this page (flat list vs. bespoke BenefitGrid two sections earlier) |
| 5 | Error Prevention | 3 | Two well-targeted ExpertInsightCallouts flag the actual failure points (org registration, placement-letter wording) |
| 6 | Recognition Rather Than Recall | 2 | The one real THB figure on the page (proof of funds) was buried as bullet 5-of-5 in a plain list |
| 7 | Flexibility and Efficiency of Use | 3 | Tab/accordion/hash system supports skimming and deep-linking |
| 8 | Aesthetic and Minimalist Design | 3 | Generally restrained; Benefits tab's bare bullet list undercut polish |
| 9 | Error Recovery | 3 | "What if your placement ends?" and Elite-visa incompatibility both name a next step |
| 10 | Help and Documentation | 3 | RelatedGuides + FAQ schema provide clear next steps |
| **Total** | | **30/40** | **Good — the classic financial-threshold pattern correctly does not apply here** |

## Anti-Patterns Verdict

**LLM assessment:** Mostly clean. One soft flag: the Benefits tab restated 4 of 6 BenefitGrid bullets near-verbatim — template filler rather than deliberate copy.

**Deterministic scan:** Clean except the two known accepted font exceptions.

**Console/interaction evidence:** No hydration mismatch, no console errors. Deep-linking confirmed working 3/3 clean trials (one required a retry due to a test-harness timing artifact, not a page bug). ResizeObserver edge-fade fix re-verified via post-mount CDP resize.

## Overall Impression

This page correctly does NOT have the classic financial-threshold-as-flat-prose pattern found on retirement/DTV/guardian/marriage — the volunteer visa genuinely has no financial gate, and the page says so honestly and repeatedly (a real strength, not a gap). What recurs instead is the pattern's sibling issues: one important fact (proof-of-funds) still lived unflagged in a list where `RequirementNote` already exists, and the general flat-tab-vs-bespoke-BenefitGrid imbalance showed up in the Benefits tab specifically as near-duplicate content rather than new information. The critique also surfaced two real, distinct persona gaps: no entry point for volunteers who don't yet have a confirmed organisation (a plausibly large share of the realistic audience), and a financially significant disqualified segment (Thailand Elite/Privilege Card holders) buried as the last accordion in the least-visited tab.

## What's Working

1. **The "no financial threshold" story is told honestly and consistently** — unlike marriage/retirement/guardian, this page doesn't invent a financial-threshold UI for a visa type that genuinely doesn't have one.
2. **The Elite/Privilege Card incompatibility accordion is a specific, non-obvious edge case** that shows real domain knowledge of who actually gets tripped up applying for this visa.
3. **ExpertInsightCallout placement is well-targeted twice** — organisation-registration risk and placement-letter wording risk are the actual failure points a Chiang Mai visa agent would know to flag.

## Priority Issues

**[P1] Proof-of-funds fact was undifferentiated inside a flat bullet list.** The one real THB figure on a page that repeatedly emphasizes "no financial threshold" was easy to miss at exactly the point a volunteer needed to retain it.
**Fix:** Pulled into `RequirementNote`, matching the pattern already used on DTV/education/guardian.

**[P2] Benefits tab was flat and largely duplicated BenefitGrid.**
**Fix:** Replaced with genuinely new content — a "Volunteer visa vs. tourist visa" comparison for someone currently doing border runs and deciding whether to convert, reusing the two-column card visual language already established on the education page.

**[P3] No entry point for pre-organisation or informal volunteers.** The entire page assumed the reader already had a confirmed placement with a registered organisation.
**Fix:** Added a callout at the top of the Eligibility tab explicitly inviting readers who haven't found an organisation yet, or aren't sure if theirs qualifies, to ask before assuming they don't qualify.

**[P4] Elite-visa incompatibility (a hard disqualifier for a financially significant segment) was buried as the last accordion in the least-visited tab.**
**Fix:** Moved it to the 2nd position in the Restrictions tab (right after the default-open salary question), and added a one-line mention in the Eligibility tab's intro so it's visible before someone commits to reading all 5 tabs.

## Persona Red Flags

**Maya (easy case, established NGO placement):** Converts cleanly; only friction was the buried proof-of-funds fact, now fixed.

**Devon (current Thailand Elite/Privilege member):** Previously had to dig to the last accordion of the last tab to learn he's ineligible — now surfaced in the Eligibility intro and moved to 2nd position in Restrictions.

**Project persona — informal/pre-organisation volunteer:** The page correctly told this persona their situation likely doesn't qualify, but offered no next step. Now explicitly invited to ask rather than walk away.

## Minor Observations

- `ExpertInsightCallout`'s italic body text, used twice back-to-back within the same tab flow, was starting to feel like a repeated template tic — left as-is for this pass, not a design defect.
- RelatedGuides' first link (`/volunteer-visa-thailand/`) has a very similar title/subject to this page — flagged for SEO awareness (content cannibalization), out of scope for a design pass.

## Questions to Consider

1. Now that this page's tab renamed "Benefits" to "vs. Tourist Visa," is a similar audience-specific reframe worth considering for the last remaining core page (work-permits)?
2. Should the "haven't found an organisation yet" triage pattern be considered for other pages where eligibility depends on a third party (e.g., guardian visa's school enrollment, already partially addressed in an earlier pass)?
