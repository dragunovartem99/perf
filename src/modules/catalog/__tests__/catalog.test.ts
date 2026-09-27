import { describe, expect, it } from "vitest";

import { toEntry } from "../utils/entry";
import { detects, isPattern } from "../utils/pattern";

describe("isPattern", () => {
	it("accepts a regex both engines read", () => {
		expect(isPattern(String.raw`loading="lazy"`)).toBe(true);
		expect(isPattern(String.raw`addEventListener\(["']scroll`)).toBe(true);
	});

	it("rejects what does not compile", () => {
		expect(isPattern("(unclosed")).toBe(false);
		expect(isPattern("")).toBe(false);
	});

	it("rejects lookaround and backreferences, which ripgrep lacks", () => {
		expect(isPattern("img(?!.*width)")).toBe(false);
		expect(isPattern("(?<=src=)x")).toBe(false);
		expect(isPattern(String.raw`(["'])x\1`)).toBe(false);
	});
});

describe("detects", () => {
	it("finds code any one pattern matches, line by line", () => {
		const code = "const a = 1;\nel.innerHTML = bio;";
		expect(detects({ patterns: ["nope", "^el\\.innerHTML"], code })).toBe(true);
		expect(detects({ patterns: ["textContent"], code })).toBe(false);
	});
});

describe("toEntry", () => {
	const entry = {
		id: "lazy-lcp-image",
		body: "\nThe hero waits.\n",
		data: {
			title: "Lazy-loaded hero image",
			chapter: "loading",
			phase: "load-delay",
			metrics: ["lcp"],
			impact: "high" as const,
			slow: '<img loading="lazy">\n',
			fast: '<img fetchpriority="high">\n',
			lang: "html",
			spot: "Lighthouse",
			detect: ['loading="lazy"'],
			fineWhen: "Below the fold.",
			refs: ["https://web.dev/articles/optimize-lcp"],
		},
	};

	it("maps a card onto the shared shape", () => {
		const result = toEntry({ entry, page: "https://example.com/perf/" });
		expect(result.url).toBe("https://example.com/perf/#lazy-lcp-image");
		expect(result.anchors).toEqual(["LCP"]);
		expect(result.bad).toEqual({ label: "Slow", code: '<img loading="lazy">', lang: "html" });
		expect(result.why).toBe("The hero waits.");
		expect(result.verify).toBe("Lighthouse");
	});

	it("gives the fix its own language when it changes", () => {
		const result = toEntry({
			entry: { ...entry, data: { ...entry.data, fastLang: "css" } },
			page: "https://example.com/perf/",
		});
		expect(result.good.lang).toBe("css");
	});
});
