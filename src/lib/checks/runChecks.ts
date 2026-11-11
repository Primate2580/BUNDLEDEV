import type { Check, CheckResult } from "@/engine/types";

/**
 * Runs requirement checks against a page and reports pass/fail for each, in order.
 *
 * IMPORTANT: this function must stay completely self-contained (no imports used at
 * runtime, no helpers outside it). Its source text is copied into the sandboxed preview
 * (see lib/preview/bridge.ts), where it runs against the learner's page. The very same
 * function runs in Node against jsdom for `npm run test:content`.
 *
 * Checks never match on the learner's source text. They inspect the live DOM and the
 * browser's computed styles, so any correct solution passes.
 */
export function runChecks(checks: Check[], win: Window): CheckResult[] {
  const doc = win.document;

  const find = (selector: string): Element[] | null => {
    try {
      return Array.from(doc.querySelectorAll(selector));
    } catch {
      return null;
    }
  };
  const words = (text: string) => text.replace(/\s+/g, " ").trim().toLowerCase();
  const pass = (): CheckResult => ({ passed: true });
  const fail = (detail?: string): CheckResult => ({ passed: false, detail });
  const badSelector = (selector: string) => fail(`The selector "${selector}" isn't valid.`);

  // Express a CSS value the way the browser reports it: "#4f46e5" -> "rgb(79, 70, 229)",
  // "1rem" -> "16px". Using the browser's own serialiser keeps both sides comparable.
  const normalize = (property: string, value: string): string => {
    const probe = doc.createElement("span");
    probe.style.setProperty(property, value);
    (doc.body || doc.documentElement).appendChild(probe);
    const resolved = win.getComputedStyle(probe).getPropertyValue(property);
    probe.remove();
    return words(resolved || value);
  };

  // Number of tracks in a grid-template value. Browsers report resolved pixel sizes ("120px 120px 120px");
  // a headless test DOM reports what was written ("repeat(3, 1fr)"). Both count the same here.
  const countTokens = (value: string): number => {
    let depth = 0;
    let count = 0;
    let inToken = false;
    for (const char of value.trim()) {
      if (char === "(") depth++;
      if (char === ")") depth--;
      const space = /\s/.test(char) && depth === 0;
      if (!space && !inToken) count++;
      inToken = !space;
    }
    return count;
  };
  const countTracks = (value: string): number => {
    const text = value.trim();
    if (!text || text === "none") return 0;
    const repeat = text.match(/^repeat\(\s*(\d+)\s*,([\s\S]*)\)$/);
    return repeat ? Number(repeat[1]) * countTokens(repeat[2]) : countTokens(text);
  };

  const unlabeledControls = (): Element[] =>
    Array.from(doc.querySelectorAll("input, select, textarea")).filter((el) => {
      const type = (el.getAttribute("type") || "").toLowerCase();
      if (["hidden", "submit", "button", "reset", "image"].includes(type)) return false;
      if ((el.getAttribute("aria-label") || "").trim()) return false;
      if (el.getAttribute("aria-labelledby")) return false;
      if (el.closest("label")) return false;
      if (el.id && Array.from(doc.querySelectorAll("label")).some((l) => l.htmlFor === el.id)) return false;
      return true;
    });

  return checks.map((check): CheckResult => {
    try {
      switch (check.type) {
        case "doctype": {
          if (!doc.doctype) return fail("There is no <!doctype html> at the top of the page.");
          if (doc.compatMode !== "CSS1Compat") return fail("The browser is rendering in quirks mode.");
          return pass();
        }

        case "exists": {
          const found = find(check.selector);
          if (!found) return badSelector(check.selector);
          return found.length > 0 ? pass() : fail(`Nothing on the page matches "${check.selector}".`);
        }

        case "count": {
          const found = find(check.selector);
          if (!found) return badSelector(check.selector);
          const n = found.length;
          const tooFew = check.min !== undefined && n < check.min;
          const tooMany = check.max !== undefined && n > check.max;
          if (!tooFew && !tooMany) return pass();
          const wanted =
            check.min !== undefined && check.max !== undefined
              ? check.min === check.max
                ? `exactly ${check.min}`
                : `${check.min} to ${check.max}`
              : check.min !== undefined
                ? `at least ${check.min}`
                : `at most ${check.max}`;
          return fail(`Found ${n} matching "${check.selector}", expected ${wanted}.`);
        }

        case "computedStyle": {
          const found = find(check.selector);
          if (!found) return badSelector(check.selector);
          if (found.length === 0) return fail(`Nothing on the page matches "${check.selector}".`);
          const targets = check.match === "all" ? found : [found[0]];
          const wanted = Array.isArray(check.expected) ? check.expected : [check.expected];
          const accepted = wanted.flatMap((value) => [normalize(check.property, value), words(value)]);
          for (const el of targets) {
            const actual = words(win.getComputedStyle(el).getPropertyValue(check.property));
            if (!accepted.includes(actual)) {
              return fail(`"${check.selector}" currently has ${check.property}: ${actual || "(not set)"}.`);
            }
          }
          return pass();
        }

        case "attribute": {
          const found = find(check.selector);
          if (!found) return badSelector(check.selector);
          if (found.length === 0) return fail(`Nothing on the page matches "${check.selector}".`);
          const targets = check.match === "all" ? found : [found[0]];
          for (const el of targets) {
            const value = el.getAttribute(check.attribute);
            if (value === null) return fail(`"${check.selector}" has no ${check.attribute} attribute.`);
            if (check.expected !== undefined && words(value) !== words(check.expected)) {
              return fail(`${check.attribute} is currently "${value}".`);
            }
          }
          return pass();
        }

        case "text": {
          const found = find(check.selector);
          if (!found) return badSelector(check.selector);
          if (found.length === 0) return fail(`Nothing on the page matches "${check.selector}".`);
          const needle = words(check.includes);
          return found.some((el) => words(el.textContent || "").includes(needle))
            ? pass()
            : fail(`"${check.selector}" doesn't contain the expected text yet.`);
        }

        case "gridTracks": {
          const found = find(check.selector);
          if (!found) return badSelector(check.selector);
          if (found.length === 0) return fail(`Nothing on the page matches "${check.selector}".`);
          const property = check.axis === "rows" ? "grid-template-rows" : "grid-template-columns";
          const actual = countTracks(win.getComputedStyle(found[0]).getPropertyValue(property));
          return actual === check.count
            ? pass()
            : fail(`"${check.selector}" has ${actual} ${check.axis} right now, expected ${check.count}.`);
        }

        case "a11y": {
          if (check.rule === "img-alt") {
            const missing = Array.from(doc.querySelectorAll("img")).filter((img) => !img.hasAttribute("alt"));
            return missing.length === 0 ? pass() : fail(`${missing.length} image(s) have no alt attribute.`);
          }
          if (check.rule === "label-for-input") {
            const missing = unlabeledControls();
            return missing.length === 0 ? pass() : fail(`${missing.length} form control(s) have no label.`);
          }
          // heading-order: levels may go deeper one step at a time, never skip a level
          const levels = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((h) =>
            Number(h.tagName.slice(1)),
          );
          for (let i = 1; i < levels.length; i++) {
            if (levels[i] > levels[i - 1] + 1) {
              return fail(`An h${levels[i - 1]} is followed by an h${levels[i]}, skipping a level.`);
            }
          }
          return pass();
        }

        default:
          return fail("This check type isn't supported.");
      }
    } catch (error) {
      return fail(`This check couldn't run: ${error instanceof Error ? error.message : "unknown error"}.`);
    }
  });
}
