---
order: 3
title: Three libraries for one job
chapter: bundle
phase: dependencies
metrics: [lcp, inp]
impact: medium
slow: |-
    { "dependencies": { "moment": "^2.30", "dayjs": "^1.11", "date-fns": "^4.1" } }
fast: |
    new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
lang: json
fastLang: js
spot: "npm ls: the same job done by several packages, or one package at several versions"
detect:
    - '"(moment|dayjs|date-fns|luxon)"'
    - '"(lodash|underscore|ramda)"'
    - '"(axios|ky|superagent)"'
fineWhen: "Only one of them reaches the client bundle; the others are dev or server dependencies."
refs:
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
    - https://docs.npmjs.com/cli/commands/npm-dedupe
---

Each team picked its own date library, and every visitor downloads all three. Mismatched versions add second copies of the same one. Pick one, or none: `Intl` formats dates, numbers and lists.
