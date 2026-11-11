import { create } from "zustand";
import type { LessonRef, Progress } from "@/engine/types";
import { lessonKey } from "@/lib/ids";
import { localDateKey, recordActivity } from "@/lib/streak";
import { emptyProgress, progressStore } from "./progressStore";

interface ProgressState {
  progress: Progress;
  /** false until the first read from the store finishes */
  ready: boolean;
  load: () => Promise<void>;
  markComplete: (ref: LessonRef) => void;
  markIncomplete: (ref: LessonRef) => void;
  setLast: (ref: LessonRef) => void;
  /** Records that step `stepIndex` (0-based) of a workshop passed. Finishing the last step completes the lesson. */
  completeWorkshopStep: (ref: LessonRef, stepIndex: number, totalSteps: number) => void;
  /**
   * Records a quiz score (percent). Keeps the best score. Reaching the pass mark completes the lesson.
   * Returns whether this attempt passed.
   */
  recordQuizScore: (ref: LessonRef, percent: number, passPercent: number) => boolean;
  /** Forgets a workshop's step progress and its completion. */
  resetWorkshop: (ref: LessonRef) => void;
  reset: () => Promise<void>;
}

export const useProgress = create<ProgressState>((set, get) => {
  const commit = (progress: Progress) => {
    set({ progress });
    void progressStore.saveProgress(progress);
  };

  /** Like commit, and also records today as a day the learner studied (for streaks). */
  const commitActive = (progress: Progress) =>
    commit({ ...progress, activityDays: recordActivity(progress.activityDays, localDateKey()) });

  return {
    progress: emptyProgress(),
    ready: false,

    load: async () => {
      const progress = await progressStore.getProgress();
      set({ progress, ready: true });
    },

    markComplete: (ref) => {
      const { progress } = get();
      const key = lessonKey(ref);
      if (progress.completed[key]) return;
      commitActive({ ...progress, completed: { ...progress.completed, [key]: Date.now() } });
    },

    markIncomplete: (ref) => {
      const { progress } = get();
      const completed = { ...progress.completed };
      delete completed[lessonKey(ref)];
      commit({ ...progress, completed });
    },

    setLast: (ref) => {
      const { progress } = get();
      const prev = progress.last;
      if (prev && lessonKey(prev) === lessonKey(ref)) return;
      commit({ ...progress, last: ref });
    },

    completeWorkshopStep: (ref, stepIndex, totalSteps) => {
      const { progress } = get();
      const key = lessonKey(ref);
      const done = Math.max(progress.workshops?.[key] ?? 0, stepIndex + 1);
      const finished = done >= totalSteps;
      commitActive({
        ...progress,
        completed:
          finished && !progress.completed[key]
            ? { ...progress.completed, [key]: Date.now() }
            : progress.completed,
        workshops: { ...progress.workshops, [key]: Math.min(done, totalSteps) },
      });
    },

    recordQuizScore: (ref, percent, passPercent) => {
      const { progress } = get();
      const key = lessonKey(ref);
      const passed = percent >= passPercent;
      commitActive({
        ...progress,
        completed: passed && !progress.completed[key] ? { ...progress.completed, [key]: Date.now() } : progress.completed,
        quizBest: { ...progress.quizBest, [key]: Math.max(progress.quizBest?.[key] ?? 0, percent) },
      });
      return passed;
    },

    resetWorkshop: (ref) => {
      const { progress } = get();
      const key = lessonKey(ref);
      const completed = { ...progress.completed };
      delete completed[key];
      const workshops = { ...progress.workshops };
      delete workshops[key];
      commit({ ...progress, completed, workshops });
    },

    reset: async () => {
      await progressStore.reset();
      set({ progress: emptyProgress() });
    },
  };
});
