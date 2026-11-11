import type { LessonKind } from "@/engine/types";

/** One lesson's searchable summary. Generated for every written topic by `npm run build:content`. */
export interface IndexEntry {
  track: string;
  topic: string;
  id: string;
  kind: LessonKind;
  title: string;
  summary: string;
  minutes?: number;
}

export const entryKey = (entry: Pick<IndexEntry, "track" | "topic" | "id">) => `${entry.track}/${entry.topic}/${entry.id}`;
