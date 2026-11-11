import CodeBlock from "@/components/lesson/CodeBlock";
import InlineText from "@/components/lesson/InlineText";
import { isCodeBlock, readCodeBlock, toBlocks } from "@/lib/stepText";

/** Instruction text as one flow: paragraphs, with fenced code blocks (the text to type) in between. */
export default function StepText({ blocks, text, className = "text-sm leading-7 text-fg-2" }: { blocks?: string[]; text?: string; className?: string }) {
  const list = blocks ?? toBlocks(text ?? "");
  return (
    <div className="space-y-3">
      {list.map((block, i) => {
        if (isCodeBlock(block)) {
          const { language, code } = readCodeBlock(block);
          return <CodeBlock key={i} language={language} code={code} />;
        }
        return (
          <p key={i} className={className}>
            <InlineText text={block} />
          </p>
        );
      })}
    </div>
  );
}
