---
order: 3
title: "@import chains"
chapter: loading
metrics: [lcp]
impact: medium
slow: |-
    /* main.css */
    @import url("theme.css");
    @import url("grid.css");
fast: |
    <link rel="stylesheet" href="theme.css">
    <link rel="stylesheet" href="grid.css">
    <!-- or let the bundler concatenate them -->
spot: "Network panel: stylesheets that start only after another finishes"
refs:
    - https://web.dev/articles/preload-scanner
---

An `@import` is found only once the file holding it has downloaded and parsed, so every level is another round trip, all of it render-blocking. `<link>` tags are found at once and fetched in parallel.
