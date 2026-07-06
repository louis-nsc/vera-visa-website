# Vera Visa Website Rebuild — Project Summary

**Prepared:** 2026-07-03
**Purpose:** Status report for review before DNS cutover / launch.

---

## 1. What this project is

A full rebuild of **vera-visa.com** — currently a WordPress site — into a modern Astro + React
site (the "Vera Visa Design System"), deployed on Vercel. The goal is a pixel-parity, SEO-preserving
replacement: every existing URL keeps working, every page's search rankings carry over, and the
new site fixes a list of known SEO/accessibility problems the WordPress site had.

**Stack:** Astro 5 + React 18 (interactive components only) + TypeScript, styled with the Vera Visa
Design System (no Tailwind/CSS-in-JS), deployed to Vercel with a serverless function for the
contact form. No CMS — every page is a code file in the repo.

**Repository:** `github.com/louis-nsc/vera-visa-website` (private) — 65 commits, all on `main`.

---

## 2. What's been built

| Category | Count | Notes |
|---|---|---|
| Visa service pages | 7 | DTV, Retirement, Guardian, Education, Marriage, Volunteer, Work Permit/Business |
| Nationality hub pages | 4 | Americans, Australians, UK citizens, Canadians |
| Blog/guide articles | ~45 | Cost breakdowns, requirements, comparisons, renewal guides — matches every article on the live WP site |
| Category/topic index pages | 7 | DTV, Education, Guardian, Marriage, Retirement, Volunteer, Work Permits, Uncategorized |
| Core marketing pages | 6 | Homepage, About, Visa Agent overview, Who We Serve, Contact, Reviews |
| **Total pages** | **68** | All independently verified returning HTTP 200 (see §5) |

Every page carries: unique `<title>` (≤65 chars) and meta description (120–158 chars), a
canonical tag, Open Graph + Twitter card tags, and structured data appropriate to its type
(LocalBusiness on the homepage, Service + FAQPage on visa pages, Article on blog posts,
BreadcrumbList sitewide).

---

## 3. Timeline of work

**2026-06-29 — Foundation.** Project scaffolded, design system wired in, layout shell (nav/footer)
built, the shared service-page template built (tabs, accordions, benefit grids, CTAs), and the
first visa page (DTV) built end-to-end to validate the template.

**2026-06-29 → 06-30 — Content build-out.** Remaining 6 service pages, homepage, about page,
blog engine, and the first batch of guide articles. Contact form (WhatsApp primary CTA +
email fallback via a Vercel serverless function) and a Google Reviews widget were built.
Real WhatsApp number and real inboxes were wired in and confirmed live.

**2026-06-30 — Full parity pass.** Systematically compared the new site against Google Search
Console impression/click data and the live WordPress sitemap to find every missing page —
about 30 additional guide articles and infrastructure pages (contact, who-we-serve, category
index pages) were built in this pass, prioritized by real search traffic.

**2026-06-30 — Bug found and fixed:** the contact form's spam honeypot field was named
`company`, which Chrome's autofill silently populated for users with a saved company name in
their browser profile — this false-triggered the bot filter, showing users a fake "success"
message while the email was never actually sent. Caught by a real user test, not code review.
Fixed by renaming the field.

**2026-07-01 — Consistency and design QA.** Cross-checked content figures against the live
site and corrected several inconsistencies (guardian visa financial threshold, work-permit
figures). Added the 4 nationality hub pages with cross-linking. Ran a full design-system
critique pass (the "Impeccable" audit) across the homepage and sitewide — fixed contrast,
hover, and layout bugs.

**2026-07-02 → 07-03 — Per-page critique passes.** Every major page type (retirement, DTV,
education, guardian, marriage, volunteer, work-permits, nationality hubs, visa-agent overview)
went through an individual design/content critique with findings addressed and logged.
Category and blog pages were reviewed and needed no fixes.

**2026-07-03 — Regulatory flag.** A live audit of current Thai visa rules confirmed all core
figures (800K THB retirement, 500K THB DTV, work permit ratios) are still accurate. One
pending change was found and flagged (not yet in force): Thailand's Cabinet has approved
dropping the 60-day visa exemption to 30/15 days, pending official gazette publication. Seven
files got a "pending change" caveat rather than a premature rewrite, so nothing is currently
wrong — but these need a follow-up edit once the change takes effect (search the repo for
"Cabinet approved" to find all seven).

**2026-07-03 (today) — Security fix, deploy, and launch-readiness verification.**
- Found and removed a GitHub Personal Access Token that had been embedded in cleartext in
  the repo's git configuration. Switched authentication to SSH instead (more secure — nothing
  to leak going forward). The exposed tokens were revoked.
- Pushed 20 commits that had been sitting locally unpushed (all of the 07-01 through 07-03
  work above) — these are now live on GitHub and auto-deployed to Vercel.
- Verified all 68 pages return HTTP 200 on the live Vercel deployment, the one intentional
  301 redirect works, `robots.txt` and the sitemap both load, and legacy WordPress attack
  paths (`/wp-admin/`, `/wp-json/`, etc.) are blocked rather than serving real content.
- Cross-referenced the new site against the **live WordPress site's actual sitemap** and
  months of Google Search Console data to check for pages that would 404 on cutover. Found
  one gap: the WordPress blog archive page at `/blog/` has zero search traffic but is a real
  live URL — added a redirect from `/blog/` to the homepage so it doesn't break.

---

## 4. Quality bar achieved

- **Accessibility:** 100/100 Lighthouse accessibility score on all pages, after fixing a
  sitewide color-contrast issue inherited from the original design system tokens and two real
  ARIA/heading-order bugs.
- **SEO fixes vs. the old WordPress site:** homepage title cut from 95 characters to under 65;
  homepage meta description rewritten from a bare service list into an actual sentence;
  structured data added everywhere (the old site had none); render-blocking WordPress plugin
  scripts eliminated entirely.
- **Content accuracy:** every visa figure (financial thresholds, fees, timelines) was
  cross-checked either against the live site content or, where the live site had internal
  inconsistencies, against the official Thai Immigration Bureau.

---

## 5. Where things stand right now

- **Code:** fully pushed to `main` on GitHub, auto-deploying to Vercel on every push.
- **Domain:** still on the Vercel-assigned preview domain — `vera-visa.com` has **not** been
  pointed at the new site yet. The old WordPress site is still live at the real domain.
- **Two small changes made today are staged but not yet pushed:** a documentation note in
  `PLAN.md`, and the `/blog/` redirect fix in `vercel.json`. These need to go out before
  cutover.
- **Contact form:** confirmed working end-to-end (WhatsApp + email) as of 2026-06-30.

---

## 6. Roadmap to launch

1. **Push the two pending fixes** (`/blog/` redirect, `PLAN.md` update).
2. **Lower the DNS TTL** on `vera-visa.com` 24–48 hours ahead of cutover, so the switch (and
   any rollback, if needed) propagates fast.
3. **Add `vera-visa.com` as a custom domain** in the Vercel project settings ahead of time, and
   confirm the production domain is **not** behind Vercel's deployment-protection/SSO wall
   (that's currently on for the preview URLs — if it were accidentally on for the real domain,
   Google would get blocked from crawling it, which would be a serious problem).
4. **Flip DNS** to point `vera-visa.com` at Vercel.
5. **Re-run the full 68-page verification** against the real domain once DNS propagates.
6. **Keep the old WordPress site running (not deleted) for at least a week** as a rollback
   option — just stop pointing DNS at it.
7. **Submit the new sitemap in Google Search Console.** Same property (same domain, so no need
   to set up anything new), but the sitemap filename changes from WordPress's
   `sitemap_index.xml` to Astro's `sitemap-index.xml` — needs to be submitted explicitly.
8. **Monitor Search Console's Coverage report daily for 1–2 weeks** post-launch, watching for
   any unexpected 404s or "not found" errors.
9. **Freeze content changes for a few days** right around the cutover, so any ranking movement
   can be clearly attributed to the hosting change rather than mixed in with content edits.
10. **Run a real PageSpeed Insights / Lighthouse pass** once the real domain is live (couldn't
    get an accurate reading against `astro dev` or the protected preview URL).
11. **Revisit the 7 files flagged for the pending 60-day visa exemption change** once Thailand's
    Royal Gazette publishes the new rule and it takes effect.

---

## 7. Open items worth flagging

- **Guardian visa financial threshold:** the live WordPress site itself has an internal
  inconsistency between two figures (400,000 THB vs 500,000 THB / differing monthly income
  numbers across articles). The new site currently uses 400,000 THB, matching the official Thai
  Immigration Bureau figure and the original service page — but this is worth a final
  confirmation with Pupae/Tofu/Big given it's genuinely ambiguous even among professional visa
  agencies.
- **20,000 THB proof-of-funds note** on the ED and volunteer visa pages is a standard Thailand
  entry requirement (not visa-specific) — flagged in case the team wants to confirm the figure
  from direct client experience.
- **No custom domain attached yet** — this is the main remaining blocker before this can be
  considered genuinely launched, everything else is ready.
