CSS Lab - pane workspace update

Extract this zip INTO your project folder (css-lab-main) and choose "Replace the files".
It contains only the files that changed or are new, so nothing else is touched.
No new packages: you do not need npm install (but it does no harm).

NEW
  src/lib/workspace/layout.ts           pane rules: collapse, minimize, maximize, hide, splits, saving
  src/lib/useMediaQuery.ts
  src/store/useLayouts.ts               saved layouts: one for lessons, one for the Playground
  src/components/workspace/             Workspace, Pane, Splitter, ViewMenu
  src/pages/VisualizerHub.tsx           the Visualizer toolbar link (/visualizer)
  scripts/test-workspace.ts

REPLACED
  src/App.tsx, src/index.css, src/store/useUI.ts
  src/components/layout/AppShell.tsx, Header.tsx
  src/components/code/CodeLab.tsx, PreviewFrame.tsx
  src/components/lab/LabPlayer.tsx, workshop/StepView.tsx, workshop/WorkshopPlayer.tsx
  src/components/visualizer/VisualizerPlayer.tsx, VisualizerChallenge.tsx
  src/components/predict/PredictPlayer.tsx
  src/components/lesson/LessonBody.tsx, LessonHeader.tsx, ConceptCards.tsx
  src/pages/LessonPage.tsx, Playground.tsx
  scripts/test-render.ts, package.json (adds test:workspace), README.md

Then run:
  npm run typecheck
  npm run test:workspace
  npm run dev
