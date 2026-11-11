export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const KEY = "css-lab:theme";
const META_COLORS: Record<ResolvedTheme, string> = { dark: "#0b1020", light: "#f4f6fb" };

export function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {
    /* storage blocked: fall through to the default */
  }
  return "system";
}

export function writePreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(KEY, preference);
  } catch {
    /* ignore: the choice still applies for this session */
  }
}

export const systemQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "system") return systemQuery().matches ? "dark" : "light";
  return preference;
}

/** Puts the theme on <html>: the .dark class drives the CSS variables. */
export function applyTheme(theme: ResolvedTheme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[theme]);
}
