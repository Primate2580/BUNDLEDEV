import { JSDOM } from "jsdom";
import { runChecks } from "../src/lib/checks/runChecks";
import { buildSrcDoc } from "../src/lib/preview/buildSrcDoc";
import type { Check } from "../src/engine/types";

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : extra ? `  -> ${extra}` : ""));
  if (!cond) failed++;
};

const page = (html: string) =>
  new JSDOM(html, { pretendToBeVisual: true }).window as unknown as Window;
const run = (html: string, check: Check) => runChecks([check], page(html))[0];
const passes = (html: string, check: Check) => run(html, check).passed;

/* ---------- doctype ---------- */
ok("doctype: present", passes("<!doctype html><html><body></body></html>", { type: "doctype", message: "" }));
ok("doctype: missing fails", !passes("<html><body></body></html>", { type: "doctype", message: "" }));

/* ---------- exists / count ---------- */
const list = "<!doctype html><ul><li>a</li><li>b</li><li>c</li></ul>";
ok("exists: found", passes(list, { type: "exists", selector: "ul > li", message: "" }));
ok("exists: missing fails", !passes(list, { type: "exists", selector: "ol", message: "" }));
ok("exists: invalid selector reports it", /isn't valid/.test(run(list, { type: "exists", selector: "ul >> li", message: "" }).detail ?? ""));
ok("count: min met", passes(list, { type: "count", selector: "li", min: 3, message: "" }));
ok("count: min not met has detail", /Found 3.*at least 4/.test(run(list, { type: "count", selector: "li", min: 4, message: "" }).detail ?? ""));
ok("count: max exceeded fails", !passes(list, { type: "count", selector: "li", max: 2, message: "" }));
ok("count: exact", passes(list, { type: "count", selector: "li", min: 3, max: 3, message: "" }));

/* ---------- computedStyle ---------- */
const styled = `<!doctype html><style>
  .card{display:flex;color:#4f46e5;padding:1rem;gap:16px}
  #hero.card{color:red}
  p{margin:0}
</style><div class="card" id="hero"></div><div class="card"></div><p style="font-size:20px">x</p>`;
const cs = (selector: string, property: string, expected: string | string[], match?: "first" | "all"): Check =>
  ({ type: "computedStyle", selector, property, expected, match, message: "" });
ok("style: keyword value", passes(styled, cs("#hero", "display", "flex")));
ok("style: specificity (id beats class)", passes(styled, cs("#hero", "color", "red")));
ok("style: hex expected matches rgb computed", passes(styled, cs(".card:nth-of-type(2)", "color", "#4f46e5")));
ok("style: named color expected", passes(styled, cs("#hero", "color", "rgb(255, 0, 0)")));
ok("style: rem expected matches px computed", passes(styled, cs("#hero", "padding-top", "1rem")));
ok("style: inline style", passes(styled, cs("p", "font-size", "20px")));
ok("style: array of accepted values", passes(styled, cs("#hero", "display", ["grid", "flex"])));
ok("style: wrong value fails with actual in detail", /currently has display: flex/.test(run(styled, cs("#hero", "display", "grid")).detail ?? ""));
ok("style: match all fails when one differs", !passes(styled, cs(".card", "color", "red", "all")));
ok("style: match all passes when all agree", passes(styled, cs(".card", "display", "flex", "all")));
ok("style: no element fails", !passes(styled, cs(".nope", "display", "flex")));

/* ---------- attribute / text ---------- */
const attrs = `<!doctype html><html lang="en"><a href="/x" target=" _BLANK ">Visit  the\n  Site</a><input disabled>`;
ok("attr: present", passes(attrs, { type: "attribute", selector: "a", attribute: "href", message: "" }));
ok("attr: value (case/space-insensitive)", passes(attrs, { type: "attribute", selector: "a", attribute: "target", expected: "_blank", message: "" }));
ok("attr: boolean attribute present", passes(attrs, { type: "attribute", selector: "input", attribute: "disabled", message: "" }));
ok("attr: missing fails", !passes(attrs, { type: "attribute", selector: "a", attribute: "rel", message: "" }));
ok("attr: wrong value has detail", /currently "en"/.test(run(attrs, { type: "attribute", selector: "html", attribute: "lang", expected: "fr", message: "" }).detail ?? ""));
ok("text: includes ignoring case and whitespace", passes(attrs, { type: "text", selector: "a", includes: "visit the site", message: "" }));
ok("text: not included fails", !passes(attrs, { type: "text", selector: "a", includes: "contact", message: "" }));

/* ---------- gridTracks ---------- */
const gt = (value: string, axis: "columns" | "rows", count: number, property = "grid-template-columns") =>
  run(`<!doctype html><style>.g{display:grid;${property}:${value}}</style><div class="g"></div>`, { type: "gridTracks", selector: ".g", axis, count, message: "" });
ok("gridTracks: plain list (1fr 2fr 1fr = 3)", gt("1fr 2fr 1fr", "columns", 3).passed);
ok("gridTracks: repeat(3, 1fr) = 3", gt("repeat(3, 1fr)", "columns", 3).passed);
ok("gridTracks: repeat with a pair of tracks multiplies (repeat(2, 1fr 2fr) = 4)", gt("repeat(2, 1fr 2fr)", "columns", 4).passed);
ok("gridTracks: resolved pixel list from a real browser (120px 120px 120px = 3)", gt("120px 120px 120px", "columns", 3).passed);
ok("gridTracks: minmax() inside a list is one track", gt("minmax(100px, 1fr) 200px", "columns", 2).passed);
ok("gridTracks: wrong count fails and says what it found", /has 3 columns right now, expected 4/.test(gt("repeat(3, 1fr)", "columns", 4).detail ?? ""));
ok("gridTracks: rows axis reads grid-template-rows", gt("50px 50px", "rows", 2, "grid-template-rows").passed);
ok("gridTracks: no template at all counts as 0", !run('<!doctype html><div class="g"></div>', { type: "gridTracks", selector: ".g", axis: "columns", count: 3, message: "" }).passed);
ok("gridTracks: a missing element fails clearly", /Nothing on the page matches/.test(run("<p>x</p>", { type: "gridTracks", selector: ".g", axis: "columns", count: 3, message: "" }).detail ?? ""));

/* ---------- accessibility rules ---------- */
const a11y = (rule: "img-alt" | "label-for-input" | "heading-order"): Check => ({ type: "a11y", rule, message: "" });
ok("a11y img-alt: all have alt (empty ok)", passes('<img src="a" alt=""><img src="b" alt="x">', a11y("img-alt")));
ok("a11y img-alt: missing alt fails", !passes('<img src="a">', a11y("img-alt")));
ok("a11y labels: label for=id", passes('<label for="e">Email</label><input id="e">', a11y("label-for-input")));
ok("a11y labels: wrapping label", passes("<label>Email <input></label>", a11y("label-for-input")));
ok("a11y labels: aria-label", passes('<input aria-label="Search">', a11y("label-for-input")));
ok("a11y labels: hidden and submit are exempt", passes('<input type="hidden"><input type="submit">', a11y("label-for-input")));
ok("a11y labels: bare input fails", !passes("<input>", a11y("label-for-input")));
ok("a11y headings: h1>h2>h3 ok", passes("<h1>a</h1><h2>b</h2><h3>c</h3><h2>d</h2>", a11y("heading-order")));
ok("a11y headings: skipped level fails", /h2 is followed by an h4/.test(run("<h1>a</h1><h2>b</h2><h4>c</h4>", a11y("heading-order")).detail ?? ""));

/* ---------- shape ---------- */
const many: Check[] = [
  { type: "exists", selector: "li", message: "" },
  { type: "exists", selector: "table", message: "" },
  { type: "count", selector: "li", min: 1, message: "" },
];
const results = runChecks(many, page(list));
ok("results: same length and order as checks", results.length === 3 && results[0].passed && !results[1].passed && results[2].passed);

/* ---------- self-contained: the preview receives this function as TEXT ---------- */
// tsx (esbuild) adds a __name() helper when compiling; Vite does not. Supply a stub for the test only.
const copied = new Function("__name", `return (${runChecks.toString()})`)((fn: unknown) => fn) as typeof runChecks;
const viaCopy = copied(many, page(list)).map((r) => r.passed).join();
ok("self-contained: source copy behaves identically", viaCopy === "true,false,true", viaCopy);

/* ---------- end to end: the REAL bridge script, running inside a page ---------- */
async function bridgeEndToEnd() {
  const doc = buildSrcDoc({
    html: "<!doctype html><html><head><title>T</title></head><body><h1>Hi</h1></body></html>",
    css: "h1{color:red}",
    mode: "css",
    nonce: "N",
    docId: "DOC",
  });
  const dom = new JSDOM(doc, { runScripts: "dangerously", pretendToBeVisual: true, url: "http://localhost/" });
  const win = dom.window as unknown as Window & typeof globalThis;
  const received: any[] = [];
  win.addEventListener("message", (e: MessageEvent) => {
    if (e.data && e.data.source === "csslab") received.push(e.data);
  });
  // wait for the bridge's "ready" signal
  for (let i = 0; i < 40 && !received.some((m) => m.type === "ready"); i++) await new Promise((r) => setTimeout(r, 25));
  ok("bridge e2e: reports ready with its doc id", received.some((m) => m.type === "ready" && m.doc === "DOC"));

  const checks: Check[] = [
    { type: "doctype", message: "" },
    { type: "text", selector: "head > title", includes: "T", message: "" },
    { type: "computedStyle", selector: "h1", property: "color", expected: "red", message: "" },
    { type: "exists", selector: "nav", message: "" },
  ];
  // the app's postMessage arrives with source === the parent window; in this one-window test that is the page itself
  win.dispatchEvent(new (win as any).MessageEvent("message", { data: { target: "csslab", type: "run-checks", id: "ID1", checks }, source: win }));
  for (let i = 0; i < 40 && !received.some((m) => m.type === "check-results"); i++) await new Promise((r) => setTimeout(r, 25));
  const reply = received.find((m) => m.type === "check-results");
  ok("bridge e2e: replies with results for the same request id", reply?.id === "ID1" && reply?.doc === "DOC");
  ok("bridge e2e: results are correct (3 pass, missing nav fails)", reply?.results?.map((r: any) => r.passed).join() === "true,true,true,false", JSON.stringify(reply?.results));

  // the same bridge also answers "measure" requests (used by the visualizer annotations)
  win.dispatchEvent(
    new (win as any).MessageEvent("message", {
      data: {
        target: "csslab",
        type: "measure",
        id: "M1",
        requests: [
          { key: "heading", selector: "h1", props: ["color", "display"] },
          { key: "none", selector: ".nope", props: [] },
          { key: "bad", selector: "h1 >> x", props: [] },
        ],
      },
      source: win,
    }),
  );
  for (let i = 0; i < 40 && !received.some((m) => m.type === "measure-result"); i++) await new Promise((r) => setTimeout(r, 25));
  const measured = received.find((m) => m.type === "measure-result");
  ok("bridge e2e: measure replies with the same request id", measured?.id === "M1" && measured?.doc === "DOC");
  ok("bridge e2e: measure returns rect and computed style for matches", measured?.result?.elements?.heading?.length === 1 && measured.result.elements.heading[0].style.color === "rgb(255, 0, 0)" && typeof measured.result.elements.heading[0].rect.width === "number");
  ok("bridge e2e: measure tolerates no match and invalid selectors", measured?.result?.elements?.none?.length === 0 && measured?.result?.elements?.bad?.length === 0);
  ok("bridge e2e: measure reports the viewport size", typeof measured?.result?.viewport?.width === "number");
  dom.window.close();
}

await bridgeEndToEnd();
console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
