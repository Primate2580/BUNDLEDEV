import { create } from "zustand";
import type { PlaygroundOrigin } from "@/lib/playgroundSeed";
import type { Arrangement, LayoutKey, PaneId } from "@/lib/workspace/layout";

/** Set by a mounted Workspace, so the header can offer its View menu and the shell can go full-bleed. */
export interface WorkspaceInfo {
  key: LayoutKey;
  arrangement: Arrangement;
  titles: Record<PaneId, string>;
}

interface UIState {
  /** mobile sidebar drawer */
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  /** wide screens: the course sidebar can be tucked away to give the panes more room */
  navHidden: boolean;
  toggleNav: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  /** non-null while a pane workspace is on screen */
  workspace: WorkspaceInfo | null;
  setWorkspace: (workspace: WorkspaceInfo | null) => void;
  /** set by the Playground when it was opened from a lesson example: where the header's back button goes */
  backLink: PlaygroundOrigin | null;
  setBackLink: (link: PlaygroundOrigin | null) => void;
}

export const useUI = create<UIState>((set) => ({
  sidebarOpen: false,
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  navHidden: false,
  toggleNav: () => set((s) => ({ navHidden: !s.navHidden })),
  searchOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  workspace: null,
  setWorkspace: (workspace) => set({ workspace }),
  backLink: null,
  setBackLink: (backLink) => set({ backLink }),
}));
