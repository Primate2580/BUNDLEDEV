import type { CodeFiles, PreviewMode } from "@/engine/types";
import { describeModel, explainCss } from "./explainCss";
import { explainHtml } from "./explainHtml";
import type { Validity } from "./knowledge";
import type { Explanation } from "./types";

const summarize = (n: number) => (n === 0 ? "No visible change" : `${n} change${n === 1 ? "" : "s"}`);

/** Explains a CSS-only edit (the visualizers). */
export function explainCssChange(beforeCss: string, afterCss: string, validity?: Validity): Explanation {
  const items = explainCss(beforeCss, afterCss, validity);
  return { summary: summarize(items.length), items, model: describeModel(afterCss) };
}

/** Explains an edit to a code lab: HTML and/or CSS, ordered by what the lab is about. */
export function explainFiles(mode: PreviewMode, before: CodeFiles, after: CodeFiles, validity?: Validity): Explanation {
  const html = before.html !== after.html ? explainHtml(before.html, after.html, mode) : [];
  const css = before.css !== after.css ? explainCss(before.css, after.css, validity) : [];
  const items = mode === "css" ? [...css, ...html] : [...html, ...css];
  return { summary: summarize(items.length), items, model: describeModel(after.css) };
}
