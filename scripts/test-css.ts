import { getDeclaration, mergeCss, parseCss, serializeCss, setDeclaration } from "../src/lib/css/cssRules";

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : extra ? `  -> ${extra}` : ""));
  if (!cond) failed++;
};

const css = `/* layout */
.container {
  display: flex;
  gap: 16px; /* space */
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.item-1 { flex-grow: 2 }
@media (min-width: 600px) { .container { gap: 32px; } }
`;

// reading
ok("get: simple value", getDeclaration(css, ".container", "display") === "flex");
ok("get: value containing parentheses and commas", getDeclaration(css, ".container", "grid-template-columns") === "repeat(3, minmax(0, 1fr))");
ok("get: last declaration without a semicolon", getDeclaration(css, ".item-1", "flex-grow") === "2");
ok("get: missing property is undefined", getDeclaration(css, ".container", "color") === undefined);
ok("get: ignores rules inside @media", getDeclaration(css, ".container", "gap") === "16px");
ok("get: selector whitespace is normalised", getDeclaration(".a   >  .b { color: red }", ".a > .b", "color") === "red");
ok("get: later rule wins", getDeclaration(".a{color:red} .a{color:blue}", ".a", "color") === "blue");
ok("get: property names are case-insensitive", getDeclaration(".a{COLOR:red}", ".a", "color") === "red");

// writing
let out = setDeclaration(css, ".container", "display", "grid");
ok("set: replaces an existing value", getDeclaration(out, ".container", "display") === "grid" && getDeclaration(out, ".container", "gap") === "16px");
out = setDeclaration(css, ".container", "align-items", "center");
ok("set: adds a new declaration to an existing rule", getDeclaration(out, ".container", "align-items") === "center" && getDeclaration(out, ".container", "display") === "flex");
out = setDeclaration(css, ".item-2", "flex-grow", "1");
ok("set: creates a rule when the selector is new", getDeclaration(out, ".item-2", "flex-grow") === "1");
out = setDeclaration(css, ".container", "gap", null);
ok("set: null removes a declaration", getDeclaration(out, ".container", "gap") === undefined && getDeclaration(out, ".container", "display") === "flex");
out = setDeclaration(".a { color: red; }", ".a", "color", null);
ok("set: removing the last declaration drops the empty rule", !out.includes(".a"));
ok("set: top-level comment and @media block survive", setDeclaration(css, ".container", "display", "grid").includes("/* layout */") && setDeclaration(css, ".container", "display", "grid").includes("@media (min-width: 600px)"));
ok("set: starting from empty css works", setDeclaration("", ".x", "color", "red") === ".x {\n  color: red;\n}\n");

// round trip is stable
const once = serializeCss(parseCss(css));
ok("serialise is stable (idempotent)", serializeCss(parseCss(once)) === once);

// presets
const merged = mergeCss(".container { display: flex; justify-content: flex-start; }", ".container { justify-content: center; align-items: center } .item-1 { flex-grow: 1 }");
ok("merge: overrides, adds and creates rules", getDeclaration(merged, ".container", "justify-content") === "center" && getDeclaration(merged, ".container", "align-items") === "center" && getDeclaration(merged, ".item-1", "flex-grow") === "1" && getDeclaration(merged, ".container", "display") === "flex");

// forgiving of broken input (the learner is mid-typing)
for (const [name, broken] of [
  ["unclosed block", ".a { color: red;"],
  ["missing colon", ".a { color red; display: flex }"],
  ["stray brace", "} .a { color: red }"],
  ["empty", ""],
  ["only a comment", "/* nothing */"],
  ["unclosed comment", ".a { color: red } /* oops"],
  ["unclosed string", '.a { content: "abc; color: red }'],
] as const) {
  let threw = false;
  try {
    parseCss(broken);
    setDeclaration(broken, ".a", "color", "blue");
    getDeclaration(broken, ".a", "color");
  } catch {
    threw = true;
  }
  ok(`never throws: ${name}`, !threw);
}
ok("broken css: valid rule next to a missing colon still readable", getDeclaration(".a { color red; display: flex }", ".a", "display") === "flex");
ok("unclosed block is preserved verbatim", setDeclaration(".a { color: red;", ".b", "x", "1").includes(".a { color: red;"));

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
