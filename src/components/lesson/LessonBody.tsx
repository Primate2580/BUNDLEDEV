import type { ReactNode } from "react";
import LabPlayer from "@/components/lab/LabPlayer";
import PredictPlayer from "@/components/predict/PredictPlayer";
import QuizPlayer from "@/components/quiz/QuizPlayer";
import VisualizerPlayer from "@/components/visualizer/VisualizerPlayer";
import WorkshopPlayer from "@/components/workshop/WorkshopPlayer";
import type { Lesson, LessonKind, LessonRef } from "@/engine/types";
import { assertNever } from "@/lib/assertNever";
import ConceptCards from "./ConceptCards";
import ContentBlocks from "./ContentBlocks";

/** Lessons that work in the pane workspace: Learn on the left, Editor and Output on the right. */
const WORKSPACE_KINDS: readonly LessonKind[] = ["lab", "debug", "workshop", "visualizer", "predict"];
export const usesWorkspace = (lesson: Lesson) => WORKSPACE_KINDS.includes(lesson.kind);

interface Props {
  lesson: Lesson;
  lessonRef: LessonRef;
  /** the lesson title block. Compact when the lesson shows in the Learn pane. */
  header: ReactNode;
  /** completion and previous/next navigation */
  footer: ReactNode;
}

/**
 * Chooses how to render a lesson from its `kind`. The exhaustive switch makes the
 * compiler flag any new kind that isn't handled here.
 *
 * Reading lessons (learn, review, quiz) scroll in the page's main area. The others fill the
 * workspace, and put the header and footer at the top and bottom of the Learn pane.
 */
export default function LessonBody({ lesson, lessonRef, header, footer }: Props) {
  const reading = (body: ReactNode) => (
    <article className="space-y-8">
      {header}
      {body}
      {footer}
    </article>
  );

  switch (lesson.kind) {
    case "learn":
      return reading(
        <div className="space-y-8">
          <ConceptCards concept={lesson.concept} />
          <ContentBlocks blocks={lesson.body} />
        </div>,
      );
    case "review":
      return reading(<ContentBlocks blocks={lesson.body} />);
    case "quiz":
      return reading(<QuizPlayer key={lesson.id} lesson={lesson} lessonRef={lessonRef} />);
    case "lab":
    case "debug":
      return <LabPlayer key={lesson.id} lesson={lesson} lessonRef={lessonRef} header={header} footer={footer} />;
    case "workshop":
      return <WorkshopPlayer key={lesson.id} lesson={lesson} lessonRef={lessonRef} header={header} footer={footer} />;
    case "visualizer":
      return <VisualizerPlayer key={lesson.id} lesson={lesson} lessonRef={lessonRef} header={header} footer={footer} />;
    case "predict":
      return <PredictPlayer key={lesson.id} lesson={lesson} lessonRef={lessonRef} header={header} footer={footer} />;
    default:
      return assertNever(lesson);
  }
}
