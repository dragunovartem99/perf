---
title: Long task in a click handler
chapter: inp
phase: processing
metrics: [inp]
impact: high
slow: |-
    button.addEventListener("click", () => {
      saveDraft(); // 300 ms
      status.textContent = "Saved";
    });
fast: |
    button.addEventListener("click", async () => {
      status.textContent = "Saving…";
      await scheduler.yield(); // paint first
      saveDraft();
    });
lang: js
spot: "Performance panel: Interactions track, long processing duration"
detect:
    - 'addEventListener\(["''](click|input|keydown|change|submit)'
    - "on(Click|Change|Input|Submit)="
fineWhen: "The handler finishes in under 50 ms, or already paints feedback before the slow part."
refs:
    - https://web.dev/articles/optimize-inp
    - https://web.dev/articles/optimize-long-tasks
---

Nothing paints until the handler returns, so the click feels dead for 300 ms. Answer first, yield, then work. Safari has no `scheduler.yield()` yet; fall back to `setTimeout`.
