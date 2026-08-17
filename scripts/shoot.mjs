#!/usr/bin/env node
/**
 * Screenshots pages out of dist/ for eyeballing and for the checks in the art
 * direction: rail alignment, Bangla clipping, both themes.
 *
 *   node scripts/shoot.mjs [path ...]           full-page, light and dark
 *   node scripts/shoot.mjs --clip=.composer /   one element
 */

import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, '.shots');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function findExecutable() {
  const cache = join(process.env.HOME, 'Library/Caches/ms-playwright');
  for (const dir of ['chromium-1229', 'chromium-1228', 'chromium-1148']) {
    const path = join(cache, dir, 'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium');
    if (existsSync(path)) return path;
  }
  return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}

const args = process.argv.slice(2);
const clip = args.find((a) => a.startsWith('--clip='))?.slice('--clip='.length);
const width = Number(args.find((a) => a.startsWith('--width='))?.slice('--width='.length) ?? 1280);
const paths = args.filter((a) => !a.startsWith('--'));
const targets = paths.length ? paths : ['/'];

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = join(DIST, path);
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});

await new Promise((r) => server.listen(0, r));
const origin = `http://127.0.0.1:${server.address().port}`;

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: findExecutable() });

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: theme,
  });
  const page = await context.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') console.error(`  console: ${m.text()}`);
  });
  page.on('pageerror', (e) => console.error(`  pageerror: ${e.message}`));

  for (const target of targets) {
    const url = `${origin}${target.endsWith('/') || target.includes('.') ? target : `${target}/`}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2400);
    // A full-page capture is stitched from scrolled frames, so smooth
    // scrolling and any in-flight animation show up as duplicated bands.
    await page.addStyleTag({
      content: 'html{scroll-behavior:auto!important}*{animation:none!important;transition:none!important}',
    });
    // The scroll reveal is a real behaviour, but a stitched full-page capture
    // is not a scroll, so the blocks are settled by hand before shooting.
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('[data-reveal]')) el.classList.add('is-visible');
    });
    // Walk the page once so lazy images decode before the capture.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    const slug = (target === '/' ? 'home' : target.replaceAll('/', '-').replace(/^-|-$/g, '')) || 'home';
    const name = join(OUT, `${slug}-${theme}${clip ? '-clip' : ''}.png`);
    const locator = clip ? page.locator(clip).first() : null;
    if (locator) await locator.screenshot({ path: name });
    else await page.screenshot({ path: name, fullPage: true });
    console.log(name);
  }

  await context.close();
}

await browser.close();
server.close();
