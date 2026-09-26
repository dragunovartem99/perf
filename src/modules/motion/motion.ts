/**
 * Every tween on the page. Transform, opacity and stroke only, so nothing
 * relayouts mid-animation, and nothing the reader needs is ever hidden waiting
 * on a script: content already on screen at load is left alone, and without
 * JavaScript the page is simply still.
 */

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/** A chapter counts as read, and its target as dead, once its end passes this line. */
const READ_LINE = "bottom 65%";

/** The last chapter never scrolls that high — the footer is too short — so it counts once its end is in view. */
const LAST_READ_LINE = "bottom bottom";

/** Where a title card starts its entrance. */
const ENTER_LINE = "top 75%";

const reduced = matchMedia("(prefers-reduced-motion: reduce)");

// Strikes a name off the death list with a pen stroke once its chapter is
// read. A kill is permanent: scrolling back up to the list is exactly when the
// reader should see it. Under reduced motion the stroke appears at once.
function deathList(): void {
	const chapters = [...document.querySelectorAll<HTMLElement>("[data-chapter]")];

	for (const chapter of chapters) {
		const target = document.querySelector(`[data-target="${chapter.dataset.chapter}"]`);
		const stroke = target?.querySelector(".strike path");
		if (!target || !stroke) continue;

		gsap.set(stroke, { drawSVG: "0%", visibility: "visible" });

		ScrollTrigger.create({
			trigger: chapter,
			start: chapter === chapters.at(-1) ? LAST_READ_LINE : READ_LINE,
			once: true,
			onEnter: () => {
				target.classList.add("is-dead");
				gsap.to(stroke, {
					drawSVG: "100%",
					duration: reduced.matches ? 0 : 0.5,
					ease: "power2.inOut",
				});
			},
		});
	}
}

// A title card's heading rises line by line out of a mask, then its kicker,
// subtitle and kanji fade in after it, one by one — including a card already on screen at load, which
// CSS keeps hidden until this runs (see ChapterCard.astro). `autoSplit`
// re-splits once the web font lands or the width changes, so the lines always
// match what is on screen.
function chapterCards(): void {
	for (const card of document.querySelectorAll<HTMLElement>(".chapter-card")) {
		const title = card.querySelector(".title");
		const rest = card.querySelectorAll(".kicker, .subtitle, .kanji");
		if (!title) continue;

		gsap.set([title, ...rest], { visibility: "visible" });

		SplitText.create(title, {
			type: "lines",
			mask: "lines",
			autoSplit: true,
			onSplit: (split) =>
				gsap
					.timeline({ scrollTrigger: { trigger: card, start: ENTER_LINE, once: true } })
					.from(split.lines, {
						yPercent: 110,
						duration: 0.9,
						ease: "expo.out",
						stagger: 0.08,
					})
					.from(
						rest,
						{ autoAlpha: 0, y: 8, duration: 0.8, ease: "power2.out", stagger: 0.12 },
						"<0.25"
					),
		});
	}
}

// Mounts everything once. The strikes always run; entrances only for readers
// who have not asked for less motion.
export function mountMotion(): void {
	gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
	deathList();

	gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
		chapterCards();
	});
}
