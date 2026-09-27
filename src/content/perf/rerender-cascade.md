---
order: 5
title: State that re-renders the whole page
chapter: interaction
phase: processing
metrics: [inp]
impact: high
slow: |-
    function App() {
      const [query, setQuery] = useState("");
      return <><Search value={query} onChange={setQuery} /><Feed /></>;
    }
fast: |
    function App() {
      return <><Search /><Feed /></>; // query state lives in Search
    }
lang: jsx
spot: "React DevTools Profiler: the whole tree renders on each keystroke"
detect:
    - 'useState\('
    - 'useContext\('
    - 'createContext\('
fineWhen: "The profiler shows the commit well under 16 ms, or the subtree is already memoised."
refs:
    - https://react.dev/reference/react/memo
    - https://web.dev/articles/optimize-inp
---

State at the top re-renders everything below it on each keystroke, though only the search box changed. Keep state beside what reads it; memoise the expensive parts that truly share it.
