#!/usr/bin/env node
/**
 * Runs every Roman/Bangla pair on this site back through the engine.
 *
 * The guide is a reference people will type from. A row that is wrong is worse
 * than a row that is missing, so nothing here is trusted to a transcription.
 *
 *   node scripts/verify-scheme.mjs [path/to/obadh]
 *
 * Exits non-zero on the first disagreement. Run it after every engine bump.
 */

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import { SCHEME_ROWS } from '../src/data/scheme.ts';
import { PAIRS } from '../src/data/pairs.ts';

const run = promisify(execFile);

const BIN =
  process.argv[2] ?? '/Users/nsssayom/Dev/obadh_engine/target/release/obadh';

if (!existsSync(BIN)) {
  console.error(`No engine binary at ${BIN}.`);
  console.error('Build it: cd obadh_engine && cargo build --release --features cli --bin obadh');
  process.exit(2);
}

const cases = [
  ...SCHEME_ROWS.map((row) => ({ where: `scheme/${row.group}`, ...row })),
  ...PAIRS.map((pair) => ({ where: pair.where, roman: pair.roman, bangla: pair.bangla })),
];

let failed = 0;

for (const item of cases) {
  const { stdout } = await run(BIN, [item.roman]);
  const got = stdout.replace(/\n$/, '');
  if (got !== item.bangla) {
    failed += 1;
    console.error(`✗ ${item.where}  ${JSON.stringify(item.roman)}`);
    console.error(`    expected ${item.bangla}`);
    console.error(`    engine   ${got}`);
  }
}

console.log(`${cases.length} pairs checked, ${failed} wrong`);
process.exit(failed === 0 ? 0 : 1);
