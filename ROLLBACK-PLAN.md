# DNS Cutover & Rollback Plan — vera-visa.com

**Purpose:** a concrete, step-by-step plan for switching `vera-visa.com` from the current
WordPress host to Vercel, with a fast, low-drama way back if something goes wrong.

The core principle: **the WordPress site is the safety net until this plan says otherwise.**
Nothing here involves deleting, cancelling, or unhooking the old host — only changing where
the domain's DNS points, which is fully and quickly reversible on its own.

---

## 0. Before touching anything — capture the current state

Do this first, days before the actual cutover, and save the output somewhere durable (not
just a browser tab):

- [x] DNS is managed at **SiteGround** (Site Tools → Domain → DNS Zone Editor), which also
      appears to be the WordPress host itself. Current records, captured and verified live
      via `dig` on 2026-07-14:

      | Type | Name | Value | TTL |
      |---|---|---|---|
      | A | `vera-visa.com` | `34.174.4.236` | *(not captured — grab from Zone Editor before cutover if you want it exact; otherwise the new low TTL set in Step 1 supersedes it anyway)* |
      | A | `www.vera-visa.com` | `34.174.4.236` | *(same)* |

      **This is the rollback target** — if the cutover needs to be reverted, restore both
      `A` records to `34.174.4.236` at SiteGround's DNS Zone Editor.
- [x] WordPress is hosted at SiteGround (same account as DNS) — access confirmed via
      Site Tools login used to pull the records above.
- [ ] Still worth confirming with SiteGround support (or checking their hosting plan terms)
      that the WordPress site won't get auto-suspended for inactivity once DNS traffic drops
      to zero — SiteGround shouldn't do this on a paid plan, but hasn't been explicitly
      verified.

**Do not skip this step.** Everything below assumes you have this recorded.

---

## 1. Pre-cutover (24–48 hours before)

- [ ] Lower the DNS TTL on the root domain and `www` records to **300 seconds (5 min)**.
      Changes made now won't speed up propagation of *this* change, but they mean any
      change you make *after* this point (including a rollback) propagates fast instead of
      taking up to 24-72h.
- [ ] In Vercel, add `vera-visa.com` (and `www.vera-visa.com`) as a custom domain on the
      project, but don't point DNS at it yet — this lets Vercel provision the SSL
      certificate and show you the exact target records ahead of time.
- [ ] Explicitly verify in Vercel project settings → Deployment Protection that the setting
      will not block the **production** domain once attached (Standard Protection should be
      scoped to preview deployments only, or fully off — confirmed in an earlier session
      that preview URLs were blocking Googlebot-equivalent access; don't let that carry over
      to the real domain).
- [ ] Freeze non-essential content edits from this point through 48h post-cutover, so any
      issue that shows up can be attributed to the hosting change, not conflated with a
      content edit landing at the same time.

---

## 2. Cutover

- [x] Update the DNS records at the registrar/DNS provider to the values Vercel showed you
      in step 1 (typically an `A` record to Vercel's IP, or a `CNAME` for `www`).
- [x] Wait for propagation (should be fast given the lowered TTL — usually minutes, not hours).
      **Done 2026-07-14.** Propagation was near-instant at the authoritative nameservers
      (confirmed via 8.8.8.8 / 1.1.1.1 within a minute); a locally-cached DNS resolver lagged
      behind for a few minutes — if a check looks stale right after cutover, try `dig @8.8.8.8`
      or `curl --resolve` pinned to the new IP before assuming something's wrong.
- [x] Confirm `https://vera-visa.com/` resolves to the new Vercel deployment and loads over
      HTTPS with a valid certificate (not a certificate warning). **Confirmed** — valid cert,
      HTTP/2 200, correct title/canonical.

**Two real gotchas hit during this cutover, worth knowing if this plan is ever re-run:**

1. **No deployment had ever been promoted to Production on this Vercel project** — every
   prior deploy (all session, going back to the original launch) had `target: null`
   (preview-only). Adding the custom domain pointed it at a Production slot that didn't
   exist, so the live domain returned `DEPLOYMENT_NOT_FOUND` for a few minutes immediately
   after DNS went live. Fixed via Vercel dashboard → Deployments → **⋯** → **Promote to
   Production** on the latest `READY` build. If setting this up fresh next time, promote a
   deployment to Production *before* pointing DNS at the domain, not after.
2. **Vercel auto-configured the apex→www redirect backwards.** When both `vera-visa.com` and
   `www.vera-visa.com` were added, Vercel defaulted to redirecting the bare apex domain to
   `www` — the opposite of what every canonical tag, the sitemap, and years of accumulated
   SEO signal on this site assume (bare domain is canonical, no `www`). Fixed in Vercel
   dashboard → Settings → Domains: `vera-visa.com` connected to the **Production**
   environment directly (serves content), `www.vera-visa.com` set to **redirect** to
   `vera-visa.com` (308). Double-check this explicitly if the domain is ever re-added.

---

## 3. Immediate post-cutover verification (do this within the first 30 minutes)

- [x] Re-run the full page sweep against the **real domain** this time (not a preview URL):
      spot-check the homepage, a few service pages, a blog post, and a category page for
      200 status and correct content. **All 200**, canonical/title verified correct on the
      homepage.
- [x] Confirm the 301/308 redirects still work (`/thailand-work-permit-americans/`,
      `/blog/`) on the real domain. **Both confirmed** — 308 to the correct targets.
- [ ] Confirm the contact form actually sends (submit a real test enquiry and check it
      arrives). **Not yet done** — sends a real email to live team inboxes, do this one
      yourself rather than via automated check.
- [x] Confirm the WhatsApp CTA buttons open the correct number. Verified the link on
      `/contact/` points to `wa.me/66908917582`.
- [ ] Submit the new sitemap (`sitemap-index.xml`) in Google Search Console — same
      property, since the domain hasn't changed, but the filename has. **Still to do.**
- [x] Spot-check `robots.txt` is serving and not accidentally blocking the whole site.
      **Confirmed 200.**

---

## 4. Monitoring window (first 48–72 hours)

Check daily, not just once:

- [ ] Google Search Console → Coverage report, watching for a spike in 404s or "Submitted
      URL not found" errors.
- [ ] Vercel's runtime logs / error tracking for unexpected 500s.
- [ ] Actually use the contact form and WhatsApp link yourself once more, a day later —
      confirm nothing silently broke (this is exactly the class of bug the honeypot
      incident earlier in this project was: something that looked fine but wasn't).
- [ ] Keep an eye on whether real enquiries are still coming in via WhatsApp/email at a
      normal rate — a sudden silence is a stronger signal than any dashboard.

---

## 5. Rollback triggers — when to actually revert

Don't wait for a "perfect" case. Revert if, within the monitoring window, you see **any** of:

- A meaningful chunk of real pages returning errors (not just one page — that's a fast
  patch-and-redeploy, not a rollback situation)
- The contact form silently failing (no submissions arriving, no error shown to the user)
- Google Search Console showing a sharp coverage drop or crawl errors across many URLs
- SSL/certificate errors for real visitors
- Anything that would embarrass the business in front of an actual client mid-conversation

## 6. Rollback steps

1. At the DNS provider, restore the **exact records captured in Step 0** — this is why
   that step isn't optional.
2. Because TTL is already low (Step 1), this propagates in minutes.
3. Confirm `https://vera-visa.com/` is serving the WordPress site again.
4. Diagnose the Vercel-side issue with the site still safely on WordPress and no time
   pressure — fix it, verify thoroughly, and re-attempt cutover once confident, rather than
   rushing a second attempt.

---

## Notes

- This plan deliberately does not touch or reconfigure the WordPress hosting at any point —
  it's a pure DNS pointer switch, which is what makes the rollback simple. Don't cancel,
  downgrade, or export-and-delete the WordPress host as part of "launching" the new site;
  that's a separate decision for later, once the new site has been stable in production for
  a while (weeks, not days).
- If anything in Step 0 turns out to be inaccessible (lost DNS/hosting credentials, etc.),
  resolve that *before* scheduling a cutover date — don't cut over without a confirmed way
  back.
