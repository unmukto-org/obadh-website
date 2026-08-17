#!/usr/bin/env node
/**
 * Builds the social cards into public/og/.
 *
 * Rendered in Chrome rather than by an SVG-to-PNG library, because Bengali
 * conjuncts need real shaping and a library that fakes it would ship ভালোবাসা
 * as a row of broken parts to every chat window that unfurls a link.
 *
 * Every Roman/Bangla pair below was produced by the engine itself:
 *   /Users/nsssayom/Dev/obadh_engine/target/release/obadh 'ami banglay gan gai'
 * Never add a pair that has not been through it. The deterministic core is
 * strict, and the obvious spelling is usually the wrong one: `bhalobasa` gives
 * ভালবাসা, not ভালোবাসা. A keyboard has autocorrect; an image does not.
 *
 *   node scripts/og.mjs
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { findExecutable } from './browser.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = join(ROOT, 'public/fonts');
const OUT = join(ROOT, 'public/og');

const SITE = 'obadh.unmukto.org';

const CARDS = [
  { name: 'default', roman: 'ami banglay gan gai', bangla: 'আমি বাংলায় গান গাই' },
  { name: 'download', roman: 'obadhe bangla likhun', bangla: 'অবাধে বাংলা লিখুন' },
  { name: 'guide', roman: 'rrkSh', bangla: 'র্ক্ষ', second: { roman: 'NGj', bangla: 'ঞ্জ' } },
  { name: 'about', tagline: true },
  { name: 'faq', roman: 'aji e probhate robir kor', bangla: 'আজি এ প্রভাতে রবির কর' },
  { name: 'contribute', roman: 'bhalObasa', bangla: 'ভালোবাসা' },
  // The most private sentence a person types, on the page that explains it
  // never leaves the phone.
  { name: 'privacy', roman: 'ami tOmay bhalObasi', bangla: 'আমি তোমায় ভালোবাসি' },
];

const MARK_PATH =
  'M 210.02 6.36 C 212.37 6.53 220.29 6.60 223.23 7.77 C 226.17 8.93 226.71 11.16 227.66 13.34 C 228.60 15.53 234.15 8.10 228.89 20.89 C 223.63 33.68 201.92 76.09 196.11 90.11 C 190.30 104.13 194.37 88.20 194.02 105.02 C 193.66 121.83 194.54 175.38 193.98 190.98 C 193.42 206.59 192.04 196.71 190.66 198.66 C 189.27 200.60 187.91 201.78 185.66 202.66 C 183.40 203.53 179.84 204.38 177.11 203.89 C 174.38 203.41 171.83 204.34 169.25 199.75 C 166.67 195.16 166.05 182.78 161.66 176.34 C 157.26 169.90 146.54 163.54 142.89 161.11 C 139.24 158.68 141.49 160.19 139.77 161.77 C 138.04 163.34 135.25 168.09 132.56 170.56 C 129.88 173.04 128.10 174.40 123.66 176.63 C 119.21 178.85 113.32 182.85 105.89 183.89 C 98.47 184.93 86.36 184.10 79.11 182.89 C 71.85 181.68 68.08 179.75 62.36 176.64 C 56.64 173.53 49.93 169.07 44.77 164.23 C 39.60 159.40 36.08 155.42 31.34 147.66 C 26.61 139.89 19.53 125.27 16.34 117.66 C 13.16 110.04 12.05 105.85 12.22 101.97 C 12.39 98.09 14.20 96.52 17.34 94.38 C 20.49 92.23 27.90 89.94 31.09 89.13 C 34.29 88.31 35.68 88.16 36.53 89.47 C 37.39 90.78 35.86 95.32 36.22 96.97 C 36.57 98.61 37.78 96.75 38.66 99.34 C 39.53 101.94 39.17 106.67 41.47 112.53 C 43.77 118.40 47.49 128.01 52.47 134.53 C 57.45 141.05 65.72 147.78 71.33 151.67 C 76.93 155.57 81.52 156.85 86.11 157.89 C 90.70 158.93 94.20 159.17 98.89 157.89 C 103.58 156.61 110.44 153.61 114.23 150.23 C 118.03 146.86 120.21 142.01 121.66 137.66 C 123.10 133.30 123.73 128.99 122.89 124.11 C 122.05 119.23 118.97 111.69 116.64 108.36 C 114.31 105.03 111.37 104.71 108.89 104.11 C 106.41 103.51 103.41 103.78 101.77 104.77 C 100.12 105.75 99.01 107.44 99.03 110.00 C 99.05 112.56 101.46 117.00 101.89 120.11 C 102.33 123.22 102.68 126.39 101.64 128.64 C 100.60 130.90 98.23 132.43 95.64 133.64 C 93.05 134.85 89.14 135.87 86.09 135.88 C 83.04 135.88 80.14 135.53 77.34 133.66 C 74.55 131.79 71.05 129.58 69.34 124.66 C 67.64 119.73 66.71 109.42 67.11 104.11 C 67.51 98.79 68.72 96.56 71.77 92.77 C 74.81 88.97 80.78 83.91 85.36 81.36 C 89.94 78.81 93.98 77.83 99.23 77.45 C 104.49 77.08 112.32 78.29 116.89 79.11 C 121.46 79.93 122.58 79.75 126.64 82.36 C 130.70 84.97 137.73 90.60 141.23 94.77 C 144.74 98.93 145.88 102.79 147.66 107.34 C 149.43 111.90 151.27 117.23 151.89 122.11 C 152.51 126.99 149.05 132.74 151.36 136.64 C 153.67 140.54 165.75 145.53 165.75 145.53 C 165.75 145.53 165.46 119.92 166.02 110.02 C 166.58 100.11 165.85 96.86 169.11 86.11 C 172.36 75.35 185.55 45.48 185.55 45.48 C 185.55 45.48 155.98 58.47 140.89 62.89 C 125.80 67.31 115.78 70.48 94.98 71.98 C 74.19 73.48 29.61 72.39 16.11 71.89 C 2.61 71.39 15.26 69.71 13.97 69.00 C 12.67 68.29 9.65 69.97 8.34 67.66 C 7.03 65.34 5.87 58.09 6.11 55.11 C 6.35 52.13 7.77 51.27 9.77 49.77 C 11.77 48.27 7.92 46.59 18.11 46.11 C 28.30 45.63 54.61 47.41 70.91 46.88 C 87.20 46.34 101.77 45.59 115.89 42.89 C 130.02 40.19 140.12 36.68 155.66 30.66 C 171.19 24.64 200.05 10.82 209.11 6.77 C 218.17 2.72 207.66 6.19 210.02 6.36 Z';

async function inlineFonts() {
  const css = await readFile(join(FONTS, 'fonts.css'), 'utf8');
  const wanted = new Set([...css.matchAll(/url\(\/fonts\/([\w-]+\.woff2)\)/g)].map((m) => m[1]));
  let out = css;
  for (const file of wanted) {
    const bytes = await readFile(join(FONTS, file));
    out = out.replaceAll(
      `url(/fonts/${file})`,
      `url(data:font/woff2;base64,${bytes.toString('base64')})`,
    );
  }
  return out;
}

const fontCss = await inlineFonts();

function page(card) {
  // Geometry matches the site: Anek's matra is 0.629 em above the baseline,
  // and IBM Plex Mono's ascent is 1.025 em with a 1.29 em box.
  const row = (roman, bangla, scale = 1) => `
    <div class="row" style="--s:${scale}">
      <div class="cell roman">${roman}</div>
      <div class="cell bn" lang="bn">${bangla}</div>
    </div>`;

  /*
    Two pairs go side by side, not one above the other. Stacked, the second
    pair pushed the wordmark off the bottom edge of the 630px canvas, and the
    only way to fit both vertically was to shrink them to the point where the
    conjunct (the whole reason the guide card shows one) stopped reading at
    the 300px an unfurl renders at. Side by side there is room to go larger
    instead: two columns of 372px, inside the 406px this row has.
  */
  const pair = Boolean(card.second);
  const scale = pair ? 1.7 : 1;

  const body = card.tagline
    ? `<div class="tagline" lang="bn">ভাষা হোক <b>আরও</b> উন্মুক্ত</div>`
    : row(card.roman, card.bangla, scale) +
      (pair ? row(card.second.roman, card.second.bangla, scale) : '');

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${fontCss}
    * { margin:0; padding:0; box-sizing:border-box; }
    /* The site's ground and the same faint wash the hero carries, so a card
       unfurled in a chat window looks like the page it links to. */
    body {
      width:1200px; height:630px; background:#061A22; color:#EAF5F4;
      /* One wash, the same one <body> carries on the site. */
      background-image:
        radial-gradient(110% 60% at 50% -10%, rgba(22,80,111,0.38), transparent 70%);
      font-family:'Schibsted Grotesk',sans-serif;
      display:flex; flex-direction:column; justify-content:space-between;
      padding:72px 80px;
    }
    .head { display:flex; align-items:center; gap:18px; }
    .head svg { width:52px; height:52px; display:block; }
    .head span { font-size:30px; font-weight:600; letter-spacing:-0.02em; }
    .body { display:flex; flex-direction:column; gap:44px; }
    .body.pair { flex-direction:row; align-items:flex-start; gap:200px; }
    .row { display:flex; flex-direction:column; gap:16px; }
    .cell { position:relative; width:max-content; max-width:1040px; }
    .roman {
      font-family:'IBM Plex Mono',monospace; font-size:calc(46px*var(--s));
      line-height:1.45; color:#9DB6BB;
    }
    /* The Bangla carries the accent flat, the same way it does in the hero and
       in the typing box. No rail over either run: a stroke at the matra height
       reads as a line struck through the words. */
    .bn {
      font-family:'Anek Bangla',sans-serif; font-size:calc(88px*var(--s));
      line-height:1.5; font-weight:500; letter-spacing:0; padding-block:0.06em;
      color:#3CBFBC;
    }
    .tagline {
      font-family:'Tiro Bangla',serif; font-size:96px; line-height:1.5;
      letter-spacing:0; padding-block:0.06em;
    }
    .tagline b { font-weight:400; color:#3CBFBC; }
    .foot { font-family:'IBM Plex Mono',monospace; font-size:22px; color:#7D959B; }
  </style></head><body>
    <div class="head">
      <svg viewBox="0 0 512 512"><defs>
        <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="209" x2="237" y2="0">
          <stop offset="0" stop-color="#16506f"/><stop offset=".2367" stop-color="#1c7690"/>
          <stop offset=".4996" stop-color="#23899b"/><stop offset=".7309" stop-color="#2aa7ab"/>
          <stop offset="1" stop-color="#3cbfbc"/></linearGradient>
        <clipPath id="c"><rect width="512" height="512" rx="121" ry="121"/></clipPath></defs>
        <g clip-path="url(#c)"><rect width="512" height="512" fill="#1e2124"/>
        <g transform="translate(96,115) scale(1.35)"><path fill="url(#g)" fill-rule="evenodd" d="${MARK_PATH}"/></g></g>
      </svg>
      <span>Obadh</span>
    </div>
    <div class="body${pair ? ' pair' : ''}">${body}</div>
    <div class="foot">${SITE}</div>
  </body></html>`;
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: findExecutable() });
const context = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
const tab = await context.newPage();

let overflowed = 0;

for (const card of CARDS) {
  await tab.setContent(page(card), { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);

  /*
    A card that overruns the canvas still writes a PNG, and the only sign is
    the wordmark sliced by the bottom edge, which is how the two-row guide
    card shipped. Measure the flex column before trusting the screenshot.
  */
  const fit = await tab.evaluate(() => {
    const box = (selector) => document.querySelector(selector).getBoundingClientRect();
    const body = box('.body');
    const foot = box('.foot');
    return {
      body: Math.round(body.height),
      clear: Math.round(foot.top - body.bottom),
      spill: Math.round(foot.bottom - document.body.clientHeight),
    };
  });
  if (fit.clear < 0 || fit.spill > 0) {
    overflowed += 1;
    console.error(
      `${card.name}: body ${fit.body}px overruns the canvas ` +
        `(${fit.clear}px to the wordmark, ${fit.spill}px past the edge)`,
    );
  }

  const file = join(OUT, `${card.name}.png`);
  await tab.screenshot({ path: file });
  const { size } = await import('node:fs').then((fs) => fs.statSync(file));
  console.log(`${card.name}.png  ${(size / 1024).toFixed(0)} KB  body ${fit.body}px`);
}

await browser.close();
process.exit(overflowed === 0 ? 0 : 1);
