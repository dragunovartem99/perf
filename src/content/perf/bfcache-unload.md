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
lang: js
spot: "Application panel → Back/forward cache → Test"
refs:
    - https://web.dev/articles/bfcache
---

The back/forward cache restores a page instantly on Back. An `unload` listener can make the page ineligible, so Back becomes a full reload — and on mobile `unload` often never fires anyway. `pagehide` and `visibilitychange` fire reliably and keep the page cacheable.
