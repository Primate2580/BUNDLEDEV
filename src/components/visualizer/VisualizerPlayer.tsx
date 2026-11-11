import { Check, Copy, RotateCcw, Sparkles } from "@/components/ui/icons";
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import PreviewFrame, { PreviewWidthPicker, type PreviewHandle, type PreviewWidth } from "@/components/code/PreviewFrame";
import ExplainPanel from "@/components/explain/ExplainPanel";
import { writeToClipboard } from "@/components/lesson/CodeBlock";
import ConceptCards from "@/components/lesson/ConceptCards";
import { Spinner } from "@/components/ui/StatusMessage";
import Workspace from "@/components/workspace/Workspace";
import type { ControlSpec, LessonRef, VisualizerLesson } from "@/engine/types";
import { mergeCss, setDeclaration } from "@/lib/css/cssRules";
import { explainCssChange } from "@/lib/explain/explain";
import type { Explanation } from "@/lib/explain/types";
import type { MeasureResult } from "@/lib/preview/measure";
import { buildAnnotation, requestsFor } from "@/lib/visualizer/annotations";
import { useProgress } from "@/store/useProgress";
import AnnotationOverlay from "./AnnotationOverlay";
import ControlsPanel from "./ControlsPanel";
import VisualizerChallenge from "./VisualizerChallenge";

const CodeEditor = lazy(() => import("@/components/code/CodeEditor"));

interface Props {
  lesson: VisualizerLesson;
  lessonRef: LessonRef;
  /** lesson title block and navigation, shown at the top and bottom of the Learn pane */
  header: ReactNode;
  footer: ReactNode;
}

/**
 * Concept, then an explorer where guided controls, quick presets and a code editor all drive
 * one piece of CSS, and the preview is annotated to show what that CSS is doing.
 */
export default function VisualizerPlayer({ lesson, lessonRef, header, footer }: Props) {
  const { stage, challenge } = lesson;
  const target = stage.target ?? ".container";
  const itemsSelector = stage.items ?? ".item";
  const preview = useRef<PreviewHandle>(null);
  const markComplete = useProgress((s) => s.markComplete);

  const [css, setCss] = useState(lesson.starter);
  const [selectedItem, setSelectedItem] = useState(1);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [measure, setMeasure] = useState<MeasureResult | null>(null);
  const [layoutTick, setLayoutTick] = useState(0);
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>("fit");
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  // the CSS the last explanation was written against
  const explainedCss = useRef(lesson.starter);

  const files = { html: stage.html, css: `${stage.baseCss}\n${css}` };
  const wantsAnnotations = stage.annotate !== "none" && showAnnotations;

  // Re-measure shortly after the CSS (or the preview size) changes.
  useEffect(() => {
    if (!wantsAnnotations) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const result = await preview.current?.measure(requestsFor(stage.annotate, target, itemsSelector), {
        html: stage.html,
        css: `${stage.baseCss}\n${css}`,
      });
      if (!cancelled && result) setMeasure(result);
    }, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [css, layoutTick, wantsAnnotations, stage, target, itemsSelector]);

  // Explain what changed once the learner pauses (a drag or typing is one change, not fifty).
  useEffect(() => {
    if (css === explainedCss.current) return;
    const timer = window.setTimeout(() => {
      setExplanation(explainCssChange(explainedCss.current, css));
      explainedCss.current = css;
    }, 500);
    return () => window.clearTimeout(timer);
  }, [css]);

  const annotation = useMemo(
    () => (wantsAnnotations ? buildAnnotation(stage.annotate, measure) : null),
    [wantsAnnotations, stage.annotate, measure],
  );

  const changeControl = (control: ControlSpec, selector: string, value: string) =>
    setCss((current) => setDeclaration(current, selector, control.property, value));

  const copy = async () => {
    await writeToClipboard(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const learn = (
    <div className="space-y-6">
      {header}
      <ConceptCards concept={lesson.concept} />

      <section aria-label="Controls" className="space-y-5">
        <div>
          <h2 className="text-sm font-semibold text-fg">Controls</h2>
          <p className="mt-1 text-xs leading-5 text-muted">They change the CSS in the editor, and typing in the CSS moves them.</p>
        </div>
        <ControlsPanel
          controls={lesson.controls}
          css={css}
          itemCount={stage.itemCount ?? 4}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
          onChange={changeControl}
        />

        {lesson.presets.length > 0 && (
          <div className="border-t border-edge pt-4">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-fg">
              <Sparkles size={14} aria-hidden className="text-accent" />
              Quick experiments
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {lesson.presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setCss((current) => mergeCss(current, preset.css))}
                  title={preset.description}
                  className="rounded-lg border border-edge px-3 py-1.5 text-xs text-fg-2 hover:border-indigo-500/60 hover:bg-raised hover:text-fg"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {challenge && (
        <VisualizerChallenge
          challenge={challenge}
          run={async () =>
            (await preview.current?.runChecks(challenge.checks, files)) ??
            challenge.checks.map(() => ({ passed: false, detail: "The preview isn't ready yet." }))
          }
          onPassed={() => markComplete(lessonRef)}
          onLoadSolution={setCss}
        />
      )}

      {footer}
    </div>
  );

  const editorActions = (
    <>
      <button
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-fg-2 hover:bg-raised hover:text-fg"
      >
        {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
        <span className="hidden @md:inline">{copied ? "Copied" : "Copy CSS"}</span>
        <span aria-live="polite" className="sr-only">
          {copied ? "CSS copied to clipboard" : ""}
        </span>
      </button>
      <button
        onClick={() => setCss(lesson.starter)}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-fg-2 hover:bg-raised hover:text-fg"
      >
        <RotateCcw size={13} aria-hidden />
        <span className="hidden @md:inline">Reset</span>
      </button>
    </>
  );

  const editorBody = (
    <Suspense
      fallback={
        <div className="grid h-full place-items-center bg-ink">
          <Spinner label="Loading editor" />
        </div>
      }
    >
      <CodeEditor value={css} language="css" onChange={setCss} label="CSS editor" />
    </Suspense>
  );

  const outputBody = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1">
        <PreviewFrame
          ref={preview}
          bare
          width={previewWidth}
          html={files.html}
          css={files.css}
          mode="css"
          canvas="dark"
          overlay={annotation && measure ? <AnnotationOverlay shapes={annotation.shapes} viewport={measure.viewport} /> : undefined}
          onLayoutChange={() => setLayoutTick((n) => n + 1)}
        />
      </div>

      {stage.annotate !== "none" && (
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-edge px-3 py-2">
          <ul aria-label="Legend" className="flex flex-wrap gap-x-4 gap-y-1">
            {(annotation?.legend ?? buildAnnotation(stage.annotate, null).legend).map((entry) => (
              <li key={entry.label} className="flex items-center gap-1.5 text-xs text-muted">
                <span aria-hidden className="size-2.5 rounded-sm" style={{ background: entry.color }} />
                {entry.label}
              </li>
            ))}
          </ul>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={showAnnotations}
              onChange={(e) => setShowAnnotations(e.target.checked)}
              className="size-3.5 accent-indigo-500"
            />
            Show annotations
          </label>
        </div>
      )}

      <div tabIndex={0} className="pane-scroll max-h-[40%] shrink-0 border-t border-edge">
        <ExplainPanel
          embedded
          explanation={explanation ?? explainCssChange(lesson.starter, lesson.starter)}
          idleText="Use a control, pick a quick experiment or edit the CSS, and this panel will explain what your change did."
        />
      </div>
    </div>
  );

  return (
    <Workspace
      layoutKey="visualizer"
      panes={{
        learn: { body: learn, padded: true },
        editor: { title: "CSS", body: editorBody, actions: editorActions },
        output: { body: outputBody, actions: <PreviewWidthPicker value={previewWidth} onChange={setPreviewWidth} /> },
      }}
    />
  );
}
