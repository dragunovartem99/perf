import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import type { Catalog } from "@/modules/catalog";
import { toEntry } from "@/modules/catalog";
import { BASIS, CHAPTER_IDS, CHAPTERS, PHASES, pageOrder } from "@/taxonomy";

// Every card as data, in page order: the file tools and skills read.
export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("`site` must be set in astro.config.ts");
	const page = new URL(`${import.meta.env.BASE_URL.replace(/\/$/u, "")}/`, site).href;
	const cards = pageOrder(await getCollection("perf"));

	const catalog: Catalog = {
		name: "perf",
		version: 1,
		url: page,
		basis: BASIS,
		groups: CHAPTER_IDS.map((id) => ({
			id,
			title: CHAPTERS[id].title,
			summary: `${CHAPTERS[id].target}: ${CHAPTERS[id].sign}`,
			phases: Object.entries(PHASES[id]).map(([phase, title]) => ({ id: phase, title })),
		})),
		entries: cards.map((entry) => toEntry({ entry, page })),
	};

	return new Response(JSON.stringify(catalog, undefined, "\t"), {
		headers: { "Content-Type": "application/json" },
	});
};
