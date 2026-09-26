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
			provider: fontProviders.google(),
			name: "Hanken Grotesk",
			cssVariable: "--font-sans",
			weights: [400, 600],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["sans-serif"],
		},
		{
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
