import type { ThemeRegistrationRaw } from "shiki";

import type { TokenKind } from "../types";

/**
 * Shiki colours tokens; this page cannot, because inline styles break its CSP.
 * So the theme paints each kind a sentinel colour — never shown — and the
 * colour is read back as a class name. TextMate scope matching stays Shiki's.
 */
const SENTINELS: Record<TokenKind, string> = {
	plain: "#000000",
	comment: "#000001",
	literal: "#000002",
	keyword: "#000003",
};

export const THEME: ThemeRegistrationRaw = {
	name: "perf-kinds",
	type: "light",
	settings: [
		{ settings: { foreground: SENTINELS.plain, background: "#ffffff" } },
		{
			scope: ["comment", "punctuation.definition.comment"],
			settings: { foreground: SENTINELS.comment },
		},
		{
			scope: ["string", "constant", "support.constant", "punctuation.definition.string"],
			settings: { foreground: SENTINELS.literal },
		},
		{
			scope: ["keyword", "storage", "entity.name.tag", "variable.language"],
			settings: { foreground: SENTINELS.keyword },
		},
		// Operators are keywords to TextMate, but `=` and `=>` in red would be
		// noise; the worded ones — `new`, `typeof`, `of` — stay keywords.
		{
			scope: ["keyword.operator", "storage.type.function.arrow"],
			settings: { foreground: SENTINELS.plain },
		},
		{
			scope: ["keyword.operator.new", "keyword.operator.expression", "keyword.operator.of"],
			settings: { foreground: SENTINELS.keyword },
		},
		// A unit belongs to its number; a header's colon is punctuation.
		{ scope: ["keyword.other.unit"], settings: { foreground: SENTINELS.literal } },
		{ scope: ["keyword.other.http"], settings: { foreground: SENTINELS.plain } },
	],
};

const KIND_BY_SENTINEL = new Map(
	Object.entries(SENTINELS).map(([kind, color]) => [color, kind as TokenKind])
);

// The kind a sentinel colour stands for; anything unknown reads as plain.
export function kindOf({ color }: { color: string | undefined }): TokenKind {
	return KIND_BY_SENTINEL.get(color ?? "") ?? "plain";
}
