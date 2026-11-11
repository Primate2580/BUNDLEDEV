import { Fragment } from "react";

/**
 * Light inline formatting for lesson text:
 *   `code`      -> inline code
 *   **bold**    -> bold (may contain `code`)
 * Everything else stays plain text.
 */
export default function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-fg">
              <InlineText text={part.slice(2, -2)} />
            </strong>
          );
        }
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="rounded bg-raised px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
