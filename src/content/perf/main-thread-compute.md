---
order: 2
title: Heavy work on the main thread
chapter: interaction
metrics: [inp]
impact: medium
slow: |-
    input.oninput = () => render(search(index, input.value)); // 200 ms
fast: |
    input.oninput = () => worker.postMessage(input.value);
    worker.onmessage = (e) => render(e.data);
lang: js
spot: "Performance panel: long tasks on every keystroke"
refs:
    - https://web.dev/articles/off-main-thread
    - https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
---

Every keystroke waits for the search. Work that doesn't touch the DOM belongs in a Web Worker — send it the query, not the whole index.
