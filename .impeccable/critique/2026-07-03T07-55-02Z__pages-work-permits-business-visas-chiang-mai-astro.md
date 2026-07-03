---
target: src/pages/work-permits-business-visas-chiang-mai.astro
total_score: 27
p0_count: 1
p1_count: 2
timestamp: 2026-07-03T07-55-02Z
slug: pages-work-permits-business-visas-chiang-mai-astro
---
# Work Permits & Business Visas Page — Critique Snapshot

**Score: 27/40 → fixes applied**

## P0 — Fixed
- Benefits tab's inline `grid-template-columns: 1.4fr 1fr` had no mobile media query, breaking severely at 390px. Refactored to the shared `BenefitsSplit.astro` component (collapses to single column under 640px). This same defect was found across 6 pages sitewide; all have now been refactored to the shared component (DTV, education, guardian, marriage, work-permits).

## P1 — Fixed
- The 4:1 Thai-employee-to-foreign-worker ratio was buried as a parenthetical in the "Employed by a Thai Company" accordion. Promoted to a `RequirementNote` callout, and added as an 8th QuickFactsStrip fact ("Employee Ratio: 4 Thai : 1 Foreign").
- The 90-day work-permit deadline was restated three times in different words across the Eligibility, Process, and ExpertInsightCallout copy without a single authoritative statement. Consolidated into one `RequirementNote` ("90-Day Work Permit Deadline") in the Process tab.

## P2 — Fixed
- Requirements tab's two document checklists (Non-Immigrant B Visa Documents, Work Permit Documents) read identically even though responsibility splits between applicant and employer — this is the only visa page where that split exists. Added "You" / "Employer" badge labels to every list item.

## P3 — Fixed
- QuickFactsStrip's 7-item grid orphaned a card in the 2-column mobile layout. Added the 8th fact (Employee Ratio) above, making the count even — verified 4 clean rows of 2 at 375px width with no orphan.

## Verification
- Detector clean (`detect.mjs`) on all touched files: work-permits page, and the BenefitsSplit-refactored DTV/education/guardian/marriage pages.
- Browser-verified at desktop and 375px mobile width: Benefits tab collapses to 1 column on mobile, RequirementNotes render with correct copy, document labels show 3 "You" + 3 "Employer" per list, QuickFactsStrip shows 4 even rows on mobile with no orphan.
- No console errors.
