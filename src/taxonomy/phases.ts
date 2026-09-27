import type { ChapterId } from "./chapters";
import { CHAPTER_IDS } from "./chapters";

/**
 * Each vital split the way its official article splits it: TTFB's request
 * phases, LCP's subparts (less TTFB, a chapter of its own), CLS's common causes
 * and bfcache, INP's three phases. FCP is published without one.
 */
export const PHASES = {
	ttfb: {
		"redirect": "Redirects",
		"service-worker": "Service worker startup",
		"dns": "DNS lookup",
		"connection": "Connection and TLS",
		"request": "Request",
	},
	fcp: {},
	lcp: {
		"load-delay": "Resource load delay",
		"load-duration": "Resource load duration",
		"render-delay": "Element render delay",
	},
	cls: {
		"media": "Images without dimensions",
		"late-content": "Late-loaded content",
		"animations": "Animations",
		"fonts": "Web fonts",
		"bfcache": "bfcache",
	},
	inp: {
		"input-delay": "Input delay",
		"processing": "Processing duration",
		"presentation-delay": "Presentation delay",
	},
} as const satisfies Record<ChapterId, Record<string, string>>;

export type PhaseId = { [C in ChapterId]: keyof (typeof PHASES)[C] }[ChapterId];

export const PHASE_IDS = CHAPTER_IDS.flatMap((id) => Object.keys(PHASES[id])) as [
	PhaseId,
	...PhaseId[],
];

// The phase's label; undefined when it is missing or belongs to another chapter.
export function phaseLabel({ chapter, phase }: { chapter: ChapterId; phase?: string }) {
	const phases: Record<string, string> = PHASES[chapter];
	return phase !== undefined && Object.hasOwn(phases, phase) ? phases[phase] : undefined;
}

// True when the entry's phase fits its chapter: required where the chapter has phases, absent where not.
export function fitsChapter({ chapter, phase }: { chapter: ChapterId; phase?: string }): boolean {
	const phased = Object.keys(PHASES[chapter]).length > 0;
	return phased ? phaseLabel({ chapter, phase }) !== undefined : phase === undefined;
}
