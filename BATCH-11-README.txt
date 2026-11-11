CSS Lab, content batch 11: Transforms and animations (23 lessons) + the new lesson voice

APPLIES ON TOP OF content batch 10 and integration 1. index.ts, lesson-index.generated.ts and
knowledge.ts are cumulative.

HOW TO APPLY (Windows, PowerShell, from the folder that contains css-lab-main)
  1. Extract this zip INTO css-lab-main and choose "Replace the files in the destination".
  2. cd css-lab-main
  3. npm run build:content
  4. npm run typecheck
  5. npm run test:content
  6. npm run dev   (open Transforms and animations under CSS > Advanced)

WHAT IS NEW IN THE APP (small engine changes for the new voice)
  - Learn lessons open as plain flowing text. The old three cards are gone: the opening is now what it is,
    why it matters, and a paragraph that starts "Think of it this way." (works for every existing lesson too).
  - Workshop steps can contain fenced code blocks (the text to type), in the explanation and in the task.
    The task is a calm highlighted box without a "Your task" label. Fenced blocks stay whole, even with blank lines inside.
  - test-content no longer requires a heading or a recap list in Learn lessons.

FILES
  NEW       src/content/css/transforms-animations.ts
  NEW       src/content/css/transforms-animations/workshops/bring-a-page-to-life/   (workshop.json, step-001 ... step-012, generated file)
  NEW       src/lib/stepText.ts, src/components/workshop/StepText.tsx
  REPLACED  src/content/index.ts, src/content/lesson-index.generated.ts, src/lib/explain/knowledge.ts
  REPLACED  src/components/lesson/ConceptCards.tsx, src/components/workshop/StepView.tsx
  REPLACED  scripts/build-content.ts, scripts/test-content.ts, CONTENT_GUIDE.md

THE TOPIC (23 lessons, 12 Learn at 450 to 500 words each, written as one flow with no subheadings)
  transform basics, translate and scale, rotate and skew, transform-origin, combining transforms and order,
  3D transforms, keyframes, animation properties, animation vs transition, animation patterns,
  motion and accessibility, animation gotchas.
  2 visualizers (transform explorer, keyframes explorer), 2 predict, 2 lab, 2 debug,
  1 workshop (12 steps, written as step-by-step instructions with code to type), 1 quiz (17 questions), 1 review.

NOTE ON OLDER LESSONS
  The 292 lessons from earlier batches keep their old structure (headings, compare blocks, callouts, recaps).
  They still render, now with the flowing opening. Rewriting them in the new voice is a separate pass, one topic at a time,
  if you want it.

VERIFICATION CHECKLIST
  [ ] Dashboard shows Transforms and animations as playable, 23 lessons
  [ ] A Learn lesson opens as plain text, with "Think of it this way." starting the third paragraph, and no subheadings
  [ ] Visualizers: the transform explorer pivots around the corner you choose, the keyframes explorer loops and stops as set
  [ ] Workshop step 3: the task shows the code to type in code blocks, with a copy button
  [ ] Labs and debug: Check my code passes with the shown solution, fails on the starter
  [ ] The loading ring, the entrance, the stagger, the pulse and the flip card all move in the workshop preview
