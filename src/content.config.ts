import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { detects, isPattern } from "@/modules/catalog";
import { LANGS } from "@/modules/highlight";
import { CHAPTER_IDS, fitsChapter, GUIDES, IMPACTS, METRICS, PHASE_IDS } from "@/taxonomy";

const perf = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/perf" }),
	schema: z
		.object({
			title: z.string(),
			chapter: z.enum(CHAPTER_IDS),
			/** Where in the chapter the time goes: one of `PHASES[chapter]`, if it has any. */
			phase: z.enum(PHASE_IDS).optional(),
			/** Every vital it hurts, its chapter's included. */
			metrics: z.array(z.enum(METRICS)).min(1),
			impact: z.enum(IMPACTS),
			/** The code that spends the time. Rendered as text, never as markup. */
			slow: z.string(),
			fast: z.string(),
			/** What both snippets are written in, for highlighting… */
			lang: z.enum(LANGS),
			/** …unless the fix changes language, as when CSS replaces a script. */
			fastLang: z.enum(LANGS).optional(),
			/** Where it shows up: the DevTools panel or Lighthouse insight that names it. */
			spot: z.string(),
			/** Regexes that find candidates in a codebase — JavaScript and ripgrep alike. */
			detect: z.array(z.string().refine(isPattern, "not a portable regex")).min(1),
			/** When code that matches `detect` is not a problem. */
			fineWhen: z.string(),
			/** Sources, the first being the official guide that files it under its chapter. */
			refs: z.array(z.url()).min(1),
		})
		.refine(fitsChapter, {
			message: "phase missing, or not one of the chapter's phases",
			path: ["phase"],
		})
		.refine((data) => GUIDES[data.chapter].includes(data.refs[0] ?? ""), {
			message: "the first ref must be the chapter's official guide (GUIDES)",
			path: ["refs"],
		})
		.refine((data) => data.metrics.includes(data.chapter), {
			message: "metrics must include the chapter's own vital",
			path: ["metrics"],
		})
		.refine((data) => detects({ patterns: data.detect, code: data.slow }), {
			message: "no detect pattern matches the slow code",
			path: ["detect"],
		}),
});

export const collections = { perf };
