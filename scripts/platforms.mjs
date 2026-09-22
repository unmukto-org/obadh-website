#!/usr/bin/env node
/**
 * Drives the home page as each platform and checks the hero button.
 *
 *   iPhone, iPad  →  the App Store listing
 *   Mac           →  the disk image, and a click that lands on /thanks/
 *   anything else →  "Coming soon for <name>", pointing at /download/
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

const CASES = [
  {
    name: 'macOS Safari',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15',
    touch: 0,
    label: { en: 'Download for Mac', bn: 'ম্যাকের জন্য ডাউনলোড' },
    /* The permanent address, exactly: it resolves to whichever release is
       marked latest, so a versioned file name here would go stale on the
       next release and 404, as the 0.1.0 one did. */
    href: /^https:\/\/github\.com\/unmukto-org\/obadh-macos\/releases\/latest\/download\/Obadh\.dmg$/,
    direct: true,
  },
  {
    name: 'iPhone Safari',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1',
    touch: 5,
    label: { en: 'Download for iPhone', bn: 'আইফোনের জন্য ডাউনলোড' },
    href: /apps\.apple\.com/,
    direct: true,
  },
  {
    name: 'iPad, desktop user agent',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15',
    touch: 5,
    label: { en: 'Download for iPad', bn: 'আইপ্যাডের জন্য ডাউনলোড' },
    href: /apps\.apple\.com/,
    direct: true,
  },
  {
    name: 'iPad, mobile user agent',
    ua: 'Mozilla/5.0 (iPad; CPU OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1',
    touch: 5,
    label: { en: 'Download for iPad', bn: 'আইপ্যাডের জন্য ডাউনলোড' },
    href: /apps\.apple\.com/,
    direct: true,
  },
  {
    name: 'Windows Chrome',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    touch: 0,
    label: { en: 'Coming soon for Windows', bn: 'উইন্ডোজ-এর জন্য আসছে' },
    href: /\/download\/$/,
    direct: false,
  },
  {
    name: 'Linux Firefox',
    ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
    touch: 0,
    label: { en: 'Coming soon for Linux', bn: 'লিনাক্স-এর জন্য আসছে' },
    href: /\/download\/$/,
    direct: false,
  },
  {
    name: 'Android Chrome',
    ua: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
    touch: 5,
    label: { en: 'Coming soon for Android', bn: 'অ্যান্ড্রয়েড-এর জন্য আসছে' },
    href: /\/download\/$/,
    direct: false,
  },
  {
    name: 'ChromeOS',
    ua: 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    touch: 0,
    label: { en: 'Coming soon for ChromeOS', bn: 'ক্রোমওএস-এর জন্য আসছে' },
    href: /\/download\/$/,
    direct: false,
  },
  {
    name: 'something else entirely',
    ua: 'Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
    touch: 0,
    label: { en: 'Coming soon for your device', bn: 'আপনার যন্ত্র-এর জন্য আসছে' },
    href: /\/download\/$/,
    direct: false,
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

/* Bangla can be switched off as a whole (PUBLISHED_LOCALES in src/config.ts),
   and then there is no /bn/ hero to drive. */
const bangla = existsSync(new URL('../dist/bn/index.html', import.meta.url));

for (const [route, locale] of [['/', 'en'], ...(bangla ? [['/bn/', 'bn']] : [])]) {
  console.log(`\n${route}`);

  for (const testCase of CASES) {
    const context = await browser.newContext({ userAgent: testCase.ua });
    await context.addInitScript(`
      // Playwright will not set maxTouchPoints from hasTouch, and it is the
      // only thing that tells an iPad from a Mac.
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => ${testCase.touch} });

      // Overriding the user agent leaves navigator.userAgentData describing a
      // browser nobody is using, Playwright reports "Windows" for any user
      // agent it cannot parse, which is not a thing a real browser does. Taking
      // it away leaves a coherent fixture and exercises the fallback path.
      delete Navigator.prototype.userAgentData;
    `);

    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(origin + route, { waitUntil: 'networkidle' });

    const state = await page.evaluate(() => {
      const el = document.querySelector('[data-platform-cta]');
      if (!el) return null;
      return {
        label: el.querySelector('[data-cta-label]')?.textContent?.trim() ?? '',
        href: el.getAttribute('href') ?? '',
        direct: el.hasAttribute('data-direct'),
        arrow: getComputedStyle(el.querySelector('.cta-arrow')).display !== 'none',
      };
    });

    if (!state) {
      check(`${testCase.name}`, false, 'no hero button on the page');
      await context.close();
      continue;
    }

    const wanted = testCase.label[locale];
    const ok =
      state.label === wanted &&
      testCase.href.test(state.href) &&
      state.direct === testCase.direct &&
      state.arrow === testCase.direct &&
      errors.length === 0;

    check(`${testCase.name} → ${wanted}`, ok, ok ? '' : `${state.label} | ${state.href}`);
    await context.close();
  }
}

// --- the Mac click hands off to /thanks/ ---------------------------------
console.log('\nthe Mac hand-off');
{
  const context = await browser.newContext({ userAgent: CASES[0].ua });
  await context.addInitScript(
    "Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 0 }); delete Navigator.prototype.userAgentData;",
  );
  const page = await context.newPage();
  /*
    The disk image is stubbed, what is under test is the hand-off, not GitHub.
    The Content-Disposition matters: it is what GitHub sends for a release
    asset, and it is why the browser downloads the file instead of navigating
    to it, which is the whole reason the page is still there to redirect.
  */
  await page.route('**/*.dmg', (r) =>
    r.fulfill({
      status: 200,
      headers: { 'content-disposition': 'attachment; filename=Obadh.dmg' },
      body: 'stub',
    }),
  );
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  await page.click('[data-platform-cta]');
  await page.waitForURL('**/thanks/', { timeout: 5000 }).catch(() => {});
  check('a Mac click lands on /thanks/', new URL(page.url()).pathname === '/thanks/', page.url());
  const steps = await page.locator('.step').count();
  check('the steps are there', steps === 4, String(steps));
  const retry = await page.locator('a[href$=".dmg"]').first().getAttribute('href');
  check('/thanks/ offers the same file again', CASES[0].href.test(retry ?? ''), retry ?? 'none');
  await page.goto(`${origin}/download/`, { waitUntil: 'networkidle' });
  const listed = await page.locator('#macos a.btn-primary').getAttribute('href');
  check('/download/ links the same file', CASES[0].href.test(listed ?? ''), listed ?? 'none');
  await context.close();
}

// --- and with the script off ---------------------------------------------
console.log('\nwithout JavaScript');
const bare = await browser.newContext({ javaScriptEnabled: false });
const page = await bare.newPage();
await page.goto(`${origin}/`, { waitUntil: 'domcontentloaded' });
const cta = page.locator('[data-platform-cta]');
check(
  'the hero button falls back to the download page',
  (await cta.getAttribute('href')) === '/download/',
  (await cta.getAttribute('href')) ?? '',
);

await page.goto(`${origin}/download/`, { waitUntil: 'domcontentloaded' });
for (const id of ['ios', 'macos', 'turning-it-on', 'other-platforms', 'build-from-source']) {
  check(`/download/ still has #${id}`, (await page.locator(`#${id}`).count()) === 1);
}
await bare.close();

await browser.close();
server.kill();

console.log(failed ? `\n${failed} failed` : '\nall good');
process.exit(failed ? 1 : 0);
