import type { Interaction } from "../types";

/** One outlier is forgiven for every this many interactions. */
export const INTERACTIONS_PER_OUTLIER = 50;

// INP is the slowest interaction, ignoring one outlier per 50 — close to the
// 98th percentile on busy pages, simply the worst one on quiet pages. One
// interaction (a key press) fires several events; its duration is the longest.
export function inpFromInteractions({
	interactions,
}: {
	interactions: readonly Interaction[];
}): number | null {
	const longest = new Map<number, number>();
	for (const { interactionId, duration } of interactions) {
		if (interactionId === 0) continue;
		longest.set(interactionId, Math.max(duration, longest.get(interactionId) ?? 0));
	}
	if (longest.size === 0) return null;

	const durations = [...longest.values()].toSorted((a, b) => b - a);
	const skip = Math.floor(durations.length / INTERACTIONS_PER_OUTLIER);
	return durations[Math.min(skip, durations.length - 1)] ?? null;
}
