---
order: 4
title: Lazy-loaded hero image
chapter: loading
metrics: [lcp]
impact: high
slow: |-
    <img src="hero.avif" loading="lazy" alt="…">
fast: |
    <img src="hero.avif" fetchpriority="high" alt="…">
lang: html
spot: "Lighthouse: “Largest Contentful Paint image was lazily loaded”"
refs:
    - https://web.dev/articles/optimize-lcp
    - https://web.dev/articles/fetch-priority
    - https://web.dev/articles/browser-level-image-lazy-loading
---

The image that decides LCP waits until layout proves it is on screen. Never lazy-load above the fold; a hero set as a CSS background needs `<link rel="preload">`.
