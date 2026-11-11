/**
 * Workspace layout logic: pure functions, no React, so it is easy to test.
 *
 * Two arrangements share one set of rules:
 *  - "split":   Learn on the left, Editor above Output on the right (three panes).
 *  - "columns": Lessons, Learn, Editor and Output as side-by-side columns (four panes, all open by default;
 *               the learner chooses which ones to hide).
 *
 * Each pane can be "normal", "collapsed" (a narrow rail or just its header), "minimized"
 * (docked at the bottom left) or "hidden" (back via the View menu). One pane can also be maximized.
 */

export type PaneId = "lessons" | "learn" | "editor" | "output";
/** Every pane, left to right in the columns arrangement. */
export const ALL_PANE_IDS: readonly PaneId[] = ["lessons", "learn", "editor", "output"];
/** The three panes of the split arrangement. */
export const PANE_IDS: readonly PaneId[] = ["learn", "editor", "output"];

export type PaneMode = "normal" | "collapsed" | "minimized" | "hidden";
const MODES: readonly PaneMode[] = ["normal", "collapsed", "minimized", "hidden"];

export type Arrangement = "split" | "columns";
const ARRANGEMENTS: readonly Arrangement[] = ["split", "columns"];
export const panesOf = (arrangement: Arrangement): readonly PaneId[] => (arrangement === "columns" ? ALL_PANE_IDS : PANE_IDS);

/**
 * In the columns arrangement, at most this many panes are open (normal or collapsed) at once. It is the number of
 * panes, so nothing is hidden automatically: the learner decides. Lowering it would make showing a pane hide the
 * one that has been open longest.
 */
export const MAX_OPEN = 4;

/** Lessons, the Playground and the Visualizer remember their layouts separately. */
export type LayoutKey = "lesson" | "playground" | "visualizer";
export const LAYOUT_KEYS: readonly LayoutKey[] = ["lesson", "playground", "visualizer"];

export interface LayoutState {
  arrangement: Arrangement;
  /** split arrangement: Learn's width, as a percentage of the workspace */
  split: number;
  /** split arrangement: Editor's height, as a percentage of the right-hand column */
  rowSplit: number;
  /** columns arrangement: relative width of each column */
  widths: Record<PaneId, number>;
  modes: Record<PaneId, PaneMode>;
  /** panes in the order they were last shown, oldest first (used only if MAX_OPEN is lowered below the number of panes) */
  recent: PaneId[];
  /** the pane shown on small screens, where panes become tabs */
  tab: PaneId;
  /** never saved: a maximized pane returns to normal on the next visit */
  maximized: PaneId | null;
}

/** Below this width the panes become tabs. */
export const MOBILE_QUERY = "(max-width: 767px)";

export const SPLIT_MIN = 15;
export const SPLIT_MAX = 70;
export const ROW_MIN = 20;
export const ROW_MAX = 80;
/** columns arrangement: a column is never narrower than this share of the pair it is dragged within */
export const PAIR_MIN = 15;
export const PAIR_MAX = 85;

export const DEFAULT_TITLES: Record<PaneId, string> = { lessons: "Lessons", learn: "Learn", editor: "Editor", output: "Output" };

export const defaultLayout = (key: LayoutKey): LayoutState => ({
  arrangement: key === "visualizer" ? "columns" : "split",
  split: key === "playground" ? 30 : 40,
  rowSplit: 55,
  widths: { lessons: 17, learn: 27, editor: 26, output: 30 },
  modes: { lessons: key === "visualizer" ? "normal" : "hidden", learn: "normal", editor: "normal", output: "normal" },
  recent: key === "visualizer" ? ["lessons", "learn", "editor", "output"] : ["learn", "editor", "output"],
  tab: "learn",
  maximized: null,
});

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const round1 = (n: number) => Math.round(n * 10) / 10;

const isShown = (mode: PaneMode) => mode === "normal" || mode === "collapsed";

/** Would at least one pane still be on screen (normal or collapsed) if `pane` took this mode? */
const keepsAPaneVisible = (state: LayoutState, pane: PaneId, mode: PaneMode) =>
  panesOf(state.arrangement).some((id) => isShown(id === pane ? mode : state.modes[id]));

/**
 * Puts a pane in a mode. Hiding or minimizing the last visible pane is refused (the state is returned
 * unchanged), so the workspace never ends up empty. If MAX_OPEN were lower than the number of panes, showing
 * a pane at the limit would hide the one that has been open longest.
 */
export function setMode(state: LayoutState, pane: PaneId, mode: PaneMode): LayoutState {
  if (!panesOf(state.arrangement).includes(pane)) return state;
  if (state.modes[pane] === mode && (state.maximized === null || state.maximized === pane)) return state;
  if (!isShown(mode) && !keepsAPaneVisible(state, pane, mode)) return state;

  const modes = { ...state.modes, [pane]: mode };
  let recent = state.recent;
  if (isShown(mode) && !isShown(state.modes[pane])) {
    recent = [...recent.filter((id) => id !== pane), pane];
    if (state.arrangement === "columns") {
      const open = panesOf("columns").filter((id) => id !== pane && isShown(modes[id]));
      if (open.length >= MAX_OPEN) {
        const victim = recent.find((id) => open.includes(id)) ?? open[0];
        modes[victim] = "hidden";
      }
    }
  }
  const keepMax = state.maximized === pane && mode === "normal";
  return { ...state, modes, recent, maximized: keepMax ? pane : null };
}

export function toggleCollapse(state: LayoutState, pane: PaneId): LayoutState {
  return setMode(state, pane, state.modes[pane] === "collapsed" ? "normal" : "collapsed");
}

export function maximize(state: LayoutState, pane: PaneId): LayoutState {
  return { ...state, maximized: pane, modes: { ...state.modes, [pane]: "normal" } };
}

export const restoreFromMaximized = (state: LayoutState): LayoutState =>
  state.maximized === null ? state : { ...state, maximized: null };

export const toggleMaximize = (state: LayoutState, pane: PaneId): LayoutState =>
  state.maximized === pane ? restoreFromMaximized(state) : maximize(state, pane);

export const setSplit = (state: LayoutState, value: number): LayoutState => {
  const split = round1(clamp(value, SPLIT_MIN, SPLIT_MAX));
  return split === state.split ? state : { ...state, split };
};

export const setRowSplit = (state: LayoutState, value: number): LayoutState => {
  const rowSplit = round1(clamp(value, ROW_MIN, ROW_MAX));
  return rowSplit === state.rowSplit ? state : { ...state, rowSplit };
};

/** Columns arrangement: the share of the pair `a` + `b` that `a` takes, in percent. */
export const pairRatio = (state: LayoutState, a: PaneId, b: PaneId) => (state.widths[a] / (state.widths[a] + state.widths[b])) * 100;

/** Columns arrangement: moves the boundary between two neighbouring columns, keeping their combined width. */
export function setPair(state: LayoutState, a: PaneId, b: PaneId, percent: number): LayoutState {
  const total = state.widths[a] + state.widths[b];
  const left = round1((total * clamp(percent, PAIR_MIN, PAIR_MAX)) / 100);
  const right = round1(total - left);
  if (left === state.widths[a] && right === state.widths[b]) return state;
  return { ...state, widths: { ...state.widths, [a]: left, [b]: right } };
}

export const setArrangement = (state: LayoutState, arrangement: Arrangement): LayoutState =>
  state.arrangement === arrangement ? state : { ...state, arrangement, maximized: null };

export const setTab = (state: LayoutState, tab: PaneId): LayoutState => (state.tab === tab ? state : { ...state, tab });

/** Panes that become tabs on a small screen: everything that isn't hidden. */
export const tabPanes = (state: LayoutState): PaneId[] => panesOf(state.arrangement).filter((id) => state.modes[id] !== "hidden");

/** The tab that is showing (falls back if the remembered one was hidden). */
export const activeTab = (state: LayoutState): PaneId => {
  const open = tabPanes(state);
  return open.includes(state.tab) ? state.tab : (open[0] ?? "learn");
};

/** Reset keeps the current tab but goes back to the key's own default arrangement and sizes. */
export const resetLayout = (key: LayoutKey, state: LayoutState): LayoutState => ({ ...defaultLayout(key), tab: state.tab });

/** Panes parked in the dock (bottom left), in pane order. */
export const dockedPanes = (state: LayoutState): PaneId[] => panesOf(state.arrangement).filter((id) => state.modes[id] === "minimized");

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

/** Gap between panes, which is also the splitter's grab area (px). */
export const GAP = 8;
/** Height of a pane header, and so of a collapsed pane in the split arrangement. */
export const HEAD = "2.5rem";
/** Width of a collapsed pane's rail. */
export const RAIL = "2.5rem";

export interface SplitterPlan {
  key: string;
  orientation: "vertical" | "horizontal";
  /** which kind of boundary: Learn | right-hand column, Editor / Output, or two neighbouring columns */
  kind: "split-v" | "split-h" | "pair";
  a: PaneId;
  b: PaneId;
  gridColumn: string;
  gridRow: string;
  /** current position in percent, and its limits */
  value: number;
  min: number;
  max: number;
}

export interface GridPlan {
  columns: string;
  rows: string;
  /** which panes are on screen */
  show: Record<PaneId, boolean>;
  /** which panes are drawn smaller than normal (a rail, or just a header) */
  collapsed: Record<PaneId, boolean>;
  /** which collapsed panes are drawn as a narrow vertical rail rather than a header bar */
  rail: Record<PaneId, boolean>;
  placement: Record<PaneId, { gridColumn: string; gridRow: string }>;
  splitters: SplitterPlan[];
}

const none = (): Record<PaneId, boolean> => ({ lessons: false, learn: false, editor: false, output: false });

/** What a pane's mode is for drawing purposes: while another pane is maximized, everything else is away. */
const effectiveMode = (state: LayoutState, id: PaneId): PaneMode => {
  if (!panesOf(state.arrangement).includes(id)) return "hidden";
  return state.maximized ? (id === state.maximized ? "normal" : "hidden") : state.modes[id];
};

/** Turns a layout into CSS grid tracks. Panes never move in the DOM, they only change tracks. */
export function planGrid(state: LayoutState): GridPlan {
  return state.arrangement === "columns" ? planColumns(state) : planSplit(state);
}

function planSplit(state: LayoutState): GridPlan {
  const modes: Record<PaneId, PaneMode> = {
    lessons: "hidden",
    learn: effectiveMode(state, "learn"),
    editor: effectiveMode(state, "editor"),
    output: effectiveMode(state, "output"),
  };

  let learn = isShown(modes.learn);
  const editor = isShown(modes.editor);
  const output = isShown(modes.output);
  if (!learn && !editor && !output) {
    learn = true; // safety net: never draw an empty workspace
    modes.learn = "normal";
  }
  const right = editor || output;

  const learnRail = learn && modes.learn === "collapsed";
  const learnOpen = learn && !learnRail;
  const editorCollapsed = editor && modes.editor === "collapsed";
  const outputCollapsed = output && modes.output === "collapsed";
  const editorOpen = editor && !editorCollapsed;
  const outputOpen = output && !outputCollapsed;

  const learnCol = !learn ? "0px" : learnRail ? RAIL : right ? `minmax(0, ${state.split}fr)` : "minmax(0, 1fr)";
  const gapCol = learn && right ? `${GAP}px` : "0px";
  const rightCol = !right ? "0px" : learnOpen ? `minmax(0, ${100 - state.split}fr)` : "minmax(0, 1fr)";

  const topRow = !editor ? "0px" : editorCollapsed ? HEAD : outputOpen ? `minmax(0, ${state.rowSplit}fr)` : "minmax(0, 1fr)";
  const gapRow = editor && output ? `${GAP}px` : "0px";
  const bottomRow = !output ? "0px" : outputCollapsed ? HEAD : editorOpen ? `minmax(0, ${100 - state.rowSplit}fr)` : "minmax(0, 1fr)";

  const splitters: SplitterPlan[] = [];
  if (learnOpen && right) {
    splitters.push({
      key: "learn-editor", orientation: "vertical", kind: "split-v", a: "learn", b: "editor",
      gridColumn: "2", gridRow: "1 / span 3", value: state.split, min: SPLIT_MIN, max: SPLIT_MAX,
    });
  }
  if (editorOpen && outputOpen) {
    splitters.push({
      key: "editor-output", orientation: "horizontal", kind: "split-h", a: "editor", b: "output",
      gridColumn: "3", gridRow: "2", value: state.rowSplit, min: ROW_MIN, max: ROW_MAX,
    });
  }

  return {
    columns: `${learnCol} ${gapCol} ${rightCol}`,
    rows: `${topRow} ${gapRow} ${bottomRow}`,
    show: { lessons: false, learn, editor, output },
    collapsed: { lessons: false, learn: learnRail, editor: editorCollapsed, output: outputCollapsed },
    rail: { ...none(), learn: learnRail },
    placement: {
      lessons: { gridColumn: "1", gridRow: "1" },
      learn: { gridColumn: "1", gridRow: "1 / span 3" },
      editor: { gridColumn: "3", gridRow: "1" },
      output: { gridColumn: "3", gridRow: "3" },
    },
    splitters,
  };
}

function planColumns(state: LayoutState): GridPlan {
  const order = ALL_PANE_IDS;
  const modes = Object.fromEntries(order.map((id) => [id, effectiveMode(state, id)])) as Record<PaneId, PaneMode>;
  if (!order.some((id) => isShown(modes[id]))) modes.learn = "normal"; // safety net

  const shown = order.map((id) => isShown(modes[id]));
  const tracks: string[] = [];
  order.forEach((id, i) => {
    tracks.push(!shown[i] ? "0px" : modes[id] === "collapsed" ? RAIL : `minmax(0, ${state.widths[id]}fr)`);
    if (i < order.length - 1) tracks.push(shown[i] && shown.slice(i + 1).some(Boolean) ? `${GAP}px` : "0px");
  });

  const splitters: SplitterPlan[] = [];
  order.forEach((a, i) => {
    if (!shown[i] || modes[a] !== "normal") return;
    const j = shown.findIndex((on, k) => k > i && on);
    if (j < 0 || modes[order[j]] !== "normal") return;
    const b = order[j];
    splitters.push({
      key: `${a}-${b}`, orientation: "vertical", kind: "pair", a, b,
      gridColumn: String(2 * i + 2), gridRow: "1", value: pairRatio(state, a, b), min: PAIR_MIN, max: PAIR_MAX,
    });
  });

  const show = Object.fromEntries(order.map((id, i) => [id, shown[i]])) as Record<PaneId, boolean>;
  const collapsed = Object.fromEntries(order.map((id, i) => [id, shown[i] && modes[id] === "collapsed"])) as Record<PaneId, boolean>;
  const placement = Object.fromEntries(order.map((id, i) => [id, { gridColumn: String(2 * i + 1), gridRow: "1" }])) as GridPlan["placement"];

  return { columns: tracks.join(" "), rows: "minmax(0, 1fr)", show, collapsed, rail: { ...collapsed }, placement, splitters };
}

/* ------------------------------------------------------------------ */
/* Saving                                                              */
/* ------------------------------------------------------------------ */

type Saved = Pick<LayoutState, "arrangement" | "split" | "rowSplit" | "widths" | "modes" | "tab">;

export const toSaved = (state: LayoutState): Saved => ({
  arrangement: state.arrangement,
  split: state.split,
  rowSplit: state.rowSplit,
  widths: state.widths,
  modes: state.modes,
  tab: state.tab,
});

/** Reads a saved layout defensively: anything odd falls back to the default for that part. */
export function parseLayout(raw: unknown, key: LayoutKey): LayoutState {
  const base = defaultLayout(key);
  if (!raw || typeof raw !== "object") return base;
  const data = raw as Partial<Record<keyof Saved, unknown>>;

  const num = (value: unknown, min: number, max: number, fallback: number) =>
    typeof value === "number" && Number.isFinite(value) ? clamp(value, min, max) : fallback;

  const arrangement =
    typeof data.arrangement === "string" && (ARRANGEMENTS as readonly string[]).includes(data.arrangement)
      ? (data.arrangement as Arrangement)
      : base.arrangement;

  const modes = { ...base.modes };
  if (data.modes && typeof data.modes === "object") {
    for (const id of ALL_PANE_IDS) {
      const mode = (data.modes as Record<string, unknown>)[id];
      if (typeof mode === "string" && (MODES as readonly string[]).includes(mode)) modes[id] = mode as PaneMode;
    }
  }
  const widths = { ...base.widths };
  if (data.widths && typeof data.widths === "object") {
    for (const id of ALL_PANE_IDS) widths[id] = num((data.widths as Record<string, unknown>)[id], 5, 95, base.widths[id]);
  }

  // A saved layout with nothing visible would be a blank screen: start over. Past MAX_OPEN open panes, hide the first ones.
  if (!panesOf(arrangement).some((id) => isShown(modes[id]))) Object.assign(modes, base.modes);
  if (arrangement === "columns") {
    const open = ALL_PANE_IDS.filter((id) => isShown(modes[id]));
    for (const id of open.slice(0, Math.max(0, open.length - MAX_OPEN))) modes[id] = "hidden";
  }

  const tab = typeof data.tab === "string" && (ALL_PANE_IDS as readonly string[]).includes(data.tab) ? (data.tab as PaneId) : base.tab;

  return {
    arrangement,
    split: num(data.split, SPLIT_MIN, SPLIT_MAX, base.split),
    rowSplit: num(data.rowSplit, ROW_MIN, ROW_MAX, base.rowSplit),
    widths,
    modes,
    recent: ALL_PANE_IDS.filter((id) => isShown(modes[id])),
    tab,
    maximized: null,
  };
}
