import type { Locale } from '../config';

/**
 * Strings that appear on more than one page. Page content lives in
 * src/copy/<locale>/.
 *
 * The Bangla side is written as Bangla, not translated from the English line
 * beside it. Where the two differ in shape, the Bangla is right.
 */
export interface UIStrings {
  skipToContent: string;
  nav: { download: string; guide: string; developers: string; about: string; faq: string; contribute: string };
  navMenu: string;
  getObadh: string;
  /**
   * The download button renames itself to the device in front of the reader.
   * `getObadh` is what anyone we cannot place (or cannot ship to) still sees.
   */
  getFor: { mac: string; iphone: string; ipad: string };
  /** The hero button on a platform Obadh has not reached. `{platform}` is filled in. */
  comingFor: string;
  /** Names for that slot, so the button can say which platform it means. */
  platformNames: {
    windows: string;
    linux: string;
    android: string;
    chromeos: string;
    other: string;
  };
  languageLabel: string;
  otherLanguage: string;
  ogImageAlt: string;
  footer: {
    source: string;
    pages: string;
    playground: string;
    discord: string;
    privacy: string;
    licenseLine: string;
    staticNote: string;
  };
  placeholderNote: string;
  /**
   * The typing box appears twice: in the hero and on the guide. Both run the
   * deterministic core and nothing else, and these strings are shared so that
   * neither can drift into claiming the other's behavior.
   */
  typingBox: {
    label: string;
    noscript: string;
  };
  notFound: { eyebrow: string; title: string; body: string; back: string };
}

export const ui: Record<Locale, UIStrings> = {
  en: {
    skipToContent: 'Skip to content',
    nav: {
      download: 'Download',
      guide: 'Writing guide',
      developers: 'Developers',
      about: 'About',
      faq: 'FAQ',
      contribute: 'Contribute',
    },
    navMenu: 'Menu',
    getObadh: 'Get Obadh',
    getFor: {
      mac: 'Download for Mac',
      iphone: 'Download for iPhone',
      ipad: 'Download for iPad',
    },
    comingFor: 'Coming soon for {platform}',
    platformNames: {
      windows: 'Windows',
      linux: 'Linux',
      android: 'Android',
      chromeos: 'ChromeOS',
      other: 'your device',
    },
    languageLabel: 'Language',
    otherLanguage: 'বাংলা',
    ogImageAlt:
      'The Roman string ami banglay gan gai above the Bangla it composes, আমি বাংলায় গান গাই',
    footer: {
      source: 'Source',
      pages: 'Pages',
      playground: 'Engine playground',
      discord: 'Discord',
      privacy: 'Privacy',
      licenseLine: 'MIT licensed. Engine 0.9.1, apps 0.1.0. Built by Unmukto.',
      staticNote: 'This site is static. No analytics, no cookies.',
    },
    placeholderNote: 'Not live yet',
    typingBox: {
      label: 'Type in Roman letters',
      noscript: 'The typing box needs JavaScript. The engine also runs as a full playground at',
    },
    // Kept in step with src/pages/404.astro, which carries its own copy today.
    notFound: {
      eyebrow: '404',
      title: 'There is no page at this address',
      body: 'The link may be old, or the address may have picked up a character on the way. Everything on this site is one of seven pages, and they are all in the header and the footer.',
      back: 'Back to the home page',
    },
  },

  // Terminology is settled in src/copy/GLOSSARY.bn.md.
  //
  // The nav labels depart from the provisional list in copy-shared.md §3, which
  // was marked as waiting for a Bangla writer. সম্পর্কে and প্রশ্ন are not labels
  // a Bangla speaker would put on a menu; পরিচিতি and প্রশ্ন-উত্তর are. Each one
  // is also the eyebrow of the page it points at, which §3 requires.
  bn: {
    skipToContent: 'মূল লেখায় যান',
    nav: {
      download: 'ডাউনলোড',
      guide: 'লেখার নিয়ম',
      developers: 'ডেভেলপার',
      about: 'পরিচিতি',
      faq: 'প্রশ্ন-উত্তর',
      contribute: 'অবদান',
    },
    navMenu: 'মেনু',
    getObadh: 'অবাধ নিন',
    getFor: {
      mac: 'ম্যাকের জন্য ডাউনলোড',
      iphone: 'আইফোনের জন্য ডাউনলোড',
      ipad: 'আইপ্যাডের জন্য ডাউনলোড',
    },
    comingFor: '{platform}-এর জন্য আসছে',
    platformNames: {
      windows: 'উইন্ডোজ',
      linux: 'লিনাক্স',
      android: 'অ্যান্ড্রয়েড',
      chromeos: 'ক্রোমওএস',
      other: 'আপনার যন্ত্র',
    },
    // Translated rather than left in English: আলো and আঁধার are the words the
    // home page already uses for the two modes it measures the keyboard in.
    // সিস্টেম, not অটো, because the option means "whatever the system is set to"
    // and সিস্টেম is the word the rest of the Bangla copy uses for that.
    languageLabel: 'ভাষা',
    otherLanguage: 'English',
    ogImageAlt: 'ami banglay gan gai লেখাটির নিচে তা থেকে তৈরি বাংলা, আমি বাংলায় গান গাই',
    footer: {
      source: 'সোর্স কোড',
      pages: 'পাতা',
      playground: 'ইঞ্জিন খেলাঘর',
      discord: 'ডিসকর্ড',
      privacy: 'গোপনীয়তা',
      // Latin digits: a version is a string someone compares against a repo tag,
      // and every other page prints these two the same way. This line is rendered
      // as plain text, so the figures cannot take their usual span.
      licenseLine: 'এমআইটি লাইসেন্স। ইঞ্জিন 0.9.1, অ্যাপ 0.1.0। বানিয়েছে উন্মুক্ত।',
      staticNote: 'এই সাইটটি স্ট্যাটিক। কোনো অ্যানালিটিকস নেই, কুকি নেই।',
    },
    placeholderNote: 'এখনো চালু হয়নি',
    typingBox: {
      label: 'ইংরেজি বর্ণে লিখুন',
      noscript: 'এই বাক্সটি চলতে জাভাস্ক্রিপ্ট লাগে। ইঞ্জিনের পূর্ণ খেলাঘর আছে এখানে:',
    },
    // src/pages/404.astro carries its own bilingual copy today and reads none of
    // this. When it is wired up here, note that the Bangla title below is the
    // same sentence the transformation row on that page composes: show one or
    // the other, never both.
    notFound: {
      eyebrow: '৪০৪',
      title: 'এই ঠিকানায় কোনো পাতা নেই',
      body: 'লিংকটি পুরোনো হতে পারে, কিংবা ঠিকানায় বাড়তি একটা অক্ষর ঢুকে গেছে। এই সাইটের সবটাই সাতটি পাতার মধ্যে, আর সাতটিই আছে উপরে আর নিচে, দুই জায়গাতেই।',
      back: 'প্রথম পাতায় ফিরুন',
    },
  },
};
