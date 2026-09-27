import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { detects, isPattern } from "@/modules/catalog";
import { LANGS } from "@/modules/highlight";
import { CHAPTER_IDS, IMPACTS, METRICS, PHASE_IDS, phaseLabel } from "@/taxonomy";

const perf = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/perf" }),
	schema: z
		.object({
			/** Position within its chapter, following the order of its phases. */
			order: z.number().int().positive(),
			title: z.string(),
			chapter: z.enum(CHAPTER_IDS),
			/** Where in the chapter the time goes: one of `PHASES[chapter]`. */
			phase: z.enum(PHASE_IDS),
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
			refs: z.array(z.url()).min(1),
		})
		.refine((data) => phaseLabel(data) !== undefined, {
			message: "phase belongs to another chapter",
			path: ["phase"],
		})
		.refine((data) => detects({ patterns: data.detect, code: data.slow }), {
			message: "no detect pattern matches the slow code",
			path: ["detect"],
		}),
});

export const collections = { perf };
