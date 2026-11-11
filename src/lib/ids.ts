import type { LessonRef } from "@/engine/types";

/** Stable key used to store progress, e.g. "css/flexbox/main-axis" */
export const lessonKey = (ref: LessonRef): string =>
  `${ref.trackId}/${ref.topicId}/${ref.lessonId}`;

/** Prefix for every lesson in a topic: "css/flexbox/" */
export const topicPrefix = (trackId: string, topicId: string): string =>
  `${trackId}/${topicId}/`;

export const lessonPath = (ref: LessonRef): string =>
  `/${ref.trackId}/${ref.topicId}/${ref.lessonId}`;

export const topicPath = (trackId: string, topicId: string): string =>
  `/${trackId}/${topicId}`;
