---
order: 1
title: Long task in a click handler
chapter: interaction
metrics: [inp]
impact: high
slow: |-
    button.addEventListener("click", () => {
      saveDraft(); // 300 ms of work
      status.textContent = "Saved";
    });
fast: |
    button.addEventListener("click", async () => {
      status.textContent = "Saving…"; // respond first
      await scheduler.yield();        // let that frame paint
      saveDraft();
      status.textContent = "Saved";
    });
spot: "Performance panel: Interactions track, long processing duration"
refs:
    - https://web.dev/articles/optimize-inp
    - https://web.dev/articles/optimize-long-tasks
---

INP runs from the input to the next painted frame, and a long task in the handler holds that frame hostage. Show the response, yield so the browser can paint, then do the work. `scheduler.yield()` ships in Chromium and Firefox; Safari needs a `setTimeout` fallback.
