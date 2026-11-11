import { Bug, Compass, Flag, Flame, Footprints, Hammer, Lock, Medal, Rocket, Trophy, type IconComponent } from "@/components/ui/icons";
import type { Badge } from "@/lib/badges";

const ICONS: Record<string, IconComponent> = {
  "first-steps": Footprints,
  "getting-going": Rocket,
  dedicated: Medal,
  "on-a-roll": Flame,
  builder: Hammer,
  debugger: Bug,
  "quiz-ace": Trophy,
  "topic-finisher": Flag,
  "all-rounder": Compass,
};

/** Every badge is shown from the start, locked or earned, so the learner can see what to aim for. */
export default function BadgeGrid({ badges }: { badges: Badge[] }) {
  const earned = badges.filter((b) => b.earned).length;
  return (
    <section aria-labelledby="badges-heading">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="badges-heading" className="text-lg font-semibold text-fg">
          Badges
        </h2>
        <p className="text-sm text-muted">
          {earned} of {badges.length} earned
        </p>
      </div>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => {
          const Icon = ICONS[badge.id] ?? Medal;
          return (
            <li
              key={badge.id}
              className={`flex items-start gap-3 rounded-xl border p-4 ${
                badge.earned ? "border-indigo-500/40 bg-gradient-to-br from-indigo-500/15 to-transparent" : "border-edge bg-panel"
              }`}
            >
              <span
                aria-hidden
                className={`grid size-10 shrink-0 place-items-center rounded-lg ${
                  badge.earned ? "bg-indigo-500 text-on-accent" : "bg-raised text-faint"
                }`}
              >
                {badge.earned ? <Icon size={20} /> : <Lock size={16} />}
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-semibold ${badge.earned ? "text-fg" : "text-fg-2"}`}>
                  {badge.title}
                  <span className="sr-only">{badge.earned ? " (earned)" : " (locked)"}</span>
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-muted">{badge.description}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
