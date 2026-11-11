import { ArrowRight, Check, CircleCheck, CircleX, Lightbulb, X } from "@/components/ui/icons";
import { useEffect, useId, useRef, useState } from "react";
import CodeBlock from "@/components/lesson/CodeBlock";
import InlineText from "@/components/lesson/InlineText";

export interface Outcome {
  correct: boolean;
  /** how many answers it took (1 = right first time) */
  attempts: number;
  /** the option chosen last, as an index into `options` */
  selected: number;
}

interface Props {
  /** "Question 3 of 10" */
  label?: string;
  prompt: string;
  code?: { language: "html" | "css" | "js"; code: string };
  options: string[];
  answerIndex: number;
  explanation: string;
  hint?: string;
  /** wrong answers allowed before the answer is shown. 0 = one try (quizzes). */
  retries: number;
  onResolved: (outcome: Outcome) => void;
  /** when set, a button appears once the question is resolved */
  next?: { label: string; onClick: () => void };
}

type Status = "answering" | "retry" | "correct" | "failed";

/**
 * One multiple-choice question with instant feedback. Native radio buttons give
 * arrow-key navigation for free; the result is announced to screen readers.
 */
export default function QuestionCard({ label, prompt, code, options, answerIndex, explanation, hint, retries, onResolved, next }: Props) {
  const uid = useId();
  const feedback = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [wrongs, setWrongs] = useState(0);
  const [status, setStatus] = useState<Status>("answering");

  const resolved = status === "correct" || status === "failed";

  useEffect(() => {
    if (resolved) feedback.current?.focus();
  }, [resolved]);

  const check = () => {
    if (selected === null || resolved) return;
    if (selected === answerIndex) {
      setStatus("correct");
      onResolved({ correct: true, attempts: wrongs + 1, selected });
      return;
    }
    const nextWrongs = wrongs + 1;
    setWrongs(nextWrongs);
    setEliminated((list) => [...list, selected]);
    if (nextWrongs > retries) {
      setStatus("failed");
      onResolved({ correct: false, attempts: nextWrongs, selected });
    } else {
      setStatus("retry");
      setSelected(null);
    }
  };

  return (
    <fieldset
      className="min-w-0 rounded-xl border border-edge bg-panel p-5 sm:p-6"
      onKeyDown={(e) => {
        if (e.key === "Enter" && selected !== null && !resolved && (e.target as HTMLElement).tagName !== "BUTTON") {
          e.preventDefault();
          check();
        }
      }}
    >
      <legend className="sr-only">{label ? `${label}: ${prompt}` : prompt}</legend>
      {label && <p className="text-xs font-medium text-muted">{label}</p>}
      <p className="mt-1 text-base font-semibold leading-7 text-fg" aria-hidden="true">
        <InlineText text={prompt} />
      </p>

      {code && (
        <div className="mt-4">
          <CodeBlock code={code.code} language={code.language} />
        </div>
      )}

      <div className="mt-4 space-y-2">
        {options.map((option, i) => {
          const isAnswer = i === answerIndex;
          const wasWrong = eliminated.includes(i) || (status === "failed" && selected === i);
          const showRight = resolved && isAnswer;
          const disabled = resolved || eliminated.includes(i);
          return (
            <label
              key={i}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm leading-6 focus-within:ring-2 focus-within:ring-indigo-400 ${
                showRight
                  ? "border-emerald-500/60 bg-emerald-500/10 text-fg"
                  : wasWrong
                    ? "border-rose-500/50 bg-rose-500/5 text-muted line-through decoration-rose-400/50"
                    : selected === i
                      ? "cursor-pointer border-indigo-500 bg-indigo-500/10 text-fg"
                      : `border-edge text-fg-2 ${disabled ? "opacity-70" : "cursor-pointer hover:bg-raised"}`
              }`}
            >
              <input
                type="radio"
                name={uid}
                checked={selected === i}
                disabled={disabled}
                onChange={() => setSelected(i)}
                className="mt-1.5 size-4 shrink-0 accent-indigo-500"
              />
              <span className="min-w-0 flex-1">
                <InlineText text={option} />
              </span>
              {showRight && <Check size={16} aria-hidden className="mt-1 shrink-0 text-success" />}
              {wasWrong && <X size={16} aria-hidden className="mt-1 shrink-0 text-danger" />}
              {showRight && <span className="sr-only">(correct answer)</span>}
              {wasWrong && <span className="sr-only">(incorrect)</span>}
            </label>
          );
        })}
      </div>

      {!resolved && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={check}
            disabled={selected === null}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500 disabled:cursor-default disabled:bg-raised disabled:text-faint"
          >
            Check answer
          </button>
          {status === "retry" && (
            <p role="status" className="flex items-start gap-2 text-sm text-warn">
              <Lightbulb size={16} aria-hidden className="mt-0.5 shrink-0" />
              <span>
                Not quite, try again.{hint && <span className="text-fg-2"> Hint: <InlineText text={hint} /></span>}
              </span>
            </p>
          )}
        </div>
      )}

      {resolved && (
        <div
          ref={feedback}
          tabIndex={-1}
          role="status"
          className={`mt-4 rounded-lg border p-4 outline-none ${
            status === "correct" ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"
          }`}
        >
          <p className={`flex items-center gap-2 text-sm font-semibold ${status === "correct" ? "text-success" : "text-danger"}`}>
            {status === "correct" ? <CircleCheck size={16} aria-hidden /> : <CircleX size={16} aria-hidden />}
            {status === "correct" ? (wrongs === 0 ? "Correct" : "Correct, got there in the end") : "Not quite"}
          </p>
          {status === "failed" && (
            <p className="mt-1 text-sm text-fg-2">
              The answer is: <InlineText text={options[answerIndex]} />
            </p>
          )}
          <p className="mt-2 text-sm leading-6 text-fg-2">
            <InlineText text={explanation} />
          </p>
        </div>
      )}

      {resolved && next && (
        <button
          type="button"
          onClick={next.onClick}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500"
        >
          {next.label}
          <ArrowRight size={14} aria-hidden />
        </button>
      )}
    </fieldset>
  );
}
