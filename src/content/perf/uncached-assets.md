---
order: 5
title: Hashed assets that are never cached
chapter: loading
metrics: [lcp]
impact: medium
slow: |-
    Cache-Control: no-cache   # app.3f9a1c.js, revalidated every visit
fast: |
    # hashed files never change: cache them forever
    Cache-Control: public, max-age=31536000, immutable
    # the HTML that names them: always ask
    Cache-Control: no-cache
spot: "Lighthouse: “Serve static assets with an efficient cache policy”"
refs:
    - https://web.dev/articles/http-cache
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control
---

A file with a content hash in its name never changes, yet without a long `max-age` every repeat visit asks for it again. Cache hashed files for a year with `immutable`, and keep the HTML on `no-cache` so a new deploy shows up at once.
