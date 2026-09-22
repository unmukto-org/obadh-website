import type { ThanksContent } from '../types';

/*
  Written for someone watching a progress bar. Every line is either the next
  thing to do or the reason they need at that second; nothing here explains
  the project, because they have already downloaded it.
*/
export const thanks: ThanksContent = {
  meta: {
    title: 'Install Obadh on your Mac',
    description: 'Obadh.dmg is downloading. Install it in four steps and add Obadh as a Bangla input source on macOS.',
  },

  eyebrow: 'Download',
  heading: 'Install Obadh',
  standfirst: 'Obadh.dmg is downloading.',

  steps: [
    { heading: 'Open Obadh.dmg' },
    { heading: 'Open Install Obadh', body: 'If macOS asks, click Open.' },
    { heading: 'Click Add Obadh', body: 'Then enter your password.' },
    { heading: 'Click Allow' },
  ],

  check: {
    heading: 'Switch and type',
    or: 'or',
    roman: 'ami banglay likhchi',
    bangla: 'আমি বাংলায় লিখছি',
  },

  retry: 'Download again',
  help: 'Ask on Discord',
};
