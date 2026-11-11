import { indentWithTab } from "@codemirror/commands";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { Compartment, EditorState, type Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { basicSetup, EditorView } from "codemirror";
import { useEffect, useRef } from "react";
import { useTheme } from "@/store/useTheme";

interface Props {
  value: string;
  language: "html" | "css";
  onChange?: (value: string) => void;
  /** Cmd/Ctrl+Enter */
  onRun?: () => void;
  readOnly?: boolean;
  /** accessible name, e.g. "HTML editor" */
  label: string;
}

// Colors come from the app's CSS variables, so one theme definition serves both modes.
const appTheme = (dark: boolean) =>
  EditorView.theme(
    {
      "&": { height: "100%", fontSize: "13px", backgroundColor: "var(--c-ink)", color: "var(--c-fg)" },
      ".cm-scroller": { fontFamily: "var(--font-mono)", lineHeight: "1.7", overflow: "auto" },
      ".cm-content": { padding: "12px 0", caretColor: "var(--c-focus)" },
      ".cm-cursor": { borderLeftColor: "var(--c-focus)" },
      ".cm-gutters": { backgroundColor: "var(--c-ink)", color: "var(--c-faint)", border: "none" },
      ".cm-activeLine": { backgroundColor: "rgba(99, 102, 241, 0.08)" },
      ".cm-activeLineGutter": { backgroundColor: "rgba(99, 102, 241, 0.08)", color: "var(--c-muted)" },
      "&.cm-focused": { outline: "none" },
    },
    { dark },
  );

// Dark: One Dark colors for the code. Light: CodeMirror's default highlighting (from basicSetup).
const themeExtensions = (resolved: "light" | "dark"): Extension =>
  resolved === "dark" ? [oneDark, appTheme(true)] : appTheme(false);

export default function CodeEditor({ value, language, onChange, onRun, readOnly = false, label }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const themeSlot = useRef(new Compartment());
  const resolved = useTheme((state) => state.resolved);
  const resolvedRef = useRef(resolved);
  resolvedRef.current = resolved;

  // Latest callbacks, so the editor never needs rebuilding when they change.
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);
  useEffect(() => {
    onChangeRef.current = onChange;
    onRunRef.current = onRun;
  });

  // Build the editor. Rebuilds only if language, read-only state or label changes.
  useEffect(() => {
    if (!host.current) return;
    const editor = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          language === "html" ? html() : css(),
          themeSlot.current.of(themeExtensions(resolvedRef.current)),
          keymap.of([
            {
              key: "Mod-Enter",
              run: () => {
                onRunRef.current?.();
                return true;
              },
            },
            indentWithTab,
          ]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) onChangeRef.current?.(update.state.doc.toString());
          }),
          EditorView.contentAttributes.of({ "aria-label": label }),
          EditorState.readOnly.of(readOnly),
          EditorView.editable.of(!readOnly),
        ],
      }),
    });
    view.current = editor;
    return () => {
      editor.destroy();
      view.current = null;
    };
    // `value` is only the starting text; later changes are synced by the effect below.
  }, [language, readOnly, label]); // eslint-disable-line react-hooks/exhaustive-deps

  // Switch light/dark in place, keeping the cursor and undo history.
  useEffect(() => {
    view.current?.dispatch({ effects: themeSlot.current.reconfigure(themeExtensions(resolved)) });
  }, [resolved]);

  // Keep the editor in step when the parent replaces the code (e.g. Reset).
  useEffect(() => {
    const editor = view.current;
    if (editor && editor.state.doc.toString() !== value) {
      editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: value } });
    }
  }, [value]);

  return <div ref={host} className="h-full min-h-0 overflow-hidden" />;
}
