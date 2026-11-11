import type { Concept } from "@/engine/types";
import InlineText from "./InlineText";

/**
 * The opening of a Learn lesson, as plain flowing text: what it is, why it matters, and a way to think about it.
 * The "think of it this way" paragraph is part of the flow rather than a separate card.
 */
export default function ConceptCards({ concept }: { concept: Concept }) {
  const lead = /^think of /i.test(concept.mentalModel.trim()) ? null : "Think of it this way. ";
  return (
    <section aria-label="Introduction" className="max-w-3xl space-y-4 text-base leading-8 text-fg-2">
      <p className="text-fg">
        <InlineText text={concept.description} />
      </p>
      <p>
        <InlineText text={concept.why} />
      </p>
      <p>
        {lead && <em className="font-medium not-italic text-fg">{lead}</em>}
        <InlineText text={concept.mentalModel} />
      </p>
    </section>
  );
}
