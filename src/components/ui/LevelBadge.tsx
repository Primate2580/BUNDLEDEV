import type { Level } from "@/engine/types";

// Full class names (not built dynamically) so Tailwind can find them.
const STYLES: Record<Level, string> = {
  beginner: "bg-emerald-500/10 text-success ring-emerald-500/30",
  intermediate: "bg-sky-500/10 text-info ring-sky-500/30",
  advanced: "bg-amber-500/10 text-warn ring-amber-500/30",
  pro: "bg-violet-500/10 text-pro ring-violet-500/30",
};

const LABELS: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  pro: "Pro",
};

export const levelLabel = (level: Level) => LABELS[level];

export default function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STYLES[level]}`}
    >
      {LABELS[level]}
    </span>
  );
}
