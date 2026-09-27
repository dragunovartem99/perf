import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import type { Catalog } from "@/modules/catalog";
import { toEntry } from "@/modules/catalog";
import { CHAPTER_IDS, CHAPTERS, PHASES } from "@/taxonomy";

// Every card as data, in page order: the file tools and skills read.
export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("`site` must be set in astro.config.ts");
	const page = new URL(`${import.meta.env.BASE_URL.replace(/\/$/u, "")}/`, site).href;
	const cards = (await getCollection("perf")).toSorted((a, b) => a.data.order - b.data.order);

	const catalog: Catalog = {
		name: "perf",
		version: 1,
		url: page,
		groups: CHAPTER_IDS.map((id) => ({
			id,
			title: CHAPTERS[id].title,
			phases: Object.entries(PHASES[id]).map(([phase, title]) => ({ id: phase, title })),
		})),
		entries: CHAPTER_IDS.flatMap((chapter) =>
			cards.filter((card) => card.data.chapter === chapter)
		).map((entry) => toEntry({ entry, page })),
	};

	return new Response(JSON.stringify(catalog, undefined, "\t"), {
		headers: { "Content-Type": "application/json" },
	});
};
