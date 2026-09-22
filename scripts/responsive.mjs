#!/usr/bin/env node
/**
 * Every page, at every width a phone or a laptop is likely to be.
 *
 *   npm run build && node scripts/responsive.mjs
 *
 * Three things, all measured on the rendered page rather than read off the CSS:
 *
 *   1. the document does not scroll sideways
 *   2. nothing escapes its frame, and the element that does is named
 *   3. every control is at least 24px, the WCAG 2.2 minimum target
 *
 * smoke.mjs checks two narrow widths for sideways scroll. This is the wide net:
 * it caught the hero drawing overflowing its own box on a phone, three emoji
 * spilling out of a 116px suggestion slot, and 129 row links sitting at 21px.
 */
import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';
import { serve, findExecutable } from './browser.mjs';

/* Bangla can be switched off as a whole (PUBLISHED_LOCALES in src/config.ts).
   While it is, there are no /bn/ pages to measure. */
const bangla = existsSync(new URL('../dist/bn/index.html', import.meta.url));

const ROUTES = [
  '/',
  '/download/',
  '/thanks/',
  '/developers/',
  '/guide/',
  '/about/',
  '/faq/',
  '/contribute/',
  '/privacy/',
  '/404.html',
  ...(bangla ? ['/bn/', '/bn/download/', '/bn/developers/', '/bn/guide/', '/bn/about/'] : []),
];

// Real device widths, plus the two ends that break layouts.
const WIDTHS = [320, 360, 390, 414, 600, 768, 834, 1024, 1280, 1440, 1920];

const { origin, close } = await serve();
const browser = await chromium.launch({ executablePath: findExecutable() });
const problems = [];
let checked = 0;

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    hasTouch: width < 900,
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    await page.goto(origin + route, { waitUntil: 'networkidle' });
    // Scroll through once so every reveal has fired before anything is measured.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(160);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(120);

    const found = await page.evaluate((w) => {
      const doc = document.documentElement;
      const sideways = doc.scrollWidth - doc.clientWidth;

      /*
        Anything past the right edge, unless something above it already
        contains it. Decorative art is deliberately bigger than its frame, and
        an overflow that is scrolled or clipped cannot move the page, so those
        are not problems. An element with nothing holding it in is.
      */
      const contained = (el) => {
        for (let n = el.parentElement; n; n = n.parentElement) {
          const ox = getComputedStyle(n).overflowX;
          if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return true;
        }
        return false;
      };

      const over = [];
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const past = Math.round(r.right - w);
        if (past <= 1 || contained(el)) continue;
        const cls = (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 44);
        over.push({ name: `${el.tagName.toLowerCase()}.${cls}`, past });
      }
      over.sort((a, b) => b.past - a.past);

      // A link inside a sentence is exempt from the target rule; a link that
      // stands on its own as a row is not.
      const small = [];
      for (const el of document.querySelectorAll('a[href], button, summary, input, [role="button"]')) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const inProse = el.closest('p, li, figcaption, dd, .prose');
        if (inProse && cs.display.includes('inline')) continue;
        if (r.height >= 24 && r.width >= 24) continue;
        small.push({
          text: (el.textContent ?? '').trim().slice(0, 22),
          size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        });
      }

      return { sideways, over: over.slice(0, 3), small: small.slice(0, 3) };
    }, width);

    checked += 1;
    if (found.sideways > 1) {
      problems.push({ width, route, kind: 'scrolls sideways', detail: `${found.sideways}px` });
    }
    for (const o of found.over) {
      problems.push({ width, route, kind: 'escapes its frame', detail: `${o.name} +${o.past}px` });
    }
    for (const t of found.small) {
      problems.push({ width, route, kind: 'target under 24px', detail: `"${t.text}" ${t.size}` });
    }
  }

  await context.close();
}

await browser.close();
close();

console.log(`${checked} page and width combinations (${bangla ? 'English and Bangla' : 'English only'})`);
if (!problems.length) {
  console.log('\nall good');
  process.exit(0);
}

const byKind = new Map();
for (const p of problems) byKind.set(p.kind, (byKind.get(p.kind) ?? 0) + 1);
console.log([...byKind].map(([kind, n]) => `${n} ${kind}`).join(', '), '\n');
for (const p of problems.slice(0, 40)) {
  console.log(`  ${String(p.width).padStart(4)}px  ${p.route.padEnd(18)} ${p.kind}: ${p.detail}`);
}
if (problems.length > 40) console.log(`  ... and ${problems.length - 40} more`);
process.exit(1);
