import type { TopicContent } from "@/engine/types";
import buildATrailPage from "./document-structure/workshops/build-a-trail-page/workshop.generated";

/**
 * HTML > Beginner > Document structure.
 * This topic is the reference for how detailed a Learn lesson should be:
 * see CONTENT_GUIDE.md.
 */
const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: "what-is-html",
      kind: "learn",
      title: "What HTML really is",
      summary: "HTML labels the meaning of content. Learn what the browser does with it and why that matters.",
      minutes: 8,
      concept: {
        description:
          "HTML (HyperText Markup Language) is the language you use to describe what each part of a web page is: a heading, a paragraph, a link, an image, a button. It says nothing about how things look or what they do. It only says what they mean.",
        why: "Browsers, search engines, screen readers and translation tools all read your HTML to understand your page. The clearer the meaning you give them, the better everything built on top of it works, including your CSS and JavaScript.",
        mentalModel:
          "HTML is the nouns of a page. CSS adds the adjectives (how it looks), and JavaScript adds the verbs (what it does). Start with the right nouns.",
      },
      body: [
        { type: "heading", text: "Markup, not programming" },
        {
          type: "paragraph",
          text: "HTML is a markup language. It has no variables, loops or conditions, so it can't calculate anything. You write ordinary text and wrap the parts that need a label in tags, the way an editor marks up a manuscript with notes like \"heading\" or \"quote\".",
        },
        {
          type: "paragraph",
          text: "A web page is made from three languages that each do one job. Keeping the jobs separate is what makes websites easy to change later.",
        },
        {
          type: "list",
          items: [
            "**HTML** says what the content is: a heading, a list, a link, a form.",
            "**CSS** says how it looks: colors, spacing, fonts and layout.",
            "**JavaScript** says what it does: react to clicks, load data, update the page.",
          ],
        },
        { type: "heading", text: "What the browser does with your HTML" },
        {
          type: "paragraph",
          text: "Your HTML is just a text file. When someone opens your page, the browser turns that text into something they can see and use. Knowing these steps helps you understand every bug you'll meet later.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "It downloads the HTML file from the server (or reads it from your computer).",
            "It parses the text, building a tree of objects called the **DOM** (Document Object Model). Each tag becomes a node, and nested tags become children.",
            "It downloads and applies your CSS to the nodes in that tree.",
            "It paints the result on the screen, and keeps the DOM ready for JavaScript to change.",
          ],
        },
        {
          type: "code",
          language: "html",
          code: "<!-- This text file... -->\n<h1>Trail Guide</h1>\n<p>Find your next hike.</p>\n\n<!-- ...becomes a tree: a heading node and a paragraph node, side by side. -->",
          caption: "Tags become nodes in the DOM",
        },
        {
          type: "callout",
          tone: "note",
          text: "Browsers are very forgiving. If your HTML has mistakes, the browser guesses what you meant and carries on, without showing an error. That is friendly, but it means bugs can hide, so you need to learn to write clean HTML on purpose.",
        },
        { type: "heading", text: "Why meaning matters more than looks" },
        {
          type: "paragraph",
          text: "You can make almost anything look like a button with CSS. But a real button comes with abilities for free: it can be reached with the keyboard, activated with Enter or Space, and announced as a \"button\" by a screen reader. A decorated `div` has none of that.",
        },
        {
          type: "compare",
          language: "html",
          good: {
            code: "<button>Subscribe</button>",
            note: "The browser already knows this is a button. Keyboard and screen reader support come built in.",
          },
          bad: {
            code: '<div class="button">Subscribe</div>',
            note: "It may look the same after styling, but the browser sees a generic box. You would have to rebuild every behavior by hand.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Before reaching for a `div`, ask: \"Is there an HTML element that already means this?\" There usually is, and using it is the cheapest way to make a page accessible.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "HTML describes the meaning and structure of content. It is not for styling.",
            "The browser parses your HTML into a tree (the DOM), then styles and paints it.",
            "Browsers forgive mistakes silently, so clean, intentional HTML matters.",
            "Use the element that matches the meaning, and you get accessibility for free.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "tags-elements-attributes",
      kind: "learn",
      title: "Tags, elements and attributes",
      summary: "The three building blocks of every line of HTML, and the rules for writing them cleanly.",
      minutes: 9,
      concept: {
        description:
          "Almost everything in HTML is an element. An element is made of an opening tag, some content and a closing tag. Tags can carry attributes, which are extra settings written as name=\"value\" pairs inside the opening tag.",
        why: "Every HTML page you will ever read or write is built from these three pieces. Once you can read one element confidently, you can read them all.",
        mentalModel:
          "A tag is a label, an element is the labeled thing (label plus contents), and an attribute is a note on the label that adjusts how the thing behaves.",
      },
      body: [
        { type: "heading", text: "Anatomy of an element" },
        {
          type: "code",
          language: "html",
          code: '<a href="https://example.com" target="_blank">Visit the site</a>',
          caption: "A link element",
        },
        {
          type: "paragraph",
          text: "Take that link apart and you find four pieces. Learn their names now, because documentation, tutorials and error messages use them constantly.",
        },
        {
          type: "list",
          items: [
            "**Opening tag**: `<a href=\"...\" target=\"_blank\">`. It names the element and holds its attributes.",
            "**Attributes**: `href` and `target`. Each is a name, an equals sign and a value in quotes.",
            "**Content**: `Visit the site`, the text (or other elements) between the tags.",
            "**Closing tag**: `</a>`. It repeats the name with a slash in front.",
          ],
        },
        {
          type: "paragraph",
          text: "People often say \"tag\" and \"element\" as if they were the same thing. Strictly, the tags are the markers, and the element is the whole thing: opening tag, content and closing tag together.",
        },
        { type: "heading", text: "Elements with no content" },
        {
          type: "paragraph",
          text: "Some elements can never contain anything, so they have no closing tag. They are called void elements. You will meet these often: `img` (an image), `br` (a line break), `hr` (a horizontal rule), `input` (a form field) and `meta` (page information).",
        },
        {
          type: "code",
          language: "html",
          code: '<img src="trail.jpg" alt="A path winding through pine trees" />\n<br />\n<input type="email" name="email" />',
          caption: "Void elements stand alone",
        },
        { type: "heading", text: "Attributes you will use everywhere" },
        {
          type: "paragraph",
          text: "Some attributes belong to specific elements, like `href` on links or `src` on images. Others, called global attributes, work on any element:",
        },
        {
          type: "list",
          items: [
            "`id`: a unique name for one element on the page (used for links and styling).",
            "`class`: a shared name for any number of elements, mainly used by CSS.",
            "`lang`: the language of the content, such as `en` or `fr`.",
            "`title`: extra information, shown as a tooltip on hover. Use it sparingly.",
            "`hidden`: hides the element from view.",
          ],
        },
        {
          type: "paragraph",
          text: "A few attributes have no value at all. Writing `disabled` or `required` on its own is enough to switch them on. These are called boolean attributes.",
        },
        { type: "heading", text: "Writing it cleanly" },
        {
          type: "compare",
          language: "html",
          good: {
            code: '<img src="cat.jpg" alt="A grey cat" />',
            note: "Lowercase names, quoted values, and an `alt` describing the image.",
          },
          bad: {
            code: "<IMG SRC=cat.jpg>",
            note: "This often works, but uppercase and unquoted values break down the moment a value has a space in it.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "Every `id` must be unique on its page. Two elements sharing an id cause baffling bugs, because links and scripts only ever find the first one.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Forgot a closing tag and everything below looks wrong? Check the closing tags first. A single missing `</div>` is the most common beginner bug.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "An element is an opening tag, content and a closing tag.",
            "Attributes live in the opening tag as `name=\"value\"` pairs.",
            "Void elements like `img` and `br` have no content and no closing tag.",
            "Write lowercase names, quote your values, and keep every `id` unique.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "page-skeleton",
      kind: "learn",
      title: "The page skeleton",
      summary: "The doctype, html, head and body: the outline every HTML page shares.",
      minutes: 9,
      concept: {
        description:
          "Every complete HTML page starts with a doctype, then one html element. Inside it are exactly two children: a head, which holds information about the page, and a body, which holds everything visitors see.",
        why: "Without a doctype the browser falls back to an old compatibility mode that renders pages unpredictably. Without a lang attribute, screen readers may pronounce your text in the wrong language.",
        mentalModel:
          "Think of a book. The head is the cover and catalog card (title, language, details about the book). The body is the pages you actually read.",
      },
      body: [
        { type: "heading", text: "The minimum viable page" },
        {
          type: "code",
          language: "html",
          code: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>My page</title>\n  </head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>',
          caption: "A complete page, top to bottom",
        },
        {
          type: "paragraph",
          text: "Almost every page on the web starts from a block like this. Here is what each part does, in the order it appears.",
        },
        {
          type: "list",
          items: [
            "`<!doctype html>`: tells the browser to use modern standards mode. It is not an element, and it always comes first.",
            "`<html lang=\"en\">`: the root element that wraps the whole page. The `lang` attribute names the language of the content.",
            "`<head>`: information about the page that isn't shown in the page itself.",
            "`<body>`: everything visitors see and use: text, images, links, forms.",
          ],
        },
        { type: "heading", text: "Why the doctype matters" },
        {
          type: "paragraph",
          text: "Before standards existed, every browser rendered pages in its own way, and old sites depended on those quirks. To avoid breaking them, browsers keep a \"quirks mode\" for pages that don't declare a modern doctype. Spacing and sizing behave differently there, which causes confusing CSS bugs.",
        },
        {
          type: "compare",
          language: "html",
          good: {
            code: "<!doctype html>\n<html lang=\"en\">\n  ...\n</html>",
            note: "Standards mode, with the language declared. CSS behaves the way the documentation says.",
          },
          bad: {
            code: "<html>\n  ...\n</html>",
            note: "No doctype puts the browser in quirks mode, and no `lang` leaves screen readers guessing.",
          },
        },
        { type: "heading", text: "Why lang is worth the six characters" },
        {
          type: "paragraph",
          text: "Screen readers use `lang` to choose the correct pronunciation. Translation tools use it to decide whether to offer a translation, and browsers use it to pick the right hyphenation and quote marks. It costs almost nothing, and it helps real people.",
        },
        {
          type: "callout",
          tone: "note",
          text: "Page content belongs in the `body`. If a heading or paragraph lands in the `head` by mistake, the browser quietly moves it to the body for you, which can hide the mistake in your own code.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Start with `<!doctype html>`, then a single `<html lang=\"...\">` element.",
            "The `html` element holds exactly one `head` and one `body`.",
            "The `head` describes the page. The `body` is the page.",
            "Skipping the doctype or `lang` is easy to do and costs you accessibility and predictability.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "inside-the-head",
      kind: "learn",
      title: "What lives in the head",
      summary: "Character encoding, the viewport, the title and the other quiet details that make a page work.",
      minutes: 9,
      concept: {
        description:
          "The head holds information about your page: its title, its character encoding, how it should scale on a phone, and links to styles and scripts. None of it appears in the page itself, but a page without it works poorly.",
        why: "The head decides how your page appears in browser tabs, search results and shared links, and whether it displays correctly on a phone. Small omissions here cause big, hard-to-trace problems.",
        mentalModel:
          "The head is the page's instructions to the browser. The body is the content. The head talks to machines, and the body talks to people.",
      },
      body: [
        { type: "heading", text: "The essential three" },
        {
          type: "paragraph",
          text: "Three things belong in the head of every page you build. Learn them as a habit.",
        },
        {
          type: "code",
          language: "html",
          code: '<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <title>Trail Guide: find your next hike</title>\n</head>',
          caption: "Encoding, viewport and title",
        },
        {
          type: "list",
          items: [
            "**`<meta charset=\"UTF-8\">`** tells the browser how to read the characters in your file. Without it, accents, emoji and symbols can turn into garbled text. Put it first, near the top of the head.",
            "**`<meta name=\"viewport\" ...>`** tells phones to use the real screen width instead of pretending to be a wide desktop. Responsive CSS only works properly when this is present.",
            "**`<title>`** sets the text shown in the browser tab, in bookmarks and as the headline in search results. Every page needs one.",
          ],
        },
        { type: "heading", text: "Writing a good title" },
        {
          type: "list",
          items: [
            "Make it unique. Two pages with the same title are hard to tell apart in tabs and search results.",
            "Put the most important words first, and keep it under about 60 characters so it isn't cut off.",
            "Describe the page, not the site alone: `Pricing - Trail Guide` is more useful than just `Trail Guide`.",
          ],
        },
        { type: "heading", text: "Other things you will find in a head" },
        {
          type: "code",
          language: "html",
          code: '<meta name="description" content="Find hikes near you, with trail maps and difficulty ratings." />\n<link rel="stylesheet" href="styles.css" />\n<link rel="icon" href="favicon.svg" />\n<script src="app.js" defer></script>',
          caption: "A description, styles, an icon and a script",
        },
        {
          type: "list",
          items: [
            "`meta name=\"description\"`: a short summary that search engines often show under your title.",
            "`link rel=\"stylesheet\"`: connects a CSS file to the page.",
            "`link rel=\"icon\"`: the small picture shown in the browser tab.",
            "`script`: loads JavaScript. The `defer` attribute makes it wait until the page is ready, so it never blocks the content.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          text: "Forgetting the viewport meta tag is the classic reason a mobile page looks like a tiny zoomed-out desktop site, even when the CSS is correct.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Every page needs a charset, a viewport and a unique, descriptive title.",
            "The head also connects styles, scripts, icons and a description for search results.",
            "Nothing in the head is shown on the page itself, but the browser and search engines rely on it.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "nesting-whitespace-comments",
      kind: "learn",
      title: "Nesting, whitespace and comments",
      summary: "How elements fit inside one another, how browsers treat spaces, and how to leave notes for yourself.",
      minutes: 9,
      concept: {
        description:
          "Elements nest: one element can sit inside another, forming a tree. The browser also ignores most of the spacing and line breaks you type, and lets you leave comments that never appear on the page.",
        why: "Badly nested HTML is the source of many layout bugs, and misunderstanding whitespace leads to the \"why won't my text break here?\" confusion that every beginner meets.",
        mentalModel:
          "Nesting is like a set of boxes: an inner box must be fully closed before you close the box around it. Whitespace is just breathing room in your code. The browser decides the spacing you see.",
      },
      body: [
        { type: "heading", text: "Nesting: elements inside elements" },
        {
          type: "paragraph",
          text: "When one element sits inside another, the inner one is the child and the outer one is the parent. The golden rule is simple: close tags in the reverse order you opened them.",
        },
        {
          type: "compare",
          language: "html",
          good: {
            code: "<p>Hiking is <strong>great</strong> fun.</p>",
            note: "`strong` opens and closes entirely inside the `p`.",
          },
          bad: {
            code: "<p>Hiking is <strong>great fun.</p></strong>",
            note: "The tags overlap. Browsers try to repair this, but the result is unpredictable.",
          },
        },
        {
          type: "paragraph",
          text: "Some nesting is simply not allowed. A `p` can't contain another `p` or a `div`, and a `ul` should contain only `li` elements directly. When the browser meets an invalid arrangement, it silently rearranges your tree, which is why you sometimes find elements in a different place than you wrote them.",
        },
        { type: "heading", text: "Indentation makes the tree visible" },
        {
          type: "paragraph",
          text: "Indent each level of nesting by two or four spaces. The browser doesn't care, but you will, because the shape of your code then matches the shape of the tree, and a missing closing tag becomes easy to spot.",
        },
        {
          type: "code",
          language: "html",
          code: "<ul>\n  <li>Lakes</li>\n  <li>\n    Mountains\n    <ul>\n      <li>Day hikes</li>\n      <li>Summits</li>\n    </ul>\n  </li>\n</ul>",
          caption: "Each level of nesting is one indent deeper",
        },
        { type: "heading", text: "Whitespace gets collapsed" },
        {
          type: "paragraph",
          text: "In HTML, any run of spaces, tabs and line breaks is treated as one single space when the page is displayed. You can therefore format your code freely without changing how it looks.",
        },
        {
          type: "code",
          language: "html",
          code: "<p>Hello,\n\n\n      world     !</p>\n<!-- Displays as: Hello, world ! -->",
          caption: "Extra spacing is collapsed",
        },
        {
          type: "callout",
          tone: "tip",
          text: "To force a line break inside text, use `<br />`. To separate blocks of content, use separate elements such as paragraphs. Don't use blank lines or repeated spaces for layout. CSS handles spacing.",
        },
        { type: "heading", text: "Comments and special characters" },
        {
          type: "paragraph",
          text: "A comment starts with `<!--` and ends with `-->`. The browser skips everything inside, so comments are perfect for notes, section labels, or temporarily switching off a piece of markup.",
        },
        {
          type: "paragraph",
          text: "Because `<` starts a tag, you can't type it directly as text. Use an entity instead: `&lt;` for the less-than sign, `&gt;` for greater-than, `&amp;` for an ampersand and `&quot;` for a quote mark.",
        },
        {
          type: "code",
          language: "html",
          code: "<!-- Main navigation starts here -->\n<p>To make a paragraph, write &lt;p&gt; before your text.</p>",
          caption: "A comment and two entities",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Close tags in the reverse order you opened them, and never let tags overlap.",
            "Indent each level of nesting so your code mirrors the tree.",
            "The browser collapses extra whitespace into one space. Use elements and CSS for layout.",
            "Use `<!-- comments -->` for notes, and entities like `&lt;` to show special characters.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    // Guided build: step files live in ./document-structure/workshops/build-a-trail-page
    // (compiled by `npm run build:content`).
    buildATrailPage,

    /* ------------------------------------------------------------------ */
    {
      id: "build-the-skeleton",
      kind: "lab",
      title: "Lab: build the skeleton",
      summary: "Turn a bare fragment into a complete, well-formed HTML page.",
      minutes: 10,
      mode: "html",
      starter: {
        html: "<html>\n  <body>\n    <h1>Hello, web</h1>\n    <p>This page is missing its skeleton.</p>\n  </body>\n</html>",
        css: "",
      },
      challenge: {
        title: "Give the page a proper skeleton",
        description:
          "The page below shows its content but is missing almost everything a real page needs. Add the doctype, set the language, and fill in the `head`. Leave the heading and paragraph in the body as they are.",
        hints: [
          "Add `<!doctype html>` as the very first line, before the `html` element.",
          "The language goes on the `html` element as an attribute: `<html lang=\"en\">`.",
          "Add a `<head>` element between `<html>` and `<body>`. It should contain two `meta` tags and a `title`.",
          "The charset tag is `<meta charset=\"UTF-8\" />`. The viewport tag is `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />`.",
        ],
        checks: [
          { type: "doctype", message: "The page starts with `<!doctype html>`." },
          { type: "attribute", selector: "html", attribute: "lang", expected: "en", message: "The `html` element declares `lang=\"en\"`." },
          { type: "exists", selector: "head > meta[charset]", message: "The head declares a character encoding with `meta charset`." },
          { type: "exists", selector: 'head > meta[name="viewport"]', message: "The head includes a `viewport` meta tag." },
          { type: "text", selector: "head > title", includes: "My First Page", message: "The title is \"My First Page\"." },
          { type: "text", selector: "body > h1", includes: "Hello, web", message: "The body still contains the \"Hello, web\" heading." },
          { type: "exists", selector: "body > p", message: "The body still contains the paragraph." },
        ],
        solution: {
          html: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, web</h1>\n    <p>This page now has a complete skeleton.</p>\n  </body>\n</html>',
          css: "",
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-cafe-menu",
      kind: "debug",
      title: "Debug: the cafe menu page",
      summary: "An accessibility audit found six problems. Find and fix them all.",
      minutes: 10,
      mode: "html",
      broken: {
        html: '<html>\n  <head>\n    <title>Cafe Menu</title>\n  </head>\n  <body>\n    <h1>Cafe Menu</h1>\n    <h3>Drinks</h3>\n    <ul>\n      <li>Coffee</li>\n      <li>Tea</li>\n    </ul>\n    <img src="cup.jpg">\n    <label>Your name</label>\n    <input type="text">\n  </body>\n</html>',
        css: "",
      },
      challenge: {
        title: "Fix the menu page",
        description:
          "This cafe menu looks fine, but an audit found six problems with its structure and accessibility: some in the page skeleton, and some that would trip up a screen reader. Fix them without removing any of the content.",
        hints: [
          "Count them: the page skeleton has three problems (the top of the file, the `html` tag, and the `head`), and there are three accessibility problems (headings, an image, a form field).",
          "After an `h1`, the next heading level is `h2`, never `h3`. Headings are an outline, and you can't skip a level.",
          "A label connects to its field when the label's `for` matches the field's `id`. An image needs an `alt` that describes what it shows.",
        ],
        checks: [
          { type: "doctype", message: "The page starts with a doctype." },
          { type: "attribute", selector: "html", attribute: "lang", message: "The `html` element declares a language." },
          { type: "exists", selector: "head > meta[charset]", message: "The head declares a character encoding." },
          { type: "a11y", rule: "heading-order", message: "Headings go in order, without skipping a level." },
          { type: "a11y", rule: "img-alt", message: "Every image has alt text." },
          { type: "a11y", rule: "label-for-input", message: "Every form field has a label." },
          { type: "count", selector: "ul > li", min: 2, message: "The drinks list still has its items." },
        ],
        solution: {
          html: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Cafe Menu</title>\n  </head>\n  <body>\n    <h1>Cafe Menu</h1>\n    <h2>Drinks</h2>\n    <ul>\n      <li>Coffee</li>\n      <li>Tea</li>\n    </ul>\n    <img src="cup.jpg" alt="A steaming cup of coffee" />\n    <label for="name">Your name</label>\n    <input type="text" id="name">\n  </body>\n</html>',
          css: "",
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "document-structure-quiz",
      kind: "quiz",
      title: "Quiz: document structure",
      summary: "Ten questions to check you've got the skeleton, the head, elements and nesting.",
      minutes: 8,
      passPercent: 70,
      questions: [
        {
          prompt: "What does `<!doctype html>` do?",
          options: ["Links the page to a stylesheet", "Tells the browser to use modern standards mode", "Sets the page's language", "Adds a title to the browser tab"],
          answerIndex: 1,
          explanation: "Without a doctype the browser falls back to quirks mode, an old compatibility mode that renders spacing and sizing unpredictably.",
        },
        {
          prompt: "Which attribute tells screen readers what language the page is written in?",
          options: ["`lang` on the `html` element", "`charset` on a `meta` tag", "`title` on the `body`", "`name` on the `head`"],
          answerIndex: 0,
          explanation: "`lang` on the `html` element declares the language. Screen readers use it to choose pronunciation, and browsers use it for translation.",
        },
        {
          prompt: "Where does the text shown in the browser tab come from?",
          options: ["The first `h1` in the `body`", "The name of the file", "The `title` element in the `head`", "The `meta charset` tag"],
          answerIndex: 2,
          explanation: "The `title` element inside the `head` sets the tab text, the bookmark name, and the headline in search results.",
        },
        {
          prompt: "Which of these elements has no closing tag?",
          options: ["`img`", "`p`", "`li`", "`h1`"],
          answerIndex: 0,
          explanation: "`img` is a void element: it can never contain anything, so it has no closing tag. `br`, `hr`, `input` and `meta` are void too.",
        },
        {
          prompt: "What is wrong with this HTML?",
          code: { language: "html", code: "<p>Hiking is <strong>great fun.</p></strong>" },
          options: ["`strong` is not a real element", "A `p` can't contain text", "Nothing, it's fine", "The tags overlap instead of nesting properly"],
          answerIndex: 3,
          explanation: "Close tags in the reverse order you opened them. The `strong` opened inside the `p`, so it must close before the `p` does.",
        },
        {
          prompt: "You type three spaces and two line breaks between two words in a paragraph. How does the browser display them?",
          options: ["As three spaces and two line breaks", "As a single space", "As two blank lines", "It shows an error"],
          answerIndex: 1,
          explanation: "The browser collapses any run of spaces and line breaks into one space. Use `<br />` for a line break, and CSS for spacing.",
        },
        {
          prompt: "Why should every page include `<meta name=\"viewport\" ...>`?",
          options: ["So the page loads faster", "So search engines can read it", "So phones use their real screen width instead of pretending to be a wide desktop", "So the text uses UTF-8"],
          answerIndex: 2,
          explanation: "Without it, phones render the page as a wide desktop site and shrink it down, so responsive CSS appears not to work.",
        },
        {
          prompt: "How do you show a literal less-than sign (<) in your page text?",
          options: ["`&lt;`", "`<<`", "`\\<`", "`<less>`"],
          answerIndex: 0,
          explanation: "A bare `<` starts a tag, so use the entity `&lt;`. Similarly, `&gt;` is greater-than and `&amp;` is an ampersand.",
        },
        {
          prompt: "Two elements on the same page share the same `id`. What is the likely result?",
          options: ["Both are found by every link", "The browser shows an error message", "The second one is removed", "Links and scripts only find the first one"],
          answerIndex: 3,
          explanation: "An `id` must be unique. With duplicates the browser doesn't warn you, but links, `label for` and scripts only reach the first element.",
        },
        {
          prompt: "Which of these belongs in the `body` rather than the `head`?",
          options: ["The `title`", "An `h1` heading", "A `meta charset` tag", "A `link` to a stylesheet"],
          answerIndex: 1,
          explanation: "The `head` holds information about the page. Anything visitors read or interact with, like a heading, goes in the `body`.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "document-structure-review",
      kind: "review",
      title: "Review: document structure cheat sheet",
      summary: "Everything from this topic on one page, for quick reference.",
      minutes: 3,
      body: [
        { type: "heading", text: "The skeleton" },
        {
          type: "code",
          language: "html",
          code: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>Page title</title>\n  </head>\n  <body>\n    <!-- visible content -->\n  </body>\n</html>',
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "An element = opening tag + content + closing tag. Attributes go in the opening tag as `name=\"value\"`.",
            "Void elements (`img`, `br`, `hr`, `input`, `meta`) have no closing tag.",
            "Always include the doctype, `lang`, charset, viewport and a unique title.",
            "Close tags in reverse order. Never overlap them. Indent each level.",
            "Whitespace collapses to one space. Use `<br />`, elements and CSS for layout.",
            "Comments: `<!-- note -->`. Special characters: `&lt;` `&gt;` `&amp;`.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "Open the Playground, switch to HTML and write this skeleton from memory. If you can type it without looking, you have this topic.",
        },
      ],
    },
  ],
};

export default content;
