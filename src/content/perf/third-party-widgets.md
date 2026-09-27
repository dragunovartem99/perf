---
order: 2
title: Third-party widgets at startup
chapter: interaction
phase: input-delay
metrics: [inp, lcp]
impact: high
slow: |-
    <script src="https://chat.example/widget.js" async></script>
fast: |
    chatButton.addEventListener("click", () => {
      const script = document.createElement("script");
      script.src = "https://chat.example/widget.js";
      document.head.append(script);
    }, { once: true });
lang: html
fastLang: js
spot: "Performance panel → Insights: “3rd parties”, and their long tasks"
detect:
    - '<script[^>]+src="https://'
    - 'googletagmanager\.com'
    - "intercom|hotjar|optimizely|hubspot|zendesk"
fineWhen: "The page cannot work without the script — consent, payments — or it waits for idle time before doing anything."
refs:
    - https://web.dev/articles/embed-best-practices
    - https://web.dev/articles/optimize-inp
---

Chat, A/B tests and tag managers run long tasks while the page is waking up, and early clicks queue behind them. Load a widget when it is asked for, behind a facade that looks like it.
