---
order: 1
title: Layout thrashing
chapter: rendering
metrics: [fps, inp]
impact: high
slow: |-
    for (const el of items) {
      el.style.height = el.offsetWidth / 2 + "px";
    }
fast: |
    const widths = items.map((el) => el.offsetWidth); // read all
    items.forEach((el, i) => {
      el.style.height = widths[i] / 2 + "px"; // then write all
    });
spot: "Performance panel: purple Layout blocks flagged “Forced reflow”"
refs:
    - https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
    - https://gist.github.com/paulirish/5d52fb081b3570c81e3a
---

Reading geometry right after a style change forces the browser to run layout immediately — in a loop, once per item. Read everything first, then write everything, and layout runs once.
