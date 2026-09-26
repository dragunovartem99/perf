/** The languages the snippets are written in, as Shiki names them. */
export const LANGS = ["html", "css", "js", "jsx", "http"] as const;

export type Lang = (typeof LANGS)[number];
