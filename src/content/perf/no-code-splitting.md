---
order: 2
title: One bundle for every route
chapter: bundle
metrics: [lcp, inp]
impact: high
slow: |-
    import { Editor } from "./editor"; // 400 KB, used on one page
fast: |
    button.addEventListener("click", async () => {
      const { Editor } = await import("./editor");
      new Editor(root);
    });
lang: js
spot: "Coverage panel: most of the main bundle unused on load"
refs:
    - https://web.dev/articles/reduce-javascript-payloads-with-code-splitting
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
---

Everything imported statically lands in the first bundle, so every visitor pays for the editor, the charts and the admin panel. A dynamic `import()` moves it into a separate chunk, fetched on the route or click that needs it. `React.lazy`, `defineAsyncComponent` and route-level splitting do the same.
