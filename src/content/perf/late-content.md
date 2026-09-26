---
order: 2
title: Content injected above the fold
chapter: layout
metrics: [cls]
impact: high
slow: |-
    main.prepend(promoBanner) // after a fetch resolves
fast: |
    .promo-slot { min-height: 6rem; }
lang: js
fastLang: css
spot: "Performance panel: Layout shift clusters, culprit named"
refs:
    - https://web.dev/articles/optimize-cls
    - https://web.dev/articles/cls
---

A late banner pushes away whatever the reader was looking at. Reserve its space up front, or put it below the fold or out of flow.
