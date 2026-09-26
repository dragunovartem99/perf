---
order: 1
title: Long task in a click handler
chapter: interaction
metrics: [inp]
impact: high
slow: |-
    button.addEventListener("click", () => {
      saveDraft(); // 300 ms
      status.textContent = "Saved";
    });
fast: |
    status.textContent = "Saving…";
    await scheduler.yield(); // paint first
    saveDraft();
lang: js
spot: "Performance panel: Interactions track, long processing duration"
refs:
    - https://web.dev/articles/optimize-inp
    - https://web.dev/articles/optimize-long-tasks
---

Nothing paints until the handler returns, so the click feels dead for 300 ms. Answer first, yield, then work — Safari still needs a `setTimeout` fallback for `scheduler.yield()`.
