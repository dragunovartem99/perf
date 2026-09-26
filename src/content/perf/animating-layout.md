---
order: 2
title: Animating layout properties
chapter: rendering
metrics: [fps]
impact: high
slow: |-
    .drawer { transition: left 300ms; }
fast: |
    .drawer { transition: transform 300ms; }
lang: css
spot: "Rendering drawer → Paint flashing: green on every frame"
refs:
    - https://web.dev/articles/animations-guide
    - https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count
---

`left`, `width` and `margin` rerun layout and paint on every frame. `transform` and `opacity` stay on the compositor, smooth even while the main thread is busy.
