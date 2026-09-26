import type { Metric } from "../types";

// What the readout prints: seconds for LCP, milliseconds for INP, three
// decimals for CLS, a dash while there is nothing to report.
export function formatReading({ metric, value }: { metric: Metric; value: number | null }): string {
	if (value === null) return "—";
	if (metric === "lcp") return `${(value / 1000).toFixed(2)}s`;
	if (metric === "inp") return `${Math.round(value)}ms`;
	return value.toFixed(3);
}
