import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	site: "https://dragunovartem99.github.io",
	// A GitHub Pages project site lives under the repository name, so every
	// internal URL has to be built against it — `import.meta.env.BASE_URL`.
	base: "/perf",

	trailingSlash: "ignore",

	// Shiki highlights with inline styles, which the CSP below would block.
	markdown: {
		syntaxHighlight: false,
	},

	// Downloaded and self-hosted at build time: no third-party request, no extra
	// origin to connect to before the first paint.
	fonts: [
		{
			// The one text face: a Japanese gothic, for body, headings and kanji
			// alike. Self-hosted, and subset to the page's own characters by
			// `scripts/subset-font.py` — re-run it after adding a kanji.
			provider: fontProviders.local(),
			name: "Zen Kaku Gothic New",
			cssVariable: "--font-sans",
			fallbacks: ["sans-serif"],
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/zen-kaku-gothic-new-400.woff2"],
						weight: 400,
						style: "normal",
					},
					{
						src: ["./src/assets/fonts/zen-kaku-gothic-new-500.woff2"],
						weight: 500,
						style: "normal",
					},
				],
			},
		},
		{
			// Code only: every character in a copied snippet must be unmistakable.
			provider: fontProviders.google(),
			name: "DM Mono",
			cssVariable: "--font-mono",
			weights: [400],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["monospace"],
		},
	],

	// Pages cannot send headers, so Astro emits the policy as a `<meta>` tag and
	// hashes every script and style it inlines.
	security: {
		csp: {
			algorithm: "SHA-256",
			directives: [
				"default-src 'none'",
				"img-src 'self' data:",
				"font-src 'self'",
				"connect-src 'self'",
				"base-uri 'none'",
				"form-action 'none'",
			],
		},
	},
});
