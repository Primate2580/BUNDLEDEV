import { useRef, type KeyboardEvent } from "react";

/** Which tab an arrow/Home/End key moves to, or undefined if the key isn't a tab key. Wraps around. */
export function nextTab<T extends string>(ids: readonly T[], current: T, key: string): T | undefined {
  const at = ids.indexOf(current);
  if (at === -1 || ids.length === 0) return undefined;
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return ids[(at + 1) % ids.length];
    case "ArrowLeft":
    case "ArrowUp":
      return ids[(at - 1 + ids.length) % ids.length];
    case "Home":
      return ids[0];
    case "End":
      return ids[ids.length - 1];
    default:
      return undefined;
  }
}

/**
 * Accessible tabs: only the selected tab is in the Tab order, and the arrow keys (plus Home and End)
 * move between tabs, selecting as they go. `idPrefix` ties each tab to its panel with aria attributes.
 */
export function useRovingTabs<T extends string>(ids: readonly T[], selected: T, onSelect: (id: T) => void, idPrefix: string) {
  const refs = useRef(new Map<T, HTMLElement>());

  const tabProps = (id: T) => ({
    role: "tab" as const,
    id: `${idPrefix}-tab-${id}`,
    "aria-selected": selected === id,
    "aria-controls": `${idPrefix}-panel`,
    tabIndex: selected === id ? 0 : -1,
    ref: (el: HTMLElement | null) => {
      if (el) refs.current.set(id, el);
      else refs.current.delete(id);
    },
    onClick: () => onSelect(id),
    onKeyDown: (event: KeyboardEvent) => {
      const next = nextTab(ids, id, event.key);
      if (!next) return;
      event.preventDefault();
      onSelect(next);
      refs.current.get(next)?.focus();
    },
  });

  const panelProps = {
    role: "tabpanel" as const,
    id: `${idPrefix}-panel`,
    "aria-labelledby": `${idPrefix}-tab-${selected}`,
  };

  return { tabProps, panelProps };
}
