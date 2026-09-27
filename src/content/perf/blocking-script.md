---
title: Parser-blocking scripts
chapter: fcp
metrics: [fcp, lcp]
impact: high
slow: |-
    <script src="/app.js"></script>
fast: |
    <script src="/app.js" defer></script>
lang: html
spot: "Lighthouse: “Render blocking requests”"
detect:
    - '<script\s[^>]*src='
fineWhen: 'It has `defer`, `async` or `type="module"` (modules defer by default), or it sits at the end of `<body>`.'
refs:
    - https://web.dev/articles/fcp
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script
    - https://web.dev/articles/efficiently-load-third-party-javascript
---

Nothing below the tag renders while the script downloads and runs. `defer` runs it after parsing, in order; `async` runs it on arrival, for scripts nothing depends on.
