# SEO checklist (outside repository)

- [ ] Enforce HTTPS at hosting/CDN level.
- [ ] Add permanent redirects (301):
  - `http://targetenergyit.com/*` -> `https://targetenergyit.com/$1`
  - `https://www.targetenergyit.com/*` -> `https://targetenergyit.com/$1`
- [ ] In Google Search Console:
  - Submit `https://targetenergyit.com/sitemap.xml`
  - Run URL Inspection and request indexing for key pages (`/`, `chi-siamo.html`, `cosa%20facciamo.html`, `clients.html`, `contact.html`)
