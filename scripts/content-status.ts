/**
 * npm run content:status
 *
 * Shows how much of the curriculum is written, topic by topic, and the lesson types each topic has.
 * Use it to plan the next content batch.
 */
import { LEVELS } from "../src/engine/types";
import { tracks } from "../src/content";

const KINDS = ["learn", "visualizer", "workshop", "lab", "predict", "debug", "quiz", "review"] as const;
const short: Record<(typeof KINDS)[number], string> = { learn: "learn", visualizer: "viz", workshop: "work", lab: "lab", predict: "pred", debug: "debug", quiz: "quiz", review: "rev" };

let totalTopics = 0;
let writtenTopics = 0;
let totalLessons = 0;

for (const track of tracks) {
  console.log(`\n${track.title}`);
  for (const level of LEVELS) {
    const topics = track.topics.filter((t) => t.level === level);
    if (topics.length === 0) continue;
    console.log(`  ${level}`);
    for (const topic of topics) {
      totalTopics++;
      if (!topic.load) {
        console.log(`    [ ] ${topic.title}`);
        continue;
      }
      writtenTopics++;
      const { lessons } = (await topic.load()).default;
      totalLessons += lessons.length;
      const counts = KINDS.map((k) => [k, lessons.filter((l) => l.kind === k).length] as const).filter(([, n]) => n > 0);
      const complete = counts.some(([k]) => k === "quiz") && counts.some(([k]) => k === "review");
      console.log(`    [${complete ? "x" : "~"}] ${topic.title}: ${lessons.length} lessons (${counts.map(([k, n]) => `${n} ${short[k]}`).join(", ")})`);
    }
  }
}
console.log(`\n${writtenTopics} of ${totalTopics} topics written, ${totalLessons} lessons.  [x] has a quiz and a review, [~] still growing, [ ] not started.`);
