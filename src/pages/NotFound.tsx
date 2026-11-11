import { Link } from "react-router-dom";
import StatusMessage from "@/components/ui/StatusMessage";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <StatusMessage
      title="We can't find that page"
      action={
        <Link to="/" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500">
          Back to the dashboard
        </Link>
      }
    >
      The link may be old, or the lesson may have moved.
    </StatusMessage>
  );
}
