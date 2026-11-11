import { Check } from "@/components/ui/icons";
import KindIcon from "@/components/ui/KindIcon";
import { levelLabel } from "@/components/ui/LevelBadge";
import { KIND_LABELS } from "@/lib/kinds";
import type { SearchResult } from "@/lib/search";

interface Props {
  results: SearchResult[];
  activeIndex: number;
  /** lesson key -> completion time */
  completed: Record<string, number>;
  /** ids must be unique on the page */
  listId: string;
  onHover: (index: number) => void;
  onChoose: (result: SearchResult) => void;
}

const keyOf = (r: SearchResult) => `${r.trackId}/${r.topicId}/${r.lessonId}`;

/**
 * The listbox half of the search combobox. Focus stays in the search box; the active result is
 * announced through aria-activedescendant, so these are options, not buttons.
 */
export default function SearchResults({ results, activeIndex, completed, listId, onHover, onChoose }: Props) {
  return (
    <ul id={listId} role="listbox" aria-label="Search results" className="max-h-[50vh] overflow-y-auto p-2">
      {results.map((result, i) => {
        const active = i === activeIndex;
        const done = result.type === "lesson" && Boolean(completed[keyOf(result)]);
        return (
          <li
            key={`${result.type}-${result.trackId}-${result.topicId}-${result.lessonId ?? ""}`}
            id={`${listId}-opt-${i}`}
            role="option"
            aria-selected={active}
            onMouseMove={() => !active && onHover(i)}
            onClick={() => onChoose(result)}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${active ? "bg-indigo-500/15" : ""}`}
          >
            <KindIcon kind={result.type === "topic" ? "topic" : result.kind!} className="shrink-0 text-accent" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-fg">{result.title}</span>
              <span className="block truncate text-xs text-muted">
                {result.type === "topic" ? "Topic" : KIND_LABELS[result.kind!]}, {result.context}
                {!result.ready && ", coming soon"}
              </span>
            </span>
            <span className="hidden shrink-0 text-xs text-faint sm:block">{levelLabel(result.level)}</span>
            {done && (
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-slate-950">
                <Check size={12} strokeWidth={3} aria-hidden />
                <span className="sr-only">Completed</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
