import { Check, LayoutGrid } from "@/components/ui/icons";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ALL_PANE_IDS, MAX_OPEN, panesOf, setArrangement, setMode, type Arrangement, type PaneMode } from "@/lib/workspace/layout";
import { useLayouts } from "@/store/useLayouts";
import type { WorkspaceInfo } from "@/store/useUI";

const NOTE: Partial<Record<PaneMode, string>> = { minimized: "minimized", collapsed: "collapsed", hidden: "hidden" };

/** Header menu: show or hide each pane, and reset the arrangement. Panes you hide come back here. */
export default function ViewMenu({ workspace }: { workspace: WorkspaceInfo }) {
  const state = useLayouts((s) => s.layouts[workspace.key]);
  const update = useLayouts((s) => s.update);
  const reset = useLayouts((s) => s.reset);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const columns = state.arrangement === "columns";
  const button = useRef<HTMLButtonElement>(null);

  const items = () => Array.from(root.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? []);

  useEffect(() => {
    if (!open) return;
    items()[0]?.focus();
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  const onMenuKey = (event: KeyboardEvent) => {
    const list = items();
    const at = list.indexOf(document.activeElement as HTMLElement);
    if (event.key === "Escape") close();
    else if (event.key === "ArrowDown") list[(at + 1) % list.length]?.focus();
    else if (event.key === "ArrowUp") list[(at - 1 + list.length) % list.length]?.focus();
    else if (event.key === "Home") list[0]?.focus();
    else if (event.key === "End") list[list.length - 1]?.focus();
    else if (event.key === "Tab") setOpen(false);
    else return;
    if (event.key !== "Tab") event.preventDefault();
  };

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="View"
        title="Show or hide panes"
        className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-edge px-2.5 py-1.5 text-sm text-fg-2 hover:bg-raised hover:text-fg"
      >
        <LayoutGrid size={15} aria-hidden />
        <span className="hidden md:inline">View</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="View"
          onKeyDown={onMenuKey}
          className="absolute right-0 top-full z-50 mt-1.5 w-72 rounded-xl border border-edge bg-panel p-1.5 shadow-lg"
        >
          {panesOf(state.arrangement).map((id) => {
            const mode = state.modes[id];
            const visible = mode !== "hidden";
            const locked = visible && setMode(state, id, "hidden") === state; // the last pane on screen can't be hidden
            return (
              <button
                key={id}
                role="menuitemcheckbox"
                aria-checked={visible}
                aria-disabled={locked || undefined}
                onClick={() => {
                  if (!locked) update(workspace.key, (s) => setMode(s, id, visible ? "hidden" : "normal"));
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm hover:bg-raised ${
                  locked ? "cursor-default text-muted" : "text-fg-2 hover:text-fg"
                }`}
              >
                <span className="grid size-4 place-items-center">{visible && <Check size={14} aria-hidden />}</span>
                <span className="flex-1">{workspace.titles[id]}</span>
                {NOTE[mode] && <span className="text-xs text-faint">{NOTE[mode]}</span>}
              </button>
            );
          })}
          {columns && MAX_OPEN < ALL_PANE_IDS.length && <p className="px-2.5 pb-1 pt-0.5 text-xs text-faint">Up to {MAX_OPEN} panes are open at once. Showing another one hides the pane that has been open longest.</p>}
          <div role="separator" className="my-1 border-t border-edge" />
          <p className="px-2.5 pb-0.5 pt-1 text-xs font-medium text-faint">Layout</p>
          {(
            [
              ["columns", "Columns", "Lessons, Learn, Editor and Output side by side"],
              ["split", "Split", "Learn beside a stacked Editor and Output"],
            ] as [Arrangement, string, string][]
          ).map(([value, label, note]) => (
            <button
              key={value}
              role="menuitemradio"
              aria-checked={state.arrangement === value}
              onClick={() => update(workspace.key, (s) => setArrangement(s, value))}
              className="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-fg-2 hover:bg-raised hover:text-fg"
            >
              <span className="mt-0.5 grid size-4 place-items-center">{state.arrangement === value && <Check size={14} aria-hidden />}</span>
              <span className="flex-1">
                {label}
                <span className="block text-xs text-faint">{note}</span>
              </span>
            </button>
          ))}
          <div role="separator" className="my-1 border-t border-edge" />
          <button
            role="menuitem"
            onClick={() => {
              reset(workspace.key);
              close();
            }}
            className="w-full rounded-lg px-2.5 py-2 text-left text-sm text-fg-2 hover:bg-raised hover:text-fg"
          >
            <span className="pl-6">Reset layout</span>
          </button>
        </div>
      )}
    </div>
  );
}
