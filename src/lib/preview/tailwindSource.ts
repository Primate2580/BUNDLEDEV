let cached: Promise<string> | undefined;

/**
 * Tailwind's browser build as text, so it can be inlined into the preview iframe.
 * The file lives in src/vendor (copied from @tailwindcss/browser, see
 * `npm run vendor:tailwind`) so the app never depends on how a package resolves.
 * Downloaded once, and only when a Tailwind lesson is opened.
 */
export function loadTailwindSource(): Promise<string> {
  cached ??= import("@/vendor/tailwind-browser.global.js?raw").then((module) => module.default);
  // Let a later call retry if the download failed.
  cached.catch(() => {
    cached = undefined;
  });
  return cached;
}
