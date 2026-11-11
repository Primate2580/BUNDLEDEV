CSS Lab, integration 2: open lesson code examples in the Playground

APPLIES ON TOP OF content batch 11. No lesson content changes, and no new packages.

HOW TO APPLY (Windows, PowerShell, from the folder that contains css-lab-main)
  1. Extract this zip INTO css-lab-main and choose "Replace the files in the destination".
  2. cd css-lab-main
  3. npm run typecheck
  4. npm run test:seed
  5. npm run test:workspace
  6. npm run test:content
  7. npm run dev

WHAT IT DOES
  Every HTML and CSS code example in a Learn lesson now has an "Open in Playground" button next to Copy.
  It opens the Playground with that code already in the editor and the live result beside it, so you can
  change it and watch the output update. Reset in the Playground goes back to the example you opened.
  - HTML examples open as they are, in the Playground's HTML mode.
  - CSS examples open in CSS mode. A CSS snippet has nothing to style on its own, so the Playground gets
    sample markup built from the snippet's selectors (".menu a" becomes a div.menu with a link inside,
    ".item:nth-child(2)" gives three items, and so on). Declarations with no rule are wrapped in a sample box.
  - An author can supply exact markup for a CSS example by adding an "html" string to the code block:
    { type: "code", language: "css", code: "...", html: "<span class=\"badge\">New</span>" }
    (the content generators now take an optional html argument for this).
  - JavaScript examples and the code a workshop step tells you to type do not show the button.

FILES
  NEW       src/lib/playgroundSeed.ts, src/components/lesson/OpenInPlayground.tsx, scripts/test-playground-seed.ts
  REPLACED  src/components/lesson/CodeBlock.tsx, src/components/lesson/ContentBlocks.tsx
  REPLACED  src/engine/types.ts (code blocks may carry an optional html field)
  REPLACED  src/pages/Playground.tsx (starts from the example it was opened with)
  REPLACED  package.json (adds the test:seed script), scripts/test-workspace.ts

CHECKLIST
  [ ] Open a Learn lesson: each HTML or CSS code block shows "Open in Playground"
  [ ] Click it on a CSS example: the Playground opens in CSS mode with that CSS and sample markup, and the output shows it
  [ ] Edit the code: the output updates. Reset returns to the example
  [ ] An HTML example opens in the HTML mode
  [ ] The header's Playground link still opens the usual starter
