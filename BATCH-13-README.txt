BATCH 13: HTML, Text and headings (23 lessons)
Applies on top of: batch 12 (custom properties) plus FIX-02. Copy the contents of this zip over your css-lab-main folder.

LESSONS (in order)
 1 Headings: h1 to h6 (learn)               13 Quotes and citations (learn)
 2 Heading levels and order (learn)         14 Lab: quote with credit
 3 Heading explorer (visualizer)            15 Code and preformatted text (learn)
 4 Debug: the skipped levels                16 Abbreviations, dates and contact details (learn)
 5 Paragraphs and whitespace (learn)        17 Subscripts, superscripts and edits (learn)
 6 Whitespace explorer (visualizer)         18 Debug: tags used for their looks
 7 Predict the whitespace                   19 Special characters and entities (learn)
 8 Line breaks and rules (learn)            20 Language and direction (learn)
 9 Emphasis and importance (learn)          21 Workshop: write a trail report (13 steps)
10 Predict what the markup says             22 Quiz: text and headings (17 questions)
11 Bold, italic and the rest (learn)        23 Review: text and headings
12 Lab: mark up a notice
Learn lessons run 459 to 497 words (about 5,800 in total). Quiz answers and predict answers are spread across all four positions.

FILES (complete contents, same paths as your project)
  src/content/html/text-and-headings.ts                         NEW, the topic
  src/content/html/text-and-headings/workshops/write-a-trail-report/   NEW: workshop.json, step-001 ... step-013, workshop.generated.ts
  src/content/index.ts                                          REPLACED (cumulative): Text and headings gets load + lessonCount: 23
  src/content/lesson-index.generated.ts                         REPLACED (cumulative, 361 lessons)
  src/lib/explain/explainHtml.ts                                REPLACED (cumulative): descriptions for 26 new elements (b, i, mark, small, s, u, blockquote, q, cite,
                                                                pre, code, kbd, samp, var, abbr, dfn, time, address, sub, sup, del, ins, bdi, bdo, wbr, hgroup) and for
                                                                the cite, datetime, dir and title attributes. The lang text now says "this element" when it is not on <html>.
  knowledge.ts is unchanged: the CSS properties used (font-size, font-weight, white-space, width) already had descriptions.

COMMANDS (PowerShell, from the css-lab-main folder, after copying the files over)
  npm run build:content
  npm run typecheck
  npm run test:content
  npm run dev

CHECKLIST
  [ ] test:content ends with "Checked 361 lessons" and "All content checks passed" (or a problem list to paste to me)
  [ ] typecheck is clean
  [ ] HTML > Text and headings opens, with 23 lessons in the sidebar
  [ ] Heading explorer: the right-hand panel never changes while the sliders move, and the challenge completes with h2 1rem and h3 2rem
  [ ] Whitespace explorer: pre keeps the spaces and breaks, pre-line keeps only the breaks, and the challenge completes with pre-line
  [ ] Open in Playground works on the HTML examples, including the Arabic one in "Language and direction" (text should run right to left)
  [ ] Workshop: step 1 fails on the plain text and passes after the h1; all 13 steps pass when you type the solution
  [ ] In the debug lessons the checklist starts red and turns green only after the fixes
  [ ] Explain panel: type <kbd> or <abbr title="..."> in a lab and read the description it gives

VERIFIED IN MY SANDBOX
  Static rules (verify.mts) pass. All 46 browser cases (every starter fails, every solution passes, every predict proof holds) pass in headless
  Chromium at 375, 800 and 1400 px. The jsdom approximation passes. test-quiz, test-explain, test-css and test-annotations pass. A clean copy of
  your previous state plus this zip rebuilds an identical lesson index and workshop file.

NOT VERIFIED, AND LEAST CERTAIN
  1. Real jsdom (npm run test:content). I cannot run it, so you are the check. Least certain: the white-space check in the Whitespace explorer
     (the first time white-space is read under jsdom), and the `text` checks that contain a copyright sign or an ampersand in the workshop (step 10).
  2. npm run typecheck. My sandbox has no node_modules, so I could not run tsc. The files follow the same shapes as earlier topics.
  3. The look of the pages in your real app (pane layout, Playground button, the Arabic text direction) was not seen. The checks above are structural.
  4. All eight predict questions have `proves` checks, but those only prove the structure (for example that a `pre` or a `br` exists). How the browser
     draws whitespace cannot be read by jsdom. I confirmed the rendering answers of "Predict the whitespace" separately in Chromium: the paragraph shows one line,
     the `pre` keeps two lines with its spaces, and the `br` gives two lines in one paragraph.
