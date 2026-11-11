import { Check } from "@/components/ui/icons";
import { Link, useParams } from "react-router-dom";
import LevelBadge from "@/components/ui/LevelBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusMessage, { Spinner } from "@/components/ui/StatusMessage";
import { getTrack } from "@/content";
import type { TopicMeta, Track } from "@/engine/types";
import { topicPath } from "@/lib/ids";
import type { IndexEntry } from "@/lib/lessonIndex";
import { currentLevel, levelSummaries, topicStatus, unmetPrerequisites, type LevelSummary } from "@/lib/roadmap";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { useLessonIndex } from "@/lib/useLessonIndex";
import { useProgress } from "@/store/useProgress";
import NotFound from "./NotFound";

function TopicCard({ track, topic, index }: { track: Track; topic: TopicMeta; index: IndexEntry[] }) {
  const progress = useProgress((s) => s.progress);
  const status = topicStatus(progress, index, track.id, topic);
  const unmet = unmetPrerequisites(progress, index, track, topic);

  const label =
    status.state === "planned"
      ? "Coming soon"
      : status.state === "not-started"
        ? "Not started"
        : status.state === "completed"
          ? "Completed"
          : `${status.done} of ${status.total} lessons`;

  return (
    <li className={`rounded-xl border p-4 ${status.state === "planned" ? "border-dashed border-edge" : "border-edge bg-panel"}`}>
      <h4 className="font-semibold">
        <Link to={topicPath(track.id, topic.id)} className={`hover:underline ${status.state === "planned" ? "text-muted" : "text-fg"}`}>
          {topic.title}
        </Link>
      </h4>
      <p className="mt-1 text-sm leading-6 text-muted">{topic.summary}</p>
      <p
        className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium ${
          status.state === "completed" ? "text-success" : status.state === "in-progress" ? "text-accent" : "text-faint"
        }`}
      >
        {status.state === "completed" && <Check size={13} strokeWidth={3} aria-hidden />}
        {label}
      </p>
      {unmet.length > 0 && (
        <p className="mt-2 text-xs leading-5 text-faint">Helpful first: {unmet.map((t) => t.title).join(", ")}</p>
      )}
    </li>
  );
}

function LevelSection({ track, summary, current, index, after }: { track: Track; summary: LevelSummary; current: boolean; index: IndexEntry[]; after: boolean }) {
  if (summary.topics.length === 0) return null;
  const id = `level-${summary.level}`;
  return (
    <section aria-labelledby={id} className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <h3 id={id} className="sr-only">
          {summary.level} level
        </h3>
        <LevelBadge level={summary.level} />
        {current && <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-accent">Work on this next</span>}
        <p className="text-sm text-muted">
          {summary.written === 0
            ? `${summary.topics.length} topics planned`
            : `${summary.completed} of ${summary.written} written topics completed`}
        </p>
      </div>
      {summary.written > 0 && <ProgressBar percent={summary.percent} label={`${summary.level} level progress`} className="max-w-md" />}
      {after && (
        <p className="text-sm text-faint">This level builds on the earlier ones, but you can skip ahead any time.</p>
      )}
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {summary.topics.map((topic) => (
          <TopicCard key={topic.id} track={track} topic={topic} index={index} />
        ))}
      </ul>
    </section>
  );
}

/** The roadmap for one track, grouped by level, with gentle guidance and no locked doors. */
export default function TrackPage() {
  const { trackId = "" } = useParams();
  const track = getTrack(trackId);
  const progress = useProgress((s) => s.progress);
  const { status, index, retry } = useLessonIndex();
  useDocumentTitle(track ? `${track.title} roadmap` : undefined);

  if (!track) return <NotFound />;

  const summaries = levelSummaries(progress, index, track);
  const current = currentLevel(summaries);
  const currentAt = summaries.findIndex((s) => s.level === current);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm text-muted">Roadmap</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-fg">{track.title}</h1>
        <p className="mt-2 max-w-2xl text-base leading-7 text-muted">{track.tagline}</p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-faint">
          Topics are grouped by level. Nothing is locked: the "helpful first" notes just suggest a good order.
        </p>
      </header>

      {status === "loading" && <Spinner label="Loading the roadmap" />}
      {status === "error" && (
        <StatusMessage
          title="The roadmap didn't load"
          action={
            <button onClick={retry} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500">
              Try again
            </button>
          }
        >
          Check your connection and try again.
        </StatusMessage>
      )}
      {status === "ready" && (
        <div className="space-y-10">
          {summaries.map((summary, i) => (
            <LevelSection
              key={summary.level}
              track={track}
              summary={summary}
              current={summary.level === current}
              index={index}
              after={currentAt !== -1 && i > currentAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
