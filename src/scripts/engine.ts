/**
 * Loads the real obadh_engine, compiled to WebAssembly, in the visitor's browser.
 *
 * The files in /public/wasm/ are copied verbatim from the engine's own `pkg/`
 * output, so what runs on this page is the same code the keyboards link against.
 * Nothing is sent anywhere; the transliteration happens on the reader's machine.
 *
 * About 390 KB of wasm, so it is fetched only once and only when a demo on the
 * page actually wants it.
 */

type Engine = { transliterate(input: string): string; get_version(): string };

let pending: Promise<Engine> | null = null;

/** Resolves once, then hands the same instance to every caller. */
export function loadEngine(): Promise<Engine> {
  if (pending) return pending;

  pending = (async () => {
    // Built at runtime so the bundler leaves it alone: these files are copied
    // from the engine's own pkg/ output and are served, not bundled.
    const url = new URL('/wasm/obadh_engine.js', document.baseURI).href;
    const module = await import(/* @vite-ignore */ url);
    // The wasm sits beside the JS, so the default resolution is already correct.
    await module.default();
    return new module.ObadhaWasm() as Engine;
  })();

  return pending;
}

/** Warms the fetch without blocking anything, for when a demo is below the fold. */
export function prefetchEngine(): void {
  if (pending) return;
  const start = () => void loadEngine().catch(() => undefined);
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, o?: object) => number })
      .requestIdleCallback(start, { timeout: 3000 });
  } else {
    setTimeout(start, 1200);
  }
}
