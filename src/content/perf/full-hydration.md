---
order: 3
title: Hydrating the whole page
chapter: interaction
metrics: [inp]
impact: high
slow: |-
    hydrateRoot(document, <App />) // every paragraph too
fast: |
    <Article />
    <Comments client:visible />
lang: jsx
spot: "Performance panel: one long Evaluate Script task after first paint"
refs:
    - https://web.dev/articles/rendering-on-the-web
    - https://docs.astro.build/en/concepts/islands/
---

The page looks ready, but clicks do nothing until every component has run again. Ship JavaScript only for the interactive parts, and hydrate them when needed.
