#!/usr/bin/env node
/**
 * Finds the Roman/Bangla claims buried in prose and runs them through the
 * engine.
 *
 *   node scripts/verify-copy.mjs
 *
 * src/data/pairs.ts covers the pairs a page prints as a pair. This covers the
 * ones a sentence makes in passing ("`kt` gives ক্ত", "`ee` is এএ") which is
 * where a wrong claim hides best, because it reads like prose rather than like
 * a table row. One of those was wrong on the first pass.
 *
 * Only unambiguous shapes are checked: a code span and a Bangla span with
 * nothing but a short connector between them. Anything looser would produce
 * false alarms, and a check people learn to ignore is worse than no check.
 */

import { execFile } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const COPY = join(ROOT, 'src/copy');

const BIN = process.argv[2] ?? '/Users/nsssayom/Dev/obadh_engine/target/release/obadh';
if (!existsSync(BIN)) {
  console.error(`No engine binary at ${BIN}.`);
  process.exit(2);
}

/*
  Only "<code>x</code> <short connector> <span lang=bn>y</span>". No comma and
  no clause boundary is allowed between the two, because a list of pairs
  separated by commas would otherwise match every code span against its
  neighbour's Bangla and report the whole list as wrong. Learned the hard way.
*/
const CONNECTOR =
  '(?: |is|are|gives?|composes?|writes?|becomes?|yields?|you get|→|লিখলে|দিলে|হয়|হলো|মানে|দেয়|পাবেন){0,4}';

const FORWARD = new RegExp(
  `<code>([^<]{1,40})</code>${CONNECTOR}<span lang="bn">([^<]{1,40})</span>`,
  'g',
);

/** Prose words that happen to be in a code span but are not engine input. */
const NOT_INPUT =
  /^(?:URLSession|obadh_engine|obadh-ios|obadh-macos|npm|cargo|git|sudo|brew|\/|~|\.|-{2})/;

const files = [];
for (const dir of await readdir(COPY, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const file of await readdir(join(COPY, dir.name))) {
    if (file.endsWith('.ts')) files.push(join(COPY, dir.name, file));
  }
}

const claims = new Map();

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const where = relative(ROOT, file);

  for (const [, roman, bangla] of source.matchAll(FORWARD)) {
    claims.set(`${roman} ${bangla} ${where}`, { roman, bangla, where });
  }
}

let wrong = 0;
let skipped = 0;

for (const { roman, bangla, where } of claims.values()) {
  if (NOT_INPUT.test(roman)) {
    skipped += 1;
    continue;
  }
  const { stdout } = await run(BIN, [roman]);
  const got = stdout.replace(/\n$/, '');
  if (got === bangla) continue;

  // A claim can be true of a word without being true of the fragment on its
  // own: `t` before `s` composes ৎ, but `ts` alone is ৎস. Report those as
  // worth a human's eye rather than as a failure.
  const partial = got.includes(bangla) || bangla.includes(got);
  wrong += partial ? 0 : 1;
  console[partial ? 'warn' : 'error'](
    `${partial ? '?' : '✗'} ${where}  ${JSON.stringify(roman)}\n` +
      `    claims ${bangla}\n    engine ${got}`,
  );
}

console.log(`${claims.size} prose claims checked, ${skipped} skipped, ${wrong} wrong`);
process.exit(wrong === 0 ? 0 : 1);
