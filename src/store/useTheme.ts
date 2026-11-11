import { create } from "zustand";
import {
  applyTheme,
  readPreference,
  resolveTheme,
  writePreference,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

interface ThemeState {
  /** what the learner chose */
  preference: ThemePreference;
  /** what is actually showing (system resolved to light or dark) */
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
  /** call when the operating system's color scheme changes */
  syncSystem: () => void;
}

export const useTheme = create<ThemeState>((set, get) => {
  const preference = readPreference();
  const resolved = resolveTheme(preference);
  applyTheme(resolved);

  return {
    preference,
    resolved,
    setPreference: (next) => {
      writePreference(next);
      const nextResolved = resolveTheme(next);
      applyTheme(nextResolved);
      set({ preference: next, resolved: nextResolved });
    },
    syncSystem: () => {
      if (get().preference !== "system") return;
      const nextResolved = resolveTheme("system");
      applyTheme(nextResolved);
      set({ resolved: nextResolved });
    },
  };
});
