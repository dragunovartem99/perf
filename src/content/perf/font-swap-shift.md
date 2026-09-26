---
order: 3
title: Web font reflow
chapter: layout
metrics: [cls, lcp]
impact: medium
slow: |-
    @font-face {
      font-family: "Brand";
      src: url(brand.woff2);
      font-display: swap;
    }
fast: |
    @font-face {
      font-family: "Brand fallback";
      src: local("Arial");
      size-adjust: 104%;     /* tuned to Brand's metrics */
      ascent-override: 92%;
    }
    body { font-family: "Brand", "Brand fallback"; }
spot: "Performance panel: a layout shift right as the font request finishes"
refs:
    - https://developer.chrome.com/blog/font-fallbacks
    - https://web.dev/articles/font-best-practices
---

`swap` paints fallback text at once, then reflows every line when the web font lands with different metrics. Tune a local fallback with `size-adjust` and the `*-override` descriptors so the swap barely moves, and preload the font. Astro's font API and `next/font` generate the fallback — this page uses it.
