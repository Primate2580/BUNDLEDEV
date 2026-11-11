import { Link } from "react-router-dom";
import KindIcon from "@/components/ui/KindIcon";
import StatusMessage, { Spinner } from "@/components/ui/StatusMessage";
import { getTopic, tracks } from "@/content";
import type { IndexEntry } from "@/lib/lessonIndex";
import { lessonKey, lessonPath } from "@/lib/ids";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { useLessonIndex } from "@/lib/useLessonIndex";
import { useProgress } from "@/store/useProgress";

/** Every Visualizer lesson in one place, grouped by track and topic. */
export default function VisualizerHub() {
  useDocumentTitle("Visualizer");
  const { status, index, retry } = useLessonIndex();
  const completed = useProgress((s) => s.progress.completed);
  const visualizers = index.filter((entry) => entry.kind === "visualizer");

  const groups = tracks
    .map((track) => {
      const topics = new Map<string, IndexEntry[]>();
      for (const entry of visualizers) {
        if (entry.track !== track.id) continue;
        topics.set(entry.topic, [...(topics.get(entry.topic) ?? []), entry]);
      }
      return { track, topics: [...topics.entries()] };
    })
    .filter((group) => group.topics.length > 0);

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-fg">Visualizer</h1>
        <p className="mt-2 text-base leading-7 text-muted">
          Change a property with a control and watch the layout respond. Each visualizer draws the axes, gaps or boxes
          the CSS is creating, so you can see what the code does.
        </p>
      </header>

      {status === "loading" && <Spinner label="Loading visualizers" />}
      {status === "error" && (
        <StatusMessage
          title="The list didn't load"
          action={
            <button onClick={retry} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500">
              Try again
            </button>
          }
        >
          Check your connection and try again.
        </StatusMessage>
      )}
      {status === "ready" && groups.length === 0 && (
        <StatusMessage title="No visualizers yet">Visualizers appear here as topics are written.</StatusMessage>
      )}

      {groups.map(({ track, topics }) => (
        <section key={track.id} aria-label={track.title} className="space-y-5">
          <h2 className="text-lg font-semibold text-fg">{track.title}</h2>
          {topics.map(([topicId, entries]) => (
            <div key={topicId}>
              <h3 className="text-sm font-semibold text-muted">{getTopic(track.id, topicId)?.title ?? topicId}</h3>
              <ul className="mt-2 grid gap-3 sm:grid-cols-2">
                {entries.map((entry) => {
                  const ref = { trackId: track.id, topicId, lessonId: entry.id };
                  const done = Boolean(completed[lessonKey(ref)]);
                  return (
                    <li key={entry.id}>
                      <Link
                        to={lessonPath(ref)}
                        className="flex h-full gap-3 rounded-xl border border-edge bg-panel p-4 hover:bg-raised"
                      >
                        <KindIcon kind="visualizer" size={18} className="mt-0.5 shrink-0 text-accent" />
                        <span>
                          <span className="block font-medium text-fg">
                            {entry.title}
                            {done && <span className="ml-2 text-xs font-normal text-success">Completed</span>}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-muted">{entry.summary}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
