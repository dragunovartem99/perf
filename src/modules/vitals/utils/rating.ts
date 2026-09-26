import type { Metric, Rating } from "../types";

/**
 * Upper bounds of "good" and "needs improvement". LCP and INP in milliseconds,
 * CLS unitless — https://web.dev/articles/vitals.
 */
export const THRESHOLDS: Record<Metric, readonly [number, number]> = {
	lcp: [2500, 4000],
	cls: [0.1, 0.25],
	inp: [200, 500],
};

// Buckets a value the way Google does: the thresholds themselves still pass.
export function rate({ metric, value }: { metric: Metric; value: number }): Rating {
	const [good, poor] = THRESHOLDS[metric];
	if (value <= good) return "good";
	return value <= poor ? "needs-improvement" : "poor";
}
