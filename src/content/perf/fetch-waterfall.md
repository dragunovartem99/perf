---
order: 4
title: Request waterfall
chapter: loading
metrics: [lcp]
impact: high
slow: |-
    const user = await getUser();
    const posts = await getPosts();
    const ads = await getAds();
fast: |
    const [user, posts, ads] = await Promise.all([
      getUser(), getPosts(), getAds(),
    ]);
lang: js
spot: "Network panel: requests that start as the previous one ends"
refs:
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    - https://web.dev/articles/optimize-lcp
    - https://web.dev/articles/preload-scanner
---

Independent requests awaited one by one cost the sum of their latencies, not the slowest one. The same staircase appears when a component fetches only after its parent's data and its own code have arrived, and in CSS `@import` chains. Start everything the page needs at once, as early as you can.
