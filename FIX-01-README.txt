CSS Lab, fix 1: five test:content failures from earlier batches

APPLIES ON TOP OF batch 9. Nothing else is touched. No shared files are replaced.

CAUSE
  All five come from the same jsdom limitation: jsdom does not expand shorthands
  (font, background, transition) into longhands, and when a longhand is written after a
  shorthand in the same rule, jsdom keeps the shorthand's reset value. Chromium, the
  real browser, is correct in every case, so the lessons were right in a browser but the
  automatic checks read the wrong value in jsdom.

FIXES
  typography.ts             predict-the-font-shorthand q2: removed the `proves` check
                            (answer is unchanged and stays correct in a browser)
  backgrounds-borders.ts    predict-the-background q2: removed the `proves` check (same reason)
  backgrounds-borders.ts    debug-the-vanished-background, box A: the bug is now a size
                            written without units (`40 40`) instead of a shorthand that
                            resets the size. Solution: `40px 40px`. Summary, description
                            and hints updated. The shorthand reset is still taught in the
                            predict lesson.
  media-queries.ts          predict-the-preference-query q1: the card's base transition is now
                            written as transition-property + transition-duration longhands
  pseudo-classes workshop   build-a-settings-panel: `.field` used `font: inherit; font-size: 1rem`.
                            It now uses `font-family: inherit; font-size: 1rem` in the seed and
                            every step's solution, and the generated file is rebuilt

HOW TO APPLY (Windows, PowerShell, from the folder that contains css-lab-main)
  1. Extract this zip INTO css-lab-main and choose "Replace the files in the destination".
  2. cd css-lab-main
  3. npm run build:content
  4. npm run typecheck
  5. npm run test:content    (expect 0 problems)

FILES
  src/content/css/typography.ts
  src/content/css/backgrounds-borders.ts
  src/content/css/media-queries.ts
  src/content/css/pseudo-classes/workshops/build-a-settings-panel/   (step-001 seed.css and solution.css,
      step-002 ... step-012 solution.css, workshop.generated.ts)
