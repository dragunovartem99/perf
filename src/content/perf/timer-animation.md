---
order: 1
title: Animating with a timer
chapter: rendering
phase: script
metrics: [fps]
impact: medium
slow: |-
    setInterval(() => (box.style.transform = `translateX(${(x += 4)}px)`), 16);
fast: |
    box.animate([{ transform: "none" }, { transform: "translateX(400px)" }], 1600);
lang: js
spot: "Performance panel: Timer Fired tasks out of step with the frames"
detect:
    - 'setInterval\('
    - 'setTimeout\(.*, ?1[67]\)'
fineWhen: "The timer does not draw: polling, or a clock that ticks once a second."
refs:
    - https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
    - https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
---

A 16 ms timer drifts against the display's refresh, so frames are skipped or drawn twice. `element.animate()` runs on the compositor; for per-frame script, use `requestAnimationFrame`.
