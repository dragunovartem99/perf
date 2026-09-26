import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { LANGS } from "@/modules/highlight";

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

/** The Core Web Vitals, plus frame rate for what only hurts while moving. */
export const METRICS = ["lcp", "cls", "inp", "fps"] as const;

/** How much it costs when it lands. Red on the card scales with it. */
export const IMPACTS = ["high", "medium"] as const;

const perf = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/perf" }),
	schema: z.object({
		/** Position within its chapter. */
		order: z.number().int().positive(),
		title: z.string(),
		chapter: z.enum(CHAPTER_IDS),
		metrics: z.array(z.enum(METRICS)).min(1),
		impact: z.enum(IMPACTS),
		/** The code that spends the time. Rendered as text, never as markup. */
		slow: z.string(),
		fast: z.string(),
		/** What both snippets are written in, for highlighting… */
		lang: z.enum(LANGS),
		/** …unless the fix changes language, as when CSS replaces a script. */
		fastLang: z.enum(LANGS).optional(),
		/** Where it shows up: the DevTools panel or Lighthouse audit that names it. */
		spot: z.string(),
		refs: z.array(z.url()).min(1),
	}),
});

export const collections = { perf };
