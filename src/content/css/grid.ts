import type { TopicContent } from "@/engine/types";
import buildAPhotoGallery from "./grid/workshops/build-a-photo-gallery/workshop.generated";

const content: TopicContent = {
  lessons: [
    {
      id: "what-is-css-grid",
      kind: "learn",
      title: "What CSS Grid is",
      summary: "Turn a container into a grid, describe its columns, and let the items find their cells.",
      minutes: 9,
      concept: {
        description:
          "CSS Grid is a two-dimensional layout system. You set `display: grid` on a container, describe its columns and rows, and the browser places each direct child into the next free cell of the resulting table.",
        why: "Flexbox lays items out along a single line. When you need rows and columns to line up together, as in page layouts, galleries and dashboards, grid does it with far less code and none of the old hacks.",
        mentalModel:
          "Sketch the table first. The container is the table, its direct children are the things you put into the cells, and `gap` is the gutter between them.",
      },
      body: [
        { type: "heading", text: "From container to grid" },
        {
          type: "paragraph",
          text: "Grid starts the same way flexbox does: a declaration on the parent. The parent becomes the **grid container**, and its direct children become **grid items**. What makes it a grid is the list of columns you describe.",
        },
        {
          type: "code",
          language: "css",
          code: ".gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}",
          caption: "A three-column grid with 16px gutters",
        },
        {
          type: "paragraph",
          text: "Without `grid-template-columns`, a grid has only one column, so the items just stack. Adding the list of three sizes is what creates the layout.",
        },
        { type: "heading", text: "The vocabulary" },
        {
          type: "list",
          items: [
            "**Track**: a single row or a single column.",
            "**Cell**: the space where one row and one column cross. By default each item takes one cell.",
            "**Line**: the dividers between tracks. They are numbered from 1, so a three-column grid has four column lines.",
            "**Gap**: the gutter between tracks. It sits between them, never around the outside.",
          ],
        },
        { type: "heading", text: "Items find their own cells" },
        {
          type: "paragraph",
          text: "You do not have to say where each item goes. By default the grid auto-places items one after another, from left to right and then top to bottom. When a row is full it creates a new row. Those automatically created rows are only as tall as their content unless you set `grid-auto-rows`.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}",
            note: "Three equal columns, with rows that line up across every column, whatever the content.",
          },
          bad: {
            code: ".gallery {\n  display: flex;\n  flex-wrap: wrap;\n}\n.gallery > * {\n  width: 33%;\n}",
            note: "This imitates columns with percentages. Gaps break the sums, and the last row doesn't line up with the ones above it.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use flexbox for one-dimensional arrangements, a row or a column of things. Use grid when you need both directions to line up. They combine well: a grid item can itself be a flex container.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`display: grid` on the parent makes a grid container, and its direct children are the grid items.",
            "`grid-template-columns` lists the columns, and the grid creates rows automatically as it needs them.",
            "Tracks are rows or columns, cells are where they cross, and lines are numbered from 1.",
            "`gap` adds gutters between tracks, and only between them.",
          ],
        },
      ],
    },
    {
      id: "fr-repeat-and-minmax",
      kind: "learn",
      title: "Sizing tracks: fr, repeat and minmax",
      summary: "Write track sizes as lists, share space with fr, and build galleries that adapt by themselves.",
      minutes: 10,
      concept: {
        description:
          "Track sizes are written as lists in `grid-template-columns` and `grid-template-rows`. You can mix fixed sizes, flexible `fr` units, and the helper functions `repeat()` and `minmax()`.",
        why: "Responsive layouts mostly come down to choosing track sizes well. A single line, `repeat(auto-fill, minmax(160px, 1fr))`, gives a gallery that adds and removes columns as the screen changes, with no media queries at all.",
        mentalModel:
          "`fr` means one share of the leftover space. Fixed tracks take their size first, then the `fr` tracks split whatever remains, in proportion.",
      },
      body: [
        { type: "heading", text: "The fr unit" },
        {
          type: "paragraph",
          text: "A track can be a fixed length like `200px`, a percentage, or a flexible `fr` fraction. Fixed tracks are sized first. Whatever space is left over is divided between the `fr` tracks according to their numbers.",
        },
        {
          type: "list",
          items: [
            "`1fr 1fr 1fr`: three equal columns.",
            "`1fr 2fr 1fr`: the middle column gets twice the share of each side column.",
            "`200px 1fr`: a fixed 200px sidebar, and a main column that takes everything else.",
          ],
        },
        { type: "heading", text: "Writing it shorter with repeat()" },
        {
          type: "paragraph",
          text: "When a size repeats, `repeat(count, size)` saves typing. `repeat(3, 1fr)` is exactly `1fr 1fr 1fr`. You can repeat a pair too: `repeat(2, 100px 1fr)` means `100px 1fr 100px 1fr`.",
        },
        { type: "code", language: "css", code: ".layout {\n  display: grid;\n  grid-template-columns: 200px repeat(2, 1fr);\n}", caption: "A fixed column followed by two flexible ones" },
        { type: "heading", text: "Flexible limits with minmax()" },
        {
          type: "paragraph",
          text: "`minmax(min, max)` gives a track a range. `minmax(200px, 1fr)` means the column is never narrower than 200px, and can grow to share the space. It is the key to columns that stay readable.",
        },
        { type: "heading", text: "A gallery that adapts by itself" },
        {
          type: "paragraph",
          text: "Combine the two with `auto-fill`: `repeat(auto-fill, minmax(160px, 1fr))`. The browser fits as many 160px-or-wider columns as the container has room for, then lets them share the extra space. Resize the window and the number of columns changes on its own.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 16px;\n}",
            note: "Columns appear and disappear as the container resizes. No media queries needed.",
          },
          bad: {
            code: ".gallery {\n  display: grid;\n  grid-template-columns: 160px 160px 160px 160px;\n}",
            note: "Always exactly four 160px columns. On a narrow screen they overflow, and on a wide one they leave a gap.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "`auto-fit` works like `auto-fill`, but empty tracks collapse to nothing, so a few items stretch to fill the row. With `auto-fill` the empty tracks stay and the items keep their size.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`fr` is a share of the leftover space after fixed tracks take their size.",
            "`repeat(3, 1fr)` is shorthand for three `1fr` columns.",
            "`minmax(200px, 1fr)` sets a minimum and a maximum for a track.",
            "`repeat(auto-fill, minmax(160px, 1fr))` makes a responsive grid with no media queries.",
          ],
        },
      ],
    },
    {
      id: "tracks-and-gaps",
      kind: "visualizer",
      title: "Rows, columns and gaps",
      summary: "Define columns, size the rows and space the cells, and see the grid lines and track numbers appear.",
      minutes: 12,
      concept: {
        description:
          "Grid lays children out in two dimensions at once: rows and columns. You describe the columns (and, if you like, the rows) on the parent, and the browser places each child into the next free cell.",
        why: "Flexbox flows items along a single line. Grid is the right tool when you care about both directions together: page layouts, galleries and dashboards.",
        mentalModel:
          "Sketch the table first. `grid-template-columns` lists the column widths, and `gap` is the gutter between cells. The `fr` unit means one share of the leftover space.",
      },
      stage: {
        html: '<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">2</div>\n  <div class="item item-3">3</div>\n  <div class="item item-4">4</div>\n  <div class="item item-5">5</div>\n  <div class="item item-6">6</div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 12px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; overflow: hidden; }\n.container { height: 100%; box-sizing: border-box; padding: 12px; align-content: start; border: 2px dashed rgba(129, 140, 248, 0.6); border-radius: 12px; background: rgba(99, 102, 241, 0.08); }\n.item { box-sizing: border-box; min-height: 56px; padding: 8px; border-radius: 8px; color: #fff; font-weight: 700; display: grid; place-items: center; }\n.item-1 { background: #4f46e5; }\n.item-2 { background: #7c3aed; }\n.item-3 { background: #059669; }\n.item-4 { background: #d97706; }\n.item-5 { background: #e11d48; }\n.item-6 { background: #0891b2; }",
        annotate: "grid",
        itemCount: 6,
      },
      starter: ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n",
      controls: [
        {
          id: "columns",
          label: "grid-template-columns",
          selector: ".container",
          property: "grid-template-columns",
          fallback: "none",
          type: "options",
          options: ["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)", "1fr 2fr 1fr", "200px 1fr"],
          help: "One value per column. `1fr` is one share of the free space.",
        },
        {
          id: "rows",
          label: "grid-auto-rows",
          selector: ".container",
          property: "grid-auto-rows",
          fallback: "auto",
          type: "options",
          options: ["auto", "60px", "90px"],
          help: "The height of every row the grid creates.",
        },
        { id: "gap", label: "gap", selector: ".container", property: "gap", fallback: "0px", type: "range", min: 0, max: 32, step: 4, unit: "px" },
        {
          id: "justify",
          label: "justify-items",
          selector: ".container",
          property: "justify-items",
          fallback: "stretch",
          type: "options",
          options: ["stretch", "start", "center", "end"],
          help: "Positions each item horizontally inside its cell.",
        },
        {
          id: "align",
          label: "align-items",
          selector: ".container",
          property: "align-items",
          fallback: "stretch",
          type: "options",
          options: ["stretch", "start", "center", "end"],
          help: "Positions each item vertically inside its cell.",
        },
        {
          id: "span",
          label: "grid-column",
          selector: ".item-{item}",
          property: "grid-column",
          fallback: "auto",
          type: "options",
          options: ["auto", "span 2", "span 3"],
          help: "Lets this item stretch across several columns.",
        },
      ],
      presets: [
        { id: "gallery", label: "Photo gallery", description: "three columns of equal tiles", css: ".container { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 90px; gap: 8px; }" },
        { id: "sidebar", label: "Sidebar layout", description: "a fixed column beside a flexible one", css: ".container { grid-template-columns: 200px 1fr; gap: 16px; }" },
        { id: "featured", label: "Featured first item", description: "the first item spans two columns", css: ".container { grid-template-columns: repeat(3, 1fr); } .item-1 { grid-column: span 2; }" },
        { id: "centered", label: "Centre in cells", description: "items centred inside tall cells", css: ".container { justify-items: center; align-items: center; grid-auto-rows: 90px; }" },
      ],
      challenge: {
        title: "Space out the grid",
        description:
          "Give the grid a `24px` gap between rows and columns, and centre every item inside its cell, both horizontally and vertically.",
        hints: [
          "The `gap` property sets the space between rows and columns together.",
          "`justify-items` positions items horizontally inside their cells.",
          "`align-items` does the same vertically. Use `center` for both.",
        ],
        checks: [
          { type: "computedStyle", selector: ".container", property: "display", expected: "grid", message: "The container is a grid (`display: grid`)." },
          { type: "computedStyle", selector: ".container", property: "gap", expected: "24px", message: "There is a `24px` gap between rows and between columns." },
          { type: "computedStyle", selector: ".container", property: "justify-items", expected: "center", message: "Items are centred horizontally in their cells." },
          { type: "computedStyle", selector: ".container", property: "align-items", expected: "center", message: "Items are centred vertically in their cells." },
        ],
        solution:
          ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n  justify-items: center;\n  align-items: center;\n}\n",
      },
    },
    {
      id: "placing-and-aligning-grid-items",
      kind: "learn",
      title: "Placing and aligning grid items",
      summary: "Span tracks, use line numbers, name areas, and position items inside their cells.",
      minutes: 10,
      concept: {
        description:
          "By default each item fills one cell, in order. You can make an item span several tracks with `grid-column` and `grid-row`, name regions with `grid-template-areas`, and position items inside their cells with `justify-items` and `align-items`.",
        why: "Real layouts have a header across the top, a sidebar down the side, and one featured card bigger than the rest. Placement properties let you describe those shapes directly, instead of bending the HTML to fit.",
        mentalModel:
          "Lines are the numbers on the edges of a table. An item says which lines it starts and ends at, or how many tracks it spans, and the grid does the rest.",
      },
      body: [
        { type: "heading", text: "Spanning tracks" },
        {
          type: "paragraph",
          text: "The simplest way to make an item bigger is to span it. `grid-column: span 2` means: take two columns. `grid-row: span 2` takes two rows. The grid still decides where the item begins, and then covers the extra tracks.",
        },
        { type: "code", language: "css", code: ".featured {\n  grid-column: span 2;\n  grid-row: span 2;\n}", caption: "A tile twice as wide and twice as tall" },
        { type: "heading", text: "Using line numbers" },
        {
          type: "paragraph",
          text: "For exact control, place an item between two lines. `grid-column: 1 / 3` starts at line 1 and ends at line 3, so it covers two columns. Negative numbers count from the end, so `-1` is the last line. `grid-column: 1 / -1` therefore stretches an item across every column, however many there are.",
        },
        { type: "heading", text: "Naming areas" },
        {
          type: "paragraph",
          text: "`grid-template-areas` lets you draw the layout in text. Each string is a row, each word is a cell, and repeated names merge into one area. Items then claim an area with `grid-area`.",
        },
        {
          type: "code",
          language: "css",
          code: ".page {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\";\n}\n.page header { grid-area: header; }\n.page aside  { grid-area: sidebar; }\n.page main   { grid-area: main; }",
          caption: "A page layout you can read at a glance",
        },
        { type: "heading", text: "Aligning inside cells" },
        {
          type: "paragraph",
          text: "Within its cell, an item is stretched by default. `justify-items` positions items horizontally (`start`, `center`, `end`, `stretch`), and `align-items` does the same vertically. `place-items` sets both at once. To move a single item, use `justify-self` or `align-self` on that item.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".banner {\n  grid-column: 1 / -1;\n}",
            note: "From the first line to the last: always full width, even if you change the number of columns later.",
          },
          bad: {
            code: ".banner {\n  grid-column: 1 / 4;\n}",
            note: "Hard-coded for three columns. Add a fourth column and the banner no longer reaches the edge.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "`justify-items` and `align-items` go on the container and affect every item. `justify-self` and `align-self` go on one item. Mixing them up is a common reason an alignment seems to do nothing.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`grid-column: span 2` and `grid-row: span 2` make an item cover several tracks.",
            "`grid-column: 1 / -1` stretches an item across every column.",
            "`grid-template-areas` with `grid-area` lets you draw a layout in text.",
            "`justify-items` and `align-items` position items inside their cells, and `place-items` sets both.",
          ],
        },
      ],
    },
    {
      id: "predict-the-grid",
      kind: "predict",
      title: "Predict the grid",
      summary: "Read the grid code and work out where the items land.",
      minutes: 6,
      mode: "css",
      intro: "Four items sit in a grid, and the first one is told to span two columns. Work out the shape of the layout before you run it.",
      code: {
        html: '<div class="grid">\n  <div class="one">One</div>\n  <div>Two</div>\n  <div>Three</div>\n  <div>Four</div>\n</div>',
        css: ".grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 8px;\n}\n\n.grid div {\n  padding: 12px;\n  background: #4f46e5;\n  color: white;\n}\n\n.one {\n  grid-column: span 2;\n}",
      },
      questions: [
        {
          prompt: "How many columns does the grid have?",
          options: ["2", "3", "4", "1"],
          answerIndex: 1,
          hint: "Count the sizes in `grid-template-columns`.",
          explanation: "`1fr 2fr 1fr` lists three track sizes, so there are three columns.",
          proves: [{ type: "gridTracks", selector: ".grid", axis: "columns", count: 3, message: "The grid has three columns." }],
        },
        {
          prompt: "How wide is the middle column compared with the first column?",
          options: ["The same width", "Twice as wide", "Half as wide", "Three times as wide"],
          answerIndex: 1,
          hint: "Each `fr` is a share of the leftover space. How many shares does each column get?",
          explanation: "The shares are 1, 2 and 1, so the middle column gets twice the space of each side column.",
          proves: [{ type: "computedStyle", selector: ".grid", property: "grid-template-columns", expected: "1fr 2fr 1fr", message: "The columns are `1fr 2fr 1fr`." }],
        },
        {
          prompt: "Item One spans two columns. Where does Item Two end up?",
          options: [
            "Next to One, in the third column of the first row",
            "Under One, in the first column of the second row",
            "In the middle column of the first row",
            "Nowhere, it is hidden",
          ],
          answerIndex: 0,
          hint: "One covers columns 1 and 2. What is the next free cell?",
          explanation: "One takes the first two columns of row 1. The next free cell is the third column of the same row, so Two goes there. Three and Four then wrap onto the second row.",
          proves: [{ type: "computedStyle", selector: ".one", property: "grid-column", expected: "span 2", message: "Item One spans two columns." }],
        },
      ],
    },
    // Guided build: step files live in ./grid/workshops/build-a-photo-gallery (compiled by `npm run build:content`).
    buildAPhotoGallery,
    {
      id: "debug-the-collapsed-grid",
      kind: "debug",
      title: "Debug: the grid that won't make columns",
      summary: "The cards are stacked in one column. Find the one-letter mistake.",
      minutes: 6,
      mode: "css",
      broken: {
        html: '<div class="layout">\n  <div class="card">One</div>\n  <div class="card">Two</div>\n  <div class="card">Three</div>\n  <div class="card">Four</div>\n  <div class="card">Five</div>\n  <div class="card">Six</div>\n</div>',
        css: "body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }\n\n.layout {\n  display: grid;\n  grid-template-column: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.card {\n  padding: 16px;\n  border-radius: 8px;\n  background: #4f46e5;\n  color: white;\n}\n",
      },
      challenge: {
        title: "Get the cards into three columns",
        description:
          "The six cards should sit in a grid of three columns, but they are stacked in a single column. The CSS looks right at a glance, so look at it very carefully.",
        hints: [
          "Change a value in the CSS (for example the gap), then read the **Heads up** cards in the \"What did that change do?\" panel. They flag lines the browser ignores.",
          "When the browser doesn't recognise a property name, it silently skips the whole line. Check the spelling of every property, letter by letter.",
          "The property is `grid-template-columns`, with an `s` on the end.",
        ],
        checks: [
          { type: "computedStyle", selector: ".layout", property: "display", expected: "grid", message: "The layout is a grid container." },
          { type: "gridTracks", selector: ".layout", axis: "columns", count: 3, message: "The grid has three columns." },
          { type: "computedStyle", selector: ".layout", property: "gap", expected: "16px", message: "There is a `16px` gap between cards." },
        ],
        solution: {
          html: '<div class="layout">\n  <div class="card">One</div>\n  <div class="card">Two</div>\n  <div class="card">Three</div>\n  <div class="card">Four</div>\n  <div class="card">Five</div>\n  <div class="card">Six</div>\n</div>',
          css: "body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }\n\n.layout {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.card {\n  padding: 16px;\n  border-radius: 8px;\n  background: #4f46e5;\n  color: white;\n}\n",
        },
      },
    },
    {
      id: "grid-quiz",
      kind: "quiz",
      title: "Quiz: CSS Grid",
      summary: "Ten questions on grid containers, tracks, fr units, spanning and alignment.",
      minutes: 8,
      passPercent: 70,
      questions: [
        {
          prompt: "Which declaration turns an element into a grid container?",
          options: ["`grid: 1`", "`position: grid`", "`display: grid`", "`flex-direction: grid`"],
          answerIndex: 2,
          explanation: "`display: grid` goes on the parent. Its direct children then become grid items.",
        },
        {
          prompt: "What does `grid-template-columns: repeat(3, 1fr)` create?",
          options: ["Three equal-width columns", "Three columns that are 1px wide", "One column repeated three times in a row", "Three rows"],
          answerIndex: 0,
          explanation: "`repeat(3, 1fr)` is shorthand for `1fr 1fr 1fr`: three columns that each take an equal share of the space.",
        },
        {
          prompt: "In `grid-template-columns: 1fr 2fr 1fr`, how wide is the middle column compared with the others?",
          options: ["The same width", "Half as wide", "Three times as wide", "Twice as wide"],
          answerIndex: 3,
          explanation: "Each `fr` is a share of the leftover space. The shares are 1, 2 and 1, so the middle column gets twice as much as each of the others.",
        },
        {
          prompt: "What does the `fr` unit represent?",
          options: ["A fixed number of pixels", "One share of the leftover space", "A percentage of the browser window", "The width of the tallest item"],
          answerIndex: 1,
          explanation: "`fr` stands for fraction. After fixed-size tracks take their space, the remainder is shared between `fr` tracks in proportion to their numbers.",
        },
        {
          prompt: "Which property adds space between grid rows and columns?",
          options: ["`margin`", "`flow`", "`gap`", "`span`"],
          answerIndex: 2,
          explanation: "`gap` puts gutters between tracks. Unlike margins, it appears only between tracks, not around the outside of the grid.",
        },
        {
          prompt: "An item has `grid-column: span 2`. What does that do?",
          options: ["Makes the item cover two columns", "Moves the item into column 2", "Hides the item on small screens", "Makes the whole grid two columns wide"],
          answerIndex: 0,
          explanation: "`span 2` means the item covers two tracks. The grid decides where it starts, and the item stretches across the next column as well.",
        },
        {
          prompt: "What does `repeat(auto-fill, minmax(160px, 1fr))` give you?",
          options: ["Exactly one 160px column", "As many columns of at least 160px as will fit, sharing any extra space", "A grid with no columns at all", "Columns that are always exactly 160px wide"],
          answerIndex: 1,
          explanation: "The browser fits as many columns of at least 160px as the container allows, then lets them all grow to share the leftover room. The number of columns adapts as the container resizes.",
        },
        {
          prompt: "What does `grid-column: 1 / -1` do to an item?",
          options: ["Hides it", "Gives it a negative width", "Makes it exactly one column wide", "Stretches it from the first column line to the last, across every column"],
          answerIndex: 3,
          explanation: "Lines are numbered from 1, and negative numbers count from the end. Line `-1` is the last line, so the item spans the whole width however many columns there are.",
        },
        {
          prompt: "Which pair positions each item inside its own cell?",
          options: ["`gap` and `order`", "`justify-content` and `align-content`", "`justify-items` and `align-items`", "`grid-auto-flow` and `grid-auto-rows`"],
          answerIndex: 2,
          explanation: "`justify-items` positions items horizontally inside their cells, and `align-items` positions them vertically. `justify-content` and `align-content` move the whole set of tracks instead.",
        },
        {
          prompt: "You wrote `grid-template-column: repeat(3, 1fr)` and the items stack in a single column. Why?",
          options: ["`repeat` can't be used with `fr`", "The property name is misspelt, so the browser ignores the whole line", "Grid supports only two columns", "`gap` has to be set first"],
          answerIndex: 1,
          explanation: "The correct name is `grid-template-columns`. When a property name isn't recognised, the browser skips the line without any error, which makes typos hard to spot.",
        },
      ],
    },
    {
      id: "grid-review",
      kind: "review",
      title: "Review: CSS Grid cheat sheet",
      summary: "The container and item properties from this topic on one page.",
      minutes: 4,
      body: [
        { type: "heading", text: "On the container" },
        {
          type: "code",
          language: "css",
          code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);   /* tracks: sizes, fr, repeat, minmax */\n  grid-auto-rows: 120px;                   /* height of rows made automatically */\n  gap: 16px;                               /* row gap, then column gap */\n  justify-items: stretch;                  /* items horizontally in their cells */\n  align-items: stretch;                    /* items vertically in their cells */\n  grid-auto-flow: row;                     /* row | column | dense */\n}",
        },
        { type: "heading", text: "On the items" },
        {
          type: "code",
          language: "css",
          code: ".wide    { grid-column: span 2; }     /* cover two columns */\n.tall    { grid-row: span 2; }        /* cover two rows */\n.banner  { grid-column: 1 / -1; }     /* first line to last line */\n.header  { grid-area: header; }       /* a name from grid-template-areas */\n\n/* A gallery that adapts by itself */\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n}",
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "Only direct children become grid items.",
            "`fr` is a share of the leftover space after fixed tracks take theirs.",
            "Lines are numbered from 1, and `-1` is the last line.",
            "`justify-items` and `align-items` are for the container. `justify-self` and `align-self` are for one item.",
            "If a grid layout does nothing, check the spelling of the property names: a misspelt property is silently ignored.",
            "Flexbox is for a row or a column. Grid is for rows and columns together.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "Rebuild a gallery and a page layout from memory in the Playground. If you can do both using `grid-template-columns` and `grid-template-areas`, you have this topic.",
        },
      ],
    },
  ],
};

export default content;
