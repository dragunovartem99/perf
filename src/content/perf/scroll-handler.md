---
order: 4
title: Measuring on every scroll
chapter: rendering
metrics: [fps, inp]
impact: medium
slow: |-
    addEventListener("scroll", () => {
      for (const el of sections) {
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add("seen");
      }
    });
fast: |
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) e.target.classList.add("seen");
    });
    for (const el of sections) io.observe(el);
lang: js
spot: "Performance panel: a scroll handler and layout in every frame"
refs:
    - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    - https://developer.chrome.com/docs/css-ui/scroll-driven-animations
---

A scroll handler can run every frame, and each measurement after a class change forces layout. `IntersectionObserver` checks visibility as part of the browser's own rendering and calls you only when it changes. For scroll-linked effects, CSS scroll-driven animations need no script at all.
