import type { BlockContent } from '../types';

/*
  Six blocks, in the order a reader wants them: what it is, where it came from,
  why it never guesses, the name, who writes it, the license.

  This page used to be one long column of prose. Most of what went was
  restatement, and the numbers that survived did so because somebody can check
  them: the version, the dictionary, the two artifact sizes.

  Three things this page does not do. It does not frame Obadh as an iOS and
  macOS product, the project is Bangla typing on every platform, and iPhone,
  iPad and Mac are the ones out first. It does not explain phonetic typing to
  someone who has been typing that way since school. And it does not print the
  tagline twice: the section quotes OmicronLab's line, and the page ends on
  Obadh's.

  § where-it-came-from, § the-name and § the-license are settled in substance;
  the facts in them may not move. Every Roman/Bangla pair is engine verified.
*/
export const about: BlockContent = {
  meta: {
    title: 'About Obadh, and what Avro started',
    description:
      'What Obadh does, what it owes to Avro Keyboard, why it never guesses at a word, and who writes it.',
    ogImage: 'about.png',
    ogImageAlt: 'The Obadh tagline, ভাষা হোক আরও উন্মুক্ত',
  },

  eyebrow: 'About',
  heading: 'What Obadh is, and where it came from',
  standfirst: 'A free Bangla keyboard, and the twenty-year-old idea it continues.',

  blocks: [
    {
      kind: 'facts',
      id: 'the-short-version',
      heading: 'In short',
      items: [
        { term: 'Today', value: 'iPhone and iPad on iOS 18 or later. Mac on macOS 15 or later.' },
        {
          term: 'Not yet',
          value:
            'Linux, Android, Windows and ChromeOS. Nobody has started any of the four, and <a href="/contribute/#the-platforms-that-need-someone">one of them could be yours</a>.',
        },
        { term: 'Price', value: 'Free to use. No ads, nothing to sign in to.' },
        { term: 'License', value: 'MIT, throughout. Engine 0.9.3, apps 0.1.0.' },
        { term: 'Built by', value: '<a href="https://unmukto.org">Unmukto</a>, an open source collective.' },
      ],
    },

    {
      kind: 'prose',
      id: 'where-it-came-from',
      heading: 'Where it came from',
      body: [
        'For about fifteen years, writing Bangla on a computer meant buying software and learning a layout first. What you produced was font-encoded text, readable only on a machine carrying the same proprietary font. Then one student changed that.',
      ],
    },

    {
      kind: 'cards',
      layout: 'rows',
      items: [
        {
          name: '26 March 2003',
          body: 'Mehdi Hasan Khan, a medical student at Mymensingh Medical College, releases the first version of what became Avro Keyboard. The 26th of March is Independence Day in Bangladesh.',
        },
        {
          name: '21 April 2003',
          body: 'The name Avro arrives, with version 0.9.0. Rifat Un Nabi, Tanbin Islam Siam and Shabab Mustafa carry the credit with him. They publish as OmicronLab, a handful of people and not a company.',
        },
        {
          name: 'The years after',
          body: 'Avro cost nothing, wrote Unicode, and let you type by sound. A generation learned to write its language that way and never learned a layout at all.',
        },
        {
          name: 'February 2025',
          body: 'The Ekushey Padak in science and technology goes to all four of them for Avro. It was announced for Mehdi Hasan Khan alone; he asked for it to name the other three, and the ministry made it a joint award.',
        },
      ],
    },

    {
      kind: 'quote',
      text: 'ভাষা হোক উন্মুক্ত',
      lang: 'bn',
      note: 'The one line on OmicronLab’s site. Let the language be free.',
    },

    {
      kind: 'prose',
      body: [
        'Obadh’s line adds one word to that. It is not a rewrite of Avro and not a fork: no shared code, and a Roman scheme of its own, written down in <a href="/guide/">the guide</a> with <a href="/guide/#from-avro">a section for people arriving with Avro habits</a>. Nobody from OmicronLab has any part in this, and nothing here is their endorsement.',
        'What it takes from Avro is the premise: the way you write your own language should not be something you buy, and should not be something anyone can take back.',
      ],
    },

    {
      kind: 'prose',
      id: 'how-it-is-built',
      heading: 'Why it never guesses',
      body: [
        'Type a word nobody has ever written down (your friend’s name, your village, a line of Nazrul in the spelling of 1922) and Obadh still gets it right, the same way every time.',
        'The layer that turns Roman into Bangla holds no dictionary at all. <code>kt</code> becomes <span lang="bn">ক্ত</span> because a rule says a consonant meeting a consonant binds, and that rule is a file in <a href="https://github.com/unmukto-org/obadh_engine">the repository</a> with tests over it. Corrections are a separate layer, and they only ever offer; nothing is inserted for you unless you switch that on.',
      ],
    },

    {
      kind: 'prose',
      id: 'the-name',
      heading: 'The name',
      body: [
        '<span lang="bn">অবাধ</span>, romanized <code>obadh</code>, means unhindered. Nobody coined it for this: <span lang="bn">অবাধে</span> is how you say that something happens freely, with nothing in its way.',
        'Type <code>obadhe bangla likhun</code> into the engine and it gives <span lang="bn">অবাধে বাংলা লিখুন</span>.',
      ],
    },

    {
      kind: 'prose',
      id: 'who-makes-it',
      heading: 'Who builds it',
      body: [
        '<a href="https://unmukto.org">Unmukto</a> is an open source collective that builds and maintains free software for the Bangla language and for Bangladesh. Obadh is one of those projects.',
        'It is a small group, and plenty of the work that would help is <a href="/contribute/">not code</a>.',
      ],
    },

    {
      // copy-shared.md §9 flagged that only obadh_engine has a tracked LICENSE file and asked
      // for this to be narrowed to the engine. Settled the other way: the author's intent is
      // MIT throughout, the fix is two files in obadh-ios and obadh-macos, and it is with him.
      // Do not narrow or hedge this, here or on /download/ or in the structured data.
      kind: 'prose',
      id: 'the-license',
      heading: 'The license',
      body: [
        'MIT, throughout. Use Obadh for anything including work you are paid for, read the source, change it, ship your own version; keep the copyright notice on any copy you pass on, and expect no warranty.',
        'The part that matters is not the price. If this project stopped tomorrow, everything needed to keep it alive is already in the hands of anyone who wants it.',
      ],
    },
  ],
};
