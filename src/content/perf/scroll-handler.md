---
order: 4
title: Measuring on every scroll
chapter: rendering
metrics: [fps, inp]
impact: medium
slow: |-
    addEventListener("scroll", () => {
      if (el.getBoundingClientRect().top < innerHeight) show(el);
    });
fast: |
    new IntersectionObserver(([e]) => e.isIntersecting && show(el)).observe(el);
lang: js
spot: "Performance panel: a scroll handler and layout in every frame"
refs:
    - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    - https://developer.chrome.com/docs/css-ui/scroll-driven-animations
---

The handler runs every frame and forces layout each time. `IntersectionObserver` calls you only when visibility changes; scroll-linked effects need no script at all.
