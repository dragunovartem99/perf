---
order: 2
title: One image for every screen
chapter: loading
metrics: [lcp]
impact: high
slow: |-
    <img src="photo-4000w.jpg" alt="…">
fast: |
    <img src="photo-800w.avif" alt="…"
      srcset="photo-400w.avif 400w, photo-800w.avif 800w,
              photo-1600w.avif 1600w"
      sizes="(min-width: 60rem) 50vw, 100vw">
spot: "Lighthouse: “Properly size images”"
refs:
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images
    - https://web.dev/learn/images
---

A phone downloads 4000 pixels to show 400. `srcset` lists the widths that exist, `sizes` says how wide the image is displayed, and the browser picks the smallest one that looks sharp. AVIF and WebP are smaller than JPEG at the same quality.
