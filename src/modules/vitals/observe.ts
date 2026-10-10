// The page measuring itself with the same observers the web-vitals library
// uses. Each metric reports whenever it changes; browsers that lack an entry
// type simply never report that metric.

import type { Interaction, LayoutShift, Reading } from "./types";
import { clsFromShifts } from "./utils/cls";
import { inpFromInteractions } from "./utils/inp";

/** The lowest threshold the Event Timing API accepts, in ms. */
const MIN_EVENT_DURATION = 16;

type Report = (reading: Reading) => void;

function supports(type: string): boolean {
	return PerformanceObserver.supportedEntryTypes.includes(type);
}

function isLayoutShift(entry: PerformanceEntry): entry is PerformanceEntry & LayoutShift {
	return "value" in entry && "hadRecentInput" in entry;
}

function isInteraction(entry: PerformanceEntry): entry is PerformanceEntry & Interaction {
	return "interactionId" in entry && typeof entry.interactionId === "number";
}

function observeLcp({ report }: { report: Report }): void {
	new PerformanceObserver((list) => {
		const last = list.getEntries().at(-1);
		if (last) report({ metric: "lcp", value: last.startTime });
	}).observe({ type: "largest-contentful-paint", buffered: true });
}

function observeCls({ report }: { report: Report }): void {
	const shifts: LayoutShift[] = [];
	report({ metric: "cls", value: 0 });

	new PerformanceObserver((list) => {
		shifts.push(...list.getEntries().filter((entry) => isLayoutShift(entry)));
		report({ metric: "cls", value: clsFromShifts({ shifts }) });
	}).observe({ type: "layout-shift", buffered: true });
}

function observeInp({ report }: { report: Report }): void {
	const interactions: Interaction[] = [];

	new PerformanceObserver((list) => {
		interactions.push(...list.getEntries().filter((entry) => isInteraction(entry)));
		report({ metric: "inp", value: inpFromInteractions({ interactions }) });
	}).observe({ type: "event", buffered: true, durationThreshold: MIN_EVENT_DURATION });
}

export function observeVitals({ report }: { report: Report }): void {
	if (typeof PerformanceObserver === "undefined") return;
	if (supports("largest-contentful-paint")) observeLcp({ report });
	if (supports("layout-shift")) observeCls({ report });
	if (supports("event")) observeInp({ report });
}
