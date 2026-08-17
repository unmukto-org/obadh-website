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

/*
  A card has one job: someone sees it in a chat window at about 300px wide and
  learns what this is. So every card carries the product line at the foot, the
  page's own promise as the headline, and one engine-verified pair as the
  picture. The pairs are checked against the engine before anything renders,
  because the obvious spelling is usually the wrong one and an image has no
  autocorrect.
*/
/*
  A card has one job: someone sees it in a chat window at about 300px wide and
  learns what this is. So it shows the keyboard.

  It used to show a Roman/Bangla pair, which explained the input scheme to
  people who already knew it and told everyone else nothing. The device says
  "Bangla keyboard" without a word of explanation, and the line in its field
  changes per page so the cards are not eight copies of one picture.

  Every Bangla line here came out of the engine. Never add one that has not.
*/
const PRODUCT = {
  en: 'A modern Bangla keyboard for every platform',
  bn: 'সব প্ল্যাটফর্মের জন্য আধুনিক বাংলা কিবোর্ড',
};

const CARDS = [
  {
    name: 'default',
    en: { title: 'Native Bangla typing, everywhere' },
    bn: { title: 'সব যন্ত্রে চেনা বাংলা লেখা' },
    roman: 'ami banglay gan gai',
    bangla: 'আমি বাংলায় গান গাই',
    bar: ['গান', 'গাান'],
  },
  {
    name: 'download',
    en: { title: 'Native on iPhone, iPad and Mac' },
    bn: { title: 'আইফোন, আইপ্যাড আর ম্যাকে নেটিভ' },
    roman: 'obadhe bangla likhun',
    bangla: 'অবাধে বাংলা লিখুন',
    bar: ['লিখুন', 'লিখুণ'],
  },
  {
    name: 'guide',
    en: { title: 'Every rule, in one place' },
    bn: { title: 'সব নিয়ম এক জায়গায়' },
    roman: 'rrkSh theke NGj',
    bangla: 'র্ক্ষ থেকে ঞ্জ',
    bar: ['ঞ্জ', 'নজ'],
  },
  {
    name: 'about',
    en: { title: 'Where Obadh came from' },
    bn: { title: 'অবাধ এল কোথা থেকে' },
    tagline: true,
  },
  {
    name: 'faq',
    en: { title: 'Questions, answered' },
    bn: { title: 'প্রশ্ন, আর উত্তর' },
    roman: 'aji e probhate robir kor',
    bangla: 'আজি এ প্রভাতে রবির কর',
    bar: ['রবির', 'রবীর'],
  },
  {
    name: 'contribute',
    en: { title: 'Help build it' },
    bn: { title: 'আপনিও হাত লাগান' },
    roman: 'bhalObasa',
    bangla: 'ভালোবাসা',
    bar: ['ভালোবাসা', 'ভালবাসা'],
  },
  {
    // The most private sentence a person types, on the page that explains it
    // never leaves the phone.
    name: 'privacy',
    en: { title: 'Nothing you type leaves your device' },
    bn: { title: 'আপনার লেখা যন্ত্রেই থাকে' },
    roman: 'ami tOmay bhalObasi',
    bangla: 'আমি তোমায় ভালোবাসি',
    bar: ['ভালোবাসি', 'ভালবাসি'],
  },
  {
    name: 'developers',
    en: { title: 'The engine is a library first' },
    bn: { title: 'ইঞ্জিনটি আগে একটি লাইব্রেরি' },
    roman: 'sobar upore manuSh',
    bangla: 'সবার উপরে মানুষ',
    bar: ['মানুষ', 'মানুস'],
  },
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

/* The drawing is a mask, so it ships as a data URI and the colour stays in CSS. */
const alponaUri = `data:image/svg+xml;base64,${(
  await readFile(join(ROOT, 'public/art/alpona.svg'))
).toString('base64')}`;

/* Every pair is put through the engine before a card is drawn. The comment at
   the top of this file used to ask a human to do this; asking the engine is
   cheaper and cannot be forgotten. */
const engine = process.env.OBADH_BIN ?? '/Users/nsssayom/Dev/obadh_engine/target/release/obadh';
async function verifyPairs() {
  const { execFile } = await import('node:child_process');
  const { promisify } = await import('node:util');
  const run = promisify(execFile);
  const pairs = [];
  for (const card of CARDS) {
    if (card.roman) pairs.push([card.roman, card.bangla]);
    if (card.second) pairs.push([card.second.roman, card.second.bangla]);
  }
  let wrong = 0;
  for (const [roman, bangla] of pairs) {
    const { stdout } = await run(engine, [roman]);
    const got = stdout.replace(/\n$/, '');
    if (got !== bangla) {
      wrong += 1;
      console.error(`  ✗ ${roman}\n      card   ${bangla}\n      engine ${got}`);
    }
  }
  if (wrong) {
    console.error(`${wrong} pair(s) on the cards disagree with the engine.`);
    process.exit(1);
  }
  console.log(`${pairs.length} pairs verified against the engine\n`);
}

function page(card, locale) {
  const copy = card[locale];
  const bn = locale === 'bn';

  /*
    The keyboard, whole. Drawing two letter rows and stopping made it read as
    a keyboard sliced in half rather than a keyboard simplified, so this is the
    app's own layout: three letter rows with shift and backspace inside the
    third, then the command row. A keyboard missing its bottom row is the one
    thing on a card nobody has to be told is wrong.
  */
  const key = (label, cls = '') => `<span class="key ${cls}">${label}</span>`;
  const letters = (row) => [...row].map((k) => key(k)).join('');
  const keys = [
    `<div class="krow">${letters('qwertyuiop')}</div>`,
    `<div class="krow">${letters('asdfghjkl')}</div>`,
    `<div class="krow">${key('⇧', 'wide')}${letters('zxcvbnm')}${key('⌫', 'wide')}</div>`,
    `<div class="krow">${key('123', 'wide')}${key('☺', 'wide')}${key('', 'space')}${key('↵', 'wide')}</div>`,
  ].join('');

  const device = card.tagline
    ? `<div class="tagline" lang="bn">ভাষা হোক <b>আরও</b> উন্মুক্ত</div>`
    : `<div class="device">
        <div class="field" lang="bn">${card.bangla}<i class="caret"></i></div>
        <div class="bar">
          <span class="cell on" lang="bn">${card.bar[0]}</span>
          <span class="cell" lang="bn">${card.bar[1]}</span>
          <span class="cell emoji">🇧🇩</span>
        </div>
        <div class="keys">${keys}</div>
      </div>`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${fontCss}
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width:1200px; height:630px; background:#061A22; color:#EAF5F4;
      background-image:
        radial-gradient(120% 80% at 8% -25%, rgba(22,80,111,0.44), transparent 68%);
      font-family:'Schibsted Grotesk',sans-serif;
      padding:60px 62px; position:relative; overflow:hidden;
      display:grid; grid-template-columns:1fr 528px; align-items:center; gap:48px;
    }
    /* The alpona, entering from the right the way it enters the hero from the
       left. Texture behind the device, never competing with it. */
    .art {
      position:absolute; inset-block-start:-260px; inset-inline-end:-360px;
      width:760px; height:760px; background-color:#0d2c39;
      -webkit-mask-image:url('${alponaUri}'); mask-image:url('${alponaUri}');
      -webkit-mask-size:contain; mask-size:contain;
      -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat;
    }
    .left { position:relative; display:flex; flex-direction:column; gap:34px; height:100%; justify-content:space-between; }
    .head { display:flex; align-items:center; gap:16px; }
    .head svg { width:46px; height:46px; display:block; }
    .head span { font-size:27px; font-weight:600; letter-spacing:-0.02em; }
    .title {
      font-size:${bn ? 56 : 60}px; font-weight:600; line-height:1.15;
      letter-spacing:-0.025em; max-width:500px;
      ${bn ? "font-family:'Anek Bangla',sans-serif; letter-spacing:0; line-height:1.36;" : ''}
    }
    .product {
      font-size:21px; font-weight:500; color:#C2D6DA; max-width:500px; white-space:nowrap;
      ${bn ? "font-family:'Anek Bangla',sans-serif;" : ''}
    }
    .site { font-family:'IBM Plex Mono',monospace; font-size:19px; color:#7D959B; margin-block-start:10px; }

    /* --- the keyboard ---------------------------------------------------- */
    .stage { position:relative; display:flex; align-items:center; height:100%; }
    .device {
      width:528px; border-radius:24px; border:1px solid #16333f;
      background:#0d2b37; box-shadow:0 40px 90px -30px rgba(0,0,0,0.75);
      overflow:hidden;
    }
    .field {
      padding:22px 24px 20px; background:rgba(0,0,0,0.22);
      font-family:'Anek Bangla',sans-serif; font-size:33px; font-weight:500;
      line-height:1.5; letter-spacing:0; color:#EAF5F4; white-space:nowrap;
    }
    .caret {
      display:inline-block; width:3px; height:0.95em; margin-inline-start:3px;
      vertical-align:-0.14em; background:#3CBFBC;
    }
    .bar { display:grid; grid-template-columns:repeat(3,1fr); border-block:1px solid #16333f; }
    .cell {
      display:grid; place-items:center; padding:13px 8px;
      font-family:'Anek Bangla',sans-serif; font-size:24px; color:#9DB6BB;
      white-space:nowrap;
    }
    .cell + .cell { box-shadow:-1px 0 0 #16333f; }
    .cell.on { color:#EAF5F4; font-weight:600; }
    .cell.emoji { font-family:'Schibsted Grotesk',sans-serif; font-size:30px; }
    .keys { display:grid; gap:7px; padding:14px 11px 18px; }
    .krow { display:flex; justify-content:center; gap:6px; }
    .key {
      flex:1; min-width:0; display:grid; place-items:center; height:36px;
      border-radius:7px; background:rgba(234,245,244,0.12);
      box-shadow:0 1px 0 rgba(0,0,0,0.45);
      font-size:17px; line-height:1; color:rgba(234,245,244,0.85);
    }
    /* The command keys are wider than a letter and sit darker, as they do on
       the system. */
    .key.wide { flex:1.6; background:rgba(234,245,244,0.07); font-size:15px; }
    .key.space { flex:5; }
    .tagline {
      font-family:'Tiro Bangla',serif; font-size:62px; line-height:1.5;
      letter-spacing:0; padding-block:0.06em; text-align:center;
    }
    .tagline b { font-weight:400; color:#3CBFBC; }
  </style></head><body>
    <div class="art"></div>
    <div class="left">
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
      <div class="title"${bn ? ' lang="bn"' : ''}>${copy.title}</div>
      <div>
        <div class="product"${bn ? ' lang="bn"' : ''}>${PRODUCT[locale]}</div>
        <div class="site">${SITE}</div>
      </div>
    </div>
    <div class="stage">${device}</div>
  </body></html>`;
}

await verifyPairs();
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: findExecutable() });
const context = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
const tab = await context.newPage();

let overflowed = 0;

for (const card of CARDS) {
  for (const locale of ['en', 'bn']) {
    await tab.setContent(page(card, locale), { waitUntil: 'load' });
    await tab.evaluate(() => document.fonts.ready);

    /*
      A card that overruns the canvas still writes a PNG, and the only sign is
      the product line sliced by the bottom edge. Measure before trusting the
      screenshot: the middle block has to clear the foot, and nothing may sit
      past the canvas.
    */
    const fit = await tab.evaluate(() => {
      const box = (s) => document.querySelector(s)?.getBoundingClientRect();
      const left = box('.left');
      const art = box('.device') ?? box('.tagline');
      const h = document.body.clientHeight;
      return {
        mid: Math.round(art.height),
        clear: Math.round(h - left.bottom),
        above: Math.round(left.top),
        spill: Math.round(Math.max(art.bottom - h, 0)),
      };
    });
    if (fit.clear < 0 || fit.above < 0 || fit.spill > 0) {
      overflowed += 1;
      console.error(
        `${card.name}.${locale}: ${fit.above}px under the wordmark, ` +
          `${fit.clear}px to the product line, ${fit.spill}px past the edge`,
      );
    }

    const file = join(OUT, `${card.name}${locale === 'bn' ? '-bn' : ''}.png`);
    await tab.screenshot({ path: file });
    const { size } = await import('node:fs').then((fs) => fs.statSync(file));
    console.log(
      `${(card.name + (locale === 'bn' ? '-bn' : '')).padEnd(16)} ` +
        `${(size / 1024).toFixed(0).padStart(3)} KB   clear ${fit.clear}px`,
    );
  }
}

await browser.close();
process.exit(overflowed === 0 ? 0 : 1);
