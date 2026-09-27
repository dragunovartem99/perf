---
title: One image for every screen
chapter: lcp
phase: load-duration
metrics: [lcp]
impact: high
slow: |-
    <img src="photo-4000w.jpg" alt="…">
fast: |
    <img src="photo-800w.avif" alt="…"
      srcset="photo-800w.avif 800w, photo-1600w.avif 1600w"
      sizes="(min-width: 60rem) 50vw, 100vw">
lang: html
spot: "Lighthouse: “Improve image delivery”"
detect:
    - '<img\s'
    - 'background(-image)?:\s*url\('
fineWhen: "It has `srcset` and `sizes`, an image CDN or framework component resizes it, or it is an SVG."
refs:
    - https://web.dev/articles/optimize-lcp
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images
    - https://web.dev/learn/images
---

A phone downloads 4000 pixels to show 400. `srcset` lists the sizes, `sizes` says how wide the image renders, and the browser picks the smallest sharp one.
