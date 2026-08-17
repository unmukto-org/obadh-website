import type { BlockContent } from '../types';

/*
  Six blocks, in the order a reader wants them: what it is, where it came from,
  why it never guesses, the name, who writes it, the license.

  This page used to be one long column of prose. Most of what went was
  restatement, and the numbers that survived did so because somebody can check
  them: the version, the dictionary, the two artifact sizes.

  Three things this page does not do. It does not frame Obadh as an iOS and
  macOS product — the project is Bangla typing on every platform, and iPhone,
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
  standfirst:
    'A free Bangla keyboard that types by sound, fixes the words you get wrong, and never sends any of it anywhere.',

  blocks: [
    {
      kind: 'facts',
      id: 'the-short-version',
      heading: 'In short',
      items: [
        {
          term: 'Today',
          value: 'iPhone and iPad on iOS 18 or later. Mac on macOS 15 or later.',
        },
        {
          term: 'Not yet',
          value:
            'Linux, Android, Windows and ChromeOS. Nobody has started any of the four, and <a href="/contribute/#the-platforms-that-need-someone">one of them could be yours</a>.',
        },
        { term: 'Price', value: 'None. No ads, no subscription, nothing to sign in to.' },
        { term: 'License', value: 'MIT, throughout. Engine 0.9.1, apps 0.1.0.' },
        {
          term: 'Network',
          value:
            'The keyboard has no networking code in it: no <code>URLSession</code>, no sockets.',
        },
        { term: 'Dictionary', value: '845,461 Bangla words, on the device.' },
        { term: 'Written by', value: 'NSS Sayom.' },
      ],
    },

    {
      kind: 'prose',
      id: 'what-it-does',
      heading: 'Bangla in every app you already use',
      body: [
        'Obadh writes Bangla anywhere your device takes text: a message, a search box, a form, a document. On iPhone and iPad it is a keyboard; on a Mac it is an input source, the same kind of thing the system already ships with. You switch it on once in settings and then stop thinking about it.',
        'What it writes is Unicode, so your words open as words on a machine that has never heard of this project, with no font to install and nothing to send along with the file. The <a href="/guide/">writing guide</a> has every rule of the scheme in one place, and <a href="/download/">the download page</a> has the steps.',
      ],
    },

    {
      kind: 'prose',
      id: 'where-it-came-from',
      heading: 'Where it came from',
      body: [
        'For about fifteen years, writing Bangla on a computer meant buying software and learning a layout first, the way you learn a typewriter. What you produced was font-encoded text: a Latin key bound to a finished Bengali glyph inside a proprietary font, so the file was readable only on a machine that carried the same one.',
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
          body: 'The name Avro arrives, with version 0.9.0. Rifat Un Nabi, Tanbin Islam Siam and Shabab Mustafa carry the credit with him. They publish as OmicronLab, which is a handful of people and not a company.',
        },
        {
          name: 'The years after',
          body: 'Avro cost nothing, wrote Unicode, and let you type by sound. Phonetic typing became the ordinary way to write Bangla, taken up and reimplemented well beyond OmicronLab — Borno, OpenBangla on Linux, Wikipedia’s Universal Language Selector, other people’s Android keyboards. A generation learned to write its language by sound and never learned a layout at all.',
        },
        {
          name: 'February 2025',
          body: 'The Ekushey Padak in science and technology goes to all four of them for Avro. Papers in Bangladesh reported that it had been announced for Mehdi Hasan Khan alone, that he asked for it to name the other three, and that the ministry then made it a joint award.',
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
        'Obadh’s line adds one word to that, and the added word is the whole relationship between the two projects.',
        'So this is not a rewrite of Avro and not a fork of it. Obadh shares no code with it, and the Roman scheme is its own, deliberately — the whole of it written down in the <a href="/guide/">guide</a>, including <a href="/guide/#from-avro">a section for people arriving with Avro habits</a>. Nobody from OmicronLab has any part in this project, and nothing here should be read as their endorsement.',
        'What Obadh takes is the premise: that the way a person writes their own language should not be something they buy, and should not be something anyone can take back.',
      ],
    },

    {
      kind: 'prose',
      id: 'how-it-is-built',
      heading: 'Why it never guesses',
      body: [
        'Type a word nobody has ever written down and Obadh still gets it right, the same way every time. That comes from one decision.',
        'The layer that turns Roman into Bangla is rule-based and dictionary-free, and it is meant to stay that way. <code>kt</code> becomes <span lang="bn">ক্ত</span> because a rule says a consonant meeting a consonant binds, and that rule is a file in the repository with tests over it, not a statistical tendency.',
        'A transliterator that leans on a word list is at its worst exactly where a language is most alive: your friend’s name, your village, a word your family uses and nobody else does, a line of Nazrul in the spelling of 1922. The core holds no opinion about how common a word is. When it is wrong, it is wrong for a reason someone can read, argue with and fix.',
      ],
    },

    {
      kind: 'facts',
      items: [
        {
          term: 'The core',
          value:
            'One Rust library, <a href="https://github.com/nsssayom/obadh_engine"><code>obadh_engine</code></a>, with no word list inside it and no data files at all. About 390 KB compiled to WebAssembly, which is why the same code runs in a typing box on a web page.',
        },
        {
          term: 'Autocorrect',
          value:
            'A finite-state lexicon of 845,461 Bangla words. It does not reach into your word and change it; it returns ranked candidates carrying their own reasons, as numbers rather than intuitions, and the keyboard decides what to do with them.',
        },
        {
          term: 'Next word',
          value:
            'An n-gram model over a curated Bangla corpus, with a bounded personal overlay that learns from your own writing on your own device. The 29 MB artifact ships on iPhone and iPad only; a test in the macOS repository pins its absence.',
        },
        {
          term: 'The seam',
          value:
            'Everything above the engine reaches it through a thin, versioned C interface: UTF-8 buffers in, packed records out, no objects and no callbacks. iOS and macOS link the same static library and share the same Swift layer over it.',
        },
        {
          term: 'Each platform',
          value:
            'On iPhone and iPad the keyboard’s geometry is measured against Apple’s own and held there by a screenshot test suite. On a Mac, Obadh registers through InputMethodKit, shows the Bangla as marked text, and follows the caret with a candidate bar.',
        },
      ],
      after:
        'None of it needs the network, and there is nothing to switch off: no account, no telemetry, no sign-in. <a href="/privacy/">What Obadh does with your typing</a> is the long version of that sentence, down to the file each claim rests on.',
    },

    {
      kind: 'prose',
      id: 'the-name',
      heading: 'The name',
      body: [
        '<span lang="bn">অবাধ</span>, romanized <code>obadh</code>, means unhindered. It is an everyday word rather than a coinage: <span lang="bn">অবাধে</span> is how you say that something happens freely, with nothing standing in its way.',
        'What was asked of the software is the word itself. Not a price, not an account, not a layout, not a network.',
        'Type <code>obadh</code> into the engine and it gives back <span lang="bn">অবাধ</span>. Type <code>obadhe bangla likhun</code> and it gives <span lang="bn">অবাধে বাংলা লিখুন</span>.',
      ],
    },

    {
      kind: 'prose',
      id: 'who-makes-it',
      heading: 'Who writes it',
      body: [
        'Obadh is written by NSS Sayom: the engine, the iOS keyboard, the macOS input method, and the data work behind the lexicon and the corpus. That is the entire list of names today, which is a fact about how old the project is rather than a preference.',
        'The list of names is short; the list of things that would help is not. <a href="/contribute/">Where to start</a> says what each of them takes, and most of them are not code.',
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
        'The engine, both apps and the scripts that build them are MIT licensed. The license is short enough to read in a minute: use Obadh for anything, including work you are paid for; read the source, change it, ship your own version; keep the copyright notice with any copy you pass on; and expect no warranty, because nobody is charging you for one.',
        'Free of cost is the easy half. The half that matters more is that it cannot be withdrawn. If this project stopped tomorrow, everything needed to keep it alive would already be in the hands of anyone who wanted it, and nobody would have to ask.',
      ],
    },
  ],
};
