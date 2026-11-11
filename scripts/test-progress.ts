// A tiny in-memory localStorage, installed BEFORE the store modules load.
const storage = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => storage.get(k) ?? null,
  setItem: (k: string, v: string) => void storage.set(k, v),
  removeItem: (k: string) => void storage.delete(k),
};

const { useProgress } = await import("../src/store/useProgress");
const { progressStore } = await import("../src/store/progressStore");
const { lessonKey } = await import("../src/lib/ids");

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : extra ? `  -> ${extra}` : ""));
  if (!cond) failed++;
};
const wait = () => new Promise((r) => setTimeout(r, 10)); // saves are fire-and-forget
const state = () => useProgress.getState().progress;

const ws = { trackId: "html" as const, topicId: "document-structure", lessonId: "build-a-trail-page" };
const other = { trackId: "html" as const, topicId: "document-structure", lessonId: "what-is-html" };
const key = lessonKey(ws);

ok("starts empty", Object.keys(state().completed).length === 0 && !state().workshops);

useProgress.getState().completeWorkshopStep(ws, 0, 3);
ok("step 1 of 3 recorded as 1 done", state().workshops?.[key] === 1);
ok("workshop not complete after 1 of 3", !state().completed[key]);

useProgress.getState().completeWorkshopStep(ws, 0, 3);
ok("re-passing the same step doesn't double count", state().workshops?.[key] === 1);

useProgress.getState().completeWorkshopStep(ws, 1, 3);
ok("step 2 -> 2 done", state().workshops?.[key] === 2);

useProgress.getState().completeWorkshopStep(ws, 0, 3);
ok("re-passing an EARLIER step never lowers progress", state().workshops?.[key] === 2);

useProgress.getState().completeWorkshopStep(ws, 2, 3);
ok("last step -> 3 of 3", state().workshops?.[key] === 3);
ok("finishing the last step completes the lesson", Boolean(state().completed[key]));

const completedAt = state().completed[key];
useProgress.getState().completeWorkshopStep(ws, 2, 3);
ok("completion time isn't overwritten", state().completed[key] === completedAt);

useProgress.getState().markComplete(other);
await wait();
const saved = JSON.parse(storage.get("css-lab:progress:v1")!);
ok("saved to storage with workshop steps", saved.workshops?.[key] === 3 && saved.completed[lessonKey(other)]);

const reloaded = await progressStore.getProgress();
ok("round trip through the store keeps step progress", reloaded.workshops?.[key] === 3);

useProgress.getState().resetWorkshop(ws);
ok("resetWorkshop clears steps and completion", state().workshops?.[key] === undefined && !state().completed[key]);
ok("resetWorkshop leaves other lessons alone", Boolean(state().completed[lessonKey(other)]));

useProgress.getState().completeWorkshopStep(ws, 9, 3);
ok("progress is capped at the number of steps", state().workshops?.[key] === 3);

// quizzes keep the best score, and passing completes the lesson
const quiz = { trackId: "html" as const, topicId: "document-structure", lessonId: "document-structure-quiz" };
const quizKey = lessonKey(quiz);
ok("a failing score is recorded but doesn't complete", useProgress.getState().recordQuizScore(quiz, 40, 70) === false && state().quizBest?.[quizKey] === 40 && !state().completed[quizKey]);
ok("a lower later score never replaces the best", (useProgress.getState().recordQuizScore(quiz, 20, 70), state().quizBest?.[quizKey] === 40));
ok("reaching the pass mark completes the lesson", useProgress.getState().recordQuizScore(quiz, 70, 70) === true && Boolean(state().completed[quizKey]) && state().quizBest?.[quizKey] === 70);
const quizDone = state().completed[quizKey];
useProgress.getState().recordQuizScore(quiz, 100, 70);
ok("a better score updates the best without changing the completion time", state().quizBest?.[quizKey] === 100 && state().completed[quizKey] === quizDone);
useProgress.getState().recordQuizScore(quiz, 50, 70);
ok("failing after passing keeps the lesson complete", Boolean(state().completed[quizKey]) && state().quizBest?.[quizKey] === 100);
await wait();
ok("quiz scores are saved to storage", JSON.parse(storage.get("css-lab:progress:v1")!).quizBest?.[quizKey] === 100);

// study days power streaks: any completion, workshop step or quiz attempt counts, once per day
import("../src/lib/streak").then(() => {});
const { localDateKey } = await import("../src/lib/streak");
useProgress.getState().reset();
await wait();
ok("a fresh start has no study days", !state().activityDays || state().activityDays!.length === 0);
useProgress.getState().markComplete(other);
ok("completing a lesson records today", state().activityDays?.join() === localDateKey());
useProgress.getState().markComplete(ws);
ok("a second completion the same day doesn't duplicate it", state().activityDays?.length === 1);
useProgress.getState().markIncomplete(other);
useProgress.getState().setLast(ws);
ok("un-completing or just visiting adds no study day", state().activityDays?.length === 1);
useProgress.getState().reset();
useProgress.getState().completeWorkshopStep(ws, 0, 5);
ok("passing a workshop step counts as studying", state().activityDays?.includes(localDateKey()) === true);
useProgress.getState().reset();
useProgress.getState().recordQuizScore(quiz, 10, 70);
ok("even a failed quiz attempt counts as studying", state().activityDays?.includes(localDateKey()) === true);
storage.set("css-lab:progress:v1", JSON.stringify({ version: 1, completed: {}, activityDays: ["2026-01-01", 5, "oops", "2026-1-2"] }));
ok("junk in saved study days is dropped, valid days kept", (await progressStore.getProgress()).activityDays?.join() === "2026-01-01");

// old saves (before step progress existed) and damaged saves
storage.set("css-lab:progress:v1", JSON.stringify({ version: 1, completed: { "css/x/y": 1 } }));
const legacy = await progressStore.getProgress();
ok("older save without workshops still loads", legacy.completed["css/x/y"] === 1 && legacy.workshops === undefined);
storage.set("css-lab:progress:v1", "{not json");
const damaged = await progressStore.getProgress();
ok("damaged save falls back to empty progress", Object.keys(damaged.completed).length === 0);

await useProgress.getState().load();
ok("load() after damage leaves the app usable", useProgress.getState().ready === true);

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
