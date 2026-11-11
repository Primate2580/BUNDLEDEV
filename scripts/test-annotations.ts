import { buildAnnotation, parseTracks, requestsFor, type Shape } from "../src/lib/visualizer/annotations";
import type { MeasuredElement, MeasureResult } from "../src/lib/preview/measure";

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : extra ? `  -> ${extra}` : ""));
  if (!cond) failed++;
};
const near = (a: number, b: number) => Math.abs(a - b) < 0.01;

const el = (x: number, y: number, width: number, height: number, style: Record<string, string> = {}): MeasuredElement => ({ rect: { x, y, width, height }, style });
const result = (target: MeasuredElement, items: MeasuredElement[] = []): MeasureResult => ({ viewport: { width: 800, height: 400 }, elements: { target: [target], items } });
const rects = (shapes: Shape[]) => shapes.filter((s): s is Extract<Shape, { type: "rect" }> => s.type === "rect");
const lines = (shapes: Shape[]) => shapes.filter((s): s is Extract<Shape, { type: "line" }> => s.type === "line");
const texts = (shapes: Shape[]) => shapes.filter((s): s is Extract<Shape, { type: "text" }> => s.type === "text").map((t) => t.text);
const filled = (shapes: Shape[], fill: string) => rects(shapes).filter((r) => r.fill === fill);

// container 400x200 at origin, border 2 + padding 10 on every side => content box (12,12,376,176)
const sides = (prefix: string, value: string, suffix = "") => Object.fromEntries(["top", "right", "bottom", "left"].map((s) => [`${prefix}-${s}${suffix}`, value]));
const flexStyle = (direction: string) => ({ "flex-direction": direction, "flex-wrap": "nowrap", "row-gap": "16px", "column-gap": "16px", ...sides("padding", "10px"), ...sides("border", "2px", "-width") });

/* ---- flexbox, row ---- */
{
  const items = [el(12, 12, 80, 50), el(108, 12, 80, 50), el(204, 12, 80, 50)];
  const a = buildAnnotation("flex", result(el(0, 0, 400, 200, flexStyle("row")), items));
  const gaps = filled(a.shapes, "#a78bfa");
  ok("flex row: one gap band between each pair of items", gaps.length === 2);
  ok("flex row: gap bands sit between the items (x=92 and x=188, 16 wide)", near(gaps[0].x, 92) && near(gaps[0].w, 16) && near(gaps[1].x, 188) && near(gaps[1].w, 16));
  ok("flex row: gap bands span the items' cross extent (y=12, h=50)", near(gaps[0].y, 12) && near(gaps[0].h, 50));
  ok("flex row: gap size is labelled", texts(a.shapes).includes("16"));
  const free = rects(a.shapes).filter((r) => r.stroke === "#38bdf8");
  ok("flex row: free space at the end (284 -> 388), none at the start", free.length === 1 && near(free[0].x, 284) && near(free[0].w, 104));
  const main = lines(a.shapes).find((l) => l.color === "#f59e0b")!;
  ok("flex row: main axis runs left to right through the middle", near(main.x1, 12) && near(main.x2, 388) && near(main.y1, 100) && main.arrow === true);
  const cross = lines(a.shapes).find((l) => l.color === "#10b981")!;
  ok("flex row: cross axis runs top to bottom through the middle", near(cross.x1, 200) && near(cross.y1, 12) && near(cross.y2, 188));
}

/* ---- flexbox, row-reverse and column ---- */
{
  const rev = buildAnnotation("flex", result(el(0, 0, 400, 200, flexStyle("row-reverse")), [el(308, 12, 80, 50), el(212, 12, 80, 50)]));
  const main = lines(rev.shapes).find((l) => l.color === "#f59e0b")!;
  ok("flex row-reverse: main axis arrow points left", main.x1 > main.x2 && near(main.x1, 388));
  ok("flex row-reverse: gap found between visually adjacent items", filled(rev.shapes, "#a78bfa").length === 1 && near(filled(rev.shapes, "#a78bfa")[0].x, 292));

  const col = buildAnnotation("flex", result(el(0, 0, 400, 200, flexStyle("column")), [el(12, 12, 80, 40), el(12, 68, 80, 40)]));
  const cmain = lines(col.shapes).find((l) => l.color === "#f59e0b")!;
  ok("flex column: main axis is vertical, top to bottom", near(cmain.x1, cmain.x2) && cmain.y2 > cmain.y1);
  const g = filled(col.shapes, "#a78bfa");
  ok("flex column: the gap band is horizontal (y=52, 16 tall)", g.length === 1 && near(g[0].y, 52) && near(g[0].h, 16) && near(g[0].w, 80));
}

/* ---- flexbox: wrapping lines and align-items offsets ---- */
{
  const wrap = buildAnnotation("flex", result(el(0, 0, 400, 200, { ...flexStyle("row"), "flex-wrap": "wrap" }), [
    el(12, 12, 150, 50), el(178, 12, 150, 50), el(12, 78, 150, 50), el(178, 78, 150, 50),
  ]));
  ok("flex wrap: two lines produce one gap each (no gap drawn between lines)", filled(wrap.shapes, "#a78bfa").length === 2);

  const centered = buildAnnotation("flex", result(el(0, 0, 400, 200, flexStyle("row")), [el(12, 69, 80, 60), el(108, 79, 80, 40)]));
  ok("flex align-items:center: offset items still count as one line", filled(centered.shapes, "#a78bfa").length === 1);

  const spread = buildAnnotation("flex", result(el(0, 0, 400, 200, flexStyle("row")), [el(12, 12, 80, 50), el(308, 12, 80, 50)]));
  ok("flex space-between: big gap measured as real space (216)", texts(spread.shapes).includes("216"));
  ok("flex space-between: no free space at either end", rects(spread.shapes).filter((r) => r.stroke).length === 0);

  const centeredRow = buildAnnotation("flex", result(el(0, 0, 400, 200, flexStyle("row")), [el(112, 12, 80, 50), el(208, 12, 80, 50)]));
  ok("flex justify:center: free space on BOTH ends", rects(centeredRow.shapes).filter((r) => r.stroke).length === 2);
}

/* ---- grid ---- */
{
  const style = { "grid-template-columns": "100px 100px 100px", "grid-template-rows": "50px 50px", "column-gap": "10px", "row-gap": "10px", ...sides("padding", "0px"), ...sides("border", "0px", "-width") };
  const a = buildAnnotation("grid", result(el(0, 0, 320, 110, style)));
  ok("grid: numbers every column and row (3 + 2)", texts(a.shapes).join(",") === "1,2,3,1,2");
  const bands = filled(a.shapes, "#a78bfa");
  ok("grid: 2 column gap bands and 1 row gap band", bands.length === 3);
  ok("grid: first column gap band at x=100, 10 wide", near(bands[0].x, 100) && near(bands[0].w, 10));
  const xs = lines(a.shapes).filter((l) => l.x1 === l.x2).map((l) => l.x1);
  ok("grid: column lines at track edges", [0, 100, 110, 210, 220, 320].every((x) => xs.some((v) => near(v, x))));
  ok("grid: no tracks (display not grid) draws nothing", buildAnnotation("grid", result(el(0, 0, 100, 100, { "grid-template-columns": "none", "grid-template-rows": "none" }))).shapes.length === 0);
  ok("parseTracks: pixel lists only", parseTracks("10px 20.5px").join() === "10,20.5" && parseTracks("auto auto").length === 0 && parseTracks("none").length === 0 && parseTracks(undefined).length === 0);
}

/* ---- box model ---- */
{
  const style = { ...sides("margin", "24px"), ...sides("padding", "16px"), ...sides("border", "4px", "-width") };
  const a = buildAnnotation("box", result(el(24, 24, 200, 100, style)));
  const [margin, border, padding, content] = rects(a.shapes);
  ok("box: margin box grows outward by the margins", near(margin.x, 0) && near(margin.y, 0) && near(margin.w, 248) && near(margin.h, 148));
  ok("box: border box is the measured rect", near(border.x, 24) && near(border.w, 200));
  ok("box: padding box is inset by the border", near(padding.x, 28) && near(padding.w, 192) && near(padding.h, 92));
  ok("box: content box is inset by border + padding", near(content.x, 44) && near(content.y, 44) && near(content.w, 160) && near(content.h, 60));
  ok("box: labels show margin, padding and the content size", ["margin 24", "padding 16", "160 × 60"].every((t) => texts(a.shapes).includes(t)));
  ok("box: a 4px border is too thin for a label", !texts(a.shapes).some((t) => t.startsWith("border")));
  const thick = buildAnnotation("box", result(el(24, 24, 200, 100, { ...style, ...sides("border", "12px", "-width") })));
  ok("box: a 12px border gets its label", texts(thick.shapes).includes("border 12"));
  const uneven = buildAnnotation("box", result(el(10, 10, 100, 100, { ...sides("margin", "0px"), "margin-top": "20px", "margin-right": "8px", "margin-bottom": "20px", "margin-left": "8px", ...sides("padding", "0px"), ...sides("border", "0px", "-width") })));
  ok("box: uneven margins are listed top right bottom left", texts(uneven.shapes).includes("margin 20 8 20 8"));
}

/* ---- safety ---- */
ok("null measurement draws nothing", buildAnnotation("flex", null).shapes.length === 0);
ok("missing target draws nothing", buildAnnotation("box", { viewport: { width: 1, height: 1 }, elements: { target: [] } }).shapes.length === 0);
ok("annotate none draws nothing", buildAnnotation("none", result(el(0, 0, 10, 10))).shapes.length === 0);
ok("requestsFor: none asks for nothing; flex asks for target + items", requestsFor("none", ".a", ".b").length === 0 && requestsFor("flex", ".a", ".b").map((r) => r.key).join() === "target,items");
ok("requestsFor: box asks for margins, padding and borders", ["margin-top", "padding-left", "border-bottom-width"].every((p) => requestsFor("box", ".a", ".b")[0].props.includes(p)));

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
