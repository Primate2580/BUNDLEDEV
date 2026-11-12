BATCH 18: HTML, Basic forms (23 lessons)
Applies on top of: batch 17 (Tables). Copy the contents of this zip over your css-lab-main folder.
(You have not yet reported results for batch 17. If its test:content showed problems, paste them and I will fix those first. This zip's shared files are cumulative.)

LESSONS (in order)
 1 What is a form? (learn)                        13 Buttons (learn)
 2 Labels and inputs (learn)                      14 Lab: build a booking form
 3 Lab: label the fields                          15 Hints, defaults and autocomplete (learn)
 4 Input types (learn)                            16 Required, disabled and read-only (learn)
 5 Debug: the unlabelled form                     17 Form layout and styling (learn)
 6 Names, values and submitting (learn)           18 Form layout explorer (visualizer)
 7 Predict the submission                         19 Input size explorer (visualizer)
 8 Text areas and menus (learn)                   20 Common form mistakes (learn)
 9 Checkboxes and radio buttons (learn)           21 Workshop: build a booking form (12 steps)
10 Predict the radio groups                       22 Quiz: basic forms (18 questions)
11 Debug: the radio group                         23 Review: basic forms
12 Fieldset and legend (learn)
Learn lessons run 451 to 495 words. Quiz and predict answers are spread across the positions.

FILES (complete contents, same paths as your project)
  src/content/html/basic-forms.ts                                      NEW, the topic
  src/content/html/basic-forms/workshops/build-a-booking-form/         NEW: workshop.json, step-001 ... step-012, workshop.generated.ts
  src/content/index.ts                                                 REPLACED (cumulative): Basic forms gets load + lessonCount: 23
  src/content/lesson-index.generated.ts                                REPLACED (cumulative, 476 lessons)
  src/lib/explain/explainHtml.ts                                       REPLACED (cumulative): descriptions for fieldset and legend
  knowledge.ts is unchanged (padding, font-size, display and margin-bottom already had descriptions).

COMMANDS (PowerShell, from the css-lab-main folder, after copying the files over)
  npm run build:content
  npm run typecheck
  npm run test:content
  npm run dev

CHECKLIST
  [ ] test:content ends with "Checked 476 lessons" and "All content checks passed" (or paste me the problem list)
  [ ] typecheck is clean
  [ ] HTML > Basic forms opens with 23 lessons
  [ ] Form layout explorer: "Labels above" moves each label above its box; the challenge completes with block and 16px
  [ ] Input size explorer: "Tiny default" gives a cramped box, "Comfortable" a roomy one; the challenge completes with 12px and 1rem
  [ ] Predict the radio groups: after running the code, clicking Large clears Medium, and both "lone" radios can be chosen at once
  [ ] Workshop: step 1 fails on the plain lines and passes after the form wrapper; all 12 steps pass when you type the solution (step 12 adds a style element)
  [ ] Preview: pressing a submit button in the Playground does nothing visible. I read the preview code and its iframe is sandboxed with allow-scripts only, so forms cannot submit.
  [ ] The explain panel describes fieldset and legend when you type them in a lab

VERIFIED IN MY SANDBOX
  Static rules pass. All 44 browser cases (every starter fails, every solution passes, every predict proof holds) pass in headless Chromium at 375, 800 and
  1400 px. The jsdom approximation passes. test-quiz, test-explain, test-css and test-annotations pass. I read the real submission data in Chromium for
  "Predict the submission" (q=mill+creek&easy=yes&sort=time) and checked the radio behaviour of "Predict the radio groups" (choosing Large clears Medium and Small,
  both lone radios can be checked, and the data sent is size=l&x=1&y=1, with nothing for the untouched route group). A clean copy of the batch 17 state plus this zip
  rebuilds an identical lesson index and workshop file.

NOT VERIFIED, AND LEAST CERTAIN
  1. Real jsdom (npm run test:content), so you are the check, and batch 17 is unconfirmed too. Least certain here: the new `a11y label-for-input` rule on forms
     with a wrapped label (the debug lesson "the unlabelled form" has a label that wraps a password field), the adjacent-sibling selectors such as
     `label[for="name"] + input#name[name="name"]`, and the computed `padding` and `font-size` reads on `.field input` where jsdom's built-in input style applies.
  2. npm run typecheck. My sandbox has no node_modules, so I could not run tsc. I added two keys to the elements table and checked for duplicates.
  3. How the Playground preview reacts when someone presses Send. From reading PreviewFrame.tsx, the sandbox lacks allow-forms, so a submit is blocked and the page stays put, but I did not see it happen in the real app.
  4. The look of the pages in your real app was not seen (box annotation on the explorers).
  5. The statement that some phones zoom into fields with text under 16 pixels is general knowledge about iOS Safari, which I did not test here.
