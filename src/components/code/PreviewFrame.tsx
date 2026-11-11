import { Monitor, Smartphone, Tablet, Trash2 } from "@/components/ui/icons";
import { useCallback, useEffect, useImperativeHandle, useRef, useState, type ReactNode, type Ref } from "react";
import { Spinner } from "@/components/ui/StatusMessage";
import type { Check, CheckResult, PreviewMode } from "@/engine/types";
import { buildSrcDoc, makeNonce, styleText } from "@/lib/preview/buildSrcDoc";
import type { MeasureRequest, MeasureResult } from "@/lib/preview/measure";
import { isFromPreview, type FromPreview, type ToPreview } from "@/lib/preview/protocol";
import { loadTailwindSource } from "@/lib/preview/tailwindSource";

/** What a parent can ask the preview to do. */
export interface PreviewHandle {
  /**
   * Shows `files`, waits for the page to settle, then runs the checks inside the sandbox.
   * Never rejects: a problem comes back as failing results with an explanation.
   */
  runChecks(checks: Check[], files: { html: string; css: string }): Promise<CheckResult[]>;
  /** Measures elements (position, size, computed styles) in the page. Resolves null if it can't. */
  measure(requests: MeasureRequest[], files: { html: string; css: string }): Promise<MeasureResult | null>;
}

export type PreviewWidth = "fit" | "tablet" | "phone";

interface Props {
  html: string;
  css: string;
  mode: PreviewMode;
  /** no toolbar of its own: the parent shows the width picker (in a pane header) and passes `width` */
  bare?: boolean;
  width?: PreviewWidth;
  canvas?: "light" | "dark";
  /** drawn on top of the page (annotations). Same size as the page, ignores the pointer. */
  overlay?: ReactNode;
  /** the page area changed size (window resized, width buttons) */
  onLayoutChange?: () => void;
  ref?: Ref<PreviewHandle>;
}

interface LogEntry {
  id: number;
  level: "error" | "warn" | "info";
  text: string;
}

export const WIDTHS = [
  { id: "fit", label: "Full width", icon: Monitor, px: undefined },
  { id: "tablet", label: "Tablet, 768 pixels", icon: Tablet, px: 768 },
  { id: "phone", label: "Phone, 375 pixels", icon: Smartphone, px: 375 },
] as const;

const LOG_STYLES = {
  error: "text-danger",
  warn: "text-warn",
  info: "text-info",
} as const;

let logCounter = 0;

/**
 * Renders learner code in a sandboxed iframe. HTML changes reload the page;
 * CSS-only changes are pushed in live, so scroll position and focus survive.
 */
export default function PreviewFrame({ html, css, mode, bare = false, width: widthProp, canvas = "light", overlay, onLayoutChange, ref }: Props) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const currentDoc = useRef("");
  const readyRef = useRef(false);
  const last = useRef<{ html: string; css: string; mode: PreviewMode; canvas: string } | null>(null);
  // Latest props, readable from callbacks that outlive a render.
  const modeRef = useRef(mode);
  const canvasRef = useRef(canvas);
  const tailwindRef = useRef<string | undefined>(undefined);
  const readyWaiters = useRef<(() => void)[]>([]);
  const pending = useRef(new Map<string, (message: FromPreview) => void>());
  const frameBox = useRef<HTMLDivElement>(null);
  const layoutRef = useRef(onLayoutChange);

  const [srcDoc, setSrcDoc] = useState("");
  const [ready, setReady] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [ownWidth, setWidth] = useState<PreviewWidth>("fit");
  const width = bare ? (widthProp ?? "fit") : ownWidth;
  const [tailwindSource, setTailwindSource] = useState<string>();
  const [tailwindFailed, setTailwindFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // Tailwind's browser build is downloaded only when a Tailwind preview is shown.
  useEffect(() => {
    if (mode !== "tailwind") return;
    let cancelled = false;
    setTailwindFailed(false);
    loadTailwindSource().then(
      (source) => {
        tailwindRef.current = source;
        if (!cancelled) setTailwindSource(source);
      },
      () => !cancelled && setTailwindFailed(true),
    );
    return () => {
      cancelled = true;
    };
  }, [mode, attempt]);

  // Messages from the preview page.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframe.current?.contentWindow) return;
      const data = event.data;
      if (!isFromPreview(data) || data.doc !== currentDoc.current) return; // stale page
      if (data.type === "ready") {
        readyRef.current = true;
        setReady(true);
        readyWaiters.current.splice(0).forEach((resolve) => resolve());
      } else if (data.type === "check-results" || data.type === "measure-result") {
        pending.current.get(data.id)?.(data);
      } else {
        setLogs((all) => [...all.slice(-19), { id: ++logCounter, level: data.level, text: data.text }]);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Decide between a live CSS update and a full reload. Also used by runChecks(),
  // so checks always run against exactly the code the learner submitted.
  const sync = useCallback((files: { html: string; css: string }) => {
    const currentMode = modeRef.current;
    const currentCanvas = canvasRef.current;
    const tailwind = tailwindRef.current;
    if (currentMode === "tailwind" && !tailwind) return; // still downloading

    const prev = last.current;
    const sameBase =
      prev && prev.html === files.html && prev.mode === currentMode && prev.canvas === currentCanvas;

    if (sameBase && readyRef.current) {
      if (prev.css !== files.css) {
        const message: ToPreview = {
          target: "csslab",
          type: "set-css",
          css: styleText(currentMode, files.css),
        };
        iframe.current?.contentWindow?.postMessage(message, "*");
      }
      last.current = { ...files, mode: currentMode, canvas: currentCanvas };
      return;
    }
    // The identical page is already loading: nothing to do.
    if (sameBase && prev.css === files.css) return;

    const docId = makeNonce();
    currentDoc.current = docId;
    readyRef.current = false;
    last.current = { ...files, mode: currentMode, canvas: currentCanvas };
    setReady(false);
    setLogs([]);
    setSrcDoc(
      buildSrcDoc({
        html: files.html,
        css: files.css,
        mode: currentMode,
        canvas: currentCanvas,
        tailwindSource: tailwind,
        nonce: makeNonce(),
        docId,
      }),
    );
  }, []);

  useEffect(() => {
    modeRef.current = mode;
    canvasRef.current = canvas;
  });

  useEffect(() => {
    sync({ html, css });
  }, [html, css, mode, canvas, tailwindSource, sync]);

  const whenReady = (timeoutMs: number) =>
    new Promise<boolean>((resolve) => {
      if (readyRef.current) return resolve(true);
      const timer = window.setTimeout(() => resolve(false), timeoutMs);
      readyWaiters.current.push(() => {
        window.clearTimeout(timer);
        resolve(true);
      });
    });

  /** Shows `files`, waits for the page to settle, sends one request and waits for its reply. */
  const request = async (
    files: { html: string; css: string },
    build: (id: string) => ToPreview,
  ): Promise<{ data: FromPreview } | { error: string }> => {
    if (modeRef.current === "tailwind" && !tailwindRef.current) {
      try {
        tailwindRef.current = await loadTailwindSource();
        setTailwindSource(tailwindRef.current);
      } catch {
        return { error: "The Tailwind preview couldn't load." };
      }
    }
    sync(files);
    if (!(await whenReady(8000))) return { error: "The preview didn't finish loading. Try again." };

    const id = makeNonce();
    const data = await new Promise<FromPreview | null>((resolve) => {
      const timer = window.setTimeout(() => {
        pending.current.delete(id);
        resolve(null);
      }, 5000);
      pending.current.set(id, (message) => {
        window.clearTimeout(timer);
        pending.current.delete(id);
        resolve(message);
      });
      iframe.current?.contentWindow?.postMessage(build(id), "*");
    });
    return data ? { data } : { error: "The preview took too long to answer. Try again." };
  };

  useImperativeHandle(
    ref,
    () => ({
      async runChecks(checks, files) {
        const failAll = (detail: string): CheckResult[] => checks.map(() => ({ passed: false, detail }));
        const reply = await request(files, (id) => ({ target: "csslab", type: "run-checks", id, checks }));
        if ("error" in reply) return failAll(reply.error);
        return reply.data.type === "check-results" ? reply.data.results : failAll("Unexpected reply from the preview.");
      },
      async measure(requests, files) {
        const reply = await request(files, (id) => ({ target: "csslab", type: "measure", id, requests }));
        return "error" in reply || reply.data.type !== "measure-result" ? null : reply.data.result;
      },
    }),
    [sync],
  );

  // Tell the parent when the page area changes size, so annotations can be re-measured.
  useEffect(() => {
    layoutRef.current = onLayoutChange;
  });
  const hasDoc = srcDoc !== "";
  useEffect(() => {
    const box = frameBox.current;
    if (!box) return;
    const observer = new ResizeObserver(() => layoutRef.current?.());
    observer.observe(box);
    return () => observer.disconnect();
  }, [hasDoc, width]);

  const widthPx = WIDTHS.find((w) => w.id === width)?.px;

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {bare ? (
        !ready && srcDoc && (
          <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-md bg-panel/90 p-1">
            <Spinner label="Updating" />
          </div>
        )
      ) : (
        <div className="flex items-center justify-between gap-3 border-b border-edge bg-panel px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="font-medium text-fg-2">Preview</span>
            {!ready && srcDoc && <Spinner label="Updating" />}
          </div>
          <PreviewWidthPicker value={width} onChange={setWidth} />
        </div>
      )}

      <div className="relative min-h-0 flex-1 overflow-auto bg-ink p-3">
        {tailwindFailed ? (
          <div className="grid h-full place-items-center text-center text-sm text-muted">
            <div>
              <p>The Tailwind preview couldn't load.</p>
              <button
                onClick={() => setAttempt((n) => n + 1)}
                className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500"
              >
                Try again
              </button>
            </div>
          </div>
        ) : !srcDoc ? (
          <div className="grid h-full place-items-center">
            <Spinner label={mode === "tailwind" ? "Loading Tailwind" : "Loading preview"} />
          </div>
        ) : (
          <div
            ref={frameBox}
            className="relative mx-auto h-full overflow-hidden rounded-lg border border-edge"
            style={{ maxWidth: widthPx ? `${widthPx}px` : undefined }}
          >
            <iframe
              ref={iframe}
              title="Live preview of your code"
              // allow-scripts only: no same-origin, popups, forms or top navigation.
              sandbox="allow-scripts"
              referrerPolicy="no-referrer"
              srcDoc={srcDoc}
              className={`size-full ${canvas === "dark" ? "bg-slate-900" : "bg-white"}`}
            />
            {overlay && <div className="pointer-events-none absolute inset-0">{overlay}</div>}
          </div>
        )}
      </div>

      {logs.length > 0 && (
        <div className="max-h-32 overflow-y-auto border-t border-edge bg-panel px-3 py-2">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs font-medium text-fg-2">Preview messages</p>
            <button
              onClick={() => setLogs([])}
              className="flex items-center gap-1 text-xs text-muted hover:text-fg"
            >
              <Trash2 size={12} aria-hidden />
              Clear
            </button>
          </div>
          <ul aria-live="polite" className="space-y-1 font-mono text-xs">
            {logs.map((entry) => (
              <li key={entry.id} className={LOG_STYLES[entry.level]}>
                {entry.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** The three preview-width buttons (full, tablet, phone). */
export function PreviewWidthPicker({ value, onChange }: { value: PreviewWidth; onChange: (width: PreviewWidth) => void }) {
  return (
    <div role="group" aria-label="Preview width" className="flex gap-0.5">
      {WIDTHS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          aria-label={label}
          title={label}
          className={`grid size-7 place-items-center rounded-md ${
            value === id ? "bg-indigo-500/20 text-accent" : "text-muted hover:bg-raised hover:text-fg"
          }`}
        >
          <Icon size={15} aria-hidden />
        </button>
      ))}
    </div>
  );
}
