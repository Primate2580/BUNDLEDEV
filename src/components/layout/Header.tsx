import { ArrowLeft, Code2, Menu, PanelLeft, RotateCcw, Search, SlidersHorizontal, X } from "@/components/ui/icons";
import { Link, NavLink } from "react-router-dom";
import ProgressBar from "@/components/ui/ProgressBar";
import ViewMenu from "@/components/workspace/ViewMenu";
import { setMode } from "@/lib/workspace/layout";
import { useLayouts } from "@/store/useLayouts";
import ThemeToggle from "./ThemeToggle";
import { overallStats } from "@/lib/progressMath";
import { useProgress } from "@/store/useProgress";
import { useUI } from "@/store/useUI";

export default function Header() {
  const progress = useProgress((s) => s.progress);
  const reset = useProgress((s) => s.reset);
  const { sidebarOpen, openSidebar, closeSidebar, openSearch, navHidden, toggleNav, workspace, backLink } = useUI();
  // In the columns arrangement the course navigation is a pane (Lessons), so this button shows or hides it.
  const updateLayout = useLayouts((state) => state.update);
  const lessonsShown = useLayouts((state) => (workspace ? state.layouts[workspace.key].modes.lessons !== "hidden" : false));
  const columns = workspace?.arrangement === "columns";
  const navVisible = columns ? lessonsShown : !navHidden;
  const toggleNavigation = () => {
    if (workspace && columns) updateLayout(workspace.key, (layout) => setMode(layout, "lessons", layout.modes.lessons === "hidden" ? "normal" : "hidden"));
    else toggleNav();
  };
  const stats = overallStats(progress);

  const onReset = () => {
    if (window.confirm("Reset all progress? This clears every completed lesson on this device.")) {
      void reset();
    }
  };

  return (
    <header className="relative z-50 flex h-14 shrink-0 items-center gap-3 border-b border-edge bg-panel/95 px-3 backdrop-blur sm:px-5">
      <button
        onClick={sidebarOpen ? closeSidebar : openSidebar}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        aria-expanded={sidebarOpen}
        aria-controls="sidebar"
        className="grid size-9 place-items-center rounded-lg text-fg-2 hover:bg-raised lg:hidden"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <button
        onClick={toggleNavigation}
        aria-label={navVisible ? "Hide course navigation" : "Show course navigation"}
        title={navVisible ? "Hide course navigation" : "Show course navigation"}
        aria-expanded={navVisible}
        aria-controls={columns ? "pane-lessons" : "sidebar"}
        className="hidden size-9 place-items-center rounded-lg text-fg-2 hover:bg-raised lg:grid"
      >
        <PanelLeft size={20} aria-hidden />
      </button>

      <Link to="/" aria-label="CSS Lab, home" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg">
        <img src="/favicon.svg" alt="" className="size-7" />
        <span className="hidden text-base font-semibold tracking-tight text-fg min-[420px]:inline">CSS Lab</span>
      </Link>

      <nav aria-label="Main" className="flex gap-1 sm:ml-2">
        {[
          { to: "/playground", label: "Playground", icon: Code2 },
          { to: "/visualizer", label: "Visualizer", icon: SlidersHorizontal },
        ].map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            title={label}
            className={({ isActive }) =>
              `flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm hover:bg-raised ${
                isActive ? "bg-raised text-fg" : "text-fg-2"
              }`
            }
          >
            <Icon size={16} aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={openSearch}
        aria-label="Search lessons"
        aria-keyshortcuts="Control+K Meta+K"
        className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-edge px-2.5 py-1.5 text-sm text-muted hover:bg-raised hover:text-fg"
      >
        <Search size={15} aria-hidden />
        <span className="hidden md:inline">Search</span>
        <kbd className="hidden rounded border border-edge px-1 text-[10px] text-faint lg:inline">Ctrl K</kbd>
      </button>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <div className="hidden w-44 sm:block">
          <p className="mb-1 text-right text-xs text-muted">
            {stats.total === 0
              ? "No lessons yet"
              : `${stats.done} of ${stats.total} lessons`}
          </p>
          <ProgressBar percent={stats.percent} label="Overall progress" />
        </div>
        {backLink && (
          <Link
            to={backLink.path}
            state={{ scrollToExample: backLink.exampleId }}
            title={`Back to ${backLink.label}`}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-indigo-600 px-2.5 py-1.5 text-sm font-medium text-on-accent hover:bg-indigo-500"
          >
            <ArrowLeft size={15} aria-hidden />
            <span className="hidden sm:inline">Back to lesson</span>
            <span className="sr-only sm:hidden">Back to lesson</span>
          </Link>
        )}
        {workspace && <ViewMenu workspace={workspace} />}
        <ThemeToggle />
        <button
          onClick={onReset}
          aria-label="Reset progress"
          title="Reset progress"
          className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-edge px-2.5 py-1.5 text-xs text-fg-2 hover:bg-raised hover:text-fg"
        >
          <RotateCcw size={14} aria-hidden />
          <span className="hidden lg:inline">Reset progress</span>
        </button>
      </div>
    </header>
  );
}
