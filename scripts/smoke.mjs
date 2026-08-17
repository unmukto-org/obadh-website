#!/usr/bin/env node
/**
 * Drives the built site the way a person would, because the three pieces of
 * behavior on it are exactly the three that a static build cannot check.
 *
 *   npm run build && node scripts/smoke.mjs
 */

import { chromium } from 'playwright-core';
import { serve, findExecutable } from './browser.mjs';

const { origin, close } = await serve();
const browser = await chromium.launch({ executablePath: findExecutable() });

const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) console.log(`  ok   ${name}`);
  else {
    console.error(`  FAIL ${name}${detail ? `, ${detail}` : ''}`);
    failures.push(name);
  }
};

const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});

// --- the typing box ------------------------------------------------------
// It lives on the guide page. The home page had one too until the hero grew a
// keyboard that types on its own, which made a second box redundant.
console.log('\ntyping box');
await page.goto(`${origin}/guide/`, { waitUntil: 'networkidle' });

const input = page.locator('#composer-input');
const output = page.locator('[data-output]');

await page.waitForFunction(
  () => document.querySelector('[data-composer]')?.dataset.state === 'ready',
  {
    timeout: 15000,
  },
);
check('the engine loads', true);

await input.click();
await input.fill('');
await input.type('ami banglay likhchi', { delay: 12 });
check(
  'roman composes bangla',
  (await output.textContent()) === 'আমি বাংলায় লিখছি',
  await output.textContent(),
);

// Strict transliteration hands back the original when a rule does not claim a
// character. That is documented behavior and must not look like an error.
// The em dash here is the POINT of the test: it is a character no rule claims,
// and the engine must hand the whole line back untouched. Do not "clean" it.
await input.fill('ami \u2014 tumi');
check('unsupported input passes through', (await output.textContent()) === 'ami \u2014 tumi');

await input.fill('');
check('an empty field empties the output', (await output.textContent()) === '');

// --- the typing box, read rather than seen -------------------------------
// The field used to have no box at all, so its focus indicator had to be
// invented, a rail drawn over the text, which read as a stray line across the
// panel. It is a field now and carries its own ring. And the pair under it used
// to be a live region, so a screen reader was read every intermediate letter,
// including the thirty the script types on its own before anyone has touched
// the page.
console.log('\nthe typing box, read rather than seen');

await page.goto(`${origin}/guide/`, { waitUntil: 'networkidle' });
const ringOf = () =>
  page.evaluate(() => {
    const style = getComputedStyle(document.querySelector('.composer__field'));
    return { shadow: style.boxShadow, border: style.borderTopColor };
  });

const atRest = await ringOf();
check('no focus ring at rest', atRest.shadow === 'none', atRest.shadow);

await input.focus();
await page.waitForTimeout(300);
const focused = await ringOf();
check('focus rings the field', focused.shadow !== 'none' && focused.shadow !== atRest.shadow);
check('and the ring is at least 3px', /(^|\s)3px(\s|$)/.test(focused.shadow), focused.shadow);
check(
  'the ring is on the field, not on the text',
  (await page.evaluate(
    () =>
      document.querySelector('.composer__field').getBoundingClientRect().width -
      document.querySelector('.composer__input').getBoundingClientRect().width,
  )) > 0,
);

const quietLive = await page.evaluate(() => ({
  out: document.querySelector('.composer__out')?.getAttribute('aria-live'),
  settledLive: document.querySelector('[data-settled]')?.getAttribute('aria-live'),
  settledText: document.querySelector('[data-settled]')?.textContent,
}));
check('the visible pair is not a live region', quietLive.out === 'off', quietLive.out ?? 'missing');
check('there is a live region for settled results', quietLive.settledLive === 'polite');
check(
  'the scripted type-out announces nothing',
  quietLive.settledText === '',
  quietLive.settledText,
);

await input.click();
await input.type('ami banglay likhchi', { delay: 12 });
check(
  'nothing is announced while the keys are still coming',
  (await page.evaluate(() => document.querySelector('[data-settled]').textContent)) === '',
);
await page.waitForTimeout(1200);
check(
  'the settled pair is announced once',
  (await page.evaluate(() => document.querySelector('[data-settled]').textContent)) ===
    'আমি বাংলায় লিখছি',
  await page.evaluate(() => document.querySelector('[data-settled]').textContent),
);

// Chrome folds text-transform into the accessible name, and this label is
// uppercased in CSS: without the attribute the site's main control ships as
// TYPE IN ROMAN LETTERS.
const named = await page.evaluate(() => {
  const field = document.querySelector('#composer-input');
  const label = document.querySelector('.composer__label');
  return { aria: field.getAttribute('aria-label'), label: label.textContent.trim() };
});
check(
  'the field is named in the case it was written in',
  named.aria === named.label && named.aria !== named.aria?.toUpperCase(),
  named.aria ?? 'missing',
);

// The theme switch is gone: the site is one light palette now, and there is
// nothing left to toggle. Routing by platform on /download/ replaced it as the
// thing on this site that changes under you, scripts/platforms.mjs covers it.

// --- keyboard ------------------------------------------------------------
console.log('\nkeyboard');
await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
const first = await page.evaluate(() => document.activeElement?.className ?? '');
check('the first stop is the skip link', first.includes('skip-link'), first);

const ring = await page.evaluate(() => {
  const style = getComputedStyle(document.activeElement);
  return `${style.outlineStyle} ${style.outlineWidth}`;
});
check('focus is visible', ring.startsWith('solid') && parseFloat(ring.split(' ')[1]) >= 2, ring);

// --- names in the accessibility tree -------------------------------------
// The home link announced itself twice, once from the mark's aria-label and
// once from the word beside it, and the switcher carried one aria-label with
// two languages in it, an attribute has no lang, so half of it was always
// read in the wrong voice.
console.log('\nnames');
await page.goto(`${origin}/`, { waitUntil: 'domcontentloaded' });

const wordmark = await page
  .locator('.wordmark')
  .first()
  .evaluate((link) => ({
    svg: link.querySelector('svg')?.getAttribute('aria-hidden'),
    labelled: link.querySelector('svg')?.hasAttribute('aria-label'),
    text: link.textContent.trim(),
  }));
check(
  'the mark beside the word does not name itself',
  wordmark.svg === 'true' && !wordmark.labelled,
);
check('the home link is named once', wordmark.text === 'Obadh', wordmark.text);

const switcher = await page
  .locator('.site-header .lang')
  .first()
  .evaluate((link) => ({
    aria: link.getAttribute('aria-label'),
    langs: [...link.querySelectorAll('span')].map((span) => span.getAttribute('lang')).join(','),
    href: link.getAttribute('href'),
  }));
check('the switcher has no two-language aria-label', switcher.aria === null, switcher.aria ?? '');
check('each run of the name carries its own language', switcher.langs === 'en,bn', switcher.langs);

await page.goto(`${origin}/bn/`, { waitUntil: 'domcontentloaded' });
check(
  'and the other way round on a Bangla page',
  (await page
    .locator('.site-header .lang')
    .first()
    .evaluate((link) =>
      [...link.querySelectorAll('span')].map((span) => span.getAttribute('lang')).join(','),
    )) === 'bn,en',
);

const eyebrows = await page.goto(`${origin}/`, { waitUntil: 'domcontentloaded' }).then(() =>
  page
    .locator('.site-footer h2')
    .first()
    .evaluate((h) => ({
      aria: h.getAttribute('aria-label'),
      text: h.textContent.trim(),
      shown: getComputedStyle(h).textTransform,
    })),
);
check(
  'the eyebrow is not uppercased in CSS',
  eyebrows.shown === 'none' && eyebrows.text.length > 0,
  `${eyebrows.shown} / ${eyebrows.text}`,
);

// --- language ------------------------------------------------------------
console.log('\nlanguage');
await page.goto(`${origin}/faq/`, { waitUntil: 'domcontentloaded' });
const target = await page.locator('.site-header .lang').first().getAttribute('href');
check('the switcher stays on the page', target === '/bn/faq/', target ?? 'missing');

// --- the scheme table ----------------------------------------------------
console.log('\nthe scheme table');
await page.goto(`${origin}/guide/`, { waitUntil: 'domcontentloaded' });
const heads = await page
  .locator('.scheme')
  .first()
  .evaluate((table) =>
    [...table.querySelectorAll('th')].map((th) => ({
      aria: th.getAttribute('aria-label'),
      text: th.textContent.trim(),
    })),
  );
check(
  'every column header is named in its own case',
  heads.length === 3 && heads.every((head) => head.aria === head.text),
  JSON.stringify(heads),
);

// --- the mobile sheet ----------------------------------------------------
// Native <details> has no Escape handling, and this one is an overlay.
console.log('\nthe mobile sheet');
const narrow = await browser.newContext({
  viewport: { width: 380, height: 800 },
  hasTouch: true,
  isMobile: true,
});
const small = await narrow.newPage();
await small.goto(`${origin}/guide/`, { waitUntil: 'networkidle' });
const menu = small.locator('.site-menu');
const summary = small.locator('.site-menu__button');

await summary.click();
check('the sheet opens', await menu.evaluate((details) => details.open));
await small.locator('.site-menu__link').first().focus();
await small.keyboard.press('Escape');
check('Escape closes it', !(await menu.evaluate((details) => details.open)));
check(
  'and hands focus back to the button that opened it',
  await summary.evaluate((el) => el === document.activeElement),
);

await summary.click();
await small.mouse.click(10, 400);
check('a press outside closes it', !(await menu.evaluate((details) => details.open)));

// --- reachable with a thumb ----------------------------------------------
// Measured with touch emulation, because the coarse-pointer rules are what
// these depend on. 44px is the floor for a control that is not a word in a
// sentence.
console.log('\nreachable with a thumb');
await summary.click();
const targets = await small.evaluate(() => {
  const wanted = [
    '.wordmark',
    '.site-menu__button',
    '.site-menu .lang',
    '.guide__index a',
    '#composer-input',
  ];
  return wanted.map((selector) => {
    const el = document.querySelector(selector);
    if (!el) return { selector, missing: true };
    const box = el.getBoundingClientRect();
    return { selector, w: Math.round(box.width), h: Math.round(box.height) };
  });
});
for (const target of targets) {
  check(
    `${target.selector} is at least 44px`,
    !target.missing && target.w >= 44 && target.h >= 44,
    target.missing ? 'not on the page' : `${target.w}x${target.h}`,
  );
}

// --- 320px, and 400% zoom, which is the same thing -----------------------
// A grid or flex child holds its content's width unless it is told it may
// shrink. The guide's two columns, the verse specimen and the screenshot
// figures each took the page sideways with them.
console.log('\n320px, and 400% zoom, which is the same thing');
for (const width of [320, 380]) {
  const context = await browser.newContext({ viewport: { width, height: 800 } });
  const narrowPage = await context.newPage();
  for (const route of [
    '/',
    '/guide/',
    '/download/',
    '/about/',
    '/faq/',
    '/contribute/',
    '/privacy/',
    '/404.html',
    '/bn/',
    '/bn/guide/',
    '/bn/download/',
    '/bn/privacy/',
  ]) {
    await narrowPage.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
    const over = await narrowPage.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    check(`${route} does not scroll sideways at ${width}px`, over <= 1, `${over}px over`);
  }
  await context.close();
}
await narrow.close();

// --- no JavaScript -------------------------------------------------------
console.log('\nno javascript');
const quiet = await browser.newContext({ javaScriptEnabled: false });
const still = await quiet.newPage();
await still.goto(`${origin}/`, { waitUntil: 'domcontentloaded' });
/*
  The hero server-renders its first line, so the device is a finished picture
  before any script runs. The line itself is curated in hero-lines.json and
  changes, so what is checked is that Bangla is there, not which Bangla.
*/
const heroText = await still
  .locator('.device__text')
  .first()
  .textContent()
  .then((t) => (t ?? '').trim());
check(
  'the hero renders its first line without scripts',
  /[\u0980-\u09ff]/.test(heroText),
  heroText.slice(0, 40),
);
await quiet.close();

console.log('');
check('no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));

await browser.close();
close();

if (failures.length) {
  console.error(`\n${failures.length} failed`);
  process.exit(1);
}
console.log('\nall clear');
