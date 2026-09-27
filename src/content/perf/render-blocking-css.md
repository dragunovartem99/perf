---
title: One stylesheet for the whole site
chapter: fcp
metrics: [fcp, lcp]
impact: medium
slow: |-
    <link rel="stylesheet" href="/site.css"> <!-- 300 KB, every page -->
fast: |
    <link rel="stylesheet" href="/home.css"> <!-- 20 KB, this page -->
lang: html
spot: "Coverage panel: most of the stylesheet unused on load"
detect:
    - '<link rel="stylesheet"'
    - 'import ["''][^"'']+\.css["'']'
fineWhen: "The stylesheet is a few tens of KB compressed, or the build already splits it by route."
refs:
    - https://web.dev/articles/fcp
    - https://web.dev/articles/extract-critical-css
    - https://developer.chrome.com/docs/devtools/coverage
---

Nothing paints until every stylesheet in the `<head>` has downloaded and parsed. Give each page the CSS it uses, split by route or component, and inline the little the first paint needs.
