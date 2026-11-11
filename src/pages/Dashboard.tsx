import { ArrowRight, PartyPopper } from "@/components/ui/icons";
import { Link } from "react-router-dom";
import BadgeGrid from "@/components/dashboard/BadgeGrid";
import ProgressSummary from "@/components/dashboard/ProgressSummary";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusMessage, { Spinner } from "@/components/ui/StatusMessage";
import { getTopic, isTopicReady, tracks } from "@/content";
import type { Track } from "@/engine/types";
import { computeBadges } from "@/lib/badges";
import { lessonPath, topicPath } from "@/lib/ids";
import { entryKey } from "@/lib/lessonIndex";
import { trackStats } from "@/lib/progressMath";
import { nextUp } from "@/lib/roadmap";
import { currentStreak, localDateKey, longestStreak } from "@/lib/streak";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { useLessonIndex } from "@/lib/useLessonIndex";
import { useTopic } from "@/lib/useTopic";
import { useProgress } from "@/store/useProgress";

const ACCENTS: Record<string, string> = {
  html: "from-indigo-500/20",
  css: "from-violet-500/20",
  tailwind: "from-sky-500/20",
};

function ContinueCard() {
  const last = useProgress((s) => s.progress.last);
  const topic = last ? getTopic(last.trackId, last.topicId) : undefined;
  const state = useTopic(last?.trackId ?? "", topic);

  if (!last || !topic) return null;
  const lesson = state.status === "ready" ? state.lessons.find((l) => l.id === last.lessonId) : undefined;

  return (
    <Link
      to={lessonPath(last)}
      className="group flex items-center justify-between gap-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-4 hover:bg-indigo-500/15"
    >
      <span>
        <span className="block text-sm text-accent">Pick up where you left off</span>
        <span className="mt-0.5 block text-base font-semibold text-fg">{lesson?.title ?? topic.title}</span>
        <span className="block text-sm text-muted">{topic.title}</span>
      </span>
      <ArrowRight className="shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

function TrackCard({ track }: { track: Track }) {
  const progress = useProgress((s) => s.progress);
  const stats = trackStats(progress, track);
  const first = track.topics.find(isTopicReady);

  return (
    <article className={`flex flex-col rounded-xl border border-edge bg-gradient-to-b ${ACCENTS[track.id]} to-panel to-60% p-5`}>
      <h2 className="text-lg font-semibold text-fg">{track.title}</h2>
      <p className="mt-1 text-sm leading-6 text-muted">{track.tagline}</p>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Topics written</dt>
          <dd className="font-mono text-fg-2">
            {stats.ready} / {stats.planned}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Lessons completed</dt>
          <dd className="font-mono text-fg-2">
            {stats.done} / {stats.total}
          </dd>
        </div>
      </dl>
      <ProgressBar percent={stats.percent} label={`${track.title} progress`} className="mt-3" />

      <div className="mt-6 flex-1" />
      <div className="flex flex-wrap items-center gap-3">
        {first ? (
          <Link
            to={topicPath(track.id, first.id)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500"
          >
            Start with {first.title}
            <ArrowRight size={16} aria-hidden />
          </Link>
        ) : (
          <p className="rounded-lg border border-dashed border-edge px-4 py-2 text-sm text-faint">First topics are on the way</p>
        )}
        <Link to={`/${track.id}`} className="text-sm text-accent underline-offset-2 hover:underline">
          See the {track.title} roadmap
        </Link>
      </div>
    </article>
  );
}

export default function Dashboard() {
  useDocumentTitle();
  const progress = useProgress((s) => s.progress);
  const { status, index, retry } = useLessonIndex();

  const today = localDateKey();
  const done = index.filter((e) => progress.completed[entryKey(e)]).length;
  const up = status === "ready" ? nextUp(progress, index, tracks) : undefined;
  const everythingDone = status === "ready" && index.length > 0 && !up;

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">Learn HTML, CSS and Tailwind by changing real code</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Short lessons, live previews and small challenges. Work from your first tag to professional layouts, one step at a time.
        </p>
      </header>

      {progress.last ? (
        <ContinueCard />
      ) : up ? (
        <Link
          to={lessonPath({ trackId: up.track as never, topicId: up.topic, lessonId: up.id })}
          className="group flex items-center justify-between gap-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-4 hover:bg-indigo-500/15"
        >
          <span>
            <span className="block text-sm text-accent">Start here</span>
            <span className="mt-0.5 block text-base font-semibold text-fg">{up.title}</span>
            <span className="block text-sm text-muted">{up.summary}</span>
          </span>
          <ArrowRight className="shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      ) : null}

      {everythingDone && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-4">
          <PartyPopper aria-hidden className="mt-0.5 shrink-0 text-success" />
          <p className="text-sm leading-6 text-fg-2">
            <strong className="font-semibold text-success">You've finished every lesson written so far.</strong> New topics are added regularly.
            In the meantime, the Playground is a good place to experiment.
          </p>
        </div>
      )}

      {status === "loading" && <Spinner label="Loading your progress" />}
      {status === "error" && (
        <StatusMessage
          title="Your progress summary didn't load"
          action={
            <button onClick={retry} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500">
              Try again
            </button>
          }
        >
          Your saved progress is safe. Check your connection and try again.
        </StatusMessage>
      )}
      {status === "ready" && (
        <ProgressSummary
          done={done}
          total={index.length}
          streak={currentStreak(progress.activityDays, today)}
          longest={longestStreak(progress.activityDays)}
          studiedToday={Boolean(progress.activityDays?.includes(today))}
        />
      )}

      <section aria-label="Tracks" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </section>

      {status === "ready" && <BadgeGrid badges={computeBadges(progress, index)} />}
    </div>
  );
}
