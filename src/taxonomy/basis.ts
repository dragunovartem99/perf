import type { ChapterId } from "./chapters";

// The sheet is not grouped by feel. Chapters are the five Web Vitals, in the
// order a page load reaches them; web.dev pairs the two supporting ones with
// their causes — TTFB with the server, FCP with render-blocking resources.
export const BASIS = {
	rule:
		"An entry goes under the Web Vital whose official guide prescribes its fix; if several do, " +
		"the first in load order. Phases are the breakdown Google publishes for that vital.",
	sources: [
		"https://web.dev/articles/vitals",
		"https://web.dev/articles/ttfb",
		"https://web.dev/articles/fcp",
		"https://web.dev/articles/optimize-lcp",
		"https://web.dev/articles/optimize-cls",
		"https://web.dev/articles/optimize-inp",
	],
};

const WEB_DEV = "https://web.dev/articles/";

/** The official guides that can justify a chapter: an entry's first ref must be one of its own. */
export const GUIDES: Record<ChapterId, string[]> = {
	ttfb: [`${WEB_DEV}optimize-ttfb`],
	fcp: [`${WEB_DEV}fcp`],
	lcp: [`${WEB_DEV}optimize-lcp`],
	cls: [`${WEB_DEV}optimize-cls`],
	inp: [
		`${WEB_DEV}optimize-inp`,
		`${WEB_DEV}optimize-input-delay`,
		`${WEB_DEV}optimize-long-tasks`,
		`${WEB_DEV}script-evaluation-and-long-tasks`,
		`${WEB_DEV}dom-size-and-interactivity`,
	],
};
