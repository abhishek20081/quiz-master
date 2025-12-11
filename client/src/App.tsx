import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuizProvider, useQuiz } from "@/lib/quiz-context";
import { LandingPage } from "@/components/landing-page";
import { SetSelection } from "@/components/set-selection";
import { QuizInterface } from "@/components/quiz-interface";
import { ResultsPage } from "@/components/results-page";

function QuizApp() {
  const { state } = useQuiz();

  switch (state) {
    case "landing":
      return <LandingPage />;
    case "set-selection":
      return <SetSelection />;
    case "quiz":
      return <QuizInterface />;
    case "results":
      return <ResultsPage />;
    default:
      return <LandingPage />;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <QuizProvider>
          <QuizApp />
        </QuizProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
