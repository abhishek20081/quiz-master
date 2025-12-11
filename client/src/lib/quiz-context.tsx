import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Question, QuizResult } from "@shared/schema";

type QuizState = "landing" | "set-selection" | "quiz" | "results";

interface QuizContextType {
  state: QuizState;
  playerName: string;
  selectedSet: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: { questionId: number; selectedAnswer: number; correctAnswer: number; pointsEarned: number }[];
  startTime: number | null;
  quizResult: QuizResult | null;
  
  setPlayerName: (name: string) => void;
  selectSet: (setId: string) => void;
  setQuestions: (questions: Question[]) => void;
  startQuiz: () => void;
  answerQuestion: (selectedAnswer: number, pointsEarned: number, correctAnswer: number) => void;
  nextQuestion: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
  goToSetSelection: () => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>("landing");
  const [playerName, setPlayerName] = useState("");
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; selectedAnswer: number; correctAnswer: number; pointsEarned: number }[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const selectSet = useCallback((setId: string) => {
    setSelectedSet(setId);
  }, []);

  const startQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setStartTime(Date.now());
    setState("quiz");
  }, []);

  const answerQuestion = useCallback((selectedAnswer: number, pointsEarned: number, correctAnswer: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer,
      pointsEarned,
    }]);
    setScore(prev => prev + pointsEarned);
  }, [questions, currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const finishQuiz = useCallback(() => {
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const correctAnswers = answers.filter(a => a.selectedAnswer === a.correctAnswer).length;
    
    setQuizResult({
      totalScore: score,
      correctAnswers,
      totalQuestions: questions.length,
      timeTaken,
      answers,
    });
    setState("results");
  }, [startTime, answers, score, questions.length]);

  const resetQuiz = useCallback(() => {
    setState("landing");
    setPlayerName("");
    setSelectedSet(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setStartTime(null);
    setQuizResult(null);
  }, []);

  const goToSetSelection = useCallback(() => {
    setState("set-selection");
    setSelectedSet(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setStartTime(null);
    setQuizResult(null);
  }, []);

  const handleSetPlayerName = useCallback((name: string) => {
    setPlayerName(name);
    setState("set-selection");
  }, []);

  return (
    <QuizContext.Provider
      value={{
        state,
        playerName,
        selectedSet,
        questions,
        currentQuestionIndex,
        score,
        answers,
        startTime,
        quizResult,
        setPlayerName: handleSetPlayerName,
        selectSet,
        setQuestions,
        startQuiz,
        answerQuestion,
        nextQuestion,
        finishQuiz,
        resetQuiz,
        goToSetSelection,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
