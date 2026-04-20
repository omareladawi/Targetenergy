# Target Energy website

## SEO and indexing notes

- Canonical URLs are set to the HTTPS domain (`https://targetenergyit.com/`) across the HTML pages.
- Internal "Home" links use `/` to reduce duplicate crawling of `/index.html` vs `/`.
- `about.html` is a legacy URL kept out of indexing with `noindex,follow` and canonicalized to `chi-siamo.html`.

## Required hosting-level settings (outside this repository)

To fully enforce canonical HTTPS and reduce Search Console duplication, configure at hosting/CDN level:

1. 301 redirect `http://targetenergyit.com/*` -> `https://targetenergyit.com/$1`
2. 301 redirect `https://www.targetenergyit.com/*` -> `https://targetenergyit.com/$1`
3. (Recommended) 301 redirect `/index.html` -> `/`
