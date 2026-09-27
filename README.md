# perf

Frontend performance cheatsheet — one card per slowdown: the slow code, the fast fix, and where DevTools or Lighthouse points at it.

**Live:** https://dragunovartem99.github.io/perf

## How it is organised

Nothing is grouped by feel. The chapters are the five [Web Vitals](https://web.dev/articles/vitals) in the order a page load reaches them — TTFB, FCP, LCP, CLS, INP. web.dev pairs the two supporting vitals with their causes: TTFB with the server, FCP with render-blocking resources.

- **Chapter:** an entry goes under the vital whose official guide prescribes its fix ([TTFB](https://web.dev/articles/optimize-ttfb), [FCP](https://web.dev/articles/fcp), [LCP](https://web.dev/articles/optimize-lcp), [CLS](https://web.dev/articles/optimize-cls), [INP](https://web.dev/articles/optimize-inp)); if several do, the first in load order. The entry's first ref is that guide, and the build rejects any other.
- **Phase:** the breakdown Google publishes for the vital — TTFB's request phases, LCP's subparts, CLS's common causes, INP's three phases. FCP has none.
- **Hurts:** every vital the entry makes worse, its own first.
- **Order:** by phase, then the worst first, then by title — nothing is placed by hand.

A fix no official guide prescribes is out of scope.

## Catalog

| Vital | Phase                     | Slowdown                                   | Hurts               | Impact |
| ----- | ------------------------- | ------------------------------------------ | ------------------- | ------ |
| TTFB  | Redirects                 | Redirects before the page                  | TTFB, FCP, LCP      | medium |
| TTFB  | Request                   | Rendering every request from scratch       | TTFB, FCP, LCP      | high   |
| FCP   | —                         | Parser-blocking scripts                    | FCP, LCP            | high   |
| FCP   | —                         | One stylesheet for the whole site          | FCP, LCP            | medium |
| FCP   | —                         | Fonts behind someone else's stylesheet     | FCP, LCP, CLS       | medium |
| LCP   | Resource load delay       | Lazy-loaded hero image                     | LCP                 | high   |
| LCP   | Resource load duration    | One image for every screen                 | LCP                 | high   |
| LCP   | Resource load duration    | Hashed assets that are never cached        | LCP, FCP            | medium |
| LCP   | Element render delay      | Request waterfall                          | LCP                 | high   |
| LCP   | Element render delay      | Content only JavaScript can render         | LCP, FCP            | high   |
| CLS   | Images without dimensions | Images without dimensions                  | CLS                 | high   |
| CLS   | Late-loaded content       | Content that arrives without its space     | CLS                 | high   |
| CLS   | Animations                | Animating layout properties                | CLS, INP            | high   |
| CLS   | Web fonts                 | Web font reflow                            | CLS                 | medium |
| CLS   | bfcache                   | Unload handlers that break the back button | CLS, TTFB, FCP, LCP | high   |
| INP   | Input delay               | Hydrating the whole page                   | INP                 | high   |
| INP   | Input delay               | Third-party widgets at startup             | INP, LCP            | high   |
| INP   | Input delay               | Importing the whole library                | INP, LCP            | high   |
| INP   | Input delay               | Importing through a barrel file            | INP, LCP            | medium |
| INP   | Input delay               | Three libraries for one job                | INP, LCP            | medium |
| INP   | Input delay               | One bundle for every route                 | INP, LCP            | high   |
| INP   | Input delay               | Transpiling for browsers nobody uses       | INP, LCP            | medium |
| INP   | Processing duration       | Long task in a click handler               | INP                 | high   |
| INP   | Processing duration       | Heavy work on the main thread              | INP                 | medium |
| INP   | Processing duration       | State that re-renders the whole page       | INP                 | high   |
| INP   | Processing duration       | Layout thrashing                           | INP                 | high   |
| INP   | Presentation delay        | Rendering what nobody sees                 | INP                 | medium |
| INP   | Presentation delay        | Thousands of rows in one click             | INP                 | medium |

## Catalog as data

Every build also publishes [`catalog.json`](https://dragunovartem99.github.io/perf/catalog.json): each card in a shape shared with [vulns](https://github.com/dragunovartem99/vulns) — the grouping `basis`, `bad` and `good` code, `detect` regexes, how to `verify`, and when a match is `fineWhen`. The types live in `src/modules/catalog/types.ts`.

## Stack

- [Astro](https://astro.build) static site, no client framework
- [GSAP](https://gsap.com) scroll motion — transform, opacity and stroke only (`src/modules/motion`)
- Live Core Web Vitals readout of the page itself (`src/modules/vitals`)
- Strict CSP, self-hosted fonts, fully readable without JavaScript
- Deployed to GitHub Pages under `/perf`

## Development

Requires Node 24+.

```sh
npm install
npm run dev          # local dev server
npm run build        # static build into dist/
npm run preview      # serve the build
```

Checks (run by the pre-commit hook and CI):

```sh
npm run format:check
npm run types:check
npm run lint:check
npm test
```

## Adding a slowdown

Add one Markdown file to `src/content/perf/`. The frontmatter is validated by the schema in `src/content.config.ts`:

```yaml
---
title: Lazy-loaded hero image
chapter: lcp # ttfb | fcp | lcp | cls | inp
phase: load-delay # one of the chapter's phases in src/taxonomy/phases.ts; omitted for fcp
metrics: [lcp] # every vital it hurts, its chapter first
impact: high # high | medium
slow: |-
    <img src="hero.avif" loading="lazy" alt="…">
fast: |
    <img src="hero.avif" fetchpriority="high" alt="…">
lang: html
spot: "Lighthouse: “LCP request discovery”" # how to confirm it
detect: # regexes that find candidates; no lookaround, so ripgrep runs them too
    - 'loading=["'']lazy'
fineWhen: "The image starts below the fold on every viewport."
refs: # the first must be the chapter's official guide
    - https://web.dev/articles/optimize-lcp
---
```

The code is rendered as text, never as markup.

## Deployment

Merging to `main` runs the same checks as pull requests, then builds and deploys to GitHub Pages via
[pipes](https://github.com/dragunovartem99/pipes).
