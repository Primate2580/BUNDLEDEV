CSS Lab, content batch 12: Custom properties (23 lessons)

APPLIES ON TOP OF integration 4 (and content batch 11). index.ts, lesson-index.generated.ts and
knowledge.ts are cumulative.

HOW TO APPLY (Windows, PowerShell, from the folder that contains css-lab-main)
  1. Extract this zip INTO css-lab-main and choose "Replace the files in the destination".
  2. cd css-lab-main
  3. npm run build:content
  4. npm run typecheck
  5. npm run test:content
  6. npm run dev   (open Custom properties under CSS > Advanced)

FILES
  NEW       src/content/css/custom-properties.ts
  NEW       src/content/css/custom-properties/workshops/theme-a-trail-card-set/   (workshop.json, step-001 ... step-012, generated file)
  REPLACED  src/content/index.ts, src/content/lesson-index.generated.ts, src/lib/explain/knowledge.ts

THE TOPIC (23 lessons, written in the flowing voice: no subheadings, 450 to 500 words in each Learn lesson)
  12 learn   what custom properties are, declaring and using, scope and inheritance, fallbacks and invalid values,
             design tokens, themes (light, dark and more), calc with variables, changing them from JavaScript,
             variables as a component's settings, @property, variables in media and container queries, gotchas.
             Code examples carry their own HTML, so "Open in Playground" works on them.
  2 visualizers (token explorer, scope explorer), 2 predict, 2 labs, 2 debug,
  1 workshop (12 steps: theme a trail card set), 1 quiz (17 questions), 1 review.

CHECKS TO WATCH IN test:content (least certain)
  Many checks read custom property values directly (for example --brand on :root, or --bg on the dark-theme wrapper).
  They pass in Chromium. If real jsdom does not return a custom property from getComputedStyle, every check on a
  "--something" property will fail the same way, and the fix is one change in the checks.

VERIFICATION CHECKLIST
  [ ] Dashboard shows Custom properties as playable, 23 lessons
  [ ] Token explorer: moving --radius rounds the card and the button together; the presets change several places at once
  [ ] Scope explorer: setting an accent on one panel changes only that panel
  [ ] Workshop: step 10 (dark theme) turns the page dark with no change to any component rule
  [ ] Labs and debug: Check my code passes with the shown solution, fails on the starter
