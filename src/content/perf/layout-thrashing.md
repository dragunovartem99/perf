---
title: Layout thrashing
chapter: inp
phase: processing
metrics: [inp]
impact: high
slow: |-
    for (const el of items) el.style.height = el.offsetWidth / 2 + "px";
fast: |
    const widths = items.map((el) => el.offsetWidth);
    items.forEach((el, i) => (el.style.height = widths[i] / 2 + "px"));
lang: js
spot: "Performance panel: purple Layout blocks flagged “Forced reflow”"
detect:
    - "offset(Width|Height|Top|Left)"
    - 'getBoundingClientRect\('
    - 'getComputedStyle\('
    - "scroll(Top|Height)"
fineWhen: "The read happens once per frame, before any write — not inside a loop that also writes."
refs:
    - https://web.dev/articles/optimize-inp
    - https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
    - https://gist.github.com/paulirish/5d52fb081b3570c81e3a
---

In a loop, each read after a write forces layout, once per item. Read everything, then write everything, and layout runs once.
