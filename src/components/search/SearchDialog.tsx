import { Search } from "@/components/ui/icons";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tracks } from "@/content";
import type { TrackId } from "@/engine/types";
import { lessonPath, topicPath } from "@/lib/ids";
import { search, type SearchResult } from "@/lib/search";
import { useLessonIndex } from "@/lib/useLessonIndex";
import { useProgress } from "@/store/useProgress";
import { useUI } from "@/store/useUI";
import SearchResults from "./SearchResults";

/**
 * Search across every topic and lesson. A native <dialog> gives a real focus trap, a dimmed backdrop and
 * Esc-to-close. The input is a combobox: arrows move through results, Enter opens one.
 */
export default function SearchDialog() {
  const { searchOpen, closeSearch } = useUI();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const listId = useId();
  const completed = useProgress((s) => s.progress.completed);
  const { status, index, retry } = useLessonIndex(searchOpen);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => search(query, index, tracks), [query, index]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (searchOpen && !element.open) {
      setQuery("");
      setActive(0);
      element.showModal();
      input.current?.focus();
    } else if (!searchOpen && element.open) {
      element.close();
    }
  }, [searchOpen]);

  useEffect(() => setActive(0), [query]);

  const choose = (result: SearchResult) => {
    navigate(
      result.type === "lesson"
        ? lessonPath({ trackId: result.trackId as TrackId, topicId: result.topicId, lessonId: result.lessonId! })
        : topicPath(result.trackId, result.topicId),
    );
    closeSearch();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(results[active]);
    }
  };

  const hasQuery = query.trim().length > 0;
  const message =
    status === "loading" && hasQuery
      ? "Loading the lesson list…"
      : status === "error"
        ? "Search couldn't load."
        : !hasQuery
          ? ""
          : results.length === 0
            ? `No matches for "${query.trim()}".`
            : `${results.length} result${results.length === 1 ? "" : "s"}`;

  return (
    <dialog
      ref={dialog}
      aria-label="Search"
      onClose={closeSearch}
      onClick={(event) => event.target === dialog.current && closeSearch()}
      className="m-0 mx-auto mt-[12vh] w-[min(40rem,calc(100vw-2rem))] rounded-2xl border border-edge bg-panel p-0 text-fg shadow-2xl backdrop:bg-black/60"
    >
      {searchOpen && (
        <div>
          <div className="flex items-center gap-3 border-b border-edge px-4">
            <Search size={18} aria-hidden className="shrink-0 text-muted" />
            <input
              ref={input}
              role="combobox"
              aria-label="Search lessons and topics"
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-activedescendant={results[active] ? `${listId}-opt-${active}` : undefined}
              aria-autocomplete="list"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search lessons, for example flexbox, quiz or alt text"
              className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-faint"
            />
            <kbd className="hidden shrink-0 rounded border border-edge px-1.5 py-0.5 text-xs text-faint sm:block">Esc</kbd>
          </div>

          <p role="status" className="px-5 pt-3 text-xs text-muted empty:hidden">
            {message}
            {status === "error" && (
              <button onClick={retry} className="ml-2 underline hover:text-fg">
                Try again
              </button>
            )}
          </p>

          {hasQuery && results.length > 0 && (
            <SearchResults results={results} activeIndex={active} completed={completed} listId={listId} onHover={setActive} onChoose={choose} />
          )}

          {!hasQuery && (
            <div className="p-4 pt-2">
              <p className="px-1 pb-2 text-sm text-muted">Type to search every topic and lesson. Or jump straight to:</p>
              <ul className="flex flex-wrap gap-2">
                {[
                  { to: "/", label: "Dashboard" },
                  ...tracks.map((t) => ({ to: `/${t.id}`, label: `${t.title} roadmap` })),
                  { to: "/playground", label: "Playground" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={closeSearch}
                      className="inline-block rounded-lg border border-edge px-3 py-1.5 text-sm text-fg-2 hover:bg-raised hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="border-t border-edge px-5 py-2.5 text-xs text-faint">
            Up and down arrows to move, Enter to open, Esc to close.
          </p>
        </div>
      )}
    </dialog>
  );
}
