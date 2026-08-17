import type { DownloadContent } from '../types';
import { LINKS, SITE } from '../../config';

/*
  ইংরেজি পাতার মতোই: শুধু তালিকা। প্ল্যাটফর্ম বেছে নেওয়ার কাজটুকু এখানে,
  আর হোম পেজের বোতামটি নিজেই বুঝে নেয় পাঠক কোন যন্ত্রে আছেন।
*/
export const download: DownloadContent = {
  meta: {
    title: 'অবাধ নামান: আইফোন, আইপ্যাড আর ম্যাকের ফ্রি বাংলা কিবোর্ড',
    description:
      'আইফোন, আইপ্যাড আর ম্যাকের জন্য ফ্রি অবাধ বাংলা কিবোর্ড। অ্যাকাউন্ট লাগে না, সব অ্যাপে চলে, আর আপনার লেখা যন্ত্রের বাইরে যায় না।',
    ogTitle: 'অবাধ নামান',
    ogDescription:
      'আইফোন, আইপ্যাড আর ম্যাকে ফ্রি বাংলা লেখা। প্রতিটি প্ল্যাটফর্মের পাশে একটি বোতাম, আর আপনার লেখা কোথাও যায় না।',
    ogImage: 'download.png',
    ogImageAlt: 'obadhe bangla likhun রোমান লেখাটির নিচে তার বাংলা, অবাধে বাংলা লিখুন',
  },

  eyebrow: 'ডাউনলোড',
  heading: 'অবাধ নিন',
  standfirst: 'যেসব প্ল্যাটফর্মে পৌঁছেছে, সবগুলোতেই ফ্রি। নিজেরটি বেছে নিন।',

  releasesHeading: 'এখনই পাওয়া যাচ্ছে',

  releases: [
    {
      id: 'ios',
      name: 'আইফোন ও আইপ্যাড',
      requirement: `আইওএস ও আইপ্যাডওএস ${SITE.minOS.ios} বা তার পরের সংস্করণ`,
      action: { label: 'অ্যাপ স্টোর থেকে নিন', href: LINKS.appStore },
      facts: ['ফ্রি, অ্যাকাউন্ট লাগে না', 'যেকোনো অ্যাপে', 'লেখা যন্ত্রেই থাকে'],
    },
    {
      id: 'macos',
      name: 'ম্যাক',
      requirement: `ম্যাকওএস ${SITE.minOS.macos} বা তার পরের সংস্করণ, অ্যাপল সিলিকন ও ইন্টেল`,
      action: {
        label: 'ম্যাকের জন্য নামান',
        note: `সংস্করণ ${SITE.versions.macos}`,
        href: LINKS.macDmg,
      },
      altAction: { label: 'সব সংস্করণ', href: LINKS.macReleases },
      facts: ['সাইনড ও নোটারাইজড', 'সিস্টেমের ইনপুট সোর্স', 'লেখা যন্ত্রেই থাকে'],
    },
  ],

  setup: {
    heading: 'চালু করা',
    lede: 'কোনো সিস্টেমই নতুন কিবোর্ড নিজে থেকে চালু করে না, তাই একবার সেটিংসে যেতে হয়।',
    ios: {
      heading: 'আইফোন ও আইপ্যাড',
      steps: [
        'অবাধ ইনস্টল করে একবার খুলুন।',
        'Settings › Obadh › Keyboards, সেখানে অবাধ চালু করুন।',
        'একই পর্দায় Allow Full Access চালু করুন। <a href="/bn/faq/#full-access">এতে কী বদলায়</a> তা ছোট তালিকা।',
        'যেকোনো অ্যাপে গ্লোব বোতাম চেপে ধরে অবাধ বেছে নিন।',
      ],
    },
    macos: {
      heading: 'ম্যাক',
      steps: [
        'ডিস্ক ইমেজ খুলে অবাধকে Applications-এ টেনে দিন।',
        'একবার খুলুন, যাতে ম্যাকওএস ইনপুট সোর্সটি চেনে।',
        'Settings › Keyboard › Input Sources › Edit, তারপর Bangla-র নিচে অবাধ যোগ করুন।',
        'Control-Space চেপে অবাধে যান।',
      ],
    },
    after:
      '<code>ami banglay likhchi</code> লিখলে আসার কথা <span lang="bn">আমি বাংলায় লিখছি</span>। কোনো অক্ষর অন্যরকম এলে <a href="/bn/guide/">লেখার নিয়মের পাতায়</a> পুরো স্কিমটি আছে।',
  },

  soon: {
    heading: 'এখনো হয়নি',
    lede: 'এগুলোর কোনোটিই শুরু হয়নি। প্রতিটির জন্য আলাদা ফ্রেমওয়ার্কে ইনপুট মেথড লিখতে হয়, আর যেকোনো একটি আপনারও হতে পারে।',
    rows: [
      { name: 'লিনাক্স', state: 'building', stateLabel: 'আসছে', line: 'আইবাস ও এফসিআইটিএক্স৫, এক্স১১ ও ওয়েল্যান্ড' },
      { name: 'অ্যান্ড্রয়েড', state: 'building', stateLabel: 'আসছে', line: 'ইঞ্জিনের উপরে একটি ইনপুট মেথড সার্ভিস' },
      { name: 'উইন্ডোজ', state: 'building', stateLabel: 'আসছে', line: 'একটি টেক্সট সার্ভিসেস ফ্রেমওয়ার্ক প্রোভাইডার' },
      { name: 'ক্রোমওএস', state: 'building', stateLabel: 'আসছে', line: 'ব্রাউজার এক্সটেনশনের ইনপুট মেথড' },
    ],
    action: { label: 'কোথা থেকে শুরু', href: '/contribute/' },
  },

  source: {
    heading: 'নিজে বিল্ড করুন',
    lede: 'সবকিছু এমআইটি লাইসেন্সে, আর প্রতিটি রিপোজিটরি আলাদাভাবেই বিল্ড হয়।',
    repos: [
      { repo: 'engine', name: 'obadh_engine', body: 'রাস্টে লেখা ইঞ্জিন, সঙ্গে কমান্ড-লাইন টুল।' },
      { repo: 'ios', name: 'obadh-ios', body: 'আইফোন ও আইপ্যাডের কিবোর্ড।' },
      { repo: 'macos', name: 'obadh-macos', body: 'ম্যাকের ইনপুট মেথড।' },
    ],
  },
};
