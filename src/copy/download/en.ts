import type { DownloadContent } from '../types';
import { LINKS, SITE } from '../../config';

/*
  The list, and nothing else.

  This page does not route by platform and does not argue for the keyboard.
  Someone arriving here is either choosing, downloading for a device that is
  not in their hand, or checking whether their platform is on the list. All
  three want the same thing: every platform visible at once, with the button
  next to it.

  The hero button on the home page does the routing. Everything that is
  background, how the engine is built, what Full Access changes, the history
  of the scheme, lives on /about/, /faq/ and /privacy/ and is linked, never
  repeated.

  Four anchors are a contract, linked from other pages: macos, ios,
  turning-it-on, other-platforms, build-from-source.
*/
export const download: DownloadContent = {
  meta: {
    title: 'Download Obadh: Bangla keyboard for iPhone, iPad and Mac',
    description:
      'Install the Obadh Bangla keyboard on iPhone, iPad or Mac. Native controls, corrections as you type, and it works in every app you already use.',
    ogTitle: 'Download Obadh',
    ogDescription:
      'Free Bangla typing on iPhone, iPad and Mac. One button per platform, and nothing you type leaves the device.',
    ogImage: 'download.png',
    ogImageAlt:
      'The Roman string obadhe bangla likhun above the Bangla it composes, অবাধে বাংলা লিখুন',
  },

  eyebrow: 'Download',
  heading: 'Get Obadh',
  standfirst: 'Every platform Obadh has reached, and what each one needs to run it.',

  releasesHeading: 'Available now',

  releases: [
    {
      id: 'ios',
      name: 'iPhone & iPad',
      requirement: `iOS and iPadOS ${SITE.minOS.ios} or later`,
      action: { label: 'Get it on the App Store', href: LINKS.appStore },
      facts: ['Free, no account', 'Every app you type in', 'Nothing leaves the device'],
    },
    {
      id: 'macos',
      name: 'Mac',
      requirement: `macOS ${SITE.minOS.macos} or later, Apple silicon and Intel`,
      action: { label: 'Download for Mac', note: `Version ${SITE.versions.macos}`, href: LINKS.macDmg },
      altAction: { label: 'All releases', href: LINKS.macReleases },
      facts: ['Signed and notarized', 'A system input source', 'Nothing leaves the device'],
    },
  ],

  setup: {
    heading: 'Turning it on',
    lede: 'Neither system switches a new keyboard on by itself, so each takes one trip through Settings.',
    ios: {
      heading: 'iPhone and iPad',
      steps: [
        'Install Obadh and open it once.',
        'Settings › Obadh › Keyboards, and turn Obadh on.',
        'Turn on Allow Full Access on the same screen. <a href="/faq/#full-access">What it changes</a> is short.',
        'Hold the globe key in any app and pick Obadh.',
      ],
    },
    macos: {
      heading: 'Mac',
      steps: [
        'Open the disk image and drag Obadh to Applications.',
        'Open it once, so macOS registers the input source.',
        'Settings › Keyboard › Input Sources › Edit, then add Obadh under Bangla.',
        'Press Control-Space to switch to it.',
      ],
    },
    after:
      'Type <code>ami banglay likhchi</code> and you should get <span lang="bn">আমি বাংলায় লিখছি</span>. If a letter comes out wrong, <a href="/guide/">the writing guide</a> has every rule of the scheme.',
  },

  soon: {
    heading: 'Not yet',
    lede: 'Nobody has started these. Each needs an input method written against its own framework, and any one of them could be yours.',
    rows: [
      { name: 'Linux', state: 'building', stateLabel: 'Coming', line: 'IBus and Fcitx5, X11 and Wayland' },
      { name: 'Android', state: 'building', stateLabel: 'Coming', line: 'An input method service over the engine' },
      { name: 'Windows', state: 'building', stateLabel: 'Coming', line: 'A Text Services Framework provider' },
      { name: 'ChromeOS', state: 'building', stateLabel: 'Coming', line: 'A browser-extension input method' },
    ],
    action: { label: 'Where to start', href: '/contribute/' },
  },

  source: {
    heading: 'Build it yourself',
    lede: 'Everything is MIT licensed, and each repository builds on its own.',
    repos: [
      { repo: 'engine', name: 'obadh_engine', body: 'The Rust engine, and the command-line tool.' },
      { repo: 'ios', name: 'obadh-ios', body: 'The iPhone and iPad keyboard.' },
      { repo: 'macos', name: 'obadh-macos', body: 'The Mac input method.' },
    ],
  },
};
