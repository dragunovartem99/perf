import type { CatalogEntry, Severity } from "../types";

/** A perf card as the content collection hands it over. */
export type PerfSource = {
	id: string;
	body?: string;
	data: {
		title: string;
		chapter: string;
		phase: string;
		metrics: string[];
		impact: Severity;
		slow: string;
		fast: string;
		lang: string;
		fastLang?: string;
		spot: string;
		detect: string[];
		fineWhen: string;
		refs: string[];
	};
};

// One card in the shared catalog shape; `page` is the sheet's absolute URL.
export function toEntry({ entry, page }: { entry: PerfSource; page: string }): CatalogEntry {
	const { data } = entry;
	return {
		id: entry.id,
		title: data.title,
		url: `${page}#${entry.id}`,
		group: data.chapter,
		phase: data.phase,
		severity: data.impact,
		anchors: data.metrics.map((metric) => metric.toUpperCase()),
		bad: { label: "Slow", code: data.slow.trim(), lang: data.lang },
		good: { label: "Fast", code: data.fast.trim(), lang: data.fastLang ?? data.lang },
		why: (entry.body ?? "").trim(),
		detect: data.detect,
		verify: data.spot,
		fineWhen: data.fineWhen,
		refs: data.refs,
	};
}
