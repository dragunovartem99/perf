import type { Line } from "../types";
import { kindOf } from "./theme";

/** The slice of Shiki's token this module reads. */
type Colored = {
	content: string;
	color?: string;
};

// Shiki's lines of coloured tokens as lines of kinds, with neighbours of the
// same kind joined so the markup stays as small as the code.
export function toLines({ tokens }: { tokens: readonly (readonly Colored[])[] }): Line[] {
	return tokens.map((line) => {
		const out: { text: string; kind: Line[number]["kind"] }[] = [];
		for (const { content, color } of line) {
			const kind = kindOf({ color });
			const last = out.at(-1);
			if (last?.kind === kind) last.text += content;
			else out.push({ text: content, kind });
		}
		return out;
	});
}
