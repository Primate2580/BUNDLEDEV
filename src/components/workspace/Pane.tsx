import { ChevronDown, ChevronLeft, ChevronRight, EyeOff, Maximize2, Minimize2, Minus } from "@/components/ui/icons";
import { useId, type CSSProperties, type ReactNode } from "react";
import type { PaneId } from "@/lib/workspace/layout";

interface Props {
  id: PaneId;
  title: string;
  style?: CSSProperties;
  /** not on screen right now (hidden, minimized, or another pane is maximized). Stays mounted. */
  away: boolean;
  /** drawn as just its header, or as a narrow rail when `railStyle` is set */
  collapsed: boolean;
  /** this pane collapses to a narrow vertical rail (columns arrangement, and Learn in the split arrangement) */
  railStyle: boolean;
  maximized: boolean;
  /** small screens: panes are tabs, so there are no window controls */
  tabbed: boolean;
  /** shown after the title while open, e.g. file tabs */
  extra?: ReactNode;
  /** buttons at the right of the header, before the window controls */
  actions?: ReactNode;
  /** the body is padded and scrolls (reading content). Otherwise the content manages itself. */
  padded?: boolean;
  onToggleCollapse: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onHide: () => void;
  children: ReactNode;
}

const iconButton =
  "grid size-7 shrink-0 place-items-center rounded-md text-muted hover:bg-raised hover:text-fg";

/** One pane: a header with its window controls, and a body that scrolls on its own. */
export default function Pane({
  id,
  title,
  style,
  away,
  collapsed,
  railStyle,
  maximized,
  tabbed,
  extra,
  actions,
  padded = false,
  onToggleCollapse,
  onMinimize,
  onToggleMaximize,
  onHide,
  children,
}: Props) {
  const titleId = useId();
  const rail = collapsed && railStyle;
  const CollapseIcon = collapsed ? ChevronRight : railStyle ? ChevronLeft : ChevronDown;

  return (
    <section
      id={`pane-${id}`}
      aria-labelledby={titleId}
      style={style}
      className={`@container min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-edge bg-panel ${away ? "hidden" : "flex"}`}
    >
      {rail ? (
        <button
          onClick={onToggleCollapse}
          aria-expanded={false}
          aria-controls={`pane-${id}-body`}
          title={`Expand ${title}`}
          className="flex h-full w-full flex-col items-center gap-3 py-3 text-muted hover:bg-raised hover:text-fg"
        >
          <ChevronRight size={16} aria-hidden />
          <span id={titleId} className="text-xs font-semibold uppercase tracking-wide [writing-mode:vertical-rl]">
            {title}
          </span>
        </button>
      ) : (
        (!tabbed || extra || actions) && (
          <header className="flex h-10 shrink-0 items-center gap-1 border-b border-edge px-2">
            {tabbed ? (
              <span id={titleId} className="sr-only">
                {title}
              </span>
            ) : (
              <span id={titleId} className="px-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                {title}
              </span>
            )}
            {!collapsed && extra && <div className="flex min-w-0 items-center overflow-x-auto">{extra}</div>}

            <div className="ml-auto flex shrink-0 items-center gap-0.5">
              {!collapsed && actions}
              {!tabbed && (
                <>
                  {!maximized && (
                    <button
                      onClick={onToggleCollapse}
                      aria-expanded={!collapsed}
                      aria-controls={`pane-${id}-body`}
                      aria-label={`${collapsed ? "Expand" : "Collapse"} ${title}`}
                      title={`${collapsed ? "Expand" : "Collapse"} ${title}`}
                      className={iconButton}
                    >
                      <CollapseIcon size={15} aria-hidden />
                    </button>
                  )}
                  <button onClick={onMinimize} aria-label={`Minimize ${title}`} title={`Minimize ${title} to the dock`} className={iconButton}>
                    <Minus size={15} aria-hidden />
                  </button>
                  <button
                    onClick={onToggleMaximize}
                    aria-label={`${maximized ? "Restore" : "Maximize"} ${title}`}
                    title={`${maximized ? "Restore" : "Maximize"} ${title}`}
                    className={iconButton}
                  >
                    {maximized ? <Minimize2 size={14} aria-hidden /> : <Maximize2 size={14} aria-hidden />}
                  </button>
                  <button onClick={onHide} aria-label={`Hide ${title}`} title={`Hide ${title} (bring it back from the View menu)`} className={iconButton}>
                    <EyeOff size={15} aria-hidden />
                  </button>
                </>
              )}
            </div>
          </header>
        )
      )}

      <div
        id={`pane-${id}-body`}
        {...(padded && !collapsed ? { tabIndex: 0, role: "region", "aria-labelledby": titleId } : {})}
        className={`min-h-0 flex-1 ${collapsed ? "hidden" : padded ? "pane-scroll px-5 py-5" : "overflow-hidden"}`}
      >
        {children}
      </div>
    </section>
  );
}
