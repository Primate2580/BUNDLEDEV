/**
 * npm run test:render
 *
 * Mounts the real pages inside a router (server-side) to catch crashes the type-checker can't see:
 * undefined access, missing providers, bad route patterns. Effects don't run here, so pages that load data
 * render their loading state; the point is that nothing throws and every route resolves.
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html lang='en'><body></body></html>", { url: "http://localhost/", pretendToBeVisual: true });
const storage = new Map<string, string>();
Object.assign(globalThis, {
  window: Object.assign(dom.window, {
    matchMedia: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
  }),
  document: dom.window.document,
  localStorage: { getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => void storage.set(k, v), removeItem: (k: string) => void storage.delete(k) },
  matchMedia: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
});

const { renderToString } = await import("react-dom/server");
const { createElement } = await import("react");
const { StaticRouter } = await import("react-router");
const { default: App } = await import("../src/App");

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : `  -> ${extra}`));
  if (!cond) failed++;
};

const render = (path: string) => renderToString(createElement(StaticRouter, { location: path }, createElement(App)));

const routes: [string, RegExp, string][] = [
  ["/", /Learn HTML, CSS and Tailwind/, "the dashboard shows its heading"],
  ["/css", /Roadmap/, "a track roadmap page"],
  ["/html", /Roadmap/, "another track roadmap"],
  ["/tailwind", /Roadmap/, "the third track roadmap"],
  ["/playground", /Playground/, "the playground"],
  ["/visualizer", /Visualizer/, "the visualizer page"],
  ["/css/flexbox", /Flexbox/, "a topic page"],
  ["/css/subgrid", /Subgrid/, "a topic that isn't written yet"],
  ["/css/flexbox/axes", /Loading lesson|Flexbox/, "a lesson route (loading state)"],
  ["/nope", /find that page|Page not found|Roadmap/, "an unknown single-segment path never crashes"],
  ["/nope/nothing", /find that page/, "an unknown two-segment path is a friendly not-found"],
  ["/css/flexbox/no-such-lesson", /Loading lesson|find that page/, "an unknown lesson id never crashes"],
];
for (const [path, expected, label] of routes) {
  let html = "";
  let error = "";
  try {
    html = render(path);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  ok(`${path}: ${label}`, !error && expected.test(html), error || html.slice(0, 160));
}

ok("the app shell has a skip link, search, theme toggle and nav landmarks", (() => {
  const html = render("/");
  return html.includes("Skip to content") && html.includes('aria-label="Search lessons"') && html.includes('aria-label="Color theme"') && html.includes('aria-label="Course navigation"');
})());
ok("the playground is a pane workspace with Learn, Editor and Output and two splitters", (() => {
  const html = render("/playground");
  return ["pane-learn", "pane-editor", "pane-output"].every((id) => html.includes(`id="${id}"`)) && (html.match(/role="separator"/g) ?? []).length === 2;
})());
ok("the toolbar links to the Playground and the Visualizer", (() => {
  const html = render("/");
  return html.includes('href="/playground"') && html.includes('href="/visualizer"');
})());
ok("the shell labels its main region and focus target", /<main id="main"[^>]*tabindex="-1"/.test(render("/")));
ok("the sidebar lists all three tracks", ["HTML", "CSS", "Tailwind CSS"].every((t) => render("/").includes(t)));
ok("unwritten topics are marked 'Coming soon' in the sidebar", render("/css").includes("Coming soon"));

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
