import { CalendarDays, Flame, GraduationCap } from "@/components/ui/icons";
import type { ReactNode } from "react";

interface Props {
  done: number;
  total: number;
  streak: number;
  longest: number;
  studiedToday: boolean;
}

function Tile({ icon, label, value, note }: { icon: ReactNode; label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-edge bg-panel p-4">
      <p className="flex items-center gap-2 text-xs font-medium text-muted">
        <span aria-hidden className="text-accent">
          {icon}
        </span>
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-fg">{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{note}</p>
    </div>
  );
}

export default function ProgressSummary({ done, total, streak, longest, studiedToday }: Props) {
  return (
    <section aria-label="Your progress" className="grid gap-3 sm:grid-cols-3">
      <Tile
        icon={<GraduationCap size={14} />}
        label="Lessons completed"
        value={`${done} of ${total}`}
        note={total === 0 ? "Lessons will appear here as they are written." : done === total ? "That's every lesson written so far." : `${total - done} to go in what's written so far.`}
      />
      <Tile
        icon={<Flame size={14} />}
        label="Day streak"
        value={String(streak)}
        note={
          streak === 0
            ? "Complete a lesson to start a streak."
            : studiedToday
              ? "You've studied today. Come back tomorrow to extend it."
              : "Study today to keep it going."
        }
      />
      <Tile
        icon={<CalendarDays size={14} />}
        label="Longest streak"
        value={String(longest)}
        note={longest === 0 ? "Your best run of days in a row shows here." : `Your best run is ${longest} day${longest === 1 ? "" : "s"} in a row.`}
      />
    </section>
  );
}
