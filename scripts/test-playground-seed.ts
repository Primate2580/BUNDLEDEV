/**
 * npm run test:seed
 *
 * Checks how a code example in a lesson becomes a Playground starting point.
 */
import { canOpenInPlayground, exampleId, sampleHtml, seedFromCode } from "../src/lib/playgroundSeed";

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : `  -> ${extra}`));
  if (!cond) failed++;
};

ok("html and css can be opened, other languages cannot", canOpenInPlayground("html") && canOpenInPlayground("css") && !canOpenInPlayground("js") && !canOpenInPlayground("md"));

ok("an html block opens as it is, in html mode", (() => {
  const seed = seedFromCode("html", "<h1>Hi</h1>");
  return seed?.mode === "html" && seed.html === "<h1>Hi</h1>" && seed.css === "";
})());
ok("a js block has no seed", seedFromCode("js", "alert(1)") === null);

ok("a class selector gets a matching div", sampleHtml(".badge { transform: rotate(-6deg); }") === '<div class="badge">Sample</div>');
ok("state pseudo-classes are ignored", sampleHtml(".card:hover { transform: scale(1.05); }") === '<div class="card">Sample</div>');
ok("pseudo-elements are ignored", sampleHtml(".card::before { content: \"\"; }") === '<div class="card">Sample</div>');
ok("a descendant selector nests the elements", (() => {
  const html = sampleHtml(".menu a { color: red; }");
  return html.includes('<div class="menu">') && html.includes('<a href="#">Sample</a>') && html.indexOf("menu") < html.indexOf("<a");
})());
ok("shared parents are merged", (() => {
  const html = sampleHtml(".menu a { color: red; }\n.menu .note { color: blue; }");
  return (html.match(/class="menu"/g) ?? []).length === 1 && html.includes('class="note"');
})());
ok("a selector list builds every element", (() => {
  const html = sampleHtml(".a, .b { margin: 0; }");
  return html.includes('class="a"') && html.includes('class="b"');
})());
ok("positional selectors repeat the element", (() => {
  const html = sampleHtml(".item:nth-child(2) { color: red; }");
  return (html.match(/class="item"/g) ?? []).length === 3;
})());
ok("an id and attributes are kept", (() => {
  const html = sampleHtml('#msg { color: red; }\ninput[type="email"] { color: blue; }');
  return html.includes('id="msg"') && html.includes('type="email"') && html.includes("<input");
})());
ok("compound selectors keep every class", sampleHtml(".btn.primary { color: red; }").includes('class="btn primary"'));
ok("@keyframes are skipped and rules inside @media are read", (() => {
  const html = sampleHtml("@keyframes spin { to { transform: rotate(360deg); } }\n.spinner { animation-name: spin; }\n@media (min-width: 40rem) { .wide { color: red; } }");
  return html.includes('class="spinner"') && html.includes('class="wide"') && !html.includes("spin\"") && !html.includes("to");
})());
ok("body, html and * add nothing", sampleHtml("body { margin: 0; }\n* { box-sizing: border-box; }") === '<div class="box">Sample</div>');
ok("declarations with no rule are wrapped in a sample box", (() => {
  const seed = seedFromCode("css", "transform: rotate(10deg);");
  return seed?.mode === "css" && seed.css.includes(".box {") && seed.css.includes("transform: rotate(10deg);") && seed.html.includes('class="box"');
})());
ok("a block's own html wins over the sample markup", seedFromCode("css", ".a { color: red; }", '<p class="a">Mine</p>')?.html === '<p class="a">Mine</p>');
ok("a css block with a rule opens with its css untouched", seedFromCode("css", ".a { color: red; }")?.css === ".a { color: red; }");

ok("an example's id is stable, and different code gives a different id", exampleId("css", ".a {}") === exampleId("css", ".a {}") && exampleId("css", ".a {}") !== exampleId("css", ".b {}") && exampleId("css", ".a {}") !== exampleId("html", ".a {}"));
ok("a seed carries the example's id", seedFromCode("css", ".a { color: red; }")?.id === exampleId("css", ".a { color: red; }") && seedFromCode("html", "<p>Hi</p>")?.id === exampleId("html", "<p>Hi</p>"));
ok("the same markup attached to an example changes its id", exampleId("css", ".a {}", "<p class=\"a\"></p>") !== exampleId("css", ".a {}"));

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
