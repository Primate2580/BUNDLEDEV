import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SearchDialog from "@/components/search/SearchDialog";
import Sidebar from "@/components/sidebar/Sidebar";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { useUI } from "@/store/useUI";
import Header from "./Header";

export default function AppShell() {
  const { sidebarOpen, closeSidebar, navHidden, workspace, openSearch } = useUI();
  // A pane workspace fills the area and the panes scroll; every other page scrolls in <main>.
  const bleed = workspace !== null;
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);

  // After navigating: close the mobile drawer and return to the top of the page.
  useEffect(() => {
    closeSidebar();
    mainRef.current?.scrollTo({ top: 0 });

    // Move focus into the new page, unless the page already placed it (a lesson focuses its title).
    // Without this, keyboard and screen reader users stay stranded on the link they just used.
    const active = document.activeElement;
    if (!active || active === document.body || asideRef.current?.contains(active) || active.closest("header")) {
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [pathname, closeSidebar]);

  // Ctrl/Cmd+K opens search from anywhere. "/" does too, unless you are typing in a field or the code editor.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const typing = (event.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable="true"], .cm-editor');
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      } else if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeSidebar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen, closeSidebar]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-indigo-600 focus:px-3 focus:py-2 focus:text-sm focus:text-on-accent"
      >
        Skip to content
      </a>
      <Header />
      <SearchDialog />

      <div className="relative flex min-h-0 flex-1">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <button
            aria-label="Close menu"
            onClick={closeSidebar}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          />
        )}

        <aside
          ref={asideRef}
          id="sidebar"
          aria-label="Course navigation"
          className={`fixed inset-y-0 left-0 z-40 w-80 max-w-[85vw] transform overflow-y-auto border-r border-edge bg-panel pt-14 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:pt-0 ${
            navHidden || workspace?.arrangement === "columns" ? "lg:hidden" : ""
          } ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </aside>

        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className={`min-w-0 flex-1 outline-none overscroll-contain ${bleed ? "overflow-hidden" : "overflow-y-auto"}`}
        >
          {/* One wrapper whose classes change, so the page below is never remounted when a workspace appears. */}
          <div className={bleed ? "h-full" : "mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-10"}>
            <ErrorBoundary key={pathname}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}
