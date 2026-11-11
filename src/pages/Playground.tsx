import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CodeLab from "@/components/code/CodeLab";
import type { CodeFiles, PreviewMode } from "@/engine/types";
import type { PlaygroundOrigin, PlaygroundSeed } from "@/lib/playgroundSeed";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { useRovingTabs } from "@/lib/useRovingTabs";
import { usePlaygroundSessions } from "@/store/usePlaygroundSessions";
import { useUI } from "@/store/useUI";
import { ArrowLeft } from "@/components/ui/icons";

const STARTERS: Record<PreviewMode, CodeFiles> = {
  html: {
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, CSS Lab</h1>
    <p>Edit this page and watch the preview update.</p>
    <a href="#about">Jump to the About section</a>
    <h2 id="about">About</h2>
    <p>Anchors work here. Links to other sites are turned off in the preview.</p>
  </body>
</html>`,
    css: "",
  },
  css: {
    html: `<div class="card">
  <h1>Card title</h1>
  <p>Change the CSS and watch this card update.</p>
  <button>Learn more</button>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  background: #f1f5f9;
}

.card {
  max-width: 20rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 10px 30px rgb(15 23 42 / 0.12);
}

.card h1 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #0f172a;
}

.card p {
  margin: 0 0 1rem;
  color: #475569;
}

button {
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background: #4f46e5;
  color: white;
  font-weight: 600;
}`,
  },
  tailwind: {
    html: `<div class="grid min-h-screen place-items-center bg-slate-100">
  <div class="max-w-xs rounded-2xl bg-white p-6 shadow-xl">
    <h1 class="text-xl font-bold text-slate-900">Card title</h1>
    <p class="mt-2 text-slate-600">Change the classes and watch this card update.</p>
    <button class="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
      Learn more
    </button>
  </div>
</div>`,
    css: `/* Optional: add @theme tokens, @apply rules or plain CSS here. */
`,
  },
};

const MODES: { id: PreviewMode; label: string; note: string }[] = [
  { id: "html", label: "HTML", note: "Write a full page. Edit the document, and the preview reloads." },
  { id: "css", label: "CSS", note: "Style the markup. CSS changes apply live without a reload." },
  { id: "tailwind", label: "Tailwind", note: "Type utility classes in the HTML. Tailwind v4 runs inside the preview." },
];

export default function Playground() {
  useDocumentTitle("Playground");
  // A lesson example can open the Playground with its code already in the editor, and the way back to the lesson.
  const routeState = useLocation().state as { seed?: PlaygroundSeed; from?: PlaygroundOrigin } | null;
  const seed = routeState?.seed;
  const from = routeState?.from;
  const sessions = usePlaygroundSessions((state) => state.sessions);
  const remember = usePlaygroundSessions((state) => state.remember);
  // Opening the same example again picks up the learner's earlier edits.
  const [earlier] = useState(() => (seed ? sessions[seed.id] : undefined));
  const [mode, setMode] = useState<PreviewMode>(earlier?.mode ?? seed?.mode ?? "css");
  // Keep each mode's work when switching tabs.
  const [saved, setSaved] = useState<Record<PreviewMode, CodeFiles>>(() =>
    earlier ? earlier.saved : seed ? { ...STARTERS, [seed.mode]: { html: seed.html, css: seed.css } } : STARTERS,
  );
  useEffect(() => {
    if (seed) remember(seed.id, { mode, saved });
  }, [seed, mode, saved, remember]);

  // The header offers a button back to the lesson from anywhere in the Playground.
  const setBackLink = useUI((state) => state.setBackLink);
  useEffect(() => {
    setBackLink(from ?? null);
    return () => setBackLink(null);
  }, [from, setBackLink]);
  // What "Reset" goes back to: the example the learner opened, or the usual starter.
  const startFor = (m: PreviewMode): CodeFiles => (seed && seed.mode === m ? { html: seed.html, css: seed.css } : STARTERS[m]);

  const { tabProps, panelProps } = useRovingTabs(MODES.map((m) => m.id), mode, setMode, "playground");

  // Switching mode rebuilds the workspace, so hand keyboard focus to the new tab afterwards.
  const switched = useRef(false);
  useEffect(() => {
    if (!switched.current) {
      switched.current = true;
      return;
    }
    const active = document.activeElement;
    if (!active || active === document.body || !active.isConnected) {
      document.getElementById(`playground-tab-${mode}`)?.focus();
    }
  }, [mode]);

  const learn = (
    <div className="space-y-5">
      {from && (
        <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 p-3 text-sm leading-6 text-fg-2">
          <p>
            You opened this example from <strong className="text-fg">{from.label}</strong>. Change it as much as you like.
            {earlier && " Your earlier edits are here, and Reset goes back to the original example."}
          </p>
          <Link
            to={from.path}
            state={{ scrollToExample: from.exampleId }}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 font-medium text-on-accent hover:bg-indigo-500"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to the lesson
          </Link>
        </div>
      )}

      <header>
        <h1 className="text-2xl font-bold tracking-tight text-fg">Playground</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Try anything, no lesson needed. Your code runs in a sandboxed preview, so nothing you type can
          break the app.
        </p>
      </header>

      <div role="tablist" aria-label="Playground mode" className="flex gap-1 rounded-xl border border-edge bg-ink p-1">
        {MODES.map(({ id, label }) => (
          <button
            key={id}
            {...tabProps(id)}
            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium ${
              mode === id ? "bg-indigo-600 text-on-accent" : "text-fg-2 hover:bg-raised"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div {...panelProps}>
        <p className="text-sm leading-6 text-muted">{MODES.find((m) => m.id === mode)?.note}</p>
      </div>
    </div>
  );

  return (
    <CodeLab
      key={mode}
      layoutKey="playground"
      mode={mode}
      starter={startFor(mode)}
      initial={saved[mode]}
      onChange={(files) => setSaved((all) => ({ ...all, [mode]: files }))}
      files={mode === "html" ? ["html", "css"] : mode === "css" ? ["css", "html"] : ["html", "css"]}
      learn={learn}
      explain
    />
  );
}
