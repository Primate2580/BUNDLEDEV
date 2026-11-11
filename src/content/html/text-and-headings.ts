import type { TopicContent } from "@/engine/types";
import writeATrailReport from "./text-and-headings/workshops/write-a-trail-report/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "headings-h1-to-h6",
          kind: "learn",
          title: "Headings: h1 to h6",
          summary: "The six heading levels, and why the number matters more than the size.",
          minutes: 8,
          concept: {
            description: "**Headings** are the titles of your page and of its sections. HTML has six levels, `h1` to `h6`. The `h1` is the title of the whole page, and each step down names a smaller part inside the one above it. You write the heading text between an opening tag and a closing tag, like any other element.",
            why: "Headings are how people find their way around a page. Sighted readers scan them to decide whether a page is worth reading. Screen reader users jump from heading to heading to skim a page, the way you scan with your eyes. Search engines read them too, to work out what a page is about.",
            mentalModel: "Picture a printed book. The book's title is the `h1`, each chapter title is an `h2`, and each section inside a chapter is an `h3`. A reader can open the contents page, see the shape of the whole book, and turn straight to the part they want.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's try it. Open the Playground with the example below, and read it from top to bottom.",
            },
            {
              type: "code",
              language: "html",
              code: `<h1>Ridge Trail guide</h1>
    
    <h2>Getting there</h2>
    <p>The trail starts at the old mill car park.</p>
    
    <h2>What to bring</h2>
    <p>Sturdy boots, water and a light jacket.</p>`,
            },
            {
              type: "paragraph",
              text: "The first line is the title of the page, so it uses `h1`. The next heading is an `h2`, and it names a section inside the page. The paragraph under it belongs to that section, and a second `h2` begins another section at the same level. Every tag has a number in its name, and the number is the level: the smaller the number, the bigger the idea.",
            },
            {
              type: "paragraph",
              text: "You will notice that the browser draws the headings large and bold. That is only a default look, supplied by the browser's built-in stylesheet, and CSS can change it whenever you like. The level is what carries the meaning. So do not pick `h3` just because you want smaller text, and do not pick `h1` just because you want big text. Pick the level that matches where the heading sits in the structure, and let CSS decide how it looks.",
            },
            {
              type: "paragraph",
              text: "Most pages have one `h1`, which names the page itself and usually comes first. Below it, `h2` headings name the main sections, and `h3` headings name the parts of those sections.",
            },
            {
              type: "paragraph",
              text: "Here is the same page with a third level added. Read it as an outline, and see how each `h3` belongs to the `h2` above it.",
            },
            {
              type: "code",
              language: "html",
              code: `<h1>Ridge Trail guide</h1>
    
    <h2>What to bring</h2>
    
    <h3>Clothing</h3>
    <p>Layers, because the ridge is windy.</p>
    
    <h3>Food and water</h3>
    <p>Two litres for each person.</p>`,
            },
            {
              type: "paragraph",
              text: "Headings also give your page a shape that tools can read. A screen reader can list every heading on a page and let the visitor jump straight to one. Try this on your own pages: read only the headings, one after another. Do they tell the story of the page? If they say things like \"More info\" or \"Stuff\", rewrite them so each one says what its section is about.",
            },
            {
              type: "paragraph",
              text: "One last habit is worth building early. Type the heading as a plain phrase and let the tag do the work. Do not add bold tags, shouting capitals or extra spaces to make a heading stand out, because a heading is already a heading.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "heading-levels-and-order",
          kind: "learn",
          title: "Heading levels and order",
          summary: "One h1, no skipped levels, and how to keep a page's outline honest.",
          minutes: 8,
          concept: {
            description: "The levels of your headings form an **outline** of the page. A good outline goes down one level at a time: an `h2` is followed by an `h3`, never by an `h4`. When a new section begins at an earlier level, you can jump back up, from an `h3` to an `h2`, as far as you need to.",
            why: "People who use a screen reader hear \"heading level 3\" before they hear the text. If the level jumps from 2 to 4, they wonder what they missed. Keeping the order tidy makes the page easy to follow for everybody, and it keeps your own markup easy to read when you come back to it later.",
            mentalModel: "Imagine the contents page of a book that went from chapter 2 straight to section 2.1.1, with no section 2.1 in between. You would think a page had been torn out. A skipped level feels the same way to a listener.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's look at an outline with two mistakes in it. Open the example in the Playground and read the heading levels in order.",
            },
            {
              type: "code",
              language: "html",
              code: `<h1>Trail guide</h1>
    <h3>Getting there</h3>
    <h2>What to bring</h2>
    <h4>Clothing</h4>
    <h1>Safety</h1>`,
            },
            {
              type: "paragraph",
              text: "The first `h3` comes straight after the `h1`, so a level is missing. The `h4` under \"What to bring\" skips the `h3` level. And a second `h1` makes it look as if the page has two titles. The browser will show all of this without complaint, because HTML is forgiving, but a person using a screen reader gets a muddled picture. Fix it by choosing levels from the structure, not from the size you want.",
            },
            {
              type: "code",
              language: "html",
              code: `<h1>Trail guide</h1>
    <h2>Getting there</h2>
    <h2>What to bring</h2>
    <h3>Clothing</h3>
    <h2>Safety</h2>`,
            },
            {
              type: "paragraph",
              text: "Now every heading goes down one step at a time, or comes back up to a section at the same level as an earlier one. Safety is a new main section, so it is an `h2`, and the page has a single title. That one title is a good rule of thumb: the `h1` names the page, and everything else lives below it.",
            },
            {
              type: "paragraph",
              text: "You will sometimes want a heading to look small, or a small piece of text to look big. Resist the urge to change the tag. If you want a smaller `h2`, keep the `h2` and make it smaller with CSS. If you want large text that is not a heading, use a paragraph or another suitable element and style it. The tag carries the meaning, and the stylesheet carries the looks.",
            },
            {
              type: "paragraph",
              text: "A page often has a title with a short tagline under it, such as the name of a guide and a subtitle. The tagline is not a new section, so do not give it a heading level of its own. Put it in a paragraph, or wrap the heading and the tagline together in an `hgroup` element, which exists exactly for this.",
            },
            {
              type: "code",
              language: "html",
              code: `<hgroup>
      <h1>Ridge Trail guide</h1>
      <p>Seven kilometres of views</p>
    </hgroup>`,
            },
            {
              type: "paragraph",
              text: "To check your own pages, read the outline from the top. In the next lesson's explorer you will restyle headings without touching a single tag, which is the best way to feel the difference between meaning and looks.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "heading-explorer",
          kind: "visualizer",
          title: "Heading explorer",
          summary: "Change how three headings look without touching their levels, and see that the outline a screen reader hears stays the same.",
          minutes: 8,
          concept: {
            description: "A short guide has an `h1`, an `h2` and an `h3`. Beside it, a small panel shows what a screen reader announces: the level of each heading and its words. Controls change the size and weight of each heading with CSS, and the panel never changes, because the levels are written in the HTML.",
            why: "It is easy to read that the level carries the meaning and the stylesheet carries the looks, and still pick a tag for its size. Dragging a slider until the `h3` is the biggest thing on the page, while the outline stays exactly as it was, makes the difference stick.",
            mentalModel: "Imagine a name badge at a conference. The title printed on it, such as speaker or guest, is the level and never changes, while the size of the lettering is a choice the organisers can make without changing who you are.",
          },
          stage: {
            html: `<article class="guide">
      <h1>Ridge Trail guide</h1>
      <p>Seven kilometres of views.</p>
      <h2>What to bring</h2>
      <p>Boots, water and a jacket.</p>
      <h3>Clothing</h3>
      <p>Layers, because the ridge is windy.</p>
    </article>
    <aside class="outline">
      <strong>What a screen reader announces</strong>
      <p>Heading level 1: Ridge Trail guide</p>
      <p>Heading level 2: What to bring</p>
      <p>Heading level 3: Clothing</p>
    </aside>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .guide { margin: 12px; padding: 12px 16px; border-radius: 10px; background: #1e293b; }
    .guide h1, .guide h2, .guide h3 { margin: 0 0 6px; color: #f8fafc; }
    .guide p { margin: 0 0 10px; color: #cbd5e1; }
    .outline { margin: 12px; padding: 10px 14px; border-radius: 10px; background: #172554; color: #bfdbfe; }
    .outline p { margin: 4px 0 0; }`,
            annotate: "none",
            target: ".guide",
            items: ".guide",
            itemCount: 1,
          },
          starter: `h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    h3 {
      font-size: 1.25rem;
    }
    `,
          controls: [
            {
              id: "h1-size",
              label: "h1 size",
              selector: "h1",
              property: "font-size",
              fallback: "2rem",
              type: "range",
              min: 0.75,
              max: 3,
              step: 0.25,
              unit: "rem",
              help: "Only the look changes. It is still the page title.",
            },
            {
              id: "h2-size",
              label: "h2 size",
              selector: "h2",
              property: "font-size",
              fallback: "1.5rem",
              type: "range",
              min: 0.75,
              max: 3,
              step: 0.25,
              unit: "rem",
              help: "Make it smaller than the h3 and it is still a level 2.",
            },
            {
              id: "h3-size",
              label: "h3 size",
              selector: "h3",
              property: "font-size",
              fallback: "1.25rem",
              type: "range",
              min: 0.75,
              max: 3,
              step: 0.25,
              unit: "rem",
              help: "Make it the biggest thing on the page and it is still a level 3.",
            },
            {
              id: "h2-weight",
              label: "h2 weight",
              selector: "h2",
              property: "font-weight",
              fallback: "bold",
              type: "options",
              options: ["normal", "bold"],
              help: "Bold is only the browser's default.",
            },
          ],
          presets: [
            {
              id: "upside",
              label: "Biggest at the bottom",
              description: "h3 larger than h1",
              css: `h3 { font-size: 2.5rem; }
    h1 { font-size: 1rem; }`,
            },
            {
              id: "flat",
              label: "All the same size",
              description: "three levels, one look",
              css: "h1, h2, h3 { font-size: 1.25rem; }",
            },
            {
              id: "plain",
              label: "A plain h2",
              description: "normal weight, body size",
              css: "h2 { font-size: 1rem; font-weight: normal; }",
            },
          ],
          challenge: {
            title: "Reshape the headings, keep the levels",
            description: "Make the `h2` look small, `1rem`, and the `h3` look large, `2rem`. Change only the CSS. The HTML, and so the outline in the panel, stays exactly as it is.",
            hints: [
              "Edit two numbers in the stylesheet: the `font-size` in the `h2` rule and the one in the `h3` rule.",
              "The `h2` rule needs `1rem`, and the `h3` rule needs `2rem`.",
              "`h2 { font-size: 1rem; }` and `h3 { font-size: 2rem; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: "h2",
                property: "font-size",
                expected: ["1rem", "16px"],
                message: "The `h2` is drawn at `1rem`",
              },
              {
                type: "computedStyle",
                selector: "h3",
                property: "font-size",
                expected: ["2rem", "32px"],
                message: "...the `h3` at `2rem`",
              },
              {
                type: "a11y",
                rule: "heading-order",
                message: "The heading levels go down one step at a time, with no skipped level.",
              },
            ],
            solution: `h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1rem;
    }
    
    h3 {
      font-size: 2rem;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-skipped-levels",
          kind: "debug",
          title: "Debug: the skipped levels",
          mode: "html",
          summary: "The page looks fine, but its outline is a mess: two titles, a skipped level and a section heading that is not a heading at all.",
          minutes: 8,
          broken: {
            html: `<h1>Mill Creek Walk</h1>
    <h1>Getting there</h1>
    <p>Park at the old mill and follow the signs.</p>
    <h4>What to bring</h4>
    <p>Boots, water and a hat.</p>
    <h3>Clothing</h3>
    <p>Layers, because the creek path is damp.</p>
    <p><b>Safety</b></p>
    <p>Stay on the marked path.</p>`,
            css: "",
          },
          challenge: {
            title: "Repair the outline",
            description: "This walk guide should have one page title, three main sections (`Getting there`, `What to bring` and `Safety`) and one subsection, `Clothing`, inside `What to bring`. Fix the tags only, and keep every word. The page may look different afterwards, and that is fine, because looks are for CSS.",
            hints: [
              "Count the `h1` elements: there should be one. Then read the levels in order, and look for a place where the level jumps down by more than one.",
              "One heading is not a heading at all: a bold paragraph is posing as one. Make it a real heading.",
              "`h1` for the title, `h2` for each of the three sections, and `h3` for `Clothing`.",
            ],
            checks: [
              {
                type: "count",
                selector: "h1",
                message: "There is exactly one `h1`",
                min: 1,
                max: 1,
              },
              {
                type: "a11y",
                rule: "heading-order",
                message: "The heading levels go down one step at a time, with no skipped level.",
              },
              {
                type: "count",
                selector: "h2",
                message: "...three `h2` sections",
                min: 3,
                max: 3,
              },
              {
                type: "text",
                selector: "h2",
                includes: "Safety",
                message: "...including `Safety`, as a real heading",
              },
              {
                type: "count",
                selector: "p > b",
                message: "...and no bold paragraph posing as a heading.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Mill Creek Walk</h1>
    <h2>Getting there</h2>
    <p>Park at the old mill and follow the signs.</p>
    <h2>What to bring</h2>
    <p>Boots, water and a hat.</p>
    <h3>Clothing</h3>
    <p>Layers, because the creek path is damp.</p>
    <h2>Safety</h2>
    <p>Stay on the marked path.</p>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "paragraphs-and-whitespace",
          kind: "learn",
          title: "Paragraphs and whitespace",
          summary: "The p element, and why the browser ignores your extra spaces and blank lines.",
          minutes: 8,
          concept: {
            description: "A **paragraph** is a block of related sentences, and you mark it with the `p` element. Each `p` starts on a new line and the browser adds a little space above and below it. Paragraphs are the plain text of the web, and most of what people read on a page is inside one.",
            why: "Writing paragraphs well is mostly about trusting the browser. It decides where lines break, based on the width of the screen, so your text suits a phone and a wide monitor alike. If you fight that, with extra spaces and blank lines, the page works against you.",
            mentalModel: "Picture a word processor that always reflows your text to fit the window. You only say where one paragraph ends and the next begins, and the program handles the rest. HTML works the same way.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's see this in action. Open the Playground with the example below. The second paragraph is typed across several lines, and the third has a lot of spaces in it.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>The Ridge Trail is open again.</p>
    
    <p>The path was repaired
    over two weeks, and the new
    bridge is finished.</p>
    
    <p>Spaces        collapse.</p>`,
            },
            {
              type: "paragraph",
              text: "Look at the output. The paragraph that you typed across three lines appears as one flowing block, and the row of spaces in the last paragraph shrank to a single space. The browser treats any run of spaces, tabs and line breaks as one space. This is called whitespace collapsing, and it is the first surprise for almost everybody who learns HTML.",
            },
            {
              type: "paragraph",
              text: "That behaviour is a gift once you know about it. You can indent your code, put every sentence on its own line, and leave blank lines wherever you like, so your source is easy to read, and none of it changes what visitors see. The only thing that starts a new paragraph on the page is a new `p` element.",
            },
            {
              type: "paragraph",
              text: "It also means you should not press the space bar or the Enter key to push things around. A common beginner trick is to add empty paragraphs, or a row of non-breaking spaces, to open up a gap. Do not do that. A gap between paragraphs is spacing, and spacing is a job for CSS, which you can change in one place for the whole site.",
            },
            {
              type: "paragraph",
              text: "A paragraph is a block, so it cannot contain another block such as a heading or a list. If you try, the browser quietly ends the paragraph before the block begins, and your markup ends up different from what you wrote. Keep the paragraph for running text and small pieces of inline markup, which you meet in the lessons ahead.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>Written in one line.</p>
    <p>
      Written across lines,
      with indentation.
    </p>`,
            },
            {
              type: "paragraph",
              text: "Both paragraphs above look identical on the page. Choose whichever layout makes your own code easier to read. Many people put long paragraphs on their own indented lines, as in the second one, so a quick glance at the source shows where each paragraph starts and finishes. The next lesson's explorer lets you change how the browser treats whitespace, so you can see the rules at work.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "whitespace-explorer",
          kind: "visualizer",
          title: "Whitespace explorer",
          summary: "One paragraph with extra spaces and line breaks in its source. Switch how the browser treats whitespace and watch the spaces and breaks come and go.",
          minutes: 8,
          concept: {
            description: "The paragraph in the preview was typed with runs of spaces and across three lines. By default, the browser collapses every run of whitespace into one space and reflows the words to fit. A `white-space` setting changes that, so you can keep the spaces, keep the breaks, or stop the text from wrapping.",
            why: "Collapsing is the reason your indented, tidy source never disturbs the page, and it is also why a row of spaces does not push text around. Seeing the same words with the collapsing switched off shows what the browser is quietly doing all the time, and what `pre` does for you.",
            mentalModel: "Think of the browser as a typesetter who tidies every manuscript. Normally they remove stray spaces and re-flow lines to fit the column, and a setting lets you tell them to leave some of your layout alone.",
          },
          stage: {
            html: `<p class="demo">Trail   notes:
      boots,     water,
      and a jacket.</p>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .demo { width: 16rem; margin: 16px; padding: 12px; border: 1px dashed #64748b; border-radius: 8px; background: #1e293b; font-family: ui-monospace, Menlo, Consolas, monospace; }`,
            annotate: "none",
            target: ".demo",
            items: ".demo",
            itemCount: 1,
          },
          starter: `.demo {
      white-space: normal;
    }
    `,
          controls: [
            {
              id: "ws",
              label: "white-space",
              selector: ".demo",
              property: "white-space",
              fallback: "normal",
              type: "options",
              options: ["normal", "nowrap", "pre", "pre-wrap", "pre-line"],
              help: "normal collapses spaces and breaks. pre keeps everything. pre-line keeps only the line breaks.",
            },
            {
              id: "width",
              label: "box width",
              selector: ".demo",
              property: "width",
              fallback: "16rem",
              type: "range",
              min: 8,
              max: 24,
              step: 2,
              unit: "rem",
              help: "Narrow the box to watch the wrapping.",
            },
          ],
          presets: [
            {
              id: "pre",
              label: "Keep everything",
              description: "like the pre element",
              css: ".demo { white-space: pre; }",
            },
            {
              id: "line",
              label: "Keep the line breaks",
              description: "spaces still collapse",
              css: ".demo { white-space: pre-line; }",
            },
            {
              id: "nowrap",
              label: "Never wrap",
              description: "one long line",
              css: ".demo { white-space: nowrap; }",
            },
          ],
          challenge: {
            title: "Keep the line breaks, collapse the spaces",
            description: "The three lines you typed should stay on three separate lines, but the extra spaces between the words should still collapse into one. Set `white-space` on `.demo` to the value that does exactly that.",
            hints: [
              "One value keeps the line breaks and still collapses runs of spaces.",
              "It has `line` in its name.",
              "`.demo { white-space: pre-line; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".demo",
                property: "white-space",
                expected: ["pre-line"],
                message: "The paragraph keeps its line breaks but collapses its spaces.",
              },
            ],
            solution: `.demo {
      white-space: pre-line;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-whitespace",
          kind: "predict",
          title: "Predict the whitespace",
          summary: "Five small pieces of markup, each with spaces or line breaks in the source. Work out how many lines each one shows.",
          minutes: 7,
          mode: "html",
          intro: "Every example below has extra spaces or line breaks in its source. Decide what the browser will show for each one, then run the code to check.",
          code: {
            html: `<p>One   two
    three</p>
    
    <pre>One   two
    three</pre>
    
    <p>Top<br>bottom</p>
    
    <p>A</p>
    <p>B</p>`,
            css: "",
          },
          questions: [
            {
              prompt: "The first paragraph is typed as `One   two`, then a line break, then `three`. What does it show on a wide screen?",
              options: ["Three separate lines", "One line: `One two three`", "One line with the three spaces kept", "Two lines"],
              answerIndex: 1,
              hint: "What does the browser do with runs of whitespace in normal text?",
              explanation: "In a normal paragraph, every run of spaces, tabs and line breaks becomes one space, and the text reflows to fit the width.",
              proves: [
                {
                  type: "exists",
                  selector: "body > p",
                  message: "The page has paragraphs.",
                },
              ],
            },
            {
              prompt: "The same words appear inside a `pre` element. What does it show?",
              options: [
                "One line, as in the paragraph",
                "Three lines",
                "Two lines, with the three spaces between `One` and `two` kept",
                "Nothing, because `pre` hides whitespace",
              ],
              answerIndex: 2,
              hint: "The name stands for preformatted.",
              explanation: "Inside `pre`, spaces and line breaks are kept exactly as typed. That is why `pre` is used for code and other text whose layout matters.",
              proves: [
                {
                  type: "exists",
                  selector: "body > pre",
                  message: "The same words sit inside a `pre`.",
                },
              ],
            },
            {
              prompt: "What does `<p>Top<br>bottom</p>` show?",
              options: [
                "Two lines, `Top` over `bottom`, inside one paragraph",
                "`Top bottom` on one line",
                "Two paragraphs",
                "Only `Top`",
              ],
              answerIndex: 0,
              hint: "A `br` forces a break, but does it start a new paragraph?",
              explanation: "The `br` ends the line, and the text carries on below it. It is still one paragraph, with one `p` element around it.",
              proves: [
                {
                  type: "count",
                  selector: "p > br",
                  message: "There is exactly one `br`.",
                  min: 1,
                  max: 1,
                },
              ],
            },
            {
              prompt: "The last two paragraphs, `A` and `B`, are separate `p` elements. What separates them on the page?",
              options: [
                "Nothing, they run together",
                "A line break from the `p` element's tag",
                "The blank line in the source",
                "The browser's default spacing around paragraphs, which CSS can change",
              ],
              answerIndex: 3,
              hint: "Would the gap change if you deleted the blank lines in the source?",
              explanation: "Browsers give paragraphs a little default space above and below. The blank lines in your source never count, and a designer controls the gap with margins in CSS.",
              proves: [
                {
                  type: "count",
                  selector: "p",
                  message: "There are several `p` elements.",
                  min: 3,
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "line-breaks-and-rules",
          kind: "learn",
          title: "Line breaks and rules",
          summary: "br and hr: when a break belongs to the content, and when it is only spacing.",
          minutes: 8,
          concept: {
            description: "The `br` element forces a **line break** inside a paragraph, and the `hr` element draws a **thematic break** between two parts of a page. Both are empty elements: they have no closing tag and no text inside. You write them as `<br>` and `<hr>`, and some people add a slash, as in `<br />`.",
            why: "These two tags are easy to misuse, because they look like the quickest way to space things out. Used well, they carry meaning. Used as spacing, they make a page that is hard to restyle and awkward for screen readers.",
            mentalModel: "A `br` is the end of a line in a poem, where the break is part of the poem. An `hr` is the little row of stars in a novel that tells you the story has jumped to another time or place.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's start with `br`. Open the example in the Playground. It is a postal address, where each line break is part of the content.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>
      Ridge Trail Visitor Centre<br>
      14 Mill Lane<br>
      Hillford HF1 2AB
    </p>`,
            },
            {
              type: "paragraph",
              text: "Each `br` ends the line it follows, and the text carries on beneath it, still inside the same paragraph. That is the right use: an address, a poem or song lyrics, where the lines belong together and the breaks matter. If you took the breaks out, the meaning would change.",
            },
            {
              type: "paragraph",
              text: "The wrong use is to stack breaks to make space between blocks. Two or three in a row, as in `<br><br>`, is a sign that you want two paragraphs, or a gap that CSS should supply. A screen reader may announce every break, so a gap built from breaks can be tiring to listen to. Ask yourself whether the break is part of the text. If it is, use `br`, and if you only want the look of a gap, use separate paragraphs and CSS.",
            },
            {
              type: "paragraph",
              text: "Now the `hr` element. It marks a change of topic, and browsers draw it as a horizontal line by default. Open the next example and look at where the line sits.",
            },
            {
              type: "code",
              language: "html",
              code: `<h2>Getting there</h2>
    <p>Park at the old mill and follow the signs.</p>
    
    <hr>
    
    <h2>Safety</h2>
    <p>Stay on the marked path.</p>`,
            },
            {
              type: "paragraph",
              text: "The line separates two parts of the page with a clear change of subject. Its meaning is a thematic break, not a decoration, even though most browsers show it as a line. If all you want is a line for the look, a border from CSS is the better tool, because you can style it and it carries no meaning that a screen reader would announce.",
            },
            {
              type: "paragraph",
              text: "In practice you will use `br` rarely and `hr` even more rarely, and that is a good sign. Most of the structure of a page is made from headings, paragraphs and, as you will see in a later topic, lists and sections. When you find yourself reaching for a break, stop for a moment and ask whether a different element would say what you mean more clearly.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "emphasis-and-importance",
          kind: "learn",
          title: "Emphasis and importance",
          summary: "em for stress, strong for seriousness, and why neither is just italic or bold.",
          minutes: 8,
          concept: {
            description: "**Emphasis** and **importance** are two different ideas in HTML. The `em` element marks the words you would stress if you read the sentence aloud, and the `strong` element marks text that is serious, urgent or important. Both live inside a paragraph, and you wrap them around only the words they apply to.",
            why: "Stress can change the meaning of a sentence, and importance guides a reader's eye to the part they must not miss. Screen readers and other tools can pass these ideas on, and when you choose by meaning, your markup stays correct even if a designer later changes how it looks.",
            mentalModel: "Picture yourself reading a sentence out loud. When you lean on one word to change what the sentence means, that is `em`. When you slow down and say a whole warning firmly, because it matters, that is `strong`.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's try it. Open the Playground with the example below. The same words appear twice, with the stress on a different word each time.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>I never said <em>she</em> took it.</p>
    <p>I never said she <em>took</em> it.</p>`,
            },
            {
              type: "paragraph",
              text: "Read each line aloud, leaning on the word that is wrapped in `em`. The first sentence suggests that somebody else took it, and the second suggests that she did something other than take it. Same words, different meaning, and the tag is what carries the difference. Browsers draw `em` in italics by default, but the italics are only the usual way of showing the stress on paper.",
            },
            {
              type: "paragraph",
              text: "Now the `strong` element, which is about importance rather than stress. Open the next example. The word \"Warning\" is marked, and so is the instruction that follows it.",
            },
            {
              type: "code",
              language: "html",
              code: `<p><strong>Warning:</strong> the ridge path closes at dusk.
    Do <strong>not</strong> walk it after dark.</p>`,
            },
            {
              type: "paragraph",
              text: "Browsers draw `strong` in bold. As with `em`, the bold is the default and not the point. The point is that this text matters more than the text around it. A good rule is to use `strong` for things a reader would be hurt or misled by missing, such as safety notices, deadlines and conditions.",
            },
            {
              type: "paragraph",
              text: "You can combine the two, because they say different things. A word can be important and stressed at once, and you nest one inside the other, closing the inner tag first, as in `<strong><em>now</em></strong>`.",
            },
            {
              type: "paragraph",
              text: "There are two habits to avoid. First, do not use `strong` to make something look bold, or `em` to make something look italic. If a heading should be bold, make it a heading and let CSS style it, and if a book title should be italic, you will meet a better element for that soon. Second, do not use `strong` everywhere. If every second sentence is important, none of them is, and the reader stops noticing the markup.",
            },
            {
              type: "paragraph",
              text: "A helpful test is to ask what you would do if the browser drew both elements exactly like normal text. If the sentence would still need the stress or the warning, the element is right. If the only reason for it was the look, use CSS instead. In the next lessons you will meet a few more inline elements, and the same test works for all of them.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-markup",
          kind: "predict",
          title: "Predict what the markup says",
          summary: "Four short pieces of markup. Predict what each element tells a reader or a tool, not only how it looks.",
          minutes: 7,
          mode: "html",
          intro: "Browsers draw these elements in a certain way, but the question here is what each one means. Answer from the meaning, then run the code to see the default look.",
          code: {
            html: `<p><strong>Closed</strong> after <em>dark</em>.</p>
    <p>The <abbr title="Search and Rescue">SAR</abbr> team meets on <time datetime="2026-11-12">12 November</time>.</p>
    <p>The speed limit is <del>12</del> <ins>10</ins> km/h.</p>
    <blockquote>
      <p>Walk slowly.</p>
    </blockquote>`,
            css: "",
          },
          questions: [
            {
              prompt: "In `<strong>Closed</strong> after <em>dark</em>`, which word is marked as the more important one, and which as the stressed one?",
              options: [
                "`Closed` is important, and `dark` is stressed",
                "`dark` is important, and `Closed` is stressed",
                "Both are important",
                "Neither, they only change the font",
              ],
              answerIndex: 0,
              hint: "One element is about importance, the other about the stress you would put on a word when speaking.",
              explanation: "The `strong` element marks importance and the `em` element marks stress. The bold and italic you see are only the browser's default way of drawing them.",
              proves: [
                {
                  type: "text",
                  selector: "strong",
                  includes: "Closed",
                  message: "`Closed` is inside `strong`.",
                },
                {
                  type: "text",
                  selector: "em",
                  includes: "dark",
                  message: "`dark` is inside `em`.",
                },
              ],
            },
            {
              prompt: "What is the `datetime` attribute on the `time` element for?",
              options: [
                "It is shown to the visitor instead of the text",
                "It makes the date a link to a calendar",
                "It holds the date in a fixed format that a computer can read",
                "It sets the language of the date",
              ],
              answerIndex: 2,
              hint: "Would a calendar app understand \"12 November\" without a year?",
              explanation: "The text between the tags is for people, and `datetime` is for machines, written as year, month, day. Visitors never see the attribute.",
              proves: [
                {
                  type: "attribute",
                  selector: "time",
                  attribute: "datetime",
                  message: "The `time` element has `datetime=\"2026-11-12\"`.",
                  expected: "2026-11-12",
                },
              ],
            },
            {
              prompt: "What do `<del>12</del> <ins>10</ins>` say together?",
              options: [
                "The number 12 is the more important one",
                "The number 12 was removed and 10 was added in its place",
                "Both numbers are code",
                "Both numbers are abbreviations",
              ],
              answerIndex: 1,
              hint: "Think of an editor's red pen.",
              explanation: "The `del` element records text that was removed and the `ins` element records text that was added. Together they show a correction.",
              proves: [
                {
                  type: "exists",
                  selector: "del",
                  message: "There is a `del`.",
                },
                {
                  type: "exists",
                  selector: "ins",
                  message: "There is an `ins`.",
                },
              ],
            },
            {
              prompt: "The browser indents the `blockquote`. Is the indent the reason to use it?",
              options: [
                "Yes, it is the way to indent text",
                "No, because `blockquote` has no meaning",
                "Yes, but only for short text",
                "No, it marks a quotation, and the indent is only the default look",
              ],
              answerIndex: 3,
              hint: "What would a screen reader or a search tool learn from the element?",
              explanation: "A `blockquote` says that the text inside is quoted from somewhere else. Indenting is just how browsers draw it, and CSS can change it, so never use it to push text over.",
              proves: [
                {
                  type: "exists",
                  selector: "blockquote > p",
                  message: "The quote sits in a `blockquote`, inside a paragraph.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "bold-italic-and-the-rest",
          kind: "learn",
          title: "Bold, italic and the rest",
          summary: "b, i, mark, small, s and u: the smaller inline elements, and when each one is the honest choice.",
          minutes: 8,
          concept: {
            description: "Besides `em` and `strong`, HTML has a handful of small **inline elements** for text with a particular job. These are `b`, `i`, `mark`, `small`, `s` and `u`. Each one has a narrow meaning, and each is the right choice only when a more specific element does not fit.",
            why: "These tags are easy to confuse with their looks. Knowing what each one is for keeps your markup honest, and it stops you using `b` or `i` as shortcuts for styling, which is a job for CSS.",
            mentalModel: "Think of a student marking up a textbook. One pen draws attention to a key term, another highlights what matters for tomorrow's test, and another crosses out an answer that is no longer right. Each pen has one purpose, even when two of them leave the same kind of mark.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at how each element is used in a short product review.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>I tried the <b>Ridge Pro</b> boots on the <i>Skylark</i> route.
    My feet stayed dry, which was <mark>exactly what I needed</mark>.</p>
    
    <p>Price: <s>$120</s> $90</p>
    <p><small>Prices include tax. Offer ends Friday.</small></p>`,
            },
            {
              type: "paragraph",
              text: "The `b` element draws attention to text without saying that it is more important, such as a product name or a keyword in a review. The `i` element marks text in an alternate voice or mood: a ship's name, a technical term, a foreign phrase, or a thought. Both are normally drawn bold and italic, but those looks are not the reason to use them. If the text is serious, you want `strong`, and if it is stressed, you want `em`.",
            },
            {
              type: "paragraph",
              text: "The `mark` element highlights text that is relevant in the current context. The classic example is a search page that marks the words you searched for. It is usually drawn with a yellow background, and it is meant for something specific, not as a general highlighter.",
            },
            {
              type: "paragraph",
              text: "The `s` element shows content that is no longer accurate or relevant, such as the old price in the example, and browsers draw it with a line through it. It is for information that was true and has been replaced, so it differs from `del`, which you will meet shortly and which records an edit to a document.",
            },
            {
              type: "paragraph",
              text: "The `small` element is for side comments and small print: copyright lines, legal notes and disclaimers. It does not mean \"make this text smaller\", though browsers do show it a little smaller by default. Use it for the kind of text that a contract would print at the bottom of the page.",
            },
            {
              type: "paragraph",
              text: "Finally there is `u`, which marks text with an unarticulated annotation, such as a misspelt word you are pointing out. Because underlined text looks like a link on the web, it is rarely the right choice, and you should never use it for decoration. If you only want an underline, CSS can draw one.",
            },
            {
              type: "paragraph",
              text: "When you want to style a piece of text, first ask whether a more specific element fits, such as `strong`, `em`, `cite`, `abbr` or `code`. If none does, use a plain `span` and style it with CSS, because a `span` has no meaning of its own and so never says anything misleading.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-mark-up-a-notice",
          kind: "lab",
          title: "Lab: mark up a notice",
          mode: "html",
          summary: "A plain notice becomes a careful one. Mark the warning, the stress, the date and the abbreviation with the elements that say what each piece is.",
          minutes: 9,
          starter: {
            html: `<h1>Trail notice</h1>
    <p>Danger: the ridge path closes at 18:00 on 12 November 2026. Please do not walk it after dark. The SAR team patrols every weekend.</p>`,
            css: "",
          },
          challenge: {
            title: "Say what each piece of text means",
            description: "The notice below is all plain text. Mark the word `Danger:` as strongly important, and the word `not` as stressed. Wrap the date `12 November 2026` in a `time` element whose `datetime` is `2026-11-12`. Finally, mark `SAR` as an abbreviation whose `title` is `Search and Rescue`. Keep the words exactly as they are.",
            hints: [
              "Four elements, each wrapped around words that are already there: `strong`, `em`, `time` and `abbr`.",
              "The date and the full form go in attributes: `datetime=\"2026-11-12\"` and `title=\"Search and Rescue\"`.",
              "`<strong>Danger:</strong>`, `do <em>not</em> walk`, `<time datetime=\"2026-11-12\">12 November 2026</time>`, `<abbr title=\"Search and Rescue\">SAR</abbr>`",
            ],
            checks: [
              {
                type: "text",
                selector: "p strong",
                includes: "Danger",
                message: "`Danger:` is marked as strongly important",
              },
              {
                type: "text",
                selector: "p em",
                includes: "not",
                message: "...`not` is stressed with `em`",
              },
              {
                type: "attribute",
                selector: "p time",
                attribute: "datetime",
                message: "...the date sits in a `time` element with `datetime=\"2026-11-12\"`",
                expected: "2026-11-12",
              },
              {
                type: "attribute",
                selector: "p abbr",
                attribute: "title",
                message: "...`SAR` is an `abbr` with its full form in `title`",
                expected: "Search and Rescue",
              },
              {
                type: "text",
                selector: "p",
                includes: "closes at 18:00",
                message: "...and the words of the notice are untouched.",
              },
            ],
            solution: {
              html: `<h1>Trail notice</h1>
    <p><strong>Danger:</strong> the ridge path closes at 18:00 on <time datetime="2026-11-12">12 November 2026</time>. Please do <em>not</em> walk it after dark. The <abbr title="Search and Rescue">SAR</abbr> team patrols every weekend.</p>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "quotes-and-citations",
          kind: "learn",
          title: "Quotes and citations",
          summary: "blockquote, q and cite, and how to give a quote its source.",
          minutes: 8,
          concept: {
            description: "HTML has two elements for quotations. The `blockquote` element is for a longer quotation that stands on its own, and the `q` element is for a short one inside a sentence. A third element, `cite`, marks the title of a work, such as a book, a song or an article.",
            why: "Quoting somebody is a promise to the reader that the words are not yours. Marking quotes with the right elements lets browsers and assistive tools treat them as quotes, and it lets you give the source in a way that tools can follow.",
            mentalModel: "Picture a magazine article. A long passage from another writer is set apart as its own block, a short phrase is tucked into a sentence in quotation marks, and the source is named in a caption underneath.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's start with `blockquote`. Open the example in the Playground, and look at how the quote is set apart from the text around it.",
            },
            {
              type: "code",
              language: "html",
              code: `<blockquote cite="https://example.com/trail-notes">
      <p>The best way to know a ridge is to walk it slowly,
      and then walk it again in the rain.</p>
    </blockquote>`,
            },
            {
              type: "paragraph",
              text: "Browsers indent a `blockquote` by default, but the indent is only a look. What matters is that the content inside is a quotation from somewhere else, and you normally put the quoted text inside one or more paragraphs. The optional `cite` attribute holds the web address of the source. Visitors do not see it, but scripts and search tools can read it, so it is worth adding when you have the address.",
            },
            {
              type: "paragraph",
              text: "The visible credit goes outside the quote, and the usual way to do it is to wrap both in a `figure` element, with a `figcaption` beneath. Notice where the `cite` element goes in this example, and which words it surrounds.",
            },
            {
              type: "code",
              language: "html",
              code: `<figure>
      <blockquote>
        <p>The best way to know a ridge is to walk it slowly.</p>
      </blockquote>
      <figcaption>
        A. Walker, in <cite>Notes from the Ridge</cite>
      </figcaption>
    </figure>`,
            },
            {
              type: "paragraph",
              text: "The `cite` element wraps the title of a creative work, here the book. The author's name is plain text, and the HTML specification does not call for `cite` around people's names, even though you will see it used that way in the wild. The `figure` groups the quote with its credit, so they belong together, and the `figcaption` carries the credit.",
            },
            {
              type: "paragraph",
              text: "For a short quotation inside a sentence, use `q`. Open the next example and notice that the words do not contain any quotation marks of their own.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>As the old saying goes, <q>measure twice, cut once</q>,
    and the same is true for trail maps.</p>`,
            },
            {
              type: "paragraph",
              text: "The browser adds the quotation marks for you, and it chooses the right ones for the language of the page, such as curly quotes in English or guillemets in French. That is why you should not type your own marks inside `q`. If you did, you would get two sets. Use `q` for short phrases, and `blockquote` when the quote is long enough to be a paragraph or more.",
            },
            {
              type: "paragraph",
              text: "Finally, a warning about a common shortcut. Never use `blockquote` just to indent text, because that tells readers and tools that the text is quoted when it is not. If you want a block to be indented, use CSS, and keep the quote elements for real quotations.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-quote-with-credit",
          kind: "lab",
          title: "Lab: quote with credit",
          mode: "html",
          summary: "Turn a plain paragraph into a proper quotation with its source, and replace typed quotation marks with the element that adds them.",
          minutes: 9,
          starter: {
            html: `<h1>Words from the ridge</h1>
    <p>The best way to know a ridge is to walk it slowly, and then walk it again in the rain.</p>
    <p>A. Walker, Notes from the Ridge</p>
    <p>My grandmother always said "measure twice, cut once" before any hike.</p>`,
            css: "",
          },
          challenge: {
            title: "Quote it properly",
            description: "Put the first paragraph inside a `blockquote` whose `cite` attribute is `https://example.com/ridge-notes`, and keep the paragraph inside it. Wrap the quote and its credit in a `figure`, and turn the credit line into a `figcaption`, with the book's title, `Notes from the Ridge`, inside a `cite` element. Last, replace the typed quotation marks around `measure twice, cut once` with a `q` element.",
            hints: [
              "The `figure` holds two things: the `blockquote` with its paragraph, and the `figcaption`.",
              "The credit paragraph becomes the `figcaption`. Only the title goes in `cite`: `A. Walker, in <cite>Notes from the Ridge</cite>`.",
              "`<q>measure twice, cut once</q>` has no quotation marks of its own, because the browser adds them.",
            ],
            checks: [
              {
                type: "attribute",
                selector: "figure > blockquote",
                attribute: "cite",
                message: "The quote is a `blockquote` with the source address in `cite`",
                expected: "https://example.com/ridge-notes",
              },
              {
                type: "exists",
                selector: "figure > blockquote > p",
                message: "...and its paragraph is inside it",
              },
              {
                type: "text",
                selector: "figure > figcaption cite",
                includes: "Notes from the Ridge",
                message: "...the credit is a `figcaption` with the book title in a `cite`",
              },
              {
                type: "text",
                selector: "p q",
                includes: "measure twice, cut once",
                message: "...and the saying is wrapped in a `q` element.",
              },
            ],
            solution: {
              html: `<h1>Words from the ridge</h1>
    <figure>
      <blockquote cite="https://example.com/ridge-notes">
        <p>The best way to know a ridge is to walk it slowly, and then walk it again in the rain.</p>
      </blockquote>
      <figcaption>A. Walker, in <cite>Notes from the Ridge</cite></figcaption>
    </figure>
    <p>My grandmother always said <q>measure twice, cut once</q> before any hike.</p>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "code-and-preformatted-text",
          kind: "learn",
          title: "Code and preformatted text",
          summary: "code, pre, kbd, samp and var, and how to show tags on a page without running them.",
          minutes: 8,
          concept: {
            description: "HTML has elements for technical writing. The `code` element marks a piece of computer code, and the `pre` element keeps spaces and line breaks exactly as you typed them. Smaller siblings include `kbd` for keys a person presses, `samp` for output from a program, and `var` for a variable name.",
            why: "Tutorials, documentation and even a recipe site with a sentence about a keyboard shortcut all need these elements. They set the text in a monospaced font by default, and they tell tools that the words are not ordinary prose.",
            mentalModel: "Imagine a printed manual for a machine. Commands are typed in a typewriter font, the keys you press are drawn like little keycaps, and examples of what the machine prints back sit in their own boxes.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at the inline elements first.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>To save the file, press <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>
    <p>The page prints <samp>Hello, world</samp> when it loads.</p>
    <p>In <code>area = w * h</code>, the value <var>w</var> is the width.</p>`,
            },
            {
              type: "paragraph",
              text: "Each element carries one idea. The `kbd` marks a key a person presses, `samp` marks sample output, `code` marks code, and `var` marks a variable in a formula. Browsers draw all of them in a monospaced font, and you can restyle each one separately, for example to draw `kbd` as a keycap. This is another place where choosing the element for its meaning gives you a free way to style it later.",
            },
            {
              type: "paragraph",
              text: "For more than a line, you want `pre`. Browsers collapse whitespace in normal text, as you saw earlier, but inside `pre` the spaces and line breaks stay exactly as typed. The usual pattern for a block of code is to put a `code` element inside a `pre`, so you say both that it is preformatted and that it is code.",
            },
            {
              type: "code",
              language: "html",
              code: `<pre><code>function greet(name) {
      return "Hello, " + name;
    }</code></pre>`,
            },
            {
              type: "paragraph",
              text: "Look at the output and notice that the indentation survived. If you typed the same lines inside a paragraph, they would run together into a single line. Browsers also ignore a line break that comes straight after the opening `pre` tag, so you can start the code on the next line without leaving a blank one.",
            },
            {
              type: "paragraph",
              text: "Now a puzzle you will meet quickly. What if you want to show the text `<p>` on a page? If you type it as is, the browser thinks you are starting a paragraph, and the tag disappears. You have to replace the opening angle bracket with `&lt;` and the closing one with `&gt;`, which are called entities. Open the example below, and compare what you typed with what appears.",
            },
            {
              type: "code",
              language: "html",
              code: "<p>The tag for a paragraph is <code>&lt;p&gt;</code>.</p>",
            },
            {
              type: "paragraph",
              text: "The page shows the tag as visible text, which is what you wanted. A later lesson covers entities in full. For now, remember that anything you type inside `code` or `pre` is still parsed as HTML, so tags inside them are real tags unless you escape them.",
            },
            {
              type: "paragraph",
              text: "Browsers do not colour code on their own. That is done by a script or a service that wraps each part of the code in more elements, and you will meet it later. These elements give those tools a clear place to start.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "abbreviations-time-and-addresses",
          kind: "learn",
          title: "Abbreviations, dates and contact details",
          summary: "abbr, dfn, time and address: giving short pieces of text a precise meaning.",
          minutes: 8,
          concept: {
            description: "Some small pieces of text have a precise meaning that a machine cannot guess. The `abbr` element marks an **abbreviation** and can spell it out, the `dfn` element marks a term you are defining, the `time` element gives a date or time in a form computers understand, and the `address` element holds contact details.",
            why: "A reader may not know what an abbreviation stands for, and a calendar app cannot read \"next Tuesday\". When you add the machine-readable part, browsers, search engines and assistive tools can do something useful with your words.",
            mentalModel: "Picture a label on a filing cabinet. The label says what is inside in a way anyone can read, and a barcode on the same label lets a scanner read it too. These elements add the barcode to your words.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground, and find the abbreviation first.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>The <abbr title="Search and Rescue">SAR</abbr> team
    patrols the ridge every weekend.</p>`,
            },
            {
              type: "paragraph",
              text: "The `title` attribute holds the full form. On a desktop, hovering shows it as a tooltip, though a phone has no hover, so the tooltip is a bonus rather than something you can rely on. A better habit is to write the full term the first time it appears, followed by the abbreviation in brackets, and use `abbr` for the abbreviation after that.",
            },
            {
              type: "paragraph",
              text: "The `dfn` element marks the term that a sentence is defining, usually the first time it appears. If you also use `abbr` inside it, the pair says that the abbreviation is being defined here. Browsers draw `dfn` in italics, but you can restyle it, and its job is to tell readers and tools that this is the place where the term is explained.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>A <dfn>switchback</dfn> is a sharp turn that
    lets a path climb a steep slope.</p>`,
            },
            {
              type: "paragraph",
              text: "Next, `time`. A person writes a date in many ways, and a computer cannot tell \"9/11\" from \"11/9\". The `datetime` attribute holds the date in one fixed format, and the text between the tags can say it however suits the reader. Open this example and compare the two.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>The path reopens on
    <time datetime="2026-11-12">12 November</time>
    at <time datetime="18:00">six in the evening</time>.</p>`,
            },
            {
              type: "paragraph",
              text: "The dates in the attribute are written year, month, day, joined by dashes, so `2026-11-12` is the twelfth of November. A time of day is written with a 24-hour clock, like `18:00`, and a full date and time are joined with a `T`, as in `2026-11-12T18:00`. You can also write a length of time, such as `PT1H30M` for an hour and a half.",
            },
            {
              type: "paragraph",
              text: "Last, `address`. It holds contact information for the page or for the article around it, such as the author's email address or the organisation's postal address. It is not meant for any address you happen to mention in a sentence. Browsers draw it in italics, and you often use `br` inside it to break the lines of a postal address, which is one of the places where a line break belongs.",
            },
            {
              type: "code",
              language: "html",
              code: `<address>
      Ridge Trail Visitor Centre<br>
      14 Mill Lane, Hillford
    </address>`,
            },
            {
              type: "paragraph",
              text: "None of these four elements changes how the page looks very much, and that is exactly why they are easy to skip. They are quiet, careful details, and they are what separates markup that only looks right from markup that says the right thing.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "subscripts-superscripts-and-edits",
          kind: "learn",
          title: "Subscripts, superscripts and edits",
          summary: "sub, sup, del and ins, and when each is a real part of the content.",
          minutes: 8,
          concept: {
            description: "The `sub` element lowers text below the line and the `sup` element raises it above the line. Two further elements record changes to a document: `del` marks text that has been removed, and `ins` marks text that has been added. Each carries meaning that goes beyond how it looks.",
            why: "Some writing cannot be understood without these small shifts. Water is not H2O, and a square metre is not the same as an \"m2\". When you mark a correction as a correction, readers, and tools that compare versions, can see exactly what changed and why.",
            mentalModel: "Picture a scientist's notebook. Chemical formulae and units have little numbers tucked above and below the letters, and an editor's red pen crosses out old words and writes new ones above them.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground and look at the small numbers.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>Water is H<sub>2</sub>O.</p>
    <p>The car park covers 2,500 m<sup>2</sup>.</p>
    <p>The race is on the 1<sup>st</sup> of May.</p>`,
            },
            {
              type: "paragraph",
              text: "The `sub` element is for text that is part of the content and belongs below the line, such as the 2 in a chemical formula. The `sup` element is for text that belongs above it, such as the 2 in square metres, an ordinal suffix, or a footnote marker. Both are drawn smaller by default. Do not use them to make text smaller or to shift a word up for decoration, because that is a job for CSS.",
            },
            {
              type: "paragraph",
              text: "Now the editing pair. Open the next example and look at both elements.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>The path is
    <del>6</del> <ins>7</ins> kilometres long.</p>`,
            },
            {
              type: "paragraph",
              text: "Browsers draw `del` with a line through it and `ins` with an underline. Together they say that the six was replaced by a seven. You can add a `datetime` attribute to either one, to record when the change was made, and a `cite` attribute with the address of a page that explains why. These are not shown to visitors, but tools that track changes can read them.",
            },
            {
              type: "paragraph",
              text: "You may be wondering how this differs from `s`, which also draws a line through text. The `s` element is for content that is no longer accurate or relevant but still belongs on the page, such as an old price next to a new one. The `del` element is for an edit to a document, where the old text has been taken out. If you want to show that something changed, use `del` and `ins`, and if you want to show that something has expired, use `s`.",
            },
            {
              type: "paragraph",
              text: "A word of caution about underlines. Because `ins` is drawn with an underline, and links are underlined too, visitors may mistake it for a link. If you use `ins` on a page with links, think about restyling it, perhaps with a coloured background instead, so the two cannot be confused.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>Open <del datetime="2026-11-01">Monday to Friday</del>
    <ins datetime="2026-11-09">every day</ins>.</p>`,
            },
            {
              type: "paragraph",
              text: "In practice you will use `sub` and `sup` more often than `del` and `ins`, because formulae, units and footnotes are common, while visible edit tracking is rare on the web. When you do need to show a correction openly, such as a news site fixing an error, the editing pair is the honest way to do it.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-misused-tags",
          kind: "debug",
          title: "Debug: tags used for their looks",
          mode: "html",
          summary: "Every tag here was chosen for how it looks. Replace each shortcut with the element that says what the text is.",
          minutes: 8,
          broken: {
            html: `<h1>Trail rules</h1>
    <p>Read these before you set off.<br><br><br>Stay on the marked path.<br><br><br>Take your litter home.</p>
    <p>&nbsp;</p>
    <p><b>Danger:</b> the ridge closes at dusk.</p>
    <blockquote>Check the weather before you leave.</blockquote>`,
            css: "",
          },
          challenge: {
            title: "Replace the shortcuts",
            description: "This page has four shortcuts. Stacked line breaks make gaps, an empty paragraph makes another gap, a bold tag stands in for an important warning, and a `blockquote` is used only to indent a sentence that is not a quote. Fix each one so the page has five real paragraphs, no breaks, no `b` and no `blockquote`, and the warning is strongly important.",
            hints: [
              "Where the text is split by breaks, each piece should be its own paragraph. Delete the empty paragraph too.",
              "Swap the `b` for the element that means strong importance.",
              "The sentence in the `blockquote` is not quoted from anywhere, so it should be a plain paragraph.",
            ],
            checks: [
              {
                type: "count",
                selector: "br",
                message: "There are no `br` elements left",
                max: 0,
              },
              {
                type: "count",
                selector: "p",
                message: "...the text is in exactly five paragraphs, with no empty one",
                min: 5,
                max: 5,
              },
              {
                type: "text",
                selector: "strong",
                includes: "Danger",
                message: "...the warning is marked with `strong`",
              },
              {
                type: "count",
                selector: "b",
                message: "...no `b` is left",
                max: 0,
              },
              {
                type: "count",
                selector: "blockquote",
                message: "...and no `blockquote` is left.",
                max: 0,
              },
            ],
            solution: {
              html: `<h1>Trail rules</h1>
    <p>Read these before you set off.</p>
    <p>Stay on the marked path.</p>
    <p>Take your litter home.</p>
    <p><strong>Danger:</strong> the ridge closes at dusk.</p>
    <p>Check the weather before you leave.</p>`,
              css: "",
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "special-characters-and-entities",
          kind: "learn",
          title: "Special characters and entities",
          summary: "How to show angle brackets, ampersands and symbols, and why you need so few entities now.",
          minutes: 8,
          concept: {
            description: "An **entity**, or character reference, is a way to write a character that you cannot, or should not, type directly. It starts with an ampersand and ends with a semicolon. For example, `&lt;` produces a less-than sign, `&amp;` produces an ampersand, and `&copy;` produces a copyright sign.",
            why: "Two characters have special jobs in HTML, the opening angle bracket that begins a tag and the ampersand that begins an entity. If you want to show either one as text, you must escape it. Without that, your text can vanish or turn into something you did not mean.",
            mentalModel: "Imagine a script where stage directions are written in brackets. If a character needs to say a bracket aloud, the writer has to mark it in a special way, so the actors do not treat it as a direction. An entity is that special mark.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's try it. Open the example in the Playground and compare what is typed with what appears on the page.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>Use &lt;p&gt; for a paragraph.</p>
    <p>Boots &amp; poles are on sale.</p>
    <p>&copy; 2026 Ridge Trail</p>`,
            },
            {
              type: "paragraph",
              text: "The first line shows the characters of a tag instead of making one. The second line shows an ampersand, and the third shows a copyright sign. In every case, the browser reads the entity, and puts the character in its place. There are only two you must remember: `&lt;` for the opening bracket, and `&amp;` for the ampersand.",
            },
            {
              type: "paragraph",
              text: "Entities come in two flavours. A named entity uses a short word, such as `&copy;` or `&nbsp;`, and a numeric entity uses the character's code number, either in decimal, as in `&#169;`, or in hexadecimal with an x, as in `&#xA9;`. They produce the same symbol. The numeric form is the one to use for a character with no handy name, such as a tree emoji, which you can write as `&#x1F332;`.",
            },
            {
              type: "code",
              language: "html",
              code: `<p>&#169; and &#xA9; are the same sign.</p>
    <p>A tree: &#x1F332;</p>
    <p>Or type it: © and 🌲</p>`,
            },
            {
              type: "paragraph",
              text: "The last line makes an important point. Because your page declares UTF-8 in its head, as you saw in the document structure topic, you can type most symbols and accented letters directly, and they appear correctly. You therefore need entities mainly for the two special characters, and for characters that are invisible or easily mistaken, such as the non-breaking space.",
            },
            {
              type: "paragraph",
              text: "The non-breaking space, `&nbsp;`, looks like a normal space, but the browser will not break a line at it, and will not collapse several of them into one. That is useful for keeping a number and its unit together, as in `10&nbsp;km`, so they never sit on different lines. It is not a tool for spacing. A row of them to indent text is a hack that makes the page awkward to restyle, so use CSS for that.",
            },
            {
              type: "paragraph",
              text: "Always end an entity with its semicolon. Browsers forgive a missing one in some cases, but they do not in every case, and the result can be surprising. If you see a stray ampersand or odd characters on a page, look for an entity that is missing its semicolon, or a bracket that should have been escaped.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "language-and-direction",
          kind: "learn",
          title: "Language and direction",
          summary: "lang on any element, dir, bdi and wbr: marking text for people and for tools.",
          minutes: 8,
          concept: {
            description: "The `lang` attribute says what language text is written in. You set it once on the `html` element for the whole page, and you can override it on any element for a phrase in another language. A matching attribute, `dir`, says whether the text runs left to right or right to left.",
            why: "A screen reader decides how to pronounce a word from the language you give it, and a browser uses it to translate the page, to hyphenate words and to choose quotation marks. If you leave it out, a French phrase is read in an English accent, which can make it impossible to understand.",
            mentalModel: "Imagine a tour guide reading a menu aloud. If the guide knows that a dish is in Italian, they pronounce it properly. If they do not know, they read it as English, and nobody at the table knows what they ordered.",
          },
          body: [
            {
              type: "paragraph",
              text: "Open the example in the Playground. The page is in English, with one French phrase set inside it.",
            },
            {
              type: "code",
              language: "html",
              code: `<html lang="en">
      <body>
        <p>The guide wished us <span lang="fr">bonne chance</span>
        and sent us up the ridge.</p>
      </body>
    </html>`,
            },
            {
              type: "paragraph",
              text: "The `lang` on the `html` element sets the default for everything inside. The `lang` on the `span` overrides it just for those two words, and anything nested inside the `span` inherits the new value. You write the value as a language code, such as `en` for English, `fr` for French, `es` for Spanish or `ja` for Japanese. You can add a region after a hyphen, as in `pt-BR` for Brazilian Portuguese.",
            },
            {
              type: "paragraph",
              text: "Languages like Arabic and Hebrew are written from right to left, and the `dir` attribute handles that. Setting `dir=\"rtl\"` on the `html` element flips the direction of the whole page. You can also set it on a single element, which is useful for a short quotation in the other direction. The value `ltr` means left to right, and `auto` lets the browser decide from the first letter it finds.",
            },
            {
              type: "code",
              language: "html",
              code: `<html lang="ar" dir="rtl">
      <body>
        <p>مرحبا بكم في الدليل</p>
      </body>
    </html>`,
            },
            {
              type: "paragraph",
              text: "Direction can go wrong when you insert text that you did not write, such as a visitor's username in a list of comments. If the name is in Arabic and the rest of the line is in English, the punctuation can end up in the wrong place. The `bdi` element isolates its contents so the browser works out the direction on its own, without disturbing the text around it.",
            },
            {
              type: "code",
              language: "html",
              code: "<p>Comment by <bdi>مستخدم</bdi>: great trail!</p>",
            },
            {
              type: "paragraph",
              text: "One more small tool is `wbr`, which suggests a place where a very long word or web address may break onto a new line if it has to. It is an empty element that you drop in between the parts, such as `a-very-long<wbr>trail-name`, and browsers use it only when there is no other room.",
            },
            {
              type: "paragraph",
              text: "Make it a habit to check that every page you write has `lang` on its `html` element, and add it to any phrase that is in a different language. It takes a few seconds, it costs nothing, and it makes a difference to the people who rely on it most.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    writeATrailReport,

    /* ------------------------------------------------------------------ */
    {
          id: "text-and-headings-quiz",
          kind: "quiz",
          title: "Quiz: text and headings",
          summary: "Seventeen questions on headings, paragraphs, emphasis, quotes, code, small details, entities and language.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "Which heading level is normally used once on a page, for the title of the whole page?",
              options: ["`h2`", "`h1`", "`h6`", "`title`"],
              answerIndex: 1,
              explanation: "The `h1` names the page itself, and the other levels name the sections inside it. The `title` element lives in the head and is a different thing.",
            },
            {
              prompt: "A page has an `h2` followed directly by an `h4`. What is wrong?",
              options: [
                "Nothing, browsers accept any order",
                "Two headings cannot be next to each other",
                "`h4` cannot follow `h2` under any circumstances",
                "A level is skipped, so the outline has a gap",
              ],
              answerIndex: 3,
              explanation: "Levels should go down one step at a time. A skipped level confuses people who navigate by headings, even though the browser draws it without complaint.",
            },
            {
              prompt: "The structure of your page says a heading should be an `h2`, but you want it to look small. What should you do?",
              options: [
                "Keep the `h2` and make it smaller with CSS",
                "Use an `h5` instead",
                "Wrap it in `small`",
                "Use a bold paragraph",
              ],
              answerIndex: 0,
              explanation: "The level carries the meaning, and the stylesheet carries the looks. Changing the tag to change the size breaks the outline.",
            },
            {
              prompt: "What does the browser show for `<p>One     two</p>`, with five spaces typed between the words?",
              options: [
                "The words with five spaces between them",
                "The words on two lines",
                "The words with one space between them",
                "An error",
              ],
              answerIndex: 2,
              explanation: "Runs of spaces, tabs and line breaks collapse into a single space in normal text.",
            },
            {
              prompt: "What is the right way to get a bigger gap between two paragraphs?",
              options: ["Stack some `br` elements between them", "Use margins in CSS", "Add an empty paragraph", "Type lots of non-breaking spaces"],
              answerIndex: 1,
              explanation: "Spacing belongs in the stylesheet, where one change can restyle every paragraph at once.",
            },
            {
              prompt: "Which of these is a good use of `br`?",
              options: [
                "Making a gap between two sections",
                "Replacing a heading",
                "Indenting a paragraph",
                "Separating the lines of a postal address",
              ],
              answerIndex: 3,
              explanation: "A line break is right when the break is part of the content, as in an address or a poem.",
            },
            {
              prompt: "Which pair of elements records a correction in a document?",
              options: ["`b` and `i`", "`sub` and `sup`", "`del` and `ins`", "`mark` and `small`"],
              answerIndex: 2,
              explanation: "The `del` element shows removed text and `ins` shows added text. Together they record an edit.",
            },
            {
              prompt: "What is the difference between `em` and `strong`?",
              options: [
                "`em` is for stress on a word, and `strong` is for importance",
                "`em` is italic and `strong` is bold, and that is the whole difference",
                "`em` is for headings and `strong` is for paragraphs",
                "There is no difference",
              ],
              answerIndex: 0,
              explanation: "Italic and bold are only the default looks. The elements describe stress and importance.",
            },
            {
              prompt: "Which element marks the title of a book or an article that you refer to in a sentence?",
              options: ["`q`", "`cite`", "`dfn`", "`abbr`"],
              answerIndex: 1,
              explanation: "The `cite` element is for the title of a creative work. The author's name is ordinary text.",
            },
            {
              prompt: "Why should you not type quotation marks inside a `q` element?",
              options: [
                "`q` forbids punctuation",
                "They would hide the text",
                "They would turn the text into a link",
                "The browser adds the right quotation marks itself",
              ],
              answerIndex: 3,
              explanation: "The browser draws marks that suit the language of the page, so typing your own gives you two sets.",
            },
            {
              prompt: "What does the `cite` attribute on a `blockquote` hold?",
              options: [
                "The web address of the source, which visitors do not see",
                "The author's name, shown under the quote",
                "The date of the quote",
                "The colour of the quote",
              ],
              answerIndex: 0,
              explanation: "It is an address that tools can read. The credit that visitors see goes outside the quote, often in a `figcaption`.",
            },
            {
              prompt: "Why is `pre` used for a block of code?",
              options: [
                "It colours the code",
                "It stops the code from running",
                "It keeps spaces and line breaks exactly as typed",
                "It makes the text bigger",
              ],
              answerIndex: 2,
              explanation: "Preformatted text switches off whitespace collapsing, so the indentation of code survives.",
            },
            {
              prompt: "You want to show the text `<p>` on a page. What do you type?",
              options: ["`<p>`", "`&lt;p&gt;`", "`\\<p\\>`", "`<<p>>`"],
              answerIndex: 1,
              explanation: "The opening angle bracket begins a tag, so you write it as an entity. Otherwise the browser treats it as a real paragraph.",
            },
            {
              prompt: "What is the `datetime` attribute on a `time` element for?",
              options: [
                "It is shown to the visitor",
                "It makes the text a link",
                "It sets the time zone of the page",
                "It gives the date or time in a format that a computer can read",
              ],
              answerIndex: 3,
              explanation: "The text between the tags is for people. The attribute is the same moment written in a fixed format, such as `2026-11-12`.",
            },
            {
              prompt: "Which is a correct use of `sub`?",
              options: ["The word `Warning`", "Making any text smaller", "The 2 in `H<sub>2</sub>O`", "A footnote marker"],
              answerIndex: 2,
              explanation: "Subscripts are for text that belongs below the line, such as a chemical formula. Footnote markers use `sup`, and size is a job for CSS.",
            },
            {
              prompt: "A French phrase sits inside an English page. How do you tell screen readers to pronounce it as French?",
              options: [
                "Set `lang=\"fr\"` on an element around it",
                "Put it in an `i` element",
                "Write it in capital letters",
                "Nothing, they work it out",
              ],
              answerIndex: 0,
              explanation: "The `lang` attribute can go on any element and overrides the page language for that part.",
            },
            {
              prompt: "What is the job of `&nbsp;`?",
              options: [
                "To add as much space as you like",
                "To keep two words on the same line, as a space that does not break",
                "To start a new paragraph",
                "To make the next word bold",
              ],
              answerIndex: 1,
              explanation: "It is a space the browser will not break at or collapse. It is handy in `10&nbsp;km`, and it is not a tool for indenting.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "text-and-headings-review",
          kind: "review",
          title: "Review: text and headings",
          summary: "Headings, paragraphs, emphasis, quotes, code, small details, entities, language and a checklist for choosing an element.",
          minutes: 4,
          body: [
            {
              type: "paragraph",
              text: "Headings give a page its outline. Use one `h1` for the title, `h2` for the main sections, and `h3` for parts of those, going down one level at a time and back up as far as you like. Choose the level from the structure, never from the size you want, and let CSS decide the looks. A title with a tagline can sit in an `hgroup`.",
            },
            {
              type: "code",
              language: "html",
              code: `<h1>Ridge Trail guide</h1>
    <h2>What to bring</h2>
    <h3>Clothing</h3>
    <h2>Safety</h2>`,
            },
            {
              type: "paragraph",
              text: "Paragraphs hold running text. The browser collapses every run of spaces and line breaks into one space, so your source can be as tidy as you like. Use `br` only when the break is part of the content, such as an address, use `hr` for a real change of topic, and put every gap in CSS. Use `pre` when you need whitespace kept, and put `code` inside it for a block of code.",
            },
            {
              type: "paragraph",
              text: "Inline elements say what a piece of text is. `em` is stress, `strong` is importance, `cite` is the title of a work, `q` is a short quotation, `abbr` and `dfn` handle abbreviations and defined terms, `time` carries a machine-readable date, `sub` and `sup` shift text for formulae and footnotes, and `del` and `ins` record an edit. The smaller `b`, `i`, `mark`, `small`, `s` and `u` each have a narrow job, so reach for them only when nothing more specific fits.",
            },
            {
              type: "code",
              language: "html",
              code: `<p><strong>Danger:</strong> the path closes on
    <time datetime="2026-11-12">12 November</time>.</p>
    
    <figure>
      <blockquote><p>Walk it slowly.</p></blockquote>
      <figcaption>A. Walker, in <cite>Notes from the Ridge</cite></figcaption>
    </figure>`,
            },
            {
              type: "paragraph",
              text: "Write `&lt;` for an opening angle bracket and `&amp;` for an ampersand. With UTF-8 you can type most other symbols directly, and `&nbsp;` keeps two words together. Set `lang` on the `html` element, override it on any phrase in another language, and use `dir` for text that runs right to left.",
            },
            {
              type: "paragraph",
              text: "When you are not sure which element to use, ask three questions. What is this text, in meaning? Would the sentence still need it if the browser drew every element as plain text? And is the only reason for the tag the way it looks? If the answer to the last question is yes, use a `span` or a CSS rule and keep the tags honest.",
            },
          ],
        },
  ],
};

export default content;
