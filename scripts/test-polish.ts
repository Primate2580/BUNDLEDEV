import type { Progress, TopicMeta, Track } from "../src/engine/types";
import { computeBadges } from "../src/lib/badges";
import type { IndexEntry } from "../src/lib/lessonIndex";
import { currentLevel, levelSummaries, nextUp, topicStatus, unmetPrerequisites } from "../src/lib/roadmap";
import { search } from "../src/lib/search";
import { nextTab } from "../src/lib/useRovingTabs";
import { addDays, currentStreak, localDateKey, longestStreak, recordActivity } from "../src/lib/streak";

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : extra ? `  -> ${extra}` : ""));
  if (!cond) failed++;
};

/* ---------------- streaks ---------------- */
ok("addDays crosses a month", addDays("2026-01-31", 1) === "2026-02-01");
ok("addDays crosses a year, forwards and back", addDays("2026-12-31", 1) === "2027-01-01" && addDays("2027-01-01", -1) === "2026-12-31");
ok("addDays handles leap days", addDays("2028-02-28", 1) === "2028-02-29" && addDays("2027-02-28", 1) === "2027-03-01");
ok("addDays is steady across daylight-saving dates", addDays("2026-03-28", 3) === "2026-03-31" && addDays("2026-10-24", 2) === "2026-10-26");
ok("localDateKey uses local year-month-day, zero padded", localDateKey(new Date(2026, 0, 5, 23, 59)) === "2026-01-05");

ok("recordActivity adds a day once, in order", recordActivity(["2026-05-03", "2026-05-01"], "2026-05-02").join() === "2026-05-01,2026-05-02,2026-05-03");
ok("recordActivity ignores a repeat", recordActivity(["2026-05-01"], "2026-05-01").length === 1);
ok("recordActivity starts from nothing", recordActivity(undefined, "2026-05-01").join() === "2026-05-01");
ok("recordActivity keeps the list bounded", recordActivity(Array.from({ length: 500 }, (_, i) => addDays("2025-01-01", i)), "2026-06-01").length <= 400);

const T = "2026-06-10";
ok("streak: today and the two days before = 3", currentStreak(["2026-06-08", "2026-06-09", T], T) === 3);
ok("streak is still alive if you studied yesterday but not yet today", currentStreak(["2026-06-08", "2026-06-09"], T) === 2);
ok("streak is lost after a missed day", currentStreak(["2026-06-07", "2026-06-08"], T) === 0);
ok("streak: a gap ends the run", currentStreak(["2026-06-05", "2026-06-06", "2026-06-09", T], T) === 2);
ok("streak: no activity = 0", currentStreak(undefined, T) === 0 && currentStreak([], T) === 0);
ok("streak counts across a month boundary", currentStreak(["2026-05-31", "2026-06-01", "2026-06-02"], "2026-06-02") === 3);
ok("longest streak finds the best run", longestStreak(["2026-01-01", "2026-01-02", "2026-01-10", "2026-01-11", "2026-01-12", "2026-01-13"]) === 4);
ok("longest streak of a single day or none", longestStreak(["2026-01-01"]) === 1 && longestStreak(undefined) === 0);
ok("longest streak ignores duplicates and order", longestStreak(["2026-01-03", "2026-01-01", "2026-01-02", "2026-01-02"]) === 3);

/* ---------------- fixtures ---------------- */
const topic = (id: string, title: string, level: TopicMeta["level"], written: boolean, extra: Partial<TopicMeta> = {}): TopicMeta => ({
  id, title, level, summary: `About ${title.toLowerCase()}.`, ...(written ? { load: async () => ({ default: { lessons: [] } }), lessonCount: 2 } : {}), ...extra,
});
const tracks: Track[] = [
  { id: "css", title: "CSS", tagline: "", topics: [
      topic("box-model", "Box model", "beginner", true),
      topic("typography", "Typography", "beginner", false),
      topic("flexbox", "Flexbox", "intermediate", true, { prerequisites: ["box-model", "typography"] }),
      topic("grid", "Grid", "intermediate", true, { prerequisites: ["flexbox"] }),
      topic("subgrid", "Subgrid", "pro", false),
  ] },
  { id: "html", title: "HTML", tagline: "", topics: [topic("lists", "Lists", "beginner", true)] },
];
const L = (track: string, topicId: string, id: string, kind: IndexEntry["kind"], title: string, summary = ""): IndexEntry => ({ track, topic: topicId, id, kind, title, summary });
const index: IndexEntry[] = [
  L("css", "box-model", "layers", "visualizer", "The layers of a box", "padding border margin"),
  L("css", "box-model", "box-quiz", "quiz", "Quiz: box model"),
  L("css", "flexbox", "axes", "visualizer", "The two axes", "main axis and cross axis"),
  L("css", "flexbox", "build-nav", "workshop", "Workshop: build a nav bar"),
  L("css", "flexbox", "fix-nav", "debug", "Debug: the nav bar"),
  L("css", "grid", "tracks", "visualizer", "Rows, columns and gaps"),
  L("html", "lists", "ul", "learn", "Unordered lists"),
];
const progress = (done: string[] = [], extra: Partial<Progress> = {}): Progress => ({ version: 1, completed: Object.fromEntries(done.map((k) => [k, 1])), ...extra });

/* ---------------- roadmap ---------------- */
const css = tracks[0];
const boxModel = css.topics[0], typography = css.topics[1], flexbox = css.topics[2];
ok("a topic with no content is 'planned'", topicStatus(progress(), index, "css", typography).state === "planned");
ok("untouched topic is 'not-started' with a total", (() => { const s = topicStatus(progress(), index, "css", boxModel); return s.state === "not-started" && s.total === 2 && s.done === 0; })());
ok("one of two lessons done is 'in-progress'", topicStatus(progress(["css/box-model/layers"]), index, "css", boxModel).state === "in-progress");
ok("all lessons done is 'completed'", topicStatus(progress(["css/box-model/layers", "css/box-model/box-quiz"]), index, "css", boxModel).state === "completed");

ok("unmet prerequisites list written topics not yet completed", unmetPrerequisites(progress(), index, css, flexbox).map((t) => t.id).join() === "box-model");
ok("a PLANNED prerequisite is never held against the learner", !unmetPrerequisites(progress(), index, css, flexbox).some((t) => t.id === "typography"));
ok("finishing the prerequisite clears the nudge", unmetPrerequisites(progress(["css/box-model/layers", "css/box-model/box-quiz"]), index, css, flexbox).length === 0);
ok("a topic with no prerequisites has none unmet", unmetPrerequisites(progress(), index, css, boxModel).length === 0);

const summaries = levelSummaries(progress(["css/box-model/layers"]), index, css);
ok("level summaries cover all four levels in order", summaries.map((s) => s.level).join() === "beginner,intermediate,advanced,pro");
ok("beginner: 1 written topic (of 2 listed), 1 of 2 lessons done = 50%", summaries[0].topics.length === 2 && summaries[0].written === 1 && summaries[0].lessonsDone === 1 && summaries[0].percent === 50);
ok("a level with nothing written has 0%, no division by zero", summaries[2].written === 0 && summaries[2].percent === 0 && summaries[3].percent === 0);
ok("current level is the first unfinished one with content", currentLevel(summaries) === "beginner");
const finishedBeginner = levelSummaries(progress(["css/box-model/layers", "css/box-model/box-quiz"]), index, css);
ok("when beginner is finished, the current level moves on", currentLevel(finishedBeginner) === "intermediate");
ok("no written topics at all: no current level", currentLevel(levelSummaries(progress(), [], { id: "x", title: "X", tagline: "", topics: [topic("a", "A", "beginner", false)] } as Track)) === undefined);

ok("next up: the very first lesson when nothing is done", nextUp(progress(), index, tracks)?.id === "layers");
ok("next up skips completed lessons, in curriculum order", nextUp(progress(["css/box-model/layers"]), index, tracks)?.id === "box-quiz");
ok("next up moves to the next topic", nextUp(progress(["css/box-model/layers", "css/box-model/box-quiz"]), index, tracks)?.id === "axes");
ok("next up is undefined when everything is done", nextUp(progress(index.map((e) => `${e.track}/${e.topic}/${e.id}`)), index, tracks) === undefined);

/* ---------------- badges ---------------- */
const earned = (p: Progress) => computeBadges(p, index).filter((b) => b.earned).map((b) => b.id);
ok("no progress: no badges", earned(progress()).length === 0);
ok("first lesson earns First steps", earned(progress(["html/lists/ul"])).join() === "first-steps,topic-finisher".replace(",topic-finisher", "") || earned(progress(["html/lists/ul"])).includes("first-steps"));
ok("finishing the only HTML lesson also finishes that topic", earned(progress(["html/lists/ul"])).includes("topic-finisher"));
ok("a completed workshop earns Builder", earned(progress(["css/flexbox/build-nav"])).includes("builder"));
ok("a completed debug lesson earns Debugger", earned(progress(["css/flexbox/fix-nav"])).includes("debugger"));
ok("a lesson of another kind doesn't earn Builder or Debugger", !earned(progress(["css/flexbox/axes"])).some((id) => id === "builder" || id === "debugger"));
ok("quiz 89% doesn't earn Quiz ace, 90% does", !earned(progress([], { quizBest: { q: 89 } })).includes("quiz-ace") && earned(progress([], { quizBest: { q: 90 } })).includes("quiz-ace"));
ok("On a roll needs a 3-day run in the activity log", !earned(progress([], { activityDays: ["2026-06-01", "2026-06-02", "2026-06-04"] })).includes("on-a-roll") && earned(progress([], { activityDays: ["2026-06-01", "2026-06-02", "2026-06-03"] })).includes("on-a-roll"));
ok("a partly finished topic is not Topic finisher", !earned(progress(["css/flexbox/axes"])).includes("topic-finisher"));
ok("all three tracks needed for All-rounder", !earned(progress(["css/flexbox/axes", "html/lists/ul"])).includes("all-rounder"));
const manyIndex = Array.from({ length: 30 }, (_, i) => L("css", "box-model", `l${i}`, "learn", `Lesson ${i}`));
ok("5 and 25 lesson milestones", computeBadges(progress(manyIndex.slice(0, 5).map((e) => `css/box-model/${e.id}`)), manyIndex).filter((b) => b.earned).map((b) => b.id).includes("getting-going") && computeBadges(progress(manyIndex.slice(0, 25).map((e) => `css/box-model/${e.id}`)), manyIndex).some((b) => b.id === "dedicated" && b.earned));
ok("every badge says how to earn it", computeBadges(progress(), index).every((b) => b.description.length > 8 && b.title.length > 2));
ok("badge ids are unique", new Set(computeBadges(progress(), index).map((b) => b.id)).size === computeBadges(progress(), index).length);
ok("a lesson key that no longer exists is ignored, not counted", !earned(progress(["css/old/removed"])).includes("first-steps"));

/* ---------------- search ---------------- */
const top = (q: string) => search(q, index, tracks);
ok("empty query: nothing", top("").length === 0 && top("   ").length === 0 && top("!!!").length === 0);
ok("'flex' finds the topic first, then its lessons", (() => { const r = top("flex"); return r[0].type === "topic" && r[0].topicId === "flexbox"; })());
ok("'flex' also finds lessons in that topic", top("flex").some((r) => r.type === "lesson" && r.lessonId === "axes"));
ok("a prefix match beats a mid-word match", (() => { const r = search("box", [L("css", "flexbox", "x", "learn", "Sandbox tricks"), ...index], tracks); return r.findIndex((x) => x.title === "Box model") < r.findIndex((x) => x.title === "Sandbox tricks"); })());
ok("every query word must match (AND)", top("nav bar").length === 2 && top("nav banana").length === 0);
ok("words can match in the summary", top("cross axis").some((r) => r.lessonId === "axes"));
ok("searching by lesson kind works", top("quiz").some((r) => r.lessonId === "box-quiz") && top("workshop").some((r) => r.lessonId === "build-nav"));
ok("searching by track name works", top("html").some((r) => r.trackId === "html"));
ok("case and punctuation don't matter", top("FLEX-box").some((r) => r.topicId === "flexbox") && top("flexbox!!").some((r) => r.topicId === "flexbox"));
ok("an exact title ranks first", top("Box model")[0].title === "Box model");
ok("planned topics are findable but flagged not ready", (() => { const r = top("typography"); return r.length === 1 && r[0].ready === false; })());
ok("a written topic outranks an identical planned one", (() => {
  const twins: Track[] = [{ id: "css", title: "CSS", tagline: "", topics: [topic("w-planned", "Widgets", "beginner", false), topic("w-ready", "Widgets", "beginner", true)] }];
  const r = search("widgets", [], twins);
  return r.length === 2 && r[0].topicId === "w-ready" && r[1].topicId === "w-planned";
})());
ok("the limit is respected", search("a", [], tracks, 2).length <= 2);
ok("results carry what the UI needs", (() => { const r = top("axes")[0]; return r.type === "lesson" && r.kind === "visualizer" && r.level === "intermediate" && r.context === "Flexbox, CSS"; })());
ok("no match returns an empty list", top("zzzzzz").length === 0);

/* ---------------- arrow-key tabs ---------------- */
const tabs = ["html", "css", "tailwind"] as const;
ok("ArrowRight/ArrowDown go to the next tab", nextTab(tabs, "html", "ArrowRight") === "css" && nextTab(tabs, "css", "ArrowDown") === "tailwind");
ok("ArrowLeft/ArrowUp go to the previous tab", nextTab(tabs, "css", "ArrowLeft") === "html" && nextTab(tabs, "tailwind", "ArrowUp") === "css");
ok("the arrows wrap at both ends", nextTab(tabs, "tailwind", "ArrowRight") === "html" && nextTab(tabs, "html", "ArrowLeft") === "tailwind");
ok("Home and End jump to the ends", nextTab(tabs, "css", "Home") === "html" && nextTab(tabs, "css", "End") === "tailwind");
ok("other keys are left alone", nextTab(tabs, "css", "Enter") === undefined && nextTab(tabs, "css", "a") === undefined && nextTab(tabs, "css", "Tab") === undefined);
ok("a single tab wraps onto itself", nextTab(["only"], "only", "ArrowRight") === "only");
ok("unknown current tab or empty list is safe", nextTab(tabs, "nope" as never, "ArrowRight") === undefined && nextTab([] as string[], "x", "Home") === undefined);

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
