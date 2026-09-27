---
title: Hashed assets that are never cached
chapter: lcp
phase: load-duration
metrics: [lcp, fcp]
impact: medium
slow: |-
    Cache-Control: no-cache # app.3f9a1c.js, asked for every visit
fast: |
    Cache-Control: max-age=31536000, immutable
lang: http
spot: "Lighthouse: “Use efficient cache lifetimes”"
detect:
    - "Cache-Control"
    - "max-age=0"
    - "no-cache"
fineWhen: "The file's name has no content hash — `index.html`, `favicon.ico` — so it has to revalidate."
refs:
    - https://web.dev/articles/optimize-lcp
    - https://web.dev/articles/http-cache
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control
---

Each repeat visit revalidates a file whose hash guarantees it never changed. Cache hashed files for a year; only the HTML that names them stays short-lived.
