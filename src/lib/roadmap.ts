import { LEVELS, type Level, type Progress, type TopicMeta, type Track } from "@/engine/types";
import { entryKey, type IndexEntry } from "./lessonIndex";

export type TopicState = "planned" | "not-started" | "in-progress" | "completed";

export interface TopicStatus {
  state: TopicState;
  done: number;
  total: number;
}

const isDone = (progress: Progress, entry: IndexEntry) => Boolean(progress.completed[entryKey(entry)]);

export function lessonsOfTopic(index: IndexEntry[], trackId: string, topicId: string): IndexEntry[] {
  return index.filter((e) => e.track === trackId && e.topic === topicId);
}

export function topicStatus(progress: Progress, index: IndexEntry[], trackId: string, topic: TopicMeta): TopicStatus {
  if (!topic.load) return { state: "planned", done: 0, total: 0 };
  const lessons = lessonsOfTopic(index, trackId, topic.id);
  const total = lessons.length || topic.lessonCount || 0;
  const done = lessons.filter((l) => isDone(progress, l)).length;
  const state: TopicState = total > 0 && done >= total ? "completed" : done > 0 ? "in-progress" : "not-started";
  return { state, done, total };
}

/**
 * Prerequisites the learner hasn't finished. Only written topics count: a prerequisite that doesn't
 * exist yet can't be completed, so it is never held against anyone. Advisory, never blocking.
 */
export function unmetPrerequisites(progress: Progress, index: IndexEntry[], track: Track, topic: TopicMeta): TopicMeta[] {
  return (topic.prerequisites ?? [])
    .map((id) => track.topics.find((t) => t.id === id))
    .filter((t): t is TopicMeta => Boolean(t?.load))
    .filter((t) => topicStatus(progress, index, track.id, t).state !== "completed");
}

export interface LevelSummary {
  level: Level;
  topics: TopicMeta[];
  written: number;
  completed: number;
  lessonsDone: number;
  lessonsTotal: number;
  percent: number;
}

export function levelSummaries(progress: Progress, index: IndexEntry[], track: Track): LevelSummary[] {
  return LEVELS.map((level) => {
    const topics = track.topics.filter((t) => t.level === level);
    const statuses = topics.map((t) => topicStatus(progress, index, track.id, t));
    const lessonsDone = statuses.reduce((n, s) => n + s.done, 0);
    const lessonsTotal = statuses.reduce((n, s) => n + s.total, 0);
    return {
      level,
      topics,
      written: statuses.filter((s) => s.state !== "planned").length,
      completed: statuses.filter((s) => s.state === "completed").length,
      lessonsDone,
      lessonsTotal,
      percent: lessonsTotal ? Math.round((lessonsDone / lessonsTotal) * 100) : 0,
    };
  });
}

/** The level to work on now: the first one that has written topics and isn't finished. */
export function currentLevel(summaries: LevelSummary[]): Level | undefined {
  return summaries.find((s) => s.written > 0 && s.completed < s.written)?.level;
}

/** The first unfinished lesson, in curriculum order. */
export function nextUp(progress: Progress, index: IndexEntry[], tracks: Track[]): IndexEntry | undefined {
  for (const track of tracks) {
    for (const topic of track.topics) {
      if (!topic.load) continue;
      const next = lessonsOfTopic(index, track.id, topic.id).find((l) => !isDone(progress, l));
      if (next) return next;
    }
  }
  return undefined;
}
