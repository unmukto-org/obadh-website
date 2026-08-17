import type { ThanksContent } from '../types';

/*
  Written for someone watching a progress bar. Every line is either the next
  thing to do or the reason they need at that second; nothing here explains
  the project, because they have already downloaded it.
*/
export const thanks: ThanksContent = {
  meta: {
    title: 'Thanks: installing Obadh on your Mac',
    description: 'Your download has started. Four steps to install Obadh and start typing Bangla.',
  },

  eyebrow: 'Downloading',
  heading: 'Thanks. Four steps and you are typing.',
  standfirst: 'The disk image is on its way. Here is what to do with it.',

  steps: [
    {
      heading: 'Open the disk image',
      body: 'It is in your Downloads folder. Double-click it.',
    },
    {
      heading: 'Drag Obadh to Applications',
      body: 'The window that opens shows both. Drag it across.',
    },
    {
      heading: 'Open Obadh once',
      body: 'This is what registers it with macOS as an input source.',
    },
    {
      heading: 'Add it in Settings',
      body: 'Settings › Keyboard › Input Sources › Edit, then add Obadh under Bangla.',
    },
  ],

  check: {
    heading: 'Check it works',
    body: 'Press Control-Space to switch to Obadh, then type <code>ami banglay likhchi</code>. You should get <span lang="bn">আমি বাংলায় লিখছি</span>.',
  },

  retry: {
    label: 'Download again',
    note: 'If nothing started, the disk image is here.',
  },

  next: [
    { label: 'Every rule of the scheme', href: '/guide/' },
    { label: 'Coming from Avro', href: '/guide/#from-avro' },
    { label: 'What Obadh does with your typing', href: '/privacy/' },
  ],
};
