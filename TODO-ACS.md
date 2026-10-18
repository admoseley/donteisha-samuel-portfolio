# TODO: send the contact form through ACS

Part of the shared-email roadmap: https://github.com/admoseley/azure-email-platform/blob/main/docs/ROADMAP.md (see `docs/ADD-A-SITE.md` there for the full procedure).

**Rules (from the platform):** this site gets its **own** Communication Service, linked only to its own sending domain. The sender address is fixed **server-side** — a form may supply a message and a Reply-To (the visitor), never a From. Authenticate with managed identity, not a connection string, where the host allows it.

- **Problem (live bug, platform issue #11):** `contact.html` form (~line 120) says "Thanks" and sends nothing; the file's own comment suggests Formspree — don't, use ACS.
- **Sends as:** `forms@adrianmoseley.com` (she has no domain of her own; the site is on `*.app.adrianmoseley.com`). Registered in azure-email-platform with `verified = false`; DNS at GoDaddy not started (issue #13).
- **Notify:** `dsamuel.professional@gmail.com` (app setting, not hard-coded), visitor as Reply-To.
- **Steps**
  - [ ] Finish #13: confirm nothing else sends as `@adrianmoseley.com`, publish DNS, verify, `verified = true`.
  - [ ] Forms backend: store submission first, then ACS notify (shared forms service, or a small Function App).
  - [ ] Replace the inline `onsubmit` in `contact.html` with a real `fetch()` POST.
  - [ ] Interim: point the form at the existing `mailto:` link until live.
  - [ ] If she later gets her own domain, move to `@thatdomain`.
