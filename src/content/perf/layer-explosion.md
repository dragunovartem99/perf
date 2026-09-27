---
order: 7
title: A layer for everything
chapter: rendering
phase: paint
metrics: [fps]
impact: medium
slow: |-
    * { will-change: transform; }
fast: |
    .drawer.is-opening { will-change: transform; }
lang: css
spot: "Layers panel: hundreds of layers, and the memory they hold"
detect:
    - "will-change"
    - 'translateZ\(0\)'
    - 'translate3d\(0'
fineWhen: "A handful of elements that animate often."
refs:
    - https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
    - https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count
---

Each layer costs GPU memory and compositing time; on a phone, hundreds of them drop the frames they were meant to save. Promote only what is about to move, and only while it moves.
