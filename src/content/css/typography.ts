import type { TopicContent } from "@/engine/types";
import buildABlogPost from "./typography/workshops/build-a-blog-post/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: "fonts-and-font-family",
      kind: "learn",
      title: "Fonts and font-family",
      summary: "How a font stack works, the generic families, and why every stack must end with a fallback.",
      minutes: 9,
      concept: {
        description:
          "The `font-family` property gives the browser a list of fonts in order of preference. The browser uses the first one that is installed (or loaded), and falls back to the next one if it is not. The list is called a **font stack**.",
        why: "You cannot know which fonts a visitor has installed. A good font stack makes your design degrade gracefully: the font you wanted when it exists, and a sensible, similar one when it does not.",
        mentalModel:
          "A font stack is a list of dinner invitations in order of preference. If the first restaurant is full, you try the second, and the last item on the list is always a place that cannot say no: a generic family.",
      },
      body: [
        { type: "heading", text: "A list of fonts, in order" },
        {
          type: "paragraph",
          text: "You write `font-family` as a comma-separated list. The browser checks each name from left to right and uses the first font it can find. Names that contain spaces, digits or punctuation, such as `\"Times New Roman\"` or `\"Source Sans 3\"`, should be wrapped in quotes. Single-word names such as `Georgia` and `Arial` do not need them. Browsers also fall back one character at a time, so if your first font has no glyph for a symbol, that one symbol comes from the next font.",
        },
        {
          type: "code",
          language: "css",
          code: `body {
  font-family: Georgia, "Times New Roman", serif;
}`,
          caption: "Georgia if it exists, then Times New Roman, then any serif font",
        },
        { type: "heading", text: "Generic families are the safety net" },
        {
          type: "paragraph",
          text: "A **generic family** is a keyword that always resolves to some font on every device. Always finish the stack with one, so the worst case is still a font of the right kind. The common ones are:",
        },
        {
          type: "list",
          items: [
            "`serif`: letters with small finishing strokes, such as Times or Georgia. Often used for long reading.",
            "`sans-serif`: letters without those strokes, such as Arial or Helvetica. Common for interfaces.",
            "`monospace`: every letter has the same width. Used for code.",
            "`system-ui`: the font the user's operating system uses for its own interface. It looks native on every device and loads instantly.",
            "`ui-monospace`, `ui-serif` and `ui-rounded`: the system's own monospace, serif and rounded fonts.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.article {
  font-family: "Source Sans 3", system-ui, sans-serif;
}`,
            note: "A preferred font, a native fallback and a generic family. If the first is missing, the page still looks deliberate.",
          },
          bad: {
            code: `.article {
  font-family: "Source Sans 3";
}`,
            note: "If that font is not installed or loaded, the browser uses its default, usually Times, and your design falls apart.",
          },
        },
        { type: "heading", text: "Which fonts can you rely on?" },
        {
          type: "paragraph",
          text: "Very few. Fonts such as Arial, Georgia, Verdana and Courier New are installed on most computers, which is why they are called web-safe, but even these vary between systems. The most dependable choice for interfaces is a system font stack, such as `system-ui, sans-serif`, which matches the device and needs nothing downloaded. If you want a distinctive font, you load it as a web font, which a later lesson covers.",
        },
        {
          type: "callout",
          tone: "note",
          text: "A stack that is exactly `monospace` makes some browsers shrink the default text size to about 13px. Writing `ui-monospace, monospace` avoids that surprise.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Set `font-family` once on `body`. It is inherited, so everything inside takes it. Override it only where you really need a different font, such as on `code`.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`font-family` is a prioritised list: the first font that is available wins.",
            "Quote font names that contain spaces, digits or punctuation.",
            "Always end the stack with a generic family such as `serif`, `sans-serif` or `monospace`.",
            "`system-ui` gives a native, instant-loading font. Set the main font once on `body`.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "font-size",
      kind: "learn",
      title: "Font size",
      summary: "The 16px default, why rem beats px for text, and what happens when em sizes stack.",
      minutes: 9,
      concept: {
        description:
          "`font-size` sets how big the text is. Browsers start at 16px by default, and a user can change that default in their settings. You can write the size as a fixed length such as `18px`, or as a relative one such as `1.125rem` or `120%`.",
        why: "Text size is the most important readability decision on a page. Relative sizes respect the person's own settings, while a fixed pixel size quietly overrides them, and that is a real problem for people who set a larger default because they need it.",
        mentalModel:
          "A relative size is a request: \"a bit bigger than whatever you normally read\". A pixel size is an order: \"exactly this big, whatever you prefer\".",
      },
      body: [
        { type: "heading", text: "The 16px default" },
        {
          type: "paragraph",
          text: "If you set no `font-size` at all, the browser uses its default, which is 16px unless the user changed it. Headings get their own sizes from the browser's built-in styles: an `h1` is `2em`, which is 32px at the default. Everything else inherits, so a size set on `body` flows down to all the text inside it.",
        },
        { type: "heading", text: "px, rem and em" },
        {
          type: "paragraph",
          text: "Pixels are fixed. `rem` stands for \"root em\" and is a multiple of the root element's font size, which is the browser default unless you change it, so `1.125rem` is 18px at the default size but grows if the user raised their default. `em` is a multiple of the font size of the element's **parent**, when you use it on `font-size`. `%` works like `em`: `120%` is the parent's size times 1.2.",
        },
        {
          type: "code",
          language: "css",
          code: `body {
  font-size: 1.125rem;
}

.small-print {
  font-size: 0.875rem;
}

h1 {
  font-size: 2.5rem;
}`,
          caption: "Sizes that scale with the user's own preferred text size",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `body {
  font-size: 1.125rem;
}`,
            note: "A relative size. If the user's default is 20px, this becomes 22.5px, and the design follows them.",
          },
          bad: {
            code: `body {
  font-size: 18px;
}`,
            note: "A fixed size. Whatever the person chose as their default is ignored, even if they need larger text.",
          },
        },
        { type: "heading", text: "When em sizes stack" },
        {
          type: "paragraph",
          text: "Because `em` on `font-size` is relative to the parent, nested elements multiply. If a list sits inside a list and each level is `font-size: 0.8em`, the inner one is 80% of 80%, which is 64%. That can make deep content shrink to nothing. `rem` avoids the compounding because it always refers to the root. A good habit is `rem` for font sizes and `em` for things that should scale with the text around them, such as padding on a button.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "A unitless font size such as `font-size: 16` is invalid. The browser ignores the declaration and keeps the inherited size. The only unitless length in CSS is `0`.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Do not try to make body text smaller than 1rem to \"look refined\". Small text is hard to read on phones, and large text is the cheapest accessibility win there is. Another lesson covers units in full.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "The browser default is 16px, and users can change it.",
            "Use `rem` for font sizes so the design respects the user's default. `em` and `%` are relative to the parent.",
            "Nested `em` sizes multiply, which is why `rem` is safer for text.",
            "A number with no unit is invalid for `font-size`. Keep body text at `1rem` or larger.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "font-weight-and-style",
      kind: "learn",
      title: "Font weight and style",
      summary: "The 100 to 900 weight scale, italic versus oblique, and why missing weights get faked.",
      minutes: 9,
      concept: {
        description:
          "`font-weight` sets how thick the strokes of the letters are, on a scale from 100 (thin) to 900 (black), with `400` as normal and `700` as bold. `font-style` switches between upright, italic and oblique letter shapes.",
        why: "Weight and style are the cheapest tools for building hierarchy: a heading is bolder, an emphasised word is slanted. Knowing how fonts really provide those weights explains why bold sometimes looks smeared, and why `semibold` does not work.",
        mentalModel:
          "A font family is a box of separate typefaces: one regular, one bold, maybe a light and an italic. `font-weight` and `font-style` pick which one to take out of the box. If the one you want is not in the box, the browser fakes it.",
      },
      body: [
        { type: "heading", text: "The weight scale" },
        {
          type: "paragraph",
          text: "`font-weight` accepts numbers from 1 to 1000, and in practice the nine round values from 100 to 900. The keywords `normal` and `bold` are shortcuts for `400` and `700`. The names designers use, such as Medium or Semibold, are not CSS keywords. You write them as numbers.",
        },
        {
          type: "list",
          items: [
            "`100` Thin, `200` Extra light, `300` Light.",
            "`400` Regular (`normal`), `500` Medium.",
            "`600` Semibold, `700` Bold (`bold`).",
            "`800` Extra bold, `900` Black.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `.label   { font-weight: 500; }
.heading { font-weight: 700; }
.display { font-weight: 800; }`,
          caption: "Numbers give you finer control than the `bold` keyword",
        },
        { type: "heading", text: "Which weights actually exist?" },
        {
          type: "paragraph",
          text: "Most fonts ship only a few weights, often regular and bold. If you ask for `600` and the family has only `400` and `700`, the browser picks the closest one. If you ask for bold and the font has no bold at all, the browser may **synthesise** one by smearing the regular letters, which looks clumsy. A **variable font** is one file that contains the whole range, so every number from 100 to 900 is real.",
        },
        { type: "heading", text: "Italic and oblique" },
        {
          type: "paragraph",
          text: "`font-style: italic` uses the font's designed italic letters, which often have a different shape, like the single-storey `a`. `oblique` simply slants the upright letters, and is what the browser falls back to if there is no italic. `normal` is upright. The `em` element is italic by default and `strong` is bold by default, and you should choose elements for their **meaning** (emphasis, importance) and use CSS to decide how they look.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.label {
  font-weight: 600;
}`,
            note: "A valid number. If the font has no 600, the browser uses the nearest weight it has.",
          },
          bad: {
            code: `.label {
  font-weight: semibold;
}`,
            note: "`semibold` is a design-tool name, not a CSS keyword. The declaration is invalid and is ignored.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "`lighter` and `bolder` are relative: they step the weight up or down from the parent's weight. They work, but explicit numbers are easier to reason about.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Do not load every weight you can think of. Each weight is a separate file, and most designs need only two or three: regular, medium or semibold, and bold.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`font-weight` runs from 100 to 900. `normal` is 400 and `bold` is 700. Names like `semibold` are not valid keywords.",
            "Fonts ship only some weights. Missing ones are rounded to the nearest, or faked by the browser.",
            "Variable fonts contain the whole weight range in one file.",
            "`italic` uses designed italic letters and `oblique` just slants the upright ones. Choose elements for meaning and CSS for looks.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "line-height",
      kind: "learn",
      title: "Line height",
      summary: "Why unitless line-height is the right default, and the comfortable range for body text and headings.",
      minutes: 9,
      concept: {
        description:
          "`line-height` sets the height of each line of text, including the space around the letters. It is the distance from one baseline to the next, and typographers call it leading. A good value makes paragraphs easy to follow from one line to the next.",
        why: "Line height is the setting that most changes how text feels. Too tight and lines crash into each other, and too loose and the paragraph falls apart. Using a unitless number also prevents a classic bug where headings inherit a line height that is too small for them.",
        mentalModel:
          "Each line of text sits in its own invisible row. `line-height` is the height of that row, and the text is centred inside it with the extra space shared above and below.",
      },
      body: [
        { type: "heading", text: "Unitless numbers" },
        {
          type: "paragraph",
          text: "You can write `line-height` as a number, a length or a percentage. The number form, such as `1.5`, means \"1.5 times this element's own font size\". With 16px text, that is 24px, and with 32px text it is 48px. The keyword `normal` lets the browser choose, usually around 1.2 depending on the font.",
        },
        {
          type: "code",
          language: "css",
          code: `body {
  line-height: 1.6;
}

h1,
h2 {
  line-height: 1.2;
}`,
          caption: "Body text gets room to breathe, big headings sit tighter",
        },
        { type: "heading", text: "Why unitless wins" },
        {
          type: "paragraph",
          text: "The difference shows up with inheritance. A unitless number is inherited **as the number**, so every child recalculates it against its own font size, and a large heading gets a large line height. A percentage, `em` or length is worked out once on the element where you wrote it, and the **resulting pixel value** is what children inherit. A `150%` set on a 16px body hands every heading a fixed 24px, which is far too small for 32px text, so its lines overlap.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `body {
  line-height: 1.5;
}`,
            note: "Every element multiplies by its own size: 24px for body text, 48px for a 32px heading.",
          },
          bad: {
            code: `body {
  line-height: 150%;
}`,
            note: "Computed once to 24px on the body, then inherited as 24px everywhere. A 32px heading is cramped.",
          },
        },
        { type: "heading", text: "How much is enough?" },
        {
          type: "paragraph",
          text: "A comfortable range for body text is 1.4 to 1.6. Longer lines need more, and short, wide-open text can have less. Headings are bigger, so the gap between lines looks larger, and they usually want 1.1 to 1.3. Accessibility guidance (WCAG text spacing) says content should keep working when a user forces line height up to 1.5 times the font size, so a body value of at least 1.5 is a safe default.",
        },
        {
          type: "callout",
          tone: "note",
          text: "The extra space is split evenly above and below the text inside each line. That is called half-leading, and it is why a larger line height also pushes the first line down a little.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "A line height of `1` or less makes tall letters touch the lines above and below. Avoid it for any text that runs onto more than one line.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`line-height: 1.5` means 1.5 times the element's own font size.",
            "Unitless numbers are inherited as numbers, so each element works out its own value. Percentages and lengths are inherited as fixed pixels.",
            "Body text: about 1.4 to 1.6. Large headings: about 1.1 to 1.3.",
            "Never go below about 1.2 for multi-line text, and keep at least 1.5 for body copy if you can.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "type-explorer",
      kind: "visualizer",
      title: "Type explorer",
      summary: "Drag size, line height, tracking, weight, family and alignment, and feel what each one does.",
      minutes: 10,
      concept: {
        description:
          "A sample article sits in a panel, and six controls change its font size, line height, letter spacing, weight, font family and alignment. Each change is written into the CSS, so the editor and the controls always agree.",
        why: "Typography is a feel you build by moving numbers back and forth. Seeing a paragraph go from cramped to comfortable in one slide teaches more than any rule of thumb.",
        mentalModel:
          "Think of a mixing desk with six faders. Each fader changes one quality of the text, and good typography is finding the combination where nothing stands out.",
      },
      stage: {
        html: '<div class="board">\n  <div class="sample">\n    <h3 class="sample-title">Reading on a screen</h3>\n    <p>Good typography is mostly invisible. When the size, spacing and weight are right, you read without thinking about the letters at all.</p>\n    <p>When something is off, every line becomes a small effort. Try the controls and notice where the text starts to feel hard to follow.</p>\n  </div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; }\n.board { height: 100%; box-sizing: border-box; overflow: auto; padding: 20px 24px; border-radius: 14px; background: #ffffff; color: #0f172a; }\n.sample-title { margin: 0 0 0.5em; }\n.sample p { margin: 0 0 0.9em; }",
        annotate: "none",
        target: ".sample",
        items: ".sample",
      },
      starter: `.sample {
  font-family: system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.1;
  letter-spacing: normal;
  font-weight: 400;
  text-align: left;
}
`,
      controls: [
        { id: "size", label: "font-size", selector: ".sample", property: "font-size", fallback: "16px", type: "range", min: 12, max: 32, step: 1, unit: "px", help: "Body text rarely feels right below 16px." },
        { id: "leading", label: "line-height", selector: ".sample", property: "line-height", fallback: "normal", type: "range", min: 1, max: 2.2, step: 0.05, help: "A plain number: a multiple of the font size." },
        { id: "tracking", label: "letter-spacing", selector: ".sample", property: "letter-spacing", fallback: "normal", type: "range", min: -2, max: 6, step: 0.5, unit: "px", help: "Space between letters. Small changes go a long way." },
        { id: "weight", label: "font-weight", selector: ".sample", property: "font-weight", fallback: "400", type: "options", options: ["300", "400", "500", "600", "700", "900"], help: "Not every font has every weight, so some steps look the same." },
        { id: "family", label: "font-family", selector: ".sample", property: "font-family", fallback: "serif", type: "options", options: ["system-ui, sans-serif", "Georgia, serif", "ui-monospace, monospace", "Verdana, sans-serif"], help: "The fonts you see depend on what your device has installed." },
        { id: "align", label: "text-align", selector: ".sample", property: "text-align", fallback: "left", type: "options", options: ["left", "center", "right", "justify"], help: "Justified text can leave uneven gaps in narrow columns." },
      ],
      presets: [
        { id: "comfortable", label: "Comfortable body", description: "18px with generous leading", css: ".sample { font-size: 18px; line-height: 1.6; letter-spacing: normal; font-weight: 400; }" },
        { id: "headline", label: "Tight headline", description: "big, bold and snug", css: ".sample { font-size: 30px; line-height: 1.1; letter-spacing: -1px; font-weight: 700; }" },
        { id: "editorial", label: "Editorial serif", description: "a classic reading style", css: ".sample { font-family: Georgia, serif; font-size: 19px; line-height: 1.7; letter-spacing: normal; font-weight: 400; }" },
        { id: "code", label: "Code feel", description: "monospace at a reading size", css: ".sample { font-family: ui-monospace, monospace; font-size: 15px; line-height: 1.5; letter-spacing: normal; }" },
        { id: "cramped", label: "Cramped (avoid)", description: "tiny, tight and squeezed", css: ".sample { font-size: 12px; line-height: 1; letter-spacing: -1px; font-weight: 400; }" },
      ],
      challenge: {
        title: "Make it comfortable to read",
        description:
          "The sample is small and its lines are squashed together. Turn it into comfortable body text: set `font-size` to `1.125rem` (18px at the default size) and `line-height` to `1.6`.",
        hints: [
          "Both changes go in the `.sample` rule.",
          "Use `rem` for the size, so it respects the user's own default.",
          "`font-size: 1.125rem;` and `line-height: 1.6;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".sample", property: "font-size", expected: ["1.125rem", "18px"], message: "The text size is `1.125rem`." },
          { type: "computedStyle", selector: ".sample", property: "line-height", expected: ["1.6", "28.8px"], message: "The line height is `1.6`." },
        ],
        solution: `.sample {
  font-family: system-ui, sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
  letter-spacing: normal;
  font-weight: 400;
  text-align: left;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-line-height",
      kind: "predict",
      title: "Predict the line height",
      summary: "Work out what a heading inherits from a unitless value and from a percentage.",
      minutes: 6,
      mode: "css",
      intro: "Two boxes use the same heading and paragraph. Box A sets `line-height: 1.5` and box B sets `line-height: 150%`. Predict what each heading ends up with, then run the code.",
      code: {
        html: `<div class="box a">
  <h2>Heading A</h2>
  <p>line-height: 1.5 on the box</p>
</div>
<div class="box b">
  <h2>Heading B</h2>
  <p>line-height: 150% on the box</p>
</div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
  font-size: 16px;
}

.box {
  margin-bottom: 12px;
  padding: 8px 12px;
  background-color: #eef2ff;
}

h2 {
  margin: 0 0 4px;
  font-size: 32px;
}

p {
  margin: 0;
}

.a { line-height: 1.5; }
.b { line-height: 150%; }`,
      },
      questions: [
        {
          prompt: "The `h2` is 32px, and box A sets `line-height: 1.5`. How tall is each line of the heading?",
          options: ["24px", "48px", "32px", "1.5px"],
          answerIndex: 1,
          hint: "A unitless number is inherited as a number. Each element multiplies it by its own font size.",
          explanation: "The number `1.5` is inherited as-is, and the heading multiplies it by its own 32px, giving 48px lines. The paragraph does the same with its 16px and gets 24px.",
        },
        {
          prompt: "Box B sets `line-height: 150%` instead. What line height does the 32px heading inherit?",
          options: ["48px", "150px", "32px", "24px: the percentage was turned into a length on the box, and that length is inherited"],
          answerIndex: 3,
          hint: "A percentage is worked out where you write it, against that element's own font size, and the result is inherited.",
          explanation: "On box B the percentage is calculated against the box's 16px, giving 24px. That fixed length is passed down, so the 32px heading gets lines only 24px tall, and a heading that wraps would have its lines crowding each other.",
        },
        {
          prompt: "What is the box B element's own computed line height?",
          options: ["24px", "150px", "1.5", "normal"],
          answerIndex: 0,
          hint: "150% of the box's own 16px font size.",
          explanation: "150% of 16px is 24px. Browsers report percentage and length line heights as pixel values, which is exactly what then gets inherited by the children.",
          proves: [{ type: "computedStyle", selector: ".b", property: "line-height", expected: ["150%", "24px"], message: "Box B's line height is 150% of 16px, which is 24px." }],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "letter-spacing-and-case",
      kind: "learn",
      title: "Letter spacing, word spacing and case",
      summary: "Tracking, text-transform and small caps, and when each one helps or hurts.",
      minutes: 8,
      concept: {
        description:
          "`letter-spacing` adds or removes space between every pair of letters, `word-spacing` does the same between words, and `text-transform` changes the case of the text without touching the HTML. `font-variant-caps` swaps in small capitals.",
        why: "Small spacing changes have a big effect on feel. Wide-spaced capitals look confident and labelled, tight large headlines look polished, and getting these wrong makes body text tiring to read.",
        mentalModel:
          "Letter spacing is the gap a typesetter leaves between metal blocks. A tiny nudge wider helps small capital letters breathe, and a tiny nudge tighter helps huge letters feel like one shape.",
      },
      body: [
        { type: "heading", text: "letter-spacing" },
        {
          type: "paragraph",
          text: "`letter-spacing` takes a length, and `normal` means \"the font's own spacing\". Positive values spread the letters apart, and negative values pull them closer. Because the effect depends on the size of the text, write it in `em`: `0.1em` means a tenth of the current font size, so it scales when the text does. A value in pixels stays the same size however big the text gets.",
        },
        {
          type: "code",
          language: "css",
          code: `.eyebrow {
  font-size: 0.8125rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-title {
  font-size: 3rem;
  letter-spacing: -0.02em;
}`,
          caption: "Spaced small capitals above a slightly tightened headline",
        },
        {
          type: "paragraph",
          text: "As a rule, **small capitals and short labels want a little extra space**, and **very large headlines want a little less**. Body text in lowercase should be left alone: the font designer already tuned its spacing for reading.",
        },
        { type: "heading", text: "word-spacing" },
        {
          type: "paragraph",
          text: "`word-spacing` adds space at each word gap, and it is used far less often. A small positive value can loosen very tight, justified text, but most designs never touch it. Like letter spacing, `em` is the better unit.",
        },
        { type: "heading", text: "text-transform and small caps" },
        {
          type: "paragraph",
          text: "`text-transform` has the values `uppercase`, `lowercase`, `capitalize` and `none`. It changes only how the text is shown, so the HTML and what a search engine or screen reader sees stays as you typed it. Writing a label in capitals inside the HTML is worse, because some assistive tools then read it letter by letter. `capitalize` upper-cases the first letter of every word, which is not proper title case, since it also capitalises words like \"and\".",
        },
        {
          type: "paragraph",
          text: "`font-variant-caps: small-caps` shows lowercase letters as smaller capitals. It looks best when the font includes real small capitals. If it does not, the browser shrinks full capitals, which look too light.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.label {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}`,
            note: "`em` spacing grows and shrinks with the label, so the proportions stay right at every size.",
          },
          bad: {
            code: `.label {
  letter-spacing: 3px;
  text-transform: uppercase;
}`,
            note: "A pixel value does not follow the text size. If the label is made bigger, the spacing looks too tight, and if smaller, too wide.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "Do not add letter spacing to long lowercase paragraphs, and avoid whole paragraphs in capitals. Capital letters have uniform shapes, so reading them takes longer, and a non-zero letter spacing turns off ligatures in some fonts.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`letter-spacing` widens or tightens every letter gap. Use `em` so it scales with the text.",
            "Small capitals and labels like a little extra space. Huge headlines like a little less.",
            "`text-transform` changes how text is displayed without changing the HTML, so prefer it to typing capitals.",
            "Leave body text spacing alone, and avoid long runs of capitals.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-style-a-heading",
      kind: "lab",
      title: "Lab: style a heading block",
      summary: "Set family, size, weight, line height, spacing and case on a small heading block.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<header class="intro">
  <p class="eyebrow">Design notes</p>
  <h1 class="title">Type that people actually read</h1>
  <p class="lede">Four settings decide whether a page feels calm or tiring.</p>
</header>`,
        css: `body {
  margin: 0;
  padding: 32px;
  max-width: 640px;
  font-family: system-ui, sans-serif;
}

.eyebrow {
  margin: 0 0 8px;
}

.title {
  margin: 0 0 12px;
}

.lede {
  margin: 0;
}
`,
      },
      challenge: {
        title: "Style the heading block",
        description:
          "Make the title serif and strong: `font-family` `Georgia, \"Times New Roman\", serif`, `font-size` `2.5rem`, `font-weight` `800` and `line-height` `1.1`. Turn the eyebrow into spaced capitals with `text-transform: uppercase` and `letter-spacing: 0.12em`. Finally, give the lede `font-size: 1.25rem` and `line-height: 1.5`.",
        hints: [
          "All eight values go into the three rules that already exist: `.eyebrow`, `.title` and `.lede`.",
          "The title needs four declarations, the eyebrow needs two and the lede needs two.",
          "Line heights are plain numbers with no unit, and the letter spacing is in `em`.",
          "`.title { font-family: Georgia, \"Times New Roman\", serif; font-size: 2.5rem; font-weight: 800; line-height: 1.1; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".title", property: "font-family", expected: ["Georgia, \"Times New Roman\", serif"], message: "The title uses `Georgia, \"Times New Roman\", serif`." },
          { type: "computedStyle", selector: ".title", property: "font-size", expected: ["2.5rem", "40px"], message: "The title is `2.5rem`." },
          { type: "computedStyle", selector: ".title", property: "font-weight", expected: ["800"], message: "The title is weight `800`." },
          { type: "computedStyle", selector: ".title", property: "line-height", expected: ["1.1", "44px"], message: "The title's line height is `1.1`." },
          { type: "computedStyle", selector: ".eyebrow", property: "text-transform", expected: ["uppercase"], message: "The eyebrow is in capitals: `uppercase`." },
          { type: "computedStyle", selector: ".eyebrow", property: "letter-spacing", expected: ["0.12em", "1.92px"], message: "The eyebrow has `0.12em` letter spacing." },
          { type: "computedStyle", selector: ".lede", property: "font-size", expected: ["1.25rem", "20px"], message: "The lede is `1.25rem`." },
          { type: "computedStyle", selector: ".lede", property: "line-height", expected: ["1.5", "30px"], message: "The lede's line height is `1.5`." },
        ],
        solution: {
          html: `<header class="intro">
  <p class="eyebrow">Design notes</p>
  <h1 class="title">Type that people actually read</h1>
  <p class="lede">Four settings decide whether a page feels calm or tiring.</p>
</header>`,
          css: `body {
  margin: 0;
  padding: 32px;
  max-width: 640px;
  font-family: system-ui, sans-serif;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.title {
  margin: 0 0 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.1;
}

.lede {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "text-alignment",
      kind: "learn",
      title: "Text alignment and indent",
      summary: "text-align, why justified text can look bad, text-indent, and what alignment cannot do.",
      minutes: 8,
      concept: {
        description:
          "`text-align` controls how the lines of text inside a block line up horizontally: against the start edge, the end edge, in the centre, or stretched to fill the width (`justify`). `text-indent` pushes the first line of a paragraph in.",
        why: "Alignment shapes how a block of text looks and how easily the eye finds the start of each line. It is also the most common property people use for the wrong job, such as trying to centre a box with it.",
        mentalModel:
          "Imagine each line of text as a strip of paper that is pushed against the left wall, the right wall, or the middle of the room. `text-align` decides which wall. It moves the strips, never the room.",
      },
      body: [
        { type: "heading", text: "The alignment values" },
        {
          type: "paragraph",
          text: "`text-align` applies to the inline content inside a block, which means the text, the inline images and the inline-block elements in it. The values are `left`, `right`, `center` and `justify`. There are also two logical values, `start` and `end`, which follow the writing direction, so `start` is the left edge in English and the right edge in Arabic or Hebrew. The default is `start`.",
        },
        {
          type: "code",
          language: "css",
          code: `.card-title { text-align: center; }
.price      { text-align: right; }
.article    { text-align: start; }`,
          caption: "Alignment is chosen per block, and it is inherited by the content inside",
        },
        { type: "heading", text: "Why long text is left aligned" },
        {
          type: "paragraph",
          text: "For paragraphs in left-to-right languages, left (or `start`) alignment is best. The left edge stays perfectly straight, so the eye always knows where the next line begins, and the ragged right edge is easy to ignore. Centred text breaks that: every line begins in a different place, so it only suits short blocks such as headings and captions.",
        },
        {
          type: "paragraph",
          text: "`justify` makes both edges straight by stretching the spaces in each line. In a wide column, it can look neat. In a narrow column, there are too few words per line to share the extra space out, and you get uneven gaps called rivers. If you do use it, pair it with `hyphens: auto` and a `lang` attribute on the page, so the browser can break long words.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.article p {
  text-align: start;
}`,
            note: "A straight start edge makes long lines easy to follow, and it respects right-to-left languages.",
          },
          bad: {
            code: `.article p {
  text-align: center;
}`,
            note: "Every line starts in a different place, so reading a long paragraph is slow and tiring.",
          },
        },
        { type: "heading", text: "text-indent" },
        {
          type: "paragraph",
          text: "`text-indent` pushes only the **first line** of a block in by the length you give, such as `1.5em`. It is the book-style way to start paragraphs. Use it either with no space between paragraphs or with only a small one, but not both, since the two together are redundant.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "`text-align` aligns the content inside a block. It does not centre the block itself. To centre a block with a set width, use `margin-inline: auto`, and to centre things in two directions, use flexbox or grid.",
        },
        {
          type: "callout",
          tone: "note",
          text: "`text-align` is inherited, so setting `text-align: center` on a card centres everything inside it, including headings and paragraphs. Reset it where you need something different.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`text-align` has `left`, `right`, `center`, `justify`, and the logical `start` and `end`.",
            "Use `start` for long text, `center` only for short blocks, and be cautious with `justify` in narrow columns.",
            "`text-indent` indents only the first line of a block.",
            "`text-align` moves the content in a block, not the block itself. Use `margin-inline: auto` to centre a block.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "wrapping-and-overflow",
      kind: "learn",
      title: "Wrapping, overflow and truncation",
      summary: "How text breaks across lines, how to handle long words, and how to cut text off with an ellipsis.",
      minutes: 10,
      concept: {
        description:
          "By default the browser breaks a line of text at spaces and hyphens. Properties like `overflow-wrap`, `hyphens`, `white-space` and `text-overflow` let you change where lines break, stop them breaking, and shorten text that is too long with an ellipsis.",
        why: "Real content is messy: long URLs, long German words, user names and titles of every length. Without a plan, one long word can burst out of a card and break the whole layout.",
        mentalModel:
          "Text is like water in a pipe. It wraps at the places where it is allowed to bend, which are spaces and hyphens. These properties decide where else it may bend, and what happens when it simply cannot fit.",
      },
      body: [
        { type: "heading", text: "Long words that will not fit" },
        {
          type: "paragraph",
          text: "A word with no spaces, such as a long URL, cannot wrap, so it pushes past the edge of its box. `overflow-wrap: break-word` tells the browser to break such a word only when it would otherwise overflow. `overflow-wrap: anywhere` is similar, but it also lets the browser break the word when it works out the smallest possible size of a box, which matters in flex and grid layouts. `word-break: break-all` is much more aggressive and breaks any word at any point, so use it sparingly.",
        },
        {
          type: "code",
          language: "css",
          code: `.comment {
  overflow-wrap: anywhere;
}

.prose {
  hyphens: auto;
}`,
          caption: "`hyphens: auto` needs a language, for example `<html lang=\"en\">`",
        },
        { type: "heading", text: "Controlling spaces and line breaks" },
        {
          type: "paragraph",
          text: "The `white-space` property decides how spaces and newlines in the source are treated. `normal` collapses them and wraps, `nowrap` collapses them but never wraps, `pre` keeps them exactly as typed and never wraps, `pre-wrap` keeps them and still wraps, and `pre-line` keeps newlines but collapses extra spaces.",
        },
        { type: "heading", text: "Truncating with an ellipsis" },
        {
          type: "paragraph",
          text: "To cut a single line off with \"...\", you need three things together: the text must not wrap, it must be clipped, and the box must have a limited width. That is `white-space: nowrap`, `overflow: hidden` and `text-overflow: ellipsis`. Leave out any one of them and nothing happens. For several lines, a widely supported pattern uses `display: -webkit-box`, `-webkit-box-orient: vertical` and `-webkit-line-clamp: 3`.",
        },
        {
          type: "code",
          language: "css",
          code: `.card-title {
  max-width: 24ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,
          caption: "A one-line title that ends in an ellipsis when it is too long",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,
            note: "All three parts are present, so the title is clipped and shows an ellipsis.",
          },
          bad: {
            code: `.card-title {
  text-overflow: ellipsis;
}`,
            note: "On its own this does nothing. The text still wraps or overflows because it is not clipped and not kept on one line.",
          },
        },
        { type: "heading", text: "Nicer line breaks" },
        {
          type: "paragraph",
          text: "`text-wrap: balance` spreads the words of a short block, such as a heading, evenly over its lines, so you do not end up with a single word alone on the last line. It is supported in current versions of the major browsers, and limited to a handful of lines. `text-wrap: pretty` is a newer hint that avoids short last lines in paragraphs. Treat both as safe enhancements, since browsers that do not know them just wrap normally.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "Truncating hides information. Make sure the full text is available some other way, such as on a detail page or in a tooltip, and never truncate text people must read, like an error message.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`overflow-wrap: anywhere` or `break-word` stops long words overflowing. `hyphens: auto` needs a `lang` attribute.",
            "`white-space` controls how spaces and newlines are kept and whether text wraps.",
            "A one-line ellipsis needs `white-space: nowrap`, `overflow: hidden` and `text-overflow: ellipsis` together.",
            "`text-wrap: balance` tidies headlines, and `pretty` improves paragraphs. Both are safe enhancements.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "line-length-and-measure",
      kind: "learn",
      title: "Line length and the ch unit",
      summary: "Why 45 to 75 characters per line is the sweet spot, and how max-width in ch gets you there.",
      minutes: 8,
      concept: {
        description:
          "The **measure** is the number of characters on a line. Readers are most comfortable with about 45 to 75 characters, and the `ch` unit, which is the width of the digit `0` in the current font, lets you limit a block to roughly that many characters with `max-width: 65ch`.",
        why: "On a wide monitor, a paragraph that fills the whole window has lines of 150 characters or more. Readers lose their place when they jump back to the start of the next line, so a narrow column of text is one of the biggest improvements you can make.",
        mentalModel:
          "Reading is like walking a path and turning around at the end of each line. If the path is too long, you get lost on the way back. If it is too short, you keep turning and never settle into a rhythm.",
      },
      body: [
        { type: "heading", text: "A measure that suits the eye" },
        {
          type: "paragraph",
          text: "Studies and centuries of book design agree that lines of roughly 45 to 75 characters are best, with about 66 often quoted as ideal. Too short and the eye keeps jumping to the next line, making the text choppy. Too long and the eye struggles to find the start of the next line. Headings, captions and layout elements can be wider or narrower, and this rule is about running text.",
        },
        { type: "heading", text: "Using ch" },
        {
          type: "paragraph",
          text: "`ch` is a unit equal to the width of the `0` character in the element's font and size. Because it follows the font, `max-width: 65ch` gives roughly 65 average characters per line whether the text is 14px or 24px. Letters are usually a little narrower than `0`, so 65ch tends to fit around 70 to 75 real characters, which is still in the sweet spot.",
        },
        {
          type: "code",
          language: "css",
          code: `.article {
  max-width: 65ch;
  margin-inline: auto;
}`,
          caption: "A readable column, centred in the window",
        },
        {
          type: "paragraph",
          text: "Use `max-width`, not `width`. A `width: 65ch` would force the column to stay that wide even on a phone narrower than that, causing sideways scrolling, whereas `max-width` only sets a ceiling and lets the column shrink to fit. The `margin-inline: auto` pair centres the column when there is room to spare. Add some padding on the container too, so text never touches the edge of the screen on small devices.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.article {
  max-width: 65ch;
}`,
            note: "A ceiling of about 65 characters. On a narrow phone, the column simply becomes as narrow as the screen.",
          },
          bad: {
            code: `.article {
  width: 100%;
}`,
            note: "On a wide monitor, paragraphs stretch edge to edge with 150-character lines, which are tiring to read.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "Because `ch` depends on the element's own font, put the `max-width` on the same element whose font you will use for the text, or on one that inherits it, so that the measure stays predictable.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Line length and line height work together. Longer lines need more leading, so if you cannot shorten a line, increase `line-height` toward 1.6 or 1.7 to help the eye find its way back.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Aim for about 45 to 75 characters per line, roughly 66 at best.",
            "`ch` is the width of a `0` in the current font, so `max-width: 65ch` follows the text size.",
            "Use `max-width`, not `width`, so the column can shrink on small screens, and `margin-inline: auto` to centre it.",
            "Longer lines need more line height.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "measure-explorer",
      kind: "visualizer",
      title: "Measure explorer",
      summary: "Change the column width, text size, leading and alignment, and find where reading feels right.",
      minutes: 10,
      concept: {
        description:
          "An article sits in a panel, and five controls change the column width in `ch`, the text size, the line height, the alignment and how the headline wraps. You can feel the difference between a column that is too wide, too narrow and just right.",
        why: "Rules like \"45 to 75 characters\" become real only when you see them. Dragging the width from 20ch to 100ch makes it obvious why the middle of the range is the sweet spot.",
        mentalModel:
          "The width control is a pair of curtains closing in on the text. Pull them too close and the words jump around. Open them too wide and you get lost on every line.",
      },
      stage: {
        html: '<div class="page">\n  <article class="prose">\n    <h2 class="prose-title">A headline that is long enough to wrap onto more than one line</h2>\n    <p>The measure is the number of characters on a line. Readers follow text most easily when each line holds somewhere between forty-five and seventy-five characters, because the eye can travel to the end and find the start of the next line without effort.</p>\n    <p>Short lines make the eye jump too often, so reading feels choppy. Very long lines make it hard to find the next line, so readers lose their place. A column of about sixty-five characters is a comfortable middle.</p>\n  </article>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.page { height: 100%; box-sizing: border-box; overflow: auto; padding: 16px 20px; border-radius: 12px; background: #ffffff; color: #0f172a; }\n.prose p { margin: 0 0 1em; }\n.prose-title { margin: 0 0 0.5em; line-height: 1.2; }",
        annotate: "none",
        target: ".prose",
        items: ".prose",
      },
      starter: `body {
  font-size: 16px;
}

.prose {
  max-width: none;
  line-height: 1.3;
  text-align: left;
}

.prose-title {
  text-wrap: wrap;
}
`,
      controls: [
        { id: "size", label: "font-size", selector: "body", property: "font-size", fallback: "16px", type: "range", min: 14, max: 24, step: 1, unit: "px", help: "The ch unit follows the font size, so the column grows with the text." },
        { id: "width", label: "max-width", selector: ".prose", property: "max-width", fallback: "none", type: "range", min: 20, max: 100, step: 5, unit: "ch", help: "About 45 to 75 characters per line is the comfortable range." },
        { id: "leading", label: "line-height", selector: ".prose", property: "line-height", fallback: "normal", type: "range", min: 1.2, max: 2, step: 0.05, help: "Longer lines need more leading." },
        { id: "align", label: "text-align", selector: ".prose", property: "text-align", fallback: "left", type: "options", options: ["left", "center", "justify"], help: "Try justify on a narrow column and watch the gaps open up." },
        { id: "wrap", label: "headline wrap", selector: ".prose-title", property: "text-wrap", fallback: "wrap", type: "options", options: ["wrap", "balance", "pretty"], help: "`balance` evens out the lines of a headline. Support is good in current browsers." },
      ],
      presets: [
        { id: "wide", label: "Too wide", description: "100 characters per line", css: ".prose { max-width: 100ch; }" },
        { id: "narrow", label: "Too narrow", description: "about 20 characters", css: ".prose { max-width: 20ch; }" },
        { id: "comfortable", label: "Comfortable", description: "65ch with room to breathe", css: ".prose { max-width: 65ch; line-height: 1.6; text-align: left; }" },
        { id: "justified", label: "Justified, narrow", description: "see the uneven gaps", css: ".prose { max-width: 28ch; text-align: justify; }" },
        { id: "balanced", label: "Balanced headline", description: "text-wrap: balance", css: ".prose-title { text-wrap: balance; }" },
      ],
      challenge: {
        title: "Find a comfortable measure",
        description:
          "The article runs the full width of the panel, with tight lines. Limit the column to `65ch` with `max-width` and set the `line-height` to `1.6`, both on `.prose`.",
        hints: [
          "Both declarations go in the `.prose` rule.",
          "Use `max-width`, not `width`, so the column can still shrink on small screens.",
          "`max-width: 65ch;` and `line-height: 1.6;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".prose", property: "max-width", expected: ["65ch"], message: "The column is limited to `65ch`." },
          { type: "computedStyle", selector: ".prose", property: "line-height", expected: ["1.6"], message: "The line height is `1.6`." },
        ],
        solution: `body {
  font-size: 16px;
}

.prose {
  max-width: 65ch;
  line-height: 1.6;
  text-align: left;
}

.prose-title {
  text-wrap: wrap;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "text-decoration-and-links",
      kind: "learn",
      title: "Text decoration and links",
      summary: "Underline control, link states in the right order, and why you should not remove link underlines.",
      minutes: 9,
      concept: {
        description:
          "`text-decoration` draws lines on text: underline, overline or line-through, with a style, a colour and a thickness. Together with the link pseudo-classes, it controls how links look when they are unvisited, visited, hovered, pressed and focused.",
        why: "Links are the most important interactive text on a page, and people recognise them by their underline and colour. Styling them well, while keeping them obvious and reachable by keyboard, is a core typography and accessibility skill.",
        mentalModel:
          "An underline is a signpost saying \"you can click here\". You can repaint the signpost, but if you take it down entirely, many visitors will walk straight past.",
      },
      body: [
        { type: "heading", text: "Controlling the line" },
        {
          type: "paragraph",
          text: "The `text-decoration` shorthand combines a line (`underline`, `overline`, `line-through` or `none`), a style (`solid`, `dotted`, `dashed`, `wavy`), a colour and a thickness. You can also set them separately: `text-decoration-line`, `text-decoration-style`, `text-decoration-color` and `text-decoration-thickness`. The related `text-underline-offset` moves an underline further from the text, which makes it much easier to read where it crosses the tails of letters like `g` and `y`. Browsers already skip those tails by default, using `text-decoration-skip-ink: auto`.",
        },
        {
          type: "code",
          language: "css",
          code: `a {
  color: #4338ca;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}`,
          caption: "A thicker underline, lifted a little below the text",
        },
        { type: "heading", text: "Link states, in order" },
        {
          type: "paragraph",
          text: "A link can be in several states at once, and later rules win over earlier ones with the same specificity. The reliable order is `:link`, `:visited`, `:hover`, `:active`, remembered as LVHA, followed by `:focus-visible` for keyboard focus. Browsers limit what `:visited` can change, to colours only, so that a page cannot find out which sites you visited.",
        },
        {
          type: "code",
          language: "css",
          code: `a:link    { color: #4338ca; }
a:visited { color: #6d28d9; }
a:hover   { text-decoration-thickness: 3px; }
a:active  { color: #312e81; }
a:focus-visible {
  outline: 3px solid #4338ca;
  outline-offset: 3px;
}`,
          caption: "LVHA, plus a visible keyboard focus ring",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.article a {
  color: #4338ca;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}`,
            note: "The link keeps its underline, and gets a clearer one. People can see it is a link without relying on colour.",
          },
          bad: {
            code: `.article a {
  color: #4338ca;
  text-decoration: none;
}`,
            note: "Links in a paragraph now differ from the text only by colour, and many readers cannot tell them apart.",
          },
        },
        {
          type: "paragraph",
          text: "If you do style links without an underline, colour alone is not enough. Accessibility guidance (WCAG) asks that a link's colour have at least a 3:1 contrast against the surrounding text, and that something else, such as an underline, appears on hover and keyboard focus. In practice, the safest choice for links in a paragraph is simply to keep the underline, and spend your effort on making it look good with a thickness and an offset.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "Links inside running text should stay underlined, or be marked another clear way. Removing the underline is fine for navigation menus and buttons, where the position and shape already show they are clickable.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Never remove the focus outline without replacing it. Keyboard users need to see where they are, and `:focus-visible` shows the ring only when it is useful, so it does not appear on mouse clicks.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`text-decoration` sets line, style, colour and thickness. `text-underline-offset` lifts the line away from the text.",
            "Style link states in the order link, visited, hover, active, then add `:focus-visible`.",
            "`:visited` can only change colour, for privacy.",
            "Keep underlines on in-text links, and never remove the keyboard focus ring without a replacement.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-readable-article",
      kind: "lab",
      title: "Lab: a readable article",
      summary: "Set the body font, size, line height and column width, then size the title and byline.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<article class="article">
  <h1 class="title">The case for boring body text</h1>
  <p class="byline">By Ada Okafor</p>
  <p>Most pages set their text too small, too tight and far too wide. Readers rarely notice good body text, and that is exactly the point.</p>
  <p>When the size, spacing and column width are right, the words simply carry the reader along, line after line, without effort.</p>
</article>`,
        css: `body {
  margin: 0;
  padding: 24px;
}

.title {
  margin: 0 0 8px;
}

.byline {
  margin: 0 0 24px;
}

p {
  margin: 0 0 1em;
}
`,
      },
      challenge: {
        title: "Make the article readable",
        description:
          "Set the body text on `body`: `font-family` `Georgia, \"Times New Roman\", serif`, `font-size` `1.125rem` and `line-height` `1.6`. Limit the `.article` to `max-width: 65ch`. Then make `.title` `2.25rem` with `line-height` `1.2`, and `.byline` `0.875rem`.",
        hints: [
          "Three declarations go on `body`, because font properties are inherited by everything inside it.",
          "`max-width` goes on `.article`, and the `.title` and `.byline` rules each need font-size changes.",
          "Line heights have no unit. Sizes use `rem`. The column width uses `ch`.",
          "`body { font-family: Georgia, \"Times New Roman\", serif; font-size: 1.125rem; line-height: 1.6; }`",
        ],
        checks: [
          { type: "computedStyle", selector: "body", property: "font-family", expected: ["Georgia, \"Times New Roman\", serif"], message: "The body font is `Georgia, \"Times New Roman\", serif`." },
          { type: "computedStyle", selector: "body", property: "font-size", expected: ["1.125rem", "18px"], message: "The body text is `1.125rem`." },
          { type: "computedStyle", selector: "body", property: "line-height", expected: ["1.6", "28.8px"], message: "The body line height is `1.6`." },
          { type: "computedStyle", selector: ".article", property: "max-width", expected: ["65ch"], message: "The article column is `65ch` wide at most." },
          { type: "computedStyle", selector: ".title", property: "font-size", expected: ["2.25rem", "36px"], message: "The title is `2.25rem`." },
          { type: "computedStyle", selector: ".title", property: "line-height", expected: ["1.2", "43.2px"], message: "The title's line height is `1.2`." },
          { type: "computedStyle", selector: ".byline", property: "font-size", expected: ["0.875rem", "14px"], message: "The byline is `0.875rem`." },
        ],
        solution: {
          html: `<article class="article">
  <h1 class="title">The case for boring body text</h1>
  <p class="byline">By Ada Okafor</p>
  <p>Most pages set their text too small, too tight and far too wide. Readers rarely notice good body text, and that is exactly the point.</p>
  <p>When the size, spacing and column width are right, the words simply carry the reader along, line after line, without effort.</p>
</article>`,
          css: `body {
  margin: 0;
  padding: 24px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.125rem;
  line-height: 1.6;
}

.article {
  max-width: 65ch;
}

.title {
  margin: 0 0 8px;
  font-size: 2.25rem;
  line-height: 1.2;
}

.byline {
  margin: 0 0 24px;
  font-size: 0.875rem;
}

p {
  margin: 0 0 1em;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-broken-type",
      kind: "debug",
      title: "Debug: the type that will not apply",
      summary: "Six typography declarations are ignored or wrong. Find the typo in each.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<h1 class="title">Trail conditions</h1>
<p class="lede">Updated every morning by the ranger team.</p>
<p class="body-text">Expect mud on the lower path and snow above the ridge. Bring poles and a spare layer.</p>
<p class="caption">Photo taken on Tuesday morning</p>
<span class="tag">New</span>`,
        css: `body {
  font-family: Georgia, "Times New Roman" serif;
  padding: 16px;
}

.title {
  font-size: 40;
}

.lede {
  font-weight: semibold;
}

.body-text {
  line-height: 1.6px;
}

.caption {
  text-align: centre;
}

.tag {
  letter-spacing: 0.1;
}
`,
      },
      challenge: {
        title: "Fix every typography declaration",
        description:
          "Nothing in this page looks like the design. The body font is the browser default, the title has not changed size, the lede is not semibold, the paragraph lines are crushed together, the caption is not centred and the tag has no letter spacing. Fix each so that: the body uses `Georgia, \"Times New Roman\", serif`, the title is `2.5rem`, the lede is weight `600`, the paragraph line height is `1.6`, the caption is centred and the tag has `0.1em` letter spacing.",
        hints: [
          "Use the explain panel's Heads up card and DevTools, where invalid declarations are struck through.",
          "Look for: a missing comma, a number with no unit, a made-up weight name, a unit on a line-height that should have none, a misspelt keyword, and a spacing value with no unit.",
          "A font stack needs commas between names. `40` needs a unit. `semibold` is a number. A plain line height has no unit. `centre` is spelled `center`. Non-zero lengths need a unit.",
        ],
        checks: [
          { type: "computedStyle", selector: "body", property: "font-family", expected: ["Georgia, \"Times New Roman\", serif"], message: "The body font is `Georgia, \"Times New Roman\", serif`." },
          { type: "computedStyle", selector: ".title", property: "font-size", expected: ["2.5rem", "40px"], message: "The title is `2.5rem`." },
          { type: "computedStyle", selector: ".lede", property: "font-weight", expected: ["600"], message: "The lede is weight `600`." },
          { type: "computedStyle", selector: ".body-text", property: "line-height", expected: ["1.6", "25.6px"], message: "The paragraph line height is `1.6`." },
          { type: "computedStyle", selector: ".caption", property: "text-align", expected: ["center"], message: "The caption is centred." },
          { type: "computedStyle", selector: ".tag", property: "letter-spacing", expected: ["0.1em", "1.6px"], message: "The tag has `0.1em` letter spacing." },
        ],
        solution: {
          html: `<h1 class="title">Trail conditions</h1>
<p class="lede">Updated every morning by the ranger team.</p>
<p class="body-text">Expect mud on the lower path and snow above the ridge. Bring poles and a spare layer.</p>
<p class="caption">Photo taken on Tuesday morning</p>
<span class="tag">New</span>`,
          css: `body {
  font-family: Georgia, "Times New Roman", serif;
  padding: 16px;
}

.title {
  font-size: 2.5rem;
}

.lede {
  font-weight: 600;
}

.body-text {
  line-height: 1.6;
}

.caption {
  text-align: center;
}

.tag {
  letter-spacing: 0.1em;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "the-font-shorthand",
      kind: "learn",
      title: "The font shorthand",
      summary: "The order of the font shorthand, what it requires, and the line-height reset that catches everyone.",
      minutes: 8,
      concept: {
        description:
          "`font` is a shorthand that sets several font properties at once: style, variant, weight, stretch, size, line height and family. It has a strict order, it requires a size and a family, and it **resets** every part you leave out.",
        why: "You will see `font:` all over real CSS, and it is also the source of one of the most common typography bugs: a `font` shorthand written after a `line-height` silently throws that line height away.",
        mentalModel:
          "The `font` shorthand is a form where every box must be filled in. Boxes you skip are not left alone: they are wiped back to their factory settings.",
      },
      body: [
        { type: "heading", text: "The order" },
        {
          type: "paragraph",
          text: "The shorthand is written as `font: style variant weight stretch size/line-height family`. Only the size and the family are required, and they must come last, in that order, with the family at the very end. The first four values are optional and can appear in any order among themselves. The line height, if you want one, is attached to the size with a slash.",
        },
        {
          type: "code",
          language: "css",
          code: `.pullquote {
  font: italic 600 1.25rem/1.4 Georgia, serif;
}

/* the same thing, written as longhands */
.pullquote {
  font-style: italic;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.4;
  font-family: Georgia, serif;
}`,
          caption: "One line that replaces five",
        },
        { type: "heading", text: "What it resets" },
        {
          type: "paragraph",
          text: "Any part you leave out is set back to its initial value, even if an earlier rule set it. A `font: 1rem Georgia, serif` therefore also sets `line-height` to `normal`, `font-weight` to `normal` and `font-style` to `normal`. That is why the order of your declarations matters. If a longhand comes **before** the shorthand, the shorthand wipes it out. If it comes **after**, the longhand wins.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  font: 1rem Georgia, serif;
  line-height: 1.6;
}`,
            note: "The shorthand first, then the longhand that adjusts it. The line height of 1.6 survives.",
          },
          bad: {
            code: `.card {
  line-height: 1.6;
  font: 1rem Georgia, serif;
}`,
            note: "The shorthand comes second and resets `line-height` to `normal`, so the 1.6 is lost without any warning.",
          },
        },
        {
          type: "paragraph",
          text: "A shorthand with a missing size or family is invalid as a whole, and the browser ignores the entire declaration. For example, `font: bold;` does nothing. There are also a few system keywords, such as `font: caption`, which take the font from the operating system's interface, but you will rarely need them.",
        },
        {
          type: "paragraph",
          text: "The reset behaviour is also useful. Form controls such as buttons and inputs do not inherit the page font by default, because browsers give them their own. Writing `button, input, select, textarea { font: inherit; }` copies the page's font style, size, line height and family into them in one line, which is why you will see it in almost every modern stylesheet.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Many teams avoid `font` for exactly this reason, and use the longhands, which never reset each other. If you do use the shorthand, put it first in the rule and write any longhand tweaks after it.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`font: style variant weight stretch size/line-height family`, with the size and family required and last.",
            "Any part you omit is reset to its initial value, including `line-height`.",
            "Write the shorthand before any longhands for the same element, or the shorthand will wipe them out.",
            "A shorthand with no size or no family is invalid and is ignored whole.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-font-shorthand",
      kind: "predict",
      title: "Predict the font shorthand",
      summary: "Work out which line heights survive a font shorthand, and which declaration does nothing.",
      minutes: 6,
      mode: "css",
      intro: "Four paragraphs use the `font` shorthand in different ways. Predict what each ends up with, then run the code.",
      code: {
        html: `<p class="a">Paragraph A</p>
<p class="b">Paragraph B</p>
<p class="c">Paragraph C</p>
<p class="d">Paragraph D</p>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

p {
  margin: 0 0 8px;
}

.a {
  line-height: 2;
  font: 1rem Georgia, serif;
}

.b {
  font: 1rem Georgia, serif;
  line-height: 2;
}

.c {
  font: italic 700 1.25rem/1.4 Georgia, serif;
}

.d {
  font: bold;
}`,
      },
      questions: [
        {
          prompt: "In paragraph A, `line-height: 2` is written before `font: 1rem Georgia, serif`. What line height does it end up with?",
          options: ["2, because it was written first", "normal, because the shorthand resets it", "1.4", "The whole rule is invalid"],
          answerIndex: 1,
          hint: "What happens to a part the shorthand does not mention?",
          explanation: "The `font` shorthand sets every part, and the ones you leave out go back to their initial values. Because it comes after the longhand, it wipes the `line-height: 2` out, leaving `normal`.",
        },
        {
          prompt: "Paragraph B puts the same two declarations in the opposite order. What line height does it get?",
          options: ["normal", "1", "2, because the longhand comes after the shorthand and wins", "1rem"],
          answerIndex: 2,
          hint: "Later declarations win when they set the same property.",
          explanation: "Now the shorthand comes first and `line-height: 2` is written after it, so the longhand overrides the reset value and the line height is 2.",
        },
        {
          prompt: "What does `.d { font: bold; }` do?",
          options: ["Nothing: a font shorthand must include a size and a family, so the declaration is invalid", "It makes the text bold", "It makes the text bold and 1rem", "It resets all fonts to the browser default"],
          answerIndex: 0,
          hint: "Which values does the shorthand require?",
          explanation: "A `font` shorthand needs at least a size and a family. `bold` alone is incomplete, so the browser drops the entire declaration. To make text bold, write `font-weight: bold`.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "web-fonts-and-font-face",
      kind: "learn",
      title: "Web fonts and @font-face",
      summary: "How to load your own fonts, what font-display does, and how to keep web fonts fast and safe.",
      minutes: 10,
      concept: {
        description:
          "A **web font** is a font file the browser downloads along with your page. You declare it with an `@font-face` rule, which gives the font a name and tells the browser where to find the file. After that, you use the name in `font-family` like any other font.",
        why: "System fonts are fast but look the same everywhere. A web font gives your page its own voice, but it costs download time, can make text jump while it loads, and has licensing and privacy implications. Doing it well matters.",
        mentalModel:
          "A system font is a tool already in the visitor's toolbox. A web font is a tool you post to them. It arrives a moment later, so you must decide what they see while they wait.",
      },
      body: [
        { type: "heading", text: "Declaring a font" },
        {
          type: "paragraph",
          text: "An `@font-face` rule defines a font family name of your choosing, a `src` with the file URL and its format, and the weight and style that file provides. Use **WOFF2**, the compressed format supported by all current browsers. If your file is a variable font, you can give a range of weights, such as `100 900`.",
        },
        {
          type: "code",
          language: "css",
          code: `@font-face {
  font-family: "Brand Serif";
  src: url("/fonts/brand-serif.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Brand Serif", Georgia, serif;
}`,
          caption: "Load the font, then use it with a fallback stack",
        },
        { type: "heading", text: "What to show while it loads" },
        {
          type: "paragraph",
          text: "Until the file arrives, the browser has to decide what to do. `font-display` is the setting for that. `swap` shows the fallback font straight away and swaps to the web font when it loads, so text is always readable, though it may shift slightly. `block` hides the text for a short time first. `fallback` and `optional` are stricter: they give the web font only a very short window, and `optional` may skip it completely on a slow connection. `swap` is the common choice for body text.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `@font-face {
  font-family: "Brand Serif";
  src: url("/fonts/brand-serif.woff2") format("woff2");
  font-display: swap;
}`,
            note: "Visitors can read the fallback text immediately. The page never sits blank waiting for a font.",
          },
          bad: {
            code: `@font-face {
  font-family: "Brand Serif";
  src: url("/fonts/brand-serif.woff2") format("woff2");
  font-display: block;
}`,
            note: "On a slow connection, the text can be invisible for a few seconds, and people may think the page is broken.",
          },
        },
        { type: "heading", text: "Keeping them fast and safe" },
        {
          type: "list",
          items: [
            "Load as few files as you can. Each weight and style is a separate download, unless you use a variable font.",
            "Use WOFF2, and subset the font to the characters you need. `unicode-range` can load a file only when those characters appear.",
            "Prefer self-hosting. Fonts from a third-party service involve extra connections and send visitors' addresses to another company.",
            "Check the licence. Many fonts may not be used on the web without paying for a web licence.",
            "Always list a fallback stack. It is what visitors see first, and what they get if the font fails.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          text: "In this app's preview, linked stylesheets such as Google Fonts links are blocked by the page's security policy, so you practise with system fonts here. `@font-face` itself works in real projects, and a font file served from your own site loads like any other asset.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`@font-face` names a font and points to its WOFF2 file. After that, use the name in `font-family`.",
            "`font-display: swap` shows fallback text right away and swaps when the font arrives.",
            "Load few files, subset, prefer self-hosting and check the licence.",
            "Always include a fallback stack that ends with a generic family.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "type-scale-and-hierarchy",
      kind: "learn",
      title: "Type scale and hierarchy",
      summary: "Choose sizes from a scale, build clear levels, and use more than size to show what matters.",
      minutes: 10,
      concept: {
        description:
          "A **type scale** is a short, planned list of font sizes, each a fixed ratio bigger than the last. **Hierarchy** is the way size, weight, colour and spacing together show the reader which text matters most and in what order to read it.",
        why: "Random sizes make a page feel messy, and sizes that are too close together make the structure invisible. A scale gives you a few deliberate steps, and a clear hierarchy lets people scan a page in seconds.",
        mentalModel:
          "A type scale is a staircase with evenly sized steps. You pick which step each kind of text stands on, and you never put text between the steps.",
      },
      body: [
        { type: "heading", text: "Sizes from a scale" },
        {
          type: "paragraph",
          text: "Start with a base size, usually `1rem`, and multiply it by a ratio again and again to go up, or divide to go down. Common ratios are 1.2 (a subtle scale), 1.25 and 1.333, with larger ones for dramatic headlines. With a ratio of 1.25, the steps are about 0.8rem, 1rem, 1.25rem, 1.563rem, 1.953rem and 2.441rem. You rarely need more than five or six sizes in a whole design.",
        },
        {
          type: "code",
          language: "css",
          code: `.text-sm { font-size: 0.8rem; }
body     { font-size: 1rem; }
.text-lg { font-size: 1.25rem; }
h3       { font-size: 1.563rem; }
h2       { font-size: 1.953rem; }
h1       { font-size: 2.441rem; }`,
          caption: "A scale with a 1.25 ratio",
        },
        { type: "heading", text: "Hierarchy needs more than size" },
        {
          type: "paragraph",
          text: "Size is only one tool. You can show importance through weight (a bold heading), colour (strong text colour for headings and a quieter one for secondary text), space (more room above a heading than below it, so it clearly belongs to the text that follows) and case (small capitals for labels). A good test is to squint at the page: you should still be able to tell the title from the sections and the sections from the body.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `h1 { font-size: 2.441rem; line-height: 1.15; }
h2 { font-size: 1.563rem; line-height: 1.25; }
p  { font-size: 1rem; line-height: 1.6; }`,
            note: "Clear steps between levels. Even at a glance, you can see what is a title, a section and body text.",
          },
          bad: {
            code: `h1 { font-size: 1.15rem; }
h2 { font-size: 1.1rem; }
p  { font-size: 1.05rem; }`,
            note: "The sizes are almost the same, so the page has no visible structure and everything competes for attention.",
          },
        },
        { type: "heading", text: "Fonts and rhythm" },
        {
          type: "paragraph",
          text: "Keep to one or two font families. A pairing works best when the two fonts are clearly different, such as a serif for headings with a sans-serif for body text, rather than two similar ones that look like a mistake. Use consistent spacing too: pick a few margin sizes in `rem` and reuse them, so the vertical rhythm of the page feels steady.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Give headings tighter line heights than body text, and keep the space above a heading bigger than the space below it. That makes each heading stick to the section it introduces.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A type scale multiplies a base size by a fixed ratio, such as 1.25, and gives you a few deliberate sizes.",
            "Hierarchy combines size, weight, colour, spacing and case, not size alone.",
            "Keep to one or two font families, clearly different if you use two.",
            "Use more space above a heading than below, so it belongs to the text after it.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "fluid-type-with-clamp",
      kind: "learn",
      title: "Fluid type with clamp()",
      summary: "Let headings grow smoothly with the viewport, within limits, without breaking zoom.",
      minutes: 9,
      concept: {
        description:
          "`clamp(min, preferred, max)` picks the preferred value, but never goes below the minimum or above the maximum. Used on `font-size`, it lets text grow smoothly with the width of the screen, between two limits you choose.",
        why: "A big headline that looks right on a desktop is too large on a phone, and the other way round. Fluid type replaces a pile of breakpoint overrides with one declaration, if it is built in a way that still respects the user's zoom.",
        mentalModel:
          "`clamp()` is a slider with two stops. The size glides with the window width, but it stops at the smallest size on small screens and at the biggest on large ones.",
      },
      body: [
        { type: "heading", text: "How clamp works" },
        {
          type: "paragraph",
          text: "`clamp()` takes three values. The middle value is the one the browser tries to use, and it is usually a mix of a viewport unit and a length. The first and last values are the floor and the ceiling. `min()` and `max()` are the single-sided versions: `min(100%, 40rem)` caps a value, and `max(1rem, 2vw)` sets a floor.",
        },
        {
          type: "code",
          language: "css",
          code: `h1 {
  font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem);
}`,
          caption: "24px on narrow screens, growing to 40px on wide ones",
        },
        {
          type: "paragraph",
          text: "Here is how to work out the middle value. Say you want 24px at a 400px viewport and 40px at 1200px. The size grows by 16px over 800px, which is 0.02 per pixel, or `2vw`. At 400px, `2vw` gives 8px, so you need 16px more, which is `1rem`. The preferred value is `1rem + 2vw`, and the limits are `1.5rem` and `2.5rem`.",
        },
        { type: "heading", text: "Do not break zoom" },
        {
          type: "paragraph",
          text: "A size made only of viewport units, such as `font-size: 5vw`, does not respond properly when a person zooms the page. Zooming makes the viewport smaller in CSS pixels by the same factor, so the `vw` size shrinks as fast as the zoom grows it, and the text never gets bigger. Mixing in a `rem` part, as in `1rem + 2vw`, keeps some of the user's scaling. As a common rule of thumb, keep the maximum no more than about 2.5 times the minimum.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `h1 {
  font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem);
}`,
            note: "A rem part keeps the size responsive to user settings and zoom, and the limits stop it getting silly.",
          },
          bad: {
            code: `h1 {
  font-size: 5vw;
}`,
            note: "Tiny on a phone, huge on a monitor, and it ignores zoom. There are no limits at all.",
          },
        },
        {
          type: "paragraph",
          text: "Because the maths is the same each time, it is worth deciding on your fluid sizes once, for each heading level, and reusing them everywhere. A typical set might be a fluid `h1`, a slightly less fluid `h2`, and a fixed size for everything below. That keeps the page consistent, and it means changing the whole scale later is a matter of editing a few values rather than hunting through the stylesheet.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use fluid sizes for headings and display text, where the change between screens is large. Body text usually works best at a steady `1rem` to `1.125rem`.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`clamp(min, preferred, max)` keeps a value between a floor and a ceiling.",
            "For fluid text, make the preferred value a mix of `rem` and `vw`, such as `1rem + 2vw`.",
            "Never use `vw` alone for text, because it does not respond to zoom.",
            "Fluid type suits headings. Body text is best left at a steady size.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "readability-and-accessibility",
      kind: "learn",
      title: "Readability and accessibility",
      summary: "Text that survives zoom, user spacing overrides and different readers, with the WCAG numbers to know.",
      minutes: 10,
      concept: {
        description:
          "Accessible typography means text that stays readable when people change things: zoom the page, raise their default size, override spacing or use a different device. The WCAG guidelines give concrete numbers for what must keep working.",
        why: "Roughly everyone benefits, from people with low vision to anyone reading on a train, and some of these rules are legal requirements in many places. Most of the work is not adding things, but avoiding the CSS that prevents people adjusting the text.",
        mentalModel:
          "Good typography is a house with movable furniture. Visitors should be able to rearrange it to suit themselves, and nothing should fall through the floor when they do.",
      },
      body: [
        { type: "heading", text: "Let people resize text" },
        {
          type: "paragraph",
          text: "Users must be able to enlarge text to 200% without losing content or function (WCAG 1.4.4), and the page must reflow to a single column without sideways scrolling at a width of 320 CSS pixels, which matches 400% zoom on a desktop (WCAG 1.4.10). To make this work, size text in `rem`, avoid fixed `height` on text containers, and never disable zoom with `user-scalable=no`.",
        },
        { type: "heading", text: "The text spacing test" },
        {
          type: "paragraph",
          text: "Some readers, including many with dyslexia, use tools that force looser spacing. WCAG 1.4.12 says your content must still work when a user sets line height to at least 1.5 times the font size, paragraph spacing to 2 times, letter spacing to 0.12 times and word spacing to 0.16 times. You do not have to use those values yourself. You must avoid code that breaks when they are applied, such as fixed heights that clip text, or `overflow: hidden` on a box that contains words.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  min-height: 8rem;
  padding: 1rem;
}`,
          caption: "`min-height` lets a card grow when text gets bigger. A fixed `height` would clip it",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.notice {
  min-height: 4rem;
  font-size: 1rem;
  line-height: 1.5;
}`,
            note: "The box grows with the text, so larger text or looser spacing never gets cut off.",
          },
          bad: {
            code: `.notice {
  height: 64px;
  overflow: hidden;
  font-size: 12px;
}`,
            note: "A fixed height with hidden overflow clips the text as soon as it is enlarged, and 12px is small to begin with.",
          },
        },
        { type: "heading", text: "Everyday readability habits" },
        {
          type: "list",
          items: [
            "Keep body text at `1rem` or larger, with strong contrast. A previous lesson covers the ratios.",
            "Keep lines to about 45 to 75 characters, and left align long text.",
            "Avoid long runs of capitals, long italic passages and justified text in narrow columns.",
            "Set the page language with `<html lang=\"en\">`, so screen readers, hyphenation and quotation marks behave correctly.",
            "Use real text, not images of text, so people can resize, search and translate it.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "Test your own page: zoom the browser to 200% and then 400%, set a larger default font size in the browser settings, and check nothing overlaps, gets clipped or needs sideways scrolling.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Size text in `rem` and let it grow to 200% and reflow at 320px wide without clipping.",
            "Content must survive line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size.",
            "Use `min-height`, not `height`, on text containers, and avoid `overflow: hidden` on text.",
            "Set `lang`, keep lines short, avoid long capitals and use real text, not pictures of text.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "special-typography",
      kind: "learn",
      title: "Numbers, quotes, drop caps and other details",
      summary: "Tabular numbers, first-letter styling, real quotation marks and the smaller tools that polish text.",
      minutes: 9,
      concept: {
        description:
          "Beyond size and spacing, CSS has a set of finer typographic tools: `font-variant-numeric` for how digits look, `::first-letter` and `::first-line` for styling the opening of a paragraph, `quotes` for the right quotation marks, and `text-shadow` and `font-synthesis` for special cases.",
        why: "These details are what make text feel professionally set. Aligned columns of figures, a proper opening letter, and the right quote marks for the language are small touches that readers notice without being able to say why.",
        mentalModel:
          "If font size and line height are the big dials on a mixing desk, these are the small switches at the side. You will not use them on every page, but when you need one, nothing else works.",
      },
      body: [
        { type: "heading", text: "Numbers that line up" },
        {
          type: "paragraph",
          text: "In many fonts, the digits have different widths, so a `1` is narrower than an `8`. That is nice in a sentence, but in a table or a changing counter, the columns wobble. `font-variant-numeric: tabular-nums` switches to digits that all have the same width, so figures in a column line up and a counter does not jiggle as it changes. Related values include `lining-nums`, `oldstyle-nums`, `slashed-zero` and `diagonal-fractions`. They only work if the font provides those forms.",
        },
        {
          type: "code",
          language: "css",
          code: `.price-table td {
  font-variant-numeric: tabular-nums;
  text-align: right;
}`,
          caption: "A column of prices that lines up on the digits",
        },
        { type: "heading", text: "The first letter and first line" },
        {
          type: "paragraph",
          text: "The `::first-letter` pseudo-element styles the first letter of a block, which is how you make a drop cap or a large opening initial. `::first-line` styles whatever fits on the first line, and changes as the window resizes. Only a few properties work on them, mainly fonts, colour and spacing. The newer `initial-letter` property makes proper drop caps, but its support is still partial, so test it before relying on it.",
        },
        {
          type: "code",
          language: "css",
          code: `.story p:first-of-type::first-letter {
  float: left;
  margin-right: 0.1em;
  font-size: 3.2em;
  line-height: 0.9;
  font-weight: 700;
}`,
          caption: "A classic drop cap made with a float",
        },
        { type: "heading", text: "Quotes and other details" },
        {
          type: "paragraph",
          text: "The `q` element inserts quotation marks for you, and the `quotes` property chooses which ones, such as curly double and single quotes for English or the guillemets used in French. They follow the language of the page when you set `lang`. For code, `tab-size` sets the width of a tab character. `text-shadow` adds a soft shadow, which is easy to overdo and can hurt readability on body text. `font-synthesis: none` stops the browser from faking bold and italic when a font lacks them, so you see the honest result.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.stat {
  font-variant-numeric: tabular-nums;
}`,
            note: "Digits all share one width, so a counter that ticks from 199 to 200 does not shift sideways.",
          },
          bad: {
            code: `.stat {
  letter-spacing: 0.05em;
}`,
            note: "Spacing out the letters does not fix uneven digit widths. It just makes the number wider and still jumpy.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "The lower-level `font-feature-settings` can turn on any OpenType feature by its four-letter code, but it overrides other settings and is harder to maintain. Use the `font-variant-*` properties first, and reach for it only when nothing else covers what you need.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`font-variant-numeric: tabular-nums` gives digits equal widths, so columns and counters stay steady.",
            "`::first-letter` and `::first-line` style the opening of a block. Only a few properties work on them.",
            "`quotes` and the `q` element give the right quotation marks for the page language.",
            "Use `text-shadow` sparingly, and `font-synthesis: none` to avoid faked bold and italic.",
          ],
        },
      ],
    },

    // Guided build: step files live in ./typography/workshops/build-a-blog-post (compiled by `npm run build:content`).
    buildABlogPost,

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-cramped-page",
      kind: "debug",
      title: "Debug: the cramped, clipped card",
      summary: "The text is tiny, tight, squeezed and cut off. Fix the settings that make it hard to read.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<article class="card">
  <h2 class="card-title">Weekend trail pass</h2>
  <p class="card-text">Valid on every marked route from Friday evening until Sunday night. Bring a printed or digital copy and show it at the gate. Passes cannot be transferred between visitors.</p>
</article>`,
        css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.card {
  width: 320px;
  height: 120px;
  overflow: hidden;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
}

.card-text {
  margin: 0;
  font-size: 11px;
  line-height: 1;
  letter-spacing: -0.05em;
  text-align: justify;
}
`,
      },
      challenge: {
        title: "Make the card readable",
        description:
          "This card fails almost every readability rule. The paragraph is tiny, its lines touch, its letters are squeezed together, it is justified in a narrow column, and the fixed card height cuts the text off. Fix it: give the card a `min-height` of `120px` instead of a fixed `height` (and remove the clipping), then set the paragraph to `font-size: 1rem`, `line-height: 1.5`, `letter-spacing: normal` and `text-align: left`.",
        hints: [
          "Five properties are wrong. Start with the card: a fixed `height` plus `overflow: hidden` is what cuts the text off.",
          "`height: 120px` becomes `min-height: 120px`, and `overflow: hidden` goes away. Then fix the four values on `.card-text`.",
          "`.card-text` needs a rem size, a unitless line height, `normal` letter spacing and left alignment.",
        ],
        checks: [
          { type: "computedStyle", selector: ".card", property: "min-height", expected: ["120px"], message: "The card has `min-height: 120px`, so it can grow." },
          { type: "computedStyle", selector: ".card-text", property: "font-size", expected: ["1rem", "16px"], message: "The paragraph is `1rem`." },
          { type: "computedStyle", selector: ".card-text", property: "line-height", expected: ["1.5", "24px"], message: "The paragraph line height is `1.5`." },
          { type: "computedStyle", selector: ".card-text", property: "letter-spacing", expected: ["normal"], message: "The paragraph has normal letter spacing." },
          { type: "computedStyle", selector: ".card-text", property: "text-align", expected: ["left"], message: "The paragraph is left aligned." },
        ],
        solution: {
          html: `<article class="card">
  <h2 class="card-title">Weekend trail pass</h2>
  <p class="card-text">Valid on every marked route from Friday evening until Sunday night. Bring a printed or digital copy and show it at the gate. Passes cannot be transferred between visitors.</p>
</article>`,
          css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.card {
  width: 320px;
  min-height: 120px;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
}

.card-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "typography-quiz",
      kind: "quiz",
      title: "Quiz: typography",
      summary: "Eighteen questions on fonts, size, spacing, wrapping, measure, web fonts and accessibility.",
      minutes: 14,
      passPercent: 70,
      questions: [
        {
          prompt: "Which declaration gives the browser a fallback if Georgia is not installed?",
          options: ["`font-family: Georgia;`", "`font-family: Georgia, serif;`", "`font-family: Georgia or serif;`", "`font-family: Georgia + serif;`"],
          answerIndex: 1,
          explanation: "A font stack is a comma-separated list. The browser uses the first font it has, and falls back to the next. Ending with `serif` guarantees some serif font.",
        },
        {
          prompt: "What should every font stack end with?",
          options: ["`!important`", "A pixel size", "A generic family such as `sans-serif`", "A web font"],
          answerIndex: 2,
          explanation: "A generic family always resolves to some font on every device, so it is the safety net when all the named fonts are missing.",
        },
        {
          prompt: "Why is `font-size: 1.125rem` better than `18px` for body text?",
          options: ["It renders more sharply", "It is shorter to type", "Pixel sizes are invalid for fonts", "It follows the user's own default text size"],
          answerIndex: 3,
          explanation: "`rem` is relative to the root font size, which the user can change in their browser settings. A pixel size ignores that preference.",
        },
        {
          prompt: "What happens with `font-size: 16;` (a number and no unit)?",
          options: ["The declaration is invalid and is ignored", "It is treated as 16px", "It is treated as 16rem", "It is treated as 16%"],
          answerIndex: 0,
          explanation: "Lengths need a unit, except for `0`. Without one, the declaration is invalid and the browser keeps the inherited size.",
        },
        {
          prompt: "What does `font-weight: semibold;` do?",
          options: ["It sets weight 600", "It is invalid and is ignored", "It sets weight 700", "It picks the nearest weight the font has"],
          answerIndex: 1,
          explanation: "`semibold` is a name used in design tools, not a CSS keyword. Write the number `600` instead.",
        },
        {
          prompt: "Why is a unitless `line-height` such as `1.5` safer than `150%`?",
          options: ["It is faster for the browser", "It only works in newer browsers", "Children recalculate it from their own font size instead of inheriting a fixed pixel value", "It ignores the user's zoom"],
          answerIndex: 2,
          explanation: "A unitless number is inherited as a number, so each element multiplies it by its own font size. A percentage is turned into pixels on the parent, and children inherit that fixed length.",
        },
        {
          prompt: "What is a comfortable `line-height` range for body text?",
          options: ["0.8 to 1.0", "1.0 to 1.1", "2.0 to 3.0", "1.4 to 1.6"],
          answerIndex: 3,
          explanation: "Lines of about 1.4 to 1.6 times the font size give the eye enough room. Large headings usually want less, around 1.1 to 1.3.",
        },
        {
          prompt: "Which unit is best for `letter-spacing` on a label whose size may change?",
          options: ["`em`, so it scales with the text", "`px`, so it never changes", "`vh`, so it follows the window height", "No unit at all"],
          answerIndex: 0,
          explanation: "`em` is relative to the element's font size, so the spacing keeps its proportions when the text is made bigger or smaller.",
        },
        {
          prompt: "Which three declarations must be used together to cut a single line off with an ellipsis?",
          options: ["`display: flex`, `overflow: auto`, `text-overflow: ellipsis`", "`white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis`", "`word-break: break-all`, `overflow: hidden`, `text-overflow: ellipsis`", "`text-overflow: ellipsis` on its own"],
          answerIndex: 1,
          explanation: "The text must stay on one line (`nowrap`), be clipped (`overflow: hidden`), and then `text-overflow: ellipsis` has something to replace. The box also needs a limited width.",
        },
        {
          prompt: "About how many characters per line are comfortable for running text?",
          options: ["10 to 20", "20 to 40", "45 to 75", "100 to 150"],
          answerIndex: 2,
          explanation: "Lines of roughly 45 to 75 characters let the eye travel along a line and find the start of the next one easily.",
        },
        {
          prompt: "Why use `max-width: 65ch` rather than `width: 65ch` for an article column?",
          options: ["`width` is not allowed with `ch`", "`max-width` makes the text bigger", "`width` cannot be centred", "`max-width` lets the column shrink on narrow screens, while `width` forces it to stay that wide"],
          answerIndex: 3,
          explanation: "`max-width` is only a ceiling, so a phone narrower than 65 characters just gets a narrower column. A fixed `width` would make the page scroll sideways.",
        },
        {
          prompt: "In what order should link states be written?",
          options: ["`:link`, `:visited`, `:hover`, `:active`", "`:hover`, `:active`, `:link`, `:visited`", "`:active`, `:hover`, `:visited`, `:link`", "`:visited`, `:link`, `:active`, `:hover`"],
          answerIndex: 0,
          explanation: "LVHA, link, visited, hover, active, lets the later, more specific states win. Add `:focus-visible` as well for keyboard users.",
        },
        {
          prompt: "What line height does `.a` end up with?",
          code: { language: "css", code: ".a {\n  line-height: 2;\n  font: 1rem Georgia, serif;\n}" },
          options: ["2", "normal, because the shorthand resets it", "1rem", "Georgia"],
          answerIndex: 1,
          explanation: "The `font` shorthand sets every font property, and anything it omits goes back to its initial value. Because it comes after `line-height: 2`, it wipes it out.",
        },
        {
          prompt: "What does `font-display: swap` do in an `@font-face` rule?",
          options: ["It hides the text until the font has loaded", "It stops the font loading at all", "It shows fallback text straight away, then swaps in the web font when it arrives", "It loads the font twice for reliability"],
          answerIndex: 2,
          explanation: "`swap` keeps the text visible while the font downloads, which is better for readers than waiting on a blank space.",
        },
        {
          prompt: "What does `font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem)` do?",
          options: ["It is always 2.5rem", "It is always 1.5rem", "It grows only with the window height", "It grows with the viewport width, but never goes below 1.5rem or above 2.5rem"],
          answerIndex: 3,
          explanation: "`clamp()` uses the middle value but keeps it between the first and last. The `rem` part also keeps the size responsive to the user's settings and zoom.",
        },
        {
          prompt: "WCAG says content should keep working when a user sets line height to at least how many times the font size?",
          options: ["1.5", "1.0", "2.5", "3"],
          answerIndex: 0,
          explanation: "WCAG 1.4.12 asks that content stay usable at a line height of 1.5, paragraph spacing of 2, letter spacing of 0.12 and word spacing of 0.16 times the font size.",
        },
        {
          prompt: "What is `font-variant-numeric: tabular-nums` for?",
          options: ["Making numbers bold", "Giving all digits the same width so columns of numbers line up", "Turning numbers into words", "Adding thousands separators"],
          answerIndex: 1,
          explanation: "Tabular numbers have equal widths, so figures in a table align and a counter does not shift sideways as its value changes.",
        },
        {
          prompt: "You want to centre a 400px-wide card in the page. Which is the right tool?",
          options: ["`text-align: center` on the card", "`font-align: center`", "`margin-inline: auto` on the card", "`vertical-align: middle`"],
          answerIndex: 2,
          explanation: "`text-align` centres the content inside a block, not the block itself. `margin-inline: auto` centres a block that has a set width.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "typography-review",
      kind: "review",
      title: "Review: typography cheat sheet",
      summary: "Every property, the numbers to remember and the common traps on one page.",
      minutes: 4,
      body: [
        { type: "heading", text: "The core properties" },
        {
          type: "code",
          language: "css",
          code: `body {
  font-family: system-ui, sans-serif;  /* always end with a generic family */
  font-size: 1.125rem;                 /* rem follows the user's default */
  font-weight: 400;                    /* 100-900; 400 normal, 700 bold */
  line-height: 1.6;                    /* unitless: a multiple of the font size */
}`,
        },
        { type: "heading", text: "Spacing, case and alignment" },
        {
          type: "code",
          language: "css",
          code: `.label {
  letter-spacing: 0.08em;     /* em scales with the text */
  text-transform: uppercase;  /* changes the display, not the HTML */
}
.article { text-align: start; }   /* left for long text */
.card    { margin-inline: auto; } /* centres a block, text-align does not */`,
        },
        { type: "heading", text: "Line length and wrapping" },
        {
          type: "code",
          language: "css",
          code: `.article { max-width: 65ch; }   /* 45-75 characters per line */
.comment { overflow-wrap: anywhere; }
.title {
  white-space: nowrap;          /* one-line ellipsis needs all three */
  overflow: hidden;
  text-overflow: ellipsis;
}
h1 { text-wrap: balance; }`,
        },
        { type: "heading", text: "Links, shorthand and web fonts" },
        {
          type: "code",
          language: "css",
          code: `a:link {}  a:visited {}  a:hover {}  a:active {}  a:focus-visible {}  /* LVHA + focus */
.q { font: italic 600 1.25rem/1.4 Georgia, serif; }  /* size + family required */
@font-face {
  font-family: "Brand Serif";
  src: url("/fonts/brand-serif.woff2") format("woff2");
  font-display: swap;
}
h1 { font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem); }`,
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "Set the font once on `body`. Font properties are inherited.",
            "A unitless `line-height` is inherited as a number. A `%`, `em` or length is inherited as fixed pixels.",
            "The `font` shorthand resets everything you leave out, so write it before any longhands.",
            "Aim for 16px or larger body text, 1.4 to 1.6 line height and 45 to 75 characters per line.",
            "Never use `vw` alone for text. Mix it with `rem`, and use `clamp()` to set limits.",
            "Use `min-height`, not `height`, on text containers, and avoid `overflow: hidden` on text.",
            "Keep link underlines in running text, and never remove the keyboard focus ring without a replacement.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "Test your type like a reader: zoom to 200%, raise the browser's default font size, squint at the page for hierarchy, and check that nothing clips or overlaps.",
        },
      ],
    },
  ],
};

export default content;
