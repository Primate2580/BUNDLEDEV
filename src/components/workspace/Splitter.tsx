import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";

interface Props {
  orientation: "vertical" | "horizontal";
  label: string;
  /** current size, in percent */
  value: number;
  min: number;
  max: number;
  /** ids of the panes it resizes */
  controls: string;
  style: CSSProperties;
  onChange: (value: number) => void;
  onReset: () => void;
  /** pointer position while dragging */
  onDrag: (clientX: number, clientY: number) => void;
  onDragging: (dragging: boolean) => void;
}

const STEP = 2;
const BIG_STEP = 10;

/**
 * The bar between two panes. Drag it, or focus it and use the arrow keys (Shift for bigger steps),
 * Home and End for the limits, and Enter or a double click to reset.
 */
export default function Splitter({ orientation, label, value, min, max, controls, style, onChange, onReset, onDrag, onDragging }: Props) {
  const vertical = orientation === "vertical";

  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.shiftKey ? BIG_STEP : STEP;
    const less = vertical ? "ArrowLeft" : "ArrowUp";
    const more = vertical ? "ArrowRight" : "ArrowDown";
    if (event.key === less) onChange(value - step);
    else if (event.key === more) onChange(value + step);
    else if (event.key === "Home") onChange(min);
    else if (event.key === "End") onChange(max);
    else if (event.key === "Enter") onReset();
    else return;
    event.preventDefault();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    onDragging(true);
    event.preventDefault();
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) onDrag(event.clientX, event.clientY);
  };
  const stop = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    onDragging(false);
  };

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={orientation}
      aria-label={label}
      aria-controls={controls}
      aria-valuenow={Math.round(value)}
      aria-valuemin={min}
      aria-valuemax={max}
      title={`${label}. Drag, or use the arrow keys. Enter resets.`}
      style={{ ...style, touchAction: "none" }}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      onDoubleClick={onReset}
      className={`group flex items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-0 ${
        vertical ? "cursor-col-resize" : "cursor-row-resize"
      }`}
    >
      <span
        aria-hidden
        className={`rounded-full bg-edge transition-colors group-hover:bg-indigo-500/70 group-focus-visible:bg-indigo-500 group-active:bg-indigo-500 ${
          vertical ? "h-10 w-1" : "h-1 w-10"
        }`}
      />
    </div>
  );
}
