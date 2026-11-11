import { RotateCcw, Trophy } from "@/components/ui/icons";
import { useMemo, useState } from "react";
import InlineText from "@/components/lesson/InlineText";
import QuestionCard, { type Outcome } from "@/components/practice/QuestionCard";
import ProgressBar from "@/components/ui/ProgressBar";
import type { LessonRef, QuizLesson } from "@/engine/types";
import { lessonKey } from "@/lib/ids";
import { buildDeck } from "@/lib/quiz";
import { useProgress } from "@/store/useProgress";

interface Props {
  lesson: QuizLesson;
  lessonRef: LessonRef;
}

/** One question at a time with instant feedback, then a score and a review of what was missed. */
export default function QuizPlayer({ lesson, lessonRef }: Props) {
  const pass = lesson.passPercent ?? 70;
  const best = useProgress((s) => s.progress.quizBest?.[lessonKey(lessonRef)]);
  const recordScore = useProgress((s) => s.recordQuizScore);

  const [phase, setPhase] = useState<"intro" | "running" | "results">("intro");
  const [attempt, setAttempt] = useState(0);
  const [index, setIndex] = useState(0);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);

  const deck = useMemo(() => buildDeck(lesson.questions), [lesson.questions, attempt]); // eslint-disable-line react-hooks/exhaustive-deps
  const total = deck.length;
  const correct = outcomes.filter((o) => o.correct).length;
  const percent = Math.round((correct / total) * 100);
  const passed = percent >= pass;

  const start = () => {
    setAttempt((n) => n + 1);
    setIndex(0);
    setOutcomes([]);
    setPhase("running");
  };

  if (phase === "intro") {
    return (
      <section className="rounded-xl border border-edge bg-panel p-6">
        <h2 className="text-lg font-semibold text-fg">Ready for the quiz?</h2>
        <ul className="mt-3 space-y-1.5 text-sm leading-6 text-fg-2">
          <li>{total} questions, one at a time, with instant feedback.</li>
          <li>You need {pass}% to complete this lesson. You can retake it as often as you like.</li>
          {best !== undefined && <li>Your best score so far: <strong className="font-semibold text-fg">{best}%</strong>.</li>}
        </ul>
        <button
          onClick={start}
          className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-on-accent hover:bg-indigo-500"
        >
          {best !== undefined ? "Take it again" : "Start the quiz"}
        </button>
      </section>
    );
  }

  if (phase === "running") {
    const card = deck[index];
    return (
      <div className="space-y-4">
        <div>
          <p className="mb-1.5 text-sm text-muted">
            Question {index + 1} of {total}
          </p>
          <ProgressBar percent={(index / total) * 100} label="Quiz progress" />
        </div>
        <QuestionCard
          key={`${attempt}-${index}`}
          prompt={card.question.prompt}
          code={card.question.code}
          options={card.options}
          answerIndex={card.answerIndex}
          explanation={card.question.explanation}
          retries={0}
          onResolved={(outcome) => setOutcomes((all) => [...all.slice(0, index), outcome])}
          next={{
            label: index === total - 1 ? "See my score" : "Next question",
            onClick: () => {
              if (index < total - 1) return setIndex(index + 1);
              recordScore(lessonRef, Math.round((outcomes.filter((o) => o.correct).length / total) * 100), pass);
              setPhase("results");
            },
          }}
        />
      </div>
    );
  }

  const missed = deck.map((card, i) => ({ card, outcome: outcomes[i] })).filter(({ outcome }) => outcome && !outcome.correct);

  return (
    <div className="space-y-6">
      <section
        className={`rounded-xl border p-6 ${passed ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}
      >
        <div className="flex items-start gap-4">
          <span className={`grid size-11 shrink-0 place-items-center rounded-full ${passed ? "bg-emerald-500 text-slate-950" : "bg-amber-500 text-slate-950"}`}>
            <Trophy size={22} aria-hidden />
          </span>
          <div>
            <h2 className="text-xl font-bold text-fg">
              {percent}%{" "}
              <span className="text-base font-medium text-fg-2">
                ({correct} of {total})
              </span>
            </h2>
            <p className="mt-1 text-sm leading-6 text-fg-2">
              {passed
                ? "You passed, and this lesson is complete. Retake it any time to beat your score."
                : `You need ${pass}% to complete this lesson. Read the explanations below, then try again.`}
            </p>
            <button
              onClick={start}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-edge bg-panel px-3 py-1.5 text-sm text-fg-2 hover:bg-raised hover:text-fg"
            >
              <RotateCcw size={14} aria-hidden />
              Try again
            </button>
          </div>
        </div>
      </section>

      {missed.length > 0 && (
        <section aria-label="Questions to review" className="space-y-3">
          <h3 className="text-sm font-semibold text-fg">
            {missed.length === 1 ? "The one you missed" : `The ${missed.length} you missed`}
          </h3>
          {missed.map(({ card, outcome }, i) => (
            <div key={i} className="rounded-xl border border-edge bg-panel p-4">
              <p className="text-sm font-medium leading-6 text-fg">
                <InlineText text={card.question.prompt} />
              </p>
              <p className="mt-2 text-sm text-danger">
                You chose: <InlineText text={card.options[outcome.selected]} />
              </p>
              <p className="mt-1 text-sm text-success">
                Answer: <InlineText text={card.options[card.answerIndex]} />
              </p>
              <p className="mt-2 text-sm leading-6 text-fg-2">
                <InlineText text={card.question.explanation} />
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
