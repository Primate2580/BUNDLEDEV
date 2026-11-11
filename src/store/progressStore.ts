import type { Progress } from "@/engine/types";

/**
 * The ONLY door to persisted progress. Components never touch localStorage.
 * Methods are async so a network-backed store (Supabase, Phase 2) can drop in
 * without changing any caller.
 */
export interface ProgressStore {
  getProgress(): Promise<Progress>;
  saveProgress(progress: Progress): Promise<void>;
  reset(): Promise<void>;
}

export const emptyProgress = (): Progress => ({ version: 1, completed: {} });

const STORAGE_KEY = "css-lab:progress:v1";

/** Phase 1 implementation: this browser only. */
export class LocalProgressStore implements ProgressStore {
  async getProgress(): Promise<Progress> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyProgress();
      const parsed = JSON.parse(raw) as Partial<Progress>;
      if (parsed.version !== 1 || typeof parsed.completed !== "object" || !parsed.completed) {
        return emptyProgress();
      }
      const workshops =
        parsed.workshops && typeof parsed.workshops === "object" ? parsed.workshops : undefined;
      const quizBest =
        parsed.quizBest && typeof parsed.quizBest === "object" ? parsed.quizBest : undefined;
      const activityDays = Array.isArray(parsed.activityDays)
        ? parsed.activityDays.filter((d): d is string => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d))
        : undefined;
      return { version: 1, completed: parsed.completed, workshops, quizBest, activityDays, last: parsed.last };
    } catch {
      // Corrupt JSON or storage blocked (private mode): start fresh.
      return emptyProgress();
    }
  }

  async saveProgress(progress: Progress): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage full or blocked. Progress still works in memory this session.
    }
  }

  async reset(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
}

/** Swap this one line for a SupabaseProgressStore in Phase 2. */
export const progressStore: ProgressStore = new LocalProgressStore();
