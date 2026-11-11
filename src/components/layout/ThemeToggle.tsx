import { Monitor, Moon, Sun } from "@/components/ui/icons";
import { useRef, type KeyboardEvent } from "react";
import type { ThemePreference } from "@/lib/theme";
import { useTheme } from "@/store/useTheme";

const OPTIONS = [
  { id: "light", label: "Light", icon: Sun },
  { id: "system", label: "System", icon: Monitor },
  { id: "dark", label: "Dark", icon: Moon },
] as const satisfies readonly { id: ThemePreference; label: string; icon: typeof Sun }[];

/** Three-way switch. Arrow keys move between options, like a native radio group. */
export default function ThemeToggle() {
  const preference = useTheme((s) => s.preference);
  const setPreference = useTheme((s) => s.setPreference);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + OPTIONS.length) % OPTIONS.length;
    setPreference(OPTIONS[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label="Color theme" className="flex rounded-lg border border-edge p-0.5">
      {OPTIONS.map(({ id, label, icon: Icon }, index) => {
        const selected = preference === id;
        return (
          <button
            key={id}
            ref={(el) => {
              buttons.current[index] = el;
            }}
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            tabIndex={selected ? 0 : -1}
            onClick={() => setPreference(id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`grid size-7 place-items-center rounded-md ${
              selected ? "bg-indigo-600 text-on-accent" : "text-muted hover:bg-raised hover:text-fg"
            }`}
          >
            <Icon size={15} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
