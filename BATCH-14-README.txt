BATCH 14: HTML, Links (23 lessons)
Applies on top of: batch 13 (Text and headings). Copy the contents of this zip over your css-lab-main folder.

LESSONS (in order)
 1 What is a link? (learn)                       13 Download links (learn)
 2 Absolute and relative URLs (learn)            14 Links or buttons? (learn)
 3 Relative paths and folders (learn)            15 Images and cards as links (learn)
 4 Predict the path                              16 Link states and focus (learn)
 5 Links within a page (learn)                   17 Link look explorer (visualizer)
 6 Lab: jump navigation                          18 Click area explorer (visualizer)
 7 Debug: the dead links                         19 Keeping links healthy (learn)
 8 Writing good link text (learn)                20 Debug: the risky links
 9 New tabs and the rel attribute (learn)        21 Workshop: build a trail directory (12 steps)
10 Lab: link the guide                           22 Quiz: links (17 questions)
11 Email, phone and other links (learn)          23 Review: links
12 Predict what a click does
Learn lessons run 455 to 499 words. Quiz and predict answers are spread across all four positions.

FILES (complete contents, same paths as your project)
  src/content/html/links.ts                                          NEW, the topic
  src/content/html/links/workshops/build-a-trail-directory/          NEW: workshop.json, step-001 ... step-012, workshop.generated.ts
  src/content/index.ts                                               REPLACED (cumulative): Links gets load + lessonCount: 23
  src/content/lesson-index.generated.ts                              REPLACED (cumulative, 384 lessons)
  src/lib/explain/explainHtml.ts                                     REPLACED (cumulative): new descriptions for rel, download, target="_blank",
                                                                     and href values that start with mailto: and tel:
  knowledge.ts is unchanged (color, text-decoration, font-weight, display and padding already had descriptions).

COMMANDS (PowerShell, from the css-lab-main folder, after copying the files over)
  npm run build:content
  npm run typecheck
  npm run test:content
  npm run dev

CHECKLIST
  [ ] test:content ends with "Checked 384 lessons" and "All content checks passed" (or paste me the problem list)
  [ ] typecheck is clean
  [ ] HTML > Links opens with 23 lessons
  [ ] Link look explorer: the "Invisible links" preset makes the links disappear into the text, and the challenge completes with amber, underline and 700
  [ ] Click area explorer: the dashed boxes grow as padding grows, and the box annotation shows the layers of the links
  [ ] Open in Playground works on the examples, including the one with <style> in "Link states and focus" (press Tab to see the focus ring)
  [ ] In "Images and cards as links", the example image does not load, and its alt text shows instead (that is intended)
  [ ] Workshop: step 1 fails on the plain page and passes after the first link; all 12 steps pass when you type the solution
  [ ] The explain panel describes rel, download and mailto: hrefs when you type them in a lab

VERIFIED IN MY SANDBOX
  Static rules pass. All 44 browser cases (every starter fails, every solution passes, every predict proof holds) pass in headless Chromium at 375,
  800 and 1400 px. The jsdom approximation passes. test-quiz, test-explain, test-css and test-annotations pass. A clean copy of batch 13's state plus
  this zip rebuilds an identical lesson index and workshop file.

NOT VERIFIED, AND LEAST CERTAIN
  1. Real jsdom (npm run test:content). I cannot run it, so you are the check. You have not yet pasted results for batch 13, so I also have not seen
     whether its two least certain checks passed (white-space in the Whitespace explorer, and the workshop step 10 text with a copyright sign).
     Least certain in this batch: the text-decoration read in the Link look explorer (Chromium returns a longer value than the plain word, and I accept both),
     and the padding read in the Click area explorer.
  2. npm run typecheck. My sandbox has no node_modules, so I could not run tsc.
  3. The look of the pages in your real app (pane layout, the box annotation on links, the broken example image) was not seen.
  4. The predict proofs only prove structure (for example that a link has a given href). What a click does in a browser, such as scrolling, opening a
     mail program or saving a file, cannot be tested by jsdom, and the preview does not follow links, so those answers rest on the explanations.
