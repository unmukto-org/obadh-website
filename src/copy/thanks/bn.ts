import type { ThanksContent } from '../types';

export const thanks: ThanksContent = {
  meta: {
    title: 'ম্যাকে অবাধ ইনস্টল করুন',
    description: '<span class="latin" lang="en">Obadh.dmg</span> ডাউনলোড হচ্ছে। চারটি ধাপে ইনস্টল করে ম্যাকওএসে অবাধকে বাংলা ইনপুট সোর্স হিসেবে যোগ করুন।',
  },

  eyebrow: 'ডাউনলোড',
  heading: 'অবাধ ইনস্টল করুন',
  standfirst: '<span class="latin" lang="en">Obadh.dmg</span> ডাউনলোড হচ্ছে।',

  steps: [
    { heading: '<span class="latin" lang="en">Obadh.dmg</span> খুলুন' },
    { heading: '<span class="latin" lang="en">Install Obadh</span> খুলুন', body: 'ম্যাকওএস জানতে চাইলে <span class="latin" lang="en">Open</span>-এ ক্লিক করুন।' },
    { heading: '<span class="latin" lang="en">Add Obadh</span>-এ ক্লিক করুন', body: 'তারপর পাসওয়ার্ড দিন।' },
    { heading: '<span class="latin" lang="en">Allow</span>-এ ক্লিক করুন' },
  ],

  check: {
    heading: 'অবাধে গিয়ে লিখুন',
    or: 'অথবা',
    roman: 'ami banglay likhchi',
    bangla: 'আমি বাংলায় লিখছি',
  },

  retry: 'আবার ডাউনলোড করুন',
  help: 'ডিসকর্ডে জিজ্ঞেস করুন',
};
