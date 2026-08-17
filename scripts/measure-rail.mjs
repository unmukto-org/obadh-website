#!/usr/bin/env node
/**
 * The rail has to land on the matra, not near it. This asks the browser where
 * the matra actually is, rather than trusting the font tables.
 *
 * Canvas reports actualBoundingBoxAscent for a Bangla letter as the distance
 * from the baseline to the top of the headline bar, and fontBoundingBox* as
 * the metrics the line box is built from. Everything else follows.
 *
 *   node scripts/measure-rail.mjs
 */

import { chromium } from 'playwright-core';
import { serve, findExecutable } from './browser.mjs';

const { origin, close } = await serve();

const browser = await chromium.launch({ executablePath: findExecutable() });
const page = await browser.newPage();
await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.fonts.status === 'loaded');

const result = await page.evaluate(() => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  function metrics(font, sample) {
    ctx.font = font;
    const m = ctx.measureText(sample);
    return {
      inkAscent: m.actualBoundingBoxAscent,
      inkDescent: m.actualBoundingBoxDescent,
      fontAscent: m.fontBoundingBoxAscent,
      fontDescent: m.fontBoundingBoxDescent,
    };
  }

  const SIZE = 100;
  const anek = metrics(`500 ${SIZE}px "Anek Bangla"`, 'ম');
  const anekTall = metrics(`500 ${SIZE}px "Anek Bangla"`, 'কঁৃ');
  const tiro = metrics(`400 ${SIZE}px "Tiro Bangla"`, 'ম');
  const mono = metrics(`400 ${SIZE}px "IBM Plex Mono"`, 'x');
  const latin = metrics(`600 ${SIZE}px "Schibsted Grotesk"`, 'H');

  // Thickness of the matra bar: ম's ink top minus the ink top of a form whose
  // headline is the same but which has nothing under it is not measurable, so
  // take the bar height off the difference between ম and the ্ mark-free ব.
  const report = { unitsPerHundred: SIZE, anek, anekTall, tiro, mono, latin };

  // Where the components actually put their rails, measured on the page.
  const rows = [];
  for (const cell of document.querySelectorAll('.xform__bn, .composer__bn')) {
    const style = getComputedStyle(cell);
    const before = getComputedStyle(cell, '::before');
    const box = cell.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(cell);
    const ink = range.getBoundingClientRect();
    rows.push({
      selector: cell.className,
      fontSize: parseFloat(style.fontSize),
      lineHeight: style.lineHeight,
      boxTop: box.top,
      inkTop: ink.top,
      railTop: box.top + parseFloat(before.top || '0'),
      railDelta: box.top + parseFloat(before.top || '0') - ink.top,
    });
  }
  report.rows = rows;
  return report;
});

console.log(JSON.stringify(result, null, 2));

await browser.close();
close();
