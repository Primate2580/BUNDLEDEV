import { explainCssChange, explainFiles } from "../src/lib/explain/explain";
import { describeModel, explainCss, sides } from "../src/lib/explain/explainCss";
import { explainHtml } from "../src/lib/explain/explainHtml";
import { describeDeclaration } from "../src/lib/explain/knowledge";
import { closest, editDistance } from "../src/lib/explain/suggest";

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : extra ? `  -> ${extra}` : ""));
  if (!cond) failed++;
};
const has = (text: string | undefined, ...needles: string[]) => !!text && needles.every((n) => text.toLowerCase().includes(n.toLowerCase()));

/* ---------------- CSS: what changed ---------------- */
{
  const items = explainCss(".c { display: block }", ".c { display: flex }");
  ok("display: block -> flex is a change that mentions a flex container", items.length === 1 && items[0].tone === "changed" && has(items[0].text, "flex container"));
  ok("a change's title shows from -> to", items[0].title === "display: block → flex");
}
{
  const items = explainCss("", ".c { display: flex; gap: 16px }");
  ok("new rule: each declaration is an 'added' item", items.length === 2 && items.every((i) => i.tone === "added"));
  ok("added gap mentions the amount", has(items.find((i) => i.title.startsWith("gap"))?.text, "16px", "between"));
}
{
  const items = explainCss(".c { display: flex; flex-direction: row }", ".c { display: flex; flex-direction: column }");
  ok("flex-direction column explains the vertical axis", items.length === 1 && has(items[0].text, "vertical", "top to bottom"));
}
{
  const items = explainCss(".c { display: flex; justify-content: flex-start }", ".c { display: flex; justify-content: space-between }");
  ok("space-between explains the first and last items", has(items[0].text, "first and last", "edges"));
}
{
  const items = explainCss(".c { display: flex; gap: 8px }", ".c { display: flex }");
  ok("removing a declaration says it goes back to the default", items.length === 1 && items[0].tone === "removed" && has(items[0].text, "gap: 8px", "default"));
}
ok("no change means no items", explainCss(".c { color: red }", ".c { color: red }").length === 0);
ok("whitespace-only edits are not changes", explainCss(".c{color:red}", ".c {\n  color: red;\n}").length === 0);
{
  const items = explainCss("", ".a { color: red } .b { color: blue }");
  ok("changes are scoped to their selector", items.length === 2 && items[0].scope === ".a" && items[1].scope === ".b");
}

/* ---------------- CSS: context-aware warnings ---------------- */
{
  const items = explainCss(".c { color: red }", ".c { color: red; justify-content: center }");
  const warn = items.find((i) => i.tone === "warning");
  ok("justify-content without flex/grid warns", !!warn && has(warn.text, "justify-content", "flex or grid container", "display: flex", "isn't"));
}
{
  const items = explainCss(".c { display: flex }", ".c { display: flex; justify-content: center }");
  ok("justify-content on a flex container does NOT warn", !items.some((i) => i.tone === "warning"));
}
{
  const items = explainCss(".c { display: grid }", ".c { display: grid; justify-content: center; grid-template-columns: 1fr 1fr }");
  ok("justify-content and grid columns on a grid container do NOT warn", !items.some((i) => i.tone === "warning"));
}
{
  const items = explainCss(".c { display: flex }", ".c { display: flex; grid-template-columns: 1fr 1fr }");
  ok("grid-template-columns on a flex container warns it needs grid", items.some((i) => i.tone === "warning" && has(i.text, "grid container", "display: grid")));
}
{
  const items = explainCss(".c { display: flex; flex-direction: column; justify-content: center }", ".c { display: block; flex-direction: column; justify-content: center }");
  const warnings = items.filter((i) => i.tone === "warning").map((i) => i.title);
  ok("turning flex off warns about the properties left behind", warnings.length === 2 && warnings.join().includes("flex-direction") && warnings.join().includes("justify-content"), warnings.join("|"));
}
{
  const items = explainCss("", ".c { flex-direction: row }");
  ok("only one warning per property", items.filter((i) => i.tone === "warning").length === 1);
}

/* ---------------- CSS: grid, flex and misc wording ---------------- */
ok("repeat(3, 1fr) is three equal columns", has(describeDeclaration("grid-template-columns", "repeat(3, 1fr)", ".g"), "three equal-width columns"));
ok("1fr 2fr 1fr explains fr shares", has(describeDeclaration("grid-template-columns", "1fr 2fr 1fr", ".g"), "three columns", "2fr", "twice"));
ok("200px 1fr lists both tracks", has(describeDeclaration("grid-template-columns", "200px 1fr", ".g"), "two columns", "200px", "1fr"));
ok("grid-auto-flow: dense explains the backfilling", has(describeDeclaration("grid-auto-flow", "dense", ".g"), "backfills", "fewer holes"));
ok("font-style italic", has(describeDeclaration("font-style", "italic", ".x"), "italic"));
ok("list-style-type square", has(describeDeclaration("list-style-type", "square", ".x"), "square bullets"));
ok("text-transform uppercase", has(describeDeclaration("text-transform", "uppercase", ".x"), "capital letters", "without changing the html"));
ok("side margins are described by side", has(describeDeclaration("margin-bottom", "12px", ".p"), "below", "12px") && has(describeDeclaration("padding-left", "8px", ".p"), "left padding"));
ok("visibility hidden says the space is kept", has(describeDeclaration("visibility", "hidden", ".badge"), "keeps the space", "screen readers"));
ok("grid-column: span 2 names the spanning item", has(describeDeclaration("grid-column", "span 2", ".item-1"), ".item-1", "two columns"));
ok("grid align-items uses cell wording", has(describeDeclaration("align-items", "center", ".g", { display: "grid" }), "cell"));
ok("flex align-items uses axis wording", has(describeDeclaration("align-items", "center", ".c", { display: "flex" }), "cross axis"));
ok("flex-grow 0 vs 2", has(describeDeclaration("flex-grow", "0", ".i"), "stops") && has(describeDeclaration("flex-grow", "2", ".i"), "2 shares"));
ok("flex: 1 shorthand", has(describeDeclaration("flex", "1", ".i"), "grow", "free space"));
ok("opacity .5", has(describeDeclaration("opacity", "0.5", ".x"), "50%"));
ok("known property, unknown value: uses the gist", has(describeDeclaration("color", "tomato", ".x"), "text colour", "tomato"));
ok("unknown property falls back to a plain sentence", has(describeDeclaration("scroll-snap-type", "x mandatory", ".x"), "scroll-snap-type", "x mandatory"));
ok("!important is ignored when describing", has(describeDeclaration("display", "flex !important", ".x"), "flex container"));
ok("selector appears as code in the text", describeDeclaration("display", "none", ".hero").includes("`.hero`"));

/* ---------------- CSS: the mental model ---------------- */
{
  const m = describeModel(".c { display: flex; flex-direction: row; justify-content: space-between; align-items: center }");
  ok("flex row model: main axis horizontal, justify horizontal, align vertical", m.length === 1 && has(m[0], "horizontal", "justify-content: space-between", "vertically"));
  const col = describeModel(".c { display: flex; flex-direction: column }");
  ok("flex column model: the axes swap roles", has(col[0], "vertical", "justify-content: flex-start", "positions the items vertically"));
  ok("flex wrap is mentioned", has(describeModel(".c { display: flex; flex-wrap: wrap }")[0], "wrap onto new lines"));
  const g = describeModel(".g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px }");
  ok("grid model: counts columns and mentions the gap", has(g[0], "three columns", "12px"));
  ok("grid without columns says so", has(describeModel(".g { display: grid }")[0], "no `grid-template-columns`"));
  ok("no layout rules: no model", describeModel(".x { color: red }").length === 0);
}
{
  const cb = describeModel(".box { width: 240px; padding: 16px; border-width: 4px; box-sizing: content-box }");
  ok("content-box math: 240 + 2*16 + 2*4 = 280", has(cb[0], "content-box", "240px", "32px", "8px", "280px"), cb[0]);
  const bb = describeModel(".box { width: 300px; padding: 24px; border-width: 4px; box-sizing: border-box }");
  ok("border-box math: 300 - 48 - 8 = 244 for content", has(bb[0], "border-box", "300px", "244px"), bb[0]);
  const sh = describeModel(".box { width: 200px; padding: 10px 20px; border: 2px solid red }");
  ok("shorthand padding (10px 20px) and border shorthand are understood", has(sh[0], "40px", "4px", "244px"), sh[0]);
  ok("non-pixel widths are skipped (no wrong maths)", describeModel(".box { width: 50%; padding: 16px }").length === 0);
  ok("sides(): 1, 2 and 4 values", sides("8px")!.join() === "8,8,8,8" && sides("8px 16px")!.join() === "8,16,8,16" && sides("1px 2px 3px 4px")!.join() === "1,2,3,4" && sides("auto") === undefined);
}

/* ---------------- HTML ---------------- */
{
  const items = explainHtml("<html>\n</html>", "<!doctype html>\n<html>\n</html>");
  ok("adding the doctype", items.length === 1 && items[0].tone === "added" && has(items[0].text, "standards mode"));
  ok("html items name the element once, in the title", items[0].scope === undefined);
  const gone = explainHtml("<!doctype html><html></html>", "<html></html>");
  ok("removing the doctype warns about quirks mode", has(gone[0]?.text, "quirks"));
}
{
  const items = explainHtml("<html>\n</html>", '<html lang="en">\n</html>');
  ok("adding lang to <html> is one 'changed' item (not add + remove)", items.length === 1 && items[0].tone === "changed" && has(items[0].title, "<html>", "lang added"));
  ok("lang explanation mentions screen readers", has(items[0].text, "screen readers", "en"));
}
{
  const items = explainHtml("<body></body>", "<body><h1>Hi</h1></body>");
  ok("a link is not described twice", !has(explainHtml("", '<a href="#x">y</a>')[0].text, "says where it goes"));
  ok("a new heading is described", items.length === 1 && items[0].tone === "added" && has(items[0].text, "main heading"));
}
{
  const items = explainHtml("<head></head>", '<head><meta charset="UTF-8" /></head>');
  ok("an added meta mentions its charset attribute", items.length === 1 && has(items[0].title, "<meta> added") && has(items[0].text, "text encoding", "UTF-8"));
  const vp = explainHtml("<head></head>", '<head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>');
  ok("viewport meta is recognised", has(vp[0].text, "viewport", "real screen width"));
}
{
  const items = explainHtml('<a href="#a">x</a>', '<a href="#lakes">x</a>');
  ok("a changed href is explained, including the # jump", items.length === 1 && has(items[0].title, "href changed") && has(items[0].text, "#lakes", "jumps"));
}
{
  const items = explainHtml("<ul><li>a</li><li>b</li></ul>", "<ul><li>a</li><li>b</li><li>c</li></ul>");
  ok("adding a third <li> reports one added li", items.length === 1 && has(items[0].title, "<li> added"));
  const rm = explainHtml("<p>a</p><p>b</p>", "<p>a</p>");
  ok("removing an element", rm.length === 1 && rm[0].tone === "removed" && has(rm[0].title, "<p> removed"));
}
{
  const items = explainHtml('<img src="a.jpg">', '<img src="a.jpg" alt="A grey cat">');
  ok("adding alt to an image explains why", items.length === 1 && has(items[0].text, "screen readers", "can't load"));
}
{
  const items = explainHtml("<p>Hello</p>", "<p>Hello brave world</p>");
  ok("text-only edit is reported with the new words", items.length === 1 && items[0].title === "Text changed" && has(items[0].text, "brave", "world"));
}
{
  const tw = explainHtml('<button class="p-4">Go</button>', '<button class="p-4 rounded bg-indigo-600">Go</button>', "tailwind");
  ok("tailwind class edits list the added utilities", tw.length === 1 && has(tw[0].text, "rounded", "bg-indigo-600", "Tailwind utility"));
  const plain = explainHtml('<p class="a">x</p>', '<p class="a b">x</p>', "html");
  ok("plain-HTML class edits don't mention Tailwind", !has(plain[0].text, "Tailwind"));
}
ok("comments are ignored", explainHtml("<p>a</p>", "<p>a</p><!-- <h1>hidden</h1> -->").length === 0);
ok("script contents are ignored", explainHtml("<p>a</p>", "<p>a</p><script>var s = '<h1>x</h1>';</script>").filter((i) => i.title.includes("h1")).length === 0);
ok("identical html gives nothing", explainHtml("<p>a</p>", "<p>a</p>").length === 0);
{
  const many = Array.from({ length: 12 }, (_, i) => `<h${(i % 6) + 1}>x</h${(i % 6) + 1}><i${i}>x</i${i}>`).join("");
  const items = explainHtml("", many);
  ok("long change lists are capped with an 'and N more' item", items.length === 9 && has(items[8].title, "more"), String(items.length));
}
for (const [name, broken] of [["unclosed tag", "<p"], ["stray angle", "a < b > c"], ["empty", ""], ["attribute soup", '<a href="x" "oops" =bad>']] as const) {
  let threw = false;
  try { explainHtml("<p>x</p>", broken); } catch { threw = true; }
  ok(`html never throws: ${name}`, !threw);
}

/* ---------------- combined ---------------- */
{
  const e = explainFiles("css", { html: "<p>x</p>", css: ".p { color: red }" }, { html: "<p>x</p>", css: ".p { color: blue }" });
  ok("css mode: summary counts changes", e.summary === "1 change" && e.items[0].title === "color: red → blue");
  const none = explainFiles("html", { html: "<p>x</p>", css: "" }, { html: "<p>x</p>", css: "" });
  ok("nothing changed: 'No visible change'", none.summary === "No visible change" && none.items.length === 0);
  const both = explainFiles("html", { html: "<p>x</p>", css: "" }, { html: "<p>x</p><h1>y</h1>", css: "h1 { color: red }" });
  ok("html mode lists markup changes before CSS changes", both.items.length === 2 && both.items[0].title === "<h1> added" && both.items[1].scope === "h1");
  const c = explainCssChange("", ".c { display: flex; flex-direction: column }");
  ok("explainCssChange includes the mental model", c.model.length === 1 && has(c.model[0], "vertical"));
}

/* ---------------- typos and values the browser would ignore ---------------- */
{
  // stands in for a real browser's CSS.supports
  const BAD_PROPS = ["grid-template-column", "colour", "flex-directon", "dispay"];
  const property = (p: string) => !BAD_PROPS.includes(p);
  const declaration = (p: string, v: string) => property(p) && !(p === "align-items" && v === "centre") && !(p === "flex-direction" && v === "colum") && !(p === "display" && v === "flexx");
  const browser = { property, declaration };

  const bad = explainCss(".nav { display: flex }", ".nav { display: flex; align-items: centre }", browser);
  ok("an invalid value gets ONE warning and no pretend explanation", bad.length === 1 && bad[0].tone === "warning");
  ok("it names the value and the property, and suggests the fix", has(bad[0].text, "centre", "align-items", "ignores", "Did you mean `center`"));

  const typo = explainCss("", ".g { display: grid; grid-template-column: 1fr 1fr }", browser);
  ok("a misspelt property is flagged, with the right suggestion", typo.some((i) => i.tone === "warning" && has(i.text, "grid-template-column", "isn't a CSS property", "Did you mean `grid-template-columns`")));
  ok("the valid line next to it is still explained normally", typo.some((i) => i.tone === "added" && i.title === "display: grid"));
  ok("colour is suggested as color", has(explainCss("", ".x { colour: red }", browser)[0].text, "Did you mean `color`"));
  ok("a property with no close match gets 'check the spelling'", has(explainCss("", ".x { zzzzzz: 1 }", { property: () => false, declaration: () => false })[0].text, "Check the spelling"));

  ok("a value problem on a known property doesn't call the property unknown", !has(explainCss("", ".x { display: flexx }", browser)[0].text, "isn't a CSS property") && has(explainCss("", ".x { display: flexx }", browser)[0].text, "Did you mean `flex`"));
  ok("a flex-only property that is itself invalid doesn't ALSO trigger the 'needs flex' warning", explainCss("", ".x { flex-directon: row }", browser).length === 1);
  ok("valid declarations are untouched", explainCss("", ".x { display: flex; gap: 8px }", browser).every((i) => i.tone === "added"));
  ok("custom properties are never flagged", explainCss("", ".x { --brand: tomato }", { property: () => false, declaration: () => false }).every((i) => i.tone !== "warning"));
  ok("!important doesn't confuse the check", explainCss("", ".x { display: flex !important }", { declaration: (p, v) => v === "flex" }).every((i) => i.tone !== "warning"));
  ok("an invalid declaration that was removed again isn't reported as ignored", explainCss(".x { align-items: centre }", "", browser).every((i) => i.tone === "removed"));
}
{
  // no browser available (like these tests): spelling heuristics only
  const heur = (before: string, after: string) => explainCss(before, after, {});
  ok("heuristics: a near-miss property is flagged", heur("", ".g { grid-template-column: 1fr }").some((i) => i.tone === "warning" && has(i.text, "grid-template-columns")));
  ok("heuristics: a near-miss keyword value is flagged", heur("", ".c { align-items: centre }").some((i) => i.tone === "warning" && has(i.text, "Did you mean `center`")));
  ok("heuristics: space-betwen -> space-between", heur("", ".c { justify-content: space-betwen }").some((i) => has(i.text, "Did you mean `space-between`")));
  ok("heuristics: a valid property we don't know about is NOT flagged", heur("", ".c { scroll-snap-type: x mandatory }").every((i) => i.tone !== "warning"));
  ok("heuristics: a valid value we know is NOT flagged", heur("", ".c { display: flex; align-items: center }").every((i) => i.tone !== "warning"));
  ok("heuristics: numbers and lengths are never flagged as typos", heur("", ".c { display: flex; gap: 16px; flex-grow: 2 }").every((i) => i.tone !== "warning"));
  ok("heuristics: a far-off keyword isn't second-guessed (no spelling warning)", heur("", ".c { display: flex; align-items: banana }").every((i) => i.tone !== "warning"));
}
ok("editDistance: substitution, insertion, deletion", editDistance("centre", "center") === 1 && editDistance("colum", "column") === 1 && editDistance("flexx", "flex") === 1);
ok("editDistance: a swapped pair counts as one edit", editDistance("cneter", "center") === 1);
ok("editDistance: identical words and empty strings", editDistance("flex", "flex") === 0 && editDistance("", "abc") === 3);
ok("closest: finds the nearest within the limit", closest("centre", ["center", "start", "end"]) === "center");
ok("closest: nothing close enough gives undefined", closest("banana", ["center", "start", "end"]) === undefined);
ok("closest: an exact match is not a typo", closest("center", ["center", "centre"]) === undefined);

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
