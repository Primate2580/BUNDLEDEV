# CSS Lab

Interactive app for learning HTML, CSS and Tailwind CSS, beginner to pro.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). Needs Node 20+.

**Each new segment can add packages, so run `npm install` every time you unzip a new version.**
If Vite says "Failed to resolve import ...", a package is missing: run `npm install` again and restart `npm run dev`.

## Scripts

- `npm run dev` start the dev server
- `npm run build` type-check and build for production
- `npm run typecheck` type-check only
- `npm run vendor:tailwind` re-copies Tailwind's browser build into `src/vendor` (only after upgrading it)
- `npm run content:status` shows which topics are written and which lesson types each has
- `npm run build:content` compiles workshop step folders into typed data and regenerates the lesson index used by search, "up next" and badges (runs automatically before `dev`, `build` and the content tests)
- `npm test` runs all the test suites below
- `npm run test:explain` checks the plain-English explanations (CSS and HTML changes, warnings, mental model)
- `npm run test:a11y` renders real components and scans them with axe-core (ARIA, names, labels, roles)
- `npm run test:polish` checks streaks, badges, roadmap status, search ranking and arrow-key tabs
- `npm run test:quiz` checks quiz shuffling never breaks the right-answer mapping
- `npm run test:css` checks the CSS reader/writer the guided controls use
- `npm run test:annotations` checks the geometry for the flex axes, grid lines and box-model layers
- `npm run test:preview` checks the preview document builder and in-iframe bridge
- `npm run test:checks` checks the requirement runner (every check type) and runs the real bridge end to end in jsdom
- `npm run test:progress` checks saving, resuming and completing workshop steps
- `npm run test:workspace` checks the pane rules (collapse, minimize, maximize, hide, splits, saving) and the workspace markup
- `npm run test:content` validates every written topic: ids, depth, and that each lab's starter fails and solution passes

## Structure

- `src/engine` types for Track, Topic, Lesson, Challenge, Progress
- `src/content` the curriculum map (`index.ts`) and one file per topic
- `src/components` layout, sidebar, lesson engine (`lesson/`) and shared UI
- `src/pages` dashboard, topic and lesson pages
- `src/store` progress persistence (`progressStore.ts`) and app state
- `src/lib` helpers (ids, lazy topic loader, progress math)
- `src/components/code` CodeMirror editor, sandboxed preview and the `CodeLab` that joins them
- `src/components/search` the Ctrl/Cmd+K search dialog; `src/components/dashboard` stats and badges; `src/pages/TrackPage.tsx` the per-track roadmap
- `src/components/practice` the shared question card; `src/components/predict`, `src/components/quiz` those players
- `src/components/explain` the "What did that change do?" panel; `src/lib/explain` builds it from before/after code
- `src/components/visualizer` the Visualizer player: guided controls, presets, annotated preview, challenge
- `src/lib/css` the CSS reader/writer shared by controls and the editor; `src/lib/visualizer` annotation geometry
- `src/components/workshop` the step-by-step Workshop player (instructions, checks, hints, finish screen)
- `src/components/lab` the Lab player (task, live requirement checklist, hints, solution)
- `src/lib/checks` the self-contained requirement runner (`runChecks.ts`)
- `src/lib/preview` builds the preview document (CSP, bridge script, Tailwind) and defines its messages
- `scripts` tests and content tooling

## The pane workspace

Lessons with code (labs, debug, workshops, predict), the Playground and the Visualizer use one workspace.
The page never scrolls; each pane scrolls on its own (`overscroll-behavior: contain`). Reading lessons
(learn, review, quiz) scroll in the main area as before.

Two arrangements, chosen in the header's **View** menu and remembered per area (lessons, Playground, Visualizer):

- **Columns** (the default for Visualizer lessons): **Lessons**, **Learn**, **Editor** and **Output** side by side,
  all four open by default. Lessons is the course navigation. You choose which panes to hide; the header's navigation
  button and the View menu show or hide them.
- **Split**: Learn on the left, Editor above Output on the right.

Every pane can **collapse** (to a narrow rail in Columns, to its header in Split), **minimize** (docks at the bottom
left), **maximize** (Esc restores) or **hide** (bring it back from the View menu, which also resets the layout).
Splitters work by drag or keyboard: arrows (Shift for bigger steps), Home/End for the limits, Enter or double-click
to reset. Below 768px the panes become tabs. A maximized pane is never saved.

- Code: `src/lib/workspace/layout.ts` (pure rules, tested by `npm run test:workspace`), `src/store/useLayouts.ts`,
  `src/components/workspace/` (Workspace, Pane, Splitter, ViewMenu). `CodeLab` fills the Editor and Output panes and
  takes the Learn content as its `learn` prop.
- Saved under `css-lab:layout:lesson:v1`, `css-lab:layout:playground:v1` and `css-lab:layout:visualizer:v2`.
- The toolbar links go to `/playground` and `/visualizer` (every Visualizer lesson, `src/pages/VisualizerHub.tsx`).

## Icons

All icons are Font Awesome (the free solid set). Components import them from `@/components/ui/icons`, which maps
each icon name to its Font Awesome icon and sizes it in one place. To add an icon, import it from
`@fortawesome/free-solid-svg-icons` there and export it under the name you want to use.

## Adding a topic

1. Write `src/content/<track>/<topic-id>.ts` exporting a `TopicContent` as default.
2. In `src/content/index.ts`, add `load: () => import("./<track>/<topic-id>")` and
   `lessonCount` to that topic's entry.

No engine changes needed.

## Progress storage

All progress goes through `src/store/progressStore.ts`. Today it uses localStorage.
To move to Supabase later, replace the exported `progressStore` with a new
implementation of the same interface.

## How the preview stays safe

Learner code runs in an iframe with `sandbox="allow-scripts"` (no same-origin access) and a
Content-Security-Policy that lets only our own scripts run. A learner's `<script>` tags and
inline handlers are blocked, links to other pages and form submits are disabled, and the app
talks to the iframe only through `postMessage` (see `src/lib/preview/protocol.ts`).
Tailwind's browser build is inlined into the iframe, so nothing is fetched from a CDN.

## Theming (light, dark, system)

Colors are semantic CSS variables defined in `src/index.css` (`:root` for light, `.dark` for dark).
Use the semantic classes in components, never raw palette colors for surfaces or text:

- surfaces: `bg-ink` (page), `bg-panel`, `bg-raised`, `border-edge`
- text: `text-fg`, `text-fg-2`, `text-muted`, `text-faint`
- colored text: `text-accent`, `text-success`, `text-info`, `text-warn`, `text-danger`, `text-pro`
- text on solid buttons: `text-on-accent`

The choice is stored by `src/lib/theme.ts` and applied before first paint by a small script in
`index.html`. The learner's preview has its own light/dark canvas and is not affected by the app theme.

## Requirement checks

Labs (and, next, workshop steps) describe requirements as data: `exists`, `count`, `computedStyle`,
`attribute`, `text`, `doctype` and `a11y` checks (see `src/engine/types.ts`). `runChecks` evaluates them
against the learner's live page inside the sandboxed preview and returns pass/fail with a detail for each.
Its source text is copied into the preview by `bridge.ts`, so it must stay self-contained. The same function
runs in Node against jsdom for the tests. Writing lessons: see `CONTENT_GUIDE.md`.

## Search, roadmap and badges

- **Search** (Ctrl/Cmd+K, or `/`) runs over `src/content/lesson-index.generated.ts`, a small generated list of every
  lesson (never edit it; `npm run build:content` rebuilds it). It's downloaded only when needed.
- **Roadmap** pages (`/css`, `/html`, `/tailwind`) group topics by level. Prerequisites are advice only: nothing is
  ever locked, and a prerequisite that isn't written yet is never held against the learner.
- **Streaks and badges** come from `activityDays` (days with a completed lesson, workshop step or quiz attempt) and
  from the completed lessons themselves. Badges are computed on the fly (`src/lib/badges.ts`), never stored.
#   B U N D L E D E V  
 