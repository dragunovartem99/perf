---
order: 7
title: The hero on a cold origin
chapter: loading
phase: load-delay
metrics: [lcp]
impact: medium
slow: |-
    <img src="https://cdn.example/hero.avif" alt="…">
fast: |
    <link rel="preconnect" href="https://cdn.example">
    <img src="https://cdn.example/hero.avif" alt="…">
lang: html
spot: "Network panel → Timing: DNS lookup, Initial connection and SSL on the hero request"
detect:
    - 'src="https://'
    - 'url\(["'']?https://'
fineWhen: "The resource is served from the page's own origin, is not needed for the first paint, or the origin is already preconnected."
refs:
    - https://web.dev/articles/preconnect-and-dns-prefetch
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preconnect
---

A new origin costs a DNS lookup, a TCP handshake and TLS: up to three round trips before the first byte. Preconnect to the one or two origins the first paint needs; more than that wastes the connections.
