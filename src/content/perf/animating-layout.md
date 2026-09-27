---
title: Animating layout properties
chapter: cls
phase: animations
metrics: [cls, inp]
impact: high
slow: |-
    .drawer { transition: left 300ms; }
fast: |
    .drawer { transition: transform 300ms; }
lang: css
spot: "Rendering drawer → Paint flashing: green on every frame"
detect:
    - 'transition:[^;]*\b(top|left|right|bottom|width|height|margin|padding)\b'
    - "@keyframes"
fineWhen: "Only `transform`, `opacity` or `filter` change, or it runs once on a small element."
refs:
    - https://web.dev/articles/optimize-cls
    - https://web.dev/articles/animations-guide
    - https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count
---

`left`, `width` and `margin` move the layout itself: every frame reruns layout and paint, and whatever moves without a recent input counts as a shift. `transform` and `opacity` stay on the compositor and count as neither.
