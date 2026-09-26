---
order: 3
title: Rendering what nobody sees
chapter: rendering
metrics: [fps, inp]
impact: medium
slow: |-
    list.append(...rows) // 10 000 rows, all laid out and painted
fast: |
    .row {
      content-visibility: auto;
      contain-intrinsic-size: auto 3rem;
    }
    /* or virtualise: render only the rows on screen */
spot: "Lighthouse: “Avoid an excessive DOM size”"
refs:
    - https://web.dev/articles/content-visibility
    - https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
---

Every node costs style, layout and memory, and a change can recheck the whole tree. `content-visibility: auto` skips rendering off-screen rows but keeps them in the DOM for find-in-page and screen readers; `contain-intrinsic-size` reserves their height. For very long lists, virtualise.
