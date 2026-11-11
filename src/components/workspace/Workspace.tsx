import { useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { nextTab } from "@/lib/useRovingTabs";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  ALL_PANE_IDS,
  DEFAULT_TITLES,
  GAP,
  MOBILE_QUERY,
  activeTab,
  defaultLayout,
  dockedPanes,
  pairRatio,
  panesOf,
  planGrid,
  restoreFromMaximized,
  setMode,
  setPair,
  setRowSplit,
  setSplit,
  setTab,
  tabPanes,
  toggleCollapse,
  toggleMaximize,
  type LayoutKey,
  type PaneId,
  type SplitterPlan,
} from "@/lib/workspace/layout";
import { useLayouts } from "@/store/useLayouts";
import { useUI } from "@/store/useUI";
import Pane from "./Pane";
import Splitter from "./Splitter";

export interface PaneSpec {
  /** overrides the default name (Learn, Editor, Output) */
  title?: string;
  body: ReactNode;
  /** shown after the title while the pane is open (for example file tabs) */
  extra?: ReactNode;
  /** buttons at the right of the header */
  actions?: ReactNode;
  /** reading content: padded, and scrolls on its own */
  padded?: boolean;
}

type ContentPane = "learn" | "editor" | "output";

interface Props {
  layoutKey: LayoutKey;
  /** the three panes a lesson or the Playground provides. The Lessons pane is added by the workspace. */
  panes: Record<ContentPane, PaneSpec>;
}

/** Outer padding of the pane area (px). */
const PAD = 8;

/** The fourth pane: the course navigation, available in the columns arrangement. */
const LESSONS_SPEC: PaneSpec = {
  body: (
    <div tabIndex={0} role="region" aria-label="Course navigation" className="pane-scroll h-full">
      <Sidebar />
    </div>
  ),
};

/**
 * Panes side by side as columns (Lessons, Learn, Editor, Output), or Learn beside a stacked Editor and Output.
 * The page itself never scrolls: every pane scrolls on its own. Panes stay mounted whatever their state (so the
 * editor and preview keep their work), and only their grid tracks change. Below 768px the panes become tabs.
 *
 * Layouts are saved per `layoutKey`, so lessons, the Playground and the Visualizer remember their own arrangement.
 */
export default function Workspace({ layoutKey, panes }: Props) {
  const state = useLayouts((s) => s.layouts[layoutKey]);
  const update = useLayouts((s) => s.update);
  const setWorkspace = useUI((s) => s.setWorkspace);
  const mobile = useMediaQuery(MOBILE_QUERY);
  const grid = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const columns = state.arrangement === "columns";
  const specOf = (id: PaneId): PaneSpec => (id === "lessons" ? LESSONS_SPEC : panes[id]);
  const titleOf = (id: PaneId) => specOf(id).title ?? DEFAULT_TITLES[id];
  const titlesKey = ALL_PANE_IDS.map(titleOf).join("|");

  // Tell the shell a workspace is showing: it goes full-bleed and the header offers the View menu.
  useLayoutEffect(() => {
    setWorkspace({
      key: layoutKey,
      arrangement: state.arrangement,
      titles: { lessons: titleOf("lessons"), learn: titleOf("learn"), editor: titleOf("editor"), output: titleOf("output") },
    });
    return () => setWorkspace(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutKey, state.arrangement, titlesKey, setWorkspace]);

  const plan = planGrid(state);
  const docked = dockedPanes(state);
  const open = tabPanes(state);
  const current = activeTab(state);
  const act = (change: Parameters<typeof update>[1]) => update(layoutKey, change);

  // Splitter drags: turn the pointer position into a percentage.
  const dragTo = (splitter: SplitterPlan, clientX: number, clientY: number) => {
    const box = grid.current?.getBoundingClientRect();
    if (!box) return;
    if (splitter.kind === "split-v") {
      const room = box.width - PAD * 2 - GAP;
      act((s) => setSplit(s, ((clientX - box.left - PAD - GAP / 2) / room) * 100));
    } else if (splitter.kind === "split-h") {
      const room = box.height - PAD * 2 - GAP;
      act((s) => setRowSplit(s, ((clientY - box.top - PAD - GAP / 2) / room) * 100));
    } else {
      const left = document.getElementById(`pane-${splitter.a}`)?.getBoundingClientRect();
      const right = document.getElementById(`pane-${splitter.b}`)?.getBoundingClientRect();
      if (!left || !right) return;
      act((s) => setPair(s, splitter.a, splitter.b, ((clientX - left.left) / (right.right - left.left)) * 100));
    }
  };
  const changeBy = (splitter: SplitterPlan, value: number) =>
    act((s) =>
      splitter.kind === "split-v" ? setSplit(s, value) : splitter.kind === "split-h" ? setRowSplit(s, value) : setPair(s, splitter.a, splitter.b, value),
    );
  const resetOne = (splitter: SplitterPlan) => {
    const base = defaultLayout(layoutKey);
    act((s) =>
      splitter.kind === "split-v"
        ? setSplit(s, base.split)
        : splitter.kind === "split-h"
          ? setRowSplit(s, base.rowSplit)
          : setPair(s, splitter.a, splitter.b, pairRatio(base, splitter.a, splitter.b)),
    );
  };

  // Escape puts a maximized pane back (but not inside the code editor, where Escape means "let go of Tab").
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !state.maximized || mobile) return;
    if ((event.target as HTMLElement).closest(".cm-editor")) return;
    act(restoreFromMaximized);
  };

  const tabKeys = (event: KeyboardEvent, id: PaneId) => {
    const next = nextTab(open, id, event.key);
    if (!next) return;
    event.preventDefault();
    act((s) => setTab(s, next));
    document.getElementById(`ws-${layoutKey}-tab-${next}`)?.focus();
  };

  // Panes that exist in this arrangement. The Lessons pane is only rendered in the columns arrangement.
  const rendered = panesOf(state.arrangement);
  const showPane = (id: PaneId) => (mobile ? id === current : plan.show[id]);

  return (
    <div className="flex h-full min-h-0 flex-col" onKeyDown={onKeyDown}>
      {mobile && (
        <div role="tablist" aria-label="Panes" className="flex shrink-0 gap-1 border-b border-edge bg-panel px-2 py-1.5">
          {open.map((id) => (
            <button
              key={id}
              role="tab"
              id={`ws-${layoutKey}-tab-${id}`}
              aria-selected={current === id}
              aria-controls={`pane-${id}`}
              tabIndex={current === id ? 0 : -1}
              onClick={() => act((s) => setTab(s, id))}
              onKeyDown={(event) => tabKeys(event, id)}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium ${
                current === id ? "bg-indigo-600 text-on-accent" : "text-fg-2 hover:bg-raised"
              }`}
            >
              {titleOf(id)}
            </button>
          ))}
        </div>
      )}

      <div
        ref={grid}
        data-resizing={dragging ? "" : undefined}
        data-arrangement={state.arrangement}
        className="grid min-h-0 flex-1"
        style={{
          padding: mobile ? 6 : PAD,
          gridTemplateColumns: mobile ? "minmax(0, 1fr)" : plan.columns,
          gridTemplateRows: mobile ? "minmax(0, 1fr)" : plan.rows,
        }}
      >
        {rendered.map((id) => {
          const spec = specOf(id);
          return (
            <Pane
              key={id}
              id={id}
              title={titleOf(id)}
              style={mobile ? { gridColumn: "1", gridRow: "1" } : plan.placement[id]}
              away={!showPane(id)}
              collapsed={!mobile && plan.collapsed[id]}
              railStyle={columns || id === "learn"}
              maximized={!mobile && state.maximized === id}
              tabbed={mobile}
              extra={spec.extra}
              actions={spec.actions}
              padded={spec.padded}
              onToggleCollapse={() => act((s) => toggleCollapse(s, id))}
              onMinimize={() => act((s) => setMode(s, id, "minimized"))}
              onToggleMaximize={() => act((s) => toggleMaximize(s, id))}
              onHide={() => act((s) => setMode(s, id, "hidden"))}
            >
              {spec.body}
            </Pane>
          );
        })}

        {!mobile &&
          plan.splitters.map((splitter) => (
            <Splitter
              key={splitter.key}
              orientation={splitter.orientation}
              label={`Resize ${titleOf(splitter.a)} and ${titleOf(splitter.b)}`}
              value={splitter.value}
              min={splitter.min}
              max={splitter.max}
              controls={`pane-${splitter.a}`}
              style={{ gridColumn: splitter.gridColumn, gridRow: splitter.gridRow }}
              onChange={(value) => changeBy(splitter, value)}
              onReset={() => resetOne(splitter)}
              onDrag={(x, y) => dragTo(splitter, x, y)}
              onDragging={setDragging}
            />
          ))}
      </div>

      {!mobile && docked.length > 0 && (
        <div role="toolbar" aria-label="Minimized panes" className="flex shrink-0 items-center gap-1.5 px-2 pb-2">
          {docked.map((id) => (
            <button
              key={id}
              onClick={() => act((s) => setMode(s, id, "normal"))}
              title={`Restore ${titleOf(id)}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-edge bg-panel px-2.5 py-1 text-xs text-fg-2 hover:bg-raised hover:text-fg"
            >
              <DockGlyph />
              {titleOf(id)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** A tiny window glyph for dock chips. */
function DockGlyph() {
  return <span aria-hidden className="size-2.5 rounded-[3px] border border-current" />;
}
