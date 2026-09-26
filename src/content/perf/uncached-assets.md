---
order: 6
title: Hashed assets that are never cached
chapter: loading
metrics: [lcp]
impact: medium
slow: |-
    Cache-Control: no-cache # app.3f9a1c.js, asked for every visit
fast: |
    Cache-Control: max-age=31536000, immutable
lang: http
spot: "Lighthouse: “Serve static assets with an efficient cache policy”"
refs:
    - https://web.dev/articles/http-cache
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control
---

Every repeat visit asks again for a file whose name guarantees it never changes. Cache hashed files for a year; only the HTML that names them stays short-lived.
