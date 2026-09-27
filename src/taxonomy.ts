/** The five chapters, in reading order — one per name on the death list. */
export const CHAPTER_IDS = ["loading", "layout", "rendering", "interaction", "bundle"] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export type Chapter = {
	/** The chapter number as the title card prints it. */
	kanji: string;
	/** The name on the death list, struck through once its chapter is read. */
	target: string;
	/** What the target looks like in numbers: the threshold it crosses. */
	sign: string;
	title: string;
};

export const CHAPTERS: Record<ChapterId, Chapter> = {
	loading: { kanji: "第一章", target: "Slow paint", sign: "LCP over 2.5 s", title: "Page load" },
	layout: {
		kanji: "第二章",
		target: "Layout shift",
		sign: "CLS over 0.1",
		title: "Layout stability",
	},
	rendering: {
		kanji: "第三章",
		target: "Dropped frames",
		sign: "Frames over 16 ms",
		title: "Rendering",
	},
	interaction: {
		kanji: "第四章",
		target: "Frozen clicks",
		sign: "INP over 200 ms",
		title: "Responsiveness",
	},
	bundle: {
		kanji: "第五章",
		target: "The bundle",
		sign: "JavaScript nobody runs",
		title: "Bundle size",
	},
};

/**
 * Where in its chapter the time goes, in the order it is spent. LCP and INP
 * use the parts web.dev splits them into, rendering the pixel pipeline, CLS
 * its causes: a chapter is complete when every phase has a card.
 */
export const PHASES = {
	loading: {
		"ttfb": "Server response",
		"load-delay": "Load delay",
		"load-duration": "Load duration",
		"render-delay": "Render delay",
	},
	layout: { media: "Media", injected: "Injected content", fonts: "Web fonts" },
	rendering: { script: "Script", style: "Style", layout: "Layout", paint: "Paint and composite" },
	interaction: {
		"input-delay": "Input delay",
		"processing": "Processing",
		"presentation": "Presentation delay",
	},
	bundle: { dependencies: "Dependencies", splitting: "Code splitting", targets: "Build targets" },
} as const satisfies Record<ChapterId, Record<string, string>>;

export type PhaseId = { [C in ChapterId]: keyof (typeof PHASES)[C] }[ChapterId];

export const PHASE_IDS = CHAPTER_IDS.flatMap((id) => Object.keys(PHASES[id])) as [
	PhaseId,
	...PhaseId[],
];

// The phase's label, or undefined when it belongs to another chapter.
export function phaseLabel({ chapter, phase }: { chapter: ChapterId; phase: string }) {
	const phases: Record<string, string> = PHASES[chapter];
	return Object.hasOwn(phases, phase) ? phases[phase] : undefined;
}

/** The Core Web Vitals, plus frame rate for what only hurts while moving. */
export const METRICS = ["lcp", "cls", "inp", "fps"] as const;

/** How much it costs when it lands. Red on the card scales with it. */
export const IMPACTS = ["high", "medium"] as const;
