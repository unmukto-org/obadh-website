/**
 * Everything about this site that a maintainer might need to change without
 * touching a component. Placeholders are marked TODO and listed in README.md.
 */

/** Canonical origin. Override at build time: `SITE_URL=https://obadh.io npm run build`. */
export const SITE_URL = (
  import.meta.env.SITE_URL ?? process.env.SITE_URL ?? 'https://obadh.unmukto.org'
).replace(/\/$/, '');

export const LOCALES = ['en', 'bn'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** BCP-47 tags, for `<html lang>` and hreflang. */
export const LOCALE_TAG: Record<Locale, string> = { en: 'en', bn: 'bn' };

export const LOCALE_NAME: Record<Locale, string> = { en: 'English', bn: 'বাংলা' };

/**
 * The languages this site publishes, as opposed to the ones it has copy for.
 *
 * Bangla is switched off for now. Its copy is kept and still type-checked, but
 * no /bn/ page is built, nothing links to one, and no page claims a Bangla
 * alternate: an hreflang pointing at a page that does not exist is worse than
 * none, because a crawler follows it.
 *
 * To turn it back on, do both:
 *   1. add 'bn' here
 *   2. rename src/pages/_bn back to src/pages/bn (Astro skips a folder whose
 *      name starts with an underscore, which is what keeps it unbuilt)
 *
 * scripts/verify-seo.mjs reads the built site and fails if those two disagree,
 * in either direction, so a half-done switch cannot ship.
 */
export const PUBLISHED_LOCALES: readonly Locale[] = ['en'];

/** More than one language is live, so pages name each other as alternates. */
export const MULTILINGUAL = PUBLISHED_LOCALES.length > 1;

export const SITE = {
  name: 'Obadh',
  nameBn: 'অবাধ',
  /** Shipped inside the iOS app. Do not paraphrase it. */
  tagline: 'ভাষা হোক আরও উন্মুক্ত',
  /*
    The project is the collective's, and the site never names an individual.
    Unmukto is also the parent of this domain: obadh.unmukto.org.
  */
  author: 'Unmukto',
  authorUrl: 'https://unmukto.org',
  license: 'MIT',
  /** Keep in step with the repos. */
  versions: {
    engine: '0.9.3',
    ios: '0.1.0',
    macos: '0.1.0',
  },
  /** Machine-readable date behind the privacy page's "last updated" line. */
  privacyUpdated: '2026-08-15',
  /** Deployment targets, from each app's project.yml. */
  minOS: {
    ios: '18',
    macos: '15',
  },
} as const;

export const LINKS = {
  // TODO(maintainer): replace with the real App Store listing once the app is approved.
  appStore: 'https://apps.apple.com/app/obadh/id0000000000',
  // TODO(maintainer): replace once the first macOS release is tagged.
  macDmg: 'https://github.com/unmukto-org/obadh-macos/releases/download/v0.1.0/Obadh-0.1.0.dmg',
  macReleases: 'https://github.com/unmukto-org/obadh-macos/releases/latest',
  /* Community support. Checked against Discord's invite endpoint on
     2026-09-21: it resolves to the Obadh server and expires_at is null, so it
     does not lapse the way a default seven-day invite would. */
  discord: 'https://discord.gg/DHFxV8dzCy',
  /* Served from this site, at /playground/. The deploy workflow copies the
     engine's own docs/ folder in, so it tracks the engine rather than a copy. */
  playground: 'https://obadh.unmukto.org/playground/',
  github: {
    org: 'https://github.com/unmukto-org',
    engine: 'https://github.com/unmukto-org/obadh_engine',
    ios: 'https://github.com/unmukto-org/obadh-ios',
    macos: 'https://github.com/unmukto-org/obadh-macos',
    autocorrectData: 'https://github.com/unmukto-org/obadh_autocorrect_dataset',
    autosuggestData: 'https://github.com/unmukto-org/obadh_autosuggest_dataset',
    website: 'https://github.com/unmukto-org/obadh-website',
  },
  crate: 'https://crates.io/crates/obadh_engine',
} as const;

/** Marks a link whose target does not exist yet, so the UI can say so honestly. */
export const PLACEHOLDER_LINKS = new Set<string>([LINKS.appStore, LINKS.macDmg]);

/** Page paths, without locale prefix and always trailing-slashed. */
export const ROUTES = [
  '/',
  '/download/',
  '/guide/',
  '/developers/',
  '/about/',
  '/faq/',
  '/contribute/',
  '/privacy/',
] as const;
export type Route = (typeof ROUTES)[number];

/** `/about/` in English, `/bn/about/` in Bangla. */
export function localizedPath(route: string, locale: Locale): string {
  const clean = route.startsWith('/') ? route : `/${route}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}/` : `/${locale}${clean}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Strips the locale prefix off a pathname, so the language switcher can stay on the page. */
export function routeFromPath(pathname: string): string {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (withSlash === `/${locale}/`) return '/';
    if (withSlash.startsWith(`/${locale}/`)) return withSlash.slice(`/${locale}`.length);
  }
  return withSlash;
}

export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return (LOCALES as readonly string[]).includes(segment ?? '') ? (segment as Locale) : DEFAULT_LOCALE;
}
