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

Banners, ads and embeds arrive late and push what the reader was looking at. Reserve the slot at its expected size, or put it where nothing moves: below the fold or out of flow. Shifts within 500 ms of a click or key press are expected and do not count.
