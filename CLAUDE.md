# CLAUDE.md

## Code style

- DO use `type X = {}` aliases, NOT `interface` (sole exception: global declaration merging, e.g. `env.d.ts`)
- DO take a single object parameter instead of 2+ positional arguments
- DO NOT add lint-disable comments — restructure the code until the linter passes
- DO NOT use non-null assertions (`!`) — narrow the type instead
- DO use `//` comments on functions that take parameters or return a value; reserve `/** */` for types, consts, parameterless functions, and the file-level blurb

## Structure

- DO keep every `src/modules/<name>` self-contained, with an `index.ts` barrel exporting only the public surface; pure logic goes in `utils/`, shared types in `types.ts`
- DO keep pure math in `utils/` so it is testable without a DOM
- DO keep one issue per file in `src/content/perf/`; the schema in `src/content.config.ts` is the contract
- DO back every claim in an entry with its `refs` — prefer web.dev, MDN and Chrome for Developers
- DO file every entry by the rule in `src/taxonomy/basis.ts`: the Web Vital whose official guide prescribes its fix, with that guide as its first ref — never by feel; a fix no guide prescribes is out of scope
- DO give it the phase Google publishes for that vital (`src/taxonomy/phases.ts`); FCP has none
- DO NOT order entries by hand: page order is derived (`src/taxonomy/order.ts`)
- DO keep `detect` to single-line regexes without lookaround or backreferences, so ripgrep runs them too; narrow false positives in `fineWhen`
- DO keep `src/modules/catalog/types.ts` identical in perf and vulns — `catalog.json` is the contract skills read

## Tests

- DO colocate tests: `<module>/__tests__/<name>.test.ts`, next to the `utils/` they exercise

## Styling

- DO use the tokens in `src/styles/tokens.css` — no raw hex values or magic spacing in components
- DO keep it black and white with red as a sparing accent (death-list strikes, kanji, the slow label) — `--color-red` on paper, `--color-red-bright` on ink
- DO respect `prefers-reduced-motion` for anything that animates

## Motion

- DO animate `transform`, `opacity` and SVG strokes only — the page must practise what it preaches
- DO NOT hide content until a script reveals it — the one exception is the chapter-card text, held by `@media (scripting: enabled)` and released by `html.is-still` if GSAP fails to load
- DO NOT animate the hero title: it holds the LCP element
- DO keep GSAP out of the critical path: it is loaded with a dynamic `import()`

## Constraints

- DO NOT ship a client framework — the only client scripts are motion, the vitals readout and the copy buttons
- DO NOT add inline event handlers, `set:html`, or third-party requests — the site ships a strict CSP and must pass it
- DO keep the page fully readable with JavaScript disabled
- DO build every internal URL from `import.meta.env.BASE_URL` — the site is served under `/perf` on GitHub Pages
