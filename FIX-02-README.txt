FIX-02: fixes for the test:content failures reported after batches 10-12
Applies on top of: batch 12 (custom-properties), i.e. your current project.

WHAT WAS WRONG
1. css/custom-properties/theme-a-trail-card-set step-005 and step-006: the solution failed check 1.
   jsdom removes the spaces around "/" and "*" inside custom property values
   (rgb(15 23 42 / 0.15) reads back as rgb(15 23 42/0.15), calc(var(--space-3) * 2) as calc(var(--space-3)*2)).
   Both checks now also accept those forms. Chromium still accepts the spaced forms.
2. css/transforms-animations predict-the-transform-order: the correct answers sat in the same position.
   Questions 3 and 4 now have them in positions 4 and 3.
3. "Could not parse CSS stylesheet" before debug-the-form-state-selectors is expected noise: that lesson's
   broken CSS contains an unclosed bracket on purpose. It is not in the problem list.
4. The "no proves checks" notes are unchanged on purpose. They are notes, not failures.

FILES (complete contents, copy over your project, same paths)
  src/content/css/custom-properties/workshops/theme-a-trail-card-set/step-005/tests.ts
  src/content/css/custom-properties/workshops/theme-a-trail-card-set/step-006/tests.ts
  src/content/css/custom-properties/workshops/theme-a-trail-card-set/workshop.generated.ts
  src/content/css/transforms-animations.ts

COMMANDS (PowerShell, from the css-lab-main folder; copy the zip contents over the project first)
  npm run build:content
  npm run typecheck
  npm run test:content

CHECKLIST
  [ ] test:content reports "0 problem(s)" (or no problem list at all)
  [ ] steps 5 and 6 of "Theme a trail card set" pass in test:content
  [ ] in the app, workshop steps 5 and 6 still pass in the real browser when you type the solution
  [ ] Transforms: predict-the-transform-order shows the answers in different positions
  [ ] no new "answer positions" note for predict-the-transform-order

NOT VERIFIED
  Real jsdom (not available to me). The fix follows the exact values in your pasted output.
  Least certain: whether jsdom also changes other operators ("+", "-", commas) in custom property values.
  No other check in the project reads a "--name" value containing "/" or "*", so none should be affected.
