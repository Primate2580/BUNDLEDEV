CSS Lab, integration 4: all four panes open by default

APPLIES ON TOP OF integration 3. No lesson content changes, no new packages.

HOW TO APPLY (Windows, PowerShell, from the folder that contains css-lab-main)
  1. Extract this zip INTO css-lab-main and choose "Replace the files in the destination".
  2. cd css-lab-main
  3. npm run typecheck
  4. npm run test:workspace
  5. npm run dev

WHAT CHANGED
  In the Columns arrangement (Visualizer lessons by default), Lessons, Learn, Editor and Output are all open
  side by side. You choose which to hide, from each pane's Hide button or View > Panes; nothing is hidden for
  you any more (the "at most three open" rule is gone). The header's navigation button still shows or hides Lessons.
  The Visualizer's saved layout restarts once (its storage key is now css-lab:layout:visualizer:v2), so you
  start from the new four-pane default even if you had hidden Lessons before. Lessons and Playground layouts are untouched.
  Default column widths: Lessons 17, Learn 27, Editor 26, Output 30 (parts of the width; drag the splitters to change them).

FILES
  REPLACED  src/lib/workspace/layout.ts, src/components/workspace/ViewMenu.tsx, src/store/useLayouts.ts
  REPLACED  scripts/test-workspace.ts, README.md

CHECKLIST
  [ ] Open a Visualizer lesson: four columns, Lessons on the far left
  [ ] View menu: all four panes ticked, and hiding any one leaves the other three
  [ ] The last open pane cannot be hidden
  [ ] Collapse a column: it becomes a rail. Drag the three splitters
