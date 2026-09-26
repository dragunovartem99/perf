---
order: 3
title: Transpiling for browsers nobody uses
chapter: bundle
metrics: [lcp, inp]
impact: medium
slow: |-
    // browserslist
    "> 0.25%, ie 11"   // ES5 output + core-js for everyone
fast: |
    // browserslist
    "baseline widely available"
spot: "Lighthouse: “Avoid serving legacy JavaScript to modern browsers”"
refs:
    - https://web.dev/articles/publish-modern-javascript
    - https://web.dev/baseline
---

Down-levelling to ES5 turns classes, `async` and spread into longer, slower helpers, and polyfills ship to every browser that already has the feature. Target what your visitors run — Baseline is a sane default — and the same source comes out smaller and faster to parse.
