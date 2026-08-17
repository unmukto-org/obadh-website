import type { Locale } from '../config';

/**
 * Captions for the screenshots from the app repositories.
 *
 * These say where each image came from, which is the whole point of showing
 * them: they are evidence, not art direction. A caption that described the
 * feeling of using the app would be doing the job of the device frame this
 * site refuses to draw.
 *
 * Kept out of i18n/ui.ts so that the page copy and the asset captions can be
 * edited without the two writers colliding.
 */
export interface ShotStrings {
  typingAlt: string;
  typingCaption: string;
  typingPlay: string;
  onboardingAlt: string;
  onboardingCaption: string;
}

export const shots: Record<Locale, ShotStrings> = {
  en: {
    typingAlt:
      'An iPhone in Notes. Roman letters are typed on the keyboard and Bangla appears in the note, with a strip of suggestions above the keys.',
    typingCaption: 'iPhone, Notes, dark appearance. Screen recording, unedited.',
    typingPlay: 'Play the recording',
    onboardingAlt:
      'The Obadh setup screen on iPhone, light on the left and dark on the right, showing the app icon, the name Obadh, and the line ভাষা হোক আরও উন্মুক্ত.',
    onboardingCaption: 'iPhone simulator, Release build, light and dark.',
  },

  bn: {
    typingAlt:
      'নোটস অ্যাপে একটি আইফোন। কিবোর্ডে ইংরেজি বর্ণ লেখা হচ্ছে আর নোটে বাংলা উঠছে, কি-গুলোর উপরে পরামর্শের সারি।',
    typingCaption: 'আইফোন, নোটস, ডার্ক মোড। স্ক্রিন রেকর্ডিং, অসম্পাদিত।',
    typingPlay: 'রেকর্ডিংটি চালান',
    onboardingAlt:
      'আইফোনে অবাধের সেটআপ পর্দা, বাঁয়ে আলো আর ডানে আঁধার, অ্যাপের আইকন, নাম আর ভাষা হোক আরও উন্মুক্ত লেখাসহ।',
    onboardingCaption: 'আইফোন সিমুলেটর, রিলিজ বিল্ড, আলো আর আঁধার দুটোতেই।',
  },
};
