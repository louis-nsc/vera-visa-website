---
target: homepage (src/pages/index.astro)
total_score: 24
p0_count: 2
p1_count: 3
timestamp: 2026-07-01T15-21-32Z
slug: src-pages-index-astro
---
Method: dual-agent (A: general-purpose design-review agent · B: general-purpose detector/console-evidence agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Form has clear idle/submitting/success/error states; nav dropdown has no visible focus-open indicator beyond caret rotation |
| 2 | Match Between System / Real World | 4 | THB figures, week counts, visa codes match how users actually search/think |
| 3 | User Control and Freedom | 2 | No mobile menu = no way to navigate on phone without scrolling; dropdown is hover/focus-within only with no visible close affordance |
| 4 | Consistency and Standards | 2 | Orange appears once in most sections but 4x simultaneously in Process section; two service codes render as ambiguous "O"/"0" |
| 5 | Error Prevention | 2 | Contact form has no inline validation messaging or field-level guidance beyond `type="email"` |
| 6 | Recognition Rather Than Recall | 3 | Nav dropdown + footer both surface all services (good redundancy); visa codes require recall of immigration jargon not explained on-page |
| 7 | Flexibility and Efficiency of Use | 2 | Single conversion path only (fine for audience) but no shortcut beyond one anchor link |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and restrained overall; testimonials section denser than the page's calm rhythm elsewhere |
| 9 | Error Recovery | 2 | Generic form error text with a good WhatsApp fallback, but no per-field error distinction |
| 10 | Help and Documentation | 1 | No inline glossary/tooltip for DTV, O, O-A, B, Non-B on the homepage itself |
| **Total** | | **24/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM assessment (Assessment A):** Overall pass on AI-slop — avoids side-stripe borders, gradient text, glassmorphism, hero-metric strips, icon-grid services. Fraunces/IBM Plex Mono and the no-imagery approach are both pre-existing brand identity, correctly exempted. One execution-level flag: the four-item Process section (giant orange 01–04 numerals visible simultaneously) is functionally the banned "numbered section markers as default scaffolding" pattern, just skinned in brand color — and it also breaks the brand's own One Stamp Rule. The "Who We Serve" grid (6 identical sand cards, identical dot, no hierarchy) borders on "identical card grid."

**Deterministic scan (Assessment B):** `detect.mjs` ran clean except one advisory finding — `design-system-radius` at `src/pages/index.astro:327` (a 3px radius outside the DESIGN.md rounded scale, part of `.hero__stamp`).

**Additional finding from synthesis (verified directly against DESIGN.md):** `.hero__stamp` in `src/pages/index.astro` (lines ~316–331) uses `box-shadow: inset 0 0 0 1.5px var(--paper), inset 0 0 0 3px var(--ink);` to fake a double-ring stamp border. This directly violates DESIGN.md's own **Flat Ledger Rule** ("No box-shadow appears anywhere in this system, on any element, in any state"). It should be rebuilt with a double border or an `outline` + `border` combination instead of `box-shadow`.

**Console/hydration evidence (Assessment B):** A real React hydration mismatch was captured live in the browser console — `ContactForm.tsx:22` renders a `<style>` block whose SSR output HTML-escapes an empty-string CSS value (`content: ''`) while the client render does not, causing React to discard the server-rendered markup and re-render from scratch on every load (`Warning: An error occurred during hydration. The server HTML was replaced with client content`, 8 occurrences). This is a genuine functional defect, not a design opinion.

## Overall Impression

The strategic bones are strong — the hero status card operationalizes "specificity is a trust signal" as an actual object, and the copy voice is consistently expert-friend without hype. But the page ships two real functional defects (broken mobile nav, hydration mismatch) and one DS-doctrine violation (orange used 4x in one view, contradicting the brand's own written rule) that undercut the trust the rest of the page works hard to build. The single biggest opportunity: fix the mobile nav — this audience is explicitly "often from a phone," and the current nav is unusable at 375px width with zero media queries.

## What's Working

1. **The hero status card** (DTV / Chiang Mai / 4–6 weeks / Approved, perforated edge, rotated "Verified" stamp) is the best idea on the page — it shows the visitor their own future outcome before they've done anything, which is exactly right for an anxious-bureaucracy audience.
2. **Copy voice** is consistently calm and specific ("We handle the paperwork, the immigration office, and the follow-ups") with zero hype language, emoji, or exclamation points — matches PRODUCT.md's brand-personality brief precisely.
3. **ContactForm's engineering care** — the honeypot field has a code comment explaining the Chrome-autofill false-positive rationale, and form errors degrade gracefully to "try WhatsApp instead" rather than dead-ending the user.

## Priority Issues

**[P0] Mobile navigation is functionally broken.** `Nav.astro` has zero media queries and no hamburger/mobile-menu toggle. At 375px, the 7-item Services dropdown, About, Contact, and the WhatsApp CTA are all forced into one row and visually collide. Given the stated audience is "often from a phone," this is launch-blocking.
**Fix:** Add a `@media (max-width: 900px)` breakpoint that collapses nav links behind a hamburger-triggered drawer, keeping only logo + WhatsApp CTA + menu icon in the top row.
**Suggested command:** `/impeccable adapt` (or `/impeccable harden` if treated as a robustness gap)

**[P0] Duplicate/ambiguous visa codes undermine the page's own trust mechanism.** `index.astro` assigns `code: 'O'` to both Marriage Visa and Guardian Visa; at IBM Plex Mono weight/size this renders visually indistinguishable from "0" (confirmed on screenshot). Specificity is PRODUCT.md's core trust signal — an ambiguous code contradicts it at the exact moment a visitor is trying to identify their own situation.
**Fix:** Disambiguate the codes (e.g. "O · Spouse" / "O · Guardian") or drop the bare-letter treatment where two services share a category letter.
**Suggested command:** `/impeccable clarify`

**[P1] React hydration mismatch on every page load.** `ContactForm.tsx` triggers a real SSR/client markup mismatch (traced to an escaped vs. unescaped `content: ''` CSS value inside its inline `<style>` block), forcing React to discard server-rendered HTML and re-render client-side on every visit — a real performance/correctness defect, not a style preference.
**Fix:** Move the component's CSS out of the inline template-literal `<style>` tag (external stylesheet or CSS module) so the string never round-trips through JSX text-child escaping.
**Suggested command:** `/impeccable harden`

**[P1] Process section violates the system's own One Stamp Rule and reads as generic scaffolding.** Four giant orange numerals (01–04) are visible simultaneously in one viewport. DESIGN.md is explicit that two orange elements in one view means one is wrong, and this is also the closest thing on the page to the banned "numbered section markers as default scaffolding" pattern.
**Fix:** De-color the numerals to ink/ink-45 (matching `.sc-code` treatment) and reserve orange for a single active-state indicator, or drop the numeral treatment in favor of the existing top-border rule alone.
**Suggested command:** `/impeccable quieter`

**[P1] Nav dropdown lies to screen readers.** `aria-expanded="false"` is hardcoded in `Nav.astro`'s markup and never toggled by any script; the menu opens visually via CSS `:focus-within`/hover but assistive tech is told it never opens. Given PRODUCT.md commits to WCAG 2.1 AA, this is a real conformance gap (WCAG 4.1.2 Name, Role, Value), not a nitpick.
**Fix:** Toggle `aria-expanded` via a small script (or Astro + minimal client JS) in sync with the actual open/closed state.
**Suggested command:** `/impeccable harden`

**[P2] `.hero__stamp` uses `box-shadow`, violating the Flat Ledger Rule.** DESIGN.md is explicit that no box-shadow appears anywhere in this system, in any state. The double-ring "Verified" stamp effect currently relies on inset box-shadows.
**Fix:** Rebuild the double-ring effect with a border + outline combination instead of box-shadow.
**Suggested command:** `/impeccable polish`

**[P2] Weak peak-end close.** The page ends with two near-identical orange "Chat on WhatsApp" CTAs within ~150px of each other (FinalCtaBand, then Footer) with no closing reassurance (licensing, registration, years in business) at the last moment before exit.
**Fix:** Differentiate the footer CTA as secondary (outline/ink-fill), and add a one-line trust statement near the footer address block.
**Suggested command:** `/impeccable polish`

**[P3] Testimonial cards are denser than the page's calm rhythm elsewhere; a 3-up grid drops to an orphaned 2-up-plus-one at 900px.**
**Fix:** Cap at 2 columns on desktop, or add a 4th testimonial to avoid the orphan.
**Suggested command:** `/impeccable layout`

**[P3] Advisory: 3px radius outside the documented rounded scale** at `src/pages/index.astro:327` (part of `.hero__stamp`), flagged by the deterministic detector.
**Suggested command:** `/impeccable polish`

## Persona Red Flags

**Jordan (Confused First-Timer):** Scanning for "Marriage Visa" (their likely situation), Jordan sees the eyebrow code render as what looks like "0" — first reaction: *is this a placeholder that didn't get filled in?* A trust-hit at the exact decision moment. If on a phone, Jordan's very first interaction with the page is a visually broken, overlapping nav — before reading a word of the reassuring hero copy.

**Riley (Deliberate Stress-Tester):** Notices the process section counts "01, 02, 03, 04" in orange, directly contradicting the brand's own written one-stamp rule. Tries the nav dropdown via keyboard and finds `aria-expanded` never updates — a real, verifiable accessibility bug, not a nitpick.

**Casey (Distracted Mobile User):** Opens the link on a phone. Nav is broken/overlapping immediately. Even scrolling past it, the hero status card — the page's single best trust-building idea — is completely hidden below 900px (`display: none`), so Casey, the majority of this audience, never sees it at all.

**Project persona — anxious 55–65 y/o retirement-visa prospect:** Reassured by the plain-language hero framing and the correct, concrete retirement figures (800,000 THB / 65,000 THB per month) matching what they've likely already half-researched, plus the named founders in the footer. Alarmed by the complete absence of any license/registration/years-in-business statement anywhere on the homepage — for a persona explicitly worried about being scammed, and the least likely demographic to tolerate a broken mobile nav as a "minor glitch" rather than a professionalism red flag.

## Minor Observations

- The WhatsApp SVG icon path is duplicated verbatim across five files (Nav, hero, FinalCtaBand, ContactForm, Footer) — a shared `WhatsAppIcon.astro` would remove real duplication.
- `hero__stamp` ("Verified") and its entire parent card are `aria-hidden="true"` — screen reader users get zero benefit from the hero's single strongest trust element.
- `.footer__logo-img { filter: invert(1) brightness(1.4); }` only works because the source PNG is single-color; fragile if the badge is ever updated.
- Footer's "By Nationality" and "Visa Services" columns link to overlapping visa pages from two different framings — reasonable for SEO, worth confirming it doesn't read as redundant to a first-time visitor.

## Questions to Consider

1. Was the Process section's four-orange-numeral treatment reviewed against DESIGN.md's One Stamp Rule before shipping, or built before the rule was written and never reconciled?
2. The homepage's best trust-building idea (the status card) is invisible below 900px — was hiding it on mobile a deliberate tradeoff, or did it ship without anyone asking whether the card's *content* (not just its current layout) could survive in a mobile-friendly form?
3. Given this audience's core fear is "am I about to get scammed," is there license/registration information that exists but simply isn't on this page yet?
