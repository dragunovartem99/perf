---
order: 3
title: Rendering what nobody sees
chapter: rendering
metrics: [fps, inp]
impact: medium
slow: |-
    list.append(...rows) // 10 000 rows, all rendered
fast: |
    .row { content-visibility: auto; contain-intrinsic-size: auto 3rem; }
lang: js
fastLang: css
spot: "Lighthouse: “Avoid an excessive DOM size”"
refs:
    - https://web.dev/articles/content-visibility
    - https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
---

Every node costs style, layout and memory, on screen or not. `content-visibility: auto` skips the off-screen rows but keeps them findable; for very long lists, virtualise.
