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
---

A lazy image waits for layout to prove it is on screen, so the image that decides LCP is requested last. Never lazy-load above the fold; `fetchpriority="high"` moves it to the front of the queue. A hero set as a CSS `background-image` or injected by script is just as late — the preload scanner cannot see it, so `<link rel="preload">` it.
