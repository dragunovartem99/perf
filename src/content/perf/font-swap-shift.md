---
order: 3
title: Web font reflow
chapter: layout
metrics: [cls, lcp]
impact: medium
slow: |-
    @font-face { font-family: "Brand"; src: url(brand.woff2); font-display: swap; }
fast: |
    @font-face { font-family: "Brand fallback"; src: local("Arial"); size-adjust: 104%; }
    body { font-family: "Brand", "Brand fallback"; }
lang: css
spot: "Performance panel: a layout shift right as the font request finishes"
refs:
    - https://developer.chrome.com/blog/font-fallbacks
    - https://web.dev/articles/font-best-practices
---

Every line reflows when the web font arrives with different metrics. A local fallback tuned with `size-adjust` swaps without moving — Astro's font API and `next/font` generate one.
