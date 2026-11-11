import { BookOpen, Bug, ClipboardList, FlaskConical, Folder, Hammer, Lightbulb, ListChecks, SlidersHorizontal, type IconComponent } from "@/components/ui/icons";
import type { LessonKind } from "@/engine/types";

const ICONS: Record<LessonKind | "topic", IconComponent> = {
  learn: BookOpen,
  visualizer: SlidersHorizontal,
  workshop: Hammer,
  lab: FlaskConical,
  predict: Lightbulb,
  debug: Bug,
  quiz: ListChecks,
  review: ClipboardList,
  topic: Folder,
};

/** Decorative icon for a lesson type. The type is always also stated in text next to it. */
export default function KindIcon({ kind, size = 16, className = "" }: { kind: LessonKind | "topic"; size?: number; className?: string }) {
  const Icon = ICONS[kind];
  return <Icon size={size} aria-hidden className={className} />;
}
