BATCH 17: HTML, Tables (23 lessons)
Applies on top of: batch 16 (Lists), which you have confirmed passing with FIX-03 and batch 15. Copy the contents of this zip over your css-lab-main folder.

LESSONS (in order)
 1 What is a table? (learn)                       13 Styling tables (learn)
 2 Rows and cells (learn)                         14 Table style explorer (visualizer)
 3 Lab: build a timetable                         15 Tables and accessibility (learn)
 4 Header cells and scope (learn)                 16 Responsive tables (learn)
 5 Predict the table's shape                      17 Scroll wrapper explorer (visualizer)
 6 Head, body and foot (learn)                    18 Tables are not for layout (learn)
 7 Lab: caption and sections                      19 Debug: the layout table
 8 Captions and descriptions (learn)              20 Common table mistakes (learn)
 9 Spanning cells (learn)                         21 Workshop: build a walk timetable (11 steps)
10 Predict the spans                              22 Quiz: tables (17 questions)
11 Debug: the broken table                        23 Review: tables
12 Column groups (learn)
Learn lessons run 452 to 484 words. Quiz and predict answers are spread across the positions.

FILES (complete contents, same paths as your project)
  src/content/html/tables.ts                                          NEW, the topic
  src/content/html/tables/workshops/build-a-walk-timetable/           NEW: workshop.json, step-001 ... step-011, workshop.generated.ts
  src/content/index.ts                                                REPLACED (cumulative): Tables gets load + lessonCount: 23
  src/content/lesson-index.generated.ts                               REPLACED (cumulative, 453 lessons)
  src/lib/explain/explainHtml.ts                                      REPLACED (cumulative): descriptions for caption, thead, tbody, tfoot, colgroup, col, and for the
                                                                      scope, colspan, rowspan and tabindex attributes
  src/lib/explain/knowledge.ts                                        REPLACED (cumulative): descriptions for border-collapse, border-spacing and overflow-x, and the
                                                                      lower-alpha, upper-alpha, lower-roman and upper-roman values of list-style-type, which closes the three notes
                                                                      you saw for the List marker explorer

COMMANDS (PowerShell, from the css-lab-main folder, after copying the files over)
  npm run build:content
  npm run typecheck
  npm run test:content
  npm run dev

CHECKLIST
  [ ] test:content ends with "Checked 453 lessons" and "All content checks passed" (or paste me the problem list)
  [ ] the three list-marker-explorer notes about list-style-type are gone
  [ ] typecheck is clean
  [ ] HTML > Tables opens with 23 lessons
  [ ] Table style explorer: "Collapsed" turns the double lines into single lines, "Striped" shades the even rows; the challenge completes with collapse and 8px
  [ ] Scroll wrapper explorer: "Spills out" lets the table hang past the dashed box, "Clipped" cuts it, "Scrolls" adds a scrollbar; the challenge completes with auto
  [ ] Workshop: step 1 fails on the plain lines and passes after the header row; all 11 steps pass when you type the solution (steps 10 and 11 add a style element)
  [ ] The explain panel describes thead, tfoot, scope and colspan when you type them in a lab

VERIFIED IN MY SANDBOX
  Static rules pass. All 42 browser cases (every starter fails, every solution passes, every predict proof holds) pass in headless Chromium at 375, 800 and
  1400 px. The jsdom approximation passes. test-quiz, test-explain, test-css and test-annotations pass. I measured the scroll wrapper in Chromium: the
  wrapper is 288 px wide and the table 544 px, with overflow-x set to visible, hidden and auto, and the double-border table is wider than the collapsed one (178 against
  168 px). A clean copy of the batch 16 state plus this zip rebuilds an identical lesson index and workshop file.

NOT VERIFIED, AND LEAST CERTAIN
  1. Real jsdom (npm run test:content), so you are the check. Least certain here: the selectors `table > tbody > tr` and `tr:nth-child(2) > td, tr:nth-child(2) > th`,
     which rely on jsdom's parser adding a tbody the way a browser does, the `overflow-x` and `border-collapse` reads on a class selector, and `padding` read on `.grid td`.
  2. npm run typecheck. My sandbox has no node_modules, so I could not run tsc. I added keys to two lookup tables and one switch, and checked for duplicates.
  3. The look of the pages in your real app was not seen (the table explorers, and the style element in the workshop's head).
  4. The predict answers about what a screen reader announces for `7 km` rest on how scope is documented to work, and I did not test them with a real screen reader.
