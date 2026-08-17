/**
 * Which platform is reading this page.
 *
 * Shared, because two things need the same answer and must not disagree: the
 * download page routes its panels by it, and every "Get Obadh" button renames
 * itself to name the device in front of the reader.
 *
 * Order matters twice over.
 *
 * Within a string: Android's user agent contains the word Linux and ChromeOS's
 * contains X11, so each has to be settled before the thing it would otherwise
 * be mistaken for.
 *
 * Between strings: the user agent is asked first and the platform hints only
 * answer if it said nothing. Every real browser names its system in the user
 * agent, while `userAgentData.platform` keeps reporting the true machine
 * through a user-agent override — so trusting the hint first would ignore what
 * the reader's browser is telling us.
 */
export type Platform =
  | 'mac'
  | 'iphone'
  | 'ipad'
  | 'windows'
  | 'linux'
  | 'android'
  | 'chromeos'
  | 'other';

/** Platforms that have something to download today. */
export const SHIPPING: ReadonlySet<Platform> = new Set<Platform>(['mac', 'iphone', 'ipad']);

/** Platforms we can name and have not built for. */
export const SOON: ReadonlySet<Platform> = new Set<Platform>([
  'windows',
  'linux',
  'android',
  'chromeos',
]);

/** Platforms with a phone in the other pocket, so the QR is worth showing. */
export const DESKTOP: ReadonlySet<Platform> = new Set<Platform>([
  'mac',
  'windows',
  'linux',
  'chromeos',
]);

function classify(text: string): Platform | null {
  if (/iPhone|iPod/i.test(text)) return 'iphone';
  if (/iPad/i.test(text)) return 'ipad';
  if (/Android/i.test(text)) return 'android';
  if (/CrOS|Chrome ?OS/i.test(text)) return 'chromeos';
  if (/Macintosh|Mac OS X|macOS/i.test(text)) return 'mac';
  if (/Windows|Win32|Win64/i.test(text)) return 'windows';
  if (/Linux|X11/i.test(text)) return 'linux';
  return null;
}

export function detectPlatform(): Platform {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const hints = `${nav.userAgentData?.platform ?? ''} ${nav.platform ?? ''}`;
  const found = classify(nav.userAgent) ?? classify(hints) ?? 'other';

  // iPadOS 13 and later ask for desktop sites by default, so an iPad arrives
  // claiming to be a Mac. No Mac has a touchscreen.
  if (found === 'mac' && (nav.maxTouchPoints ?? 0) > 1) return 'ipad';
  return found;
}
