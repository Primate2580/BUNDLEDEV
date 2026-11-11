import type { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}

/** Shared empty / error / not-found block: says what happened and what to do. */
export default function StatusMessage({ title, children, action }: Props) {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-edge bg-panel p-8 text-center">
      <h2 className="text-lg font-semibold text-fg">{title}</h2>
      {children && <p className="mt-2 text-sm leading-6 text-muted">{children}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-2 text-sm text-muted">
      <span className="size-4 animate-spin rounded-full border-2 border-edge border-t-indigo-400" />
      {label}
    </div>
  );
}
