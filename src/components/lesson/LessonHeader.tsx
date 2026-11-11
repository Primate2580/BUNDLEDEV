import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LevelBadge from "@/components/ui/LevelBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import type { Lesson, Level } from "@/engine/types";
import { topicPath } from "@/lib/ids";
import { KIND_LABELS } from "@/lib/kinds";

interface Props {
  lesson: Lesson;
  trackId: string;
  trackTitle: string;
  topicId: string;
  topicTitle: string;
  level: Level;
  /** 1-based position within the topic */
  position: number;
  total: number;
  doneCount: number;
  /** tighter, for the narrow Learn pane */
  compact?: boolean;
}

export default function LessonHeader({
  lesson,
  trackId,
  trackTitle,
  topicId,
  topicTitle,
  level,
  position,
  total,
  doneCount,
  compact = false,
}: Props) {
  const heading = useRef<HTMLHeadingElement>(null);

  // Move focus to the title on each new lesson so screen readers announce it.
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [lesson.id]);

  return (
    <header className={compact ? "space-y-3" : "space-y-4"}>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <span>{trackTitle}</span>
        <span aria-hidden className="mx-1.5 text-faint">/</span>
        <Link to={topicPath(trackId, topicId)} className="hover:text-fg">
          {topicTitle}
        </Link>
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <h1
          ref={heading}
          tabIndex={-1}
          className={`font-bold tracking-tight text-fg outline-none ${compact ? "text-2xl" : "text-3xl sm:text-4xl"}`}
        >
          {lesson.title}
        </h1>
        <LevelBadge level={level} />
      </div>

      <p className={`max-w-3xl text-muted ${compact ? "text-sm leading-6" : "text-base leading-7"}`}>{lesson.summary}</p>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-edge pb-5">
        <p className="text-sm text-muted">
          {KIND_LABELS[lesson.kind]}
          {lesson.minutes ? `, about ${lesson.minutes} minutes` : ""}
        </p>
        <div className={compact ? "w-full" : "w-full sm:w-56"}>
          <p className="mb-1.5 text-xs text-muted">
            Lesson {position} of {total}, {doneCount} completed
          </p>
          <ProgressBar
            percent={total ? (doneCount / total) * 100 : 0}
            label={`${topicTitle} progress`}
          />
        </div>
      </div>
    </header>
  );
}
