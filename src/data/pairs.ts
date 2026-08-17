/**
 * Every Roman/Bangla pair the site shows outside the scheme table.
 *
 * All of them came out of the engine, none were typed from memory. The
 * deterministic core is strict and the obvious spelling is often the wrong
 * one: `bhalobasa` gives ভালবাসা, `arO` gives আরো. Autocorrect fixes those
 * while you type; a web page has no autocorrect.
 *
 * `node scripts/verify-scheme.mjs` re-runs the lot.
 */

export interface Pair {
  roman: string;
  bangla: string;
  where: string;
}

/** Lines from writers, for the places on the site that want a real sentence. */
export interface Verse extends Pair {
  author: string;
  authorBn: string;
  work: string;
  /** Plain rendering, not a scholarly translation. */
  english: string;
}

export const VERSE: Verse[] = [
  {
    roman: 'aji e probhate robir kor',
    bangla: 'আজি এ প্রভাতে রবির কর',
    author: 'Rabindranath Tagore',
    authorBn: 'রবীন্দ্রনাথ ঠাকুর',
    work: 'নির্ঝরের স্বপ্নভঙ্গ, 1883',
    english: "This morning the sun's light reached in.",
    where: 'verse/tagore-probhat',
  },
  {
    roman: 'zetha baky hrridoyer utsomukho hote',
    bangla: 'যেথা বাক্য হৃদয়ের উৎসমুখ হতে',
    author: 'Rabindranath Tagore',
    authorBn: 'রবীন্দ্রনাথ ঠাকুর',
    work: 'নৈবেদ্য ৭২, 1901',
    english: "Where speech comes up out of the heart's own spring.",
    where: 'verse/tagore-naibedya',
  },
  {
    roman: 'mom ek hate ba^ka ba^sher ba^shorI, ar hate roN-tUrry',
    bangla: 'মম এক হাতে বাঁকা বাঁশের বাঁশরী, আর হাতে রণ-তূর্য',
    author: 'Kazi Nazrul Islam',
    authorBn: 'কাজী নজরুল ইসলাম',
    work: 'বিদ্রোহী, অগ্নি-বীণা, 1922',
    english: 'One hand holds a bent bamboo flute. The other holds a war-horn.',
    where: 'verse/nazrul-bidrohi',
  },
  {
    roman: 'manuSher ceye boRo kichu nai, nohe kichu mohIyan.',
    bangla: 'মানুষের চেয়ে বড় কিছু নাই, নহে কিছু মহীয়ান।',
    author: 'Kazi Nazrul Islam',
    authorBn: 'কাজী নজরুল ইসলাম',
    work: 'মানুষ, সাম্যবাদী, 1925',
    english: 'Nothing is greater than a human being. Nothing is higher.',
    where: 'verse/nazrul-manush',
  },
  {
    roman: 'gacher chayay lotay patay udasI boner bay;',
    bangla: 'গাছের ছায়ায় লতায় পাতায় উদাসী বনের বায়;',
    author: 'Jasimuddin',
    authorBn: 'জসীম উদ্‌দীন',
    work: 'নিমন্ত্রণ, রাখালী, 1927',
    english: 'Under the shade of trees, in leaf and vine, in the idle wind off the woods.',
    where: 'verse/jasimuddin-nimontron',
  },
  {
    roman: 'banglar mukh ami dekhiyachi, tai ami prrithibIr rUp',
    bangla: 'বাংলার মুখ আমি দেখিয়াছি, তাই আমি পৃথিবীর রূপ',
    author: 'Jibanananda Das',
    authorBn: 'জীবনানন্দ দাশ',
    work: 'রূপসী বাংলা, 1957',
    english: "I have seen the face of Bengal, so I no longer go looking for the world's.",
    where: 'verse/jibanananda',
  },
  {
    roman: 'he bonggo, bhaNDare tobo bibidh roton',
    bangla: 'হে বঙ্গ, ভাণ্ডারে তব বিবিধ রতন',
    author: 'Michael Madhusudan Dutt',
    authorBn: 'মাইকেল মধুসূদন দত্ত',
    work: 'বঙ্গভাষা, চতুর্দ্দশপদী কবিতাবলী, 1866',
    english: 'Bengal, your storehouse holds every kind of jewel.',
    where: 'verse/madhusudan',
  },
  {
    roman: 'ayre bhOla kheyal-khOla',
    bangla: 'আয়রে ভোলা খেয়াল-খোলা',
    author: 'Sukumar Ray',
    authorBn: 'সুকুমার রায়',
    work: 'আবোল তাবোল, 1923',
    english: 'Come on then, you distractible thing.',
    where: 'verse/sukumar',
  },
  {
    roman: 'kha^car bhitor ocin pakhi kemone ase zay',
    bangla: 'খাঁচার ভিতর অচিন পাখি কেমনে আসে যায়',
    author: 'Lalon Shah',
    authorBn: 'লালন শাহ',
    work: 'folk song, orally composed',
    english: 'How does the unknown bird come and go through the cage?',
    where: 'verse/lalon',
  },
  {
    roman: 'sokoler tore sokole amora,',
    bangla: 'সকলের তরে সকলে আমরা,',
    author: 'Kamini Roy',
    authorBn: 'কামিনী রায়',
    work: 'সুখ, আলো ও ছায়া, 1889',
    english: 'All of us for everyone.',
    where: 'verse/kamini-roy-1',
  },
  {
    roman: 'protyeke amora porer tore.',
    bangla: 'প্রত্যেকে আমরা পরের তরে।',
    author: 'Kamini Roy',
    authorBn: 'কামিনী রায়',
    work: 'সুখ, আলো ও ছায়া, 1889',
    english: 'Each of us for the next person.',
    where: 'verse/kamini-roy-2',
  },
];

/** Real messages, for the demo. Nobody types textbook sentences. */
export const EVERYDAY: (Pair & { gloss: string })[] = [
  { roman: 'ami banglay likhchi', bangla: 'আমি বাংলায় লিখছি', gloss: "I'm writing in Bangla", where: 'demo/1' },
  { roman: 'kemon achO?', bangla: 'কেমন আছো?', gloss: 'how are you', where: 'demo/2' },
  { roman: 'ma, tOmake mone poRche', bangla: 'মা, তোমাকে মনে পড়ছে', gloss: "Ma, I'm missing you", where: 'demo/3' },
  { roman: 'ca chaRa sokal hoy na', bangla: 'চা ছাড়া সকাল হয় না', gloss: 'there is no morning without tea', where: 'demo/4' },
  { roman: 'brriShTi hocche, chata niyO', bangla: 'বৃষ্টি হচ্ছে, ছাতা নিয়ো', gloss: "it's raining, take an umbrella", where: 'demo/5' },
  { roman: 'jyame aTke achi, ekoTu deri hobe', bangla: 'জ্যামে আটকে আছি, একটু দেরি হবে', gloss: 'stuck in traffic, running late', where: 'demo/6' },
  { roman: 'amar nam ayesha, ami Dhakay thaki', bangla: 'আমার নাম আয়েশা, আমি ঢাকায় থাকি', gloss: 'a name and a place', where: 'demo/7' },
  { roman: '$500 paThiyechi, dekhO', bangla: '৳৫০০ পাঠিয়েছি, দেখো', gloss: 'sent you 500 taka, check', where: 'demo/8' },
  { roman: 'baNgalir pa^c miniT mane adha ghoNTa', bangla: 'বাঙালির পাঁচ মিনিট মানে আধা ঘণ্টা', gloss: "a Bengali's five minutes means half an hour", where: 'demo/9' },
  { roman: 'bhalO thekO, abar dekha hobe', bangla: 'ভালো থেকো, আবার দেখা হবে', gloss: 'take care, see you again', where: 'demo/10' },
];

/** Everything else the pages print. */
export const PAIRS: Pair[] = [
  ...VERSE,
  ...EVERYDAY,
  { roman: 'ami banglay gan gai', bangla: 'আমি বাংলায় গান গাই', where: 'hero/static' },
  // The drawn keyboard: what the strip is showing, and the line above it.
  { roman: 'sobar upore manus', bangla: 'সবার উপরে মানুস', where: 'home/phone-line' },
  { roman: 'manus', bangla: 'মানুস', where: 'home/phone-typed' },
  { roman: 'manuSh', bangla: 'মানুষ', where: 'home/phone-fixed' },
  { roman: 'bhaSha hOk unmukt', bangla: 'ভাষা হোক উন্মুক্ত', where: 'avro/slogan' },
  { roman: 'bhaSha hOk aroO unmukt', bangla: 'ভাষা হোক আরও উন্মুক্ত', where: 'obadh/tagline' },
  { roman: 'obadhe bangla likhun', bangla: 'অবাধে বাংলা লিখুন', where: 'og/download' },
  { roman: 'bhalObasa', bangla: 'ভালোবাসা', where: 'og/contribute' },
  { roman: 'ami tOmay bhalObasi', bangla: 'আমি তোমায় ভালোবাসি', where: 'og/privacy' },
  { roman: 'kt', bangla: 'ক্ত', where: 'home/what-it-is' },
  { roman: 'kok', bangla: 'কক', where: 'home/what-it-is' },
  { roman: 'bangla', bangla: 'বাংলা', where: 'home/what-it-is' },
  { roman: 'rrkSh', bangla: 'র্ক্ষ', where: 'og/guide' },
  { roman: 'jyOt``sna', bangla: 'জ্যোৎস্না', where: 'guide/demo-seed' },
  { roman: 'plYan', bangla: 'প্ল্যান', where: 'guide/demo' },
  { roman: 'NGj', bangla: 'ঞ্জ', where: 'og/guide' },
  { roman: 'ndr', bangla: 'ন্দ্র', where: 'about/what-it-does' },
  { roman: 'obadh', bangla: 'অবাধ', where: 'about/the-name' },
  { roman: 'obadhe', bangla: 'অবাধে', where: 'about/the-name' },
  { roman: 'zuktakShor', bangla: 'যুক্তাক্ষর', where: 'faq/conjuncts' },
  { roman: 'kSh', bangla: 'ক্ষ', where: 'faq/conjuncts' },
  { roman: 'nj', bangla: 'ঞ্জ', where: 'faq/conjuncts' },
  { roman: 'gg', bangla: 'জ্ঞ', where: 'faq/conjuncts' },
  { roman: 'jn', bangla: 'জ্ঞ', where: 'faq/conjuncts' },
  { roman: 'jNG', bangla: 'জ্ঞ', where: 'faq/conjuncts' },
  { roman: 'kk', bangla: 'ক্ক', where: 'faq/conjuncts' },
  { roman: 'rrk', bangla: 'র্ক', where: 'faq/conjuncts' },
  { roman: 'aYp', bangla: 'অ্যাপ', where: 'faq/english-words' },
  { roman: 'waTar', bangla: 'ওয়াটার', where: 'faq/english-words' },
  { roman: 'box', bangla: 'বক্স', where: 'faq/english-words' },
  { roman: 'blYak', bangla: 'ব্ল্যাক', where: 'faq/english-words' },
  // On the Mac the whole token goes to the engine, symbols and digits included.
  { roman: 'songkhya1', bangla: 'সংখ্যা১', where: 'download/typing-with-it' },
  { roman: '$500', bangla: '৳৫০০', where: 'download/typing-with-it' },
  { roman: '2011', bangla: '২০১১', where: 'download/typing-with-it' },
  // The guide's prose. Its tables are SCHEME_ROWS; these are the pairs the
  // paragraphs around the tables print.
  { roman: 'tiy', bangla: 'তিয়', where: 'guide/traps' },
  // The two capitals that destroy a word when a phone capitalizes for you.
  { roman: 'Rasta', bangla: 'ড়াস্তা', where: 'guide/shortcuts' },
  { roman: 'rasta', bangla: 'রাস্তা', where: 'guide/shortcuts' },
  { roman: 'Cabi', bangla: 'ছাবি', where: 'guide/shortcuts' },
  { roman: 'cabi', bangla: 'চাবি', where: 'guide/shortcuts' },
  { roman: 'amra', bangla: 'আম্রা', where: 'guide/inherent-o' },
  { roman: 'ndor', bangla: 'ন্দর', where: 'guide/conjuncts' },
  { roman: 'rm', bangla: 'রম', where: 'guide/reph' },
  { roman: 'ng', bangla: 'ং', where: 'guide/nasals' },
  { roman: 'ngg', bangla: 'ঙ্গ', where: 'guide/nasals' },
  { roman: 'nggh', bangla: 'ঙ্ঘ', where: 'guide/nasals' },
  { roman: 'songgo', bangla: 'সঙ্গ', where: 'guide/nasals' },
  { roman: ':', bangla: 'ঃ', where: 'guide/marks' },
  // The same three letters one U+200C apart: rZy carries the ZWNJ, rrY does not.
  { roman: 'rZy', bangla: 'র‌্য', where: 'guide/loanwords' },
  { roman: 'rrY', bangla: 'র্য', where: 'guide/loanwords' },
  { roman: 'ka,,', bangla: 'কা', where: 'guide/hasant' },
  { roman: 'ee', bangla: 'এএ', where: 'guide/from-avro' },
  { roman: 'oo', bangla: 'অঅ', where: 'guide/from-avro' },
  // Both sides of #from-avro print this one; only the English is in a
  // lang="bn" span, so verify-copy.mjs cannot see the Bangla instance.
  { roman: 'hoThat``', bangla: 'হঠাৎ', where: 'guide/from-avro' },
  // The Bangla guide's note on the tagline row: আরও and আরো are different
  // words, and the shipping line is আরও.
  { roman: 'arO', bangla: 'আরো', where: 'guide/first-words-note-bn' },
];
