import type { LayoutShift } from "../types";

/** A session window closes after this long without a shift… */
export const SESSION_GAP_MS = 1000;

/** …or once it has been open this long. */
export const SESSION_MAX_MS = 5000;

// CLS is the largest burst of shifts, not their sum over the page's life:
// shifts group into session windows and the worst window wins. Shifts right
// after an input are expected and do not count.
export function clsFromShifts({ shifts }: { shifts: readonly LayoutShift[] }): number {
	let worst = 0;
	let windowSum = 0;
	let windowStart = Number.NEGATIVE_INFINITY;
	let previous = Number.NEGATIVE_INFINITY;

	for (const shift of shifts) {
		if (shift.hadRecentInput) continue;

		const opensWindow =
			shift.startTime - previous > SESSION_GAP_MS ||
			shift.startTime - windowStart > SESSION_MAX_MS;

		if (opensWindow) {
			windowSum = 0;
			windowStart = shift.startTime;
		}

		windowSum += shift.value;
		previous = shift.startTime;
		worst = Math.max(worst, windowSum);
	}

	return worst;
}
