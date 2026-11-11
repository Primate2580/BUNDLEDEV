import { create } from "zustand";
import {
  LAYOUT_KEYS,
  defaultLayout,
  parseLayout,
  resetLayout,
  toSaved,
  type LayoutKey,
  type LayoutState,
} from "@/lib/workspace/layout";

/** Bump a layout's version to make everyone start from its new default (the Visualizer moved to four open panes). */
const VERSION: Record<LayoutKey, number> = { lesson: 1, playground: 1, visualizer: 2 };
const storageKey = (key: LayoutKey) => `css-lab:layout:${key}:v${VERSION[key]}`;

function load(key: LayoutKey): LayoutState {
  try {
    const raw = localStorage.getItem(storageKey(key));
    return raw ? parseLayout(JSON.parse(raw), key) : defaultLayout(key);
  } catch {
    return defaultLayout(key); // storage blocked or corrupt: use the default
  }
}

const timers: Partial<Record<LayoutKey, ReturnType<typeof setTimeout>>> = {};

/** Saves shortly after the last change, so dragging a splitter doesn't write on every pixel. */
function scheduleSave(key: LayoutKey, state: LayoutState) {
  clearTimeout(timers[key]);
  timers[key] = setTimeout(() => {
    try {
      localStorage.setItem(storageKey(key), JSON.stringify(toSaved(state)));
    } catch {
      /* ignore: the layout still applies for this session */
    }
  }, 250);
}

interface LayoutsState {
  layouts: Record<LayoutKey, LayoutState>;
  /** Applies one of the pure layout functions to a layout and saves the result. */
  update: (key: LayoutKey, change: (state: LayoutState) => LayoutState) => void;
  reset: (key: LayoutKey) => void;
}

export const useLayouts = create<LayoutsState>((set, get) => {
  const commit = (key: LayoutKey, next: LayoutState) => {
    set({ layouts: { ...get().layouts, [key]: next } });
    scheduleSave(key, next);
  };
  return {
    layouts: Object.fromEntries(LAYOUT_KEYS.map((key) => [key, load(key)])) as Record<LayoutKey, LayoutState>,
    update: (key, change) => {
      const current = get().layouts[key];
      const next = change(current);
      if (next !== current) commit(key, next);
    },
    reset: (key) => commit(key, resetLayout(key, get().layouts[key])),
  };
});
