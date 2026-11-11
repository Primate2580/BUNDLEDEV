import type { TopicContent } from "@/engine/types";
import buildAResponsiveLanding from "./media-queries/workshops/build-a-responsive-landing/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: "what-is-responsive-design",
      kind: "learn",
      title: "What is responsive design?",
      summary: "One page that works on every screen, built from fluid layouts, flexible media and media queries.",
      minutes: 9,
      concept: {
        description:
          "**Responsive design** means building one page that adapts to whatever screen, window size or setting it is viewed in. It rests on three ideas: layouts that flex with the space available, images and media that scale with their container, and **media queries**, which apply different CSS depending on the conditions.",
        why: "People read your page on phones, tablets, laptops, TVs and printers, in windows of every width, with text zoomed or with different settings. You cannot design for each device, since new ones appear every year, so you build something that bends to fit all of them.",
        mentalModel:
          "A responsive page is water, not a block of ice. Water takes the shape of any container it is poured into. Media queries are the few places where you say, \"and when the container is this wide, pour it differently\".",
      },
      body: [
        { type: "heading", text: "The three ingredients" },
        {
          type: "list",
          items: [
            "**Fluid layout:** widths in percentages, `fr`, `rem` and `max-width`, instead of fixed pixel widths, so boxes stretch and shrink.",
            "**Flexible media:** images and video with `max-width: 100%`, so they never burst out of their container.",
            "**Media queries:** `@media` rules that change the CSS at the points where the fluid layout stops working well.",
          ],
        },
        {
          type: "paragraph",
          text: "Notice the order. Fluid layouts and flexible media do most of the work, and media queries are for the changes that need a decision, such as switching a menu from stacked to side by side, or going from one column to three. A page built mainly on fixed widths and patched with queries is a fragile page.",
        },
        { type: "heading", text: "Responsive does not mean device sizes" },
        {
          type: "paragraph",
          text: "There is no \"phone\" or \"desktop\" in CSS. A media query sees only a **width** (and other features), and the width of a browser window can be anything: a phone in portrait is about 375px, a phone in landscape about 800px, a desktop window can be dragged to any size, and a person who zooms in to 400% on a laptop gets a page about 320px wide. Design for ranges of width, and test by dragging the window, not by trusting a list of devices.",
        },
        {
          type: "code",
          language: "css",
          code: `.page {
  max-width: 60rem;
  margin-inline: auto;
  padding: 1rem;
}

.page img {
  max-width: 100%;
  height: auto;
}

@media (min-width: 48em) {
  .page { padding: 2rem; }
}`,
          caption: "A fluid container and flexible images, plus one query that adds more room on wide screens",
        },
        { type: "heading", text: "Try it here" },
        {
          type: "paragraph",
          text: "Above each preview in this app are three buttons: Full width, Tablet (768 pixels) and Phone (375 pixels). They resize the page area itself, so `@media (min-width: ...)` rules react just as they would in a real browser. Whenever a lesson talks about a breakpoint, press those buttons and watch the layout change.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  max-width: 24rem;
  width: 100%;
}`,
            note: "Fills a small screen, and stops at a comfortable size on a large one. It needs no query to be responsive.",
          },
          bad: {
            code: `.card {
  width: 384px;
}`,
            note: "A fixed width wider than a small phone's screen forces sideways scrolling, whatever queries you add.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "Responsive design started in 2010, when Ethan Marcotte combined fluid grids, flexible images and media queries under that name. Flexbox, grid and `clamp()` have since made the first two much easier.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Responsive design is one page that adapts to any screen, built from fluid layouts, flexible media and media queries.",
            "Do as much as possible with fluid sizes, and use queries for changes that need a decision.",
            "Queries see widths and features, not devices, so design for ranges of width and test by resizing.",
            "Use the Phone, Tablet and Full width buttons above the preview to see queries react.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "viewport-meta-and-zoom",
      kind: "learn",
      title: "The viewport meta tag and zoom",
      summary: "Why mobile browsers need it, what to put in it, and the settings that harm accessibility.",
      minutes: 9,
      concept: {
        description:
          "The **viewport meta tag**, `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`, tells mobile browsers to lay the page out at the real width of the device. Without it, they pretend the screen is about 980 pixels wide and shrink the page to fit, so none of your small-screen media queries ever apply.",
        why: "It is the single line that makes responsive design work on phones. Forgetting it is the classic reason a mobile page looks like a tiny desktop page. Adding the wrong settings to it can also make your site unusable for people who need to zoom.",
        mentalModel:
          "A phone browser is a polite guest who assumes every page was built for a big monitor, and shrinks it to fit. The viewport tag is the note on the door that says, \"No need, this one was built for your screen as it is\".",
      },
      body: [
        { type: "heading", text: "What the tag does" },
        {
          type: "paragraph",
          text: "Mobile browsers have two viewports: the **layout viewport**, the width at which the page is laid out, and the **visual viewport**, the part the person is actually looking at. By default, the layout viewport is a virtual width of around 980 CSS pixels. `width=device-width` sets it to the real width of the screen in CSS pixels, perhaps 375 on a phone. `initial-scale=1` sets the starting zoom to 100%. The tag goes in the `head`.",
        },
        {
          type: "code",
          language: "html",
          code: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Trail guide</title>
</head>`,
          caption: "The standard viewport tag, the same on almost every responsive site",
        },
        { type: "heading", text: "Settings to avoid" },
        {
          type: "paragraph",
          text: "Some old tutorials add `user-scalable=no` or `maximum-scale=1` to stop the page zooming when a form field gets focus. Both disable pinch-to-zoom, which people with low vision rely on, and they break WCAG's requirement that text can be resized. Browsers increasingly ignore these settings for that reason. The right fix for the focus zoom on some phones is to make form text at least `1rem` (16px), so the browser has no reason to zoom.",
        },
        {
          type: "compare",
          language: "html",
          good: {
            code: `<meta name="viewport"
      content="width=device-width, initial-scale=1" />`,
            note: "Lays out at the device width, and leaves zooming entirely to the person.",
          },
          bad: {
            code: `<meta name="viewport"
      content="width=1024, user-scalable=no, maximum-scale=1" />`,
            note: "A fixed 1024px layout, and zoom switched off. Small-screen queries never match, and low-vision users are locked out.",
          },
        },
        { type: "heading", text: "Zoom and media queries are connected" },
        {
          type: "paragraph",
          text: "On a desktop, zooming the page does not change your screen, but it **does** change the viewport in CSS pixels. At 200% zoom, a 1280px window has a 640px viewport, and at 400% it has only 320px. So a person who zooms in to read gets your small-screen layout, which is precisely what WCAG's reflow rule asks for: at 320px wide, content should fit with no sideways scrolling. Writing breakpoints in `em` helps: in a media query, `em` is based on the browser's default font size, so a person with larger text settings also reaches the small layout sooner.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Two optional keys are worth knowing. `viewport-fit=cover` lets the page extend under a phone's notch, and you then use `env(safe-area-inset-top)` and similar to keep content clear of it. `interactive-widget=resizes-content` tells supporting browsers to shrink the layout when the on-screen keyboard opens.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Use `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` in the `head` of every page.",
            "Without it, phones lay the page out at about 980px wide, and small-screen media queries never match.",
            "Never use `user-scalable=no` or `maximum-scale=1`, since they disable zoom for people who need it.",
            "Page zoom shrinks the viewport in CSS pixels, so zoomed-in desktops reach your small-screen layout.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "media-query-syntax",
      kind: "learn",
      title: "Media query syntax",
      summary: "Media types, features, and, comma, not and the modern range syntax, with the mistakes that silently disable a rule.",
      minutes: 11,
      concept: {
        description:
          "A media query is an `@media` rule with a condition and a block of CSS: `@media (min-width: 40em) { ... }`. The block applies only while the condition is true, and the browser re-checks it whenever the window, device or settings change.",
        why: "The syntax is small, but it is unforgiving. A missing colon, parenthesis or unit does not produce an error. The browser quietly treats the whole query as false, and your styles never apply. Knowing exactly how a query is built makes those bugs easy to spot.",
        mentalModel:
          "A media query is an `if` statement for CSS. The condition goes in parentheses, `and` joins conditions that must all be true, a comma means \"or\", and everything inside the braces is the \"then\".",
      },
      body: [
        { type: "heading", text: "The parts" },
        {
          type: "paragraph",
          text: "A query can start with a **media type**: `all` (the default), `screen` or `print`. After that come one or more **media features** in parentheses, each a name and, usually, a value: `(min-width: 40em)`, `(orientation: landscape)`, `(prefers-color-scheme: dark)`. Join conditions with `and`, and you must leave a space around the word.",
        },
        {
          type: "code",
          language: "css",
          code: `@media (min-width: 40em) { /* wide enough */ }

@media screen and (min-width: 40em) and (orientation: landscape) { }

@media (max-width: 30em), print { }   /* the comma means OR */

@media not print { }                  /* everything except print */`,
          caption: "A feature on its own, features joined with and, an or list and a not",
        },
        { type: "heading", text: "Range syntax" },
        {
          type: "paragraph",
          text: "Modern CSS lets you write width comparisons the way you would in maths. `(width >= 40em)` means the same as `(min-width: 40em)`, `(width < 40em)` replaces `(max-width: 39.99em)`, and `(30em <= width <= 60em)` describes a band between two widths. This form is clearer, and it removes the problem of gaps between `max-width` and `min-width` values. All current browsers support it.",
        },
        {
          type: "code",
          language: "css",
          code: `@media (width >= 48em) { }
@media (width < 48em) { }
@media (30em <= width < 60em) { }`,
          caption: "Range syntax: greater or equal, less than and a band",
        },
        { type: "heading", text: "The silent failures" },
        {
          type: "paragraph",
          text: "An invalid query is not an error. The browser treats it as `not all`, so it matches nothing, and the whole block is ignored. The usual causes are a missing colon, as in `(min-width 40em)`, missing parentheses, a value with no unit, such as `(min-width: 40)`, and `and` run into its neighbours. Also, `em` and `rem` in a query are based on the **browser's default font size**, not on any `font-size` you set on `html`.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `@media screen and (min-width: 40em) {
  .nav { display: flex; }
}`,
            note: "Parentheses, a colon, a unit and spaces around `and`. This query is valid and works.",
          },
          bad: {
            code: `@media screen and (min-width 40) {
  .nav { display: flex; }
}`,
            note: "No colon and no unit. The query is invalid, so it is treated as false and the rule never applies.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "You cannot use `var()` in a media query condition. `@media (min-width: var(--bp))` is invalid. Breakpoint values have to be written out, or generated by a tool.",
        },
        {
          type: "callout",
          tone: "note",
          text: "`only` (as in `only screen`) was once used to hide queries from very old browsers. It does nothing useful today, and you can leave it out.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`@media [type] and (feature: value) { ... }`. Types are `all`, `screen` and `print`.",
            "`and` joins conditions, a comma means \"or\", and `not` negates the whole query.",
            "Range syntax, such as `(width >= 40em)`, is clearer than `min-width` and `max-width`.",
            "An invalid query is silently false. Check colons, parentheses and units, and remember that `var()` is not allowed.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "min-width-and-max-width",
      kind: "learn",
      title: "min-width, max-width and the cascade",
      summary: "How the two width features work, why order in the file matters, and the gap between max-width and min-width.",
      minutes: 10,
      concept: {
        description:
          "`min-width: X` is true when the viewport is **at least** X wide, and `max-width: X` is true when it is **at most** X wide. Both are inclusive. Several queries can be true at once, and when they set the same property, the usual cascade rules decide: later rules of equal specificity win.",
        why: "Most responsive CSS is built from just these two features, and most responsive bugs come from misreading them: using the wrong one for your approach, putting rules in the wrong order, or leaving a tiny gap between two ranges where neither applies.",
        mentalModel:
          "`min-width` is a floor and `max-width` is a ceiling. A `min-width` rule switches on once the window grows past a line, and stays on, however much wider it gets. A `max-width` rule switches on once the window shrinks below a line, and stays on, however much narrower it gets.",
      },
      body: [
        { type: "heading", text: "Inclusive and overlapping" },
        {
          type: "paragraph",
          text: "At a width of exactly 600px, both `(min-width: 600px)` and `(max-width: 600px)` are true. When a viewport is 900px wide, **every** `min-width` query up to 900px is true, not just the largest one. That is why `min-width` rules stack up: the 500px rule, the 700px rule and the 900px rule all apply, and where they set the same property, the one that comes **later in the file** wins.",
        },
        {
          type: "code",
          language: "css",
          code: `.box { background-color: #4f46e5; }

@media (min-width: 500px) {
  .box { background-color: #059669; }
}

@media (min-width: 800px) {
  .box { background-color: #d97706; }
}`,
          caption: "At 900px both queries match, and the later rule gives orange",
        },
        { type: "heading", text: "Order matters" },
        {
          type: "paragraph",
          text: "Media queries add **no specificity**. A rule inside `@media` has exactly the same specificity as it would outside. So if you write the 800px rule before the 500px rule, then at 900px both match and the later one, the 500px rule, wins. The golden rule is to write `min-width` queries from smallest to largest, so the biggest matching one is the last one and wins. For `max-width` queries, write them from largest to smallest.",
        },
        { type: "heading", text: "The gap problem" },
        {
          type: "paragraph",
          text: "If you pair `(max-width: 599px)` with `(min-width: 600px)`, you may expect no gap. But viewport widths can be fractional: with a zoomed browser or a high-density screen, the viewport can be 599.5px wide, and neither query matches. Two cures exist. Use `min-width` queries only, so there is nothing to leave a gap between. Or use range syntax: `(width < 600px)` and `(width >= 600px)` partition every width exactly.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `@media (width < 600px) { .nav { display: none; } }
@media (width >= 600px) { .menu-btn { display: none; } }`,
            note: "Range syntax splits the widths exactly in two, with no gap and no overlap.",
          },
          bad: {
            code: `@media (max-width: 599px) { .nav { display: none; } }
@media (min-width: 600px) { .menu-btn { display: none; } }`,
            note: "At 599.5px neither matches, so both the nav and the menu button show.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "If a media rule seems to be ignored, look at the order in the file and at specificity. A later or more specific rule outside the query can beat the rule inside it.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`min-width` is true at or above the width, and `max-width` is true at or below it. Both include the boundary.",
            "All matching queries apply together, and rules of equal specificity are settled by file order.",
            "Write `min-width` queries smallest to largest, so the largest matching rule wins.",
            "Avoid the gap between `max-width` and `min-width` with range syntax, or use only one of the two.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-media-query",
      kind: "predict",
      title: "Predict the media query",
      summary: "Work out which rules apply at 400px, 650px and 900px, and which one wins when two match.",
      minutes: 7,
      mode: "css",
      intro: "A box has three media queries. Predict what it looks like at three window widths, then run the code and switch the preview between Phone (375px), Tablet (768px) and Full width to check.",
      code: {
        html: `<div class="box">Resize me</div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.box {
  padding: 24px;
  border: 6px solid transparent;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 700;
}

@media (min-width: 500px) {
  .box { background-color: #059669; }
}

@media (min-width: 800px) {
  .box { background-color: #d97706; }
}

@media (max-width: 600px) {
  .box { border-color: #0f172a; }
}`,
      },
      questions: [
        {
          prompt: "At a viewport 400px wide, what does the box look like?",
          options: ["Green, with no border", "Indigo, with a dark border", "Orange, with a dark border", "Indigo, with no border"],
          answerIndex: 1,
          hint: "Which of the three queries are true at 400px?",
          explanation: "At 400px, neither `min-width` query matches, so the background stays indigo. The `max-width: 600px` query is true, so the border turns dark navy.",
        },
        {
          prompt: "At 650px wide, what does it look like?",
          options: ["Indigo, with a dark border", "Orange, with no border", "Green, with a dark border", "Green, with no border"],
          answerIndex: 3,
          hint: "650px is over 500px, but under 800px, and over 600px.",
          explanation: "The `min-width: 500px` query is true, so the box turns green. The 800px query is not yet true. And `max-width: 600px` is false at 650px, so the border stays transparent.",
        },
        {
          prompt: "At 900px wide, both `min-width` queries are true and both set `background-color`. Which colour wins, and why?",
          options: ["Orange, because the 800px rule comes later in the file", "Green, because it was matched first", "Whichever has the bigger number", "The two colours blend"],
          answerIndex: 0,
          hint: "Media queries add no specificity. What decides between two equal rules?",
          explanation: "Both rules have the same specificity, so the cascade falls back to source order, and the later rule, the 800px one, wins. That is why `min-width` queries should be written from smallest to largest.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "breakpoint-explorer",
      kind: "visualizer",
      title: "Breakpoint explorer",
      summary: "Press Phone, Tablet and Full width above the preview, and watch the layout change at each breakpoint.",
      minutes: 10,
      concept: {
        description:
          "Four cards sit under a label that names the active breakpoint. Two media queries change the layout at 420px and 640px. Use the width buttons above the preview to switch between phone, tablet and full width, and use the controls to change the spacing that the queries leave alone.",
        why: "A breakpoint is easiest to understand when you see it fire. Pressing Phone and then Tablet and watching one column become two or four is more convincing than any description, and it shows exactly which rule is responsible.",
        mentalModel:
          "The window is a pair of curtains you can open and close. The label tells you which curtain position you are in. Each media query is a rule that says, \"when the curtains reach this line, rearrange the furniture\".",
      },
      stage: {
        html: '<header class="bar">Trailhead <nav><span>Routes</span><span>Gear</span></nav></header>\n<div class="page">\n  <p class="label"></p>\n  <div class="cards">\n    <div class="card">1</div>\n    <div class="card">2</div>\n    <div class="card">3</div>\n    <div class="card">4</div>\n  </div>\n</div>',
        baseCss:
          "html, body { margin: 0; }\nbody { font-family: system-ui, sans-serif; background: #f1f5f9; }\n.bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #4f46e5; color: #ffffff; font-weight: 700; font-size: 14px; }\n.bar nav span { margin-left: 10px; font-weight: 500; opacity: 0.9; }\n.page { padding: 12px; }\n.label { margin: 0 0 10px; color: #475569; font-size: 12px; font-weight: 700; }\n.card { box-sizing: border-box; min-height: 70px; padding: 10px; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #0f172a; font-weight: 700; }",
        annotate: "none",
        target: ".cards",
        items: ".card",
      },
      starter: `.cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label::after {
  content: "Base (under 420px): one column";
}

@media (min-width: 420px) {
  .cards {
    flex-direction: row;
  }

  .card {
    flex: 1 1 45%;
  }

  .label::after {
    content: "420px and up: two per row";
  }
}

@media (min-width: 640px) {
  .card {
    flex: 1 1 22%;
  }

  .label::after {
    content: "640px and up: four per row";
  }
}
`,
      controls: [
        { id: "gap", label: "gap", selector: ".cards", property: "gap", fallback: "8px", type: "range", min: 0, max: 32, step: 2, unit: "px", help: "The queries never change this, so it applies at every width." },
        { id: "height", label: "card height", selector: ".card", property: "min-height", fallback: "70px", type: "range", min: 40, max: 140, step: 10, unit: "px", help: "Also untouched by the queries." },
        { id: "radius", label: "card radius", selector: ".card", property: "border-radius", fallback: "10px", type: "range", min: 0, max: 40, step: 2, unit: "px", help: "Try it at each preview width." },
      ],
      presets: [
        { id: "tight", label: "Tight gap", description: "gap 2px", css: ".cards { gap: 2px; }" },
        { id: "roomy", label: "Roomy gap", description: "gap 24px", css: ".cards { gap: 24px; }" },
        { id: "tall", label: "Tall cards", description: "min-height 120px", css: ".card { min-height: 120px; }" },
      ],
      challenge: {
        title: "Let the cards wrap",
        description:
          "At 420px and wider, the cards sit in a row and get squeezed into one line instead of two per row. Fix it in the base `.cards` rule, so it works at every width: add `flex-wrap: wrap`, and change the `gap` to `1rem`.",
        hints: [
          "Both changes belong in the first `.cards` rule, outside the media queries.",
          "A flex row will not wrap unless you ask it to.",
          "`flex-wrap: wrap;` and `gap: 1rem;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".cards", property: "flex-wrap", expected: ["wrap"], message: "The cards are allowed to wrap: `flex-wrap: wrap`." },
          { type: "computedStyle", selector: ".cards", property: "gap", expected: ["1rem", "16px"], message: "The gap is `1rem`." },
        ],
        solution: `.cards {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
}

.label::after {
  content: "Base (under 420px): one column";
}

@media (min-width: 420px) {
  .cards {
    flex-direction: row;
  }

  .card {
    flex: 1 1 45%;
  }

  .label::after {
    content: "420px and up: two per row";
  }
}

@media (min-width: 640px) {
  .card {
    flex: 1 1 22%;
  }

  .label::after {
    content: "640px and up: four per row";
  }
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "mobile-first-workflow",
      kind: "learn",
      title: "Mobile first",
      summary: "Write the small-screen layout as the default, and add min-width queries as the window grows.",
      minutes: 10,
      concept: {
        description:
          "**Mobile first** means the plain, unqueried CSS describes the layout for the **smallest** screen, and `min-width` media queries add or change things as more room becomes available. The opposite approach, desktop first, writes the large layout first and uses `max-width` queries to take things away.",
        why: "The small layout is usually the simplest: one column, stacked blocks, normal flow. Building on top of it means each query only adds what the extra space allows, so you write less CSS, undo less of it, and the widest range of devices gets a working page even if a query fails.",
        mentalModel:
          "Mobile first is packing a small suitcase and adding items as you are given a bigger one. Desktop first is packing a huge trunk and then removing things to fit a carry-on. It is easier to add than to subtract.",
      },
      body: [
        { type: "heading", text: "The workflow" },
        {
          type: "list",
          items: [
            "**Start narrow.** Set the browser to about 320px, or press the Phone button, and write base styles: a single column, readable text, comfortable spacing.",
            "**Widen the window.** Drag it wider until the layout starts to look wrong: lines too long, large gaps, content that could sit side by side.",
            "**Add a query there.** At that width, add a `min-width` query that fixes just that problem.",
            "**Repeat** until the full width looks good. Usually two or three queries are enough.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `/* base: the phone layout */
.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* more room: a row */
@media (min-width: 40em) {
  .nav {
    flex-direction: row;
    gap: 1.5rem;
  }
}`,
          caption: "The default is a stack. A query only describes the change",
        },
        { type: "heading", text: "Why it beats desktop first" },
        {
          type: "paragraph",
          text: "With desktop first, the base styles describe a row, and the `max-width` query has to undo it: switch back to a column, hide things, shrink fonts, remove widths. Every property you set on large screens must be reset on small ones, so the queries grow long and the small layout ends up as a pile of overrides. With mobile first, a browser that fails to support or match a query, or an old device, still shows the simple, working layout instead of a broken desktop one.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.cards { display: grid; gap: 1rem; }

@media (min-width: 40em) {
  .cards { grid-template-columns: 1fr 1fr; }
}`,
            note: "The base is the default grid with one column, and the query adds a second column when there is room.",
          },
          bad: {
            code: `.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 39.99em) {
  .cards { grid-template-columns: 1fr; }
}`,
            note: "The base describes the big layout, and the query has to undo it, with an awkward `39.99em` to avoid an overlap.",
          },
        },
        {
          type: "paragraph",
          text: "Mobile first is also a form of progressive enhancement. The base styles are the version that works everywhere, including in a browser that does not understand a newer query or feature, and the queries add refinements for those that do. If the layout would still be usable with every query removed, you have built it the right way round.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Desktop first is still fine when you are adapting an existing desktop site. Pick one direction for a stylesheet, though. Mixing `min-width` and `max-width` queries for the same thing is where most confusion starts.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Mobile first: the base CSS is for the smallest screen, and `min-width` queries add to it.",
            "Widen the window until the layout breaks, and add a query at that width.",
            "It means less CSS to undo, a working default, and fewer overrides than desktop first.",
            "Choose one direction per stylesheet.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "choosing-breakpoints",
      kind: "learn",
      title: "Choosing breakpoints",
      summary: "Let the content decide where a layout should change, and keep the number of breakpoints small.",
      minutes: 9,
      concept: {
        description:
          "A **breakpoint** is a viewport width at which your layout changes. The best breakpoints are not tied to device sizes. They are the widths at which **your content** starts to look wrong, found by resizing the window, and they are written in `em` so that they respect the reader's text size.",
        why: "Device sizes change every year, and a layout tuned for one phone fails on the next. Content-driven breakpoints keep working because they describe your design, not somebody's hardware. Fewer breakpoints also means less CSS to maintain.",
        mentalModel:
          "A breakpoint is a seam in a piece of clothing, put where the cloth actually needs to bend. You find the seams by trying the garment on, not by measuring a list of customers.",
      },
      body: [
        { type: "heading", text: "Find them by resizing" },
        {
          type: "paragraph",
          text: "Start with your base layout at 320px, and slowly widen the window. Watch for the moments when something stops working: a line of text becomes longer than about 75 characters, a gap becomes enormous, a row of buttons wraps awkwardly, or there is room for two columns. Each of those moments is a breakpoint. Write the query at that width, rounded to a tidy number, and keep going.",
        },
        { type: "heading", text: "Common starting points" },
        {
          type: "paragraph",
          text: "Frameworks give you ready-made scales, and they are a reasonable place to start if you do not yet know where your design breaks. Tailwind CSS, for example, uses 640px, 768px, 1024px, 1280px and 1536px, which are 40, 48, 64, 80 and 96 `em`. Treat these as defaults to adjust, never as targets. A design with a nav that needs 52em to fit should break at 52em, not at the nearest default.",
        },
        {
          type: "code",
          language: "css",
          code: `/* breakpoints in em: they follow the user's default text size */
@media (min-width: 40em) { /* about 640px */ }
@media (min-width: 48em) { /* about 768px */ }
@media (min-width: 64em) { /* about 1024px */ }`,
          caption: "A small, ordered set, written in em",
        },
        { type: "heading", text: "Keep them few and consistent" },
        {
          type: "list",
          items: [
            "Two to four breakpoints usually cover a whole site. Each extra one multiplies what you must test.",
            "Use the same breakpoints everywhere, so components change at the same moments. Since `var()` is not allowed in queries, record the values in a comment or in your build tool.",
            "Prefer fluid sizing, such as `clamp()`, `flex-wrap` and `auto-fit` grids, to create smooth change between breakpoints. Use a query only when the layout must switch.",
            "Test between breakpoints too, especially just below each one, and with zoom at 200% and 400%.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `/* the nav needs about 52em to fit in a row */
@media (min-width: 52em) {
  .nav { flex-direction: row; }
}`,
            note: "The breakpoint comes from the content: it is where the nav actually fits.",
          },
          bad: {
            code: `/* iPhone 14 Pro Max */
@media (min-width: 430px) {
  .nav { flex-direction: row; }
}`,
            note: "Tied to one device, and wrong for any other phone. The nav may not even fit at 430px.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use the Phone and Tablet buttons for a quick check, but drag a real browser window across its whole range for the real test. Devices are only two points on a line.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Choose breakpoints where your content breaks when you resize, not at device sizes.",
            "Write them in `em` so they follow the user's text size, and keep them to two to four.",
            "Use the same ones across the whole site, and prefer fluid sizing between them.",
            "Test just below each breakpoint, and with zoom.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "layout-switch-explorer",
      kind: "visualizer",
      title: "Layout switch explorer",
      summary: "Build the phone, tablet and desktop layouts by changing the rules a media query will switch between.",
      minutes: 9,
      concept: {
        description:
          "Four cards use flexbox, with controls for the direction, wrapping, gap, card width basis and growth. There are no media queries here. You are building the three layouts that a breakpoint would switch between, so you can see exactly what each query would need to change.",
        why: "A media query is only a switch between sets of declarations. If you understand the sets, the query is trivial. Building each layout by hand first shows you which two or three properties actually have to change between phone and desktop.",
        mentalModel:
          "Each preset is a snapshot of the layout at a size. A media query is the thing that, as the window grows, swaps one snapshot for the next. Here you are editing the snapshots themselves.",
      },
      stage: {
        html: '<div class="page">\n  <div class="cards">\n    <div class="card">1</div>\n    <div class="card">2</div>\n    <div class="card">3</div>\n    <div class="card">4</div>\n  </div>\n</div>',
        baseCss:
          "html, body { margin: 0; }\nbody { font-family: system-ui, sans-serif; background: #f1f5f9; }\n.page { padding: 12px; }\n.card { box-sizing: border-box; min-height: 64px; padding: 10px; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #0f172a; font-weight: 700; }",
        annotate: "none",
        target: ".cards",
        items: ".card",
      },
      starter: `.cards {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;
}

.card {
  flex-basis: 100%;
  flex-grow: 0;
}
`,
      controls: [
        { id: "direction", label: "flex-direction", selector: ".cards", property: "flex-direction", fallback: "row", type: "options", options: ["column", "row"], help: "The first property that usually changes at a breakpoint." },
        { id: "wrap", label: "flex-wrap", selector: ".cards", property: "flex-wrap", fallback: "nowrap", type: "options", options: ["nowrap", "wrap"], help: "Lets a row continue on a new line." },
        { id: "gap", label: "gap", selector: ".cards", property: "gap", fallback: "0", type: "range", min: 0, max: 32, step: 2, unit: "px", help: "Space between the cards." },
        { id: "basis", label: "card flex-basis", selector: ".card", property: "flex-basis", fallback: "auto", type: "options", options: ["100%", "45%", "22%", "auto"], help: "The width each card starts from." },
        { id: "grow", label: "card flex-grow", selector: ".card", property: "flex-grow", fallback: "0", type: "options", options: ["0", "1"], help: "Whether the cards share spare room." },
      ],
      presets: [
        { id: "phone", label: "Phone layout", description: "one column", css: ".cards { flex-direction: column; flex-wrap: nowrap; }\n.card { flex-basis: 100%; flex-grow: 0; }" },
        { id: "tablet", label: "Tablet layout", description: "two per row", css: ".cards { flex-direction: row; flex-wrap: wrap; gap: 12px; }\n.card { flex-basis: 45%; flex-grow: 1; }" },
        { id: "desktop", label: "Desktop layout", description: "four per row", css: ".cards { flex-direction: row; flex-wrap: wrap; gap: 12px; }\n.card { flex-basis: 22%; flex-grow: 1; }" },
      ],
      challenge: {
        title: "Build the desktop layout",
        description:
          "The cards are in the phone layout. Turn them into the four-across desktop layout: `flex-direction: row`, `flex-wrap: wrap`, and for each card `flex-basis: 22%` and `flex-grow: 1`.",
        hints: [
          "Two changes go in the `.cards` rule, and two in the `.card` rule.",
          "The `flex-basis` is a percentage of the container, a little under a quarter, so that four fit with the gaps.",
          "`.cards { flex-direction: row; flex-wrap: wrap; }` and `.card { flex-basis: 22%; flex-grow: 1; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".cards", property: "flex-direction", expected: ["row"], message: "The cards sit in a row." },
          { type: "computedStyle", selector: ".cards", property: "flex-wrap", expected: ["wrap"], message: "The row can wrap." },
          { type: "computedStyle", selector: ".card", property: "flex-basis", expected: ["22%"], message: "Each card starts at `22%` wide." },
          { type: "computedStyle", selector: ".card", property: "flex-grow", expected: ["1"], message: "The cards share any spare room." },
        ],
        solution: `.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

.card {
  flex-basis: 22%;
  flex-grow: 1;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "responsive-layouts-with-flex-and-grid",
      kind: "learn",
      title: "Responsive layouts with flex and grid",
      summary: "Layouts that adapt on their own, and the few jobs that still need a media query.",
      minutes: 10,
      concept: {
        description:
          "Flexbox and grid can make layouts **intrinsically responsive**: with `flex-wrap`, minimum widths and `auto-fit` grids, columns appear and disappear as space allows, with no media query at all. Queries are then reserved for real structural changes.",
        why: "Every query you do not write is one less breakpoint to test and maintain. Letting the layout work out its own column count means it adapts at every width, including those between your breakpoints and in odd-sized containers.",
        mentalModel:
          "A media query says, \"at exactly this width, do this\". An intrinsic layout says, \"fit as many as you can, at least this big\". The second answers to the space, however much there is, so it needs no schedule.",
      },
      body: [
        { type: "heading", text: "Wrapping flex rows" },
        {
          type: "paragraph",
          text: "Give a flex container `flex-wrap: wrap` and each item a `flex-grow` and a minimum width. The items sit in a row until they would shrink below that minimum, and then they wrap to the next line, sharing out the spare room as they go. At a phone width, you get one column. On a tablet, two or three. On a desktop, as many as fit.",
        },
        {
          type: "code",
          language: "css",
          code: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex-grow: 1;
  min-width: 14rem;
}`,
          caption: "As many cards per row as fit, each at least 14rem wide",
        },
        { type: "heading", text: "Auto-fit grids" },
        {
          type: "paragraph",
          text: "In grid, `repeat(auto-fit, minmax(16rem, 1fr))` creates as many columns of at least 16rem as the container can hold, and stretches them to fill the row. Wrapping the minimum in `min(100%, 16rem)` stops a column from ever being wider than the container on a very narrow screen.",
        },
        {
          type: "code",
          language: "css",
          code: `.gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
}`,
          caption: "A fully responsive grid in one declaration",
        },
        { type: "heading", text: "What still needs a query" },
        {
          type: "list",
          items: [
            "**A change of arrangement,** such as moving a sidebar from under the content to beside it, or changing a column order.",
            "**Showing or hiding parts,** such as a full navigation bar instead of a menu button.",
            "**A different component,** such as a table that becomes a list of cards on a narrow screen.",
            "**Preference and capability queries,** which are not about width at all: dark mode, reduced motion, touch.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 14rem;
}`,
            note: "Responsive at every width without a single query.",
          },
          bad: {
            code: `.card { width: 100%; }

@media (min-width: 40em) {
  .card { width: 48%; }
}

@media (min-width: 64em) {
  .card { width: 23%; }
}`,
            note: "Hard-coded widths and two breakpoints for something the browser can work out itself, and it still breaks between them.",
          },
        },
        {
          type: "paragraph",
          text: "Other tools fill the gaps between breakpoints. `clamp()` makes spacing and type scale smoothly. `aspect-ratio` keeps boxes in proportion at any width, and `object-fit: cover` lets an image fill a box without distortion. Together with wrapping flex rows and `auto-fit` grids, they leave very little for a media query to do except decide the big structural changes.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Start with an intrinsic layout, test it across the whole range of widths, and add a query only where it still does not do what you want.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`flex-wrap: wrap` with `flex-grow` and `min-width` gives rows that wrap by themselves.",
            "`repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` builds a responsive grid in one line.",
            "Use media queries for arrangement changes, show and hide, different components and preferences.",
            "Every query you avoid is a breakpoint you do not have to test.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-fluid-cards",
      kind: "lab",
      title: "Lab: a layout that needs no breakpoints",
      summary: "Replace fixed widths with a wrapping, fluid layout that fits every screen.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<div class="page">
  <h1 class="title">Weekend routes</h1>
  <div class="cards">
    <article class="card"><h2>Riverside loop</h2><p>3 km, easy</p></article>
    <article class="card"><h2>Lake path</h2><p>6 km, moderate</p></article>
    <article class="card"><h2>Ridge scramble</h2><p>9 km, hard</p></article>
  </div>
  <img class="photo" alt="A sample landscape" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNGY0NmU1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZGIyNzc3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSI3MCIgcj0iMzQiIGZpbGw9IiNmZGU2OGEiLz48cGF0aCBkPSJNMCAyNDAgTDExMCAxMjAgTDE5MCAyMDAgTDI2MCAxNDAgTDQwMCAyNDAgWiIgZmlsbD0iIzFlMWI0YiIgb3BhY2l0eT0iMC44NSIvPjwvc3ZnPg==">
</div>`,
        css: `body {
  margin: 0;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

.page {
  margin: 0 auto;
}

.title {
  margin: 0 0 1rem;
}

.cards {
  display: flex;
  gap: 8px;
}

.card {
  width: 220px;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #e0e7ff;
}

.photo {
  display: block;
  width: 560px;
  margin-top: 1rem;
}
`,
      },
      challenge: {
        title: "Make the layout fluid",
        description:
          "The page and cards use fixed widths, so they overflow a phone. Fix it without a media query. Give `.page` `max-width: 60rem`. Let the cards wrap with `flex-wrap: wrap` and a `gap` of `1rem`. Replace each card's fixed `width` with `flex-grow: 1` and `min-width: 14rem`. And give the photo `max-width: 100%`.",
        hints: [
          "Four rules to change: `.page`, `.cards`, `.card` and `.photo`. Remove the fixed `width` from `.card` and from `.photo`.",
          "Flexible items need a minimum, so they know when to wrap, and permission to grow, so they fill the row.",
          "`.page { max-width: 60rem; }` `.cards { flex-wrap: wrap; gap: 1rem; }` `.card { flex-grow: 1; min-width: 14rem; }` `.photo { max-width: 100%; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".page", property: "max-width", expected: ["60rem", "960px"], message: "The page is at most `60rem` wide." },
          { type: "computedStyle", selector: ".cards", property: "flex-wrap", expected: ["wrap"], message: "The cards wrap onto new lines." },
          { type: "computedStyle", selector: ".cards", property: "gap", expected: ["1rem", "16px"], message: "The gap is `1rem`." },
          { type: "computedStyle", selector: ".card", property: "flex-grow", expected: ["1"], message: "The cards grow to fill the row." },
          { type: "computedStyle", selector: ".card", property: "min-width", expected: ["14rem", "224px"], message: "Each card is at least `14rem` wide." },
          { type: "computedStyle", selector: ".photo", property: "max-width", expected: ["100%"], message: "The photo never exceeds its container: `max-width: 100%`." },
        ],
        solution: {
          html: `<div class="page">
  <h1 class="title">Weekend routes</h1>
  <div class="cards">
    <article class="card"><h2>Riverside loop</h2><p>3 km, easy</p></article>
    <article class="card"><h2>Lake path</h2><p>6 km, moderate</p></article>
    <article class="card"><h2>Ridge scramble</h2><p>9 km, hard</p></article>
  </div>
  <img class="photo" alt="A sample landscape" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNGY0NmU1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZGIyNzc3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSI3MCIgcj0iMzQiIGZpbGw9IiNmZGU2OGEiLz48cGF0aCBkPSJNMCAyNDAgTDExMCAxMjAgTDE5MCAyMDAgTDI2MCAxNDAgTDQwMCAyNDAgWiIgZmlsbD0iIzFlMWI0YiIgb3BhY2l0eT0iMC44NSIvPjwvc3ZnPg==">
</div>`,
          css: `body {
  margin: 0;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

.page {
  max-width: 60rem;
  margin: 0 auto;
}

.title {
  margin: 0 0 1rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex-grow: 1;
  min-width: 14rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #e0e7ff;
}

.photo {
  display: block;
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-rigid-layout",
      kind: "debug",
      title: "Debug: the layout that will not bend",
      summary: "A fixed-width page, a row that cannot wrap, fixed columns and a long link all overflow on a phone.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<div class="page">
  <h1 class="title">Trail guide</h1>
  <p class="url">https://example.com/routes/riverside-loop/checkpoint-three/with-a-very-long-link-name</p>
  <div class="row">
    <div class="col">A</div>
    <div class="col">B</div>
    <div class="col">C</div>
  </div>
</div>`,
        css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.page {
  width: 960px;
  padding: 1rem;
}

.title {
  margin: 0 0 1rem;
}

.url {
  margin: 0 0 1rem;
}

.row {
  display: flex;
  gap: 1rem;
}

.col {
  width: 300px;
  padding: 1rem;
  background-color: #e0e7ff;
}
`,
      },
      challenge: {
        title: "Make the page flexible",
        description:
          "Switch the preview to Phone and the page scrolls sideways. Fix it: the page should be at most `60rem` wide (use `max-width`, not `width`), the row should wrap, each column should have `min-width: 12rem` and `flex-grow: 1` instead of a fixed `width`, and the long link should break with `overflow-wrap: anywhere`.",
        hints: [
          "Press the Phone button and look for what sticks out. Fixed widths are the usual cause.",
          "Replace `width` with `max-width` on the page, and replace the column's `width` with a minimum and a growth factor. A flex row also needs permission to wrap.",
          "`.page { max-width: 60rem; }` `.row { flex-wrap: wrap; }` `.col { min-width: 12rem; flex-grow: 1; }` `.url { overflow-wrap: anywhere; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".page", property: "max-width", expected: ["60rem", "960px"], message: "The page has `max-width: 60rem`." },
          { type: "computedStyle", selector: ".row", property: "flex-wrap", expected: ["wrap"], message: "The row wraps." },
          { type: "computedStyle", selector: ".col", property: "min-width", expected: ["12rem", "192px"], message: "Each column is at least `12rem` wide." },
          { type: "computedStyle", selector: ".col", property: "flex-grow", expected: ["1"], message: "The columns grow to fill the row." },
          { type: "computedStyle", selector: ".url", property: "overflow-wrap", expected: ["anywhere"], message: "The long link can break anywhere." },
        ],
        solution: {
          html: `<div class="page">
  <h1 class="title">Trail guide</h1>
  <p class="url">https://example.com/routes/riverside-loop/checkpoint-three/with-a-very-long-link-name</p>
  <div class="row">
    <div class="col">A</div>
    <div class="col">B</div>
    <div class="col">C</div>
  </div>
</div>`,
          css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.page {
  max-width: 60rem;
  padding: 1rem;
}

.title {
  margin: 0 0 1rem;
}

.url {
  margin: 0 0 1rem;
  overflow-wrap: anywhere;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.col {
  flex-grow: 1;
  min-width: 12rem;
  padding: 1rem;
  background-color: #e0e7ff;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "media-features-beyond-width",
      kind: "learn",
      title: "Media features beyond width",
      summary: "Orientation, resolution, hover and pointer: asking about the device's abilities, not only its size.",
      minutes: 9,
      concept: {
        description:
          "Width is only one thing a media query can test. Others describe the screen's orientation and shape (`orientation`, `aspect-ratio`), its sharpness (`resolution`), and how the person interacts with it (`hover`, `pointer`). Each lets you adapt to a capability, not just a size.",
        why: "Two devices of the same width can behave very differently: a tablet with a finger and a laptop window of the same size. Asking about the input method and the display, not the size, lets you give touch screens larger targets and keep hover effects for devices that can hover.",
        mentalModel:
          "Width asks, \"how big is the room?\" The other features ask, \"how will the person move around in it?\": with a finger or a mouse, standing the screen tall or wide, on a sharp display or a coarse one.",
      },
      body: [
        { type: "heading", text: "Shape and sharpness" },
        {
          type: "paragraph",
          text: "`orientation: portrait` is true when the viewport is taller than it is wide, and `landscape` when it is wider. `aspect-ratio` accepts ratios, as in `(min-aspect-ratio: 16/9)`. `resolution` describes pixel density, with `(min-resolution: 2dppx)` matching high-density screens, which is how you serve sharper images to them. These are rarely needed for layout, since a width query usually does the job.",
        },
        { type: "heading", text: "Hover and pointer" },
        {
          type: "paragraph",
          text: "`hover: hover` is true when the **primary** input can hover, as with a mouse, and `hover: none` when it cannot, as with a touch screen. `pointer` describes how precise it is: `fine` for a mouse, `coarse` for a finger, and `none` for no pointer. `any-hover` and `any-pointer` are true if **any** available input matches, which matters on laptops with touch screens. Use `hover: hover` to restrict hover-only effects to devices that can really hover, and `pointer: coarse` to make controls larger for fingers.",
        },
        {
          type: "code",
          language: "css",
          code: `.btn {
  min-height: 2.75rem;
}

@media (pointer: coarse) {
  .btn { min-height: 3rem; padding-inline: 1.5rem; }
}

@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}`,
          caption: "Bigger tap targets for fingers, and a hover lift only where hovering exists",
        },
        {
          type: "paragraph",
          text: "Accessibility guidance asks for tap targets of at least 24 by 24 CSS pixels (WCAG 2.2, level AA), and recommends 44 by 44, which is also what Apple's guidelines suggest, with 48 by 48 from Google's Material guidelines.",
        },
        { type: "heading", text: "Other features" },
        {
          type: "list",
          items: [
            "`display-mode: standalone`: the page was installed as an app and runs without browser chrome.",
            "`scripting: none`: JavaScript is unavailable.",
            "`update: slow` or `none`: the screen cannot redraw quickly, such as an e-ink reader or a printed page.",
            "`overflow-block`: how the device handles content that does not fit, such as paged output for print.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `@media (hover: hover) {
  .menu-item:hover { background-color: #e0e7ff; }
}`,
            note: "The hover style applies only on devices that can hover, so touch users do not get a stuck highlight after a tap.",
          },
          bad: {
            code: `.menu-item:hover {
  background-color: #e0e7ff;
}`,
            note: "On many touch devices, a tap leaves the \"hover\" state on until the next tap elsewhere, so the highlight sticks.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "Feature queries about capabilities are about the **device**, not the person. Many people use a mouse with a touch screen, or a keyboard only. Make sure that nothing essential depends on hover alone.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`orientation`, `aspect-ratio` and `resolution` describe the screen's shape and sharpness.",
            "`hover: hover` and `pointer: coarse` or `fine` describe how people interact with it.",
            "Wrap hover-only effects in `(hover: hover)`, and enlarge targets with `(pointer: coarse)`.",
            "Aim for tap targets of at least 24px, and ideally 44px.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "user-preference-queries",
      kind: "learn",
      title: "User preference queries",
      summary: "Dark mode, reduced motion, contrast and forced colours: respecting what people have asked their system for.",
      minutes: 11,
      concept: {
        description:
          "Some media features report **settings the person has chosen** in their operating system: `prefers-color-scheme` (light or dark), `prefers-reduced-motion`, `prefers-contrast` and `forced-colors`. Your CSS can honour them, and that is a basic part of making a site comfortable and accessible.",
        why: "People set these preferences because they need them: motion can cause dizziness or nausea, bright pages can hurt eyes in the dark, low contrast can be unreadable. Honouring them costs a few lines of CSS and makes the page usable for people it would otherwise exclude.",
        mentalModel:
          "The operating system is a message the person has left for every website: \"I prefer dark\", \"please keep things calm\". Preference queries are how your page reads the message, and decides to listen.",
      },
      body: [
        { type: "heading", text: "Reduced motion" },
        {
          type: "paragraph",
          text: "`prefers-reduced-motion: reduce` is true when the person has asked for less animation, often because large movement triggers dizziness or nausea. Respect it by turning off or toning down motion: large slides, parallax and bouncing. You can keep gentle, essential changes like a colour fade. A common safe pattern is to animate only when the person has **not** asked for reduced motion.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  transition: transform 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}

/* or, motion-safe: opt in to motion */
@media (prefers-reduced-motion: no-preference) {
  .hero { animation: slide-in 0.6s ease-out; }
}`,
          caption: "Turn motion off on request, or only add it when it is welcome",
        },
        { type: "heading", text: "Dark mode" },
        {
          type: "paragraph",
          text: "`prefers-color-scheme: dark` is true when the system is set to dark. The cleanest way to support it is with custom properties for your colours: define light values by default, and override them inside one dark query, so every component switches at once. Add `color-scheme: light dark` so that built-in controls, scrollbars and form fields also follow. The `light-dark()` function does the same job with less code.",
        },
        {
          type: "code",
          language: "css",
          code: `:root {
  color-scheme: light dark;
  --surface: #ffffff;
  --text: #0f172a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface: #0f172a;
    --text: #e2e8f0;
  }
}

body {
  background-color: var(--surface);
  color: var(--text);
}`,
          caption: "One set of variables, overridden once for dark mode",
        },
        { type: "heading", text: "Contrast and forced colours" },
        {
          type: "paragraph",
          text: "`prefers-contrast: more` (or `less`) reports a request for stronger or softer contrast, so you can add borders and darken muted text. `forced-colors: active` is true when the system replaces your colours with its own palette, as in Windows High Contrast mode. There, keep borders and outlines, use system colour keywords such as `CanvasText` and `ButtonText`, and remember that `box-shadow` and background images are removed, so do not depend on them for meaning.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
  }
}`,
            note: "A global reset that effectively switches off animation and transitions, with a safe, tiny duration.",
          },
          bad: {
            code: `@media (prefers-reduced-motion: no-preference) {
  .modal { display: block; }
}`,
            note: "Content that is essential has been tied to a motion setting, so it never appears for people who asked for reduced motion.",
          },
        },
        {
          type: "paragraph",
          text: "A system setting is a good default, but people sometimes want to override it for one site. A common pattern is to read the preference with a media query, and also let a visible theme toggle set an attribute such as `data-theme=\"dark\"` on `html`. Your custom properties then respond to either. Two other preference queries, `prefers-reduced-transparency` and `prefers-reduced-data`, exist, but browser support is still limited, so treat them as optional extras.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "You can try these in browser DevTools without changing your system: the Rendering panel lets you emulate dark mode, reduced motion, forced colours and print.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`prefers-reduced-motion: reduce` means tone down animation. Keep gentle, essential changes only.",
            "`prefers-color-scheme: dark` pairs with custom properties and `color-scheme: light dark`.",
            "`prefers-contrast` and `forced-colors: active` call for stronger borders, system colours and no reliance on shadows.",
            "Emulate each preference in DevTools to test it.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-preference-query",
      kind: "predict",
      title: "Predict the preference query",
      summary: "Work out how a card looks and behaves for different people: dark mode, touch, reduced motion and print.",
      minutes: 7,
      mode: "css",
      intro: "One card has rules for dark mode, reduced motion, hover and print. Predict what each kind of visitor sees, then run the code.",
      code: {
        html: `<article class="card">Weekend pass</article>`,
        css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.card {
  padding: 24px;
  border-radius: 12px;
  background-color: #ffffff;
  color: #0f172a;
  box-shadow: 0 4px 12px rgb(15 23 42 / 0.2);
  transition-property: transform;
  transition-duration: 0.3s;
}

@media (prefers-color-scheme: dark) {
  .card {
    background-color: #0f172a;
    color: #ffffff;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}

@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}

@media print {
  .card {
    box-shadow: none;
    border: 1px solid #000000;
  }
}`,
      },
      questions: [
        {
          prompt: "A visitor with default settings (light mode, a mouse, no motion preference) hovers over the card. What happens?",
          options: ["Nothing: the hover rule needs a touch screen", "The card turns dark", "The card lifts 4px smoothly over 0.3 seconds, and it is white", "The card lifts instantly"],
          answerIndex: 2,
          hint: "Which of the media queries are true for default settings?",
          explanation: "The base card is white and has a 0.3s transition. The `hover: hover` query is true for a mouse, so the card lifts, and because reduced motion is not requested, the transition animates it smoothly.",
          proves: [
            { type: "computedStyle", selector: ".card", property: "background-color", expected: ["#ffffff", "rgb(255, 255, 255)"], message: "By default, the card is white." },
            { type: "computedStyle", selector: ".card", property: "transition-duration", expected: ["0.3s"], message: "By default, it has a 0.3s transition." },
          ],
        },
        {
          prompt: "A visitor on a phone with the system set to dark mode taps the card. What do they see?",
          options: ["A dark card, with no lift, because a phone cannot hover", "A white card that lifts", "A white card with no lift", "A dark card that lifts"],
          answerIndex: 0,
          hint: "Think about `prefers-color-scheme` and `hover` separately.",
          explanation: "Dark mode is on, so the card is dark navy with white text. A touch screen reports `hover: none`, so the hover query is false and the card never lifts.",
        },
        {
          prompt: "A visitor with a mouse, light mode and \"reduce motion\" turned on hovers over the card. What happens?",
          options: ["The card does not move at all", "The card lifts smoothly", "The card turns dark", "The card lifts, but instantly, with no animation"],
          answerIndex: 3,
          hint: "The reduced motion query turns off the transition. Does it turn off the hover rule?",
          explanation: "The hover rule still applies, so the card still moves 4px. The reduced-motion query only sets `transition: none`, so the move happens at once, with no animation. That is the intent: no sweeping motion, while the effect remains.",
        },
        {
          prompt: "Someone prints the page. How does the card change?",
          options: ["It is unchanged", "The shadow is removed and a 1px black border is added", "It turns dark", "It is hidden"],
          answerIndex: 1,
          hint: "Which media type does the last query use?",
          explanation: "`@media print` applies only when printing, where the shadow is removed (shadows print badly) and a thin black border replaces it.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "print-styles",
      kind: "learn",
      title: "Print styles",
      summary: "Make a page print well with @media print, @page and page-break control.",
      minutes: 9,
      concept: {
        description:
          "`@media print` applies CSS only when the page is printed or saved as a PDF. You can use it to hide navigation and ads, switch to black text on white, show link addresses, and control where pages break, so printouts are clean and economical.",
        why: "People still print recipes, tickets, receipts, reports and articles, and save pages to PDF. A page with no print styles may waste ink on dark backgrounds, print a navigation bar on every page and cut an image across two sheets.",
        mentalModel:
          "Print styles are a second, quieter version of the page for paper. You remove what only makes sense on a screen, such as menus and buttons, and keep what makes sense on a sheet, such as the words and the addresses behind the links.",
      },
      body: [
        { type: "heading", text: "A basic print stylesheet" },
        {
          type: "paragraph",
          text: "Inside `@media print`, hide the parts of the page that are only useful on screen, make sure text is dark on a plain background, and drop decorative shadows. Browsers do not print background colours and images by default, to save ink, so do not rely on them for meaning. If you must force them, the property `print-color-adjust: exact` asks the browser to keep them, but you should use it sparingly.",
        },
        {
          type: "code",
          language: "css",
          code: `@media print {
  .site-nav,
  .ads,
  .btn {
    display: none;
  }

  body {
    color: #000000;
    background: #ffffff;
  }

  a[href]::after {
    content: " (" attr(href) ")";
  }
}`,
          caption: "Hide screen-only parts, use plain colours and print each link's address",
        },
        { type: "heading", text: "Page size and breaks" },
        {
          type: "paragraph",
          text: "The `@page` rule sets the page's margins and size: `@page { margin: 2cm; }`. For physical sizes, print stylesheets use real-world units such as `cm`, `mm`, `in` and `pt`. To control where pages break, `break-inside: avoid` keeps a figure, table row or card on one page, `break-after: page` forces a new page, and `break-before` and `break-after: avoid` keep a heading together with the text that follows. `orphans` and `widows` control how many lines of a paragraph may be left alone at the bottom or top of a page.",
        },
        {
          type: "code",
          language: "css",
          code: `@page {
  margin: 2cm;
}

@media print {
  h2, h3 { break-after: avoid; }
  figure, table, .card { break-inside: avoid; }
  p { orphans: 3; widows: 3; }
}`,
          caption: "Margins, headings that stay with their text, and blocks that are not split",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `@media print {
  .site-nav { display: none; }
  body { font-size: 12pt; color: #000000; }
}`,
            note: "A screen-only element is hidden, and text is sized in points with solid black ink.",
          },
          bad: {
            code: `/* no print rules at all */
.site-nav { position: fixed; top: 0; }
body { background: #0f172a; color: #ffffff; }`,
            note: "A fixed nav is repeated on every page, and the dark theme would burn ink if backgrounds printed, or give white text on white paper if they do not.",
          },
        },
        {
          type: "paragraph",
          text: "Print has its own typography habits. Sizes in `pt` (12pt is a common body size) and a serif font suit paper, links often lose their colour, and long URLs are best allowed to break with `overflow-wrap: anywhere`. If your design depends on a dark background to be readable, switch to dark text on white inside the print query instead of relying on `print-color-adjust`.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Test with the browser's print preview, or with DevTools' Rendering panel set to emulate print media. You can also save as a PDF to check page breaks without wasting paper.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`@media print` styles the printed page. Hide navigation and buttons, and use plain, dark text on a white page.",
            "Browsers do not print backgrounds by default, so do not rely on them. `print-color-adjust: exact` can override that.",
            "`@page` sets margins and size, and `break-inside: avoid` and `break-after: avoid` control page breaks.",
            "`a[href]::after { content: \" (\" attr(href) \")\" }` prints each link's address.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "media-queries-in-practice",
      kind: "learn",
      title: "Media queries in practice",
      summary: "Where to put queries, nesting, linked stylesheets, JavaScript, and a checklist for testing.",
      minutes: 10,
      concept: {
        description:
          "Writing a query is easy. Living with dozens of them is the harder part. A few habits keep them manageable: put each query next to the rule it changes (using CSS nesting), keep breakpoints consistent, use `matchMedia()` when JavaScript needs to react, and test with a real checklist.",
        why: "Responsive CSS tends to grow into a tangle of queries at the bottom of a file, far from the rules they change. A tidy approach makes it obvious which rules change at which width, and it makes bugs in the cascade easier to find.",
        mentalModel:
          "Keep the exception next to the rule it modifies, like a footnote on the same page rather than at the back of the book. Anyone reading the rule then sees all the ways it can change.",
      },
      body: [
        { type: "heading", text: "Queries next to their rules" },
        {
          type: "paragraph",
          text: "There are two layouts. You can gather all queries at the end of the stylesheet, or put each query right after the rule it changes. The second keeps related code together and is the better habit for components. **CSS nesting** makes it even tidier: you can write the query inside the rule, and the browser treats it as if it were written out in full. Nesting is supported in current browsers.",
        },
        {
          type: "code",
          language: "css",
          code: `.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 40em) {
    flex-direction: row;
    gap: 1.5rem;
  }
}`,
          caption: "The base rule and its change at 40em, in one place",
        },
        { type: "heading", text: "Linked stylesheets and JavaScript" },
        {
          type: "paragraph",
          text: "Media queries also work outside CSS rules. A `<link rel=\"stylesheet\" href=\"print.css\" media=\"print\">` applies the file only when it matches. The browser still downloads it, at low priority, but it does not hold up rendering. Also, `@import url(\"wide.css\") (min-width: 60em);` imports a file conditionally. When JavaScript needs to react to a query, use `window.matchMedia(\"(min-width: 40em)\")`, which returns an object with a `matches` flag, and fires a `change` event when the result changes.",
        },
        {
          type: "code",
          language: "js",
          code: `const wide = window.matchMedia("(min-width: 40em)");

function update() {
  menu.hidden = !wide.matches;
}

wide.addEventListener("change", update);
update();`,
          caption: "Show the menu when the viewport is wide enough, and react when it changes",
        },
        { type: "heading", text: "A testing checklist" },
        {
          type: "list",
          items: [
            "Drag the window across the whole range, from about 320px to your widest, not just to the exact breakpoints.",
            "Test just below and just above each breakpoint.",
            "Zoom to 200% and 400%. The reflow should leave no sideways scroll.",
            "Raise the browser's default font size, and check that nothing overlaps.",
            "Use DevTools to emulate dark mode, reduced motion, forced colours and print.",
            "Try a real phone, because touch and browser toolbars behave differently from an emulator.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  padding: 1rem;

  @media (min-width: 40em) {
    padding: 2rem;
  }
}`,
            note: "The change sits inside the rule it modifies, so one glance shows both values.",
          },
          bad: {
            code: `.card { padding: 1rem; }

/* ...400 lines later... */
@media (min-width: 40em) {
  .card { padding: 2rem; }
}`,
            note: "The related rule is hundreds of lines away, so changing one without the other is easy to do by accident.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "If a query seems to do nothing, check in DevTools whether the rule appears under the Styles panel for the element, and whether it is crossed out by a later or more specific rule. Queries add no specificity.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Keep each query next to the rule it changes, with CSS nesting to make it tidy.",
            "`<link media>` and `@import ... (condition)` apply files conditionally, and `matchMedia()` brings queries into JavaScript.",
            "Test across the whole width range, with zoom, larger text, preferences and a real device.",
            "A query that does nothing is usually a cascade or syntax problem, not a browser bug.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "media-vs-container-queries",
      kind: "learn",
      title: "Media queries or container queries?",
      summary: "Query the window or query the component's own box, and how to choose between them.",
      minutes: 8,
      concept: {
        description:
          "A media query measures the **viewport**. A **container query** measures a **parent box** that you choose, so a component can adapt to the space it has, wherever it is placed. They are partners: media queries for page-level decisions and user preferences, container queries for components.",
        why: "A card in a wide main area and the same card in a narrow sidebar are in the same viewport, so a media query cannot tell them apart. If the card should change shape depending on its own space, you need a query that looks at its container.",
        mentalModel:
          "A media query asks the weather outside the building. A container query asks the temperature in the room you are in. Both are useful, and you ask the one that matches the decision you are making.",
      },
      body: [
        { type: "heading", text: "The difference" },
        {
          type: "paragraph",
          text: "With a media query, every instance of a component changes at the same window width. With a container query, each instance changes at the width of **its own container**. To use one, mark an ancestor with `container-type: inline-size`, then write `@container (min-width: 30em) { ... }`. The rules inside apply to descendants of the nearest matching container. Container queries are supported in all current browsers, and a later topic covers them fully.",
        },
        {
          type: "code",
          language: "css",
          code: `.card-wrap {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 1rem;
}

@container (min-width: 30em) {
  .card {
    grid-template-columns: 8rem 1fr;
  }
}`,
          caption: "The card switches to a two-column layout when its own container is at least 30em wide",
        },
        { type: "heading", text: "Which to use" },
        {
          type: "list",
          items: [
            "**Media query:** the overall page layout, such as the sidebar position and the main navigation, and anything about the **device or the person**: dark mode, reduced motion, hover, print.",
            "**Container query:** a reusable **component** that may be placed in wide and narrow spaces: cards, product tiles, widgets.",
            "**Neither:** layouts that can adapt on their own with `flex-wrap`, `auto-fit` grids and `clamp()`.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `@container (min-width: 30em) {
  .card { flex-direction: row; }
}`,
            note: "The card responds to the room it is in, so it works in a sidebar, a main column or a modal alike.",
          },
          bad: {
            code: `@media (min-width: 60em) {
  .card { flex-direction: row; }
}`,
            note: "The card turns into a row on a wide window, even when it is squeezed in a narrow sidebar where a row does not fit.",
          },
        },
        {
          type: "paragraph",
          text: "Containers bring their own units too: `cqw` and `cqi` are percentages of the container's width, so a component's type and spacing can scale with its box. You can name a container with `container-name` and target it by name, which helps when containers are nested. Queries on a container's style, not just its size, are an emerging feature, so check support before using them.",
        },
        {
          type: "callout",
          tone: "note",
          text: "Preference queries such as `prefers-color-scheme` and `prefers-reduced-motion` stay media queries. A container has no opinion about dark mode.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Media queries measure the viewport. Container queries measure a parent that has `container-type`.",
            "Use media queries for page layout and for device and preference conditions.",
            "Use container queries for reusable components that appear in spaces of different sizes.",
            "Prefer layouts that adapt on their own, and add a query only where one is really needed.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-touch-friendly-controls",
      kind: "lab",
      title: "Lab: touch-friendly controls",
      summary: "Enlarge form fields, buttons and links so they are comfortable on a phone.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<form class="form">
  <label class="label" for="q">Search routes</label>
  <input class="field" id="q" type="text" />
  <div class="actions">
    <button class="btn" type="button">Search</button>
    <button class="btn" type="button">Clear</button>
  </div>
  <nav class="links">
    <a href="#">Routes</a>
    <a href="#">Gear</a>
    <a href="#">Stories</a>
  </nav>
</form>`,
        css: `body {
  margin: 0;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

.label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 700;
}

.field {
  box-sizing: border-box;
  width: 100%;
  padding: 0.25rem;
  font-size: 12px;
}

.actions {
  display: flex;
  gap: 2px;
  margin-top: 0.5rem;
}

.btn {
  height: 24px;
  padding: 0 0.5rem;
  border: 0;
  border-radius: 4px;
  background-color: #4f46e5;
  color: #ffffff;
}

.links {
  display: flex;
  gap: 4px;
  margin-top: 1rem;
}

.links a {
  padding: 2px;
}
`,
      },
      challenge: {
        title: "Make the controls easy to tap",
        description:
          "The controls are tiny, and tightly packed, so they are hard to tap and the small field text makes some phones zoom in. Fix it. The `.field` needs `font-size: 1rem` and `min-height: 2.75rem`. The `.btn` needs `min-height: 2.75rem` instead of its fixed `height`. Space the buttons with a `gap` of `0.5rem` on `.actions`, and the links with a `gap` of `1rem` on `.links`. Give each link `padding: 0.75rem`.",
        hints: [
          "Six properties across five rules. Replace the fixed `height` on `.btn` with `min-height`.",
          "2.75rem is 44px at the default text size, the commonly recommended minimum for a touch target.",
          "`.field { font-size: 1rem; min-height: 2.75rem; }` `.btn { min-height: 2.75rem; }` `.actions { gap: 0.5rem; }` `.links { gap: 1rem; }` `.links a { padding: 0.75rem; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".field", property: "font-size", expected: ["1rem", "16px"], message: "The field text is `1rem`, so phones do not zoom in." },
          { type: "computedStyle", selector: ".field", property: "min-height", expected: ["2.75rem", "44px"], message: "The field is at least `2.75rem` (44px) tall." },
          { type: "computedStyle", selector: ".btn", property: "min-height", expected: ["2.75rem", "44px"], message: "Each button is at least `2.75rem` (44px) tall." },
          { type: "computedStyle", selector: ".actions", property: "gap", expected: ["0.5rem", "8px"], message: "The buttons are `0.5rem` apart." },
          { type: "computedStyle", selector: ".links", property: "gap", expected: ["1rem", "16px"], message: "The links are `1rem` apart." },
          { type: "computedStyle", selector: ".links a", property: "padding-top", expected: ["0.75rem", "12px"], message: "Each link has `0.75rem` of padding." },
        ],
        solution: {
          html: `<form class="form">
  <label class="label" for="q">Search routes</label>
  <input class="field" id="q" type="text" />
  <div class="actions">
    <button class="btn" type="button">Search</button>
    <button class="btn" type="button">Clear</button>
  </div>
  <nav class="links">
    <a href="#">Routes</a>
    <a href="#">Gear</a>
    <a href="#">Stories</a>
  </nav>
</form>`,
          css: `body {
  margin: 0;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

.label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 700;
}

.field {
  box-sizing: border-box;
  width: 100%;
  min-height: 2.75rem;
  padding: 0.25rem;
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn {
  min-height: 2.75rem;
  padding: 0 0.5rem;
  border: 0;
  border-radius: 4px;
  background-color: #4f46e5;
  color: #ffffff;
}

.links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.links a {
  padding: 0.75rem;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-unresponsive-page",
      kind: "debug",
      title: "Debug: the page that is not mobile-ready",
      summary: "A wrong viewport tag, tiny form text, a small button and a fixed-width image make a page awkward on phones.",
      minutes: 10,
      mode: "html",
      broken: {
        html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1024, user-scalable=no" />
    <title>Trail guide</title>
    <style>
      body {
        margin: 0;
        padding: 1rem;
        font-family: system-ui, sans-serif;
      }

      .field {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem;
        font-size: 12px;
      }

      .btn {
        height: 28px;
        margin-top: 0.5rem;
        padding: 0 1rem;
        border: 0;
        background-color: #4f46e5;
        color: #ffffff;
      }

      .photo {
        display: block;
        width: 640px;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Trail guide</h1>
    <input class="field" type="text" placeholder="Search routes" aria-label="Search routes" />
    <button class="btn">Search</button>
    <img class="photo" alt="A sample landscape" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNGY0NmU1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZGIyNzc3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSI3MCIgcj0iMzQiIGZpbGw9IiNmZGU2OGEiLz48cGF0aCBkPSJNMCAyNDAgTDExMCAxMjAgTDE5MCAyMDAgTDI2MCAxNDAgTDQwMCAyNDAgWiIgZmlsbD0iIzFlMWI0YiIgb3BhY2l0eT0iMC44NSIvPjwvc3ZnPg==" />
  </body>
</html>`,
        css: "",
      },
      challenge: {
        title: "Make the page mobile-ready",
        description:
          "On a phone, this page lays itself out as a wide desktop page and blocks zooming. Fix the viewport tag so its content is exactly `width=device-width, initial-scale=1`. Then fix the styles: the `.field` text should be `1rem` (so phones do not zoom in), the `.btn` should have `min-height: 2.75rem` instead of a fixed `height`, and the `.photo` should have `max-width: 100%`, instead of a fixed `width`.",
        hints: [
          "The tag is in the `head`. Replace the whole `content` value, and remove anything that disables zooming.",
          "In the `style` block, change the `font-size`, swap `height` for `min-height`, and swap `width` for `max-width` on the image.",
          "`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />` then `font-size: 1rem;` `min-height: 2.75rem;` `max-width: 100%;`",
        ],
        checks: [
          { type: "attribute", selector: 'meta[name="viewport"]', attribute: "content", expected: "width=device-width, initial-scale=1", message: "The viewport tag is `width=device-width, initial-scale=1`." },
          { type: "count", selector: 'meta[name="viewport"][content*="user-scalable"]', max: 0, message: "Zooming is not disabled." },
          { type: "computedStyle", selector: ".field", property: "font-size", expected: ["1rem", "16px"], message: "The field text is `1rem`." },
          { type: "computedStyle", selector: ".btn", property: "min-height", expected: ["2.75rem", "44px"], message: "The button is at least `2.75rem` tall." },
          { type: "computedStyle", selector: ".photo", property: "max-width", expected: ["100%"], message: "The photo never exceeds its container." },
        ],
        solution: {
          html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Trail guide</title>
    <style>
      body {
        margin: 0;
        padding: 1rem;
        font-family: system-ui, sans-serif;
      }

      .field {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
      }

      .btn {
        min-height: 2.75rem;
        margin-top: 0.5rem;
        padding: 0 1rem;
        border: 0;
        background-color: #4f46e5;
        color: #ffffff;
      }

      .photo {
        display: block;
        max-width: 100%;
        height: auto;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Trail guide</h1>
    <input class="field" type="text" placeholder="Search routes" aria-label="Search routes" />
    <button class="btn">Search</button>
    <img class="photo" alt="A sample landscape" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNGY0NmU1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZGIyNzc3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSI3MCIgcj0iMzQiIGZpbGw9IiNmZGU2OGEiLz48cGF0aCBkPSJNMCAyNDAgTDExMCAxMjAgTDE5MCAyMDAgTDI2MCAxNDAgTDQwMCAyNDAgWiIgZmlsbD0iIzFlMWI0YiIgb3BhY2l0eT0iMC44NSIvPjwvc3ZnPg==" />
  </body>
</html>`,
          css: "",
        },
      },
    },

    // Guided build: step files live in ./media-queries/workshops/build-a-responsive-landing (compiled by `npm run build:content`).
    buildAResponsiveLanding,

    /* ------------------------------------------------------------------ */
    {
      id: "media-queries-quiz",
      kind: "quiz",
      title: "Quiz: media queries",
      summary: "Eighteen questions on the viewport tag, syntax, breakpoints, mobile first, preferences and print.",
      minutes: 14,
      passPercent: 70,
      questions: [
        {
          prompt: "What does the viewport meta tag `width=device-width` do?",
          options: ["It makes the page load faster", "It tells mobile browsers to lay the page out at the device's real width, not a wide virtual one", "It disables CSS on phones", "It sets the page language"],
          answerIndex: 1,
          explanation: "Without it, mobile browsers pretend the screen is about 980px wide and shrink the page, so small-screen media queries never match.",
        },
        {
          prompt: "Which viewport setting should you avoid, because it blocks pinch-to-zoom?",
          options: ["`width=device-width`", "`initial-scale=1`", "`user-scalable=no`", "`viewport-fit=cover`"],
          answerIndex: 2,
          explanation: "`user-scalable=no` and `maximum-scale=1` stop people with low vision from zooming, and they fail accessibility guidance.",
        },
        {
          prompt: "When is `@media (min-width: 40em)` true?",
          options: ["Only at exactly 40em", "When the viewport is narrower than 40em", "When an element is wider than 40em", "When the viewport is at least 40em wide"],
          answerIndex: 3,
          explanation: "`min-width` is a floor. The query matches at 40em and at every wider viewport.",
        },
        {
          prompt: "What is `1em` in a media query based on?",
          options: ["The browser's default font size, not a font size set in your CSS", "The `font-size` of `html`", "The font size of the element", "The viewport width"],
          answerIndex: 0,
          explanation: "In media queries, `em` and `rem` both use the browser's initial font size, so they ignore any `font-size` you set on `html`.",
        },
        {
          prompt: "What does \"mobile first\" mean?",
          options: ["Write the desktop layout first, then shrink it", "Write base CSS for small screens, then add `min-width` queries for larger ones", "Support only phones", "Use `max-width` queries everywhere"],
          answerIndex: 1,
          explanation: "The default CSS describes the smallest layout, and `min-width` queries add to it as space allows, which means less CSS to undo.",
        },
        {
          prompt: "What does the comma in `@media screen, print` mean?",
          options: ["and", "not", "or", "then"],
          answerIndex: 2,
          explanation: "A comma separates alternative queries, so the rules apply if any of them match. `and` joins conditions that must all be true.",
        },
        {
          prompt: "Why might `(max-width: 599px)` plus `(min-width: 600px)` leave a gap?",
          options: ["Browsers ignore `max-width`", "`px` is not allowed in queries", "Queries cannot be used together", "Viewport widths can be fractional, such as 599.5px, which matches neither"],
          answerIndex: 3,
          explanation: "Zoom and high-density screens can produce fractional widths. Range syntax, such as `(width < 600px)` and `(width >= 600px)`, has no gap.",
        },
        {
          prompt: "What does `@media (width >= 40em)` mean?",
          options: ["The same as `(min-width: 40em)`", "The same as `(max-width: 40em)`", "Exactly 40em", "Not 40em"],
          answerIndex: 0,
          explanation: "Range syntax lets you write comparisons directly. `>=` means at least, which is `min-width`.",
        },
        {
          prompt: "What should decide where you put your breakpoints?",
          options: ["Specific phone models", "Where your content's layout starts to look wrong when you resize", "The latest popular device", "A designer's favourite numbers"],
          answerIndex: 1,
          explanation: "Content-driven breakpoints keep working as devices change. Device-specific ones go out of date.",
        },
        {
          prompt: "What is `@media (hover: hover)` used for?",
          options: ["Detecting JavaScript", "Detecting mouse clicks", "Applying hover effects only on devices that can hover", "Detecting the colour scheme"],
          answerIndex: 2,
          explanation: "On touch screens, a tap can leave the hover state stuck. Wrapping hover-only effects in `(hover: hover)` avoids that.",
        },
        {
          prompt: "Which query turns animation down for people who asked for it?",
          options: ["`@media (prefers-reduced-motion: always)`", "`@media (motion: none)`", "`@media (animation: off)`", "`@media (prefers-reduced-motion: reduce)`"],
          answerIndex: 3,
          explanation: "`prefers-reduced-motion: reduce` is true when the person has asked their system for less animation.",
        },
        {
          prompt: "Which media query is valid?",
          options: ["`@media (min-width: 40em) { }`", "`@media (min-width 40em) { }`", "`@media min-width: 40em { }`", "`@media (min-width: 40) { }`"],
          answerIndex: 0,
          explanation: "A feature needs parentheses, a colon and a value with a unit. The others are invalid, so the browser treats them as false and the rules never apply.",
        },
        {
          prompt: "Can you use a custom property in a media query condition?",
          options: ["Yes, as `(min-width: var(--bp))`", "No: `var()` is not allowed in the condition of a media query", "Only for print", "Only for `max-width`"],
          answerIndex: 1,
          explanation: "Media query conditions are evaluated before custom properties exist, so `var()` does not work there. Breakpoints have to be written out.",
        },
        {
          prompt: "Which rule shows each link's address after it when a page is printed?",
          options: ["`a::after { href: attr(); }`", "`a { content: url; }`", "`a[href]::after { content: \" (\" attr(href) \")\"; }`", "`a::print { show: href; }`"],
          answerIndex: 2,
          explanation: "The `::after` pseudo-element with `content` and `attr(href)` inserts the link's address as text, and you put it inside `@media print`.",
        },
        {
          prompt: "A product card must change shape depending on the space of its sidebar or main column. What is the best tool?",
          options: ["A media query at one width", "Nothing can do this", "A print query", "A container query"],
          answerIndex: 3,
          explanation: "Media queries measure the viewport, which is the same for the card in both places. A container query measures the card's own container.",
        },
        {
          prompt: "Which value of `pointer` describes a finger on a touch screen?",
          options: ["`coarse`", "`fine`", "`hover`", "`none`"],
          answerIndex: 0,
          explanation: "`pointer: coarse` means a low-precision input like a finger. `fine` is a mouse or stylus, and `none` means no pointing device.",
        },
        {
          prompt: "A desktop user zooms the page to 400%. How does that relate to media queries?",
          options: ["It never triggers them", "It shrinks the viewport in CSS pixels, so small-screen queries start to apply", "It disables them", "It affects only print"],
          answerIndex: 1,
          explanation: "Zooming in makes the CSS viewport narrower, so a 1280px window at 400% is 320px wide. That is exactly how zoomed-in users reach your small-screen layout.",
        },
        {
          prompt: "Where should a larger `min-width` query go relative to smaller ones that set the same property?",
          options: ["First", "Anywhere", "After the smaller ones, so it wins the cascade when several match", "In a separate file"],
          answerIndex: 2,
          explanation: "Media queries add no specificity. When several `min-width` queries match, the one that comes later wins, so write them from smallest to largest.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "media-queries-review",
      kind: "review",
      title: "Review: media queries cheat sheet",
      summary: "The viewport tag, syntax, breakpoints, feature and preference queries and print on one page.",
      minutes: 4,
      body: [
        { type: "heading", text: "The viewport tag" },
        {
          type: "code",
          language: "html",
          code: `<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- never: user-scalable=no, maximum-scale=1 -->`,
        },
        { type: "heading", text: "Syntax" },
        {
          type: "code",
          language: "css",
          code: `@media (min-width: 40em) { }                 /* at least 40em wide */
@media (width >= 40em) { }                   /* range syntax: same thing */
@media (30em <= width < 60em) { }            /* a band */
@media screen and (orientation: landscape) { }
@media (max-width: 30em), print { }          /* comma = or */
@media not print { }
/* invalid queries are silently false; var() is not allowed in conditions */`,
        },
        { type: "heading", text: "Mobile first" },
        {
          type: "code",
          language: "css",
          code: `.nav { display: flex; flex-direction: column; }      /* base: the small layout */

@media (min-width: 40em) {                          /* smallest to largest */
  .nav { flex-direction: row; }
}

.card { padding: 1rem; @media (min-width: 40em) { padding: 2rem; } }   /* nesting */`,
        },
        { type: "heading", text: "Capabilities and preferences" },
        {
          type: "code",
          language: "css",
          code: `@media (hover: hover) { .card:hover { transform: translateY(-4px); } }
@media (pointer: coarse) { .btn { min-height: 3rem; } }
@media (prefers-reduced-motion: reduce) { * { transition-duration: 0.01ms; } }
@media (prefers-color-scheme: dark) { :root { --surface: #0f172a; } }
@media (prefers-contrast: more) { }   @media (forced-colors: active) { }
@media (min-resolution: 2dppx) { }`,
        },
        { type: "heading", text: "Print" },
        {
          type: "code",
          language: "css",
          code: `@page { margin: 2cm; }
@media print {
  .site-nav, .btn { display: none; }
  a[href]::after { content: " (" attr(href) ")"; }
  figure, table { break-inside: avoid; }
}`,
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "Put the viewport tag in every page, and never disable zoom.",
            "Write the small layout first, and add `min-width` queries from smallest to largest.",
            "Choose breakpoints where your content breaks, in `em`, and keep them few.",
            "`em` in a media query means the browser's default font size, not the `html` size.",
            "Media queries add no specificity. File order decides between matching rules.",
            "Prefer fluid layouts, and use queries for arrangement changes, preferences and capabilities.",
            "Use container queries when a component should adapt to its own space.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use the Phone, Tablet and Full width buttons, drag a real window, and emulate preferences in DevTools. A query you have not seen fire is a query you have not tested.",
        },
      ],
    },
  ],
};

export default content;
