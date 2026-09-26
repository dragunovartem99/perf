import { observeVitals } from "./observe";
import type { Metric } from "./types";
import { formatReading } from "./utils/format";
import { rate } from "./utils/rating";

function isMetric(value: string | undefined): value is Metric {
	return value === "lcp" || value === "cls" || value === "inp";
}

// Fills every `[data-metric]` cell under `root` as readings arrive, and shows
// the readout — it stays hidden without JavaScript, when it would read nothing.
export function mountVitals({ root }: { root: HTMLElement }): void {
	const cells = new Map<Metric, HTMLElement>();
	for (const cell of root.querySelectorAll<HTMLElement>("[data-metric]")) {
		const { metric } = cell.dataset;
		if (isMetric(metric)) cells.set(metric, cell);
	}

	observeVitals({
		report: ({ metric, value }) => {
			const cell = cells.get(metric);
			if (!cell) return;
			cell.textContent = formatReading({ metric, value });
			if (value !== null) cell.dataset.rating = rate({ metric, value });
		},
	});

	root.hidden = false;
}
