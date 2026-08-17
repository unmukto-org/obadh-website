import type { FaqContent } from '../types';

/**
 * The rule on this page: `lead` is the answer. Yes, no, completely, three,
 * GitHub. `answer` is at most one short paragraph under it, and most entries
 * would be better without even that.
 *
 * Lead and answer are also the FAQPage structured data, joined in that order,
 * so nothing here may be shortened for one audience only.
 *
 * The standfirst counts the entries. Add or remove one and the number changes.
 *
 * Two rules this page kept getting wrong. It does not explain the architecture:
 * the Rust engine, the C ABI and the lexicon internals are on /about/, where a
 * person who came looking for them will find them. And it does not explain
 * phonetic typing, whoever is reading this has typed Bangla by sound for
 * years. What belongs here is what is specific to Obadh and checkable against
 * the repositories.
 */
export const faq: FaqContent = {
  meta: {
    title: 'Bangla keyboard questions, answered',
    description:
      'Is it free, does it work offline, does anything you type leave your device, how to type conjuncts, and keeping the keyboard you already use.',
    ogImage: 'faq.png',
    ogImageAlt:
      'The Roman string aji e probhate robir kor above the Bangla it composes, আজি এ প্রভাতে রবির কর',
  },

  eyebrow: 'FAQ',
  heading: 'Questions about typing Bangla with Obadh',
  standfirst:
    'Fifteen questions, each answered in its first line. If yours is not here, the <a href="/guide/">writing guide</a> has the whole scheme and <a href="/download/">the download page</a> has the install steps.',

  groups: [
    {
      id: 'cost-and-privacy',
      heading: 'Cost, privacy, and what it needs',
      items: [
        {
          id: 'cost',
          question: 'Is Obadh free?',
          lead: 'Yes. The keyboard is free to use, with no ads and no account to make.',
          answer: [
            'The engine, the apps built on it and the scripts that build them are all MIT licensed, so anyone can read the source, change it, or ship their own version, including for a platform Obadh has not reached yet. <a href="/about/#the-license">What the license lets you do</a> is on the about page.',
          ],
        },
        {
          id: 'privacy',
          question: 'Does anything I type leave my device?',
          lead: 'No.',
          answer: [
            'Transliteration, corrections, next-word suggestions and emoji search all happen inside the keyboard. There is no account, no sync, no telemetry, and the keyboard has no networking code in it. <a href="/privacy/">What Obadh does with your typing</a> names the file behind each of those claims, and shows you how to check them in a clone.',
          ],
        },
        {
          id: 'offline',
          question: 'Does Obadh work without an internet connection?',
          lead: 'Completely.',
          answer: [
            'Turn off Wi-Fi and mobile data and nothing about typing changes: the rules, the 845,461-word dictionary and, on iPhone and iPad, the next-word model are all inside the app already.',
          ],
        },
        {
          id: 'full-access',
          question: 'Why does the iOS keyboard ask for Full Access, and what if I say no?',
          lead: 'For two things: the tap you feel under your finger, and the settings you chose in the Obadh app.',
          answer: [
            'Say no and the keyboard still works. You type, the Bangla appears, corrections and suggestions come. What you lose is the haptics, any setting you change in the app, and the words it would have learned from you. The <a href="/download/#turning-it-on">install steps</a> say where the switch is.',
          ],
        },
      ],
    },

    {
      id: 'coming-from-another-keyboard',
      heading: 'Coming from another keyboard',
      items: [
        {
          id: 'avro-scheme',
          question: 'Can I type in Obadh the way I type in Avro?',
          lead: 'Almost. Four things are spelled differently: long vowels, the diphthongs, a bare <code>w</code>, and <span lang="bn">খণ্ড ত</span>.',
          answer: [
            'The guide keeps all four in <a href="/guide/#from-avro">one section</a>, and <a href="/guide/#traps">the ones people trip on</a> are near the top of the page.',
          ],
        },
        {
          id: 'why-another',
          question: 'Why build another Bangla keyboard when Avro exists?',
          lead: 'So you can type Bangla the same way on every device you own, from something anyone is free to read, change and build on.',
          answer: [
            'Avro made writing Bangla by sound ordinary, and that part is not up for revisiting. But a keyboard has to be written again for every platform it reaches. <a href="/about/#where-it-came-from">Where it came from</a> is the longer answer, including what the two projects do and do not share.',
          ],
        },
        {
          id: 'bijoy',
          question: 'I type Bijoy at work. Is Obadh any use to me?',
          lead: 'Keep Bijoy for that work.',
          answer: [
            'Someone trained on a fixed layout, typing all day, is faster than almost anyone typing by sound, and Bijoy is what offices, newsrooms and job-exam typing tests are set on. Obadh is for the rest of your typing, on whatever device is in front of you. On a Mac the two are input sources in the same list.',
          ],
        },
        {
          id: 'regional-spelling',
          question: 'I write Bangla in West Bengal, not Bangladesh. Is this scheme for me?',
          lead: 'Yes. Obadh composes whatever you spell, and the part that turns your letters into Bangla holds no dictionary at all.',
          answer: [
            'Corrections are the part that leans: they are built from Bangla Wikipedia, curated books and the archive of a Bangladeshi newspaper. Nothing is inserted for you unless you switch that on, and picking your own spelling out of the strip once protects it. A word that is missing, or ranked wrongly, is one line in <a href="https://github.com/unmukto-org/obadh_autocorrect_dataset">obadh_autocorrect_dataset</a>.',
          ],
        },
      ],
    },

    {
      id: 'typing-with-it',
      heading: 'Typing with it',
      items: [
        {
          // The Bangla word in this question is rendered as plain text by the
          // JSON-LD, which is what the `name` value needs.
          id: 'conjuncts',
          question: 'How do I type <span lang="bn">যুক্তাক্ষর</span>?',
          lead: 'Type the consonants in a row and Obadh joins them: <code>kt</code> gives <span lang="bn">ক্ত</span>, <code>ndr</code> gives <span lang="bn">ন্দ্র</span>, three consonants and all.',
          answer: [
            'To keep two apart, put an <code>o</code> between them, so <code>kk</code> is <span lang="bn">ক্ক</span> and <code>kok</code> is <span lang="bn">কক</span>. Reph is a doubled r before the letter it sits over: <code>rrk</code> gives <span lang="bn">র্ক</span>. The guide has <a href="/guide/#conjuncts">the conjuncts</a>, <a href="/guide/#reph">reph</a> and <a href="/guide/#phola">the phola marks</a> as full tables, and <a href="/guide/#jna">the three ways to type <span lang="bn">জ্ঞ</span></a>.',
          ],
        },
        {
          id: 'english-words',
          question: 'What about English words mixed into Bangla?',
          lead: 'Just type them. <code>aYp</code> gives <span lang="bn">অ্যাপ</span>, <code>waTar</code> gives <span lang="bn">ওয়াটার</span>, <code>box</code> gives <span lang="bn">বক্স</span>.',
          answer: [
            'Autocorrect knows 1,776 English words in the spellings people really write, and <a href="/guide/#loanwords">loanwords</a> have a section of their own in the guide. If the English should stay in Latin letters, switch keyboards and come back; a word you left half-finished is still where you left it.',
          ],
        },
        {
          id: 'autocorrect-default',
          question: 'Why is autocorrect off by default?',
          lead: 'Because a keyboard that changes a word you meant costs you more than one that leaves a typo alone.',
          answer: [
            'You still get the corrections: they sit next to what you typed, and taking one is a tap. Turn on auto-insert and the space bar takes the correction for you, but only when what you typed is not a word at all, or is rare enough that the correction is fifty times more common.',
          ],
        },
        {
          id: 'any-app',
          question: 'Can I use Obadh in any app?',
          lead: 'Yes. Messages, mail, notes, browsers, editors, anywhere the system lets a keyboard in.',
          answer: [
            'Obadh installs as a system input method, not as an app you type inside, so there is nothing to open first and nothing to paste out of. Two exceptions belong to iOS rather than to Obadh: secure fields always bring up the system keyboard, and an app is allowed to refuse third-party keyboards outright, which some banking apps do.',
          ],
        },
      ],
    },

    {
      id: 'devices-and-the-project',
      heading: 'Devices, and the project',
      items: [
        {
          id: 'mac',
          question: 'I want to type Bangla on my Mac. What are my options?',
          lead: 'Three, and you can keep more than one.',
          answer: [
            'Obadh is an input source for macOS 15 or later; OmicronLab’s iAvro carries the Avro Phonetic scheme and lists macOS 10.15 as the newest system it supports; Lekho is open source and built on OpenBangla’s riti engine. macOS holds as many input sources as you like, so adding one takes nothing away. The <a href="/download/#macos">install steps</a> are on the download page.',
          ],
        },
        {
          id: 'other-platforms',
          question: 'When will there be a Linux, Windows or Android version?',
          lead: 'No dates, and none of the four has been started in the open yet.',
          answer: [
            'iPhone, iPad and Mac are what you can install today. Each of the others needs an input method written against its own framework, and that is <a href="/download/#other-platforms">most of the work</a>. In the meantime, on Linux, OpenBangla Keyboard is free software and carries Avro Phonetic alongside Probhat, Munir Optima and Jatiya.',
          ],
        },
        {
          id: 'bugs-and-help',
          question: 'I found a bug, or I want to work on this. Where do I go?',
          lead: 'GitHub, in the repository that owns the problem.',
          answer: [
            '<a href="https://github.com/unmukto-org/obadh_engine">obadh_engine</a> for a wrong letter or a rule that misfires, <a href="https://github.com/unmukto-org/obadh-ios">obadh-ios</a> for the keyboard, <a href="https://github.com/unmukto-org/obadh-macos">obadh-macos</a> for the Mac input method. <a href="/contribute/">Where to start</a> has the rest, including <a href="/contribute/#reporting-something-that-is-wrong">a test that tells you which repository</a> a problem belongs to.',
          ],
        },
      ],
    },
  ],
};
