/**
 * The writing scheme, row by row.
 *
 * Every pair here came out of the engine, not from what the rules ought to do:
 *
 *   node --experimental-strip-types scripts/verify-scheme.mjs
 *
 * That runs all of them back through obadh_engine's release binary and fails
 * on the first disagreement. Run it after any engine bump, and never add a row
 * without running it. The guide is a reference people type from, so a wrong
 * row is worse than a missing one.
 */

export interface SchemeRow {
  roman: string;
  bangla: string;
  /** English gloss or rule note. */
  note: string;
  group: SchemeGroup;
}

export type SchemeGroup =
  | 'first-words'
  | 'vowels'
  | 'kars'
  | 'consonants'
  | 'shortcuts'
  | 'inherent-o'
  | 'conjuncts'
  | 'phola'
  | 'reph'
  | 'hasant'
  | 'khanda-ta'
  | 'nasals'
  | 'jna'
  | 'marks'
  | 'numerals'
  | 'loanwords'
  | 'traps';

export const SCHEME_ROWS: SchemeRow[] = [
  {
    roman: "ami",
    bangla: "আমি",
    note: "I",
    group: "first-words"
  },
  {
    roman: "tumi",
    bangla: "তুমি",
    note: "you; t is dental <span lang='bn'>ত</span>, T would be retroflex <span lang='bn'>ট</span>",
    group: "first-words"
  },
  {
    roman: "bangla",
    bangla: "বাংলা",
    note: "Bangla; ng is the anusvar <span lang='bn'>ং</span>",
    group: "first-words"
  },
  {
    roman: "bhaSha",
    bangla: "ভাষা",
    note: "language; Sh is <span lang='bn'>ষ</span>, sh is <span lang='bn'>শ</span>",
    group: "first-words"
  },
  {
    roman: "boi",
    bangla: "বই",
    note: "book; lowercase oi is not <span lang='bn'>ঐ</span>, so this is <span lang='bn'>ব</span> + <span lang='bn'>ই</span>",
    group: "first-words"
  },
  {
    roman: "bhat",
    bangla: "ভাত",
    note: "rice; bh is <span lang='bn'>ভ</span>, and v works too",
    group: "first-words"
  },
  {
    roman: "bhalObasa",
    bangla: "ভালোবাসা",
    note: "love; O is the long <span lang='bn'>ও</span>, so bhalO gives <span lang='bn'>ভালো</span>",
    group: "first-words"
  },
  {
    roman: "dhonyobad",
    bangla: "ধন্যবাদ",
    note: "thank you; ny binds into the <span lang='bn'>ন্য</span> cluster",
    group: "first-words"
  },
  {
    roman: "bhaSha hOk aroO unmukt",
    bangla: "ভাষা হোক আরও উন্মুক্ত",
    note: "let the language be freer still",
    group: "first-words"
  },
  {
    roman: "o",
    bangla: "অ",
    note: "the inherent vowel, typed on its own",
    group: "vowels"
  },
  {
    roman: "a",
    bangla: "আ",
    note: "A gives the same letter",
    group: "vowels"
  },
  {
    roman: "A",
    bangla: "আ",
    note: "uppercase A is the same <span lang='bn'>আ</span>",
    group: "vowels"
  },
  {
    roman: "i",
    bangla: "ই",
    note: "short i",
    group: "vowels"
  },
  {
    roman: "I",
    bangla: "ঈ",
    note: "long i; capital letter, long vowel",
    group: "vowels"
  },
  {
    roman: "u",
    bangla: "উ",
    note: "short u",
    group: "vowels"
  },
  {
    roman: "U",
    bangla: "ঊ",
    note: "long u; capital letter, long vowel",
    group: "vowels"
  },
  {
    roman: "e",
    bangla: "এ",
    note: "E gives the same letter",
    group: "vowels"
  },
  {
    roman: "E",
    bangla: "এ",
    note: "uppercase E is the same <span lang='bn'>এ</span>",
    group: "vowels"
  },
  {
    roman: "OI",
    bangla: "ঐ",
    note: "capital O plus capital I",
    group: "vowels"
  },
  {
    roman: "O",
    bangla: "ও",
    note: "the long o",
    group: "vowels"
  },
  {
    roman: "OU",
    bangla: "ঔ",
    note: "capital O plus capital U",
    group: "vowels"
  },
  {
    roman: "rri",
    bangla: "ঋ",
    note: "vocalic r; one signal, not r plus r plus i",
    group: "vowels"
  },
  {
    roman: "aY",
    bangla: "অ্যা",
    note: "the <span lang='bn'>অ্যা</span> vowel; AY is the same",
    group: "vowels"
  },
  {
    roman: "AY",
    bangla: "অ্যা",
    note: "uppercase form of aY",
    group: "vowels"
  },
  {
    roman: "k",
    bangla: "ক",
    note: "a bare consonant already carries the inherent <span lang='bn'>অ</span>",
    group: "kars"
  },
  {
    roman: "ka",
    bangla: "কা",
    note: "the <span lang='bn'>আ-কার</span>",
    group: "kars"
  },
  {
    roman: "ki",
    bangla: "কি",
    note: "the <span lang='bn'>ই-কার</span>",
    group: "kars"
  },
  {
    roman: "kI",
    bangla: "কী",
    note: "the <span lang='bn'>ঈ-কার</span>",
    group: "kars"
  },
  {
    roman: "ku",
    bangla: "কু",
    note: "the <span lang='bn'>উ-কার</span>",
    group: "kars"
  },
  {
    roman: "kU",
    bangla: "কূ",
    note: "the <span lang='bn'>ঊ-কার</span>",
    group: "kars"
  },
  {
    roman: "ke",
    bangla: "কে",
    note: "the <span lang='bn'>এ-কার</span>",
    group: "kars"
  },
  {
    roman: "kOI",
    bangla: "কৈ",
    note: "the <span lang='bn'>ঐ-কার</span>",
    group: "kars"
  },
  {
    roman: "kO",
    bangla: "কো",
    note: "the <span lang='bn'>ও-কার</span>",
    group: "kars"
  },
  {
    roman: "kOU",
    bangla: "কৌ",
    note: "the <span lang='bn'>ঔ-কার</span>",
    group: "kars"
  },
  {
    roman: "krri",
    bangla: "কৃ",
    note: "the <span lang='bn'>ঋ-কার</span>",
    group: "kars"
  },
  {
    roman: "kaY",
    bangla: "ক্যা",
    note: "the <span lang='bn'>্যা</span> shape; kAY is the same",
    group: "kars"
  },
  {
    roman: "k",
    bangla: "ক",
    note: "ka",
    group: "consonants"
  },
  {
    roman: "kh",
    bangla: "খ",
    note: "kha; Kh and KH also work",
    group: "consonants"
  },
  {
    roman: "g",
    bangla: "গ",
    note: "ga",
    group: "consonants"
  },
  {
    roman: "gh",
    bangla: "ঘ",
    note: "gha; Gh and GH also work",
    group: "consonants"
  },
  {
    roman: "Ng",
    bangla: "ঙ",
    note: "the velar nasal, capital N plus g",
    group: "consonants"
  },
  {
    roman: "c",
    bangla: "চ",
    note: "ca; a single c, not ch",
    group: "consonants"
  },
  {
    roman: "ch",
    bangla: "ছ",
    note: "chha; chh, C, Ch, CH, Chh and CHH all work",
    group: "consonants"
  },
  {
    roman: "j",
    bangla: "জ",
    note: "ja; J also works",
    group: "consonants"
  },
  {
    roman: "jh",
    bangla: "ঝ",
    note: "jha; Jh and JH also work",
    group: "consonants"
  },
  {
    roman: "NG",
    bangla: "ঞ",
    note: "the palatal nasal, capital N plus capital G",
    group: "consonants"
  },
  {
    roman: "T",
    bangla: "ট",
    note: "retroflex ta; capital T",
    group: "consonants"
  },
  {
    roman: "Th",
    bangla: "ঠ",
    note: "retroflex tha; TH also works",
    group: "consonants"
  },
  {
    roman: "D",
    bangla: "ড",
    note: "retroflex da; capital D",
    group: "consonants"
  },
  {
    roman: "Dh",
    bangla: "ঢ",
    note: "retroflex dha; DH also works",
    group: "consonants"
  },
  {
    roman: "N",
    bangla: "ণ",
    note: "retroflex na; capital N",
    group: "consonants"
  },
  {
    roman: "t",
    bangla: "ত",
    note: "dental ta; lowercase t",
    group: "consonants"
  },
  {
    roman: "th",
    bangla: "থ",
    note: "dental tha",
    group: "consonants"
  },
  {
    roman: "d",
    bangla: "দ",
    note: "dental da; lowercase d",
    group: "consonants"
  },
  {
    roman: "dh",
    bangla: "ধ",
    note: "dental dha",
    group: "consonants"
  },
  {
    roman: "n",
    bangla: "ন",
    note: "dental na; lowercase n",
    group: "consonants"
  },
  {
    roman: "p",
    bangla: "প",
    note: "pa",
    group: "consonants"
  },
  {
    roman: "ph",
    bangla: "ফ",
    note: "pha; f also works",
    group: "consonants"
  },
  {
    roman: "b",
    bangla: "ব",
    note: "ba",
    group: "consonants"
  },
  {
    roman: "bh",
    bangla: "ভ",
    note: "bha; v also works",
    group: "consonants"
  },
  {
    roman: "m",
    bangla: "ম",
    note: "ma",
    group: "consonants"
  },
  {
    roman: "z",
    bangla: "য",
    note: "ya; z is the letter itself, y is the phola",
    group: "consonants"
  },
  {
    roman: "r",
    bangla: "র",
    note: "ra",
    group: "consonants"
  },
  {
    roman: "l",
    bangla: "ল",
    note: "la",
    group: "consonants"
  },
  {
    roman: "sh",
    bangla: "শ",
    note: "palatal sha; S also works",
    group: "consonants"
  },
  {
    roman: "Sh",
    bangla: "ষ",
    note: "retroflex sha; SH also works",
    group: "consonants"
  },
  {
    roman: "s",
    bangla: "স",
    note: "dental sa",
    group: "consonants"
  },
  {
    roman: "h",
    bangla: "হ",
    note: "ha",
    group: "consonants"
  },
  {
    roman: "R",
    bangla: "ড়",
    note: "the dotted ra",
    group: "consonants"
  },
  {
    roman: "Rh",
    bangla: "ঢ়",
    note: "the aspirated dotted ra",
    group: "consonants"
  },
  {
    roman: "y",
    bangla: "য়",
    note: "standalone, y is <span lang='bn'>য়</span>; after a consonant it is the ya-phola",
    group: "consonants"
  },
  {
    roman: "w",
    bangla: "ওয়",
    note: "standalone, w is the <span lang='bn'>ওয়</span> glide; after a consonant it is the ba-phola",
    group: "consonants"
  },
  {
    roman: "f",
    bangla: "ফ",
    note: "stands in for ph",
    group: "shortcuts"
  },
  {
    roman: "v",
    bangla: "ভ",
    note: "stands in for bh",
    group: "shortcuts"
  },
  {
    roman: "S",
    bangla: "শ",
    note: "stands in for sh",
    group: "shortcuts"
  },
  {
    roman: "Kh",
    bangla: "খ",
    note: "titlecase form of kh",
    group: "shortcuts"
  },
  {
    roman: "KH",
    bangla: "খ",
    note: "all-caps form of kh",
    group: "shortcuts"
  },
  {
    roman: "CHH",
    bangla: "ছ",
    note: "all-caps form of chh",
    group: "shortcuts"
  },
  {
    roman: "Y",
    bangla: "য়",
    note: "same as y, except in aY, which is the <span lang='bn'>অ্যা</span> vowel",
    group: "shortcuts"
  },
  {
    roman: "Biggan",
    bangla: "বিজ্ঞান",
    note: "autocapitalized input still works: capital B falls back to b",
    group: "shortcuts"
  },
  {
    roman: "Khela",
    bangla: "খেলা",
    note: "capital K falls back to k",
    group: "shortcuts"
  },
  {
    roman: "kk",
    bangla: "ক্ক",
    note: "two consonants in a row bind into a conjunct",
    group: "inherent-o"
  },
  {
    roman: "kok",
    bangla: "কক",
    note: "lowercase o between them keeps them apart",
    group: "inherent-o"
  },
  {
    roman: "kOk",
    bangla: "কোক",
    note: "uppercase O writes a visible <span lang='bn'>ও-কার</span> instead",
    group: "inherent-o"
  },
  {
    roman: "amora",
    bangla: "আমরা",
    note: "without the o this would be <span lang='bn'>আম্রা</span>",
    group: "inherent-o"
  },
  {
    roman: "nomoskar",
    bangla: "নমস্কার",
    note: "the o after n and after m keeps each letter separate",
    group: "inherent-o"
  },
  {
    roman: "bhokt",
    bangla: "ভক্ত",
    note: "o before a cluster is the inherent vowel, not a separator",
    group: "inherent-o"
  },
  {
    roman: "shokti",
    bangla: "শক্তি",
    note: "same pattern",
    group: "inherent-o"
  },
  {
    roman: "kt",
    bangla: "ক্ত",
    note: "the commonest conjunct",
    group: "conjuncts"
  },
  {
    roman: "kSh",
    bangla: "ক্ষ",
    note: "k plus retroflex sha",
    group: "conjuncts"
  },
  {
    roman: "ndr",
    bangla: "ন্দ্র",
    note: "three consonants bind in order",
    group: "conjuncts"
  },
  {
    roman: "ntro",
    bangla: "ন্ত্র",
    note: "ntr gives the same cluster; at the end there is nothing left to close",
    group: "conjuncts"
  },
  {
    roman: "chatro",
    bangla: "ছাত্র",
    note: "student",
    group: "conjuncts"
  },
  {
    roman: "proshno",
    bangla: "প্রশ্ন",
    note: "question",
    group: "conjuncts"
  },
  {
    roman: "bondhu",
    bangla: "বন্ধু",
    note: "friend",
    group: "conjuncts"
  },
  {
    roman: "swadhIn",
    bangla: "স্বাধীন",
    note: "free, independent",
    group: "conjuncts"
  },
  {
    roman: "ky",
    bangla: "ক্য",
    note: "y after a consonant is the ya-phola",
    group: "phola"
  },
  {
    roman: "kw",
    bangla: "ক্ব",
    note: "w after a consonant is the ba-phola",
    group: "phola"
  },
  {
    roman: "zy",
    bangla: "য্য",
    note: "the base letter z plus the ya-phola",
    group: "phola"
  },
  {
    roman: "bw",
    bangla: "ব্ব",
    note: "the base letter b plus the ba-phola",
    group: "phola"
  },
  {
    roman: "mw",
    bangla: "ম্ব",
    note: "m plus ba-phola",
    group: "phola"
  },
  {
    roman: "mwr",
    bangla: "ম্ব্র",
    note: "and a third consonant after it",
    group: "phola"
  },
  {
    roman: "swopno",
    bangla: "স্বপ্ন",
    note: "dream",
    group: "phola"
  },
  {
    roman: "jyame",
    bangla: "জ্যামে",
    note: "stuck in traffic",
    group: "phola"
  },
  {
    roman: "plYan",
    bangla: "প্ল্যান",
    note: "the ya-phola composes onto any cluster",
    group: "phola"
  },
  {
    roman: "blYak",
    bangla: "ব্ল্যাক",
    note: "same, for loanwords",
    group: "phola"
  },
  {
    roman: "flYaT",
    bangla: "ফ্ল্যাট",
    note: "same",
    group: "phola"
  },
  {
    roman: "kz",
    bangla: "কয",
    note: "z stays the plain letter <span lang='bn'>য</span>, no conjunct",
    group: "phola"
  },
  {
    roman: "kb",
    bangla: "কব",
    note: "b stays the plain letter <span lang='bn'>ব</span>, no conjunct",
    group: "phola"
  },
  {
    roman: "rrk",
    bangla: "র্ক",
    note: "double r before a consonant is the reph",
    group: "reph"
  },
  {
    roman: "rrm",
    bangla: "র্ম",
    note: "reph over <span lang='bn'>ম</span>",
    group: "reph"
  },
  {
    roman: "korrmo",
    bangla: "কর্ম",
    note: "work",
    group: "reph"
  },
  {
    roman: "sorrbo",
    bangla: "সর্ব",
    note: "all",
    group: "reph"
  },
  {
    roman: "rrkSh",
    bangla: "র্ক্ষ",
    note: "the reph sits over a whole cluster",
    group: "reph"
  },
  {
    roman: "tUrry",
    bangla: "তূর্য",
    note: "trumpet",
    group: "reph"
  },
  {
    roman: "kibOrrD",
    bangla: "কিবোর্ড",
    note: "keyboard",
    group: "reph"
  },
  {
    roman: ",,",
    bangla: "্",
    note: "two commas write a bare hasant",
    group: "hasant"
  },
  {
    roman: "k,,",
    bangla: "ক্",
    note: "a dead consonant",
    group: "hasant"
  },
  {
    roman: "k,,k",
    bangla: "ক্ক",
    note: "the same conjunct as kk, typed explicitly",
    group: "hasant"
  },
  {
    roman: "k,,y",
    bangla: "ক্য",
    note: "the same as ky, typed explicitly",
    group: "hasant"
  },
  {
    roman: "n,,d,,r,,",
    bangla: "ন্দ্র্",
    note: "a cluster ending in a visible hasant",
    group: "hasant"
  },
  {
    roman: "t``",
    bangla: "ৎ",
    note: "t followed by two backticks",
    group: "khanda-ta"
  },
  {
    roman: "T``",
    bangla: "ৎ",
    note: "uppercase T also works",
    group: "khanda-ta"
  },
  {
    roman: "utsob",
    bangla: "উৎসব",
    note: "festival; ts composes the same way",
    group: "khanda-ta"
  },
  {
    roman: "bidyut``",
    bangla: "বিদ্যুৎ",
    note: "electricity",
    group: "khanda-ta"
  },
  {
    roman: "rrt``",
    bangla: "র্ৎ",
    note: "reph over khanda ta",
    group: "khanda-ta"
  },
  {
    roman: "bangla",
    bangla: "বাংলা",
    note: "ng is the anusvar",
    group: "nasals"
  },
  {
    roman: "songket",
    bangla: "সংকেত",
    note: "signal",
    group: "nasals"
  },
  {
    roman: "oNgko",
    bangla: "অঙ্ক",
    note: "Ng is the velar nasal consonant <span lang='bn'>ঙ</span>",
    group: "nasals"
  },
  {
    roman: "baNgali",
    bangla: "বাঙালি",
    note: "Bengali",
    group: "nasals"
  },
  {
    roman: "bonggo",
    bangla: "বঙ্গ",
    note: "ngg is shorthand for the <span lang='bn'>ঙ্গ</span> conjunct",
    group: "nasals"
  },
  {
    roman: "ngghAt",
    bangla: "ঙ্ঘাত",
    note: "nggh is shorthand for <span lang='bn'>ঙ্ঘ</span>",
    group: "nasals"
  },
  {
    roman: "sMgo",
    bangla: "সংগ",
    note: "capital M forces a literal anusvar before g",
    group: "nasals"
  },
  {
    roman: "sMgho",
    bangla: "সংঘ",
    note: "same, before gh",
    group: "nasals"
  },
  {
    roman: "nj",
    bangla: "ঞ্জ",
    note: "the <span lang='bn'>ঞ্জ</span> cluster",
    group: "nasals"
  },
  {
    roman: "NGj",
    bangla: "ঞ্জ",
    note: "the same cluster, spelled out",
    group: "nasals"
  },
  {
    roman: "jinjira",
    bangla: "জিঞ্জিরা",
    note: "a Dhaka place name",
    group: "nasals"
  },
  {
    roman: "jNG",
    bangla: "জ্ঞ",
    note: "the two letters, spelled out",
    group: "jna"
  },
  {
    roman: "jn",
    bangla: "জ্ঞ",
    note: "shorthand",
    group: "jna"
  },
  {
    roman: "gg",
    bangla: "জ্ঞ",
    note: "shorthand by pronunciation",
    group: "jna"
  },
  {
    roman: "ggan",
    bangla: "জ্ঞান",
    note: "knowledge",
    group: "jna"
  },
  {
    roman: "biggan",
    bangla: "বিজ্ঞান",
    note: "science",
    group: "jna"
  },
  {
    roman: "ka^",
    bangla: "কাঁ",
    note: "the caret writes chandrabindu",
    group: "marks"
  },
  {
    roman: "ba^ka",
    bangla: "বাঁকা",
    note: "bent",
    group: "marks"
  },
  {
    roman: "ha^s",
    bangla: "হাঁস",
    note: "duck",
    group: "marks"
  },
  {
    roman: "cA^d",
    bangla: "চাঁদ",
    note: "moon",
    group: "marks"
  },
  {
    roman: "ku:",
    bangla: "কুঃ",
    note: "the colon writes bisarga",
    group: "marks"
  },
  {
    roman: "du:kho",
    bangla: "দুঃখ",
    note: "sorrow",
    group: "marks"
  },
  {
    roman: "qq",
    bangla: "ঁ",
    note: "an alternative chandrabindu signal",
    group: "marks"
  },
  {
    roman: "0123456789",
    bangla: "০১২৩৪৫৬৭৮৯",
    note: "Latin digits become Bangla numerals",
    group: "numerals"
  },
  {
    roman: "$",
    bangla: "৳",
    note: "the dollar key writes the taka sign",
    group: "numerals"
  },
  {
    roman: "$500",
    bangla: "৳৫০০",
    note: "taka and digits together",
    group: "numerals"
  },
  {
    roman: "ami.",
    bangla: "আমি।",
    note: "a full stop becomes the dari",
    group: "numerals"
  },
  {
    roman: "12.34",
    bangla: "১২.৩৪",
    note: "a decimal point between digits stays a point",
    group: "numerals"
  },
  {
    roman: "12.34.",
    bangla: "১২.৩৪।",
    note: "and a closing full stop still becomes a dari",
    group: "numerals"
  },
  {
    roman: "q",
    bangla: "ক",
    note: "q has no Bangla sound of its own; it settles on <span lang='bn'>ক</span>",
    group: "loanwords"
  },
  {
    roman: "iraq",
    bangla: "ইরাক",
    note: "Iraq",
    group: "loanwords"
  },
  {
    roman: "qatar",
    bangla: "কাতার",
    note: "Qatar",
    group: "loanwords"
  },
  {
    roman: "x",
    bangla: "ক্স",
    note: "x becomes the <span lang='bn'>ক্স</span> cluster",
    group: "loanwords"
  },
  {
    roman: "box",
    bangla: "বক্স",
    note: "box",
    group: "loanwords"
  },
  {
    roman: "fix",
    bangla: "ফিক্স",
    note: "fix",
    group: "loanwords"
  },
  {
    roman: "koxbajar",
    bangla: "কক্সবাজার",
    note: "Cox's Bazar",
    group: "loanwords"
  },
  {
    roman: "w",
    bangla: "ওয়",
    note: "standalone w is the <span lang='bn'>ওয়</span> glide",
    group: "loanwords"
  },
  {
    roman: "waTar",
    bangla: "ওয়াটার",
    note: "water",
    group: "loanwords"
  },
  {
    roman: "aYp",
    bangla: "অ্যাপ",
    note: "app",
    group: "loanwords"
  },
  {
    roman: "rZyab",
    bangla: "র‌্যাব",
    note: "rZy writes the ZWNJ-separated <span lang='bn'>র‌্য</span> used in loanword spellings",
    group: "loanwords"
  },
  {
    roman: "bir",
    bangla: "বির",
    note: "lowercase i is the short vowel",
    group: "traps"
  },
  {
    roman: "bIr",
    bangla: "বীর",
    note: "capital I is the long one; this is the word for hero",
    group: "traps"
  },
  {
    roman: "zoy",
    bangla: "যয়",
    note: "the o ends the letter z, so y stays a separate <span lang='bn'>য়</span>",
    group: "traps"
  },
  {
    roman: "ay",
    bangla: "আয়",
    note: "lowercase ay is <span lang='bn'>আ</span> plus <span lang='bn'>য়</span>",
    group: "traps"
  },
  {
    roman: "bOI",
    bangla: "বৈ",
    note: "uppercase OI is the <span lang='bn'>ঐ</span> diphthong; lowercase boi was <span lang='bn'>ব</span> + <span lang='bn'>ই</span>",
    group: "traps"
  },
  {
    roman: "rya",
    bangla: "রয়া",
    note: "r refuses the ya-phola, so this stays <span lang='bn'>র</span> plus <span lang='bn'>য়া</span>",
    group: "traps"
  },
  {
    roman: "aa",
    bangla: "আআ",
    note: "doubled vowels are not long-vowel shortcuts",
    group: "traps"
  },
  {
    roman: "kaa",
    bangla: "কাআ",
    note: "they compose exactly as typed",
    group: "traps"
  },
  {
    roman: "tiyw",
    bangla: "তীয়",
    note: "after a short i, iyw is the long <span lang='bn'>ঈয়</span> signal",
    group: "traps"
  },
  {
    roman: "jatiywta",
    bangla: "জাতীয়তা",
    note: "nationality",
    group: "traps"
  }
];
