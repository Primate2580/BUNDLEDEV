import { buildSrcDoc, styleText } from "../src/lib/preview/buildSrcDoc";
import { BRIDGE_SOURCE } from "../src/lib/preview/bridge";
import vm from "node:vm";

let failed = 0;
const ok = (name: string, cond: boolean) => { console.log((cond ? "PASS " : "FAIL ") + name); if (!cond) failed++; };
const base = { css: "p{color:red}", mode: "css" as const, nonce: "N0NCE", docId: "DOC1" };

// 1. fragment gets wrapped in a full document
let d = buildSrcDoc({ ...base, html: "<p>hi</p>" });
ok("fragment: doctype added", d.startsWith("<!doctype html>"));
ok("fragment: body contains html", d.includes("<body><p>hi</p></body>"));
ok("fragment: CSP before bridge", d.indexOf("Content-Security-Policy") < d.indexOf("<script"));
ok("fragment: nonce on script", d.includes('<script nonce="N0NCE">'));
ok("fragment: script-src only nonce", d.includes("script-src 'nonce-N0NCE'") && !d.includes("unsafe-eval"));
ok("fragment: doc id meta before script", d.indexOf('name="lab-doc"') < d.indexOf("<script"));
ok("fragment: css style tag", d.includes('<style id="lab-css">p{color:red}</style>'));

// 2. full document is kept, pieces injected into head
const full = '<!doctype html>\n<html lang="en"><head><title>T</title></head><body><h1>x</h1></body></html>';
d = buildSrcDoc({ ...base, html: full });
// count only the markup before our injected script (the script text may mention "<!doctype html>")
ok("full: one doctype", (d.slice(0, d.indexOf("<script")).match(/<!doctype/gi) || []).length === 1);
ok("full: CSP right after <head>", d.indexOf("<head>") + 6 === d.indexOf("<meta http-equiv"));
ok("full: style before </head>", d.indexOf('id="lab-css"') < d.indexOf("</head>") && d.indexOf('id="lab-css"') > d.indexOf("<title>"));
ok("full: learner title kept", d.includes("<title>T</title>"));

// 3. html without head
d = buildSrcDoc({ ...base, html: '<html><body>hi</body></html>' });
ok("no head: head created", d.includes("<html><head><meta http-equiv"));

// 3b. regression: <header> must not be mistaken for <head>
d = buildSrcDoc({ ...base, html: "<html><body><header>Hi</header></body></html>" });
ok("no <head> but a <header>: a real head is still created", d.includes("<html><head><meta http-equiv"));
ok("no <head> but a <header>: <header> left alone", d.includes("<body><header>Hi</header></body>"));

// 4. style breakout escaped
d = buildSrcDoc({ ...base, css: "a{}</style><img src=x>", html: "<p>x</p>" });
ok("style: </style escaped", !d.includes("</style><img") );

// 5. tailwind
d = buildSrcDoc({ ...base, mode: "tailwind", html: "<p class='p-4'>x</p>", tailwindSource: "window.__tw=1;/*</script>*/", css: "" });
ok("tw: tailwind script inlined with nonce", d.includes('<script nonce="N0NCE">window.__tw=1;'));
ok("tw: </script escaped in source", !d.includes("/*</script>*/"));
ok("tw: text/tailwindcss style with import", d.includes('type="text/tailwindcss"') && d.includes('@import "tailwindcss";'));
ok("tw: styleText helper", styleText("tailwind", "x").startsWith('@import "tailwindcss";'));
ok("css: styleText untouched", styleText("css", "x") === "x");

// 6. dark canvas
d = buildSrcDoc({ ...base, html: "<p>x</p>", canvas: "dark" });
ok("dark canvas style", d.includes("background:#0f172a"));

// 7. bridge: parses, reports ready with doc id, blocks links/forms, applies set-css
const sent: any[] = [];
const listeners: Record<string, Function[]> = {};
const docListeners: Record<string, Function[]> = {};
const style = { textContent: "old" };
const parentWin = { postMessage: (m: any) => sent.push(m) };
const win: any = {
  parent: parentWin,
  addEventListener: (t: string, f: Function) => (listeners[t] ||= []).push(f),
};
const doc: any = {
  readyState: "complete",
  querySelector: (sel: string) => (sel.includes("lab-doc") ? { getAttribute: () => "DOC1" } : null),
  getElementById: (id: string) => (id === "lab-css" ? style : null),
  addEventListener: (t: string, f: Function) => (docListeners[t] ||= []).push(f),
};
const ctx: any = { window: win, document: doc, console: { error() {}, warn() {} }, requestAnimationFrame: (f: Function) => f(), setTimeout: (f: Function) => f(), String, Array };
vm.createContext(ctx);
try { vm.runInContext(BRIDGE_SOURCE, ctx); ok("bridge: runs without error", true); } catch (e) { console.log(e); ok("bridge: runs without error", false); }
ok("bridge: sends ready with doc id", sent.some((m) => m.type === "ready" && m.doc === "DOC1" && m.source === "csslab"));

let prevented = 0;
const linkEvt = { target: { closest: () => ({ getAttribute: () => "https://example.com" }) }, preventDefault: () => prevented++ };
docListeners["click"][0](linkEvt);
ok("bridge: external link blocked + logged", prevented === 1 && sent.some((m) => m.type === "log" && /turned off/.test(m.text)));
const anchorEvt = { target: { closest: () => ({ getAttribute: () => "#about" }) }, preventDefault: () => prevented++ };
docListeners["click"][0](anchorEvt);
ok("bridge: #anchor links allowed", prevented === 1);
docListeners["submit"][0]({ preventDefault: () => prevented++ });
ok("bridge: form submit blocked", prevented === 2);

listeners["message"][0]({ source: parentWin, data: { target: "csslab", type: "set-css", css: "NEW" } });
ok("bridge: set-css updates style", style.textContent === "NEW");
listeners["message"][0]({ source: {}, data: { target: "csslab", type: "set-css", css: "EVIL" } });
ok("bridge: ignores messages not from parent", style.textContent === "NEW");

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
