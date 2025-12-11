import { useState, useEffect, useCallback } from "react";
import { useQuiz } from "@/lib/quiz-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy, X, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const POINTS_PER_CORRECT = 4;
const DEDUCTION_INTERVAL_SECONDS = 30;

export function QuizInterface() {
  const {
    questions,
    currentQuestionIndex,
    score,
    answerQuestion,
    nextQuestion,
    finishQuiz,
    resetQuiz,
  } = useQuiz();

  const [questionTimer, setQuestionTimer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastPointsEarned, setLastPointsEarned] = useState<number | null>(null);
  const [isTimerWarning, setIsTimerWarning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    setQuestionTimer(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setLastPointsEarned(null);
    setIsTimerWarning(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (showResult) return;

    const interval = setInterval(() => {
      setQuestionTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showResult]);

  useEffect(() => {
    const deductions = Math.floor(questionTimer / DEDUCTION_INTERVAL_SECONDS);
    setIsTimerWarning(deductions > 0);
  }, [questionTimer]);

  const calculatePoints = useCallback(() => {
    const deductions = Math.floor(questionTimer / DEDUCTION_INTERVAL_SECONDS);
    return Math.max(0, POINTS_PER_CORRECT - deductions);
  }, [questionTimer]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const points = isCorrect ? calculatePoints() : 0;
    setLastPointsEarned(points);

    answerQuestion(answerIndex, points, currentQuestion.correctAnswer);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      nextQuestion();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentPoints = calculatePoints();
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const answerLabels = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 h-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-full max-w-4xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Question</span>
            <span className="text-xl font-bold" data-testid="text-question-progress">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className={cn("w-5 h-5", isTimerWarning ? "text-destructive animate-pulse" : "text-muted-foreground")} />
            <span className={cn("text-2xl font-bold tabular-nums", isTimerWarning && "text-destructive")} data-testid="text-timer">
              {formatTime(questionTimer)}
            </span>
            {!showResult && (
              <Badge variant="secondary" className={cn(isTimerWarning && "bg-destructive/10 text-destructive")}>
                +{currentPoints} pts
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-chart-4" />
            <span className="text-2xl font-bold" data-testid="text-score">
              {score}
            </span>
            {lastPointsEarned !== null && showResult && (
              <Badge 
                variant={lastPointsEarned > 0 ? "default" : "destructive"} 
                className={cn(
                  "transition-all",
                  lastPointsEarned > 0 ? "bg-chart-2 text-white" : ""
                )}
              >
                {lastPointsEarned > 0 ? `+${lastPointsEarned}` : "+0"}
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={resetQuiz}
            className="shrink-0"
            data-testid="button-exit-quiz"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <Progress value={progress} className="h-1 rounded-none" />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-6">
          <Card className="border-card-border">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Badge variant="secondary" className="shrink-0">
                  Q{currentQuestionIndex + 1}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed" data-testid="text-question">
                  {currentQuestion.question}
                </h2>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={cn(
                    "justify-start gap-3 text-left whitespace-normal h-auto",
                    showCorrect && "border-chart-2 bg-chart-2/10",
                    showIncorrect && "border-destructive bg-destructive/10",
                    showResult && !showCorrect && !showIncorrect && "opacity-60"
                  )}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  data-testid={`button-answer-${index}`}
                >
                  <Badge
                    variant={showCorrect ? "default" : showIncorrect ? "destructive" : "secondary"}
                    className={cn(
                      "shrink-0",
                      showCorrect && "bg-chart-2"
                    )}
                  >
                    {answerLabels[index]}
                  </Badge>
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-chart-2 shrink-0" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                </Button>
              );
            })}
          </div>

          {showResult && (
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={handleNext}
                data-testid="button-next-question"
              >
                {isLastQuestion ? "View Results" : "Next Question"}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
