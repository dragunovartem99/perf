---
order: 2
title: Parser-blocking scripts
chapter: loading
metrics: [lcp]
impact: high
slow: |-
    <head>
      <script src="https://tags.example/a.js"></script>
fast: |
    <script src="/app.js" defer></script>
    <script src="https://tags.example/a.js" async></script>
spot: "Lighthouse: “Eliminate render-blocking resources”"
refs:
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script
    - https://web.dev/articles/efficiently-load-third-party-javascript
---

A classic `<script>` in `<head>` stops the parser until it downloads and runs, so a slow third-party server blanks the page. `defer` runs in order after parsing; `async` runs whenever it lands, for scripts nothing depends on. `type="module"` is deferred already.
