/** How a token is set: plain, a keyword in vermilion, a literal that recedes, or a comment. */
export type TokenKind = "plain" | "keyword" | "literal" | "comment";

/** A run of code that shares one kind. */
export type Token = {
	text: string;
	kind: TokenKind;
};

/** One line of a snippet, as tokens in reading order. */
export type Line = readonly Token[];
