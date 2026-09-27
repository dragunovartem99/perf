---
order: 2
title: Redirects before the page
chapter: loading
phase: ttfb
metrics: [lcp]
impact: medium
slow: |-
    <a href="http://shop.example/sale">Sale</a>
    <!-- → https://shop.example/sale → https://shop.example/sale/ -->
fast: |
    <a href="https://shop.example/sale/">Sale</a>
lang: html
spot: "Lighthouse: “Document request latency”"
detect:
    - 'href="http://'
    - 'redirect\('
    - 'status:\s*30[1278]'
fineWhen: "The redirect keeps an old URL alive for bookmarks and outside links; no page of your own links to it."
refs:
    - https://web.dev/articles/optimize-ttfb
    - https://developer.chrome.com/docs/performance/insights/document-latency
---

Each hop is a round trip, often a new connection, before the first byte. Link to the final URL, trailing slash included; HSTS turns the `http` hop into none.
