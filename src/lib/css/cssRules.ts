/**
 * A small, forgiving CSS reader and writer for flat rules like `.container { display: flex; }`.
 * The guided controls and the code editor both edit the SAME css text: the controls read values
 * with getDeclaration and change them with setDeclaration.
 *
 * It never throws. Anything it doesn't understand (at-rules, nested blocks, half-typed code)
 * is kept as raw text and written back untouched. Formatting of rules it rewrites is normalised,
 * and comments inside a rewritten rule are dropped.
 */

export interface Declaration {
  prop: string;
  value: string;
}

export type CssChunk =
  | { kind: "raw"; text: string }
  | { kind: "rule"; selector: string; declarations: Declaration[] };

const normalizeSelector = (selector: string) => selector.replace(/\s+/g, " ").trim();

function parseDeclarations(body: string): Declaration[] {
  const text = body.replace(/\/\*[\s\S]*?\*\//g, "");
  const parts: string[] = [];
  let current = "";
  let depth = 0;
  let quote = "";
  for (const char of text) {
    if (quote) {
      if (char === quote) quote = "";
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === "(") {
      depth++;
    } else if (char === ")") {
      depth = Math.max(0, depth - 1);
    } else if (char === ";" && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  parts.push(current);

  const declarations: Declaration[] = [];
  for (const part of parts) {
    const colon = part.indexOf(":");
    if (colon === -1) continue;
    const rawProp = part.slice(0, colon).trim();
    const value = part.slice(colon + 1).trim();
    if (!rawProp || !value) continue;
    declarations.push({ prop: rawProp.startsWith("--") ? rawProp : rawProp.toLowerCase(), value });
  }
  return declarations;
}

export function parseCss(css: string): CssChunk[] {
  const chunks: CssChunk[] = [];
  const n = css.length;
  let i = 0;

  while (i < n) {
    if (/\s/.test(css[i])) {
      i++;
      continue;
    }
    if (css.startsWith("/*", i)) {
      const end = css.indexOf("*/", i + 2);
      const stop = end === -1 ? n : end + 2;
      chunks.push({ kind: "raw", text: css.slice(i, stop) });
      i = stop;
      continue;
    }

    let j = i;
    while (j < n && css[j] !== "{" && css[j] !== ";") j++;
    if (j >= n) {
      chunks.push({ kind: "raw", text: css.slice(i).trim() });
      break;
    }
    if (css[j] === ";") {
      chunks.push({ kind: "raw", text: css.slice(i, j + 1).trim() });
      i = j + 1;
      continue;
    }

    let depth = 0;
    let k = j;
    for (; k < n; k++) {
      if (css[k] === "{") depth++;
      else if (css[k] === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    if (k >= n) {
      chunks.push({ kind: "raw", text: css.slice(i).trim() }); // unclosed block: leave it alone
      break;
    }

    const header = css.slice(i, j).trim();
    const body = css.slice(j + 1, k);
    if (header.startsWith("@") || body.includes("{")) {
      chunks.push({ kind: "raw", text: css.slice(i, k + 1).trim() });
    } else {
      chunks.push({ kind: "rule", selector: normalizeSelector(header), declarations: parseDeclarations(body) });
    }
    i = k + 1;
  }
  return chunks;
}

export function serializeCss(chunks: CssChunk[]): string {
  if (chunks.length === 0) return "";
  return (
    chunks
      .map((chunk) =>
        chunk.kind === "raw"
          ? chunk.text
          : `${chunk.selector} {\n${chunk.declarations.map((d) => `  ${d.prop}: ${d.value};`).join("\n")}${
              chunk.declarations.length ? "\n" : ""
            }}`,
      )
      .join("\n\n") + "\n"
  );
}

/** The value the cascade would use: the last declaration of `prop` in the last matching rule. */
export function getDeclaration(css: string, selector: string, prop: string): string | undefined {
  const wanted = normalizeSelector(selector);
  let found: string | undefined;
  for (const chunk of parseCss(css)) {
    if (chunk.kind !== "rule" || chunk.selector !== wanted) continue;
    for (const d of chunk.declarations) if (d.prop === prop) found = d.value;
  }
  return found;
}

/** Sets `prop` on `selector` (creating the rule if needed). A null value removes the declaration. */
export function setDeclaration(css: string, selector: string, prop: string, value: string | null): string {
  const wanted = normalizeSelector(selector);
  const chunks = parseCss(css);

  let at = -1;
  chunks.forEach((chunk, index) => {
    if (chunk.kind === "rule" && chunk.selector === wanted) at = index;
  });

  if (at === -1) {
    if (value !== null) chunks.push({ kind: "rule", selector: wanted, declarations: [{ prop, value }] });
    return serializeCss(chunks);
  }

  const rule = chunks[at];
  if (rule.kind !== "rule") return serializeCss(chunks);

  if (value === null) {
    rule.declarations = rule.declarations.filter((d) => d.prop !== prop);
    if (rule.declarations.length === 0) chunks.splice(at, 1);
  } else {
    const last = rule.declarations.map((d) => d.prop).lastIndexOf(prop);
    if (last === -1) rule.declarations.push({ prop, value });
    else rule.declarations[last] = { prop, value };
  }
  return serializeCss(chunks);
}

/** Applies every declaration in `presetCss` on top of `css`. */
export function mergeCss(css: string, presetCss: string): string {
  let result = css;
  for (const chunk of parseCss(presetCss)) {
    if (chunk.kind !== "rule") continue;
    for (const d of chunk.declarations) result = setDeclaration(result, chunk.selector, d.prop, d.value);
  }
  return result;
}
