import { useLocation } from "react-router-dom";

/** Reads /:trackId/:topicId/:lessonId from the URL, from anywhere in the tree. */
export function useRouteIds() {
  const { pathname } = useLocation();
  const [trackId, topicId, lessonId] = pathname.split("/").filter(Boolean);
  return { trackId, topicId, lessonId };
}
