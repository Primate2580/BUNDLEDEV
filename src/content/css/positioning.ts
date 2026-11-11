import type { TopicContent } from "@/engine/types";
import buildAnArticlePage from "./positioning/workshops/build-an-article-page/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: "normal-flow-and-static",
      kind: "learn",
      title: "Normal flow and position: static",
      summary: "How the browser lays things out by default, and what the five position values change.",
      minutes: 9,
      concept: {
        description:
          "Before any positioning, the browser lays elements out in **normal flow**: blocks stack down the page, and inline content runs along lines. Every element starts with `position: static`, which means \"leave me in the flow\". The other four values, `relative`, `absolute`, `fixed` and `sticky`, move an element away from, or partly out of, that flow.",
        why: "Most of CSS layout works with the flow, not against it. Positioning is a set of precise exceptions, and knowing what the default is, and what each exception takes away, tells you when to reach for it and, just as often, when not to.",
        mentalModel:
          "Normal flow is text in a book: each paragraph sits under the last one. Positioning is sticking a note on top of the page. Some notes still keep their place in the book (relative), some are lifted off completely (absolute and fixed), and some behave like a page marker that slides along with you (sticky).",
      },
      body: [
        { type: "heading", text: "What normal flow is" },
        {
          type: "paragraph",
          text: "In normal flow, **block** elements such as `div`, `p` and `h2` each start on a new line and stretch to the width of their container, so they stack from top to bottom. **Inline** content such as text and `span` flows along lines and wraps at the edge. Each element takes up space, and the next one is placed after it. You do not tell the browser where anything goes, because the order of the HTML does it.",
        },
        { type: "heading", text: "position: static" },
        {
          type: "paragraph",
          text: "`position: static` is the default for every element, so you almost never write it. A static element is placed by normal flow, and the offset properties `top`, `right`, `bottom` and `left` have **no effect** on it, nor does `z-index` in most cases. You write `static` only to cancel a position set by another rule.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  position: static;  /* the default: in flow, offsets ignored */
  top: 40px;         /* ignored */
}`,
          caption: "Offsets do nothing until the element is positioned",
        },
        { type: "heading", text: "The five values at a glance" },
        {
          type: "list",
          items: [
            "`static`: in the flow, the default. Offsets and `z-index` are ignored.",
            "`relative`: stays in the flow, but can be nudged from its normal place. Its space is kept.",
            "`absolute`: removed from the flow, placed against its nearest positioned ancestor.",
            "`fixed`: removed from the flow, placed against the viewport, and it stays put when the page scrolls.",
            "`sticky`: in the flow until you scroll past a threshold, and then it sticks.",
          ],
        },
        {
          type: "paragraph",
          text: "Any element whose `position` is anything other than `static` is called a **positioned element**. That word matters, because it appears in the rules for containing blocks and stacking. Positioned elements can also use `top`, `right`, `bottom`, `left` and `z-index`.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.badge {
  position: absolute;
  top: 0;
  right: 0;
}`,
            note: "The element is positioned, so the offsets have an effect and the badge moves to the corner.",
          },
          bad: {
            code: `.badge {
  top: 0;
  right: 0;
}`,
            note: "There is no `position`, so the element is static and both offsets are silently ignored.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "If an offset or `z-index` seems to do nothing, check whether the element is positioned. It is one of the most common reasons for \"CSS not working\".",
        },
        {
          type: "callout",
          tone: "note",
          text: "Layout tools such as flexbox and grid are usually better than positioning for arranging a page. Positioning is for the special cases: badges, overlays, pinned headers and tooltips.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Normal flow stacks blocks vertically and wraps inline content in lines.",
            "`position: static` is the default, and it ignores `top`, `right`, `bottom`, `left` and `z-index`.",
            "A positioned element is any element whose position is not `static`.",
            "Use positioning for exceptions such as badges, overlays and pinned bars, and use flexbox or grid for layout.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "position-relative",
      kind: "learn",
      title: "position: relative",
      summary: "Nudge an element from its normal place while it keeps its space, and make it an anchor for children.",
      minutes: 9,
      concept: {
        description:
          "`position: relative` keeps an element in normal flow, so it takes up its usual space, but lets you shift it visually with `top`, `right`, `bottom` and `left`, measured from where it would normally sit. It also makes the element a reference point for any absolutely positioned children.",
        why: "Relative positioning has two jobs. The small one is a visual nudge. The big one is providing an anchor: an absolutely positioned child is placed relative to its nearest positioned ancestor, and a plain `position: relative` is the usual way to set that ancestor up.",
        mentalModel:
          "Imagine a sticker on a page. Its place in the layout is marked by an invisible outline that stays put, while the sticker itself can slide a little away from the outline. Everything else treats the sticker as if it were still on the outline.",
      },
      body: [
        { type: "heading", text: "Offsets from the normal position" },
        {
          type: "paragraph",
          text: "With `position: relative; top: 20px; left: 10px`, the element moves 20px **down** and 10px **right** from its normal place. Positive `top` pushes it down, because the offset describes the distance from the top edge, and positive `left` pushes it right. Negative values go the other way. The offsets can use any length or percentage.",
        },
        {
          type: "code",
          language: "css",
          code: `.nudged {
  position: relative;
  top: 20px;
  left: 10px;
}`,
          caption: "The element is drawn 20px lower and 10px to the right of where it would be",
        },
        { type: "heading", text: "Its space stays behind" },
        {
          type: "paragraph",
          text: "This is the property that makes `relative` unlike the others. A relatively positioned element is shifted visually, but the **layout does not change**. Its original space is still reserved, so its siblings do not move to fill the gap, and the parent stays the same size. You can see the nudged element overlap its neighbours, while the neighbours behave as though nothing happened.",
        },
        { type: "heading", text: "An anchor for children" },
        {
          type: "paragraph",
          text: "By far the most common use of `position: relative` is to write it with **no offsets at all**. A relatively positioned element with no offsets does not move, but it becomes the **containing block** for any absolutely positioned descendants. That is how you make a badge sit in the corner of a card: the card gets `position: relative`, and the badge gets `position: absolute`.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  position: relative;   /* no offsets: it just becomes the anchor */
}

.card .badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}`,
          caption: "The badge is now placed against the card, not the page",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  position: relative;
}`,
            note: "No offsets needed. It stays exactly where it is and becomes the anchor for absolute children.",
          },
          bad: {
            code: `.card {
  position: relative;
  top: -3px;
  left: 2px;
}`,
            note: "A relative nudge used to fix an alignment problem. It hides the real cause and breaks as soon as the layout changes.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "Do not use `relative` with offsets as your main layout tool. The element's space stays behind, so overlaps and gaps appear. Use margins, flexbox or grid to place things, and keep relative offsets for small visual touches.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "`top` and `bottom` together on a relative element: if both are given, `top` wins and `bottom` is ignored. For `left` and `right`, `left` wins in left-to-right languages.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`position: relative` shifts an element from its normal place, but its original space is kept.",
            "Positive `top` moves it down and positive `left` moves it right, which are offsets from that edge.",
            "Siblings and the parent do not move, so a nudged element can overlap its neighbours.",
            "Its most common use is no offsets at all, to be the anchor for an absolutely positioned child.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "position-absolute",
      kind: "learn",
      title: "position: absolute",
      summary: "Lift an element out of the flow and place it exactly, against its nearest positioned ancestor.",
      minutes: 10,
      concept: {
        description:
          "`position: absolute` removes an element from normal flow completely, so its siblings close ranks as if it were not there, and then places it using `top`, `right`, `bottom` and `left` measured from its **nearest positioned ancestor**. If there is none, it is placed against the page.",
        why: "Absolute positioning is how you build badges, overlays, tooltips, corner buttons and anything that must sit at an exact spot inside something else. It is also the source of the most famous positioning bug: forgetting to make the parent positioned, so the element flies off to the corner of the page.",
        mentalModel:
          "An absolutely positioned element is a sticker peeled off the page and stuck down again using coordinates. The sticker is measured from the corner of the nearest ancestor that has been marked as a ruler. If none has been marked, it is measured from the page itself.",
      },
      body: [
        { type: "heading", text: "Out of the flow" },
        {
          type: "paragraph",
          text: "When an element becomes absolute, the browser stops reserving space for it. Its siblings move up into the gap, and its parent no longer grows to contain it, so a parent whose only child is absolute can collapse to zero height. The element is also **shrink-wrapped**: with `width: auto`, it is only as wide as its content, not the width of its container as a normal block would be.",
        },
        { type: "heading", text: "Placing it" },
        {
          type: "paragraph",
          text: "The offsets measure the distance from the edges of the **containing block**, which is the padding box of the nearest ancestor with a position other than `static`. `top: 0; right: 0` pins the element's top right corner to the ancestor's top right corner. If you give both `left` and `right` (and a `width` of `auto`), the element stretches to fit between them, and so do `top` and `bottom` for height.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  position: relative;
}

.card .corner {
  position: absolute;
  top: 0;
  right: 0;
}

.card .overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}`,
          caption: "A corner button, and an overlay that covers the whole card",
        },
        { type: "heading", text: "The classic bug" },
        {
          type: "paragraph",
          text: "If no ancestor is positioned, an absolute element is placed against the **initial containing block**, which is a box the size of the viewport at the top of the page. So `top: 0; right: 0` puts a badge in the top right corner of the **window**, miles from the card it was meant for. The fix is nearly always one line: give the intended parent `position: relative`.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
}`,
            note: "The card is positioned, so the badge sits in the card's corner.",
          },
          bad: {
            code: `.card {
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
}`,
            note: "Nothing is positioned, so the badge jumps to the corner of the page, away from the card.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "A parent that holds only absolute children has no height, because absolute children add nothing to it. Give the parent an explicit height or `min-height` so it keeps its shape.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "When you are fixing a stray absolute element, work outwards. Ask which ancestor should be the reference, and make that one `position: relative`.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`position: absolute` removes the element from the flow, so siblings close the gap and the parent may collapse.",
            "Offsets are measured from the padding box of the nearest positioned ancestor.",
            "With no positioned ancestor, the page (the initial containing block) is used, which causes the classic stray-badge bug.",
            "Give the intended parent `position: relative` to anchor its absolute children.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "containing-blocks",
      kind: "learn",
      title: "Containing blocks",
      summary: "Exactly which box an element's size and offsets are measured against, and the surprising things that create one.",
      minutes: 10,
      concept: {
        description:
          "Every element's percentages and offsets are measured against a **containing block**. For a normal element, it is the content box of its nearest block parent. For an absolutely positioned element, it is the padding box of its nearest ancestor that is positioned, or has a `transform`, `filter` or similar property. For a fixed one, it is usually the viewport.",
        why: "\"Percent of what?\" and \"offset from what?\" have a single answer, the containing block. When a positioned element lands somewhere you did not expect, the reason is almost always a different containing block than you thought, often because of a transform you forgot you had.",
        mentalModel:
          "A containing block is the sheet of graph paper an element is drawn on. Different positions use different sheets. Static elements use their parent's content area, absolute ones use the nearest ruler-marked ancestor's padding area, and fixed ones use the window.",
      },
      body: [
        { type: "heading", text: "The rule for each position" },
        {
          type: "list",
          items: [
            "**static and relative:** the content box of the nearest block-level ancestor.",
            "**absolute:** the **padding box** of the nearest ancestor that is positioned (not `static`), or that creates a containing block in another way. If none, the initial containing block, a box the size of the viewport at the top of the document.",
            "**fixed:** the viewport (the window), unless an ancestor creates a containing block, as below.",
            "**sticky:** it is placed in normal flow, and its offsets are measured from the nearest scrolling ancestor.",
          ],
        },
        {
          type: "paragraph",
          text: "Note the word **padding box** for absolute elements. An absolute child with `top: 0; left: 0` sits just inside the ancestor's border, in the padding area, and percentages refer to the padding box size. For static children the containing block is the content box, which is smaller, so the same percentage gives a different size.",
        },
        { type: "heading", text: "Surprising things that create one" },
        {
          type: "paragraph",
          text: "Besides `position`, some properties turn an element into a containing block for **both absolute and fixed** descendants. The most common are `transform` (any value other than `none`), `filter`, `perspective`, `contain: layout` or `paint`, and `will-change: transform`. A fixed header inside an element with `transform: translateY(0)` stops being fixed to the window, and it scrolls away with that element.",
        },
        {
          type: "code",
          language: "css",
          code: `.page {
  transform: translateZ(0);   /* now .page is the containing block... */
}

.page .header {
  position: fixed;            /* ...so this is fixed to .page, not the window */
  top: 0;
}`,
          caption: "A transform quietly changes what position: fixed means",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.dialog-wrap {
  position: relative;
}

.dialog-wrap .close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}`,
            note: "A deliberate containing block: the wrapper is positioned, and the close button is measured from it.",
          },
          bad: {
            code: `.dialog-wrap {
  transform: scale(1);
}

.dialog-wrap .close {
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
}`,
            note: "The transform makes `.dialog-wrap` the containing block, so \"fixed\" means fixed to the wrapper, which is rarely what you intended.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "When a `fixed` or `absolute` element is in the wrong place, open DevTools and walk up the parents looking for `position`, `transform`, `filter` and `will-change`. One of them is the containing block you did not expect.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A containing block is the box that percentages and offsets are measured against.",
            "Absolute elements use the padding box of the nearest positioned ancestor, or the initial containing block if there is none.",
            "Fixed elements use the viewport, unless an ancestor has a `transform`, `filter`, `perspective`, `contain` or similar.",
            "When a positioned element lands in the wrong place, look for a hidden containing block on one of its ancestors.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "position-explorer",
      kind: "visualizer",
      title: "Position explorer",
      summary: "Switch box B between the five position values, move it with offsets, and decide if its parent is an anchor.",
      minutes: 10,
      concept: {
        description:
          "Three boxes sit in a dashed parent inside a scrolling panel. Box B can be switched between all five `position` values, with sliders for its `top` and `right` offsets, and its parent can be made positioned or not. You can see exactly what each value takes away, and where each one measures from.",
        why: "The five position values are easy to mix up until you see them side by side. Dragging an offset on a static box does nothing, on a relative box nudges it and leaves a gap, and on an absolute box lifts it out so that C moves up. Seeing it once beats a page of rules.",
        mentalModel:
          "The dashed box is a frame, and B is a sticker. Static means the sticker is part of the page. Relative slides it a little. Absolute peels it off and sticks it to the nearest marked frame. Fixed sticks it to the window. Sticky lets it slide with you until you scroll.",
      },
      stage: {
        html: '<div class="scroller">\n  <div class="parent">\n    <div class="box a">A</div>\n    <div class="box b">B</div>\n    <div class="box c">C</div>\n    <div class="spacer">Scroll down inside this panel to test fixed and sticky.</div>\n  </div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.scroller { height: 100%; box-sizing: border-box; overflow: auto; padding: 12px; border-radius: 12px; background: #ffffff; }\n.parent { padding: 12px; border: 2px dashed #6366f1; background: #eef2ff; }\n.box { width: 150px; height: 42px; margin-bottom: 10px; display: flex; align-items: center; padding-left: 12px; box-sizing: border-box; border-radius: 8px; color: #ffffff; font-weight: 700; }\n.a { background: #0284c7; }\n.b { background: #db2777; }\n.c { background: #059669; }\n.spacer { height: 320px; padding-top: 8px; color: #64748b; font-size: 13px; }",
        annotate: "none",
        target: ".b",
        items: ".box",
      },
      starter: `.parent {
  position: static;
}

.b {
  position: static;
  top: 12px;
  right: 12px;
}
`,
      controls: [
        { id: "parent", label: "parent position", selector: ".parent", property: "position", fallback: "static", type: "options", options: ["static", "relative"], help: "A positioned parent becomes the anchor for an absolute child." },
        { id: "position", label: "B position", selector: ".b", property: "position", fallback: "static", type: "options", options: ["static", "relative", "absolute", "fixed", "sticky"], help: "Try each value and watch box C." },
        { id: "top", label: "B top", selector: ".b", property: "top", fallback: "auto", type: "range", min: 0, max: 120, step: 4, unit: "px", help: "Ignored while B is static." },
        { id: "right", label: "B right", selector: ".b", property: "right", fallback: "auto", type: "range", min: 0, max: 200, step: 4, unit: "px", help: "The distance from the right edge of the reference box." },
      ],
      presets: [
        { id: "relative", label: "Nudged (relative)", description: "B moves but keeps its space", css: ".b { position: relative; top: 12px; right: -40px; }" },
        { id: "absolute-page", label: "Absolute, parent static", description: "B flies to the window corner", css: ".parent { position: static; }\n.b { position: absolute; top: 12px; right: 12px; }" },
        { id: "absolute-parent", label: "Absolute, parent relative", description: "B is placed inside the parent", css: ".parent { position: relative; }\n.b { position: absolute; top: 12px; right: 12px; }" },
        { id: "fixed", label: "Fixed", description: "B is pinned to the window", css: ".b { position: fixed; top: 12px; right: 12px; }" },
        { id: "sticky", label: "Sticky", description: "B sticks near the top while you scroll", css: ".b { position: sticky; top: 0px; }" },
      ],
      challenge: {
        title: "Pin B to its parent's corner",
        description:
          "Box B should sit in the top right corner of its dashed parent. Make the parent the anchor with `position: relative`, take B out of the flow with `position: absolute`, and set both its `top` and `right` to `0`.",
        hints: [
          "Two rules to change: `.parent` becomes positioned, and `.b` is placed against it.",
          "An absolute element is measured from its nearest positioned ancestor.",
          "`.parent { position: relative; }` and `.b { position: absolute; top: 0; right: 0; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".parent", property: "position", expected: ["relative"], message: "The parent is `position: relative`, so it is the anchor." },
          { type: "computedStyle", selector: ".b", property: "position", expected: ["absolute"], message: "Box B is `position: absolute`." },
          { type: "computedStyle", selector: ".b", property: "top", expected: ["0px", "0"], message: "B's `top` is `0`." },
          { type: "computedStyle", selector: ".b", property: "right", expected: ["0px", "0"], message: "B's `right` is `0`." },
        ],
        solution: `.parent {
  position: relative;
}

.b {
  position: absolute;
  top: 0;
  right: 0;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-flow",
      kind: "predict",
      title: "Predict the flow",
      summary: "Work out what happens to the siblings of a relative box, an absolute box and an anchored absolute box.",
      minutes: 7,
      mode: "css",
      intro: "Three rows each have boxes A, B and C. In each row, B is positioned differently. Predict where B goes and what C does, then run the code.",
      code: {
        html: `<div class="row r1">
  <div class="box a">A</div>
  <div class="box b">B</div>
  <div class="box c">C</div>
</div>
<div class="row r2">
  <div class="box a">A</div>
  <div class="box b">B</div>
  <div class="box c">C</div>
</div>
<div class="row r3">
  <div class="box a">A</div>
  <div class="box b">B</div>
  <div class="box c">C</div>
</div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.row {
  margin-bottom: 16px;
  padding: 8px;
  border: 2px dashed #6366f1;
}

.box {
  width: 120px;
  height: 34px;
  margin-bottom: 6px;
  color: #ffffff;
  font-weight: 700;
  line-height: 34px;
  text-align: center;
}

.a { background-color: #0284c7; }
.b { background-color: #db2777; }
.c { background-color: #059669; }

.r1 .b {
  position: relative;
  top: 20px;
}

.r2 .b {
  position: absolute;
  top: 20px;
}

.r3 {
  position: relative;
}

.r3 .b {
  position: absolute;
  top: 20px;
}`,
      },
      questions: [
        {
          prompt: "In row 1, B is `position: relative; top: 20px`. What happens to C?",
          options: ["C moves up to fill B's old place", "C stays where it was: B's original space is kept", "C moves down 20px with B", "C is hidden behind B"],
          answerIndex: 1,
          hint: "A relative element is shifted visually, but is it taken out of the flow?",
          explanation: "A relatively positioned element keeps its place in normal flow, so its space is still reserved. B is drawn 20px lower, and may overlap C, but C does not move.",
          proves: [
            { type: "computedStyle", selector: ".r1 .b", property: "position", expected: ["relative"], message: "B in row 1 is `position: relative`." },
            { type: "computedStyle", selector: ".r1 .b", property: "top", expected: ["20px"], message: "...offset 20px from the top." },
          ],
        },
        {
          prompt: "In row 2, B is `position: absolute; top: 20px`, and its parent `.r2` is not positioned. Where does B go?",
          options: ["20px below where it was", "20px below the top of its row", "20px from the top of the page, because nothing is positioned", "It does not move"],
          answerIndex: 2,
          hint: "Which ancestor is the reference when none of them is positioned?",
          explanation: "With no positioned ancestor, the reference is the initial containing block, the page. B jumps to 20px from the top of the page, and C moves up to take its place in the row.",
          proves: [{ type: "computedStyle", selector: ".r2 .b", property: "position", expected: ["absolute"], message: "B in row 2 is `position: absolute`." }],
        },
        {
          prompt: "In row 3, the parent `.r3` is `position: relative`, and B is `position: absolute; top: 20px`. What is different from row 2?",
          options: ["B is placed 20px from the top of its row, and C moves up because B no longer takes space", "Nothing is different", "B becomes static", "B is placed against the window"],
          answerIndex: 0,
          hint: "The anchor for an absolute child is its nearest positioned ancestor.",
          explanation: "Now the row is positioned, so it is B's containing block, and 20px is measured from the top edge of the row's padding box. B is still out of the flow, so C moves up.",
          proves: [{ type: "computedStyle", selector: ".r3", property: "position", expected: ["relative"], message: "Row 3 is `position: relative`, so it is the anchor." }],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "offsets-and-inset",
      kind: "learn",
      title: "top, right, bottom, left and inset",
      summary: "How offsets are measured, how two opposite offsets stretch an element, and what over-constrained means.",
      minutes: 10,
      concept: {
        description:
          "The four offset properties, `top`, `right`, `bottom` and `left`, say how far a positioned element's edge sits from the matching edge of its containing block. `inset` is the shorthand for all four. Giving two opposite offsets at once stretches the element between them.",
        why: "Understanding offsets as distances from edges, not as coordinates or movements, makes every positioned layout predictable. It also explains the strange rules about stretching, centring and what happens when you give the browser too many instructions at once.",
        mentalModel:
          "Each offset is a string pinned from an edge of the frame to the matching edge of your element. A `top` string and a `bottom` string together pin the element at both ends, so it stretches to fit, like a hammock held by two ropes.",
      },
      body: [
        { type: "heading", text: "Distances from edges" },
        {
          type: "paragraph",
          text: "`top: 10px` means the top edge of the element is 10px below the top edge of the containing block. `right: 10px` means the element's right edge is 10px **in from** the containing block's right edge. Negative values push the element outside the box, which is how a badge can overlap a card's corner. Percentages use the containing block's height for `top` and `bottom` and its width for `left` and `right`. The default is `auto`.",
        },
        { type: "heading", text: "The inset shorthand" },
        {
          type: "paragraph",
          text: "`inset` sets all four at once, in the order top, right, bottom, left, with the same one to four value rules as `margin`. `inset: 0` is the common way to say \"fill the containing block\". There are also logical versions such as `inset-block-start` and `inset-inline-end`, which follow the writing direction, so they flip in right-to-left languages.",
        },
        {
          type: "code",
          language: "css",
          code: `.overlay {
  position: absolute;
  inset: 0;                 /* top, right, bottom and left all 0 */
}

.menu {
  position: absolute;
  top: 100%;                /* just below the parent */
  left: 0;
}

.badge {
  position: absolute;
  inset: -0.5rem -0.5rem auto auto;   /* top and right, hanging outside */
}`,
          caption: "A full overlay, a dropdown under its trigger and a badge hanging over a corner",
        },
        { type: "heading", text: "Stretching and over-constraint" },
        {
          type: "paragraph",
          text: "If an absolute element has **both** `left` and `right`, and `width` is `auto`, its width is whatever fills the gap between them. The same goes for `top`, `bottom` and `height`. But if you set `left`, `right` **and** a fixed `width`, there are too many instructions, so the element is **over-constrained**, and the browser quietly ignores one: in left-to-right languages, `right` is dropped, and likewise `bottom` when `top` and `height` are set.",
        },
        {
          type: "paragraph",
          text: "A neat trick uses this rule. If you set all four offsets to `0`, give the element a `width` and `height`, and set `margin: auto`, the leftover space is split evenly on every side, so the element is **centred** inside its containing block, horizontally and vertically.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.panel {
  position: absolute;
  inset: 0;
  width: auto;
  height: auto;
}`,
            note: "All four offsets with automatic sizes. The panel stretches to fill its containing block.",
          },
          bad: {
            code: `.panel {
  position: absolute;
  inset: 0;
  width: 120px;
  height: 80px;
}`,
            note: "Over-constrained: the fixed size wins, `right` and `bottom` are ignored, and the panel sticks in the top left corner.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "To position a dropdown right under its button, make the button's wrapper `position: relative`, then give the menu `top: 100%` and `left: 0`. The wrapper's height does the maths for you.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Offsets are distances from the matching edges of the containing block, and negative values go outside it.",
            "`inset` is the shorthand for top, right, bottom, left. `inset: 0` fills the containing block.",
            "Two opposite offsets with an `auto` size stretch the element between them.",
            "Setting both offsets and a fixed size over-constrains it, and `right` or `bottom` is ignored. Add `margin: auto` to centre instead.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "inset-explorer",
      kind: "visualizer",
      title: "Inset explorer",
      summary: "Set each offset and the size of an absolute panel, and watch it stretch, shrink or get over-constrained.",
      minutes: 9,
      concept: {
        description:
          "An absolute panel sits inside a positioned frame. Four offset controls and two size controls let you try each combination: one offset, two opposite offsets, all four, with automatic or fixed sizes.",
        why: "The rules for stretching and over-constraint are easy to state and hard to remember. Trying \"left and right with a fixed width\" yourself, and watching the panel ignore one of them, makes the rule permanent.",
        mentalModel:
          "Each offset is a rope from an edge of the frame to the panel. Two ropes on opposite sides with a flexible panel stretch it tight. Two ropes on opposite sides plus a fixed size is one rope too many, so the browser cuts one.",
      },
      stage: {
        html: '<div class="board">\n  <div class="frame">\n    <div class="panel">panel</div>\n  </div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.board { height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border-radius: 12px; background: #ffffff; padding: 16px; }\n.frame { position: relative; width: 100%; max-width: 360px; height: 220px; box-sizing: border-box; border: 2px dashed #6366f1; border-radius: 8px; background: #eef2ff; }\n.panel { position: absolute; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border-radius: 6px; background: #db2777; color: #ffffff; font-weight: 700; }",
        annotate: "none",
        target: ".panel",
        items: ".panel",
      },
      starter: `.panel {
  top: 20px;
  right: auto;
  bottom: auto;
  left: 20px;
  width: 120px;
  height: 80px;
}
`,
      controls: [
        { id: "top", label: "top", selector: ".panel", property: "top", fallback: "auto", type: "options", options: ["auto", "0", "20px", "10%"], help: "Distance from the frame's top edge." },
        { id: "right", label: "right", selector: ".panel", property: "right", fallback: "auto", type: "options", options: ["auto", "0", "20px", "10%"], help: "Distance from the frame's right edge." },
        { id: "bottom", label: "bottom", selector: ".panel", property: "bottom", fallback: "auto", type: "options", options: ["auto", "0", "20px", "10%"], help: "Distance from the frame's bottom edge." },
        { id: "left", label: "left", selector: ".panel", property: "left", fallback: "auto", type: "options", options: ["auto", "0", "20px", "10%"], help: "Distance from the frame's left edge." },
        { id: "width", label: "width", selector: ".panel", property: "width", fallback: "auto", type: "options", options: ["auto", "120px", "50%"], help: "With `auto`, left and right together stretch the panel." },
        { id: "height", label: "height", selector: ".panel", property: "height", fallback: "auto", type: "options", options: ["auto", "80px", "50%"], help: "With `auto`, top and bottom together stretch the panel." },
      ],
      presets: [
        { id: "fill", label: "Stretch to fill", description: "all four offsets 0, auto size", css: ".panel { top: 0; right: 0; bottom: 0; left: 0; width: auto; height: auto; }" },
        { id: "horizontal", label: "Stretch sideways", description: "left and right, fixed height", css: ".panel { top: 20px; right: 20px; bottom: auto; left: 20px; width: auto; height: 80px; }" },
        { id: "over", label: "Over-constrained", description: "left, right and a width", css: ".panel { top: 20px; right: 20px; bottom: auto; left: 20px; width: 120px; height: 80px; }" },
        { id: "centred", label: "Centred", description: "all 0, fixed size, margin auto", css: ".panel { top: 0; right: 0; bottom: 0; left: 0; width: 140px; height: 80px; margin: auto; }" },
      ],
      challenge: {
        title: "Fill the frame",
        description:
          "Make the panel cover its whole frame. Set `top`, `right`, `bottom` and `left` to `0`, and set `width` and `height` to `auto`, so that nothing is over-constrained.",
        hints: [
          "Six declarations in the `.panel` rule need new values.",
          "If the width or height is fixed, the matching offset on the opposite side is ignored.",
          "`top: 0; right: 0; bottom: 0; left: 0; width: auto; height: auto;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".panel", property: "top", expected: ["0px", "0"], message: "`top` is `0`." },
          { type: "computedStyle", selector: ".panel", property: "right", expected: ["0px", "0"], message: "`right` is `0`, and the width is `auto` so it is not ignored." },
          { type: "computedStyle", selector: ".panel", property: "bottom", expected: ["0px", "0"], message: "`bottom` is `0`, and the height is `auto` so it is not ignored." },
          { type: "computedStyle", selector: ".panel", property: "left", expected: ["0px", "0"], message: "`left` is `0`." },
        ],
        solution: `.panel {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: auto;
  height: auto;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-badge-and-overlay",
      kind: "lab",
      title: "Lab: a corner badge and a full overlay",
      summary: "Anchor a notification badge to a card's corner, and stretch a sold-out overlay across the whole card.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<article class="card">
  <span class="badge">3</span>
  <div class="thumb">Image area</div>
  <span class="scrim">Sold out</span>
  <h2 class="card-title">Weekend pass</h2>
</article>`,
        css: `body {
  margin: 0;
  padding: 2rem;
  background-color: #f1f5f9;
  font-family: system-ui, sans-serif;
}

.card {
  width: 16rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #ffffff;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background-color: #db2777;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 700;
}

.thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  border-radius: 0.75rem;
  background-color: #4f46e5;
  color: #ffffff;
}

.scrim {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: rgb(15 23 42 / 0.6);
  color: #ffffff;
  font-weight: 700;
}

.card-title {
  margin: 0.75rem 0 0;
}
`,
      },
      challenge: {
        title: "Anchor the badge and stretch the overlay",
        description:
          "Make the card the anchor with `position: relative`. Take the badge out of the flow with `position: absolute` and hang it over the card's top right corner with `top: -8px` and `right: -8px`. Then make the sold-out overlay cover the whole card: `position: absolute` with `top`, `right`, `bottom` and `left` all `0`.",
        hints: [
          "Positioned children need a positioned parent. Start with the `.card` rule.",
          "The badge needs three declarations, and the overlay needs five.",
          "Negative offsets move an element outside its containing block, so the badge overlaps the corner.",
          "`.card { position: relative; }` `.badge { position: absolute; top: -8px; right: -8px; }` `.scrim { position: absolute; top: 0; right: 0; bottom: 0; left: 0; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".card", property: "position", expected: ["relative"], message: "The card is `position: relative`, so it is the anchor." },
          { type: "computedStyle", selector: ".badge", property: "position", expected: ["absolute"], message: "The badge is `position: absolute`." },
          { type: "computedStyle", selector: ".badge", property: "top", expected: ["-8px"], message: "The badge hangs `8px` above the card." },
          { type: "computedStyle", selector: ".badge", property: "right", expected: ["-8px"], message: "...and `8px` beyond its right edge." },
          { type: "computedStyle", selector: ".scrim", property: "position", expected: ["absolute"], message: "The overlay is `position: absolute`." },
          { type: "computedStyle", selector: ".scrim", property: "top", expected: ["0px", "0"], message: "The overlay's `top` is `0`" },
          { type: "computedStyle", selector: ".scrim", property: "right", expected: ["0px", "0"], message: "...its `right` is `0`" },
          { type: "computedStyle", selector: ".scrim", property: "bottom", expected: ["0px", "0"], message: "...its `bottom` is `0`" },
          { type: "computedStyle", selector: ".scrim", property: "left", expected: ["0px", "0"], message: "...and its `left` is `0`." },
        ],
        solution: {
          html: `<article class="card">
  <span class="badge">3</span>
  <div class="thumb">Image area</div>
  <span class="scrim">Sold out</span>
  <h2 class="card-title">Weekend pass</h2>
</article>`,
          css: `body {
  margin: 0;
  padding: 2rem;
  background-color: #f1f5f9;
  font-family: system-ui, sans-serif;
}

.card {
  position: relative;
  width: 16rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #ffffff;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background-color: #db2777;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 700;
}

.thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  border-radius: 0.75rem;
  background-color: #4f46e5;
  color: #ffffff;
}

.scrim {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: rgb(15 23 42 / 0.6);
  color: #ffffff;
  font-weight: 700;
}

.card-title {
  margin: 0.75rem 0 0;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-misplaced-badge",
      kind: "debug",
      title: "Debug: the positions that do nothing",
      summary: "Five elements ignore their offsets, z-index or sticky behaviour because something is not positioned.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<header class="header">Pinned header</header>
<main class="page">
  <div class="card-a">Card A <span class="badge-a">New</span></div>
  <div class="nudge-box"><span class="nudge">Nudge me</span></div>
  <div class="stack">
    <div class="back">Back</div>
    <div class="front">Front</div>
  </div>
  <h3 class="sticky-head">Sticky heading</h3>
</main>`,
        css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background-color: #4f46e5;
  color: #ffffff;
  line-height: 4rem;
  padding-left: 1rem;
}

.page {
  padding: 1rem;
}

.card-a {
  width: 12rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #e0e7ff;
}

.badge-a {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #db2777;
  color: #ffffff;
  padding: 0.125rem 0.5rem;
}

.nudge-box {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fef3c7;
}

.nudge {
  top: 12px;
  left: 12px;
  background-color: #f59e0b;
  padding: 0.25rem 0.5rem;
}

.stack {
  height: 4rem;
  margin-bottom: 1rem;
}

.back {
  width: 8rem;
  height: 3rem;
  background-color: #0284c7;
}

.front {
  width: 8rem;
  height: 3rem;
  margin-top: -1.5rem;
  background-color: #059669;
  z-index: 5;
}

.sticky-head {
  position: sticky;
  margin: 0;
  padding: 0.5rem;
  background-color: #e0e7ff;
}
`,
      },
      challenge: {
        title: "Make every position work",
        description:
          "Five things are broken. The page content hides under the fixed header: give `body` a `padding-top` of `4rem`. The badge flies to the page corner: make `.card-a` `position: relative`. The nudge ignores its offsets: make `.nudge` `position: relative`. The green box's `z-index` does nothing: make `.front` `position: relative`. The heading never sticks: give `.sticky-head` a `top` of `0`.",
        hints: [
          "Each fix is a single declaration. In four of them, the problem is a missing `position`.",
          "Offsets and `z-index` only work on positioned elements. An absolute child needs a positioned parent.",
          "A sticky element needs a threshold, a `top` value, to know when to stick.",
          "`body { padding-top: 4rem; }` `.card-a { position: relative; }` `.nudge { position: relative; }` `.front { position: relative; }` `.sticky-head { top: 0; }`",
        ],
        checks: [
          { type: "computedStyle", selector: "body", property: "padding-top", expected: ["4rem", "64px"], message: "The body leaves `4rem` of room for the header." },
          { type: "computedStyle", selector: ".card-a", property: "position", expected: ["relative"], message: "`.card-a` is the anchor for its badge." },
          { type: "computedStyle", selector: ".nudge", property: "position", expected: ["relative"], message: "`.nudge` is positioned, so its offsets work." },
          { type: "computedStyle", selector: ".front", property: "position", expected: ["relative"], message: "`.front` is positioned, so its `z-index` works." },
          { type: "computedStyle", selector: ".sticky-head", property: "top", expected: ["0px", "0"], message: "The sticky heading has a `top` of `0`." },
        ],
        solution: {
          html: `<header class="header">Pinned header</header>
<main class="page">
  <div class="card-a">Card A <span class="badge-a">New</span></div>
  <div class="nudge-box"><span class="nudge">Nudge me</span></div>
  <div class="stack">
    <div class="back">Back</div>
    <div class="front">Front</div>
  </div>
  <h3 class="sticky-head">Sticky heading</h3>
</main>`,
          css: `body {
  margin: 0;
  padding-top: 4rem;
  font-family: system-ui, sans-serif;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background-color: #4f46e5;
  color: #ffffff;
  line-height: 4rem;
  padding-left: 1rem;
}

.page {
  padding: 1rem;
}

.card-a {
  position: relative;
  width: 12rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #e0e7ff;
}

.badge-a {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #db2777;
  color: #ffffff;
  padding: 0.125rem 0.5rem;
}

.nudge-box {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fef3c7;
}

.nudge {
  position: relative;
  top: 12px;
  left: 12px;
  background-color: #f59e0b;
  padding: 0.25rem 0.5rem;
}

.stack {
  height: 4rem;
  margin-bottom: 1rem;
}

.back {
  width: 8rem;
  height: 3rem;
  background-color: #0284c7;
}

.front {
  position: relative;
  width: 8rem;
  height: 3rem;
  margin-top: -1.5rem;
  background-color: #059669;
  z-index: 5;
}

.sticky-head {
  position: sticky;
  top: 0;
  margin: 0;
  padding: 0.5rem;
  background-color: #e0e7ff;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "position-fixed",
      kind: "learn",
      title: "position: fixed",
      summary: "Pin an element to the window so it stays put as the page scrolls, and the pitfalls that come with it.",
      minutes: 9,
      concept: {
        description:
          "`position: fixed` removes an element from the flow and pins it to the **viewport**, the visible part of the browser window. It stays exactly where it is while the page scrolls underneath. The offsets are measured from the edges of the window.",
        why: "Fixed positioning is the tool behind pinned navigation bars, floating action buttons, cookie banners and chat widgets. It is simple to write and has a handful of well-known traps: content hiding underneath it, mobile browsers, and ancestors that quietly change what fixed means.",
        mentalModel:
          "A fixed element is a sticker on the glass of the window, not on the page. However much the page scrolls behind it, the sticker stays in the same spot on the glass.",
      },
      body: [
        { type: "heading", text: "How it works" },
        {
          type: "paragraph",
          text: "A fixed element is taken out of the flow, like an absolute one, so it takes up no room and its siblings close ranks. It is placed using `top`, `right`, `bottom` and `left` measured from the viewport. `top: 0; left: 0; right: 0` makes a bar that spans the full width at the top of the window, and `bottom: 1.5rem; right: 1.5rem` makes a floating button in the lower right corner.",
        },
        {
          type: "code",
          language: "css",
          code: `.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.fab {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
}`,
          caption: "A header spanning the window, and a floating button in the corner",
        },
        { type: "heading", text: "The first pitfall: content hides underneath" },
        {
          type: "paragraph",
          text: "Because a fixed header takes no space in the layout, the page content starts at the very top of the window, and the first lines slide **underneath** the header. The usual fix is to add top padding to the body or the main content equal to the header's height. If you also link to sections by `#anchor`, add `scroll-margin-top` to the targets, or `scroll-padding-top` to the scrolling element, so the heading lands below the header instead of behind it.",
        },
        { type: "heading", text: "More things to know" },
        {
          type: "list",
          items: [
            "Fixed elements use the viewport **unless** an ancestor has a `transform`, `filter` or similar, in which case that ancestor is used.",
            "On phones, the visible viewport changes as the address bar slides away and when the on-screen keyboard opens. A fixed bar at the bottom can jump or get covered.",
            "A fixed element that is taller than the window cannot be scrolled to, so its lower part is unreachable.",
            "Fixed elements cover whatever is behind them, so give them a solid or translucent background and a `z-index` that places them above the page content.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `body {
  padding-top: 4rem;
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
}`,
            note: "The body reserves exactly the room the header covers, so no content hides under it.",
          },
          bad: {
            code: `.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
}`,
            note: "Nothing reserves space, so the first 4rem of the page content is hidden behind the header.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "If your header just needs to stay visible while scrolling, `position: sticky` is often simpler. It keeps its space in the layout, so nothing hides, and it stays inside its parent. The next lesson covers it.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`position: fixed` removes the element from the flow and pins it to the window, so it stays put while scrolling.",
            "A fixed bar covers the content below it, so reserve its height with padding on the page.",
            "An ancestor with a `transform` or `filter` changes what the element is fixed to.",
            "Mobile address bars and keyboards make fixed bottom elements unreliable. Consider `sticky` when it is enough.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "position-sticky",
      kind: "learn",
      title: "position: sticky",
      summary: "An element that scrolls normally, then sticks at a threshold, and the three reasons it stops working.",
      minutes: 10,
      concept: {
        description:
          "`position: sticky` is a hybrid. The element sits in normal flow, scrolling along with the page, until it would pass a threshold you set with `top`, `bottom`, `left` or `right`. Then it **sticks** there, until its parent scrolls out of view and takes it away.",
        why: "Sticky is the modern way to make a heading, table header, sidebar or toolbar stay in view, without JavaScript and without the layout problems of `fixed`. It is also easy to break silently, so knowing why it fails is as important as knowing how it works.",
        mentalModel:
          "A sticky element is a sticky note with a leash. It rides along with the page until it reaches the edge you set, and then holds position there. The leash is its parent: when the parent ends, so does the sticking.",
      },
      body: [
        { type: "heading", text: "How it behaves" },
        {
          type: "paragraph",
          text: "A sticky element keeps its **space** in the flow, so nothing hides behind it. It is measured against its **nearest scrolling ancestor**, the closest parent that scrolls, which is often the whole page. With `top: 0`, it scrolls normally until its top edge reaches the top of that scrolling area, and then it stays there. It can never leave its **parent**: once the parent's bottom edge arrives, the sticky element is carried off with it.",
        },
        {
          type: "code",
          language: "css",
          code: `.section-heading {
  position: sticky;
  top: 0;
  background-color: #ffffff;
}

.sidebar {
  position: sticky;
  top: 5rem;      /* sticks 5rem below the top, under a header */
  align-self: start;
}`,
          caption: "A heading that stays at the top, and a sidebar that stays below the header",
        },
        { type: "heading", text: "Why it stops working" },
        {
          type: "paragraph",
          text: "When sticky seems broken, there are three usual causes. First, **no threshold**: without a `top`, `bottom`, `left` or `right`, the browser has no line to stick at, so nothing happens. Second, **an ancestor that clips or scrolls**: if any ancestor has `overflow: hidden`, `auto` or `scroll`, it becomes the scrolling ancestor, and the element sticks to that instead of the page, which usually does not scroll at all. Third, **a parent that is too short**: the sticky element cannot leave its parent, so a parent no taller than the element gives it nowhere to stick.",
        },
        {
          type: "paragraph",
          text: "In flex and grid layouts there is a fourth cause. A sticky child is stretched to the full height of its row by default, so it has no room to move. Add `align-self: start` to the sticky item, so it keeps its natural height and can slide within its row.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.toc {
  position: sticky;
  top: 5rem;
  align-self: start;
}`,
            note: "A threshold, and `align-self: start` so the item is not stretched. It slides down its column as you scroll.",
          },
          bad: {
            code: `.toc {
  position: sticky;
}

.layout {
  overflow: hidden;
}`,
            note: "No threshold, and an ancestor with `overflow: hidden` that takes over as the scroll container. Sticky does nothing.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "`overflow: clip` clips like `hidden` but does **not** create a scroll container, so it does not break sticky. It is a handy replacement when you only want to cut off overflow.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Give a sticky heading a solid background. Otherwise, the content scrolling under it shows through and the text becomes unreadable.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A sticky element scrolls with the page, then sticks at the `top`, `bottom`, `left` or `right` threshold you give it.",
            "It keeps its space in the flow, and it can never leave its parent.",
            "It fails with no threshold, with an ancestor that has `overflow` other than `visible`, or with a parent that is too short.",
            "In flex or grid, add `align-self: start`. Give sticky elements a solid background.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "sticky-explorer",
      kind: "visualizer",
      title: "Sticky explorer",
      summary: "Scroll a panel of three sections, and change the heading's position, threshold and the section's overflow.",
      minutes: 9,
      concept: {
        description:
          "A scrolling panel holds three sections, each with a heading. Controls switch the headings between static, relative and sticky, set the threshold they stick at, and change the `overflow` of the sections, which is the setting that most often breaks sticky.",
        why: "Sticky is the one position value that reacts to scrolling, so you have to scroll to understand it. Switching `overflow` on the sections, and watching the heading stop sticking, is the fastest way to learn the most common reason it fails.",
        mentalModel:
          "Each heading is a sticky note on a long sheet. The note slides along with the sheet, then holds at a line near the top. Each section is the sheet's leash: when it ends, so does the sticking.",
      },
      stage: {
        html: '<div class="scroller">\n  <section class="sec"><h3 class="heading">Section one</h3><p class="body">Scroll this panel. The heading belongs to this section, and it can only stick while the section is on screen.</p></section>\n  <section class="sec"><h3 class="heading">Section two</h3><p class="body">Each section is tall enough to scroll through, so you can watch the headings take turns at the top.</p></section>\n  <section class="sec"><h3 class="heading">Section three</h3><p class="body">When a section ends, its heading leaves with it, and the next one takes over.</p></section>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.scroller { height: 100%; box-sizing: border-box; overflow: auto; border-radius: 12px; background: #ffffff; }\n.sec { min-height: 230px; }\n.heading { margin: 0; padding: 10px 14px; background: #4f46e5; color: #ffffff; font-size: 15px; }\n.body { margin: 0; padding: 14px; color: #334155; font-size: 14px; line-height: 1.5; }",
        annotate: "none",
        target: ".heading",
        items: ".heading",
      },
      starter: `.heading {
  position: static;
  top: 12px;
}

.sec {
  overflow: hidden;
}
`,
      controls: [
        { id: "position", label: "heading position", selector: ".heading", property: "position", fallback: "static", type: "options", options: ["static", "relative", "sticky"], help: "Only `sticky` reacts to scrolling." },
        { id: "top", label: "heading top", selector: ".heading", property: "top", fallback: "auto", type: "range", min: 0, max: 60, step: 4, unit: "px", help: "The threshold where the heading sticks." },
        { id: "overflow", label: "section overflow", selector: ".sec", property: "overflow", fallback: "visible", type: "options", options: ["visible", "hidden", "clip", "auto"], help: "`hidden` and `auto` make the section the scroll container, which breaks sticky. `clip` does not." },
      ],
      presets: [
        { id: "sticky-ok", label: "Working sticky", description: "sticky, top 0, overflow visible", css: ".heading { position: sticky; top: 0px; }\n.sec { overflow: visible; }" },
        { id: "broken", label: "Broken by overflow", description: "sticky, but overflow hidden", css: ".heading { position: sticky; top: 0px; }\n.sec { overflow: hidden; }" },
        { id: "clip", label: "Fixed with clip", description: "overflow clip keeps sticky working", css: ".heading { position: sticky; top: 0px; }\n.sec { overflow: clip; }" },
        { id: "offset", label: "Sticks lower down", description: "threshold of 40px", css: ".heading { position: sticky; top: 40px; }\n.sec { overflow: visible; }" },
      ],
      challenge: {
        title: "Make the headings stick",
        description:
          "Scroll the panel and the headings just scroll away. Make them stick to the top: give `.heading` `position: sticky` and a `top` of `0`, and set the `overflow` of `.sec` back to `visible` so that it does not become the scroll container.",
        hints: [
          "Three changes: two on `.heading` and one on `.sec`.",
          "An ancestor with `overflow: hidden` becomes the scroll container, so sticky measures against it.",
          "`.heading { position: sticky; top: 0; }` and `.sec { overflow: visible; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".heading", property: "position", expected: ["sticky"], message: "The headings are `position: sticky`." },
          { type: "computedStyle", selector: ".heading", property: "top", expected: ["0px", "0"], message: "They stick at a `top` of `0`." },
          { type: "computedStyle", selector: ".sec", property: "overflow", expected: ["visible"], message: "The sections have `overflow: visible`, so they do not break sticky." },
        ],
        solution: `.heading {
  position: sticky;
  top: 0;
}

.sec {
  overflow: visible;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-sticky-header",
      kind: "lab",
      title: "Lab: a sticky header and sidebar",
      summary: "Keep a header at the top of the page and a contents sidebar just beneath it while the article scrolls.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<header class="header">Trailhead</header>
<div class="layout">
  <aside class="sidebar">
    <strong>Contents</strong>
    <ul>
      <li>Planning</li>
      <li>Gear</li>
      <li>Safety</li>
    </ul>
  </aside>
  <main class="content">
    <h1>Planning a trail trip</h1>
    <p>Start by choosing a route that matches your fitness and the time you have. Check the forecast the day before and again on the morning.</p>
    <p>Tell someone where you are going and when you expect to be back. Carry water, a map and a spare layer, even on short walks.</p>
    <p>Turn back early if the weather changes. A shorter day is always better than an emergency on the ridge.</p>
    <p>Keep to marked paths to protect the ground and the plants. Carry out everything you carried in.</p>
    <p>Share what you learned with the next person. Trail notes make everyone's day safer.</p>
  </main>
</div>`,
        css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.header {
  box-sizing: border-box;
  height: 4rem;
  padding: 0 1rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 700;
  line-height: 4rem;
}

.layout {
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: 1.5rem;
  padding: 1rem;
}

.sidebar {
  align-self: start;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #e0e7ff;
}

.content p {
  line-height: 1.6;
}
`,
      },
      challenge: {
        title: "Keep the header and sidebar in view",
        description:
          "Make the header `position: sticky` at `top: 0`, with `z-index: 10` so that scrolling content passes beneath it. Make the sidebar `position: sticky` with `top: 5rem`, which leaves a gap below the 4rem header.",
        hints: [
          "Both rules need a position and a threshold. The header also needs a `z-index`.",
          "The sidebar already has `align-self: start`, which lets it slide within its grid row.",
          "`.header { position: sticky; top: 0; z-index: 10; }` and `.sidebar { position: sticky; top: 5rem; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".header", property: "position", expected: ["sticky"], message: "The header is `position: sticky`." },
          { type: "computedStyle", selector: ".header", property: "top", expected: ["0px", "0"], message: "...stuck at `top: 0`" },
          { type: "computedStyle", selector: ".header", property: "z-index", expected: ["10"], message: "...with `z-index: 10`." },
          { type: "computedStyle", selector: ".sidebar", property: "position", expected: ["sticky"], message: "The sidebar is `position: sticky`" },
          { type: "computedStyle", selector: ".sidebar", property: "top", expected: ["5rem", "80px"], message: "...at `top: 5rem`, just below the header." },
        ],
        solution: {
          html: `<header class="header">Trailhead</header>
<div class="layout">
  <aside class="sidebar">
    <strong>Contents</strong>
    <ul>
      <li>Planning</li>
      <li>Gear</li>
      <li>Safety</li>
    </ul>
  </aside>
  <main class="content">
    <h1>Planning a trail trip</h1>
    <p>Start by choosing a route that matches your fitness and the time you have. Check the forecast the day before and again on the morning.</p>
    <p>Tell someone where you are going and when you expect to be back. Carry water, a map and a spare layer, even on short walks.</p>
    <p>Turn back early if the weather changes. A shorter day is always better than an emergency on the ridge.</p>
    <p>Keep to marked paths to protect the ground and the plants. Carry out everything you carried in.</p>
    <p>Share what you learned with the next person. Trail notes make everyone's day safer.</p>
  </main>
</div>`,
          css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  box-sizing: border-box;
  height: 4rem;
  padding: 0 1rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 700;
  line-height: 4rem;
}

.layout {
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: 1.5rem;
  padding: 1rem;
}

.sidebar {
  position: sticky;
  top: 5rem;
  align-self: start;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #e0e7ff;
}

.content p {
  line-height: 1.6;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "z-index-and-stacking",
      kind: "learn",
      title: "z-index and painting order",
      summary: "How overlapping elements are layered by default, and what z-index really changes.",
      minutes: 10,
      concept: {
        description:
          "When elements overlap, the browser paints them in a fixed order, and `z-index` changes where a positioned element sits in that order. Higher numbers are painted later, so they appear in front. It only works on elements that are positioned, or that are flex or grid items.",
        why: "Overlapping happens constantly: dropdowns over content, badges over cards, sticky headers over articles. Knowing the default order explains most stacking without a single `z-index`, and knowing the rule that `z-index` needs a position explains most of the cases where it seems to be ignored.",
        mentalModel:
          "Painting is like building a collage: the browser glues things onto the page one after another, and whatever goes on last is on top. The default order is the sequence the browser follows when you say nothing. `z-index` lets you move one piece earlier or later in that sequence.",
      },
      body: [
        { type: "heading", text: "The default order" },
        {
          type: "paragraph",
          text: "Without any `z-index`, elements are painted from back to front in this order: backgrounds and borders of the block, then non-positioned blocks, then floats, then inline content like text, and finally **positioned elements**, in the order they appear in the HTML. That is why a positioned element is above static content without any help: it is painted last. When two positioned elements overlap and neither has a `z-index`, the one **later in the HTML** is on top.",
        },
        {
          type: "list",
          items: [
            "1. The background and border of the stacking context's root.",
            "2. Positioned children with a **negative** `z-index`.",
            "3. Non-positioned block-level children, in HTML order.",
            "4. Floats.",
            "5. Inline content, such as text.",
            "6. Positioned children with `z-index: auto` or `0`, in HTML order.",
            "7. Positioned children with a **positive** `z-index`, lowest first.",
          ],
        },
        { type: "heading", text: "What z-index does" },
        {
          type: "paragraph",
          text: "`z-index` takes an integer, which can be negative, zero or positive, or `auto`. Among elements in the same stacking context, a higher number is in front, and equal numbers fall back to the HTML order. It applies to **positioned** elements, and also to **flex and grid items**, even when they are static. On a plain static element, it is simply ignored.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  position: relative;
}

.card.is-active {
  z-index: 2;
}

.tooltip {
  position: absolute;
  z-index: 10;
}`,
          caption: "A small, deliberate set of numbers is easier to reason about than a huge one",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.front {
  position: relative;
  z-index: 2;
}`,
            note: "The element is positioned, so `z-index: 2` places it in front of its neighbours.",
          },
          bad: {
            code: `.front {
  z-index: 9999;
}`,
            note: "The element is static, so the number is ignored, however large it is.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Resist number wars like `z-index: 99999`. Keep a short scale for the whole project, for example 10 for sticky bars, 20 for dropdowns, 30 for modals, and name the values so everyone uses the same ones.",
        },
        {
          type: "callout",
          tone: "note",
          text: "A negative `z-index` sends an element behind its parent's content, and behind the parent's background if the parent is not a stacking context. That is handy for decoration, and confusing if you forget about it.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Elements are painted in a default order: backgrounds, blocks, floats, inline content, then positioned elements.",
            "Positioned elements are above static content by default, and later ones are above earlier ones.",
            "`z-index` reorders positioned elements, and flex or grid items. It is ignored on ordinary static elements.",
            "Use a small, named scale of values, not ever larger numbers.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-stacking",
      kind: "predict",
      title: "Predict the stacking",
      summary: "Work out which overlapping card is in front when z-index meets static elements and positioned ones.",
      minutes: 7,
      mode: "css",
      intro: "Four cards overlap, each pulled up over the one before by a negative margin. Predict which card is in front at each overlap, then run the code.",
      code: {
        html: `<div class="stack">
  <div class="card a">A</div>
  <div class="card b">B</div>
  <div class="card c">C</div>
  <div class="card d">D</div>
</div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.stack {
  padding: 8px 8px 40px;
}

.card {
  box-sizing: border-box;
  width: 120px;
  height: 64px;
  margin-bottom: -28px;
  padding: 6px 10px;
  color: #ffffff;
  font-weight: 700;
}

.a {
  background-color: #0284c7;
  z-index: 5;
}

.b {
  position: relative;
  background-color: #db2777;
}

.c {
  position: relative;
  z-index: 1;
  background-color: #059669;
}

.d {
  position: relative;
  background-color: #f59e0b;
}`,
      },
      questions: [
        {
          prompt: "A has `z-index: 5`, but is not positioned. B is `position: relative` with no `z-index`. Which is in front where they overlap?",
          options: ["A, because 5 is higher than nothing", "B: positioned elements are painted above static ones, and A's `z-index` is ignored", "They blend together", "It depends on the screen"],
          answerIndex: 1,
          hint: "Does `z-index` do anything on an element with `position: static`?",
          explanation: "A is a plain static block, so its `z-index` has no effect. It is painted in the normal-flow layer, and B, being positioned, is painted later and sits on top.",
          proves: [
            { type: "computedStyle", selector: ".a", property: "position", expected: ["static"], message: "A is not positioned." },
            { type: "computedStyle", selector: ".b", property: "position", expected: ["relative"], message: "B is positioned." },
          ],
        },
        {
          prompt: "C is `position: relative; z-index: 1`. D comes after it in the HTML and is `position: relative` with no `z-index`. Which is in front where they overlap?",
          options: ["D, because it is later in the HTML", "Neither: they are siblings", "They blend together", "C, because `z-index: 1` beats `auto`"],
          answerIndex: 3,
          hint: "HTML order only decides between elements with the same z-index.",
          explanation: "When `z-index` values differ, the higher one wins regardless of HTML order. Positioned elements with `z-index: auto` are painted at level 0, so C, at level 1, is above D.",
          proves: [{ type: "computedStyle", selector: ".c", property: "z-index", expected: ["1"], message: "C has `z-index: 1`." }],
        },
        {
          prompt: "What would bring A in front of B?",
          options: ["Make A positioned (`position: relative`), so its `z-index: 5` takes effect", "Raise A's `z-index` to 9999", "Add `overflow: hidden` to A", "Add a margin to A"],
          answerIndex: 0,
          hint: "The `z-index` already exists. What stops it applying?",
          explanation: "A's `z-index` of 5 is already high enough. It is ignored only because A is static. Making it positioned lets the 5 count, and it beats B's implicit 0.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "stacking-contexts",
      kind: "learn",
      title: "Stacking contexts",
      summary: "Why z-index: 9999 sometimes still loses, what creates a stacking context, and how to escape or contain one.",
      minutes: 11,
      concept: {
        description:
          "A **stacking context** is a self-contained layer group. Inside it, children compete with each other by `z-index`, but the whole group is then treated as a single item when it competes with things outside. A child's `z-index` can never lift it above anything that lies outside its own context.",
        why: "This is the answer to the most frustrating stacking bug: you set `z-index: 9999` and the element is still behind something. The number is not the problem. The element is trapped inside a context that sits lower than the thing it is trying to beat.",
        mentalModel:
          "A stacking context is a folder of sheets of paper. Inside the folder, you can shuffle the sheets however you like. But the folder as a whole sits in the pile at one position. A sheet in a low folder can never rise above a sheet in a higher folder, whatever number is written on it.",
      },
      body: [
        { type: "heading", text: "What creates one" },
        {
          type: "paragraph",
          text: "The root `html` element is a stacking context, and many properties create new ones. The most common are a positioned element with a `z-index` other than `auto`, any `position: fixed` or `position: sticky` element, a flex or grid item with a `z-index`, an element with `opacity` below 1, and elements with `transform`, `filter`, `backdrop-filter`, `clip-path`, `mask`, `mix-blend-mode` (other than `normal`), `will-change` for those, or `isolation: isolate`.",
        },
        { type: "heading", text: "The trap" },
        {
          type: "paragraph",
          text: "Imagine a header with `position: relative; z-index: 1`, containing a dropdown at `z-index: 9999`. Next to it sits a hero section with `position: relative; z-index: 2`. The header is a stacking context at level 1, and the hero is another at level 2. The dropdown's 9999 only counts **inside the header's context**. As far as the page is concerned, the whole header, dropdown included, is at level 1, and the hero, at level 2, paints over it.",
        },
        {
          type: "code",
          language: "css",
          code: `.header {
  position: relative;
  z-index: 1;          /* a stacking context at level 1 */
}

.header .dropdown {
  position: absolute;
  z-index: 9999;       /* only beats things INSIDE .header */
}

.hero {
  position: relative;
  z-index: 2;          /* a different context at level 2: it wins */
}`,
          caption: "The dropdown is trapped below the hero, whatever its number",
        },
        { type: "heading", text: "Fixing and using it" },
        {
          type: "list",
          items: [
            "**Raise the trapping ancestor.** Give `.header` a `z-index` above the hero's. This is usually the fix.",
            "**Move the element.** A dropdown or modal can be placed higher in the DOM, close to `<body>`, so it is not inside the trap.",
            "**Remove what created the context**, such as an unnecessary `opacity: 0.99` or `transform` on an ancestor.",
            "**Use the top layer.** An element shown with `<dialog>` `showModal()` or the `popover` attribute is promoted above everything, and no `z-index` is needed.",
            "**Contain on purpose.** `isolation: isolate` on a component makes it its own context, so its internal `z-index` values cannot leak out and fight the rest of the page.",
          ],
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  isolation: isolate;
}

.card .label {
  position: absolute;
  z-index: 1;
}`,
            note: "The card is deliberately isolated. The label's `z-index: 1` stays inside it and cannot affect the rest of the page.",
          },
          bad: {
            code: `.card .label {
  position: absolute;
  z-index: 99999;
}`,
            note: "Nothing contains it, so a huge number in a component leaks into the page-wide fight, and the next developer has to beat it.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "To debug a stacking problem, walk up from the element that loses and look at each ancestor for `position` plus `z-index`, `opacity`, `transform`, `filter` or `isolation`. The first one you find is where it is trapped.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A stacking context groups its children. Their `z-index` values only compete inside it.",
            "Positioned elements with a `z-index`, fixed and sticky elements, `opacity` below 1, `transform`, `filter` and `isolation: isolate` all create one.",
            "A huge `z-index` cannot beat anything outside its own context. Raise the ancestor instead.",
            "Use `isolation: isolate` to contain a component, and `<dialog>` or `popover` to escape to the top layer.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "stacking-explorer",
      kind: "visualizer",
      title: "Stacking explorer",
      summary: "Two groups hold two chips. Change the z-index values, and see which chip wins, and why.",
      minutes: 10,
      concept: {
        description:
          "Two overlapping groups each contain a chip, and the chips overlap each other. You can change the `z-index` of each group and each chip. When a group has a numeric `z-index`, it becomes a stacking context, and its chip can only compete inside it.",
        why: "Reading that a child cannot escape its parent's context is easy to forget. Raising a chip to `z-index: 9999` and watching it stay behind the other chip, then raising its group instead and watching it jump to the front, makes the rule real.",
        mentalModel:
          "Each pale panel is a folder, and each coloured chip is a sheet inside it. When a folder has a number, sheets can only be reordered inside the folder. The folders themselves are ordered by their own numbers.",
      },
      stage: {
        html: '<div class="board">\n  <div class="group g1">Group 1<div class="chip c1">chip 1</div></div>\n  <div class="group g2">Group 2<div class="chip c2">chip 2</div></div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.board { position: relative; height: 100%; min-height: 260px; box-sizing: border-box; overflow: hidden; border-radius: 12px; background: #ffffff; }\n.group { position: absolute; box-sizing: border-box; width: 160px; height: 130px; padding: 8px 10px; border-radius: 12px; font-size: 12px; font-weight: 700; color: #475569; }\n.g1 { top: 24px; left: 24px; background: #c7d2fe; }\n.g2 { top: 74px; left: 130px; background: #fbcfe8; }\n.chip { position: absolute; width: 96px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: 8px; color: #ffffff; font-size: 13px; }\n.c1 { top: 52px; left: 70px; background: #4f46e5; }\n.c2 { top: 8px; left: 8px; background: #db2777; }",
        annotate: "none",
        target: ".group",
        items: ".group",
      },
      starter: `.g1 {
  z-index: auto;
}

.g2 {
  z-index: auto;
}

.c1 {
  z-index: 1;
}

.c2 {
  z-index: 1;
}
`,
      controls: [
        { id: "g1", label: "group 1 z-index", selector: ".g1", property: "z-index", fallback: "auto", type: "options", options: ["auto", "0", "1", "2", "3"], help: "A number (even 0) makes the group a stacking context." },
        { id: "g2", label: "group 2 z-index", selector: ".g2", property: "z-index", fallback: "auto", type: "options", options: ["auto", "0", "1", "2", "3"], help: "A number (even 0) makes the group a stacking context." },
        { id: "c1", label: "chip 1 z-index", selector: ".c1", property: "z-index", fallback: "auto", type: "options", options: ["auto", "1", "10", "9999"], help: "Only competes inside its own group when the group is a stacking context." },
        { id: "c2", label: "chip 2 z-index", selector: ".c2", property: "z-index", fallback: "auto", type: "options", options: ["auto", "1", "10", "9999"], help: "Same rule for the other chip." },
      ],
      presets: [
        { id: "trapped", label: "Chip 1 trapped", description: "group 1 below group 2", css: ".g1 { z-index: 1; }\n.g2 { z-index: 2; }\n.c1 { z-index: 9999; }" },
        { id: "freed", label: "Raise the group", description: "group 1 above group 2", css: ".g1 { z-index: 2; }\n.g2 { z-index: 1; }" },
        { id: "shared", label: "No contexts", description: "groups auto, chips compete directly", css: ".g1 { z-index: auto; }\n.g2 { z-index: auto; }\n.c1 { z-index: 10; }\n.c2 { z-index: 1; }" },
      ],
      challenge: {
        title: "Get chip 1 in front without touching the chips",
        description:
          "Right now chip 2 covers chip 1, and the chips both have `z-index: 1`. Without changing either chip, make chip 1 appear in front: give the groups numeric `z-index` values so that group 1 is above group 2. Set `.g1` to `2` and `.g2` to `1`.",
        hints: [
          "Groups with a numeric `z-index` become stacking contexts, so each chip is stuck inside its group.",
          "The groups are then ordered by their own numbers, and the chips ride along with them.",
          "`.g1 { z-index: 2; }` and `.g2 { z-index: 1; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".g1", property: "z-index", expected: ["2"], message: "Group 1 has `z-index: 2`." },
          { type: "computedStyle", selector: ".g2", property: "z-index", expected: ["1"], message: "Group 2 has `z-index: 1`, so group 1 is above it." },
        ],
        solution: `.g1 {
  z-index: 2;
}

.g2 {
  z-index: 1;
}

.c1 {
  z-index: 1;
}

.c2 {
  z-index: 1;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-trapped-dropdown",
      kind: "debug",
      title: "Debug: the dropdown, the tooltip and the pill",
      summary: "A dropdown is trapped under a hero, a tooltip is clipped, and a pill ignores its z-index.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<header class="nav">
  <button class="nav-btn">Menu</button>
  <ul class="dropdown">
    <li>Profile</li>
    <li>Settings</li>
  </ul>
</header>
<section class="hero">Hero section</section>
<div class="clip-wrap">Hover target <span class="tip">Tooltip</span></div>
<div class="bar"><span class="pill">9</span></div>`,
        css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.nav {
  position: relative;
  z-index: 1;
  padding: 0.75rem 1rem;
  background-color: #4f46e5;
}

.nav-btn {
  padding: 0.4rem 0.9rem;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 1rem;
  z-index: 9999;
  margin: 0;
  padding: 0.5rem 1rem;
  list-style: none;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgb(15 23 42 / 0.25);
}

.hero {
  position: relative;
  z-index: 2;
  padding: 2rem 1rem;
  background-color: #fde68a;
}

.clip-wrap {
  overflow: hidden;
  margin: 3rem 1rem 1rem;
  padding: 0.5rem;
  background-color: #e0e7ff;
}

.tip {
  position: absolute;
  top: -2rem;
  left: 0;
  padding: 0.25rem 0.5rem;
  background-color: #0f172a;
  color: #ffffff;
}

.bar {
  margin: 1rem;
  padding: 0.5rem;
  background-color: #f1f5f9;
}

.pill {
  z-index: 5;
  padding: 0.125rem 0.6rem;
  border-radius: 999px;
  background-color: #db2777;
  color: #ffffff;
}
`,
      },
      challenge: {
        title: "Free the dropdown, the tooltip and the pill",
        description:
          "Fix four problems. The dropdown is hidden behind the hero because its header, at `z-index: 1`, is below the hero's `2`: raise `.nav` to `z-index: 3`. The tooltip is positioned against the page and clipped: make `.clip-wrap` `position: relative` and give it `overflow: visible`. The pill's `z-index` does nothing: make `.pill` `position: relative`.",
        hints: [
          "The dropdown's `z-index: 9999` is not the problem. It is trapped inside `.nav`, which is a stacking context.",
          "The tooltip is `position: absolute`, so its container must be positioned, and `overflow: hidden` clips anything that sticks out of it.",
          "`.nav { z-index: 3; }` `.clip-wrap { position: relative; overflow: visible; }` `.pill { position: relative; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".nav", property: "z-index", expected: ["3"], message: "The header is at `z-index: 3`, above the hero." },
          { type: "computedStyle", selector: ".clip-wrap", property: "position", expected: ["relative"], message: "`.clip-wrap` is the anchor for the tooltip." },
          { type: "computedStyle", selector: ".clip-wrap", property: "overflow", expected: ["visible"], message: "`.clip-wrap` no longer clips the tooltip." },
          { type: "computedStyle", selector: ".pill", property: "position", expected: ["relative"], message: "`.pill` is positioned, so its `z-index` works." },
        ],
        solution: {
          html: `<header class="nav">
  <button class="nav-btn">Menu</button>
  <ul class="dropdown">
    <li>Profile</li>
    <li>Settings</li>
  </ul>
</header>
<section class="hero">Hero section</section>
<div class="clip-wrap">Hover target <span class="tip">Tooltip</span></div>
<div class="bar"><span class="pill">9</span></div>`,
          css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.nav {
  position: relative;
  z-index: 3;
  padding: 0.75rem 1rem;
  background-color: #4f46e5;
}

.nav-btn {
  padding: 0.4rem 0.9rem;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 1rem;
  z-index: 9999;
  margin: 0;
  padding: 0.5rem 1rem;
  list-style: none;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgb(15 23 42 / 0.25);
}

.hero {
  position: relative;
  z-index: 2;
  padding: 2rem 1rem;
  background-color: #fde68a;
}

.clip-wrap {
  position: relative;
  overflow: visible;
  margin: 3rem 1rem 1rem;
  padding: 0.5rem;
  background-color: #e0e7ff;
}

.tip {
  position: absolute;
  top: -2rem;
  left: 0;
  padding: 0.25rem 0.5rem;
  background-color: #0f172a;
  color: #ffffff;
}

.bar {
  margin: 1rem;
  padding: 0.5rem;
  background-color: #f1f5f9;
}

.pill {
  position: relative;
  z-index: 5;
  padding: 0.125rem 0.6rem;
  border-radius: 999px;
  background-color: #db2777;
  color: #ffffff;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "centering-and-overlays",
      kind: "learn",
      title: "Centring, overlays and popovers",
      summary: "The classic positioning patterns: centring, scrims, stretched links, dropdowns, and the top layer.",
      minutes: 10,
      concept: {
        description:
          "A small set of positioning patterns solves most real problems: centring an absolute element, covering a parent with an overlay, making a whole card clickable, hanging a dropdown under a button, and showing a modal that sits above everything with `<dialog>`.",
        why: "These patterns come up in nearly every project. Learning them as named recipes means that you recognise the situation and reach for the right one, without reinventing it, and you know which parts the modern platform now does for you.",
        mentalModel:
          "Each pattern is a recipe card: a small set of properties that always go together. The ingredients are the ones you already know: a positioned parent, an absolute child and some offsets.",
      },
      body: [
        { type: "heading", text: "Centring an absolute element" },
        {
          type: "paragraph",
          text: "If the element has a known size, set all four offsets to `0` and add `margin: auto`. If the size is not known, push the top left corner to the centre with `top: 50%; left: 50%`, then pull the element back by half of its own size with `transform: translate(-50%, -50%)`, since percentages in `translate()` refer to the element itself. For most centring, though, `display: grid; place-items: center` on the parent is simpler and needs no positioning.",
        },
        {
          type: "code",
          language: "css",
          code: `.dialog {
  position: absolute;
  inset: 0;
  width: 20rem;
  height: 12rem;
  margin: auto;
}

.unknown-size {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`,
          caption: "Two ways to centre, depending on whether you know the size",
        },
        { type: "heading", text: "Overlays and stretched links" },
        {
          type: "paragraph",
          text: "A **scrim** over a parent is `position: absolute; inset: 0` with a translucent background. To cover the whole window, use `position: fixed; inset: 0`. The same trick makes a whole card clickable: put the real link in the card's title, and stretch its `::after` pseudo-element over the card with `position: absolute; inset: 0`. The card, which is `position: relative`, becomes one big click target, while keyboard users still tab to a single, properly labelled link.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  position: relative;
}

.card a::after {
  content: "";
  position: absolute;
  inset: 0;
}`,
          caption: "The whole card is clickable through a single link",
        },
        { type: "heading", text: "Dropdowns, tooltips and the top layer" },
        {
          type: "paragraph",
          text: "A dropdown or tooltip needs a positioned wrapper, so the wrapper gets `position: relative`, and the popup gets `position: absolute; top: 100%` to hang just under the trigger. Remember that an ancestor with `overflow: hidden` clips it. For modals, use the `<dialog>` element and open it with `showModal()`. The browser places it in the **top layer**, above everything else, adds a backdrop, traps focus, and closes it with Escape, with no `z-index` and no hand-written overlay at all. The HTML `popover` attribute does the same for menus and tooltips. Newer **anchor positioning** will let you tether a popup to another element in pure CSS, but its support is still growing, so check before relying on it.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `/* HTML: <dialog id="confirm"> ... </dialog> */
/* JS:   confirm.showModal()                 */

dialog::backdrop {
  background-color: rgb(15 23 42 / 0.6);
}`,
            note: "The browser handles the overlay, stacking, focus and Escape. There is no `z-index` to manage.",
          },
          bad: {
            code: `.modal {
  position: fixed;
  top: 0; left: 0;
  right: 0; bottom: 0;
  z-index: 99999;
}`,
            note: "A hand-built modal has to handle stacking, focus trapping, Escape and scroll locking itself, and still loses if it sits in the wrong stacking context.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Reach for a layout tool first. If you just need something centred in a box, `place-items: center` on a grid parent is shorter, and it is not affected by the size of the child.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Centre an absolute element with `inset: 0; margin: auto` and a size, or `top: 50%; left: 50%; transform: translate(-50%, -50%)`.",
            "A scrim is `position: absolute; inset: 0` (or `fixed` for the window), and a stretched link uses `::after` the same way.",
            "A dropdown is a `top: 100%` absolute child of a `position: relative` wrapper.",
            "Use `<dialog>` and `popover` for modals and menus, so the top layer replaces `z-index` hacks.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "float-and-clear",
      kind: "learn",
      title: "float and clear",
      summary: "Wrapping text around an image, why a parent can collapse around floats, and the modern clearfix.",
      minutes: 9,
      concept: {
        description:
          "`float: left` or `float: right` takes an element out of the normal flow and pushes it to one side of its container, and the inline content that follows wraps around it. `clear` makes an element move below any floats instead of wrapping beside them.",
        why: "Floats were once the main layout tool, and they still do one job nothing else does as simply: wrapping text around an image. You will also meet them in a lot of older code, where understanding why a container collapses is the key to fixing it.",
        mentalModel:
          "A floated element is a boat pulled up on the left bank of a river of text. The text flows around the boat. `clear` is a rule that says, \"start below the last boat\".",
      },
      body: [
        { type: "heading", text: "Wrapping text around an element" },
        {
          type: "paragraph",
          text: "A floated element is removed from the normal flow of block layout, but, unlike an absolute element, it still affects the **inline content** around it. Text and other inline content shorten their lines to flow around the float, which is how magazine-style layouts wrap a paragraph around a picture. Give the float a margin on the open side so the text does not touch it.",
        },
        {
          type: "code",
          language: "css",
          code: `.portrait {
  float: left;
  width: 10rem;
  margin: 0 1.5rem 1rem 0;
}

.portrait.round {
  shape-outside: circle(50%);
  border-radius: 50%;
}`,
          caption: "An image on the left with text flowing around it, and a round version that makes the text curve",
        },
        { type: "heading", text: "The collapsing parent" },
        {
          type: "paragraph",
          text: "Because a float is out of the flow, a parent whose only content is floated has **nothing in flow to wrap around**, so its height collapses to zero, and its background and border no longer enclose the float. The modern fix is `display: flow-root` on the parent, which creates a new formatting context that contains its floats. Older fixes work too: `overflow: auto` (with side effects) or a `::after` pseudo-element with `clear: both`, known as the clearfix.",
        },
        {
          type: "code",
          language: "css",
          code: `.media {
  display: flow-root;      /* contains the floats inside it */
}

/* the older clearfix */
.media::after {
  content: "";
  display: block;
  clear: both;
}`,
          caption: "Make the parent wrap its floats",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.media {
  display: flow-root;
}

.media img {
  float: left;
}`,
            note: "The parent contains its floated image, so its background and padding wrap around it properly.",
          },
          bad: {
            code: `.media {
  background-color: #e0e7ff;
}

.media img {
  float: left;
}`,
            note: "The parent has no in-flow content, so its height collapses to the text, and the pale background does not reach down to the image.",
          },
        },
        {
          type: "paragraph",
          text: "Two more details are worth knowing. A float shrinks to fit its content unless you give it a width, so a floated image uses its own size, and a floated paragraph can become very narrow. Floats also stack beside each other: several `float: left` boxes line up in a row until the container is full, and then wrap to the next row, which is how old grid layouts and photo galleries were built.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "Do not use floats to build page layouts. Flexbox and grid are far more capable and do not need clearing. Keep floats for wrapping text around images.",
        },
        {
          type: "callout",
          tone: "note",
          text: "`clear: left`, `right` or `both` moves an element down until its top edge is below the bottom of the floats on that side. `float: inline-start` and `inline-end` are the logical versions that flip in right-to-left languages.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`float: left` or `right` moves an element to the side, and inline content wraps around it.",
            "A parent with only floated children collapses. Use `display: flow-root` to contain them.",
            "`clear: both` moves an element below any floats, and was the basis of the old clearfix.",
            "Use floats only for wrapping text around images, and use flexbox or grid for layout.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "positioning-and-accessibility",
      kind: "learn",
      title: "Positioning and accessibility",
      summary: "Keep reading order and focus order sensible, stop fixed bars hiding content, and hide things the right way.",
      minutes: 9,
      concept: {
        description:
          "Positioning changes where things **appear**, but not where they are in the HTML. Keyboards, screen readers and search engines all follow the HTML order, so any gap between the visual order and the source order can confuse the people who depend on them. Fixed and sticky bars can also hide content, including the element that has keyboard focus.",
        why: "Positioning is powerful enough to make a page look right and work wrong. A form that tabs in a jumbled order, a link hidden under a fixed header, or a tooltip nobody can reach by keyboard is a real barrier, and each one has a straightforward fix.",
        mentalModel:
          "The HTML is the script of a play, and positioning is the stage direction. The audience in the seats sees the staging, but a person following along by ear can only follow the script. The two have to tell the same story.",
      },
      body: [
        { type: "heading", text: "Source order is reading order" },
        {
          type: "paragraph",
          text: "Keyboard focus moves through interactive elements in the order they appear in the HTML, not in the order they appear on screen. Screen readers read in source order too. If you use positioning to put a footer-looking element at the top, or to swap the order of two buttons, keyboard users will tab through them in the wrong visual order. Put elements in the HTML in the order that makes sense, and use positioning only for small adjustments.",
        },
        { type: "heading", text: "Fixed bars and focus" },
        {
          type: "paragraph",
          text: "A fixed or sticky header can cover the element that receives keyboard focus as the page scrolls to it. WCAG 2.2 asks that a focused element is not entirely hidden. The fix is to tell the browser to leave room: `scroll-padding-top` on the scrolling element (usually `html`) equal to the header's height, so focus and `#anchor` links stop below the bar. For a single target, `scroll-margin-top` does the same.",
        },
        {
          type: "code",
          language: "css",
          code: `html {
  scroll-padding-top: 5rem;   /* the height of the fixed header, plus a gap */
}

.site-header {
  position: sticky;
  top: 0;
  height: 4rem;
}`,
          caption: "Focused elements and anchor links land below the header, not behind it",
        },
        { type: "heading", text: "Hiding things the right way" },
        {
          type: "paragraph",
          text: "Moving something off screen with `left: -9999px` hides it visually, but it stays in the accessibility tree and can still receive focus, which leaves keyboard users tabbing into the void. To hide content from everyone, use `display: none` or `hidden`. For content that must be **available only to screen readers**, use a visually hidden utility: `position: absolute`, a 1px size, `overflow: hidden`, `clip-path: inset(50%)` and `white-space: nowrap`. The same absolutely positioned pattern is used for \"skip to content\" links, which become visible when focused.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.skip-link {
  position: absolute;
  top: -4rem;
}

.skip-link:focus {
  top: 0.5rem;
}`,
            note: "Hidden off screen until it is focused, and then it slides into view so keyboard users can see it.",
          },
          bad: {
            code: `.dropdown-item {
  position: absolute;
  left: -9999px;
}`,
            note: "Hidden from the eye, but still focusable, so a keyboard user tabs onto something they cannot see.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Tooltips and dropdowns must be reachable and dismissible without a mouse. Show them on `:focus-visible` as well as `:hover`, keep them open while the pointer moves onto them, and close them with Escape.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Focus and reading order follow the HTML, not the screen, so keep the source order sensible.",
            "Fixed and sticky headers can hide focused elements. Add `scroll-padding-top` to leave room.",
            "Do not hide things with `left: -9999px`. Use `display: none`, `hidden` or a visually-hidden utility.",
            "Anything shown on hover must also show on keyboard focus, and be dismissible.",
          ],
        },
      ],
    },

    // Guided build: step files live in ./positioning/workshops/build-an-article-page (compiled by `npm run build:content`).
    buildAnArticlePage,

    /* ------------------------------------------------------------------ */
    {
      id: "positioning-quiz",
      kind: "quiz",
      title: "Quiz: positioning",
      summary: "Eighteen questions on the five position values, offsets, containing blocks, z-index and stacking contexts.",
      minutes: 14,
      passPercent: 70,
      questions: [
        {
          prompt: "What is the default value of `position`?",
          options: ["`relative`", "`static`", "`absolute`", "`sticky`"],
          answerIndex: 1,
          explanation: "Every element is `position: static` unless you change it. Static elements follow normal flow and ignore offsets and `z-index`.",
        },
        {
          prompt: "An element has `position: relative; top: 20px`. What happens to the elements after it?",
          options: ["They move down", "They move up", "Nothing: the element's original space is kept", "The element is removed from the flow"],
          answerIndex: 2,
          explanation: "Relative positioning shifts the element visually, but the layout still treats it as if it were in its original place, so its siblings stay put.",
        },
        {
          prompt: "An absolutely positioned element is placed against which box?",
          options: ["The viewport, always", "Its parent, always", "Its previous sibling", "Its nearest positioned ancestor, or the page if there is none"],
          answerIndex: 3,
          explanation: "The containing block of an absolute element is the padding box of the nearest ancestor that is positioned. With no positioned ancestor, it is the initial containing block.",
        },
        {
          prompt: "What should you add to a card so that an absolutely positioned badge inside it sits in the card's corner?",
          options: ["`position: relative` on the card", "`display: block` on the card", "`overflow: hidden` on the card", "`float: left` on the card"],
          answerIndex: 0,
          explanation: "The card must be positioned to become the badge's containing block. `position: relative` with no offsets does that without moving the card.",
        },
        {
          prompt: "A `position: fixed` element is normally placed relative to which box?",
          options: ["Its parent", "The viewport, unless an ancestor has a `transform`", "The document", "Its nearest sibling"],
          answerIndex: 1,
          explanation: "Fixed elements are pinned to the viewport. An ancestor with a `transform`, `filter` or similar becomes their containing block instead.",
        },
        {
          prompt: "Which of these can make `position: sticky` stop working?",
          options: ["Using it on a `div`", "Adding a `z-index`", "An ancestor with `overflow: hidden`, or no `top` value", "Using it in a modern browser"],
          answerIndex: 2,
          explanation: "A sticky element needs a threshold such as `top: 0`, and it measures against its nearest scrolling ancestor, which `overflow: hidden` or `auto` changes.",
        },
        {
          prompt: "Which elements does `z-index` apply to?",
          options: ["All elements", "Only inline elements", "Only floated elements", "Positioned elements, and flex or grid items"],
          answerIndex: 3,
          explanation: "On a plain static element, `z-index` is ignored. It works on elements with a `position` other than `static`, and on children of flex or grid containers.",
        },
        {
          prompt: "A dropdown has `z-index: 9999` but still appears behind another section. What is the most likely reason?",
          options: ["Its `z-index` only competes inside the stacking context of an ancestor that sits lower", "9999 is too big a number", "Absolute elements ignore `z-index`", "Browsers cap `z-index` at 100"],
          answerIndex: 0,
          explanation: "A child's `z-index` cannot lift it above anything outside its own stacking context. Raise the ancestor that creates the context, instead of the child.",
        },
        {
          prompt: "Which of these creates a stacking context?",
          options: ["`color: red`", "`opacity: 0.99`", "`margin: 0`", "`font-size: 2rem`"],
          answerIndex: 1,
          explanation: "An `opacity` below 1 creates a stacking context, as do `transform`, `filter`, `isolation: isolate` and positioned elements with a `z-index`.",
        },
        {
          prompt: "What does `inset: 0` do on an absolutely positioned element?",
          options: ["Sets its margin to 0", "Removes its position", "Sets top, right, bottom and left to 0, stretching it over its containing block", "Resets its `z-index`"],
          answerIndex: 2,
          explanation: "`inset` is the shorthand for the four offsets. With all four at 0 and automatic sizes, the element fills its containing block.",
        },
        {
          prompt: "An absolute element has `top`, `bottom` and a fixed `height` all set. What happens?",
          options: ["The browser reports an error", "`bottom` wins", "The values are averaged", "It is over-constrained, and `bottom` is ignored"],
          answerIndex: 3,
          explanation: "There are too many instructions for the height, so one is dropped. In normal writing modes, `top` wins and `bottom` is ignored.",
        },
        {
          prompt: "How can you centre an absolute element that has a known width and height?",
          options: ["`inset: 0; margin: auto`", "`text-align: center`", "`float: center`", "`vertical-align: middle`"],
          answerIndex: 0,
          explanation: "With all four offsets at 0, a fixed size and `margin: auto`, the spare space is split evenly on every side, so the element is centred.",
        },
        {
          prompt: "A fixed header covers the first lines of the page content. What is the usual fix?",
          options: ["Make the header `relative`", "Add padding at the top of the page equal to the header's height", "Remove the `z-index`", "Use `float: left` on the header"],
          answerIndex: 1,
          explanation: "A fixed element takes up no space in the layout, so the content starts underneath it. Padding on the body or main content reserves the room.",
        },
        {
          prompt: "A parent has a `transform`, and a child inside it is `position: fixed`. What happens?",
          options: ["Nothing changes", "The child becomes invisible", "The child is fixed to the transformed parent, not to the window", "The child becomes sticky"],
          answerIndex: 2,
          explanation: "A `transform` makes the element a containing block for fixed and absolute descendants, so the child is positioned against it instead of against the viewport.",
        },
        {
          prompt: "What does `clear: both` do?",
          options: ["Removes floats from the HTML", "Hides the element", "Resets the element's styles", "Moves the element below any floated elements on either side"],
          answerIndex: 3,
          explanation: "`clear` pushes an element down until it is below floats on the named side, and `both` covers left and right.",
        },
        {
          prompt: "Which of these hides content visually but keeps it available to screen readers?",
          options: ["A visually-hidden utility class (tiny, clipped and absolutely positioned)", "`display: none`", "`visibility: hidden`", "The `hidden` attribute"],
          answerIndex: 0,
          explanation: "`display: none`, `visibility: hidden` and `hidden` all remove the content from the accessibility tree. A visually-hidden utility keeps it there.",
        },
        {
          prompt: "In what order does keyboard focus move through a page?",
          options: ["The order elements appear on screen", "The order elements appear in the HTML", "By `z-index`, highest first", "Alphabetically"],
          answerIndex: 1,
          explanation: "Tab order follows the source order. Moving elements around with positioning does not change it, which is why a mismatch confuses keyboard users.",
        },
        {
          prompt: "A sticky element's offsets are measured against what?",
          options: ["The viewport only", "Its own previous position", "Its nearest scrolling ancestor, and it cannot leave its parent", "The document root only"],
          answerIndex: 2,
          explanation: "Sticky uses the nearest scrolling ancestor for its threshold, and it stays within its parent, so it leaves with the parent's bottom edge.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "positioning-review",
      kind: "review",
      title: "Review: positioning cheat sheet",
      summary: "The five values, containing blocks, offsets, stacking and the patterns on one page.",
      minutes: 4,
      body: [
        { type: "heading", text: "The five values" },
        {
          type: "code",
          language: "css",
          code: `position: static;    /* default: in flow, offsets and z-index ignored */
position: relative;  /* in flow, nudged visually, space kept; anchor for children */
position: absolute;  /* out of flow; placed against the nearest positioned ancestor */
position: fixed;     /* out of flow; pinned to the viewport (unless a transform ancestor) */
position: sticky;    /* in flow until a threshold; needs top/bottom/left/right */`,
        },
        { type: "heading", text: "Offsets" },
        {
          type: "code",
          language: "css",
          code: `inset: 0;                       /* top, right, bottom, left all 0: fill the containing block */
top: 100%; left: 0;             /* a dropdown right under its wrapper */
top: -8px; right: -8px;         /* a badge hanging over a corner */
inset: 0; width: 20rem; height: 12rem; margin: auto;   /* centred */
/* left + right + width all set = over-constrained: right is ignored */`,
        },
        { type: "heading", text: "Stacking" },
        {
          type: "code",
          language: "css",
          code: `z-index: 2;                 /* only on positioned elements and flex/grid items */
isolation: isolate;         /* contain a component's z-index values */
/* creates a stacking context: positioned + z-index, fixed, sticky, opacity < 1,
   transform, filter, backdrop-filter, will-change, isolation: isolate */`,
        },
        { type: "heading", text: "Patterns" },
        {
          type: "code",
          language: "css",
          code: `.card { position: relative; }
.card a::after { content: ""; position: absolute; inset: 0; }   /* stretched link */
.header { position: sticky; top: 0; z-index: 10; }
.sidebar { position: sticky; top: 5rem; align-self: start; }
html { scroll-padding-top: 5rem; }          /* keep focus below a sticky header */
.media { display: flow-root; }              /* contain floats */`,
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "Offsets and `z-index` do nothing on a static element. Check for a missing `position` first.",
            "An absolute child needs a positioned parent, usually `position: relative` with no offsets.",
            "A huge `z-index` cannot beat anything outside its own stacking context. Raise the ancestor.",
            "Sticky needs a threshold, a parent tall enough, and no `overflow` other than `visible` on an ancestor.",
            "A fixed element takes no space, so reserve room for it. A `transform` ancestor changes what fixed means.",
            "Focus and reading order follow the HTML, not the screen. Do not hide things with `left: -9999px`.",
            "Prefer `<dialog>` and `popover` over hand-built overlays and `z-index` hacks.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "When something is in the wrong place, ask three questions: is it positioned, what is its containing block, and which stacking context is it in? Nearly every bug is one of the three.",
        },
      ],
    },
  ],
};

export default content;
