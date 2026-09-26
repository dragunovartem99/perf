---
order: 6
title: unload blocks the back button
chapter: loading
metrics: [lcp]
impact: medium
slow: |-
    addEventListener("unload", saveDraft)
fast: |
    addEventListener("pagehide", saveDraft);
    // or visibilitychange → "hidden", the last reliable moment on mobile
spot: "Application panel → Back/forward cache → Test"
refs:
    - https://web.dev/articles/bfcache
---

The back/forward cache restores a page instantly. An `unload` listener can make a page ineligible, turning Back into a full reload — and on mobile it often never fires anyway. `pagehide` and `visibilitychange` fire reliably and keep the page cacheable.
