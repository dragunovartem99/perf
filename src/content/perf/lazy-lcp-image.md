---
order: 1
title: Lazy-loaded hero image
chapter: loading
metrics: [lcp]
impact: high
slow: |-
    <img src="hero.avif" loading="lazy" alt="…">
fast: |
    <img src="hero.avif" fetchpriority="high"
      width="1200" height="600" alt="…">
spot: "Lighthouse: “Largest Contentful Paint image was lazily loaded”"
refs:
    - https://web.dev/articles/optimize-lcp
    - https://web.dev/articles/fetch-priority
    - https://web.dev/articles/browser-level-image-lazy-loading
---

A lazy image is not requested until layout proves it is on screen, so the image that decides LCP arrives last. Never lazy-load above the fold — below it, `loading="lazy"` is right. `fetchpriority="high"` moves the hero to the front of the queue. A hero set as a CSS `background-image` or inserted by script is just as late, because the preload scanner cannot see it: `<link rel="preload">` it.
