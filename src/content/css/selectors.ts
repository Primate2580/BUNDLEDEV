import type { TopicContent } from "@/engine/types";
import buildARecipePage from "./selectors/workshops/build-a-recipe-page/workshop.generated";

const content: TopicContent = {
  lessons: [
    {
      id: "what-is-a-selector",
      kind: "learn",
      title: "What a selector is",
      summary: "The two halves of every CSS rule, and the basic selectors that pick elements.",
      minutes: 8,
      concept: {
        description:
          "A CSS rule has two parts. The selector picks the elements to style, and the declaration block says how to style them. The selector is the question \"which elements?\", and the declarations are the answer \"make them look like this\".",
        why: "Every style you write depends on its selector. One that is too broad restyles things you never meant to touch, and one that is too narrow misses elements. Writing the right selector is half of writing CSS.",
        mentalModel:
          "A selector is an address. `p` means \"every paragraph\", `.note` means \"everything labelled note\", and `#main` means \"the one thing called main\".",
      },
      body: [
        { type: "heading", text: "Anatomy of a rule" },
        {
          type: "code",
          language: "css",
          code: "h2 {\n  color: #4338ca;\n  margin-bottom: 8px;\n}",
          caption: "Selector, then a block of declarations",
        },
        {
          type: "paragraph",
          text: "Here `h2` is the selector. Inside the curly braces are two declarations, each a property, a colon, a value and a semicolon. The browser reads the selector first, finds every matching element on the page, and then applies every declaration to each of them.",
        },
        { type: "heading", text: "The basic selectors" },
        {
          type: "list",
          items: [
            "**Type selector** such as `p` or `h2`: matches every element of that type.",
            "**Class selector** such as `.note`: matches every element whose `class` attribute includes `note`.",
            "**Id selector** such as `#main`: matches the single element whose `id` is `main`.",
            "**Universal selector** `*`: matches every element on the page.",
          ],
        },
        {
          type: "code",
          language: "html",
          code: '<p>A plain paragraph.</p>\n<p class="note">A note.</p>\n<p id="main">The main paragraph.</p>',
          caption: "The same three selectors can each pick a different paragraph",
        },
        {
          type: "paragraph",
          text: "With that HTML, `p` selects all three paragraphs, `.note` selects only the second, and `#main` selects only the third. Being able to choose a precise subset like this is what makes CSS useful.",
        },
        { type: "heading", text: "Grouping selectors" },
        {
          type: "paragraph",
          text: "When several kinds of element need the same styles, separate their selectors with commas. This is called a selector list, and the declarations apply to everything that any one of the selectors matches.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: "h1, h2, h3 {\n  color: #1e1b4b;\n}",
            note: "One rule styles all three headings, and you change the colour in a single place.",
          },
          bad: {
            code: "h1 { color: #1e1b4b; }\nh2 { color: #1e1b4b; }\nh3 { color: #1e1b4b; }",
            note: "The same result, but three places to update, and it is easy to change two and forget the third.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Reach for classes first when styling. Type selectors are very broad, and ids are so specific that they are hard to override later.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A rule is a selector plus a block of declarations in curly braces.",
            "A type selector is an element name, a class selector starts with a dot, and an id selector starts with a hash.",
            "Commas group selectors so one rule can style several things.",
            "A selector that matches nothing styles nothing, and the browser shows no error.",
          ],
        },
      ],
    },
    {
      id: "classes-ids-and-attributes",
      kind: "learn",
      title: "Classes, ids and attributes",
      summary: "Label elements with classes, name one with an id, and match elements by their attributes.",
      minutes: 9,
      concept: {
        description:
          "Classes label groups of elements, an id names one unique element, and attribute selectors pick elements by the attributes they carry. Together they let you aim CSS precisely without changing your page's structure.",
        why: "Real pages mix many kinds of content, and type selectors alone are too blunt. Classes give you precise, reusable handles, and attribute selectors save you from adding a class to every element that already says what it is.",
        mentalModel:
          "A class is a sticker you can put on many things. An id is a name tag, and only one thing gets each name.",
      },
      body: [
        { type: "heading", text: "Classes: reusable labels" },
        {
          type: "paragraph",
          text: "Any element can have a `class` attribute, and one element can have several classes separated by spaces. Many elements can share the same class, which is what makes classes the workhorse of CSS.",
        },
        {
          type: "code",
          language: "html",
          code: '<div class="card">A normal card</div>\n<div class="card featured">A featured card</div>',
        },
        {
          type: "code",
          language: "css",
          code: ".card {\n  padding: 16px;\n}\n\n.card.featured {\n  border: 2px solid #4f46e5;\n}",
          caption: "Two classes joined with no space means: has both",
        },
        { type: "heading", text: "Ids: one of a kind" },
        {
          type: "paragraph",
          text: "An `id` names a single element, and it must be unique on the page. Ids are useful as link targets and for connecting a label to a form field. For styling they are a poor choice, because an id selector is so specific that it overrides your class rules and is awkward to override in turn.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".button-primary {\n  background: #4f46e5;\n}",
            note: "A class can be reused on every primary button, and is easy to override when you need to.",
          },
          bad: {
            code: "#save-button {\n  background: #4f46e5;\n}",
            note: "This only works on one element, and its specificity makes later overrides harder.",
          },
        },
        { type: "heading", text: "Attribute selectors" },
        {
          type: "paragraph",
          text: "Attribute selectors match elements by an attribute they already have, written in square brackets. They are perfect for form fields and links, where the element's own attributes describe what it is.",
        },
        {
          type: "list",
          items: [
            "`[disabled]` matches any element that has a `disabled` attribute.",
            "`[type=\"email\"]` matches elements whose `type` is exactly `email`.",
            "`[href^=\"https\"]` matches an `href` that starts with `https`.",
            "`[href$=\".pdf\"]` matches an `href` that ends with `.pdf`.",
            "`[class*=\"icon\"]` matches a `class` that contains `icon` anywhere.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          text: "A space changes the meaning completely. `.card.featured` means one element with both classes, but `.card .featured` means a `.featured` element somewhere inside a `.card`.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A class can be shared by many elements, and one element can have several classes.",
            "`.a.b` with no space means an element that has both classes.",
            "An id must be unique, and is better for links and labels than for styling.",
            "Attribute selectors such as `[href^=\"https\"]` match elements by the attributes they already have.",
          ],
        },
      ],
    },
    {
      id: "combinators",
      kind: "learn",
      title: "Combinators: styling by relationship",
      summary: "Select elements by where they sit in the page: inside, directly inside, or next to another element.",
      minutes: 9,
      concept: {
        description:
          "Combinators join selectors to describe how elements are related in the HTML tree: the descendant combinator (a space), the child combinator (`>`), the adjacent sibling combinator (`+`) and the general sibling combinator (`~`).",
        why: "Combinators let you style an element because of where it sits, such as only the links inside the navigation, without adding a class to every single one. That keeps your HTML clean and your CSS short.",
        mentalModel:
          "Think of a family tree. A descendant is any relative below you, a child is directly below you, and a sibling shares your parent.",
      },
      body: [
        { type: "heading", text: "Descendant and child" },
        {
          type: "paragraph",
          text: "A space between two selectors is the **descendant combinator**: `nav a` matches any link anywhere inside a `nav`, however deeply nested. The `>` symbol is the **child combinator**, which is stricter: `nav > a` matches only links that are direct children of the `nav`.",
        },
        {
          type: "code",
          language: "html",
          code: "<nav>\n  <a>Home</a>\n  <ul>\n    <li><a>Lakes</a></li>\n  </ul>\n</nav>",
          caption: "Home is a child of nav. Lakes is only a descendant",
        },
        {
          type: "paragraph",
          text: "In that HTML, `nav a` matches both links, because both are inside the `nav`. But `nav > a` matches only Home, because the Lakes link sits inside a list item, one level further down.",
        },
        { type: "heading", text: "Siblings" },
        {
          type: "paragraph",
          text: "Siblings are elements that share the same parent. The **adjacent sibling combinator** `+` matches an element that comes immediately after another, so `h2 + p` is the paragraph directly after a heading. The **general sibling combinator** `~` is looser: `h2 ~ p` matches every paragraph that comes after an `h2`, as long as they share a parent.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: ".menu > li {\n  padding: 8px;\n}",
            note: "Only the top-level items are styled. Items in a nested submenu are left alone.",
          },
          bad: {
            code: ".menu li {\n  padding: 8px;\n}",
            note: "This also matches every `li` in any nested submenu, which is rarely what you wanted.",
          },
        },
        { type: "heading", text: "Keep selectors short" },
        {
          type: "paragraph",
          text: "It is tempting to describe an element by its whole ancestry, like `div ul li a span`. Long chains work, but they are fragile: as soon as the HTML structure changes, the selector stops matching. A short selector, usually one class, survives restructuring.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "If you find yourself writing a selector with more than three parts, add a class to the element in the HTML and use that instead.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A space (descendant) matches anything inside, at any depth.",
            "`>` (child) matches only direct children.",
            "`+` matches the very next sibling, and `~` matches every later sibling.",
            "Short selectors, usually a single class, survive changes to your HTML better than long chains.",
          ],
        },
      ],
    },
    {
      id: "predict-the-selector",
      kind: "predict",
      title: "Predict what gets selected",
      summary: "Work out which elements each selector matches before you run the code.",
      minutes: 6,
      mode: "css",
      intro:
        "This navigation has links at two levels. Three rules style different groups of them. Decide which links each selector reaches, then run the code to check.",
      code: {
        html: '<nav class="menu">\n  <a href="/">Home</a>\n  <a href="/trails" class="active">Trails</a>\n  <ul>\n    <li><a href="/trails/lakes">Lakes</a></li>\n    <li><a href="/trails/peaks" class="active">Peaks</a></li>\n  </ul>\n</nav>',
        css: ".menu > a {\n  color: crimson;\n}\n\n.menu a {\n  text-decoration: underline;\n}\n\na.active {\n  font-weight: bold;\n}",
      },
      questions: [
        {
          prompt: "Which links does `.menu > a` select?",
          options: ["All four links", "Home and Trails only", "Lakes and Peaks only", "Only the links with the class `active`"],
          answerIndex: 1,
          hint: "The `>` means a direct child. Which links sit directly inside the `nav`?",
          explanation: "Home and Trails are direct children of `.menu`. Lakes and Peaks are inside a list, so they are descendants but not children.",
          proves: [{ type: "count", selector: ".menu > a", min: 2, max: 2, message: "`.menu > a` matches exactly two links." }],
        },
        {
          prompt: "How many links does `.menu a` (with a space) select?",
          options: ["Two, because it only matches direct children", "Zero, because it needs a class", "Four, because a space matches any descendant", "One, because it matches only the first link"],
          answerIndex: 2,
          hint: "A space is the descendant combinator. Does it care how deep the link is?",
          explanation: "A space matches descendants at any depth, so every link inside `.menu` is selected, all four of them.",
          proves: [{ type: "count", selector: ".menu a", min: 4, max: 4, message: "`.menu a` matches all four links." }],
        },
        {
          prompt: "Which links does `a.active` select?",
          options: ["Trails and Peaks", "Only Trails", "Only Peaks", "Home and Lakes"],
          answerIndex: 0,
          hint: "There is no space, so this means an `a` that also has the class `active`.",
          explanation: "`a.active` matches a link that has the class `active`, wherever it is. Both Trails and Peaks carry it, at different depths.",
          proves: [{ type: "count", selector: "a.active", min: 2, max: 2, message: "`a.active` matches exactly two links." }],
        },
      ],
    },
    // Guided build: step files live in ./selectors/workshops/build-a-recipe-page (compiled by `npm run build:content`).
    buildARecipePage,
    {
      id: "debug-the-missing-styles",
      kind: "debug",
      title: "Debug: the styles that never apply",
      summary: "Every declaration is correct, but nothing happens. Find the selectors that match nothing.",
      minutes: 7,
      mode: "css",
      broken: {
        html: '<ul class="tags">\n  <li class="tag">html</li>\n  <li class="tag">css</li>\n  <li class="tag">tailwind</li>\n</ul>',
        css: "body { font-family: system-ui, sans-serif; padding: 16px; }\n\nul {\n  display: flex;\n  gap: 8px;\n  padding: 0;\n  list-style: none;\n}\n\n.tag-list li {\n  background: #ede9fe;\n  color: #5b21b6;\n  padding: 2px 10px;\n  border-radius: 999px;\n}\n\n#tag {\n  font-weight: 600;\n}\n",
      },
      challenge: {
        title: "Make the tags look like pills",
        description:
          "The three tags should be small purple pills with bold text, like the expected result. Instead they are plain text. Nothing is wrong with the declarations themselves: the problem is that two of the selectors don't match anything in the HTML.",
        hints: [
          "Read the HTML tab and compare it with each selector. Which elements actually have the class `tag-list`? Which element has the id `tag`?",
          "A selector only styles what it matches. The list is called `tags` (not `tag-list`), and each item has a class called `tag`, not an id.",
          "Change `.tag-list li` to `.tags li` (or just `.tag`), and change `#tag`, an id selector, to `.tag`, a class selector.",
        ],
        checks: [
          { type: "computedStyle", selector: ".tag", property: "background-color", expected: "#ede9fe", match: "all", message: "Every tag has the light purple background." },
          { type: "computedStyle", selector: ".tag", property: "color", expected: "#5b21b6", match: "all", message: "Every tag has the dark purple text." },
          { type: "computedStyle", selector: ".tag", property: "border-radius", expected: "999px", match: "all", message: "Every tag has fully rounded corners." },
          { type: "computedStyle", selector: ".tag", property: "font-weight", expected: "600", match: "all", message: "Every tag is semi-bold." },
        ],
        solution: {
          html: '<ul class="tags">\n  <li class="tag">html</li>\n  <li class="tag">css</li>\n  <li class="tag">tailwind</li>\n</ul>',
          css: "body { font-family: system-ui, sans-serif; padding: 16px; }\n\nul {\n  display: flex;\n  gap: 8px;\n  padding: 0;\n  list-style: none;\n}\n\n.tags li {\n  background: #ede9fe;\n  color: #5b21b6;\n  padding: 2px 10px;\n  border-radius: 999px;\n}\n\n.tag {\n  font-weight: 600;\n}\n",
        },
      },
    },
    {
      id: "selectors-quiz",
      kind: "quiz",
      title: "Quiz: selectors",
      summary: "Ten questions on selectors, classes, ids, attributes and combinators.",
      minutes: 8,
      passPercent: 70,
      questions: [
        {
          prompt: "In the rule `h2 { color: red; }`, which part is the selector?",
          options: ["`color: red`", "`h2`", "`{ }`", "`red`"],
          answerIndex: 1,
          explanation: "The selector is the part before the curly braces. It says which elements the declarations apply to.",
        },
        {
          prompt: "Which selector picks every element that has `class=\"note\"`?",
          options: ["`#note`", "`note`", "`.note`", "`*note`"],
          answerIndex: 2,
          explanation: "A class selector is a dot followed by the class name. `#note` would look for an id, and `note` would look for an element called `note`.",
        },
        {
          prompt: "How many elements may share one `id` on a valid page?",
          options: ["None", "As many as you like", "Up to three", "Exactly one"],
          answerIndex: 3,
          explanation: "An id must be unique on the page. If you need to style several elements the same way, use a class.",
        },
        {
          prompt: "What does `h1, h2, h3 { margin: 0; }` do?",
          options: ["It styles only `h1` elements that contain an `h2`", "It applies the same declaration to all three kinds of heading", "It selects `h2` and `h3` elements inside an `h1`", "It is invalid CSS"],
          answerIndex: 1,
          explanation: "Commas separate a list of selectors. The rule applies to everything matched by any one of them.",
        },
        {
          prompt: "What is the difference between `.card .featured` and `.card.featured`?",
          options: ["There is no difference", "The first matches elements with both classes, and the second matches nested elements", "The second is invalid CSS", "The first matches a `.featured` element inside a `.card`, and the second matches one element that has both classes"],
          answerIndex: 3,
          explanation: "A space means descendant. No space means both classes on the same element. It is a small difference in the CSS and a big one in the result.",
        },
        {
          prompt: "Which selector picks only the direct child links of `.menu`?",
          options: ["`.menu a`", "`.menu + a`", "`.menu > a`", "`.menu ~ a`"],
          answerIndex: 2,
          explanation: "`>` is the child combinator. A space would also match links nested deeper inside the menu.",
        },
        {
          prompt: "What does `a[href^=\"https\"]` select?",
          options: ["Links whose `href` starts with `https`", "Links whose `href` ends with `https`", "Links whose `href` contains `https` anywhere", "Links that have an id of `https`"],
          answerIndex: 0,
          explanation: "`^=` means \"starts with\". Use `$=` for \"ends with\" and `*=` for \"contains\".",
        },
        {
          prompt: "Which selector matches the paragraph that comes immediately after an `h2`?",
          options: ["`h2 > p`", "`h2 p`", "`h2 ~ p`", "`h2 + p`"],
          answerIndex: 3,
          explanation: "`+` is the adjacent sibling combinator: the very next element with the same parent. `~` would match every later paragraph.",
        },
        {
          prompt: "Why is styling with ids generally discouraged?",
          options: ["Ids are slower for the browser", "An id selector is so specific that it is hard to override later", "Ids cannot be used in CSS", "Ids only work on headings"],
          answerIndex: 1,
          explanation: "Id selectors beat class selectors, so any later override needs an even stronger selector. Classes keep your CSS flexible.",
        },
        {
          prompt: "Why is a short selector like `.nav-link` usually better than `div ul li a`?",
          options: ["Short selectors are quicker to type", "The long one is invalid", "The long one breaks as soon as the HTML structure changes", "The short one always has higher priority"],
          answerIndex: 2,
          explanation: "A long chain is tied to the exact structure of your HTML. A single class keeps working when you rearrange the markup.",
        },
      ],
    },
    {
      id: "selectors-review",
      kind: "review",
      title: "Review: selectors cheat sheet",
      summary: "Every selector from this topic on one page.",
      minutes: 3,
      body: [
        { type: "heading", text: "The selectors" },
        {
          type: "code",
          language: "css",
          code: "p            { }  /* type: every <p> */\n.note        { }  /* class: class=\"note\" */\n#main        { }  /* id: id=\"main\" (one element) */\n*            { }  /* every element */\nh1, h2, h3   { }  /* list: any of these */\n.a.b         { }  /* both classes on one element */\n.a .b        { }  /* .b anywhere inside .a */\n.a > .b      { }  /* .b directly inside .a */\nh2 + p       { }  /* a p right after an h2 */\nh2 ~ p       { }  /* every p after an h2 */\n[disabled]   { }  /* has the attribute */\na[href^=\"https\"] { }  /* href starts with https */\na[href$=\".pdf\"] { }   /* href ends with .pdf */",
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "A rule is a selector plus declarations, and a selector that matches nothing fails silently.",
            "Prefer classes for styling. Ids are unique and very specific, so they are better for links and labels.",
            "A space changes everything: `.a.b` is one element with both classes, but `.a .b` is nested.",
            "`>` is direct children only, and a space is any depth.",
            "Keep selectors short. If you need more than three parts, add a class.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "When a style isn't applying, check the selector first: open the element in your browser's Inspect tool and see whether your rule is even listed.",
        },
      ],
    },
  ],
};

export default content;
