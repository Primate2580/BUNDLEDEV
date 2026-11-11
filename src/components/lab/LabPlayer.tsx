import { Bug, CircleCheck, Eye, Lightbulb, Play } from "@/components/ui/icons";
import { useRef, useState, type ReactNode } from "react";
import CodeBlock from "@/components/lesson/CodeBlock";
import InlineText from "@/components/lesson/InlineText";
import CodeLab, { type CodeLabHandle } from "@/components/code/CodeLab";
import PreviewFrame from "@/components/code/PreviewFrame";
import type { CheckResult, DebugLesson, LabLesson, LessonRef } from "@/engine/types";
import { useProgress } from "@/store/useProgress";
import ChecksList from "./ChecksList";

/** Failed attempts before "Show solution" appears. */
const SOLUTION_AFTER_ATTEMPTS = 3;

interface Props {
  lesson: LabLesson | DebugLesson;
  lessonRef: LessonRef;
  /** lesson title block and navigation, shown at the top and bottom of the Learn pane */
  header: ReactNode;
  footer: ReactNode;
}

/**
 * Also plays "Debug It" lessons: the same checks and hints, but the editor starts with broken code,
 * the task reads as a bug report, and a preview shows what the page should look like.
 *
 * A single task with requirements: write code, press "Check my code" (or Ctrl/Cmd+Enter),
 * and get a pass/fail checklist. Passing every check completes the lesson.
 */
export default function LabPlayer({ lesson, lessonRef, header, footer }: Props) {
  const { challenge, mode } = lesson;
  const debug = lesson.kind === "debug";
  const starter = lesson.kind === "debug" ? lesson.broken : lesson.starter;
  const lab = useRef<CodeLabHandle>(null);
  const markComplete = useProgress((s) => s.markComplete);

  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [running, setRunning] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionOpen, setSolutionOpen] = useState(false);

  const allPassed = Boolean(results && results.every((r) => r.passed));

  const check = async () => {
    if (running || !lab.current) return;
    setRunning(true);
    const found = await lab.current.runChecks(challenge.checks);
    setResults(found);
    setRunning(false);
    if (found.every((r) => r.passed)) {
      markComplete(lessonRef);
    } else {
      setFailedAttempts((n) => n + 1);
    }
  };

  const hasMoreHints = hintsShown < challenge.hints.length;
  const canShowSolution = failedAttempts >= SOLUTION_AFTER_ATTEMPTS || hintsShown >= challenge.hints.length;

  const learn = (
    <div className="space-y-6">
      {header}
      <section aria-label="Your task">
        {debug && (
          <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-warn">
            <Bug size={14} aria-hidden />
            Bug report
          </p>
        )}
        <h2 className="text-lg font-semibold text-fg">{challenge.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-fg-2">
          <InlineText text={challenge.description} />
        </p>

        <div className="mt-5 space-y-5">
          <ChecksList checks={challenge.checks} results={results} running={running} />

          <div className="space-y-3">
            <button
              onClick={check}
              disabled={running}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-on-accent hover:bg-indigo-500 disabled:opacity-60"
            >
              <Play size={14} aria-hidden />
              {running ? "Checking…" : "Check my code"}
            </button>
            <p className="text-center text-xs text-faint">or press Ctrl/Cmd + Enter in the editor</p>

            {hasMoreHints && (
              <button
                onClick={() => setHintsShown((n) => n + 1)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-edge px-4 py-2 text-sm text-fg-2 hover:bg-raised hover:text-fg"
              >
                <Lightbulb size={14} aria-hidden />
                {hintsShown === 0 ? "Show a hint" : `Show another hint (${hintsShown} of ${challenge.hints.length})`}
              </button>
            )}

            {canShowSolution && !solutionOpen && (
              <button
                onClick={() => setSolutionOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-muted hover:text-fg"
              >
                <Eye size={14} aria-hidden />
                Show the solution
              </button>
            )}
          </div>
        </div>

        {hintsShown > 0 && (
          <ol aria-label="Hints" className="mt-5 space-y-2">
            {challenge.hints.slice(0, hintsShown).map((hint, i) => (
              <li key={i} className="flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm leading-6 text-fg-2">
                <Lightbulb size={16} aria-hidden className="mt-1 shrink-0 text-warn" />
                <span>
                  <span className="sr-only">Hint {i + 1}: </span>
                  <InlineText text={hint} />
                </span>
              </li>
            ))}
          </ol>
        )}

        {allPassed && (
          <div role="status" className="mt-5 flex items-start gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4">
            <CircleCheck size={20} aria-hidden className="mt-0.5 shrink-0 text-success" />
            <div>
              <p className="font-medium text-success">Every requirement is met. Nice work.</p>
              <p className="mt-1 text-sm text-fg-2">This lesson is marked complete. Keep experimenting, or move on below.</p>
            </div>
          </div>
        )}
      </section>

      {solutionOpen && (
        <section aria-label="Solution" className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-fg">One way to solve it</h3>
            <button
              onClick={() => lab.current?.setFiles(challenge.solution)}
              className="rounded-lg border border-edge px-3 py-1.5 text-xs text-fg-2 hover:bg-raised hover:text-fg"
            >
              Load it into the editor
            </button>
          </div>
          <CodeBlock code={challenge.solution.html} language="html" caption="index.html" />
          {challenge.solution.css.trim() && (
            <CodeBlock code={challenge.solution.css} language="css" caption="styles.css" />
          )}
        </section>
      )}

      {debug && (
        <section aria-label="What it should look like" className="space-y-2">
          <h3 className="text-sm font-semibold text-fg">What it should look like</h3>
          <div className="h-56 overflow-hidden rounded-xl border border-edge">
            <PreviewFrame html={challenge.solution.html} css={challenge.solution.css} mode={mode} />
          </div>
        </section>
      )}

      {footer}
    </div>
  );

  return (
    <CodeLab
      ref={lab}
      mode={mode}
      starter={starter}
      files={mode === "css" ? ["css", "html"] : mode === "html" ? ["html"] : ["html", "css"]}
      readOnly={mode === "css" ? ["html"] : []}
      onSubmit={check}
      learn={learn}
      explain
    />
  );
}
