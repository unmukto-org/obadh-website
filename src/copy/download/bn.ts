import type { DownloadContent } from '../types';

// Terminology and the Latin-wrapping rules are settled in src/copy/GLOSSARY.bn.md.
//
// এই পাতার একটাই কাজ: পাঠককে লেখা শুরু করিয়ে দেওয়া। প্রতিটি লাইন হয় পরের ধাপ, নয়তো
// ঠিক ওই মুহূর্তে যে কারণটা জানা দরকার। ইঞ্জিন কীভাবে তৈরি, গেট কীভাবে মাপে, কোন বাগ
// কবে সারানো হয়েছে — এসব পরিচিতি, প্রশ্ন-উত্তর আর গোপনীয়তার পাতায়, আর এখান থেকে কেবল
// লিংক করা হয়েছে। ফোনেটিক টাইপিং কী, তা এই পাতা ব্যাখ্যা করে না।
//
// `source` strings stay in English. They render inside <code> in the margin track, the mono
// face has no Bengali, and every one of them points at a file or a heading in a repository
// that is written in English.
//
// `requirement`, the button label and its note, and every field on a row in `others` are
// rendered as plain text, not set:html. Markup in them ships as visible angle brackets, so
// the Latin in those four places is bare on purpose.
//
// Latin digits stay wherever the figure is one a person copies or checks against a file
// (0.9.1 · 0.1.0 · 29 MB · iOS 18 · macOS 15 · Xcode 26). Ordinary counts in running prose
// take the Bangla word.
//
// দুটি অবস্থাসূচক শব্দ, হোম পেজের সঙ্গে এক: পাওয়া যাচ্ছে, আসছে।
export const download: DownloadContent = {
  meta: {
    // Departs from seo-plan.md §3, which proposes `অবাধ ডাউনলোড — আইফোন, আইপ্যাড ও ম্যাক`.
    // The primary Bangla term for this page is বাংলা কিবোর্ড ডাউনলোড (§2), and that version
    // never carries it. Update the plan or revert both.
    title: 'বাংলা কিবোর্ড ডাউনলোড — আইফোন, আইপ্যাড ও ম্যাকে অবাধ',
    description:
      'চারটি ধাপেই আইফোন, আইপ্যাড বা ম্যাকে ফ্রি অবাধ বাংলা কিবোর্ড বসিয়ে নিন। অ্যাকাউন্ট লাগে না, লেখার সব জায়গায় চলে, আর আপনার লেখা ডিভাইস ছেড়ে যায় না।',
    ogTitle: 'আইফোন, আইপ্যাড ও ম্যাকে অবাধ',
    ogDescription:
      'আইফোন, আইপ্যাড আর ম্যাকে দ্রুত ও নির্ভুল বাংলা লেখা। ফ্রি, চারটি ধাপে বসে যায়, আর আপনার লেখা ডিভাইস ছেড়ে যায় না।',
    ogImage: 'download.png',
    ogImageAlt: 'obadhe bangla likhun লেখাটির নিচে তা থেকে তৈরি বাংলা, অবাধে বাংলা লিখুন',
  },

  eyebrow: 'ডাউনলোড',
  heading: 'চার ধাপেই বাংলা লেখা শুরু',
  standfirst:
    'আইফোন, আইপ্যাড আর ম্যাকে ফ্রি। ইনস্টল করে সেটিংসে একবার চালু করে নিন, তারপর আপনি যেসব অ্যাপে লেখেন সবগুলোতেই চলবে।',

  /*
    পাতার একদম উপরের অংশ। পাঠক যে যন্ত্রটি হাতে নিয়ে পড়ছেন, কথাটা তাকেই বলা — বাকি
    প্ল্যাটফর্মগুলোর কথা এখানে নেই।

    সবগুলো রূপই HTML-এ থাকে, স্ক্রিপ্ট কেবল অপ্রাসঙ্গিকগুলো লুকিয়ে দেয়। তাই
    জাভাস্ক্রিপ্ট বন্ধ থাকলেও এখানকার প্রতিটি লাইন পাঠক পান।
  */
  get: {
    all: {
      heading: 'আপনার যন্ত্রটি বেছে নিন',
      body: 'অবাধ এখন আইফোন, আইপ্যাড আর ম্যাকে আছে। বাকি প্ল্যাটফর্মগুলো কোন অবস্থায়, তা এই পাতার শেষে।',
    },
    mac: {
      heading: 'আপনার ম্যাকের জন্য অবাধ',
      startingHeading: 'ডাউনলোড শুরু হচ্ছে',
      body: 'macOS 15 বা তার পরের সংস্করণ, অ্যাপল সিলিকন আর ইন্টেল — দুটোতেই। সাইন করা ও নোটারাইজড, কেনার কিছু নেই।',
      starting: 'কিছু না হলে ডিস্ক ইমেজটি এখানেই আছে।',
      button: 'ম্যাকের জন্য অবাধ ডাউনলোড',
      again: 'আবার ডাউনলোড',
    },
    iphone: {
      heading: 'আপনার আইফোনের জন্য অবাধ',
      body: 'iOS 18 বা তার পরের সংস্করণ। অ্যাপ স্টোরে ফ্রি, অ্যাকাউন্ট বানানোর দরকার নেই।',
    },
    ipad: {
      heading: 'আপনার আইপ্যাডের জন্য অবাধ',
      body: 'iPadOS 18 বা তার পরের সংস্করণ। অ্যাপ স্টোরে ফ্রি, অ্যাকাউন্ট বানানোর দরকার নেই।',
    },
    soon: {
      heading: '{platform}-এ অবাধ এখনো আসেনি',
      body: '{platform}-এ ইনস্টল করার মতো কিছু আজ নেই, আর কথা দেওয়ার মতো কোনো তারিখও নেই। ওই সংস্করণটির জন্য আর কী কী দরকার, তা এই পাতার শেষে লেখা আছে।',
      available: 'যেগুলো আজই বসিয়ে নিতে পারেন',
    },
    unknown: {
      heading: 'এই যন্ত্রটির জন্য এখনো কিছু নেই',
      body: 'আপনি যেটিতে এই লেখাটি পড়ছেন, তার জন্য অবাধের কোনো সংস্করণের পরিকল্পনা নেই — হয়তো কেবল কেউ চাননি বলেই। আপনি কীসে লেখেন সেটা জানালে কাজটা কারও হাতে তুলে দেওয়া যায়।',
      link: 'গিটহাবে ইস্যু খুলুন',
    },
    qr: {
      heading: 'ফোনে পাঠিয়ে দিন',
      body: 'এটি স্ক্যান করলে আপনার ফোন এই পাতাতেই আসবে, আর ফোনটির নিজের প্ল্যাটফর্মে যা আছে পাতাটি তা-ই দেবে।',
      alt: 'এই ডাউনলোড পাতার দিকে নির্দেশ করা কিউআর কোড।',
    },
    names: {
      windows: 'উইন্ডোজ',
      linux: 'লিনাক্স',
      android: 'অ্যান্ড্রয়েড',
      chromeos: 'ক্রোমওএস',
    },
    appStore: 'অ্যাপ স্টোর থেকে অবাধ নিন',
    macButton: 'ম্যাকের জন্য অবাধ ডাউনলোড',
    otherDevice: 'অন্য কোনো যন্ত্রের জন্য নিচ্ছেন?',
  },

  intro: [
    'নতুন কিবোর্ড কোনো সিস্টেমই নিজে থেকে চালু করে না, তাই আইফোন আর ম্যাক — দুটোতেই প্রথমে একবার সেটিংসে যেতে হয়। ধাপগুলো নিচে, সিস্টেম যে ক্রমে চায় সেই ক্রমেই।',
    'লিনাক্স, অ্যান্ড্রয়েড, উইন্ডোজ বা ক্রোমওএসে ইনস্টল করার মতো কিছু এখনো নেই। কোনটি কোন অবস্থায়, তা এই পাতার শেষে।',
  ],

  tryFirst:
    'কিছু ইনস্টল না করেও এখনই বাংলা লিখে দেখতে পারেন। <a href="https://sayom.me/obadh_engine/">ইঞ্জিন খেলাঘরে</a> অ্যাপ দুটির সেই একই কোডই চলে, তাই সেখানে যে বাংলা আসে ফোনেও সেই বাংলাই আসে। <a href="/bn/guide/">লেখার নিয়মের পাতায়</a> লেখার নিজস্ব একটি বাক্স আছে, আর সব নিয়ম এক জায়গায়।',

  platforms: [
    {
      id: 'ios',
      name: 'আইফোন ও আইপ্যাডে বাংলা',
      state: 'shipping',
      stateLabel: 'পাওয়া যাচ্ছে',
      requirement: 'iOS ও iPadOS 18 বা তার পরের সংস্করণ। কিছু কিনতে হয় না, অ্যাকাউন্ট বানাতে হয় না।',
      body: [
        'যেখানেই লেখেন সেখানেই চলে: মেসেজ, নোটস, সাফারি, সার্চ বার, ব্রাউজারের ফর্ম। ব্যতিক্রম পাসওয়ার্ডের ঘর, আর বাইরের কিবোর্ড একেবারেই নেয় না এমন গুটিকয় অ্যাপ; দুটোই <span class="latin" lang="en">iOS</span>-এর সিদ্ধান্ত, অবাধের নয়।',
        'আপনার লেখা ঘরের ভেতরে সাধারণ লেখা হয়েই বসে। গতকাল লেখা কোনো শব্দ বদলাতে গেলে সেটি আর দশটা শব্দের মতোই বদলায়, আর শব্দের মাঝপথে অন্য কিবোর্ডে চলে গেলেও ততক্ষণে লেখা বাংলাটা যেমন ছিল তেমনই থাকে।',
      ],
      // LINKS.appStore is a marked placeholder in src/config.ts, replaced with the real
      // listing before launch. copy-shared.md §5 proposed swapping the button for a "Build it
      // from source" fallback; settled the other way, and the button stays. What does not
      // ship is a machine-readable claim: DownloadPage.astro emits no `downloadUrl`.
      action: {
        label: 'অ্যাপ স্টোর থেকে অবাধ নিন',
        note: 'ফ্রি। অ্যাপ 0.1.0। ইঞ্জিন 0.9.1। এমআইটি।',
        href: 'appStore',
      },
      stepsHeading: 'চালু করবেন যেভাবে',
      stepsId: 'turning-it-on',
      stepsIntro:
        'চারটি ধাপ, এই ক্রমেই। দ্বিতীয়টি শেষ না হলে <span class="latin" lang="en">iOS</span> তৃতীয়টি দেখাবেই না।',
      steps: [
        {
          heading: 'অবাধ ইনস্টল করে একবার খুলুন।',
          body: 'অ্যাপটি নিজেই সেটিংস খুলে দেয়, আর সেখানে গিয়ে কোথায় চাপতে হবে তা দেখিয়ে দেয়।',
        },
        {
          heading: 'সেটিংসে গিয়ে অবাধ চালু করুন।',
          body: 'পথটা <span class="latin" lang="en">Settings › Obadh › Keyboards</span>। কিবোর্ডের তালিকায় এটি <span class="latin" lang="en">Obadh</span> নামেই আসবে।',
        },
        {
          heading: 'ফুল অ্যাক্সেস দিন।',
          body: 'সুইচটি ওই একই পর্দাতেই। এটি ছাড়াও কিবোর্ড দিব্যি চলে; <a href="#full-access">কী কী পাবেন না</a> তা একটু নিচেই লেখা।',
        },
        {
          heading: 'গ্লোব বোতামটি চেপে ধরুন।',
          body: 'যেকোনো অ্যাপে চেপে ধরে অবাধ বেছে নিন। <code>ami banglay likhchi</code> লিখুন, আমি বাংলায় লিখছি আসার কথা।',
        },
      ],
      sections: [
        {
          id: 'full-access',
          heading: 'ফুল অ্যাক্সেস না দিলে যা পাবেন না',
          body: [
            'কিবোর্ড আপনার লেখা প্রতিটি শব্দ দেখতে পায়, তাই সুইচটির পাশে <span class="latin" lang="en">iOS</span> এমন ভাষায় সতর্ক করে যা স্টোরের সব কিবোর্ডের বেলাতেই খাটে। অবাধে সুইচটি আসলে কী বদলায়, তার তালিকাটি ছোট।',
            'কি-গুলো আর আঙুলের নিচে টোকা দেয় না: এটি ছাড়া কোনো কিবোর্ড হ্যাপটিকের নাগাল পায় না, আর কোনো আইপ্যাডে হ্যাপটিকের যন্ত্রাংশই নেই। অবাধ অ্যাপে আপনার বেছে নেওয়া সেটিংসগুলোও কিবোর্ড পর্যন্ত পৌঁছায় না — হ্যাপটিক চালু থাকবে কি না, ইমোজি কোন ভাষায় খুঁজবে, আর স্পেস চাপলে নিশ্চিত সংশোধনটি নিজে থেকে বসবে কি না।',
            'মনে রাখাও বন্ধ হয়ে যায়। যেসব শব্দ সংশোধন না করতে আপনি তাকে শিখিয়েছেন, শেষবার নেওয়া ইমোজিগুলো, কোনো ইমোজির গায়ের রং যেটি বেছেছিলেন — সুইচ বন্ধ থাকলে এগুলো লিখে রাখার জায়গা থাকে না, তাই পরেরবার লিখতে বসে কিছুই পাবেন না।',
            'যা দিয়ে আপনি লেখেন তার সবই সুইচ বন্ধ রেখে চলে: বাংলাটা নিজে, পরামর্শের সারি, পরের শব্দের পরামর্শ, ইমোজি খোঁজা আর বাংলা সংখ্যা।',
            'কিবোর্ডের ভেতরে কোনো নেটওয়ার্ক কোড নেই — <code>URLSession</code> নেই, সকেট নেই, সংযোগ খুলতে পারে এমন কিছুই নেই — কাজেই ফুল অ্যাক্সেস এমন একটি অনুমতি দেয়, যা খরচ করার মতো কিছু কোডের হাতে নেই। মিনিটখানেকে নিজে তা কীভাবে যাচাই করবেন, লেখা আছে <a href="/bn/privacy/#what-full-access-does-on-ios">গোপনীয়তার পাতায়</a>। আর যেখানে সুইচটি চালু করেছিলেন, সেখানেই আবার বন্ধ করা যায়।',
          ],
          source:
            'RequestsOpenAccess in ObadhKeyboard/Info.plist. Haptics: Shared/Sources/Keyboard/KeyboardFeedbackController.swift. The three app settings: ObadhApp/Sources/SettingsView.swift. What the keyboard writes: Shared/Sources/Settings/LearnedWordStore.swift and Shared/Sources/Keyboard/Emoji/.',
        },
        {
          id: 'what-the-keyboard-does',
          heading: 'সংশোধন চোখের সামনেই আসে',
          body: [
            'কি-গুলোর উপরের সারিতে আগে থাকে আপনার নিজের লেখা বানানটি, তার পাশে সংশোধনগুলো — আপনি না নিলে আঙুলের নিচে কিছুই বদলায় না। স্পেস চাপলে চোখের সামনে যে শব্দটি আছে ঠিক সেটিই বসে। স্পেসে আপনার লেখা শব্দের বদলে সংশোধনটি নিজে থেকে বসা ডিফল্টে বন্ধ, আর চালু করলেও তা কেবল নিশ্চিত হলেই ঘটে।',
            'যে শব্দটি লিখছেন তার জন্য সারিতে ইমোজিও আসে, আর কোনো একটিতে ট্যাপ করলে সেটি শব্দটির সঙ্গে যোগ না হয়ে তার জায়গাতেই বসে, কারণ আপনার লেখা শব্দটিই ছিল খোঁজার শব্দ: <code>bhalObasa</code> লিখলে হয় ভালোবাসা, আর তার জায়গায় ❤️ দেওয়া থাকে। ইমোজি খোঁজা যায় বাংলা আর ইংরেজি দুই ভাষাতেই।',
            'বাংলা বাক্যে যে চিহ্নগুলো লাগে সেগুলো কিবোর্ডেই আছে: সংখ্যার পাতায় <a href="/bn/guide/#numerals">বাংলা সংখ্যা</a> ০–৯, যতিচিহ্নের পাতায় ৳ আর দাঁড়ি, আর স্পেস বারে পরপর দুবার চাপলেই একটি দাঁড়ি।',
            'কি-গুলো ঠিক সেখানেই, যেখানে আঙুল খুঁজতে যায়। মাপ আর অবস্থান মিলিয়ে দেখা হয় অ্যাপলের নিজের কিবোর্ডের সঙ্গে — ছয় ধরনের আইফোন আর পাঁচ ধরনের আইপ্যাডে, পোর্ট্রেট আর ল্যান্ডস্কেপ দুটোতেই — আর রং মেলানো হয় আলো আর আঁধারে।',
          ],
          source: 'docs/native-parity.md: the gate table, and the “honest gaps” list of what is not covered.',
        },
      ],
    },
    {
      id: 'macos',
      name: 'ম্যাকে বাংলা',
      state: 'shipping',
      stateLabel: 'পাওয়া যাচ্ছে',
      requirement: 'macOS 15 বা তার পরের সংস্করণ। Apple silicon ও Intel, দুটোতেই। নোটারাইজ করা।',
      body: [
        'ম্যাকে অবাধ খুলে রাখার মতো কোনো অ্যাপ নয়, একটি ইনপুট সোর্স। অন্য যেকোনো লেআউটে যেভাবে যান সেভাবেই এতে আসবেন, আর ম্যাকের যেকোনো অ্যাপে লিখতে পারবেন। <span class="latin" lang="en">macOS</span> যত খুশি ইনপুট সোর্স রাখতে দেয়, কাজেই এটি যোগ করলে এখন যা ব্যবহার করেন তার কিছুই হারায় না।',
        'যা ডাউনলোড করবেন তা একটি ডিস্ক ইমেজ, ভেতরে একটিই অ্যাপ, আর ওই অ্যাপটিই ইনস্টলার: খুললে সে নিজেকে ইনপুট মেথডের নির্দিষ্ট জায়গায় বসিয়ে নেয়, ইনপুট সোর্সটি নিবন্ধন করে, আর আপনাকে সেটিতেই নিয়ে যায়। <span class="latin" lang="en">Applications</span>-এ টেনে নেওয়ার কিছু নেই, পরে আলাদা করে চালানোরও কিছু নেই।',
      ],
      // LINKS.macDmg is a marked placeholder until the first release is tagged. Same rule as
      // the iOS button above: the button stays, and the structured data carries no
      // `downloadUrl` for it.
      action: {
        label: 'ম্যাকের জন্য অবাধ ডাউনলোড করুন',
        note: 'ফ্রি। অ্যাপ 0.1.0। ইঞ্জিন 0.9.1। Developer ID দিয়ে সই করা ও নোটারাইজ করা। এমআইটি।',
        href: 'macDmg',
      },
      altAction: { label: 'সব রিলিজ', href: 'macReleases' },
      stepsHeading: 'ইনস্টল করবেন যেভাবে',
      stepsId: 'installing-it',
      stepsIntro: 'চারটি ধাপ। পাসওয়ার্ড চাইবে একবারই, দ্বিতীয় ধাপে।',
      steps: [
        {
          heading: 'ডিস্ক ইমেজটি খুলে অবাধ চালু করুন।',
          body: 'প্রথমবার চালু করলেই সেটআপ শুরু হয়।',
        },
        {
          heading: '<span class="latin" lang="en">Get Started</span>, তারপর <span class="latin" lang="en">Add Obadh</span> চাপুন।',
          body: '<span class="latin" lang="en">macOS</span> আপনার পাসওয়ার্ড চাইবে। ওটা <code>/Library/Input Methods</code>-এ কপি করার জন্য, যে কাজে অ্যাডমিনিস্ট্রেটর লাগে, আর এই একবারই অবাধ পাসওয়ার্ড চায়।',
        },
        {
          heading: '<span class="latin" lang="en">Allow</span> বেছে নিন।',
          body: '<span class="latin" lang="en">macOS</span> জিজ্ঞেস করবে ইনপুট সোর্সটি চালু করা হবে কি না। তার ডায়ালগে লেখা থাকে, ইনপুট মেথডের ডেভেলপার আপনার লেখা সবকিছু দেখতে পান। অ্যাপলের বাইরের প্রতিটি ইনপুট মেথডের বেলাতেই কথাটা সত্যি, আর আপনার লেখা নিয়ে অবাধ যা করে তাতে <a href="/bn/privacy/">কিছুই আপনার ম্যাক ছেড়ে যায় না</a>।',
        },
        {
          heading: 'গ্লোব বোতাম বা <span class="latin" lang="en">Control-Space</span> চাপুন।',
          body: 'বাংলা (অবাধ)-তে চলে আসুন, তারপর লিখুন।',
        },
      ],
      stepsAfter:
        'ইনপুট সোর্সটি নিজে থেকে না এলে হাতে করে যোগ করে নিন: <span class="latin" lang="en">System Settings › Keyboard › Input Sources</span>, সেখানে + বোতামটি, তারপর বাংলা, তারপর বাংলা (অবাধ)। পরে তুলে দিতে চাইলে ওই তালিকা থেকেই সরিয়ে দিন, আর <code>/Library/Input Methods/Obadh.app</code> মুছে দিন — এর জন্য অ্যাডমিনিস্ট্রেটরের পাসওয়ার্ড চাইবে। কিছু না তুলেই <a href="/bn/privacy/#how-to-erase-what-it-has-learned">যা শিখেছে তা মুছে ফেলার উপায়</a> গোপনীয়তার পাতায় আছে।',
      sections: [
        {
          id: 'typing-with-it',
          heading: 'বেছে নেওয়ার কিছু নেই',
          body: [
            'কার্সরের জায়গায় বাংলাটা আসে নিচে দাগ দেওয়া চিহ্নিত লেখা হয়ে, আর স্পেস বা রিটার্ন চাপলে সেটি বসে যায়। যে শব্দটি লিখছেন তার অন্য বানান থাকলে পাশে ছোট একটি বার আসে, আর তাতে নিয়ম মেনে তৈরি বানানটিই আগে থেকে বাছা থাকে — কাজেই বারটির দিকে একেবারে না তাকালেও ঠিক সেটিই পাবেন।',
            'তীরচিহ্নের কি, ট্যাব, <span class="latin" lang="en">Control-N</span> আর <span class="latin" lang="en">Control-P</span> দিয়ে এর ভেতরে চলাফেরা করা যায়, রিটার্ন বা স্পেস বাছাইটি নেয়, এস্কেপ বারটি সরিয়ে দেয়, আর যা পড়ছেন তার উপরে এসে পড়লে বাঁ পাশের খাঁজ ধরে টেনে সরানো যায়। সংখ্যার কি চেপে বাছা যায় না, কারণ অঙ্কগুলো নিজেই <a href="/bn/guide/#numerals">লেখার নিয়মের</a> অংশ: <code>songkhya1</code> হয় সংখ্যা১, আর <code>$500</code> হয় ৳৫০০। যে টোকেনে একটিও বর্ণ নেই, তার বেলায় বাংলার পাশে সাদামাটা রূপটিও দেওয়া থাকে — ২০১১-এর পাশে <code>2011</code> আসে, আর ডান দিকের তীরে একবার চাপলে অঙ্কগুলোই বসে।',
            'পরের শব্দের পরামর্শ ম্যাকের বিল্ডে নেই। পরের শব্দ আন্দাজ করা ফোনের কিবোর্ডের জিনিস, আর তার ফাইলটির আকার <span class="latin">29 MB</span>, কাজেই ম্যাক সংশোধনগুলো বয়ে নেয়, আন্দাজগুলো নয়।',
            // The greying-out is listed as not yet verified in the macOS working notes. Run it on
            // a real machine before launch, or cut the clause after “ডিফল্টে বন্ধ”.
            'বারটি দেখাবে কি না, আর দেখালে কয়টি বানান, তা ঠিক করা যায় সেটিংসে; সেখানে যাওয়া যায় মেনু বারের বাংলা (অবাধ) মেনু থেকে। নিজে থেকে সংশোধন বসা সেখানেও ডিফল্টে বন্ধ, আর সেটি নির্ভর করে বারটি চোখের সামনে থাকার উপরে, কারণ যে সংশোধন আসতে দেখছেন না, সেটি আপনি থামাতেও পারবেন না।',
          ],
          source:
            'Candidate bar and the symbol tokens: obadh-macos README, “How it works”. The 29 MB is the autosuggest c64 artifact, 29,486,274 bytes, in obadh_engine’s README under Performance Snapshot.',
        },
      ],
    },
  ],

  // This section's anchor is `other-platforms` and the next one's is `build-from-source`.
  // Both are linked from other pages and neither has a slot in the type; the template supplies
  // them, and they are the same ids in Bangla.
  otherHeading: 'লিনাক্স, অ্যান্ড্রয়েড, উইন্ডোজ আর ক্রোমওএস',
  otherLede: 'এগুলোর কোনোটিতেই ইনস্টল করার মতো কিছু এখনো নেই, আর তারিখের প্রতিশ্রুতিও নেই।',
  otherIntro:
    '“আসছে” বলতে এখানে যা বোঝায় ঠিক তা-ই, তার বেশি কিছু নয়। চারটির একটিরও কাজ প্রকাশ্যে শুরু হয়নি: লিনাক্স, অ্যান্ড্রয়েড, উইন্ডোজ বা ক্রোমওএসের কোনো রিপোজিটরি এখনো নেই, ইনস্টল করার মতো কিছুও নেই। যেদিন একটি হবে, প্রথম কমিট থেকেই সেটি প্রকাশ্য থাকবে; আর তাতে যখন কাজে লাগানোর মতো বিল্ড হবে, তখন এই পাতায় তার একটি বোতাম বসবে আর হেডারে একটি জায়গা হবে। নাম লেখানোর কোনো তালিকা নেই।',
  otherEngine:
    'বাংলাটা তৈরি করার কাজে আটকে নেই — আইফোন, আইপ্যাড আর ম্যাকে যে কোড চলছে, চারটিতেও চলবে সেটিই, আর <a href="/bn/about/#how-it-is-built">কীভাবে তৈরি</a> তা আছে পরিচিতির পাতায়। চারটির প্রতিটির দরকার তার চারপাশের কিবোর্ডটি, ওই সিস্টেমের নিজের ফ্রেমওয়ার্ক ধরে লেখা।',
  others: [
    {
      name: 'লিনাক্স, X11 ও ওয়েল্যান্ড',
      state: 'building',
      stateLabel: 'আসছে',
      line: 'দুটি ডিসপ্লে সার্ভারেই, যাতে আপনার ডেস্কটপ যেটিই ব্যবহার করুক চলে।',
    },
    {
      name: 'অ্যান্ড্রয়েড',
      state: 'building',
      stateLabel: 'আসছে',
      line: 'এখনো ইনস্টল করার মতো হয়নি।',
    },
    {
      name: 'উইন্ডোজ',
      state: 'building',
      stateLabel: 'আসছে',
      line: 'এখনো ইনস্টল করার মতো হয়নি।',
    },
    {
      name: 'ক্রোমওএস',
      state: 'building',
      stateLabel: 'আসছে',
      line: 'এখনো ইনস্টল করার মতো হয়নি।',
    },
  ],
  otherClosing:
    'এগুলোর কোনো একটি আরও আগে চাইলে রিপোজিটরিগুলো খোলাই আছে, আর কোথা থেকে শুরু করবেন তা <a href="/bn/contribute/">অবদানের পাতায়</a> লেখা। যিনি আগে <span class="latin" lang="en">IBus</span>-এর ইঞ্জিন কিংবা অ্যান্ড্রয়েডের ইনপুট মেথড লিখেছেন, এর যেকোনোটির শুরুটা তাঁর হাত ধরেই হবে।',

  sourceHeading: 'নিজে বিল্ড করে নেওয়া',
  sourceBody: [
    'তিনটি রিপোজিটরিই পরিষ্কার চেকআউট থেকে বিল্ড হয়, আর আসল নির্দেশনা প্রতিটির নিজের <span class="latin" lang="en">README</span>-তে। দুটি অ্যাপের জন্যই <span class="latin" lang="en">Xcode</span> লাগে — কিবোর্ড এক্সটেনশন আর ইনপুট মেথড দুটোই সই করা সিস্টেম বান্ডল — আর তিনটিতেই একটি রাস্ট টুলচেইন লাগে।',
  ],
  repos: [
    {
      repo: 'engine',
      name: 'obadh_engine',
      body: "রাস্টে লেখা ইঞ্জিন। <code>./init.sh</code> ডেটার সাবমডিউল আর রানটাইমের ফাইলগুলো নামিয়ে আনে, তারপর <code>cargo run --features cli --bin obadh -- 'aji e probhate robir kor'</code> চালালে ছাপা হয় আজি এ প্রভাতে রবির কর। খেলাঘরটি বিল্ড হয় <code>wasm</code> ফিচার দিয়ে।",
    },
    {
      repo: 'ios',
      name: 'obadh-ios',
      body: 'আইফোন আর আইপ্যাডের কিবোর্ড। <code>./scripts/bootstrap.sh</code>, তারপর <code>./scripts/install-device.sh</code> রিলিজ বিল্ড করে সেটি লাগানো ডিভাইসে বসিয়ে দেয়। লাগবে <span class="latin" lang="en">Xcode 26</span> বা তার পরের সংস্করণ, <span class="latin" lang="en">XcodeGen</span>, আর একটি রাস্ট টুলচেইন। ফ্রি অ্যাপল ডেভেলপার অ্যাকাউন্টেও চলে, তবে তার প্রভিশনিং প্রোফাইল সাত দিন পর মেয়াদ হারায়, আর তখন ফোন বলে “<span class="latin" lang="en">Obadh is not available anymore</span>”। ওটি অ্যাপলের ঘড়ি, বিল্ড ব্যর্থ হওয়া নয়।',
    },
    {
      repo: 'macos',
      name: 'obadh-macos',
      body: 'ম্যাকের ইনপুট মেথড। <code>brew install xcodegen</code>, <code>./scripts/bootstrap.sh</code>, তারপর নিজের মেশিনে বিল্ড করে বসাতে <code>./scripts/install-local.sh</code>। পুরো <span class="latin" lang="en">Xcode</span> ইনস্টল করা থাকতে হবে, কারণ ইউনিভার্সাল <span class="latin" lang="en">xcframework</span> বানাতে <code>xcodebuild -create-xcframework</code> লাগে।',
    },
  ],
  sourceClosing:
    'ম্যাকের <span class="latin" lang="en">README</span> থেকে দুটি সতর্কবার্তা, যার যেকোনোটির দাম একটি বিকেল। ইনস্টল করা বান্ডলটি মুছে সেই জায়গাতেই আবার কপি করবেন না, আর <code>open</code> দিয়ে সেটি চালু করবেন না: দুটির যেকোনোটিতেই একসময় প্রতিটি কি-চাপ গিলে ফেলা হতে থাকে, সারিয়ে না তোলা পর্যন্ত। এ দুটোই ইনস্টলারের বদলে হাতে কাজ করার ঝামেলা, আর <a href="/bn/contribute/#working-on-the-code">কোনটায় কেন এমন হয়</a> লেখা আছে অবদানের পাতায়।',

  versions: {
    id: 'versions-license',
    heading: 'সংস্করণ আর লাইসেন্স',
    body: [
      // MIT for all three is asserted here and in the structured data, and stays. Only
      // obadh_engine has a LICENSE file tracked today; the two missing files are with the
      // author. See the note on /bn/about/#the-license.
      'ইঞ্জিন আছে <span class="latin">0.9.1</span>-এ, দুটি অ্যাপই <span class="latin">0.1.0</span>-এ। সবটাই এমআইটি লাইসেন্সে, লিখেছেন এনএসএস সায়ম, আর <a href="/bn/about/#the-license">এই লাইসেন্স আপনাকে কী করতে দেয়</a> লেখা আছে পরিচিতির পাতায়। কোন রিলিজে কী বদলাল আর কী ভাঙল, তার হিসাব থাকে ইঞ্জিনের <a href="https://github.com/nsssayom/obadh_engine/blob/main/CHANGELOG.md">চেঞ্জলগে</a>।',
      'দুটি অ্যাপ লেখার কাজটা একই কোড দিয়ে করে, তাই বানানের নিয়মে কোনো সংশোধন হলে সেটি আইফোন, আইপ্যাড আর ম্যাকে একসঙ্গেই পৌঁছায়। আইফোন আর আইপ্যাডে অ্যাপের <span class="latin" lang="en">About</span> পর্দায় <span class="latin" lang="en">Copy Build Details</span> বোতামটি আছে, আর বাগ রিপোর্টে ওটিই পেস্ট করে দেবেন।',
    ],
    source: 'ObadhApp/Sources/AboutView.swift',
  },

  closing:
    'ইনস্টল হয়ে গেলে বানানের জন্য দেখার জায়গা <a href="/bn/guide/">লেখার নিয়মের পাতা</a>, আর প্রথম সপ্তাহে যে প্রশ্নগুলো আসে — ফুল অ্যাক্সেস, ইন্টারনেট ছাড়া লেখা, অন্য কিবোর্ড পাশে রেখে দেওয়া — তার উত্তর আছে <a href="/bn/faq/">প্রশ্ন-উত্তরের পাতায়</a>।',
};
