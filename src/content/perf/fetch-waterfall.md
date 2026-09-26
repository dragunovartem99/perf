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
spot: "Network panel: requests that start as the previous one ends"
refs:
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    - https://web.dev/articles/optimize-lcp
---

Independent requests awaited one by one cost the sum of their latencies, not the slowest. The same staircase hides in components that fetch only after their parent's data and their own chunk arrive. Start everything the route needs at once, as high up as you can.
