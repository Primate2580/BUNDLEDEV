BATCH 16: HTML, Lists (23 lessons)
Applies on top of: batch 15 (Images) AND FIX-03 (the fix for the Link look explorer). Apply them in this order: FIX-03 (if you have not yet), batch 15, then this batch.
Your last paste showed 384 lessons, so batch 15 was not in your project yet. This zip's shared files (index.ts, lesson-index.generated.ts, explainHtml.ts,
knowledge.ts) are cumulative and refer to the Images topic, so it needs batch 15 present, and it must be applied AFTER batch 15 so that it does not get overwritten.

LESSONS (in order)
 1 What is a list? (learn)                        13 What goes inside a list item (learn)
 2 Unordered lists (learn)                        14 Choosing the right list (learn)
 3 Ordered lists (learn)                          15 Styling lists (learn)
 4 Ordered list attributes (learn)                16 List marker explorer (visualizer)
 5 Predict the numbers                            17 Menu reset explorer (visualizer)
 6 Lab: make a packing list                       18 Lists and accessibility (learn)
 7 Description lists (learn)                      19 Debug: the fake lists
 8 Lab: steps and terms                           20 Common list mistakes (learn)
 9 Nesting lists (learn)                          21 Workshop: build a day-out guide (10 steps)
10 Predict the nesting                            22 Quiz: lists (17 questions)
11 Debug: the broken lists                        23 Review: lists
12 Lists of links and menus (learn)
Learn lessons run 452 to 490 words. Quiz and predict answers are spread across the positions.

FILES (complete contents, same paths as your project)
  src/content/html/lists.ts                                          NEW, the topic
  src/content/html/lists/workshops/build-a-day-out-guide/            NEW: workshop.json, step-001 ... step-010, workshop.generated.ts
  src/content/index.ts                                               REPLACED (cumulative): Lists gets load + lessonCount: 23
  src/content/lesson-index.generated.ts                              REPLACED (cumulative, 430 lessons)
  src/lib/explain/explainHtml.ts                                     REPLACED (cumulative): descriptions for dl, dt, dd, and for the start, reversed, value,
                                                                     role and aria-current attributes, and type on an ol
  src/lib/explain/knowledge.ts                                       REPLACED (cumulative): descriptions for the values of list-style-position

COMMANDS (PowerShell, from the css-lab-main folder, after copying the files over)
  npm run build:content
  npm run typecheck
  npm run test:content
  npm run dev

CHECKLIST
  [ ] test:content ends with "Checked 430 lessons" and "All content checks passed" (or paste me the problem list)
  [ ] typecheck is clean
  [ ] HTML > Lists opens with 23 lessons
  [ ] List marker explorer: the roman and inside presets change the markers and the wrapping of the long item; the challenge completes with square and inside
  [ ] Menu reset explorer: the "Bullets off" preset leaves an indent and "Full reset" removes it; the challenge completes with none and 0px
  [ ] Predict the numbers: after running the code, the markers beside C, D, J and M are 7, 4, 11 and E
  [ ] Workshop: step 1 fails on the plain lines and passes after the ul; all 10 steps pass when you type the solution (step 9 adds a style element to the head)
  [ ] The explain panel describes dl, dt, dd, start, reversed and aria-current when you type them in a lab

VERIFIED IN MY SANDBOX
  Static rules pass. All 40 browser cases (every starter fails, every solution passes, every predict proof holds) pass in headless Chromium at 375, 800 and
  1400 px. The jsdom approximation passes. test-quiz, test-explain, test-css and test-annotations pass. I read the real markers in Chromium's accessibility tree
  for "Predict the numbers" (7, 4, 11 and E) and the nested marker in "Predict the nesting" (a hollow circle). A clean copy of the batch 15 state, plus FIX-03 and
  this zip, rebuilds an identical lesson index and workshop file.

NOT VERIFIED, AND LEAST CERTAIN
  1. Real jsdom (npm run test:content). I cannot run it, so you are the check. The Link look explorer failure you reported came from jsdom giving its built-in link
     colour priority over a bare `a` rule, and FIX-03 changes that selector. I looked for other checks in batches 13 to 16 that read a property which jsdom's built-in
     styles also set on a bare element selector, and found none, but I cannot rule it out. Least certain in this batch: the `list-style-position` read in the List
     marker explorer, and the selector `ul > :not(li), ol > :not(li)` in workshop step 10.
  2. npm run typecheck. My sandbox has no node_modules, so I could not run tsc. I added keys to two lookup tables and checked there are no duplicate keys.
  3. Images (batch 15) has not been confirmed in your jsdom either.
  4. The look of the pages in your real app was not seen (box annotation on the Menu reset explorer, the style element in the workshop's head).
  5. The claim about Safari with VoiceOver dropping the list announcement for list-style: none is from general knowledge of browser behaviour. I did not test it,
     and browsers change, so the lesson says "may" and "some".
