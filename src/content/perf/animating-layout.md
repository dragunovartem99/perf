---
order: 2
title: Animating layout properties
chapter: rendering
metrics: [fps]
impact: high
slow: |-
    .drawer { transition: left 300ms; }  /* -20rem → 0 */
fast: |
    .drawer { transition: transform 300ms; }  /* translateX(-100%) → none */
spot: "Rendering drawer → Paint flashing: green on every frame"
refs:
    - https://web.dev/articles/animations-guide
    - https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count
---

`left`, `top`, `width`, `height` and `margin` rerun layout and paint on every frame, on the main thread. `transform` and `opacity` run on the compositor and stay smooth even while JavaScript is busy. Every animation on this page uses only those two.
