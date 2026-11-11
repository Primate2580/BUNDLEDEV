import { Check, Copy } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";
import OpenInPlayground from "./OpenInPlayground";

interface Props {
  code: string;
  language: string;
  caption?: string;
  /** offer to open this example in the Playground (lesson examples; not code the learner is told to type) */
  playground?: boolean;
  /** markup to go with a CSS example in the Playground */
  html?: string;
}

export async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Older browsers or blocked clipboard: fall back to a hidden textarea.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

export default function CodeBlock({ code, language, caption, playground = false, html }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    await writeToClipboard(code);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <figure className="overflow-hidden rounded-xl border border-edge bg-ink">
      <div className="flex items-center justify-between border-b border-edge bg-panel px-4 py-2">
        <figcaption className="text-xs text-muted">
          <span className="font-mono text-accent">{language}</span>
          {caption && <span className="ml-2">{caption}</span>}
        </figcaption>
        <div className="flex items-center gap-1">
          {playground && <OpenInPlayground language={language} code={code} html={html} />}
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-fg-2 hover:bg-raised hover:text-fg"
        >
          {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          {copied ? "Copied" : "Copy"}
          <span aria-live="polite" className="sr-only">
            {copied ? "Code copied to clipboard" : ""}
          </span>
        </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-accent">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}
