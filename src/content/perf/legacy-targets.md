---
order: 3
title: Transpiling for browsers nobody uses
chapter: bundle
metrics: [lcp, inp]
impact: medium
slow: |-
    // browserslist
    "> 0.25%, ie 11"
fast: |
    // browserslist
    "baseline widely available"
lang: js
spot: "Lighthouse: “Avoid serving legacy JavaScript to modern browsers”"
refs:
    - https://web.dev/articles/publish-modern-javascript
    - https://web.dev/baseline
---

ES5 output turns classes and `async` into longer helpers and ships polyfills to browsers that have the feature. Target what visitors run — Baseline is a sane default.
