#!/usr/bin/env node
/**
 * Builds the hero's sentence repository by asking the engine, keystroke by
 * keystroke, what each line looks like as it is being typed.
 *
 *   node scripts/hero-lines.mjs   →  src/data/hero-lines.ts
 *
 * Nothing here is transcribed. Every Bangla string in the output file came out
 * of `obadh_engine/target/release/obadh`, so the animation shows exactly what
 * the keyboard would do — including the moments where a letter is still
 * undecided, which is the part that makes it worth watching.
 *
 * Re-run it after an engine bump. If a spelling rule changed, the file changes
 * with it, and `git diff` says which line moved.
 *
 * The lines themselves: songs and poems most Bangla readers can finish from
 * the first three words, and ordinary sentences people actually type. Nothing
 * is attributed on the page, so nothing is misattributed.
 */
import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BIN = process.argv[2] ?? '/Users/nsssayom/Dev/obadh_engine/target/release/obadh';

if (!existsSync(BIN)) {
  console.error(`No engine binary at ${BIN}.`);
  console.error('Build it: cd obadh_engine && cargo build --release --features cli --bin obadh');
  process.exit(2);
}

/*
  The lines live in src/data/hero-lines.json so they can be edited without
  touching this script. Roman only; the file documents its own fields.
*/
const SOURCE = process.env.HERO_SOURCE
  ? resolve(process.env.HERO_SOURCE)
  : join(ROOT, 'src/data/hero-lines.json');

if (!existsSync(SOURCE)) {
  console.error(`No line list at ${SOURCE}.`);
  process.exit(2);
}

const source = JSON.parse(await readFile(SOURCE, 'utf8'));
const SKIP = new Set(source.skipWords ?? []);

/*
  Every field a line may carry. Anything else is a mistake — a typo in a key
  name would otherwise be silently ignored and the line would quietly lose the
  behaviour it was asked for.
*/
const ALLOWED = new Set(['roman', 'note', 'fix', 'emoji', 'emojiWord', 'take', 'repeat']);
const TAKES = new Set(['auto', 'none', 'word', 'emoji']);

const LINES = source.groups.flatMap((group) =>
  group.lines.map((line) => {
    // A bare string is shorthand for a line with nothing special about it.
    const entry = typeof line === 'string' ? { roman: line } : { ...line };
    const where = `"${entry.roman ?? line}" in ${group.group}`;

    for (const key of Object.keys(entry)) {
      if (!ALLOWED.has(key)) {
        throw new Error(`${where}: unknown field "${key}". Allowed: ${[...ALLOWED].join(', ')}`);
      }
    }
    if (typeof entry.roman !== 'string' || !entry.roman.trim()) {
      throw new Error(`${where}: roman is required and must be a non-empty string.`);
    }
    if (entry.emoji !== undefined && entry.emoji !== false && typeof entry.emoji !== 'string') {
      throw new Error(`${where}: emoji must be false, or an emoji string to force.`);
    }
    if (entry.take !== undefined && !TAKES.has(entry.take)) {
      throw new Error(`${where}: take must be one of ${[...TAKES].join(', ')}.`);
    }
    if (entry.repeat !== undefined && typeof entry.repeat !== 'boolean') {
      throw new Error(`${where}: repeat must be true or false.`);
    }
    if (entry.fix !== undefined) {
      const one = typeof entry.fix === 'string';
      const named = entry.fix && typeof entry.fix === 'object' && !Array.isArray(entry.fix);
      if (!one && !named) {
        throw new Error(`${where}: fix must be a misspelling string, or { "<the roman word>": "<the misspelling>" }.`);
      }
      if (named && Object.keys(entry.fix).length !== 1) {
        throw new Error(`${where}: fix names ${Object.keys(entry.fix).length} words; one line corrects one word.`);
      }
    }
    return { ...entry, group: group.group };
  }),
);

/*
  Both halves of the suggestion bar come out of the shipped artifacts, not out
  of anybody's judgement.

  The emoji are `emoji-bn.bin` from the iOS app — the same memory-mapped table
  the keyboard searches while you type, word to up to three emoji. Picking them
  by hand got five of seventeen wrong against it (চা is 🍵, not ☕; বই is 📚,
  not 📖) and invented six more for words the keyboard has no emoji for.

  The text candidates come from the engine's own autocorrect, asked the same
  question the keyboard asks: `obadh-autocorrect suggest-fst`. So the pair the
  bar offers for a mistyped word is the pair the keyboard would offer.

  Format of the binary, from scripts/generate-emoji-data.py in obadh-ios:
  a 30-byte header, then one 8-byte record per key holding two offsets into a
  blob of NUL-terminated UTF-8, with the emoji joined by U+001F.
*/
const EMOJI_BIN = '/Users/nsssayom/Dev/obadh-ios/Resources/ObadhModels/emoji/emoji-bn.bin';
const LEXICON = resolve(dirname(BIN), '../../data/autocorrect/models/bn.fst');
const CORRECT = resolve(dirname(BIN), 'obadh-autocorrect');

for (const [what, where] of [
  ['emoji table', EMOJI_BIN],
  ['autocorrect lexicon', LEXICON],
  ['autocorrect binary', CORRECT],
]) {
  if (existsSync(where)) continue;
  console.error(`No ${what} at ${where}.`);
  if (what === 'autocorrect binary') {
    console.error('Build it: cd obadh_engine && cargo build --release --features cli --bin obadh-autocorrect');
  }
  process.exit(2);
}

const EMOJI = (() => {
  const raw = readFileSync(EMOJI_BIN);
  const count = raw.readUInt32LE(14);
  const keysAt = raw.readUInt32LE(18);
  const blobAt = raw.readUInt32LE(22);
  const str = (offset) => {
    const from = blobAt + offset;
    return raw.toString('utf8', from, raw.indexOf(0, from));
  };
  const map = new Map();
  for (let i = 0; i < count; i++) {
    const at = keysAt + i * 8;
    map.set(str(raw.readUInt32LE(at)), str(raw.readUInt32LE(at + 4)).split('\u001f'));
  }
  return map;
})();

/** The keyboard's own text candidates for a word, best first. */
const candidatesCache = new Map();
async function candidates(word) {
  if (!word) return [];
  if (candidatesCache.has(word)) return candidatesCache.get(word);
  const { stdout } = await run(CORRECT, [
    'suggest-fst',
    '--lexicon',
    LEXICON,
    '--input',
    word,
    '--response-candidates',
    '4',
  ]);
  const list = (JSON.parse(stdout).candidates ?? []).map((c) => c.text);
  candidatesCache.set(word, list);
  return list;
}

const compose = async (text) => (await run(BIN, [text])).stdout.replace(/\n$/, '');

/** The field after a tap that replaces the word being composed. */
const replaceLastWord = (text, wth) => text.slice(0, text.lastIndexOf(' ') + 1) + wth;

/*
  Punctuation, which the engine composes along with everything else: a plain
  full stop becomes a দাঁড়ি, digits become ০–৯, and the rest passes through.

  Neither the emoji table nor the autocorrect lexicon has a key ending in a
  dari, so a word is stripped of what surrounds it before either is asked, and
  the strippings are put back on whatever comes out.
*/
const PUNCT = /^([^\p{L}\p{M}\p{N}]*)(.*?)([^\p{L}\p{M}\p{N}]*)$/u;
const split = (word) => {
  const [, before, core, after] = word.match(PUNCT) ?? [];
  return { before: before ?? '', core: core ?? word, after: after ?? '' };
};
const bare = (word) => split(word).core;

const lines = [];
const warnings = [];

for (const line of LINES) {
  const { roman, fix, emojiWord, note } = line;
  const take = line.take ?? 'auto';
  const words = roman.split(' ');
  const lastRoman = words[words.length - 1];

  /*
    Which word is mistyped, and how.

    A bare string mistypes the last word. An object names the word — the roman
    token as it appears in the line — so the correction can land mid-sentence,
    which is where autocorrect actually happens: you misspell a word, hit
    space, it silently becomes right, and you keep typing.
  */
  let fixAt = -1;
  let wrong;
  if (typeof fix === 'string') {
    fixAt = words.length - 1;
    wrong = fix;
  } else if (fix) {
    const [target, misspelling] = Object.entries(fix)[0];
    const found = words.filter((w) => w === target).length;
    if (found === 0) {
      throw new Error(`"${roman}": fix names "${target}", which is not a word of this line.`);
    }
    if (found > 1) {
      throw new Error(`"${roman}": fix names "${target}", which appears ${found} times — ambiguous.`);
    }
    fixAt = words.indexOf(target);
    wrong = misspelling;
  }
  const fixIsLast = fixAt === words.length - 1;

  /*
    Which word the emoji is for, and which emoji.

    By default the line's last word, so the tap can be shown — tapping an emoji
    replaces the composed word, and mid-sentence that would eat one. Failing
    that, the nearest earlier word the table knows, shown but not taken.
  */
  const banglaWords = [];
  for (const w of words) banglaWords.push(await compose(w));

  const lookup = (word) => {
    const core = bare(word);
    return SKIP.has(core) ? undefined : EMOJI.get(core);
  };

  let emojiAt = -1;
  if (line.emoji !== false && take !== 'word') {
    if (emojiWord) {
      emojiAt = banglaWords.map(bare).lastIndexOf(bare(emojiWord));
      if (emojiAt === -1) {
        throw new Error(`"${roman}": emojiWord ${emojiWord} is not a word of this line.`);
      }
    } else {
      for (let k = words.length - 1; k >= 0; k--) {
        if (!lookup(banglaWords[k])) continue;
        emojiAt = k;
        break;
      }
    }
  }

  let emojiList = emojiAt >= 0 ? lookup(banglaWords[emojiAt]) : undefined;
  if (typeof line.emoji === 'string') {
    // Forcing one is allowed and reported: an emoji the keyboard would not
    // offer is a demo of something that does not happen.
    if (emojiAt === -1) emojiAt = words.length - 1;
    const table = lookup(banglaWords[emojiAt]) ?? [];
    if (!table.includes(line.emoji)) {
      warnings.push(
        `${roman}: forced ${line.emoji} for ${banglaWords[emojiAt]}, which the table answers with ${table.join(' ') || 'nothing'}`,
      );
    }
    emojiList = [line.emoji, ...table.filter((e) => e !== line.emoji)].slice(0, 3);
  }

  /*
    A line that ends in punctuation does not end by taking an emoji. The tap
    replaces the word being composed, and by the time the dari is down the word
    is behind it — so the emoji is shown in the bar and left there, which is
    also what happens on the phone.
  */
  const endsInPunctuation = Boolean(split(words[words.length - 1]).after);
  const emojiIsLast = emojiAt === words.length - 1 && !endsInPunctuation;
  const wantsEmojiTake =
    (take === 'emoji' && !endsInPunctuation) ||
    (take === 'auto' && !fix && emojiIsLast && emojiList);
  if (take === 'emoji' && endsInPunctuation) {
    throw new Error(`"${roman}": take=emoji, but the line ends in punctuation, which commits the word first.`);
  }
  const repeat = line.repeat ?? Boolean(wantsEmojiTake);

  /*
    What actually gets typed, which is not always what the line says.

    With `fix`, the last word is MISTYPED: the demo makes the mistake, the bar
    offers the correction, and the correction is taken. A correction shown
    without the mistake is a picture of a feature rather than the feature.

    With an emoji being taken, the word is typed TWICE, and the second one is
    tapped away into the emoji — so the sentence keeps the word and gains the
    emoji, which is what a person actually does.
  */
  const typedWords = [...words];
  if (fixAt >= 0) {
    const parts = split(words[fixAt]);
    typedWords[fixAt] = parts.before + wrong + parts.after;
  }
  const typedRoman =
    fixAt >= 0
      ? typedWords.join(' ')
      : repeat && emojiAt >= 0
        ? [...words, words[emojiAt]].join(' ')
        : roman;

  /*
    Where the correction lands: on the space after the mistyped word, which is
    the keystroke that commits it. For a line whose last word is the mistyped
    one there is no such space, and it lands on the final keystroke instead.
  */
  const spaceAt = fixAt >= 0 && !fixIsLast ? typedWords.slice(0, fixAt + 1).join(' ').length : -1;

  /*
    One engine call per keystroke.

    Past the correction the line is composed from the RIGHT spelling, because
    that is what is on screen from then on — carrying on from the misspelling
    would un-correct the word as soon as the next letter went down. The two
    spellings are different lengths, so the offset moves by the difference.
  */
  const delta = roman.length - typedRoman.length;
  const steps = [];
  for (let i = 0; i < typedRoman.length; i++) {
    const text =
      spaceAt >= 0 && i > spaceAt
        ? roman.slice(0, i + 1 + delta)
        : typedRoman.slice(0, i + 1);
    steps.push(await compose(text));
  }

  const bangla = steps[steps.length - 1];

  /*
    The bar at every keystroke: the second text candidate the engine's own
    autocorrect returns for the word in progress, and the emoji the keyboard
    has for it. The first slot is always the word as composed, which `steps`
    already carries, so it is not stored again.
  */
  const bar = [];
  for (const step of steps) {
    const composing = step.split(' ').pop() ?? '';
    if (!composing) {
      bar.push(0);
      continue;
    }
    const { core, before, after } = split(composing);
    const found = (await candidates(core)).find((c) => c !== core);
    const alt = found ? before + found + after : undefined;
    const e =
      typeof line.emoji === 'string' && core === bare(banglaWords[emojiAt] ?? '')
        ? emojiList
        : lookup(composing);
    if (!alt && !e) {
      bar.push(0);
      continue;
    }
    bar.push({ ...(alt ? { c: alt } : {}), ...(e ? { e: e.slice(0, 3) } : {}) });
  }

  const finalStep = steps.length - 1;
  let suggest;

  if (fixAt >= 0 && take !== 'none') {
    // Typing punctuation is what commits an autocorrection on the phone, so a
    // line that ends in one still ends by taking the word — with the
    // punctuation kept on the end of it.
    const correct = await compose(words[fixAt]);
    if (correct === (await compose(typedWords[fixAt]))) {
      throw new Error(`"${roman}": fix=${wrong} composes the right word already.`);
    }
    const at = fixIsLast ? finalStep : spaceAt;
    const after = fixIsLast
      ? replaceLastWord(bangla, correct)
      : await compose(roman.slice(0, at + 1 + delta));
    suggest = { at, take: correct, kind: 'word', after };
  } else if (wantsEmojiTake && take !== 'none' && emojiList) {
    suggest = {
      at: finalStep,
      take: emojiList[0],
      kind: 'emoji',
      after: replaceLastWord(bangla, emojiList[0]),
    };
  }

  lines.push({ roman: typedRoman, bangla, steps, bar, ...(suggest ? { suggest } : {}) });
  console.log(
    `${typedRoman.padEnd(40)} ${bangla}` +
      (suggest ? `   ·take ${suggest.take}` : emojiList ? `   ·show ${emojiList.join('')}` : ''),
  );
}

if (warnings.length) {
  console.log(`\n  ${warnings.length} forced emoji:\n    ${warnings.join('\n    ')}`);
}

const file = `/*
  Generated by scripts/hero-lines.mjs. Do not edit by hand.

  Every string below is the engine's own output for that many keystrokes of the
  roman above it, so the hero animation is the keyboard's behaviour rather than
  a drawing of it. Re-run the script after an engine bump.
*/

export interface HeroLine {
  /** What is typed. */
  roman: string;
  /** What it composes, in full. */
  bangla: string;
  /** The Bangla after each keystroke; \`steps[i]\` pairs with \`roman.slice(0, i + 1)\`. */
  steps: string[];
  /**
   * The suggestion bar at each keystroke, or 0 where it has nothing to offer.
   *
   * The bar's first slot is always the word as composed, which \`steps\` already
   * carries, so it is not repeated here. \`c\` is the second text candidate —
   * the correction the engine's autocorrect returns — and \`e\` is up to three
   * emoji from the keyboard's own table, which share the third slot.
   */
  bar: ({ c?: string; e?: string[] } | 0)[];
  /**
   * The one tap in the line, at keystroke \`at\` — which is the last one when
   * an emoji is taken, and the space that commits the word when a correction
   * is. \`take\` is the word or emoji itself, so the slot holding it can be
   * flashed, and \`after\` is the whole field the moment it lands.
   */
  suggest?: { at: number; take: string; kind: 'word' | 'emoji'; after: string };
}

export const HERO_LINES: HeroLine[] = ${JSON.stringify(lines, null, 2)};
`;

await writeFile(join(ROOT, 'src/data/hero-lines.ts'), file);

/*
  The same data as a file the page fetches. Inlined it is 120 KB of JSON in the
  markup of the home page, which is more than the rest of the page put together
  and cannot be cached between visits. The component server-renders the first
  line from the module above — so the hero is complete before any script runs —
  and picks the rest up from here.
*/
await writeFile(join(ROOT, 'public/hero-lines.json'), JSON.stringify(lines));
const kb = (Buffer.byteLength(file) / 1024).toFixed(1);
const strips = lines.filter((l) => l.suggest).length;
console.log(
  `\nsrc/data/hero-lines.ts  ${lines.length} lines, ${kb} KB` +
    `\n  ${strips} end by taking a suggestion ` +
    `(${lines.filter((l) => l.suggest?.kind === 'emoji').length} an emoji, ` +
    `${lines.filter((l) => l.suggest?.kind === 'word').length} a correction)`,
);
