import { tracks } from "@/content";
import type { Progress, Track } from "@/engine/types";
import { topicPrefix } from "./ids";

export const countCompleted = (progress: Progress, prefix: string): number =>
  Object.keys(progress.completed).filter((key) => key.startsWith(prefix)).length;

export function topicStats(progress: Progress, trackId: string, topicId: string, total = 0) {
  const done = countCompleted(progress, topicPrefix(trackId, topicId));
  return { done: Math.min(done, total || done), total, percent: total ? Math.min(100, Math.round((done / total) * 100)) : 0 };
}

/** Totals only count topics whose content exists. */
export function trackStats(progress: Progress, track: Track) {
  let total = 0;
  let done = 0;
  let ready = 0;
  for (const topic of track.topics) {
    if (!topic.load) continue;
    ready += 1;
    const count = topic.lessonCount ?? 0;
    total += count;
    done += Math.min(count, countCompleted(progress, topicPrefix(track.id, topic.id)));
  }
  return {
    done,
    total,
    ready,
    planned: track.topics.length,
    percent: total ? Math.round((done / total) * 100) : 0,
  };
}

export function overallStats(progress: Progress) {
  let done = 0;
  let total = 0;
  for (const track of tracks) {
    const stats = trackStats(progress, track);
    done += stats.done;
    total += stats.total;
  }
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}
