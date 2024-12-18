import { create } from "zustand";

import { questions } from "../data";

export const NUM_QUESTIONS = questions.length;

type Status = "onboarding" | "started" | "checked-correct" | "checked-wrong" | "ended";

interface QuizState {
  status: Status;
  progress: number;
  score: number;
  selected: string | null;
  falsesInARow: number;

  actions: {
    nextQuestion: () => void;
    incrementScoreBy: (score: number) => void;
    checkAnswer: () => void;

    resetFalsesInARow: () => void;

    updateStatus: (status: Status) => void;
    updateProgress: (progress: number) => void;
    updateSelected: (option: string) => void;
    resetState: () => void;
  };
}

const useQuizStore = create<QuizState>()((set) => ({
  status: "onboarding",
  progress: -1,
  score: 0,
  falsesInARow: 0,
  selected: null,
  actions: {
    updateStatus: (status) =>
      set((_) => {
        if (status === "started") return { status, selected: null };
        return { status };
      }),

    updateProgress: (progress) =>
      set((_) => ({
        progress,
      })),

    checkAnswer: () =>
      set((state) => {
        if (state.selected !== questions[state.progress].correctAnswer) {
          return {
            status: "checked-wrong",
            falsesInARow: state.falsesInARow + 1,
          };
        }

        return {
          status: "checked-correct",
          score: state.score + 1,
          falsesInARow: 0,
        };
      }),

    resetFalsesInARow: () =>
      set((_) => ({
        falsesInARow: 0,
      })),

    incrementScoreBy: (score) =>
      set((state) => ({
        score: state.score + score,
      })),

    nextQuestion: () =>
      set((state) => {
        if (state.progress === NUM_QUESTIONS) return {};
        return {
          progress: state.progress + 1,
          status: "started",
          selected: null,
        };
      }),

    updateSelected: (option) =>
      set((_) => ({
        selected: option,
      })),

    resetState: () =>
      set((_) => ({
        status: "onboarding",
        progress: -1,
        score: 0,
        falsesInARow: 0,
        selected: null,
      })),
  },
}));

export const useQuizStatus = () => useQuizStore((state) => state.status);

export const useQuizStats = () =>
  useQuizStore((state) => {
    return {
      falsesInARow: state.falsesInARow,
      resetFalsesInARow: state.actions.resetFalsesInARow,
    };
  });

export const useQuizProgress = () => useQuizStore((state) => state.progress);

export const useQuizScore = () => useQuizStore((state) => state.score);

export const useQuizSelected = () => useQuizStore((state) => state.selected);

export const useQuizActions = () => useQuizStore((state) => state.actions);
