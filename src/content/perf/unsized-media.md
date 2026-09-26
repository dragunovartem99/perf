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
lang: html
spot: "Performance panel: Layout shift clusters on image load"
refs:
    - https://web.dev/articles/optimize-cls
---

An image with no size takes no space until it loads, then shoves the text down. `width` and `height` reserve the ratio, and `height: auto` keeps it responsive; embeds need `aspect-ratio`.
