import { ArrowLeft, ArrowRight, Check } from "@/components/ui/icons";
import { Link, useNavigate } from "react-router-dom";
import type { Lesson, LessonRef } from "@/engine/types";
import { lessonPath, topicPath } from "@/lib/ids";
import { useProgress } from "@/store/useProgress";

interface Props {
  lesson: Lesson;
  lessonRef: LessonRef;
  topicTitle: string;
  prev?: Lesson;
  next?: Lesson;
  done: boolean;
}

/** Reading lessons are completed by the learner. Challenge lessons complete when the checks pass. */
const isManual = (lesson: Lesson) =>
  lesson.kind === "learn" || lesson.kind === "review" || (lesson.kind === "visualizer" && !lesson.challenge);

export default function LessonFooter({ lesson, lessonRef, topicTitle, prev, next, done }: Props) {
  const navigate = useNavigate();
  const markComplete = useProgress((s) => s.markComplete);
  const markIncomplete = useProgress((s) => s.markIncomplete);

  const nextPath = next
    ? lessonPath({ ...lessonRef, lessonId: next.id })
    : topicPath(lessonRef.trackId, lessonRef.topicId);

  const completeAndContinue = () => {
    markComplete(lessonRef);
    navigate(nextPath);
  };

  return (
    <footer className="space-y-6 border-t border-edge pt-6">
      {isManual(lesson) ? (
        <div className="flex flex-wrap items-center gap-3">
          {done ? (
            <>
              <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-success">
                <Check size={16} aria-hidden />
                Completed
              </span>
              <Link
                to={nextPath}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500"
              >
                {next ? "Next lesson" : `Back to ${topicTitle}`}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <button
                onClick={() => markIncomplete(lessonRef)}
                className="rounded-lg px-3 py-2 text-sm text-muted hover:text-fg"
              >
                Mark as not done
              </button>
            </>
          ) : (
            <button
              onClick={completeAndContinue}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500"
            >
              {next ? "Complete and continue" : "Complete lesson"}
              <ArrowRight size={16} aria-hidden />
            </button>
          )}
        </div>
      ) : done ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-success">
            <Check size={16} aria-hidden />
            Completed
          </span>
          <Link
            to={nextPath}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500"
          >
            {next ? "Next lesson" : `Back to ${topicTitle}`}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      ) : (
        <p className="text-sm text-muted">This lesson completes when you finish its tasks.</p>
      )}

      <nav aria-label="Lesson navigation" className="flex justify-between gap-3">
        {prev ? (
          <Link
            to={lessonPath({ ...lessonRef, lessonId: prev.id })}
            className="inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg"
          >
            <ArrowLeft size={16} aria-hidden />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={lessonPath({ ...lessonRef, lessonId: next.id })}
            className="inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg"
          >
            {next.title}
            <ArrowRight size={16} aria-hidden />
          </Link>
        )}
      </nav>
    </footer>
  );
}
