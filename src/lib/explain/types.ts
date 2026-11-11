export type ExplainTone = "added" | "changed" | "removed" | "warning";

export interface ExplainItem {
  tone: ExplainTone;
  /** the rule or element this is about, e.g. ".container" or "<html>" */
  scope?: string;
  /** short headline, e.g. "justify-content: flex-start → center" */
  title: string;
  /** plain-English explanation (supports `code` and **bold**) */
  text: string;
}

export interface Explanation {
  /** one line, e.g. "2 changes" */
  summary: string;
  items: ExplainItem[];
  /** how to think about the code right now ("mental model"), one short paragraph each */
  model: string[];
}
