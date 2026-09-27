export const CHAPTER_IDS = ["ttfb", "fcp", "lcp", "cls", "inp"] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export type Chapter = {
	/** The chapter number as the title card prints it. */
	kanji: string;
	/** The name on the death list, struck through once its chapter is read. */
	target: string;
	/** Where the vital turns from good: Google's threshold. */
	sign: string;
	title: string;
};

export const CHAPTERS: Record<ChapterId, Chapter> = {
	ttfb: {
		kanji: "第一章",
		target: "Slow server",
		sign: "TTFB over 0.8 s",
		title: "Server response",
	},
	fcp: { kanji: "第二章", target: "Blank screen", sign: "FCP over 1.8 s", title: "First paint" },
	lcp: { kanji: "第三章", target: "Slow paint", sign: "LCP over 2.5 s", title: "Largest paint" },
	cls: {
		kanji: "第四章",
		target: "Layout shift",
		sign: "CLS over 0.1",
		title: "Layout stability",
	},
	inp: {
		kanji: "第五章",
		target: "Frozen clicks",
		sign: "INP over 200 ms",
		title: "Responsiveness",
	},
};

/** The Web Vitals, which also tag every vital an entry hurts beyond its chapter. */
export const METRICS = CHAPTER_IDS;

/** How much it costs when it lands. Red on the card scales with it. */
export const IMPACTS = ["high", "medium"] as const;
