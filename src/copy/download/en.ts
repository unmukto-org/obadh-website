import type { DownloadContent } from '../types';

/*
  The job of this page is to get someone typing, and nothing else.

  Read every line as if the reader is standing in Settings with the phone in
  their hand: it is either the next thing to tap, or a reason they need at that
  moment. Everything that is background — how the engine is put together, the
  parity gates, the history of a bug — is on /about/, /faq/ and /privacy/, and
  it is linked from here rather than repeated.

  It does not explain phonetic typing. Whoever is here came to install a
  keyboard, not to be taught the thing they have done since school.

  Two status words, the same ones the home page uses: Available and Coming.
*/
export const download: DownloadContent = {
  meta: {
    title: 'Download Obadh — free Bangla keyboard for iPhone, iPad, Mac',
    description:
      'Install the free Obadh Bangla keyboard on iPhone, iPad or Mac in four steps. No account, it works in every app you type in, and nothing you type leaves the device.',
    ogTitle: 'Obadh for iPhone, iPad and Mac',
    ogDescription:
      'Fast, accurate Bangla typing on iPhone, iPad and Mac. Free, four steps to set up, and nothing you type leaves the device.',
    ogImage: 'download.png',
    ogImageAlt: 'The Roman string obadhe bangla likhun above the Bangla it composes, অবাধে বাংলা লিখুন',
  },

  eyebrow: 'Download',
  heading: 'Four steps, and you are typing Bangla',
  standfirst:
    'Free on iPhone, iPad and Mac. Install it, turn it on in Settings, and it works in every app you already type in.',

  /*
    The panel the page opens with. It is written to be read by someone holding
    the device it is talking about, so it says what that device needs and
    nothing about the other four.

    All of it ships in the HTML and the script hides what does not apply, so
    every line here is also read by whoever has JavaScript off.
  */
  get: {
    all: {
      heading: 'Pick your device',
      body: 'Obadh is out on iPhone, iPad and Mac. Where the other platforms stand is further down this page.',
    },
    mac: {
      heading: 'Obadh for your Mac',
      startingHeading: 'Your download is starting',
      body: 'macOS 15 or later, Apple silicon and Intel. Signed and notarized, and there is nothing to buy.',
      starting: 'If nothing happened, the disk image is here.',
      button: 'Download Obadh for Mac',
      again: 'Download again',
    },
    iphone: {
      heading: 'Obadh for your iPhone',
      body: 'iOS 18 or later. Free on the App Store, with no account to make.',
    },
    ipad: {
      heading: 'Obadh for your iPad',
      body: 'iPadOS 18 or later. Free on the App Store, with no account to make.',
    },
    soon: {
      heading: 'Obadh is not on {platform} yet',
      body: 'There is nothing to install on {platform} today and no date worth promising. What that build still needs, and why, is further down this page.',
      available: 'What you can install today',
    },
    unknown: {
      heading: 'Nothing for this device yet',
      body: 'No Obadh release is planned for whatever you are reading this on, which may only mean nobody has asked for one. Say what you are typing on and it becomes something someone can pick up.',
      link: 'Open an issue on GitHub',
    },
    qr: {
      heading: 'Send it to your phone',
      body: 'Scan this and your phone lands on this page, which hands it whatever its own platform offers.',
      alt: 'QR code linking to this download page.',
    },
    names: {
      windows: 'Windows',
      linux: 'Linux',
      android: 'Android',
      chromeos: 'ChromeOS',
    },
    appStore: 'Get Obadh on the App Store',
    macButton: 'Download Obadh for Mac',
    otherDevice: 'Downloading for a different device?',
  },

  intro: [
    'Neither iOS nor macOS switches a new keyboard on by itself, so each one takes a single trip through Settings first. The steps are below, in the order the system asks for them.',
    'On Linux, Android, Windows or ChromeOS there is nothing to install yet. Where each of those stands is at the foot of this page.',
  ],

  tryFirst:
    'You can type Bangla right now, without installing anything. The <a href="https://sayom.me/obadh_engine/">engine playground</a> runs the same code the apps run, so what comes out there is what comes out on your phone. The <a href="/guide/">writing guide</a> has a typing box of its own, and every spelling rule in one place.',

  platforms: [
    {
      id: 'ios',
      name: 'Bangla on iPhone and iPad',
      state: 'shipping',
      stateLabel: 'Available',
      requirement: 'iOS and iPadOS 18 or later. Nothing to buy, no account to make.',
      body: [
        'It works wherever you type: Messages, Notes, Safari, a search field, a form in a browser. Password fields are the exception, along with the few apps that refuse third-party keyboards outright, and both of those are iOS’s call rather than Obadh’s.',
        'What you type goes into the field as ordinary text. Edit a word you wrote yesterday and it edits like any other word; switch to another keyboard halfway through one and the Bangla you have already typed stays exactly where it is.',
      ],
      // LINKS.appStore is a marked placeholder in src/config.ts, replaced with the real
      // listing before launch. copy-shared.md §5 proposed swapping the button for a "Build it
      // from source" fallback; settled the other way, and the button stays. What does not
      // ship is a machine-readable claim: DownloadPage.astro emits no `downloadUrl`, because
      // a crawler acts on that address by itself and a reader reads the note beside it.
      action: {
        label: 'Get Obadh on the App Store',
        note: 'Free. App 0.1.0. Engine 0.9.1. MIT.',
        href: 'appStore',
      },
      stepsHeading: 'Turning it on',
      stepsId: 'turning-it-on',
      stepsIntro:
        'Four steps, in this order. iOS does not offer you the third one until the second is done.',
      steps: [
        {
          heading: 'Install Obadh and open it once.',
          body: 'It opens Settings for you and shows what to tap when you get there.',
        },
        {
          heading: 'Turn Obadh on in Settings.',
          body: 'The path is Settings › Obadh › Keyboards. It shows up in your keyboard list as Obadh.',
        },
        {
          heading: 'Allow Full Access.',
          body: 'The switch is on that same screen. The keyboard types fine without it; <a href="#full-access">what you lose</a> is a few paragraphs down.',
        },
        {
          heading: 'Hold the globe key.',
          body: 'Hold it in any app and pick Obadh. Type <code>ami banglay likhchi</code> and you should get <span lang="bn">আমি বাংলায় লিখছি</span>.',
        },
      ],
      sections: [
        {
          id: 'full-access',
          heading: 'What you lose without Full Access',
          body: [
            'A keyboard sees every word you write, so iOS warns you at that switch in wording broad enough to cover every keyboard on the store. What it actually changes in Obadh is short enough to list.',
            'The keys stop tapping back: a keyboard cannot reach haptics without it, and no iPad has the hardware for them anyway. The settings you pick in the Obadh app stop reaching the keyboard too — whether haptics are on, which language emoji search uses, and whether a confident correction goes in for you when you press space.',
            'It also stops remembering. The words you have taught it to leave alone, the emoji you reached for last and the skin tone you picked for one of them have nowhere to be written, so none of it is there the next time you type.',
            'Everything you type with keeps working with the switch off: the Bangla itself, the suggestion strip, next-word suggestions, emoji search and the Bangla numerals.',
            'The keyboard has no networking code in it — no <code>URLSession</code>, no sockets, nothing that can open a connection — so Full Access grants a permission it has nothing to spend. <a href="/privacy/#what-full-access-does-on-ios">The privacy page</a> says how to check that yourself in about a minute, and the switch turns back off in the same place you turned it on.',
          ],
          source:
            'RequestsOpenAccess in ObadhKeyboard/Info.plist. Haptics: Shared/Sources/Keyboard/KeyboardFeedbackController.swift. The three app settings: ObadhApp/Sources/SettingsView.swift. What the keyboard writes: Shared/Sources/Settings/LearnedWordStore.swift and Shared/Sources/Keyboard/Emoji/.',
        },
        {
          id: 'what-the-keyboard-does',
          heading: 'Corrections you can see coming',
          body: [
            'The strip above the keys shows your own spelling first and the corrections beside it, so nothing changes under your fingers unless you take it. Space commits exactly the word you can see. Auto-insert, where space takes the correction instead, is off by default and fires only when the correction is a safe bet.',
            'Emoji come up in the strip for the word you are composing, and tapping one replaces the word rather than adding to it, because what you typed was the query: <code>bhalObasa</code> gives <span lang="bn">ভালোবাসা</span>, with ❤️ offered in its place. Emoji search works in Bangla and English.',
            'The punctuation a Bangla sentence needs is on the keyboard: <a href="/guide/#numerals">Bangla numerals</a> <span lang="bn">০–৯</span> on the number pad, <span lang="bn">৳</span> and <span lang="bn">।</span> on the punctuation pages, and two quick taps on the space bar for a dari.',
            'The keys are where your thumbs already expect them. Their size and position are measured against Apple’s own keyboard on six iPhone classes and five iPads, in both orientations, and their colors against the system’s in light and dark.',
          ],
          source:
            'docs/native-parity.md: the gate table, and the “honest gaps” list of what is not covered.',
        },
      ],
    },
    {
      id: 'macos',
      name: 'Bangla on a Mac',
      state: 'shipping',
      stateLabel: 'Available',
      requirement: 'macOS 15 or later. Apple silicon and Intel. Notarized.',
      body: [
        'On the Mac, Obadh is an input source rather than an app you keep open. You switch to it the way you switch to any other layout, and it types into any Mac app. macOS holds as many input sources as you like, so adding this one takes nothing away from what you already use.',
        'What you download is a disk image with one app in it, and that app is the installer: open it and it puts itself where an input method has to live, registers the input source, and switches you to it. There is nothing to drag to Applications, and nothing to run afterwards.',
      ],
      // LINKS.macDmg is a marked placeholder until the first release is tagged. Same rule as
      // the iOS button above: the button stays, and the structured data carries no
      // `downloadUrl` for it.
      action: {
        label: 'Download Obadh for Mac',
        note: 'Free. App 0.1.0. Engine 0.9.1. Signed and notarized. MIT.',
        href: 'macDmg',
      },
      altAction: { label: 'All releases', href: 'macReleases' },
      stepsHeading: 'Installing it',
      stepsId: 'installing-it',
      stepsIntro: 'Four steps. macOS asks for your password once, at the second.',
      steps: [
        {
          heading: 'Open the disk image and open Obadh.',
          body: 'Setup runs on first launch.',
        },
        {
          heading: 'Click Get Started, then Add Obadh.',
          body: 'macOS asks for your password. That is the copy into <code>/Library/Input Methods</code>, which needs an administrator, and it is the only time Obadh asks for one.',
        },
        {
          heading: 'Choose Allow.',
          body: 'macOS asks whether to enable the input source, and its dialog warns that the developer of an input method can see everything you type. That is true of every third-party input method on the Mac, and what Obadh does with what you type is <a href="/privacy/">nothing that leaves your Mac</a>.',
        },
        {
          heading: 'Press Globe or Control-Space.',
          body: 'That switches you to <span lang="bn">বাংলা (অবাধ)</span>. Then type.',
        },
      ],
      stepsAfter:
        'If the input source does not appear on its own, add it by hand in System Settings › Keyboard › Input Sources: the + button, then Bangla, then <span lang="bn">বাংলা (অবাধ)</span>. To remove it later, take it out of that same list and delete <code>/Library/Input Methods/Obadh.app</code>, which asks for an administrator password. <a href="/privacy/#how-to-erase-what-it-has-learned">Clearing what it has learned</a> is on the privacy page, and does not need an uninstall.',
      sections: [
        {
          id: 'typing-with-it',
          heading: 'You do not have to choose anything',
          body: [
            'The Bangla appears at the cursor as marked, underlined text, and space or return commits it. When there are other spellings for the word in progress, a small bar appears beside it, with the word the rules produced already selected — so ignoring the bar entirely gets you exactly that.',
            'Arrow keys, Tab, Control-N and Control-P move through it, return or space takes the selection, escape dismisses it, and if it sits where you are reading you can drag it by the grip on its left. Number keys do not pick entries, because digits are part of the <a href="/guide/#numerals">writing scheme</a>: <code>songkhya1</code> is <span lang="bn">সংখ্যা১</span> and <code>$500</code> is <span lang="bn">৳৫০০</span>. A token with no letters in it gets the plain version offered beside the Bangla, so <span lang="bn">২০১১</span> arrives with <code>2011</code> next to it and one press of the right arrow takes the digits instead.',
            'Next-word suggestions are not in the Mac build. Predicting the next word is a phone-keyboard feature and its data is 29 MB, so the Mac carries the corrections without the predictions.',
            // The greying-out is listed as not yet verified in the macOS working notes. Run it on
            // a real machine before launch, or cut the clause after "off by default there too".
            'The bar, and how many spellings it shows, are in Settings, reached from the <span lang="bn">বাংলা (অবাধ)</span> menu in the menu bar. Auto-insert is off by default there too, and it depends on the bar being visible, because a correction you cannot see coming is not one you can stop.',
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
  otherHeading: 'Linux, Android, Windows and ChromeOS',
  otherLede: 'Nothing to install on any of these yet, and no date to promise.',
  otherIntro:
    '“Coming” here means what it says and nothing more. None of the four has been started in the open: there is no Linux, Android, Windows or ChromeOS repository yet, and nothing you can install. When one exists it will be public from its first commit, and when it builds into something a person can use, it gets a button on this page and a place in the header. There is no list to join.',
  otherEngine:
    'The Bangla itself is not what stands in the way: the same code already runs on iPhone, iPad and Mac, and <a href="/about/#how-it-is-built">how that is put together</a> is on the about page. What each of the four still needs is the keyboard around it, written against that system’s own framework.',
  others: [
    {
      name: 'Linux, X11 and Wayland',
      state: 'building',
      stateLabel: 'Coming',
      line: 'Both display servers, so it works whichever one your desktop uses.',
    },
    { name: 'Android', state: 'building', stateLabel: 'Coming', line: 'Not ready to install yet.' },
    { name: 'Windows', state: 'building', stateLabel: 'Coming', line: 'Not ready to install yet.' },
    { name: 'ChromeOS', state: 'building', stateLabel: 'Coming', line: 'Not ready to install yet.' },
  ],
  otherClosing:
    'If you want one of these sooner, the repositories are open and the <a href="/contribute/">contribute page</a> says where to start. Someone who has written an IBus engine or an Android input method before would be the person to start one.',

  sourceHeading: 'Building it yourself',
  sourceBody: [
    'All three repositories build from a clean checkout, and the README in each one is the real instruction. Both apps need Xcode, because a keyboard extension and an input method are signed system bundles, and all three need a Rust toolchain.',
  ],
  repos: [
    {
      repo: 'engine',
      name: 'obadh_engine',
      body: "The Rust engine. <code>./init.sh</code> resolves the data submodules and the runtime artifacts, then <code>cargo run --features cli --bin obadh -- 'aji e probhate robir kor'</code> prints <span lang=\"bn\">আজি এ প্রভাতে রবির কর</span>. The <code>wasm</code> feature builds the playground.",
    },
    {
      repo: 'ios',
      name: 'obadh-ios',
      body: 'The iPhone and iPad keyboard. <code>./scripts/bootstrap.sh</code>, then <code>./scripts/install-device.sh</code> builds Release and puts it on a connected device. Xcode 26 or later, XcodeGen, a Rust toolchain. A free Apple developer account works, but its provisioning profile expires after seven days, and when it does the phone says “Obadh is not available anymore”. That is Apple’s timer, not a failed build.',
    },
    {
      repo: 'macos',
      name: 'obadh-macos',
      body: 'The Mac input method. <code>brew install xcodegen</code>, <code>./scripts/bootstrap.sh</code>, then <code>./scripts/install-local.sh</code> to build and install locally. A full Xcode install, because the universal xcframework needs <code>xcodebuild -create-xcframework</code>.',
    },
  ],
  sourceClosing:
    'Two warnings out of the macOS README, either of which will cost you an afternoon. Never delete and recopy the installed bundle in place, and never launch it with <code>open</code>: either one eventually swallows every keystroke until it is repaired. Both are hazards of doing this by hand rather than through the installer, and <a href="/contribute/#working-on-the-code">why each of them does that</a> is on the contribute page.',

  versions: {
    id: 'versions-license',
    heading: 'Versions and license',
    body: [
      // MIT for all three is asserted here and in the structured data, and stays. Only
      // obadh_engine has a LICENSE file tracked today; the two missing files are with the
      // author. See the note on /about/#the-license.
      'The engine is at 0.9.1 and both apps are at 0.1.0. Everything is MIT licensed and written by NSS Sayom, and <a href="/about/#the-license">what that license lets you do</a> is on the about page. The engine’s <a href="https://github.com/nsssayom/obadh_engine/blob/main/CHANGELOG.md">changelog</a> records what changed and what broke in each release.',
      'Both apps share the same typing code, so a fix in the spelling rules reaches iPhone, iPad and Mac together. On iPhone and iPad, the About screen has a Copy Build Details button, and that is what to paste into a bug report.',
    ],
    source: 'ObadhApp/Sources/AboutView.swift',
  },

  closing:
    'Once it is installed, the <a href="/guide/">writing guide</a> is the reference for spelling, and the <a href="/faq/">FAQ</a> answers what comes up in the first week: Full Access, typing offline, keeping another keyboard alongside this one.',
};
