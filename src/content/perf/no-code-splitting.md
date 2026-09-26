---
order: 2
title: One bundle for every route
chapter: bundle
metrics: [lcp, inp]
impact: high
slow: |-
    import { Editor } from "./editor"; // 400 KB, used on one page
fast: |
    const { Editor } = await import("./editor"); // on click
lang: js
spot: "Coverage panel: most of the main bundle unused on load"
refs:
    - https://web.dev/articles/reduce-javascript-payloads-with-code-splitting
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
---

Everything imported statically ships to every visitor. A dynamic `import()` moves it into a chunk fetched only when it is needed.
