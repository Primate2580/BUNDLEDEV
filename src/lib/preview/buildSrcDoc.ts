import type { PreviewMode } from "@/engine/types";
import { BRIDGE_SOURCE } from "./bridge";

export interface PreviewInput {
  html: string;
  css: string;
  mode: PreviewMode;
  /** page background behind the learner's HTML */
  canvas?: "light" | "dark";
  /** Tailwind's browser build (only needed when mode === "tailwind") */
  tailwindSource?: string;
  /** fresh random value per render; lets our scripts run while the learner's cannot */
  nonce: string;
  /** identifies this document in messages sent back to the app */
  docId: string;
}

/**
 * Content-Security-Policy for the preview document.
 * - scripts: only ours (nonce). Learner <script> tags and onclick="" attributes are blocked.
 * - styles: inline only, so no external stylesheets
 * - images/fonts/media: data: and https: so lessons can show real pictures
 * - everything else (fetch, frames, forms, base) is off
 */
const csp = (nonce: string) =>
  [
    "default-src 'none'",
    `script-src 'nonce-${nonce}'`,
    "style-src 'unsafe-inline'",
    "img-src data: blob: https:",
    "media-src data: blob: https:",
    "font-src data: https:",
    "form-action 'none'",
    "base-uri 'none'",
  ].join("; ");

/** The text that goes inside the <style id="lab-css"> element. */
export function styleText(mode: PreviewMode, css: string): string {
  return mode === "tailwind" ? `@import "tailwindcss";\n${css}` : css;
}

const escapeStyle = (text: string) => text.replace(/<\/style/gi, "<\\/style");
const escapeScript = (text: string) => text.replace(/<\/script/gi, "<\\/script");

export function buildSrcDoc(input: PreviewInput): string {
  const { html, css, mode, canvas = "light", tailwindSource, nonce, docId } = input;

  const canvasStyle =
    canvas === "dark" ? "<style>html{background:#0f172a;color:#e2e8f0}</style>" : "";

  const tailwindScript =
    mode === "tailwind" && tailwindSource
      ? `<script nonce="${nonce}">${escapeScript(tailwindSource)}</script>`
      : "";

  const styleTag = `<style id="lab-css"${mode === "tailwind" ? ' type="text/tailwindcss"' : ""}>${escapeStyle(
    styleText(mode, css),
  )}</style>`;

  const top =
    `<meta http-equiv="Content-Security-Policy" content="${csp(nonce)}">` +
    `<meta name="lab-doc" content="${docId}">` +
    `<script nonce="${nonce}">${escapeScript(BRIDGE_SOURCE)}</script>` +
    canvasStyle +
    tailwindScript;

  const isFullDocument = /<html[\s>]/i.test(html);

  if (!isFullDocument) {
    return (
      `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
      `<meta name="viewport" content="width=device-width, initial-scale=1">` +
      `${top}${styleTag}</head><body>${html}</body></html>`
    );
  }

  // The learner wrote a whole document: keep it as written and add our pieces to its head.
  const headOpen = html.match(/<head(?:\s[^>]*)?>/i); // not <header>
  if (headOpen && headOpen.index !== undefined) {
    const at = headOpen.index + headOpen[0].length;
    const withTop = html.slice(0, at) + top + html.slice(at);
    const close = withTop.search(/<\/head>/i);
    return close >= 0
      ? withTop.slice(0, close) + styleTag + withTop.slice(close)
      : withTop.slice(0, at + top.length) + styleTag + withTop.slice(at + top.length);
  }

  const htmlOpen = html.match(/<html(?:\s[^>]*)?>/i);
  if (htmlOpen && htmlOpen.index !== undefined) {
    const at = htmlOpen.index + htmlOpen[0].length;
    return html.slice(0, at) + `<head>${top}${styleTag}</head>` + html.slice(at);
  }

  return html; // unreachable: isFullDocument guarantees an <html> tag
}

/** Random per-render token (used for the CSP nonce and the document id). */
export function makeNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/[^a-zA-Z0-9]/g, "");
}
