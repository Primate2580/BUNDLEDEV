import { ArrowLeft, ArrowRight, CircleCheck, Eye, Lightbulb, Play, RotateCcw } from "@/components/ui/icons";
import { useEffect, useRef, useState, type ReactNode } from "react";
import CodeLab, { type CodeLabHandle } from "@/components/code/CodeLab";
import ChecksList from "@/components/lab/ChecksList";
import CodeBlock from "@/components/lesson/CodeBlock";
import InlineText from "@/components/lesson/InlineText";
import StepText from "./StepText";
import ProgressBar from "@/components/ui/ProgressBar";
import type { CheckResult, LessonRef, WorkshopLesson } from "@/engine/types";
import { useProgress } from "@/store/useProgress";

/** Failed attempts before "Show the solution" appears. */
const SOLUTION_AFTER_ATTEMPTS = 3;

interface Props {
  lesson: WorkshopLesson;
  lessonRef: LessonRef;
  index: number;
  completedSteps: number;
  /** true after the learner has navigated, so focus moves to the new step */
  focusHeading: boolean;
  onGoto: (index: number) => void;
  onFinish: () => void;
  /** lesson title block and navigation, shown at the top and bottom of the Learn pane */
  header: ReactNode;
  footer: ReactNode;
}

const defaultFiles = (mode: WorkshopLesson["mode"]) =>
  mode === "css" ? (["css", "html"] as const) : mode === "html" ? (["html"] as const) : (["html", "css"] as const);

/**
 * One step: a short explanation, one task, a live checklist, and the editor with its preview.
 * Mounted with key={index}, so every step starts with fresh attempts, hints and code.
 */
export default function StepView({ lesson, lessonRef, index, completedSteps, focusHeading, onGoto, onFinish, header, footer }: Props) {
  const step = lesson.steps[index];
  const total = lesson.steps.length;
  const lab = useRef<CodeLabHandle>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const completeStep = useProgress((s) => s.completeWorkshopStep);

  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [running, setRunning] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionOpen, setSolutionOpen] = useState(false);

  const passed = Boolean(results && results.every((r) => r.passed));
  const isLast = index === total - 1;
  const done = index < completedSteps;
  const furthest = Math.min(completedSteps, total - 1);

  useEffect(() => {
    if (focusHeading) heading.current?.focus();
  }, [focusHeading]);

  const advance = () => (isLast ? onFinish() : onGoto(index + 1));

  // Ctrl/Cmd+Enter and the main button: check, then (once passed) move on.
  const submit = async () => {
    if (passed) return advance();
    if (running || !lab.current) return;
    setRunning(true);
    const found = await lab.current.runChecks(step.checks);
    setResults(found);
    setRunning(false);
    if (found.every((r) => r.passed)) completeStep(lessonRef, index, total);
    else setFailedAttempts((n) => n + 1);
  };

  const canShowSolution = failedAttempts >= SOLUTION_AFTER_ATTEMPTS || hintsShown >= step.hints.length;

  const learn = (
    <div className="space-y-6">
      {header}
      <section aria-label="Instructions" className="min-w-0 space-y-5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h2 ref={heading} tabIndex={-1} className="text-sm font-semibold text-fg outline-none">
              Step {index + 1} of {total}
              {done && <span className="ml-2 font-normal text-success">Completed</span>}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onGoto(index - 1)}
                disabled={index === 0}
                aria-label="Previous step"
                className="grid size-8 place-items-center rounded-md text-muted hover:bg-raised hover:text-fg disabled:opacity-30"
              >
                <ArrowLeft size={16} aria-hidden />
              </button>
              <label htmlFor="step-jump" className="sr-only">
                Jump to a step
              </label>
              <select
                id="step-jump"
                value={index}
                onChange={(e) => onGoto(Number(e.target.value))}
                className="rounded-md border border-edge bg-panel px-2 py-1 text-xs text-fg-2"
              >
                {lesson.steps.map((s, i) => (
                  <option key={s.id} value={i} disabled={i > furthest}>
                    Step {i + 1}
                    {i < completedSteps ? " (done)" : ""}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onGoto(index + 1)}
                disabled={index >= furthest}
                aria-label="Next step"
                className="grid size-8 place-items-center rounded-md text-muted hover:bg-raised hover:text-fg disabled:opacity-30"
              >
                <ArrowRight size={16} aria-hidden />
              </button>
            </div>
          </div>
          <ProgressBar percent={(completedSteps / total) * 100} label="Workshop progress" className="mt-2" />
        </div>

        {index === 0 && (
          <p className="rounded-lg border border-edge bg-panel p-3 text-sm leading-6 text-muted">
            <span className="font-medium text-fg">What you'll build. </span>
            <InlineText text={lesson.intro} />
          </p>
        )}

        <StepText blocks={step.explanation} />

        <div role="group" aria-label="Your task" className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 p-4">
          <StepText text={step.task} className="text-sm leading-6 text-fg" />
        </div>

        <ChecksList checks={step.checks} results={results} running={running} />

        <div className="space-y-2.5">
          <button
            onClick={submit}
            disabled={running}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-on-accent disabled:opacity-60 ${
              passed ? "bg-emerald-600 hover:bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {passed ? <ArrowRight size={14} aria-hidden /> : <Play size={14} aria-hidden />}
            {running ? "Checking…" : passed ? (isLast ? "Finish workshop" : "Go to next step") : "Check my code"}
          </button>
          <p className="text-center text-xs text-faint">or press Ctrl/Cmd + Enter in the editor</p>

          <div className="flex flex-wrap gap-2">
            {hintsShown < step.hints.length && (
              <button
                onClick={() => setHintsShown((n) => n + 1)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-edge px-3 py-1.5 text-xs text-fg-2 hover:bg-raised hover:text-fg"
              >
                <Lightbulb size={13} aria-hidden />
                {hintsShown === 0 ? "Get a hint" : `Another hint (${hintsShown} of ${step.hints.length})`}
              </button>
            )}
            <button
              onClick={() => {
                lab.current?.setFiles(step.seed);
                setResults(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-edge px-3 py-1.5 text-xs text-fg-2 hover:bg-raised hover:text-fg"
            >
              <RotateCcw size={13} aria-hidden />
              Reset step
            </button>
            {canShowSolution && !solutionOpen && (
              <button
                onClick={() => setSolutionOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted hover:text-fg"
              >
                <Eye size={13} aria-hidden />
                Show the solution
              </button>
            )}
          </div>
        </div>

        {hintsShown > 0 && (
          <ol aria-label="Hints" className="space-y-2">
            {step.hints.slice(0, hintsShown).map((hint, i) => (
              <li key={i} className="flex gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm leading-6 text-fg-2">
                <Lightbulb size={15} aria-hidden className="mt-1 shrink-0 text-warn" />
                <span>
                  <span className="sr-only">Hint {i + 1}: </span>
                  <InlineText text={hint} />
                </span>
              </li>
            ))}
          </ol>
        )}

        {passed && (
          <div role="status" className="flex items-start gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3">
            <CircleCheck size={18} aria-hidden className="mt-0.5 shrink-0 text-success" />
            <p className="text-sm leading-6 text-success">
              {isLast ? "That's the last step. Every requirement is met." : "Step complete. Nicely done."}
            </p>
          </div>
        )}

        {solutionOpen && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-fg">One way to do it</p>
              <button
                onClick={() => lab.current?.setFiles(step.solution)}
                className="rounded-lg border border-edge px-2.5 py-1 text-xs text-fg-2 hover:bg-raised hover:text-fg"
              >
                Load it into the editor
              </button>
            </div>
            <CodeBlock code={step.solution.html} language="html" caption="index.html" />
            {step.solution.css.trim() && <CodeBlock code={step.solution.css} language="css" caption="styles.css" />}
          </div>
        )}
      </section>
      {footer}
    </div>
  );

  return (
    <CodeLab
      ref={lab}
      key={`${lesson.id}-${index}`}
      mode={lesson.mode}
      starter={step.seed}
      files={lesson.files ?? [...defaultFiles(lesson.mode)]}
      readOnly={lesson.readOnly}
      canvas={lesson.canvas}
      learn={learn}
      explain
      onSubmit={submit}
    />
  );
}
