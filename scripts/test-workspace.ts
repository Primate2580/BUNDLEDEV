/**
 * npm run test:workspace
 *
 * Checks the pane workspace: the pure layout rules (collapse, minimize, maximize, hide, splits, the
 * columns arrangement with its open-pane limit, saving) and the markup the Workspace renders.
 */
const storage = new Map<string, string>();
Object.assign(globalThis, {
  localStorage: {
    getItem: (k: string) => storage.get(k) ?? null,
    setItem: (k: string, v: string) => void storage.set(k, v),
    removeItem: (k: string) => void storage.delete(k),
  },
  window: { matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
});

const L = await import("../src/lib/workspace/layout");
const { renderToStaticMarkup } = await import("react-dom/server");
const { createElement } = await import("react");
const { MemoryRouter } = await import("react-router-dom");
const { default: Workspace } = await import("../src/components/workspace/Workspace");

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : `  -> ${extra}`));
  if (!cond) failed++;
};

const split = L.defaultLayout("lesson");
const cols = L.defaultLayout("visualizer");
const openOf = (s: L.LayoutState) => L.panesOf(s.arrangement).filter((id) => s.modes[id] === "normal" || s.modes[id] === "collapsed");

/* ---- defaults and separate layouts ---- */
ok("lessons and the Playground start split, the Visualizer starts in columns", split.arrangement === "split" && L.defaultLayout("playground").arrangement === "split" && cols.arrangement === "columns");
ok("lessons and the Playground start with different Learn widths", L.defaultLayout("lesson").split !== L.defaultLayout("playground").split);

/* ---- split arrangement: collapse, minimize, hide, maximize ---- */
ok("collapse toggles a pane", L.toggleCollapse(split, "editor").modes.editor === "collapsed" && L.toggleCollapse(L.toggleCollapse(split, "editor"), "editor").modes.editor === "normal");
ok("minimize docks a pane", L.dockedPanes(L.setMode(split, "output", "minimized")).join() === "output");
ok("hide removes a pane from the dock and the screen", (() => {
  const s = L.setMode(split, "editor", "hidden");
  return L.dockedPanes(s).length === 0 && !L.planGrid(s).show.editor;
})());
ok("a hidden pane comes back with 'normal'", L.setMode(L.setMode(split, "editor", "hidden"), "editor", "normal").modes.editor === "normal");
ok("the last visible pane can't be hidden or minimized", (() => {
  let s = L.setMode(split, "learn", "hidden");
  s = L.setMode(s, "editor", "minimized");
  return L.setMode(s, "output", "hidden") === s && L.setMode(s, "output", "minimized") === s;
})());
ok("the Lessons pane does not exist in the split arrangement", L.setMode(split, "lessons", "normal") === split && !L.planGrid(split).show.lessons);
ok("maximize shows only that pane", (() => {
  const plan = L.planGrid(L.maximize(split, "editor"));
  return plan.show.editor && !plan.show.learn && !plan.show.output && plan.splitters.length === 0;
})());
ok("maximize opens a collapsed pane", L.maximize(L.toggleCollapse(split, "output"), "output").modes.output === "normal");
ok("restoring brings every pane back", (() => {
  const s = L.restoreFromMaximized(L.maximize(split, "learn"));
  const plan = L.planGrid(s);
  return s.maximized === null && plan.show.learn && plan.show.editor && plan.show.output;
})());
ok("hiding a maximized pane clears the maximize", L.setMode(L.maximize(split, "output"), "output", "hidden").maximized === null);

/* ---- split arrangement: splitters ---- */
ok("column split is clamped", L.setSplit(split, 1).split === L.SPLIT_MIN && L.setSplit(split, 99).split === L.SPLIT_MAX);
ok("row split is clamped", L.setRowSplit(split, 1).rowSplit === L.ROW_MIN && L.setRowSplit(split, 99).rowSplit === L.ROW_MAX);
ok("the splitters exist only when both neighbours are open", (() => {
  const keys = (s: L.LayoutState) => L.planGrid(s).splitters.map((x) => x.key).join();
  return (
    keys(split) === "learn-editor,editor-output" &&
    !keys(L.toggleCollapse(split, "learn")).includes("learn-editor") &&
    !keys(L.toggleCollapse(split, "editor")).includes("editor-output") &&
    !keys(L.setMode(split, "output", "hidden")).includes("editor-output")
  );
})());
ok("a collapsed Editor is only a header tall, and only Learn collapses to a rail", (() => {
  const plan = L.planGrid(L.toggleCollapse(split, "editor"));
  const learnPlan = L.planGrid(L.toggleCollapse(split, "learn"));
  return plan.rows.startsWith(L.HEAD) && !plan.rail.editor && learnPlan.rail.learn;
})());
ok("a lone right-hand pane fills the column", L.planGrid(L.setMode(split, "output", "hidden")).rows === "minmax(0, 1fr) 0px 0px");

/* ---- columns arrangement ---- */
ok("in columns all four panes are open by default", openOf(cols).join() === "lessons,learn,editor,output" && cols.modes.lessons === "normal");
ok("lessons and the Playground have no Lessons pane by default", split.modes.lessons === "hidden");
ok("columns are laid out as one row, side by side", (() => {
  const plan = L.planGrid(cols);
  return plan.rows === "minmax(0, 1fr)" && (plan.columns.match(/minmax\([^)]*\)|[\d.]+(?:px|rem)/g) ?? []).length === 7 && plan.placement.editor.gridColumn === "5" && plan.placement.lessons.gridColumn === "1";
})());
ok("three splitters join four neighbouring columns", L.planGrid(cols).splitters.map((x) => x.key).join() === "lessons-learn,learn-editor,editor-output");
ok("nothing is hidden automatically: the learner chooses what to hide", (() => {
  let s = L.setMode(cols, "lessons", "hidden");
  s = L.setMode(s, "lessons", "normal");
  return openOf(s).length === 4;
})());
ok("a hidden column takes no space and its splitter goes", (() => {
  const plan = L.planGrid(L.setMode(cols, "lessons", "hidden"));
  return plan.columns.startsWith("0px 0px ") && plan.splitters.map((x) => x.key).join() === "learn-editor,editor-output";
})());
ok("any pane can be hidden, and the others stay", (() => {
  const s = L.setMode(cols, "editor", "hidden");
  return openOf(s).join() === "lessons,learn,output";
})());
ok("a collapsed column becomes a rail and loses its splitters", (() => {
  const plan = L.planGrid(L.toggleCollapse(cols, "editor"));
  return plan.rail.editor && plan.collapsed.editor && plan.splitters.map((x) => x.key).join() === "lessons-learn" && plan.columns.includes(L.RAIL);
})());
ok("the last open pane can't be hidden", (() => {
  let s = cols;
  for (const id of ["lessons", "learn", "editor"] as const) s = L.setMode(s, id, "hidden");
  return openOf(s).join() === "output" && L.setMode(s, "output", "hidden") === s;
})());
ok("pair splitter moves the boundary and keeps the combined width", (() => {
  const total = cols.widths.learn + cols.widths.editor;
  const s = L.setPair(cols, "learn", "editor", 70);
  return Math.abs(s.widths.learn + s.widths.editor - total) < 0.2 && s.widths.learn > cols.widths.learn;
})());
ok("pair splitter is clamped", (() => {
  const lo = L.setPair(cols, "learn", "editor", 1);
  return Math.abs(L.pairRatio(lo, "learn", "editor") - L.PAIR_MIN) < 0.5;
})());
ok("maximize works in columns and shows only that column", (() => {
  const plan = L.planGrid(L.maximize(cols, "output"));
  return plan.show.output && !plan.show.learn && !plan.show.editor && !plan.show.lessons && plan.splitters.length === 0;
})());
ok("switching arrangement keeps the modes", (() => {
  const s = L.setArrangement(L.setMode(split, "output", "minimized"), "columns");
  return s.arrangement === "columns" && s.modes.output === "minimized" && L.setArrangement(s, "columns") === s;
})());

/* ---- tabs on small screens ---- */
ok("hidden panes leave the tab list", L.tabPanes(L.setMode(split, "editor", "hidden")).join() === "learn,output");
ok("in columns the Lessons tab is there until the pane is hidden", L.tabPanes(cols).join() === "lessons,learn,editor,output" && !L.tabPanes(L.setMode(cols, "lessons", "hidden")).includes("lessons"));
ok("a hidden active tab falls back to the first open one", L.activeTab({ ...L.setMode(split, "learn", "hidden"), tab: "learn" }) === "editor");

/* ---- saving ---- */
ok("a saved layout round-trips (maximize is never saved)", (() => {
  const s = L.maximize(L.setPair(L.setMode(L.setArrangement(cols, "columns"), "output", "minimized"), "learn", "editor", 60), "editor");
  const back = L.parseLayout(JSON.parse(JSON.stringify(L.toSaved(s))), "visualizer");
  return back.arrangement === "columns" && back.modes.output === "minimized" && back.maximized === null && Math.abs(back.widths.learn - s.widths.learn) < 0.01;
})());
ok("junk in storage falls back to defaults", (() => {
  const back = L.parseLayout({ arrangement: "grid", split: "wide", rowSplit: NaN, widths: { learn: "x" }, modes: { learn: "bogus", editor: 3 }, tab: "nope" }, "playground");
  return back.arrangement === "split" && back.split === L.defaultLayout("playground").split && back.modes.learn === "normal" && back.tab === "learn";
})());
ok("a saved layout with nothing visible is replaced", L.parseLayout({ modes: { learn: "hidden", editor: "hidden", output: "minimized" } }, "lesson").modes.learn === "normal");
ok("a saved columns layout keeps every pane that was open", (() => {
  const back = L.parseLayout({ arrangement: "columns", modes: { lessons: "hidden", learn: "normal", editor: "normal", output: "normal" } }, "visualizer");
  return openOf(back).join() === "learn,editor,output";
})());
ok("reset keeps the current tab and goes back to the key's default arrangement", (() => {
  const s = L.resetLayout("visualizer", { ...L.setArrangement(cols, "split"), tab: "output" });
  return s.tab === "output" && s.arrangement === "columns";
})());

/* ---- the store saves each layout separately ---- */
const { useLayouts } = await import("../src/store/useLayouts");
useLayouts.getState().update("playground", (s) => L.setSplit(s, 25));
useLayouts.getState().update("lesson", (s) => L.setMode(s, "output", "hidden"));
useLayouts.getState().update("visualizer", (s) => L.setMode(s, "lessons", "hidden"));
await new Promise((resolve) => setTimeout(resolve, 400));
ok("lessons, the Playground and the Visualizer are stored under different keys", (() => {
  const lesson = JSON.parse(storage.get("css-lab:layout:lesson:v1") ?? "{}");
  const play = JSON.parse(storage.get("css-lab:layout:playground:v1") ?? "{}");
  const viz = JSON.parse(storage.get("css-lab:layout:visualizer:v2") ?? "{}");
  return lesson.modes?.output === "hidden" && lesson.split === 40 && play.split === 25 && play.modes?.output === "normal" && viz.arrangement === "columns" && viz.modes?.lessons === "hidden" && viz.modes?.learn === "normal";
})());

/* ---- rendered markup ---- */
const panes = {
  learn: { body: createElement("p", null, "learn text"), padded: true },
  editor: { body: createElement("p", null, "editor text") },
  output: { body: createElement("p", null, "output text") },
};
useLayouts.getState().reset("lesson");
const splitHtml = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(Workspace, { layoutKey: "lesson", panes })));
ok("split: three panes and two splitters with values", ["pane-learn", "pane-editor", "pane-output"].every((id) => splitHtml.includes(`id="${id}"`)) && !splitHtml.includes('id="pane-lessons"') && (splitHtml.match(/role="separator"/g) ?? []).length === 2 && splitHtml.includes('aria-valuenow="40"') && splitHtml.includes('aria-valuenow="55"'));
ok("each pane has collapse, minimize, maximize and hide controls", ["Collapse Learn", "Minimize Editor", "Maximize Output", "Hide Output"].every((label) => splitHtml.includes(`aria-label="${label}"`)));
ok("the scrolling Learn body is keyboard focusable", /id="pane-learn-body"[^>]*tabindex="0"/.test(splitHtml));
ok("tabs only appear on small screens", !splitHtml.includes('role="tablist"'));

useLayouts.getState().reset("visualizer");
const colsHtml = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(Workspace, { layoutKey: "visualizer", panes })));
ok("columns: all four panes are on screen, with three splitters", ["pane-lessons", "pane-learn", "pane-editor", "pane-output"].every((id) => new RegExp(`id="${id}"[^>]*class="[^"]*\\bflex\\b`).test(colsHtml)) && (colsHtml.match(/role="separator"/g) ?? []).length === 3 && colsHtml.includes('data-arrangement="columns"'));
ok("columns: the Lessons pane holds the course navigation", colsHtml.includes('aria-label="Course navigation"'));

/* ---- lesson code examples can open in the Playground ---- */
const { default: CodeBlock } = await import("../src/components/lesson/CodeBlock");
const inRouter = (props: Record<string, unknown>) => renderToStaticMarkup(createElement(MemoryRouter, null, createElement(CodeBlock, props as never)));
ok("a lesson's css example offers Open in Playground", inRouter({ code: ".a { color: red; }", language: "css", playground: true }).includes("Open in Playground"));
ok("an html example offers it too", inRouter({ code: "<p>Hi</p>", language: "html", playground: true }).includes("Open in Playground"));
ok("a js example does not", !inRouter({ code: "alert(1)", language: "js", playground: true }).includes("Open in Playground"));
ok("code the learner is told to type does not offer it", !inRouter({ code: ".a { color: red; }", language: "css" }).includes("Open in Playground"));

/* ---- going back and forth between a lesson and the Playground ---- */
const { usePlaygroundSessions } = await import("../src/store/usePlaygroundSessions");
const { useUI } = await import("../src/store/useUI");
usePlaygroundSessions.getState().remember("ex-1", { mode: "css", saved: { html: { html: "<p>edited</p>", css: "p { color: red; }" }, css: { html: "<p></p>", css: "p { color: blue; }" } } });
ok("edits to an example are remembered for next time", usePlaygroundSessions.getState().sessions["ex-1"]?.saved.css.css === "p { color: blue; }");
ok("another example starts without any edits", usePlaygroundSessions.getState().sessions["ex-2"] === undefined);
useUI.getState().setBackLink({ path: "/learn/css/selectors/what-is-a-selector", exampleId: "ex-1", label: "What is a selector" });
ok("the Playground can hand the header a way back to the lesson", useUI.getState().backLink?.path === "/learn/css/selectors/what-is-a-selector" && useUI.getState().backLink?.exampleId === "ex-1");
useUI.getState().setBackLink(null);
ok("the way back is cleared when the Playground closes", useUI.getState().backLink === null);

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
