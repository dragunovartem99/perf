"""
Cuts Zen Kaku Gothic New down to what this page prints: Latin-1, punctuation
and its own kanji. The full font is 2.3 MB; each subset is ~14 KB.

It also swaps the font's tall hhea/win line metrics (1.16 em above the
baseline for 0.70 em capitals) for its typographic ones, so a line box hugs
the text in every browser, with or without `text-box: trim`. And it trims the
blank space before a capital P, so the hero's stem lines up with the text
above and below it without a CSS offset.

Re-run after adding a kanji to the page:

    pip install fonttools brotli
    python scripts/subset-font.py path/to/ZenKakuGothicNew-{Regular,Medium}.ttf

The TTFs are in github.com/google/fonts, under ofl/zenkakugothicnew.
"""

import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

UNICODES = "U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+2192"
KANJI = "寸陰を惜しむ一二三四五第章終"
# Letters that open a display line flush left: their outline starts at x = 0.
FLUSH = "P"
WEIGHTS = {"Regular": 400, "Medium": 500}
OUT = Path(__file__).resolve().parent.parent / "src/assets/fonts"

# Sets the line metrics to the typographic ones and tells browsers to use them.
def use_typo_metrics(font: TTFont) -> None:
    os2, hhea = font["OS/2"], font["hhea"]
    hhea.ascent, hhea.descent, hhea.lineGap = os2.sTypoAscender, os2.sTypoDescender, 0
    os2.usWinAscent, os2.usWinDescent = os2.sTypoAscender, -os2.sTypoDescender
    os2.sTypoLineGap = 0
    os2.fsSelection |= 1 << 7


# Moves each letter's outline left onto its origin and narrows its advance by
# the same amount, so only the space before it changes.
def flush_left(font: TTFont, letters: str) -> None:
    glyf, hmtx, cmap = font["glyf"], font["hmtx"], font.getBestCmap()
    for letter in letters:
        name = cmap[ord(letter)]
        advance, lsb = hmtx[name]
        glyph = glyf[name]
        glyph.coordinates.translate((-lsb, 0))
        glyph.recalcBounds(glyf)
        hmtx[name] = (advance - lsb, 0)


for source in map(Path, sys.argv[1:]):
    weight = WEIGHTS[source.stem.split("-")[-1]]
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    font = TTFont(source)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=subset.parse_unicodes(UNICODES), text=KANJI)
    subsetter.subset(font)
    use_typo_metrics(font)
    flush_left(font, FLUSH)
    target = OUT / f"zen-kaku-gothic-new-{weight}.woff2"
    font.flavor = "woff2"
    font.save(target)
    print(target.relative_to(OUT.parent.parent.parent), target.stat().st_size, "bytes")
