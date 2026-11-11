import { Hammer } from "@/components/ui/icons";
import { KIND_LABELS } from "@/lib/kinds";
import type { LessonKind } from "@/engine/types";

/** Shown for lesson kinds whose player isn't built yet. Replaced kind by kind in later segments. */
export default function UnavailableLesson({ kind }: { kind: LessonKind }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-dashed border-edge bg-panel/60 p-6">
      <Hammer size={20} aria-hidden className="mt-0.5 shrink-0 text-faint" />
      <div>
        <h2 className="font-medium text-fg">{KIND_LABELS[kind]} lessons are coming soon</h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          This lesson type isn't playable yet. Move on to the next lesson, and come back later.
        </p>
      </div>
    </div>
  );
}
