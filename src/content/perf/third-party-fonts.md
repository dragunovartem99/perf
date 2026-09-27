---
order: 9
title: Fonts from a third-party stylesheet
chapter: loading
phase: load-duration
metrics: [lcp, cls]
impact: medium
slow: |-
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700");
fast: |
    @font-face {
      font-family: "Inter";
      src: url("/fonts/inter-latin.woff2") format("woff2");
      font-weight: 100 900;
    }
lang: css
spot: "Network panel → Font: requests to a second origin, starting after two stylesheets"
detect:
    - 'fonts\.googleapis\.com'
    - 'use\.typekit\.net'
    - '@import url\('
fineWhen: "A framework already downloads and self-hosts the font at build time, as Astro's font API and `next/font` do."
refs:
    - https://web.dev/articles/font-best-practices
    - https://developer.chrome.com/blog/http-cache-partitioning
---

The font is found only after two stylesheets and a new connection. Caches are partitioned by site, so no visitor arrives with it already downloaded. Self-host one variable file, and preload it if it sets the LCP text.
