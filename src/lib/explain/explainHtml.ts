import type { PreviewMode } from "@/engine/types";
import type { ExplainItem } from "./types";

interface Tag {
  name: string;
  attrs: Record<string, string>;
}

const TAG_RE = /<([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s"'<>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*\/?>/g;
const ATTR_RE = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

/** A tolerant, source-level scan: what the learner TYPED, not what the browser builds. */
function scan(html: string) {
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, (match, name: string) => `${match.match(/^<[^>]*>/)![0]}</${name}>`);
  const doctype = /<!doctype\s+html\b[^>]*>/i.test(cleaned);

  const tags: Tag[] = [];
  for (const match of cleaned.matchAll(TAG_RE)) {
    const attrs: Record<string, string> = {};
    for (const a of (match[2] ?? "").matchAll(ATTR_RE)) attrs[a[1].toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? "";
    tags.push({ name: match[1].toLowerCase(), attrs });
  }
  const text = cleaned.replace(/<!doctype[^>]*>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return { doctype, tags, text };
}

const signature = (tag: Tag) =>
  `${tag.name}|${Object.entries(tag.attrs).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${k}=${v}`).join("&")}`;

/** Tags present in `a` but not in `b`, matching duplicates one for one. */
function minus(a: Tag[], b: Tag[]): Tag[] {
  const pool = new Map<string, number>();
  for (const tag of b) pool.set(signature(tag), (pool.get(signature(tag)) ?? 0) + 1);
  const left: Tag[] = [];
  for (const tag of a) {
    const key = signature(tag);
    const n = pool.get(key) ?? 0;
    if (n > 0) pool.set(key, n - 1);
    else left.push(tag);
  }
  return left;
}

const ELEMENTS: Record<string, string> = {
  html: "The root of the page. Everything else lives inside it.",
  head: "Holds information about the page (title, encoding, links to styles), not content people read.",
  body: "Holds everything visitors see and use.",
  title: "Sets the text shown in the browser tab and in search results.",
  meta: "Gives the browser information about the page. It isn't shown on the page.",
  link: "Connects the page to another file, such as a stylesheet or an icon.",
  script: "Loads or contains JavaScript.",
  style: "Contains CSS for the page.",
  h1: "The main heading of the page. Use one per page.",
  h2: "A section heading, one level below the main heading.",
  h3: "A subsection heading, one level below an `h2`.",
  h4: "A heading one level below an `h3`.",
  h5: "A heading one level below an `h4`.",
  h6: "The smallest heading level.",
  p: "A paragraph of text.",
  a: "A link: clickable text that takes the visitor somewhere.",
  img: "Shows an image.",
  ul: "An unordered (bulleted) list. Its direct children should be `li` elements.",
  ol: "An ordered (numbered) list. Its direct children should be `li` elements.",
  li: "One item in a list.",
  div: "A generic box for grouping content. It carries no meaning of its own.",
  span: "A generic wrapper for part of a line of text. It carries no meaning of its own.",
  nav: "A group of navigation links.",
  header: "Introductory content for the page or a section.",
  footer: "Closing content for the page or a section.",
  main: "The main content of the page. Use one per page.",
  section: "A themed section of the page, usually with its own heading.",
  article: "A self-contained piece of content that makes sense on its own.",
  aside: "Content related to the main content, like a sidebar.",
  button: "A clickable button.",
  form: "A form that gathers input from the visitor.",
  input: "A form field. Its `type` decides what kind.",
  label: "A caption for a form control. Clicking it focuses the control.",
  textarea: "A multi-line text field.",
  select: "A drop-down list of choices.",
  option: "One choice inside a `select`.",
  table: "A table of data in rows and columns.",
  tr: "One row in a table.",
  td: "A data cell in a table row.",
  th: "A header cell in a table.",
  strong: "Marks text as strongly important (shown bold).",
  em: "Marks text as emphasised (shown italic).",
  br: "A line break.",
  hr: "A thematic break between sections, drawn as a line.",
  figure: "A self-contained figure, such as an image with a caption.",
  figcaption: "The caption for a `figure`.",
  caption: "The title of a table. It must be the first thing inside the table.",
  thead: "The group of heading rows at the top of a table.",
  tbody: "The group of main data rows in a table.",
  tfoot: "The group of summary rows at the bottom of a table, such as totals.",
  colgroup: "Describes the columns of a table, so a whole column can be styled.",
  col: "Describes one column inside a column group. It has no content.",
  dl: "A description list: terms and their descriptions.",
  dt: "A term in a description list.",
  dd: "The description of a term in a description list.",
  svg: "An inline vector drawing. Its shapes can be styled with CSS.",
  circle: "A circle inside an SVG drawing.",
  path: "A free-form line or shape inside an SVG drawing.",
  hgroup: "Groups a heading with its tagline or subtitle, so the two read as one heading.",
  b: "Draws attention to text without making it more important (shown bold).",
  i: "Marks text in an alternate voice or mood, such as a foreign phrase or a technical term (shown italic).",
  mark: "Highlights text that is relevant right now, like a search term in results.",
  small: "Marks side comments and fine print, such as legal notes.",
  s: "Marks content that is no longer accurate or relevant (shown with a line through it).",
  u: "Marks text with an unwritten annotation, such as a misspelling. Rarely the right choice.",
  blockquote: "A longer quotation from another source. Put the quoted text in paragraphs inside it.",
  q: "A short quotation inside a sentence. The browser adds the quotation marks.",
  cite: "The title of a creative work, such as a book, an article or a song.",
  pre: "Preformatted text: spaces and line breaks are kept exactly as typed.",
  code: "A piece of computer code (shown in a monospaced font).",
  kbd: "Input that a person types or presses, such as a key.",
  samp: "Sample output from a program.",
  var: "A variable name, as in a formula or a piece of code.",
  abbr: "An abbreviation. Its `title` can hold the full form.",
  dfn: "The term being defined in the sentence around it.",
  time: "A date or time. Its `datetime` holds the same moment in a form a computer can read.",
  address: "Contact information for the page or for the article around it.",
  sub: "Text that sits below the line, such as the 2 in H2O.",
  sup: "Text that sits above the line, such as the 2 in m2, or a footnote marker.",
  del: "Text that has been removed from the document (shown with a line through it).",
  ins: "Text that has been added to the document (shown underlined).",
  bdi: "Isolates text whose direction is not known, such as a visitor's username, so it cannot disturb the text around it.",
  bdo: "Overrides the text direction for its contents.",
  wbr: "Suggests a place where a long word or address may break onto a new line.",
};

function attrText(name: string, value: string, tag: Tag): string {
  const tick = (v: string) => `\`${v}\``;
  switch (name) {
    case "lang":
      return tag.name === "html"
        ? `Declares the page language as ${tick(value)}. Screen readers use it to pick the right pronunciation, and browsers use it for translation.`
        : `Declares that the text in this ${tick(`<${tag.name}>`)} is written in ${tick(value)}, so screen readers pronounce it properly.`;
    case "dir":
      return value === "rtl" ? "Sets the text direction to right to left, as in Arabic or Hebrew." : value === "ltr" ? "Sets the text direction to left to right." : `Sets the text direction to ${tick(value)}.`;
    case "cite":
      return `Gives the web address of the source: ${tick(value)}. Visitors do not see it, but tools can read it.`;
    case "datetime":
      return `Gives the date or time in a fixed format that a computer can read: ${tick(value)}.`;
    case "title":
      return tag.name === "abbr" ? `Gives the full form of the abbreviation: ${tick(value)}.` : `Sets a tooltip for this element: ${tick(value)}.`;
    case "charset":
      return `Tells the browser the file's text encoding is ${tick(value)}, so letters, accents and symbols display correctly.`;
    case "name":
      if (tag.name === "meta") {
        if (value === "viewport") return "Marks this as the viewport setting, which makes phones use their real screen width instead of pretending to be a desktop.";
        if (value === "description") return "Provides the short summary search engines often show under your title.";
      }
      return `Names this ${tick(`<${tag.name}>`)} ${tick(value)}.`;
    case "content":
      return tag.name === "meta" && tag.attrs.name === "viewport"
        ? "Tells the phone to match its real screen width at normal zoom."
        : `Sets the value for this meta tag: ${tick(value)}.`;
    case "href":
      return `Sets where the link goes: ${tick(value)}.${
        value.startsWith("#")
          ? " A `#` link jumps to the element with that id on the same page."
          : value.startsWith("mailto:")
            ? " The `mailto:` scheme opens the visitor's email program."
            : value.startsWith("tel:")
              ? " The `tel:` scheme offers to start a phone call."
              : ""
      }`;
    case "src":
      return `Says which file to load: ${tick(value)}.`;
    case "alt":
      return "Describes the image in words, for screen readers and for when the image can't load.";
    case "id":
      return `Gives the element the unique name ${tick(value)}, which links and CSS can target.`;
    case "for":
      return `Connects this label to the form control with the id ${tick(value)}.`;
    case "placeholder":
      return `Shows the hint ${tick(value)} inside the empty field.`;
    case "required":
      return "Makes the field mandatory: the browser won't submit the form without it.";
    case "disabled":
      return "Turns the control off, so it can't be used.";
    case "target":
      return value === "_blank" ? "Opens the link in a new tab. Pair it with `rel=\"noopener noreferrer\"`." : `Sets where the link opens: ${tick(value)}.`;
    case "rel":
      return `Describes how this page relates to the one it links to: ${tick(value)}. The keywords \`noopener\` and \`noreferrer\` keep a new tab from reaching back to this page.`;
    case "width":
      return `Sets the width of the picture to ${tick(value)} pixels before the file loads, so the browser can reserve the space.`;
    case "height":
      return `Sets the height of the picture to ${tick(value)} pixels before the file loads, so the page does not jump when it arrives.`;
    case "loading":
      return value === "lazy" ? "Waits to download the image until it is near the screen. Use it for images below the fold, never for the main one." : `Sets when the image loads: ${tick(value)}.`;
    case "fetchpriority":
      return value === "high" ? "Asks the browser to download this file ahead of less important ones. Use it for one image at most." : `Sets the download priority to ${tick(value)}.`;
    case "decoding":
      return `Tells the browser how to turn the file into pixels: ${tick(value)}. Async lets it do so without holding up the page.`;
    case "download":
      return value ? `Asks the browser to save the file instead of opening it, under the name ${tick(value)}.` : "Asks the browser to save the file instead of opening it.";
    case "type":
      return tag.name === "ol"
        ? `Sets the style of the numbers to ${tick(value)}: \`1\` for numbers, \`a\` or \`A\` for letters, \`i\` or \`I\` for Roman numerals.`
        : `Sets the kind of ${tick(`<${tag.name}>`)} to ${tick(value)}.`;
    case "scope":
      return value === "col" ? "Says this heading labels the column beneath it." : value === "row" ? "Says this heading labels the cells to its right, along the row." : `Says what this heading labels: ${tick(value)}.`;
    case "colspan":
      return `Makes this cell stretch across ${tick(value)} columns.`;
    case "rowspan":
      return `Makes this cell stretch down ${tick(value)} rows.`;
    case "tabindex":
      return value === "0" ? "Puts this element in the keyboard tab order, so it can be focused and scrolled with the arrow keys." : `Sets the keyboard focus order to ${tick(value)}.`;
    case "start":
      return `Sets the number of the first item to ${tick(value)}. The items after it carry on from there.`;
    case "reversed":
      return "Makes the list count down, so the first item gets the highest number.";
    case "value":
      return `Sets this item's own number to ${tick(value)}. The items after it carry on from there.`;
    case "role":
      return `Tells assistive tools what this element is: ${tick(value)}.`;
    case "aria-current":
      return value === "page" ? "Tells assistive tools that this link points at the page the visitor is on." : `Marks this as the current item in a set: ${tick(value)}.`;
    case "style":
      return "Applies CSS directly to this one element.";
    default:
      return value === "" ? `Turns on ${tick(name)}.` : `Sets ${tick(name)} to ${tick(value)}.`;
  }
}

const classes = (value: string | undefined) => (value ?? "").split(/\s+/).filter(Boolean);
const list = (items: string[]) => items.map((i) => `\`${i}\``).join(", ");

/** Describes how one element's attributes changed. */
function describeAttrChange(before: Tag, after: Tag, mode: PreviewMode): { parts: string[]; texts: string[] } {
  const parts: string[] = [];
  const texts: string[] = [];
  for (const name of new Set([...Object.keys(after.attrs), ...Object.keys(before.attrs)])) {
    const from = before.attrs[name];
    const to = after.attrs[name];
    if (from === to) continue;

    if (name === "class") {
      const was = classes(from);
      const now = classes(to);
      const added = now.filter((c) => !was.includes(c));
      const removed = was.filter((c) => !now.includes(c));
      parts.push("class changed");
      const what = mode === "tailwind" ? "Each Tailwind utility class applies one CSS rule" : "Class names let CSS target the element";
      if (added.length) texts.push(`Added ${added.length === 1 ? "class" : "classes"} ${list(added)}. ${what}.`);
      if (removed.length) texts.push(`Removed ${removed.length === 1 ? "class" : "classes"} ${list(removed)}.`);
    } else if (to === undefined) {
      parts.push(`${name} removed`);
      texts.push(`Removes the \`${name}\` attribute.`);
    } else {
      parts.push(from === undefined ? `${name} added` : `${name} changed`);
      texts.push(attrText(name, to, after));
    }
  }
  return { parts, texts };
}

const MAX_ITEMS = 8;

/** What changed between two versions of the HTML, in plain English. */
export function explainHtml(beforeHtml: string, afterHtml: string, mode: PreviewMode = "html"): ExplainItem[] {
  const before = scan(beforeHtml);
  const after = scan(afterHtml);
  const items: ExplainItem[] = [];

  if (!before.doctype && after.doctype) {
    items.push({ tone: "added", title: "doctype added", text: "Tells the browser to use modern standards mode, so the page renders consistently instead of in old quirks mode." });
  } else if (before.doctype && !after.doctype) {
    items.push({ tone: "removed", title: "doctype removed", text: "Without a doctype the browser falls back to quirks mode, which renders pages unpredictably." });
  }

  const added = minus(after.tags, before.tags);
  const removed = minus(before.tags, after.tags);

  // An element that disappeared and one of the same name that appeared is one element that was edited.
  const unpairedRemoved = [...removed];
  for (const tag of added) {
    const at = unpairedRemoved.findIndex((r) => r.name === tag.name);
    if (at >= 0) {
      const [old] = unpairedRemoved.splice(at, 1);
      const { parts, texts } = describeAttrChange(old, tag, mode);
      if (parts.length) items.push({ tone: "changed", title: `<${tag.name}> ${parts.join(", ")}`, text: texts.join(" ") });
      continue;
    }
    const notable = Object.entries(tag.attrs)
      .filter(([name]) => name !== "class" || mode === "tailwind")
      .slice(0, 2)
      .map(([name, value]) => (name === "class" ? `Classes: ${list(classes(value))}.` : attrText(name, value, tag)));
    items.push({
      tone: "added",
      title: `<${tag.name}> added`,
      text: [ELEMENTS[tag.name] ?? `A \`<${tag.name}>\` element.`, ...notable].join(" "),
    });
  }
  for (const tag of unpairedRemoved) {
    items.push({ tone: "removed", title: `<${tag.name}> removed`, text: `Removes a \`<${tag.name}>\` element from the page.` });
  }

  if (items.length === 0 && before.text !== after.text) {
    const was = new Set(before.text.toLowerCase().split(" "));
    const fresh = after.text.split(" ").filter((w) => w && !was.has(w.toLowerCase())).slice(0, 5);
    items.push({
      tone: "changed",
      title: "Text changed",
      text: fresh.length ? `You edited the visible text. New words include ${list(fresh)}.` : "You edited the visible text.",
    });
  }

  if (items.length > MAX_ITEMS) {
    const extra = items.length - MAX_ITEMS;
    items.length = MAX_ITEMS;
    items.push({ tone: "changed", title: `…and ${extra} more`, text: "There were more changes than fit here." });
  }
  return items;
}
