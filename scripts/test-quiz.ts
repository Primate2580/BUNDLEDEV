import quizLesson from "../src/content/html/document-structure";
import { buildDeck, shuffled } from "../src/lib/quiz";
import type { QuizLesson } from "../src/engine/types";

let failed = 0;
const ok = (name: string, cond: boolean, extra = "") => {
  console.log((cond ? "PASS " : "FAIL ") + name + (cond ? "" : extra ? `  -> ${extra}` : ""));
  if (!cond) failed++;
};

const quiz = quizLesson.lessons.find((l) => l.kind === "quiz") as QuizLesson;
const questions = quiz.questions;

// a small repeatable random generator (mulberry32)
const seeded = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

let mappingOk = true;
let sameQuestions = true;
let sameOptions = true;
let sawDifferentOrder = false;
let positions = new Set<number>();
for (let seed = 1; seed <= 300; seed++) {
  const deck = buildDeck(questions, seeded(seed));
  if (deck.length !== questions.length) sameQuestions = false;
  if (new Set(deck.map((c) => c.question)).size !== questions.length) sameQuestions = false;
  for (const card of deck) {
    const original = card.question;
    // the option now at answerIndex must be the ORIGINAL right option
    if (card.options[card.answerIndex] !== original.options[original.answerIndex]) mappingOk = false;
    if ([...card.options].sort().join("|") !== [...original.options].sort().join("|")) sameOptions = false;
    if (card.options.join("|") !== original.options.join("|")) sawDifferentOrder = true;
    positions.add(card.answerIndex);
  }
}
ok("shuffled decks keep the correct answer pointing at the correct option (300 random decks)", mappingOk);
ok("every deck contains each question exactly once", sameQuestions);
ok("shuffling never adds, drops or changes an option", sameOptions);
ok("options really are reordered", sawDifferentOrder);
ok("the right answer lands in every position over many decks", positions.size === 4, [...positions].join());

const a = buildDeck(questions, seeded(7)).map((c) => c.question.prompt).join();
const b = buildDeck(questions, seeded(7)).map((c) => c.question.prompt).join();
const c = buildDeck(questions, seeded(8)).map((c) => c.question.prompt).join();
ok("the same seed gives the same deck", a === b);
ok("different seeds give different decks", a !== c);
ok("the original lesson data is not mutated", questions[0].options[questions[0].answerIndex] === "Tells the browser to use modern standards mode");
ok("shuffled() keeps all items", shuffled([1, 2, 3, 4, 5], seeded(3)).sort().join() === "1,2,3,4,5");
ok("shuffled() of an empty list is empty", shuffled([]).length === 0);

console.log(failed ? `\n${failed} FAILED` : "\nall passed");
process.exit(failed ? 1 : 0);
