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
  icon: 'speed' | 'accurate' | 'private' | 'free';
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
 * One card on /faq/. `lead` is the answer — yes, no, completely, three — and
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

export interface DownloadPlatform {
  id: string;
  name: string;
  state: 'shipping' | 'building';
  stateLabel: string;
  /** The deck. One of the forms in copy-shared.md §7, never a new one. */
  requirement: string;
  action?: Action;
  /** Beside the action, where a second route exists: macOS has All releases. */
  altAction?: Action;
  body: string[];
  /** The install steps: the only numbered list on this site, per art-direction.md §6. */
  stepsHeading?: string;
  /** Contract anchor: `turning-it-on`, `installing-it`. */
  stepsId?: string;
  stepsIntro?: string;
  steps?: { heading: string; body: string; source?: string }[];
  stepsAfter?: string;
  /** The h3 blocks under the platform, each with its own contract anchor. */
  sections?: Prose[];
}

/** A repository on `/download/#build-from-source`; the command is the point of the row. */
export interface RepoRow {
  /** Key in `LINKS.github`, so no page hard-codes a URL. */
  repo: 'engine' | 'ios' | 'macos';
  name: string;
  body: string;
}

/**
 * The panel at the top of /download/, which answers one question — what do I
 * press — for the device actually in front of the reader.
 *
 * Every variant is in the HTML. The script picks one and hides the rest, so
 * the page is complete without JavaScript and complete to a crawler, and the
 * routing is a convenience laid over a page that already worked.
 */
export interface DownloadGet {
  /** Shown before the script has decided, and to anyone without it. */
  all: { heading: string; body: string };
  mac: {
    heading: string;
    /** Used instead when the file is genuinely on its way. */
    startingHeading: string;
    body: string;
    starting: string;
    button: string;
    again: string;
  };
  iphone: { heading: string; body: string };
  ipad: { heading: string; body: string };
  /** A platform we can name and have not built for. `{platform}` is filled in. */
  soon: { heading: string; body: string; available: string };
  /** A platform we cannot name. */
  unknown: { heading: string; body: string; link: string };
  /** Only on a desktop, where the phone is the other device in the room. */
  qr: { heading: string; body: string; alt: string };
  /** Fills `{platform}` above. */
  names: { windows: string; linux: string; android: string; chromeos: string };
  appStore: string;
  macButton: string;
  /** Opens the full list for someone downloading on behalf of another device. */
  otherDevice: string;
}

export interface DownloadContent extends PageContent {
  /** The routed panel, above everything else on the page. */
  get: DownloadGet;
  /** The rest of the page head, after the standfirst. */
  intro: string[];
  /** Try the scheme before installing anything. */
  tryFirst: string;
  platforms: DownloadPlatform[];
  otherHeading: string;
  otherLede: string;
  /** What "Coming" means. This page states it; the others link to it. */
  otherIntro: string;
  /** Why each platform is its own piece of work, before the rows. */
  otherEngine: string;
  others: PlatformRow[];
  otherClosing: string;
  /** Section id `build-from-source`. */
  sourceHeading: string;
  sourceBody: string[];
  repos: RepoRow[];
  sourceClosing: string;
  versions: Prose;
  closing: string;
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
   line — structure where the structure is honest, and prose only where it is
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
 * column is a name — a platform, a repository — and whose right column says
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
