---
order: 4
title: One bundle for every route
chapter: bundle
phase: splitting
metrics: [lcp, inp]
impact: high
slow: |-
    import { Editor } from "./editor"; // 400 KB, used on one page
fast: |
    const { Editor } = await import("./editor"); // on click
lang: js
spot: "Coverage panel: most of the main bundle unused on load"
detect:
    - 'import \{?\s*\w*(Editor|Chart|Map|Modal|Dialog|Player|Markdown)\w*'
fineWhen: "Every route renders the module on first paint."
refs:
    - https://web.dev/articles/reduce-javascript-payloads-with-code-splitting
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
---

A static import ships 400 KB to every visitor on every route. A dynamic `import()` moves it into a chunk fetched only when needed.
