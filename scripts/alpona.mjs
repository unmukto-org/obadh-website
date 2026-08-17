#!/usr/bin/env node
/**
 * Prepares the alpona artwork for the site.
 *
 *   node scripts/alpona.mjs <source.svg>   →  public/art/alpona.svg
 *
 * The source is an EPS run through Inkscape: half a megabyte, six hundred
 * paths, a white background, a black frame around it, the designer's mark set
 * as outlines along the bottom, and a palette of magenta and purple that has
 * nothing to do with this site. None of that should reach a browser.
 *
 * The work happens in a real browser rather than over the text, because the
 * file carries a flipping transform from the EPS conversion — every path's
 * position on screen is the product of that matrix, so you cannot tell what is
 * artwork and what is furniture by reading the numbers.
 *
 *   1. Measure every path where it actually lands.
 *   2. Drop the background, the frame, the mark along the bottom, and anything
 *      too small to see.
 *   3. Remap each fill onto the site's palette.
 *   4. Rasterise it.
 *
 * The last step is the surprising one. Kept as vector this is 325 KB, and 113
 * KB even gzipped, for six hundred paths the browser then has to rasterise on
 * every resize. It is a decorative background drawn at under half opacity
 * behind a mask, so vector precision buys nothing at all — a WebP at twice the
 * size it is ever drawn is a fraction of the weight and costs the compositor
 * one texture.
 *
 * Re-run only if the artwork is replaced. The output is committed.
 */
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = process.argv[2];
const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].find(existsSync);

if (!SOURCE || !existsSync(SOURCE)) {
  console.error('Usage: node scripts/alpona.mjs <source.svg>');
  process.exit(2);
}

/*
  The folk palette: vermilion, mustard, jade, indigo, cream, and one deeper red
  so magenta has somewhere to go that is not the same as red.

  Colours are matched by hue rather than by an exact table, because these files
  are traces and their fills come in drifts of near-duplicates — nine greens
  that differ in the last digit, seven whites, four magentas. A lookup table
  would have to list every one of them and would break on the next artwork.
*/
const FOLK = {
  cream: '#f6ead2',
  mustard: '#edae2b',
  jade: '#3fa98a',
  indigo: '#2a5c87',
  rose: '#c0442f',
  vermilion: '#df4b33',
};

/** Hue bands, in degrees, and what each one becomes. */
const BANDS = [
  [40, 70, FOLK.mustard],
  [70, 170, FOLK.jade],
  [170, 260, FOLK.indigo],
  [260, 340, FOLK.rose],
];

function toHsl(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (!d) return { h: 0, s: 0, l };
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    max === r ? ((g - b) / d + (g < b ? 6 : 0)) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: h * 60, s, l };
}

/** What this fill becomes, or null to leave it alone. */
function retune(hex) {
  const { h, s, l } = toHsl(hex);
  // Paper, and the white the drawing uses to separate its shapes.
  if (l > 0.86 && s < 0.35) return FOLK.cream;
  // Ink. Frames and outlines; kept dark so they stay structural.
  if (l < 0.12) return null;
  if (s < 0.15) return null;
  const band = BANDS.find(([from, to]) => h >= from && h < to);
  return band ? band[2] : FOLK.vermilion;
}

/**
 * Rewrites a path's commands as absolute and returns its subpaths.
 *
 * This has to happen before anything is split up. A relative `m` starts from
 * wherever the previous subpath left off, so a subpath lifted out on its own
 * lands at the origin instead of where it belongs — which looks exactly like
 * artwork sitting outside the canvas, and gets thrown away.
 *
 * Only the commands these exports actually use. Anything else throws, and the
 * caller keeps that path whole rather than risk mangling it.
 */
function absolutise(d) {
  const tokens = d.match(/[MmCcLlZz]|-?\d*\.?\d+(?:[eE][-+]?\d+)?/g) ?? [];
  const out = [];
  let current = [];
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let i = 0;
  let command = '';

  const r = (n) => String(Math.round(n * 10) / 10);
  const num = () => Number(tokens[i++]);
  const flush = () => {
    if (current.length) out.push(current.join(' '));
    current = [];
  };

  while (i < tokens.length) {
    if (/[MmCcLlZz]/.test(tokens[i])) command = tokens[i++];

    if (command === 'M' || command === 'm') {
      const nx = num();
      const ny = num();
      x = command === 'm' ? x + nx : nx;
      y = command === 'm' ? y + ny : ny;
      startX = x;
      startY = y;
      flush();
      current.push(`M${r(x)} ${r(y)}`);
      command = command === 'm' ? 'l' : 'L';
      continue;
    }

    if (command === 'C' || command === 'c') {
      const rel = command === 'c';
      const a1 = num() + (rel ? x : 0);
      const b1 = num() + (rel ? y : 0);
      const a2 = num() + (rel ? x : 0);
      const b2 = num() + (rel ? y : 0);
      const nx = num() + (rel ? x : 0);
      const ny = num() + (rel ? y : 0);
      current.push(`C${r(a1)} ${r(b1)} ${r(a2)} ${r(b2)} ${r(nx)} ${r(ny)}`);
      x = nx;
      y = ny;
      continue;
    }

    if (command === 'L' || command === 'l') {
      const rel = command === 'l';
      const nx = num() + (rel ? x : 0);
      const ny = num() + (rel ? y : 0);
      current.push(`L${r(nx)} ${r(ny)}`);
      x = nx;
      y = ny;
      continue;
    }

    if (command === 'Z' || command === 'z') {
      current.push('Z');
      x = startX;
      y = startY;
      continue;
    }

    throw new Error(`unhandled path command ${command}`);
  }

  flush();
  return out;
}

/*
  `--mono` is for the line-art sources: a single ink on paper, with no colour
  separation in them to retune. It changes the output format as well as the
  colour, and both for the same reason.

  Line art is the worst case for a lossy codec — every stroke is a hard edge —
  so the rangoli that costs 47 KB as AVIF costs 120 KB, and 300 KB as WebP.
  As a mask it is a few tens of kilobytes of vector, stays sharp at any size,
  and takes its colour from CSS.

  `--motifs` also writes vector, but coloured: it finds the recurring shapes in
  the drawing and alternates a palette around each ring. See findMotifs below.
*/
const MONO = process.argv.includes('--mono');
const MOTIFS = process.argv.includes('--motifs');

const source = await readFile(SOURCE, 'utf8');
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
await page.setContent(
  `<body style="margin:0"><div id="host" style="width:800px">${source}</div></body>`,
);

/*
  Split every path into its subpaths, so a stray mark that shares a path with
  real artwork can be dropped on its own. Subpaths stay tagged with the path
  they came from and are put back together at the end, because `fill-rule:
  evenodd` only makes a hole where the inner shape shares a path element with
  the outer one — regroup them by anything else and the middle of the drawing
  fills in solid.

  A path whose commands this cannot read is kept whole. That is the safe
  failure: it means no stray mark inside it can be removed, not that the
  artwork is damaged.
*/
const split = (d) => {
  try {
    return absolutise(d);
  } catch {
    return [d];
  }
};

const result = await page.evaluate(({ stripBottom, mono, motifs, split: splitSource, folk }) => {
  const svg = document.querySelector('#host svg');

  // Some of these files carry a fixed pixel size and no viewBox, which pins
  // them at their natural width and defeats every measurement below.
  if (!svg.getAttribute('viewBox')) {
    const w = svg.getAttribute('width');
    const h = svg.getAttribute('height');
    if (w && h) svg.setAttribute('viewBox', `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
  }
  svg.removeAttribute('width');
  svg.removeAttribute('height');

  const frame = svg.getBoundingClientRect();

  /*
    The artwork's own square. These files are sometimes taller than they are
    wide, with the drawing in the top square and a designer's mark in the band
    below it — so the square is anchored at the top rather than centred.
  */
  const side = Math.min(frame.width, frame.height);
  const floor = frame.top + side;

  // Explode each path into its subpaths before anything is measured, keeping
  // a note of which path each one came out of so they can be put back.
  let group = 0;
  for (const el of [...svg.querySelectorAll('path')]) {
    const parts = splitSource[el.getAttribute('d')] ?? [el.getAttribute('d')];
    group += 1;
    if (parts.length < 2) {
      el.setAttribute('data-group', String(group));
      continue;
    }
    for (const d of parts) {
      const clone = el.cloneNode(false);
      clone.setAttribute('d', d);
      clone.setAttribute('data-group', String(group));
      el.before(clone);
    }
    el.remove();
  }

  const paths = [...svg.querySelectorAll('path')];
  const dropped = { furniture: 0, mark: 0, crumb: 0 };
  const unmapped = new Set();
  const report = [];

  for (const el of paths) {
    const box = el.getBoundingClientRect();
    const w = box.width / frame.width;
    const h = box.height / frame.height;
    // Where the top of this path sits down the artwork, 0 to 1.
    const top = (box.top - frame.top) / frame.height;

    const fill = (el.getAttribute('fill') ?? getComputedStyle(el).fill ?? '').toLowerCase();
    const hex = fill.startsWith('rgb')
      ? '#' +
        fill
          .match(/\d+/g)
          .slice(0, 3)
          .map((n) => Number(n).toString(16).padStart(2, '0'))
          .join('')
      : fill;

    // The background and the frame: anything that spans nearly the whole box.
    if (w > 0.92 && h > 0.92) {
      el.remove();
      dropped.furniture += 1;
      continue;
    }
    // Anything below the artwork's own square: a designer's mark, or a stray
    // fragment left by the trace.
    if (box.top > floor - 1) {
      el.remove();
      dropped.mark += 1;
      continue;
    }
    // A mark set along the bottom edge of the artwork itself.
    if (stripBottom && top > 0.88) {
      el.remove();
      dropped.mark += 1;
      continue;
    }
    // Invisible at any size this is drawn.
    if (box.width < 0.6 && box.height < 0.6) {
      el.remove();
      dropped.crumb += 1;
      continue;
    }

    // Recoloured in Node, where the hue maths lives. The original has to come
    // off: two fill attributes on one element is invalid, and the first wins.
    el.removeAttribute('fill');
    el.setAttribute('data-fill', mono ? '#000000' : hex);
    el.removeAttribute('style');
  }

  /*
    Put the subpaths back together.

    This is not tidying, it is correctness: `fill-rule: evenodd` makes a hole
    where an inner subpath sits inside an outer one, and it only sees subpaths
    in the SAME element. Left exploded, every hole in the drawing fills and a
    line-art mandala comes out a solid disc.

    Which grouping is used decides what can be coloured, so there are two.
  */
  const survivors = [...svg.querySelectorAll('path[data-group]')];

  if (!motifs) {
    // One element per original path: the safe regrouping, and the only one
    // that is certainly faithful.
    const groups = new Map();
    for (const el of survivors) {
      const key = el.getAttribute('data-group');
      if (!groups.has(key)) groups.set(key, { first: el, parts: [] });
      groups.get(key).parts.push(el.getAttribute('d'));
      if (groups.get(key).first !== el) el.remove();
    }
    for (const { first, parts } of groups.values()) {
      first.setAttribute('d', parts.join(' '));
      first.removeAttribute('data-group');
    }
  } else {
    /*
      One element per SHAPE, and each shape coloured by where it sits in its
      ring — which is how an alpona is actually coloured: a petal is one
      colour, and its neighbour is another.

      A shape is an outer contour plus the contours nested inside it. Nesting
      is found by asking the browser whether one contour's fill covers a point
      that is genuinely on another, because comparing bounding boxes is quicker
      and wrong — a petal's box encloses a neighbouring dot's box without the
      petal enclosing the dot.

      Shapes are then matched to each other by ARC LENGTH and radius, both of
      which survive rotation. A bounding box does not: the same petal at 22.5
      degrees has a different width and height, which is what splits one ring
      of sixteen into groups of eight, four and two.
    */
    const view = svg.viewBox.baseVal;

    /*
      The drawing's centre, not the canvas's. These files are sometimes taller
      than they are wide — a 1000x1080 box with the artwork in the top square —
      so the viewBox centre sits below the mandala and every wedge cut lands
      off-axis.
    */
    const scale = view.width / frame.width;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const el of survivors) {
      const b = el.getBoundingClientRect();
      minX = Math.min(minX, b.left);
      minY = Math.min(minY, b.top);
      maxX = Math.max(maxX, b.right);
      maxY = Math.max(maxY, b.bottom);
    }
    const cx = view.x + ((minX + maxX) / 2 - frame.left) * scale;
    const cy = view.y + ((minY + maxY) / 2 - frame.top) * scale;

    const shapes = survivors.map((el) => {
      const b = el.getBBox();
      let length = 0;
      try {
        length = el.getTotalLength();
      } catch {
        length = 0;
      }
      const mx = b.x + b.width / 2;
      const my = b.y + b.height / 2;
      return {
        el,
        length,
        area: b.width * b.height,
        radius: Math.hypot(mx - cx, my - cy),
        angle: (Math.atan2(my - cy, mx - cx) * 180) / Math.PI,
        mark: el.getPointAtLength(0),
        parent: -1,
      };
    });

    for (const [i, shape] of shapes.entries()) {
      for (const [j, other] of shapes.entries()) {
        if (i === j || other.area <= shape.area) continue;
        if (!other.el.isPointInFill(shape.mark)) continue;
        if (shape.parent === -1 || other.area < shapes[shape.parent].area) shape.parent = j;
      }
    }

    // Even nesting depth is solid, odd is a hole in whatever contains it.
    const depthOf = (i) => {
      let d = 0;
      let at = shapes[i].parent;
      while (at !== -1) {
        d += 1;
        at = shapes[at].parent;
      }
      return d;
    };
    const rootOf = (i) => {
      let at = i;
      while (depthOf(at) % 2 === 1) at = shapes[at].parent;
      return at;
    };

    const merged = new Map();
    for (const [i, shape] of shapes.entries()) {
      const root = rootOf(i);
      if (!merged.has(root)) merged.set(root, []);
      merged.get(root).push(shape);
      if (root !== i) shape.el.remove();
    }

    /*
      Colour by what each part IS.

      A ring's parts are already separate subpaths in the file — the scalloped
      rim, the plain circle inside it, the curl band, the petals — so they can
      be told apart and coloured individually. Cutting a ring into angular
      wedges instead was the wrong model: it slices through geometry that has
      its own internal structure, so a petal comes out half one colour.

      Three kinds, and the arithmetic tells them apart:

        A plain circle. Centred, and its arc length is pi times its width. This
        is a structural line — the circle inside the outer rim, the one round
        the middle — and it takes a colour of its own.

        A band contour. Centred, but longer than a circle of its width: the
        scalloped rim is 1.33 times, the curl band 5.19. The whole band is one
        stroke, so it is one colour.

        A motif. Off centre, and one of a family that repeats round a ring.
        Those alternate, which is where an alpona's colour actually comes from.
    */
    const roundness = (el, len) => {
      const b = el.getBBox();
      const wide = Math.max(b.width, b.height);
      return wide ? len / (Math.PI * wide) : 0;
    };

    const RINGS = [folk.vermilion, folk.mustard, folk.jade, folk.indigo];
    const PAIRS = [
      [folk.vermilion, folk.mustard],
      [folk.jade, folk.indigo],
      [folk.mustard, folk.rose],
      [folk.indigo, folk.jade],
    ];

    const structural = [];
    const motifs = [];

    for (const [root, parts] of merged.entries()) {
      const el = shapes[root].el;
      el.setAttribute('d', parts.map((part) => part.el.getAttribute('d')).join(' '));
      el.removeAttribute('data-group');

      const b = el.getBBox();
      const centred = shapes[root].radius < Math.max(8, view.width * 0.012);
      const entry = {
        el,
        radius: shapes[root].radius,
        angle: shapes[root].angle,
        length: parts.reduce((sum, part) => sum + part.length, 0),
        reach: Math.hypot(b.width, b.height) / 2,
        round: roundness(el, parts.reduce((sum, part) => sum + part.length, 0)),
      };
      (centred ? structural : motifs).push(entry);
    }

    /*
      A band drawn as one contour is one colour all the way round, which is the
      opposite of how an alpona works. It can be cut, but only where the
      drawing itself has a seam.

      The seams are found from the contour's own outline: walk it, record how
      far out each point sits, and take the outer envelope angle by angle. A
      petal is a hill in that envelope and the junction between two petals is a
      valley. Cutting at the valleys puts every boundary in the dip between two
      petals, so each petal comes out whole.

      This is what the earlier attempt got wrong. It cut at evenly spaced
      angles guessed from an ink histogram, which lands boundaries down the
      middle of petals — the drawing came back with petals half one colour.
    */
    function seamsOf(el) {
      const total = el.getTotalLength();
      if (!total) return [];

      const BINS = 720;
      const envelope = new Array(BINS).fill(0);
      const samples = Math.min(4000, Math.max(1200, Math.round(total / 2)));

      for (let i = 0; i < samples; i++) {
        const pt = el.getPointAtLength((i / samples) * total);
        const dx = pt.x - cx;
        const dy = pt.y - cy;
        let a = (Math.atan2(dy, dx) * 180) / Math.PI;
        if (a < 0) a += 360;
        const bin = Math.min(BINS - 1, Math.floor((a / 360) * BINS));
        envelope[bin] = Math.max(envelope[bin], Math.hypot(dx, dy));
      }

      // Bins the outline never reached are not valleys, they are gaps in the
      // sampling; fill them from their neighbours.
      for (let i = 0; i < BINS; i++) {
        if (envelope[i] > 0) continue;
        let back = i;
        let forward = i;
        while (envelope[(back + BINS) % BINS] === 0) back -= 1;
        while (envelope[forward % BINS] === 0) forward += 1;
        envelope[i] = Math.min(envelope[(back + BINS) % BINS], envelope[forward % BINS]);
      }

      const high = Math.max(...envelope);
      const low = Math.min(...envelope);
      if (high - low < high * 0.04) return []; // A plain ring: no petals, no seams.

      // A valley is a bin lower than everything within a window either side.
      const window = 6;
      const valleys = [];
      for (let i = 0; i < BINS; i++) {
        let lowest = true;
        for (let k = -window; k <= window && lowest; k++) {
          if (k === 0) continue;
          if (envelope[(i + k + BINS) % BINS] < envelope[i]) lowest = false;
        }
        if (lowest) valleys.push(i);
      }

      // Collapse runs of equal-depth bins to one seam each.
      const seams = [];
      for (const v of valleys) {
        const last = seams[seams.length - 1];
        if (last !== undefined && v - last <= window) continue;
        seams.push(v);
      }
      return seams.length >= 6 ? seams.map((bin) => (bin / BINS) * 360) : [];
    }

    const defs =
      svg.querySelector('defs') ??
      svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), svg.firstChild);
    const far = Math.max(view.width, view.height) * 1.6;
    let uid = 0;

    structural.sort((a, b) => b.reach - a.reach);
    for (const [i, part] of structural.entries()) {
      const seams = part.round > 1.06 ? seamsOf(part.el) : [];
      report.push({ radius: Math.round(part.reach), order: seams.length, parts: Number(part.round.toFixed(2)) });

      if (seams.length < 6) {
        // A plain circle, or a band with no seam to cut on.
        part.el.setAttribute('data-fill', RINGS[i % RINGS.length]);
        continue;
      }

      uid += 1;
      const id = `alpona-band-${uid}`;
      const def = part.el.cloneNode(false);
      def.setAttribute('id', id);
      def.removeAttribute('data-fill');
      defs.append(def);

      const pair = PAIRS[i % PAIRS.length];
      for (let k = 0; k < seams.length; k++) {
        const from = (seams[k] * Math.PI) / 180;
        const to = (seams[(k + 1) % seams.length] * Math.PI) / 180 + (k === seams.length - 1 ? Math.PI * 2 : 0);

        const clip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        clip.setAttribute('id', `${id}-s${k}`);
        const wedge = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const sweep = to - from > Math.PI ? 1 : 0;
        wedge.setAttribute(
          'd',
          `M${cx.toFixed(1)} ${cy.toFixed(1)}` +
            `L${(cx + far * Math.cos(from)).toFixed(1)} ${(cy + far * Math.sin(from)).toFixed(1)}` +
            `A${far.toFixed(1)} ${far.toFixed(1)} 0 ${sweep} 1 ` +
            `${(cx + far * Math.cos(to)).toFixed(1)} ${(cy + far * Math.sin(to)).toFixed(1)}Z`,
        );
        clip.append(wedge);
        defs.append(clip);

        const slice = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        slice.setAttribute('href', `#${id}`);
        slice.setAttribute('clip-path', `url(#${id}-s${k})`);
        slice.setAttribute('data-fill', pair[k % 2]);
        part.el.before(slice);
      }
      part.el.remove();
    }

    // Motif families: same arc length, same distance out, whatever the angle.
    const families = [];
    for (const motif of motifs) {
      const found = families.find(
        (f) =>
          Math.abs(f.length - motif.length) / Math.max(f.length, motif.length, 1) < 0.06 &&
          Math.abs(f.radius - motif.radius) < Math.max(10, motif.radius * 0.08),
      );
      if (found) found.members.push(motif);
      else families.push({ length: motif.length, radius: motif.radius, members: [motif] });
    }

    families.sort((a, b) => a.radius - b.radius);
    for (const family of families) {
      report.push({
        kind: 'family',
        count: family.members.length,
        radius: Math.round(family.radius),
        length: Math.round(family.length),
      });
    }
    for (const [fi, family] of families.entries()) {
      family.members.sort((a, b) => a.angle - b.angle);
      const pair = PAIRS[fi % PAIRS.length];
      for (const [mi, member] of family.members.entries()) {
        member.el.setAttribute('data-fill', family.members.length >= 4 ? pair[mi % 2] : pair[0]);
      }
    }

    report.push(
      ...structural.map((x) => ({
        radius: Math.round(x.reach),
        order: 0,
        parts: Number(x.round.toFixed(2)),
      })),
    );
  }

  /*
    Retighten the viewBox onto what is left, now that the frame and the mark
    are gone. The measurement has to come from screen rectangles: the paths sit
    under the EPS conversion's flipping matrix, so `svg.getBBox()` reports the
    union in pre-transform coordinates and crops the wrong region entirely.
  */
  const box = svg.viewBox.baseVal;
  const ratio = box.width / frame.width;
  let left = Infinity;
  let top2 = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  // Every leaf that actually draws, at any nesting depth — these files wrap
  // their paths in groups, and a wedge-cut band is a set of <use> elements.
  // Measuring only top-level <path> crops the artwork to whatever is left.
  for (const el of svg.querySelectorAll('path, use, circle, rect, ellipse, polygon, line')) {
    if (el.closest('defs')) continue;
    const b = el.getBoundingClientRect();
    left = Math.min(left, b.left);
    top2 = Math.min(top2, b.top);
    right = Math.max(right, b.right);
    bottom = Math.max(bottom, b.bottom);
  }

  const pad = 4;
  svg.setAttribute(
    'viewBox',
    [
      (box.x + (left - frame.left) * ratio - pad).toFixed(1),
      (box.y + (top2 - frame.top) * ratio - pad).toFixed(1),
      ((right - left) * ratio + pad * 2).toFixed(1),
      ((bottom - top2) * ratio + pad * 2).toFixed(1),
    ].join(' '),
  );
  svg.removeAttribute('width');
  svg.removeAttribute('height');

  return {
    markup: new XMLSerializer().serializeToString(svg),
    kept: svg.querySelectorAll('path').length,
    dropped,
    unmapped: [...unmapped],
    report,
  };
}, {
  stripBottom: process.argv.includes('--strip-bottom'),
  mono: MONO,
  motifs: MOTIFS,
  folk: FOLK,
  split: Object.fromEntries(
    [...source.matchAll(/<path\b[^>]*?\bd="([^"]+)"/gs)].map((m) => [m[1], split(m[1])]),
  ),
});

await browser.close();

const seen = new Map();
let out = result.markup.replace(/ data-fill="(#[0-9a-fA-F]{3,6})"/g, (_, hex) => {
  // In motif mode the browser has already chosen each shape's colour.
  const to = MOTIFS ? hex : MONO ? '#000' : retune(hex.toLowerCase());
  seen.set(hex, to);
  return to ? ` fill="${to}"` : '';
});

out = out
  // Editor litter: namespaces, ids, and the metadata block.
  //
  // The prefixed ELEMENTS have to go before their namespace declarations do.
  // Strip `xmlns:sodipodi` and leave a `<sodipodi:namedview>` behind and the
  // file is no longer well-formed XML — the browser refuses to parse it, and a
  // mask that will not parse silently masks everything away.
  .replace(/<(sodipodi|inkscape|dc|cc|rdf):[\w-]+[\s\S]*?(?:\/>|<\/\1:[\w-]+>)/g, '')
  .replace(/<metadata[\s\S]*?<\/metadata>/g, '')
  .replace(/<defs\s*\/>/g, '')
  .replace(/\s(?:sodipodi|inkscape):[\w-]+="[^"]*"/g, '')
  .replace(/\sxmlns:(?:sodipodi|inkscape|svg|dc|cc|rdf)="[^"]*"/g, '')
  // Editor ids go; the ones the wedge cuts reference must not, or every
  // href="#..." and clip-path: url(#...) dangles and the bands vanish.
  .replace(/\sid="(?!alpona-)[^"]*"/g, '')
  .replace(/\sversion="[^"]*"/g, '')
  // Every number in the geometry, to one decimal place.
  .replace(/(-?\d+\.\d+)/g, (n) => String(Math.round(Number(n) * 10) / 10))
  .replace(/>\s+</g, '><')
  .trim();

if (!out.includes('xmlns=')) out = out.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');

if (MONO || MOTIFS) {
  // Vector: a mask in mono, a coloured drawing in motif mode.
  await writeFile(join(ROOT, 'public/art/alpona.svg'), out + '\n');
  const { gzipSync } = await import('node:zlib');
  console.log(
    `public/art/alpona.svg  ${(Buffer.byteLength(out) / 1024).toFixed(1)} KB ` +
      `(${(gzipSync(out).length / 1024).toFixed(1)} KB gzipped)` +
      `${MOTIFS ? ', coloured by motif' : ', as a mask'}\n` +
      `  kept ${result.kept} paths\n` +
      `  dropped ${result.dropped.furniture} background/frame, ${result.dropped.mark} outside the artwork, ${result.dropped.crumb} crumbs`,
  );
} else {
  /*
    Rendered large, then written out small.

    900px is roughly what the hero draws it at, so it is sharp at 1x and
    softens only on a retina screen. Below that it reads as a diffused wash
    rather than as a drawing; a retina-correct 1800px would be 200 KB for a
    background, which is not a trade worth making.

    AVIF first, WebP behind it. `image-set` fetches whichever one the browser
    takes, never both.
  */
  const RENDER = 1600;
  const OUTPUT = 900;

  const shot = await chromium.launch({ executablePath: CHROME });
  const canvas = await shot.newPage({
    viewport: { width: RENDER, height: RENDER },
    deviceScaleFactor: 1,
  });
  await canvas.setContent(
    `<body style="margin:0"><div style="width:${RENDER}px;height:${RENDER}px">${out}</div></body>`,
  );
  await canvas.waitForTimeout(400);
  const png = await canvas.screenshot({ omitBackground: true });
  await shot.close();

  const sized = sharp(png).resize(OUTPUT, OUTPUT);
  const avif = await sized.clone().avif({ quality: 45, effort: 8 }).toBuffer();
  const webp = await sized.clone().webp({ quality: 62, effort: 6 }).toBuffer();

  await writeFile(join(ROOT, 'public/alpona.avif'), avif);
  await writeFile(join(ROOT, 'public/alpona.webp'), webp);

  console.log(
    `public/alpona.avif  ${(avif.length / 1024).toFixed(1)} KB at ${OUTPUT}px\n` +
      `public/alpona.webp  ${(webp.length / 1024).toFixed(1)} KB at ${OUTPUT}px\n` +
      `  kept ${result.kept} paths\n` +
      `  dropped ${result.dropped.furniture} background/frame, ${result.dropped.mark} outside the artwork, ${result.dropped.crumb} crumbs`,
  );
}

if (process.env.ALPONA_DEBUG && result.report?.length) {
  console.log(
    '\n  symmetry found:\n' +
      result.report
        .map((r) =>
          r.kind === 'family'
            ? `    family of ${String(r.count).padStart(3)}   radius ${String(r.radius).padStart(4)}   arclen ${r.length}`
            : `    band          radius ${String(r.radius).padStart(4)}   seams ${String(r.order).padStart(3)}   round ${r.parts}`,
        )
        .join('\n'),
  );
}

const kept = [...seen.values()].filter(Boolean);
console.log(
  `  retuned ${kept.length} of ${seen.size} fills onto ${new Set(kept).size} folk colours`,
);
