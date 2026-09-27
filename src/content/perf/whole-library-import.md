---
title: Importing the whole library
chapter: inp
phase: input-delay
metrics: [inp, lcp]
impact: high
slow: |-
    import _ from "lodash";
fast: |
    import { debounce } from "lodash-es";
lang: js
spot: "A bundle visualiser: one import, one giant block"
detect:
    - 'import \w+ from ["''](lodash|moment|rxjs|date-fns)["'']'
    - 'import \* as \w+ from'
    - 'require\(["'']lodash["'']\)'
fineWhen: "The package is an ES module marked `sideEffects: false`, and the bundle report shows the import costs a few KB."
refs:
    - https://web.dev/articles/script-evaluation-and-long-tasks
    - https://web.dev/articles/reduce-javascript-payloads-with-tree-shaking
---

One function costs the whole library: CommonJS can't be tree-shaken. Use ES module builds with named imports, or the platform: `structuredClone`, `Intl`, `toSorted`.
