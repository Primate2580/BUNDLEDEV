import type { LessonKind } from "@/engine/types";

export const KIND_LABELS: Record<LessonKind, string> = {
  learn: "Learn",
  visualizer: "Visualizer",
  workshop: "Workshop",
  lab: "Lab",
  predict: "Predict the output",
  debug: "Debug it",
  quiz: "Quiz",
  review: "Review",
};
