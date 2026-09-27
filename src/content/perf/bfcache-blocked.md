---
title: Unload handlers that break the back button
chapter: cls
phase: bfcache
metrics: [cls, ttfb, fcp, lcp]
impact: high
slow: |-
    addEventListener("unload", () => navigator.sendBeacon("/log", stats));
fast: |
    addEventListener("pagehide", () => navigator.sendBeacon("/log", stats));
lang: js
spot: "Application panel → Back/forward cache: “Test back/forward cache”"
detect:
    - 'addEventListener\(["'']unload'
    - "onunload"
    - 'addEventListener\(["'']beforeunload'
fineWhen: "`beforeunload` is added only while there are unsaved changes, and removed once they are saved."
refs:
    - https://web.dev/articles/optimize-cls
    - https://web.dev/articles/bfcache
    - https://developer.chrome.com/docs/web-platform/deprecating-unload
---

Back and forward could restore the page from memory, laid out and scrolled where the reader left it. An `unload` listener rules that out, so the page loads again from the network, shifts and all. `pagehide` fires in the same places and keeps the cache.
