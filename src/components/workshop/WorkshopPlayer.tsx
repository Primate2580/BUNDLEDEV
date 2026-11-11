import { RotateCcw, Trophy } from "@/components/ui/icons";
import { useState, type ReactNode } from "react";
import PreviewFrame from "@/components/code/PreviewFrame";
import type { LessonRef, WorkshopLesson } from "@/engine/types";
import { lessonKey } from "@/lib/ids";
import { useProgress } from "@/store/useProgress";
import StepView from "./StepView";

interface Props {
  lesson: WorkshopLesson;
  lessonRef: LessonRef;
  header: ReactNode;
  footer: ReactNode;
}

/** Walks the learner through a workshop one step at a time, saving progress as they go. */
export default function WorkshopPlayer({ lesson, lessonRef, header, footer }: Props) {
  const total = lesson.steps.length;
  const completedSteps = useProgress((s) => s.progress.workshops?.[lessonKey(lessonRef)] ?? 0);
  const resetWorkshop = useProgress((s) => s.resetWorkshop);

  // Resume on the first unfinished step; a finished workshop opens on its finish screen.
  const [index, setIndex] = useState(() => Math.min(completedSteps, total - 1));
  const [finished, setFinished] = useState(completedSteps >= total);
  const [focusHeading, setFocusHeading] = useState(false);

  const goto = (next: number) => {
    setFocusHeading(true);
    setIndex(Math.max(0, Math.min(next, total - 1)));
  };

  if (finished) {
    const last = lesson.steps[total - 1].solution;
    return (
      <article className="space-y-6">
        {header}
        <section className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-500 text-slate-950">
              <Trophy size={22} aria-hidden />
            </span>
            <div>
              <h2 className="text-xl font-bold text-fg">You built it</h2>
              <p className="mt-1 max-w-2xl text-sm leading-7 text-fg-2">
                You completed all {total} steps of "{lesson.title}". Here is the page you made. Review the
                steps any time, or start again from the beginning.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setFinished(false);
                    goto(0);
                  }}
                  className="rounded-lg border border-edge bg-panel px-3 py-1.5 text-sm text-fg-2 hover:bg-raised hover:text-fg"
                >
                  Review the steps
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Start this workshop over? Your step progress will be cleared.")) {
                      resetWorkshop(lessonRef);
                      setFinished(false);
                      goto(0);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted hover:text-fg"
                >
                  <RotateCcw size={14} aria-hidden />
                  Start over
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="h-[24rem] overflow-hidden rounded-xl border border-edge">
          <PreviewFrame html={last.html} css={last.css} mode={lesson.mode} canvas={lesson.canvas} />
        </div>
        {footer}
      </article>
    );
  }

  return (
    <StepView
      key={index}
      lesson={lesson}
      lessonRef={lessonRef}
      index={index}
      completedSteps={completedSteps}
      focusHeading={focusHeading}
      onGoto={goto}
      onFinish={() => setFinished(true)}
      header={header}
      footer={footer}
    />
  );
}
