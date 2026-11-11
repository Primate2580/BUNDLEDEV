import type { LessonKind, Level, Track } from "@/engine/types";
import { KIND_LABELS } from "./kinds";
import type { IndexEntry } from "./lessonIndex";

export interface SearchResult {
  type: "lesson" | "topic";
  trackId: string;
  topicId: string;
  lessonId?: string;
  title: string;
  /** e.g. "Flexbox, CSS" */
  context: string;
  kind?: LessonKind;
  level: Level;
  /** false for topics on the roadmap that haven't been written yet */
  ready: boolean;
  score: number;
}

const tokenize = (text: string) => text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

/** Best score for one query word against one field: whole-word prefix beats a mid-word hit. */
function fieldScore(field: string, word: string, prefixPoints: number, containsPoints: number): number {
  const lower = field.toLowerCase();
  if (tokenize(lower).some((w) => w.startsWith(word))) return prefixPoints;
  return lower.includes(word) ? containsPoints : 0;
}

/**
 * Ranks topics and lessons for a query. Every word in the query must match somewhere (AND),
 * with title matches counting most. Pure and synchronous, so it is quick enough to run per keystroke.
 */
export function search(query: string, lessons: IndexEntry[], tracks: Track[], limit = 20): SearchResult[] {
  const words = tokenize(query);
  if (words.length === 0) return [];

  const results: SearchResult[] = [];
  const consider = (
    fields: { title: string; topic: string; summary: string; extra: string },
    build: (score: number) => SearchResult,
  ) => {
    let total = 0;
    for (const word of words) {
      const s = Math.max(
        fieldScore(fields.title, word, 6, 4),
        fieldScore(fields.topic, word, 3, 2),
        fieldScore(fields.extra, word, 2, 2),
        fieldScore(fields.summary, word, 2, 1),
      );
      if (s === 0) return; // every word must match something
      total += s;
    }
    if (fields.title.toLowerCase() === query.trim().toLowerCase()) total += 6;
    results.push(build(total));
  };

  for (const track of tracks) {
    for (const topic of track.topics) {
      consider(
        { title: topic.title, topic: "", summary: topic.summary, extra: `${track.title} ${topic.level}` },
        (score) => ({
          type: "topic",
          trackId: track.id,
          topicId: topic.id,
          title: topic.title,
          context: `${track.title}, ${topic.level}`,
          level: topic.level,
          ready: Boolean(topic.load),
          score: score + 1, // a topic should rank just above its own lessons
        }),
      );
    }
  }

  for (const lesson of lessons) {
    const track = tracks.find((t) => t.id === lesson.track);
    const topic = track?.topics.find((t) => t.id === lesson.topic);
    if (!track || !topic) continue;
    consider(
      { title: lesson.title, topic: topic.title, summary: lesson.summary, extra: `${KIND_LABELS[lesson.kind]} ${track.title}` },
      (score) => ({
        type: "lesson",
        trackId: lesson.track,
        topicId: lesson.topic,
        lessonId: lesson.id,
        title: lesson.title,
        context: `${topic.title}, ${track.title}`,
        kind: lesson.kind,
        level: topic.level,
        ready: true,
        score,
      }),
    );
  }

  return results
    .sort((a, b) => b.score - a.score || Number(b.ready) - Number(a.ready) || a.title.localeCompare(b.title))
    .slice(0, limit);
}
