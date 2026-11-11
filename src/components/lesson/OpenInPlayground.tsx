import { useEffect, useRef } from "react";
import { useInRouterContext, useLocation, useNavigate } from "react-router-dom";
import { Code2 } from "@/components/ui/icons";
import { canOpenInPlayground, exampleId, seedFromCode, type PlaygroundOrigin } from "@/lib/playgroundSeed";

interface Props {
  language: string;
  code: string;
  /** markup for a CSS example, when the author wrote one. Otherwise it is built from the selectors. */
  html?: string;
}

/**
 * Opens a code example in the Playground, ready to edit, with the live result beside it. The Playground
 * can bring you back to this exact example, and this button scrolls to it and highlights it when you return.
 * It shows nothing for languages the Playground can't run, and nothing outside a router (for example in a test).
 */
export default function OpenInPlayground(props: Props) {
  const inRouter = useInRouterContext();
  if (!inRouter || !canOpenInPlayground(props.language)) return null;
  return <Button {...props} />;
}

function Button({ language, code, html }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const button = useRef<HTMLButtonElement>(null);
  const id = exampleId(language, code, html);

  // Coming back from the Playground: scroll to this example, highlight it for a moment, and focus its button.
  useEffect(() => {
    if ((location.state as { scrollToExample?: string } | null)?.scrollToExample !== id) return;
    const timer = window.setTimeout(() => {
      const figure = button.current?.closest("figure");
      button.current?.scrollIntoView({ block: "center" });
      button.current?.focus({ preventScroll: true });
      figure?.classList.add("ring-2", "ring-indigo-500");
      window.setTimeout(() => figure?.classList.remove("ring-2", "ring-indigo-500"), 1800);
      navigate(location.pathname + location.search, { replace: true, state: null }); // so a refresh doesn't scroll again
    }, 80);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = () => {
    const seed = seedFromCode(language, code, html);
    if (!seed) return;
    const from: PlaygroundOrigin = {
      path: location.pathname + location.search,
      exampleId: seed.id,
      label: document.querySelector("main h1")?.textContent?.trim() || "the lesson",
    };
    navigate("/playground", { state: { seed, from } });
  };

  return (
    <button
      ref={button}
      onClick={open}
      title="Open this example in the Playground, where you can edit it and see the result"
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-fg-2 hover:bg-raised hover:text-fg"
    >
      <Code2 size={14} aria-hidden />
      Open in Playground
    </button>
  );
}
