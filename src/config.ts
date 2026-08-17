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
    engine: '0.9.1',
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
  macDmg: 'https://github.com/nsssayom/obadh-macos/releases/download/v0.1.0/Obadh-0.1.0.dmg',
  macReleases: 'https://github.com/nsssayom/obadh-macos/releases/latest',
  // TODO(maintainer): replace with the real invite once the server exists.
  discord: 'https://discord.gg/obadh',
  playground: 'https://sayom.me/obadh_engine/',
  github: {
    org: 'https://github.com/nsssayom',
    engine: 'https://github.com/nsssayom/obadh_engine',
    ios: 'https://github.com/nsssayom/obadh-ios',
    macos: 'https://github.com/nsssayom/obadh-macos',
    website: 'https://github.com/nsssayom/obadh-website',
  },
  crate: 'https://crates.io/crates/obadh_engine',
} as const;

/** Marks a link whose target does not exist yet, so the UI can say so honestly. */
export const PLACEHOLDER_LINKS = new Set<string>([LINKS.appStore, LINKS.macDmg, LINKS.discord]);

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
