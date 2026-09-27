import type { Severity } from "@/modules/catalog";
import { byPlace } from "@/modules/catalog";

import type { ChapterId } from "./chapters";
import { CHAPTER_IDS } from "./chapters";
import { PHASES } from "./phases";

type Card = { data: { chapter: ChapterId; phase?: string; impact: Severity; title: string } };

// Every card in page order: chapter by chapter, then by place within it — never by hand.
export function pageOrder<T extends Card>(cards: readonly T[]): T[] {
	const place = ({ data }: T) => ({
		phase: Math.max(0, Object.keys(PHASES[data.chapter]).indexOf(data.phase ?? "")),
		severity: data.impact,
		title: data.title,
	});
	return CHAPTER_IDS.flatMap((chapter) =>
		cards
			.filter((card) => card.data.chapter === chapter)
			.toSorted((a, b) => byPlace(place(a), place(b)))
	);
}
