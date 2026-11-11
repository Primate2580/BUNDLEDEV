import type { QuizQuestion } from "@/engine/types";

export interface DeckCard {
  question: QuizQuestion;
  /** the options in the order they are shown */
  options: string[];
  /** where the right option sits in `options` */
  answerIndex: number;
}

/** Fisher-Yates. `random` is injectable so tests can be repeatable. */
export function shuffled<T>(items: T[], random: () => number = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** New order for the questions and their options, so retakes can't be passed by memorising positions. */
export function buildDeck(questions: QuizQuestion[], random: () => number = Math.random): DeckCard[] {
  return shuffled(questions, random).map((question) => {
    const order = shuffled(question.options.map((_, i) => i), random);
    return {
      question,
      options: order.map((i) => question.options[i]),
      answerIndex: order.indexOf(question.answerIndex),
    };
  });
}
