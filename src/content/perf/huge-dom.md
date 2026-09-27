---
title: Rendering what nobody sees
chapter: inp
phase: presentation-delay
metrics: [inp]
impact: medium
slow: |-
    list.append(...rows) // 10 000 rows, all rendered
fast: |
    .row { content-visibility: auto; contain-intrinsic-size: auto 3rem; }
lang: js
fastLang: css
spot: "Performance panel: long Recalculate Style and Layout after the list renders"
detect:
    - '\.append\(\.\.\.'
    - "v-for="
    - '\{\w+\.map\('
fineWhen: "The list stays in the low hundreds of rows, or it is already virtualised or paginated."
refs:
    - https://web.dev/articles/dom-size-and-interactivity
    - https://web.dev/articles/content-visibility
    - https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
---

10 000 rows cost style, layout and memory, on screen or not. `content-visibility: auto` skips rendering the off-screen ones and keeps them findable; the nodes still exist, so for very long lists, virtualise.
