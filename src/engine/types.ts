/**
 * CSS Lab content model.
 *
 * Everything the learner sees is DATA shaped like these types:
 *   Track > Topic > Lesson
 * Adding a topic means adding a content file. The engine never changes.
 *
 * Challenge checks are plain data (not functions) so that lessons can be
 * serialised, validated and tested by a script in Segment 6.
 */

export type TrackId = "html" | "css" | "tailwind";
export type Level = "beginner" | "intermediate" | "advanced" | "pro";

export const LEVELS: readonly Level[] = ["beginner", "intermediate", "advanced", "pro"];

/* ------------------------------------------------------------------ */
/* Tree: what the sidebar and dashboard need (small, always loaded)    */
/* ------------------------------------------------------------------ */

export interface Track {
  id: TrackId;
  title: string;
  tagline: string;
  topics: TopicMeta[];
}

export interface TopicMeta {
  /** unique within its track, e.g. "flexbox" */
  id: string;
  title: string;
  level: Level;
  summary: string;
  /** topic ids (same track) the learner should finish first. Advisory, skippable. */
  prerequisites?: string[];
  /** Present only when the topic's content exists. Lazy-loads the lessons. */
  load?: () => Promise<{ default: TopicContent }>;
  /** Number of lessons in the topic. Segment 6's script checks it matches. */
  lessonCount?: number;
}

/* ------------------------------------------------------------------ */
/* Topic content: loaded on demand                                     */
/* ------------------------------------------------------------------ */

export interface TopicContent {
  lessons: Lesson[];
}

export type LessonKind =
  | "learn"
  | "visualizer"
  | "workshop"
  | "lab"
  | "predict"
  | "debug"
  | "quiz"
  | "review";

export interface LessonBase {
  /** unique within its topic, never renamed (progress is stored against it) */
  id: string;
  title: string;
  summary: string;
  kind: LessonKind;
  minutes?: number;
}

/** Concept card shown at the top of most lessons */
export interface Concept {
  description: string;
  why: string;
  mentalModel: string;
}

/** Simple rich-content blocks for Learn pages */
export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: "html" | "css" | "js"; code: string; caption?: string; html?: string }
  | { type: "callout"; tone: "tip" | "warning" | "note"; text: string }
  /** bullet or numbered list; items support `inline code` */
  | { type: "list"; ordered?: boolean; items: string[] }
  /** a "do this / not this" pair, each with its own code and a one-line reason */
  | {
      type: "compare";
      language: "html" | "css" | "js";
      good: { code: string; note: string };
      bad: { code: string; note: string };
    };

export interface LearnLesson extends LessonBase {
  kind: "learn";
  concept: Concept;
  body: ContentBlock[];
}

/* ------------------------------------------------------------------ */
/* Code, checks and challenges (used from Segment 3 onward)            */
/* ------------------------------------------------------------------ */

export type PreviewMode = "html" | "css" | "tailwind";

export interface CodeFiles {
  html: string;
  css: string;
}

/**
 * A validator described as data. It runs against the preview iframe's DOM.
 *
 * `message` is the requirement exactly as the learner sees it in the checklist
 * ("Your page has a title"). The runner adds a `detail` when it fails
 * ("Found 0 matching elements").
 *
 * `match` says which elements a selector-based check applies to: the "first"
 * match (default) or "all" of them.
 */
export type Check =
  | { type: "doctype"; message: string }
  | { type: "exists"; selector: string; message: string }
  | { type: "count"; selector: string; min?: number; max?: number; message: string }
  | {
      type: "computedStyle";
      selector: string;
      property: string;
      expected: string | string[];
      match?: "first" | "all";
      message: string;
    }
  | {
      type: "attribute";
      selector: string;
      attribute: string;
      /** omit to only require that the attribute is present */
      expected?: string;
      match?: "first" | "all";
      message: string;
    }
  | { type: "text"; selector: string; includes: string; message: string }
  /** a grid container has this many columns (or rows). Reads the resolved track list, so `repeat(3, 1fr)` counts as 3. */
  | { type: "gridTracks"; selector: string; axis: "columns" | "rows"; count: number; message: string }
  | { type: "a11y"; rule: "img-alt" | "label-for-input" | "heading-order"; message: string };

/** Outcome of one check, in the same order as the checks that were run. */
export interface CheckResult {
  passed: boolean;
  /** extra facts for a failing check, e.g. "Found 2, expected at least 3" */
  detail?: string;
}

export interface Challenge {
  title: string;
  /** the task, in a short paragraph (supports `inline code`) */
  description: string;
  /** progressive hints: first nudge, then more direct */
  hints: string[];
  checks: Check[];
  /** The reference answer. The content test script must pass it (Segment 6). */
  solution: CodeFiles;
}

/* ------------------------------------------------------------------ */
/* Other lesson kinds. Shapes are first drafts, refined in later       */
/* segments when each kind gets built.                                 */
/* ------------------------------------------------------------------ */

/**
 * One guided control. It reads and writes a CSS declaration in the learner's CSS, so the control
 * and the code editor always show the same thing.
 */
export type ControlSpec = {
  id: string;
  label: string;
  /** which rule to edit. "{item}" is replaced by the currently selected item number. */
  selector: string;
  property: string;
  /** shown when the CSS doesn't set the property (the browser's default) */
  fallback: string;
  help?: string;
} & (
  | { type: "options"; options: string[] }
  | { type: "range"; min: number; max: number; step?: number; unit?: string }
);

/** A "quick experiment": declarations applied on top of the current CSS in one click. */
export interface Preset {
  id: string;
  label: string;
  description: string;
  css: string;
}

/** What to draw on top of the preview. */
export type AnnotationKind = "flex" | "grid" | "box" | "none";

export interface VisualizerStage {
  /** the demo markup (the learner edits CSS, not this) */
  html: string;
  /** fixed styling that makes the demo look good; not shown in the editor */
  baseCss: string;
  annotate: AnnotationKind;
  /** the element being explained (default ".container") */
  target?: string;
  /** its children (default ".item") */
  items?: string;
  /** how many items the "selected item" chooser offers */
  itemCount?: number;
}

/** Like a Challenge, but the learner only writes CSS, so the solution is CSS. */
export interface VisualizerChallenge extends Omit<Challenge, "solution"> {
  solution: string;
}

/**
 * An interactive explorer: guided controls, quick presets and an editor all drive one piece of CSS,
 * and the preview is annotated to show what the CSS is doing (axes, gaps, grid lines, box layers).
 */
export interface VisualizerLesson extends LessonBase {
  kind: "visualizer";
  concept: Concept;
  stage: VisualizerStage;
  /** the CSS the learner starts with and can edit */
  starter: string;
  controls: ControlSpec[];
  presets: Preset[];
  challenge?: VisualizerChallenge;
}

export interface WorkshopStep {
  /** "step-001", "step-002"... */
  id: string;
  /** brief teaching text, one string per paragraph (supports `code` and **bold**) */
  explanation: string[];
  /** the one small thing to do in this step (supports `code`) */
  task: string;
  /** starting code. Equals the previous step's solution (the build script enforces it). */
  seed: CodeFiles;
  solution: CodeFiles;
  checks: Check[];
  hints: string[];
}

/**
 * A guided build in many small steps (the freeCodeCamp model). Authored as folders of
 * small files and compiled by `npm run build:content`; see CONTENT_GUIDE.md.
 */
export interface WorkshopLesson extends LessonBase {
  kind: "workshop";
  mode: PreviewMode;
  /** what the learner will build, shown before step 1 */
  intro: string;
  /** editor tabs to show (default depends on mode) */
  files?: (keyof CodeFiles)[];
  readOnly?: (keyof CodeFiles)[];
  canvas?: "light" | "dark";
  steps: WorkshopStep[];
}

export interface LabLesson extends LessonBase {
  kind: "lab";
  mode: PreviewMode;
  challenge: Challenge;
  starter: CodeFiles;
}

/** One multiple-choice question. Shared shape for Predict and Quiz. */
export interface PredictQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
  /** shown after a wrong answer, before the learner tries again */
  hint?: string;
  /** shown once the question is resolved: why the right answer is right */
  explanation: string;
  /**
   * Checks that make the stated answer true of the code. `npm run test:content` runs them against
   * the code, so an answer can't claim something the code doesn't do.
   */
  proves?: Check[];
}

/**
 * Read some code, predict what it does, then run it. The preview stays hidden until every
 * question is answered, so the learner has to reason it out first.
 */
export interface PredictLesson extends LessonBase {
  kind: "predict";
  mode: PreviewMode;
  canvas?: "light" | "dark";
  /** the code to read (and, at the end, run) */
  code: CodeFiles;
  /** a sentence setting the scene */
  intro?: string;
  questions: PredictQuestion[];
}

export interface DebugLesson extends LessonBase {
  kind: "debug";
  mode: PreviewMode;
  challenge: Challenge;
  broken: CodeFiles;
}

export interface QuizQuestion {
  prompt: string;
  /** an optional snippet the question is about */
  code?: { language: "html" | "css" | "js"; code: string };
  options: string[];
  answerIndex: number;
  explanation: string;
}

/** End-of-topic quiz: one question at a time with instant feedback, then a score. */
export interface QuizLesson extends LessonBase {
  kind: "quiz";
  /** score needed to complete the lesson (default 70) */
  passPercent?: number;
  questions: QuizQuestion[];
}

export interface ReviewLesson extends LessonBase {
  kind: "review";
  body: ContentBlock[];
}

export type Lesson =
  | LearnLesson
  | VisualizerLesson
  | WorkshopLesson
  | LabLesson
  | PredictLesson
  | DebugLesson
  | QuizLesson
  | ReviewLesson;

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

export interface LessonRef {
  trackId: TrackId;
  topicId: string;
  lessonId: string;
}

export interface Progress {
  version: 1;
  /** lesson key -> completion timestamp (ms) */
  completed: Record<string, number>;
  /** workshop lesson key -> number of steps completed so far */
  workshops?: Record<string, number>;
  /** quiz lesson key -> best score so far, as a percentage */
  quizBest?: Record<string, number>;
  /** local calendar days ("YYYY-MM-DD") with at least one completed lesson, step or quiz attempt */
  activityDays?: string[];
  last?: LessonRef;
}
