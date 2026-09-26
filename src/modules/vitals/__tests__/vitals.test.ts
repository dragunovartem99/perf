import { describe, expect, it } from "vitest";

import { clsFromShifts } from "../utils/cls";
import { formatReading } from "../utils/format";
import { inpFromInteractions } from "../utils/inp";
import { rate } from "../utils/rating";

describe("rate", () => {
	it("passes a value sitting exactly on a threshold", () => {
		expect(rate({ metric: "lcp", value: 2500 })).toBe("good");
		expect(rate({ metric: "inp", value: 500 })).toBe("needs-improvement");
	});

	it("fails anything past the upper threshold", () => {
		expect(rate({ metric: "cls", value: 0.26 })).toBe("poor");
	});
});

function shift(startTime: number, value: number, hadRecentInput = false) {
	return { startTime, value, hadRecentInput };
}

describe("clsFromShifts", () => {
	it("sums shifts that land close together", () => {
		expect(clsFromShifts({ shifts: [shift(0, 0.05), shift(500, 0.05)] })).toBeCloseTo(0.1);
	});

	it("keeps only the worst window once a gap splits them", () => {
		const shifts = [shift(0, 0.05), shift(2000, 0.08), shift(2500, 0.01)];
		expect(clsFromShifts({ shifts })).toBeCloseTo(0.09);
	});

	it("closes a window after five seconds even without a gap", () => {
		const shifts = [0, 900, 1800, 2700, 3600, 4500, 5400].map((t) => shift(t, 0.1));
		expect(clsFromShifts({ shifts })).toBeCloseTo(0.6);
	});

	it("ignores shifts caused by input", () => {
		expect(clsFromShifts({ shifts: [shift(0, 0.3, true)] })).toBe(0);
	});
});

describe("inpFromInteractions", () => {
	it("is null before anything is clicked", () => {
		expect(inpFromInteractions({ interactions: [] })).toBeNull();
	});

	it("takes an interaction's longest event, and the worst interaction", () => {
		const interactions = [
			{ interactionId: 1, duration: 40 },
			{ interactionId: 1, duration: 120 },
			{ interactionId: 2, duration: 80 },
			{ interactionId: 0, duration: 900 },
		];
		expect(inpFromInteractions({ interactions })).toBe(120);
	});

	it("forgives one outlier per fifty interactions", () => {
		const quick = Array.from({ length: 49 }, (_, i) => ({
			interactionId: i + 2,
			duration: 50,
		}));
		const interactions = [{ interactionId: 1, duration: 1000 }, ...quick];
		expect(inpFromInteractions({ interactions })).toBe(50);
	});
});

describe("formatReading", () => {
	it("prints each metric in its own unit", () => {
		expect(formatReading({ metric: "lcp", value: 1234 })).toBe("1.23s");
		expect(formatReading({ metric: "inp", value: 87.6 })).toBe("88ms");
		expect(formatReading({ metric: "cls", value: 0.04 })).toBe("0.040");
		expect(formatReading({ metric: "cls", value: null })).toBe("—");
	});
});
