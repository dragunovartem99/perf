# perf

Frontend performance cheatsheet — one card per slowdown: the slow code, the fast fix, and where DevTools or Lighthouse points at it.

**Live:** https://dragunovartem99.github.io/perf

## Catalog

Chapters follow the Core Web Vitals, each split into the phases where its time is spent — web.dev's LCP and INP breakdowns, the pixel pipeline for frames, CLS by cause. A chapter is complete when every phase has a card.

| Chapter          | Phase               | Slowdown                                   | Metrics  | Impact |
| ---------------- | ------------------- | ------------------------------------------ | -------- | ------ |
| Page load        | Server response     | Rendering every request from scratch       | LCP      | high   |
| Page load        | Server response     | Redirects before the page                  | LCP      | medium |
| Page load        | Server response     | Unload handlers that break the back button | LCP      | high   |
| Page load        | Load delay          | Content only JavaScript can render         | LCP      | high   |
| Page load        | Load delay          | Lazy-loaded hero image                     | LCP      | high   |
| Page load        | Load delay          | Request waterfall                          | LCP      | high   |
| Page load        | Load delay          | The hero on a cold origin                  | LCP      | medium |
| Page load        | Load duration       | One image for every screen                 | LCP      | high   |
| Page load        | Load duration       | Fonts from a third-party stylesheet        | LCP, CLS | medium |
| Page load        | Load duration       | Hashed assets that are never cached        | LCP      | medium |
| Page load        | Render delay        | Parser-blocking scripts                    | LCP      | high   |
| Page load        | Render delay        | One stylesheet for the whole site          | LCP      | medium |
| Layout stability | Media               | Images without dimensions                  | CLS      | high   |
| Layout stability | Injected content    | Content injected above the fold            | CLS      | high   |
| Layout stability | Injected content    | A spinner the content doesn't fit          | CLS      | medium |
| Layout stability | Web fonts           | Web font reflow                            | CLS, LCP | medium |
| Rendering        | Script              | Animating with a timer                     | FPS      | medium |
| Rendering        | Script              | Measuring on every scroll                  | FPS, INP | medium |
| Rendering        | Script              | Listeners that outlive their component     | FPS, INP | medium |
| Rendering        | Style               | Rendering what nobody sees                 | FPS, INP | medium |
| Rendering        | Layout              | Layout thrashing                           | FPS, INP | high   |
| Rendering        | Paint and composite | Animating layout properties                | FPS      | high   |
| Rendering        | Paint and composite | A layer for everything                     | FPS      | medium |
| Responsiveness   | Input delay         | Hydrating the whole page                   | INP      | high   |
| Responsiveness   | Input delay         | Third-party widgets at startup             | INP, LCP | high   |
| Responsiveness   | Processing          | Long task in a click handler               | INP      | high   |
| Responsiveness   | Processing          | Heavy work on the main thread              | INP      | medium |
| Responsiveness   | Processing          | State that re-renders the whole page       | INP      | high   |
| Responsiveness   | Presentation delay  | Thousands of rows in one click             | INP      | medium |
| Bundle size      | Dependencies        | Importing the whole library                | LCP, INP | high   |
| Bundle size      | Dependencies        | Importing through a barrel file            | LCP, INP | medium |
| Bundle size      | Dependencies        | Three libraries for one job                | LCP, INP | medium |
| Bundle size      | Code splitting      | One bundle for every route                 | LCP, INP | high   |
| Bundle size      | Build targets       | Transpiling for browsers nobody uses       | LCP, INP | medium |

## Catalog as data

Every build also publishes [`catalog.json`](https://dragunovartem99.github.io/perf/catalog.json): each card in a shape shared with [vulns](https://github.com/dragunovartem99/vulns) — `bad` and `good` code, `detect` regexes, how to `verify`, and when a match is `fineWhen`. The types live in `src/modules/catalog/types.ts`.

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
order: 5 # position within its chapter, following the phases
title: Lazy-loaded hero image
chapter: loading # loading | layout | rendering | interaction | bundle
phase: load-delay # one of the chapter's phases in src/taxonomy.ts
metrics: [lcp] # lcp | cls | inp | fps
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
refs:
    - https://web.dev/articles/optimize-lcp
---
```

The code is rendered as text, never as markup.

## Deployment

Merging to `main` runs the same checks as pull requests, then builds and deploys to GitHub Pages via
[pipes](https://github.com/dragunovartem99/pipes).
