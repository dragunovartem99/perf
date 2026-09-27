---
title: Content that arrives without its space
chapter: cls
phase: late-content
metrics: [cls]
impact: high
slow: |-
    {loading ? <Spinner /> : <Feed posts={posts} />}
fast: |
    {loading ? <FeedSkeleton rows={5} /> : <Feed posts={posts} />}
lang: jsx
spot: "Performance panel → Insights: “Layout shift culprits”"
detect:
    - "<Spinner"
    - '(isLoading|loading) \?'
    - '\.prepend\('
    - 'insertBefore\('
    - 'insertAdjacentHTML\(["'']afterbegin'
fineWhen: "It lands below the viewport, out of flow (`position: fixed`), or within 500 ms of the user's own input, which CLS forgives."
refs:
    - https://web.dev/articles/optimize-cls
    - https://web.dev/articles/cls
---

A 40-pixel spinner gives way to a 2 000-pixel feed, and everything below it jumps; banners, ads and embeds do the same. Reserve the space up front with a skeleton the size of the result or a `min-height` on the slot, or keep late content below the fold.
