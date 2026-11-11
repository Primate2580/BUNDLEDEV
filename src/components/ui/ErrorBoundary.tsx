import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import StatusMessage from "./StatusMessage";

interface Props {
  children: ReactNode;
}

interface State {
  failed: boolean;
}

/**
 * Catches a crash (or a chunk that failed to download) in one page, so the app shell, sidebar and
 * the learner's saved progress stay usable. Remounted per route via `key`, so navigating away recovers.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("CSS Lab page error:", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <StatusMessage
        title="Something went wrong on this page"
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => this.setState({ failed: false })}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500"
            >
              Try again
            </button>
            <Link to="/" className="rounded-lg border border-edge px-4 py-2 text-sm text-fg-2 hover:bg-raised hover:text-fg">
              Back to the dashboard
            </Link>
          </div>
        }
      >
        Part of this page didn't load or hit a problem. Your progress is saved. If it keeps happening, check your
        connection and reload.
      </StatusMessage>
    );
  }
}
