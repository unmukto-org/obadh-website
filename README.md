# obadh.unmukto.org

The website for [Obadh](https://github.com/nsssayom/obadh_engine), a free and open-source Bangla
keyboard for iPhone, iPad and Mac.

Astro 5 and Tailwind 4, static output, no component library. Two languages: English at `/` and
Bangla at `/bn/`. The JavaScript on the page is the hero animation, the mobile menu, the platform
routing on `/download/`, and the typing box, which runs the real engine.

Design tokens live in one place, `src/styles/app.css`, in a Tailwind `@theme` block: colour, the
fluid type scale, radii, shadows and easings. Nothing hard-codes a hex value.

### One palette, and it is night

There is no light mode and no theme switch. The ground is Obadh's own deep teal taken down until
it is nearly black, and the bright teal from the app icon is the single accent. A palette tuned
once is worth more than two half-tuned ones.

Four planes and nothing else — `ground` is the page, `veil` and `raise` are the alternating bands
that give a long page rhythm without rules drawn between its parts, and `card` is anything that
sits on top. Depth is the hairline, not a shadow: on a dark ground a drop shadow is nearly
invisible anyway.

**One gradient on the whole site**, and it is the wide lift low in the home hero. Everything else
is flat. An earlier pass had gradients on the headline, the Bangla, the buttons, every card face
and four separate section washes at once, and the effect of that is cheapness rather than depth —
so if you are about to add a second one, don't.

Two things that do not survive the dark ground and are handled explicitly: the QR on `/download/`
sits on a white plate, because it is dark modules on a transparent background and most scanners
will not read an inverted code; and `theme-color` in `Base.astro` has to match the ground or
mobile browsers paint their chrome the wrong colour.

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # → dist/
npm run audit          # checks the built site (see below)
```

Node 22.11 or later. Astro 6 and 7 need Node ≥ 22.12; the project is pinned to Astro 5 so it
builds on 22.11. Bump both together when you upgrade Node.

## Before this goes live

Three links point at nothing yet. They are marked `TODO(maintainer)` in `src/config.ts`:

| Constant | What it needs |
|---|---|
| `LINKS.appStore` | The real App Store listing. Until it exists, `.drafts/copy-shared.md` §5 has the honest fallback: a **Build it from source** button pointing at the iOS repo. |
| `LINKS.macDmg` | The tagged GitHub release for `Obadh-0.1.0.dmg`. |
| `LINKS.discord` | The community server invite. |

Also worth settling before launch. Each of these was found by reading the app repositories
against what this site says, so each one is a sentence here that is not yet true:

- **`LICENSE` files.** `git ls-files | grep -i licen` finds one only in `obadh_engine`; the
  GitHub API reports `license: null` for `obadh-ios` and `obadh-macos`. Public source with no
  grant is all-rights-reserved. Every "MIT licensed" sentence on this site, and the `license`
  field in the structured data, is waiting on two files. This is the shortest item on the list
  and the largest.
- **A tagged release and a notarized DMG.** `git tag` in `obadh-macos` is empty, and
  `dist/Obadh-0.1.0.dmg` fails `xcrun stapler validate` — it came from the `--unsigned` path
  that `scripts/package.sh` labels a local check. The word *notarized* appears in the home
  hero, on `/download/` and in the Mac platform row. It becomes true when `package.sh` runs
  with a Developer ID certificate and `stapler validate` passes.
- **Four platform statuses.** `/download/#other-platforms` calls Linux, Android, Windows and
  ChromeOS *in development*. No public branch in any repository carries that work. Either push
  it, or the four rows and `llms.txt` say *planned* instead.
- **The `URLSession` sentence** on the home page and `/privacy/` is a claim a reader can check,
  which is what makes it worth making. Re-run
  `grep -rn "URLSession\|URLRequest\|import Network" --include="*.swift"` over `obadh-ios` and
  `obadh-macos` at every release. The day a network call lands anywhere in either repository,
  the sentence comes off the page rather than gets a qualifier.
- **`obadh_engine/README.md`** still says the optimized WASM is "about 280 KB". The artifact is
  390,759 bytes. This site says 390 KB; the README is the last place carrying the old figure.
- **The domain.** Everything canonical comes from `SITE_URL`. To move the site:
  `SITE_URL=https://obadh.io npm run build`. Also update `public/robots.txt`, `public/llms.txt`
  and the `SITE` constant in `scripts/og.mjs`, which are static files and do not read the env.

## How it is put together

```
src/config.ts          domain, locales, links, versions, route helpers
src/i18n/ui.ts         nav, footer, the language switch, the typing box, 404
src/copy/types.ts      the shape every page's copy fills, in both languages
src/copy/<page>/       en.ts and bn.ts, one pair per page
src/data/scheme.ts     the 176 rows of the writing scheme
src/data/pairs.ts      every other Roman/Bangla pair the site prints
src/layouts/           one layout per page kind
src/components/        the transformation row, the typing box, the rest
src/styles/app.css     the Tailwind @theme: colour, type, radii, motion
public/wasm/           obadh_engine's own pkg output, copied verbatim
```

Copy lives in typed modules rather than markdown so the two languages cannot drift apart: if the
English home page grows a capability block and the Bangla one does not, the build says so.

### The alpona

The Bengali courtyard drawing, made freehand on a swept floor for a festival, by anyone, which is
why it is the piece of the tradition this site borrows: it belongs to no institution and carries
no religion of its own. Its centre sits on the page's top-left corner, so a quarter of it fans
into the hero and runs up behind the wordmark. The header is transparent for exactly that reason,
and takes the page's colour back once you scroll past it.

```bash
node scripts/alpona.mjs <source.svg> [--mono] [--motifs] [--strip-bottom]
```

The script normalises the file, splits every path into its subpaths, measures each one in a real
browser, drops the background, the frame and anything outside the artwork's own square, recolours,
and writes the result out. Three colour modes:

- **`--mono`** — what the site ships. One tone, written as a mask so the page supplies the colour.
- **`--motifs`** — finds the parts of each ring and alternates the folk palette between them.
- Neither — retunes the source's own fills onto the folk palette by hue and rasterises. For
  artwork that already has colour separation in it.

#### How it is quieted

It is drawn at **full opacity**, in a tone mixed most of the way to the page's own ground. That is
deliberate and the reverse of the obvious approach: dropping the opacity fades the outer rim along
with everything else, and this drawing ends on that rim. Low contrast keeps it a background;
fading it just loses its edges.

The mask over it in `HomePage.astro` is an **annulus, not a disc** — a mandala's centre is its
densest point, and here that point lands exactly where the wordmark sits — and it has no outer
fade at all.

#### `--motifs`, and how a ring is taken apart

Worth keeping even though the site is currently mono, because the analysis is the useful part.

Most of these drawings are traced line art. A whole band — all sixteen rim petals — is frequently a
*single contour*, and its inner detail is nested inside it as even-odd holes, so nothing in it is
separately fillable. But the arithmetic says which is which: **arc length ÷ π·width** is exactly
1.00 for a plain circle and 8× for a band that wanders.

A band is then cut at its own seams. Walk the outline, record how far out each point sits, take the
outer envelope angle by angle: a petal is a hill and the junction between two petals is a valley.
Cutting at the valleys puts every boundary in a dip the drawing already has, so no petal is ever
split. (An earlier version cut at evenly spaced angles guessed from an ink histogram, and every
other petal came out half one colour and half another.) The band is defined once and drawn through
N wedge clip paths with `<use>`, so its path data is stored once however many slices it is in.

#### Things that failed silently

Every one of these produced a plausible-looking but wrong result rather than an error:

- **Relative `m` subpaths only mean anything in sequence.** They must be made absolute *before* the
  path is split, or a subpath lifted out on its own lands at the origin and looks exactly like
  artwork outside the canvas.
- **Subpaths must be regrouped, not left exploded.** `fill-rule: evenodd` only makes a hole where
  the inner shape shares an element with the outer one. Left apart, every hole fills and a line-art
  mandala comes out a solid disc.
- **The old `fill` has to be removed before the new one is written.** Two `fill` attributes on one
  element is invalid, the first wins, and the retune does nothing.
- **Referenced `id`s must survive the cleanup.** Stripping every `id` dangles each `href="#…"` and
  `clip-path: url(#…)`, and the cut bands vanish while the rest of the drawing stays.
- **Prefixed elements have to go before their namespace declarations do.** Strip `xmlns:sodipodi`
  and leave a `<sodipodi:namedview>` behind and the file is no longer well-formed XML — the browser
  refuses to parse it, and a mask that will not parse masks everything away.
- **Measure every drawn leaf, at any depth.** These files nest paths in groups, and a cut band is a
  set of `<use>` elements; a selector that only sees top-level `<path>` crops the artwork down to
  whatever it matched.
- **The centre is the drawing's, not the canvas's.** A 1000×1080 file has its mandala in the top
  square, so the viewBox centre sits below it and every cut lands off-axis.
- **Measure in one coordinate space.** These files carry a flipping matrix from the EPS conversion,
  so `getBBox()` on an original and on a probe appended elsewhere are not comparable. Some carry a
  fixed pixel size and no viewBox, which pins them at their natural width and defeats everything
  after.

### The rail, and why it is gone

The site used to draw one horizontal stroke at the matra height of the Bangla it accompanied —
broken over Roman text, whole over Bangla, where it was not near the matra but *was* the matra
extended leftward over the keystrokes that produced it.

It is not on the site any more. At every real size it read as a line struck through the words
rather than as the matra continuing, and it made the typing box look broken. What replaced it is
the brand gradient on the Bangla itself: the same idea — this run is the output — carried by the
colour of the letters instead of a rule over them. `scripts/measure-rail.mjs` still prints the
metrics if the device is ever wanted back.

### The hero animation

The keyboard, working, as the three surfaces it actually is: a field where the Bangla lands with
the composing word underlined as marked text, the iOS suggestion bar under it, and the keys, which
light as they are pressed — shift included, so you can watch it go down for the capital that makes
a long vowel. The keys are the app's own layout, from `KeyboardLayout.swift` in obadh-ios: three
letter rows with shift and backspace inside the third, then `123`, the emoji key, space and return.

Edit the sentences in **`src/data/hero-lines.json`**, which documents its own fields, then:

```bash
node scripts/hero-lines.mjs
```

You write only the Roman. Everything else is read out of the shipped artifacts, because every one
of them was got wrong by hand first:

- **What each line composes**, and what it looks like after every keystroke, from the engine binary.
- **The text candidates in the bar**, from the engine's own autocorrect — `obadh-autocorrect
  suggest-fst` against `data/autocorrect/models/bn.fst`. So the pair offered for a mistyped word is
  the pair the keyboard would offer.
- **The emoji**, from `emoji-bn.bin` in the obadh-ios repository: the same memory-mapped table the
  keyboard searches, word to up to three emoji, decoded straight from the binary. Picking them by
  hand got five of seventeen wrong against it — চা is 🍵 and not ☕, বই is 📚 and not 📖 — and
  invented six more for words the keyboard has no emoji for at all.

**Punctuation** is typed like anything else, and the engine composes it too: a plain `.` becomes a
দাঁড়ি, digits become ০–৯, `,` `?` `!` and quotes pass through, and a dot between digits stays a dot
(১২.৫). None of it is on the letters page, so it lights `123` — which is where you would have gone
to find it. Two rules follow, both enforced by the build: a word is stripped of its punctuation
before the emoji table or the lexicon is asked, since neither has a key ending in a dari; and a line
that ends in punctuation cannot end by *taking* an emoji, because the tap replaces the word being
composed and the dari has already committed it. Corrections are the opposite — typing punctuation is
what commits an autocorrection on the phone, so those lines end on the punctuation mark and keep it.

Some lines are **mistyped on purpose**, so the bar has a real correction to offer and the demo can
take it. `"fix": "manus"` mistypes the last word; `"fix": {"manuSh": "manus"}` names a word anywhere
in the line, and then the correction lands **on the space that commits it** and the typing carries on
over the corrected word — which is where autocorrect actually happens on a phone, and the more
convincing of the two. Past that point the line is composed from the *right* spelling, because
carrying on from the misspelling would un-correct the word as soon as the next letter went down. A line whose last word has an emoji types that word **twice**, and the second one is
tapped away into the emoji — because tapping an emoji *replaces* the composed word (the typed text
was the emoji's query), so typing it once and tapping would leave the sentence a word short.

`skipWords` in the JSON steps the emoji lookup over words where the table is right and the sentence
is not: না is ❌ because it means "no", but in ফুল ফুটুক না ফুটুক it is a negation and a red cross
reads as an error.

The set of lines is fetched from `/hero-lines.json` rather than inlined — 120 KB of JSON in the
markup is more than the rest of the home page put together and cannot be cached. The first line is
server-rendered, so the hero is complete before any script runs, and the rest arrive after.

Nothing is attributed on the page, so nothing is misattributed.

### The typing box

`public/wasm/` holds `obadh_engine`'s own `pkg/` output byte for byte, so what composes Bangla on
the page is the same code the keyboards link against. About 390 KB on disk, 123 KB over the wire
with Brotli, fetched after first paint and only when a box on the page wants it.

The finished pair is server-rendered, so the page is complete before any script runs and stays
complete if none ever does. Nothing is sent anywhere.

To update it after an engine release:

```bash
cp ../obadh_engine/pkg/obadh_engine.js ../obadh_engine/pkg/obadh_engine_bg.wasm public/wasm/
npm run verify:pairs   # the engine's output is the site's copy; re-check it
```

## Checks

```bash
npm run verify:pairs   # every Roman/Bangla pair, back through the engine binary
npm run verify:copy    # the Bangla claimed in running prose, likewise
npm run audit          # the built site: links, heads, hreflang, stray Bangla, alt text
npm run smoke          # behaviour: the typing box, focus, the sheet, 320px
npm run platforms      # /download/ routing, as each platform, in both languages
npx astro check        # types
npm run shots          # screenshots into .shots/
```

`verify:pairs` needs the engine's release binary:

```bash
cd ../obadh_engine && cargo build --release --features cli --bin obadh
```

It runs all 210 pairs through it and fails on the first disagreement. The guide is a reference
people type from, so a wrong row is worse than a missing one. Never add a pair without running it:
the deterministic core is strict and the obvious spelling is usually wrong. `bhalobasa` gives
ভালবাসা, not ভালোবাসা. `arO` gives আরো, not আরও. `bir` gives বির, not বীর.

`audit` also enforces the rule that no Bangla appears outside a `lang="bn"` element on an English
page. That is not pedantry: it selects the Bangla font, sets its optical size, kills the
letter-spacing that would break the matra, and tells a screen reader which language to speak.

`platforms` drives `/download/` under nine real user agents and checks each one is handed the
right panel. The pair that matters is the iPad: since iPadOS 13 it asks for the desktop site and
arrives with a Mac's user agent, and `navigator.maxTouchPoints` is the only thing separating the
two. It also loads the page with scripting off, where the fallback panel offering both shipping
platforms has to be the one showing.

## Never split Bangla into per-character elements

Bengali shapes across characters. `া` and `ো` are combining marks belonging to the consonant
before them, and conjuncts are formed from sequences. Give each code point its own element — the
usual way to animate text letter by letter — and the browser has nothing to shape, so
`আমার সোনার বাংলা` renders as `আম ◌ার স ◌োনার`, every mark orphaned onto a dotted circle.
Grapheme clusters are not enough either, because shaping crosses cluster boundaries.

`src/components/HeroType.astro` is the animation that has to do this anyway. It keeps the whole
sentence in one text run, shaped once, and reveals it by measuring the current frame in a hidden
mirror and moving a mask across the real line.

## Regenerating assets

```bash
npm run build:fonts    # re-fetch the woff2 subsets into public/fonts/
npm run build:og       # re-render the social cards into public/og/
npm run build:qr       # re-render the download QR codes into public/
node scripts/hero-lines.mjs   # re-ask the engine for the hero's sentences
```

The social cards are rendered in Chrome rather than by an SVG-to-PNG library, because Bengali
conjuncts need real shaping and a library that fakes it would ship ভালোবাসা as a row of broken
parts to every chat window that unfurls a link.

## Deploying

Static output. Any host works. Two things the host must do:

1. Serve `dist/404.html` with an HTTP **404**, not a 200. A static host that returns 200 with the
   body makes a soft 404 and search engines index it.
2. Serve `.wasm` as `application/wasm`, or the typing box falls back to its static state.

Long-cache `/fonts/`, `/og/`, `/wasm/` and Astro's hashed assets. Do not long-cache the HTML.

## Fonts

Schibsted Grotesk (Latin), Anek Bangla (Bangla UI), Tiro Bangla (Bangla text serif) and IBM Plex
Mono (the Roman side of every typing example), all under the SIL Open Font License 1.1 and
self-hosted in `public/fonts/`. No request leaves the page.

## License

MIT, like the rest of the project. The literary quotations are short passages from published
works, attributed on the page.
