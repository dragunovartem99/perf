import { createHighlighter } from "shiki";

import type { Lang } from "./langs";
import { LANGS } from "./langs";
import type { Line } from "./types";
import { toLines } from "./utils/lines";
import { THEME } from "./utils/theme";

/** Created on first use and shared by every snippet in the build. */
let highlighter: ReturnType<typeof createHighlighter> | undefined;

// The shared highlighter, created on the first call.
function load(): ReturnType<typeof createHighlighter> {
	highlighter ??= createHighlighter({ themes: [THEME], langs: [...LANGS] });
	return highlighter;
}

// Splits a snippet into lines of classified tokens. Runs at build time only:
// Shiki never reaches the browser, only the spans it decided on.
export async function highlight({ code, lang }: { code: string; lang: Lang }): Promise<Line[]> {
	const { tokens } = (await load()).codeToTokens(code, { lang, theme: "perf-kinds" });
	return toLines({ tokens });
}
