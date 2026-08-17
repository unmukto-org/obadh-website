#!/usr/bin/env node
/**
 * Checks what a crawler, a chat window and an assistant actually receive.
 *
 *   npm run build && node scripts/verify-seo.mjs
 *
 * Read against the built HTML rather than the source, because every one of
 * these is a claim made to somebody else's machine: a canonical that points at
 * the wrong URL, a card that names an image that was never generated, or a
 * page in the sitemap that asks not to be indexed are all invisible locally
 * and wrong in public.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://obadh.unmukto.org';

if (!existsSync(DIST)) {
  console.error('No dist/. Run: npm run build');
  process.exit(2);
}

let failed = 0;
const fail = (where, message) => {
  failed += 1;
  console.error(`  ✗ ${where}: ${message}`);
};

/** Every built page. */
async function pages(dir = DIST, found = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await pages(full, found);
    else if (entry.name === 'index.html') found.push(full);
  }
  return found;
}

const files = (await pages()).sort();
const attr = (html, re) => html.match(re)?.[1];

// --- per page -------------------------------------------------------------
console.log('open graph and canonical');

const cards = new Set();
let checked = 0;

for (const file of files) {
  const route = '/' + relative(DIST, file).replace(/index\.html$/, '');
  const html = await readFile(file, 'utf8');
  const noindex = /name="robots" content="[^"]*noindex/.test(html);

  const get = (property) =>
    attr(html, new RegExp(`<meta property="${property}" content="([^"]*)"`)) ??
    attr(html, new RegExp(`<meta name="${property}" content="([^"]*)"`));

  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = get('description');

  // Titles and descriptions are what a result listing shows, and both get cut.
  if (!title) fail(route, 'no <title>');
  else if (title.length > 65) fail(route, `title is ${title.length} chars`);
  /* The ceiling matches scripts/audit.mjs. Two checks disagreeing about the
     same number is how a page ends up passing one and failing the other. */
  if (!description) fail(route, 'no description');
  else if (description.length < 70 || description.length > 165) {
    fail(route, `description is ${description.length} chars`);
  }

  // The card. Every field, because a missing width makes some clients refetch
  // and a missing alt is a blank line to anyone using a screen reader.
  for (const property of [
    'og:type',
    'og:site_name',
    'og:locale',
    'og:title',
    'og:description',
    'og:image',
    'og:image:type',
    'og:image:width',
    'og:image:height',
    'og:image:alt',
    'twitter:card',
    'twitter:title',
    'twitter:image',
    'twitter:image:alt',
  ]) {
    if (!get(property)) fail(route, `missing ${property}`);
  }

  const image = get('og:image');
  if (image) {
    if (!image.startsWith('https://')) fail(route, `og:image is not absolute: ${image}`);
    const local = join(DIST, image.replace(SITE, ''));
    if (!existsSync(local)) fail(route, `og:image is missing from the build: ${image}`);
    else {
      cards.add(image);
      const { size } = await stat(local);
      // Some clients drop a card over 5 MB and most warn well before that.
      if (size > 5_000_000) fail(route, `og:image is ${(size / 1e6).toFixed(1)} MB`);
    }
  }
  if (get('twitter:image') !== image) fail(route, 'twitter:image differs from og:image');

  // A card in the wrong language is worse than no card.
  const bangla = route.startsWith('/bn/');
  if (get('og:locale') !== (bangla ? 'bn_BD' : 'en_US')) {
    fail(route, `og:locale is ${get('og:locale')}`);
  }
  if (image && bangla !== image.includes('-bn.png')) {
    fail(route, `${bangla ? 'Bangla page has an English card' : 'English page has a Bangla card'}`);
  }

  // Canonical, and the pair of hreflang links that make the two languages one
  // cluster rather than duplicates of each other.
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  if (noindex) {
    if (canonical) fail(route, 'noindex page still declares a canonical');
  } else {
    if (!canonical) fail(route, 'no canonical');
    else if (canonical !== `${SITE}${route}`) fail(route, `canonical is ${canonical}`);
    for (const lang of ['en', 'bn', 'x-default']) {
      if (!html.includes(`hreflang="${lang}"`)) fail(route, `no hreflang=${lang}`);
    }
  }

  // Structured data has to parse. A broken block is silently ignored by every
  // consumer, which is the same as not having written it.
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    try {
      JSON.parse(json);
    } catch (error) {
      fail(route, `JSON-LD does not parse: ${error.message}`);
    }
  }
  if (!noindex && !html.includes('application/ld+json')) fail(route, 'no structured data');

  checked += 1;
}

console.log(`  ${checked} pages, ${cards.size} distinct cards`);

// --- sitemap and robots ---------------------------------------------------
console.log('\nsitemap and robots');

const sitemap = await readFile(join(DIST, 'sitemap-0.xml'), 'utf8');
const listed = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);

for (const file of files) {
  const route = '/' + relative(DIST, file).replace(/index\.html$/, '');
  const html = await readFile(file, 'utf8');
  const noindex = /name="robots" content="[^"]*noindex/.test(html);
  const inSitemap = listed.includes(`${SITE}${route}`);
  if (noindex && inSitemap) fail(route, 'noindex, yet listed in the sitemap');
  if (!noindex && !inSitemap && !route.includes('404')) fail(route, 'indexable, yet not in the sitemap');
}
console.log(`  ${listed.length} URLs listed`);

const robots = await readFile(join(DIST, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) fail('robots.txt', 'no sitemap line');
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended']) {
  if (!robots.includes(bot)) fail('robots.txt', `${bot} is not named`);
}
if (!existsSync(join(DIST, 'llms.txt'))) fail('llms.txt', 'not in the build');
console.log('  robots.txt and llms.txt present');

console.log(failed ? `\n${failed} problems` : '\nall good');
process.exit(failed ? 1 : 0);
