import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LessonBody, { usesWorkspace } from "@/components/lesson/LessonBody";
import LessonFooter from "@/components/lesson/LessonFooter";
import LessonHeader from "@/components/lesson/LessonHeader";
import StatusMessage, { Spinner } from "@/components/ui/StatusMessage";
import { getTopic, getTrack, isTopicReady } from "@/content";
import type { LessonRef } from "@/engine/types";
import { lessonKey } from "@/lib/ids";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { useTopic } from "@/lib/useTopic";
import { useProgress } from "@/store/useProgress";
import NotFound from "./NotFound";

export default function LessonPage() {
  const { trackId = "", topicId = "", lessonId = "" } = useParams();
  const track = getTrack(trackId);
  const topic = getTopic(trackId, topicId);
  const state = useTopic(trackId, topic);

  const completed = useProgress((s) => s.progress.completed);
  const setLast = useProgress((s) => s.setLast);

  const lessons = state.status === "ready" ? state.lessons : [];
  const index = lessons.findIndex((l) => l.id === lessonId);
  const lesson = index >= 0 ? lessons[index] : undefined;
  useDocumentTitle(lesson ? `${lesson.title}, ${topic?.title ?? ""}` : topic?.title);

  // Remember where the learner is, for "Pick up where you left off".
  useEffect(() => {
    if (lesson && track) setLast({ trackId: track.id, topicId, lessonId: lesson.id });
  }, [lesson, track, topicId, setLast]);

  if (!track || !topic || !isTopicReady(topic)) return <NotFound />;
  if (state.status === "idle" || state.status === "loading") return <Spinner label="Loading lesson" />;
  if (state.status === "error") {
    return (
      <StatusMessage
        title="This lesson didn't load"
        action={
          <button
            onClick={state.retry}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-on-accent hover:bg-indigo-500"
          >
            Try again
          </button>
        }
      >
        Check your connection and try again.
      </StatusMessage>
    );
  }
  if (!lesson) return <NotFound />;

  const ref: LessonRef = { trackId: track.id, topicId, lessonId: lesson.id };
  const doneCount = lessons.filter(
    (l) => completed[lessonKey({ ...ref, lessonId: l.id })],
  ).length;

  return (
    <LessonBody
      lesson={lesson}
      lessonRef={ref}
      header={
        <LessonHeader
          lesson={lesson}
          trackId={track.id}
          trackTitle={track.title}
          topicId={topic.id}
          topicTitle={topic.title}
          level={topic.level}
          position={index + 1}
          total={lessons.length}
          doneCount={doneCount}
          compact={usesWorkspace(lesson)}
        />
      }
      footer={
        <LessonFooter
          lesson={lesson}
          lessonRef={ref}
          topicTitle={topic.title}
          prev={lessons[index - 1]}
          next={lessons[index + 1]}
          done={Boolean(completed[lessonKey(ref)])}
        />
      }
    />
  );
}
