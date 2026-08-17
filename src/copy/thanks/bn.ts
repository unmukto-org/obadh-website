import type { ThanksContent } from '../types';

export const thanks: ThanksContent = {
  meta: {
    title: 'ধন্যবাদ: ম্যাকে অবাধ ইনস্টল করা',
    description: 'ডাউনলোড শুরু হয়েছে। চারটি ধাপে ম্যাকে অবাধ ইনস্টল করে বাংলা লেখা শুরু করুন, আর ঠিকমতো চলছে কি না তা যাচাই করে নিন।',
  },

  eyebrow: 'নামছে',
  heading: 'ধন্যবাদ। চার ধাপ পরেই লেখা শুরু।',
  standfirst: 'ডিস্ক ইমেজটি নামছে। এবার এটুকু করতে হবে।',

  steps: [
    {
      heading: 'ডিস্ক ইমেজটি খুলুন',
      body: 'ওটি আছে আপনার Downloads ফোল্ডারে। দুবার ক্লিক করুন।',
    },
    {
      heading: 'অবাধকে Applications-এ টানুন',
      body: 'যে জানালাটি খুলবে তাতে দুটিই আছে। টেনে নিয়ে ছেড়ে দিন।',
    },
    {
      heading: 'একবার অবাধ খুলুন',
      body: 'এতেই ম্যাকওএস একে ইনপুট সোর্স হিসেবে চেনে।',
    },
    {
      heading: 'সেটিংসে যোগ করুন',
      body: 'Settings › Keyboard › Input Sources › Edit, তারপর Bangla-র নিচে অবাধ যোগ করুন।',
    },
  ],

  check: {
    heading: 'ঠিকমতো চলছে কি না দেখুন',
    body: 'Control-Space চেপে অবাধে যান, তারপর লিখুন <code>ami banglay likhchi</code>। আসার কথা <span lang="bn">আমি বাংলায় লিখছি</span>।',
  },

  retry: {
    label: 'আবার নামান',
    note: 'কিছু শুরু না হলে ডিস্ক ইমেজটি এখানে।',
  },

  next: [
    { label: 'স্কিমের প্রতিটি নিয়ম', href: '/guide/' },
    { label: 'অভ্র থেকে আসছেন?', href: '/guide/#from-avro' },
    { label: 'আপনার লেখা নিয়ে অবাধ কী করে', href: '/privacy/' },
  ],
};
