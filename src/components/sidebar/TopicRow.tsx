import { Check, ChevronRight } from "@/components/ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/StatusMessage";
import { isTopicReady } from "@/content";
import type { TopicMeta, TrackId } from "@/engine/types";
import { lessonKey, lessonPath, topicPath } from "@/lib/ids";
import { useRouteIds } from "@/lib/useRouteIds";
import { useTopic } from "@/lib/useTopic";
import { useProgress } from "@/store/useProgress";

interface Props {
  trackId: TrackId;
  topic: TopicMeta;
}

export default function TopicRow({ trackId, topic }: Props) {
  const ready = isTopicReady(topic);
  const route = useRouteIds();
  const isCurrent = route.trackId === trackId && route.topicId === topic.id;
  const [manual, setManual] = useState<boolean | null>(null);
  const expanded = manual ?? isCurrent;

  // Lessons download only once the topic is expanded.
  const state = useTopic(trackId, topic, ready && expanded);
  const completed = useProgress((s) => s.progress.completed);

  if (!ready) {
    return (
      <li className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-faint">
        <span>{topic.title}</span>
        <span className="text-xs text-faint">Coming soon</span>
      </li>
    );
  }

  return (
    <li>
      <div className="flex items-center">
        <button
          onClick={() => setManual(!expanded)}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Hide" : "Show"} lessons in ${topic.title}`}
          className="grid size-7 shrink-0 place-items-center rounded-md text-muted hover:bg-raised hover:text-fg"
        >
          <ChevronRight size={14} aria-hidden className={`transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
        <Link
          to={topicPath(trackId, topic.id)}
          aria-current={isCurrent && !route.lessonId ? "page" : undefined}
          className={`min-w-0 flex-1 truncate rounded-lg px-2 py-1.5 text-sm hover:bg-raised ${
            isCurrent ? "font-medium text-fg" : "text-fg-2"
          }`}
        >
          {topic.title}
        </Link>
      </div>

      {expanded && (
        <div className="ml-3.5 border-l border-edge pl-2">
          {(state.status === "loading" || state.status === "idle") && (
            <div className="px-2 py-2">
              <Spinner label="Loading lessons" />
            </div>
          )}
          {state.status === "error" && (
            <div className="px-2 py-2 text-xs text-danger">
              Couldn't load lessons.{" "}
              <button onClick={state.retry} className="underline hover:text-danger">
                Try again
              </button>
            </div>
          )}
          {state.status === "ready" && (
            <ul className="space-y-0.5 py-1">
              {state.lessons.map((lesson) => {
                const ref = { trackId, topicId: topic.id, lessonId: lesson.id };
                const done = Boolean(completed[lessonKey(ref)]);
                const active = isCurrent && route.lessonId === lesson.id;
                return (
                  <li key={lesson.id}>
                    <Link
                      to={lessonPath(ref)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-raised ${
                        active ? "bg-indigo-500/15 text-fg" : "text-muted"
                      }`}
                    >
                      <span
                        className={`grid size-4 shrink-0 place-items-center rounded-full ${
                          done ? "bg-emerald-500 text-slate-950" : "border border-edge"
                        }`}
                      >
                        {done && <Check size={10} strokeWidth={3} aria-hidden />}
                      </span>
                      <span className="truncate">{lesson.title}</span>
                      {done && <span className="sr-only">(completed)</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}
