CSS Lab, integration 3: back to the lesson from the Playground

APPLIES ON TOP OF integration 2 (open lesson examples in the Playground). No lesson content changes, no new packages.

HOW TO APPLY (Windows, PowerShell, from the folder that contains css-lab-main)
  1. Extract this zip INTO css-lab-main and choose "Replace the files in the destination".
  2. cd css-lab-main
  3. npm run typecheck
  4. npm run test:seed
  5. npm run test:workspace
  6. npm run test:content
  7. npm run dev

WHAT IT DOES
  When you open a code example in the Playground, you can get back to exactly where you were:
  - A "Back to lesson" button in the header (always visible in the Playground), and a note with the same
    button at the top of the Playground's Learn pane that names the lesson you came from.
  - It returns to the same lesson, scrolls to the code example you opened, focuses its button and highlights
    the example for a moment, so you can carry on reading from there.
  - Your edits are kept while you go back and forth. Open the same example again and your edited version is
    there; Reset in the Playground still goes back to the original example. (Edits are kept for the visit,
    not saved to disk.)
  - Opening a different example starts from that example. The header's Playground link still opens the usual starter.

FILES
  NEW       src/store/usePlaygroundSessions.ts
  REPLACED  src/lib/playgroundSeed.ts (examples now have a stable id)
  REPLACED  src/components/lesson/OpenInPlayground.tsx (remembers where you came from, scrolls back on return)
  REPLACED  src/pages/Playground.tsx, src/components/layout/Header.tsx, src/store/useUI.ts
  REPLACED  scripts/test-playground-seed.ts, scripts/test-workspace.ts

CHECKLIST
  [ ] In a Learn lesson, click "Open in Playground" on a CSS example, edit the CSS, watch the output change
  [ ] Click "Back to lesson" (header or Learn pane): you land on the same lesson, at that code example, highlighted
  [ ] Click "Open in Playground" on the same example again: your edits are still there. Reset restores the original
  [ ] Open a different example: it starts from that example, not your earlier edits
  [ ] Use the header's Playground link: the normal starter, and no Back to lesson button
