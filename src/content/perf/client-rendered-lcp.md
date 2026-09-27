---
title: Content only JavaScript can render
chapter: lcp
phase: render-delay
metrics: [lcp, fcp]
impact: high
slow: |-
    <div id="root"></div>
    <script type="module" src="/app.js"></script>
fast: |
    <div id="root"><h1>Summer sale</h1><img src="hero.avif" alt="…"></div>
    <script type="module" src="/app.js"></script>
lang: html
spot: "Performance panel → LCP breakdown: a long load delay, the image requested only after the script runs"
detect:
    - '<div id="(root|app)"></div>'
    - 'createRoot\('
    - 'createApp\('
fineWhen: "The app sits behind a login and its shell paints something useful at once, or the framework already prerenders the HTML."
refs:
    - https://web.dev/articles/optimize-lcp
    - https://web.dev/articles/rendering-on-the-web
---

An empty `<div>` gives the browser nothing to paint and nothing to preload. The bundle downloads, runs, fetches its data, and only then asks for the hero. Prerender or server-render the HTML; the script can still take over.
