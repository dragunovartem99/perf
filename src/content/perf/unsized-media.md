---
order: 1
title: Images without dimensions
chapter: layout
metrics: [cls]
impact: high
slow: |-
    <img src="banner.avif" alt="…">
fast: |
    <img src="banner.avif" width="1200" height="400" alt="…">
    /* with img { max-width: 100%; height: auto } it stays responsive */
spot: "Performance panel: Layout shift clusters on image load"
refs:
    - https://web.dev/articles/optimize-cls
---

Until the bytes arrive, the browser does not know how tall an image is, so it reserves nothing and shoves the text down when it lands. `width` and `height` give it the aspect ratio up front. For iframes, video and embeds, set `aspect-ratio`.
