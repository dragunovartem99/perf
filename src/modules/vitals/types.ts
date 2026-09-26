/** The three Core Web Vitals this page measures about itself. */
export type Metric = "lcp" | "cls" | "inp";

/** Google's three buckets, cut at the 75th-percentile thresholds. */
export type Rating = "good" | "needs-improvement" | "poor";

/** One metric's current value, or null until the browser reports one. */
export type Reading = {
	metric: Metric;
	value: number | null;
};

/** A layout shift as the observer reports it; not in the TypeScript DOM lib. */
export type LayoutShift = {
	value: number;
	/** Milliseconds since navigation start. */
	startTime: number;
	hadRecentInput: boolean;
};

/** An event timing entry that belongs to a real interaction. */
export type Interaction = {
	interactionId: number;
	duration: number;
};
