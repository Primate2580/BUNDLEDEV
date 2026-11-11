import type { AnnotationKind } from "@/engine/types";
import type { MeasureRequest, MeasureResult, MeasuredElement } from "@/lib/preview/measure";

/** Drawing instructions for the overlay, in the preview page's coordinates. */
export type Shape =
  | { type: "rect"; x: number; y: number; w: number; h: number; fill?: string; opacity?: number; stroke?: string; dash?: boolean }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number; color: string; dash?: boolean; arrow?: boolean }
  | { type: "text"; x: number; y: number; text: string; color: string; anchor?: "start" | "middle" | "end" };

export interface Annotation {
  shapes: Shape[];
  legend: { color: string; label: string }[];
}

export const COLORS = {
  main: "#f59e0b",
  cross: "#10b981",
  gap: "#a78bfa",
  free: "#38bdf8",
  grid: "#818cf8",
  margin: "#fb923c",
  border: "#facc15",
  padding: "#4ade80",
  content: "#60a5fa",
};

const EMPTY: Annotation = { shapes: [], legend: [] };
const EDGE_PROPS = ["top", "right", "bottom", "left"];
const sideProps = (prefix: string, suffix = "") => EDGE_PROPS.map((side) => `${prefix}-${side}${suffix}`);

/** What to measure for each kind of annotation. Keys are "target" and "items". */
export function requestsFor(kind: AnnotationKind, target: string, items: string): MeasureRequest[] {
  const box = [...sideProps("padding"), ...sideProps("border", "-width")];
  switch (kind) {
    case "flex":
      return [
        { key: "target", selector: target, props: ["flex-direction", "flex-wrap", "row-gap", "column-gap", ...box] },
        { key: "items", selector: items, props: [] },
      ];
    case "grid":
      return [
        { key: "target", selector: target, props: ["grid-template-columns", "grid-template-rows", "row-gap", "column-gap", ...box] },
        { key: "items", selector: items, props: [] },
      ];
    case "box":
      return [{ key: "target", selector: target, props: [...sideProps("margin"), ...box] }];
    default:
      return [];
  }
}

/* ---------------------------- helpers ---------------------------- */

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
const num = (style: Record<string, string>, key: string) => parseFloat(style[key]) || 0;
const fmt = (n: number) => String(Math.round(n * 10) / 10);

/** The content box: the measured border box minus borders and padding. */
function contentBox(el: MeasuredElement): Box {
  const s = el.style;
  const left = num(s, "border-left-width") + num(s, "padding-left");
  const right = num(s, "border-right-width") + num(s, "padding-right");
  const top = num(s, "border-top-width") + num(s, "padding-top");
  const bottom = num(s, "border-bottom-width") + num(s, "padding-bottom");
  return {
    x: el.rect.x + left,
    y: el.rect.y + top,
    w: Math.max(0, el.rect.width - left - right),
    h: Math.max(0, el.rect.height - top - bottom),
  };
}

/** "100px 200px" -> [100, 200]. Returns [] when it isn't a list of pixel sizes. */
export function parseTracks(value: string | undefined): number[] {
  if (!value || value === "none") return [];
  const sizes = value.trim().split(/\s+/).map(parseFloat);
  return sizes.every((n) => Number.isFinite(n)) ? sizes : [];
}

/* ---------------------------- flexbox ---------------------------- */

function flexAnnotation(container: MeasuredElement | undefined, items: MeasuredElement[]): Annotation {
  if (!container) return EMPTY;
  const direction = container.style["flex-direction"] || "row";
  const column = direction.startsWith("column");
  const reverse = direction.endsWith("reverse");
  const c = contentBox(container);
  const shapes: Shape[] = [];

  // The two axes, through the middle of the content box.
  const midX = c.x + c.w / 2;
  const midY = c.y + c.h / 2;
  if (!column) {
    const x1 = reverse ? c.x + c.w : c.x;
    const x2 = reverse ? c.x : c.x + c.w;
    shapes.push({ type: "line", x1, y1: midY, x2, y2: midY, color: COLORS.main, arrow: true });
    shapes.push({ type: "text", x: reverse ? c.x + c.w - 4 : c.x + 4, y: midY - 7, text: "main axis", color: COLORS.main, anchor: reverse ? "end" : "start" });
    shapes.push({ type: "line", x1: midX, y1: c.y, x2: midX, y2: c.y + c.h, color: COLORS.cross, arrow: true });
    shapes.push({ type: "text", x: midX + 6, y: c.y + 14, text: "cross axis", color: COLORS.cross });
  } else {
    const y1 = reverse ? c.y + c.h : c.y;
    const y2 = reverse ? c.y : c.y + c.h;
    shapes.push({ type: "line", x1: midX, y1, x2: midX, y2, color: COLORS.main, arrow: true });
    shapes.push({ type: "text", x: midX + 6, y: reverse ? c.y + c.h - 6 : c.y + 14, text: "main axis", color: COLORS.main });
    shapes.push({ type: "line", x1: c.x, y1: midY, x2: c.x + c.w, y2: midY, color: COLORS.cross, arrow: true });
    shapes.push({ type: "text", x: c.x + 4, y: midY - 7, text: "cross axis", color: COLORS.cross });
  }

  // Space inside each flex line: between items, and free space at the start and end.
  const mainStart = (r: MeasuredElement["rect"]) => (column ? r.y : r.x);
  const mainSize = (r: MeasuredElement["rect"]) => (column ? r.height : r.width);
  const crossStart = (r: MeasuredElement["rect"]) => (column ? r.x : r.y);
  const crossSize = (r: MeasuredElement["rect"]) => (column ? r.width : r.height);
  const cMainStart = column ? c.y : c.x;
  const cMainEnd = column ? c.y + c.h : c.x + c.w;

  // Items belong to the same line when their cross ranges overlap (align-items can offset them).
  const ordered = [...items].sort((a, b) => crossStart(a.rect) - crossStart(b.rect));
  const lines: MeasuredElement[][] = [];
  let lineEnd = -Infinity;
  for (const item of ordered) {
    if (lines.length === 0 || crossStart(item.rect) >= lineEnd - 0.5) {
      lines.push([item]);
      lineEnd = crossStart(item.rect) + crossSize(item.rect);
    } else {
      lines[lines.length - 1].push(item);
      lineEnd = Math.max(lineEnd, crossStart(item.rect) + crossSize(item.rect));
    }
  }

  const band = (m0: number, m1: number, k0: number, k1: number): Box =>
    column ? { x: k0, y: m0, w: k1 - k0, h: m1 - m0 } : { x: m0, y: k0, w: m1 - m0, h: k1 - k0 };

  for (const line of lines) {
    const sorted = [...line].sort((a, b) => mainStart(a.rect) - mainStart(b.rect));
    const k0 = Math.min(...sorted.map((i) => crossStart(i.rect)));
    const k1 = Math.max(...sorted.map((i) => crossStart(i.rect) + crossSize(i.rect)));

    for (let i = 0; i < sorted.length - 1; i++) {
      const from = mainStart(sorted[i].rect) + mainSize(sorted[i].rect);
      const to = mainStart(sorted[i + 1].rect);
      const size = to - from;
      if (size <= 0.5) continue;
      const b = band(from, to, k0, k1);
      shapes.push({ type: "rect", x: b.x, y: b.y, w: b.w, h: b.h, fill: COLORS.gap, opacity: 0.35 });
      if (size >= 14) shapes.push({ type: "text", x: b.x + b.w / 2, y: b.y + b.h / 2 + 4, text: `${Math.round(size)}`, color: COLORS.gap, anchor: "middle" });
    }

    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const lead = mainStart(first.rect) - cMainStart;
    const trail = cMainEnd - (mainStart(last.rect) + mainSize(last.rect));
    if (lead > 1.5) {
      const b = band(cMainStart, cMainStart + lead, k0, k1);
      shapes.push({ type: "rect", ...b, stroke: COLORS.free, dash: true });
    }
    if (trail > 1.5) {
      const b = band(cMainEnd - trail, cMainEnd, k0, k1);
      shapes.push({ type: "rect", ...b, stroke: COLORS.free, dash: true });
    }
  }

  return {
    shapes,
    legend: [
      { color: COLORS.main, label: "Main axis" },
      { color: COLORS.cross, label: "Cross axis" },
      { color: COLORS.gap, label: "Space between items (px)" },
      { color: COLORS.free, label: "Free space" },
    ],
  };
}

/* ------------------------------ grid ------------------------------ */

function gridAnnotation(container: MeasuredElement | undefined): Annotation {
  if (!container) return EMPTY;
  const s = container.style;
  const c = contentBox(container);
  const cols = parseTracks(s["grid-template-columns"]);
  const rows = parseTracks(s["grid-template-rows"]);
  const colGap = num(s, "column-gap");
  const rowGap = num(s, "row-gap");
  const shapes: Shape[] = [];

  const edges = (sizes: number[], start: number, gap: number) => {
    let at = start;
    return sizes.map((size) => {
      const edge = { start: at, end: at + size };
      at += size + gap;
      return edge;
    });
  };
  const colEdges = edges(cols, c.x, colGap);
  const rowEdges = edges(rows, c.y, rowGap);

  colEdges.forEach((edge, i) => {
    shapes.push({ type: "line", x1: edge.start, y1: c.y, x2: edge.start, y2: c.y + c.h, color: COLORS.grid, dash: true });
    shapes.push({ type: "line", x1: edge.end, y1: c.y, x2: edge.end, y2: c.y + c.h, color: COLORS.grid, dash: true });
    shapes.push({ type: "text", x: (edge.start + edge.end) / 2, y: c.y + 12, text: String(i + 1), color: COLORS.grid, anchor: "middle" });
    const next = colEdges[i + 1];
    if (next && next.start - edge.end > 0.5) {
      shapes.push({ type: "rect", x: edge.end, y: c.y, w: next.start - edge.end, h: c.h, fill: COLORS.gap, opacity: 0.35 });
    }
  });
  rowEdges.forEach((edge, i) => {
    shapes.push({ type: "line", x1: c.x, y1: edge.start, x2: c.x + c.w, y2: edge.start, color: COLORS.grid, dash: true });
    shapes.push({ type: "line", x1: c.x, y1: edge.end, x2: c.x + c.w, y2: edge.end, color: COLORS.grid, dash: true });
    shapes.push({ type: "text", x: c.x + 6, y: (edge.start + edge.end) / 2 + 4, text: String(i + 1), color: COLORS.grid });
    const next = rowEdges[i + 1];
    if (next && next.start - edge.end > 0.5) {
      shapes.push({ type: "rect", x: c.x, y: edge.end, w: c.w, h: next.start - edge.end, fill: COLORS.gap, opacity: 0.35 });
    }
  });

  return {
    shapes,
    legend: [
      { color: COLORS.grid, label: "Grid lines and track numbers" },
      { color: COLORS.gap, label: "Gap" },
    ],
  };
}

/* ---------------------------- box model ---------------------------- */

function boxAnnotation(target: MeasuredElement | undefined): Annotation {
  if (!target) return EMPTY;
  const { rect, style: s } = target;
  const m = EDGE_PROPS.map((side) => num(s, `margin-${side}`));
  const b = EDGE_PROPS.map((side) => num(s, `border-${side}-width`));
  const p = EDGE_PROPS.map((side) => num(s, `padding-${side}`));
  const [mT, mR, mB, mL] = m;
  const [bT, bR, bB, bL] = b;
  const [pT, pR, pB, pL] = p;

  const marginBox: Box = { x: rect.x - mL, y: rect.y - mT, w: rect.width + mL + mR, h: rect.height + mT + mB };
  const borderBox: Box = { x: rect.x, y: rect.y, w: rect.width, h: rect.height };
  const paddingBox: Box = { x: rect.x + bL, y: rect.y + bT, w: rect.width - bL - bR, h: rect.height - bT - bB };
  const contentBoxRect: Box = { x: paddingBox.x + pL, y: paddingBox.y + pT, w: paddingBox.w - pL - pR, h: paddingBox.h - pT - pB };

  const same = (v: number[]) => v.every((n) => n === v[0]);
  const label = (v: number[]) => (same(v) ? fmt(v[0]) : v.map(fmt).join(" "));

  const shapes: Shape[] = [
    { type: "rect", ...marginBox, fill: COLORS.margin, opacity: 0.3 },
    { type: "rect", ...borderBox, fill: COLORS.border, opacity: 0.55 },
    { type: "rect", ...paddingBox, fill: COLORS.padding, opacity: 0.4 },
    { type: "rect", ...contentBoxRect, fill: COLORS.content, opacity: 0.45 },
  ];
  if (mT >= 12) shapes.push({ type: "text", x: marginBox.x + 6, y: marginBox.y + 12, text: `margin ${label(m)}`, color: COLORS.margin });
  if (bT >= 9) shapes.push({ type: "text", x: borderBox.x + 4, y: borderBox.y + bT - 1, text: `border ${label(b)}`, color: "#ffffff" });
  if (pT >= 12) shapes.push({ type: "text", x: paddingBox.x + 6, y: paddingBox.y + 12, text: `padding ${label(p)}`, color: COLORS.padding });
  shapes.push({
    type: "text",
    x: contentBoxRect.x + contentBoxRect.w / 2,
    y: contentBoxRect.y + contentBoxRect.h / 2 + 4,
    text: `${Math.round(contentBoxRect.w)} × ${Math.round(contentBoxRect.h)}`,
    color: "#ffffff",
    anchor: "middle",
  });

  return {
    shapes,
    legend: [
      { color: COLORS.margin, label: "Margin" },
      { color: COLORS.border, label: "Border" },
      { color: COLORS.padding, label: "Padding" },
      { color: COLORS.content, label: "Content" },
    ],
  };
}

/* ---------------------------- entry point ---------------------------- */

export function buildAnnotation(kind: AnnotationKind, result: MeasureResult | null): Annotation {
  if (!result) return EMPTY;
  const target = result.elements.target?.[0];
  switch (kind) {
    case "flex":
      return flexAnnotation(target, result.elements.items ?? []);
    case "grid":
      return gridAnnotation(target);
    case "box":
      return boxAnnotation(target);
    default:
      return EMPTY;
  }
}
