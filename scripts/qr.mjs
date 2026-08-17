#!/usr/bin/env node
/**
 * The QR on the download page, rendered once into public/ as an SVG.
 *
 * It points at /download/ rather than at a store listing, so that a phone
 * scanning it lands on this page and is handed whatever its own platform
 * actually offers. A QR aimed straight at one store is wrong for half the
 * people who scan it, and goes stale the day a second store exists.
 *
 *   node scripts/qr.mjs
 */
import { writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = (process.env.SITE_URL ?? 'https://obadh.unmukto.org').replace(/\/$/, '');

// One per language, because a Bangla reader scanning from the Bangla page
// should not land in English.
for (const [file, path] of [
  ['public/qr/download-en.svg', '/download/'],
  ['public/qr/download-bn.svg', '/bn/download/'],
]) {
  const target = origin + path;

  const svg = await QRCode.toString(target, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 0,
    color: { dark: '#0f1719', light: '#00000000' },
  });

  // currentColor lets one file sit on any ground the page gives it.
  const themed = svg
    .replace(/fill="#0f1719"/gi, 'fill="currentColor"')
    .replace(/stroke="#0f1719"/gi, 'stroke="currentColor"')
    .replace('<svg', '<svg role="img" aria-hidden="true" focusable="false"');

  await writeFile(join(ROOT, file), themed);
  console.log(`${file} → ${target}  ${(themed.length / 1024).toFixed(1)} KB`);
}
