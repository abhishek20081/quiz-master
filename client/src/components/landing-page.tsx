import { useState } from "react";
import { useQuiz } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Trophy, Zap, Medal, Crown } from "lucide-react";

const AnimatedBackground = () => {
  const styles = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(20px); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }
    .animated-bg {
      position: fixed;
      inset: 0;
      background: linear-gradient(-45deg, #0f172a, #1e3a8a, #0c4a6e, #0f172a);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
      z-index: -1;
    }
    .orb-1 {
      position: absolute;
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(30, 58, 138, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      top: -150px; right: -100px;
      animation: float 8s ease-in-out infinite;
      filter: blur(40px);
    }
    .orb-2 {
      position: absolute;
      width: 250px; height: 250px;
      background: radial-gradient(circle, rgba(12, 74, 110, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      bottom: -100px; left: -50px;
      animation: float 10s ease-in-out infinite;
      filter: blur(40px);
      animation-delay: -2s;
    }
    .orb-3 {
      position: absolute;
      width: 200px; height: 200px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      top: 50%; left: 50%;
      animation: float 12s ease-in-out infinite;
      filter: blur(50px);
      animation-delay: -4s;
    }
    .grid-pattern {
      position: absolute;
      width: 100%; height: 100%;
      background-image: linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.5;
    }
  `;
  return (
    <>
      <style>{styles}</style>
      <div className="animated-bg">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
        <div className="grid-pattern"></div>
      </div>
    </>
  );
};

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
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 relative">
        <div className="absolute top-6 left-6 z-10">
          <div className="text-xs uppercase tracking-widest text-blue-300 font-bold opacity-80 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Quiz Master
          </div>
        </div>

        <div className="absolute top-6 right-6 z-10">
          <Button
            variant="outline"
            className="border-blue-400 text-blue-300 hover:bg-blue-950 hover:text-blue-200 transition-all"
            onClick={() => (window.location.hash = "#leaderboard")}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
        </div>

        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-slate-900/40 border border-blue-400/20 rounded-2xl shadow-2xl p-8 md:p-12 space-y-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
                  <Brain className="w-10 h-10 text-blue-400 relative z-10" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-tight">
                QuizMaster
              </h1>
              <p className="text-sm text-blue-200/70">
                Challenge yourself with timed quizzes and compete for glory!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-lg p-3 text-center hover:from-blue-500/20 transition-all">
                <Zap className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-blue-300">4</div>
                <div className="text-xs text-blue-200/50">Points</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-blue-400/20 rounded-lg p-3 text-center hover:from-cyan-500/20 transition-all">
                <Medal className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-cyan-300">-1</div>
                <div className="text-xs text-blue-200/50">Per 30s</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg p-3 text-center hover:from-purple-500/20 transition-all">
                <Trophy className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-300">20</div>
                <div className="text-xs text-blue-200/50">Questions</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-blue-300 mb-2 block">
                  Enter your name to begin
                </label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  className="bg-slate-800/50 border-blue-400/30 text-white placeholder-blue-300/40 focus:border-blue-400 focus:bg-slate-800 transition-all h-12 rounded-lg"
                  maxLength={50}
                />
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold h-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
              >
                Start Quiz
              </Button>
            </form>

            <div className="text-center text-xs text-blue-300/50 space-y-1 border-t border-blue-400/10 pt-4">
              <p>⚡ Test your knowledge at lightning speed</p>
              <p>🎯 Compete globally for the top rank</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
