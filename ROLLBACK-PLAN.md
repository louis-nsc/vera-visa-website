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

- [ ] Log into whatever DNS provider currently manages `vera-visa.com` (registrar, or
      Cloudflare/similar if DNS is delegated there).
- [ ] Screenshot or copy down the **exact current DNS records** for the root domain and `www`:
      record type (A/CNAME/ALIAS), current value(s), and current TTL. This is the literal
      rollback data — without it, "revert DNS" has nothing to revert *to*.
- [ ] Confirm where the WordPress site is actually hosted (host name, and how to log into
      that hosting control panel) and confirm you still have working access to it.
- [ ] Confirm the WordPress site keeps running and reachable at its current hosting
      IP/hostname even after DNS stops pointing at it — i.e. it's not going to be
      auto-suspended or torn down just because traffic drops. (Usually true by default,
      but worth a quick check with the host if unsure.)

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

- [ ] Update the DNS records at the registrar/DNS provider to the values Vercel showed you
      in step 1 (typically an `A` record to Vercel's IP, or a `CNAME` for `www`).
- [ ] Wait for propagation (should be fast given the lowered TTL — usually minutes, not hours).
- [ ] Confirm `https://vera-visa.com/` resolves to the new Vercel deployment and loads over
      HTTPS with a valid certificate (not a certificate warning).

---

## 3. Immediate post-cutover verification (do this within the first 30 minutes)

- [ ] Re-run the full page sweep against the **real domain** this time (not a preview URL):
      spot-check the homepage, a few service pages, a blog post, and a category page for
      200 status and correct content.
- [ ] Confirm the 301/308 redirects still work (`/thailand-work-permit-americans/`,
      `/blog/`) on the real domain.
- [ ] Confirm the contact form actually sends (submit a real test enquiry and check it
      arrives).
- [ ] Confirm the WhatsApp CTA buttons open the correct number.
- [ ] Submit the new sitemap (`sitemap-index.xml`) in Google Search Console — same
      property, since the domain hasn't changed, but the filename has.
- [ ] Spot-check `robots.txt` is serving and not accidentally blocking the whole site.

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
