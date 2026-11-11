import type { ControlSpec } from "@/engine/types";
import { getDeclaration } from "@/lib/css/cssRules";

interface Props {
  controls: ControlSpec[];
  /** the learner's CSS: the single source of truth the controls read from and write to */
  css: string;
  itemCount: number;
  selectedItem: number;
  onSelectItem: (item: number) => void;
  /** value is null to remove the declaration */
  onChange: (control: ControlSpec, selector: string, value: string) => void;
}

export const resolveSelector = (selector: string, item: number) => selector.replace("{item}", String(item));

function ControlRow({ control, css, item, onChange }: { control: ControlSpec; css: string; item: number; onChange: Props["onChange"] }) {
  const selector = resolveSelector(control.selector, item);
  const current = getDeclaration(css, selector, control.property) ?? control.fallback;
  const labelId = `ctl-${control.id}`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p id={labelId} className="font-mono text-xs text-accent">
          {control.label}
        </p>
        {control.type === "range" && (
          <output aria-labelledby={labelId} className="font-mono text-xs text-fg-2">
            {current}
          </output>
        )}
      </div>

      {control.type === "options" ? (
        <div role="radiogroup" aria-labelledby={labelId} className="mt-1.5 flex flex-wrap gap-1">
          {control.options.map((option) => {
            const selected = current === option;
            return (
              <button
                key={option}
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(control, selector, option)}
                className={`rounded-md border px-2 py-1 font-mono text-[11px] ${
                  selected
                    ? "border-indigo-500 bg-indigo-500/20 text-accent"
                    : "border-edge text-muted hover:bg-raised hover:text-fg"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : (
        <input
          type="range"
          aria-labelledby={labelId}
          min={control.min}
          max={control.max}
          step={control.step ?? 1}
          value={Number.isFinite(parseFloat(current)) ? parseFloat(current) : control.min}
          onChange={(e) => onChange(control, selector, `${e.target.value}${control.unit ?? ""}`)}
          className="mt-1.5 w-full accent-indigo-500"
        />
      )}
      {control.help && <p className="mt-1 text-xs leading-5 text-faint">{control.help}</p>}
    </div>
  );
}

/** Guided controls. They edit the same CSS as the code editor, so the two never disagree. */
export default function ControlsPanel({ controls, css, itemCount, selectedItem, onSelectItem, onChange }: Props) {
  const container = controls.filter((c) => !c.selector.includes("{item}"));
  const item = controls.filter((c) => c.selector.includes("{item}"));

  return (
    <div className="space-y-5">
      {container.length > 0 && (
        <div className="space-y-4">
          {container.map((control) => (
            <ControlRow key={control.id} control={control} css={css} item={selectedItem} onChange={onChange} />
          ))}
        </div>
      )}

      {item.length > 0 && (
        <div className="space-y-4 border-t border-edge pt-4">
          <div>
            <p id="ctl-selected-item" className="text-xs font-medium text-fg">
              Change one item
            </p>
            <div role="radiogroup" aria-labelledby="ctl-selected-item" className="mt-1.5 flex gap-1">
              {Array.from({ length: itemCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  role="radio"
                  aria-checked={selectedItem === n}
                  aria-label={`Item ${n}`}
                  onClick={() => onSelectItem(n)}
                  className={`size-8 rounded-md border text-xs font-medium ${
                    selectedItem === n
                      ? "border-indigo-500 bg-indigo-500/20 text-accent"
                      : "border-edge text-muted hover:bg-raised hover:text-fg"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          {item.map((control) => (
            <ControlRow key={`${control.id}-${selectedItem}`} control={control} css={css} item={selectedItem} onChange={onChange} />
          ))}
        </div>
      )}
    </div>
  );
}
