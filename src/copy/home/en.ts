import type { HomeContent } from '../types';

/*
  Written for someone who wants to type Bangla, not for someone who wants to
  read about a Rust engine. Benefit first, one sentence under it, plain words.
  The engine, the C ABI and the architecture are on /about/, where a person who
  came looking for them will find them.

  No slogans past the hero. Every other heading says what you get.
*/
export const home: HomeContent = {
  meta: {
    title: 'Obadh — a free, fast Bangla keyboard',
    description:
      'A free Bangla keyboard that is fast, gets the word right, and keeps everything on your device. On iPhone, iPad and Mac, with Linux, Android and Windows on the way.',
    ogTitle: 'Obadh: a free, fast Bangla keyboard',
    ogDescription:
      'Fast, accurate Bangla typing on every device. Free, open source, and nothing you type leaves your phone.',
    ogImage: 'default.png',
    ogImageAlt:
      'The Roman string ami banglay gan gai above the Bangla it composes, আমি বাংলায় গান গাই',
  },

  hero: {
    headingLead: '{badge} for every device:',
    badgeWord: 'বাংলা',
    headingAccent: 'fast, accurate, modern',
    lede: 'Free, open source, and nothing you type ever leaves your device.',
    cta: 'Get Obadh',
    // Read out in place of the animation, so the two scripts have to be marked:
    // an unmarked Bangla run here is spoken by an English voice.
    animationLabel:
      'Roman letters being typed, composing Bangla a letter at a time. It opens on amar sOnar bangla, which composes <span lang="bn">আমার সোনার বাংলা</span>, then moves on to other lines.',
  },

  values: [
    {
      id: 'speed',
      icon: 'speed',
      label: 'Speed',
      heading: 'Never keeps you waiting',
      body: 'A word composes in about three microseconds, on a new phone or an old one.',
    },
    {
      id: 'accurate',
      icon: 'accurate',
      label: 'Accuracy',
      heading: 'Gets the word right',
      body: 'Corrections come from 845,461 Bangla words, and the English ones people mix in.',
    },
    {
      id: 'private',
      icon: 'private',
      label: 'Privacy',
      heading: 'Your words never leave',
      body: 'No account, no sync, no server. It all works in airplane mode.',
    },
    {
      id: 'free',
      icon: 'free',
      label: 'Free',
      heading: 'Free, and open',
      body: 'No price, no ads, nothing to upgrade to. MIT licensed, all of it.',
    },
  ],

  /*
    The visual block. Four tiles, a drawn keyboard and a grid of keys — the
    things that are easier to look at than to read about. Each line here is one
    sentence, and if a tile needs two it is the wrong tile.
  */
  bento: {
    label: 'What it is like',
    heading: 'Less to think about while you type.',
    tiles: [
      {
        id: 'corrections',
        heading: 'You keep the last say',
        body: 'Your spelling comes up first, the correction beside it. Nothing changes under your fingers.',
      },
      {
        id: 'learns',
        heading: 'It learns your words',
        body: 'Names, slang and brands are remembered on the device, and nowhere else.',
      },
      {
        id: 'emoji',
        heading: 'Emoji, from the word itself',
        body: 'Type the word and the emoji for it comes up in the strip. Taking it replaces the word, because the word was the search.',
      },
      {
        id: 'offline',
        heading: 'It all runs on the device',
        body: 'Composing, corrections and suggestions happen where you are typing. Airplane mode changes nothing.',
      },
    ],
    phone: {
      line: 'সবার উপরে মানুস',
      typed: 'মানুস',
      fixed: 'মানুষ',
      label:
        'A drawing of the keyboard on a phone. Above the keys, a strip offers the spelling typed and the correction beside it, with the correction highlighted.',
    },
    emoji: {
      roman: 'bhalObasa',
      bangla: 'ভালোবাসা',
      symbol: '❤️',
      label:
        'The suggestion strip after typing bhalObasa: the Bangla it composed, ভালোবাসা, and a red heart offered in its place.',
    },
  },

  demo: {
    label: 'Try it',
    heading: 'Type something and see.',
    boxLabel: 'Type here',
    noscript: 'The box needs JavaScript. There is a full playground at',
  },

  platforms: {
    label: 'Everywhere',
    heading: 'The same keyboard on everything you type on.',
    rows: [
      {
        name: 'iPhone and iPad',
        state: 'shipping',
        stateLabel: 'Available',
        line: 'Works in every app that accepts text. iOS and iPadOS 18 or later.',
      },
      {
        name: 'Mac',
        state: 'shipping',
        stateLabel: 'Available',
        line: 'Types into any Mac app, the same way the built-in input sources do. macOS 15 or later.',
      },
      {
        name: 'Linux, X11 and Wayland',
        state: 'building',
        stateLabel: 'Coming',
        line: 'Both display servers, so it works whichever one your desktop uses.',
      },
      { name: 'Android', state: 'building', stateLabel: 'Coming', line: 'Not ready to install yet.' },
      { name: 'Windows', state: 'building', stateLabel: 'Coming', line: 'Not ready to install yet.' },
      { name: 'ChromeOS', state: 'building', stateLabel: 'Coming', line: 'Not ready to install yet.' },
    ],
    link: 'How to install it',
  },

  avro: {
    label: 'From Avro',
    heading: 'Nothing new to learn',
    body: [
      'Avro made it ordinary to write your own language in the letters you already had, and it cost nothing. Its scheme became what most people mean by typing Bangla. Obadh keeps those habits exactly: the same vowels, the same conjuncts, the same muscle memory.',
      'What is new is underneath, and in how it feels while you use it.',
    ],
    link: 'Where Obadh came from',
    markLabel:
      'Avro\u2019s line, <span lang="bn">ভাষা হোক উন্মুক্ত</span>, with one word written into it to make Obadh\u2019s: <span lang="bn">ভাষা হোক আরও উন্মুক্ত</span>.',
  },

  open: {
    heading: 'Made in the open, by people who use it.',
    lede: 'Everything is public and MIT licensed. A word that comes out wrong is worth reporting.',
    link: 'How to help',
  },
};
