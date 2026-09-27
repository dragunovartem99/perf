/** The languages the snippets are written in, as Shiki names them. */
export const LANGS = ["html", "css", "js", "jsx", "json", "http"] as const;

export type Lang = (typeof LANGS)[number];
