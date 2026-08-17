import type { ArticleContent } from '../types';

/*
  The question a person arrives with is "does this keyboard read what I type?",
  and the heading and the standfirst answer it before anything else. Every
  section under them says what you get — what it keeps, what it reads, how to
  erase it, how to check — never what the software is made of.

  This is the privacy position of a project, not the policy of two Apple apps.
  iPhone, iPad and Mac are what you can install today, and the answer is meant to be the
  same one on Linux, Android, Windows and ChromeOS. A platform is named here
  only where a reader needs it: which file on which system, which permission.

  Every claim was checked against the Swift and the Rust. This page got shorter
  by losing words, never a fact: the entitlement count, the 500-word ceiling,
  the thirty-day half-life, the three commits and the seventy-three lines are
  all still here, because they are what makes it checkable rather than earnest.
*/
export const privacy: ArticleContent = {
  meta: {
    title: 'Obadh privacy — nothing you type leaves your device',
    description:
      'Nothing you type leaves your device. No account, no analytics, no networking code anywhere in it — what stays on your phone, how to erase it, how to check.',
    ogImage: 'privacy.png',
    ogImageAlt: 'The Roman string ami tOmay bhalObasi above the Bangla it composes, আমি তোমায় ভালোবাসি',
  },

  eyebrow: 'Privacy',
  heading: 'Nothing you type leaves your device',
  standfirst:
    'There is no Obadh server, and nothing Obadh ships can open a network connection at all. What it learns stays on the device in your hand, and you can erase it whenever you like.',

  // The App Store privacy link points here, so this date is part of the page.
  // It matches SITE.privacyUpdated, which is what the <time> element carries.
  updated: '15 August 2026',

  sections: [
    {
      body: [
        'A keyboard sees your passwords, your messages, and the questions you would not ask out loud. Suspicion of one is reasonable, and a privacy page is not evidence — checking is. Every claim below names the file it rests on.',
        'Obadh is on iPhone, iPad and Mac today; Linux, Android, Windows and ChromeOS are coming. A platform is named below only where a file path or a permission differs from one to the next. The answer does not.',
      ],
    },

    {
      heading: 'It collects nothing about you',
      id: 'what-obadh-collects',
      body: [
        'There is no account, no sign-in, no email address, no advertising identifier, no analytics SDK, no crash reporter, and no telemetry of any kind. Obadh does not know how many people use it, which is a cost the project accepts.',
        // Re-check this wording against the label actually submitted, before the
        // listing goes live. The app has no App Store listing yet.
        'Apple makes every developer declare what an app collects and what it links to your identity. Every line of that form says none, and it will say none on the next platform that asks.',
      ],
    },

    {
      heading: 'Everything happens on your device',
      id: 'what-obadh-sends',
      body: [
        'None of it could send anything if it wanted to. The engine is the same Rust on every platform, and its whole dependency list is a serialization library, a finite-state transducer library, memory mapping and a hash function. The layer above it adds no networking either: not the iOS keyboard extension, not the iOS app, not the macOS input method — no <code>URLSession</code>, no sockets, no third-party SDK that might carry its own, and no HTTP client anywhere in any of it.',
        'Transliteration, autocorrect, next-word suggestions and emoji search all run inside the app on your device, against data files bundled in it: an autocorrect lexicon of 8.8 MB and a next-word model of another 29 MB, both shipped with the download. That is most of why the app is the size it is, and it is why all of it still works in airplane mode.',
      ],
    },

    {
      heading: 'It reads the word you are typing, then forgets it',
      id: 'what-the-keyboard-reads-while-you-type',
      body: [
        'Rewriting a word in place as you type it, and correcting one you have moved the cursor back into, both need the text immediately around the cursor; any keyboard that can edit a word reads it. That text is used for the keystroke and then gone. What stays behind is the two things listed below, and neither of them holds a sentence.',
        'One thing iOS handles for you whichever keyboard you use: a custom keyboard is not allowed into a secure text field. Tap a password field and the system keyboard takes over.',
      ],
    },

    {
      heading: 'Everything it keeps on your iPhone, in one list',
      id: 'on-iphone-and-ipad',
      body: [
        'The <strong>personal suggestion snapshot</strong> is a compact binary the engine exports, holding what it has learned about which words tend to follow which: counts over short runs — up to three words of context and the word that came next — plus the spelling of any word the shipped word list has no token for. It sits in the container the app and the keyboard share, at <code>Library/Application Support/ObadhKeyboard/personal-autosuggest.snapshot</code>. It is bounded in size, and it is validated on load against a fingerprint of the shipped model, so a snapshot built from a different generation of the data is discarded rather than imported.',
        'The <strong>learned-word store</strong> holds words you have typed that the built-in lexicon does not know — names, slang, brands — and any word at all, known or not, whose correction you refused by tapping your own spelling. It is there to stop autocorrect fixing a word you have shown it you mean.',
        'It does not believe you the first time. Each word accumulates evidence and is protected only once that evidence crosses a threshold, so a one-off typo cannot immunize itself. Refusing a correction protects the word at once; ordinary use takes three commits. Evidence halves after thirty days without use, so a word you have stopped typing fades out on its own. The store lives in the shared preferences under the key <code>keyboard.learnedWords</code>, holds at most 500 words, and keeps a score and a timestamp for each one.',
        'Your settings sit in the same shared preferences: haptics on or off, which language emoji search opens in, whether corrections may be inserted automatically, and when the keyboard last confirmed it had Full Access. The emoji panel remembers which skin tone you picked for a given emoji, and up to 32 recents, each with a timestamp and a use count that fades, which is how it decides what to drop.',
        'That is the complete list: no record of sentences, no history of what you typed in which app, and no timestamp anywhere except the ones named above.',
      ],
    },

    {
      heading: 'On a Mac it sees every keystroke you type',
      id: 'why-the-mac-input-method-is-not-sandboxed',
      body: [
        'That is what an input method is, on every platform and from every vendor: while it is the selected input source, everything you type goes through it. Obadh’s input method also runs outside the App Sandbox, because Text Input Services will not register a sandboxed input source. What differs between one input method and the next is what happens after the keystroke, and here that is a transliteration, a lookup in a local lexicon, and forgetting.',
      ],
    },

    {
      heading: 'Everything it keeps on your Mac',
      id: 'on-mac',
      body: [
        'The macOS input method stores its settings in its own preferences domain, <code>com.nsssayom.inputmethod.obadh</code>: whether the candidate bar is shown, how many suggestions it offers, whether auto-insert is on. It keeps the same kind of learned-word store as iOS, under the key <code>learnedWords</code> in the same domain, for the same reason. Auto-insert is off by default on both platforms. It does not bundle the next-word suggestion model, so there is no personal snapshot on a Mac at all.',
      ],
    },

    {
      heading: 'Erase what it has learned',
      id: 'how-to-erase-what-it-has-learned',
      body: [
        'On iPhone and iPad, open the Obadh app, go to Privacy, and choose Clear Learned Words. That deletes the personal snapshot and empties the learned-word store in one action. Suggestions from the built-in lexicon are unaffected, because they were never yours in the first place.',
        'Two things it does not reach. A keyboard still running holds its own copy of the snapshot and writes it back after the next word you commit, so switch away from the Obadh keyboard before you clear. And it leaves the emoji recents alone. Deleting the app removes its container, which takes those and everything else above with it.',
        'On a Mac, open Settings from the input source’s menu in the menu bar. Under Autocorrect a row says how many words are currently protected from correction, with a Reset button beside it that empties the whole store. That row is the only place the learning is visible or undoable, which is why the count is shown at all. It counts protected words only, and the button is greyed out when that count is zero, so a store holding nothing but words below the threshold has to be cleared from a terminal: <code>defaults delete com.nsssayom.inputmethod.obadh learnedWords</code> does it.',
      ],
    },

    {
      heading: 'Full Access gets you haptics and your own settings',
      id: 'what-full-access-does-on-ios',
      body: [
        'iOS asks you to allow Full Access before a keyboard extension may do two things Obadh needs: play haptic feedback, and read and write the container it shares with its own app. The switch is step three of <a href="/download/#turning-it-on">turning the keyboard on</a>, and it can be turned back off in the same place.',
        'Without it the keyboard still types. Transliteration, autocorrect and suggestions all work, because the data they need is bundled inside the extension. What you lose is the haptics, and everything in the shared container the extension cannot reach without it: the settings you chose in the app, and the words the keyboard would otherwise have learned to leave alone.',
        'Being wary of the prompt is fair, because Full Access is exactly the permission a keyboard would need in order to collect what you type and ship it somewhere. What it does not do is give Obadh something to send: the keyboard’s entitlements file lists exactly one entitlement, which is the shared container, and neither target contains code that opens a connection. Do not take a toggle’s word for that. Checking it takes about a minute, and the next section says how.',
      ],
    },

    {
      heading: 'Check every line of this yourself',
      id: 'checking-this-yourself',
      body: [
        'Clone <code>obadh-ios</code> and search it for <code>URLSession</code>, for <code>http</code>, for any networking symbol you can think of. The <code>http</code> hits are the DTD line at the top of every plist, a handful of URLs in comments, and <code>scripts/generate-emoji-data.py</code>, which downloads Unicode and CLDR data on a developer’s machine when the emoji tables are rebuilt. That script and the one under <code>obadh_engine/tools/</code> that fetches lexicon data are build tools, compiled into nothing.',
        'Open <code>Config/ObadhKeyboard.entitlements</code> and count the entitlements: there is one, and it is the app group. <code>Shared/Sources/Engine/PersonalAutosuggestStore.swift</code> is the whole of what gets written to disk, in seventy-three lines, and <code>Shared/Sources/Settings/LearnedWordStore.swift</code> holds the storage format, which is a dictionary of word to score and timestamp.',
        'The same holds for <code>obadh-macos</code> and for the engine. If you find something this page does not describe, that is a bug in this page, and reporting it as one is welcome.',
      ],
    },

    {
      heading: 'This site has no analytics either',
      id: 'what-this-website-collects',
      body: [
        'These pages are static files. They run no analytics, set no cookies, embed nothing from another domain, and load no third-party fonts or scripts; the typefaces come from this site like everything else. The one thing kept is the light or dark theme you chose, in your browser’s local storage under <code>obadh-theme</code>, read by this site and nothing else.',
        'The box you can type Bangla into runs the engine as WebAssembly inside your browser tab. It makes no request while you type and it sends nothing anywhere. What you type there stays in the tab and is gone when you close it.',
        'The pages sit on someone else’s server, and that server keeps the ordinary request log any web server keeps: an IP address, a timestamp, the page requested, the browser string. Obadh adds nothing on top of that, reads none of it, and has no way to connect any of it to anything you typed.',
      ],
    },

    {
      heading: 'Your writing stays here, even if suggestions learn from everyone',
      id: 'the-federated-learning-plan',
      // A plan, not a feature, and the only mention of federated learning on the
      // site. If it is ever built, this section is rewritten before the code ships.
      body: [
        'Autocorrect and next-word suggestions would get better if they could learn from how people actually write, and the only version of that worth building is one where nobody’s text leaves their device. Federated learning is the approach the project intends to take: models improve from updates computed on the device, and the writing itself stays where it was written.',
        'None of it is built. There is no such code in any of the repositories today, nothing on your device is participating in anything, and there is no date. It is on this page because a plan that affects privacy should be visible before it exists rather than after, and because it comes with a condition: if it cannot be built so that no text, and nothing reconstructible into text, ever leaves the device, it does not ship. This page will describe it before the code is released.',
      ],
    },

    {
      heading: 'Where to ask, and where to correct this page',
      id: 'questions-corrections-contact',
      body: [
        'Questions about anything on this page, and corrections to it, belong in an issue on the repository they concern: <a href="https://github.com/nsssayom/obadh_engine">obadh_engine</a>, <a href="https://github.com/nsssayom/obadh-ios">obadh-ios</a>, or <a href="https://github.com/nsssayom/obadh-macos">obadh-macos</a>. Issues are public, which is the point: a privacy answer given in private helps one person. The <a href="/faq/">FAQ</a> answers the shorter versions of these questions, and the <a href="/contribute/">contribute page</a> says what else the project needs.',
      ],
    },
  ],
};
