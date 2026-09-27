---
order: 3
title: A spinner the content doesn't fit
chapter: layout
phase: injected
metrics: [cls]
impact: medium
slow: |-
    {loading ? <Spinner /> : <Feed posts={posts} />}
fast: |
    {loading ? <FeedSkeleton rows={5} /> : <Feed posts={posts} />}
lang: jsx
spot: "Performance panel: a layout shift as the data arrives, everything below it moving"
detect:
    - "<Spinner"
    - '(isLoading|loading) \?'
fineWhen: "Nothing follows the placeholder on screen, or its container already reserves the result's height."
refs:
    - https://web.dev/articles/optimize-cls
    - https://web.dev/articles/cls
---

A 40-pixel spinner gives way to a 2 000-pixel feed and pushes down everything after it. Hold the space: a skeleton the size of the result, or a `min-height` on the container.
