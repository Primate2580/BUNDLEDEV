CSS Lab, integration 1: columns layout, Font Awesome icons, "Think of it this way"

APPLIES ON TOP OF the pane workspace update and content batch 10. No lesson content changes.

HOW TO APPLY (Windows, PowerShell, from the folder that contains css-lab-main)
  1. Extract this zip INTO css-lab-main and choose "Replace the files in the destination".
  2. cd css-lab-main
  3. npm install        (installs Font Awesome, and drops lucide-react from package.json)
  4. npm run typecheck
  5. npm run test:workspace
  6. npm run test:content
  7. npm run dev

WHAT CHANGED
  1. Columns arrangement. Lessons, Learn, Editor and Output can sit side by side as four columns.
     Lessons (the course navigation) is the fourth pane and starts hidden. At most three panes are
     open at once: showing a hidden one, from View or from the header's navigation button, hides the
     pane that has been open longest. Every column collapses to a rail, minimizes, maximizes or hides,
     and neighbouring columns have drag/keyboard splitters.
     Visualizer lessons open in Columns by default (their own saved layout). Lessons and the
     Playground keep the Split arrangement by default. View > Layout switches any of them.
  2. Font Awesome. Every icon now comes from src/components/ui/icons.tsx (free solid set).
  3. The "Mental model" card is now "Think of it this way".

NEW DEPENDENCIES (package.json)
  @fortawesome/fontawesome-svg-core ^6.7.2
  @fortawesome/free-solid-svg-icons ^6.7.2
  @fortawesome/react-fontawesome ^0.2.2
  (lucide-react removed)

FILES
  NEW       src/components/ui/icons.tsx
  REPLACED  package.json, README.md, scripts/test-workspace.ts
  REPLACED  src/lib/workspace/layout.ts, src/store/useUI.ts
  REPLACED  src/components/workspace/Workspace.tsx, Pane.tsx, ViewMenu.tsx
  REPLACED  src/components/layout/AppShell.tsx, Header.tsx, ThemeToggle.tsx
  REPLACED  src/components/lesson/ConceptCards.tsx
  REPLACED  src/components/visualizer/VisualizerPlayer.tsx
  REPLACED  every other component that imported lucide-react (import line only):
            code/CodeLab, code/PreviewFrame, dashboard/BadgeGrid, dashboard/ProgressSummary,
            explain/ExplainPanel, lab/ChecksList, lab/LabPlayer, lesson/CodeBlock, lesson/ContentBlocks,
            lesson/LessonFooter, lesson/UnavailableLesson, practice/QuestionCard, predict/PredictPlayer,
            quiz/QuizPlayer, search/SearchDialog, search/SearchResults, sidebar/TopicRow,
            sidebar/TrackSection, ui/KindIcon, visualizer/VisualizerChallenge,
            workshop/StepView, workshop/WorkshopPlayer, pages/Dashboard, pages/TopicPage, pages/TrackPage

IF TYPECHECK REPORTS A MISSING ICON
  The icon names are mapped in src/components/ui/icons.tsx. If your installed Font Awesome version does not
  export one of them (for example a renamed icon), change that one import there. Nothing else needs to change.

CHECKLIST
  [ ] Open a Visualizer lesson: three columns (Learn, Editor, Output), course navigation hidden
  [ ] Header navigation button: shows Lessons and hides Learn; View > Learn brings Learn back and hides the oldest open pane
  [ ] Collapse a column: it becomes a narrow rail, click it to expand
  [ ] Drag the splitters between columns; use the arrow keys on a focused splitter
  [ ] View > Layout > Split switches to the old arrangement and back
  [ ] Below 768px: panes become tabs
  [ ] Icons everywhere are Font Awesome; the lesson card reads "Think of it this way"
