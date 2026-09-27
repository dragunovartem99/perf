---
order: 2
title: Importing through a barrel file
chapter: bundle
phase: dependencies
metrics: [lcp, inp]
impact: medium
slow: |-
    import { Button } from "@/components"; // index.ts re-exports 200 modules
fast: |
    import { Button } from "@/components/button";
lang: js
spot: "A bundle visualiser: modules the page never renders, pulled in by one index file"
detect:
    - 'export \* from'
    - 'from ["'']\.\.?/?["'']'
    - 'from ["'']@/\w+["'']'
fineWhen: 'The package is marked `"sideEffects": false` and the bundle report shows only what was imported.'
refs:
    - https://vite.dev/guide/performance
    - https://webpack.js.org/guides/tree-shaking/
---

The bundler must load every re-exported module, and drops one only if it can prove it has no side effects. The dev server loads them all, every time. Import from the file itself.
