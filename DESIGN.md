---
name: Vera Visa
description: A stamped-passport design language for a Chiang Mai visa agency — calm, precise, warm.
colors:
  ink: "#15130F"
  paper: "#FFFFFF"
  signal: "#ED5C0D"
  signal-deep: "#C8470A"
  signal-deeper: "#A03808"
  sand: "#F7F1E8"
  line: "#E4DCCB"
  approved: "#1E7A4D"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "4rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "2.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "1.4375rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.08em"
rounded:
  card: "4px"
  pill: "999px"
  sm: "2px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "48px"
  8: "64px"
  9: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.signal-deeper}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  service-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px"
---

# Design System: Vera Visa

## 1. Overview

**Creative North Star: "The Stamped Passport"**

Vera Visa's interface reads as a physical document being processed by a trusted local expert, not a SaaS dashboard wearing a travel theme. Every recurring surface — the hero, the six service cards, the testimonial, the contact form — takes the shape of a stamped visa page or boarding-pass stub: a flat paper or sand rectangle, a hairline warm border, monospace data fields, and exactly one orange mark standing in for the stamp itself. The system explicitly rejects two adjacent aesthetics: the cold blue corporate-agency template (no navy, no generic enterprise chrome, no trust-badge iconography) and the delicate boutique law-firm look (no precious serif-on-cream fragility, no white-glove minimalism). Vera Visa is warm and used-daily, like a well-worn passport, not a framed diploma on a wall.

Specificity is part of the visual system, not just the copy: real THB figures, week counts, and visa codes sit in the same monospace voice as the eyebrows, so precision reads as a design property. Orange never spreads — it marks one button, one status dot, one highlighted word per view, exactly like a stamp on a page rather than a wash of brand color.

**Key Characteristics:**
- Flat, printed-document surfaces — no shadows, no gradients, no glass
- One accent color (Visa Stamp Orange) marking exactly one thing per view
- Monospace data fields and eyebrows carrying the "official document" precision
- Fraunces display type for warmth and confidence; Inter for dense, readable body copy under stress
- A perforated tear-off edge as the system's one signature ornamental detail

## 2. Colors

The palette is a Restrained-to-Committed strategy: warm near-black and paper carry the page, one saturated orange marks the important thing, and sand alternates with paper for section rhythm — never a third neutral competing for attention.

### Primary
- **Visa Stamp Orange** (#ED5C0D): The one accent. Status dots, active tab underline, a single highlighted word in a headline, hover states. Nudged 7% darker than the brand brief's #FF630F specifically so it clears WCAG AA at large-text sizes against Manila Folder Sand — the darkening is load-bearing, not a stylistic choice.
- **Stamp Orange Deep** (#C8470A): Default background for filled buttons and body-size accent text (4.81:1 against white — passes WCAG AA at body size, which raw Visa Stamp Orange does not).
- **Stamp Orange Deepest** (#A03808): Button hover/pressed state only (6.85:1 contrast).

### Neutral
- **Warm Document Ink** (#15130F): Primary text, headlines, dark section backgrounds (footer, final CTA band). Never pure black — always this warm near-black.
- **Passport Paper** (#FFFFFF): Primary background and card surface.
- **Manila Folder Sand** (#F7F1E8): Alternating section background. Never the default page background — it alternates with Passport Paper for rhythm, per **The Alternating Ledger Rule** below.
- **Ledger Line** (#E4DCCB): The only hairline/border/divider color anywhere in the system. Never gray — always this warm line color.

### Named Rules
**The One Stamp Rule.** Orange marks exactly one thing per view — a button, a status dot, one highlighted word in a headline. It is never a background wash, never a section fill, never more than 10% of any surface. If two elements are orange in the same view, one of them is wrong.

**The Alternating Ledger Rule.** Sections alternate Passport Paper and Manila Folder Sand instead of gray dividers or drop shadows to create rhythm down a long page. A page that is all-paper or all-sand has lost its rhythm.

**The No-Gray Rule.** There is no gray in this system. Every neutral — border, secondary text, divider — is a tint of Warm Document Ink or a warm sand/line value. A cool gray anywhere is a bug.

## 3. Typography

**Display Font:** Fraunces (with Georgia, Times New Roman fallback)
**Body Font:** Inter (with system sans fallback)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace fallback)

**Character:** A soft-serif, confident display face paired with a dense, highly-legible grotesque body and a tracked-out mono for data — the pairing of a passport's engraved title page with its typed visa stamp fields. Fraunces carries warmth and trust; IBM Plex Mono carries precision and officialdom; Inter disappears into readable paragraphs for visitors reading carefully under stress.

*Note on font choice: Fraunces and IBM Plex Mono both sit on Impeccable's greenfield reflex-reject list, but that list governs new decisions — this brand already shipped on these fonts as part of its committed identity (see DS README), so identity-preservation wins here. Do not swap them out on a future pass just because they'd be rejected on a blank-slate brief.*

### Hierarchy
- **Display** (600, 4rem / clamp to viewport, 1.05 line-height): Hero headline only. One per page.
- **Headline** (600, 2.75rem, 1.25 line-height, -0.02em tracking): Section headers.
- **Title** (600, 1.4375rem, 1.25 line-height): Card group titles, hero sub-headline, service card names.
- **Body** (400, 1rem, 1.6 line-height): Standard copy. 65–75ch max line length. A larger 1.125rem step exists for intro paragraphs, a smaller 0.875rem step for dense legal/caption copy.
- **Label** (500, 0.8125rem, 0.08em tracking, uppercase): Eyebrows and data fields. An 0.6875rem / 0.14em-tracked micro-label variant exists for the smallest data (perforation captions, tiny status text).

### Named Rules
**The Engraved Headline Rule.** Fraunces appears only at Title size and above. It never sets body copy, form labels, or button text — those stay in Inter or mono. Mixing Fraunces into small UI text breaks the "engraved title page vs. typed field" contrast the pairing depends on.

## 4. Elevation

Flat by default, no exceptions. This system uses zero shadows anywhere — depth and separation come entirely from a 1px Ledger Line border and the alternating Passport Paper / Manila Folder Sand section rhythm. A `--shadow-none` token exists specifically to make this explicit and prevent a future shadow from sneaking in as a "just this once."

### Named Rules
**The Flat Ledger Rule.** No `box-shadow` appears anywhere in this system, on any element, in any state — not on hover, not on cards, not on the sticky nav. Separation is a border or a background change, never a shadow. If you're reaching for a shadow to make something feel "lifted," reach for a border-color change instead (see Service Cards below).

## 5. Components

### Buttons
- **Shape:** Full pill (999px radius) — the only fully-rounded shape in the system besides the status dot.
- **Primary:** Stamp Orange Deep (#C8470A) background, Passport Paper text, 14px vertical / 32px horizontal padding, semibold Inter.
- **Hover / Focus:** Background darkens to Stamp Orange Deepest (#A03808) over 120ms, no scale, no shadow.
- **Secondary (dark-section variant):** On Warm Document Ink backgrounds (footer, final CTA band), the primary button keeps the same orange fill — it is the one thing on the dark surface that reads as "the stamp."

### Cards
- **Corner Style:** 4px radius — sharp enough to read as an official document corner, not a playful app-card corner. Never more rounded than this, never square.
- **Background:** Passport Paper on Passport Paper or Manila Folder Sand sections alike; the card is always paper, regardless of section background.
- **Shadow Strategy:** None (see Elevation). Separation from the page is the 1px Ledger Line border only.
- **Border:** 1px Ledger Line at rest; firms to 1px Warm Document Ink on hover (Service Cards) as the sole hover affordance — no shadow, no lift, no scale.
- **Internal Padding:** 32px (--space-6).

### Inputs / Fields
- **Style:** Passport Paper background, 1px Ledger Line border, 4px radius, Inter body text, mono uppercase label above each field (11px, 0.1em tracking, Warm Document Ink at 45% tint).
- **Focus:** Border color shifts to Visa Stamp Orange. No glow, no ring, no shadow.
- **Error / Disabled:** Error text and submit-hover both route through the Stamp Orange Deep/Deeper pair, never a separate red — the system has exactly one alert-adjacent hue, and it's the accent itself, kept legible via the deep variant.

### Navigation
- Sticky top nav, Passport Paper background, 1px Ledger Line bottom border (not a shadow) to separate from page content on scroll. Links are plain Inter; the WhatsApp CTA is the one pill-shaped, orange-filled element in the bar. Dropdown caret is the mono `▾` glyph, not an icon font.

### Service Cards (signature component)
The system's defining recurring surface: a stamped-document card carrying a mono visa-code eyebrow (e.g. "DTV", "O-A"), a Fraunces title, Inter description, and an orange mono arrow (`→`) that slides in on hover. Border firms from Ledger Line to Warm Document Ink on hover — the card's only hover affordance, paired with the arrow reveal. No icon-grid treatment; each card is a document, not an icon tile.

## 6. Do's and Don'ts

### Do:
- **Do** keep orange to one mark per view: one button, one status dot, or one highlighted headline word (**The One Stamp Rule**).
- **Do** alternate Passport Paper and Manila Folder Sand section backgrounds for rhythm instead of gray dividers (**The Alternating Ledger Rule**).
- **Do** use a 1px Ledger Line border as the only separation mechanic — never a shadow (**The Flat Ledger Rule**).
- **Do** keep real numbers (THB amounts, week counts, visa codes) in the mono label voice; specificity is part of the visual design, not just the copy.
- **Do** firm a card's border from Ledger Line to Warm Document Ink on hover as the primary interactive affordance.

### Don't:
- **Don't** build a cold blue corporate-agency template — no navy, no generic enterprise-SaaS chrome or trust badges.
- **Don't** build a delicate boutique law-firm look — no precious serif-on-cream fragility, no over-formal white-glove minimalism.
- **Don't** use an icon-grid services section with generic line icons. Services are status-card documents, not icon tiles.
- **Don't** add any `box-shadow` anywhere, in any state.
- **Don't** let orange spread into a background wash or cover more than ~10% of a view.
- **Don't** use gray anywhere — every neutral is a warm tint of ink or sand/line.
- **Don't** set body copy, labels, or button text in Fraunces — it is reserved for Title size and above.
- **Don't** use full-bleed generic stock photography (handshakes, passports, airports); if imagery is ever added, it must be real Chiang Mai/team photography.
