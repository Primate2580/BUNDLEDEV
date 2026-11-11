import { create } from "zustand";
import type { CodeFiles, PreviewMode } from "@/engine/types";

/** What a learner has done to one lesson example in the Playground, so opening it again picks up where they left off. */
export interface PlaygroundSession {
  mode: PreviewMode;
  saved: Record<PreviewMode, CodeFiles>;
}

interface SessionsState {
  sessions: Record<string, PlaygroundSession>;
  remember: (id: string, session: PlaygroundSession) => void;
}

/** Kept for the visit (not saved to disk): going back to the lesson and returning must not lose edits. */
export const usePlaygroundSessions = create<SessionsState>((set) => ({
  sessions: {},
  remember: (id, session) => set((state) => ({ sessions: { ...state.sessions, [id]: session } })),
}));
