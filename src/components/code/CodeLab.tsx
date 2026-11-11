import { Play, RotateCcw, Sparkles } from "@/components/ui/icons";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react";
import ExplainPanel from "@/components/explain/ExplainPanel";
import Workspace from "@/components/workspace/Workspace";
import type { LayoutKey } from "@/lib/workspace/layout";
import { Spinner } from "@/components/ui/StatusMessage";
import { explainFiles } from "@/lib/explain/explain";
import { useRovingTabs } from "@/lib/useRovingTabs";
import type { Explanation } from "@/lib/explain/types";
import type { Check, CheckResult, CodeFiles, PreviewMode } from "@/engine/types";
import PreviewFrame, { PreviewWidthPicker, type PreviewHandle, type PreviewWidth } from "./PreviewFrame";

// CodeMirror is large, so it loads only when a code lesson is opened.
const CodeEditor = lazy(() => import("./CodeEditor"));

type FileName = keyof CodeFiles;

/** What a lesson player can ask of the lab. */
export interface CodeLabHandle {
  /** Runs the checks against the code currently in the editors. */
  runChecks(checks: Check[]): Promise<CheckResult[]>;
  /** Replaces the editor contents (e.g. "use the solution"). */
  setFiles(files: CodeFiles): void;
  /** The code currently in the editors. */
  getFiles(): CodeFiles;
}

interface Props {
  mode: PreviewMode;
  /** what Reset returns to */
  starter: CodeFiles;
  /** code to start with (defaults to the starter) */
  initial?: CodeFiles;
  /** which files appear as tabs */
  files?: FileName[];
  /** files that are shown but can't be edited */
  readOnly?: FileName[];
  canvas?: "light" | "dark";
  /** the Learn pane: what the learner reads and does (task, checks, hints). Scrolls on its own. */
  learn: ReactNode;
  /** which saved pane arrangement to use. Lessons and the Playground keep their own. */
  layoutKey?: LayoutKey;
  /** every keystroke */
  onChange?: (files: CodeFiles) => void;
  /** whenever the preview is updated. Used later to explain what a change did. */
  onApply?: (before: CodeFiles, after: CodeFiles) => void;
  /** show a "What did that change do?" panel under the editor and preview */
  explain?: boolean;
  /** Ctrl/Cmd+Enter in an editor. Defaults to running the preview. */
  onSubmit?: () => void;
  ref?: Ref<CodeLabHandle>;
}

const AUTO_RUN_DELAY = 400;

export default function CodeLab({
  mode,
  starter,
  initial,
  files = ["html", "css"],
  readOnly = [],
  canvas = "light",
  learn,
  layoutKey = "lesson",
  explain = false,
  onChange,
  onApply,
  onSubmit,
  ref,
}: Props) {
  const [code, setCode] = useState<CodeFiles>(initial ?? starter);
  const [applied, setApplied] = useState<CodeFiles>(initial ?? starter);
  const [tab, setTab] = useState<FileName>(files[0]);
  const [autoRun, setAutoRun] = useState(true);
  const tabsId = useId();
  const { tabProps, panelProps } = useRovingTabs(files, tab, setTab, tabsId);
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const modeRef = useRef(mode);
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>("fit");
  const [showExplain, setShowExplain] = useState(true);

  const codeRef = useRef(code);
  const previewRef = useRef<PreviewHandle>(null);
  const appliedRef = useRef(applied);
  const onApplyRef = useRef(onApply);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onApplyRef.current = onApply;
    onChangeRef.current = onChange;
    modeRef.current = mode;
  });

  const apply = useCallback((next: CodeFiles) => {
    const before = appliedRef.current;
    if (before.html === next.html && before.css === next.css) return;
    appliedRef.current = next;
    setApplied(next);
    onApplyRef.current?.(before, next);
    setExplanation(explainFiles(modeRef.current, before, next));
  }, []);

  // Live apply: run shortly after the learner stops typing.
  useEffect(() => {
    if (!autoRun) return;
    const timer = window.setTimeout(() => apply(code), AUTO_RUN_DELAY);
    return () => window.clearTimeout(timer);
  }, [code, autoRun, apply]);

  // Single place that changes the editor contents, so codeRef never lags behind state.
  const commit = useCallback((next: CodeFiles) => {
    codeRef.current = next;
    setCode(next);
    onChangeRef.current?.(next);
  }, []);

  const update = (file: FileName, value: string) => commit({ ...codeRef.current, [file]: value });

  const run = () => apply(codeRef.current);

  const reset = () => {
    commit(starter);
    apply(starter);
    setExplanation(null); // a reset isn't a change worth explaining
  };

  useImperativeHandle(
    ref,
    () => ({
      async runChecks(checks) {
        const files = codeRef.current;
        apply(files); // bring the visible preview in line with what is being checked
        const results = await previewRef.current?.runChecks(checks, files);
        return results ?? checks.map(() => ({ passed: false, detail: "The preview isn't ready yet." }));
      },
      setFiles(files) {
        commit(files);
        apply(files);
      },
      getFiles: () => codeRef.current,
    }),
    [apply, commit],
  );

  const dirty = code.html !== applied.html || code.css !== applied.css;
  const tabLabel = (file: FileName) =>
    file === "html" ? "index.html" : mode === "tailwind" ? "tailwind.css" : "styles.css";

  const fileTabs = (
    <div role="tablist" aria-label="Code files" className="flex gap-0.5">
      {files.map((file) => (
        <button
          key={file}
          {...tabProps(file)}
          className={`whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-xs ${
            tab === file ? "bg-raised text-fg" : "text-muted hover:text-fg"
          }`}
        >
          {tabLabel(file)}
          {readOnly.includes(file) && <span className="ml-1.5 text-faint">read only</span>}
        </button>
      ))}
    </div>
  );

  const editorActions = (
    <>
      <label className="flex cursor-pointer items-center gap-1.5 px-1.5 text-xs text-muted">
        <input
          type="checkbox"
          checked={autoRun}
          onChange={(e) => setAutoRun(e.target.checked)}
          className="size-3.5 accent-indigo-500"
        />
        Auto-run
      </label>
      <button
        onClick={run}
        disabled={!dirty}
        title={onSubmit ? "Update the preview" : "Run (Ctrl or Cmd + Enter)"}
        className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-medium text-on-accent hover:bg-indigo-500 disabled:cursor-default disabled:bg-raised disabled:text-faint"
      >
        <Play size={12} aria-hidden />
        Run
      </button>
      <button
        onClick={reset}
        title="Reset the code"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-fg-2 hover:bg-raised hover:text-fg"
      >
        <RotateCcw size={12} aria-hidden />
        <span className="hidden @md:inline">Reset</span>
      </button>
    </>
  );

  const editorBody = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1" {...panelProps}>
        <Suspense
          fallback={
            <div className="grid h-full place-items-center bg-ink">
              <Spinner label="Loading editor" />
            </div>
          }
        >
          <CodeEditor
            key={tab}
            value={code[tab]}
            language={tab}
            readOnly={readOnly.includes(tab)}
            label={`${tabLabel(tab)} editor`}
            onChange={(value) => update(tab, value)}
            onRun={onSubmit ?? run}
          />
        </Suspense>
      </div>
      <p className="shrink-0 border-t border-edge px-3 py-1.5 text-xs text-faint">
        Tab indents. To move focus out of the editor, press Esc, then Tab.
      </p>
    </div>
  );

  const outputActions = (
    <>
      {explain && (
        <button
          onClick={() => setShowExplain((v) => !v)}
          aria-pressed={showExplain}
          title="Show or hide the explanation of your last change"
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs ${
            showExplain ? "bg-indigo-500/15 text-accent" : "text-muted hover:bg-raised hover:text-fg"
          }`}
        >
          <Sparkles size={12} aria-hidden />
          <span className="hidden @md:inline">Explain</span>
        </button>
      )}
      <PreviewWidthPicker value={previewWidth} onChange={setPreviewWidth} />
    </>
  );

  const outputBody = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1">
        <PreviewFrame ref={previewRef} bare width={previewWidth} html={applied.html} css={applied.css} mode={mode} canvas={canvas} />
      </div>
      {explain && showExplain && (
        <div tabIndex={0} className="pane-scroll max-h-[45%] shrink-0 border-t border-edge">
          <ExplainPanel embedded explanation={explanation} />
        </div>
      )}
    </div>
  );

  return (
    <Workspace
      layoutKey={layoutKey}
      panes={{
        learn: { body: learn, padded: true },
        editor: { body: editorBody, extra: fileTabs, actions: editorActions },
        output: { body: outputBody, actions: outputActions },
      }}
    />
  );
}
