---
target: retirement visa page (src/pages/retirement-visa-chiang-mai.astro)
total_score: 28
p0_count: 1
p1_count: 2
timestamp: 2026-07-02T14-33-33Z
slug: src-pages-retirement-visa-chiang-mai-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/console-evidence agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Tab underline and accordion chevron respond correctly; no off-screen-tab indicator on mobile |
| 2 | Match Between System / Real World | 4 | "Applicant Status/Verified/Approved" mirrors the actual immigration mental model; jargon explained inline |
| 3 | User Control and Freedom | 3 | Tabs/accordions independently togglable; no anchor deep-linking to a specific tab or accordion |
| 4 | Consistency and Standards | 3 | Matches DS throughout; Benefits tab restates BenefitGrid content almost verbatim (architecture smell) |
| 5 | Error Prevention | 2 | The single highest-stakes page on the site has no interactive self-check for the 3-path financial eligibility test |
| 6 | Recognition Rather Than Recall | 3 | QuickFactsStrip anchors key numbers up top; no breadcrumb once deep in an accordion |
| 7 | Flexibility and Efficiency of Use | 2 | No jump-links from QuickFactsStrip values to their detail accordion; no shortcut for returning visitors |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and calm; docked for numbered benefit scaffolding and Benefits-tab redundancy |
| 9 | Error Recovery | 2 | No client-side form here to test; the one likely "error" (misjudging eligibility) has no recovery path besides "chat with us" |
| 10 | Help and Documentation | 3 | ExpertInsightCallout ("bank deposit timing") is proactive help placed exactly where confusion risk peaks |
| **Total** | | **28/40** | **Good — solid foundation, real gaps at the highest-stakes moment** |

## Anti-Patterns Verdict

**LLM assessment:** One clear violation: `BenefitGrid.astro` renders numbered "01–06" tags above six benefits with no inherent order — the textbook AI-slop numbered-list pattern, and since this is a shared component, it's systemic (appears wherever BenefitGrid is used sitewide). No side-stripe borders, gradient text, glassmorphism, or hero-metric template found. Fraunces/IBM Plex Mono correctly not flagged (established identity). One softer concern: the Benefits tab content substantially duplicates the standalone BenefitGrid section moments earlier on the same page.

**Deterministic scan:** Clean — zero findings on the full target set (page + layout + all imported components). Confirmed the detector itself is functioning by reproducing the two known accepted font exceptions in isolation against BaseLayout.astro; they correctly did not surface against the actual scanned set.

**Console/interaction evidence:** No errors, no warnings, no hydration mismatch (explicitly checked given this is a known bug pattern already fixed elsewhere in this codebase). Both TabBar and AccordionSection verified to work correctly via actual ARIA state changes and measured content, not just visual inspection — clicking a tab correctly hides/shows the right panel; expanding an accordion correctly flips `aria-expanded` and reveals real content (518px of it, measured).

**box-shadow / side-stripe check:** Zero box-shadow anywhere on the rendered page (live computed-style scan of every element). Zero side-stripe borders — all border-left/right usage found is symmetric full-perimeter card borders in the neutral line color.

## Overall Impression

The strategic bones are strong and the technical execution is clean — no bugs, no console errors, no DS-doctrine violations. But the page under-serves its own stated purpose at the exact moment it matters most: the highest-stakes page on the site (financial eligibility for a retirement visa) presents its three qualifying paths as dense prose with no interactive self-check, while six unordered lifestyle benefits get a dedicated numbered grid — a real mismatch between where the design effort went and where the anxious reader's actual risk sits.

## What's Working

1. **ExpertInsightCallout placement is genuinely excellent UX writing.** "The most common issue we see is the bank deposit timing" lands directly after the Financial Requirements accordion — anticipating the exact mistake this audience makes, at the moment of highest anxiety, not buried in a generic FAQ.
2. **The hero status-card motif does real UX work, not just branding.** "Applicant Status / Verified / Approved" visually pre-resolves "will this apply to me" before any body copy is read, fully within the Stamped Passport visual language.
3. **Specificity discipline is followed rigorously.** Every claim carries a real number (800,000 THB, 65,000 THB, 1,900 THB renewal fee, "30 days before expiry") with zero "requirements vary" hedging — directly executing PRODUCT.md's core trust principle.

## Priority Issues

**[P0] Financial Requirements has no error-prevention mechanism for the highest-stakes decision on the site.** A retiree with income "just above" 65,000 THB/month has to manually parse three financial-path conditions (bank deposit / income / combination) as one dense prose block, with real risk of misreading the combination math.
**Fix:** Replace the prose block with a 3-path visual chooser (three mini status-cards: Bank Deposit Route / Income Route / Combination Route, each with a worked example), reusing the existing status-card visual language rather than introducing a new pattern.
**Suggested command:** `/impeccable clarify`

**[P1] Numbered scaffolding ("01"–"06") on BenefitGrid is the one AI-slop tell on this page, and it's systemic.** These six benefits have no inherent order; numbering them implies a sequence that doesn't exist, and it's a shared component so this repeats wherever BenefitGrid is used sitewide.
**Fix:** Drop the number or replace with a non-ordinal label consistent with the DS's existing kicker pattern.
**Suggested command:** `/impeccable quieter`

**[P1] The Benefits tab duplicates the standalone BenefitGrid section almost verbatim.** Same six points restated moments after already being read undermines trust in the page's craftsmanship and wastes a slot in an already-tight 5-tab bar.
**Fix:** Cut the redundant section, or repurpose the Benefits tab for content the page doesn't otherwise cover (first-year cost breakdown, Bangkok comparison).
**Suggested command:** `/impeccable distill`

**[P2] Tab bar has no discoverability affordance for off-screen tabs on mobile.** Assessment B confirmed the horizontal-scroll tab pattern functions correctly (tabs are reachable and clickable), but there's no visual cue that more tabs exist off-screen — a distracted mobile reader may never discover "Restrictions," which also houses a CTA.
**Fix:** Add a subtle edge fade/gradient mask when horizontal overflow exists.
**Suggested command:** `/impeccable polish`

**[P3] No anchor/deep-link support for tabs or accordions.** Someone searching "Thailand retirement visa financial requirements" lands on the generic page URL with no way to arrive pre-scrolled to that section; a support agent can't link a client directly to it either.
**Fix:** Sync active tab / open accordion state to `location.hash`.
**Suggested command:** `/impeccable harden`

## Persona Red Flags

**Jordan (confused first-timer):** Lands mid-page on lifestyle copy ("Why retire in Chiang Mai") before reaching any eligibility answer. "O-A" appears in the hero before it's ever explained in plain English. The three financial routes read as one undifferentiated wall of text with no "pick one" structure.

**Sam (accessibility-dependent, matches this page's older audience):** Accordions/tabs have solid semantic foundation (`aria-expanded`, `role="tablist"`, `aria-selected` all confirmed correct). But `.svc-status-card` is `display:none` below ~760px — meaning a magnified-desktop user effectively browsing at mobile width loses the single most anxiety-reducing element on the page. Small 11px mono labels (`.qf-label`) pass contrast math but sit near the practical minimum for older/low-vision readers.

**Casey (distracted mobile user):** 5-tab bar with 2 tabs scrolled off-screen and no discoverability cue (P2). Six stacked BenefitGrid cards add real scroll distance before reaching the actual Eligibility/Requirements content Casey came for.

**Project persona — 62-year-old American retiree, income just above 65,000 THB/month, on an iPad:** Reassured by the status-card motif and the ExpertInsightCallout's specific, proactive warning. Alarmed that the page states the threshold number but never addresses margin-of-safety, transfer timing, or what happens if a future remittance dips slightly below it — a real, specific, high-stakes gap for exactly this reader. Also has no way to save/print a personalized checklist of which documents apply to their specific route.

## Minor Observations

- `--ink-45` token name vs. its actual 60%-alpha value is a documentation/naming debt (already known from the DS, not a new bug) — worth a sitewide token-naming audit at some point, not urgent.
- The Benefits tab's dark stat card ("1,900 THB Annual Renewal Fee") is genuinely useful cost information buried in the 4th of 5 tabs — cost is a top-3 anxious-reader question and currently requires real digging to find.
- FAQPage schema (7 Q&As) is richer than what's visibly exposed in the on-page accordions — mostly fine for SEO, worth a pass to make sure rich-snippet clickers aren't confused by content drift.
- A recurring black bar near the bottom of several screenshots was investigated and attributed to a screenshot-capture-tool artifact (not a real page defect) — `elementsFromPoint` at those coordinates found no styled element responsible, and its position was fixed relative to the captured image regardless of scroll/content underneath.

## Questions to Consider

1. If specificity is this brand's core trust signal, why does the single highest-stakes number on the page (65,000 THB/month) get no interactive self-check, while six unordered lifestyle benefits get a dedicated numbered grid?
2. The Benefits tab and the BenefitGrid section say almost the same six things twice on one page — is this pattern likely to recur on the other service pages that share the same layout and components?
3. Given the audience is explicitly older and possibly less tech-fluent, has the two-layer progressive-disclosure pattern (tabs containing accordions) actually been checked with a real 60+ user, or is "progressive disclosure reduces cognitive load" being applied as a rule without checking whether discovering the disclosure is itself the harder problem for this audience?
