---
order: 3
title: Hydrating the whole page
chapter: interaction
metrics: [inp]
impact: high
slow: |-
    hydrateRoot(document, <App />) // every static paragraph included
fast: |
    <Article />                          {/* HTML only, no JS */}
    <Comments client:visible />          {/* hydrated on scroll */}
    <SearchBox client:idle />
spot: "Performance panel: one long Evaluate Script task after first paint"
refs:
    - https://web.dev/articles/rendering-on-the-web
    - https://docs.astro.build/en/concepts/islands/
---

Server-rendered HTML looks ready, but a click is ignored until hydration has downloaded the code, rerun every component and attached the handlers — one long task right when people start tapping. Ship JavaScript only for the parts that are interactive, and hydrate them when they are needed: islands, server components, or resumability.
