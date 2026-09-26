# perf

Frontend performance cheatsheet — one card per slowdown: the slow code, the fast fix, and where DevTools or Lighthouse points at it.

**Live:** https://dragunovartem99.github.io/perf

## Catalog

| Chapter          | Slowdown                             | Metrics  | Impact |
| ---------------- | ------------------------------------ | -------- | ------ |
| Page load        | Lazy-loaded hero image               | LCP      | high   |
| Page load        | Parser-blocking scripts              | LCP      | high   |
| Page load        | `@import` chains                     | LCP      | medium |
| Page load        | Request waterfall                    | LCP      | high   |
| Page load        | One image for every screen           | LCP      | high   |
| Page load        | `unload` blocks the back button      | LCP      | medium |
| Page load        | Hashed assets that are never cached  | LCP      | medium |
| Layout stability | Images without dimensions            | CLS      | high   |
| Layout stability | Content injected above the fold      | CLS      | high   |
| Layout stability | Web font reflow                      | CLS, LCP | medium |
| Rendering        | Layout thrashing                     | FPS, INP | high   |
| Rendering        | Animating layout properties          | FPS      | high   |
| Rendering        | Rendering what nobody sees           | FPS, INP | medium |
| Rendering        | Measuring on every scroll            | FPS, INP | medium |
| Responsiveness   | Long task in a click handler         | INP      | high   |
| Responsiveness   | Heavy work on the main thread        | INP      | medium |
| Responsiveness   | Hydrating the whole page             | INP      | high   |
| Bundle size      | Importing the whole library          | LCP, INP | high   |
| Bundle size      | One bundle for every route           | LCP, INP | high   |
| Bundle size      | Transpiling for browsers nobody uses | LCP, INP | medium |

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
order: 1 # position within its chapter
title: Lazy-loaded hero image
chapter: loading # loading | layout | rendering | interaction | bundle
metrics: [lcp] # lcp | cls | inp | fps
impact: high # high | medium
slow: |-
    <img src="hero.avif" loading="lazy" alt="…">
fast: |
    <img src="hero.avif" fetchpriority="high" width="1200" height="600" alt="…">
spot: "Lighthouse: “Largest Contentful Paint image was lazily loaded”"
refs:
    - https://web.dev/articles/optimize-lcp
---
```

The code is rendered as text, never as markup.

## Deployment

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yaml`.
