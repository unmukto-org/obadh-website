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
    title: 'Obadh: a modern Bangla keyboard for iPhone, iPad and Mac',
    description:
      'A modern Bangla keyboard for iPhone, iPad and Mac. Composes a word in three microseconds, corrects as you type, and nothing you type leaves the device.',
    ogTitle: 'Obadh: a modern Bangla keyboard',
    ogDescription:
      'Bangla typing that uses the controls your device already has, corrects as you type, and keeps every word on the device.',
    ogImage: 'default.png',
    ogImageAlt:
      'The Roman string ami banglay gan gai above the Bangla it composes, আমি বাংলায় গান গাই',
  },

  hero: {
    headingLead: '{badge} for every device:',
    badgeWord: 'বাংলা',
    headingAccent: 'fast, accurate, modern',
    lede: '',
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
      heading: 'Keeps up with you',
      body: 'A word is ready in about three microseconds, on a new phone or an old one.',
    },
    {
      id: 'accurate',
      icon: 'accurate',
      label: 'Accuracy',
      heading: 'Gets the spelling right',
      body: 'Corrections come from 845,461 Bangla words, and the English ones people mix in.',
    },
    {
      id: 'native',
      icon: 'native',
      label: 'Native',
      heading: 'Works like your device',
      body: 'The same keys and gestures your device already uses. Nothing new to learn.',
    },
    {
      id: 'free',
      icon: 'free',
      label: 'Free',
      heading: 'Free, and open source',
      body: 'Free to use, and MIT licensed, so anyone can read the code or build on it.',
    },
  ],

  /*
    The visual block. Four tiles, a drawn keyboard and a grid of keys, the
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
        body: 'Type a word, and its emoji appears in the suggestion strip.',
      },
      {
        id: 'offline',
        heading: 'It all runs on the device',
        body: 'Composing, corrections and suggestions all work offline.',
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
        line: 'iOS and iPadOS 18 or later',
      },
      {
        name: 'Mac',
        state: 'shipping',
        stateLabel: 'Available',
        line: 'macOS 15 or later',
      },
      {
        name: 'Linux',
        state: 'building',
        stateLabel: 'Coming',
        line: 'X11 and Wayland',
      },
      { name: 'Android', state: 'building', stateLabel: 'Coming', line: '' },
      { name: 'Windows', state: 'building', stateLabel: 'Coming', line: '' },
      { name: 'ChromeOS', state: 'building', stateLabel: 'Coming', line: '' },
    ],
    link: 'How to install it',
  },

  avro: {
    label: 'From Avro',
    heading: 'Nothing new to learn',
    // One line. The mark above it is the tribute; a paragraph explaining the
    // mark would be a caption, and a caption here means the mark failed.
    body: ['Avro made typing Bangla ordinary. Obadh keeps its scheme exactly. What is new is underneath.'],
    link: 'Where Obadh came from',
    markLabel:
      'Avro\u2019s line, <span lang="bn">ভাষা হোক উন্মুক্ত</span>, with one word written into it to make Obadh\u2019s: <span lang="bn">ভাষা হোক আরও উন্মুক্ত</span>.',
  },

  open: {
    heading: 'Open source',
    lede: 'MIT licensed.',
    link: 'Contribute',
  },
};
