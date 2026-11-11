import { useEffect, useState } from "react";
import type { IndexEntry } from "./lessonIndex";

let cache: Promise<IndexEntry[]> | undefined;

/** The generated lesson index, downloaded once and only when something needs it. */
export function loadLessonIndex(): Promise<IndexEntry[]> {
  cache ??= import("@/content/lesson-index.generated").then((module) => module.lessonIndex);
  cache.catch(() => {
    cache = undefined; // let a retry actually retry
  });
  return cache;
}

type State = { status: "loading" | "ready" | "error"; index: IndexEntry[] };

export function useLessonIndex(enabled = true): State & { retry: () => void } {
  const [state, setState] = useState<State>({ status: "loading", index: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    loadLessonIndex().then(
      (index) => !cancelled && setState({ status: "ready", index }),
      () => !cancelled && setState({ status: "error", index: [] }),
    );
    return () => {
      cancelled = true;
    };
  }, [enabled, attempt]);

  return {
    ...state,
    retry: () => {
      setState({ status: "loading", index: [] });
      setAttempt((n) => n + 1);
    },
  };
}
