/**
 * npm run test:a11y
 *
 * Renders real components to markup and runs axe-core over them (ARIA validity, names and labels, roles,
 * list structure and more). Colour contrast needs a real browser, so it is checked separately with
 * computed ratios; page-level rules don't apply to fragments, so they are switched off.
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html lang='en'><head><title>test</title></head><body><main id='root'></main></body></html>", {
  pretendToBeVisual: true,
});
Object.assign(globalThis, { window: dom.window, document: dom.window.document, Node: dom.window.Node, Element: dom.window.Element, HTMLElement: dom.window.HTMLElement, NodeFilter: dom.window.NodeFilter });

const axe = (await import("axe-core")).default;
const { renderToStaticMarkup } = await import("react-dom/server");
const { createElement, useState } = await import("react");

const { default: ProgressBar } = await import("../src/components/ui/ProgressBar");
const { default: LevelBadge } = await import("../src/components/ui/LevelBadge");
const { default: StatusMessage, Spinner } = await import("../src/components/ui/StatusMessage");
const { default: ChecksList } = await import("../src/components/lab/ChecksList");
const { default: QuestionCard } = await import("../src/components/practice/QuestionCard");
const { default: ControlsPanel } = await import("../src/components/visualizer/ControlsPanel");
const { default: ExplainPanel } = await import("../src/components/explain/ExplainPanel");
const { default: ConceptCards } = await import("../src/components/lesson/ConceptCards");
const { default: ContentBlocks } = await import("../src/components/lesson/ContentBlocks");
const { default: BadgeGrid } = await import("../src/components/dashboard/BadgeGrid");
const { default: ProgressSummary } = await import("../src/components/dashboard/ProgressSummary");
const { default: SearchResults } = await import("../src/components/search/SearchResults");
const { useRovingTabs } = await import("../src/lib/useRovingTabs");
const { explainCssChange } = await import("../src/lib/explain/explain");
const { computeBadges } = await import("../src/lib/badges");
const { default: docs } = await import("../src/content/html/document-structure");

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : `\n${extra}`));
  if (!cond) failed++;
};

async function scan(name: string, element: ReturnType<typeof createElement>) {
  const container = document.createElement("div");
  document.getElementById("root")!.appendChild(container);
  container.innerHTML = renderToStaticMarkup(element);
  const results = await axe.run(container, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
    rules: {
      "color-contrast": { enabled: false },
      region: { enabled: false },
      "landmark-one-main": { enabled: false },
      "page-has-heading-one": { enabled: false },
      "landmark-unique": { enabled: false },
    },
  });
  const report = results.violations
    .map((v) => `  - ${v.id} (${v.impact}): ${v.help}\n${v.nodes.slice(0, 2).map((n) => `      ${n.html.slice(0, 140)}`).join("\n")}`)
    .join("\n");
  ok(`${name}: no accessibility violations`, results.violations.length === 0, report);
  container.remove();
}

/* ---- self-check: the scanner must flag known-bad markup, or this whole test could be silently doing nothing ---- */
{
  const container = document.createElement("div");
  document.getElementById("root")!.appendChild(container);
  container.innerHTML = '<img src="x.png"><button></button><input type="text"><div role="tab" aria-controls="nowhere"></div>';
  const bad = await axe.run(container, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "best-practice"] }, rules: { "color-contrast": { enabled: false }, region: { enabled: false } } });
  const found = new Set(bad.violations.map((v) => v.id));
  ok("self-check: flags an image without alt text", found.has("image-alt"));
  ok("self-check: flags a button without a name", found.has("button-name"));
  ok("self-check: flags an unlabelled form field", found.has("label"));
  ok("self-check: flags a tab pointing at a missing panel", found.has("aria-valid-attr-value"));
  container.remove();
}

/* ---- a tiny harness for the roving-tabs hook, rendered exactly as CodeLab and Playground use it ---- */
function TabsDemo() {
  const ids = ["html", "css", "tailwind"] as const;
  const [selected, setSelected] = useState<(typeof ids)[number]>("css");
  const { tabProps, panelProps } = useRovingTabs(ids, selected, setSelected, "demo");
  return createElement(
    "div",
    null,
    createElement("div", { role: "tablist", "aria-label": "Playground mode" }, ids.map((id) => createElement("button", { key: id, ...tabProps(id) }, id))),
    createElement("div", panelProps, createElement("p", null, "Panel content")),
  );
}

await scan("ProgressBar", createElement(ProgressBar, { percent: 40, label: "Overall progress" }));
await scan("LevelBadge (all levels)", createElement("div", null, (["beginner", "intermediate", "advanced", "pro"] as const).map((l) => createElement(LevelBadge, { key: l, level: l }))));
await scan("StatusMessage and Spinner", createElement("div", null, createElement(StatusMessage, { title: "Nothing here yet" }, "Try something else."), createElement(Spinner, { label: "Loading" })));

const checks = [
  { type: "exists" as const, selector: "h1", message: "The page has an `h1`." },
  { type: "doctype" as const, message: "There is a doctype." },
];
await scan("ChecksList before running", createElement(ChecksList, { checks, results: null }));
await scan("ChecksList with a pass and a fail", createElement(ChecksList, { checks, results: [{ passed: true }, { passed: false, detail: "No doctype found." }] }));
await scan("ChecksList while running", createElement(ChecksList, { checks, results: null, running: true }));

const question = { prompt: "Which tag makes the biggest heading?", options: ["`h1`", "`h6`", "`p`"], answerIndex: 0, explanation: "`h1` is the main heading.", retries: 0, onResolved: () => {} };
await scan("QuestionCard", createElement(QuestionCard, { label: "Question 1 of 3", ...question }));
await scan("QuestionCard with a code snippet", createElement(QuestionCard, { ...question, code: { language: "html" as const, code: "<h1>Hi</h1>" } }));

const flex = (await import("../src/content/css/flexbox")).default.lessons.find((l) => l.id === "axes-and-alignment");
if (flex?.kind !== "visualizer") throw new Error('expected the "axes-and-alignment" visualizer lesson');
await scan("ControlsPanel (options, ranges and per-item controls)", createElement(ControlsPanel, { controls: flex.controls, css: flex.starter, itemCount: 4, selectedItem: 2, onSelectItem: () => {}, onChange: () => {} }));

await scan("ExplainPanel with changes and a warning", createElement(ExplainPanel, { explanation: explainCssChange(".c { color: red }", ".c { color: red; justify-content: center }") }));
await scan("ExplainPanel before any change", createElement(ExplainPanel, { explanation: null }));

const learn = docs.lessons.find((l) => l.kind === "learn");
if (learn?.kind !== "learn") throw new Error("expected a learn lesson");
await scan("ConceptCards", createElement(ConceptCards, { concept: learn.concept }));
await scan("ContentBlocks (headings, lists, code, callouts, comparisons)", createElement(ContentBlocks, { blocks: learn.body }));

const badges = computeBadges({ version: 1, completed: { "html/lists/ul": 1 } }, [{ track: "html", topic: "lists", id: "ul", kind: "learn", title: "Lists", summary: "" }]);
await scan("BadgeGrid (earned and locked)", createElement(BadgeGrid, { badges }));
await scan("ProgressSummary", createElement(ProgressSummary, { done: 3, total: 12, streak: 2, longest: 5, studiedToday: true }));
await scan(
  "SearchResults listbox",
  createElement(SearchResults, {
    results: [
      { type: "topic", trackId: "css", topicId: "flexbox", title: "Flexbox", context: "CSS, intermediate", level: "intermediate", ready: true, score: 5 },
      { type: "lesson", trackId: "css", topicId: "flexbox", lessonId: "axes", title: "The two axes", context: "Flexbox, CSS", kind: "visualizer", level: "intermediate", ready: true, score: 4 },
      { type: "topic", trackId: "css", topicId: "subgrid", title: "Subgrid", context: "CSS, pro", level: "pro", ready: false, score: 3 },
    ],
    activeIndex: 1,
    completed: { "css/flexbox/axes": 1 },
    listId: "search-test",
    onHover: () => {},
    onChoose: () => {},
  }),
);
await scan("Tabs built with useRovingTabs (tablist, tabs, panel)", createElement(TabsDemo));

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
