#!/usr/bin/env node
/**
 * Drives /download/ as each platform and checks it hands back the right panel.
 *
 * The user agents are real strings, not invented ones. The iPad pair matters
 * most: modern iPadOS asks for the desktop site and so arrives with a Mac's
 * user agent, and the only thing separating the two is maxTouchPoints.
 *
 *   npm run build && node scripts/platforms.mjs
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].find(existsSync);

const PORT = 4333;
const origin = `http://localhost:${PORT}`;

/** What the download button should say on each platform. */
const CTA = {
  mac: 'Download for Mac',
  iphone: 'Download for iPhone',
  ipad: 'Download for iPad',
};

const CASES = [
  {
    name: 'macOS Safari',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15',
    touch: 0,
    panel: 'mac',
    qr: true,
  },
  {
    name: 'iPhone Safari',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1',
    touch: 5,
    panel: 'ios',
    qr: false,
  },
  {
    name: 'iPad, desktop user agent',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15',
    touch: 5,
    panel: 'ios',
    qr: false,
  },
  {
    name: 'iPad, mobile user agent',
    ua: 'Mozilla/5.0 (iPad; CPU OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1',
    touch: 5,
    panel: 'ios',
    qr: false,
  },
  {
    name: 'Windows Chrome',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    touch: 0,
    panel: 'soon',
    qr: true,
  },
  {
    name: 'Linux Firefox',
    ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
    touch: 0,
    panel: 'soon',
    qr: true,
  },
  {
    name: 'Android Chrome',
    ua: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
    touch: 5,
    panel: 'soon',
    qr: false,
  },
  {
    name: 'ChromeOS',
    ua: 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    touch: 0,
    panel: 'soon',
    qr: true,
  },
  {
    name: 'something else entirely',
    ua: 'Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
    touch: 0,
    panel: 'unknown',
    qr: false,
  },
];

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 4000));

const browser = await chromium.launch({ executablePath: CHROME });
let failed = 0;

const check = (label, ok, detail = '') => {
  if (!ok) failed++;
  console.log(`  ${ok ? '✓' : '✗'} ${label}${detail ? `  ${detail}` : ''}`);
};

for (const route of ['/download/', '/bn/download/']) {
  console.log(`\n${route}`);

  for (const testCase of CASES) {
    const context = await browser.newContext({ userAgent: testCase.ua });
    await context.addInitScript(`
      // Playwright will not set maxTouchPoints from hasTouch, and it is the
      // only thing that tells an iPad from a Mac.
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => ${testCase.touch} });

      // Overriding the user agent leaves navigator.userAgentData describing a
      // browser nobody is using — Playwright reports "Windows" for any user
      // agent it cannot parse, which is not a thing a real browser does. Taking
      // it away leaves a coherent fixture and exercises the fallback path.
      delete Navigator.prototype.userAgentData;
    `);

    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(origin + route, { waitUntil: 'networkidle' });

    const state = await page.evaluate(() => {
      const shown = [...document.querySelectorAll('[data-panel]')].filter((el) => !el.hidden);
      const qr = [...document.querySelectorAll('[data-qr]')].filter((el) => !el.hidden);
      return {
        panels: shown.map((el) => el.dataset.panel),
        heading: shown[0]?.querySelector('h2')?.textContent?.trim() ?? '',
        qr: qr.length > 0,
      };
    });

    const one = state.panels.length === 1 && state.panels[0] === testCase.panel;
    check(
      `${testCase.name} → ${testCase.panel}`,
      one && state.qr === testCase.qr && errors.length === 0,
      one ? (state.qr === testCase.qr ? state.heading : `qr ${state.qr}`) : state.panels.join(','),
    );

    // Nothing may be left saying {platform}.
    if (testCase.panel === 'soon') {
      const raw = await page.evaluate(
        () => document.querySelector('[data-panel="soon"]')?.textContent ?? '',
      );
      check('    the platform name is filled in', !raw.includes('{platform}'));
    }

    await context.close();
  }
}

// --- and with the script off ---------------------------------------------
console.log('\nwithout JavaScript');
const bare = await browser.newContext({ javaScriptEnabled: false });
const page = await bare.newPage();
await page.goto(`${origin}/download/`, { waitUntil: 'domcontentloaded' });
const seen = await page
  .locator('[data-panel]:not([hidden])')
  .evaluateAll((els) => els.map((el) => el.dataset.panel));
check('the fallback panel is the one showing', seen.length === 1 && seen[0] === 'all', seen.join(','));
const buttons = await page.locator('[data-panel="all"] a').count();
check('both platforms are reachable', buttons === 2, String(buttons));
await bare.close();

await browser.close();
server.kill();

console.log(failed ? `\n${failed} failed` : '\nall good');
process.exit(failed ? 1 : 0);
