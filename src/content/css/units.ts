import type { TopicContent } from "@/engine/types";
import buildALandingSection from "./units/workshops/build-a-landing-section/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: "what-is-a-css-unit",
      kind: "learn",
      title: "What is a CSS unit?",
      summary: "How lengths are written, which values need units, and the map of unit families.",
      minutes: 8,
      concept: {
        description:
          "A **unit** tells the browser what a number means. `16` is just a number, while `16px` is a length: sixteen pixels. CSS has several families of units: absolute (`px`), relative to text (`em`, `rem`), relative to the screen (`vw`, `vh`) and relative to a parent (`%`).",
        why: "Every size, space and gap in CSS needs a unit, and choosing the wrong one is behind most layouts that break on a phone, ignore a user's text settings or refuse to line up. Learning the families once makes every later choice quick.",
        mentalModel:
          "A number alone is like saying \"I walked 5\". Five what: metres, minutes, steps? The unit is the word after the number that makes the measurement mean something, and different units are measured against different rulers.",
      },
      body: [
        { type: "heading", text: "A number plus a unit, with no space" },
        {
          type: "paragraph",
          text: "A length is a number immediately followed by a unit: `16px`, `1.5rem`, `50%`. There must be no space between them, so `10 px` is invalid. The decimal separator is always a full stop, never a comma, so `1,5rem` is invalid too. Units are not case sensitive, so `10PX` works, but lowercase is the convention.",
        },
        {
          type: "paragraph",
          text: "There is one exception. The value `0` is the same in every unit, so you can write `margin: 0` without any unit. Any other length without a unit, such as `padding: 10`, is invalid, and the browser ignores the declaration.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  width: 20rem;      /* a length */
  padding: 1.5rem;   /* a length */
  margin: 0;         /* zero needs no unit */
  opacity: 0.8;      /* a plain number, not a length */
  line-height: 1.5;  /* a plain number, a multiple of the font size */
}`,
          caption: "Lengths need units. Some properties take plain numbers instead",
        },
        { type: "heading", text: "Not every number is a length" },
        {
          type: "paragraph",
          text: "Some properties expect a plain number: `opacity`, `z-index`, `flex-grow`, `font-weight` and `line-height`. Others expect a different kind of value, such as an angle (`90deg`), a time (`300ms`) or a percentage. The documentation names the kind with angle brackets, such as `<length>`, `<number>` or `<percentage>`. Writing `width: 50` is wrong because `width` wants a length or a percentage, and `opacity: 50%` is allowed only because modern CSS lets `opacity` take either.",
        },
        { type: "heading", text: "The families of units" },
        {
          type: "list",
          items: [
            "**Absolute:** `px`, `cm`, `mm`, `in`, `pt` and `pc`. They have fixed sizes relative to each other. The pixel is by far the most used.",
            "**Font-relative:** `em`, `rem`, `ch`, `ex`, `lh`. They are measured in terms of text: the font size, the width of a zero or the line height.",
            "**Viewport-relative:** `vw`, `vh`, `vmin`, `vmax`, and the newer `svh`, `lvh` and `dvh`. They are a percentage of the browser window.",
            "**Container-relative:** `cqw`, `cqh` and friends. They are measured against a container you choose.",
            "**Percentages:** `%`. These are measured against something the property decides, usually the parent.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.box {
  width: 12rem;
  margin: 0 auto;
}`,
            note: "Every length has a unit, and `0` is written plainly. The browser understands every value.",
          },
          bad: {
            code: `.box {
  width: 12;
  margin: 0 auto 1,5rem;
}`,
            note: "`12` has no unit, and `1,5rem` uses a comma. Both declarations are invalid and the browser silently ignores them.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Whatever unit you write, the browser turns it into pixels before it draws. Open the Computed panel in DevTools to see the final pixel value of any `rem`, `em`, `%` or `vw` you wrote.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A length is a number plus a unit with no space between them, and a full stop for decimals.",
            "`0` is the only length that needs no unit. Any other bare number is invalid for a length.",
            "Some properties take plain numbers, such as `opacity`, `z-index` and `line-height`.",
            "Units come in families: absolute, font-relative, viewport-relative, container-relative and percentages.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "pixels-and-absolute-units",
      kind: "learn",
      title: "Pixels and absolute units",
      summary: "What a CSS pixel really is, how the other absolute units relate to it, and where px is still the right choice.",
      minutes: 8,
      concept: {
        description:
          "`px` is the CSS pixel, a fixed unit that is the same size everywhere on the page. The other absolute units, `in`, `cm`, `mm`, `pt` and `pc`, are fixed multiples of it: one inch is exactly 96 CSS pixels.",
        why: "Pixels are the easiest unit to picture, which is why they are overused. Knowing what they really measure, and what they ignore, tells you where they belong, in borders and shadows, and where they do not, in text sizes.",
        mentalModel:
          "A CSS pixel is a fixed measuring stick. It is not a dot on the screen, but a unit of length that the browser maps onto whatever dots the screen has. The stick never changes, even when the user's preferences do.",
      },
      body: [
        { type: "heading", text: "A CSS pixel is not a screen pixel" },
        {
          type: "paragraph",
          text: "A CSS pixel is defined as 1/96 of an inch at a normal viewing distance. On a high-resolution display, such as a phone or a modern laptop, the screen packs two or three physical dots into each CSS pixel, a ratio called the device pixel ratio. That is why a `1px` border is still crisp on a high-resolution screen: the browser draws it using several real dots. When a user zooms the page to 200%, every CSS pixel simply becomes twice as large on screen.",
        },
        { type: "heading", text: "The other absolute units" },
        {
          type: "paragraph",
          text: "The remaining absolute units are defined in terms of the pixel, not the other way round. One inch is 96px, which is also 2.54cm or 25.4mm. One point (`pt`) is 1/72 of an inch, so about 1.33px, and one pica (`pc`) is 12 points, which is 16px. These units were designed for print, so they make sense in a print stylesheet, but on a screen they are just pixels with different names.",
        },
        {
          type: "code",
          language: "css",
          code: `.rule {
  border-top: 1px solid #cbd5e1;
}

.card {
  box-shadow: 0 4px 12px rgb(15 23 42 / 0.15);
}

@media print {
  body { font-size: 12pt; }
}`,
          caption: "Pixels for fine details, points only for print",
        },
        { type: "heading", text: "Where pixels belong" },
        {
          type: "paragraph",
          text: "Pixels are a good fit for things that should stay the same physical size however the text changes: borders, outlines, shadow offsets, thin dividers and small fixed details. They are a poor fit for font sizes and for the spacing around text, because a pixel value ignores the default text size the user chose in their browser, so it cannot grow for people who need larger text.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  border: 1px solid #cbd5e1;
  padding: 1.5rem;
}`,
            note: "A pixel border stays thin and sharp, while the padding follows the user's text size.",
          },
          bad: {
            code: `.card {
  border: 0.0625rem solid #cbd5e1;
  padding: 24px;
}`,
            note: "A border measured in rem can land on a fraction of a device pixel and look fuzzy, while the fixed padding ignores text settings.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "Page zoom, the browser's Ctrl and plus shortcut, scales pixel sizes along with everything else. What a pixel size does not follow is the **default font size** setting. That is the difference you will see in a later lesson.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A CSS pixel is 1/96 of an inch. It is a unit of length, not a dot on the screen.",
            "`1in` is `96px`, `2.54cm` and `72pt`. `pt` and `pc` are mainly for print.",
            "Use `px` for borders, outlines, shadows and thin details.",
            "Avoid `px` for font sizes and text spacing, because it ignores the user's default text size.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "em-units",
      kind: "learn",
      title: "The em unit",
      summary: "How em follows the element's own font size, why it compounds on font-size, and where it shines.",
      minutes: 9,
      concept: {
        description:
          "`em` is a length equal to the font size of the element it is used on. On `font-size` itself, it refers to the **parent's** font size. Because the base can change from element to element, `em` values scale along with the text.",
        why: "Used well, `em` makes a component scale as one piece: change its font size and the padding, icons and corners follow. Used carelessly, it multiplies down a chain of nested elements and produces sizes nobody intended.",
        mentalModel:
          "`em` is a rubber ruler that stretches with the text. On a 16px element, `1em` is 16px, and on a 24px element, the very same `1em` is 24px.",
      },
      body: [
        { type: "heading", text: "Relative to the element's own font size" },
        {
          type: "paragraph",
          text: "For nearly every property, `1em` means the computed `font-size` of the element itself. If a button has `font-size: 20px`, then `padding: 1em` gives it 20px of padding on every side, and `padding: 0.5em 1em` gives 10px above and below and 20px on the sides. Change the font size to 14px, and all of those values shrink in proportion without touching any other line.",
        },
        {
          type: "code",
          language: "css",
          code: `.btn {
  font-size: 1rem;
  padding: 0.75em 1.25em;
  border-radius: 0.5em;
}

.btn-lg {
  font-size: 1.25rem;
}`,
          caption: "The large button's padding and corners grow along with its text",
        },
        { type: "heading", text: "The exception: font-size itself" },
        {
          type: "paragraph",
          text: "On the `font-size` property, an element cannot refer to its own size, because that is what it is trying to set. So `font-size: 1.5em` means 1.5 times the **parent's** font size. This is where `em` causes trouble, because nested elements multiply. If a parent is 20px and a child is `1.5em`, the child is 30px. A grandchild that is also `1.5em` is then 45px, because it is 1.5 times its parent's 30px.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.note {
  font-size: 0.875rem;
}

.note .code {
  font-size: 0.875rem;
}`,
            note: "`rem` always measures from the root, so nesting never compounds the size.",
          },
          bad: {
            code: `.note {
  font-size: 0.875em;
}

.note .code {
  font-size: 0.875em;
}`,
            note: "The inner element is 0.875 times an already reduced size, so it shrinks twice and keeps shrinking with depth.",
          },
        },
        {
          type: "paragraph",
          text: "The same `1.5em` therefore means two different things depending on the property it sits on. On `font-size`, it is relative to the parent. On `padding`, `margin`, `width`, `border-radius` and nearly everything else, it is relative to the element itself. When you read an `em` value, the first question to ask is always which property it belongs to.",
        },
        { type: "heading", text: "When em is the right tool" },
        {
          type: "list",
          items: [
            "Padding, margins and border radius **inside a component** that should scale with its own text, such as buttons and badges.",
            "The size of an icon placed next to text: `width: 1em; height: 1em` matches the letters.",
            "`letter-spacing` and `text-indent`, which should follow the size of the text.",
            "Media query breakpoints, where `em` follows the browser's default text size.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "A simple habit works well: use `rem` for the **font size** of things, and `em` for the **space and shapes** that belong to a piece of text.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`1em` is the element's own font size, except on `font-size`, where it is the parent's.",
            "Nested `em` font sizes multiply, which is why `rem` is safer for text sizes.",
            "`em` is ideal for padding, radius and icons inside a component that should scale with its text.",
            "In media queries, `em` follows the user's default font size.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "rem-units",
      kind: "learn",
      title: "The rem unit",
      summary: "Sizing from the root, the default 16px, and why changing the root font size in pixels is a trap.",
      minutes: 9,
      concept: {
        description:
          "`rem` means \"root em\": a length equal to the font size of the root element, `html`. At the browser's default that is 16px, so `1.5rem` is 24px, and if the user raises their default to 20px, `1.5rem` becomes 30px.",
        why: "`rem` gives you one predictable base for the whole page, like `em` without the compounding. It lets a design respect the text size each person chose, and it lets you scale an entire layout by changing a single number.",
        mentalModel:
          "`rem` is one master ruler hanging at the top of the page. Every element measures against that same ruler, so nesting makes no difference, and if the ruler is resized, everything follows at once.",
      },
      body: [
        { type: "heading", text: "One base for everything" },
        {
          type: "paragraph",
          text: "The root element's font size is the browser default unless you change it, which is 16px for most people. A `rem` is a multiple of that. Because it does not depend on the parent, `1.25rem` is the same size whether the element is a top-level paragraph or buried five elements deep. That makes `rem` the standard unit for font sizes, and a very good one for spacing and widths.",
        },
        {
          type: "code",
          language: "css",
          code: `html {
  font-size: 100%;
}

body {
  font-size: 1rem;
}

.card {
  max-width: 30rem;
  padding: 1.5rem;
}

h1 {
  font-size: 2.5rem;
}`,
          caption: "Everything measures from the root, which follows the user's setting",
        },
        { type: "heading", text: "Respect the user's default" },
        {
          type: "paragraph",
          text: "People can change the default text size in their browser settings, and many do, because they need larger text. The `html` font size reflects that choice, so any `rem` value scales with it. If you set `html { font-size: 16px }` in pixels, you override the user's choice with your own, and every `rem` on the page is frozen at your number. If you must set a root size, use a percentage, such as `100%`, which keeps the user's setting as the base.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `html {
  font-size: 100%;
}`,
            note: "A percentage of the user's own default. If they chose 20px, every rem on the page becomes larger.",
          },
          bad: {
            code: `html {
  font-size: 16px;
}`,
            note: "A fixed pixel size replaces the user's setting, so none of the page's `rem` values respond to it.",
          },
        },
        { type: "heading", text: "The 62.5% trick" },
        {
          type: "paragraph",
          text: "A popular habit sets `html { font-size: 62.5% }` so that `1rem` equals 10px, which makes mental maths easy: `2.4rem` is 24px. It does respect the user's setting, because it is a percentage, but it has costs. You must restore body text with `body { font-size: 1.6rem }`, any third-party component that assumes a 16px root will look tiny, and a forgotten reset leaves text unreadably small. Many teams now skip the trick and do the small sums, or let their tools do them.",
        },
        {
          type: "callout",
          tone: "note",
          text: "A browser's default font size is also what `em` and `rem` use in media queries, whatever you set on `html`. That is one reason breakpoints written in `em` or `rem` adapt to the user's text size.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Do the conversion in your head with the 16px base: `0.5rem` is 8px, `0.75rem` is 12px, `1rem` is 16px, `1.5rem` is 24px and `2rem` is 32px.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`1rem` is the root element's font size, 16px by default.",
            "`rem` does not compound with nesting, so it is the best unit for font sizes.",
            "Never set the root font size in pixels. Use a percentage, so the user's setting stays in charge.",
            "The `62.5%` trick works, but needs a body reset and can surprise third-party components.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "unit-explorer",
      kind: "visualizer",
      title: "Unit explorer",
      summary: "Resize the root and the container text, and see which bars follow and which stay put.",
      minutes: 10,
      concept: {
        description:
          "Five bars are sized in five different units: `px`, `em`, `rem`, `%` and `vw`. Two sliders change the root font size and the container's font size, and the rest change each bar's own number. You will see exactly which units react to which ruler.",
        why: "Reading that `em` follows the parent and `rem` follows the root is easy to forget. Watching a bar grow while its neighbour stays put makes the difference stick for good.",
        mentalModel:
          "Each bar is measured with a different ruler. `px` is a steel ruler that never changes. `em` is a rubber ruler tied to the container's text. `rem` is tied to the root. `%` is tied to the width of the container, and `vw` to the width of the window.",
      },
      stage: {
        html: '<div class="demo">\n  <div class="bar box-px">px</div>\n  <div class="bar box-em">em</div>\n  <div class="bar box-rem">rem</div>\n  <div class="bar box-pct">%</div>\n  <div class="bar box-vw">vw</div>\n</div>',
        baseCss:
          "body { margin: 0; padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.demo { box-sizing: border-box; padding: 14px; border-radius: 12px; background: #e2e8f0; }\n.bar { box-sizing: border-box; min-height: 30px; margin-bottom: 8px; padding-left: 10px; display: flex; align-items: center; border-radius: 6px; color: #ffffff; font-weight: 700; line-height: 1.2; white-space: nowrap; overflow: hidden; }\n.bar:last-child { margin-bottom: 0; }\n.box-px { background: #4f46e5; }\n.box-em { background: #db2777; }\n.box-rem { background: #059669; }\n.box-pct { background: #d97706; }\n.box-vw { background: #0284c7; }",
        annotate: "none",
        target: ".demo",
        items: ".bar",
      },
      starter: `html {
  font-size: 16px;
}

.demo {
  font-size: 16px;
}

.box-px  { width: 160px; }
.box-em  { width: 10em; }
.box-rem { width: 10rem; }
.box-pct { width: 50%; }
.box-vw  { width: 25vw; }
`,
      controls: [
        { id: "root", label: "root font-size", selector: "html", property: "font-size", fallback: "16px", type: "range", min: 12, max: 24, step: 1, unit: "px", help: "Only `rem` bars follow the root." },
        { id: "container", label: "container font-size", selector: ".demo", property: "font-size", fallback: "16px", type: "range", min: 8, max: 28, step: 1, unit: "px", help: "Only `em` bars follow the container's font size." },
        { id: "px", label: "px width", selector: ".box-px", property: "width", fallback: "160px", type: "range", min: 40, max: 320, step: 10, unit: "px", help: "A fixed length that nothing changes." },
        { id: "em", label: "em width", selector: ".box-em", property: "width", fallback: "10em", type: "range", min: 2, max: 20, step: 1, unit: "em", help: "Times the element's own font size, which here is the container's." },
        { id: "rem", label: "rem width", selector: ".box-rem", property: "width", fallback: "10rem", type: "range", min: 2, max: 20, step: 1, unit: "rem", help: "Times the root's font size." },
        { id: "pct", label: "% width", selector: ".box-pct", property: "width", fallback: "50%", type: "range", min: 10, max: 100, step: 5, unit: "%", help: "A share of the container's width." },
        { id: "vw", label: "vw width", selector: ".box-vw", property: "width", fallback: "25vw", type: "range", min: 5, max: 60, step: 5, unit: "vw", help: "A share of the window's width." },
      ],
      presets: [
        { id: "big-root", label: "Big root", description: "root 22px: only rem moves", css: "html { font-size: 22px; }" },
        { id: "big-container", label: "Big container text", description: "container 26px: only em moves", css: ".demo { font-size: 26px; }" },
        { id: "small-both", label: "Small text everywhere", description: "root and container at 12px", css: "html { font-size: 12px; }\n.demo { font-size: 12px; }" },
        { id: "equal", label: "All equal", description: "every bar 192px wide", css: ".box-px { width: 192px; }\n.box-em { width: 12em; }\n.box-rem { width: 12rem; }" },
      ],
      challenge: {
        title: "Make three bars the same width",
        description:
          "With the root and container both at 16px, make three bars exactly 192px wide, each written in its own unit: `.box-px` is `192px`, `.box-em` is `12em` and `.box-rem` is `12rem`. Keep `html` and `.demo` at `16px`, so the three units agree.",
        hints: [
          "Three rules to edit, one per bar. The `html` and `.demo` rules should stay at 16px.",
          "192 divided by 16 is 12, so `em` and `rem` both use 12.",
          "`.box-px { width: 192px; }` `.box-em { width: 12em; }` `.box-rem { width: 12rem; }`",
        ],
        checks: [
          { type: "computedStyle", selector: "html", property: "font-size", expected: ["16px"], message: "The root is `16px`." },
          { type: "computedStyle", selector: ".demo", property: "font-size", expected: ["16px"], message: "The container text is `16px`." },
          { type: "computedStyle", selector: ".box-px", property: "width", expected: ["192px"], message: "`.box-px` is `192px` wide." },
          { type: "computedStyle", selector: ".box-em", property: "width", expected: ["12em", "192px"], message: "`.box-em` is `12em` wide." },
          { type: "computedStyle", selector: ".box-rem", property: "width", expected: ["12rem", "192px"], message: "`.box-rem` is `12rem` wide." },
        ],
        solution: `html {
  font-size: 16px;
}

.demo {
  font-size: 16px;
}

.box-px  { width: 192px; }
.box-em  { width: 12em; }
.box-rem { width: 12rem; }
.box-pct { width: 50%; }
.box-vw  { width: 25vw; }
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-em",
      kind: "predict",
      title: "Predict the em",
      summary: "Work out how nested em sizes compound, and what an em in padding really measures.",
      minutes: 6,
      mode: "css",
      intro: "A chain of nested elements and a button all use `em`. Predict the pixel sizes, then run the code.",
      code: {
        html: `<div class="outer">
  Outer
  <div class="inner">
    Inner
    <span class="deep">Deep</span>
  </div>
</div>
<button class="btn">Button</button>`,
        css: `html {
  font-size: 16px;
}

body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.outer { font-size: 20px; }
.inner { font-size: 1.5em; }
.deep  { font-size: 1.5em; }

.btn {
  margin-top: 12px;
  font-size: 20px;
  padding: 1em;
}`,
      },
      questions: [
        {
          prompt: "`.outer` is 20px and `.inner` is `font-size: 1.5em`. How big is the inner text?",
          options: ["1.5px", "24px", "30px", "20px"],
          answerIndex: 2,
          hint: "On `font-size`, `em` is relative to the parent's font size.",
          explanation: "The parent is 20px, so `1.5em` is 20 times 1.5, which is 30px.",
          proves: [{ type: "computedStyle", selector: ".inner", property: "font-size", expected: ["1.5em", "30px"], message: "`.inner` is 30px." }],
        },
        {
          prompt: "`.deep` also has `font-size: 1.5em`, inside `.inner`. How big is it?",
          options: ["45px", "30px", "22.5px", "1.5px"],
          answerIndex: 0,
          hint: "Its parent, `.inner`, is already 30px.",
          explanation: "Each level multiplies the size of the one above it. `.deep` is 1.5 times 30px, which is 45px, even though it uses the same `1.5em` as its parent. That is the compounding trap.",
          proves: [{ type: "computedStyle", selector: ".deep", property: "font-size", expected: ["1.5em", "45px"], message: "`.deep` is 45px." }],
        },
        {
          prompt: "The button is `font-size: 20px` with `padding: 1em`. How much padding does it get on each side?",
          options: ["16px, from the root", "1px", "24px", "20px, from the button's own font size"],
          answerIndex: 3,
          hint: "For properties other than `font-size`, `em` means the element's own font size.",
          explanation: "On `padding`, `1em` is the button's own computed font size, which is 20px. The root's 16px does not matter, and neither does the parent.",
          proves: [{ type: "computedStyle", selector: ".btn", property: "padding-top", expected: ["1em", "20px"], message: "The button has 20px of padding." }],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-em-buttons",
      kind: "lab",
      title: "Lab: buttons that scale as one piece",
      summary: "Switch a button's padding and corners from pixels to em, so each size scales with its own text.",
      minutes: 10,
      mode: "css",
      starter: {
        html: `<div class="row">
  <button class="btn btn-sm">Small</button>
  <button class="btn">Default</button>
  <button class="btn btn-lg">Large</button>
</div>`,
        css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn {
  font-size: 1rem;
  padding: 10px 18px;
  border: 0;
  border-radius: 6px;
  background-color: #4f46e5;
  color: #ffffff;
}

.btn-sm {
  font-size: 0.875rem;
}

.btn-lg {
  font-size: 1.25rem;
}
`,
      },
      challenge: {
        title: "Make the buttons scale with their text",
        description:
          "All three buttons have the same fixed pixel padding and corners, so the small button looks puffy and the large one looks cramped. Edit the shared `.btn` rule so that the padding is `0.75em 1.25em` and the corner radius is `0.5em`. Each button's spacing will then follow its own font size.",
        hints: [
          "Only the `.btn` rule needs to change. The size classes already set the font sizes.",
          "Replace the pixel `padding` and `border-radius` values with `em` values.",
          "`padding: 0.75em 1.25em;` and `border-radius: 0.5em;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".btn-sm", property: "padding-top", expected: ["0.75em", "10.5px"], message: "The small button's vertical padding is `0.75em` (10.5px)." },
          { type: "computedStyle", selector: ".btn-sm", property: "padding-left", expected: ["1.25em", "17.5px"], message: "...and its side padding is `1.25em` (17.5px)." },
          { type: "computedStyle", selector: ".btn-sm", property: "border-radius", expected: ["0.5em", "7px"], message: "...and its corners are `0.5em` (7px)." },
          { type: "computedStyle", selector: ".btn-lg", property: "padding-top", expected: ["0.75em", "15px"], message: "The large button's vertical padding is `0.75em` (15px)." },
          { type: "computedStyle", selector: ".btn-lg", property: "padding-left", expected: ["1.25em", "25px"], message: "...and its side padding is `1.25em` (25px)." },
          { type: "computedStyle", selector: ".btn-lg", property: "border-radius", expected: ["0.5em", "10px"], message: "...and its corners are `0.5em` (10px)." },
        ],
        solution: {
          html: `<div class="row">
  <button class="btn btn-sm">Small</button>
  <button class="btn">Default</button>
  <button class="btn btn-lg">Large</button>
</div>`,
          css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn {
  font-size: 1rem;
  padding: 0.75em 1.25em;
  border: 0;
  border-radius: 0.5em;
  background-color: #4f46e5;
  color: #ffffff;
}

.btn-sm {
  font-size: 0.875rem;
}

.btn-lg {
  font-size: 1.25rem;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "percentages",
      kind: "learn",
      title: "Percentages: percent of what?",
      summary: "A percentage always measures against something the property chooses, and it is not always the thing you expect.",
      minutes: 10,
      concept: {
        description:
          "A percentage is a length measured against a reference, and **which reference depends on the property**. `width: 50%` is half the parent's width, but `padding-top: 50%` is also half the parent's **width**, and `font-size: 150%` is one and a half times the parent's font size.",
        why: "Percentages power fluid layouts, but they are the unit most often misunderstood. Asking \"percent of what?\" before using one prevents the classic surprises: padding that follows width, heights that do nothing, and radius values that make pills and circles.",
        mentalModel:
          "A percentage is a question: \"what fraction of what?\" Each property has its own answer written in the specification, and your job is to know which one you are talking to.",
      },
      body: [
        { type: "heading", text: "Widths and heights" },
        {
          type: "paragraph",
          text: "`width`, `min-width` and `max-width` use the width of the **containing block**, which is usually the parent's content area. `height` uses the containing block's height, but only when that height is actually set. If the parent's height is `auto`, which means it is worked out from its content, the browser has no fixed number to take a percentage of, so `height: 50%` behaves as `auto` and appears to do nothing.",
        },
        {
          type: "code",
          language: "css",
          code: `.parent {
  width: 400px;
  height: 200px;
}

.child {
  width: 50%;   /* 200px */
  height: 25%;  /* 50px, because the parent's height is set */
}`,
          caption: "Both work, because the parent's size is definite",
        },
        { type: "heading", text: "The padding and margin surprise" },
        {
          type: "paragraph",
          text: "Percentage **padding and margin on all four sides**, including top and bottom, are measured against the containing block's **width**, never its height. So in a 400px-wide parent, `padding-top: 10%` is 40px. That is odd at first, but it makes a box that keeps a fixed shape as the width changes. It was the old way to hold an aspect ratio: `padding-top: 56.25%` on a box made it exactly 16:9. Today `aspect-ratio` does that job.",
        },
        { type: "heading", text: "Other properties" },
        {
          type: "list",
          items: [
            "`font-size: 120%` is 1.2 times the **parent's** font size. `line-height: 150%` is 1.5 times the element's **own** font size, and is then inherited as that fixed length.",
            "`top` and `bottom` use the containing block's height. `left` and `right` use its width.",
            "`border-radius: 50%` uses the box's own width and height, which makes a circle on a square and an ellipse on a rectangle.",
            "`transform: translate(50%)` uses the element's **own** size, which is why it is used to centre things.",
            "`flex-basis` uses the flex container's size along the main axis.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}`,
            note: "A square box with `border-radius: 50%` becomes a perfect circle, whatever its size.",
          },
          bad: {
            code: `.child {
  height: 50%;
}

/* parent: height is auto */`,
            note: "The parent has no set height, so the percentage has nothing to measure and is treated as `auto`. Nothing happens.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "When a percentage height does nothing, give the parent a real height, or use `min-height` with a viewport unit, or let flexbox or grid share out the space instead.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`width`, `max-width` and `min-width` percentages use the containing block's width.",
            "`height` percentages need a parent with a definite height, or they behave as `auto`.",
            "Padding and margin percentages use the **width**, even on the top and bottom.",
            "`font-size` uses the parent's font size and `line-height` uses the element's own. `border-radius: 50%` makes circles.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "percent-explorer",
      kind: "visualizer",
      title: "Percent explorer",
      summary: "Drag percentage width, height, padding and margin inside a fixed parent, and see what each one measures.",
      minutes: 9,
      concept: {
        description:
          "A dashed parent box is exactly 320 by 200 pixels. Inside it, a child box takes its size and spacing from percentages that you control, so you can see what each percentage is measured against.",
        why: "The padding percentage rule, where vertical padding follows the parent's width, is nearly impossible to believe until you drag it. Seeing it grow a box downwards when you drag it sideways is the fastest way to understand.",
        mentalModel:
          "The parent is a 320 by 200 sheet of graph paper. Width and horizontal margin are a fraction of the sheet's width. Height is a fraction of its height. And padding, strangely, is always a fraction of the width.",
      },
      stage: {
        html: '<div class="frame">\n  <div class="parent">\n    <div class="child">child</div>\n  </div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; }\n.frame { padding: 16px; border-radius: 12px; background: #e2e8f0; }\n.parent { width: 320px; height: 200px; box-sizing: border-box; outline: 2px dashed #6366f1; background: #eef2ff; }\n.child { box-sizing: border-box; background: #4f46e5; color: #ffffff; font-weight: 700; font-size: 14px; overflow: hidden; }",
        annotate: "none",
        target: ".child",
        items: ".child",
      },
      starter: `.child {
  width: 100%;
  height: 100%;
  padding-top: 0%;
  margin-left: 0%;
}
`,
      controls: [
        { id: "width", label: "width", selector: ".child", property: "width", fallback: "auto", type: "range", min: 10, max: 100, step: 5, unit: "%", help: "A share of the parent's width, 320px." },
        { id: "height", label: "height", selector: ".child", property: "height", fallback: "auto", type: "range", min: 10, max: 100, step: 5, unit: "%", help: "A share of the parent's height, 200px, because it is set." },
        { id: "pad", label: "padding-top", selector: ".child", property: "padding-top", fallback: "0", type: "range", min: 0, max: 40, step: 5, unit: "%", help: "Measured against the parent's WIDTH, not its height." },
        { id: "margin", label: "margin-left", selector: ".child", property: "margin-left", fallback: "0", type: "range", min: 0, max: 50, step: 5, unit: "%", help: "Also a share of the parent's width." },
      ],
      presets: [
        { id: "half", label: "Half and half", description: "50% by 50%", css: ".child { width: 50%; height: 50%; }" },
        { id: "centred", label: "Centred half", description: "50% wide, 25% margin on the left", css: ".child { width: 50%; height: 50%; margin-left: 25%; }" },
        { id: "padding-box", label: "Shape from padding", description: "no height, padding does the work", css: ".child { width: 50%; height: 0%; padding-top: 25%; }" },
        { id: "full", label: "Fill the parent", description: "100% by 100%", css: ".child { width: 100%; height: 100%; padding-top: 0%; margin-left: 0%; }" },
      ],
      challenge: {
        title: "Half the width, a quarter of the height",
        description:
          "The child fills the whole parent. Make it exactly half as wide as the parent and a quarter as tall: `width: 50%` and `height: 25%`. The parent is 320 by 200 pixels, so you are aiming for 160 by 50.",
        hints: [
          "Two declarations in the `.child` rule need new values.",
          "Both are percentages of the parent: its width for the width, its height for the height.",
          "`width: 50%;` and `height: 25%;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".child", property: "width", expected: ["50%", "160px"], message: "The child is `50%` wide (160px)." },
          { type: "computedStyle", selector: ".child", property: "height", expected: ["25%", "50px"], message: "The child is `25%` tall (50px)." },
        ],
        solution: `.child {
  width: 50%;
  height: 25%;
  padding-top: 0%;
  margin-left: 0%;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-percentages",
      kind: "predict",
      title: "Predict the percentages",
      summary: "Work out what width, vertical padding and height percentages really measure.",
      minutes: 6,
      mode: "css",
      intro: "Three boxes use percentages. Predict the pixel values before you run the code. The first two parents are 400px wide.",
      code: {
        html: `<div class="parent">
  <div class="a">A: width 50%</div>
  <div class="b">B: padding-top 10%</div>
</div>
<div class="tall">
  <div class="c">C: height 50%</div>
</div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.parent {
  width: 400px;
  background-color: #e0e7ff;
}

.a {
  width: 50%;
  background-color: #6366f1;
  color: #ffffff;
}

.b {
  padding-top: 10%;
  background-color: #a5b4fc;
}

.tall {
  width: 400px;
  margin-top: 16px;
  background-color: #fef3c7;
}

.c {
  height: 50%;
  background-color: #f59e0b;
}`,
      },
      questions: [
        {
          prompt: "Box A is `width: 50%` inside a 400px parent. How wide is it?",
          options: ["50px", "400px", "200px", "50% of the window"],
          answerIndex: 2,
          hint: "Width percentages use the parent's width.",
          explanation: "A width percentage is measured against the containing block's width, so 50% of 400px is 200px.",
          proves: [{ type: "computedStyle", selector: ".a", property: "width", expected: ["50%", "200px"], message: "Box A is 200px wide." }],
        },
        {
          prompt: "Box B has `padding-top: 10%` inside the same 400px-wide parent. How much padding does it get at the top?",
          options: ["40px: 10% of the parent's width, even for vertical padding", "10% of its own height", "10% of the parent's height", "None, because padding cannot use percentages"],
          answerIndex: 0,
          hint: "Padding and margin percentages use one measurement for all four sides.",
          explanation: "Percentage padding and margin are always measured against the containing block's width. So the top padding is 10% of 400px, which is 40px, even though it pushes the box downwards.",
          proves: [{ type: "computedStyle", selector: ".b", property: "padding-top", expected: ["10%", "40px"], message: "Box B has 40px of top padding." }],
        },
        {
          prompt: "Box C has `height: 50%`, but its parent `.tall` has no height set. What happens?",
          options: ["It is half of the browser window", "It is 200px", "It is invalid and ignored", "It is treated as `auto`: the parent has no set height, so the percentage has nothing to measure"],
          answerIndex: 3,
          hint: "A percentage height needs a parent whose height is already known.",
          explanation: "The parent's height depends on its content, which includes this child, so it is not definite. A percentage height of an indefinite height behaves as `auto`, and the box is only as tall as its content.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "viewport-units",
      kind: "learn",
      title: "Viewport units",
      summary: "vw, vh, vmin and vmax, plus the small, large and dynamic variants that fix 100vh on phones.",
      minutes: 10,
      concept: {
        description:
          "Viewport units are measured against the size of the browser window: `1vw` is one percent of its width and `1vh` is one percent of its height. `vmin` and `vmax` use the smaller or larger of the two. Newer variants (`svh`, `lvh`, `dvh`) handle the toolbars that grow and shrink on phones.",
        why: "Viewport units let a hero fill the screen or a heading scale with the window, with no media queries. They also have two well-known traps, horizontal scrollbars from `100vw` and a full-height section that is cut off on a phone.",
        mentalModel:
          "Imagine the browser window as a sheet of paper divided into 100 columns and 100 rows. `1vw` is one column, `1vh` is one row, and your element is sized in those slices no matter what its parent is doing.",
      },
      body: [
        { type: "heading", text: "The four basics" },
        {
          type: "list",
          items: [
            "`vw`: 1% of the viewport's width.",
            "`vh`: 1% of the viewport's height.",
            "`vmin`: 1% of the smaller dimension, which is good for squares that always fit.",
            "`vmax`: 1% of the larger dimension.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `.hero {
  min-height: 80vh;
}

.badge {
  width: 20vmin;
  height: 20vmin;
}`,
          caption: "A tall hero, and a square that always fits whichever way the screen is turned",
        },
        { type: "heading", text: "Trap 1: 100vw and the scrollbar" },
        {
          type: "paragraph",
          text: "`100vw` is the full width of the window **including** the vertical scrollbar. On a desktop with a classic scrollbar, that is wider than the space your page really has, so an element at `width: 100vw` pushes past the edge and creates a sideways scrollbar. For a block that should fill the page, use `width: 100%` or simply leave the width as `auto`.",
        },
        { type: "heading", text: "Trap 2: 100vh on phones" },
        {
          type: "paragraph",
          text: "On a phone, the browser's address bar and toolbars slide away as you scroll. Plain `vh` is based on the **largest** possible viewport, with the toolbars hidden, so `100vh` is taller than what you can actually see when the page first loads, and the bottom of the section is hidden. Three newer units solve it. `svh` is the **small** viewport, the size with the toolbars showing, so it is always safe. `lvh` is the **large** one. `dvh` is the **dynamic** viewport, which changes as the toolbars appear and disappear.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.screen {
  min-height: 100svh;
}`,
            note: "Always fits in view, even with the toolbars showing, and `min-height` lets long content grow it.",
          },
          bad: {
            code: `.screen {
  height: 100vh;
}`,
            note: "Too tall on phones, so the bottom is hidden behind the toolbar. A fixed `height` also clips content that does not fit.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "`dvh` always matches what is visible, but it resizes as the user scrolls, which can make content jump. For a steady hero, prefer `svh`. For something that must follow the exact visible height, use `dvh`.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "If you use viewport units for text, mix them with `rem`, as in `clamp(1.5rem, 1rem + 2vw, 2.5rem)`. A size made only of `vw` ignores the user's zoom and their text settings.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`vw` and `vh` are 1% of the window's width and height. `vmin` and `vmax` use the smaller or larger side.",
            "`100vw` includes the scrollbar, so it can cause sideways scrolling. Use `100%` for full-width blocks.",
            "`100vh` is too tall on phones. Use `svh` for a safe size, `dvh` for one that follows the toolbars.",
            "Use `min-height`, not `height`, with viewport units, and pair `vw` with `rem` for text.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-unit-mistakes",
      kind: "debug",
      title: "Debug: the sizes that never apply",
      summary: "Six declarations are silently ignored because of a small mistake in the unit.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<div class="box">Fixed box</div>
<h1 class="title">Unit mistakes</h1>
<p class="lede">Six small errors, six ignored declarations.</p>
<section class="hero">Hero</section>
<div class="card">Card</div>
<p class="note">Note</p>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.box {
  width: 300;
  background-color: #e0e7ff;
}

.title {
  margin-bottom: 1 rem;
}

.lede {
  font-size: 1,25rem;
}

.hero {
  height: 100 vh;
  background-color: #c7d2fe;
}

.card {
  padding-top: 1.5rm;
  background-color: #fde68a;
}

.note {
  padding-left: -1rem;
}
`,
      },
      challenge: {
        title: "Fix every unit",
        description:
          "None of these sizes are being applied. Fix each so that: the box is `300px` wide, the title has `1rem` of bottom margin, the lede is `1.25rem`, the hero is at least the height of the window (`min-height: 100vh`), the card has `1.5rem` of top padding and the note has `1rem` of left padding.",
        hints: [
          "Use the explain panel's Heads up card and DevTools, where an invalid declaration is struck through.",
          "Look for: a missing unit, a space between number and unit, a comma instead of a full stop, a typo in a unit name, and a negative padding.",
          "`300` needs `px`. `1 rem` has a space. `1,25rem` has a comma. `rm` is not a unit. Padding cannot be negative. And the hero needs `min-height`, with no space in `100vh`.",
        ],
        checks: [
          { type: "computedStyle", selector: ".box", property: "width", expected: ["300px"], message: "The box is `300px` wide." },
          { type: "computedStyle", selector: ".title", property: "margin-bottom", expected: ["1rem", "16px"], message: "The title has `1rem` of bottom margin." },
          { type: "computedStyle", selector: ".lede", property: "font-size", expected: ["1.25rem", "20px"], message: "The lede is `1.25rem`." },
          { type: "computedStyle", selector: ".hero", property: "min-height", expected: ["100vh"], message: "The hero has `min-height: 100vh`." },
          { type: "computedStyle", selector: ".card", property: "padding-top", expected: ["1.5rem", "24px"], message: "The card has `1.5rem` of top padding." },
          { type: "computedStyle", selector: ".note", property: "padding-left", expected: ["1rem", "16px"], message: "The note has `1rem` of left padding." },
        ],
        solution: {
          html: `<div class="box">Fixed box</div>
<h1 class="title">Unit mistakes</h1>
<p class="lede">Six small errors, six ignored declarations.</p>
<section class="hero">Hero</section>
<div class="card">Card</div>
<p class="note">Note</p>`,
          css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.box {
  width: 300px;
  background-color: #e0e7ff;
}

.title {
  margin-bottom: 1rem;
}

.lede {
  font-size: 1.25rem;
}

.hero {
  min-height: 100vh;
  background-color: #c7d2fe;
}

.card {
  padding-top: 1.5rem;
  background-color: #fde68a;
}

.note {
  padding-left: 1rem;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "calc-min-max-clamp",
      kind: "learn",
      title: "calc(), min(), max() and clamp()",
      summary: "Do maths with mixed units, and set flexible sizes with a floor and a ceiling.",
      minutes: 10,
      concept: {
        description:
          "`calc()` lets you add, subtract, multiply and divide values, even with different units. `min()` and `max()` pick the smaller or larger of several values, and `clamp(min, preferred, max)` keeps a flexible value between a floor and a ceiling.",
        why: "Layouts are full of questions that mix units: \"the full width minus a fixed sidebar\", \"as wide as possible but never wider than 60rem\". These functions answer them in one line, and the browser re-evaluates them whenever the window changes.",
        mentalModel:
          "`calc()` is a small calculator built into your stylesheet. `min()`, `max()` and `clamp()` are its sensible friends: \"pick the smaller\", \"pick the larger\" and \"stay between these two limits\".",
      },
      body: [
        { type: "heading", text: "calc()" },
        {
          type: "paragraph",
          text: "Write an expression inside `calc()` and the browser works it out when it lays the page out, which is how you can mix units that are only known at that moment, such as `%` and `px`. The big rule is that `+` and `-` must have **a space on both sides**. Multiplication and division do not need spaces, but for multiplication at least one side must be a plain number, and for division the right side must be a plain number.",
        },
        {
          type: "code",
          language: "css",
          code: `.content {
  width: calc(100% - 16rem);
}

.gap {
  margin-top: calc(1rem + 4px);
}

.heading {
  font-size: calc(1rem * 1.5);
}`,
          caption: "Mixed units, resolved at layout time",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.content {
  width: calc(100% - 2rem);
}`,
            note: "Spaces around the minus sign, so it is read as subtraction.",
          },
          bad: {
            code: `.content {
  width: calc(100%-2rem);
}`,
            note: "Without spaces, `100%-2rem` is not understood as a subtraction. The whole declaration is invalid and ignored.",
          },
        },
        { type: "heading", text: "min(), max() and clamp()" },
        {
          type: "paragraph",
          text: "`min(a, b)` returns the smaller of its values and `max(a, b)` the larger. A good way to remember them is that `min()` sets a **ceiling** and `max()` sets a **floor**: `width: min(100%, 60rem)` means \"as wide as the parent, but never more than 60rem\". `clamp(low, preferred, high)` is shorthand for combining the two: it uses the preferred value, but never goes below `low` or above `high`.",
        },
        {
          type: "code",
          language: "css",
          code: `.wrapper {
  width: min(100% - 2rem, 60rem);
  margin-inline: auto;
}

.section {
  padding: clamp(1rem, 4vw, 3rem);
}

h1 {
  font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
}`,
          caption: "A centred wrapper, fluid padding and a fluid heading, with no media queries",
        },
        {
          type: "paragraph",
          text: "Inside these functions you can do maths without writing `calc()` again, as in `min(100% - 2rem, 60rem)`. You can also nest them, and use them almost anywhere a length is allowed, including in grid track sizes and as arguments to each other. Newer functions such as `round()`, `mod()` and `abs()` exist too, with support still growing.",
        },
        {
          type: "paragraph",
          text: "Math functions are accepted almost anywhere a length, number, angle or time is allowed. You can write `rotate(calc(1turn / 3))`, `transition-duration: calc(0.1s * 3)`, or use them in grid track lists. Division by zero makes the value invalid, and a unit is never allowed on the right side of a division, so `calc(100% / 3)` works, but `calc(100% / 3px)` does not.",
        },
        {
          type: "callout",
          tone: "note",
          text: "Custom properties work inside these functions. For example, `calc(var(--space) * 2)` doubles a value you defined once. That is where `calc()` becomes really powerful, and a later topic covers it.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "If a `clamp()` is not behaving, check the order. It must be low, preferred, high. Swapping the first and last values gives a result that never changes.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`calc()` mixes units, and needs spaces around `+` and `-`.",
            "`min()` caps a value (a ceiling) and `max()` sets a minimum (a floor).",
            "`clamp(low, preferred, high)` keeps a flexible value between two limits.",
            "Maths inside these functions needs no extra `calc()`, and custom properties work inside them.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "newer-units",
      kind: "learn",
      title: "ch, ex, lh and container units",
      summary: "Units measured in text, line height and container size, and what they are good for.",
      minutes: 9,
      concept: {
        description:
          "Beyond the everyday units, CSS has some more specialised ones. `ch` is the width of a zero, `ex` is the x-height, `lh` is the line height, and `cqw`, `cqi` and friends are percentages of a **container** you choose, rather than of the viewport.",
        why: "These units express relationships that were awkward before: a column about 65 characters wide, spacing that is exactly one line tall, or a component that scales with the box it sits in instead of the whole window.",
        mentalModel:
          "Each is a ruler tied to something specific: `ch` to the letters, `lh` to the lines, `cq` units to the box around the component. You pick the ruler that matches what you actually want to measure.",
      },
      body: [
        { type: "heading", text: "Units based on text" },
        {
          type: "paragraph",
          text: "`ch` is the width of the zero in the element's font, which makes `max-width: 65ch` a good measure for a column of text. `ex` is the height of a lowercase x, and is rarely used. `lh` is the element's **computed line height**, so `margin-bottom: 1lh` gives exactly one line of space, and `rlh` is the same for the root element. They are supported in all current major browsers, though older ones may lack `lh`.",
        },
        {
          type: "code",
          language: "css",
          code: `.article {
  max-width: 65ch;
}

.article p {
  margin-block: 0 1lh;
}`,
          caption: "A comfortable column, and paragraph spacing of exactly one line",
        },
        { type: "heading", text: "Container query units" },
        {
          type: "paragraph",
          text: "Viewport units measure the window, but a component often needs to scale with the box it sits in, such as a card in a narrow sidebar. Container query units do that. `cqw` and `cqh` are 1% of the container's width and height, `cqi` and `cqb` are the inline and block versions, and `cqmin` and `cqmax` pick the smaller or larger. They only work if an ancestor is declared as a **query container** with `container-type`. Without one, they fall back to the small viewport.",
        },
        {
          type: "code",
          language: "css",
          code: `.card-wrap {
  container-type: inline-size;
}

.card-title {
  font-size: clamp(1rem, 4cqi, 2rem);
}`,
          caption: "A title that scales with its card, not with the window",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card-wrap {
  container-type: inline-size;
}

.card-title {
  font-size: clamp(1rem, 4cqi, 2rem);
}`,
            note: "The wrapper is a query container, so `cqi` measures that box, wherever it is placed on the page.",
          },
          bad: {
            code: `.card-title {
  font-size: clamp(1rem, 4cqi, 2rem);
}`,
            note: "No ancestor is a query container, so `cqi` quietly falls back to the viewport. The title no longer follows its card.",
          },
        },
        {
          type: "paragraph",
          text: "Container units combine well with `clamp()`, which keeps the result between sensible limits, as in the title above. Remember that a browser that does not know a unit treats the whole declaration as invalid, so for anything important, write a plain fallback line first, such as `font-size: 1.25rem;`, and put the container-unit version after it.",
        },
        {
          type: "callout",
          tone: "note",
          text: "`fr` is also a special unit, used only in grid track lists. It means a share of the leftover space, and it is a flexible fraction, not a length. The Grid topic covers it.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Reach for these when they say exactly what you mean: `ch` for line length, `lh` for rhythm, `cqi` for components. For everything else, `rem`, `em` and `%` stay the workhorses.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`ch` is the width of a zero, ideal for `max-width: 65ch`. `lh` is one line height.",
            "`cqw`, `cqh`, `cqi` and `cqb` are percentages of a **query container**.",
            "Container units need `container-type` on an ancestor, or they fall back to the viewport.",
            "`fr` is a grid-only flexible unit, not a length.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "non-length-units",
      kind: "learn",
      title: "Angles, time, resolution and plain numbers",
      summary: "The units that are not lengths: degrees and turns, seconds and milliseconds, dppx, fr and unitless numbers.",
      minutes: 8,
      concept: {
        description:
          "Not every CSS value is a length. Angles use `deg`, `rad`, `grad` and `turn`. Times use `s` and `ms`. Screen densities use `dppx` and `x`. Grid uses `fr`. And many properties take plain numbers with no unit at all.",
        why: "These values appear in transforms, gradients, transitions, animations and media queries. A wrong or missing unit is an invalid declaration, and the browser says nothing, so knowing which unit goes where saves hours of puzzling over an animation that never runs.",
        mentalModel:
          "Every kind of value has its own vocabulary. A rotation is measured in turns of a wheel, a delay in ticks of a clock, a screen's sharpness in dots per pixel. You cannot ask for \"half a second\" in degrees.",
      },
      body: [
        { type: "heading", text: "Angles" },
        {
          type: "paragraph",
          text: "Angles describe rotation and direction, in `transform: rotate()`, in gradient directions and in the hue of `hsl()`. `deg` is a degree, with 360 to a full circle. `turn` is a full circle, so `0.25turn` is `90deg`. `rad` uses radians, where a full circle is about 6.283, and `grad` has 400 to the circle. `deg` and `turn` are by far the most common.",
        },
        {
          type: "code",
          language: "css",
          code: `.arrow {
  transform: rotate(45deg);
}

.spinner {
  transform: rotate(1turn);
}

.banner {
  background: linear-gradient(90deg, #4f46e5, #db2777);
}`,
          caption: "Angles in a rotation, and in a gradient direction",
        },
        { type: "heading", text: "Time" },
        {
          type: "paragraph",
          text: "Durations and delays in transitions and animations use `s` for seconds and `ms` for milliseconds, so `0.3s` and `300ms` are the same. Unlike lengths, a zero time **still needs a unit**: `transition-duration: 0` is invalid, and you must write `0s`.",
        },
        { type: "heading", text: "Resolution and fractions" },
        {
          type: "paragraph",
          text: "Resolution units describe how many device pixels fit in one CSS pixel. `2dppx`, or its alias `2x`, is a high-density display, and `dpi` and `dpcm` are the print equivalents. They appear in media queries such as `@media (min-resolution: 2dppx)` and in `image-set()`. The `fr` unit belongs to grid track lists and means a share of the free space. It is a flexible fraction, not a length.",
        },
        { type: "heading", text: "Plain numbers" },
        {
          type: "paragraph",
          text: "Some properties take a **number** with no unit: `opacity: 0.5`, `z-index: 10`, `flex-grow: 1`, `font-weight: 700`, `line-height: 1.5` and `order: 2`. Adding a unit to these is usually an error, and `line-height: 1.5px` is a famous example of a valid but badly wrong value.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.fade {
  transition: opacity 0.3s ease;
  transition-delay: 0s;
}`,
            note: "Times always carry a unit, even zero, so the browser understands every value.",
          },
          bad: {
            code: `.fade {
  transition: opacity 0.3;
  transition-delay: 0;
}`,
            note: "`0.3` has no unit, and a bare `0` is not a valid time. The browser ignores the transition.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "Percentages are their own value type. Some properties accept them, such as `width` and `opacity`, and others do not. When in doubt, check which types the property lists in its documentation.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Angles use `deg`, `turn`, `rad` and `grad`. A full circle is `360deg` or `1turn`.",
            "Times use `s` and `ms`, and even zero needs a unit: `0s`.",
            "Resolution uses `dppx` or `x` in media queries. `fr` is a grid-only fraction.",
            "`opacity`, `z-index`, `flex-grow` and `line-height` take plain numbers. Do not add units.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "choosing-the-right-unit",
      kind: "learn",
      title: "Choosing the right unit",
      summary: "A practical guide to which unit to reach for in each situation.",
      minutes: 9,
      concept: {
        description:
          "Every property has a unit that suits it best. Use `rem` for type, `em` for spacing that belongs to text, `px` for fine details, `%` or `fr` for flexible layout, `ch` for line length, and viewport or container units for sizes tied to the screen or a component.",
        why: "Most unit mistakes are not syntax errors but bad choices: a pixel font that ignores user settings, a `vh` height that clips on phones, a width that cannot shrink. A simple guide saves you from deciding every time from scratch.",
        mentalModel:
          "Think of units as tools in a workshop. A hammer is not wrong, but you would not use it to cut wood. Match the tool to what the thing you are sizing should respond to: the text, the container, the window or nothing at all.",
      },
      body: [
        { type: "heading", text: "Ask what it should respond to" },
        {
          type: "paragraph",
          text: "The key question for any size is: what should this follow? The user's text size, the width of its parent, the window, or nothing? Once you know, the unit nearly picks itself.",
        },
        {
          type: "list",
          items: [
            "**Font sizes:** `rem`, so they follow the user's default. Line height as a unitless number.",
            "**Spacing between sections and elements:** `rem`, which scales with text but never compounds.",
            "**Spacing inside a component** (button padding, badge radius, icon size): `em`, so it scales with the component's own text.",
            "**Borders, outlines and shadows:** `px`, for crisp thin lines that should not change with text size.",
            "**Flexible widths:** `%` or `fr`, with `max-width` in `rem` or `ch` as a ceiling.",
            "**Text columns:** `ch`, usually `max-width: 65ch`.",
            "**Full-screen sections:** `svh` or `dvh` with `min-height`, never a fixed `vh` height.",
            "**Media query breakpoints:** `em` or `rem`, so they respect the user's default text size.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `body {
  font-size: 1rem;
  line-height: 1.6;
}

.section {
  padding-block: 3rem;
}

.btn {
  padding: 0.75em 1.25em;
  border: 1px solid currentColor;
}

.article {
  max-width: 65ch;
}

@media (min-width: 48em) {
  .layout { display: grid; }
}`,
          caption: "Each size uses the unit that matches what it should respond to",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  max-width: 30rem;
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
}`,
            note: "The width and padding follow the user's text size, while the border stays one crisp pixel.",
          },
          bad: {
            code: `.card {
  width: 480px;
  padding: 24px;
  border: 0.0625rem solid #cbd5e1;
}`,
            note: "A fixed width cannot shrink on a small screen, fixed padding ignores text settings, and the rem border may blur.",
          },
        },
        {
          type: "paragraph",
          text: "In a real project, you will not choose a fresh unit for every value. Pick a small scale of spacing in `rem`, such as 0.5, 1, 1.5, 2 and 3, and reuse those numbers everywhere, so the whole page feels consistent. Later you can store them as custom properties. Consistency across the page matters more than squeezing the perfect unit out of each declaration.",
        },
        {
          type: "callout",
          tone: "note",
          text: "Rules of thumb are not laws. A fixed `px` width is fine for something that truly has a fixed size, such as an avatar image. The goal is to choose deliberately, not to ban a unit.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "When two choices both seem fine, pick the one that responds to more of what the user can change. `rem` beats `px` for almost anything involving text.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Ask what a size should follow: the text, the parent, the window, or nothing.",
            "`rem` for text and spacing, `em` inside components, `px` for borders and shadows.",
            "`%` and `fr` for flexible widths, `ch` for text columns, `svh` or `dvh` with `min-height` for full-screen sections.",
            "Use `em` or `rem` in media queries so breakpoints respect the user's text size.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "zoom-and-user-preferences",
      kind: "learn",
      title: "Zoom and user preferences",
      summary: "How page zoom, default text size and mobile text scaling treat each unit, and how to test them.",
      minutes: 9,
      concept: {
        description:
          "People enlarge text in three different ways: zooming the whole page, raising the browser's default text size, and using their phone's system text size. Each treats your units differently, and a page built only in pixels responds to just the first.",
        why: "Many people depend on larger text, and in many places there are legal accessibility requirements for it. The units you choose decide whether your design bends to what people need, or breaks when they ask for it.",
        mentalModel:
          "Page zoom is a magnifying glass held over the whole page. The default text size setting is telling the page \"read everything at this size\". Pixels listen to the magnifying glass, but only relative units listen to the setting.",
      },
      body: [
        { type: "heading", text: "Three ways to get bigger text" },
        {
          type: "list",
          items: [
            "**Page zoom** (Ctrl and plus, or pinching): scales everything, including `px`. At 200%, every CSS pixel is twice as large on screen.",
            "**Default font size** (a browser setting): changes the root font size, and only sizes based on it, `rem`, `em` and `%` of font size, follow. A font size written in `px` stays exactly as written.",
            "**System text size** on phones: browsers on some platforms scale text sizes to match it, again following relative units more faithfully than fixed ones.",
          ],
        },
        {
          type: "paragraph",
          text: "That is why `font-size: 1.125rem` is better than `font-size: 18px`. Both respond to page zoom, but only the first respects someone who raised their default size to 24px because they need it.",
        },
        { type: "heading", text: "Let the layout bend too" },
        {
          type: "paragraph",
          text: "Larger text needs more room. If you size a container in pixels and the text inside grows, the text may overflow or clip. Giving text containers `rem` or `ch` widths and `min-height` instead of `height` lets the layout follow the text. Breakpoints written in `em`, such as `@media (min-width: 48em)`, also follow the user's text size, so a person who reads at a larger size gets the single-column layout sooner, which is exactly what they need.",
        },
        {
          type: "code",
          language: "css",
          code: `html {
  font-size: 100%;
}

.card {
  max-width: 30rem;
  min-height: 8rem;
  padding: 1.5rem;
}

@media (min-width: 48em) {
  .layout { grid-template-columns: 1fr 2fr; }
}`,
          caption: "A card and a breakpoint that both follow the user's text size",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `html { font-size: 100%; }
body { font-size: 1rem; }`,
            note: "The root keeps the user's chosen size, and the body text is exactly that size.",
          },
          bad: {
            code: `html { font-size: 16px; }
body { font-size: 14px; }`,
            note: "Both lines override the user's setting with fixed pixels, so raising the default does nothing.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "Some mobile browsers inflate small text automatically. The `text-size-adjust` property controls that, and `100%` leaves your sizes untouched. Most pages do not need to change it.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Test it like a user: set your browser's default font size to 24px, zoom to 200% and 400%, and check that nothing overlaps, clips or forces sideways scrolling.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Page zoom scales `px` too. The default font size setting only moves `rem`, `em` and `%`.",
            "Size text in `rem`, never set the root in `px`, and use `min-height` instead of `height` for text boxes.",
            "Write breakpoints in `em` or `rem` so layouts adapt to larger text sooner.",
            "Test with a larger default font size and with zoom at 200% and 400%.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "responsive-sizing-patterns",
      kind: "learn",
      title: "Responsive sizing patterns",
      summary: "A short list of reliable patterns that combine units for layouts that adapt without media queries.",
      minutes: 9,
      concept: {
        description:
          "Once you know the units and the maths functions, a handful of patterns do most of the work in responsive design: a centred wrapper with `min()`, fluid padding with `clamp()`, images with `max-width: 100%`, fixed shapes with `aspect-ratio` and grids that adapt on their own.",
        why: "These patterns replace piles of media queries with one declaration each, and they keep working at widths you never tested. They are the practical payoff of learning units well.",
        mentalModel:
          "Each pattern is a rule of thumb you tell the browser: \"be as wide as the screen, but never wider than this\", \"grow with the window, but only between these limits\". The browser does the arithmetic at every width.",
      },
      body: [
        { type: "heading", text: "A centred wrapper" },
        {
          type: "paragraph",
          text: "The classic page container is a column that fills small screens, with a little breathing room at the sides, and stops growing on large ones. With `min()`, it is two lines: the width is the smaller of \"the full width minus 2rem\" and \"60rem\", and `margin-inline: auto` centres it.",
        },
        {
          type: "code",
          language: "css",
          code: `.wrapper {
  width: min(100% - 2rem, 60rem);
  margin-inline: auto;
}`,
          caption: "A responsive, centred container",
        },
        { type: "heading", text: "Fluid spacing and sizes" },
        {
          type: "paragraph",
          text: "`clamp()` is the tool for spacing and type that should grow with the window within limits. A section's padding can run from 1rem on phones to 3rem on large screens, and a heading can grow from 1.75rem to 3rem, both with no breakpoints. Remember to include a `rem` part in any `vw` based value, so it still responds to the user's text settings and zoom.",
        },
        {
          type: "code",
          language: "css",
          code: `.section {
  padding-block: clamp(2rem, 6vw, 5rem);
}

h1 {
  font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
}`,
          caption: "Spacing and type that scale smoothly between two limits",
        },
        { type: "heading", text: "Media, shapes and grids" },
        {
          type: "list",
          items: [
            "**Images:** `max-width: 100%; height: auto;` stops them overflowing and keeps their shape.",
            "**Fixed shapes:** `aspect-ratio: 16 / 9` holds a box to a ratio at any width, which replaces the old padding hack.",
            "**Adaptive grids:** `grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` makes as many columns as fit, and never overflows a narrow screen.",
            "**Full-screen sections:** `min-height: 100svh`, which grows with its content.",
          ],
        },
        {
          type: "paragraph",
          text: "Why do these patterns hold up so well? Because they have no breakpoints, so there is no width at which the layout falls into a gap between two rules. A good way to test them is to drag the browser window slowly from 320px to 1600px, and watch for the width where something breaks. That width, not a particular phone or laptop, is where a media query belongs.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.wrapper {
  width: min(100% - 2rem, 60rem);
  margin-inline: auto;
}`,
            note: "Fills a phone with a margin on each side, and stops at 60rem on a monitor. No media query needed.",
          },
          bad: {
            code: `.wrapper {
  width: 960px;
  margin: 0 auto;
}`,
            note: "A fixed width forces sideways scrolling on any screen narrower than 960px.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Reach for these patterns before a media query. Add a breakpoint only when the layout itself must change shape, not just resize.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`width: min(100% - 2rem, 60rem); margin-inline: auto` gives a responsive, centred wrapper.",
            "`clamp(low, preferred, high)` gives fluid padding and type. Keep a `rem` part in the preferred value.",
            "Images use `max-width: 100%`, and boxes keep a shape with `aspect-ratio`.",
            "Use these patterns first, and media queries only when the layout has to change shape.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-mixed-units",
      kind: "lab",
      title: "Lab: choose the right unit",
      summary: "Convert a pixel-based card into one that uses rem, em, ch and viewport units where they belong.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<header class="hero">
  <h1 class="hero-title">Learn by building</h1>
</header>
<main class="card">
  <h2 class="card-title">Weekly plan</h2>
  <p class="card-text">Short lessons and steady practice.</p>
  <button class="cta">Start</button>
</main>`,
        css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.hero {
  padding: 24px;
  background-color: #e0e7ff;
}

.hero-title {
  margin: 0;
}

.card {
  margin: 24px auto;
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 24px;
}

.card-text {
  margin: 0 0 16px;
}

.cta {
  font-size: 1rem;
  padding: 12px 20px;
  border: 0;
  border-radius: 8px;
  background-color: #4f46e5;
  color: #ffffff;
}
`,
      },
      challenge: {
        title: "Use the right unit for each job",
        description:
          "Update the CSS so each size uses a unit that suits it. The hero should be at least half the window tall: `.hero` `min-height: 50vh`. The card is at most `30rem` wide with `1.75rem` of padding and `1rem` rounded corners, and its title is `1.75rem`. The button's padding scales with its own text, `0.8em 1.5em`, and its corners are `0.75em`.",
        hints: [
          "Edit the `.hero`, `.card`, `.card-title` and `.cta` rules. Leave the border at `1px`.",
          "The card gets a new `max-width`. Its padding, radius and title use `rem`. The button uses `em`.",
          "`.hero { min-height: 50vh; }` `.card { max-width: 30rem; padding: 1.75rem; border-radius: 1rem; }`",
          "`.card-title { font-size: 1.75rem; }` `.cta { padding: 0.8em 1.5em; border-radius: 0.75em; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".hero", property: "min-height", expected: ["50vh"], message: "The hero is at least `50vh` tall." },
          { type: "computedStyle", selector: ".card", property: "max-width", expected: ["30rem", "480px"], message: "The card is at most `30rem` wide." },
          { type: "computedStyle", selector: ".card", property: "padding-top", expected: ["1.75rem", "28px"], message: "The card padding is `1.75rem`." },
          { type: "computedStyle", selector: ".card", property: "border-radius", expected: ["1rem", "16px"], message: "The card corners are `1rem`." },
          { type: "computedStyle", selector: ".card-title", property: "font-size", expected: ["1.75rem", "28px"], message: "The card title is `1.75rem`." },
          { type: "computedStyle", selector: ".cta", property: "padding-top", expected: ["0.8em", "12.8px"], message: "The button's vertical padding is `0.8em`." },
          { type: "computedStyle", selector: ".cta", property: "padding-left", expected: ["1.5em", "24px"], message: "The button's side padding is `1.5em`." },
        ],
        solution: {
          html: `<header class="hero">
  <h1 class="hero-title">Learn by building</h1>
</header>
<main class="card">
  <h2 class="card-title">Weekly plan</h2>
  <p class="card-text">Short lessons and steady practice.</p>
  <button class="cta">Start</button>
</main>`,
          css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.hero {
  min-height: 50vh;
  padding: 24px;
  background-color: #e0e7ff;
}

.hero-title {
  margin: 0;
}

.card {
  max-width: 30rem;
  margin: 24px auto;
  padding: 1.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.75rem;
}

.card-text {
  margin: 0 0 16px;
}

.cta {
  font-size: 1rem;
  padding: 0.8em 1.5em;
  border: 0;
  border-radius: 0.75em;
  background-color: #4f46e5;
  color: #ffffff;
}
`,
        },
      },
    },

    // Guided build: step files live in ./units/workshops/build-a-landing-section (compiled by `npm run build:content`).
    buildALandingSection,

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-px-page",
      kind: "debug",
      title: "Debug: the page that ignores its readers",
      summary: "A root set in pixels, a compensating body size, a pixel title and a clipped card all fight the user's settings.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<header class="hero">
  <h1 class="title">Trail guide</h1>
</header>
<article class="card">
  <h2 class="card-title">Weekend routes</h2>
  <p>Eight marked routes, from an easy riverside loop to a full day on the ridge.</p>
</article>`,
        css: `html {
  font-size: 10px;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  font-size: 1.6rem;
}

.hero {
  padding: 2rem;
  background-color: #c7d2fe;
}

.title {
  margin: 0;
  font-size: 2.8rem;
}

.card {
  height: 12rem;
  overflow: hidden;
  padding: 1.6rem;
  border: 1px solid #cbd5e1;
}
`,
      },
      challenge: {
        title: "Make the page respect the user's settings",
        description:
          "This page overrides the reader's text size: the root is fixed at `10px`, the body uses `1.6rem` to get back to 16px, and the card has a fixed height that will clip bigger text. Fix it so the root uses `100%`, the body is `1rem`, the title is `1.75rem`, and the card has `min-height: 12rem` (instead of a fixed height) with `1.5rem` of padding.",
        hints: [
          "Start with `html`: a percentage keeps the user's own default text size.",
          "Once the root is fixed, the body's `1.6rem` will be far too big, so change it to `1rem`. The title's `rem` value also needs recalculating.",
          "`html { font-size: 100%; }` `body { font-size: 1rem; }` `.title { font-size: 1.75rem; }` and `.card { min-height: 12rem; padding: 1.5rem; }`",
        ],
        checks: [
          { type: "computedStyle", selector: "html", property: "font-size", expected: ["100%", "16px"], message: "The root uses `100%`, the user's own default." },
          { type: "computedStyle", selector: "body", property: "font-size", expected: ["1rem", "16px"], message: "The body text is `1rem`." },
          { type: "computedStyle", selector: ".title", property: "font-size", expected: ["1.75rem", "28px"], message: "The title is `1.75rem`." },
          { type: "computedStyle", selector: ".card", property: "min-height", expected: ["12rem", "192px"], message: "The card has `min-height: 12rem`." },
          { type: "computedStyle", selector: ".card", property: "padding-top", expected: ["1.5rem", "24px"], message: "The card padding is `1.5rem`." },
        ],
        solution: {
          html: `<header class="hero">
  <h1 class="title">Trail guide</h1>
</header>
<article class="card">
  <h2 class="card-title">Weekend routes</h2>
  <p>Eight marked routes, from an easy riverside loop to a full day on the ridge.</p>
</article>`,
          css: `html {
  font-size: 100%;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
}

.hero {
  padding: 2rem;
  background-color: #c7d2fe;
}

.title {
  margin: 0;
  font-size: 1.75rem;
}

.card {
  min-height: 12rem;
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "units-quiz",
      kind: "quiz",
      title: "Quiz: units",
      summary: "Eighteen questions on lengths, em and rem, percentages, viewport units, maths functions and user settings.",
      minutes: 14,
      passPercent: 70,
      questions: [
        {
          prompt: "Which of these is a valid length?",
          options: ["`10 px`", "`10px`", "`10,5px`", "`px10`"],
          answerIndex: 1,
          explanation: "A length is a number immediately followed by a unit, with no space, and decimals use a full stop.",
        },
        {
          prompt: "Which length can be written without a unit?",
          options: ["`1`", "`auto`", "`0`", "`none`"],
          answerIndex: 2,
          explanation: "Zero is the same in every unit, so `0` is the one length that needs no unit. Any other bare number is invalid for a length.",
        },
        {
          prompt: "How many CSS pixels are in one inch?",
          options: ["72", "16", "100", "96"],
          answerIndex: 3,
          explanation: "A CSS pixel is defined as 1/96 of an inch, so `1in` equals `96px`.",
        },
        {
          prompt: "On a property such as `padding`, what does `1em` measure against?",
          options: ["The element's own font size", "The root element's font size", "The parent's font size", "The viewport width"],
          answerIndex: 0,
          explanation: "For everything except `font-size`, `em` is the element's own computed font size. Only on `font-size` itself does it refer to the parent.",
        },
        {
          prompt: "`html` has `font-size: 20px`. What is `font-size: 2rem` on any element?",
          options: ["32px", "40px", "20px", "2px"],
          answerIndex: 1,
          explanation: "`rem` multiplies the root's font size, so 2 times 20px is 40px, however deeply the element is nested.",
        },
        {
          prompt: "Why does a nested list with `font-size: 0.8em` shrink at every level?",
          options: ["`em` is relative to the viewport", "Browsers shrink nested lists automatically", "Each level is 80% of its parent's already reduced size", "`rem` compounds, `em` does not"],
          answerIndex: 2,
          explanation: "On `font-size`, `em` is relative to the parent, so each level multiplies the previous one. `rem` avoids this because it always uses the root.",
        },
        {
          prompt: "A parent is 400px wide, and its child has `padding-top: 10%`. How much top padding does the child get?",
          options: ["10% of the parent's height", "10% of the child's own height", "10% of the window height", "40px: padding percentages use the parent's width"],
          answerIndex: 3,
          explanation: "Percentage padding and margin on every side are measured against the containing block's width, so 10% of 400px is 40px.",
        },
        {
          prompt: "A child has `height: 50%`, but its parent's height is `auto`. What happens?",
          options: ["The percentage is treated as `auto`, because the parent has no set height to measure", "It is half the window height", "It becomes zero", "The declaration is invalid"],
          answerIndex: 0,
          explanation: "A percentage height needs a parent whose height is definite. Otherwise, it behaves as `auto` and the box is only as tall as its content.",
        },
        {
          prompt: "Why can `width: 100vw` cause a horizontal scrollbar?",
          options: ["`vw` is always larger than a pixel", "`100vw` includes the width of the vertical scrollbar", "`vw` ignores margins", "It is not valid CSS"],
          answerIndex: 1,
          explanation: "`100vw` is the full window width including the scrollbar, which is wider than the space the page actually has, so it overflows.",
        },
        {
          prompt: "Which unit is the safest for a full-screen section on a phone, if you do not want it to resize while scrolling?",
          options: ["`vh`", "`dvh`", "`svh`", "`vmax`"],
          answerIndex: 2,
          explanation: "`svh` is the small viewport, with the toolbars showing, so it always fits and does not change as the toolbars come and go. `dvh` follows them, and plain `vh` is based on the large viewport.",
        },
        {
          prompt: "Which of these is valid?",
          options: ["`width: calc(100%-2rem);`", "`width: calc(100% -2rem);`", "`width: calc(100%- 2rem);`", "`width: calc(100% - 2rem);`"],
          answerIndex: 3,
          explanation: "In `calc()`, the `+` and `-` operators need a space on both sides. Without them, the expression is invalid.",
        },
        {
          prompt: "What does `clamp(1rem, 2.5vw, 2rem)` give when `2.5vw` works out to 10px?",
          options: ["`1rem` (16px): the minimum wins", "10px", "`2rem` (32px)", "Zero"],
          answerIndex: 0,
          explanation: "`clamp()` never goes below its first value. 10px is smaller than 1rem (16px), so the result is 16px.",
        },
        {
          prompt: "What does `1lh` equal?",
          options: ["The height of the window", "The element's computed line height", "The width of the zero character", "One line of the user's screen"],
          answerIndex: 1,
          explanation: "`lh` is the element's computed line height, so `margin-bottom: 1lh` is exactly one line of space.",
        },
        {
          prompt: "What do container query units such as `cqi` measure against?",
          options: ["The window", "The parent's font size", "The nearest ancestor that is a query container", "The root element"],
          answerIndex: 2,
          explanation: "`cqi` and its relatives are percentages of the nearest ancestor with `container-type` set. Without one, they fall back to the small viewport.",
        },
        {
          prompt: "Which unit in a media query follows the user's default font size?",
          options: ["`px`", "`vw`", "`%`", "`em`"],
          answerIndex: 3,
          explanation: "In media queries, `em` and `rem` are based on the browser's default font size, so breakpoints written in them respond to the user's text settings.",
        },
        {
          prompt: "A user raises their browser's default text size to 24px. What happens to `font-size: 18px`?",
          options: ["Nothing: a pixel size ignores that setting", "It becomes 24px", "It scales to 27px", "It becomes invalid"],
          answerIndex: 0,
          explanation: "A pixel font size is fixed. Only sizes based on the root, such as `rem`, follow the user's default text size.",
        },
        {
          prompt: "Which of these should usually be written in pixels?",
          options: ["The body font size", "A 1px border", "The maximum width of a text column", "The root font size"],
          answerIndex: 1,
          explanation: "Borders and similar thin details should stay crisp and fixed. Text sizes, text columns and the root font size should respond to the user's settings.",
        },
        {
          prompt: "How many degrees is `0.25turn`?",
          options: ["25", "45", "90", "180"],
          answerIndex: 2,
          explanation: "One turn is a full circle, 360 degrees, so a quarter turn is 90 degrees.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "units-review",
      kind: "review",
      title: "Review: units cheat sheet",
      summary: "Every unit family, what each one measures against, and which to choose.",
      minutes: 4,
      body: [
        { type: "heading", text: "What each unit measures against" },
        {
          type: "code",
          language: "css",
          code: `16px      /* a CSS pixel: 1/96 inch, fixed */
1.5rem    /* 1.5 x the ROOT font size (16px by default) */
1.5em     /* 1.5 x the element's OWN font size (parent's on font-size) */
50%       /* depends on the property: width of the parent, font of the parent... */
50vw 50vh /* 50% of the window width / height */
65ch      /* 65 x the width of a "0" in this font */
1lh       /* one line height */
4cqi      /* 4% of the query container's inline size */`,
        },
        { type: "heading", text: "Percent of what?" },
        {
          type: "code",
          language: "css",
          code: `width: 50%;           /* parent's width */
height: 50%;          /* parent's height (only if it is set, else auto) */
padding-top: 10%;     /* parent's WIDTH, even vertically */
font-size: 120%;      /* parent's font size */
line-height: 150%;    /* own font size, then inherited as pixels */
border-radius: 50%;   /* own box: a circle on a square */`,
        },
        { type: "heading", text: "Viewport units on phones" },
        {
          type: "code",
          language: "css",
          code: `min-height: 100svh;  /* small viewport: always fits */
min-height: 100dvh;  /* dynamic: follows the toolbars */
width: 100%;         /* not 100vw, which includes the scrollbar */`,
        },
        { type: "heading", text: "Maths functions" },
        {
          type: "code",
          language: "css",
          code: `width: calc(100% - 2rem);               /* spaces around + and - */
width: min(100% - 2rem, 60rem);         /* ceiling */
padding: clamp(1rem, 4vw, 3rem);        /* low, preferred, high */
font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem);`,
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "A length is a number plus a unit, with no space. Only `0` can go without a unit.",
            "`rem` for text and spacing, `em` inside components, `px` for borders and shadows.",
            "Never set the root font size in pixels. Use `100%` so the user's setting stays in charge.",
            "Nested `em` font sizes compound. `rem` does not.",
            "Percentage padding and margin use the parent's width. Percentage heights need a parent with a set height.",
            "Use `min-height`, not `height`, with `vh` or text, and `svh` or `dvh` instead of plain `vh` on phones.",
            "Times need a unit even for zero (`0s`), while `opacity`, `z-index` and `line-height` take plain numbers.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "When a size looks wrong, ask \"measured against what?\" and open the Computed panel in DevTools to see the pixel value the browser actually used.",
        },
      ],
    },
  ],
};

export default content;
