import type { TopicContent } from "@/engine/types";
import buildAMenu from "./display/workshops/build-a-menu/workshop.generated";

const content: TopicContent = {
  lessons: [
    {
      id: "block-and-inline-boxes",
      kind: "learn",
      title: "Block and inline boxes",
      summary: "The two kinds of box every element starts as, and why width sometimes does nothing.",
      minutes: 9,
      concept: {
        description:
          "Every element has a `display` value that decides how its box behaves in the flow of the page. The two you meet first are `block`, which stacks and fills the width, and `inline`, which flows along with the text like a word.",
        why: "Whenever a `width`, a `height` or a margin seems to be ignored, the cause is usually the element's `display`. Knowing which kind of box you have is the fastest way to explain, and to fix, most beginner layout problems.",
        mentalModel:
          "A block is a paragraph on a page: it starts on a new line and uses the full width. An inline element is a word inside a paragraph: it sits in the line and goes wherever the text goes.",
      },
      body: [
        { type: "heading", text: "Block elements" },
        {
          type: "paragraph",
          text: "A block element starts on a new line, and by default it stretches to fill all the width its parent offers. Because it is a proper rectangle, it accepts `width`, `height`, padding and margins on all four sides, exactly as the box model describes. Headings, paragraphs, lists, list items and `div` elements are all block by default.",
        },
        { type: "heading", text: "Inline elements" },
        {
          type: "paragraph",
          text: "An inline element doesn't start a new line. It sits inside a line of text, takes only as much width as its content needs, and wraps to the next line along with the words around it. Links, `span`, `strong` and `em` are inline by default. Inline boxes have restrictions that surprise people:",
        },
        {
          type: "list",
          items: [
            "`width` and `height` are ignored.",
            "Vertical margins have no effect.",
            "Vertical padding is painted, but it does not push neighbouring lines away, so it can overlap them.",
            "Horizontal padding and margins work normally.",
          ],
        },
        { type: "heading", text: "Changing the display value" },
        {
          type: "paragraph",
          text: "`display` is just a CSS property, so you can change it for any element. A link can be made `block` so that the whole row is clickable, and a `div` can be made `inline`. This changes how the box behaves, not what the element means, so a link is still a link.",
        },
        {
          type: "code",
          language: "css",
          code: ".sidebar a {\n  display: block;\n  padding: 8px 12px;\n}",
          caption: "Making each sidebar link a full-width, clickable row",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".badge {\n  display: inline-block;\n  width: 80px;\n  height: 28px;\n}",
            note: "`inline-block` keeps the badge in the line of text but gives it a real box that accepts a size.",
          },
          bad: {
            code: ".badge {\n  width: 80px;\n  height: 28px;\n}",
            note: "On an inline element like `span`, the width and height are silently ignored, and nothing changes.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "When a size or margin isn't applying, look at the element's `display` first. Your browser's Inspect tool shows it in the Computed panel for any element.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Block elements start on a new line, fill the width, and accept every box-model property.",
            "Inline elements flow like words, and ignore width, height and vertical margins.",
            "`display` can be changed with CSS, and the element keeps its meaning.",
            "If a size doesn't apply, check `display` before anything else.",
          ],
        },
      ],
    },
    {
      id: "display-explorer",
      kind: "visualizer",
      title: "Display explorer",
      summary: "Flip an element between inline, inline-block, block and none, and see which properties start working.",
      minutes: 10,
      concept: {
        description:
          "Three items each have a width, a height and some padding. Whether those properties actually do anything depends entirely on the item's `display` value, and you can change that value and watch.",
        why: "Seeing the same CSS behave differently under each `display` value makes the rules stick. It is much easier to remember \"inline ignores width\" after you have watched it happen.",
        mentalModel:
          "Inline items are words in a line. Inline-block items are small boxes in a line. Block items are boxes stacked down the page. None removes the item completely.",
      },
      stage: {
        html: '<div class="row">\n  <span class="item item-1">One</span>\n  <span class="item item-2">Two</span>\n  <span class="item item-3">Three</span>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; overflow: hidden; }\n.row { padding: 12px; border: 2px dashed rgba(129, 140, 248, 0.6); border-radius: 12px; background: rgba(99, 102, 241, 0.08); color: #e2e8f0; font-size: 16px; line-height: 2; }\n.item { color: #fff; font-weight: 700; }\n.item-1 { background: #4f46e5; }\n.item-2 { background: #7c3aed; }\n.item-3 { background: #059669; }",
        annotate: "box",
        target: ".item-2",
        items: ".item",
        itemCount: 3,
      },
      starter: ".item {\n  width: 100px;\n  height: 40px;\n  padding: 12px 16px;\n}\n",
      controls: [
        {
          id: "display",
          label: "display",
          selector: ".item-{item}",
          property: "display",
          fallback: "inline",
          type: "options",
          options: ["inline", "inline-block", "block", "none"],
          help: "Pick an item above, then change its display. The box layers are drawn for item 2.",
        },
        { id: "width", label: "width", selector: ".item-{item}", property: "width", fallback: "auto", type: "range", min: 40, max: 200, step: 10, unit: "px", help: "Ignored when display is inline." },
        { id: "margin", label: "margin", selector: ".item-{item}", property: "margin", fallback: "0px", type: "range", min: 0, max: 24, step: 4, unit: "px", help: "Vertical margins are ignored when display is inline." },
      ],
      presets: [
        { id: "menu", label: "Menu items", description: "boxes that sit side by side", css: ".item { display: inline-block; }" },
        { id: "stack", label: "Stacked blocks", description: "every item on its own line", css: ".item { display: block; }" },
        { id: "hide", label: "Hide the middle one", description: "item 2 disappears and takes no space", css: ".item-2 { display: none; }" },
        { id: "words", label: "Back to inline", description: "plain words in a line", css: ".item { display: inline; }" },
      ],
      challenge: {
        title: "Real boxes in a row",
        description:
          "The three items have a `width`, a `height` and vertical padding, but all of that is being ignored. Make every item a real box that still sits side by side in the line.",
        hints: [
          "Width, height and vertical padding only work on boxes that aren't plain inline.",
          "You want a value that keeps the items in a line but gives them a real box.",
          "`display: inline-block` on `.item`.",
        ],
        checks: [
          { type: "computedStyle", selector: ".item", property: "display", expected: "inline-block", match: "all", message: "Every item is `inline-block`." },
          { type: "computedStyle", selector: ".item", property: "width", expected: "100px", match: "all", message: "...with its `100px` width." },
        ],
        solution: ".item {\n  display: inline-block;\n  width: 100px;\n  height: 40px;\n  padding: 12px 16px;\n}\n",
      },
    },
    {
      id: "inline-block-and-the-gap",
      kind: "learn",
      title: "Inline-block and the mysterious gap",
      summary: "The hybrid display value, and the two quirks that make people reach for flexbox.",
      minutes: 9,
      concept: {
        description:
          "`display: inline-block` is a hybrid. The element sits in a line like an inline element, but its inside behaves like a block, so it accepts width, height, padding and vertical margins.",
        why: "It is what you need for buttons, tags, badges and small controls that should sit beside text or beside each other but still be real boxes. It also has two famous quirks, the whitespace gap and baseline alignment, that cost people hours until they know the cause.",
        mentalModel:
          "An inline-block is a sticker stuck on a line of text. It travels along with the words, but it is a solid rectangle in its own right.",
      },
      body: [
        { type: "heading", text: "When to use it" },
        {
          type: "paragraph",
          text: "Use `inline-block` when something should flow in a line, but needs a proper box: a tag with padding and rounded corners, a button-like link, or a badge with a fixed width. It lets you build rows of small boxes without any other layout tool.",
        },
        {
          type: "code",
          language: "css",
          code: ".tag {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 999px;\n  background: #e0e7ff;\n}",
          caption: "A pill-shaped tag",
        },
        { type: "heading", text: "The whitespace gap" },
        {
          type: "paragraph",
          text: "If your HTML puts each inline-block element on its own line, you will notice a small gap, about four pixels wide, between them. It is not a margin. Browsers treat the line break between two inline elements as a single space character, and because inline-block elements sit in a line of text, that space is drawn.",
        },
        {
          type: "list",
          items: [
            "**Best:** make the parent a flex container and use `gap`. Flex items ignore the whitespace, and the spacing is exactly what you write.",
            "Remove the whitespace between the elements in the HTML. It works, but it makes your markup awkward to read.",
            "Set `font-size: 0` on the parent. It's an old hack, and it makes the text inside need its size set again.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".tags {\n  display: flex;\n  gap: 8px;\n}",
            note: "Exact, intentional spacing, with no stray whitespace gap and no extra margin on the last tag.",
          },
          bad: {
            code: ".tags .tag {\n  display: inline-block;\n  margin-right: 8px;\n}",
            note: "The spacing is your 8px plus about 4px of whitespace, and the last tag keeps an unwanted right margin.",
          },
        },
        { type: "heading", text: "Baseline alignment" },
        {
          type: "paragraph",
          text: "Inline-block elements line up on the text baseline, not along their top edges. When boxes have different heights, they can seem to sit at different levels. Adding `vertical-align: top` lines up their tops. The same thing causes the small gap that sometimes appears under an `img`, because images are inline by default.",
        },
        {
          type: "callout",
          tone: "note",
          text: "To remove the gap under an image, make it a block with `img { display: block; }`, or set `vertical-align: middle` on it.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`inline-block` sits in a line but has a real box, with width, height and vertical margins.",
            "The gap between inline-blocks is the whitespace in your HTML, drawn as a space.",
            "A flex container with `gap` is the modern fix for spacing a row of boxes.",
            "`vertical-align` controls how inline-blocks line up, which also explains gaps under images.",
          ],
        },
      ],
    },
    {
      id: "predict-the-flow",
      kind: "predict",
      title: "Predict the flow",
      summary: "Work out which elements start on a new line and which ignore their width.",
      minutes: 6,
      mode: "css",
      intro:
        "One block, two inline elements and two inline-block elements, all with `width: 120px`. Predict how each kind of box behaves, then run the code.",
      code: {
        html: '<div class="a">Block A</div>\n<span class="b">Inline B1</span>\n<span class="b">Inline B2</span>\n<span class="c">Inline-block C1</span>\n<span class="c">Inline-block C2</span>',
        css: ".a { display: block; width: 120px; background: #c7d2fe; }\n.b { display: inline; width: 120px; background: #bbf7d0; }\n.c { display: inline-block; width: 120px; background: #fde68a; }",
      },
      questions: [
        {
          prompt: "Which of the five elements starts on a new line by itself?",
          options: ["Only Block A", "Block A and both Inline B elements", "Block A, the Inline B and the Inline-block C elements", "None of them"],
          answerIndex: 0,
          hint: "Look at each element's `display` value. Only one of them is `block`.",
          explanation: "A block always starts on a new line. Inline and inline-block elements flow along in the line like words.",
          proves: [
            { type: "computedStyle", selector: ".a", property: "display", expected: "block", message: "Block A is `display: block`." },
            { type: "computedStyle", selector: ".b", property: "display", expected: "inline", match: "all", message: "The B elements are `inline`." },
          ],
        },
        {
          prompt: "Does `width: 120px` apply to the two Inline B elements?",
          options: ["Yes, each is 120px wide", "Only the first one gets it", "It applies, but the text overflows", "No, width is ignored on inline elements"],
          answerIndex: 3,
          hint: "Think about what an inline box does with a width.",
          explanation: "Inline elements ignore `width` and `height`. Each B is only as wide as its text.",
          proves: [{ type: "computedStyle", selector: ".b", property: "display", expected: "inline", match: "all", message: "The B elements are inline." }],
        },
        {
          prompt: "How wide is each Inline-block C element?",
          options: ["As wide as its text", "The full width of the page", "120px", "0px, because it is inline"],
          answerIndex: 2,
          hint: "`inline-block` keeps a real box inside the line.",
          explanation: "`inline-block` gives the element a real box, so the 120px width applies, and the two C elements sit side by side in the line.",
          proves: [
            { type: "computedStyle", selector: ".c", property: "display", expected: "inline-block", match: "all", message: "The C elements are `inline-block`." },
            { type: "computedStyle", selector: ".c", property: "width", expected: "120px", match: "all", message: "The C elements are `120px` wide." },
          ],
        },
      ],
    },
    {
      id: "hiding-things",
      kind: "learn",
      title: "Hiding things: none, hidden and opacity",
      summary: "Three ways to make an element invisible, and the very different things each one does.",
      minutes: 8,
      concept: {
        description:
          "CSS gives you several ways to hide an element, and they are not interchangeable. `display: none` removes the element from the layout entirely, while `visibility: hidden` and `opacity: 0` make it invisible but leave it taking up space.",
        why: "Choosing the wrong one leaves gaps in the layout, invisible buttons that can still be clicked, or content that screen readers skip when they shouldn't. Each method is right for a different job.",
        mentalModel:
          "`display: none` takes the chair out of the room. `visibility: hidden` leaves the chair's space empty. `opacity: 0` leaves the chair there, transparent, and people can still sit on it.",
      },
      body: [
        { type: "heading", text: "Three ways, three results" },
        {
          type: "list",
          items: [
            "**`display: none`**: not drawn, takes no space, can't be focused or clicked, and is hidden from screen readers.",
            "**`visibility: hidden`**: not drawn, but keeps its space. It can't be focused or clicked, and is hidden from screen readers.",
            "**`opacity: 0`**: invisible, keeps its space, and can still be clicked, tabbed to and read by screen readers.",
          ],
        },
        { type: "heading", text: "Which one to choose" },
        {
          type: "paragraph",
          text: "Use `display: none` when something should be properly gone, such as a closed dropdown or a hidden panel. Use `visibility: hidden` when the layout must not move, for example a badge that appears later. Use `opacity` mainly for fades and animations, because it is the only one of the three that can be animated smoothly.",
        },
        {
          type: "code",
          language: "css",
          code: ".menu {\n  display: none;\n}\n\n.menu.open {\n  display: block;\n}",
          caption: "A menu that is gone until it is opened",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".dropdown {\n  display: none;\n}",
            note: "Completely gone: no space, no clicks, and no keyboard focus.",
          },
          bad: {
            code: ".dropdown {\n  opacity: 0;\n}",
            note: "Invisible, but it still takes up space, and people can still click it or tab into it without seeing anything.",
          },
        },
        { type: "heading", text: "The hidden attribute" },
        {
          type: "paragraph",
          text: "HTML has its own way: the `hidden` attribute, as in `<p hidden>`. The browser's default stylesheet turns it into `display: none`. Be careful, though. If you give the same element a `display` value in your own CSS, such as `display: flex`, yours overrides it, and the element appears again.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "Content hidden with `display: none` is hidden from screen readers too. If text should be invisible on screen but still read aloud, such as a label for an icon button, use a visually-hidden technique that clips the element instead.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`display: none` removes the element and its space, and hides it from everyone.",
            "`visibility: hidden` hides it but keeps its space.",
            "`opacity: 0` only makes it transparent: it stays clickable, focusable and readable.",
            "Your own `display` value can override the `hidden` attribute.",
          ],
        },
      ],
    },
    // Guided build: step files live in ./display/workshops/build-a-menu (compiled by `npm run build:content`).
    buildAMenu,
    {
      id: "debug-the-ignored-sizes",
      kind: "debug",
      title: "Debug: the toast that leaves a gap",
      summary: "Chips ignore their size, and a hidden message still leaves a blank space.",
      minutes: 8,
      mode: "css",
      broken: {
        html: '<div class="toast">Saved!</div>\n<p class="label">Filters</p>\n<span class="chip">New</span>\n<span class="chip">Popular</span>\n<span class="chip">Sale</span>',
        css: "body { font-family: system-ui, sans-serif; padding: 16px; }\n\n.toast {\n  visibility: hidden;\n  padding: 24px;\n  background: #dcfce7;\n}\n\n.chip {\n  width: 90px;\n  height: 32px;\n  margin-right: 8px;\n  background: #e0e7ff;\n  color: #3730a3;\n  text-align: center;\n}\n",
      },
      challenge: {
        title: "Fix the two display problems",
        description:
          "Two things are wrong. The \"Saved!\" message should be completely gone, but it leaves a big blank gap above \"Filters\". And the three chips are supposed to be 90px wide and 32px tall boxes in a row, but they ignore their size and look like plain text. Fix both by changing `display` values.",
        hints: [
          "Two different elements, two different `display` problems. Start with the toast: `visibility: hidden` keeps the space. What removes the element altogether?",
          "For the chips, remember which kinds of element ignore `width` and `height`. A `span` is inline by default.",
          "Use `display: none` for the toast, and `display: inline-block` for the chips. Leave their sizes alone.",
        ],
        checks: [
          { type: "computedStyle", selector: ".toast", property: "display", expected: "none", message: "The toast is removed from the layout (`display: none`)." },
          { type: "computedStyle", selector: ".chip", property: "display", expected: "inline-block", match: "all", message: "The chips are `inline-block`, so their size applies." },
          { type: "computedStyle", selector: ".chip", property: "width", expected: "90px", match: "all", message: "Each chip keeps its `90px` width." },
          { type: "computedStyle", selector: ".chip", property: "height", expected: "32px", match: "all", message: "...and its `32px` height." },
        ],
        solution: {
          html: '<div class="toast">Saved!</div>\n<p class="label">Filters</p>\n<span class="chip">New</span>\n<span class="chip">Popular</span>\n<span class="chip">Sale</span>',
          css: "body { font-family: system-ui, sans-serif; padding: 16px; }\n\n.toast {\n  display: none;\n  padding: 24px;\n  background: #dcfce7;\n}\n\n.chip {\n  display: inline-block;\n  width: 90px;\n  height: 32px;\n  margin-right: 8px;\n  background: #e0e7ff;\n  color: #3730a3;\n  text-align: center;\n}\n",
        },
      },
    },
    {
      id: "display-quiz",
      kind: "quiz",
      title: "Quiz: display",
      summary: "Ten questions on block, inline, inline-block, none and the hiding methods.",
      minutes: 8,
      passPercent: 70,
      questions: [
        {
          prompt: "Which kind of element starts on a new line and fills the available width by default?",
          options: ["Inline elements such as `span`", "Block elements such as `div` and `p`", "Only elements with `float`", "Only `inline-block` elements"],
          answerIndex: 1,
          explanation: "Block elements stack down the page and stretch across the width of their parent. Inline elements flow within a line.",
        },
        {
          prompt: "Which of these does an inline element ignore?",
          options: ["Horizontal padding", "Text colour", "`width` and `height`", "Horizontal margins"],
          answerIndex: 2,
          explanation: "Inline boxes size themselves to their content, so `width` and `height` have no effect. Horizontal padding and margins still work.",
        },
        {
          prompt: "What does `display: inline-block` give you?",
          options: ["An element that fills the line and ignores width", "An element removed from the page", "An element that is always centred", "An element that sits in a line like a word but accepts width, height and vertical margins"],
          answerIndex: 3,
          explanation: "It is a hybrid: it flows in a line like an inline element, but its inside behaves like a block.",
        },
        {
          prompt: "Which declaration hides an element and also removes the space it took up?",
          options: ["`visibility: hidden`", "`opacity: 0`", "`display: none`", "`color: transparent`"],
          answerIndex: 2,
          explanation: "`display: none` takes the element out of the layout completely, so neighbouring elements close up around the gap.",
        },
        {
          prompt: "Which declaration makes an element invisible but keeps its space in the layout?",
          options: ["`display: none`", "`visibility: hidden`", "`display: inline`", "`position: static`"],
          answerIndex: 1,
          explanation: "`visibility: hidden` hides the element but the layout is left unchanged, with an empty patch where it was.",
        },
        {
          prompt: "Why is there a small gap between inline-block elements written on separate lines of HTML?",
          options: ["The line break between them is rendered as a space character", "Browsers add a default margin to every inline-block", "The CSS specification adds a 4px gap", "Their borders overlap"],
          answerIndex: 0,
          explanation: "Whitespace between inline elements collapses to a single space, and inline-block elements sit in a line of text, so that space is drawn.",
        },
        {
          prompt: "Which of these elements is block-level by default?",
          options: ["`span`", "`a`", "`strong`", "`p`"],
          answerIndex: 3,
          explanation: "Paragraphs are blocks. `span`, `a` and `strong` are inline by default.",
        },
        {
          prompt: "A screen reader user will NOT hear the content of an element with which style?",
          options: ["`opacity: 0`", "`color: white`", "`display: none`", "`font-size: 1px`"],
          answerIndex: 2,
          explanation: "`display: none` removes the element from the accessibility tree as well as from the screen. The other styles only change how it looks.",
        },
        {
          prompt: "You set `display: flex` on a `ul`. What happens to its `li` children?",
          options: ["They become flex items, whatever their own display value was", "They keep their own display and ignore the parent", "They all become inline", "They are hidden"],
          answerIndex: 0,
          explanation: "The direct children of a flex container become flex items, so the parent's display controls how they are laid out.",
        },
        {
          prompt: "Which is true of `display: inline`?",
          options: ["Vertical margins push neighbouring lines apart", "Width and height are applied", "Vertical padding is painted but does not push neighbouring lines away", "The element starts on a new line"],
          answerIndex: 2,
          explanation: "Inline boxes paint vertical padding, but it doesn't affect the layout of surrounding lines, so it can overlap them.",
        },
      ],
    },
    {
      id: "display-review",
      kind: "review",
      title: "Review: display cheat sheet",
      summary: "The display values and the hiding methods, side by side.",
      minutes: 3,
      body: [
        { type: "heading", text: "The values you'll use most" },
        {
          type: "code",
          language: "css",
          code: "display: block;         /* new line, fills the width, full box model */\ndisplay: inline;        /* flows like a word; ignores width, height, vertical margin */\ndisplay: inline-block;  /* flows like a word, but a real box */\ndisplay: none;          /* removed from the page, no space */\ndisplay: flex;          /* block-level flex container */\ndisplay: inline-flex;   /* flex container that sits in a line */\ndisplay: grid;          /* block-level grid container */",
        },
        { type: "heading", text: "Three ways to hide" },
        {
          type: "code",
          language: "css",
          code: ".gone      { display: none; }         /* no space, not read aloud */\n.reserved  { visibility: hidden; }    /* keeps its space */\n.faded     { opacity: 0; }            /* keeps space, still clickable */",
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "If width or height isn't applying, check whether the element is inline.",
            "Block elements stack and fill the width. Inline elements flow like words.",
            "The gap between inline-blocks is whitespace in the HTML. Use a flex container with `gap` instead.",
            "`display: none` removes everything. `visibility: hidden` keeps the space. `opacity: 0` only fades.",
            "Your own `display` value overrides the `hidden` attribute.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "In the Inspect tool, the Computed panel shows each element's display value. Check it whenever a layout behaves oddly.",
        },
      ],
    },
  ],
};

export default content;
