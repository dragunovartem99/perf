---
title: Request waterfall
chapter: lcp
phase: render-delay
metrics: [lcp]
impact: high
slow: |-
    const user = await getUser();
    const posts = await getPosts();
fast: |
    const [user, posts] = await Promise.all([getUser(), getPosts()]);
lang: js
spot: "Network panel: requests that start as the previous one ends"
detect:
    - '^\s*(const|let) .+ = await '
    - "@import"
fineWhen: "The second request needs the first one's result."
refs:
    - https://web.dev/articles/optimize-lcp
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    - https://web.dev/articles/preload-scanner
---

Two awaits, two round trips. Start independent requests together; the same staircase hides in components that fetch after their parent and in CSS `@import` chains.
