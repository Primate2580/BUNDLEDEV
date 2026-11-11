import type { Progress } from "@/engine/types";
import { entryKey, type IndexEntry } from "./lessonIndex";
import { longestStreak } from "./streak";

export interface Badge {
  id: string;
  title: string;
  /** how to earn it (shown whether or not it's earned) */
  description: string;
  earned: boolean;
}

/** Badges are derived from progress, never stored, so they can't drift out of sync. */
export function computeBadges(progress: Progress, lessons: IndexEntry[]): Badge[] {
  const done = new Set(Object.keys(progress.completed));
  const completedEntries = lessons.filter((l) => done.has(entryKey(l)));
  const count = completedEntries.length;
  const anyOfKind = (kind: IndexEntry["kind"]) => completedEntries.some((l) => l.kind === kind);

  // A topic is finished when every one of its lessons is done.
  const byTopic = new Map<string, IndexEntry[]>();
  for (const l of lessons) byTopic.set(`${l.track}/${l.topic}`, [...(byTopic.get(`${l.track}/${l.topic}`) ?? []), l]);
  const finishedTopic = [...byTopic.values()].some((list) => list.length > 0 && list.every((l) => done.has(entryKey(l))));

  const tracksTouched = new Set(completedEntries.map((l) => l.track));
  const bestQuiz = Math.max(0, ...Object.values(progress.quizBest ?? {}));

  const badge = (id: string, title: string, description: string, earned: boolean): Badge => ({ id, title, description, earned });
  return [
    badge("first-steps", "First steps", "Complete your first lesson.", count >= 1),
    badge("getting-going", "Getting going", "Complete 5 lessons.", count >= 5),
    badge("dedicated", "Dedicated", "Complete 25 lessons.", count >= 25),
    badge("on-a-roll", "On a roll", "Study 3 days in a row.", longestStreak(progress.activityDays) >= 3),
    badge("builder", "Builder", "Finish a workshop.", anyOfKind("workshop")),
    badge("debugger", "Debugger", "Fix a broken page in a Debug It lesson.", anyOfKind("debug")),
    badge("quiz-ace", "Quiz ace", "Score 90% or more on a quiz.", bestQuiz >= 90),
    badge("topic-finisher", "Topic finisher", "Complete every lesson in a topic.", finishedTopic),
    badge("all-rounder", "All-rounder", "Complete lessons in HTML, CSS and Tailwind.", tracksTouched.size >= 3),
  ];
}
