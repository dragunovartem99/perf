---
order: 6
title: Thousands of rows in one click
chapter: interaction
phase: presentation
metrics: [inp]
impact: medium
slow: |-
    showAll.onclick = () => list.replaceChildren(...rows.map(toRow)); // 5 000 rows
fast: |
    showAll.onclick = () => list.replaceChildren(...rows.slice(0, 50).map(toRow)); // more on scroll
lang: js
spot: "Performance panel → Interactions: a long presentation delay after a short handler"
detect:
    - 'replaceChildren\(\.\.\.'
    - 'innerHTML\s*=.*\.join\('
    - '\.append\(\.\.\.'
fineWhen: "The update adds a few hundred nodes or fewer."
refs:
    - https://web.dev/articles/optimize-inp
    - https://web.dev/articles/dom-size-and-interactivity
---

The handler is quick; styling, laying out and painting 5 000 new rows is not, and the next frame waits for all of it. Render what fits on screen and add the rest as the reader scrolls.
