import type { TopicContent } from "@/engine/types";
import buildANavBar from "./flexbox/workshops/build-a-nav-bar/workshop.generated";

const content: TopicContent = {
  lessons: [
    {
      id: "what-is-flexbox",
      kind: "learn",
      title: "Flex containers and flex items",
      summary: "Switch flexbox on with one declaration and see what it does to the children.",
      minutes: 8,
      concept: {
        description:
          "Flexbox is a layout mode. When you set `display: flex` on an element it becomes a flex container, and its direct children become flex items that line up in a row and can be spaced, aligned and sized with a small set of properties.",
        why: "Before flexbox, putting items side by side or centring something meant floats, tables and hacks. Flexbox turns the most common layouts (navigation bars, card rows, centred content) into a few lines of CSS, and it keeps working as the content changes size.",
        mentalModel:
          "A flex container is a shelf, and the flex items are the things standing on it. You change how the shelf arranges its things, not the things themselves.",
      },
      body: [
        { type: "heading", text: "Turning flexbox on" },
        {
          type: "paragraph",
          text: "Flexbox is switched on with a single declaration on a parent element. That parent becomes the **flex container**, and everything directly inside it becomes a **flex item**. Nothing about the items themselves has to change.",
        },
        { type: "code", language: "css", code: ".nav {\n  display: flex;\n}", caption: "One line makes .nav a flex container" },
        {
          type: "paragraph",
          text: "Imagine `.nav` holds three links. Before `display: flex`, the links flow like words in a sentence, or stack on top of each other if they are blocks. After it, they are three flex items that the container arranges by its own rules.",
        },
        { type: "heading", text: "What changes straight away" },
        {
          type: "paragraph",
          text: "You don't need to add anything else to see a difference. As soon as the container is a flex container, these defaults apply to its items:",
        },
        {
          type: "list",
          items: [
            "Items line up in a **row**, side by side, instead of stacking one under another.",
            "Each item is only as wide as its content needs, rather than stretching across the whole page.",
            "Items stretch to the same height, which is the height of the tallest item in the row.",
            "Vertical margins no longer collapse into their neighbours.",
          ],
        },
        {
          type: "paragraph",
          text: "Every one of those defaults can be changed. That is what the rest of flexbox is: a small set of properties for rearranging a row of items.",
        },
        { type: "heading", text: "Only direct children are flex items" },
        {
          type: "paragraph",
          text: "This is the rule that catches most beginners. Flexbox only reaches one level down. In a `ul` with `li` children, the `li` elements are the flex items. A link inside an `li` is not, because it is a grandchild.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".menu {\n  display: flex;\n}",
            note: "Put it on the `ul`, the parent. Its `li` children become the flex items.",
          },
          bad: {
            code: ".menu li {\n  display: flex;\n}",
            note: "This turns each `li` into a flex container for its own children. The `li` elements themselves are still not laid out in a row.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use `display: inline-flex` when the container itself should sit inside a line of text, like a word, instead of taking the full available width.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`display: flex` goes on the parent, which becomes the flex container.",
            "Its direct children become flex items. Grandchildren are not affected.",
            "By default items sit in a row, shrink to their content and stretch to equal height.",
            "Everything else in flexbox changes those defaults.",
          ],
        },
      ],
    },
    {
      id: "main-and-cross-axis",
      kind: "learn",
      title: "The main axis and the cross axis",
      summary: "Every flex container has two axes. Learn which is which and how flex-direction rotates them.",
      minutes: 9,
      concept: {
        description:
          "A flex container has two axes. The main axis is the direction items are laid out in, and it is set by `flex-direction`. The cross axis runs at right angles to it.",
        why: "Almost every flexbox property is described in terms of these two axes, not in terms of left, right, top and bottom. Once you know which axis is which, `justify-content` and `align-items` always make sense, even after you rotate the layout.",
        mentalModel:
          "`flex-direction` picks the main axis. `justify-content` works along it, and `align-items` works across it. Rotate the container and the two properties swap jobs.",
      },
      body: [
        { type: "heading", text: "The four directions" },
        {
          type: "paragraph",
          text: "The default is `flex-direction: row`, which makes the main axis horizontal, with items running from left to right. There are four values in total, and each one picks both an axis and a direction along it.",
        },
        {
          type: "list",
          items: [
            "`row`: main axis horizontal, items run left to right (the default).",
            "`row-reverse`: main axis horizontal, items run right to left.",
            "`column`: main axis vertical, items stack from top to bottom.",
            "`column-reverse`: main axis vertical, items stack from bottom to top.",
          ],
        },
        { type: "code", language: "css", code: ".sidebar {\n  display: flex;\n  flex-direction: column;\n}", caption: "A vertical stack of items" },
        { type: "heading", text: "Which axis does each property use?" },
        {
          type: "paragraph",
          text: "The two alignment properties are named after the axis they work on, not after a screen direction. `justify-content` distributes items along the **main** axis. `align-items` positions items along the **cross** axis.",
        },
        {
          type: "paragraph",
          text: "With a row, the main axis is horizontal, so `justify-content` moves things left and right and `align-items` moves them up and down. Switch to a column and it flips: `justify-content` now moves things up and down, and `align-items` moves them left and right. The properties didn't change. The axes rotated underneath them.",
        },
        {
          type: "paragraph",
          text: "A useful habit is to say the axis out loud before reaching for a property: \"my main axis is horizontal, so to move things sideways I need `justify-content`.\" It takes a second, and it prevents the most common flexbox mistake, which is grabbing the wrong alignment property.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".card-row {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}",
            note: "In a column, `align-items: center` centres the items horizontally, because the cross axis is horizontal.",
          },
          bad: {
            code: ".card-row {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}",
            note: "If you wanted horizontal centring here, this is the classic mix-up. In a column, `justify-content` works vertically.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "`row-reverse` and `column-reverse` only change what you see. Keyboard focus and screen readers still follow the order of the HTML, so don't use them to reorder content whose order matters.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`flex-direction` chooses the main axis: `row` is horizontal and `column` is vertical.",
            "The cross axis is always at right angles to the main axis.",
            "`justify-content` works along the main axis, and `align-items` works along the cross axis.",
            "The `-reverse` values flip the visual order only, not the order in the HTML.",
          ],
        },
      ],
    },
    {
      id: "axes-and-alignment",
      kind: "visualizer",
      title: "The two axes and alignment",
      summary: "Switch the direction, spread the items and align them, and watch the main and cross axes move.",
      minutes: 12,
      concept: {
        description:
          "Flexbox lays out a container's direct children along one line, called the main axis, and lets you align them across it, along the cross axis. You turn it on by setting `display: flex` on the parent.",
        why: "Navigation bars, card rows and centred layouts almost all use flexbox. Once you can see which axis is which, `justify-content` and `align-items` stop being guesswork.",
        mentalModel:
          "`flex-direction` chooses the main axis. `justify-content` works along it, and `align-items` works across it. Change the direction and the two properties swap jobs.",
      },
      stage: {
        html: '<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">2</div>\n  <div class="item item-3">3</div>\n  <div class="item item-4">4</div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; overflow: hidden; }\n.container { height: 100%; box-sizing: border-box; padding: 12px; border: 2px dashed rgba(129, 140, 248, 0.6); border-radius: 12px; background: rgba(99, 102, 241, 0.08); }\n.item { box-sizing: border-box; min-width: 56px; min-height: 48px; padding: 8px 12px; border-radius: 8px; color: #fff; font-weight: 700; display: grid; place-items: center; }\n.item-1 { background: #4f46e5; }\n.item-2 { background: #7c3aed; }\n.item-3 { background: #059669; }\n.item-4 { background: #d97706; }",
        annotate: "flex",
        itemCount: 4,
      },
      starter:
        ".container {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n  flex-wrap: nowrap;\n  gap: 16px;\n}\n",
      controls: [
        {
          id: "direction",
          label: "flex-direction",
          selector: ".container",
          property: "flex-direction",
          fallback: "row",
          type: "options",
          options: ["row", "row-reverse", "column", "column-reverse"],
          help: "Picks the main axis, and which way it points.",
        },
        {
          id: "justify",
          label: "justify-content",
          selector: ".container",
          property: "justify-content",
          fallback: "flex-start",
          type: "options",
          options: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
          help: "Shares out the free space along the main axis.",
        },
        {
          id: "align",
          label: "align-items",
          selector: ".container",
          property: "align-items",
          fallback: "stretch",
          type: "options",
          options: ["stretch", "flex-start", "center", "flex-end"],
          help: "Positions items on the cross axis.",
        },
        {
          id: "wrap",
          label: "flex-wrap",
          selector: ".container",
          property: "flex-wrap",
          fallback: "nowrap",
          type: "options",
          options: ["nowrap", "wrap"],
        },
        { id: "gap", label: "gap", selector: ".container", property: "gap", fallback: "0px", type: "range", min: 0, max: 48, step: 4, unit: "px" },
        {
          id: "grow",
          label: "flex-grow",
          selector: ".item-{item}",
          property: "flex-grow",
          fallback: "0",
          type: "range",
          min: 0,
          max: 3,
          step: 1,
          help: "How much of the free space this item takes.",
        },
        {
          id: "self",
          label: "align-self",
          selector: ".item-{item}",
          property: "align-self",
          fallback: "auto",
          type: "options",
          options: ["auto", "flex-start", "center", "flex-end"],
          help: "Overrides align-items for this one item.",
        },
      ],
      presets: [
        { id: "center", label: "Centre everything", description: "justify-content and align-items both centre", css: ".container { justify-content: center; align-items: center; }" },
        { id: "navbar", label: "Navigation bar", description: "space-between with items centred vertically", css: ".container { flex-direction: row; justify-content: space-between; align-items: center; }" },
        { id: "stack", label: "Vertical stack", description: "switch the main axis to vertical", css: ".container { flex-direction: column; justify-content: flex-start; align-items: stretch; }" },
        { id: "wrap", label: "Wrapping cards", description: "wide items that wrap onto new lines", css: ".container { flex-direction: row; flex-wrap: wrap; justify-content: flex-start; align-items: flex-start; } .item { flex-basis: 180px; }" },
      ],
      challenge: {
        title: "Build a navigation bar layout",
        description:
          "Arrange the items like a navigation bar: in a row, with the first and last items pushed to the edges and the leftover space shared between them, everything centred vertically, and a `16px` gap.",
        hints: [
          "Which property positions items along the main axis? That is `justify-content`.",
          "`space-between` pushes the first and last items to the edges and shares the leftover space between the rest.",
          "Centre the items on the cross axis with `align-items: center`.",
        ],
        checks: [
          { type: "computedStyle", selector: ".container", property: "display", expected: "flex", message: "The container is a flex container (`display: flex`)." },
          { type: "computedStyle", selector: ".container", property: "flex-direction", expected: "row", message: "The items run in a row." },
          { type: "computedStyle", selector: ".container", property: "justify-content", expected: "space-between", message: "The space is shared between the items (`space-between`)." },
          { type: "computedStyle", selector: ".container", property: "align-items", expected: "center", message: "The items are centred vertically (`align-items: center`)." },
          { type: "computedStyle", selector: ".container", property: "gap", expected: "16px", message: "There is a `16px` gap between items." },
        ],
        solution:
          ".container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n",
      },
    },
    {
      id: "spacing-and-aligning",
      kind: "learn",
      title: "Spacing and aligning items",
      summary: "Share out free space with justify-content, align on the cross axis, and add gaps the modern way.",
      minutes: 10,
      concept: {
        description:
          "Once items are in a row, you control where they sit with `justify-content` (along the main axis), `align-items` (across it), `align-self` (for one item) and `gap` (the space between items).",
        why: "These four properties cover most real layouts: centring a block, pushing a button to the far edge, spreading navigation links, evenly spacing cards. Learning what each one does means you rarely need margins or positioning for layout again.",
        mentalModel:
          "Free space is the room left over after the items take their size. `justify-content` decides where that free space goes along the main axis, and `align-items` decides where each item sits in the cross axis.",
      },
      body: [
        { type: "heading", text: "Sharing out the free space" },
        {
          type: "paragraph",
          text: "If the items don't fill the container, the leftover room is free space on the main axis. `justify-content` chooses where it goes. The values you will use most are:",
        },
        {
          type: "list",
          items: [
            "`flex-start`: pack items at the start, with all the free space at the end (the default).",
            "`center`: centre the items, with equal free space on both ends.",
            "`flex-end`: pack items at the end.",
            "`space-between`: first and last items touch the edges, and the free space is shared between items.",
            "`space-around` and `space-evenly`: free space is shared around items. `space-evenly` makes every gap identical.",
          ],
        },
        { type: "heading", text: "Aligning across the axis" },
        {
          type: "paragraph",
          text: "`align-items` positions each item on the cross axis. The default `stretch` makes every item as tall as the tallest, which is why flex items in a row have matching heights. Use `flex-start`, `center` or `flex-end` to place items at the top, middle or bottom instead. To override it for a single item, give that item `align-self`.",
        },
        { type: "code", language: "css", code: ".toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.toolbar .help {\n  align-self: flex-end;\n}", caption: "Spread out, centred, with one item pushed down" },
        { type: "heading", text: "Gaps without margins" },
        {
          type: "paragraph",
          text: "`gap` puts a fixed amount of space between items. It is set once, on the container, and it only appears *between* items, so there is no stray space after the last one.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".tags {\n  display: flex;\n  gap: 8px;\n}",
            note: "One declaration on the container. The spacing is even, and easy to change in one place.",
          },
          bad: {
            code: ".tags span {\n  margin-right: 8px;\n}",
            note: "Every item carries a margin, including the last one, which leaves unwanted space at the end and breaks when items wrap.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "To centre something perfectly in both directions, use `display: flex`, `justify-content: center` and `align-items: center` on its parent, and give the parent a height.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`justify-content` shares the free space along the main axis.",
            "`align-items` positions items on the cross axis, and `align-self` overrides it for one item.",
            "`gap` adds space between items, and only between them.",
            "Centring both ways is `justify-content: center` plus `align-items: center`.",
          ],
        },
      ],
    },
    {
      id: "predict-the-column",
      kind: "predict",
      title: "Predict the layout",
      summary: "Read the flexbox code and work out where each item lands, before you run it.",
      minutes: 6,
      mode: "css",
      intro:
        "Three items sit inside a flex container. Read the CSS carefully, answer the questions, and only then will the page run so you can check your thinking.",
      code: {
        html: '<div class="box">\n  <div>A</div>\n  <div>B</div>\n  <div>C</div>\n</div>',
        css: ".box {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  height: 240px;\n  background: #e0e7ff;\n}\n\n.box div {\n  padding: 8px 20px;\n  background: #4f46e5;\n  color: white;\n}",
      },
      questions: [
        {
          prompt: "Which way do the three items run?",
          options: ["Left to right, in one row", "Top to bottom, in one column", "Bottom to top, in one column", "They all overlap in the middle"],
          answerIndex: 1,
          hint: "Look at `flex-direction` in the CSS.",
          explanation: "`flex-direction: column` turns the main axis vertical, so A, B and C stack from top to bottom.",
          proves: [{ type: "computedStyle", selector: ".box", property: "flex-direction", expected: "column", message: "The box uses `flex-direction: column`." }],
        },
        {
          prompt: "Where does item A end up?",
          options: [
            "At the top, centred horizontally",
            "In the top-left corner",
            "Vertically centred in the box",
            "At the bottom, centred horizontally",
          ],
          answerIndex: 0,
          hint: "With a column, the two properties swap jobs: `justify-content` works vertically and `align-items` works horizontally.",
          explanation:
            "`space-between` puts the first item at the start of the main axis, which is the top. `align-items: center` centres items on the cross axis, which is horizontal here. So A sits at the top, in the middle.",
          proves: [
            { type: "computedStyle", selector: ".box", property: "justify-content", expected: "space-between", message: "The box uses `justify-content: space-between`." },
            { type: "computedStyle", selector: ".box", property: "align-items", expected: "center", message: "The box uses `align-items: center`." },
          ],
        },
        {
          prompt: "The box is 240px tall and the three items don't fill it. What does `space-between` do with the leftover space?",
          options: [
            "Shares it equally between the items",
            "Puts all of it above item A",
            "Puts all of it below item C",
            "Makes the items taller so they fill it",
          ],
          answerIndex: 0,
          hint: "The first and last items go to the edges. What is left to fill?",
          explanation:
            "`space-between` pushes the first and last items to the two edges and shares the leftover space equally in the gaps between items. The items keep their own size.",
          proves: [{ type: "computedStyle", selector: ".box", property: "height", expected: "240px", message: "The box is 240px tall." }],
        },
      ],
    },
    {
      id: "wrapping-flex-lines",
      kind: "learn",
      title: "Wrapping onto new lines",
      summary: "Let items flow onto extra lines with flex-wrap, and spread those lines with align-content.",
      minutes: 8,
      concept: {
        description:
          "By default a flex container keeps all its items on a single line. `flex-wrap: wrap` lets items that run out of room continue on a new line, and `align-content` then positions those lines.",
        why: "A row of cards or tags needs to work on a narrow phone as well as a wide monitor. Wrapping lets the layout adapt by itself, with no media query, because items simply move down when there is no more room.",
        mentalModel:
          "Without wrap, a flex container squeezes everything onto one shelf. With wrap, it adds a new shelf when the first one is full. `justify-content` and `align-items` work inside each shelf, and `align-content` arranges the shelves.",
      },
      body: [
        { type: "heading", text: "One line by default" },
        {
          type: "paragraph",
          text: "The default value is `flex-wrap: nowrap`. If the items are wider than the container, the browser does not start a new line. Instead it shrinks the items (if they are allowed to shrink), and if they still don't fit, they overflow the container.",
        },
        { type: "heading", text: "Turning wrapping on" },
        {
          type: "code",
          language: "css",
          code: ".gallery {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.gallery img {\n  flex-basis: 200px;\n}",
          caption: "Items 200px wide, wrapping as needed",
        },
        {
          type: "paragraph",
          text: "With `flex-wrap: wrap`, each item keeps its preferred size, and a new line begins whenever the next item would not fit. There is also `wrap-reverse`, which stacks new lines upward instead of downward. The `gap` property spaces items both within a line and between lines.",
        },
        { type: "heading", text: "Wrapping and sizing work together" },
        {
          type: "paragraph",
          text: "Wrapping only kicks in when the items have a size that can overflow the line. If every item is allowed to shrink down to nothing, they never need a second line. That is why wrapping layouts usually give items a `flex-basis`, such as `200px`, and often `flex-grow: 1` as well, so each line fills up neatly and the last item doesn't leave a ragged gap at the end.",
        },
        { type: "heading", text: "Positioning the lines" },
        {
          type: "paragraph",
          text: "Once there are several lines, there is a new question: how are the lines themselves placed inside a container that is taller than they need? That is `align-content`. It accepts the same family of values as `justify-content`, such as `flex-start`, `center` and `space-between`, but it works on the **cross axis** and moves whole lines.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".grid {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start;\n}",
            note: "`align-content` has an effect because wrapping can create several lines.",
          },
          bad: {
            code: ".row {\n  display: flex;\n  align-content: center;\n}",
            note: "With a single line, `align-content` does nothing. Use `align-items` to position items inside one line.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "`flex-flow` is a shorthand for `flex-direction` and `flex-wrap` together, so `flex-flow: row wrap` means the same as setting both separately.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`nowrap` is the default: one line, and items shrink or overflow.",
            "`flex-wrap: wrap` starts a new line when items run out of room.",
            "`align-content` positions multiple lines, and only has an effect when there is more than one.",
            "`gap` spaces items within a line and the lines themselves.",
          ],
        },
      ],
    },
    {
      id: "sizing-flex-items",
      kind: "learn",
      title: "Sizing flex items: grow, shrink and basis",
      summary: "Decide how items share a row's width with flex-grow, flex-shrink and flex-basis.",
      minutes: 11,
      concept: {
        description:
          "Three properties on the items control how they share the container's main-axis space: `flex-basis` is the starting size, `flex-grow` says how much of any spare space an item takes, and `flex-shrink` says how willing an item is to give up room when space runs short.",
        why: "This is how you build a fixed sidebar beside a flexible main area, or three equal-width columns that adjust as the window changes. It is also the source of most flexbox surprises, so understanding it saves hours of guessing.",
        mentalModel:
          "Each item starts at its basis. If there is spare room, items with a grow value share it in proportion. If there isn't enough room, items with a shrink value give some back in proportion.",
      },
      body: [
        { type: "heading", text: "Three properties, three jobs" },
        {
          type: "list",
          items: [
            "**`flex-basis`** is the size the item starts at along the main axis, for example `200px`. The default, `auto`, uses the item's own width.",
            "**`flex-grow`** is a number: the share of spare space the item receives. The default `0` means it takes none.",
            "**`flex-shrink`** is a number: how readily the item shrinks when there isn't enough room. The default `1` means it will shrink.",
          ],
        },
        { type: "heading", text: "Growing" },
        {
          type: "paragraph",
          text: "Grow values work as ratios. If one item has `flex-grow: 1` and another has `flex-grow: 2`, the second receives twice as much of the spare space as the first. If only one item has a grow value, it takes all of it, which is the trick for a flexible middle column between two fixed ones.",
        },
        { type: "code", language: "css", code: ".sidebar { flex-basis: 200px; flex-shrink: 0; }\n.main    { flex-grow: 1; }", caption: "A fixed sidebar and a main area that takes the rest" },
        { type: "heading", text: "Shrinking" },
        {
          type: "paragraph",
          text: "When the items together are wider than the container, shrink values decide who gives way. An item with `flex-shrink: 0` refuses to get smaller, so the others take all the squeeze. That is how you stop a button or an icon from being squashed.",
        },
        { type: "heading", text: "The flex shorthand" },
        {
          type: "paragraph",
          text: "The three values are usually written together as `flex: grow shrink basis`. The common cases are worth memorising: `flex: 1` means grow and take an equal share of the space, `flex: none` means a rigid item that neither grows nor shrinks, and `flex: 0 0 200px` is a fixed 200px item.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".columns > * {\n  flex: 1;\n}",
            note: "Every child takes an equal share of the row, however many there are.",
          },
          bad: {
            code: ".columns > * {\n  width: 33.33%;\n}",
            note: "This only works for exactly three items, and breaks as soon as you add a gap or a fourth item.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "A flex item will not shrink below the size of its content by default. If a long word or an image refuses to shrink and overflows, add `min-width: 0` to that item.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`flex-basis` is the starting size, `flex-grow` shares spare space, and `flex-shrink` gives space back.",
            "Grow and shrink values are ratios between items.",
            "`flex: 1` means equal shares, `flex: none` means rigid, and `flex: 0 0 200px` means fixed at 200px.",
            "If content won't shrink, `min-width: 0` lets it.",
          ],
        },
      ],
    },
    {
      id: "growing-and-shrinking",
      kind: "visualizer",
      title: "Growing, shrinking and basis",
      summary: "Change how three items share the width and watch the free space appear and disappear.",
      minutes: 12,
      concept: {
        description:
          "Three items start at a width of 200px inside a container that is narrower than their combined size. `flex-basis`, `flex-grow` and `flex-shrink` decide who gets how much of the row.",
        why: "Sizing rules are easiest to understand by watching the free space change. When items overflow there is negative free space to take back, and when they don't fill the row there is spare space to hand out.",
        mentalModel:
          "Start every item at its basis. If the row has room to spare, items with a grow value share it. If it is short of room, items with a shrink value give some back.",
      },
      stage: {
        html: '<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">2</div>\n  <div class="item item-3">3</div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; overflow: hidden; }\n.container { height: 100%; box-sizing: border-box; padding: 12px; border: 2px dashed rgba(129, 140, 248, 0.6); border-radius: 12px; background: rgba(99, 102, 241, 0.08); }\n.item { box-sizing: border-box; width: 200px; min-height: 56px; padding: 8px 12px; border-radius: 8px; color: #fff; font-weight: 700; display: grid; place-items: center; }\n.item-1 { background: #4f46e5; }\n.item-2 { background: #7c3aed; }\n.item-3 { background: #059669; }",
        annotate: "flex",
        itemCount: 3,
      },
      starter: ".container {\n  display: flex;\n  gap: 12px;\n}\n",
      controls: [
        { id: "gap", label: "gap", selector: ".container", property: "gap", fallback: "0px", type: "range", min: 0, max: 40, step: 4, unit: "px" },
        { id: "basis", label: "flex-basis", selector: ".item-{item}", property: "flex-basis", fallback: "auto", type: "options", options: ["auto", "80px", "160px", "240px"], help: "The size this item starts at, before growing or shrinking." },
        { id: "grow", label: "flex-grow", selector: ".item-{item}", property: "flex-grow", fallback: "0", type: "range", min: 0, max: 4, step: 1, help: "How big a share of any spare space this item takes." },
        { id: "shrink", label: "flex-shrink", selector: ".item-{item}", property: "flex-shrink", fallback: "1", type: "range", min: 0, max: 3, step: 1, help: "How readily this item shrinks when space runs short. 0 means never." },
      ],
      presets: [
        { id: "equal", label: "Equal columns", description: "every item grows equally from zero", css: ".item { flex-grow: 1; flex-basis: 0px; }" },
        { id: "sidebar", label: "Fixed sides, flexible middle", description: "two rigid items around one that fills the rest", css: ".item-1 { flex-grow: 0; flex-shrink: 0; flex-basis: 160px; } .item-2 { flex-grow: 1; flex-basis: 0px; } .item-3 { flex-grow: 0; flex-shrink: 0; flex-basis: 120px; }" },
        { id: "noshrink", label: "Refuse to shrink", description: "nothing may shrink, so the row overflows", css: ".item { flex-shrink: 0; }" },
        { id: "double", label: "Double-width middle", description: "the middle item takes twice the share", css: ".item { flex-grow: 1; flex-basis: 0px; } .item-2 { flex-grow: 2; }" },
      ],
      challenge: {
        title: "A fixed sidebar, a flexible middle",
        description:
          "Make Items 1 and 3 fixed at `120px` wide, neither growing nor shrinking, and let Item 2 grow to take all the remaining space.",
        hints: [
          "Fixed size means a `flex-basis` of `120px` and a `flex-shrink` of `0`. Do this for Item 1 and Item 3.",
          "Grow defaults to `0`, which is what you want for the fixed items.",
          "Item 2 needs `flex-grow: 1`, so it absorbs everything left over.",
        ],
        checks: [
          { type: "computedStyle", selector: ".item-1", property: "flex-basis", expected: "120px", message: "Item 1 starts at `120px`." },
          { type: "computedStyle", selector: ".item-1", property: "flex-shrink", expected: "0", message: "Item 1 never shrinks." },
          { type: "computedStyle", selector: ".item-3", property: "flex-basis", expected: "120px", message: "Item 3 starts at `120px`." },
          { type: "computedStyle", selector: ".item-3", property: "flex-shrink", expected: "0", message: "Item 3 never shrinks." },
          { type: "computedStyle", selector: ".item-2", property: "flex-grow", expected: "1", message: "Item 2 grows to fill the leftover space." },
        ],
        solution:
          ".container {\n  display: flex;\n  gap: 12px;\n}\n\n.item-1 {\n  flex-grow: 0;\n  flex-shrink: 0;\n  flex-basis: 120px;\n}\n\n.item-2 {\n  flex-grow: 1;\n}\n\n.item-3 {\n  flex-grow: 0;\n  flex-shrink: 0;\n  flex-basis: 120px;\n}\n",
      },
    },
    // Guided build: step files live in ./flexbox/workshops/build-a-nav-bar (compiled by `npm run build:content`).
    buildANavBar,
    {
      id: "debug-the-nav-bar",
      kind: "debug",
      title: "Debug: the nav bar that won't spread out",
      summary: "Find why the links are bunched up on the left, and fix the CSS.",
      minutes: 8,
      mode: "css",
      broken: {
        html: '<nav class="nav">\n  <a href="#home">Home</a>\n  <a href="#trails">Trails</a>\n  <a href="#guides">Guides</a>\n  <a href="#contact">Contact</a>\n</nav>',
        css: "body { margin: 0; font-family: system-ui, sans-serif; }\n\n.nav {\n  height: 72px;\n  padding: 0 24px;\n  background: #1e1b4b;\n  justify-content: space-between;\n  align-items: centre;\n  gap: 16px;\n}\n\n.nav a {\n  color: white;\n  text-decoration: none;\n}\n",
      },
      challenge: {
        title: "Fix the navigation bar",
        description:
          "The four links should sit in one row, with the first link at the left edge and the last at the right edge, spaced out in between, and centred vertically in the bar. Instead they are bunched together on the left and don't line up vertically. Find the problems in the CSS and fix them.",
        hints: [
          "Edit any value, then read the **Heads up** cards in the \"What did that change do?\" panel. They warn when a property can't take effect yet, and when the browser doesn't understand a value.",
          "`justify-content` and `align-items` only work on a flex container. What does `.nav` need first?",
          "Add `display: flex` to `.nav`, and check the spelling of the `align-items` value. CSS uses the American spelling.",
        ],
        checks: [
          { type: "computedStyle", selector: ".nav", property: "display", expected: "flex", message: "The nav is a flex container (`display: flex`)." },
          { type: "computedStyle", selector: ".nav", property: "justify-content", expected: "space-between", message: "The links are spread across the bar (`space-between`)." },
          { type: "computedStyle", selector: ".nav", property: "align-items", expected: "center", message: "The links are centred vertically (`align-items: center`)." },
          { type: "count", selector: ".nav a", min: 4, message: "All four links are still there." },
        ],
        solution: {
          html: '<nav class="nav">\n  <a href="#home">Home</a>\n  <a href="#trails">Trails</a>\n  <a href="#guides">Guides</a>\n  <a href="#contact">Contact</a>\n</nav>',
          css: "body { margin: 0; font-family: system-ui, sans-serif; }\n\n.nav {\n  display: flex;\n  height: 72px;\n  padding: 0 24px;\n  background: #1e1b4b;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\n.nav a {\n  color: white;\n  text-decoration: none;\n}\n",
        },
      },
    },
    {
      id: "flexbox-quiz",
      kind: "quiz",
      title: "Quiz: flexbox",
      summary: "Ten questions on containers, axes, spacing, wrapping and sizing.",
      minutes: 8,
      passPercent: 70,
      questions: [
        {
          prompt: "Which declaration turns an element into a flex container?",
          options: ["`flex: 1`", "`display: flex`", "`position: flex`", "`flex-direction: row`"],
          answerIndex: 1,
          explanation: "`display: flex` goes on the parent. Its direct children then become flex items.",
        },
        {
          prompt: "In a flex container with `flex-direction: row`, which property positions items along the horizontal axis?",
          options: ["`align-items`", "`align-content`", "`justify-items`", "`justify-content`"],
          answerIndex: 3,
          explanation: "`justify-content` works along the main axis. In a row the main axis is horizontal.",
        },
        {
          prompt: "You change `flex-direction` from `row` to `column`. What happens to `justify-content`?",
          options: ["It now works vertically, along the new main axis", "It stops working", "It still works horizontally", "It turns into `align-items`"],
          answerIndex: 0,
          explanation: "The properties are tied to the axes, not to screen directions. When the main axis rotates, `justify-content` rotates with it.",
        },
        {
          prompt: "Three items sit in a container with `display: flex; justify-content: space-between;`. Where does the middle item end up?",
          options: ["Against the left edge", "Against the right edge", "Halfway between the first and last items", "Stacked under the first item"],
          answerIndex: 2,
          explanation: "`space-between` pushes the first and last items to the edges and shares the leftover space evenly, so the middle item sits halfway.",
        },
        {
          prompt: "Which property puts space between items without adding margins to the items themselves?",
          options: ["`flex-wrap`", "`gap`", "`order`", "`align-self`"],
          answerIndex: 1,
          explanation: "`gap` is set on the container and only appears between items, so there is no leftover margin after the last item.",
        },
        {
          prompt: "`flex-wrap` is `nowrap`, the default, and the items are wider than the container. What happens?",
          options: ["Items shrink to fit, if they are allowed to shrink", "Items wrap onto a second line", "The container grows wider to fit", "The extra items are hidden"],
          answerIndex: 0,
          explanation: "With `nowrap` everything stays on one line. Items shrink if their `flex-shrink` allows it, and overflow if they still don't fit.",
        },
        {
          prompt: "Which property overrides `align-items` for just one item?",
          options: ["`justify-self`", "`align-content`", "`order`", "`align-self`"],
          answerIndex: 3,
          explanation: "`align-self` is set on an item and replaces the container's `align-items` for that item only.",
        },
        {
          prompt: "What does `flex: 1` on every item in a row do?",
          options: ["Makes each item exactly 1 pixel wide", "Stops the items from growing", "Shares the free space equally between the items", "Puts the items in a column"],
          answerIndex: 2,
          explanation: "`flex: 1` means grow with a share of 1 starting from zero, so every item receives an equal share of the row.",
        },
        {
          prompt: "`align-content` has no visible effect on a single-line flex container. Why?",
          options: ["It only works with `column` direction", "It positions multiple lines, and there is only one line", "It needs `gap` to be set first", "It is deprecated"],
          answerIndex: 1,
          explanation: "`align-content` spaces out the lines of a wrapped container. With one line there is nothing to distribute, so use `align-items` instead.",
        },
        {
          prompt: "Why can `flex-direction: row-reverse` cause an accessibility problem?",
          options: ["Screen readers stop reading the page", "It removes focus outlines from the items", "Keyboard focus and screen readers still follow the HTML order, not the visual order", "It makes the text unreadable"],
          answerIndex: 2,
          explanation: "The reverse values change only how things look. People using a keyboard or a screen reader still move through the items in source order, which can feel wrong.",
        },
      ],
    },
    {
      id: "flexbox-review",
      kind: "review",
      title: "Review: flexbox cheat sheet",
      summary: "Every flexbox property from this topic on one page.",
      minutes: 4,
      body: [
        { type: "heading", text: "On the container" },
        {
          type: "code",
          language: "css",
          code: ".container {\n  display: flex;\n  flex-direction: row;            /* row | row-reverse | column | column-reverse */\n  justify-content: flex-start;    /* along the main axis */\n  align-items: stretch;           /* across the main axis */\n  flex-wrap: nowrap;              /* nowrap | wrap | wrap-reverse */\n  align-content: normal;          /* spaces lines (needs wrapping) */\n  gap: 16px;\n}",
        },
        { type: "heading", text: "On the items" },
        {
          type: "code",
          language: "css",
          code: ".item {\n  flex-grow: 0;        /* share of spare space */\n  flex-shrink: 1;      /* willingness to give up room */\n  flex-basis: auto;    /* starting size */\n  align-self: auto;    /* override align-items */\n}\n\n/* flex: grow shrink basis */\n.equal  { flex: 1; }\n.rigid  { flex: none; }\n.fixed  { flex: 0 0 200px; }",
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "Only direct children are flex items.",
            "`justify-content` works along the main axis, and `align-items` works across it. Rotate with `flex-direction` and they swap jobs.",
            "Use `gap` for spacing instead of margins on items.",
            "`align-content` only matters when items wrap onto several lines.",
            "`flex: 1` shares space equally, and `flex-shrink: 0` stops an item being squashed.",
            "Centre anything with `display: flex`, `justify-content: center` and `align-items: center` on its parent.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "Open the Playground, choose CSS, and rebuild a navigation bar and a card row from memory. If you can do both without looking, you have this topic.",
        },
      ],
    },
  ],
};

export default content;
