import type { TopicContent } from "@/engine/types";
import buildAProfileCard from "./box-model/workshops/build-a-profile-card/workshop.generated";

const content: TopicContent = {
  lessons: [
    {
      id: "every-element-is-a-box",
      kind: "learn",
      title: "Every element is a box",
      summary: "Meet the four layers of the box model: content, padding, border and margin.",
      minutes: 8,
      concept: {
        description:
          "Every element on a web page is drawn as a rectangular box. The box has four layers, from the inside out: the content, then the padding around it, then the border around that, and finally the margin outside the border.",
        why: "Almost every layout question, such as \"why is this wider than I set it?\" or \"where is this gap coming from?\", is a box-model question. Knowing the layers lets you predict sizes and spacing instead of guessing.",
        mentalModel:
          "Think of a framed picture on a wall. The picture is the content, the matting around it is the padding, the frame is the border, and the empty wall around the frame is the margin.",
      },
      body: [
        { type: "heading", text: "The four layers" },
        {
          type: "paragraph",
          text: "From the inside out, every box is made of four layers. Each layer has its own CSS property, and each one takes up room on the page.",
        },
        {
          type: "list",
          items: [
            "**Content**: the text, image or other children. Its size is set by `width` and `height`.",
            "**Padding**: the space between the content and the border. Set with `padding`.",
            "**Border**: the line around the padding. Set with `border`.",
            "**Margin**: the space outside the border, which pushes other elements away. Set with `margin`.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: ".card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #4f46e5;\n  margin: 16px;\n}",
          caption: "All four layers in one rule",
        },
        {
          type: "paragraph",
          text: "In this rule the content area is 300px wide. The padding adds 20px on each side and the border adds 2px, so the box you actually see is wider than 300px. We will do that sum properly in a later lesson.",
        },
        { type: "heading", text: "Which layers show the background?" },
        {
          type: "paragraph",
          text: "An element's background colour fills the content and the padding, and by default it runs underneath the border as well. The margin is different: it is always transparent. It is empty space that keeps neighbouring elements at a distance, and it never shows the element's own background.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".button {\n  padding: 12px 24px;\n  background: #4f46e5;\n}",
            note: "Padding grows the coloured area, so the button gets roomier and the colour fills it.",
          },
          bad: {
            code: ".button {\n  margin: 12px 24px;\n  background: #4f46e5;\n}",
            note: "Margin is outside the box, so the colour doesn't grow. The button stays tight and just pushes its neighbours away.",
          },
        },
        { type: "heading", text: "Block and inline boxes" },
        {
          type: "paragraph",
          text: "Not every box behaves the same way. A **block** box, like a `div`, `p` or `h2`, starts on a new line and stretches to fill the available width. An **inline** box, like an `a`, `span` or `strong`, flows inside a line of text, and it ignores `width`, `height` and vertical margins. Many layout surprises come from using an inline element when you needed a block.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Right-click any element on any web page, choose Inspect, and look at the box diagram in the Computed panel. It shows the content, padding, border and margin of the selected element with exact numbers.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Every element is a box with four layers: content, padding, border and margin.",
            "Padding sits inside the border and shows the background. Margin sits outside and is transparent.",
            "Block boxes fill the width and start a new line. Inline boxes flow like words.",
            "The browser's Inspect tool shows the exact box of any element.",
          ],
        },
      ],
    },
    {
      id: "layers-of-a-box",
      kind: "visualizer",
      title: "The layers of a box",
      summary: "Change padding, border and margin and see exactly where each layer begins and ends.",
      minutes: 10,
      concept: {
        description:
          "Every element is a rectangular box with four layers. From the inside out they are the content, then padding, then a border, then margin.",
        why: "Most \"why is my layout the wrong size?\" bugs come from not knowing which layers count toward an element's width. The `box-sizing` property decides it.",
        mentalModel:
          "Think of a framed picture. The picture is the content, the matting around it is the padding, the frame is the border, and the space around the frame on the wall is the margin.",
      },
      stage: {
        html: '<div class="box">Content</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; overflow: hidden; }\n.box { color: #e0e7ff; font-weight: 700; background: #1e1b4b; }",
        annotate: "box",
        target: ".box",
        items: ".box",
      },
      starter:
        ".box {\n  width: 240px;\n  height: 100px;\n  padding: 16px;\n  border-style: solid;\n  border-color: #facc15;\n  border-width: 4px;\n  margin: 24px;\n  box-sizing: content-box;\n}\n",
      controls: [
        { id: "width", label: "width", selector: ".box", property: "width", fallback: "auto", type: "range", min: 120, max: 400, step: 10, unit: "px", help: "What this measures depends on box-sizing." },
        { id: "padding", label: "padding", selector: ".box", property: "padding", fallback: "0px", type: "range", min: 0, max: 48, step: 4, unit: "px", help: "Space between the content and the border." },
        { id: "border", label: "border-width", selector: ".box", property: "border-width", fallback: "0px", type: "range", min: 0, max: 16, step: 2, unit: "px" },
        { id: "margin", label: "margin", selector: ".box", property: "margin", fallback: "0px", type: "range", min: 0, max: 48, step: 4, unit: "px", help: "Space outside the border, pushing other things away." },
        {
          id: "sizing",
          label: "box-sizing",
          selector: ".box",
          property: "box-sizing",
          fallback: "content-box",
          type: "options",
          options: ["content-box", "border-box"],
          help: "content-box: width is the content only. border-box: width includes padding and border.",
        },
      ],
      presets: [
        { id: "roomy", label: "Roomy card", description: "generous padding and a thin border", css: ".box { padding: 32px; margin: 16px; border-width: 2px; }" },
        { id: "borderbox", label: "Border-box maths", description: "width now includes the padding and border", css: ".box { box-sizing: border-box; width: 240px; }" },
        { id: "tight", label: "Squeezed", description: "no padding, border or margin", css: ".box { padding: 0px; margin: 0px; border-width: 0px; }" },
      ],
      challenge: {
        title: "A box that is exactly 300px wide",
        description:
          "Make the box `300px` wide in total, border and padding included. Give it `24px` of padding, a `16px` margin and a `4px` border.",
        hints: [
          "Which `box-sizing` value makes `width` include the padding and border? Use `border-box`.",
          "With `border-box`, `width: 300px` is the whole box from outer border edge to outer border edge.",
          "Padding is `24px`, margin is `16px` and the border width stays `4px`.",
        ],
        checks: [
          { type: "computedStyle", selector: ".box", property: "box-sizing", expected: "border-box", message: "The box uses `box-sizing: border-box`." },
          { type: "computedStyle", selector: ".box", property: "width", expected: "300px", message: "The box is `300px` wide." },
          { type: "computedStyle", selector: ".box", property: "padding-top", expected: "24px", message: "The padding is `24px`." },
          { type: "computedStyle", selector: ".box", property: "margin-top", expected: "16px", message: "The margin is `16px`." },
          { type: "computedStyle", selector: ".box", property: "border-top-width", expected: "4px", message: "The border is `4px` thick." },
        ],
        solution:
          ".box {\n  width: 300px;\n  height: 100px;\n  padding: 24px;\n  border-style: solid;\n  border-color: #facc15;\n  border-width: 4px;\n  margin: 16px;\n  box-sizing: border-box;\n}\n",
      },
    },
    {
      id: "padding-border-and-margin",
      kind: "learn",
      title: "Padding, border and margin",
      summary: "Read and write the shorthand for all three, and learn the two margin surprises.",
      minutes: 10,
      concept: {
        description:
          "Padding, border and margin each have a shorthand that takes one to four values, and each side can also be set on its own. Borders need a width, a style and a colour. Margins can be set to `auto`, which centres a block horizontally.",
        why: "These three properties account for nearly all of the spacing in a design. Reading and writing the shorthand fluently makes your CSS shorter, and it stops you fighting the browser's default margins on headings and paragraphs.",
        mentalModel:
          "Go clockwise from the top: top, right, bottom, left. One value covers everything, two values mean vertical then horizontal, and four go all the way round.",
      },
      body: [
        { type: "heading", text: "One to four values" },
        {
          type: "paragraph",
          text: "`padding` and `margin` accept between one and four values. The order is always clockwise, starting at the top.",
        },
        {
          type: "list",
          items: [
            "`padding: 16px` sets all four sides to 16px.",
            "`padding: 8px 24px` sets top and bottom to 8px, and left and right to 24px.",
            "`padding: 8px 24px 16px` sets the top to 8px, the left and right to 24px, and the bottom to 16px.",
            "`padding: 1px 2px 3px 4px` sets top, right, bottom and left, in that order.",
          ],
        },
        {
          type: "paragraph",
          text: "To change just one side, use `padding-top`, `padding-right`, `padding-bottom` or `padding-left`. Margin works in exactly the same way.",
        },
        { type: "heading", text: "Borders: width, style and colour" },
        {
          type: "paragraph",
          text: "The `border` shorthand combines a width, a style and a colour, in any order. The style is required: without one (`solid`, `dashed`, `dotted`), no border is drawn at all, whatever the width. Separately, `border-radius` rounds the corners of the box.",
        },
        {
          type: "code",
          language: "css",
          code: ".note {\n  border: 2px dashed #94a3b8;\n  border-radius: 8px;\n  border-left: 6px solid #4f46e5;\n}",
          caption: "A dashed border with one thick solid side",
        },
        { type: "heading", text: "Margins: collapsing and centring" },
        {
          type: "paragraph",
          text: "Two things about margins surprise nearly everyone. First, vertical margins between neighbouring blocks **collapse**: if one block has a `24px` bottom margin and the block below has a `16px` top margin, the gap is `24px`, not `40px`. The larger margin wins. Second, setting `margin-left` and `margin-right` to `auto` on a block with a set width splits the leftover space equally, which centres the block.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".container {\n  width: 600px;\n  margin: 0 auto;\n}",
            note: "A set width plus `auto` side margins centres the block horizontally.",
          },
          bad: {
            code: ".container {\n  margin: 0 auto;\n}",
            note: "Without a width, the block already fills all the available space, so there is nothing left to share and nothing moves.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "Browsers give headings, paragraphs and lists default margins. If spacing looks bigger than what you wrote, inspect the element: it is usually the browser's default margin showing through.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Shorthand values go clockwise from the top: top, right, bottom, left.",
            "A border needs a width, a style and a colour, and `border-radius` rounds the corners.",
            "Vertical margins between blocks collapse to the larger one.",
            "`margin: 0 auto` centres a block, but only when it has a set width.",
          ],
        },
      ],
    },
    {
      id: "box-sizing-and-width",
      kind: "learn",
      title: "Box-sizing and the width trap",
      summary: "Why a box ends up wider than its width, and the one line that fixes it.",
      minutes: 9,
      concept: {
        description:
          "By default, `width` and `height` set only the size of the content area, and the padding and border are added on top. `box-sizing: border-box` changes that, so that the width includes the padding and border.",
        why: "The default makes simple sums surprising: a box with `width: 100%` plus some padding sticks out past its parent. Almost every modern stylesheet switches to `border-box`, so that a width means exactly what it says.",
        mentalModel:
          "With `content-box`, the width is the inside of the frame. With `border-box`, the width is the outside edge of the frame.",
      },
      body: [
        { type: "heading", text: "Doing the sum" },
        {
          type: "paragraph",
          text: "With the default `content-box`, the horizontal space a box occupies is its width, plus its left and right padding, plus its left and right border.",
        },
        {
          type: "code",
          language: "css",
          code: ".box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid #4f46e5;\n}\n\n/* 200 + 20 + 20 + 5 + 5 = 250px on screen */",
          caption: "content-box (the default)",
        },
        {
          type: "paragraph",
          text: "Switch the same rule to `border-box` and the box is 200px wide in total. The border and padding are carved out of that 200px, which leaves 150px for the content.",
        },
        { type: "heading", text: "The 100% trap" },
        {
          type: "paragraph",
          text: "The classic bug is a box with `width: 100%` and some padding. Under `content-box`, that 100% measures only the content, so adding padding makes the whole box wider than its parent, and it overflows. This is why a layout can look fine until you add padding and suddenly gain a horizontal scrollbar.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: "* {\n  box-sizing: border-box;\n}\n\n.panel {\n  width: 100%;\n  padding: 24px;\n}",
            note: "With border-box, the 100% includes the padding, so the panel fits its parent exactly.",
          },
          bad: {
            code: ".panel {\n  width: 100%;\n  padding: 24px;\n}",
            note: "With the default content-box, the panel is 100% plus 48px wide, so it sticks out of its parent.",
          },
        },
        { type: "heading", text: "Limits instead of fixed sizes" },
        {
          type: "paragraph",
          text: "Fixed widths cause trouble on small screens. `max-width` sets a ceiling instead, and `min-width` sets a floor. A box with `width: 100%` and `max-width: 600px` fills a small screen and stops growing on a large one. Remember that a percentage width is measured against the parent's content area, not the whole window.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Most projects begin with `*, *::before, *::after { box-sizing: border-box; }`. Add it once, and every width in your stylesheet means the full outer size.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Under `content-box`, total width is width plus padding plus border.",
            "Under `border-box`, `width` is the total, and the content shrinks to make room.",
            "`width: 100%` plus padding overflows under `content-box`.",
            "Use `max-width` for a ceiling, and set `border-box` once for the whole page.",
          ],
        },
      ],
    },
    {
      id: "predict-the-width",
      kind: "predict",
      title: "Predict the width",
      summary: "Work out how wide each box really is before you run the code.",
      minutes: 6,
      mode: "css",
      intro:
        "Two boxes have exactly the same width, padding and border. The only difference is `box-sizing`. Do the arithmetic, then run the code to check.",
      code: {
        html: '<div class="box a">A</div>\n<div class="box b">B</div>',
        css: ".box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid #4f46e5;\n  margin-bottom: 12px;\n  background: #e0e7ff;\n}\n\n.a {\n  box-sizing: content-box;\n}\n\n.b {\n  box-sizing: border-box;\n}",
      },
      questions: [
        {
          prompt: "How wide is box A on screen, from the outer edge of its left border to the outer edge of its right border?",
          options: ["200px", "240px", "250px", "210px"],
          answerIndex: 2,
          hint: "Box A uses `content-box`, so `width` is only the content.",
          explanation: "Content 200px, plus 20px of padding on each side (40px), plus 5px of border on each side (10px), makes 250px in total.",
          proves: [
            { type: "computedStyle", selector: ".a", property: "box-sizing", expected: "content-box", message: "Box A uses `content-box`." },
            { type: "computedStyle", selector: ".a", property: "padding-left", expected: "20px", message: "Box A has `20px` of padding." },
            { type: "computedStyle", selector: ".a", property: "border-left-width", expected: "5px", message: "Box A has a `5px` border." },
          ],
        },
        {
          prompt: "How wide is box B on screen?",
          options: ["250px", "210px", "160px", "200px"],
          answerIndex: 3,
          hint: "Box B uses `border-box`. What does `width` include now?",
          explanation: "With `border-box`, the `200px` width already includes the padding and border, so the box is exactly 200px wide.",
          proves: [
            { type: "computedStyle", selector: ".b", property: "box-sizing", expected: "border-box", message: "Box B uses `border-box`." },
            { type: "computedStyle", selector: ".b", property: "width", expected: "200px", message: "Box B has a `200px` width." },
          ],
        },
        {
          prompt: "How much room is left for the text inside box B?",
          options: ["200px", "150px", "160px", "250px"],
          answerIndex: 1,
          hint: "Take the padding and the border out of the 200px.",
          explanation: "200px minus 40px of padding minus 10px of border leaves 150px for the content.",
          proves: [
            { type: "computedStyle", selector: ".b", property: "padding-right", expected: "20px", message: "Box B has `20px` of padding." },
            { type: "computedStyle", selector: ".b", property: "border-right-width", expected: "5px", message: "Box B has a `5px` border." },
          ],
        },
      ],
    },
    // Guided build: step files live in ./box-model/workshops/build-a-profile-card (compiled by `npm run build:content`).
    buildAProfileCard,
    {
      id: "debug-the-overflowing-panel",
      kind: "debug",
      title: "Debug: the panel that sticks out",
      summary: "The white panel pokes out past its container. Find out why and fix it.",
      minutes: 7,
      mode: "css",
      broken: {
        html: '<div class="container">\n  <div class="panel">This panel should fit inside the grey container, with its padding and border, without sticking out.</div>\n</div>',
        css: "body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }\n\n.container {\n  width: 400px;\n  background: #e2e8f0;\n}\n\n.panel {\n  width: 100%;\n  padding: 24px;\n  border: 4px solid #4f46e5;\n  background: white;\n}\n",
      },
      challenge: {
        title: "Make the panel fit its container",
        description:
          "The panel is set to `width: 100%`, so it should fit exactly inside the grey container. Instead, its right edge sticks out past the container. Fix the CSS so the panel fits, but keep its `24px` of padding and its `4px` border.",
        hints: [
          "The panel's width is `100%` of the container, and then the padding and the border are added on top of that. Which property decides whether they are added on top or included?",
          "`box-sizing` controls what `width` measures. The default is `content-box`.",
          "Add `box-sizing: border-box;` to `.panel`, and leave the padding and the border exactly as they are.",
        ],
        checks: [
          { type: "computedStyle", selector: ".panel", property: "box-sizing", expected: "border-box", message: "The panel's width includes its padding and border (`box-sizing: border-box`)." },
          { type: "computedStyle", selector: ".panel", property: "padding-top", expected: "24px", message: "The panel keeps its `24px` of padding." },
          { type: "computedStyle", selector: ".panel", property: "border-top-width", expected: "4px", message: "The panel keeps its `4px` border." },
        ],
        solution: {
          html: '<div class="container">\n  <div class="panel">This panel should fit inside the grey container, with its padding and border, without sticking out.</div>\n</div>',
          css: "body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }\n\n.container {\n  width: 400px;\n  background: #e2e8f0;\n}\n\n.panel {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 24px;\n  border: 4px solid #4f46e5;\n  background: white;\n}\n",
        },
      },
    },
    {
      id: "box-model-quiz",
      kind: "quiz",
      title: "Quiz: the box model",
      summary: "Ten questions on layers, shorthand, margins and box-sizing.",
      minutes: 8,
      passPercent: 70,
      questions: [
        {
          prompt: "What is the order of the box-model layers, from the inside out?",
          options: ["Content, border, padding, margin", "Content, padding, border, margin", "Padding, content, margin, border", "Margin, border, padding, content"],
          answerIndex: 1,
          explanation: "The content is in the middle, wrapped by padding, then the border, and finally the margin on the outside.",
        },
        {
          prompt: "Which layer is always transparent and never shows the element's own background?",
          options: ["Padding", "Border", "Content", "Margin"],
          answerIndex: 3,
          explanation: "Margin is empty space outside the border. The background fills the content, padding and (underneath) the border, but never the margin.",
        },
        {
          prompt: "What does `padding: 10px 20px;` set?",
          options: ["10px top and bottom, 20px left and right", "10px left and right, 20px top and bottom", "10px on top, 20px on the other three sides", "10px on all sides, plus 20px extra on the right"],
          answerIndex: 0,
          explanation: "Two values mean vertical then horizontal: the first is top and bottom, the second is left and right.",
        },
        {
          prompt: "This box uses the default `box-sizing`. How wide is it on screen?",
          code: { language: "css", code: ".box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid;\n}" },
          options: ["200px", "240px", "250px", "210px"],
          answerIndex: 2,
          explanation: "With `content-box`: 200 plus 20 plus 20 for the padding, plus 5 plus 5 for the border, makes 250px.",
        },
        {
          prompt: "A border is set to `3px` wide, but nothing appears. What is the most likely cause?",
          options: ["No border style, such as `solid`, is set", "3px is too thin to show", "Borders also need a margin", "`border-radius` is missing"],
          answerIndex: 0,
          explanation: "A border needs a style. Without one, the browser draws no border at all, whatever width you give it.",
        },
        {
          prompt: "Which declaration makes `width` include the padding and the border?",
          options: ["`box-sizing: content-box`", "`overflow: hidden`", "`box-sizing: border-box`", "`display: block`"],
          answerIndex: 2,
          explanation: "`box-sizing: border-box` makes the width the outer size, so the content area shrinks to make room for the padding and border.",
        },
        {
          prompt: "Block A has `margin-bottom: 24px`. The block directly below it has `margin-top: 16px`. How big is the gap between them?",
          options: ["40px", "16px", "8px", "24px"],
          answerIndex: 3,
          explanation: "Vertical margins between neighbouring blocks collapse, and the larger one wins, so the gap is 24px, not 40px.",
        },
        {
          prompt: "How do you centre a block horizontally when it has a fixed width?",
          options: ["`padding: auto`", "`margin: 0 auto`", "`text-align: center` on the block itself", "`align: center`"],
          answerIndex: 1,
          explanation: "`auto` left and right margins split the leftover horizontal space equally, which centres the block. It needs a set width to have leftover space.",
        },
        {
          prompt: "Why does a box with `width: 100%` and `padding: 24px` overflow its parent by default?",
          options: ["Percentage widths are ignored when there is padding", "The parent has no padding", "Borders are always added to the height", "Padding is added outside the width, so the total is 100% plus 48px"],
          answerIndex: 3,
          explanation: "Under `content-box`, the 100% covers only the content. The 24px of padding on each side is added on top, so the box ends up 48px too wide.",
        },
        {
          prompt: "Which statement is true of inline elements such as `span`?",
          options: ["They always start on a new line", "They can't have padding", "They ignore width, height and vertical margins", "They fill the full width of their parent"],
          answerIndex: 2,
          explanation: "Inline boxes flow like words in a line of text, so `width`, `height` and vertical margins don't apply. Use `inline-block` or `block` if you need them.",
        },
      ],
    },
    {
      id: "box-model-review",
      kind: "review",
      title: "Review: box model cheat sheet",
      summary: "The layers, the shorthand order and the sizing rule on one page.",
      minutes: 3,
      body: [
        { type: "heading", text: "The layers, inside out" },
        {
          type: "code",
          language: "css",
          code: ".box {\n  width: 300px;               /* content (when content-box) */\n  padding: 16px;               /* inside the border */\n  border: 2px solid #4f46e5;   /* width, style, colour */\n  margin: 24px;                /* outside the border */\n  box-sizing: border-box;      /* width includes padding + border */\n}",
        },
        { type: "heading", text: "Shorthand order" },
        {
          type: "code",
          language: "css",
          code: "margin: 8px;                /* all four */\nmargin: 8px 16px;           /* top-bottom  left-right */\nmargin: 8px 16px 24px;      /* top  left-right  bottom */\nmargin: 8px 16px 24px 4px;  /* top right bottom left (clockwise) */",
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "Padding is inside the border and shows the background. Margin is outside and is transparent.",
            "A border needs a style, such as `solid`, or it won't appear.",
            "Vertical margins between blocks collapse to the larger one.",
            "`margin: 0 auto` centres a block that has a set width.",
            "With the default `content-box`, total width = width + padding + border. With `border-box`, width is the total.",
            "Start every project with `*, *::before, *::after { box-sizing: border-box; }`.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "When a layout is the wrong size, inspect the element and read its box diagram before changing any CSS. The numbers usually show the cause.",
        },
      ],
    },
  ],
};

export default content;
