import { Check } from "@/components/ui/icons";
import { Link, useParams } from "react-router-dom";
import LevelBadge from "@/components/ui/LevelBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusMessage, { Spinner } from "@/components/ui/StatusMessage";
import { getTopic, getTrack, isTopicReady } from "@/content";
import { KIND_LABELS } from "@/lib/kinds";
import { lessonKey, lessonPath, topicPath } from "@/lib/ids";
import { unmetPrerequisites } from "@/lib/roadmap";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { useLessonIndex } from "@/lib/useLessonIndex";
import { useTopic } from "@/lib/useTopic";
import { useProgress } from "@/store/useProgress";
import NotFound from "./NotFound";

export default function TopicPage() {
  const { trackId = "", topicId = "" } = useParams();
  const track = getTrack(trackId);
  const topic = getTopic(trackId, topicId);
  const completed = useProgress((s) => s.progress.completed);
  const workshopSteps = useProgress((s) => s.progress.workshops);
  const quizBest = useProgress((s) => s.progress.quizBest);
  const state = useTopic(trackId, topic);
  const progress = useProgress((s) => s.progress);
  const { index } = useLessonIndex();
  useDocumentTitle(topic?.title);

  if (!track || !topic) return <NotFound />;

  // Only prerequisites that are written and not yet finished are suggested, and never as a barrier.
  const unmet = unmetPrerequisites(progress, index, track, topic);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-muted">{track.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-fg">{topic.title}</h1>
          <LevelBadge level={topic.level} />
        </div>
        <p className="mt-2 max-w-2xl text-base leading-7 text-muted">{topic.summary}</p>
        {unmet.length > 0 && (
          <p className="mt-3 text-sm text-muted">
            Helpful first:{" "}
            {unmet.map((t, i) => (
              <span key={t.id}>
                {i > 0 && ", "}
                <Link to={topicPath(track.id, t.id)} className="text-accent underline-offset-2 hover:underline">
                  {t.title}
                </Link>
              </span>
            ))}
            . You can skip ahead any time.
          </p>
        )}
      </header>

      {!isTopicReady(topic) && (
        <StatusMessage title="This topic isn't written yet">
          It's on the roadmap. Try one of the topics marked with lessons in the sidebar.
        </StatusMessage>
      )}

      {isTopicReady(topic) && (state.status === "loading" || state.status === "idle") && (
        <Spinner label="Loading lessons" />
      )}

      {state.status === "error" && (
        <StatusMessage
          title="Lessons didn't load"
          action={
            <button onClick={state.retry} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500">
              Try again
            </button>
          }
        >
          Check your connection and try again.
        </StatusMessage>
      )}

      {state.status === "ready" && (
        <>
          {(() => {
            const done = state.lessons.filter((l) => completed[lessonKey({ trackId: track.id, topicId, lessonId: l.id })]).length;
            const percent = state.lessons.length ? Math.round((done / state.lessons.length) * 100) : 0;
            return (
              <div className="max-w-md">
                <p className="mb-1.5 text-sm text-muted">
                  {done} of {state.lessons.length} lessons completed
                </p>
                <ProgressBar percent={percent} label={`${topic.title} progress`} />
              </div>
            );
          })()}

          <ol className="divide-y divide-edge overflow-hidden rounded-xl border border-edge bg-panel">
            {state.lessons.map((lesson) => {
              const ref = { trackId: track.id, topicId, lessonId: lesson.id };
              const done = Boolean(completed[lessonKey(ref)]);
              return (
                <li key={lesson.id}>
                  <Link to={lessonPath(ref)} className="flex items-center gap-4 px-4 py-3.5 hover:bg-raised/60">
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full ${
                        done ? "bg-emerald-500 text-slate-950" : "border border-edge"
                      }`}
                    >
                      {done && <Check size={14} strokeWidth={3} aria-hidden />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-fg">{lesson.title}</span>
                      <span className="block truncate text-sm text-muted">{lesson.summary}</span>
                    </span>
                    <span className="hidden shrink-0 text-xs text-faint sm:block">
                      {KIND_LABELS[lesson.kind]}
                      {lesson.minutes ? `, ${lesson.minutes} min` : ""}
                      {lesson.kind === "workshop" &&
                        `, ${workshopSteps?.[lessonKey(ref)] ?? 0} of ${lesson.steps.length} steps`}
                      {lesson.kind === "quiz" && quizBest?.[lessonKey(ref)] !== undefined && `, best ${quizBest[lessonKey(ref)]}%`}
                    </span>
                    {done && <span className="sr-only">(completed)</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}
