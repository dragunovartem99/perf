---
order: 1
title: Rendering every request from scratch
chapter: loading
metrics: [lcp]
impact: high
slow: |-
    Cache-Control: no-store # the origin rebuilds the HTML every visit
fast: |
    Cache-Control: public, s-maxage=60, stale-while-revalidate=600
lang: http
spot: "Network panel → Timing: “Waiting for server response” over 0.8 s"
refs:
    - https://web.dev/articles/optimize-ttfb
    - https://web.dev/articles/ttfb
---

Nothing paints before the first byte, so every millisecond on the server is added to LCP. Let a CDN serve cached HTML and revalidate in the background; keep `no-store` for pages that are truly per-user.
