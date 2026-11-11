/**
 * Messages between the app and the preview iframe.
 * The iframe is sandboxed WITHOUT allow-same-origin, so postMessage is the only
 * way in or out. Every message from the iframe carries `doc`, the id of the document
 * that sent it, so a late message from a replaced page can be ignored.
 */

import type { Check, CheckResult } from "@/engine/types";
import type { MeasureRequest, MeasureResult } from "./measure";

/** iframe -> app */
export type FromPreview =
  | { source: "csslab"; doc: string; type: "ready" }
  | { source: "csslab"; doc: string; type: "log"; level: "error" | "warn" | "info"; text: string }
  | { source: "csslab"; doc: string; type: "check-results"; id: string; results: CheckResult[] }
  | { source: "csslab"; doc: string; type: "measure-result"; id: string; result: MeasureResult };

/** app -> iframe */
export type ToPreview =
  | { target: "csslab"; type: "set-css"; css: string }
  | { target: "csslab"; type: "run-checks"; id: string; checks: Check[] }
  | { target: "csslab"; type: "measure"; id: string; requests: MeasureRequest[] };

export function isFromPreview(data: unknown): data is FromPreview {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { source?: unknown }).source === "csslab" &&
    typeof (data as { type?: unknown }).type === "string"
  );
}
