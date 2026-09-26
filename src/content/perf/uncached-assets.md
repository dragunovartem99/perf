---
order: 7
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

A file whose name carries its content hash can never go stale, yet without a long `max-age` every repeat visit re-requests it. Cache hashed assets for a year with `immutable`; keep the HTML on `no-cache` so a deploy is picked up at once.
