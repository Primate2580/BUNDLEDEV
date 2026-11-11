import { parseCss } from "../css/cssRules";
import {
  browserValidity,
  describeDeclaration,
  FLEX_ONLY_PROPS,
  FLEX_OR_GRID_PROPS,
  GRID_ONLY_PROPS,
  KNOWN_PROPERTIES,
  knownValues,
  selectorLabel,
  type Validity,
} from "./knowledge";
import { closest } from "./suggest";
import type { ExplainItem } from "./types";

type Rules = Map<string, Map<string, string>>;

/** selector -> property -> final value (a later declaration wins, like the cascade). */
function collect(css: string): Rules {
  const rules: Rules = new Map();
  for (const chunk of parseCss(css)) {
    if (chunk.kind !== "rule") continue;
    const props = rules.get(chunk.selector) ?? new Map<string, string>();
    for (const d of chunk.declarations) props.set(d.prop, d.value);
    rules.set(chunk.selector, props);
  }
  return rules;
}

const isFlex = (display?: string) => display === "flex" || display === "inline-flex";
const isGrid = (display?: string) => display === "grid" || display === "inline-grid";

function warningFor(prop: string, selector: string, display: string | undefined): ExplainItem | undefined {
  const sel = selectorLabel(selector);
  let kind: string | undefined;
  let fix = "";
  if (FLEX_ONLY_PROPS.includes(prop) && !isFlex(display)) {
    kind = "a flex container";
    fix = "`display: flex`";
  } else if (FLEX_OR_GRID_PROPS.includes(prop) && !isFlex(display) && !isGrid(display)) {
    kind = "a flex or grid container";
    fix = "`display: flex` or `display: grid`";
  } else if (GRID_ONLY_PROPS.includes(prop) && !isGrid(display)) {
    kind = "a grid container";
    fix = "`display: grid`";
  }
  if (!kind) return undefined;
  return {
    tone: "warning",
    scope: selector,
    title: `${prop} has no effect yet`,
    text: `\`${prop}\` only works when ${sel} is ${kind}, and right now it isn't, so you won't see a difference. Add ${fix} to ${sel} to switch it on.`,
  };
}

/**
 * If the browser would silently ignore this declaration (a misspelt property or an invalid value), say so,
 * and suggest the likely fix. Returns undefined for declarations that look fine.
 */
function ignoredDeclaration(prop: string, rawValue: string, selector: string, validity: Validity): ExplainItem | undefined {
  if (prop.startsWith("--")) return undefined; // custom properties can hold anything
  const value = rawValue.replace(/\s*!important\s*$/i, "").trim();
  const sel = selectorLabel(selector);

  const propertyProblem = (): ExplainItem => {
    const suggestion = closest(prop, KNOWN_PROPERTIES);
    return {
      tone: "warning",
      scope: selector,
      title: `${prop} isn't recognised`,
      text: `\`${prop}\` isn't a CSS property the browser knows, so it ignores this line in ${sel}.${suggestion ? ` Did you mean \`${suggestion}\`?` : " Check the spelling."}`,
    };
  };
  const valueProblem = (): ExplainItem => {
    const suggestion = /^[a-z-]+$/.test(value) ? closest(value, knownValues(prop)) : undefined;
    return {
      tone: "warning",
      scope: selector,
      title: `${prop}: ${value} is ignored`,
      text: `The browser doesn't understand \`${value}\` as a value for \`${prop}\`, so it ignores this line in ${sel}.${suggestion ? ` Did you mean \`${suggestion}\`?` : ""}`,
    };
  };

  if (validity.declaration) {
    if (validity.declaration(prop, value)) return undefined;
    const knownProperty = validity.property ? validity.property(prop) : KNOWN_PROPERTIES.includes(prop);
    return knownProperty ? valueProblem() : propertyProblem();
  }

  // No browser to ask: use spelling. A property we don't know that is one typo away from one we do.
  if (!KNOWN_PROPERTIES.includes(prop)) return closest(prop, KNOWN_PROPERTIES) ? propertyProblem() : undefined;
  const keywords = knownValues(prop);
  if (keywords.length > 0 && /^[a-z-]+$/.test(value) && !keywords.includes(value) && closest(value, keywords)) return valueProblem();
  return undefined;
}

/** What changed between two stylesheets, as plain-English items. */
export function explainCss(beforeCss: string, afterCss: string, validity: Validity = browserValidity()): ExplainItem[] {
  const before = collect(beforeCss);
  const after = collect(afterCss);
  const items: ExplainItem[] = [];
  const warned = new Set<string>();

  for (const selector of new Set([...after.keys(), ...before.keys()])) {
    const was = before.get(selector) ?? new Map<string, string>();
    const now = after.get(selector) ?? new Map<string, string>();
    const display = now.get("display");
    const displayChanged = was.get("display") !== display;
    const touched: string[] = [];

    for (const prop of new Set([...now.keys(), ...was.keys()])) {
      const from = was.get(prop);
      const to = now.get(prop);
      if (from === to) continue;

      // A line the browser would ignore has no effect, so don't describe an effect it doesn't have.
      const ignored = to === undefined ? undefined : ignoredDeclaration(prop, to, selector, validity);
      if (ignored) {
        items.push(ignored);
        continue;
      }
      touched.push(prop);

      if (to === undefined) {
        items.push({
          tone: "removed",
          scope: selector,
          title: `${prop} removed`,
          text: `Removes \`${prop}: ${from}\` from ${selectorLabel(selector)}, so it goes back to the browser's default for ${"`" + prop + "`"}.`,
        });
      } else {
        items.push({
          tone: from === undefined ? "added" : "changed",
          scope: selector,
          title: from === undefined ? `${prop}: ${to}` : `${prop}: ${from} → ${to}`,
          text: describeDeclaration(prop, to, selector, { display }),
        });
      }
    }

    // A property that needs a flex/grid container: warn when the container isn't set up.
    // If `display` itself changed, every property on the rule is re-checked.
    const toCheck = displayChanged ? [...now.keys()] : touched.filter((p) => now.has(p));
    for (const prop of toCheck) {
      const key = `${selector}|${prop}`;
      const warning = warningFor(prop, selector, display);
      if (warning && !warned.has(key)) {
        warned.add(key);
        items.push(warning);
      }
    }
  }
  return items;
}

/* ---------------------------- mental model ---------------------------- */

/** "8px 16px" -> [top, right, bottom, left] in px, or undefined if any value isn't a px number. */
export function sides(value: string | undefined): [number, number, number, number] | undefined {
  if (!value) return undefined;
  const parts = value.trim().split(/\s+/).map((v) => (/^-?\d*\.?\d+px$/.test(v) ? parseFloat(v) : v === "0" ? 0 : NaN));
  if (parts.length < 1 || parts.length > 4 || parts.some((n) => Number.isNaN(n))) return undefined;
  const [a, b = a, c = a, d = b] = parts;
  return [a, b, c, d];
}

function columnCount(value: string | undefined): number | undefined {
  if (!value || value === "none") return undefined;
  const repeat = value.trim().match(/^repeat\(\s*(\d+)\s*,/);
  if (repeat) return Number(repeat[1]);
  let depth = 0;
  let n = 0;
  let inToken = false;
  for (const char of value.trim()) {
    if (char === "(") depth++;
    if (char === ")") depth--;
    const space = /\s/.test(char) && depth === 0;
    if (!space && !inToken) n++;
    inToken = !space;
  }
  return n;
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const word = (n: number) => NUMBER_WORDS[n] ?? String(n);

/** "How to think about this code right now": short paragraphs for flex, grid and box-model rules. */
export function describeModel(css: string): string[] {
  const out: string[] = [];

  for (const [selector, props] of collect(css)) {
    const sel = selectorLabel(selector);
    const display = props.get("display");

    if (isFlex(display)) {
      const direction = props.get("flex-direction") ?? "row";
      const column = direction.startsWith("column");
      const justify = props.get("justify-content") ?? "flex-start";
      const align = props.get("align-items") ?? "stretch";
      let text =
        `${sel} is a flex container. Its main axis is **${column ? "vertical" : "horizontal"}** because of ` +
        `\`flex-direction: ${direction}\`, so \`justify-content: ${justify}\` positions the items ${column ? "vertically" : "horizontally"}, ` +
        `and \`align-items: ${align}\` positions them ${column ? "horizontally" : "vertically"}.`;
      const wrap = props.get("flex-wrap");
      if (wrap && wrap !== "nowrap") text += ` Items can wrap onto new lines (\`flex-wrap: ${wrap}\`), and each line is aligned on its own.`;
      out.push(text);
    } else if (isGrid(display)) {
      const columns = columnCount(props.get("grid-template-columns"));
      const gap = props.get("gap");
      let text = `${sel} is a grid container${columns ? ` with ${word(columns)} column${columns === 1 ? "" : "s"}` : ""}.`;
      if (!columns) text += " It has no `grid-template-columns` yet, so every item sits in one column.";
      if (gap) text += ` The gutters between cells are \`${gap}\`.`;
      const j = props.get("justify-items");
      const a = props.get("align-items");
      if (j || a) text += ` Items are placed inside their cells with \`justify-items: ${j ?? "stretch"}\` (horizontal) and \`align-items: ${a ?? "stretch"}\` (vertical).`;
      out.push(text);
    }

    // Box-model arithmetic, when the numbers are in pixels.
    const widthMatch = props.get("width")?.match(/^(\d*\.?\d+)px$/);
    const pad = sides(props.get("padding"));
    const borderValue = props.get("border-width") ?? props.get("border")?.match(/(\d*\.?\d+)px/)?.[0];
    const border = sides(borderValue);
    if (widthMatch && (pad || border)) {
      const width = Number(widthMatch[1]);
      const padH = pad ? pad[1] + pad[3] : 0;
      const borderH = border ? border[1] + border[3] : 0;
      const extra = padH + borderH;
      if (props.get("box-sizing") === "border-box") {
        out.push(
          `${sel} uses \`box-sizing: border-box\`, so \`width: ${width}px\` is the whole box. Padding and border take ${extra}px of it, leaving **${Math.max(0, width - extra)}px** for the content.`,
        );
      } else if (extra > 0) {
        out.push(
          `${sel} uses \`box-sizing: content-box\`, so \`width: ${width}px\` is only the content. Padding (${padH}px) and border (${borderH}px) add ${extra}px on top, making the box **${width + extra}px** wide on the page.`,
        );
      }
    }
  }
  return out;
}
