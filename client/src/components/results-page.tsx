import React from "react";
import { useQuiz } from "@/lib/quiz-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export function ResultsPage() {
  const { playerName, quizResult, resetQuiz, goToSetSelection, questions } =
    useQuiz();

  if (!quizResult) return null;

  const { totalScore, correctAnswers, totalQuestions, timeTaken, answers } =
    quizResult; // Save score to leaderboard
  const scorePercentage = (correctAnswers / totalQuestions) * 100;
  const maxPossibleScore = totalQuestions * 4;
  const correctPercentage = Math.round(scorePercentage);

  React.useEffect(() => {
    if (playerName && quizResult) {
      const { setId } = quizResult;
      const score = totalScore;
      fetch(`/api/leaderboard/${setId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, score }),
      }).catch((err) =>
        console.error("Failed to save leaderboard entry:", err),
      );
    }
  }, [playerName, quizResult, totalScore]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceMessage = () => {
    if (scorePercentage >= 90) return "Outstanding!";
    if (scorePercentage >= 75) return "Great job!";
    if (scorePercentage >= 50) return "Good effort!";
    if (scorePercentage >= 25) return "Keep practicing!";
    return "Better luck next time!";
  };

  const getPerformanceColor = () => {
    if (scorePercentage >= 75) return "text-chart-2";
    if (scorePercentage >= 50) return "text-chart-4";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-chart-4/10">
              <Trophy className="w-12 h-12 text-chart-4" />
            </div>
          </div>
          <p
            className="text-lg text-muted-foreground"
            data-testid="text-congratulations"
          >
            Congratulations,{" "}
            <span className="font-semibold text-foreground">{playerName}</span>!
          </p>
          <h1
            className={`text-6xl md:text-8xl font-bold ${getPerformanceColor()}`}
            data-testid="text-final-score"
          >
            {totalScore}
          </h1>
          <p className="text-xl text-muted-foreground">
            out of {maxPossibleScore} points
          </p>
          <p
            className={`text-2xl font-semibold ${getPerformanceColor()}`}
            data-testid="text-performance-message"
          >
            {getPerformanceMessage()}
          </p>
        </div>

        <Card className="border-card-border">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-8 h-8 text-chart-2" />
                </div>
                <p
                  className="text-3xl font-bold"
                  data-testid="text-correct-count"
                >
                  {correctAnswers}/{totalQuestions}
                </p>
                <p className="text-sm text-muted-foreground">Correct Answers</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Clock className="w-8 h-8 text-chart-1" />
                </div>
                <p className="text-3xl font-bold" data-testid="text-time-taken">
                  {formatTime(timeTaken)}
                </p>
                <p className="text-sm text-muted-foreground">Time Taken</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-medium">{correctPercentage}%</span>
              </div>
              <Progress value={correctPercentage} className="h-3" />
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Question Breakdown</h3>
              <div className="grid grid-cols-5 gap-2">
                {answers.map((answer, index) => {
                  const isCorrect =
                    answer.selectedAnswer === answer.correctAnswer;
                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded-md flex items-center justify-center text-sm font-medium ${
                        isCorrect
                          ? "bg-chart-2/20 text-chart-2"
                          : "bg-destructive/20 text-destructive"
                      }`}
                      data-testid={`answer-result-${index}`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={goToSetSelection}
            className="gap-2"
            data-testid="button-try-other-set"
          >
            <ArrowRight className="w-4 h-4" />
            Try Other Set
          </Button>
          <Button
            size="lg"
            onClick={resetQuiz}
            className="gap-2"
            data-testid="button-play-again"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
