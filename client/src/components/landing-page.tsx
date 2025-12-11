import { useState } from "react";
import { useQuiz } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Trophy, Clock } from "lucide-react";

export function LandingPage() {
  const { setPlayerName } = useQuiz();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter your name");
      return;
    }
    if (trimmedName.length > 50) {
      setError("Name is too long");
      return;
    }
    setPlayerName(trimmedName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Brain className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-title">
            QuizMaster
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-subtitle">
            Challenge yourself with timed quizzes and compete for the highest score!
          </p>
        </div>

        <Card className="border-card-border">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Zap className="w-6 h-6 text-chart-4" />
                </div>
                <p className="text-sm text-muted-foreground">4 Points</p>
                <p className="text-xs text-muted-foreground">Per Correct</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Clock className="w-6 h-6 text-chart-5" />
                </div>
                <p className="text-sm text-muted-foreground">-1 Point</p>
                <p className="text-xs text-muted-foreground">Every 30s</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Trophy className="w-6 h-6 text-chart-2" />
                </div>
                <p className="text-sm text-muted-foreground">20 Questions</p>
                <p className="text-xs text-muted-foreground">Per Set</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="player-name" className="text-sm font-medium">
                  Enter your name to begin
                </label>
                <Input
                  id="player-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  data-testid="input-player-name"
                  autoComplete="off"
                />
                {error && (
                  <p className="text-sm text-destructive" data-testid="text-error">
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                data-testid="button-start-quiz"
              >
                Start Quiz
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
