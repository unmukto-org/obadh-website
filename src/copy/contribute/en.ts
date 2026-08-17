import type { BlockContent } from '../types';
import { LINKS } from '../../config';

/*
  An invitation with first steps, not a description of the project. It opens
  with three things a person can finish this afternoon, and the four platforms
  nobody has started come second, because they are the best thing this page has
  to offer.

  This page used to be thirteen sections of prose, most of them describing work
  rather than handing it over. What survives is what a contributor acts on:
  which repository, which toolchain, what a port actually costs, and what is
  waiting for a Bangla speaker rather than a programmer.

  `working-on-the-code` and `reporting-something-that-is-wrong` are contract
  anchors; /download/, /guide/ and /faq/ link into them.
*/
export const contribute: BlockContent = {
  meta: {
    title: 'Contribute to Obadh',
    description:
      'Four platforms have nobody on them yet, and the easiest first contribution is one line in a text file. Where to start on Obadh, in code and out of it.',
    ogImage: 'contribute.png',
    ogImageAlt: 'The Roman string bhalObasa above the Bangla it composes, ভালোবাসা',
  },

  eyebrow: 'Contribute',
  heading: 'Where to start',
  standfirst:
    'Most of what would help here is not code. A missing word is one line in a text file, a useful bug report is three lines, and four platforms have nobody on them at all.',

  blocks: [
    {
      kind: 'steps',
      id: 'start-this-afternoon',
      heading: 'Three things you could do this afternoon',
      items: [
        {
          heading: 'Add a word the keyboard does not know',
          body: 'The loanword list is two columns, Bangla then English: <span lang="bn">অ্যাকাউন্ট</span> beside <code>account</code>. English enters Bangla faster than any list keeps up with, and one line in <code>en_bn_loanwords.tsv</code> adds one. This is the easiest first contribution in the project.',
        },
        {
          heading: 'Report a word that comes out wrong',
          body: 'Three lines: the Roman you typed, the Bangla you got, the Bangla you wanted. A report in that shape usually becomes a test the same week.',
        },
        {
          heading: 'Type on a phone nobody here has',
          body: 'Say what device, what iOS version, and what app. The bugs that survive to release are the ones that only happen on somebody else’s phone.',
        },
      ],
      after:
        'Everything is on GitHub under <a href="https://github.com/nsssayom">github.com/nsssayom</a>, and all of it is MIT licensed.',
    },

    {
      kind: 'cards',
      layout: 'rows',
      id: 'the-platforms-that-need-someone',
      heading: 'Take a platform nobody has started',
      intro:
        'Linux, Android, Windows and ChromeOS are marked Coming across this site, and coming means nobody has started them. No dates, no repositories, no work in progress. Each one is yours if you want it.',
      items: [
        {
          name: 'Linux',
          meta: 'IBus or Fcitx5',
          body: 'This is two jobs. X11 and Wayland handle text input differently enough that finishing one does not hand you the other. It is the same C ABI the Apple apps call, so the Rust underneath is a header and a link step.',
        },
        {
          name: 'Android',
          meta: 'InputMethodService, JNI',
          body: 'A keyboard drawn from nothing, over a JNI layer on the ABI. The engine README already lists an Android keyboard among the callers the <code>cabi</code> feature is for. The largest of the four by some distance, and nearly all of that size is the keyboard rather than the engine under it.',
        },
        {
          name: 'Windows',
          meta: 'TSF text service',
          body: 'Plus the parts nobody enjoys: an installer, code signing, and getting a text service to behave in applications older than the framework it belongs to.',
        },
        {
          name: 'ChromeOS',
          meta: 'IME API extension',
          body: 'Nothing to link at all: the engine already runs in a browser, and the box on the <a href="/guide/#try">guide page</a> is an optimized WebAssembly build of about 390 KB. The smallest of the four.',
        },
      ],
      after:
        'None of the four is a transliteration problem: the engine is written and tested, and you reach it through a stable C ABI. Open an issue and say which platform before you start. That is not to ask permission; it is so two people do not spend three months on the same keyboard, and so the repository is public from its first commit.',
    },

    {
      kind: 'prose',
      id: 'reporting-something-that-is-wrong',
      heading: 'Find out which part is wrong',
      body: [
        'Type the same thing somewhere else and the answer falls out. If a letter is wrong, use the box on the <a href="/guide/#try">guide page</a>: it runs the deterministic core compiled to WebAssembly, the same rules the keyboard runs, so a wrong letter there is the engine.',
        'The box stops at the letters. If the letters are right and a correction or a next-word suggestion is wrong, the <a href="https://sayom.me/obadh_engine/">engine playground</a> runs that layer too. If both are right and the app still gets it wrong, it is the app.',
      ],
      after:
        'Then file it in the repository that owns it. <a href="#the-repositories">The list is at the foot of this page</a>, and if you are not sure, file it against the app you were using. Moving an issue is easier than writing it twice.',
    },

    {
      kind: 'facts',
      id: 'what-to-put-in-it',
      heading: 'Write a report someone can reproduce',
      items: [
        {
          term: 'The Roman',
          value:
            'Exactly what you typed. This is the part people leave out, and without it there is nothing to reproduce.',
        },
        {
          term: 'What came out',
          value:
            'Pasted, not photographed. A screenshot of Bangla cannot be copied into a test, though a screenshot is the right thing for anything about layout or spacing.',
        },
        { term: 'What you wanted', value: 'The Bangla you expected instead.' },
        {
          term: 'Where',
          value:
            'The app, the device and the OS version. On iPhone and iPad, the About screen in the Obadh app has a Copy Build Details button, and that is what to paste.',
        },
      ],
    },

    {
      kind: 'code',
      id: 'working-on-the-code',
      heading: 'Build the engine in five commands',
      intro: 'The engine is Rust and builds on its own.',
      lines: [
        'git clone https://github.com/nsssayom/obadh_engine',
        'cd obadh_engine',
        './init.sh',
        'cargo test',
        "cargo run --features cli --bin obadh -- 'aji e probhate robir kor'",
      ],
    },

    {
      kind: 'prose',
      body: [
        '<code>init.sh</code> pulls the data submodules and the Git LFS objects, which is where the lexicon and the model artifacts live. Both apps need more of a toolchain: Xcode, XcodeGen, and a Rust toolchain that can build the static library the Swift side links. <code>./scripts/bootstrap.sh</code> in either app repo does the setup, and <a href="/about/#how-it-is-built">how the pieces fit together</a> is worth ten minutes before the first pull request.',
        'Two things in the tree will cost you an afternoon if nobody warns you. The Xcode projects are generated from <code>project.yml</code>, so edits to the <code>.xcodeproj</code> are thrown away the next time anyone runs XcodeGen. And on macOS, do not delete and recopy the installed input-method bundle, and do not launch it with <code>open</code>: either one eventually swallows every keystroke until you repair it. Both are hazards of doing by hand what the installer does properly.',
        'What gets a change merged is a test, and the habits are already in the tree to copy. A change to the deterministic core will get more questions than any other kind, because the rule you are changing is a rule somebody’s fingers already know, on every platform at once. Bring the reason: what a native speaker expects, what the orthography says, what it costs at the keyboard.',
      ],
    },

    {
      kind: 'cards',
      id: 'words-spelling-and-the-work-that-needs-a-bangla-speaker',
      heading: 'Work for a Bangla speaker',
      intro:
        'A person who knows how Bangla is spelled can fix in an afternoon what a programmer cannot fix at all. Most of it is a text file and a pull request.',
      items: [
        {
          name: 'The lexicon',
          meta: 'obadh_autocorrect_dataset',
          body: '845,461 Bangla entries with frequencies, built from curated EPUBs, Bangla Wikipedia and Bangla newspapers and then filtered. Corpora carry their own misspellings, their own OCR damage and their own gaps: names, dialect words, anything that entered the language recently. Autocorrect is only as good as this file.',
        },
        {
          name: 'The loanword list',
          meta: 'lexicons/loanwords/en_bn_loanwords.tsv',
          body: '1,815 entries resolving to 1,776 distinct English keys, because a few dozen English words have more than one Bangla spelling that people actually write. <span lang="bn">অ্যাডাপ্টার</span> sits beside <code>adapter</code>; if the spelling you use is missing, it is one more line.',
        },
        {
          name: 'Emoji keywords',
          meta: 'obadh-ios',
          body: 'Unicode’s CLDR is descriptive, so its Bangla annotation for the heart is <span lang="bn">হার্ট</span>. People type <span lang="bn">ভালোবাসা</span>. The curated map takes only words where a native speaker would expect one specific emoji and no other, which makes every entry a judgment call, and each spelling needs its own line.',
        },
        {
          name: 'The rules themselves',
          meta: 'data/rules/',
          body: '<code>data/conjuncts.csv</code> carries 352 conjuncts with their components and an example word each. If you think a rule is wrong, that is a bug report with a linguistics argument attached, and it is welcome. Aliases are not added because another keyboard accepts them.',
        },
        {
          name: 'The apps in Bangla',
          meta: 'obadh-ios, obadh-macos',
          body: 'Neither app has a Bangla interface yet: the setup screens, the settings rows and the buttons are all English. Every page of this site was written as Bangla instead of translated into it, machine-translated pages are not published, and the apps’ strings need the same hand.',
        },
        {
          name: 'Design',
          meta: 'everything except the keyboard',
          body: 'The emoji panel, the containing app and this website are open, and each of the four platforms above arrives with an interface to draw from nothing. The keyboard itself is the exception: its geometry and colour are pinned by measurement, so a proposal that moves them needs the measurement that justifies it.',
        },
      ],
    },

    {
      kind: 'cards',
      layout: 'rows',
      id: 'the-repositories',
      heading: 'Where everything lives',
      intro: 'Five repositories, and the line under each one says what belongs in it.',
      items: [
        {
          name: 'obadh_engine',
          href: LINKS.github.engine,
          body: 'The Rust engine, and the part every platform shares. Transliteration, the writing scheme and autocorrect ranking are bugs here, along with the rule sources, the C ABI, the command-line tools and the WebAssembly playground.',
        },
        {
          name: 'obadh-ios',
          href: LINKS.github.ios,
          body: 'The iPhone and iPad keyboard, and the app that sets it up. Anything you can see or touch on a phone: the layout, key sizes, the suggestion strip, the emoji panel, haptics, the setup flow.',
        },
        {
          name: 'obadh-macos',
          href: LINKS.github.macos,
          body: 'The macOS input method. The underlined text before you commit, the candidate bar and where it sits, input-source registration, the disk image.',
        },
        {
          name: 'obadh_autocorrect_dataset',
          href: 'https://github.com/nsssayom/obadh_autocorrect_dataset',
          body: 'The lexicons, the loanword list, and the FST artifacts built from them. A wrong or missing word belongs here. Data only, no code.',
        },
        {
          name: 'obadh_autosuggest_dataset',
          href: 'https://github.com/nsssayom/obadh_autosuggest_dataset',
          body: 'The sentence corpus, the vocabulary, and the next-word models.',
        },
      ],
      after:
        'The <a href="https://sayom.me/obadh_engine/">engine playground</a> runs the autocorrect and suggestion layers as well as the deterministic core, which the box on the guide page does not.',
    },

    {
      kind: 'prose',
      id: 'where-to-talk',
      heading: 'Before you file, and after',
      body: [
        // LINKS.discord is a marked placeholder in src/config.ts. The invite is
        // created before launch; the copy below already says the room is new.
        `Some questions are faster asked than filed: whether something is a bug or a typing habit, what a rule was supposed to do, whether anyone has started on Android. Ask them in the <a href="${LINKS.discord}">Discord</a>. The server is new and the apps are at 0.1.0, so expect a quiet room rather than a crowd.`,
        'GitHub issues are the record, and questions are fine there too. An issue that turns out not to be a bug has still told the project that something was unclear, and unlike a message in a chat it is still findable in a year.',
        'Reviews can be slow. An issue can sit for a month, usually because the person who read it was deep in something else. What you get back is a project that fits in your head: one engine, two apps so far, a couple of data repositories, and no framework you have to learn before you can read the code. A rule you fix reaches every platform at once, because there is one implementation of it.',
      ],
    },
  ],
};
