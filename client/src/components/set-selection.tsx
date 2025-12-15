import { useQuiz } from "@/lib/quiz-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import type { Question } from "@shared/schema";

interface QuizSetResponse {
  id: string;
  name: string;
  questions: Question[];
}

export function SetSelection() {
  const { playerName, selectSet, setQuestions, startQuiz, resetQuiz } =
    useQuiz();

  const { data: setA, isLoading: loadingA } = useQuery<QuizSetResponse>({
    queryKey: ["/api/quiz/set/A"],
  });

  const { data: setB, isLoading: loadingB } = useQuery<QuizSetResponse>({
    queryKey: ["/api/quiz/set/B"],
  });

  const handleSelectSet = (set: QuizSetResponse) => {
    selectSet(set.id);
    setQuestions(set.questions);
    startQuiz();
  };

  const isLoading = loadingA || loadingB;

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gradient-to-br from-indigo-500 to-purple-600">
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/video/video.mp4" type="video/mp4" />
      </video>
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={resetQuiz}
          className="gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center" style={{ position: 'relative', zIndex: 10 }}>
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">
              Welcome,{" "}
              <span
                className="font-semibold text-foreground"
                data-testid="text-player-name"
              >
                {playerName}
              </span>
              !
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              data-testid="text-choose-set"
            >
              Choose Your Challenge
            </h2>
            <p className="text-muted-foreground">
              Select a question set to begin your quiz
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className="min-h-64 cursor-pointer transition-all duration-200 border-card-border hover-elevate active-elevate-2"
                onClick={() => setA && handleSelectSet(setA)}
                data-testid="card-set-a"
              >
                <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-chart-1/10">
                    <BookOpen className="w-10 h-10 text-chart-1" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold mb-2">SET A</h3>
                    <p className="text-muted-foreground">10 Questions</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    python fundamental-A
                  </p>
                </CardContent>
              </Card>

              <Card
                className="min-h-64 cursor-pointer transition-all duration-200 border-card-border hover-elevate active-elevate-2"
                onClick={() => setB && handleSelectSet(setB)}
                data-testid="card-set-b"
              >
                <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-chart-3/10">
                    <BookOpen className="w-10 h-10 text-chart-3" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold mb-2">SET B</h3>
                    <p className="text-muted-foreground">10 Questions</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    python fundamental-B
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
