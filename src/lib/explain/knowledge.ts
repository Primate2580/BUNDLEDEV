/**
 * Plain-English descriptions of CSS. Keyword values have their own sentence; other values are
 * described by small functions. {sel} is replaced by the selector (as `code`).
 */

const KEYWORDS: Record<string, Record<string, string>> = {
  display: {
    flex: "Makes {sel} a flex container. Its direct children become flex items and are laid out along one line.",
    "inline-flex": "Makes {sel} a flex container that sits inside a line of text, like a word.",
    grid: "Makes {sel} a grid container. Its direct children are placed into the cells of rows and columns.",
    "inline-grid": "Makes {sel} a grid container that sits inside a line of text, like a word.",
    block: "Makes {sel} a block: it starts on a new line and stretches to the full available width.",
    inline: "Makes {sel} flow inside a line of text, like a word. Width, height and vertical margins no longer apply.",
    "inline-block": "Makes {sel} flow like a word in a line of text, while still accepting width, height and margins.",
    none: "Removes {sel} from the page entirely, so it takes up no space.",
  },
  "flex-direction": {
    row: "Sets the main axis to horizontal, so items run from left to right.",
    "row-reverse": "Keeps the main axis horizontal but flips it, so items run from right to left and the first item sits at the right edge.",
    column: "Sets the main axis to vertical, so items stack from top to bottom. `justify-content` now works vertically, and `align-items` works horizontally.",
    "column-reverse": "Sets the main axis to vertical and flips it, so items stack from bottom to top.",
  },
  "justify-content": {
    "flex-start": "Packs the items at the start of the main axis, leaving all the free space at the end.",
    start: "Packs the items at the start, leaving the free space at the end.",
    center: "Centres the items along the main axis, with equal free space at both ends.",
    "flex-end": "Packs the items at the end of the main axis, leaving all the free space at the start.",
    end: "Packs the items at the end, leaving the free space at the start.",
    "space-between": "Pushes the first and last items to the edges and shares the leftover space equally between the items.",
    "space-around": "Gives every item equal space on both sides, so the gaps at the edges are half as big as the gaps between items.",
    "space-evenly": "Makes every gap the same size, including the gaps at the two edges.",
    stretch: "Stretches the auto-sized items to fill the free space.",
  },
  "align-items": {
    stretch: "Stretches the items across the cross axis so they fill it (unless they have a fixed size).",
    "flex-start": "Lines the items up at the start of the cross axis.",
    start: "Lines the items up at the start of the cross axis.",
    center: "Centres the items on the cross axis.",
    "flex-end": "Lines the items up at the end of the cross axis.",
    end: "Lines the items up at the end of the cross axis.",
    baseline: "Lines the items up by the baseline of their first line of text.",
  },
  "align-self": {
    auto: "Lets this item follow its container's `align-items` again.",
    stretch: "Stretches this one item across the cross axis.",
    "flex-start": "Moves this one item to the start of the cross axis, overriding `align-items`.",
    center: "Centres this one item on the cross axis, overriding `align-items`.",
    "flex-end": "Moves this one item to the end of the cross axis, overriding `align-items`.",
  },
  "flex-wrap": {
    nowrap: "Keeps every item on a single line, shrinking them if they don't fit.",
    wrap: "Lets items move onto a new line when they run out of room.",
    "wrap-reverse": "Lets items wrap onto new lines, with each new line added above the previous one.",
  },
  position: {
    static: "Puts {sel} back in the normal flow. `top`, `left` and `z-index` have no effect.",
    relative: "Keeps {sel} in the normal flow, but lets you nudge it with `top` and `left`, and makes it the reference point for absolutely positioned children.",
    absolute: "Takes {sel} out of the normal flow and positions it relative to the nearest positioned ancestor.",
    fixed: "Takes {sel} out of the flow and pins it to the browser window, so it stays put while scrolling.",
    sticky: "Lets {sel} scroll normally until it reaches a set edge, then sticks there.",
  },
  "box-sizing": {
    "border-box": "Makes `width` and `height` include the padding and border, so the box is exactly the size you wrote.",
    "content-box": "Makes `width` and `height` measure the content only. Padding and border are added on top, so the box ends up bigger than the number you wrote.",
  },
  "grid-auto-flow": {
    row: "Fills the grid row by row, adding new rows when it runs out of cells.",
    column: "Fills the grid column by column, adding new columns when it runs out of cells.",
    dense: "Fills row by row, and backfills earlier gaps with later items that fit, so the grid has fewer holes. The on-screen order can then differ from the HTML order.",
    "row dense": "Fills row by row, and backfills earlier gaps with later items that fit, so the grid has fewer holes. The on-screen order can then differ from the HTML order.",
    "column dense": "Fills column by column, and backfills earlier gaps with later items that fit, so the grid has fewer holes.",
  },
  "font-style": {
    italic: "Makes the text italic.",
    normal: "Makes the text upright, not italic.",
    oblique: "Slants the text, like italic, but without switching to a separate italic letter design.",
  },
  "list-style-type": {
    disc: "Uses solid round bullets as the list markers.",
    circle: "Uses hollow circles as the list markers.",
    square: "Uses square bullets as the list markers.",
    decimal: "Numbers the items 1, 2, 3 and so on.",
    none: "Removes the list markers.",
  },
  "text-transform": {
    uppercase: "Shows the text in capital letters, without changing the HTML.",
    lowercase: "Shows the text in lowercase letters, without changing the HTML.",
    capitalize: "Capitalises the first letter of every word, without changing the HTML.",
    none: "Shows the text exactly as it is written.",
  },
  visibility: {
    hidden: "Makes {sel} invisible, but it keeps the space it takes up, so the layout doesn't move. It can't be clicked or focused, and screen readers skip it.",
    visible: "Shows {sel} normally.",
    collapse: "Hides a table row or column and removes the space it took up.",
  },
  "justify-items": {
    stretch: "Stretches each item to fill its cell horizontally.",
    start: "Places each item at the left of its cell.",
    center: "Centres each item horizontally in its cell.",
    end: "Places each item at the right of its cell.",
  },
  "text-align": {
    left: "Aligns the text to the left edge.",
    center: "Centres the text.",
    right: "Aligns the text to the right edge.",
    justify: "Spreads each line so both edges are flush.",
    start: "Aligns the text to the start edge: the left in English, the right in right-to-left languages.",
    end: "Aligns the text to the end edge: the right in English, the left in right-to-left languages.",
  },
  "text-wrap": {
    wrap: "Wraps the text normally, filling each line before moving to the next.",
    balance: "Spreads the words evenly over the lines, so a heading has no single word stranded on its last line.",
    pretty: "Wraps the text normally, but tries to avoid a very short last line.",
    nowrap: "Keeps the text on one line, even if it overflows.",
  },
  "white-space": {
    normal: "Collapses extra spaces and wraps the text at the edge of the box.",
    nowrap: "Keeps the text on a single line and never wraps it.",
    pre: "Keeps spaces and line breaks exactly as typed, and never wraps.",
    "pre-wrap": "Keeps spaces and line breaks as typed, but still wraps at the edge of the box.",
    "pre-line": "Keeps line breaks as typed, collapses extra spaces and wraps normally.",
  },
  "list-style-position": {
    outside: "Hangs the marker in the margin, so wrapped lines of text line up neatly under each other.",
    inside: "Puts the marker inside the text, so wrapped lines of an item go underneath it.",
  },
  "vertical-align": {
    baseline: "Sits an inline box on the text baseline. For an image, that leaves a gap below it for letters like g and y.",
    middle: "Centres an inline box on the middle of the text line.",
    top: "Aligns the top of an inline box with the top of the line.",
    bottom: "Aligns the bottom of an inline box with the bottom of the line, which removes the gap under an image.",
    "text-top": "Aligns the top of the box with the top of the parent's text.",
    "text-bottom": "Aligns the bottom of the box with the bottom of the parent's text.",
    sub: "Lowers the box, like a subscript.",
    super: "Raises the box, like a superscript.",
  },
  "text-overflow": {
    ellipsis: "Ends clipped text with an ellipsis (...). It also needs `overflow: hidden` and `white-space: nowrap` to work.",
    clip: "Simply cuts the text off at the edge of the box.",
  },
  hyphens: {
    auto: "Lets the browser split long words with hyphens at the end of a line. It needs a `lang` attribute on the page.",
    manual: "Only breaks words where the HTML has a soft hyphen.",
    none: "Never splits words with hyphens.",
  },
  "overflow-wrap": {
    anywhere: "Lets a long word break at any point if it would otherwise overflow its box.",
    "break-word": "Lets a long word break if it would otherwise overflow its box.",
    normal: "Only breaks lines at normal break points, so a very long word can overflow.",
  },
  "word-break": {
    "break-all": "Lets any word break between any two letters. This is aggressive, so use it sparingly.",
    "keep-all": "Stops words from being broken, including in Chinese, Japanese and Korean text.",
    normal: "Breaks lines at normal break points.",
  },
  "font-variant-numeric": {
    "tabular-nums": "Gives every digit the same width, so columns of numbers line up and counters do not jiggle.",
    "proportional-nums": "Lets each digit have its natural width.",
    "lining-nums": "Uses numbers that are all the height of capital letters.",
    "oldstyle-nums": "Uses numbers with varying heights, like lowercase letters.",
    "slashed-zero": "Draws a slash through the zero, so it is not confused with the letter O.",
  },
  "font-variant-caps": {
    "small-caps": "Shows lowercase letters as smaller capitals.",
    "all-small-caps": "Shows every letter, including capitals, as small capitals.",
    normal: "Shows letters in their normal case.",
  },
  overflow: {
    hidden: "Clips anything that spills out of {sel}.",
    auto: "Adds scrollbars to {sel} only when its content doesn't fit.",
    scroll: "Always gives {sel} scrollbars, even if everything fits.",
    visible: "Lets content spill out of {sel} instead of clipping it.",
    clip: "Clips anything that spills out of {sel}, like `hidden`, but without making it a scroll container, so sticky children keep working.",
  },
  float: {
    left: "Floats {sel} to the left, and lets the text wrap around it.",
    right: "Floats {sel} to the right, and lets the text wrap around it.",
    none: "Keeps {sel} in normal flow, not floated.",
  },
  clear: {
    both: "Moves {sel} down until it is below any floated elements on either side.",
    left: "Moves {sel} down until it is below any left floats.",
    right: "Moves {sel} down until it is below any right floats.",
  },
  isolation: {
    isolate: "Makes {sel} its own stacking context, so its z-index values cannot leak out.",
    auto: "Lets {sel} share the surrounding stacking context.",
  },
  "pointer-events": {
    none: "Lets mouse and touch input pass straight through {sel}, to whatever is beneath it.",
    auto: "Lets {sel} receive mouse and touch input as normal.",
  },
};

/** Grid containers read these properties differently from flex containers. */
const GRID_KEYWORDS: Record<string, Record<string, string>> = {
  "align-items": {
    stretch: "Stretches each item to fill its cell vertically.",
    start: "Places each item at the top of its cell.",
    center: "Centres each item vertically in its cell.",
    end: "Places each item at the bottom of its cell.",
  },
  "justify-content": {
    start: "Packs the columns at the left of the grid container.",
    center: "Centres the whole set of columns in the grid container.",
    end: "Packs the columns at the right of the grid container.",
    "space-between": "Spreads the columns out, with the leftover space between them.",
    "space-around": "Spreads the columns with equal space around each.",
    "space-evenly": "Spreads the columns with equal gaps everywhere.",
  },
};

/** What a property is for, used when we don't have a specific sentence for the value. */
const GIST: Record<string, string> = {
  color: "the text colour",
  background: "the background",
  "background-color": "the background colour",
  "font-size": "the text size",
  "font-family": "the typeface",
  "font-weight": "how bold the text is",
  "line-height": "the height of each line of text",
  "letter-spacing": "the space between letters",
  "text-decoration": "underlines and other text decoration",
  opacity: "how see-through the element is",
  width: "the width",
  height: "the height",
  "min-width": "the smallest width allowed",
  "max-width": "the largest width allowed",
  "min-height": "the smallest height allowed",
  "max-height": "the largest height allowed",
  margin: "the margin (the space outside the border)",
  "margin-top": "the space above the element (its top margin)",
  "margin-right": "the space to the right of the element (its right margin)",
  "margin-bottom": "the space below the element (its bottom margin)",
  "margin-left": "the space to the left of the element (its left margin)",
  "padding-top": "the space between the content and the top border (top padding)",
  "padding-right": "the space between the content and the right border (right padding)",
  "padding-bottom": "the space between the content and the bottom border (bottom padding)",
  "padding-left": "the space between the content and the left border (left padding)",
  padding: "the padding (the space between the content and the border)",
  border: "the border",
  "border-width": "how thick the border is",
  "border-style": "the border's line style",
  "border-color": "the border's colour",
  "border-radius": "how rounded the corners are",
  "box-shadow": "the shadow around the box",
  top: "the distance from the top edge",
  right: "the distance from the right edge",
  bottom: "the distance from the bottom edge",
  left: "the distance from the left edge",
  "z-index": "the stacking order (higher sits in front)",
  cursor: "the mouse pointer shown on hover",
  transition: "how changes are animated",
  transform: "moving, scaling or rotating the element",
  order: "the item's position in the flex or grid order",
  "border-top-color": "the colour of the top border",
  "outline-color": "the outline's colour",
  "text-decoration-color": "the colour of the underline or other text decoration",
  "caret-color": "the colour of the text cursor",
  "accent-color": "the colour of checkboxes, radio buttons and other built-in controls",
  "color-scheme": "which colour schemes (light, dark or both) the page supports",
  fill: "the fill colour of an SVG shape",
  "background-image": "the background image or gradient",
  "background-size": "how big the background image is drawn",
  "background-repeat": "whether and how the background image tiles",
  "background-position": "where the background image sits in the box",
  "background-clip": "how far the background paint reaches (border, padding, content or text)",
  "background-origin": "which box the background image is positioned against",
  "background-attachment": "whether the background scrolls with the page or stays fixed",
  "background-blend-mode": "how the background layers blend with each other",
  "border-top-width": "how thick the top border is",
  "border-top-style": "the line style of the top border",
  "outline-width": "how thick the outline is",
  "outline-style": "the outline's line style",
  "outline-offset": "the gap between the border and the outline",
  "object-fit": "how an image is scaled to fit its box",
  "object-position": "which part of an image stays visible when it is cropped",
  "backdrop-filter": "an effect applied to whatever is behind the element",
  "mask-image": "an image that hides parts of the element",
  "--angle": "the angle of the gradient (0deg is up, 90deg is right)",
  "--c1": "the first gradient colour",
  "--c2": "the second gradient colour",
  "--stop": "where the two gradient colours mix half and half",
  "--x": "the horizontal offset of the shadow",
  "--y": "the vertical offset of the shadow",
  "--blur": "how soft the shadow's edge is",
  "--spread": "how far the shadow grows beyond the box",
  font: "the font shorthand (style, weight, size, line height and family)",
  "text-indent": "how far the first line of the text is indented",
  "word-spacing": "the space between words",
  "text-decoration-line": "which line is drawn on the text (underline, overline or line-through)",
  "text-decoration-style": "the style of the text decoration line (solid, dotted, wavy...)",
  "text-decoration-thickness": "how thick the underline or other decoration line is",
  "text-underline-offset": "how far the underline sits below the text",
  "text-shadow": "the shadow behind the text",
  "font-stretch": "how wide or narrow the letter shapes are",
  "font-optical-sizing": "whether the font adjusts its design to the text size",
  "font-variation-settings": "low-level axes of a variable font",
  "font-feature-settings": "low-level OpenType features of the font",
  "font-synthesis": "whether the browser may fake bold and italic when a font lacks them",
  "font-kerning": "whether the font's kerning (letter pair spacing) is used",
  quotes: "which quotation marks the `q` element uses",
  "tab-size": "the width of a tab character",
  "hanging-punctuation": "whether punctuation hangs outside the edge of the text block",
  "inset": "all four offsets (top, right, bottom, left) at once",
  "scroll-padding-top": "the space kept above the target when the page scrolls to it",
  "scroll-margin-top": "the space kept above this element when the page scrolls to it",
  "align-self": "how this item aligns itself across the container",
  "transition-property": "which properties animate when they change",
  "transition-duration": "how long the transition takes",
  "transition-delay": "how long to wait before the transition starts",
  "transition-timing-function": "the speed curve of the transition",
  filter: "a visual effect on the element, such as a blur or a colour change (any filter other than none also creates a stacking context)",
  "animation-name": "which @keyframes animation to play",
  "animation-duration": "how long one run of the animation takes (0s means it never plays)",
  "animation-timing-function": "the speed curve of the animation",
  "animation-delay": "how long to wait before the animation starts",
  "animation-iteration-count": "how many times the animation plays (infinite loops forever)",
  "animation-direction": "whether each run plays forwards, backwards or alternates",
  "animation-fill-mode": "what the element looks like before the animation starts and after it ends",
  "animation-play-state": "whether the animation is running or paused",
  "perspective": "how far away the viewer is, which gives 3D transforms their sense of depth",
  "transform-style": "whether the element's children share its 3D space",
  "backface-visibility": "whether the back of an element is visible when it is turned away",
  "--brand": "the brand colour that other rules read with var(--brand)",
  "--accent": "the accent colour that other rules read with var(--accent)",
  "--surface": "the colour of surfaces such as cards",
  "--text": "the main text colour",
  "--muted": "the colour for secondary text",
  "--space": "the base spacing unit",
  "--space-2": "a small spacing step",
  "--space-3": "a medium spacing step",
  "--space-4": "a large spacing step, built from the medium one",
  "--radius": "the corner radius shared by cards and buttons",
  "--shadow": "a whole shadow stored under one name",
  "--btn-bg": "the button's background setting, with a fallback in the button rule",
  "--btn-text": "the button's text colour setting",
  "--cols": "the number of grid columns, stored as a plain number",
  "--duration": "how long transitions take, so one rule can shorten them all",
  "--size": "a size that other rules read with var(--size)",
  "--lift": "how much an element grows on hover",
  "transition-behavior": "whether properties that normally jump, such as display, may take part in the transition",
  "scroll-behavior": "whether scrolling to a position glides or jumps",
  "will-change": "a hint to the browser about which property is about to animate",
  "transform-origin": "the point that a transform turns or scales around",
  content: "the text or generated content that appears in a pseudo-element",
  "container-type": "marks the element as a container that container queries can measure",
  "container-name": "a name for this container, so queries can target it",
  "print-color-adjust": "whether backgrounds and colours are kept when printing",
  "border-bottom-width": "how thick the bottom border is",
  "border-bottom-style": "the line style of the bottom border",
  "border-bottom-color": "the colour of the bottom border",
  "counter-reset": "creates (or restarts) a named counter",
  "counter-increment": "adds to a named counter each time it applies",
  "--icon": "the text drawn by the icon pseudo-element",
  "--suffix": "the text drawn by the suffix pseudo-element",
  "--gap": "the space around the pseudo-elements",
  "--bg": "the background colour",
  "--hue": "the hue (the position on the colour wheel, 0 to 360)",
  "--sat": "the saturation (how vivid the colour is)",
  "--light": "the lightness (from black through the pure colour to white)",
  "--alpha": "the alpha (how see-through the colour is, from 0 to 1)",
};

const len = (value: string) => `\`${value}\``;

/** Splits "1fr 200px" or "repeat(3, 1fr) 50px" into top-level tokens. */
function tokens(value: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of value.trim()) {
    if (char === "(") depth++;
    if (char === ")") depth--;
    if (/\s/.test(char) && depth === 0) {
      if (current) out.push(current);
      current = "";
    } else current += char;
  }
  if (current) out.push(current);
  return out;
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const count = (n: number) => NUMBER_WORDS[n] ?? String(n);

function describeTracks(value: string, axis: "columns" | "rows", auto = false): string {
  const list = tokens(value);
  if (list.length === 1 && list[0] === "none") return `Removes the explicit ${axis}.`;
  if (auto) {
    return `Sets the size of every ${axis === "rows" ? "row" : "column"} the grid creates automatically to ${len(value)}.`;
  }
  const repeat = list.length === 1 ? list[0].match(/^repeat\(\s*(\d+)\s*,\s*(.+)\)$/) : null;
  if (repeat) {
    const n = Number(repeat[1]);
    const size = repeat[2].trim();
    const equal = /^1fr$|^minmax\(0,\s*1fr\)$/.test(size);
    return equal
      ? `Creates ${count(n)} equal-width ${axis}. An \`fr\` is one share of the leftover space.`
      : `Creates ${count(n)} ${axis}, each ${len(size)}.`;
  }
  const hasFr = list.some((t) => /fr$/.test(t));
  const base = `Creates ${count(list.length)} ${axis}: ${list.map(len).join(", ")}.`;
  return hasFr ? `${base} An \`fr\` is one share of the leftover space, so \`2fr\` is twice as wide as \`1fr\`.` : base;
}

function describeFlex(value: string): string {
  const [grow, shrink, basis] = tokens(value);
  if (value.trim() === "none") return "Makes the item rigid: it won't grow or shrink from its own size.";
  if (value.trim() === "auto") return "Lets the item grow and shrink, starting from its own size.";
  if (tokens(value).length === 1 && /^\d+(\.\d+)?$/.test(grow)) {
    return `Lets the item grow to take ${Number(grow) === 1 ? "a share of" : `${grow} shares of`} the free space, starting from zero size.`;
  }
  return `Sets grow ${len(grow ?? "0")}, shrink ${len(shrink ?? "1")} and starting size ${len(basis ?? "auto")} in one go.`;
}

const DYNAMIC: Record<string, (v: string, sel: string) => string> = {
  gap: (v) => `Puts ${len(v)} of space between the items, between rows and between columns.`,
  "column-gap": (v) => `Puts ${len(v)} of space between the columns.`,
  "row-gap": (v) => `Puts ${len(v)} of space between the rows.`,
  "flex-grow": (v) =>
    Number(v) === 0
      ? "Stops this item from growing, so it keeps its own size."
      : `Lets this item grow to take ${Number(v) === 1 ? "a share" : `${v} shares`} of the free space. Items with a bigger number take proportionally more.`,
  "flex-shrink": (v) =>
    Number(v) === 0 ? "Stops this item from shrinking when space runs out." : "Lets this item shrink when there isn't enough room.",
  "flex-basis": (v) => `Sets the item's starting size along the main axis to ${len(v)}, before growing or shrinking.`,
  flex: (v) => describeFlex(v),
  "grid-template-columns": (v) => describeTracks(v, "columns"),
  "grid-template-rows": (v) => describeTracks(v, "rows"),
  "grid-auto-rows": (v) => describeTracks(v, "rows", true),
  "grid-auto-columns": (v) => describeTracks(v, "columns", true),
  "grid-column": (v, sel) => {
    const span = v.match(/span\s+(\d+)/);
    return span ? `Makes ${sel} stretch across ${count(Number(span[1]))} columns.` : `Places ${sel} using the column lines ${len(v)}.`;
  },
  "grid-row": (v, sel) => {
    const span = v.match(/span\s+(\d+)/);
    return span ? `Makes ${sel} stretch across ${count(Number(span[1]))} rows.` : `Places ${sel} using the row lines ${len(v)}.`;
  },
  "place-items": (v) => `Positions each item inside its cell, horizontally and vertically (${len(v)}).`,
  "z-index": (v) => `Sets the stacking order to ${len(v)}. Higher numbers sit in front. It only works on positioned elements.`,
  opacity: (v) => `Makes the element ${Number(v) >= 1 ? "fully opaque" : Number(v) <= 0 ? "invisible" : `${Math.round(Number(v) * 100)}% opaque`}.`,
  "font-weight": (v) => (/^(bold|[6-9]00)$/.test(v) ? "Makes the text bold." : /^(normal|400)$/.test(v) ? "Makes the text normal weight." : `Sets the text weight to ${len(v)}.`),
};

export function selectorLabel(selector: string): string {
  return `\`${selector}\``;
}

export interface DescribeContext {
  /** the final `display` of the same selector, if any */
  display?: string;
}

/** One plain-English sentence for `prop: value` on `selector`. */
export function describeDeclaration(prop: string, value: string, selector: string, context: DescribeContext = {}): string {
  const sel = selectorLabel(selector);
  const v = value.replace(/\s*!important\s*$/i, "").trim();
  const isGrid = context.display === "grid" || context.display === "inline-grid";

  const gridText = isGrid ? GRID_KEYWORDS[prop]?.[v] : undefined;
  const keyword = gridText ?? KEYWORDS[prop]?.[v];
  if (keyword) return keyword.replaceAll("{sel}", sel);

  const dynamic = DYNAMIC[prop];
  if (dynamic) return dynamic(v, sel);

  const gist = GIST[prop];
  if (gist) return `Sets ${gist} of ${sel} to ${len(v)}.`;
  return `Sets ${len(prop)} on ${sel} to ${len(v)}.`;
}

/** Properties that only take effect on a particular kind of container. */
export const FLEX_OR_GRID_PROPS = ["justify-content", "align-content", "align-items"];
export const FLEX_ONLY_PROPS = ["flex-direction", "flex-wrap", "flex-flow"];
export const GRID_ONLY_PROPS = ["grid-template-columns", "grid-template-rows", "grid-auto-rows", "grid-auto-columns", "grid-auto-flow", "justify-items", "place-items"];

/** Every property this file can describe. Used to suggest corrections for misspellings. */
export const KNOWN_PROPERTIES: string[] = [...new Set([...Object.keys(KEYWORDS), ...Object.keys(GRID_KEYWORDS), ...Object.keys(GIST), ...Object.keys(DYNAMIC)])];

/** The keyword values we describe for a property (e.g. "center", "space-between"). */
export const knownValues = (prop: string): string[] => Object.keys(KEYWORDS[prop] ?? {});

/**
 * What can be asked about validity. Both are optional: where the answer can't be known, the caller falls
 * back to spelling heuristics.
 */
export interface Validity {
  /** is this a property the browser recognises? */
  property?: (prop: string) => boolean;
  /** will the browser accept this whole declaration? */
  declaration?: (prop: string, value: string) => boolean;
}

/** In a real browser, ask the browser itself. Anywhere else, say nothing and let the heuristics work. */
export function browserValidity(): Validity {
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") return {};
  return {
    property: (prop) => CSS.supports(prop, "initial"),
    declaration: (prop, value) => CSS.supports(prop, value),
  };
}
