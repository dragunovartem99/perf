---
order: 2
title: Measuring on every scroll
chapter: rendering
phase: script
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
detect:
    - 'addEventListener\(["''](scroll|resize)'
    - "onscroll"
fineWhen: "The handler reads nothing from layout and only schedules work with `requestAnimationFrame`."
refs:
    - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    - https://developer.chrome.com/docs/css-ui/scroll-driven-animations
---

The handler runs on every scrolled frame and reads layout on the main thread. `IntersectionObserver` fires only when visibility changes; scroll-linked effects need no script at all.
