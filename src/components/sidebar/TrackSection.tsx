import { ChevronDown } from "@/components/ui/icons";
import ProgressBar from "@/components/ui/ProgressBar";
import { levelLabel } from "@/components/ui/LevelBadge";
import { LEVELS, type Track } from "@/engine/types";
import { trackStats } from "@/lib/progressMath";
import { useProgress } from "@/store/useProgress";
import TopicRow from "./TopicRow";

interface Props {
  track: Track;
  open: boolean;
  onToggle: () => void;
}

export default function TrackSection({ track, open, onToggle }: Props) {
  const progress = useProgress((s) => s.progress);
  const stats = trackStats(progress, track);
  const panelId = `track-${track.id}`;

  return (
    <section className="rounded-xl border border-edge bg-ink/40">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-raised/60"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-fg">{track.title}</span>
          <span className="mt-0.5 block text-xs text-muted">
            {stats.ready} of {stats.planned} topics written
          </span>
          <ProgressBar percent={stats.percent} label={`${track.title} progress`} className="mt-2" />
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div id={panelId} className="space-y-4 px-2 pb-3 pt-1">
          {LEVELS.map((level) => {
            const topics = track.topics.filter((topic) => topic.level === level);
            if (topics.length === 0) return null;
            return (
              <div key={level}>
                <h3 className="px-2 pb-1 text-xs font-medium text-faint">{levelLabel(level)}</h3>
                <ul className="space-y-0.5">
                  {topics.map((topic) => (
                    <TopicRow key={topic.id} trackId={track.id} topic={topic} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
