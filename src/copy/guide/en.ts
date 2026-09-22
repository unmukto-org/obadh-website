import type { GuideContent } from '../types';

export const guide: GuideContent = {
  meta: {
    title: 'How to type Bangla in Roman letters',
    description:
      'Every Roman spelling and the Bangla you get from it: vowels, consonants, conjuncts such as ঞ্জ and ক্ষ, reph, chandrabindu, Bangla numerals and the dari.',
    ogImage: 'guide.png',
    ogImageAlt: 'Two pairs from the scheme: the Roman string rrkSh above র্ক্ষ, and NGj above ঞ্জ',
  },

  // The eyebrow is the page's nav label, per copy-shared.md §3. The label in
  // src/i18n/ui.ts is `Writing guide`, which is also what every page calls this
  // one in prose, and লেখার নিয়ম on the Bangla side is the same word in both
  // places. The draft's shorter `Guide` left the two languages out of step.
  eyebrow: 'Writing guide',
  heading: 'How to type Bangla in Roman letters',

  /*
    The way in, for someone who came to look one thing up. This is a reference
    people type from, so the page opens with the filter, the index and the
    three rules the tables rest on, and gets out of the way. Nothing here sells
    phonetic typing to a person who has typed this way since school, and
    nothing here explains how the engine is put together, that is /about/.
  */
  standfirst:
    'Every pair here comes out of the engine itself, so the page documents what the keyboard does. <a href="/about/#how-it-is-built">Why the scheme is built this way</a> is on the about page.',

  /* No second opening. The heading names the page and the standfirst carries
     the one fact a reader needs before the tables; anything more is a paragraph
     between them and what they came to look up. */
  intro: [],

  /*
    The three rules that account for most of what surprises people, shown as
    pairs rather than explained as prose. `keys` are looked up in
    src/data/scheme.ts, so the Bangla beside them is the same verified string
    the table below prints.
  */
  rules: [
    { heading: 'Lowercase is short, uppercase is long', keys: ['i', 'I'] },
    { heading: 'Consonants that meet bind', keys: ['kt', 'kk'] },
    { heading: '<code>o</code> keeps them apart', keys: ['kok', 'amora'] },
  ],

  sections: [
    {
      group: 'first-words',
      heading: 'Start with these nine',
      short: 'First nine',
      body: [
        'These nine cover most ordinary typing. The rest of the page is reference.',
      ],
    },

    {
      group: 'traps',
      heading: 'Spellings that catch people out',
      short: 'Traps',
      body: [
        'Every one of these gives you real Bangla. That is what makes them awkward: nothing has gone wrong, you have just been handed a different letter from the one you meant.',
        'Length is a capital, never a repeat: <code>aa</code> is <span lang="bn">আআ</span>. And lowercase <code>boi</code> is <span lang="bn">বই</span> where uppercase <code>bOI</code> is <span lang="bn">বৈ</span>.',
      ],
    },

    {
      group: 'vowels',
      heading: 'Vowels on their own',
      short: 'Vowels',
      body: [
        'The shape a vowel takes at the start of a word, or standing alone.',
        'The capital carries meaning in <code>i</code>/<code>I</code>, <code>u</code>/<code>U</code> and <code>o</code>/<code>O</code>. In <code>a</code> and <code>e</code> it does not; the uppercase is accepted because people type it that way.',
      ],
    },

    {
      group: 'kars',
      heading: 'Vowels after a consonant',
      short: 'Vowel signs',
      body: [
        'The same vowels, attached. <span lang="bn">ক</span> is the carrier here; every consonant behaves the same way.',
        'A consonant on its own already carries the inherent <span lang="bn">অ</span>. You type something to get rid of that vowel, not to get it.',
      ],
    },

    {
      group: 'consonants',
      heading: 'Consonants',
      short: 'Consonants',
      body: [
        'Grouped the way Bangla groups them, so the pattern shows: unaspirated, aspirated, and the nasal at the end of each row of five.',
        'Lowercase is dental or palatal, uppercase retroflex. An <code>h</code> aspirates, so <code>k</code> is <span lang="bn">ক</span> and <code>kh</code> is <span lang="bn">খ</span>.',
        'Two letters do double duty: <code>y</code> and <code>w</code> stand alone here and turn into phola marks after a consonant, which is its own section below.',
      ],
    },

    {
      group: 'shortcuts',
      heading: 'Shortcuts, and what capitals do',
      short: 'Shortcuts',
      body: [
        '<code>f</code> stands in for <code>ph</code>, <code>v</code> for <code>bh</code>, <code>S</code> for <code>sh</code>. People type them that way, so they are in the scheme.',
        'Phones capitalize the first letter of a sentence whether or not you asked, so a capital with no meaning of its own falls back to its lowercase reading. Eleven carry a meaning instead, and two of those catch people: <code>R</code> is <span lang="bn">ড়</span> where <code>r</code> is <span lang="bn">র</span>, and <code>C</code> is one of the ways to write <code>ch</code>.',
      ],
    },

    {
      group: 'inherent-o',
      heading: 'The inherent vowel, and when to type <code>o</code>',
      short: 'Inherent vowel',
      body: [
        'Between two consonants, <code>o</code> keeps them apart: <code>kok</code> is <span lang="bn">কক</span> where <code>kk</code> is <span lang="bn">ক্ক</span>. Before a cluster it is the inherent vowel of the letter in front of it.',
        'For a visible <span lang="bn">ও</span> there instead, use the capital: <code>kOk</code> is <span lang="bn">কোক</span>.',
      ],
    },

    {
      group: 'conjuncts',
      heading: 'Conjuncts (<span lang="bn">যুক্তবর্ণ</span>)',
      short: 'Conjuncts',
      body: [
        'Type the consonants in order and the hasant is implied. Three in a row need nothing special either: <code>ndr</code> is <span lang="bn">ন্দ্র</span>.',
        'An <code>o</code> ends a cluster the same way it keeps two consonants apart, so <code>ndor</code> is <span lang="bn">ন্দর</span>.',
      ],
    },

    {
      group: 'phola',
      heading: '<span lang="bn">য-ফলা</span> and <span lang="bn">ব-ফলা</span>',
      short: 'Phola',
      body: [
        'The two phola marks are <code>y</code> and <code>w</code>, and they act as phola only when a consonant comes before them. <code>z</code> and <code>b</code> stay the whole letters <span lang="bn">য</span> and <span lang="bn">ব</span>, so you can write <span lang="bn">য্য</span> as <code>zy</code>.',
        'The ya-phola composes onto a whole cluster, so loanwords work: <code>plYan</code> is <span lang="bn">প্ল্যান</span>. Four bases refuse it: <code>r</code>, <code>R</code>, <code>Rh</code> and <code>Ng</code>.',
      ],
    },

    {
      group: 'reph',
      heading: 'Reph',
      short: 'Reph',
      body: [
        'A doubled <code>r</code> before a consonant writes the reph, the hook that sits above the letter. <code>rm</code> is <span lang="bn">রম</span>, two letters; <code>rrm</code> is <span lang="bn">র্ম</span>, one.',
        'It will sit over a whole cluster too, so <code>rrkSh</code> gives <span lang="bn">র্ক্ষ</span>.',
      ],
    },

    {
      group: 'nasals',
      heading: 'Anusvar, <span lang="bn">ঙ</span>, and the rest of the nasals',
      short: 'Nasals',
      body: [
        '<code>ng</code> is the anusvar <span lang="bn">ং</span> before a consonant and at the end of a word: <code>bangla</code> gives <span lang="bn">বাংলা</span> and <code>rong</code> gives <span lang="bn">রং</span>. Before a vowel it is the velar nasal carrying that vowel, so <code>bhanga</code> gives <span lang="bn">ভাঙা</span> and <code>rongin</code> gives <span lang="bn">রঙিন</span>. <code>Ng</code> is <span lang="bn">ঙ</span> in every position, and <code>ngg</code> and <code>nggh</code> are shorthand for the clusters <span lang="bn">ঙ্গ</span> and <span lang="bn">ঙ্ঘ</span>.',
        'Where that shorthand is not what you want, a capital <code>M</code> forces a literal anusvar. <span lang="bn">ঞ্জ</span> is <code>nj</code>.',
      ],
    },

    {
      group: 'jna',
      heading: '<span lang="bn">জ্ঞ</span>',
      short: '<span lang="bn">জ্ঞ</span>',
      body: [
        'Written <span lang="bn">জ</span> plus <span lang="bn">ঞ</span> and pronounced like neither, so there are three ways in and all three land in the same place. Spell it out as <code>jNG</code>, shorten it to <code>jn</code>, or type the sound most people actually make, <code>gg</code>.',
      ],
    },

    {
      group: 'marks',
      heading: 'Chandrabindu and bisarga',
      short: 'Chandrabindu',
      body: [
        '<code>^</code> writes the chandrabindu and goes after the vowel it nasalizes. <code>qq</code> is a second route to the same mark.',
        '<code>:</code> writes the bisarga beside a letter or at a word edge, so <code>du:kho</code> gives <span lang="bn">দুঃখ</span>. Between two digits it stays an ordinary colon, which is what lets a clock time survive: <code>9:45</code> gives <span lang="bn">৯:৪৫</span>.',
      ],
    },

    {
      group: 'numerals',
      heading: 'Bangla numerals, the taka sign, and the dari',
      short: 'Numerals',
      body: [
        'Latin digits become Bangla numerals, and the dollar key writes the taka sign.',
        'The full stop gets it right without being told: between digits it stays a decimal point, at the end of a sentence it becomes the dari. Numerals take no vowel marks and join no conjuncts.',
      ],
    },

    {
      group: 'loanwords',
      heading: 'English letters and loanwords',
      short: 'Loanwords',
      body: [
        '<code>q</code> and <code>x</code> have no Bangla sound of their own, and neither is left as Latin. Each takes the convention Bangla writing already settled on: <code>q</code> is <span lang="bn">ক</span> and <code>x</code> is the <span lang="bn">ক্স</span> cluster.',
        'Standing alone, <code>w</code> is the <span lang="bn">ওয়</span> glide, and <code>aY</code> is the <span lang="bn">অ্যা</span> most borrowed words need.',
        // The two Bangla strings below differ by one U+200C: র‌্য carries the ZWNJ, র্য does not.
        '<code>rZy</code> is a narrow signal with one job. It writes the ZWNJ-separated <span lang="bn">র‌্য</span> used in spellings like <span lang="bn">র‌্যাব</span>, which is a different shape from the true conjunct <span lang="bn">র্য</span>. Elsewhere a stray <code>Z</code> folds to <span lang="bn">য</span>, so <code>namaZ</code> gives <span lang="bn">নামায</span>.',
      ],
    },

    {
      group: 'hasant',
      heading: 'Writing the hasant yourself',
      short: 'Hasant',
      body: [
        'Two commas write a bare hasant, for when you want the mark visible or want a boundary the automatic rules would not choose.',
        'A hasant kills the inherent vowel, so it needs one to kill. After an explicit kar there is nothing left to remove and the signal is dropped.',
      ],
    },

    {
      group: 'khanda-ta',
      heading: '<span lang="bn">খণ্ড ত</span>',
      short: '<span lang="bn">খণ্ড ত</span>',
      body: [
        'You will rarely type this one by hand, because <code>ts</code> already composes it. Reach for the explicit form at the end of a word, where nothing follows to trigger it: <code>t</code> and two backticks.',
      ],
    },
  ],

  columnHeads: { roman: 'Type', bangla: 'You get', note: 'Note' },

  /*
    Labels for the controls, not copy. The placeholder stays ASCII: it sits in
    a monospaced field, and Bangla in that face has nothing to fall back on.
  */
  tools: {
    indexHeading: 'On this page',
    filterLabel: 'Filter the scheme',
    filterPlaceholder: 'kSh',
    count: '{shown} of {total}',
    empty: 'Nothing matches {query}.',
    clear: 'Clear',
    copy: 'Copy',
    copied: 'Copied',
  },

  fromAvro: {
    heading: 'If you are coming from Avro',
    short: 'From Avro',
    body: [
      'Most people reading this learned to type Bangla on Avro Phonetic, and most of what you know transfers unchanged, including <code>x</code>, <code>q</code>, <code>v</code>, <code>f</code>, <code>S</code>, <code>gg</code>, <code>ng</code> and <code>NG</code>, the <code>$</code> taka sign, the <code>^</code> chandrabindu, the <code>,</code> hasant, and a full stop at the end of a sentence. Consonants that meet still bind, <code>o</code> still writes the inherent vowel, and a doubled <code>r</code> still writes the reph. Avro settled most of it, and what Avro settled is now simply how Bangla is typed.',
      'Four things are spelled differently. An alias is added to the scheme only where there is a phonetic, orthographic or ergonomic reason for it, so the list is short.',
      '<strong>Long vowels are capitals, not doubled letters.</strong> Avro Phonetic maps <code>ee</code> to <span lang="bn">ঈ</span> and <code>oo</code> to <span lang="bn">উ</span>. Obadh reads a doubled vowel as two vowels, so <span lang="bn">ঈ</span> is <code>I</code> and <span lang="bn">ঊ</span> is <code>U</code>. This is the habit worth changing first: it is the one that bites inside the first sentence.',
      '<strong>The diphthongs are capitals too.</strong> <code>OI</code> is <span lang="bn">ঐ</span> and <code>OU</code> is <span lang="bn">ঔ</span>. Lowercase <code>oi</code> is two vowels in a row, so <code>boi</code> is <span lang="bn">বই</span> and <code>bOI</code> is <span lang="bn">বৈ</span>.',
      '<strong>On its own, <code>w</code> is <span lang="bn">ওয়</span>.</strong> That is what loanwords want: <code>waTar</code> is <span lang="bn">ওয়াটার</span>. Avro Phonetic maps a bare <code>w</code> to <span lang="bn">ও</span>. After a consonant the two agree, and <code>kw</code> is <span lang="bn">ক্ব</span> in both.',
      '<strong><span lang="bn">খণ্ড ত</span> has its own signal.</strong> Inside a word a <code>t</code> before an <code>s</code> composes it. Where it ends a word, type <code>t</code> and two backticks: <code>hoThat``</code> is <span lang="bn">হঠাৎ</span>.',
      'Avro behavior here was read from OmicronLab’s pyAvroPhonetic in August 2026. Avro Phonetic has no published specification, so this describes that rule set and not every keyboard that has adopted the scheme.',
    ],
  },

  // Rendered as the last paragraph of the from-avro section, which is where the
  // draft puts it. Nothing here may read as a correction of Avro.
  closing:
    'Obadh is not Avro-compatible and does not claim to be. If a word comes out in a shape you did not expect, this page is the reference, and the whole scheme is short enough to read in one sitting.',

  // #strict and #try. GuidePage.astro renders both, and /contribute/ links to
  // /guide/#try, so that id has to stay on the typing box.
  strict: {
    heading: 'If the box hands your letters back unchanged',
    short: 'Unchanged',
    id: 'strict',
    body: [
      'The box changes a whole line or none of it. One character it does not accept, and the line comes back exactly as you typed it. The usual cause is punctuation a phone or a word processor put in for you: the em dash, the en dash, curly quotation marks, the single-character ellipsis. Plain ASCII punctuation is fine.',
      'You will not meet this while typing on the keyboard, which commits one word at a time and takes punctuation separately. It shows up in the box above, in the playground, and in anything scripted around the command-line tool.',
    ],
  },

  tryIt: {
    heading: 'Try it',
    short: 'Try it',
    id: 'try',
    body: [
      'The real engine, running in your browser. It follows the rules on this page and nothing else: no corrections, no next-word suggestions, and nothing you type goes anywhere.',
      'The engine’s own playground, which adds corrections and next-word suggestions on top, is at <a href="https://obadh.unmukto.org/playground/">obadh.unmukto.org/playground</a>. If something here gives you a letter you did not expect, <a href="/contribute/#reporting-something-that-is-wrong">what makes a report reproducible</a> is on the contribute page.',
    ],
  },
};
