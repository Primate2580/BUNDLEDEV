import { CircleCheck, Eye, Lightbulb, Play } from "@/components/ui/icons";
import { useState } from "react";
import ChecksList from "@/components/lab/ChecksList";
import CodeBlock from "@/components/lesson/CodeBlock";
import InlineText from "@/components/lesson/InlineText";
import type { CheckResult, VisualizerChallenge as Challenge } from "@/engine/types";

const SOLUTION_AFTER_ATTEMPTS = 3;

interface Props {
  challenge: Challenge;
  /** runs the checks against the current preview */
  run: () => Promise<CheckResult[]>;
  onPassed: () => void;
  onLoadSolution: (css: string) => void;
}

/** The "now you try" task under a visualizer: requirement checklist, hints, solution. */
export default function VisualizerChallenge({ challenge, run, onPassed, onLoadSolution }: Props) {
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [running, setRunning] = useState(false);
  const [failed, setFailed] = useState(0);
  const [hints, setHints] = useState(0);
  const [solutionOpen, setSolutionOpen] = useState(false);

  const allPassed = Boolean(results && results.every((r) => r.passed));
  const canShowSolution = failed >= SOLUTION_AFTER_ATTEMPTS || hints >= challenge.hints.length;

  const check = async () => {
    if (running) return;
    setRunning(true);
    const found = await run();
    setResults(found);
    setRunning(false);
    if (found.every((r) => r.passed)) onPassed();
    else setFailed((n) => n + 1);
  };

  return (
    <section aria-label="Challenge" className="rounded-xl border border-edge bg-panel p-5 sm:p-6">
      <p className="text-sm font-semibold text-accent">Now you try</p>
      <h2 className="mt-1 text-lg font-semibold text-fg">{challenge.title}</h2>
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
            {running ? "Checking…" : "Check my CSS"}
          </button>
          {hints < challenge.hints.length && (
            <button
              onClick={() => setHints((n) => n + 1)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-edge px-4 py-2 text-sm text-fg-2 hover:bg-raised hover:text-fg"
            >
              <Lightbulb size={14} aria-hidden />
              {hints === 0 ? "Show a hint" : `Show another hint (${hints} of ${challenge.hints.length})`}
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

      {hints > 0 && (
        <ol aria-label="Hints" className="mt-5 space-y-2">
          {challenge.hints.slice(0, hints).map((hint, i) => (
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
          <p className="font-medium text-success">Every requirement is met. Nice work.</p>
        </div>
      )}

      {solutionOpen && (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-fg">One way to solve it</h3>
            <button
              onClick={() => onLoadSolution(challenge.solution)}
              className="rounded-lg border border-edge px-3 py-1.5 text-xs text-fg-2 hover:bg-raised hover:text-fg"
            >
              Load it into the editor
            </button>
          </div>
          <CodeBlock code={challenge.solution} language="css" caption="styles.css" />
        </div>
      )}
    </section>
  );
}
