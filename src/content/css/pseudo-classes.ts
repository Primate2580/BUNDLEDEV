import type { TopicContent } from "@/engine/types";
import buildASettingsPanel from "./pseudo-classes/workshops/build-a-settings-panel/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: "pseudo-classes-vs-pseudo-elements",
      kind: "learn",
      title: "Pseudo-classes and pseudo-elements",
      summary: "One colon or two: styling an element's state or position, versus styling a part of it or content that is not in the HTML.",
      minutes: 9,
      concept: {
        description:
          "A **pseudo-class** (one colon, such as `:hover` or `:first-child`) picks out elements that are in a particular **state or position**. A **pseudo-element** (two colons, such as `::before` or `::first-line`) picks out a **part** of an element, or content that CSS creates and that is not in the HTML at all.",
        why: "Pseudo-classes and pseudo-elements are how CSS reacts to the things your HTML cannot say: whether the mouse is over a button, whether an item is the last in a list, whether a checkbox is ticked, or what comes before a heading. Without them, you would have to add classes with JavaScript for every state.",
        mentalModel:
          "A pseudo-class is a label that the browser sticks on an element for you, such as \"hovered\", \"first\" or \"checked\". A pseudo-element is a hidden helper element the browser can create, like the first line of a paragraph or a decoration placed before a heading.",
      },
      body: [
        { type: "heading", text: "One colon or two" },
        {
          type: "paragraph",
          text: "The number of colons tells you which kind it is. `a:hover` means \"links that are being hovered\". The link is a real element in your HTML, and `:hover` filters which links the rule applies to. `p::first-line` means \"the first line of each paragraph\", which is not an element in your HTML. It is a piece of the paragraph that the browser can style separately. CSS2 allowed a single colon for the four oldest pseudo-elements (`:before`, `:after`, `:first-line` and `:first-letter`), and browsers still accept that, but the double colon is the modern form, so always use it.",
        },
        {
          type: "code",
          language: "css",
          code: `a:hover { color: #3730a3; }          /* pseudo-class: a state */
li:first-child { font-weight: 700; } /* pseudo-class: a position */
input:checked + label { color: #4f46e5; }

p::first-line { font-weight: 700; }  /* pseudo-element: part of an element */
h2::before { content: "# "; }        /* pseudo-element: generated content */`,
          caption: "Pseudo-classes filter existing elements, and pseudo-elements create or select parts",
        },
        { type: "heading", text: "How they combine" },
        {
          type: "paragraph",
          text: "Pseudo-classes can be chained, so `a:not(.external):hover` is valid, and they can sit after any selector, even on their own: `:hover` alone means any hovered element. A selector can contain only **one pseudo-element**, and it must come **last**: `a:hover::after` is correct, but `a::after:hover` is not. For specificity, a pseudo-class counts like a class, and a pseudo-element counts like an element name, so `a:hover` is more specific than plain `a`, and `a::before` is slightly more specific than `a`.",
        },
        {
          type: "list",
          items: [
            "**Pseudo-classes:** `:hover`, `:focus`, `:active`, `:visited`, `:first-child`, `:nth-child()`, `:not()`, `:checked`, `:disabled`, `:required`, `:empty`.",
            "**Pseudo-elements:** `::before`, `::after`, `::first-line`, `::first-letter`, `::marker`, `::placeholder`, `::selection`, `::backdrop`.",
            "**Specificity:** a pseudo-class adds one class-level point, and a pseudo-element adds one element-level point.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.btn:hover::after {
  content: " →";
}`,
            note: "The pseudo-class filters which buttons, and the pseudo-element comes last, as it must.",
          },
          bad: {
            code: `.btn::hover {
  background-color: #3730a3;
}`,
            note: "`hover` is a state, so it needs a single colon. With two, the browser does not recognise it, and the whole rule is dropped.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "You cannot hover with a screenshot, so test states in your browser's DevTools. In the Styles panel, the `:hov` button forces `:hover`, `:active`, `:focus` and other states on the selected element, so you can see and edit them.",
        },
        {
          type: "callout",
          tone: "note",
          text: "`:is()`, `:where()` and `:has()` are modern pseudo-classes that take selectors as arguments. A later topic covers them in depth, and this one introduces the idea.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "One colon is a pseudo-class, which filters existing elements by state or position.",
            "Two colons is a pseudo-element, which selects a part of an element or creates generated content.",
            "A selector can have one pseudo-element, and it must be last. Pseudo-classes can be chained.",
            "Test states with the DevTools `:hov` panel.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "link-and-user-action-states",
      kind: "learn",
      title: "Link and user-action states",
      summary: ":link, :visited, :hover and :active, the LVHA order, and why :visited is restricted.",
      minutes: 10,
      concept: {
        description:
          "Some pseudo-classes describe what the person is doing: `:hover` when a pointer is over an element, `:active` while it is being pressed, `:link` for unvisited links and `:visited` for visited ones. They are the foundation of interactive styling.",
        why: "Every link and button needs feedback: a hover colour, a pressed state, a visited colour. The order you write those rules in matters, because they all have the same specificity, and the browser can only show one of them. Getting it wrong is a classic reason a hover effect \"stops working\" on visited links.",
        mentalModel:
          "A link moves through states like a traffic light. It starts as unvisited (link), may be visited, and then the mouse moves over it (hover) and presses it (active). The rules are checked in order, and the last matching one wins, so the most momentary states have to come last.",
      },
      body: [
        { type: "heading", text: "The four states" },
        {
          type: "list",
          items: [
            "`:link`: a link that has an `href` and has not been visited.",
            "`:visited`: a link the person has already followed.",
            "`:hover`: the pointer is over the element. It works on any element, not only links.",
            "`:active`: the element is being pressed, for example while the mouse button is down.",
          ],
        },
        {
          type: "paragraph",
          text: "`:any-link` matches both `:link` and `:visited`. An `<a>` with no `href` is neither, so `a:link` skips it, which is why placeholder anchors are not styled by it.",
        },
        { type: "heading", text: "Write them in LVHA order" },
        {
          type: "paragraph",
          text: "Because `a:link`, `a:visited`, `a:hover` and `a:active` all have the same specificity, a later rule beats an earlier one when more than one matches. A hovered, visited link matches both `:visited` and `:hover`. If `:visited` comes after `:hover`, the visited colour wins, and the hover effect never shows on visited links. Writing them in the order **L**ink, **V**isited, **H**over, **A**ctive, remembered as \"LoVe HAte\", puts the most momentary states last, so they win.",
        },
        {
          type: "code",
          language: "css",
          code: `a:link    { color: #4338ca; }
a:visited { color: #6d28d9; }
a:hover   { color: #3730a3; text-decoration-thickness: 3px; }
a:active  { color: #1e1b4b; }`,
          caption: "LVHA order, so each later state can override the earlier ones",
        },
        { type: "heading", text: "Why :visited is restricted" },
        {
          type: "paragraph",
          text: "Browsers limit what `:visited` can change, because otherwise a website could read your browsing history: it could style visited links, and then use JavaScript to see which ones changed. Only **colour properties** can be set with `:visited`, such as `color`, `background-color`, `border-color` and `outline-color`. Other properties are ignored, and `getComputedStyle()` always reports the unvisited colour. You cannot, for example, hide visited links or change their size.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `a:link    { color: #4338ca; }
a:visited { color: #6d28d9; }
a:hover   { color: #3730a3; }`,
            note: "Hover comes after visited, so a hovered visited link still shows the hover colour.",
          },
          bad: {
            code: `a:hover   { color: #3730a3; }
a:visited { color: #6d28d9; }`,
            note: "Visited comes later and wins, so hovering a visited link shows no change at all.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "Touch screens have no real hover. A tap can leave a `:hover` style stuck on. Wrap hover-only effects in `@media (hover: hover)` so they apply only where hovering is possible.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`:link` and `:visited` split links. `:hover` and `:active` describe the pointer. `:hover` works on any element.",
            "All four have equal specificity, so write them in LVHA order.",
            "`:visited` can only change colours, for privacy, and `getComputedStyle()` cannot reveal them.",
            "Use `@media (hover: hover)` to keep hover effects off touch screens.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "focus-states",
      kind: "learn",
      title: "Focus states: :focus, :focus-visible and :focus-within",
      summary: "Styling keyboard focus well, the three focus pseudo-classes, and why you should never remove the focus ring.",
      minutes: 10,
      concept: {
        description:
          "An element has **focus** when it is the one that will receive keystrokes: a link or button reached with Tab, or a text field you clicked in. `:focus` matches it, `:focus-visible` matches it only when a visible indicator is appropriate, and `:focus-within` matches an element that **contains** the focused element.",
        why: "Keyboard users, screen-reader users and many people with motor disabilities depend on seeing where focus is. Removing the focus ring is one of the most common accessibility failures on the web, and the three focus pseudo-classes let you restyle it without losing it.",
        mentalModel:
          "Focus is a spotlight that moves around the page as you press Tab. `:focus` is wherever the spotlight lands. `:focus-visible` is when the page should visibly show it, such as with a keyboard. `:focus-within` lights up a whole room when the spotlight is on something inside.",
      },
      body: [
        { type: "heading", text: "The three pseudo-classes" },
        {
          type: "paragraph",
          text: "`:focus` matches the focused element however it got focus, including a mouse click on a button, which is why a ring around a clicked button looked ugly and made designers remove it. **`:focus-visible`** solves that. The browser applies it only when it decides the person needs a visible indicator: always for keyboard navigation, and for text inputs even when clicked. **`:focus-within`** matches an element when it or any descendant has focus, which is perfect for highlighting a whole form group, or keeping a dropdown open while someone tabs through it.",
        },
        {
          type: "code",
          language: "css",
          code: `.btn:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 3px;
}

.field-group:focus-within {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgb(79 70 229 / 0.2);
}

.menu:focus-within .submenu {
  display: block;
}`,
          caption: "A clear ring for keyboards, a highlighted group and a menu that stays open during tabbing",
        },
        { type: "heading", text: "Making elements focusable" },
        {
          type: "paragraph",
          text: "Links, buttons, form fields and a few other elements are focusable by default. To make anything else focusable, add `tabindex=\"0\"`, which puts it in the tab order. `tabindex=\"-1\"` makes it focusable only from script, and is useful for moving focus to a heading after navigation. Avoid positive `tabindex` values, which override the natural order and confuse people. An element that is clickable but not focusable, such as a `div` with a click handler, cannot be used with a keyboard at all, so use a `button` instead.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.btn:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 3px;
}`,
            note: "A strong, custom focus ring that appears for keyboard users and stays out of the way for mouse clicks.",
          },
          bad: {
            code: `button:focus {
  outline: none;
}`,
            note: "Keyboard users now cannot tell which button is focused. If you remove the outline, you must replace it.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Test by putting your mouse away and pressing Tab through the whole page. Every control should show a clear focus indicator, in a sensible order, and nothing should be hidden behind a sticky header.",
        },
        {
          type: "callout",
          tone: "note",
          text: "WCAG 2.2 asks for a visible focus indicator (2.4.7) and that a focused element is not completely hidden by other content (2.4.11). A focus ring of at least 2px with 3:1 contrast is a good target.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`:focus` matches any focus. `:focus-visible` matches only when an indicator is needed, such as keyboard focus.",
            "`:focus-within` matches an element that contains the focused element, ideal for form groups and menus.",
            "Add `tabindex=\"0\"` to make a non-interactive element focusable, and avoid positive values.",
            "Never remove an outline without replacing it. Prefer `:focus-visible` for the custom ring.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "structural-pseudo-classes",
      kind: "learn",
      title: "Structural pseudo-classes",
      summary: ":first-child, :last-child, :only-child, :nth-child, :first-of-type, :empty and :root, and the child versus type difference.",
      minutes: 10,
      concept: {
        description:
          "Structural pseudo-classes select elements by **where they sit** among their siblings: first, last, only, the third, every other one. They need no extra class names, so a list's first item or a table's alternate rows can be styled straight from the HTML structure.",
        why: "Lists, menus, grids and tables are full of position-based styling: dividers between items but not after the last, a rounded first and last item, striped rows. Structural selectors let you write these once, and they keep working when items are added or removed.",
        mentalModel:
          "Imagine children lined up in a queue. `:first-child` is the one at the front, `:last-child` is at the back, and `:nth-child(3)` is the third in line. There is also a second queue for each kind of person: `:first-of-type` is the first **paragraph**, whoever else is standing in front of it.",
      },
      body: [
        { type: "heading", text: "By position among all children" },
        {
          type: "list",
          items: [
            "`:first-child` and `:last-child`: the first and last child of the parent.",
            "`:only-child`: an element that has no siblings.",
            "`:nth-child(n)`: the child in position n, counting from 1. The next lesson covers the formula syntax.",
            "`:nth-last-child(n)`: the same, counting from the end.",
          ],
        },
        { type: "heading", text: "By position among the same type" },
        {
          type: "paragraph",
          text: "The `-of-type` versions count only siblings with the **same element name**. `:first-of-type`, `:last-of-type`, `:only-of-type`, `:nth-of-type()` and `:nth-last-of-type()` ignore other kinds of siblings. This is the source of a common trap. In a card with a heading followed by paragraphs, `p:first-child` matches **nothing**, because the first child is the heading and not a paragraph. `p:first-of-type` matches the first paragraph.",
        },
        {
          type: "code",
          language: "css",
          code: `/* <div class="card"><h2>...</h2><p>one</p><p>two</p></div> */

.card p:first-child  { font-weight: 700; }   /* matches nothing */
.card p:first-of-type { font-weight: 700; }  /* matches "one" */`,
          caption: "The first paragraph is not the first child, but it is the first of its type",
        },
        { type: "heading", text: "Two special cases" },
        {
          type: "paragraph",
          text: "`:empty` matches an element that has **no children at all**, not even text or a space, so it is handy for hiding empty containers that would otherwise show padding. `:root` matches the top element of the document, which is `html`. It is how stylesheets declare custom properties for the whole page, because `:root` has the specificity of a class, so it wins over plain `html`.",
        },
        {
          type: "code",
          language: "css",
          code: `.list li:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}

.notice:empty {
  display: none;
}

:root {
  --brand: #4f46e5;
}`,
          caption: "Dividers between items only, hiding an empty box, and page-wide variables",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.list li:not(:last-child) {
  margin-bottom: 0.5rem;
}`,
            note: "Spacing only between items. Add or remove an item and the spacing still works.",
          },
          bad: {
            code: `.list li {
  margin-bottom: 0.5rem;
}`,
            note: "Spacing after every item, including the last, which leaves an extra gap at the bottom of the list.",
          },
        },
        {
          type: "paragraph",
          text: "Remember that these selectors count **elements**, not text. Whitespace between tags and plain text do not count as children, so `li:first-child` still works however the HTML is indented. They also react to the DOM as it changes: if a script adds or removes an item, the stripes, dividers and rounded ends update by themselves, which is a big part of why structural selectors are better than hand-written classes.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "If a structural selector matches nothing, check what the element's siblings really are. Use `-of-type` when other elements are mixed in with the ones you want to count.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`:first-child`, `:last-child`, `:only-child` and `:nth-child()` count among all siblings.",
            "`:first-of-type` and friends count only siblings of the same element name.",
            "`p:first-child` fails when something else comes first, and `p:first-of-type` still works.",
            "`:empty` matches elements with no children, and `:root` matches `html`.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "nth-formulas",
      kind: "learn",
      title: "The an+b formula",
      summary: "How :nth-child(2n + 1), (-n + 3) and (n + 4) work, with a table of the patterns you will actually use.",
      minutes: 10,
      concept: {
        description:
          "`:nth-child()` takes either a number, a keyword (`odd` or `even`) or a formula `an + b`. The browser plugs `n = 0, 1, 2, 3, ...` into the formula, and every result that is a valid position (1 or more) is selected. So `3n` picks the 3rd, 6th, 9th children, and `n + 4` picks everything from the 4th onwards.",
        why: "Once you can read `an + b`, you can pick out almost any pattern: stripes, every third card, the first three items, all but the first two, a range in the middle. The syntax looks cryptic, but it is a short list of patterns that you can learn once.",
        mentalModel:
          "`n` is a counter that starts at 0 and goes up. `a` is the step and `b` is the starting offset. `3n + 1` reads as \"start at 1, then every 3 more\": 1, 4, 7, 10. A negative `a` counts down, which is how `-n + 3` gives 3, 2, 1: the first three.",
      },
      body: [
        { type: "heading", text: "Reading the formula" },
        {
          type: "paragraph",
          text: "Positions are counted from **1**, not 0. The formula is evaluated for `n = 0, 1, 2, ...`, and any result below 1 is ignored. For `2n + 1`, that gives 1, 3, 5, 7, so it picks odd positions, which is the same as the keyword `odd`. `even` is the same as `2n`, giving 2, 4, 6. A plain number such as `:nth-child(5)` picks exactly that position.",
        },
        {
          type: "list",
          items: [
            "`:nth-child(odd)` or `(2n + 1)`: 1st, 3rd, 5th, and so on.",
            "`:nth-child(even)` or `(2n)`: 2nd, 4th, 6th, and so on.",
            "`:nth-child(3n)`: every third, which is 3, 6, 9.",
            "`:nth-child(3n + 1)`: 1, 4, 7, 10.",
            "`:nth-child(-n + 3)`: the **first three**, because it gives 3, 2, 1.",
            "`:nth-child(n + 4)`: from the 4th onwards, which is everything except the first three.",
            "`:nth-last-child(-n + 2)`: the **last two**.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `.row:nth-child(even) { background-color: #f1f5f9; }

.card:nth-child(-n + 3) { border-color: #4f46e5; }   /* first three */

.item:nth-child(n + 3):nth-child(-n + 6) {            /* items 3 to 6 */
  font-weight: 700;
}`,
          caption: "Stripes, the first three, and a range made by combining two formulas",
        },
        { type: "heading", text: "Choosing from a subset" },
        {
          type: "paragraph",
          text: "The `of S` syntax counts only siblings that match a selector. `:nth-child(2 of .visible)` picks the second child **among those with the class `visible`**, ignoring hidden ones. It is supported in all current browsers. And the `*` and `+` combinators give you a related trick: `* + *` selects every element that has a sibling before it, which is a short way to space out a stack of items without touching the first one.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card:nth-child(-n + 3) {
  border-color: #4f46e5;
}`,
            note: "The first three cards. If you add more cards later, the rule still means exactly the first three.",
          },
          bad: {
            code: `.card:nth-child(1),
.card:nth-child(2),
.card:nth-child(3) {
  border-color: #4f46e5;
}`,
            note: "Three separate selectors to say the same thing, and it is harder to read and easy to get wrong.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "`:nth-child(0)` matches nothing, since positions start at 1. And `:nth-child(3n+1)` is not the same as `(3n)`. One starts at 1 and the other at 3. When a result looks off by one, write out the first few values of the formula.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`an + b` is evaluated for n = 0, 1, 2, ... and positions below 1 are ignored. Positions start at 1.",
            "`odd` is `2n + 1`, `even` is `2n`, `-n + 3` is the first three, and `n + 4` is everything from the fourth.",
            "Combine two formulas, such as `n + 3` and `-n + 6`, to pick a range.",
            "`:nth-child(2 of .visible)` counts only matching siblings.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "nth-explorer",
      kind: "visualizer",
      title: "Structural selector explorer",
      summary: "Twelve numbered tiles are coloured by structural rules. See which tiles each selector picks, and add your own formula.",
      minutes: 9,
      concept: {
        description:
          "Twelve numbered tiles sit in a grid, and four rules use structural pseudo-classes to colour some of them: `:first-child`, `:last-child`, `:nth-child(3n)` and `:nth-child(even)`. Controls change each rule's colour, so you can see exactly which tiles each selector picks. A challenge asks you to write your own `an + b`.",
        why: "The best way to learn `an + b` is to see which numbers light up. A tile can match more than one rule, which also shows how overlapping selectors combine.",
        mentalModel:
          "Each rule is a coloured highlighter that marks the tiles whose number fits its formula. Tiles that fit two formulas get marked by both, and where they clash, the one written later wins.",
      },
      stage: {
        html: '<ol class="grid">\n  <li class="item">1</li>\n  <li class="item">2</li>\n  <li class="item">3</li>\n  <li class="item">4</li>\n  <li class="item">5</li>\n  <li class="item">6</li>\n  <li class="item">7</li>\n  <li class="item">8</li>\n  <li class="item">9</li>\n  <li class="item">10</li>\n  <li class="item">11</li>\n  <li class="item">12</li>\n</ol>',
        baseCss:
          "html, body { margin: 0; }\nbody { padding: 12px; background: #ffffff; font-family: system-ui, sans-serif; }\n.grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin: 0; padding: 0; list-style: none; }\n.item { display: flex; align-items: center; justify-content: center; height: 46px; border-radius: 8px; background: #e2e8f0; color: #0f172a; font-weight: 700; outline-width: 3px; outline-style: none; outline-offset: -3px; }",
        annotate: "none",
        target: ".grid",
        items: ".item",
      },
      starter: `.item:first-child {
  background-color: #4f46e5;
  color: #ffffff;
}

.item:last-child {
  background-color: #db2777;
  color: #ffffff;
}

.item:nth-child(3n) {
  background-color: #059669;
  color: #ffffff;
}

.item:nth-child(even) {
  outline-style: solid;
  outline-color: #f59e0b;
}
`,
      controls: [
        { id: "first", label: ":first-child colour", selector: ".item:first-child", property: "background-color", fallback: "#4f46e5", type: "options", options: ["#4f46e5", "#0284c7", "#7c3aed", "#0f172a"], help: "Matches tile 1 only." },
        { id: "last", label: ":last-child colour", selector: ".item:last-child", property: "background-color", fallback: "#db2777", type: "options", options: ["#db2777", "#dc2626", "#ea580c", "#0f172a"], help: "Matches tile 12 only." },
        { id: "third", label: ":nth-child(3n) colour", selector: ".item:nth-child(3n)", property: "background-color", fallback: "#059669", type: "options", options: ["#059669", "#16a34a", "#0d9488", "#65a30d"], help: "Matches 3, 6, 9 and 12. Tile 12 also matches :last-child, and the later rule wins." },
        { id: "even", label: ":nth-child(even) ring", selector: ".item:nth-child(even)", property: "outline-color", fallback: "#f59e0b", type: "options", options: ["#f59e0b", "#0ea5e9", "#a855f7", "#111827"], help: "Matches 2, 4, 6, 8, 10 and 12." },
      ],
      presets: [
        { id: "range", label: "Tiles 4 to 7", description: "two formulas combined", css: ".item:nth-child(n + 4):nth-child(-n + 7) { background-color: #f59e0b; }" },
        { id: "first-three", label: "First three", description: "-n + 3", css: ".item:nth-child(-n + 3) { background-color: #0ea5e9; color: #ffffff; }" },
        { id: "last-two", label: "Last two", description: "nth-last-child(-n + 2)", css: ".item:nth-last-child(-n + 2) { background-color: #7c3aed; color: #ffffff; }" },
      ],
      challenge: {
        title: "Pick every fourth tile, starting at 2",
        description:
          "Add a rule that gives a pale amber background, `#fde68a`, to tiles 2, 6 and 10: every fourth tile, starting at the second. Write it as `.item:nth-child(4n + 2) { background-color: #fde68a; }` after the others.",
        hints: [
          "Work out the formula: the tiles go up in steps of 4, and the first one is tile 2.",
          "`an + b` with `a = 4` and `b = 2` gives 2, 6, 10.",
          "`.item:nth-child(4n + 2) { background-color: #fde68a; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".item:nth-child(2)", property: "background-color", expected: ["#fde68a", "rgb(253, 230, 138)"], message: "Tile 2 is pale amber." },
          { type: "computedStyle", selector: ".item:nth-child(6)", property: "background-color", expected: ["#fde68a", "rgb(253, 230, 138)"], message: "Tile 6 is pale amber too." },
          { type: "computedStyle", selector: ".item:nth-child(10)", property: "background-color", expected: ["#fde68a", "rgb(253, 230, 138)"], message: "...and so is tile 10." },
        ],
        solution: `.item:first-child {
  background-color: #4f46e5;
  color: #ffffff;
}

.item:last-child {
  background-color: #db2777;
  color: #ffffff;
}

.item:nth-child(3n) {
  background-color: #059669;
  color: #ffffff;
}

.item:nth-child(even) {
  outline-style: solid;
  outline-color: #f59e0b;
}

.item:nth-child(4n + 2) {
  background-color: #fde68a;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-nth",
      kind: "predict",
      title: "Predict the nth-child",
      summary: "Work out which of nine items match a 3n + 1 pattern, a range, and a count from the end.",
      minutes: 7,
      mode: "css",
      intro: "Nine list items are styled by three structural selectors. Predict which items each rule picks, then run the code.",
      code: {
        html: `<ul class="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
</ul>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.list {
  display: grid;
  grid-template-columns: repeat(9, 2.5rem);
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list li {
  padding: 0.5rem 0;
  border-radius: 6px;
  background-color: #e2e8f0;
  text-align: center;
  font-weight: 700;
}

.list li:nth-child(3n + 1) {
  background-color: #4f46e5;
  color: #ffffff;
}

.list li:nth-child(n + 7) {
  outline-width: 3px;
  outline-style: solid;
  outline-color: #f59e0b;
}

.list li:nth-last-child(2) {
  background-color: #db2777;
  color: #ffffff;
}`,
      },
      questions: [
        {
          prompt: "Which items does `:nth-child(3n + 1)` colour indigo?",
          options: ["3, 6 and 9", "1, 4 and 7", "1, 3, 5, 7 and 9", "4, 7 and 10"],
          answerIndex: 1,
          hint: "Plug n = 0, 1, 2, 3 into 3n + 1.",
          explanation: "For n = 0, 1, 2 the formula gives 1, 4 and 7. The next value, 10, is beyond the end of this nine item list.",
          proves: [
            { type: "computedStyle", selector: ".list li:nth-child(4)", property: "background-color", expected: ["#4f46e5", "rgb(79, 70, 229)"], message: "Item 4 is indigo." },
            { type: "computedStyle", selector: ".list li:nth-child(7)", property: "background-color", expected: ["#4f46e5", "rgb(79, 70, 229)"], message: "...and so is item 7." },
          ],
        },
        {
          prompt: "Which items get the amber outline from `:nth-child(n + 7)`?",
          options: ["Only item 7", "Items 7, 8 and 9", "Items 1 to 7", "Items 7, 14 and 21"],
          answerIndex: 1,
          hint: "The formula has no `a` coefficient on its own, so it keeps counting up by 1 from 7.",
          explanation: "`n + 7` gives 7, 8, 9, ... so it selects the seventh item and every item after it.",
          proves: [{ type: "computedStyle", selector: ".list li:nth-child(8)", property: "outline-style", expected: ["solid"], message: "Item 8 has an outline." }],
        },
        {
          prompt: "Which item does `:nth-last-child(2)` colour pink?",
          options: ["Item 2", "Item 9", "Item 7", "Item 8"],
          answerIndex: 3,
          hint: "It counts from the end, and the last item is number 1.",
          explanation: "Counting back from the end, item 9 is first, so the second from last is item 8.",
          proves: [{ type: "computedStyle", selector: ".list li:nth-child(8)", property: "background-color", expected: ["#db2777", "rgb(219, 39, 119)"], message: "Item 8 is pink." }],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-zebra-list",
      kind: "lab",
      title: "Lab: a striped, divided list",
      summary: "Use :nth-child, :not(:last-child) and :first-child to stripe, divide and round a list without any extra classes.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<ul class="routes">
  <li>Riverside loop</li>
  <li>Lake path</li>
  <li>Ridge scramble</li>
  <li>Forest walk</li>
  <li>Harbour front</li>
  <li>Old railway</li>
</ul>`,
        css: `body {
  margin: 0;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.routes {
  max-width: 20rem;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
}

.routes li {
  padding: 0.75rem 1rem;
}
`,
      },
      challenge: {
        title: "Stripe, divide and round the list",
        description:
          "Style the list using only structural selectors, with no new classes. Give every even item the background `#f1f5f9`. Give every item except the last a bottom border: `border-bottom-width: 1px`, `border-bottom-style: solid` and `border-bottom-color: #cbd5e1`. Round the top corners of the first item with `border-radius: 0.75rem 0.75rem 0 0`, and the bottom corners of the last item with `border-radius: 0 0 0.75rem 0.75rem`.",
        hints: [
          "Four rules: `li:nth-child(even)`, `li:not(:last-child)`, `li:first-child` and `li:last-child`.",
          "`:not(:last-child)` selects every item that is not the last, so no extra border appears at the bottom.",
          "`.routes li:nth-child(even) { background-color: #f1f5f9; }` and `.routes li:not(:last-child) { border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cbd5e1; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".routes li:nth-child(even)", property: "background-color", expected: ["#f1f5f9", "rgb(241, 245, 249)"], match: "all", message: "Every even item has a pale background." },
          { type: "computedStyle", selector: ".routes li:not(:last-child)", property: "border-bottom-style", expected: ["solid"], match: "all", message: "Every item except the last has a solid bottom border" },
          { type: "computedStyle", selector: ".routes li:not(:last-child)", property: "border-bottom-width", expected: ["1px"], match: "all", message: "...`1px` wide" },
          { type: "computedStyle", selector: ".routes li:not(:last-child)", property: "border-bottom-color", expected: ["#cbd5e1", "rgb(203, 213, 225)"], match: "all", message: "...in `#cbd5e1`." },
          { type: "computedStyle", selector: ".routes li:first-child", property: "border-radius", expected: ["0.75rem 0.75rem 0 0", "12px 12px 0px 0px"], message: "The first item has rounded top corners." },
          { type: "computedStyle", selector: ".routes li:last-child", property: "border-radius", expected: ["0 0 0.75rem 0.75rem", "0px 0px 12px 12px"], message: "The last item has rounded bottom corners." },
        ],
        solution: {
          html: `<ul class="routes">
  <li>Riverside loop</li>
  <li>Lake path</li>
  <li>Ridge scramble</li>
  <li>Forest walk</li>
  <li>Harbour front</li>
  <li>Old railway</li>
</ul>`,
          css: `body {
  margin: 0;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.routes {
  max-width: 20rem;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
}

.routes li {
  padding: 0.75rem 1rem;
}

.routes li:nth-child(even) {
  background-color: #f1f5f9;
}

.routes li:not(:last-child) {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #cbd5e1;
}

.routes li:first-child {
  border-radius: 0.75rem 0.75rem 0 0;
}

.routes li:last-child {
  border-radius: 0 0 0.75rem 0.75rem;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-structural-selectors",
      kind: "debug",
      title: "Debug: the selectors that match the wrong thing",
      summary: "Five structural selectors match nothing, or the wrong items: a first-child trap, a zero, an off-by-one formula, a space and a count from the wrong end.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<div class="card">
  <h2 class="card-title">Weekend pass</h2>
  <p>Valid on every marked route.</p>
  <p>Bring a copy to the gate.</p>
  <p>Not transferable.</p>
</div>
<ul class="menu">
  <li>Routes</li>
  <li>Gear</li>
  <li>Stories</li>
  <li>Maps</li>
  <li>About</li>
</ul>`,
        css: `body {
  margin: 0;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

.card {
  margin-bottom: 1rem;
}

.card p:first-child {
  font-weight: 700;
}

.menu {
  max-width: 16rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu li {
  padding: 0.5rem 0.75rem;
}

.menu li:nth-child(0) {
  background-color: #fde68a;
}

.menu li:nth-child(3n + 1) {
  background-color: #bbf7d0;
}

.menu li :last-child {
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #4f46e5;
}

.menu li:nth-last-child(2) {
  font-weight: 700;
}
`,
      },
      challenge: {
        title: "Fix the five selectors",
        description:
          "Each selector has a mistake. The first paragraph in the card should be bold. The first menu item should be pale amber. Every third menu item (item 3 here) should be pale green. The last menu item should have an indigo bottom border. And the last two menu items should be bold.",
        hints: [
          "A paragraph is not the first child when a heading comes before it. `nth-child` positions start at 1, not 0. A space before a pseudo-class means \"a descendant that is...\". And `-n + 2` counts the last two.",
          "`:first-of-type`, `:nth-child(1)`, `:nth-child(3n)`, `li:last-child` with no space, and `:nth-last-child(-n + 2)`.",
          "`.card p:first-of-type` `.menu li:nth-child(1)` `.menu li:nth-child(3n)` `.menu li:last-child` `.menu li:nth-last-child(-n + 2)`",
        ],
        checks: [
          { type: "computedStyle", selector: ".card p:first-of-type", property: "font-weight", expected: ["700", "bold"], message: "The first paragraph is bold." },
          { type: "computedStyle", selector: ".menu li:nth-child(1)", property: "background-color", expected: ["#fde68a", "rgb(253, 230, 138)"], message: "The first menu item is pale amber." },
          { type: "computedStyle", selector: ".menu li:nth-child(3)", property: "background-color", expected: ["#bbf7d0", "rgb(187, 247, 208)"], message: "The third menu item is pale green." },
          { type: "computedStyle", selector: ".menu li:last-child", property: "border-bottom-style", expected: ["solid"], message: "The last menu item has a bottom border." },
          { type: "computedStyle", selector: ".menu li:nth-last-child(-n + 2)", property: "font-weight", expected: ["700", "bold"], match: "all", message: "The last two menu items are bold." },
        ],
        solution: {
          html: `<div class="card">
  <h2 class="card-title">Weekend pass</h2>
  <p>Valid on every marked route.</p>
  <p>Bring a copy to the gate.</p>
  <p>Not transferable.</p>
</div>
<ul class="menu">
  <li>Routes</li>
  <li>Gear</li>
  <li>Stories</li>
  <li>Maps</li>
  <li>About</li>
</ul>`,
          css: `body {
  margin: 0;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

.card {
  margin-bottom: 1rem;
}

.card p:first-of-type {
  font-weight: 700;
}

.menu {
  max-width: 16rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu li {
  padding: 0.5rem 0.75rem;
}

.menu li:nth-child(1) {
  background-color: #fde68a;
}

.menu li:nth-child(3n) {
  background-color: #bbf7d0;
}

.menu li:last-child {
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #4f46e5;
}

.menu li:nth-last-child(-n + 2) {
  font-weight: 700;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "form-state-pseudo-classes",
      kind: "learn",
      title: "Form-state pseudo-classes",
      summary: ":checked, :disabled, :required, :read-only, :placeholder-shown, :valid and :user-invalid, and the custom checkbox pattern.",
      minutes: 11,
      concept: {
        description:
          "Form controls have states that the browser tracks for you: ticked or not, enabled or disabled, required or optional, valid or invalid. Pseudo-classes such as `:checked`, `:disabled`, `:required` and `:user-invalid` let you style each state without writing any JavaScript.",
        why: "Good forms tell people what is expected and what went wrong, and a lot of that feedback is visual: a required field looks different, a disabled button looks inactive, an invalid field shows an error. These pseudo-classes make that styling a few lines of CSS, and they update automatically as the person types.",
        mentalModel:
          "Each form control carries a small set of switches, such as checked, disabled, required and valid, which the browser flips as the person interacts. A form pseudo-class is a selector that reads one of those switches.",
      },
      body: [
        { type: "heading", text: "The common states" },
        {
          type: "list",
          items: [
            "`:checked`: a ticked checkbox or radio button, or a selected `option`.",
            "`:disabled` and `:enabled`: whether the control accepts input. A disabled control is skipped by Tab and not submitted.",
            "`:required` and `:optional`: whether the control has the `required` attribute.",
            "`:read-only` and `:read-write`: whether the person can edit the value.",
            "`:placeholder-shown`: the field is empty and is showing its placeholder.",
            "`:indeterminate`: a checkbox in the mixed state, such as a \"select all\" with only some items selected.",
            "`:default`: the checked option or the default submit button of a form.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `.field:required {
  border-color: #4f46e5;
}

.btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

input:checked + label {
  font-weight: 700;
}`,
          caption: "A required field, a disabled button and a label that reacts to its checkbox",
        },
        { type: "heading", text: "Validation: :valid, :invalid and :user-invalid" },
        {
          type: "paragraph",
          text: "`:valid` and `:invalid` follow the browser's built-in validation, such as `required`, `type=\"email\"` and `pattern`. The trouble is that `:invalid` is true **immediately**, so an empty required field is already red before the person has typed a letter. The newer `:user-invalid` and `:user-valid` fix this: they apply only after the person has interacted with the field, which gives errors at the right moment. They work in all current browsers, and `:invalid` remains a reasonable fallback.",
        },
        {
          type: "code",
          language: "css",
          code: `.field:user-invalid {
  border-color: #dc2626;
}

.field:user-invalid + .hint {
  display: block;
  color: #b91c1c;
}`,
          caption: "Errors appear only after the person has touched the field",
        },
        { type: "heading", text: "The custom checkbox pattern" },
        {
          type: "paragraph",
          text: "A checkbox's state is readable from CSS, so you can hide the real input visually and draw your own box with the label's `::before`, which changes appearance with `input:checked + label::before`. Keep the real input in the page, visually hidden but still focusable, so that keyboards and screen readers work. For simple cases, the `accent-color` property recolours the built-in checkbox without any of this.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.field:user-invalid {
  border-color: #dc2626;
}`,
            note: "The error colour appears only after the person has typed in the field and left it.",
          },
          bad: {
            code: `.field:invalid {
  border-color: #dc2626;
}`,
            note: "Every empty required field is red the moment the page loads, before anyone has had a chance to fill it in.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "Do not use colour alone to show an error. Add a message or an icon, and connect it to the field with `aria-describedby`, so screen reader users hear it too.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`:checked`, `:disabled`, `:enabled`, `:required`, `:optional` and `:read-only` read states that the browser already tracks.",
            "`:invalid` is true from the start. Prefer `:user-invalid`, which waits for interaction.",
            "`input:checked + label` styles the label of a ticked checkbox, and `accent-color` recolours the built-in one.",
            "Always back colour with text or an icon, and keep real inputs accessible.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "form-state-explorer",
      kind: "visualizer",
      title: "Form state explorer",
      summary: "A small form with a ticked checkbox, a required field, a read-only field and two buttons, each styled by its state.",
      minutes: 9,
      concept: {
        description:
          "A little form shows five states at once: a checked checkbox, a required field, a read-only field, an enabled button and a disabled button. Each is styled by a form pseudo-class, and controls change the colours and opacity those rules apply.",
        why: "States are easiest to understand when several are visible together. You can see that the same `.btn` rule gives two different results because one button is disabled, and that the checkbox label changes only for the box that is ticked.",
        mentalModel:
          "Every control is wearing small badges, such as checked, required and disabled, that the browser pinned on it. Each rule in the starter looks for one badge, and styles only the controls that wear it.",
      },
      stage: {
        html: '<form class="form" onsubmit="return false">\n  <div class="row"><input id="a" type="checkbox" checked><label for="a">Weekly emails (checked)</label></div>\n  <div class="row"><input id="b" type="checkbox"><label for="b">Text alerts (unchecked)</label></div>\n  <div class="row"><input class="field" type="email" required placeholder="Required email" aria-label="Required email"></div>\n  <div class="row"><input class="field" type="text" value="Read-only value" readonly aria-label="Read-only value"></div>\n  <div class="row">\n    <button type="button" class="btn">Save</button>\n    <button type="button" class="btn" disabled>Unavailable</button>\n  </div>\n</form>',
        baseCss:
          "html, body { margin: 0; }\nbody { padding: 14px; background: #ffffff; font-family: system-ui, sans-serif; }\n.row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }\nlabel { font-size: 14px; color: #334155; }\n.field { box-sizing: border-box; width: 100%; padding: 8px 10px; border: 2px solid #cbd5e1; border-radius: 8px; font: inherit; font-size: 14px; background-color: #ffffff; }\n.btn { padding: 8px 14px; border: 0; border-radius: 8px; background-color: #4f46e5; color: #ffffff; font-weight: 700; font-size: 14px; }",
        annotate: "none",
        target: ".form",
        items: ".btn",
      },
      starter: `input:checked + label {
  font-weight: 700;
  color: #4f46e5;
}

.field:required {
  border-color: #4f46e5;
}

.field:read-only {
  background-color: #f1f5f9;
}

.btn:enabled {
  background-color: #4f46e5;
}

.btn:disabled {
  opacity: 0.5;
}
`,
      controls: [
        { id: "checked", label: ":checked label colour", selector: "input:checked + label", property: "color", fallback: "#4f46e5", type: "options", options: ["#4f46e5", "#059669", "#db2777", "#0f172a"], help: "Only the ticked checkbox's label changes." },
        { id: "required", label: ":required border", selector: ".field:required", property: "border-color", fallback: "#4f46e5", type: "options", options: ["#4f46e5", "#dc2626", "#059669", "#f59e0b"], help: "Only the required field changes." },
        { id: "enabled", label: ":enabled button", selector: ".btn:enabled", property: "background-color", fallback: "#4f46e5", type: "options", options: ["#4f46e5", "#059669", "#0284c7", "#db2777"], help: "The disabled button does not match." },
        { id: "disabled", label: ":disabled opacity", selector: ".btn:disabled", property: "opacity", fallback: "1", type: "range", min: 0.1, max: 1, step: 0.1, help: "Only the disabled button changes." },
      ],
      presets: [
        { id: "error", label: "Required in red", description: "a stronger required look", css: ".field:required { border-color: #dc2626; }" },
        { id: "grey", label: "Grey disabled", description: "grey fill, not-allowed cursor", css: ".btn:disabled { background-color: #94a3b8; cursor: not-allowed; opacity: 1; }" },
      ],
      challenge: {
        title: "Make the disabled button obviously inactive",
        description:
          "The disabled button is just a faded version of the live one. Give `.btn:disabled` a grey background, `#94a3b8`, and the `not-allowed` cursor, so it looks, and feels, unavailable.",
        hints: [
          "Both declarations go in the `.btn:disabled` rule.",
          "The cursor property takes a keyword that shows a blocked symbol.",
          "`.btn:disabled { background-color: #94a3b8; cursor: not-allowed; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".btn:disabled", property: "background-color", expected: ["#94a3b8", "rgb(148, 163, 184)"], message: "The disabled button is grey: `#94a3b8`." },
          { type: "computedStyle", selector: ".btn:disabled", property: "cursor", expected: ["not-allowed"], message: "...with the `not-allowed` cursor." },
        ],
        solution: `input:checked + label {
  font-weight: 700;
  color: #4f46e5;
}

.field:required {
  border-color: #4f46e5;
}

.field:read-only {
  background-color: #f1f5f9;
}

.btn:enabled {
  background-color: #4f46e5;
}

.btn:disabled {
  opacity: 0.5;
  background-color: #94a3b8;
  cursor: not-allowed;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-style-form-states",
      kind: "lab",
      title: "Lab: a form that shows its states",
      summary: "Use :required, :not(:required), :checked and :disabled to make a sign-up form communicate what is expected.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<form class="signup">
  <div class="row">
    <label for="name">Name</label>
    <input id="name" class="field" type="text" required />
  </div>
  <div class="row">
    <label for="email">Email</label>
    <input id="email" class="field" type="email" required />
  </div>
  <div class="row">
    <label for="nick">Nickname (optional)</label>
    <input id="nick" class="field" type="text" />
  </div>
  <div class="row check">
    <input id="terms" type="checkbox" checked />
    <label for="terms">I agree to the terms</label>
  </div>
  <button class="submit" type="submit" disabled>Create account</button>
</form>`,
        css: `body {
  margin: 0;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.signup {
  display: grid;
  gap: 0.75rem;
  max-width: 22rem;
}

.row {
  display: grid;
  gap: 0.25rem;
}

.row.check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.field {
  padding: 0.6rem 0.75rem;
  border: 2px solid #cbd5e1;
  border-radius: 0.5rem;
  font: inherit;
}

.submit {
  padding: 0.7rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 700;
}
`,
      },
      challenge: {
        title: "Style the form by its states",
        description:
          "Use only state selectors. Required fields get an indigo border: `.field:required { border-color: #4f46e5; }`. The fields that are not required get a pale background, `#f8fafc`, using `.field:not(:required)`. The label of the ticked checkbox is bold and indigo, `#4f46e5`, using `input:checked + label`. The disabled submit button is grey, `#94a3b8`, with the `not-allowed` cursor, using `.submit:disabled`.",
        hints: [
          "Four selectors: `.field:required`, `.field:not(:required)`, `input:checked + label` and `.submit:disabled`.",
          "`input:checked + label` selects the label that comes right after a ticked checkbox.",
          "`.submit:disabled { background-color: #94a3b8; cursor: not-allowed; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".field:required", property: "border-color", expected: ["#4f46e5", "rgb(79, 70, 229)"], match: "all", message: "Required fields have an indigo border." },
          { type: "computedStyle", selector: ".field:not(:required)", property: "background-color", expected: ["#f8fafc", "rgb(248, 250, 252)"], message: "The optional field has a pale background." },
          { type: "computedStyle", selector: "input:checked + label", property: "font-weight", expected: ["700", "bold"], message: "The ticked checkbox's label is bold" },
          { type: "computedStyle", selector: "input:checked + label", property: "color", expected: ["#4f46e5", "rgb(79, 70, 229)"], message: "...and indigo." },
          { type: "computedStyle", selector: ".submit:disabled", property: "background-color", expected: ["#94a3b8", "rgb(148, 163, 184)"], message: "The disabled button is grey" },
          { type: "computedStyle", selector: ".submit:disabled", property: "cursor", expected: ["not-allowed"], message: "...with the `not-allowed` cursor." },
        ],
        solution: {
          html: `<form class="signup">
  <div class="row">
    <label for="name">Name</label>
    <input id="name" class="field" type="text" required />
  </div>
  <div class="row">
    <label for="email">Email</label>
    <input id="email" class="field" type="email" required />
  </div>
  <div class="row">
    <label for="nick">Nickname (optional)</label>
    <input id="nick" class="field" type="text" />
  </div>
  <div class="row check">
    <input id="terms" type="checkbox" checked />
    <label for="terms">I agree to the terms</label>
  </div>
  <button class="submit" type="submit" disabled>Create account</button>
</form>`,
          css: `body {
  margin: 0;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.signup {
  display: grid;
  gap: 0.75rem;
  max-width: 22rem;
}

.row {
  display: grid;
  gap: 0.25rem;
}

.row.check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.field {
  padding: 0.6rem 0.75rem;
  border: 2px solid #cbd5e1;
  border-radius: 0.5rem;
  font: inherit;
}

.field:required {
  border-color: #4f46e5;
}

.field:not(:required) {
  background-color: #f8fafc;
}

input:checked + label {
  font-weight: 700;
  color: #4f46e5;
}

.submit {
  padding: 0.7rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 700;
}

.submit:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "negation-and-logical-pseudo-classes",
      kind: "learn",
      title: ":not(), :is(), :where() and :has()",
      summary: "The pseudo-classes that take selectors as arguments, how they affect specificity, and a first look at the parent selector.",
      minutes: 10,
      concept: {
        description:
          "Four pseudo-classes take **selectors** as arguments. `:not(x)` matches what does not match x. `:is(x, y)` matches anything that matches either. `:where(x, y)` does the same with **zero** specificity. And `:has(x)` matches an element that **contains** something matching x, which makes it the long-awaited \"parent selector\".",
        why: "They remove repetition and open up selections that were impossible before. `:is()` collapses long selector lists, `:where()` lets a stylesheet set defaults that any rule can override, and `:has()` lets a parent change based on its children, such as a card that changes when it contains an image.",
        mentalModel:
          "These are logic gates for selectors. `:not` flips a result, `:is` is an \"or\", `:where` is an \"or\" whose weight is nothing, and `:has` looks inside. They let you describe elements by what they are, what they are not and what they contain.",
      },
      body: [
        { type: "heading", text: ":not()" },
        {
          type: "paragraph",
          text: "`:not()` excludes elements. `li:not(:last-child)` picks every list item except the last, and `a:not([class])` picks links without a class. Modern browsers accept a whole list: `:not(.a, .b)` excludes anything with either class. Its specificity is the specificity of the **most specific argument** inside it, so `:not(#main)` carries the weight of an ID.",
        },
        { type: "heading", text: ":is() and :where()" },
        {
          type: "paragraph",
          text: "`:is()` takes a list and matches an element that matches any item. `:is(h1, h2, h3):hover` replaces three separate selectors, and `:is(.card, .panel) > p` replaces two. The selector list is forgiving, meaning one invalid item does not invalidate the others. Its specificity is that of the **highest** item. `:where()` is identical, but contributes **zero** specificity, which makes it ideal for defaults, such as resets and base styles, because any ordinary rule can override them without a fight.",
        },
        {
          type: "code",
          language: "css",
          code: `:is(h1, h2, h3) {
  line-height: 1.2;
}

:where(ul, ol) {
  padding-left: 1.25rem;     /* easy to override: zero specificity */
}

.menu li:not(:last-child) {
  margin-bottom: 0.5rem;
}`,
          caption: "A shorter selector list, an easily overridden default and an exclusion",
        },
        { type: "heading", text: ":has()" },
        {
          type: "paragraph",
          text: "`:has()` matches an element **based on what it contains**. `.card:has(img)` is a card that has an image in it, `form:has(:invalid)` is a form containing an invalid field, and `label:has(input:checked)` is a label wrapped around a ticked box. It also takes relative selectors, such as `h2:has(+ p)`, an `h2` followed directly by a paragraph. `:has()` is supported in all current browsers. It can be costly if written on a very broad selector, so keep it specific.",
        },
        {
          type: "code",
          language: "css",
          code: `.card:has(img) {
  display: grid;
  grid-template-columns: 8rem 1fr;
}

form:has(:user-invalid) .submit {
  opacity: 0.5;
}`,
          caption: "A card that changes layout when it has an image, and a form whose button reacts to errors",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `:is(.card, .panel) :is(h2, h3) {
  margin-top: 0;
}`,
            note: "One rule for four combinations, which is short and clear.",
          },
          bad: {
            code: `.card h2,
.card h3,
.panel h2,
.panel h3 {
  margin-top: 0;
}`,
            note: "The same selection spelled out in full. Adding a new class or heading level means editing it in several places.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "A later topic, Modern selectors, covers `:has()`, `:is()`, `:where()` and nesting in depth. For now, the main points are how they affect specificity and when to reach for each.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`:not(x)` excludes. Its specificity is that of its most specific argument.",
            "`:is(x, y)` is an \"or\" list with the specificity of its highest item. `:where(x, y)` is the same with zero specificity.",
            "`:has(x)` selects an element that contains a match, so a parent can respond to its children.",
            "Use `:where()` for easily overridden defaults, and keep `:has()` selectors specific.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "pseudo-elements-before-after",
      kind: "learn",
      title: "::before and ::after",
      summary: "Generated content: how content works, what these boxes are, and where they help and where they hurt.",
      minutes: 11,
      concept: {
        description:
          "`::before` and `::after` create a box **inside** an element, as its first and last child, and fill it with whatever you put in the `content` property. The box is not in the HTML, so it cannot be selected, copied or edited by the reader, but it can be styled like any element.",
        why: "They add decoration without adding markup: icons, arrows, quote marks, underline accents, badges, tooltips, overlays. They also power several classic tricks, such as clearing floats and stretching a link across a whole card, so understanding them gives you many tools at once.",
        mentalModel:
          "Imagine the browser quietly inserting two invisible `span` elements into every element you point at: one before the content, one after. Nothing exists until you give each a `content` value, and then it becomes a real box that you can colour, size and position.",
      },
      body: [
        { type: "heading", text: "The content property decides everything" },
        {
          type: "paragraph",
          text: "A `::before` or `::after` box appears **only if it has a `content` value**. Without `content`, nothing is generated, however many other properties you set. The value can be a string, such as `\"★ \"`, an empty string, `\"\"`, used when the box is purely visual, the result of `attr(data-label)` to pull in an attribute, a counter, an image with `url()`, or a quote keyword like `open-quote`.",
        },
        {
          type: "code",
          language: "css",
          code: `.badge::before {
  content: "";                 /* a purely visual box */
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.4rem;
  border-radius: 50%;
  background-color: currentColor;
}

.external::after {
  content: " ↗";
}

[data-tip]::after {
  content: attr(data-tip);
}`,
          caption: "A dot made from an empty box, an arrow after a link, and text from an attribute",
        },
        { type: "heading", text: "How the boxes behave" },
        {
          type: "list",
          items: [
            "They are **inline** by default. Set `display: block` or `inline-block` for width and height to work.",
            "They sit **inside** the element, so they do not work on elements without content, such as `img`, `input` and `br`.",
            "In a flex or grid container, they become **flex or grid items**, so `gap` spaces them and `order` can move them.",
            "For absolute placement, give the host `position: relative`, and then `position: absolute` on the pseudo-element.",
            "They inherit text properties from their host, and `currentColor` picks up the host's colour.",
          ],
        },
        { type: "heading", text: "Accessibility and good practice" },
        {
          type: "paragraph",
          text: "Screen readers may read generated text aloud, and it cannot be selected, searched or translated. So decoration is fine, but **meaning belongs in the HTML**. Do not put text such as \"Required\" or \"Warning:\" only in `content`. For a decorative symbol, add an alternative-text slash, as in `content: \"★\" / \"\";`, which modern browsers use to hide it from assistive technology, and keep the visible text in the HTML.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card::before {
  content: "";
  display: block;
  height: 4px;
  background-color: #4f46e5;
}`,
            note: "A purely decorative accent bar. Nothing a reader needs is hidden in the CSS.",
          },
          bad: {
            code: `.field::after {
  content: " (required)";
}`,
            note: "Important information exists only in CSS, so it is not reliably announced, cannot be translated and may be missed.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "If a pseudo-element does not show, check three things: it has a `content` value, it is `display: block` or `inline-block` when you set a size, and its host is not an element that cannot contain children.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`::before` and `::after` are first and last child boxes, and they exist only when `content` is set.",
            "`content: \"\"` makes a purely visual box. Strings, `attr()`, counters and `url()` also work.",
            "They are inline by default, are flex or grid items in a flex or grid host, and fail on `img` and `input`.",
            "Keep meaning in the HTML. Generated content is for decoration.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "generated-content-explorer",
      kind: "visualizer",
      title: "Generated content explorer",
      summary: "A tag gets an icon from ::before and a suffix from ::after. Change both, then fix the spacing the better way.",
      minutes: 9,
      concept: {
        description:
          "A pill-shaped tag has a `::before` icon and an `::after` suffix, both driven by custom properties so you can change their text from the controls. The spacing is done with margins on the pseudo-elements, and the challenge asks you to replace it with `gap` on the host.",
        why: "Changing the icon and suffix shows that the content really comes from CSS. And the spacing problem shows something less obvious: an `::after` with empty content still takes up space if it has a margin, and in a flex host, the pseudo-elements are flex items, so `gap` is cleaner.",
        mentalModel:
          "The tag is a small flexible container, and the two pseudo-elements are two extra items placed at its ends. Because they are items, the container's `gap` spaces them, and an empty one with a margin still leaves a gap.",
      },
      stage: {
        html: '<div class="board">\n  <span class="tag">Trail pass</span>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { display: flex; align-items: center; justify-content: center; background: #ffffff; font-family: system-ui, sans-serif; }\n.board { padding: 24px; }",
        annotate: "none",
        target: ".tag",
        items: ".tag",
      },
      starter: `.tag {
  --icon: "★";
  --suffix: "";
  --gap: 8px;
  --bg: #4f46e5;
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  background-color: var(--bg);
  color: #ffffff;
  font-weight: 700;
}

.tag::before {
  content: var(--icon);
  margin-right: var(--gap);
}

.tag::after {
  content: var(--suffix);
  margin-left: var(--gap);
}
`,
      controls: [
        { id: "icon", label: "::before content", selector: ".tag", property: "--icon", fallback: "\"★\"", type: "options", options: ["\"★\"", "\"✓\"", "\"→\"", "\"⚑\"", "\"\""], help: "The text drawn by `::before`. An empty string draws nothing, but the margin remains." },
        { id: "suffix", label: "::after content", selector: ".tag", property: "--suffix", fallback: "\"\"", type: "options", options: ["\"\"", "\"NEW\"", "\"→\"", "\"(3)\""], help: "The text drawn by `::after`." },
        { id: "gap", label: "pseudo margin", selector: ".tag", property: "--gap", fallback: "8px", type: "range", min: 0, max: 24, step: 2, unit: "px", help: "The margin on each pseudo-element." },
        { id: "bg", label: "tag colour", selector: ".tag", property: "--bg", fallback: "#4f46e5", type: "options", options: ["#4f46e5", "#059669", "#db2777", "#0f172a"], help: "`currentColor` and text inherit from the host." },
      ],
      presets: [
        { id: "check", label: "Checkmark", description: "a green confirmed tag", css: ".tag { --icon: \"✓\"; --bg: #059669; }" },
        { id: "new", label: "New badge", description: "no icon, a suffix", css: ".tag { --icon: \"\"; --suffix: \"NEW\"; }" },
        { id: "arrow", label: "Arrow link", description: "an arrow at the end", css: ".tag { --icon: \"\"; --suffix: \"→\"; }" },
      ],
      challenge: {
        title: "Space the pseudo-elements with gap",
        description:
          "Notice the odd extra space when `::after` is empty, because its margin is still there. Fix it the clean way: give `.tag` `gap: 0.5rem`, and remove the margins from `.tag::before` and `.tag::after`. The pseudo-elements are flex items, so the container's `gap` spaces them.",
        hints: [
          "Add `gap: 0.5rem;` to the `.tag` rule, and delete the two `margin` lines.",
          "In a flex container, `gap` goes between items. An empty `::after` still counts as an item, but with `content: \"\"`, it has no width.",
          "`.tag { gap: 0.5rem; }` and no `margin-right` or `margin-left` on the pseudo-elements.",
        ],
        checks: [
          { type: "computedStyle", selector: ".tag", property: "gap", expected: ["0.5rem", "8px"], message: "The tag spaces its items with `gap: 0.5rem`." },
          { type: "computedStyle", selector: ".tag", property: "display", expected: ["inline-flex"], message: "The tag is still a flex container." },
        ],
        solution: `.tag {
  --icon: "★";
  --suffix: "";
  --bg: #4f46e5;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 16px;
  border-radius: 999px;
  background-color: var(--bg);
  color: #ffffff;
  font-weight: 700;
}

.tag::before {
  content: var(--icon);
}

.tag::after {
  content: var(--suffix);
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-pseudo-elements",
      kind: "predict",
      title: "Predict the generated content",
      summary: "Work out when ::before and ::after appear, what they look like, and what a reader can do with them.",
      minutes: 6,
      mode: "css",
      intro: "Three paragraphs use `::before` and `::after` in different ways. Predict what each shows, then run the code.",
      code: {
        html: `<p class="a">Alpha</p>
<p class="b">Beta</p>
<p class="c">Gamma</p>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

p {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}

.a::before {
  color: #db2777;
  font-weight: 700;
}

.b::before {
  content: "";
  display: block;
  height: 6px;
  margin-bottom: 4px;
  background-color: #4f46e5;
}

.c::after {
  content: " ←";
  color: #059669;
}`,
      },
      questions: [
        {
          prompt: "Paragraph A has a `::before` rule with colour and weight, but no `content`. What does it show?",
          options: ["A pink bold bullet before the text", "An empty pink line", "Just \"Alpha\": with no `content`, no box is generated", "An error in the page"],
          answerIndex: 2,
          hint: "What must a pseudo-element have in order to exist?",
          explanation: "A `::before` or `::after` box is only created when `content` is set. Colour and weight apply to a box that does not exist, so nothing appears.",
        },
        {
          prompt: "Paragraph B has `content: \"\"`, `display: block` and a height. What does it show?",
          options: ["Nothing: an empty string draws nothing", "A thin indigo bar above the text", "A bar below the text", "A bar beside the text"],
          answerIndex: 1,
          hint: "An empty string still creates a box. What does `display: block` and a height make of it?",
          explanation: "`content: \"\"` generates a real, empty box. Because it is `display: block` with a height and a background, it is drawn as a 6px bar. As `::before`, it comes before the text, so it sits above it.",
        },
        {
          prompt: "Paragraph C ends with a green arrow from `::after`. What can a reader do with it?",
          options: ["Select and copy it with the text", "Search for it with Find", "It is shown, but cannot be selected or copied like normal text", "Nothing, since it is hidden"],
          answerIndex: 2,
          hint: "Generated content is not part of the document's text.",
          explanation: "The arrow is displayed, but because it is not in the HTML, it is not part of the text the reader can select, copy or search for. That is why important information should never exist only in generated content.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-badge-with-pseudo-elements",
      kind: "lab",
      title: "Lab: status badges with a generated dot",
      summary: "Prepare badges to hold a dot drawn by ::before, and colour each variant so currentColor does the work.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<ul class="statuses">
  <li><span class="badge badge-open">Open</span></li>
  <li><span class="badge badge-closed">Closed</span></li>
  <li><span class="badge badge-new">New</span></li>
</ul>`,
        css: `body {
  margin: 0;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.statuses {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.875rem;
  font-weight: 700;
}

.badge-new {
  background-color: #e0e7ff;
  color: #3730a3;
}
`,
      },
      challenge: {
        title: "Set the badges up for a dot",
        description:
          "Generated content cannot be checked directly, so the checks look at the badges themselves. Make each `.badge` `position: relative` and `display: inline-block`, with `padding-left: 1.75rem` to leave room for a dot. Then colour the variants: `.badge-open` text `#166534`, and `.badge-closed` text `#991b1b`. After that, draw the dot yourself with a `.badge::before` rule, using `content: \"\"`, `position: absolute`, a small round box and `background-color: currentColor`. The dot rule is for you to check in the preview.",
        hints: [
          "The first three declarations go in the `.badge` rule, so the dot can be positioned inside it.",
          "Then add two new rules for the variants, each with a `color` value (and a pale `background-color` if you like).",
          "`.badge::before { content: \"\"; position: absolute; left: 0.75rem; top: 50%; width: 0.5rem; height: 0.5rem; margin-top: -0.25rem; border-radius: 50%; background-color: currentColor; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".badge", property: "position", expected: ["relative"], match: "all", message: "Each badge is `position: relative`, the anchor for the dot." },
          { type: "computedStyle", selector: ".badge", property: "display", expected: ["inline-block"], match: "all", message: "Each badge is `inline-block`." },
          { type: "computedStyle", selector: ".badge", property: "padding-left", expected: ["1.75rem", "28px"], match: "all", message: "Each badge leaves `1.75rem` of room on the left." },
          { type: "computedStyle", selector: ".badge-open", property: "color", expected: ["#166534", "rgb(22, 101, 52)"], message: "`.badge-open` text is dark green." },
          { type: "computedStyle", selector: ".badge-closed", property: "color", expected: ["#991b1b", "rgb(153, 27, 27)"], message: "`.badge-closed` text is dark red." },
        ],
        solution: {
          html: `<ul class="statuses">
  <li><span class="badge badge-open">Open</span></li>
  <li><span class="badge badge-closed">Closed</span></li>
  <li><span class="badge badge-new">New</span></li>
</ul>`,
          css: `body {
  margin: 0;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.statuses {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.badge {
  position: relative;
  display: inline-block;
  padding: 0.25rem 0.75rem 0.25rem 1.75rem;
  border-radius: 999px;
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.875rem;
  font-weight: 700;
}

.badge::before {
  content: "";
  position: absolute;
  left: 0.75rem;
  top: 50%;
  width: 0.5rem;
  height: 0.5rem;
  margin-top: -0.25rem;
  border-radius: 50%;
  background-color: currentColor;
}

.badge-open {
  background-color: #dcfce7;
  color: #166534;
}

.badge-closed {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-new {
  background-color: #e0e7ff;
  color: #3730a3;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "other-pseudo-elements",
      kind: "learn",
      title: "Other pseudo-elements",
      summary: "::first-letter, ::first-line, ::marker, ::placeholder, ::selection, ::backdrop and the rest, with the properties each allows.",
      minutes: 10,
      concept: {
        description:
          "Beyond `::before` and `::after`, CSS has pseudo-elements for specific parts of an element: the first letter or line of text, a list's bullet, a field's placeholder, the highlighted selection, a dialog's backdrop and more. Each one allows only a limited set of properties.",
        why: "These are the small touches that finish a design: a drop cap, a coloured bullet, readable placeholder text, a brand-coloured text selection. They are also where accessibility problems hide, such as placeholder text with too little contrast, so you need to know what each one is for.",
        mentalModel:
          "Each is a window onto one hidden part of an element, and the window only lets you reach a few controls. Through the `::marker` window, you can change colour and size, but not position. Through `::selection`, only colours.",
      },
      body: [
        { type: "heading", text: "Text pseudo-elements" },
        {
          type: "paragraph",
          text: "`::first-letter` styles the first letter of a block, which gives you drop caps and initial capitals, with fonts, colour, margins, floats and more. `::first-line` styles whatever fits on the first line, and recalculates as the window resizes, but it accepts only text and colour properties, not margins or padding. `::selection` styles text the reader has highlighted, but only colours and a few text decorations. Always keep enough contrast between selected text and its background.",
        },
        {
          type: "code",
          language: "css",
          code: `.article p:first-of-type::first-letter {
  float: left;
  margin-right: 0.1em;
  font-size: 3em;
  line-height: 0.9;
  font-weight: 700;
}

.article p:first-of-type::first-line {
  font-variant-caps: small-caps;
}

::selection {
  background-color: #c7d2fe;
  color: #1e1b4b;
}`,
          caption: "A drop cap, small capitals on the first line and a branded selection",
        },
        { type: "heading", text: "List markers and form fields" },
        {
          type: "paragraph",
          text: "`::marker` styles a list item's bullet or number. You can change its colour and font size, and its `content`, but not its position or box. `::placeholder` styles the hint text inside an empty field. Browsers default to a light grey that often fails contrast, so use a colour that meets 4.5:1, and remember that a placeholder is **not a label**, because it vanishes when the person types. `::file-selector-button` styles the button inside `<input type=\"file\">`.",
        },
        {
          type: "code",
          language: "css",
          code: `li::marker {
  color: #4f46e5;
  font-weight: 700;
}

.field::placeholder {
  color: #64748b;
  opacity: 1;
}

input[type="file"]::file-selector-button {
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #4f46e5;
  color: #ffffff;
}`,
          caption: "A coloured bullet, a readable placeholder and a styled file button",
        },
        { type: "heading", text: "The rest of the family" },
        {
          type: "list",
          items: [
            "`::backdrop`: the layer behind a modal `<dialog>`, a fullscreen element or a popover. Use it to dim the page.",
            "`::cue`: captions in video, styled with limited properties.",
            "`::target-text`, `::spelling-error` and `::grammar-error`: browser-generated highlights.",
            "`::highlight()`: ranges you create with the CSS Custom Highlight API in JavaScript.",
            "`::part()` and `::slotted()`: reach into web components.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.field::placeholder {
  color: #64748b;
  opacity: 1;
}`,
            note: "A mid-dark grey that meets contrast guidelines, with Firefox's default fading switched off.",
          },
          bad: {
            code: `.field::placeholder {
  color: #cbd5e1;
}`,
            note: "A very light grey that is hard to read on white, and a placeholder should never be the only label anyway.",
          },
        },
        {
          type: "paragraph",
          text: "A final note on browser support: most of these have been available for years, but a few of the newer ones, such as `::file-selector-button` and `::highlight()`, are more recent. If a rule is purely cosmetic, an older browser that ignores it loses nothing, so it is safe to use. If a rule matters for usability, write a plain fallback first.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Not every property works on every pseudo-element. If a declaration does nothing, check the documentation for the pseudo-element's allowed list.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`::first-letter` and `::first-line` style the start of a block. `::selection` styles highlighted text, and only colours work.",
            "`::marker` styles list bullets and numbers. `::placeholder` styles hint text, which needs enough contrast.",
            "`::backdrop` dims behind a `<dialog>`. Other pseudo-elements cover captions, spelling errors and web components.",
            "Each pseudo-element allows only certain properties.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "counters-and-attr-content",
      kind: "learn",
      title: "Counters, attr() and quotes",
      summary: "Automatic numbering with CSS counters, pulling HTML attributes into content, and quotation marks.",
      minutes: 10,
      concept: {
        description:
          "The `content` property can do more than print a fixed string. **CSS counters** (`counter-reset`, `counter-increment` and `counter()`) number things automatically. `attr()` copies an HTML attribute into the page. And the `quotes` property, with `open-quote` and `close-quote`, supplies the right quotation marks for the language.",
        why: "Numbered headings, numbered steps, figure captions and link addresses on printouts are all things you could type by hand, and then have to renumber every time you add or remove one. Counters and `attr()` keep them correct automatically, and keep your HTML free of decoration.",
        mentalModel:
          "A counter is a tally on a clipboard. `counter-reset` starts a fresh tally at zero, `counter-increment` adds one each time the browser meets a certain element, and `counter()` reads the current number so you can print it.",
      },
      body: [
        { type: "heading", text: "Counters" },
        {
          type: "paragraph",
          text: "A counter has three parts. `counter-reset: step` creates a counter called `step` at 0 on an element, usually the container. `counter-increment: step` adds 1 each time the rule applies, usually to each item. And `content: counter(step)` prints its current value, almost always inside `::before`. The name is yours to choose. Because it is separate from the list's own numbering, you can number anything, in any style, and put text around it.",
        },
        {
          type: "code",
          language: "css",
          code: `.steps {
  counter-reset: step;
  list-style: none;
  padding: 0;
}

.steps li {
  counter-increment: step;
}

.steps li::before {
  content: "Step " counter(step) ": ";
  font-weight: 700;
  color: #4f46e5;
}`,
          caption: "Add, remove or reorder a step, and the numbers stay correct",
        },
        {
          type: "paragraph",
          text: "For nested numbering, such as 1, 1.1, 1.2, 2, use `counters(section, \".\")`, which joins the values of nested counters with the separator. `counter()` also takes a style as a second argument, as in `counter(step, upper-roman)` for I, II, III, or `decimal-leading-zero` for 01, 02, 03.",
        },
        { type: "heading", text: "attr() and quotes" },
        {
          type: "paragraph",
          text: "`content: attr(href)` inserts the value of an attribute as text. It is a classic print trick: `a[href^=\"http\"]::after { content: \" (\" attr(href) \")\"; }` shows each external link's address on paper. You can also use it for tooltips from a `data-tip` attribute. The `quotes` property defines which marks `open-quote` and `close-quote` produce, and the `q` element uses them automatically. The default depends on the page's `lang`, so `<html lang=\"fr\">` gets guillemets.",
        },
        {
          type: "code",
          language: "css",
          code: `q {
  quotes: "“" "”" "‘" "’";
}

blockquote::before {
  content: open-quote;
}

abbr[title]::after {
  content: " (" attr(title) ")";
}`,
          caption: "Quotation marks for the language, and an abbreviation's meaning spelled out",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.steps li {
  counter-increment: step;
}

.steps li::before {
  content: counter(step) ". ";
}`,
            note: "The numbers come from the counter, so reordering or removing a step renumbers the rest.",
          },
          bad: {
            code: `.steps li:nth-child(1)::before { content: "1. "; }
.steps li:nth-child(2)::before { content: "2. "; }
.steps li:nth-child(3)::before { content: "3. "; }`,
            note: "Hard-coded numbers. Add a fourth step and you need a fourth rule, and reordering breaks them all.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "Counter values live in CSS, so screen readers may or may not announce them. For content where the number matters, such as a numbered list of instructions, use a real `<ol>` and let the browser number it, and use counters for decoration or special formats.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`counter-reset` creates the counter, `counter-increment` counts and `counter()` prints it, usually in `::before`.",
            "`counters(name, \".\")` joins nested counters for numbering like 1.2.3.",
            "`attr()` pulls an attribute into `content`, such as `href` for print or `data-tip` for a tooltip.",
            "`quotes`, `open-quote` and `close-quote` give correct quotation marks. Prefer a real `<ol>` when the numbers carry meaning.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "pseudo-specificity-and-debugging",
      kind: "learn",
      title: "Specificity, the cascade and debugging states",
      summary: "How pseudo-classes and pseudo-elements add to specificity, and how to inspect states you cannot easily trigger.",
      minutes: 10,
      concept: {
        description:
          "Specificity is a three-part score: IDs, then classes, attributes and **pseudo-classes**, then element names and **pseudo-elements**. When two rules match, the higher score wins, whatever their order, and only a tie is settled by which comes later. Pseudo-classes add real weight, so `.btn:hover` outranks `.btn`.",
        why: "Most \"my style is not applying\" bugs are specificity bugs. A hover rule that does nothing, a state style overridden by a base style, or a `:not()` rule that is much stronger than you thought: all are explained by counting the score, and DevTools shows you the winner.",
        mentalModel:
          "Specificity is a three-column scoreboard: IDs, then classes and pseudo-classes, then elements and pseudo-elements. The columns are compared left to right, like a number. One ID beats any number of classes, and one class beats any number of element names.",
      },
      body: [
        { type: "heading", text: "Counting the score" },
        {
          type: "list",
          items: [
            "**(1, 0, 0) each:** an ID, such as `#main`.",
            "**(0, 1, 0) each:** a class, an attribute selector and a **pseudo-class**: `.btn`, `[type=\"text\"]`, `:hover`, `:first-child`.",
            "**(0, 0, 1) each:** an element name and a **pseudo-element**: `a`, `p`, `::before`.",
            "**Zero:** the universal selector `*`, combinators, and `:where()`.",
            "**Argument-based:** `:not()`, `:is()` and `:has()` take the score of their most specific argument.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `a              /* (0, 0, 1) */
a:hover        /* (0, 1, 1) */
.btn           /* (0, 1, 0) */
.btn:hover     /* (0, 2, 0) */
.btn:not(.big) /* (0, 2, 0): .btn plus :not's argument .big */
#nav a::after  /* (1, 0, 2) */`,
          caption: "A pseudo-class counts as a class, and a pseudo-element counts as an element name",
        },
        { type: "heading", text: "State rules and the cascade" },
        {
          type: "paragraph",
          text: "State rules are often more specific than the base rule, and that is useful: `.btn:hover` (0, 2, 0) beats `.btn` (0, 1, 0), whichever you write first. The danger is the other direction. If a base rule is more specific than a state rule, such as `.nav .btn` (0, 2, 0) against `.btn:hover` (0, 2, 0), they tie, and the later one wins, so the order starts to matter. Keep selectors short and flat, and your state rules will behave.",
        },
        { type: "heading", text: "Debugging states" },
        {
          type: "paragraph",
          text: "You cannot hover and inspect at the same time, so DevTools gives you a **Force element state** panel (the `:hov` button in the Styles pane). Tick `:hover`, `:active`, `:focus`, `:focus-visible`, `:focus-within` or `:visited`, and the browser applies that state to the selected element until you untick it. The Styles pane lists every matching rule from the highest priority down, with losing declarations crossed out, so you can see which rule won and why. There is also a toggle to emulate `prefers-color-scheme`, `prefers-reduced-motion` and print.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.btn { background-color: #4f46e5; }
.btn:hover { background-color: #3730a3; }`,
            note: "Flat and predictable. The hover rule is more specific, so it always wins.",
          },
          bad: {
            code: `#sidebar .menu .btn { background-color: #4f46e5; }
.btn:hover { background-color: #3730a3; }`,
            note: "The base rule has an ID, so it scores (1, 2, 0), and the hover rule can never override it.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Reach for `:where()` when you want a default that anything can override, since it adds zero specificity. Avoid `!important`, because it hides the real problem and makes the next override harder.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Specificity is (IDs, classes and pseudo-classes, elements and pseudo-elements), compared left to right.",
            "`:hover` and `:first-child` count as a class. `::before` counts as an element name.",
            "`:not()`, `:is()` and `:has()` take their most specific argument's score, and `:where()` scores zero.",
            "Use DevTools' `:hov` panel to force states, and read the Styles pane from the top to find the winning rule.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-form-state-selectors",
      kind: "debug",
      title: "Debug: the form states that never match",
      summary: "Five state selectors fail silently: a missing combinator, a double colon, a misspelt pseudo-class, a bad value and an unclosed bracket.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<form class="signup">
  <div class="row">
    <input id="news" type="checkbox" checked />
    <label for="news">Newsletter</label>
  </div>
  <div class="row">
    <input class="field" type="email" required placeholder="Email" aria-label="Email" />
  </div>
  <div class="row">
    <input class="field" type="text" placeholder="Nickname" aria-label="Nickname" />
  </div>
  <button class="btn" type="submit" disabled>Join</button>
</form>`,
        css: `body {
  margin: 0;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.field {
  padding: 0.5rem 0.75rem;
  border: 2px solid #cbd5e1;
  border-radius: 0.5rem;
}

.btn {
  padding: 0.6rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #4f46e5;
  color: #ffffff;
}

input:checked label {
  font-weight: 700;
}

.field::required {
  border-color: #4f46e5;
}

.btn:disable {
  background-color: #94a3b8;
  cursor: not allowed;
}

.field:not(.required {
  background-color: #f8fafc;
}
`,
      },
      challenge: {
        title: "Make every state rule match",
        description:
          "Four selectors and one value are wrong. The ticked checkbox's label should be bold. The required field should have an indigo border. The disabled button should be grey `#94a3b8` with the `not-allowed` cursor. And the fields that are not required should have the pale background `#f8fafc`.",
        hints: [
          "Use the explain panel's Heads up card. Look for: a missing `+`, a double colon where there should be one, a misspelt state, a space in a keyword and an unclosed bracket.",
          "The label comes right after its input, so the combinator is `+`. States such as `:required` and `:disabled` are pseudo-classes, with one colon. Keywords with a hyphen need the hyphen.",
          "`input:checked + label` `.field:required` `.btn:disabled { background-color: #94a3b8; cursor: not-allowed; }` `.field:not(:required)`",
        ],
        checks: [
          { type: "computedStyle", selector: "input:checked + label", property: "font-weight", expected: ["700", "bold"], message: "The ticked checkbox's label is bold." },
          { type: "computedStyle", selector: ".field:required", property: "border-color", expected: ["#4f46e5", "rgb(79, 70, 229)"], message: "The required field has an indigo border." },
          { type: "computedStyle", selector: ".btn:disabled", property: "background-color", expected: ["#94a3b8", "rgb(148, 163, 184)"], message: "The disabled button is grey" },
          { type: "computedStyle", selector: ".btn:disabled", property: "cursor", expected: ["not-allowed"], message: "...with the `not-allowed` cursor." },
          { type: "computedStyle", selector: ".field:not(:required)", property: "background-color", expected: ["#f8fafc", "rgb(248, 250, 252)"], message: "The optional field has a pale background." },
        ],
        solution: {
          html: `<form class="signup">
  <div class="row">
    <input id="news" type="checkbox" checked />
    <label for="news">Newsletter</label>
  </div>
  <div class="row">
    <input class="field" type="email" required placeholder="Email" aria-label="Email" />
  </div>
  <div class="row">
    <input class="field" type="text" placeholder="Nickname" aria-label="Nickname" />
  </div>
  <button class="btn" type="submit" disabled>Join</button>
</form>`,
          css: `body {
  margin: 0;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.field {
  padding: 0.5rem 0.75rem;
  border: 2px solid #cbd5e1;
  border-radius: 0.5rem;
}

.btn {
  padding: 0.6rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #4f46e5;
  color: #ffffff;
}

input:checked + label {
  font-weight: 700;
}

.field:required {
  border-color: #4f46e5;
}

.btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.field:not(:required) {
  background-color: #f8fafc;
}
`,
        },
      },
    },

    // Guided build: step files live in ./pseudo-classes/workshops/build-a-settings-panel (compiled by `npm run build:content`).
    buildASettingsPanel,

    /* ------------------------------------------------------------------ */
    {
      id: "pseudo-classes-quiz",
      kind: "quiz",
      title: "Quiz: pseudo-classes and pseudo-elements",
      summary: "Eighteen questions on states, structure, form selectors, generated content, counters and specificity.",
      minutes: 14,
      passPercent: 70,
      questions: [
        {
          prompt: "Which of these is a pseudo-element?",
          options: [":hover", "::before", ":first-child", ":checked"],
          answerIndex: 1,
          explanation: "Pseudo-elements use two colons and select a part of an element or generated content. The others are pseudo-classes, which filter existing elements by state or position.",
        },
        {
          prompt: "What does the double colon in `p::first-line` indicate?",
          options: ["A mistake", "A legacy form", "A pseudo-element: a part of an element, not a state", "An ID selector"],
          answerIndex: 2,
          explanation: "One colon is a pseudo-class (a state or position), and two colons is a pseudo-element (a part of an element, or generated content).",
        },
        {
          prompt: "What is the recommended order for link state rules?",
          options: ["`:hover`, `:active`, `:link`, `:visited`", "`:active`, `:hover`, `:visited`, `:link`", "`:visited`, `:link`, `:active`, `:hover`", "`:link`, `:visited`, `:hover`, `:active`"],
          answerIndex: 3,
          explanation: "LVHA, link, visited, hover, active. They have equal specificity, so later states override earlier ones, and the most momentary states must come last.",
        },
        {
          prompt: "When does `:focus-visible` apply?",
          options: ["When the browser decides a visible focus indicator is helpful, such as for keyboard focus", "On every mouse click", "Only on hover", "Only on links"],
          answerIndex: 0,
          explanation: "`:focus-visible` matches a focused element when an indicator is appropriate, which includes keyboard navigation and text inputs, but usually not a mouse click on a button.",
        },
        {
          prompt: "A card contains an `h2` followed by two paragraphs. Which selector matches the first paragraph?",
          options: ["`p:first-child`", "`p:first-of-type`", "Both of them", "Neither of them"],
          answerIndex: 1,
          explanation: "The first child is the `h2`, so `p:first-child` matches nothing. `p:first-of-type` counts only paragraphs, so it matches the first one.",
        },
        {
          prompt: "Which positions does `:nth-child(3n)` select?",
          options: ["1, 2, 3", "1, 4, 7", "3, 6, 9", "3, 5, 7"],
          answerIndex: 2,
          explanation: "`3n` evaluates to 0, 3, 6, 9, ... and position 0 does not exist, so it selects every third child: 3, 6, 9.",
        },
        {
          prompt: "What does `:nth-child(-n + 3)` select?",
          options: ["The last three children", "Every third child", "Everything from the third child on", "The first three children"],
          answerIndex: 3,
          explanation: "For n = 0, 1, 2 the formula gives 3, 2, 1, so it selects the first three children.",
        },
        {
          prompt: "Which selector styles the label of a ticked checkbox that comes right after it?",
          options: ["`input:checked + label`", "`input:checked label`", "`label:checked`", "`input::checked + label`"],
          answerIndex: 0,
          explanation: "`:checked` is a pseudo-class with one colon, and `+` selects the next sibling. Without the `+`, the space would mean a descendant.",
        },
        {
          prompt: "Why prefer `:user-invalid` to `:invalid` for error styling?",
          options: ["It is faster", "It applies only after the person has interacted, so empty required fields are not red on load", "It works on links", "It disables validation"],
          answerIndex: 1,
          explanation: "`:invalid` is true as soon as the page loads, so every empty required field looks wrong. `:user-invalid` waits for the person to interact.",
        },
        {
          prompt: "What must a `::before` rule have for its box to appear?",
          options: ["A width", "`display: block`", "A `content` property, even an empty string", "A `position`"],
          answerIndex: 2,
          explanation: "A `::before` or `::after` box is generated only when `content` has a value. `content: \"\"` makes an empty box you can style.",
        },
        {
          prompt: "What is the default `display` of `::before` and `::after`?",
          options: ["block", "flex", "inline-block", "inline"],
          answerIndex: 3,
          explanation: "They are inline by default. Set `display: block` or `inline-block` for width and height to take effect.",
        },
        {
          prompt: "Which pseudo-element styles the bullet or number of a list item?",
          options: ["`::marker`", "`::bullet`", "`::list`", "`:marker`"],
          answerIndex: 0,
          explanation: "`::marker` styles list markers, with a limited set of properties such as colour and font size.",
        },
        {
          prompt: "What is the specificity of `a:hover`?",
          options: ["(0, 0, 1)", "(0, 1, 1)", "(1, 0, 1)", "(0, 2, 0)"],
          answerIndex: 1,
          explanation: "`a` adds one element-level point, and `:hover` is a pseudo-class, which counts as a class-level point, so (0, 1, 1).",
        },
        {
          prompt: "What is the specificity of `:where(.a, .b)`?",
          options: ["The highest of its arguments", "Always (1, 0, 0)", "Zero", "The same as `:is(.a, .b)`"],
          answerIndex: 2,
          explanation: "`:where()` always contributes zero specificity, which is why it is good for defaults that are easy to override. `:is()` takes its most specific argument.",
        },
        {
          prompt: "What does `counter-increment: step` do?",
          options: ["Prints a number", "Styles a list marker", "Creates a new counter", "Adds 1 to the counter named `step` each time the rule applies to an element"],
          answerIndex: 3,
          explanation: "`counter-reset` creates a counter, `counter-increment` adds to it, and `counter()` in `content` prints its value.",
        },
        {
          prompt: "Which properties can `:visited` change?",
          options: ["Only colour-related properties, for privacy", "Any property", "Only fonts", "Only margins"],
          answerIndex: 0,
          explanation: "Browsers restrict `:visited` to colours, so a page cannot detect your browsing history through layout or size changes.",
        },
        {
          prompt: "Which of these can JavaScript's `querySelector` find?",
          options: ["`::before`", "`.item:first-child`", "`::first-letter`", "`::marker`"],
          answerIndex: 1,
          explanation: "Pseudo-classes select real elements, so `querySelector` can find them. Pseudo-elements are not elements in the DOM, so they cannot be selected.",
        },
        {
          prompt: "How can you test a `:hover` style in DevTools without hovering?",
          options: ["With the Layers panel", "With Coverage", "With the Force element state (`:hov`) panel", "With the Network tab"],
          answerIndex: 2,
          explanation: "The `:hov` button in the Styles pane forces states such as `:hover`, `:active` and `:focus` onto the selected element.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "pseudo-classes-review",
      kind: "review",
      title: "Review: pseudo-classes and pseudo-elements cheat sheet",
      summary: "States, structure, form selectors, generated content and specificity on one page.",
      minutes: 4,
      body: [
        { type: "heading", text: "One colon or two" },
        {
          type: "code",
          language: "css",
          code: `a:hover { }       /* pseudo-class: a state or position of a real element */
p::first-line { } /* pseudo-element: a part of an element */
a:hover::after { } /* a pseudo-element comes last, and only one per selector */`,
        },
        { type: "heading", text: "States" },
        {
          type: "code",
          language: "css",
          code: `a:link { }  a:visited { }  a:hover { }  a:active { }   /* LVHA order */
.btn:focus-visible { outline: 3px solid #4f46e5; outline-offset: 3px; }
.group:focus-within { border-color: #4f46e5; }
@media (hover: hover) { .card:hover { } }`,
        },
        { type: "heading", text: "Structure" },
        {
          type: "code",
          language: "css",
          code: `li:first-child  li:last-child  li:only-child
li:nth-child(even)      li:nth-child(3n)       li:nth-child(-n + 3)   /* first three */
li:nth-child(n + 4)     li:nth-last-child(-n + 2)                      /* last two */
p:first-of-type         li:not(:last-child)    :empty    :root`,
        },
        { type: "heading", text: "Forms" },
        {
          type: "code",
          language: "css",
          code: `input:checked + label { font-weight: 700; }
.field:required { }  .field:disabled { }  .field:read-only { }
.field:user-invalid { border-color: #dc2626; }   /* after interaction, unlike :invalid */`,
        },
        { type: "heading", text: "Generated content" },
        {
          type: "code",
          language: "css",
          code: `.badge::before { content: ""; display: inline-block; width: .5rem; height: .5rem; }
.steps { counter-reset: step; }  .steps li { counter-increment: step; }
.steps li::before { content: counter(step) ". "; }
a[href^="http"]::after { content: " (" attr(href) ")"; }
::selection { background-color: #c7d2fe; }   li::marker { color: #4f46e5; }`,
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "One colon is a state or position, and two colons is a part of an element or generated content.",
            "Write link states in LVHA order, and never remove a focus ring without replacing it.",
            "`p:first-child` fails when something else comes first. Use `:first-of-type`.",
            "`an + b` counts n = 0, 1, 2... Positions start at 1. `-n + 3` is the first three.",
            "`::before` and `::after` need `content`, are inline by default and are not selectable. Keep meaning in the HTML.",
            "A pseudo-class scores like a class, and a pseudo-element like an element. `:where()` scores zero.",
            "Use DevTools' `:hov` panel to test states, and `:user-invalid` instead of `:invalid`.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "When a state style will not apply, check the selector for the colons, the combinator and the spelling, then use DevTools to see whether another rule with higher specificity is winning.",
        },
      ],
    },
  ],
};

export default content;
