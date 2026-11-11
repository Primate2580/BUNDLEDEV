import { useEffect } from "react";

/** Sets the browser tab title, which screen readers announce when the page changes. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · CSS Lab` : "CSS Lab";
  }, [title]);
}
