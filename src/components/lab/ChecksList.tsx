import { Check, X } from "@/components/ui/icons";
import InlineText from "@/components/lesson/InlineText";
import type { Check as CheckSpec, CheckResult } from "@/engine/types";

interface Props {
  checks: CheckSpec[];
  /** null until the learner has run the checks once */
  results: CheckResult[] | null;
  running?: boolean;
}

/** The requirement checklist: each line turns green or red after "Check my code". */
export default function ChecksList({ checks, results, running = false }: Props) {
  const passedCount = results ? results.filter((r) => r.passed).length : 0;

  return (
    <div>
      <ul className="space-y-2.5">
        {checks.map((check, i) => {
          const result = results?.[i];
          const state = running ? "running" : !result ? "idle" : result.passed ? "pass" : "fail";
          return (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                  state === "pass"
                    ? "bg-emerald-500 text-slate-950"
                    : state === "fail"
                      ? "bg-rose-500 text-white"
                      : "border border-edge"
                }`}
              >
                {state === "pass" && <Check size={12} strokeWidth={3} />}
                {state === "fail" && <X size={12} strokeWidth={3} />}
              </span>
              <span className="min-w-0 text-sm leading-6 text-fg-2">
                <InlineText text={check.message} />
                <span className="sr-only">
                  {state === "pass" ? " (passed)" : state === "fail" ? " (not yet)" : ""}
                </span>
                {state === "fail" && result?.detail && (
                  <span className="mt-0.5 block text-xs leading-5 text-danger">{result.detail}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Announced to screen readers after each run */}
      <p role="status" aria-live="polite" className="mt-3 text-xs text-muted">
        {running
          ? "Checking your code…"
          : results
            ? `${passedCount} of ${checks.length} requirements met`
            : "Run the checks to see how you're doing."}
      </p>
    </div>
  );
}
