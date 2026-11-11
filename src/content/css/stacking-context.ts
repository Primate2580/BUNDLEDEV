import type { TopicContent } from "@/engine/types";
import layerADashboard from "./stacking-context/workshops/layer-a-dashboard/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-is-a-stacking-context",
          kind: "learn",
          title: "What a stacking context really is",
          summary: "A stacking context is a self-contained layer group: everything inside is painted together, then placed as one unit among its neighbours.",
          minutes: 10,
          concept: {
            description: "A **stacking context** is a three-dimensional bubble in which a set of elements is layered along the z-axis. The browser paints everything inside the bubble together, in a fixed order, and then treats the finished bubble as **one layer** when it stacks it against its neighbours. Elements inside cannot slip between layers outside the bubble.",
            why: "Almost every z-index mystery is a stacking context mystery. The number `9999` does not mean \"above everything\". It means \"above everything **in my own bubble**\", and the bubble itself may be low in a bigger one. Once you see the page as bubbles inside bubbles, a problem that seemed random becomes a short, logical question.",
            mentalModel: "A stacking context is a stack of sheets in a transparent folder. The sheets inside the folder can be put in any order, and nothing outside can slide in between them. When the folder is placed on the desk, it takes one position in the pile, and all its sheets move with it. The page is a desk with folders inside folders.",
          },
          body: [
            {
              type: "heading",
              text: "A quick refresher",
            },
            {
              type: "paragraph",
              text: "In the Positioning topic you met `z-index` and learned that elements are painted in a default order, with positioned elements above the normal flow. That story is true, but it is incomplete. The full picture is that the browser does not compare every element on the page with every other element. It builds a **tree of stacking contexts** and compares elements only with others **inside the same context**.",
            },
            {
              type: "heading",
              text: "The root and its children",
            },
            {
              type: "paragraph",
              text: "The whole page lives in a stacking context created by the `html` element, the **root** stacking context. Other elements can create new contexts nested inside it, and those can contain still more. Any element that does not create its own context takes part in the nearest ancestor's context. That is why in a simple page without special properties, every positioned element can be compared directly by `z-index`: they all live in the root bubble.",
            },
            {
              type: "code",
              language: "css",
              code: `<body>                         <!-- root stacking context (from <html>) -->
      <header class="bar">…</header>
      <main>
        <div class="card">           <!-- creates a context (e.g. position: relative; z-index: 1) -->
          <span class="tip">…</span>  <!-- stacked only against siblings inside .card -->
        </div>
      </main>
    </body>`,
              caption: "Contexts nest: .tip is compared with its siblings inside .card, not with .bar",
            },
            {
              type: "heading",
              text: "The two rules that explain almost everything",
            },
            {
              type: "list",
              items: [
                "**Inside a context,** elements are painted in a fixed order. `z-index` values decide the order of the positioned ones.",
                "**Between contexts,** the whole context moves as one piece. Its position among its neighbours is decided by the context's **own** z-index (or its place in the tree), never by the z-index values of its children.",
              ],
            },
            {
              type: "paragraph",
              text: "This is why a `z-index: 9999` child inside a context at level 1 loses to a sibling context at level 2, even with a much smaller number. The child is only fighting for position inside its folder. The folder, as a whole, is below the other folder.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.dropdown { position: absolute; z-index: 10; }
    .header   { position: relative; z-index: 3; }    /* the header folder is above... */
    .content  { position: relative; z-index: 2; }    /* ...the content folder */`,
                note: "Raising the **header** (the folder), not the dropdown, puts the whole header context, and its dropdown, above the content.",
              },
              bad: {
                code: `.dropdown { position: absolute; z-index: 10; }   /* inside .header */
    .header   { position: relative; z-index: 1; }    /* a context at level 1 */
    .content  { position: relative; z-index: 2; }    /* a context at level 2 */`,
                note: "`.dropdown` lives inside `.header`'s context, which is below `.content`. The dropdown goes under the content, even though 10 is bigger than 2.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "When a z-index does not work, stop raising the number. Ask instead: which stacking context is this element in, and what is that context's own level?",
            },
            {
              type: "callout",
              tone: "note",
              text: "Stacking contexts and the document tree are related but not identical. An element only joins an ancestor's context if that ancestor creates one. The context tree is a smaller tree, drawn over the DOM tree.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "A stacking context is a bubble in which elements are layered together and then placed as one unit.",
                "The page has a root context, and other elements can create contexts nested inside it.",
                "Inside a context, z-index orders the positioned elements. Between contexts, only the context's own level counts.",
                "A big z-index cannot escape its context, so fix the bubble, not the number.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "painting-order-inside-a-context",
          kind: "learn",
          title: "The painting order inside a context",
          summary: "The seven layers every stacking context paints, from its own background up to positive z-index.",
          minutes: 10,
          concept: {
            description: "Inside every stacking context, the browser paints in a fixed sequence of **seven layers**, bottom to top. The context's own background comes first, then negative z-index children, then normal block backgrounds, floats, inline content, positioned elements at level zero, and finally positive z-index children.",
            why: "Once you know the order, many puzzles solve themselves. Why does a floated image cover a block's background but not its text? Why does text with a negative z-index vanish behind a background? Why does an absolutely positioned element with no z-index sit above a normal element that comes after it in the HTML? The answers are all layers in this list.",
            mentalModel: "Imagine painting a scene on a wall in a set order: first the wall colour, then things far behind, then the furniture, then the people, then the things that hang in front of everything. You cannot choose to paint the people before the furniture, but you can decide which items count as far-behind and which as hanging in front, and that is what z-index does.",
          },
          body: [
            {
              type: "heading",
              text: "The seven layers, bottom to top",
            },
            {
              type: "list",
              items: [
                "**1. The context's own background and border.** For the root, that is the page background (the canvas).",
                "**2. Child contexts with a negative z-index,** the most negative first.",
                "**3. Normal-flow, non-positioned block-level children:** their backgrounds and borders, in HTML order.",
                "**4. Non-positioned floats.**",
                "**5. Normal-flow, non-positioned inline-level content:** text and inline boxes, in HTML order.",
                "**6. Positioned children with `z-index: auto` or `0`,** and child contexts at level zero, in HTML order.",
                "**7. Child contexts with a positive z-index,** the smallest first.",
              ],
              ordered: true,
            },
            {
              type: "paragraph",
              text: "Layers 3 to 5 are what you get with no positioning at all: backgrounds, then floats, then text. This is why a float, which is painted in layer 4, can cover the **background** of the block next to it but never the text, which is painted later in layer 5.",
            },
            {
              type: "heading",
              text: "Why positioned elements win by default",
            },
            {
              type: "paragraph",
              text: "A positioned element with no z-index falls in layer 6, above all the non-positioned content. That is why an absolutely positioned badge appears over text even though it comes earlier in the HTML. Two layer-6 elements are ordered by their position in the HTML: the later one is on top.",
            },
            {
              type: "code",
              language: "css",
              code: `.bg-box   { /* not positioned: layer 3 */ background: #e0e7ff; }
    .float    { float: left; /* layer 4 */ background: #fbbf24; }
    .text     { /* inline content: layer 5 */ }
    .badge    { position: absolute; /* layer 6 */ }
    .behind   { position: relative; z-index: -1; /* layer 2 */ }
    .front    { position: relative; z-index: 1;  /* layer 7 */ }`,
              caption: "Where common elements land in the seven layers",
            },
            {
              type: "heading",
              text: "Negative z-index",
            },
            {
              type: "paragraph",
              text: "A negative z-index drops a child context into layer 2, **below** the non-positioned content of its parent but **above** the parent's own background. That is useful for decorative shapes behind text. But there is a trap: if the parent does not create a context of its own, the negative child falls into the next context up, and can sink **behind the parent's background**, or even behind the page, and vanish.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.card {
      position: relative;
      z-index: 0;                 /* a context: -1 stays inside it */
    }
    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;                /* behind the text, above the card's background */
    }`,
                note: "The card creates a context, so the pseudo-element is painted above the card's own background and behind its text.",
              },
              bad: {
                code: `.card {
      background: white;           /* no context here */
    }
    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;                /* lands in the ancestor's context, behind the white */
    }`,
                note: "Without a context on `.card`, the shape sinks behind the card's background (or the page) and cannot be seen.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "A one-line way to make a safe parent for a negative z-index child is `isolation: isolate` on the parent. A later lesson explains why it is a good tool.",
            },
            {
              type: "callout",
              tone: "note",
              text: "Descendants of a positioned `z-index: auto` element take part in the **parent** context, not in a new one. Only an element that creates a context makes its descendants a separate group.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Each context paints seven layers: its background, negative children, block backgrounds, floats, inline content, level-zero positioned children, positive children.",
                "Positioned elements with `z-index: auto` or `0` paint above all the non-positioned content, in HTML order.",
                "A negative z-index sits above the context's own background but behind its normal content.",
                "A negative child needs a parent that creates a context, or it may vanish behind a background.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "z-index-rules",
          kind: "learn",
          title: "The exact rules of z-index",
          summary: "Which elements accept z-index, how `auto` differs from `0`, and what negative and huge numbers really do.",
          minutes: 9,
          concept: {
            description: "`z-index` only applies to **positioned elements** (anything except `position: static`) and to **flex and grid items**. It takes an integer or `auto`. An integer creates a stacking context on a positioned element, and `auto` does not. Its value is only compared with elements in the same stacking context.",
            why: "`z-index` looks like a global control, and it is not. Several pieces of its behaviour surprise even experienced developers: it does nothing on a static box, it works on flex children without `position`, and `auto` is not the same as `0`. Knowing the exact rules prevents a long list of confusing bugs.",
            mentalModel: "z-index is a seat number on a ticket, and it only means something inside the room you are in. A ticket for seat 9999 in room A does not put you ahead of a ticket for seat 1 in room B. And a ticket has to be valid first: only positioned boxes and flex or grid items are given tickets.",
          },
          body: [
            {
              type: "heading",
              text: "Who gets a z-index",
            },
            {
              type: "list",
              items: [
                "**Positioned elements:** `relative`, `absolute`, `fixed` and `sticky`. They accept any integer.",
                "**Flex items and grid items:** these accept a z-index even when they are `position: static`, which makes overlapping items in a grid easy to order.",
                "**Static, non-flex children:** the property is ignored. This is the most common reason for \"my z-index does nothing\".",
              ],
            },
            {
              type: "code",
              language: "css",
              code: `.badge {
      z-index: 5;                  /* ignored: position is static */
    }
    
    .badge {
      position: relative;          /* now it works */
      z-index: 5;
    }
    
    .grid-item.hero {
      z-index: 1;                  /* works with no position: it is a grid item */
    }`,
              caption: "z-index needs a positioned element, or a flex or grid item",
            },
            {
              type: "heading",
              text: "`auto` against `0`",
            },
            {
              type: "paragraph",
              text: "On a positioned element, `z-index: auto` does **not** create a stacking context, so the element's children stay in the parent context. `z-index: 0` **does** create one. Both paint in the same layer (level zero), but the children behave very differently. This is why `z-index: 0` is a common trick to \"close\" a context on purpose, a technique that `isolation: isolate` now offers in a clearer way.",
            },
            {
              type: "heading",
              text: "Negative and large numbers",
            },
            {
              type: "paragraph",
              text: "Negative values put an element below non-positioned content, as the previous lesson showed. The size of the number only matters for ordering, so `z-index: 2` and `z-index: 2000` do the same thing against an element at `1`. Large numbers do not help you escape a context. They only make it harder to find the next free number.",
            },
            {
              type: "heading",
              text: "Ties and tree order",
            },
            {
              type: "paragraph",
              text: "Two elements in the same context with the same z-index are ordered by HTML position: the later one is on top. This holds for `auto` and for equal numbers. When you need a specific order, the smallest change is often to reorder the HTML, if it makes sense, or to give the two elements different numbers.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.item-a { position: relative; z-index: 1; }
    .item-b { position: relative; z-index: 2; }`,
                note: "Small, distinct numbers in a single context. The order is clear and there is room to add another.",
              },
              bad: {
                code: `.item-a { position: relative; z-index: 9999; }
    .item-b { position: relative; z-index: 99999; }`,
                note: "The numbers escalate in an arms race, and neither is any more effective than 2 and 3 would be.",
              },
            },
            {
              type: "callout",
              tone: "warning",
              text: "A positioned element with `z-index: auto` is painted as though it created a context, in layer 6, but its children are **not** inside a new context. This subtle exception explains why a child of such an element can still be stacked against elements outside it.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "To test whether `z-index` can apply to an element, look at its computed `position` in DevTools. If it is `static`, and the element is not a flex or grid item, the property has no effect.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`z-index` applies to positioned elements and to flex and grid items. It is ignored on other static elements.",
                "`z-index: auto` creates no context on a positioned element, and `z-index: 0` does.",
                "Only the relative order of values matters. Huge numbers do not help, and they are only compared within one context.",
                "Equal values in one context are ordered by their place in the HTML.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "paint-order-explorer",
          kind: "visualizer",
          title: "Paint order explorer",
          summary: "Four overlapping boxes and a line of normal text inside one stacking context. Move boxes up, down and behind the text with z-index.",
          minutes: 8,
          concept: {
            description: "Four absolutely positioned boxes overlap inside a scene that is its own stacking context, together with a line of ordinary, non-positioned text. Controls set each box's `z-index`, from negative values up to positive ones, so you can see where the layers sit relative to the scene background, the normal text and each other.",
            why: "The seven layers are easy to memorise and easy to forget. Dragging a box from `-1` to `0` and watching it jump from behind the text to in front of it makes the rule concrete: a negative z-index is below the normal content but above the background.",
            mentalModel: "The scene paints in a fixed order, bottom to top: its background, then boxes with negative numbers, then normal content such as text, then boxes at zero (in HTML order), then boxes with positive numbers (smallest first). A box's z-index only chooses its slot in that order.",
          },
          stage: {
            html: `<div class="scene">
      <p class="note">Normal text</p>
      <div class="box box-1">1</div>
      <div class="box box-2">2</div>
      <div class="box box-3">3</div>
      <div class="box box-4">4</div>
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #ffffff; font-family: system-ui, sans-serif; font-size: 13px; font-weight: 600; }
    .scene { position: relative; isolation: isolate; height: 220px; margin: 16px; border-radius: 12px; background: #1e293b; overflow: hidden; }
    .note { margin: 0; padding: 70px 0 0 16px; font-size: 30px; font-weight: 800; color: #f8fafc; letter-spacing: 0.02em; }
    .box { position: absolute; display: flex; align-items: center; justify-content: center; width: 90px; height: 90px; border-radius: 12px; font-size: 20px; font-weight: 800; opacity: 0.92; }
    .box-1 { left: 20px; top: 40px; background: #6366f1; }
    .box-2 { left: 70px; top: 70px; background: #0ea5e9; }
    .box-3 { left: 120px; top: 100px; background: #10b981; }
    .box-4 { left: 170px; top: 130px; background: #f59e0b; color: #1e293b; }`,
            annotate: "none",
            target: ".scene",
            items: ".box",
            itemCount: 4,
          },
          starter: `.box-1 {
      z-index: 1;
    }
    
    .box-2 {
      z-index: 2;
    }
    
    .box-3 {
      z-index: 3;
    }
    
    .box-4 {
      z-index: 4;
    }
    `,
          controls: [
            {
              id: "z",
              label: "z-index of the selected box",
              selector: ".box-{item}",
              property: "z-index",
              fallback: "0",
              type: "range",
              min: -3,
              max: 8,
              step: 1,
              help: "Select a box first. Negative values go behind the text, and `0` puts boxes in HTML order.",
            },
          ],
          presets: [
            {
              id: "reverse",
              label: "Reverse the order",
              description: "box 1 on top",
              css: `.box-1 { z-index: 4; }
    .box-2 { z-index: 3; }
    .box-3 { z-index: 2; }
    .box-4 { z-index: 1; }`,
            },
            {
              id: "zero",
              label: "All at zero",
              description: "HTML order decides",
              css: `.box-1 { z-index: 0; }
    .box-2 { z-index: 0; }
    .box-3 { z-index: 0; }
    .box-4 { z-index: 0; }`,
            },
            {
              id: "behind",
              label: "Send box 2 behind the text",
              description: "a negative z-index",
              css: ".box-2 { z-index: -1; }",
            },
            {
              id: "stack",
              label: "Two negative boxes",
              description: "-2 is below -1",
              css: `.box-2 { z-index: -1; }
    .box-3 { z-index: -2; }`,
            },
          ],
          challenge: {
            title: "Behind the text, and on top",
            description: "Send box 2 behind the normal text, but above the scene's background, with `z-index: -1`. Bring box 1 above all the others with `z-index: 5`. Leave boxes 3 and 4 as they are.",
            hints: [
              "Two rules need to change: `.box-1` and `.box-2`.",
              "A negative z-index puts the box below the text, and the scene is isolated, so it stays above the scene's own background.",
              "`.box-1 { z-index: 5; }` and `.box-2 { z-index: -1; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".box-1",
                property: "z-index",
                expected: ["5"],
                message: "Box 1 is the top layer, `z-index: 5`.",
              },
              {
                type: "computedStyle",
                selector: ".box-2",
                property: "z-index",
                expected: ["-1"],
                message: "Box 2 is behind the text, `z-index: -1`.",
              },
              {
                type: "computedStyle",
                selector: ".box-4",
                property: "z-index",
                expected: ["4"],
                message: "Box 4 keeps `z-index: 4`.",
              },
            ],
            solution: `.box-1 {
      z-index: 5;
    }
    
    .box-2 {
      z-index: -1;
    }
    
    .box-3 {
      z-index: 3;
    }
    
    .box-4 {
      z-index: 4;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "what-creates-a-context",
          kind: "learn",
          title: "Everything that creates a stacking context",
          summary: "The full list, from `z-index` to `opacity`, `transform`, `filter` and `will-change`, and why the surprising ones matter.",
          minutes: 11,
          concept: {
            description: "A stacking context is created by more properties than `z-index`. Several everyday properties, such as `opacity`, `transform` and `filter`, create one as a side effect. These **accidental** contexts are behind most hard stacking bugs, because the property was added for a visual reason and nobody noticed that it also created a layer boundary.",
            why: "You cannot debug what you cannot spot. If you know the complete list, you can scan an element's ancestors and quickly find the one that creates the bubble that traps its child. It is a short list, and learning it is the best investment in this whole topic.",
            mentalModel: "Think of the list as a set of things that each \"wrap\" an element in a transparent folder. Some folders are labelled on purpose, like `isolation: isolate`. Others come free with a property, such as `opacity: 0.99` or `transform: translateX(0)`, and arrive without any warning.",
          },
          body: [
            {
              type: "heading",
              text: "On purpose",
            },
            {
              type: "list",
              items: [
                "The **root** element, `<html>`.",
                "A positioned element (`relative`, `absolute`) with a `z-index` other than `auto`.",
                "`position: fixed` or `position: sticky`, **always**, even with `z-index: auto`.",
                "A flex or grid item with a `z-index` other than `auto`.",
                "`isolation: isolate`, which exists only to create a context.",
                "Elements in the **top layer**: a modal `<dialog>`, a popover, and fullscreen elements.",
              ],
            },
            {
              type: "heading",
              text: "As a side effect of a visual property",
            },
            {
              type: "list",
              items: [
                "`opacity` less than `1`.",
                "`transform`, `translate`, `rotate`, `scale` or `perspective` set to anything other than `none`.",
                "`filter` or `backdrop-filter` other than `none`.",
                "`clip-path` other than `none`, and `mask`, `mask-image` or `mask-border` other than `none`.",
                "`mix-blend-mode` other than `normal`.",
                "`will-change` naming any property that would create a context if it were set, such as `will-change: transform` or `opacity`.",
                "`contain: layout`, `paint`, `strict` or `content`.",
                "`container-type: size` or `inline-size`, which container queries use.",
              ],
            },
            {
              type: "code",
              language: "css",
              code: `.card          { opacity: 0.99; }                   /* creates a context */
    .panel         { transform: translateZ(0); }        /* creates a context */
    .thumb         { filter: drop-shadow(0 1px 2px #0003); }  /* creates a context */
    .hero          { will-change: transform; }          /* creates a context */
    .wrapper       { container-type: inline-size; }     /* creates a context */
    .sticky-bar    { position: sticky; top: 0; }        /* creates a context, no z-index needed */`,
              caption: "Properties that quietly create a context",
            },
            {
              type: "heading",
              text: "Two special cases",
            },
            {
              type: "paragraph",
              text: "`opacity: 1` and `transform: none` do **not** create a context. A subtle consequence is that animating `opacity` from `1` to `0` creates a context during the animation, and then again when it ends at `0`. And `opacity: 0.99` is almost indistinguishable from `1` on the screen, but it creates the bubble, so a tiny rounding change can alter the stacking of a page.",
            },
            {
              type: "paragraph",
              text: "`will-change` creates a context when its value names a property that would do so, **even before the property is used**. Many pages add `will-change: transform` as a performance hint, and they create a context at the same time.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.card {
      /* no context: children stack in the page's context */
      opacity: 1;
      transform: none;
    }`,
                note: "Neutral values create no context, so children can still be compared with outside elements.",
              },
              bad: {
                code: `.card {
      /* a context: children are now trapped */
      opacity: 0.99;
      transform: translateZ(0);
      will-change: transform;
    }`,
                note: "Three properties, each of which creates a context on its own. Removing just one does not free the children, because the others still create it.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "To find the culprit, select the element in DevTools, then walk up the ancestors checking each one against this list. The first ancestor that creates a context is the boundary your element cannot cross.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Several of these properties also change **containing blocks**: `transform`, `filter`, `perspective`, `contain` and `will-change: transform` make an ancestor the reference for `position: fixed` descendants. The next lessons cover this side effect.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Some contexts are created on purpose (`z-index` on a positioned element, `isolation: isolate`, `fixed`, `sticky`, the top layer).",
                "Many are created by visual properties: `opacity` below 1, `transform`, `filter`, `clip-path`, `mask`, `mix-blend-mode`, `will-change`, `contain` and `container-type`.",
                "Neutral values such as `opacity: 1` and `transform: none` create no context.",
                "To debug, walk up the ancestors and check each against the list.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "context-trap-explorer",
          kind: "visualizer",
          title: "Context trap explorer",
          summary: "A child with `z-index: 100` and a rival with `z-index: 1`. Turn properties on the parent on and off and watch the child get trapped and freed.",
          minutes: 10,
          concept: {
            description: "The indigo child has `z-index: 100` and the amber rival has `z-index: 1`, and they overlap. The child lives inside a parent. Controls change properties on the **parent**, such as `opacity`, `transform` and `isolation`, and show how each one decides whether the big number counts. A challenge asks you to trap the child with `isolation` and then free it by raising the parent.",
            why: "You can read that `opacity: 0.99` creates a stacking context, and still not believe it until the 100 loses to the 1. Seeing the child flip from the top to the bottom as you switch one property is the quickest way to understand why z-index is local.",
            mentalModel: "The child's number is a seat number inside the parent's room. As long as the parent has no room of its own, the child sits in the big hall and its 100 counts. As soon as the parent gets a room, only the room's own level is compared with the rival, and the child's 100 is invisible from outside.",
          },
          stage: {
            html: `<div class="stage">
      <div class="parent">
        <span class="label">parent</span>
        <div class="child">child<br />z-index 100</div>
      </div>
      <div class="rival">rival<br />z-index 1</div>
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #ffffff; font-family: system-ui, sans-serif; font-size: 13px; font-weight: 600; }
    .stage { position: relative; height: 230px; margin: 16px; }
    .parent { position: absolute; left: 0; top: 0; width: 210px; height: 150px; box-sizing: border-box; border: 2px dashed #94a3b8; border-radius: 12px; background: #334155; }
    .label { position: absolute; left: 10px; top: 8px; color: #cbd5e1; }
    .child { position: absolute; left: 110px; top: 60px; display: flex; align-items: center; justify-content: center; width: 150px; height: 100px; border-radius: 12px; background: #6366f1; text-align: center; }
    .rival { position: absolute; left: 170px; top: 90px; display: flex; align-items: center; justify-content: center; width: 150px; height: 110px; border-radius: 12px; background: #f59e0b; color: #1e293b; text-align: center; }`,
            annotate: "none",
            target: ".stage",
            items: ".parent",
            itemCount: 1,
          },
          starter: `.parent {
      opacity: 1;
      transform: none;
      filter: none;
      isolation: auto;
      z-index: auto;
    }
    
    .child {
      z-index: 100;
    }
    
    .rival {
      z-index: 1;
    }
    `,
          controls: [
            {
              id: "opacity",
              label: "Parent `opacity`",
              selector: ".parent",
              property: "opacity",
              fallback: "1",
              type: "options",
              options: ["1", "0.99", "0.5"],
              help: "Anything below 1 creates a stacking context, even `0.99`, which you cannot tell from `1` by eye.",
            },
            {
              id: "transform",
              label: "Parent `transform`",
              selector: ".parent",
              property: "transform",
              fallback: "none",
              type: "options",
              options: ["none", "translateX(0)", "scale(1.02)"],
              help: "`translateX(0)` moves nothing and still creates a context.",
            },
            {
              id: "filter",
              label: "Parent `filter`",
              selector: ".parent",
              property: "filter",
              fallback: "none",
              type: "options",
              options: ["none", "blur(0px)", "grayscale(0.2)"],
              help: "Any filter other than `none` creates a context.",
            },
            {
              id: "isolation",
              label: "Parent `isolation`",
              selector: ".parent",
              property: "isolation",
              fallback: "auto",
              type: "options",
              options: ["auto", "isolate"],
              help: "`isolate` creates a context and does nothing else.",
            },
            {
              id: "z",
              label: "Parent `z-index`",
              selector: ".parent",
              property: "z-index",
              fallback: "auto",
              type: "options",
              options: ["auto", "0", "1", "2"],
              help: "On a positioned parent, a number creates a context at that level. `2` puts the whole parent above the rival at `1`.",
            },
            {
              id: "child",
              label: "Child `z-index`",
              selector: ".child",
              property: "z-index",
              fallback: "100",
              type: "range",
              min: 0,
              max: 200,
              step: 10,
              help: "Inside a context, the number only orders the parent's own children, so it makes no difference to the rival.",
            },
            {
              id: "rival",
              label: "Rival `z-index`",
              selector: ".rival",
              property: "z-index",
              fallback: "1",
              type: "range",
              min: 0,
              max: 200,
              step: 1,
              help: "The rival is compared with the parent's context, not with the child.",
            },
          ],
          presets: [
            {
              id: "opacity",
              label: "Trap it with opacity",
              description: "the child drops under the rival",
              css: ".parent { opacity: 0.99; }",
            },
            {
              id: "transform",
              label: "Trap it with a transform",
              description: "a no-op transform is enough",
              css: ".parent { transform: translateX(0); }",
            },
            {
              id: "isolate",
              label: "Isolate the parent",
              description: "the clean way to make a context",
              css: ".parent { isolation: isolate; }",
            },
            {
              id: "lift",
              label: "Isolate and lift the parent",
              description: "the whole parent goes above the rival",
              css: ".parent { isolation: isolate; z-index: 2; }",
            },
          ],
          challenge: {
            title: "Isolate, then lift",
            description: "Turn `.parent` into an isolated stacking context with `isolation: isolate`, and see the rival cover the child. Then lift the **parent** above the rival with `z-index: 2` on `.parent`, so the child is visible again. Do not change the child's `100` or the rival's `1`: the fix lives on the folder, not on the number.",
            hints: [
              "Add two declarations to the `.parent` rule.",
              "`isolation: isolate` makes the context. The parent's own `z-index` then sets its level against the rival.",
              "`.parent { isolation: isolate; z-index: 2; }` and leave `.child` and `.rival` as they are.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".parent",
                property: "isolation",
                expected: ["isolate"],
                message: "The parent is an isolated stacking context",
              },
              {
                type: "computedStyle",
                selector: ".parent",
                property: "z-index",
                expected: ["2"],
                message: "...at level `2`, above the rival.",
              },
              {
                type: "computedStyle",
                selector: ".child",
                property: "z-index",
                expected: ["100"],
                message: "The child keeps `z-index: 100`",
              },
              {
                type: "computedStyle",
                selector: ".rival",
                property: "z-index",
                expected: ["1"],
                message: "...and the rival keeps `z-index: 1`.",
              },
            ],
            solution: `.parent {
      opacity: 1;
      transform: none;
      filter: none;
      isolation: isolate;
      z-index: 2;
    }
    
    .child {
      z-index: 100;
    }
    
    .rival {
      z-index: 1;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-trap",
          kind: "predict",
          title: "Predict the trap",
          summary: "A child with z-index 100 and a rival with z-index 1. Decide which one is on top, and why the parent matters.",
          minutes: 8,
          mode: "css",
          intro: "The child has a big z-index and the rival has a small one, and they overlap. The parent has one unusual property. Predict what you see, then run the code.",
          code: {
            html: `<div class="stage">
      <div class="parent">
        <div class="child">Child, z-index 100</div>
      </div>
      <div class="rival">Rival, z-index 1</div>
    </div>`,
            css: `body {
      margin: 0;
      font-family: system-ui, sans-serif;
      font-weight: 600;
    }
    
    .stage {
      position: relative;
      height: 14rem;
      margin: 1rem;
    }
    
    .parent {
      position: absolute;
      left: 0;
      top: 0;
      width: 12rem;
      height: 8rem;
      background-color: #cbd5e1;
      opacity: 0.9;
    }
    
    .child {
      position: absolute;
      left: 6rem;
      top: 3rem;
      width: 9rem;
      height: 6rem;
      background-color: #6366f1;
      color: #ffffff;
      z-index: 100;
    }
    
    .rival {
      position: absolute;
      left: 10rem;
      top: 5rem;
      width: 9rem;
      height: 7rem;
      background-color: #f59e0b;
      color: #1e293b;
      z-index: 1;
    }`,
          },
          questions: [
            {
              prompt: "Where the child and the rival overlap, which one is painted on top?",
              options: [
                "The child, because 100 is bigger than 1",
                "The rival, because the parent forms a stacking context at a lower level",
                "They blend equally",
                "Neither: they are not positioned",
              ],
              answerIndex: 1,
              hint: "Look at the property on `.parent` that is not a size or a colour.",
              explanation: "`opacity: 0.9` creates a stacking context on the parent. The child's `z-index: 100` now only orders things inside that context. The parent as a whole sits at level zero, and the rival, at `z-index: 1`, is above it.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".parent",
                  property: "opacity",
                  expected: ["0.9"],
                  message: "The parent's opacity is below 1, which creates a stacking context.",
                },
                {
                  type: "computedStyle",
                  selector: ".rival",
                  property: "z-index",
                  expected: ["1"],
                  message: "The rival's level is `1`.",
                },
              ],
            },
            {
              prompt: "What is the child's `z-index: 100` compared with?",
              options: [
                "Every element on the page",
                "Nothing: it is ignored",
                "Only the rival",
                "Only the elements inside `.parent`'s own stacking context",
              ],
              answerIndex: 3,
              hint: "Which element created the bubble that the child lives in?",
              explanation: "A z-index only orders elements inside the same stacking context. The child lives inside the parent's context, and nothing else is in there with it, so 100 is only compared with its siblings in that bubble.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".child",
                  property: "z-index",
                  expected: ["100"],
                  message: "The child has `z-index: 100`.",
                },
              ],
            },
            {
              prompt: "Which single change would put the child above the rival, without touching any z-index?",
              options: ["`.parent { opacity: 1; }`", "`.child { z-index: 1000; }`", "`.rival { z-index: 0; }`", "`.parent { overflow: visible; }`"],
              answerIndex: 0,
              hint: "Think about how to remove the bubble, rather than how to win inside it.",
              explanation: "At `opacity: 1` the parent creates no stacking context, so the child joins the page's context. There, `100` beats `1`. Raising the child's number changes nothing, and lowering the rival to `0` would put it at the child's layer only if the parent is not a context.",
            },
            {
              prompt: "If `.parent` also had `z-index: 2` (keeping the opacity), what would happen?",
              options: [
                "Nothing changes",
                "The rival would be on top",
                "The child would be on top, because the whole parent is now above the rival at level 1",
                "The page would be invalid",
              ],
              answerIndex: 2,
              hint: "The parent is positioned, so its own z-index now sets its level.",
              explanation: "The parent is a context, and its own `z-index: 2` places the **whole** context above the rival at `1`. The child, inside, travels with it.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "trapped-z-index",
          kind: "learn",
          title: "The trapped z-index, step by step",
          summary: "A worked example of the classic bug: a dropdown with a huge z-index that still hides behind the next section.",
          minutes: 10,
          concept: {
            description: "The classic stacking bug is a menu, tooltip or modal that is covered by something with a much lower `z-index`. The cause is always the same: an **ancestor** of the menu creates a stacking context, so the menu's z-index only competes with its siblings **inside** that ancestor. The ancestor itself, as a whole, is under the covering element.",
            why: "You will meet this bug many times, in many disguises, and the fix is rarely where you first look. A repeatable procedure turns it from a frustrating hour into a few minutes, and it prevents the worst response, which is raising z-index numbers until the page is full of `99999`.",
            mentalModel: "A trapped z-index is a person with a first-class ticket in the wrong building. However high the seat number, the building itself was built on a lower floor than the next one. You cannot fix it by upgrading the ticket. You have to move the building, or let the person out.",
          },
          body: [
            {
              type: "heading",
              text: "The bug",
            },
            {
              type: "paragraph",
              text: "A page has a header with a dropdown menu, and below it a section of cards. The dropdown has `z-index: 9999`, and still the cards appear in front of it where they overlap. The page looks like this:",
            },
            {
              type: "code",
              language: "css",
              code: `.header {
      position: relative;
      z-index: 1;               /* a context at level 1 */
    }
    .dropdown {
      position: absolute;
      z-index: 9999;            /* only competes inside .header */
    }
    
    .cards {
      position: relative;
      z-index: 2;               /* a context at level 2 */
    }`,
              caption: "The cards' context is above the header's, so the dropdown is covered",
            },
            {
              type: "heading",
              text: "A procedure",
            },
            {
              type: "list",
              items: [
                "**Identify the element and the thing covering it.** Here, the dropdown and the cards.",
                "**Find each one's context.** Walk up from the dropdown until an ancestor creates a context: that is `.header`. Do the same for the covering element: `.cards`.",
                "**Find the first common context.** Both are in the root context, as siblings.",
                "**Compare the two children of that context.** `.header` is at level 1 and `.cards` is at level 2. The cards win.",
                "**Decide on a fix** at that level, not at the dropdown.",
              ],
              ordered: true,
            },
            {
              type: "heading",
              text: "The fixes, best first",
            },
            {
              type: "paragraph",
              text: "**1. Raise the right folder.** Give `.header` a higher level than `.cards`. It is a one-line fix and it expresses the intent: the header, with its menus, is above the content.",
            },
            {
              type: "paragraph",
              text: "**2. Remove the cause.** If `.header` only creates a context because of a stray `opacity` or `transform`, remove it so that the dropdown joins the root context, where its z-index counts.",
            },
            {
              type: "paragraph",
              text: "**3. Lower the covering element.** If the cards do not need a z-index at all, remove it.",
            },
            {
              type: "paragraph",
              text: "**4. Move the menu in the DOM.** A menu rendered at the end of `<body>`, or in the top layer with the popover API, sits outside both contexts. This is how many component libraries solve the problem.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.header { position: relative; z-index: 3; }   /* above the cards */
    .cards  { position: relative; z-index: 2; }
    .dropdown { position: absolute; z-index: 1; }   /* a small, local number */`,
                note: "The folders are in the right order, and the dropdown only needs a small number.",
              },
              bad: {
                code: `.header { position: relative; z-index: 1; }
    .cards  { position: relative; z-index: 2; }
    .dropdown { position: absolute; z-index: 999999; }`,
                note: "The bug is still there. The giant number has no effect, and it will confuse the next person who reads the code.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "Write down the context tree for the two elements, like `root > header > dropdown` against `root > cards`. Comparing the first level where the paths split gives the answer.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Fixing the problem by giving **every** layer a huge number, or by adding `!important` to z-index, only hides it. Your bug will return the next time somebody adds an opacity or a transform.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "A covered element with a huge z-index is trapped inside an ancestor's context.",
                "Find the two contexts, find the first level where their paths split, and compare the two children there.",
                "Fix it at that level by raising the right ancestor, removing the cause of the context, or moving the menu elsewhere.",
                "Do not raise numbers blindly. The number does not matter outside its context.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-lift-the-folder",
          kind: "lab",
          title: "Lab: lift the folder, not the number",
          mode: "css",
          summary: "A menu with `z-index: 10` is hidden by the next card. Raise the card that contains it, not the menu.",
          minutes: 8,
          starter: {
            html: `<div class="card card-1">
      <button class="btn" type="button">Options</button>
      <ul class="menu">
        <li>Rename</li>
        <li>Delete</li>
      </ul>
    </div>
    <div class="card card-2">The next card</div>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .card {
      box-sizing: border-box;
      width: 16rem;
      margin-bottom: 0.5rem;
      padding: 1rem;
      border-radius: 0.75rem;
      background-color: #e0e7ff;
    }
    
    .card-1 {
      position: relative;
      transform: translateY(0);
    }
    
    .card-2 {
      position: relative;
      z-index: 1;
      background-color: #fde68a;
    }
    
    .menu {
      position: absolute;
      top: 3.2rem;
      left: 1rem;
      z-index: 10;
      margin: 0;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background-color: #1e293b;
      color: #ffffff;
      list-style: none;
    }
    `,
          },
          challenge: {
            title: "Make the menu appear over the next card",
            description: "The menu has `z-index: 10`, but where it overlaps the second card, the second card covers it. The first card has a `transform`, so it creates a stacking context, and its level is the default, which is below the second card's `z-index: 1`. Fix it **at the card**: give `.card-1` a `z-index` of `2`, which is above the second card. Do not change the menu's `10` or the second card's `1`.",
            hints: [
              "The menu's number only counts inside `.card-1`. Look for the number that places `.card-1` itself.",
              "`.card-1` is already positioned, so `z-index` applies to it, and it sits at level `2` above `.card-2` at `1`.",
              "Add `z-index: 2;` to the `.card-1` rule.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".card-1",
                property: "z-index",
                expected: ["2"],
                message: "The first card is at level `2`",
              },
              {
                type: "computedStyle",
                selector: ".card-1",
                property: "position",
                expected: ["relative"],
                message: "...and positioned.",
              },
              {
                type: "computedStyle",
                selector: ".menu",
                property: "z-index",
                expected: ["10"],
                message: "The menu keeps `z-index: 10`",
              },
              {
                type: "computedStyle",
                selector: ".card-2",
                property: "z-index",
                expected: ["1"],
                message: "...and the second card keeps `z-index: 1`.",
              },
            ],
            solution: {
              html: `<div class="card card-1">
      <button class="btn" type="button">Options</button>
      <ul class="menu">
        <li>Rename</li>
        <li>Delete</li>
      </ul>
    </div>
    <div class="card card-2">The next card</div>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .card {
      box-sizing: border-box;
      width: 16rem;
      margin-bottom: 0.5rem;
      padding: 1rem;
      border-radius: 0.75rem;
      background-color: #e0e7ff;
    }
    
    .card-1 {
      position: relative;
      z-index: 2;
      transform: translateY(0);
    }
    
    .card-2 {
      position: relative;
      z-index: 1;
      background-color: #fde68a;
    }
    
    .menu {
      position: absolute;
      top: 3.2rem;
      left: 1rem;
      z-index: 10;
      margin: 0;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background-color: #1e293b;
      color: #ffffff;
      list-style: none;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-covered-header",
          kind: "debug",
          title: "Debug: the cards slide over the header",
          mode: "css",
          summary: "The sticky header is covered by the cards when you scroll. Find out why and put the layers in the right order.",
          minutes: 7,
          broken: {
            html: `<header class="header">Trailhead</header>
    <main class="list">
      <article class="card">Riverside loop</article>
      <article class="card">Lake path</article>
      <article class="card">Ridge scramble</article>
      <article class="card">Forest circuit</article>
    </main>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .header {
      position: sticky;
      top: 0;
      z-index: 1;
      padding: 1rem;
      background-color: #312e81;
      color: #ffffff;
      font-weight: 700;
    }
    
    .card {
      position: relative;
      z-index: 5;
      margin: 1rem 0;
      padding: 2rem 1rem;
      border-radius: 0.5rem;
      background-color: #e0e7ff;
    }
    `,
          },
          challenge: {
            title: "Keep the header above the cards",
            description: "Scroll the preview: the cards slide **over** the sticky header instead of under it. Both are positioned, both are in the page's context, and the cards have a higher `z-index` than the header. Fix the order: the header should be at `100` and the cards at `1`, with the same positions as now.",
            hints: [
              "Compare the two z-index numbers, and who should be higher in a normal page.",
              "Both elements are in the same stacking context, so the bigger number is on top.",
              "`.header { z-index: 100; }` and `.card { z-index: 1; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".header",
                property: "z-index",
                expected: ["100"],
                message: "The header is at `z-index: 100`",
              },
              {
                type: "computedStyle",
                selector: ".card",
                property: "z-index",
                expected: ["1"],
                message: "...and the cards at `z-index: 1`.",
              },
            ],
            solution: {
              html: `<header class="header">Trailhead</header>
    <main class="list">
      <article class="card">Riverside loop</article>
      <article class="card">Lake path</article>
      <article class="card">Ridge scramble</article>
      <article class="card">Forest circuit</article>
    </main>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 1rem;
      background-color: #312e81;
      color: #ffffff;
      font-weight: 700;
    }
    
    .card {
      position: relative;
      z-index: 1;
      margin: 1rem 0;
      padding: 2rem 1rem;
      border-radius: 0.5rem;
      background-color: #e0e7ff;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "isolation-and-intentional-contexts",
          kind: "learn",
          title: "Creating contexts on purpose: `isolation: isolate`",
          summary: "How to make a safe bubble around a component, and why it is the best way to stop z-index from leaking.",
          minutes: 9,
          concept: {
            description: "`isolation: isolate` creates a new stacking context on an element, and does nothing else: no visual change, no side effects on layout. It exists for one purpose, which is to say \"treat everything inside this element as a self-contained group\". It is the cleanest way to give a component its own z-index scope.",
            why: "Instead of fighting accidental contexts, you can use the same mechanism to **protect** your layout. A component with its own bubble can use `z-index: 1`, `2` or `-1` internally without ever touching the rest of the page, and the rest of the page cannot reach in and disturb it.",
            mentalModel: "`isolation: isolate` is a plain folder with no label. It does not change the paper inside, or how it looks. It only guarantees that whatever is inside stays together and cannot mix with the other papers on the desk.",
          },
          body: [
            {
              type: "heading",
              text: "A bubble with no side effects",
            },
            {
              type: "paragraph",
              text: "Several properties create a context as a side effect, and each of them brings something else along: `opacity` makes a group translucent, `transform` can shift the element and change containing blocks, and `z-index: 0` needs a positioned element. `isolation: isolate` has none of these effects. It works on any element, positioned or not, and changes nothing visually.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      isolation: isolate;       /* a new stacking context, and nothing else */
    }
    
    .card .badge {
      position: absolute;
      z-index: 2;               /* local to .card */
    }
    .card .shine {
      position: absolute;
      z-index: -1;              /* above the card background, below its text */
    }`,
              caption: "A component with its own z-index scope",
            },
            {
              type: "heading",
              text: "Why scoping helps",
            },
            {
              type: "paragraph",
              text: "Without a boundary, every z-index in your project lives in the same root context and competes with every other. A component's `z-index: 5` for a badge might accidentally beat the site header's `z-index: 4`. With `isolation: isolate` on the component, its inner values are small, local and private. What counts against the header is only the component's own level, which for an isolated component without a z-index is `auto`, level zero.",
            },
            {
              type: "heading",
              text: "Making a safe parent for negative z-index",
            },
            {
              type: "paragraph",
              text: "Earlier you saw that a negative z-index child can sink behind its parent's background if the parent creates no context. Isolating the parent solves it in one line, and the parent does not need to be positioned, and does not need a magic `z-index: 0`.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.media {
      position: relative;
      isolation: isolate;
    }
    .media::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
    }`,
                note: "The isolated parent catches the negative child, which then paints above the parent's background.",
              },
              bad: {
                code: `.media {
      position: relative;
      z-index: 0;               /* works, but the intent is unclear */
    }`,
                note: "`z-index: 0` creates the context, but it looks like a meaningless number, and it only works on positioned elements or flex and grid items.",
              },
            },
            {
              type: "heading",
              text: "Where to apply it",
            },
            {
              type: "list",
              items: [
                "**Components with internal layers:** cards, banners, hero images with overlays.",
                "**Page sections** with their own decorative shapes, so the shapes never reach the header.",
                "**The main content wrapper**, so every z-index inside the page stays below fixed UI such as the header and modals.",
                "**Widgets from other teams** or libraries whose z-indexes you cannot control.",
              ],
            },
            {
              type: "callout",
              tone: "tip",
              text: "A strong pattern is: `isolation: isolate` on the page content wrapper, and a small scale of numbers for the fixed UI outside it. The content can then never overlap the header, whatever z-index it uses.",
            },
            {
              type: "callout",
              tone: "note",
              text: "Browser support for `isolation` is excellent in all current browsers. It is also useful for `mix-blend-mode`, where it limits what the blending element can blend with.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`isolation: isolate` creates a stacking context with no other effect.",
                "It gives a component a private z-index scope, so internal numbers stay small and cannot clash with the rest of the page.",
                "It makes a clear parent for negative z-index children, without needing `z-index: 0`.",
                "Apply it to components and page sections, and keep the global scale for fixed UI.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-layers",
          kind: "predict",
          title: "Predict the layers",
          summary: "Four boxes with auto, negative, zero and positive z-index overlap some normal text. Work out the paint order.",
          minutes: 8,
          mode: "css",
          intro: "All four boxes are positioned, and they overlap each other and a line of normal text inside an isolated scene. Predict the order, from the bottom to the top, then run the code.",
          code: {
            html: `<div class="scene">
      <p class="text">Normal text</p>
      <div class="box a">A</div>
      <div class="box b">B</div>
      <div class="box c">C</div>
      <div class="box d">D</div>
    </div>`,
            css: `body {
      margin: 0;
      font-family: system-ui, sans-serif;
      font-weight: 700;
    }
    
    .scene {
      position: relative;
      isolation: isolate;
      height: 13rem;
      margin: 1rem;
      background-color: #e0e7ff;
    }
    
    .text {
      margin: 0;
      padding: 3rem 0 0 1rem;
      font-size: 1.75rem;
    }
    
    .box {
      position: absolute;
      width: 5rem;
      height: 5rem;
      opacity: 0.9;
    }
    
    .a {
      left: 1rem;
      top: 2rem;
      background-color: #6366f1;
    }
    
    .b {
      left: 3rem;
      top: 3rem;
      background-color: #0ea5e9;
      z-index: -1;
    }
    
    .c {
      left: 5rem;
      top: 4rem;
      background-color: #10b981;
      z-index: 0;
    }
    
    .d {
      left: 7rem;
      top: 5rem;
      background-color: #f59e0b;
      z-index: 1;
    }`,
          },
          questions: [
            {
              prompt: "Box B has `z-index: -1`. How does it sit relative to the scene's background and the normal text?",
              options: [
                "Behind the scene's background, so it is invisible",
                "At the same level as box A",
                "In front of the text",
                "Above the background, but behind the normal text",
              ],
              answerIndex: 3,
              hint: "The scene is isolated, so it creates its own context.",
              explanation: "In a context, the order is: the context's own background, then negative z-index children, then normal content such as text. B is above the pale background and under the text.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".b",
                  property: "z-index",
                  expected: ["-1"],
                  message: "Box B has a negative z-index.",
                },
                {
                  type: "computedStyle",
                  selector: ".scene",
                  property: "isolation",
                  expected: ["isolate"],
                  message: "The scene is an isolated stacking context, so B stays above its background.",
                },
              ],
            },
            {
              prompt: "Box A has no z-index (`auto`) and box C has `z-index: 0`. Where they overlap, which is on top?",
              options: [
                "C, because it comes later in the HTML and both are at the same level",
                "A, because `auto` is higher than `0`",
                "A, because it is first",
                "Neither: they cannot overlap",
              ],
              answerIndex: 0,
              hint: "How are two elements at the same layer ordered?",
              explanation: "Positioned elements with `z-index: auto` and `z-index: 0` are painted in the same layer, level zero, in HTML order. C comes after A, so C is on top.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".c",
                  property: "z-index",
                  expected: ["0"],
                  message: "Box C is at level zero.",
                },
              ],
            },
            {
              prompt: "Which box is on top of all the others?",
              options: ["Box A", "Box B", "Box D", "Box C"],
              answerIndex: 2,
              hint: "Positive values are painted last.",
              explanation: "Box D has `z-index: 1`, the only positive value, so it goes in the last layer, above A, C and the text.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".d",
                  property: "z-index",
                  expected: ["1"],
                  message: "Box D is the only positive layer.",
                },
              ],
            },
            {
              prompt: "What would happen to box B if `.scene` had no `isolation: isolate` and no other stacking context?",
              options: [
                "Nothing: it would look the same",
                "It would go behind the scene's background and probably disappear",
                "It would move above box D",
                "It would be hidden by `overflow`",
              ],
              answerIndex: 1,
              hint: "Which context would B belong to without the scene's own?",
              explanation: "Without a context on the scene, B's negative z-index would place it in the **page's** context, below the scene's pale background. It would be hidden behind it.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "context-side-effects",
          kind: "learn",
          title: "Side effects: containing blocks and clipping",
          summary: "Why `transform`, `filter` and friends also break `position: fixed`, and how stacking differs from clipping.",
          minutes: 10,
          concept: {
            description: "Some of the properties that create a stacking context also make the element the **containing block** for its fixed and absolute descendants. A `position: fixed` child of a transformed parent no longer sticks to the viewport: it is positioned relative to the parent. This is a different effect from stacking, but it has the same causes, so the two bugs often arrive together.",
            why: "\"My modal is not covering the whole page\" and \"my modal is under the header\" often have one root cause, a stray `transform` or `filter` on an ancestor. Knowing that the property did two things at once lets you find both problems with one search.",
            mentalModel: "A property like `transform` is a folder that also sticks a small pin board on the wall. The folder keeps the papers together (stacking), and the pin board changes what \"the wall\" means for anything pinned inside (containing block). Fixed items now pin to the board, not to the room.",
          },
          body: [
            {
              type: "heading",
              text: "Fixed positioning and containing blocks",
            },
            {
              type: "paragraph",
              text: "Normally, `position: fixed` positions an element relative to the **viewport**. But if any ancestor has `transform`, `translate`, `rotate`, `scale`, `perspective`, `filter`, `backdrop-filter`, `contain: layout` or `paint`, or `will-change` naming one of these, that ancestor becomes the containing block for the fixed element instead. The element then behaves like `position: absolute` inside the ancestor, scrolls with it, and may be clipped by it.",
            },
            {
              type: "code",
              language: "css",
              code: `.page {
      transform: translateZ(0);       /* a "GPU hack" */
    }
    .toast {
      position: fixed;
      right: 1rem;
      bottom: 1rem;                   /* now relative to .page, not the viewport */
    }`,
              caption: "A leftover transform on an ancestor makes the fixed toast follow the page",
            },
            {
              type: "paragraph",
              text: "The visible symptoms are a fixed header that scrolls away, an overlay that stops at the edge of a section, and a toast in the wrong corner. The fix is to remove the property from the ancestor, or to move the fixed element outside of it in the DOM.",
            },
            {
              type: "heading",
              text: "Stacking is not clipping",
            },
            {
              type: "paragraph",
              text: "A stacking context decides which element is painted on top. **Clipping** decides what is visible at all. `overflow: hidden`, `overflow: auto` and `clip-path` can cut off descendants, including absolutely positioned ones, if the clipping element is their containing block or an ancestor of it. People often blame `z-index` for a dropdown that is simply cut off by `overflow: hidden`, and a bigger z-index will never fix it.",
            },
            {
              type: "list",
              items: [
                "**Stacking problem:** the menu is visible, but it is behind something. Look for contexts.",
                "**Clipping problem:** the menu is cut off at a straight edge. Look for `overflow` or `clip-path` on an ancestor.",
                "**Containing block problem:** the menu or overlay is positioned in the wrong place. Look for `transform`, `filter` or `contain` on an ancestor.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.card {
      position: relative;
      overflow: visible;           /* the dropdown may extend outside */
    }
    .dropdown {
      position: absolute;
      top: 100%;
    }`,
                note: "The card does not clip, and the dropdown can extend past its edge.",
              },
              bad: {
                code: `.card {
      position: relative;
      overflow: hidden;            /* clips the dropdown at the card's edge */
    }
    .dropdown {
      position: absolute;
      top: 100%;
      z-index: 9999;               /* cannot help: the problem is clipping */
    }`,
                note: "The dropdown is cut off by `overflow: hidden`. The z-index has nothing to do with it.",
              },
            },
            {
              type: "callout",
              tone: "warning",
              text: "`overflow` other than `visible` on a positioned ancestor also clips absolutely positioned descendants **if the ancestor is their containing block**. A fixed descendant is clipped only when an ancestor with a transform (or similar) is its containing block.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "When a menu is cut off, toggle `overflow` off on each ancestor in DevTools. When it is behind something, look at the stacking contexts. When it is in the wrong place, look for a transform. Three symptoms, three different causes.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`transform`, `filter`, `perspective`, `contain` and `will-change: transform` create a context **and** become the containing block for fixed and absolute descendants.",
                "A fixed element inside a transformed ancestor behaves like an absolute one and may be positioned or clipped by that ancestor.",
                "Clipping (`overflow`, `clip-path`) is a separate cause from stacking. A bigger z-index never fixes a clipped element.",
                "Match the symptom to the cause: behind, cut off, or in the wrong place.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-moving-toast",
          kind: "debug",
          title: "Debug: the fixed toast that scrolls away",
          mode: "css",
          summary: "A `position: fixed` toast moves with the page. Two properties on an ancestor quietly make it the containing block.",
          minutes: 8,
          broken: {
            html: `<div class="page">
      <h1>Trail notes</h1>
      <p>Scroll the preview. The toast should stay in the bottom right corner of the window.</p>
      <p style="height: 60rem">A long page.</p>
      <div class="toast">Route saved</div>
    </div>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .page {
      transform: translateY(0);
      will-change: transform;
    }
    
    .toast {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 500;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      background-color: #0f172a;
      color: #ffffff;
    }
    `,
          },
          challenge: {
            title: "Pin the toast to the window again",
            description: "The toast is `position: fixed`, but it scrolls with the page instead of staying in the corner of the window. Nothing is wrong with the toast's own rule. An ancestor has two properties that make it the containing block for fixed descendants, and the removal of just one of them will not be enough. Set both to their neutral values: `transform: none` and `will-change: auto`.",
            hints: [
              "Look at the `.page` rule, not the `.toast` rule.",
              "`transform` and `will-change: transform` each turn `.page` into the reference box for fixed children.",
              "`.page { transform: none; will-change: auto; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".page",
                property: "transform",
                expected: ["none"],
                message: "`.page` has `transform: none`",
              },
              {
                type: "computedStyle",
                selector: ".page",
                property: "will-change",
                expected: ["auto"],
                message: "...and `will-change: auto`.",
              },
              {
                type: "computedStyle",
                selector: ".toast",
                property: "position",
                expected: ["fixed"],
                message: "The toast is still `position: fixed`.",
              },
            ],
            solution: {
              html: `<div class="page">
      <h1>Trail notes</h1>
      <p>Scroll the preview. The toast should stay in the bottom right corner of the window.</p>
      <p style="height: 60rem">A long page.</p>
      <div class="toast">Route saved</div>
    </div>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .page {
      transform: none;
      will-change: auto;
    }
    
    .toast {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 500;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      background-color: #0f172a;
      color: #ffffff;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "top-layer-dialog-popover",
          kind: "learn",
          title: "The top layer: dialogs and popovers",
          summary: "How modal dialogs and popovers escape every stacking context, and why they remove the need for a z-index scale.",
          minutes: 10,
          concept: {
            description: "The **top layer** is a special layer above the entire page that browsers use for certain elements: a modal `<dialog>` opened with `showModal()`, an element with the `popover` attribute when shown, and elements displayed in fullscreen. Elements in the top layer are painted above everything else, regardless of z-index or stacking contexts.",
            why: "A modal that must be above everything used to need the highest z-index on the page, a position at the end of `<body>` and careful attention to every ancestor's opacity or transform. The top layer makes the problem go away. It is the modern answer to the oldest stacking context bug.",
            mentalModel: "The top layer is a glass shelf above the desk. Anything you put on it is above every folder on the desk, however high they are piled. The shelf needs no numbers: whatever was put on it last is on top.",
          },
          body: [
            {
              type: "heading",
              text: "Modal dialogs",
            },
            {
              type: "paragraph",
              text: "Calling `dialog.showModal()` puts the `<dialog>` element in the top layer, adds a `::backdrop` pseudo-element behind it, makes the rest of the page inert (it cannot be focused or clicked), and handles the Escape key. You do not set a `z-index`, and an ancestor with `transform` or `overflow: hidden` cannot trap the dialog. It is above everything, wherever it is in the HTML.",
            },
            {
              type: "code",
              language: "css",
              code: `<dialog id="confirm">
      <p>Delete this route?</p>
      <button>Cancel</button>
    </dialog>
    
    <script>
      document.querySelector("#confirm").showModal();
    </script>
    
    /* styling the dim layer */
    dialog::backdrop {
      background: rgb(15 23 42 / 0.6);
    }`,
              caption: "A modal dialog and its backdrop, with no z-index at all",
            },
            {
              type: "heading",
              text: "Popovers",
            },
            {
              type: "paragraph",
              text: "An element with the `popover` attribute is hidden by default, and a button with `popovertarget` toggles it. A shown popover enters the top layer, so a tooltip, a menu or a date picker can be rendered next to its button and still appear above everything, without any z-index management. Popovers can close automatically when the user clicks outside or presses Escape.",
            },
            {
              type: "code",
              language: "css",
              code: `<button popovertarget="menu">Options</button>
    <div id="menu" popover>
      <a href="#">Rename</a>
      <a href="#">Delete</a>
    </div>`,
              caption: "A popover menu that is above the page without a z-index",
            },
            {
              type: "heading",
              text: "Rules inside the top layer",
            },
            {
              type: "list",
              items: [
                "**Several top layer elements** are stacked in the order in which they were added: the most recent is on top.",
                "**Their own children** form a normal stacking context inside, so `z-index` still works within a dialog or popover.",
                "**It escapes ancestors:** `overflow: hidden`, `transform` and `opacity` on an ancestor do not trap or clip it.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `<dialog id="modal">…</dialog>
    /* showModal(): above everything, no z-index needed */`,
                note: "The top layer needs no numbers and cannot be trapped.",
              },
              bad: {
                code: `.modal-backdrop { position: fixed; inset: 0; z-index: 999999; }
    .modal           { position: fixed; z-index: 1000000; }`,
                note: "A hand-built modal in a `div` depends on a huge z-index, and an ancestor with `transform` can still break it.",
              },
            },
            {
              type: "callout",
              tone: "note",
              text: "`<dialog>` and `showModal()` have been supported by all major browsers for years. The `popover` attribute is newer, and arrived in all major browsers in 2023 and 2024, so check the current support for your audience, and keep a fallback for older ones.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Elements in the top layer are not magic for **accessibility**. Keep focus management in mind: `showModal()` handles focus, but a popover may need a heading, a label and a close button of its own.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "The top layer sits above the whole page. A modal `<dialog>`, a shown popover and fullscreen elements live in it.",
                "Top layer elements ignore z-index and cannot be trapped by ancestor contexts or clipped by `overflow`.",
                "Later top layer elements are above earlier ones, and their children can use z-index normally inside.",
                "Prefer `<dialog>` and `popover` over hand-built overlays with huge z-index values.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "managing-z-index-at-scale",
          kind: "learn",
          title: "Managing z-index in a real project",
          summary: "A small named scale, one place to keep it, and the habits that keep numbers from escalating.",
          minutes: 9,
          concept: {
            description: "In a real project, the best way to manage z-index is to define a **short scale of named layers** in one place, use them everywhere, and keep each component's internal numbers local and tiny. This replaces the guessing game of picking the next higher number with a clear, shared vocabulary.",
            why: "z-index values are the one global resource in CSS that every part of a stylesheet shares, and they tend to escalate. A scale gives you a map: when you add a toast, you know it goes above the modal, and where to look when two things overlap. It is a small habit that saves a lot of time.",
            mentalModel: "A building has named floors: basement, ground, mezzanine, roof. Nobody says \"I am on floor 4,382\". A z-index scale is the same: a few named levels with enough room between them, instead of a pile of arbitrary numbers.",
          },
          body: [
            {
              type: "heading",
              text: "A named scale",
            },
            {
              type: "paragraph",
              text: "List the layers your interface really has, from the bottom to the top, and give each a name and a number. Space the numbers out, so that you can slip a new layer between two existing ones. Store them as custom properties in one place, so that the whole project uses the same values.",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --z-base: 0;
      --z-raised: 10;       /* cards that lift above their neighbours */
      --z-dropdown: 100;
      --z-sticky: 200;      /* sticky headers and toolbars */
      --z-overlay: 300;     /* backdrops */
      --z-modal: 400;
      --z-toast: 500;       /* always visible, above modals */
    }
    
    .site-header { position: sticky; top: 0; z-index: var(--z-sticky); }
    .modal       { position: fixed;      z-index: var(--z-modal); }`,
              caption: "One place defines the scale, and components only name the layer they belong to",
            },
            {
              type: "heading",
              text: "Rules that keep it healthy",
            },
            {
              type: "list",
              items: [
                "**Name the layer, not the number.** A comment such as \"above the header\" is better than a number that must be compared with others.",
                "**Keep component numbers local.** Inside an isolated component, use 1, 2 and 3 freely. Only the component's own level takes part in the global scale.",
                "**Use few layers.** If you have fifteen, some are probably unnecessary, or caused by contexts that should have been isolated.",
                "**Give the top layer to the top layer.** Modals and popovers made with `<dialog>` and `popover` do not need entries in the scale at all.",
                "**Never use `!important` on z-index,** and avoid numbers like `99999`, which make every later layer harder to place.",
              ],
            },
            {
              type: "heading",
              text: "A global scale, and local scopes",
            },
            {
              type: "paragraph",
              text: "The two ideas work together. The **global scale** covers the few elements that really live in the root context: sticky UI, overlays and notifications. Everything else sits inside an isolated component or a page-content wrapper with `isolation: isolate`, whose inner numbers do not matter outside. In that arrangement, a card with `z-index: 3` can never overlap the header.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.page   { isolation: isolate; }          /* all page z-indexes stay below the header */
    .header { position: sticky; z-index: var(--z-sticky); }`,
                note: "Page content is one bubble. Whatever z-index it uses inside, it stays at level auto, below the sticky header.",
              },
              bad: {
                code: `.card   { position: relative; z-index: 250; }
    .header { position: sticky; z-index: 200; }`,
                note: "A card with a number chosen to be \"high enough\" accidentally covers the header, and someone will raise the header to 300 to fix it.",
              },
            },
            {
              type: "callout",
              tone: "note",
              text: "Custom properties are covered in a later topic of this course. For now, read `var(--z-modal)` as \"the value named --z-modal\".",
            },
            {
              type: "callout",
              tone: "tip",
              text: "Audit an existing project by searching for `z-index`. A list sorted by value is a good way to find escalations: look for values over 1000, and ask whether an `isolation: isolate` boundary would remove the need for them.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Define a short, named scale of layers in one place, with space between the numbers.",
                "Keep component internals local with `isolation: isolate`, so only the component's own level joins the global scale.",
                "Avoid huge numbers and `!important`. Prefer the top layer for dialogs and popovers.",
                "Audit with a search for `z-index`, and remove numbers that only exist to win a fight.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-layer-the-page",
          kind: "lab",
          title: "Lab: layer a whole page",
          mode: "css",
          summary: "Give a header, an overlay and a modal their layers, and isolate the page content so its badges can never reach the header.",
          minutes: 10,
          starter: {
            html: `<header class="header">Trailhead</header>
    <main class="content">
      <article class="card">A card with a badge <span class="badge">New</span></article>
    </main>
    <div class="overlay"></div>
    <div class="modal">Save this route?</div>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .header {
      padding: 1rem;
      background-color: #312e81;
      color: #ffffff;
      font-weight: 700;
    }
    
    .content {
      padding-top: 1rem;
    }
    
    .card {
      position: relative;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: #e0e7ff;
    }
    
    .badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 5;
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
      background-color: #f59e0b;
    }
    
    .overlay {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgb(15 23 42 / 0.6);
    }
    
    .modal {
      top: 30%;
      left: 20%;
      padding: 2rem;
      border-radius: 0.75rem;
      background-color: #ffffff;
    }
    `,
          },
          challenge: {
            title: "Build a small z-index scale",
            description: "Four things need layers. Make `.header` sticky to the top (`position: sticky`) at `z-index: 100`. Make `.overlay` and `.modal` fixed (`position: fixed`) at `z-index: 200` and `z-index: 300`. Finally, isolate the page content by giving `.content` `isolation: isolate`, so that the badge's `z-index: 5` stays inside it and can never beat the header.",
            hints: [
              "Add `position` and `z-index` declarations to each of the three rules, and `isolation` to `.content`.",
              "The header also needs `top: 0` to stick. The overlay and the modal are already placed with offsets, and only lack `position: fixed`.",
              "`.header { position: sticky; top: 0; z-index: 100; }` `.overlay { position: fixed; z-index: 200; }` `.modal { position: fixed; z-index: 300; }` `.content { isolation: isolate; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".header",
                property: "position",
                expected: ["sticky"],
                message: "The header is sticky",
              },
              {
                type: "computedStyle",
                selector: ".header",
                property: "z-index",
                expected: ["100"],
                message: "...at level `100`.",
              },
              {
                type: "computedStyle",
                selector: ".overlay",
                property: "position",
                expected: ["fixed"],
                message: "The overlay is fixed",
              },
              {
                type: "computedStyle",
                selector: ".overlay",
                property: "z-index",
                expected: ["200"],
                message: "...at level `200`.",
              },
              {
                type: "computedStyle",
                selector: ".modal",
                property: "position",
                expected: ["fixed"],
                message: "The modal is fixed",
              },
              {
                type: "computedStyle",
                selector: ".modal",
                property: "z-index",
                expected: ["300"],
                message: "...at level `300`.",
              },
              {
                type: "computedStyle",
                selector: ".content",
                property: "isolation",
                expected: ["isolate"],
                message: "The page content is an isolated stacking context.",
              },
            ],
            solution: {
              html: `<header class="header">Trailhead</header>
    <main class="content">
      <article class="card">A card with a badge <span class="badge">New</span></article>
    </main>
    <div class="overlay"></div>
    <div class="modal">Save this route?</div>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 1rem;
      background-color: #312e81;
      color: #ffffff;
      font-weight: 700;
    }
    
    .content {
      padding-top: 1rem;
      isolation: isolate;
    }
    
    .card {
      position: relative;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: #e0e7ff;
    }
    
    .badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 5;
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
      background-color: #f59e0b;
    }
    
    .overlay {
      position: fixed;
      z-index: 200;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgb(15 23 42 / 0.6);
    }
    
    .modal {
      position: fixed;
      z-index: 300;
      top: 30%;
      left: 20%;
      padding: 2rem;
      border-radius: 0.75rem;
      background-color: #ffffff;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "stacking-and-animation",
          kind: "learn",
          title: "Stacking surprises with transitions and animations",
          summary: "Why elements flicker in front of or behind each other while animating, and how to keep the order stable.",
          minutes: 9,
          concept: {
            description: "An element that is animating or transitioning `opacity` or `transform` behaves as if it creates a stacking context, **for as long as the animation runs**. Its position in the layer order can change at the start and at the end of the animation, and that sudden change can look like a flash, a flicker, or an element that jumps in front of its neighbours.",
            why: "Hover effects that scale or lift an item are everywhere. If the item suddenly goes behind its neighbour, or only moves in front at the end of the transition, the cause is not the animation itself but the layer order it triggers. Knowing how it works lets you fix the glitch rather than tolerate it.",
            mentalModel: "While a transition runs, the browser quietly wraps the element in a folder. When the transition starts, the element moves into the folder, which changes its place among its neighbours. When it ends, the folder is removed, and the element jumps back to its normal place. The jump is the flicker.",
          },
          body: [
            {
              type: "heading",
              text: "Layer order changes while animating",
            },
            {
              type: "paragraph",
              text: "Suppose two cards sit side by side, with no z-index, and the second overlaps the first slightly. When you hover the first card and it scales up with a transition, the card is in the middle of a transform transition, so it behaves as a stacking context for that time. Browsers paint animating elements in layer 6 or above, which usually brings the card in front. But when the transition ends and the transform returns to `none`, the stacking context goes away, and the card drops back to its old layer, behind the second card.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      position: relative;
      transition-property: transform;
      transition-duration: 0.25s;
    }
    .card:hover {
      transform: scale(1.08);
      z-index: 1;               /* keeps it in front before, during and after */
    }`,
              caption: "Setting a z-index on the hovered state keeps the order stable",
            },
            {
              type: "heading",
              text: "Make the order explicit",
            },
            {
              type: "paragraph",
              text: "The fix is to stop relying on the accidental layer order, and to state it. Give the element that should be on top a `z-index` in its hover or active state, and make it positioned (or a flex or grid item) so the property applies. The element is then at a clear level before the animation, during it, and after it.",
            },
            {
              type: "heading",
              text: "Other things that start contexts while animating",
            },
            {
              type: "list",
              items: [
                "**`will-change`** on a property that creates a context does it all the time, not only during the animation. This avoids a jump at the start, but it changes layer order permanently.",
                "**A running animation** on `opacity`, `transform` or `filter` does it for its duration. With `animation-fill-mode: forwards` or `both`, it continues after the animation has finished.",
                "**An element at `opacity: 0.99`** creates one permanently, which is why a small opacity change can alter the layering of a whole component.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.card:hover {
      transform: translateY(-4px);
      z-index: 2;
    }`,
                note: "An explicit z-index on the active state. The order does not change at the end of the transition.",
              },
              bad: {
                code: `.card:hover {
      transform: translateY(-4px);
    }
    /* relies on the transform's accidental stacking context,
       and flickers behind the next card when the transition ends */`,
                note: "The element is only in front while it is transformed, so it drops behind its neighbour the moment the transform returns to `none` at the end of the way back.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "To find out whether a glitch comes from layer order, disable the animation in DevTools and compare. If the overlap is correct without the animation, the animation's temporary context is the cause.",
            },
            {
              type: "callout",
              tone: "note",
              text: "The reduced motion rules from the Transitions topic also change this: when you remove the transform, you also remove the temporary context. Make sure the layout still works with and without motion.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Animating `opacity` or `transform` makes an element behave as a stacking context while it runs, which can change its layer order.",
                "The flicker at the start or end of a transition is the context appearing and disappearing.",
                "Fix it with an explicit z-index on the state that should be in front, on a positioned element.",
                "`will-change` and `animation-fill-mode` extend the context beyond the animation.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debugging-stacking",
          kind: "learn",
          title: "A method for debugging stacking problems",
          summary: "A calm, repeatable routine: name the two elements, find their contexts, compare the first split, and test the fix.",
          minutes: 10,
          concept: {
            description: "Stacking bugs look random, but they follow strict rules, which means a method works every time. The method is to name the two elements, find the stacking context each one lives in, find where their paths first split, compare the two contexts at that point, and fix the cause rather than the number.",
            why: "Without a method, people raise numbers, add `!important`, move elements around and hope. With one, you can solve a stacking bug in five minutes, explain it to a colleague and make sure that it stays solved. It is the practical summary of everything in this topic.",
            mentalModel: "Debugging stacking is tracing two paths on a family tree until they meet. At the point where the two paths split, you compare the two branches, not the two people at the ends. Everything below the split is irrelevant to the comparison.",
          },
          body: [
            {
              type: "heading",
              text: "The routine",
            },
            {
              type: "list",
              items: [
                "**Name the two elements.** The one that is wrongly covered (A), and the one that covers it (B).",
                "**Find A's context.** Walk up from A and find the first ancestor that creates a stacking context, using the list from this topic. Repeat until you reach the root, writing the chain down.",
                "**Do the same for B.**",
                "**Find the first shared context.** Follow both chains from the root downward. The last context that both share is the one where the comparison happens.",
                "**Compare the two children of that context** on the paths towards A and B: these two are the ones that fight. Their order is decided by their layer and z-index, or by HTML order if they tie.",
                "**Fix at that level.** Raise the right child, remove a context that should not exist, or move one of the elements.",
              ],
              ordered: true,
            },
            {
              type: "code",
              language: "css",
              code: `A  (dropdown):  root > .header (z:1) > .dropdown (z:9999)
    B  (card):      root > .cards  (z:2)  > .card
    
    shared context: root
    children to compare: .header (1)  vs  .cards (2)   → .cards wins
    
    fix: raise .header above .cards`,
              caption: "Writing the two chains makes the answer visible",
            },
            {
              type: "heading",
              text: "Tools that help",
            },
            {
              type: "list",
              items: [
                "**DevTools, Computed panel:** check `position`, `z-index`, `opacity`, `transform`, `filter`, `isolation` and `will-change` on each ancestor.",
                "**A temporary outline** such as `* { outline: 1px solid red }` shows the boxes involved, and `outline` creates no context.",
                "**Toggling properties** off one at a time in DevTools tells you which one creates the context that traps the element.",
                "**A 3D or layers view,** where your browser offers one, shows contexts as slices. Browser extensions can also list the stacking contexts of a page.",
                "**Bisecting the DOM:** move the element to be a child of `<body>` in DevTools. If it appears on top, an ancestor's context was the cause.",
              ],
            },
            {
              type: "heading",
              text: "What not to do",
            },
            {
              type: "paragraph",
              text: "Avoid blind escalation: `z-index: 99999`, `!important`, or adding positions everywhere. They can hide the bug for a day, but each one makes the next bug harder to find. If a fix needs a number larger than your scale, you have not found the real cause yet.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `/* found the cause, fixed it at the right level */
    .header  { position: sticky; top: 0; z-index: 200; }
    .content { isolation: isolate; }`,
                note: "The content is a bubble at level auto, so the sticky header with a small number is always above it.",
              },
              bad: {
                code: `/* patched */
    .header  { z-index: 99999 !important; }
    .cards   { z-index: 99998; }`,
                note: "The numbers fight each other, and the next stacking context will break the arrangement again.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "In a team, a one-line comment above an intentional context, such as `/* isolates z-index for this component */`, saves hours later. Accidental contexts are mysterious, and intentional ones are documented.",
            },
            {
              type: "callout",
              tone: "note",
              text: "Tools and panel names vary between browsers and change over time. The routine in this lesson does not depend on any of them, and works with the plain Computed panel alone.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Name the two elements, find the chain of contexts for each, and find the last shared context.",
                "Compare the two children of that shared context. Those two decide the order.",
                "Fix at that level, by raising the right ancestor, removing an unintended context or moving an element.",
                "Do not escalate numbers. A fix that needs a bigger number than your scale has not found the cause.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    layerADashboard,

    /* ------------------------------------------------------------------ */
    {
          id: "stacking-quiz",
          kind: "quiz",
          title: "Quiz: stacking context",
          summary: "Seventeen questions on contexts, painting order, z-index rules, side effects, the top layer and debugging.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "What is a stacking context?",
              options: [
                "A set of elements with the same z-index",
                "A group of elements layered together and then placed as one unit among its neighbours",
                "A kind of positioning",
                "A cascade layer",
              ],
              answerIndex: 1,
              explanation: "A stacking context is a bubble. Everything in it is painted together, and the finished bubble takes a single place in its parent context.",
            },
            {
              prompt: "A child has `z-index: 9999` and still appears under an element with `z-index: 2` outside its parent. What is the likely cause?",
              options: [
                "`z-index` is capped at 1000",
                "The browser ignores large numbers",
                "The child is not visible",
                "An ancestor of the child creates a stacking context at a lower level",
              ],
              answerIndex: 3,
              explanation: "The child's number only orders it inside its ancestor's context. The whole context sits at the ancestor's own level.",
            },
            {
              prompt: "Which of these creates a stacking context?",
              options: ["`opacity: 0.99`", "`transform: none`", "`opacity: 1`", "`position: static`"],
              answerIndex: 0,
              explanation: "Any `opacity` below 1 creates one. The neutral values `opacity: 1`, `transform: none` and `position: static` do not.",
            },
            {
              prompt: "Which element always creates a stacking context, even with `z-index: auto`?",
              options: ["`position: relative`", "`position: absolute`", "`position: sticky`", "`display: block`"],
              answerIndex: 2,
              explanation: "`position: fixed` and `position: sticky` always create a context. `relative` and `absolute` only do when they have a `z-index` other than `auto`.",
            },
            {
              prompt: "In what order does a context paint its layers, from the bottom?",
              options: [
                "Positive z-index, text, backgrounds, negative z-index",
                "Background, negative z-index, block backgrounds, floats, inline content, level-zero positioned, positive z-index",
                "Text, background, floats",
                "Everything at once",
              ],
              answerIndex: 1,
              explanation: "That is the order of the seven layers. It is the same for every stacking context.",
            },
            {
              prompt: "A float and a block's text overlap. What is painted on top?",
              options: [
                "They cannot overlap",
                "The float covers everything",
                "The text, always, even over positioned elements",
                "The float's background covers the block's background but not its text",
              ],
              answerIndex: 3,
              explanation: "Floats are painted after block backgrounds and before inline content. So a float can cover a neighbour's background, while the text, in a later layer, still shows.",
            },
            {
              prompt: "Which elements can use `z-index` without being positioned?",
              options: ["Table cells", "Inline elements", "Flex items and grid items", "All block elements"],
              answerIndex: 2,
              explanation: "`z-index` applies to positioned elements and to flex and grid items. It is ignored on other static elements.",
            },
            {
              prompt: "What is the difference between `z-index: auto` and `z-index: 0` on a positioned element?",
              options: [
                "`0` creates a stacking context, and `auto` does not",
                "None",
                "`auto` is above `0`",
                "`0` is invalid",
              ],
              answerIndex: 0,
              explanation: "Both are painted in the same layer, but `0` creates a context for the element's children, and `auto` does not.",
            },
            {
              prompt: "What does `isolation: isolate` do?",
              options: [
                "Makes the element invisible to screen readers",
                "Creates a stacking context and nothing else",
                "Isolates the element's CSS from the cascade",
                "Hides overflow",
              ],
              answerIndex: 1,
              explanation: "It creates a new stacking context without any visual or layout effects.",
            },
            {
              prompt: "A fixed overlay only covers part of the page. What is a likely cause?",
              options: [
                "The overlay has a negative z-index",
                "The overlay is too big",
                "`position: fixed` does not work with `inset`",
                "An ancestor has `transform` or `filter`, making it the containing block",
              ],
              answerIndex: 3,
              explanation: "A transform, filter or similar on an ancestor makes the ancestor the containing block for fixed descendants, so they no longer follow the viewport.",
            },
            {
              prompt: "A dropdown is cut off in a straight line at the edge of its card. What should you investigate?",
              options: ["`overflow` on an ancestor", "z-index values", "The stacking context tree", "`isolation`"],
              answerIndex: 0,
              explanation: "A straight cut is clipping, not stacking. Check `overflow` or `clip-path` on an ancestor.",
            },
            {
              prompt: "Why does a modal `<dialog>` opened with `showModal()` need no z-index?",
              options: [
                "It uses a huge z-index internally",
                "It is positioned relative to the body",
                "It is placed in the top layer, above every stacking context",
                "It disables all other elements",
              ],
              answerIndex: 2,
              explanation: "Elements in the top layer are painted above the whole page, whatever z-index or contexts surround them.",
            },
            {
              prompt: "A hovered card scales up and is in front, but drops behind its neighbour when it returns to normal. What helps?",
              options: [
                "Remove the transition",
                "A smaller scale",
                "`overflow: hidden`",
                "An explicit `z-index` on the hovered state of a positioned card",
              ],
              answerIndex: 3,
              explanation: "The transform creates a temporary context that disappears when it returns to `none`. An explicit z-index keeps the order stable.",
            },
            {
              prompt: "What is the best first step for a covered element with a huge z-index?",
              options: [
                "Add `!important`",
                "Find the stacking contexts of both elements and compare them at the first level where their paths split",
                "Raise the number to 99999",
                "Reorder the HTML",
              ],
              answerIndex: 1,
              explanation: "Stacking bugs follow the context tree. Find where the two chains diverge, and compare the two children of the last shared context.",
            },
            {
              prompt: "What is a good use of `isolation: isolate`?",
              options: [
                "On a component, so its internal z-index values cannot clash with the rest of the page",
                "On `<body>`, to hide scrollbars",
                "On every element",
                "Instead of `position`",
              ],
              answerIndex: 0,
              explanation: "It gives a component a private z-index scope, which keeps numbers small and local.",
            },
            {
              prompt: "Why is `will-change: transform` not always free?",
              options: [
                "It disables transitions",
                "It is invalid in CSS",
                "It creates a stacking context, and a containing block for fixed descendants, permanently",
                "It blocks scrolling",
              ],
              answerIndex: 2,
              explanation: "`will-change` creates a context for any property that would, even before it is used, and `transform` also changes the containing block.",
            },
            {
              prompt: "Which approach keeps z-index healthy in a large project?",
              options: [
                "Use `9999` for important things",
                "A short named scale in one place, with component internals isolated",
                "Random numbers",
                "`!important` on every z-index",
              ],
              answerIndex: 1,
              explanation: "A few named layers with space between them, and local scopes for components, keep the numbers meaningful.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "stacking-review",
          kind: "review",
          title: "Review: stacking context cheat sheet",
          summary: "What creates a context, the seven paint layers, the z-index rules and a debugging routine.",
          minutes: 4,
          body: [
            {
              type: "heading",
              text: "What a context is",
            },
            {
              type: "list",
              items: [
                "A bubble in which elements are layered together, then placed as one unit in the parent context.",
                "The page has a root context from `<html>`. Contexts nest.",
                "`z-index` is only compared between elements in the **same** context.",
              ],
            },
            {
              type: "heading",
              text: "What creates a context",
            },
            {
              type: "code",
              language: "css",
              code: `/* on purpose */
    position: relative | absolute  +  z-index: <integer>
    position: fixed | sticky                    /* always */
    flex / grid item  +  z-index: <integer>
    isolation: isolate
    dialog.showModal(), [popover] when shown    /* top layer */
    
    /* as a side effect */
    opacity: < 1
    transform / translate / rotate / scale / perspective: not none
    filter / backdrop-filter: not none
    clip-path / mask: not none
    mix-blend-mode: not normal
    will-change: transform | opacity | ...
    contain: layout | paint | strict | content
    container-type: size | inline-size`,
            },
            {
              type: "heading",
              text: "The seven layers, bottom to top",
            },
            {
              type: "list",
              items: [
                "Context's own background and border.",
                "Negative z-index children.",
                "Normal-flow block backgrounds (non-positioned).",
                "Non-positioned floats.",
                "Inline content (text).",
                "Positioned with `z-index: auto` or `0`, in HTML order.",
                "Positive z-index children, smallest first.",
              ],
              ordered: true,
            },
            {
              type: "heading",
              text: "z-index rules",
            },
            {
              type: "list",
              items: [
                "Applies to positioned elements and flex or grid items.",
                "`auto` creates no context on a positioned element, and `0` does.",
                "Equal values: the later element in the HTML is on top.",
                "Huge numbers do not escape a context.",
              ],
            },
            {
              type: "heading",
              text: "Side effects",
            },
            {
              type: "code",
              language: "css",
              code: `transform | filter | perspective | contain | will-change: transform
      → also the containing block for position: fixed descendants
    overflow: hidden | clip-path
      → clipping, which z-index cannot fix`,
            },
            {
              type: "heading",
              text: "Debugging routine",
            },
            {
              type: "list",
              items: [
                "Name the covered element (A) and the covering element (B).",
                "Write down the chain of contexts from the root for each.",
                "Find the last shared context.",
                "Compare the two children of it on the paths to A and B.",
                "Fix at that level: raise the right ancestor, remove an unintended context, or move the element.",
              ],
            },
            {
              type: "heading",
              text: "Remember",
            },
            {
              type: "list",
              items: [
                "Fix the folder, not the number.",
                "Use `isolation: isolate` for component scopes and a short named z-index scale for fixed UI.",
                "Prefer `<dialog>` and `popover` (the top layer) over hand-built overlays with huge z-index values.",
                "Straight-line cut-offs are clipping, and an overlay stuck in a box is a containing block problem.",
              ],
            },
            {
              type: "callout",
              tone: "tip",
              text: "Covered, cut off or misplaced: those are three different bugs. Look for contexts, overflow and transforms in that order.",
            },
          ],
        },
  ],
};

export default content;
