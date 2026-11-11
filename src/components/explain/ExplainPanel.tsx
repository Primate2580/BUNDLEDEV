import { Brain, Minus, Pencil, Plus, Sparkles, TriangleAlert } from "@/components/ui/icons";
import InlineText from "@/components/lesson/InlineText";
import type { ExplainTone, Explanation } from "@/lib/explain/types";

const TONES: Record<ExplainTone, { icon: typeof Plus; label: string; chip: string; text: string }> = {
  added: { icon: Plus, label: "Added", chip: "bg-emerald-500/15 text-success", text: "text-success" },
  changed: { icon: Pencil, label: "Changed", chip: "bg-indigo-500/15 text-accent", text: "text-accent" },
  removed: { icon: Minus, label: "Removed", chip: "bg-rose-500/15 text-danger", text: "text-danger" },
  warning: { icon: TriangleAlert, label: "Heads up", chip: "bg-amber-500/15 text-warn", text: "text-warn" },
};

interface Props {
  /** null until something has changed */
  explanation: Explanation | null;
  /** shown before the first change */
  idleText?: string;
  /** drop the outer border (when it sits inside another card) */
  embedded?: boolean;
}

/** "What did my change just do?": one plain-English entry per change, plus the current mental model. */
export default function ExplainPanel({
  explanation,
  idleText = "Change the code and this panel will explain, in plain English, exactly what your change did.",
  embedded = false,
}: Props) {
  const items = explanation?.items ?? [];
  const model = explanation?.model ?? [];

  return (
    <section
      aria-label="Explain my change"
      className={embedded ? "bg-panel p-4" : "rounded-xl border border-edge bg-panel p-4 sm:p-5"}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-fg">
          <Sparkles size={15} aria-hidden className="text-accent" />
          What did that change do?
        </h2>
        {explanation && explanation.summary && <span className="text-xs text-muted">{explanation.summary}</span>}
      </div>

      <div aria-live="polite" className="mt-3 space-y-2.5">
        {items.length === 0 ? (
          <p className="text-sm leading-6 text-muted">{explanation && explanation.summary === "No visible change" ? "Nothing visible changed that time." : idleText}</p>
        ) : (
          <ul className="max-h-72 space-y-2.5 overflow-y-auto pr-1">
            {items.map((item, i) => {
              const tone = TONES[item.tone];
              const Icon = tone.icon;
              return (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ${tone.chip}`}>
                    <Icon size={12} strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-2 text-xs">
                      <span className="sr-only">{tone.label}: </span>
                      {item.scope && <span className="font-mono text-faint">{item.scope}</span>}
                      <span className={`font-mono font-medium ${tone.text}`}>{item.title}</span>
                    </p>
                    <p className="mt-0.5 text-sm leading-6 text-fg-2">
                      <InlineText text={item.text} />
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {model.length > 0 && (
        <div className="mt-4 rounded-lg border border-edge bg-ink/50 p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-fg">
            <Brain size={14} aria-hidden className="text-success" />
            How to think about it right now
          </p>
          <div className="mt-1.5 space-y-2">
            {model.map((paragraph, i) => (
              <p key={i} className="text-sm leading-6 text-fg-2">
                <InlineText text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
