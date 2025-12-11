import { z } from "zod";

// Quiz Question type
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-3)
}

// Quiz Set type
export interface QuizSet {
  id: string;
  name: string;
  questions: Question[];
}

// Quiz Session for tracking user progress
export interface QuizSession {
  id: string;
  playerName: string;
  setId: string;
  currentQuestionIndex: number;
  answers: { questionId: number; selectedAnswer: number; timeSpent: number; pointsEarned: number }[];
  startTime: number;
  totalScore: number;
  completed: boolean;
}

// Validation schemas
export const playerNameSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
});

export type PlayerNameInput = z.infer<typeof playerNameSchema>;

export const answerSubmissionSchema = z.object({
  questionId: z.number(),
  selectedAnswer: z.number().min(0).max(3),
  timeSpent: z.number().min(0),
});

export type AnswerSubmission = z.infer<typeof answerSubmissionSchema>;

// API Response types
export interface QuizResult {
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  answers: { questionId: number; selectedAnswer: number; correctAnswer: number; pointsEarned: number }[];
}
