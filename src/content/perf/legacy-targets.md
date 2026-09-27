---
title: Transpiling for browsers nobody uses
chapter: inp
phase: input-delay
metrics: [inp, lcp]
impact: medium
slow: |-
    // browserslist
    "> 0.25%, ie 11"
fast: |
    // browserslist
    "baseline widely available"
lang: js
spot: "Lighthouse: “Legacy JavaScript”"
detect:
    - "browserslist"
    - 'ie\s*11'
    - '["'']target["'']:\s*["'']es5'
    - "@babel/preset-env"
fineWhen: "Analytics show real traffic from those browsers, and they get a separate legacy build."
refs:
    - https://web.dev/articles/script-evaluation-and-long-tasks
    - https://web.dev/articles/publish-modern-javascript
    - https://web.dev/baseline
---

ES5 output turns classes and `async` into longer helpers and ships polyfills to browsers that have the feature. Target what visitors actually run; Baseline is a sane default.
