import { describe, expect, it } from "vitest";

import { toLines } from "../utils/lines";
import { kindOf } from "../utils/theme";

describe("kindOf", () => {
	it("reads a sentinel colour back as its kind", () => {
		expect(kindOf({ color: "#000001" })).toBe("comment");
		expect(kindOf({ color: "#000002" })).toBe("literal");
		expect(kindOf({ color: "#000003" })).toBe("keyword");
	});

	it("treats a missing or foreign colour as plain", () => {
		expect(kindOf({ color: undefined })).toBe("plain");
		expect(kindOf({ color: "#ff0000" })).toBe("plain");
	});
});

describe("toLines", () => {
	it("joins neighbours of the same kind", () => {
		const tokens = [
			[
				{ content: "const", color: "#000003" },
				{ content: " a", color: "#000000" },
				{ content: " = ", color: "#000000" },
				{ content: '"s"', color: "#000002" },
				{ content: "; ", color: "#000000" },
				{ content: "// why", color: "#000001" },
			],
		];
		expect(toLines({ tokens })).toEqual([
			[
				{ text: "const", kind: "keyword" },
				{ text: " a = ", kind: "plain" },
				{ text: '"s"', kind: "literal" },
				{ text: "; ", kind: "plain" },
				{ text: "// why", kind: "comment" },
			],
		]);
	});

	it("keeps an empty line as an empty line", () => {
		expect(toLines({ tokens: [[], [{ content: "x" }]] })).toEqual([
			[],
			[{ text: "x", kind: "plain" }],
		]);
	});
});
