---
order: 3
title: Listeners that outlive their component
chapter: rendering
phase: script
metrics: [fps, inp]
impact: medium
slow: |-
    useEffect(() => {
      addEventListener("resize", onResize);
    }, []);
fast: |
    useEffect(() => {
      addEventListener("resize", onResize);
      return () => removeEventListener("resize", onResize);
    }, []);
lang: jsx
spot: "Memory panel: heap snapshots that grow with each visit to the view, “Detached” nodes in the comparison"
detect:
    - 'addEventListener\('
    - 'setInterval\('
    - 'new (Resize|Intersection|Mutation)Observer\('
    - '\.subscribe\('
fineWhen: "The setup runs once for the life of the page, or a cleanup already undoes it."
refs:
    - https://react.dev/reference/react/useEffect
    - https://developer.chrome.com/docs/devtools/memory-problems
---

Each mount adds a listener that is never removed, and each one keeps its component's closure alive. The heap grows and garbage collection pauses get longer. Undo in cleanup whatever setup started: listeners, timers, observers, subscriptions.
