---
order: 1
title: Importing the whole library
chapter: bundle
metrics: [lcp, inp]
impact: high
slow: |-
    import _ from "lodash";
    const save = _.debounce(persist, 300);
fast: |
    import { debounce } from "lodash-es"; // ES modules tree-shake
    const save = debounce(persist, 300);
lang: js
spot: "A bundle visualiser: one import, one giant block"
refs:
    - https://web.dev/articles/reduce-javascript-payloads-with-tree-shaking
---

CommonJS packages cannot be tree-shaken: import one function and you ship the whole library. Prefer ES module builds with named imports, and check what the platform already has — `structuredClone`, `Intl`, `Array.prototype.toSorted`.
