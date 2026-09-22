/**
 * The shape every page's copy has to fill, in both languages.
 *
 * Copy lives in typed modules rather than markdown because the two languages
 * have to stay in step: if the English home page grows a capability block and
 * the Bangla one does not, this file is what makes the build say so.
 *
 * The Bangla side is written as Bangla. It is not a translation of the English
 * beside it, and where the two differ in shape the Bangla is right.
 */

export interface Meta {
  title: string;
  description: string;
  /** Read in a chat window rather than a result list, so it can be plainer. */
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  /**
   * What is in `ogImage`, and nothing else. Seven cards are served across the
   * site, so one site-wide alt would describe the wrong picture on most pages.
   * Plain text: it is rendered into an attribute, so markup cannot go in it.
   */
  ogImageAlt?: string;
}

export interface Action {
  label: string;
  /** The supporting line. Two of the actions in copy-shared.md §5 have none. */
  note?: string;
  href: string;
}

export interface PlatformRow {
  name: string;
  /** `shipping` reads in the brand colour, `building` warmly rather than greyed. */
  state: 'shipping' | 'building';
  stateLabel: string;
  line: string;
}

export interface Capability {
  id: string;
  heading: string;
  body: string;
  /** Provenance for the margin track: where the claim can be checked. */
  source?: string;
}

/** A value card: a label, a short benefit, and one line under it. */
export interface Value {
  id: string;
  icon: 'speed' | 'accurate' | 'native' | 'private' | 'free';
  label: string;
  heading: string;
  /** One sentence. If it needs two, it belongs on another page. */
  body: string;
}

/** A tile in the bento: a heading, one line, and something to look at. */
export interface BentoTile {
  id: string;
  heading: string;
  body: string;
}

export interface HomeContent {
  meta: Meta;
  hero: {
    /**
     * Split so the second half can carry the colour. `{badge}` in the lead is
     * replaced by the input-source badge; the word it stands for comes from
     * `badgeWord`, so a screen reader still reads the whole sentence.
     */
    headingLead: string;
    /** The script's name, on the badge and in the heading's accessible text. */
    badgeWord: string;
    headingAccent: string;
    lede: string;
    /** One button, and it always goes to /download/, which routes by platform. */
    cta: string;
    /** Read out in place of the transliteration animation. */
    animationLabel: string;
  };
  values: Value[];
  /** The visual block: four tiles, and almost no prose. */
  bento: {
    label: string;
    heading: string;
    tiles: BentoTile[];
    /** The drawn keyboard. Every Bangla string is verified in pairs.ts. */
    phone: { line: string; typed: string; fixed: string; label: string };
    /** The suggestion strip, showing an emoji offered for the word typed. */
    emoji: { roman: string; bangla: string; symbol: string; label: string };
  };
  demo: {
    label: string;
    heading: string;
    boxLabel: string;
    noscript: string;
  };
  platforms: {
    label: string;
    heading: string;
    rows: PlatformRow[];
    link: string;
  };
  /** Where the scheme came from. The one place Avro is named on this page. */
  avro: {
    label: string;
    heading: string;
    body: string[];
    link: string;
    /** Read out in place of the insertion mark, which has no reading order. */
    markLabel: string;
  };
  open: {
    heading: string;
    lede: string;
    link: string;
  };
}

export interface PageContent {
  meta: Meta;
  eyebrow: string;
  heading: string;
  standfirst: string;
}

/**
 * One card on /faq/. `lead` is the answer (yes, no, completely, three) and
 * `answer` is at most one short paragraph of support under it. A wall of text
 * in a card is a page-design bug as much as a writing one.
 *
 * Both fields are also the FAQPage structured data, joined in that order, so
 * the markup and the visible text stay the same sentence.
 */
export interface FaqItem {
  id: string;
  question: string;
  lead: string;
  answer?: string[];
}

/** Fifteen questions read as a list; four groups read as a page. */
export interface FaqGroup {
  id: string;
  heading: string;
  items: FaqItem[];
}

export interface FaqContent extends PageContent {
  groups: FaqGroup[];
}

/** One platform you can install today. */
export interface DownloadRelease {
  /** Contract anchor. `macos` and `ios` are linked from other pages. */
  id: 'ios' | 'macos';
  name: string;
  /** The one requirement worth knowing before you press the button. */
  requirement: string;
  action: Action;
  /** Beside the action, where a second route exists: macOS has all releases. */
  altAction?: Action;
  /** Three short facts, each a noun phrase. Never a sentence. */
  facts: string[];
}

/** A repository on `/download/#build-from-source`; the command is the point. */
export interface RepoRow {
  /** Key in `LINKS.github`, so no page hard-codes a URL. */
  repo: 'engine' | 'ios' | 'macos';
  name: string;
  body: string;
}

/**
 * /download/ lists every platform, in one place, and routes nothing.
 *
 * The hero button on the home page is what reads the user agent and sends a
 * person straight at their own release. This page is the opposite job: the
 * whole list, for someone choosing, or downloading for another device, or
 * checking whether their platform is there yet.
 */
export interface DownloadContent extends PageContent {
  releasesHeading: string;
  releases: DownloadRelease[];
  /** Section id `turning-it-on`. Four pages link at it. */
  setup: {
    heading: string;
    lede: string;
    ios: { heading: string; steps: string[] };
    macos: { heading: string; steps: string[] };
    after: string;
  };
  /** Section id `other-platforms`. */
  soon: {
    heading: string;
    lede: string;
    rows: PlatformRow[];
    action: Action;
  };
  /** Section id `build-from-source`. */
  source: {
    heading: string;
    lede: string;
    repos: RepoRow[];
  };
}

/**
 * /thanks/, where the Mac button lands after it starts the disk image.
 *
 * The person is watching a download bar and has nothing to do for ten seconds,
 * which is the best moment on the whole site to hand them the four steps. It
 * is a noindex page: it means nothing to anyone who did not arrive by pressing
 * the button.
 */
export interface ThanksContent extends PageContent {
  /** Four steps, each one thing to do. */
  steps: { heading: string; body: string }[];
  /** The line that proves it worked. */
  check: { heading: string; body: string };
  /** For a download that never started. */
  retry: { label: string; note: string };
  /** Where to go once it is typing. */
  next: { label: string; href: string }[];
  /**
   * For someone stuck mid-install, which is the moment on the whole site most
   * likely to need a person rather than a page.
   */
  help: { text: string; label: string };
}

/** A code sample on /developers/. The command is the point of the block. */
export interface CodeSample {
  /** Shown above the block, so a reader knows what they are looking at. */
  label: string;
  /** Language name for the label only. Nothing on this site highlights syntax. */
  lang: string;
  code: string;
}

/**
 * /developers/ introduces the engine as a library rather than as a keyboard.
 *
 * Everything on it must be checkable against the crate: versions, feature
 * names and API names come from obadh_engine itself, never from memory.
 */
export interface DevelopersContent extends PageContent {
  /** Section id `rust`. */
  rust: {
    heading: string;
    lede: string;
    facts: { term: string; value: string }[];
    blocks: CodeSample[];
    actions: Action[];
  };
  /** Section id `other-languages`. */
  bindings: {
    heading: string;
    lede: string;
    rows: { name: string; feature: string; body: string }[];
  };
  /** Section id `javascript`. The one unbuilt thing on the page. */
  javascript: {
    heading: string;
    state: string;
    lede: string;
    body: string[];
    action: Action;
  };
  repos: {
    heading: string;
    rows: RepoRow[];
  };
}

export interface GuideSection {
  /** Matches a SchemeGroup, so the table rows attach to their prose. */
  group: string;
  heading: string;
  /** The index label. A heading is a sentence; an index entry is a noun. */
  short?: string;
  body: string[];
}

/**
 * A rule card at the top of the guide. The pairs are named rather than
 * written out, so the Bangla comes from src/data/scheme.ts and is engine
 * verified like every other row on the page.
 */
export interface GuideRule {
  heading: string;
  /** `roman` values in src/data/scheme.ts. The build fails on an unknown one. */
  keys: string[];
}

/**
 * The guide's own furniture. Everything here labels a control rather than
 * saying anything, which is why it sits apart from the prose above.
 */
export interface GuideTools {
  indexHeading: string;
  filterLabel: string;
  /** ASCII only: it sits in a monospaced field, which has no Bangla. */
  filterPlaceholder: string;
  /** `{shown}` and `{total}` are filled in. */
  count: string;
  /** `{query}` is filled in. */
  empty: string;
  clear: string;
  copy: string;
  copied: string;
}

export interface GuideContent extends PageContent {
  intro: string[];
  /** The two or three rules every table below rests on. */
  rules?: GuideRule[];
  sections: GuideSection[];
  columnHeads: { roman: string; bangla: string; note: string };
  fromAvro: { heading: string; short?: string; body: string[] };
  /** The last paragraph of the from-avro section. */
  closing: string;
  /** Section id `strict`: what the engine refuses to transliterate, and why. */
  strict?: Prose;
  /** Section id `try`, the box's own section. `/contribute/` links to it. */
  tryIt?: Prose;
  tools?: GuideTools;
}

export interface Prose {
  heading?: string;
  id?: string;
  /** The index label, where the page carrying this block has an index. */
  short?: string;
  body: string[];
  /** Provenance for the margin track: where the claim can be checked. */
  source?: string;
}

export interface ArticleContent extends PageContent {
  sections: Prose[];
  updated?: string;
}

/* ------------------------------------------------------------------ blocks --

   /about/ and /contribute/ are not documents the way /privacy/ is. They are a
   spec list, a set of cards, a numbered path, a shell block and one pulled
   line, structure where the structure is honest, and prose only where it is
   not. Both pages are built out of the blocks below.

   Every text field here is rendered with `set:html`, which is the only reason
   an English page can wrap a Bangla run in its own `lang="bn"`.
*/

/** What introduces a block, and the one line that can follow it. */
interface BlockHead {
  /** Contract anchor. Other pages deep-link into these; see audit.mjs. */
  id?: string;
  eyebrow?: string;
  heading?: string;
  /** One line under the heading, and never a restatement of it. */
  intro?: string;
  /** One line under the payload. */
  after?: string;
}

export interface ProseBlock extends BlockHead {
  kind: 'prose';
  body: string[];
}

/** A spec list: a short term, and the fact it names. */
export interface FactsBlock extends BlockHead {
  kind: 'facts';
  items: { term: string; value: string }[];
}

/**
 * Cards. `grid` is a set of parallel things; `rows` is a list whose left
 * column is a name (a platform, a repository) and whose right column says
 * what it is. `href` turns the name into the link.
 */
export interface CardsBlock extends BlockHead {
  kind: 'cards';
  layout?: 'grid' | 'rows';
  items: { name: string; body: string; meta?: string; href?: string }[];
}

/** A path with an order to it, which is the only thing numbering may mean. */
export interface StepsBlock extends BlockHead {
  kind: 'steps';
  items: { heading: string; body: string }[];
}

/** One command per line, in the order you run them. */
export interface CodeBlock extends BlockHead {
  kind: 'code';
  lines: string[];
}

/** A line worth stopping on. It carries its own language. */
export interface QuoteBlock extends BlockHead {
  kind: 'quote';
  text: string;
  lang?: 'bn';
  note?: string;
}

export type PageBlock =
  | ProseBlock
  | FactsBlock
  | CardsBlock
  | StepsBlock
  | CodeBlock
  | QuoteBlock;

/**
 * A page built out of blocks rather than a column of prose.
 *
 * Whether the page ends on the tagline is the layout's `endTagline` prop, set
 * where the page is mounted, so there is one place it can be true.
 */
export interface BlockContent extends PageContent {
  blocks: PageBlock[];
}
