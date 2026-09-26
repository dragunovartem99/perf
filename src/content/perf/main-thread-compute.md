---
order: 2
title: Heavy work on the main thread
chapter: interaction
metrics: [inp]
impact: medium
slow: |-
    input.addEventListener("input", () => {
      render(fuzzySearch(index, input.value)); // 200 ms per key
    });
fast: |
    const worker = new Worker("search.js", { type: "module" });
    input.addEventListener("input", () => worker.postMessage(input.value));
    worker.addEventListener("message", (e) => render(e.data));
spot: "Performance panel: long tasks on every keystroke"
refs:
    - https://web.dev/articles/off-main-thread
    - https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
---

Parsing, searching, sorting and diffing do not need the DOM, so they do not need the main thread. A Web Worker runs them in parallel and typing stays instant. Messages are copied: send the query and the results, not the whole index.
