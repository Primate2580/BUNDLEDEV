import { Eye } from "@/components/ui/icons";
import { useState, type ReactNode } from "react";
import PreviewFrame from "@/components/code/PreviewFrame";
import CodeBlock from "@/components/lesson/CodeBlock";
import InlineText from "@/components/lesson/InlineText";
import QuestionCard, { type Outcome } from "@/components/practice/QuestionCard";
import Workspace from "@/components/workspace/Workspace";
import type { LessonRef, PredictLesson } from "@/engine/types";
import { setMode } from "@/lib/workspace/layout";
import { useLayouts } from "@/store/useLayouts";
import { useProgress } from "@/store/useProgress";

/** Wrong answers allowed per question before it is revealed. */
const RETRIES = 2;

interface Props {
  lesson: PredictLesson;
  lessonRef: LessonRef;
  /** lesson title block and navigation, shown at the top and bottom of the Learn pane */
  header: ReactNode;
  footer: ReactNode;
}

/**
 * Read the code, answer questions about it, and only then run it. The preview stays hidden
 * until every question is resolved, so the learner has to reason it out first.
 */
export default function PredictPlayer({ lesson, lessonRef, header, footer }: Props) {
  const total = lesson.questions.length;
  const markComplete = useProgress((s) => s.markComplete);
  const [current, setCurrent] = useState(0);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const updateLayout = useLayouts((state) => state.update);

  const done = outcomes.length === total;
  const firstTry = outcomes.filter((o) => o.correct && o.attempts === 1).length;

  const resolve = (index: number, outcome: Outcome) => {
    setOutcomes((all) => {
      const next = [...all];
      next[index] = outcome;
      return next;
    });
    if (index === total - 1) {
      markComplete(lessonRef);
      // Open the result if it was collapsed or minimized. A pane the learner hid stays hidden.
      updateLayout("lesson", (layout) =>
        layout.modes.output === "collapsed" || layout.modes.output === "minimized" ? setMode(layout, "output", "normal") : layout,
      );
    }
  };

  const learn = (
    <div className="space-y-6">
      {header}
      {lesson.intro && (
        <p className="max-w-3xl text-sm leading-7 text-fg-2">
          <InlineText text={lesson.intro} />
        </p>
      )}

      {!done && (
        <p className="flex items-center gap-2 text-xs text-muted">
          <Eye size={14} aria-hidden />
          The result stays hidden until you've answered. Work it out from the code.
        </p>
      )}

      <div className="space-y-4">
        {lesson.questions.slice(0, current + 1).map((q, i) => (
          <QuestionCard
            key={i}
            label={`Question ${i + 1} of ${total}`}
            prompt={q.prompt}
            options={q.options}
            answerIndex={q.answerIndex}
            hint={q.hint}
            explanation={q.explanation}
            retries={RETRIES}
            onResolved={(outcome) => resolve(i, outcome)}
            next={
              i === current && i < total - 1
                ? { label: "Next question", onClick: () => setCurrent(i + 1) }
                : undefined
            }
          />
        ))}
      </div>

      {done && (
        <p role="status" className="text-sm text-muted">
          You predicted {firstTry} of {total} right on the first try. The real result is in the Output pane.
        </p>
      )}

      {footer}
    </div>
  );

  const codeBody = (
    <div className="pane-scroll h-full space-y-3 p-3" tabIndex={0}>
      {lesson.code.html.trim() && <CodeBlock code={lesson.code.html} language="html" caption="index.html" />}
      {lesson.code.css.trim() && <CodeBlock code={lesson.code.css} language="css" caption="styles.css" />}
    </div>
  );

  const outputBody = done ? (
    <PreviewFrame html={lesson.code.html} css={lesson.code.css} mode={lesson.mode} canvas={lesson.canvas} />
  ) : (
    <div className="grid h-full place-items-center p-6 text-center">
      <p className="flex max-w-xs items-center gap-2 text-sm text-muted">
        <Eye size={16} aria-hidden className="shrink-0" />
        The result appears here once you've answered every question.
      </p>
    </div>
  );

  return (
    <Workspace
      layoutKey="lesson"
      panes={{
        learn: { body: learn, padded: true },
        editor: { title: "Code", body: codeBody },
        output: { title: "Result", body: outputBody },
      }}
    />
  );
}
