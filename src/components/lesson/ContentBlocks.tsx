import { Check, Info, Lightbulb, TriangleAlert, X } from "@/components/ui/icons";
import type { ContentBlock } from "@/engine/types";
import CodeBlock from "./CodeBlock";
import InlineText from "./InlineText";

const CALLOUTS = {
  tip: { icon: Lightbulb, label: "Tip", style: "border-emerald-500/40 bg-emerald-500/5", tone: "text-success" },
  warning: { icon: TriangleAlert, label: "Watch out", style: "border-amber-500/40 bg-amber-500/5", tone: "text-warn" },
  note: { icon: Info, label: "Note", style: "border-sky-500/40 bg-sky-500/5", tone: "text-info" },
} as const;

function CompareCard({
  tone,
  code,
  note,
}: {
  tone: "good" | "bad";
  code: string;
  note: string;
}) {
  const good = tone === "good";
  return (
    <div className={`overflow-hidden rounded-xl border ${good ? "border-emerald-500/40" : "border-rose-500/40"}`}>
      <p
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
          good ? "bg-emerald-500/10 text-success" : "bg-rose-500/10 text-danger"
        }`}
      >
        {good ? <Check size={14} aria-hidden /> : <X size={14} aria-hidden />}
        {good ? "Do this" : "Not this"}
      </p>
      <pre className="overflow-x-auto bg-ink px-4 py-3 text-sm leading-7 text-code">
        <code className="font-mono">{code}</code>
      </pre>
      <p className="px-4 py-3 text-sm leading-6 text-fg-2">
        <InlineText text={note} />
      </p>
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="pt-4 text-xl font-semibold text-fg">{block.text}</h2>;
    case "paragraph":
      return (
        <p className="max-w-3xl text-base leading-8 text-fg-2">
          <InlineText text={block.text} />
        </p>
      );
    case "code":
      return <CodeBlock code={block.code} language={block.language} caption={block.caption} html={block.html} playground />;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`max-w-3xl space-y-2 pl-6 text-base leading-8 text-fg-2 marker:text-faint ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <InlineText text={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "compare":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <CompareCard tone="good" code={block.good.code} note={block.good.note} />
          <CompareCard tone="bad" code={block.bad.code} note={block.bad.note} />
        </div>
      );
    case "callout": {
      const { icon: Icon, label, style, tone } = CALLOUTS[block.tone];
      return (
        <aside className={`flex max-w-3xl gap-3 rounded-xl border p-4 ${style}`}>
          <Icon size={18} aria-hidden className={`mt-1 shrink-0 ${tone}`} />
          <p className="text-sm leading-7 text-fg-2">
            <strong className={`mr-1.5 font-semibold ${tone}`}>{label}.</strong>
            <InlineText text={block.text} />
          </p>
        </aside>
      );
    }
  }
}

export default function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
