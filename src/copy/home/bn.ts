import type { HomeContent } from '../types';

/*
  Terminology is settled in src/copy/GLOSSARY.bn.md.

  Written for someone who wants to type Bangla, not for someone who wants to
  read about an engine. Benefit first, one sentence under it, plain words,
  and no slogans past the hero.

  Fields the layout renders as plain text (button notes, platform lines, the
  box strings) take no markup, so Latin in them is left bare.
*/
export const home: HomeContent = {
  meta: {
    title: 'অবাধ: ফ্রি ও দ্রুত বাংলা কিবোর্ড',
    description:
      'ফ্রি বাংলা কিবোর্ড, দ্রুত, বানান ঠিক রাখে, আর সবকিছু আপনার ডিভাইসেই রাখে। আইফোন, আইপ্যাড ও ম্যাকে, লিনাক্স-অ্যান্ড্রয়েড-উইন্ডোজ আসছে।',
    ogTitle: 'অবাধ: ফ্রি ও দ্রুত বাংলা কিবোর্ড',
    ogDescription:
      'সব ডিভাইসে দ্রুত আর নির্ভুল বাংলা লেখা। ফ্রি, ওপেন সোর্স, আর আপনার লেখা ফোনের বাইরে যায় না।',
    ogImage: 'default.png',
    ogImageAlt: 'ami banglay gan gai লেখাটির নিচে তা থেকে তৈরি বাংলা, আমি বাংলায় গান গাই',
  },

  hero: {
    headingLead: 'সব ডিভাইসের {badge}:',
    badgeWord: 'বাংলা',
    headingAccent: 'দ্রুত, নির্ভুল, আধুনিক।',
    lede: 'ফ্রি, ওপেন সোর্স, আর আপনার লেখা কখনো ডিভাইস ছেড়ে যায় না।',
    cta: 'অবাধ নিন',
    // অ্যানিমেশনের বদলে যা পড়ে শোনানো হয়। রোমান অংশটুকু চিহ্নিত, নইলে বাংলা কণ্ঠ
    // ইংরেজি বর্ণগুলো বাংলা ধরে পড়ে।
    animationLabel:
      'রোমান বর্ণ লেখা হচ্ছে, আর এক অক্ষর করে বাংলা তৈরি হচ্ছে। শুরু হয় <span lang="en">amar sOnar bangla</span> দিয়ে, তাতে তৈরি হয় আমার সোনার বাংলা, তারপর একে একে অন্য লাইনগুলো আসে।',
  },

  values: [
    {
      id: 'speed',
      icon: 'speed',
      label: 'গতি',
      heading: 'আপনার সঙ্গেই চলে',
      body: 'একটি শব্দ তৈরি হতে লাগে প্রায় তিন মাইক্রোসেকেন্ড, নতুন ফোনে, পুরোনো ফোনেও।',
    },
    {
      id: 'accurate',
      icon: 'accurate',
      label: 'নির্ভুলতা',
      heading: 'বানান ঠিক তুলে আনে',
      // Latin digits, per GLOSSARY.bn.md §3: this figure is checked against a
      // file, and the other four pages that print it print it this way. The
      // field is plain text, so the run stays bare.
      body: 'সংশোধন আসে 845,461 বাংলা শব্দ থেকে, সঙ্গে মানুষ যেসব ইংরেজি শব্দ মিশিয়ে লেখে সেগুলোও।',
    },
    {
      id: 'native',
      icon: 'native',
      label: 'চেনা',
      heading: 'আপনার যন্ত্রের মতোই চলে',
      body: 'যেভাবে চালাতে অভ্যস্ত, ঠিক সেভাবেই চলে। নতুন করে কিছু শেখার নেই।',
    },
    {
      id: 'free',
      icon: 'free',
      label: 'ফ্রি',
      heading: 'ফ্রি, আর উন্মুক্ত',
      body: 'ব্যবহার করতে খরচ নেই, আর পুরো কোড এমআইটি লাইসেন্সে, যে কেউ পড়তে বা কাজে লাগাতে পারেন।',
    },
  ],

  /*
    দেখার জিনিসগুলো এখানে, চারটি টালি, আঁকা একটি কিবোর্ড আর কি-গুলোর একটি ছক।
    প্রতিটি লাইন একটি বাক্য; দুই বাক্য লাগলে বুঝতে হবে টালিটাই ভুল।
  */
  bento: {
    label: 'লেখার সময় যেমন লাগে',
    heading: 'ভাবার মতো কম জিনিস থাকে।',
    tiles: [
      {
        id: 'corrections',
        heading: 'শেষ কথা আপনারই',
        body: 'আপনার বানান আগে আসে, পাশে সংশোধনটা। আঙুলের নিচে কিছু বদলায় না।',
      },
      {
        id: 'learns',
        heading: 'আপনার শব্দ শিখে নেয়',
        body: 'নাম, চলতি কথা আর ব্র্যান্ড ডিভাইসেই মনে রাখে, আর কোথাও নয়।',
      },
      {
        id: 'emoji',
        heading: 'শব্দ থেকেই ইমোজি',
        body: 'শব্দটি লিখলেই তার ইমোজি সারিতে চলে আসে। নিলে শব্দের জায়গাতেই বসে যায়, কারণ শব্দটিই ছিল খোঁজ।',
      },
      {
        id: 'offline',
        heading: 'পুরোটাই চলে ডিভাইসে',
        body: 'লেখা তৈরি, সংশোধন আর পরামর্শ, সবই হয় আপনি যেখানে লিখছেন সেখানেই। ফ্লাইট মোডে কিছু বদলায় না।',
      },
    ],
    phone: {
      line: 'সবার উপরে মানুস',
      typed: 'মানুস',
      fixed: 'মানুষ',
      label:
        'ফোনে কিবোর্ডটির একটি আঁকা ছবি। কি-গুলোর উপরে একটি সারিতে আপনার লেখা বানান আর তার পাশে সংশোধনটি দেখা যাচ্ছে, সংশোধনটি জ্বলজ্বল করছে।',
    },
    emoji: {
      roman: 'bhalObasa',
      bangla: 'ভালোবাসা',
      symbol: '❤️',
      label:
        'bhalObasa লেখার পর পরামর্শের সারি: তাতে তৈরি বাংলা ভালোবাসা, আর তার জায়গায় দেওয়া একটি লাল হৃদয়।',
    },
  },

  demo: {
    label: 'লিখে দেখুন',
    heading: 'কিছু একটা লিখে দেখুন।',
    boxLabel: 'এখানে লিখুন',
    noscript: 'বাক্সটি চলতে জাভাস্ক্রিপ্ট লাগে। পূর্ণ খেলাঘর আছে এখানে:',
  },

  platforms: {
    label: 'সব জায়গায়',
    heading: 'আপনি যেখানেই লেখেন, একই কিবোর্ড।',
    rows: [
      {
        name: 'আইফোন ও আইপ্যাড',
        state: 'shipping',
        stateLabel: 'পাওয়া যাচ্ছে',
        line: 'লেখা নেয় এমন সব অ্যাপে চলে। iOS ও iPadOS 18 বা তার পরে।',
      },
      {
        name: 'ম্যাক',
        state: 'shipping',
        stateLabel: 'পাওয়া যাচ্ছে',
        line: 'ম্যাকের যেকোনো অ্যাপে লেখা যায়, সিস্টেমের নিজের ইনপুট সোর্সের মতোই। macOS 15 বা তার পরে।',
      },
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
    link: 'কীভাবে ইনস্টল করবেন',
  },

  avro: {
    label: 'অভ্র থেকে',
    heading: 'নতুন করে কিছু শিখতে হয় না',
    body: ['অভ্র বাংলা টাইপ করাটাকে স্বাভাবিক করেছিল। অবাধ সেই স্কিমই হুবহু রাখে, নতুন যা, তা ভেতরে।'],
    link: 'অবাধ কোথা থেকে এল',
    markLabel:
      'অভ্রর লাইন, ভাষা হোক উন্মুক্ত, তাতে একটি শব্দ বসিয়ে অবাধেরটি: ভাষা হোক আরও উন্মুক্ত।',
  },

  open: {
    heading: 'যারা ব্যবহার করে, তারাই বানায়, সবার সামনে।',
    lede: 'সবকিছু প্রকাশ্যে, এমআইটি লাইসেন্সে। একটি শব্দ ভুল বেরোলে সেটি জানানোই সবচেয়ে বড় সাহায্য।',
    link: 'কীভাবে সাহায্য করবেন',
  },
};
