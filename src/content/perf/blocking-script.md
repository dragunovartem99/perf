---
order: 2
title: Parser-blocking scripts
chapter: loading
metrics: [lcp]
impact: high
slow: |-
    <script src="/app.js"></script>
fast: |
    <script src="/app.js" defer></script>
lang: html
spot: "Lighthouse: “Eliminate render-blocking resources”"
refs:
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script
    - https://web.dev/articles/efficiently-load-third-party-javascript
---

The page stays blank while the script downloads and runs. `defer` runs it after parsing, in order; `async` runs it on arrival, for scripts nothing depends on.
