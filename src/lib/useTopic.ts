import { useEffect, useState } from "react";
import type { Lesson, TopicMeta } from "@/engine/types";

type TopicState =
  | { status: "idle" | "loading" }
  | { status: "ready"; lessons: Lesson[] }
  | { status: "error"; message: string };

/** One download per topic per session. */
const cache = new Map<string, Promise<Lesson[]>>();

export function loadTopic(key: string, topic: TopicMeta): Promise<Lesson[]> {
  const hit = cache.get(key);
  if (hit) return hit;
  if (!topic.load) return Promise.resolve([]);
  const promise = topic.load().then((module) => module.default.lessons);
  // Don't cache failures, so "Try again" can actually retry.
  promise.catch(() => cache.delete(key));
  cache.set(key, promise);
  return promise;
}

/**
 * Loads a topic's lessons on demand. Pass `enabled=false` to wait
 * (the sidebar only loads a topic once it is expanded).
 */
export function useTopic(
  trackId: string,
  topic: TopicMeta | undefined,
  enabled = true,
): TopicState & { retry: () => void } {
  const [state, setState] = useState<TopicState>({ status: "idle" });
  const [attempt, setAttempt] = useState(0);
  const key = topic ? `${trackId}/${topic.id}` : "";
  const hasContent = Boolean(topic?.load);

  useEffect(() => {
    if (!topic || !enabled || !hasContent) return;
    let cancelled = false;
    setState({ status: "loading" });
    loadTopic(key, topic).then(
      (lessons) => !cancelled && setState({ status: "ready", lessons }),
      (error: unknown) =>
        !cancelled &&
        setState({
          status: "error",
          message: error instanceof Error ? error.message : "Could not load this topic.",
        }),
    );
    return () => {
      cancelled = true;
    };
    // `topic` is a stable object from the content tree; key identifies it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled, hasContent, attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
