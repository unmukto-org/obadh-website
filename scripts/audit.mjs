#!/usr/bin/env node
/**
 * Checks the built site for the things that go wrong quietly.
 *
 *   npm run build && node scripts/audit.mjs
 *
 * Every check here exists because it caught something, or because the art
 * direction says it will. Exits non-zero on a failure so it can gate a deploy.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error('No dist/. Run `npm run build` first.');
  process.exit(2);
}

/*
  Whether Bangla was built. It can be switched off as a whole (PUBLISHED_LOCALES
  in src/config.ts), and several rules below only make sense while it is on:
  every page having a Bangla twin, and every page naming an x-default. Read from
  the output rather than the config, so the audit judges what actually shipped.
*/
const bangla = existsSync(join(DIST, 'bn', 'index.html'));

const problems = [];
const fail = (where, message) => problems.push(`${where}: ${message}`);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else out.push(path);
  }
  return out;
}

const files = await walk(DIST);
const pages = files.filter((f) => f.endsWith('.html'));
const assets = new Set(files.map((f) => `/${relative(DIST, f)}`));

/** Every route the build produced, as `/about/` style paths. */
const routes = new Set(
  pages.map((f) => {
    const path = `/${relative(DIST, f)}`.replace(/index\.html$/, '');
    return path === '/' ? '/' : path;
  }),
);

const BENGALI = /[ঀ-৿]/;

/** Fragment targets, collected page by page and checked once at the end. */
const ids = new Map();
const anchors = [];

/** Each page's card and the alt it ships, checked against each other at the end. */
const cards = [];

for (const file of pages) {
  const where = `/${relative(DIST, file)}`;
  const html = await readFile(file, 'utf8');

  // --- head -----------------------------------------------------------
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(where, 'no <title>');
  else if (title.length > 65) fail(where, `<title> is ${title.length} chars`);

  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!description) fail(where, 'no meta description');
  else if (description.length > 165) fail(where, `description is ${description.length} chars`);

  const isNoindex = html.includes('name="robots" content="noindex');

  // The one noindex page is the 404, and it is served at every address that
  // matches no page: /404/ is not a URL here. A canonical or an og:url on it
  // could only name a page that returns 404, which is a claim a crawler acts
  // on without a human reading it first. Every other page states both.
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (isNoindex) {
    if (canonical) fail(where, 'noindex, and still names a canonical');
    if (html.includes('property="og:url"')) fail(where, 'noindex, and still names an og:url');
  } else if (!canonical) {
    fail(where, 'no canonical');
  }

  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (!ogImage) fail(where, 'no og:image');
  else {
    const path = ogImage.replace(/^https?:\/\/[^/]+/, '');
    if (!assets.has(path)) fail(where, `og:image ${path} is not in dist`);
  }

  const ogImageAlt = html.match(/<meta property="og:image:alt" content="([^"]*)"/)?.[1];
  if (!ogImageAlt) fail(where, 'no og:image:alt');

  // x-default names the fallback of a language cluster. With one language
  // published there is no cluster, so there is nothing for it to name.
  if (bangla && !isNoindex && !html.includes('hreflang="x-default"')) {
    fail(where, 'no x-default hreflang');
  }

  if (!html.includes('application/ld+json')) fail(where, 'no structured data');

  // A page must declare its own language before anything else can hang off it.
  const lang = html.match(/<html lang="([^"]*)"/)?.[1];
  if (!lang) fail(where, 'no <html lang>');

  if (ogImage && ogImageAlt) cards.push({ where, lang, image: ogImage, alt: ogImageAlt });

  // --- links ----------------------------------------------------------
  for (const [, href] of html.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)) {
    if (href.startsWith('//')) continue;
    if (assets.has(href) || routes.has(href)) continue;
    if (href.endsWith('/') && routes.has(href)) continue;
    fail(where, `dead internal link ${href}`);
  }

  ids.set(where.replace(/index\.html$/, ''), new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])));
  for (const [, path, fragment] of html.matchAll(/href="(\/[^"#]*)?#([^"]+)"/g)) {
    anchors.push({ from: where, to: (path ?? where.replace(/index\.html$/, '')) || '/', fragment });
  }

  // --- Bangla outside lang="bn" ---------------------------------------
  // Bengali text in a Latin context takes the wrong face, the wrong optical
  // size, and the letter-spacing that breaks the matra. On a Bangla page the
  // <html lang> covers it; on an English page every run needs its own span.
  if (lang !== 'bn') {
    const body = html
      .slice(html.indexOf('<body'))
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '');

    // Walk the tags rather than trying to match pairs with a regex: nesting
    // and attribute order both defeat that, and the false alarms it produced
    // were more work than the check saved.
    const VOID = new Set(['br', 'img', 'input', 'meta', 'link', 'hr', 'source', 'wbr', 'path']);
    const stray = new Set();
    const stack = [];
    let bangla = 0;
    let cursor = 0;

    for (const tag of body.matchAll(/<(\/?)([a-zA-Z0-9-]+)([^>]*)>/g)) {
      if (bangla === 0) {
        for (const [word] of body.slice(cursor, tag.index).matchAll(/\S*[ঀ-৾]\S*/g)) stray.add(word);
      }
      cursor = tag.index + tag[0].length;

      const [, closing, name, attrs] = tag;
      if (VOID.has(name) || attrs.endsWith('/')) continue;

      if (closing) {
        if (stack.pop()) bangla -= 1;
      } else {
        const opens = /\blang=["']?bn/.test(attrs);
        stack.push(opens);
        if (opens) bangla += 1;
      }
    }

    if (stray.size) {
      fail(where, `Bangla outside lang="bn": ${[...stray].slice(0, 6).join(' ')}`);
    }
  }

  // --- accessibility floor --------------------------------------------
  for (const [, tag] of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\balt=/.test(tag)) fail(where, 'an <img> has no alt');
  }
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(where, `${h1s.length} h1 elements`);
}

// --- fragments ---------------------------------------------------------
// The anchor ids are a contract: five pages deep-link into each other's
// sections, and a section that gets renamed takes those links with it.
for (const { from, to, fragment } of anchors) {
  const targets = ids.get(to);
  if (!targets) {
    fail(from, `link to #${fragment} on ${to}, which is not a page here`);
  } else if (!targets.has(fragment)) {
    fail(from, `#${fragment} does not exist on ${to}`);
  }
}

// --- zero-width joiners ------------------------------------------------
// U+200C and U+200D are load-bearing in Bangla: জসীম উদ্‌দীন and পঙ্‌ক্তি are
// different words without them, and the engine's rZy → র‌্য form depends on
// one. Anything that "cleans" the copy on the way through would strip them
// silently, so the build has to say whether they survived.
{
  // Only what the pages actually render. src/data/ holds verified pairs that
  // are not all on the site at once, and a word that is merely available is
  // not a word that got stripped.
  const sources = [...(await walk(join(ROOT, 'src/copy'))), ...(await walk(join(ROOT, 'src/i18n')))];
  const wanted = new Set();
  for (const file of sources.filter((f) => f.endsWith('.ts'))) {
    // Take the word around the joiner, not the source punctuation beside it.
    for (const [match] of (await readFile(file, 'utf8')).matchAll(/[\u0980-\u09FE‌‍]+/g)) {
      if (/[‌‍]/.test(match)) wanted.add(match);
    }
  }
  if (wanted.size) {
    const all = (await Promise.all(pages.map((f) => readFile(f, 'utf8')))).join('');
    for (const word of wanted) {
      if (!all.includes(word)) fail('site', `zero-width joiner stripped from ${word}`);
    }
  }
}

// --- the files that are not pages --------------------------------------
for (const required of ['/robots.txt', '/llms.txt', '/site.webmanifest', '/sitemap-index.xml', '/favicon.svg']) {
  if (!assets.has(required)) fail('site', `missing ${required}`);
}

for (const required of ['/wasm/obadh_engine.js', '/wasm/obadh_engine_bg.wasm']) {
  if (!assets.has(required)) fail('site', `missing ${required}, so the typing box cannot run`);
}

// --- the card and the alt beside it ------------------------------------
// Seven cards are served across fifteen pages, and for a while one alt was
// emitted on all of them, so it described the wrong picture on twelve. In one
// language, a card and its alt travel together: the same image always takes
// the same alt, and the same alt never turns up over a different image.
{
  const altOf = new Map();
  const imageOf = new Map();
  for (const { where, lang, image, alt } of cards) {
    const first = altOf.get(`${lang} ${image}`);
    if (!first) altOf.set(`${lang} ${image}`, { where, alt });
    else if (first.alt !== alt) fail(where, `${image} carries a different alt on ${first.where}`);

    const other = imageOf.get(`${lang} ${alt}`);
    if (!other) imageOf.set(`${lang} ${alt}`, { where, image });
    else if (other.image !== image) {
      fail(where, `serves ${image} under the alt written for ${other.image} on ${other.where}`);
    }
  }
}

// --- both languages, or neither ----------------------------------------
// Only while Bangla is published. It can be switched off as a whole (see
// PUBLISHED_LOCALES in src/config.ts), and then the rule is the opposite one:
// no page may point into /bn/ at all, which verify-seo.mjs enforces.
if (bangla) {
  for (const route of routes) {
    if (route.startsWith('/bn/') || route.includes('404')) continue;
    const bn = route === '/' ? '/bn/' : `/bn${route}`;
    if (!routes.has(bn)) fail('site', `${route} has no Bangla page at ${bn}`);
  }
}

// --- weight ------------------------------------------------------------
/*
  Every page, not just the home page. The guide grew to 185 KB while only the
  home page was being weighed, which is exactly the kind of thing a budget is
  supposed to catch. It is a 176-row reference and will always be the heaviest
  page on the site, so it gets its own allowance rather than a waiver.
*/
const BUDGET = { '/': 120_000, '/guide/': 230_000 };
const DEFAULT_BUDGET = 100_000;

let heaviest = { where: '', size: 0 };

for (const file of pages) {
  const where = relative(DIST, file);
  const { size } = await stat(file);
  if (size > heaviest.size) heaviest = { where, size };

  const route = `/${where.replace(/index\.html$/, '')}`.replace('//', '/').replace(/^\/bn\//, '/');
  const budget = BUDGET[route] ?? DEFAULT_BUDGET;
  if (size > budget) {
    fail(where, `${(size / 1024).toFixed(0)} KB, over its ${(budget / 1024).toFixed(0)} KB budget`);
  }
}

console.log(`heaviest page: ${heaviest.where} at ${(heaviest.size / 1024).toFixed(0)} KB`);

console.log(`${pages.length} pages checked`);
if (problems.length === 0) {
  console.log('clean');
  process.exit(0);
}
for (const problem of problems) console.error(`  ✗ ${problem}`);
console.error(`\n${problems.length} problems`);
process.exit(1);
