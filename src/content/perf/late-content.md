---
order: 2
title: Content injected above the fold
chapter: layout
metrics: [cls]
impact: high
slow: |-
    main.prepend(promoBanner) // after a fetch resolves
fast: |
    .promo-slot { min-height: 6rem; } /* reserve it up front */
    /* or take it out of flow: position: fixed */
spot: "Performance panel: Layout shift clusters, culprit named"
refs:
    - https://web.dev/articles/optimize-cls
    - https://web.dev/articles/cls
---

Banners, ads and embeds load late and push down what the reader was looking at. Reserve their space at the expected size, or put them where nothing moves: below the fold or out of flow. Shifts within 500 ms of a click or key press do not count.
