import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import LessonPage from "@/pages/LessonPage";
import NotFound from "@/pages/NotFound";
import Playground from "@/pages/Playground";
import TopicPage from "@/pages/TopicPage";
import TrackPage from "@/pages/TrackPage";
import VisualizerHub from "@/pages/VisualizerHub";
import { systemQuery } from "@/lib/theme";
import { useProgress } from "@/store/useProgress";
import { useTheme } from "@/store/useTheme";

export default function App() {
  const load = useProgress((s) => s.load);

  // Read saved progress once, on startup.
  useEffect(() => {
    void load();
  }, [load]);

  // If the learner chose "System", follow the operating system's light/dark changes live.
  useEffect(() => {
    const query = systemQuery();
    const onChange = () => useTheme.getState().syncSystem();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="playground" element={<Playground />} />
        <Route path="visualizer" element={<VisualizerHub />} />
        <Route path=":trackId" element={<TrackPage />} />
        <Route path=":trackId/:topicId" element={<TopicPage />} />
        <Route path=":trackId/:topicId/:lessonId" element={<LessonPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
