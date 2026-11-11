/**
 * npm run test:content
 *
 * Verifies every written topic:
 *  - ids are unique, kebab-case, and lessonCount matches
 *  - prerequisites point at real topics
 *  - Learn lessons meet the depth standard (see CONTENT_GUIDE.md)
 *  - for every lab/challenge: the STARTER fails its checks and the SOLUTION passes them all
 *
 * Checks run in jsdom against the same document the preview would build. jsdom can't evaluate
 * media queries, and can't generate Tailwind CSS, so computedStyle checks in Tailwind labs
 * are reported as "needs a browser" instead of being run.
 */
import { JSDOM } from "jsdom";
import { tracks } from "../src/content";
import { LEVELS } from "../src/engine/types";
import { runChecks } from "../src/lib/checks/runChecks";
import { getDeclaration, mergeCss, parseCss, setDeclaration } from "../src/lib/css/cssRules";
import { explainCssChange, explainFiles } from "../src/lib/explain/explain";
import type { ExplainItem } from "../src/lib/explain/types";
import { buildSrcDoc } from "../src/lib/preview/buildSrcDoc";
import type { Check, CodeFiles, ContentBlock, Lesson, PreviewMode } from "../src/engine/types";

/** Anything with checks and hints: a lab challenge or a workshop step. */
interface Checkable {
  checks: Check[];
  hints: string[];
}

const MIN_LEARN_WORDS = 350;
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const errors: string[] = [];
const notes: string[] = [];
let lessonsChecked = 0;

/** Sentences the explain engine falls back to when it has no specific description. */
const isGeneric = (item: ExplainItem) => /^Sets `[^`]+` on /.test(item.text) || /^A `<[^>]+>` element\.$/.test(item.text);
const noteGeneric = (where: string, items: ExplainItem[]) => {
  for (const item of items) if (isGeneric(item)) notes.push(`${where}: the explain engine has no specific description for "${item.title}"`);
};

const words = (text: string) => (text.match(/\S+/g) ?? []).length;

function blockText(block: ContentBlock): string {
  switch (block.type) {
    case "heading":
    case "paragraph":
      return block.text;
    case "callout":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "compare":
      return `${block.good.note} ${block.bad.note}`;
    case "code":
      return ""; // code doesn't count toward depth
  }
}

function lessonWordCount(lesson: Lesson): number {
  if (lesson.kind === "learn") {
    const { description, why, mentalModel } = lesson.concept;
    return words([description, why, mentalModel, ...lesson.body.map(blockText)].join(" "));
  }
  if (lesson.kind === "review") return words(lesson.body.map(blockText).join(" "));
  return 0;
}

function evaluate(files: CodeFiles, mode: PreviewMode, challenge: Pick<Checkable, "checks">) {
  const html = buildSrcDoc({ html: files.html, css: files.css, mode, nonce: "N", docId: "D" });
  const win = new JSDOM(html, { pretendToBeVisual: true }).window as unknown as Window;
  const needsBrowser = (i: number) => mode === "tailwind" && challenge.checks[i].type === "computedStyle";
  const results = runChecks(challenge.checks, win);
  win.close();
  return results.map((result, i) => ({ ...result, skipped: needsBrowser(i), message: challenge.checks[i].message }));
}

/** Structure checks shared by quizzes and predict lessons. */
function checkQuestions(where: string, questions: { prompt: string; options: string[]; answerIndex: number; explanation: string }[]) {
  const positions = new Map<number, number>();
  for (const [i, q] of questions.entries()) {
    const at = `${where} question ${i + 1}`;
    if (!q.prompt.trim()) errors.push(`${at}: no prompt`);
    if (q.options.length < 2 || q.options.length > 5) errors.push(`${at}: needs 2 to 5 options`);
    if (new Set(q.options).size !== q.options.length) errors.push(`${at}: has duplicate options`);
    if (!Number.isInteger(q.answerIndex) || q.answerIndex < 0 || q.answerIndex >= q.options.length) errors.push(`${at}: answerIndex is out of range`);
    if (!q.explanation.trim()) errors.push(`${at}: needs an explanation`);
    positions.set(q.answerIndex, (positions.get(q.answerIndex) ?? 0) + 1);
  }
  if (questions.length >= 4 && Math.max(...positions.values()) / questions.length > 0.6) {
    notes.push(`${where}: most correct answers are in the same position, vary where the right option sits`);
  }
}

function verifyChallenge(
  where: string,
  mode: PreviewMode,
  starter: CodeFiles,
  challenge: Checkable & { description?: string; solution: CodeFiles },
) {
  if (challenge.checks.length === 0) errors.push(`${where}: no checks`);
  if (challenge.hints.length === 0) errors.push(`${where}: needs at least one hint`);
  if (challenge.description !== undefined && !challenge.description.trim()) errors.push(`${where}: missing task description`);
  for (const [i, check] of challenge.checks.entries()) {
    if (!check.message.trim()) errors.push(`${where}: check ${i + 1} has no message`);
  }

  const solution = evaluate(challenge.solution, mode, challenge);
  for (const [i, r] of solution.entries()) {
    if (!r.skipped && !r.passed) {
      errors.push(`${where}: the SOLUTION fails check ${i + 1} ("${r.message}")${r.detail ? ` - ${r.detail}` : ""}`);
    }
  }

  const start = evaluate(starter, mode, challenge);
  const runnable = start.filter((r) => !r.skipped);
  if (runnable.length > 0 && runnable.every((r) => r.passed)) {
    errors.push(`${where}: the STARTER already passes every check, so there is nothing to do`);
  }

  const skipped = solution.filter((r) => r.skipped).length;
  if (skipped) notes.push(`${where}: ${skipped} Tailwind style check(s) need a real browser to verify`);
}

for (const track of tracks) {
  const ids = new Set(track.topics.map((t) => t.id));
  console.log(`\n${track.title}`);

  // prerequisites must not loop back on themselves
  const visiting = new Set<string>();
  const finished = new Set<string>();
  const visit = (id: string, path: string[]) => {
    if (finished.has(id)) return;
    if (visiting.has(id)) return void errors.push(`${track.id}: prerequisites form a loop: ${[...path, id].join(" -> ")}`);
    visiting.add(id);
    for (const pre of track.topics.find((t) => t.id === id)?.prerequisites ?? []) if (ids.has(pre)) visit(pre, [...path, id]);
    visiting.delete(id);
    finished.add(id);
  };
  for (const t of track.topics) visit(t.id, []);

  for (const topic of track.topics) {
    for (const pre of topic.prerequisites ?? []) {
      const target = track.topics.find((t) => t.id === pre);
      if (!ids.has(pre)) errors.push(`${track.id}/${topic.id}: prerequisite "${pre}" doesn't exist`);
      else if (pre === topic.id) errors.push(`${track.id}/${topic.id}: a topic can't be its own prerequisite`);
      else if (target && LEVELS.indexOf(target.level) > LEVELS.indexOf(topic.level)) {
        errors.push(`${track.id}/${topic.id}: prerequisite "${pre}" is a ${target.level} topic, which is harder than this ${topic.level} one`);
      }
    }
    if (!topic.load) continue;

    const module = await topic.load();
    const lessons = module.default.lessons;
    console.log(`  ${topic.title} (${lessons.length} lessons)`);

    if (topic.lessonCount !== lessons.length) {
      errors.push(`${track.id}/${topic.id}: lessonCount is ${topic.lessonCount} but the topic has ${lessons.length} lessons`);
    }

    const seen = new Set<string>();
    for (const lesson of lessons) {
      const where = `${track.id}/${topic.id}/${lesson.id}`;
      lessonsChecked++;
      if (!KEBAB.test(lesson.id)) errors.push(`${where}: id must be kebab-case`);
      if (seen.has(lesson.id)) errors.push(`${where}: duplicate lesson id`);
      seen.add(lesson.id);
      if (!lesson.title.trim() || !lesson.summary.trim()) errors.push(`${where}: needs a title and summary`);

      let detail = "";
      switch (lesson.kind) {
        case "learn": {
          const n = lessonWordCount(lesson);
          detail = `${n} words`;
          if (n < MIN_LEARN_WORDS) errors.push(`${where}: only ${n} words, Learn lessons need at least ${MIN_LEARN_WORDS}`);
          const c = lesson.concept;
          if (!c.description.trim() || !c.why.trim() || !c.mentalModel.trim()) errors.push(`${where}: concept needs description, why and mentalModel`);
          if (!lesson.body.some((b) => b.type === "code")) errors.push(`${where}: needs at least one code example`);
          break;
        }
        case "review":
          detail = `${lessonWordCount(lesson)} words`;
          break;
        case "lab":
          verifyChallenge(where, lesson.mode, lesson.starter, lesson.challenge);
          detail = `${lesson.challenge.checks.length} checks`;
          break;
        case "workshop": {
          if (!lesson.intro.trim()) errors.push(`${where}: workshop needs an intro`);
          for (const [i, step] of lesson.steps.entries()) {
            const at = `${where}/${step.id}`;
            if (step.id !== `step-${String(i + 1).padStart(3, "0")}`) errors.push(`${at}: unexpected step id`);
            if (step.explanation.length === 0 || !step.task.trim()) errors.push(`${at}: needs an explanation and a task`);
            // each step: seed fails, solution passes
            verifyChallenge(at, lesson.mode, step.seed, step);
            // the change a learner makes must be explainable
            const explained = explainFiles(lesson.mode, step.seed, step.solution);
            if (explained.items.length === 0) errors.push(`${at}: the explain engine sees no change between the seed and the solution`);
            noteGeneric(at, explained.items);
            // chain: this step starts exactly where the last one ended
            const prev = lesson.steps[i - 1];
            if (prev && (prev.solution.html !== step.seed.html || prev.solution.css !== step.seed.css)) {
              errors.push(`${at}: seed doesn't match the previous step's solution`);
            }
          }
          detail = `${lesson.steps.length} steps`;
          break;
        }
        case "visualizer": {
          const { stage, controls, presets, starter, challenge } = lesson;
          const doc = new JSDOM(stage.html).window.document;
          const target = stage.target ?? ".container";
          const itemSelector = stage.items ?? ".item";
          for (const sel of [target, itemSelector]) {
            if (!doc.querySelector(sel)) errors.push(`${where}: the stage has no element matching "${sel}"`);
          }
          if (stage.itemCount !== undefined && doc.querySelectorAll(itemSelector).length < stage.itemCount) {
            errors.push(`${where}: itemCount is ${stage.itemCount} but the stage has fewer items`);
          }
          if (!parseCss(starter).some((c) => c.kind === "rule")) errors.push(`${where}: the starter CSS has no rules`);

          const seen = new Set<string>();
          for (const c of controls) {
            if (seen.has(c.id)) errors.push(`${where}: duplicate control id "${c.id}"`);
            seen.add(c.id);
            const sel = c.selector.replace("{item}", "1");
            if (!doc.querySelector(sel)) errors.push(`${where}: control "${c.id}" targets "${sel}", which isn't in the stage`);
            if (c.selector.includes("{item}") && !stage.itemCount) errors.push(`${where}: control "${c.id}" uses {item} but the stage has no itemCount`);
            if (!c.fallback.trim() || !c.label.trim()) errors.push(`${where}: control "${c.id}" needs a label and a fallback`);
            // every value the control can write must read back the same
            const values = c.type === "options" ? c.options : [`${c.min}${c.unit ?? ""}`, `${c.max}${c.unit ?? ""}`];
            if (c.type === "options" && c.options.length < 2) errors.push(`${where}: control "${c.id}" needs at least two options`);
            if (c.type === "range" && !(c.min < c.max)) errors.push(`${where}: control "${c.id}" has min >= max`);
            for (const value of values) {
              const written = setDeclaration(starter, sel, c.property, value);
              if (getDeclaration(written, sel, c.property) !== value) errors.push(`${where}: control "${c.id}" can't round-trip "${value}"`);
              noteGeneric(`${where} control "${c.id}"`, explainCssChange(starter, written).items);
            }
          }

          const presetIds = new Set<string>();
          for (const preset of presets) {
            if (presetIds.has(preset.id)) errors.push(`${where}: duplicate preset id "${preset.id}"`);
            presetIds.add(preset.id);
            const declarations = parseCss(preset.css).flatMap((c) => (c.kind === "rule" ? c.declarations : []));
            if (declarations.length === 0) errors.push(`${where}: preset "${preset.id}" has no declarations`);
            for (const d of declarations) if (!d.prop || !d.value) errors.push(`${where}: preset "${preset.id}" has an empty declaration`);
            noteGeneric(`${where} preset "${preset.id}"`, explainCssChange(starter, mergeCss(starter, preset.css)).items);
          }

          if (challenge) {
            noteGeneric(`${where} challenge`, explainCssChange(starter, challenge.solution).items);
            verifyChallenge(
              where,
              "css",
              { html: stage.html, css: `${stage.baseCss}\n${starter}` },
              {
                checks: challenge.checks,
                hints: challenge.hints,
                description: challenge.description,
                solution: { html: stage.html, css: `${stage.baseCss}\n${challenge.solution}` },
              },
            );
          }
          detail = `${controls.length} controls, ${presets.length} presets${challenge ? `, ${challenge.checks.length} checks` : ""}`;
          break;
        }
        case "debug":
          verifyChallenge(where, lesson.mode, lesson.broken, lesson.challenge);
          detail = `${lesson.challenge.checks.length} checks`;
          break;
        case "quiz": {
          if (lesson.questions.length < 5) errors.push(`${where}: a quiz needs at least 5 questions`);
          else if (lesson.questions.length < 10) notes.push(`${where}: ${lesson.questions.length} questions, the recommended size is 10 to 20`);
          checkQuestions(where, lesson.questions);
          detail = `${lesson.questions.length} questions`;
          break;
        }
        case "predict": {
          if (lesson.questions.length === 0) errors.push(`${where}: needs at least one question`);
          checkQuestions(where, lesson.questions);
          const doc = buildSrcDoc({ html: lesson.code.html, css: lesson.code.css, mode: lesson.mode, nonce: "N", docId: "D" });
          for (const [i, q] of lesson.questions.entries()) {
            if (!q.hint) notes.push(`${where} question ${i + 1}: no hint`);
            if (!q.proves?.length) {
              notes.push(`${where} question ${i + 1}: no \`proves\` checks, so the answer isn't verified against the code`);
              continue;
            }
            const win = new JSDOM(doc, { pretendToBeVisual: true }).window as unknown as Window;
            const results = runChecks(q.proves, win);
            win.close();
            results.forEach((r, k) => {
              if (!r.passed) errors.push(`${where} question ${i + 1}: the answer relies on "${q.proves![k].message}" but the code doesn't do that${r.detail ? ` (${r.detail})` : ""}`);
            });
          }
          detail = `${lesson.questions.length} questions`;
          break;
        }
        default:
          break;
      }
      console.log(`    - ${lesson.id} [${lesson.kind}] ${detail}`);
    }
  }
}

console.log(`\nChecked ${lessonsChecked} lessons.`);
for (const note of notes) console.log(`note: ${note}`);
if (errors.length) {
  console.log(`\n${errors.length} problem(s):`);
  for (const e of errors) console.log(`  x ${e}`);
  process.exit(1);
}
console.log("All content checks passed.");
