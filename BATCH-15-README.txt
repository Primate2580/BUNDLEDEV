BATCH 15: HTML, Images (23 lessons)
Applies on top of: batch 14 (Links). Copy the contents of this zip over your css-lab-main folder.

LESSONS (in order)
 1 The img element (learn)                        13 Debug: the broken images
 2 Writing alt text (learn)                       14 Figures and captions (learn)
 3 Predict the broken images                      15 SVG and icons (learn)
 4 Decorative, functional and complex images      16 Image gap explorer (visualizer)
 5 Debug: the vague alts                          17 Lazy loading and priority (learn)
 6 Lab: describe the images                       18 Lab: size the images
 7 Width, height and layout shift (learn)         19 Alt text in context (learn)
 8 Image sizing explorer (visualizer)             20 Checking your images (learn)
 9 Predict the image sizes                        21 Workshop: illustrate a trail guide (11 steps)
10 Image file formats (learn)                     22 Quiz: images (18 questions)
11 File size and compression (learn)              23 Review: images
12 Image paths and file names (learn)
Learn lessons run 456 to 495 words. Quiz and predict answers are spread across the positions.

FILES (complete contents, same paths as your project)
  src/content/html/images.ts                                         NEW, the topic
  src/content/html/images/workshops/illustrate-a-trail-guide/        NEW: workshop.json, step-001 ... step-011, workshop.generated.ts
  src/content/index.ts                                               REPLACED (cumulative): Images gets load + lessonCount: 23
  src/content/lesson-index.generated.ts                              REPLACED (cumulative, 407 lessons)
  src/lib/explain/explainHtml.ts                                     REPLACED (cumulative): descriptions for the width, height, loading, fetchpriority and decoding
                                                                     attributes, and for svg, circle and path
  src/lib/explain/knowledge.ts                                       REPLACED (cumulative): descriptions for the values of vertical-align

NOTE ON IMAGES
  The lessons use paths such as images/ridge.jpg that do not exist in the Playground, so those pictures show their alt text on purpose.
  The labs, predicts and visualizers that need a real picture use small built-in sample pictures (data: addresses).

COMMANDS (PowerShell, from the css-lab-main folder, after copying the files over)
  npm run build:content
  npm run typecheck
  npm run test:content
  npm run dev

CHECKLIST
  [ ] test:content ends with "Checked 407 lessons" and "All content checks passed" (or paste me the problem list)
  [ ] typecheck is clean
  [ ] HTML > Images opens with 23 lessons
  [ ] Image sizing explorer: "Squashed" distorts the picture, "Fluid" fits it; the challenge completes with max-width 100% and height auto
  [ ] Image gap explorer: the amber strip under the picture disappears with display: block (and with vertical-align: bottom)
  [ ] Predict the image sizes: after you run the code, the four pictures measure 400x300, 200x150, 200x300 and 100x75
  [ ] Open in Playground works on the lesson examples; missing pictures show alt text
  [ ] Workshop: step 1 fails on the page with no pictures; all 11 steps pass when you type the solution
  [ ] The explain panel describes width, height, loading and fetchpriority when you type them, and vertical-align values in the visualizer

VERIFIED IN MY SANDBOX
  Static rules pass. All 42 browser cases (every starter fails, every solution passes, every predict proof holds) pass in headless Chromium at
  375, 800 and 1400 px. The jsdom approximation passes. test-quiz, test-explain, test-css and test-annotations pass. I measured the four
  image sizes of "Predict the image sizes" in Chromium (400x300, 200x150, 200x300, 100x75) and the gap in the Image gap explorer (6 px with
  inline images, none with display: block). A clean copy of batch 14's state plus this zip rebuilds an identical lesson index and workshop file.

NOT VERIFIED, AND LEAST CERTAIN
  1. Real jsdom (npm run test:content). I cannot run it, so you are the check, and I still have not seen results for batches 13 and 14.
     Least certain in this batch: the `height` check in the Image sizing explorer (I accept "auto" for jsdom and "157.5px" for a browser),
     and the selector `img.photo[alt]:not([alt=""])` and `a[href="index.html"] > img[...]` in jsdom's selector engine.
  2. npm run typecheck. My sandbox has no node_modules, so I could not run tsc. I added keys to two lookup tables, and I removed one duplicate key
     (`title`) that would have failed it.
  3. The look of the pages in your real app was not seen (the box annotation on the Image gap explorer, the sample pictures).
  4. The predict answers about screen readers (what is read for an empty alt, for no alt, for a linked logo) rest on how screen readers behave in
     general, and I could not test them with a real screen reader here.
