import type { CodeFiles, PreviewMode } from "@/engine/types";

/** Code to open in the Playground: which mode to start in, and the files to start with. */
export interface PlaygroundSeed extends CodeFiles {
  mode: PreviewMode;
  /** identifies the example, so the Playground can remember edits and the lesson can scroll back to it */
  id: string;
}

/** Where the Playground was opened from, so it can take you back to exactly that spot. */
export interface PlaygroundOrigin {
  path: string;
  exampleId: string;
  /** the lesson's title, for the button */
  label: string;
}

/** A short, stable id for a code example (the same code always gives the same id). */
export function exampleId(language: string, code: string, html?: string): string {
  let hash = 5381;
  for (const ch of `${language}\n${code}\n${html ?? ""}`) hash = ((hash << 5) + hash + ch.charCodeAt(0)) | 0;
  return `ex-${(hash >>> 0).toString(36)}`;
}

const VOID_TAGS = new Set(["input", "img", "br", "hr"]);
const TEXT_TAGS = new Set(["a", "button", "h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "li", "label", "strong", "em", "small", "code", "td", "th", "summary"]);

/** Languages a code block can be opened in the Playground for. */
export const canOpenInPlayground = (language: string) => language === "html" || language === "css";

/**
 * Turns a code block into something the Playground can start with.
 * HTML opens as it is. CSS needs markup to style: the block's own `html` if the author wrote one, otherwise
 * sample markup built from the CSS's selectors. Returns null for languages the Playground cannot run.
 */
export function seedFromCode(language: string, code: string, html?: string): PlaygroundSeed | null {
  const id = exampleId(language, code, html);
  if (language === "html") return { id, mode: "html", html: code, css: "" };
  if (language !== "css") return null;
  if (!/[{}]/.test(code)) {
    // Only declarations, like `transform: rotate(10deg);` : wrap them in a rule for a sample box.
    const body = code.trim().split("\n").map((line) => `  ${line.trim()}`).join("\n");
    return { id, mode: "css", html: html ?? `<div class="box">Sample</div>`, css: `.box {\n  padding: 1rem;\n  background: #e0e7ff;\n${body}\n}` };
  }
  return { id, mode: "css", html: html ?? sampleHtml(code), css: code };
}

/* ------------------------------------------------------------------ */
/* Sample markup from selectors                                        */
/* ------------------------------------------------------------------ */

interface Node {
  tag: string;
  classes: string[];
  id?: string;
  attrs: string[];
  repeat: boolean;
  children: Map<string, Node>;
}

const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

/** The selector text before each `{`, skipping @keyframes and similar blocks and looking inside @media. */
function preludes(css: string): string[] {
  const found: string[] = [];
  const text = stripComments(css);
  let i = 0;
  while (i < text.length) {
    const open = text.indexOf("{", i);
    if (open < 0) break;
    const before = text.slice(i, open);
    const prelude = before.slice(Math.max(before.lastIndexOf(";"), before.lastIndexOf("}")) + 1).trim();
    let depth = 1;
    let j = open + 1;
    while (j < text.length && depth > 0) {
      if (text[j] === "{") depth++;
      else if (text[j] === "}") depth--;
      j++;
    }
    if (prelude.startsWith("@")) {
      if (/^@(media|supports|layer|container)/i.test(prelude)) found.push(...preludes(text.slice(open + 1, j - 1)));
    } else if (prelude) {
      found.push(prelude);
    }
    i = j;
  }
  return found;
}

/** Splits at commas that are not inside parentheses or brackets. */
function splitTop(text: string, separator: RegExp): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "(" || ch === "[") depth++;
    if (ch === ")" || ch === "]") depth--;
    if (depth === 0 && separator.test(ch)) {
      if (current.trim()) parts.push(current.trim());
      current = ch === "," ? "" : ch;
      if (ch !== ",") {
        parts.push(ch);
        current = "";
      }
    } else current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/** Reads one compound selector such as `a.btn.primary[type="text"]:hover` into a node, or null when it names nothing. */
function parseCompound(compound: string): Node | null {
  const repeat = /:(nth-|first-|last-|only-)/.test(compound);
  // drop pseudo-classes and pseudo-elements (keeping what is inside brackets intact)
  let plain = "";
  let depth = 0;
  for (let k = 0; k < compound.length; k++) {
    const ch = compound[k];
    if (ch === "[") depth++;
    if (ch === "]") depth--;
    if (ch === ":" && depth === 0) {
      let paren = 0;
      k++;
      while (k < compound.length && (paren > 0 || /[\w:-]/.test(compound[k]) || compound[k] === "(")) {
        if (compound[k] === "(") paren++;
        if (compound[k] === ")") paren--;
        k++;
      }
      k--;
      continue;
    }
    plain += ch;
  }
  if (!plain || plain === "*" || /^(html|body|:root)$/i.test(plain)) return null;
  const tag = /^[a-zA-Z][\w-]*/.exec(plain)?.[0]?.toLowerCase() ?? "div";
  if (tag === "html" || tag === "body") return null;
  const classes = [...plain.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
  const id = /#([\w-]+)/.exec(plain)?.[1];
  const attrs = [...plain.matchAll(/\[([^\]=~|^$*\s]+)(?:[~|^$*]?=["']?([^\]"']*)["']?)?\]/g)].map((m) => (m[2] !== undefined ? `${m[1]}="${m[2]}"` : m[1]));
  if (tag === "div" && classes.length === 0 && !id && attrs.length === 0 && !/^div/i.test(plain)) return null;
  return { tag, classes, id, attrs, repeat, children: new Map() };
}

const keyOf = (n: Node) => `${n.tag}.${n.classes.join(".")}#${n.id ?? ""}[${n.attrs.join(",")}]`;

function insert(parent: Map<string, Node>, chain: Node[]) {
  let level = parent;
  for (const node of chain) {
    const key = keyOf(node);
    const existing = level.get(key);
    const target = existing ?? node;
    if (existing) existing.repeat ||= node.repeat;
    else level.set(key, node);
    level = target.children;
  }
}

function render(nodes: Map<string, Node>, depth: number): string {
  const pad = "  ".repeat(depth);
  const out: string[] = [];
  for (const node of nodes.values()) {
    const count = node.repeat ? 3 : 1;
    for (let n = 1; n <= count; n++) {
      const attrs = [
        node.id && n === 1 ? `id="${node.id}"` : "",
        node.classes.length ? `class="${node.classes.join(" ")}"` : "",
        node.tag === "a" ? 'href="#"' : "",
        node.tag === "input" && !node.attrs.some((a) => a.startsWith("type")) ? 'type="text"' : "",
        ...node.attrs,
      ].filter(Boolean).join(" ");
      const open = `<${node.tag}${attrs ? " " + attrs : ""}`;
      if (VOID_TAGS.has(node.tag)) {
        out.push(`${pad}${open} ${node.tag === "img" ? 'alt="Sample" ' : ""}/>`.replace(" />", node.tag === "img" ? "/>" : " />"));
      } else if (node.children.size > 0) {
        out.push(`${pad}${open}>`, render(node.children, depth + 1), `${pad}</${node.tag}>`);
      } else {
        const text = TEXT_TAGS.has(node.tag) ? `Sample ${node.tag === "li" || node.repeat ? n : ""}`.trim() : "Sample";
        out.push(`${pad}${open}>${text}</${node.tag}>`);
      }
    }
  }
  return out.join("\n");
}

/** Builds simple markup that the given CSS's selectors would match, so a CSS-only example has something to style. */
export function sampleHtml(css: string): string {
  const tree = new Map<string, Node>();
  for (const prelude of preludes(css)) {
    for (const selector of splitTop(prelude, /,/)) {
      const pieces = splitTop(selector, /[\s>+~]/).filter((p) => !/^[>+~]$/.test(p));
      const chain = pieces.map(parseCompound).filter((n): n is Node => n !== null);
      if (chain.length > 0) insert(tree, chain);
    }
  }
  if (tree.size === 0) return `<div class="box">Sample</div>`;
  return render(tree, 0);
}
