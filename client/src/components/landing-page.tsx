import React from "react";
import { useQuiz } from "@/lib/quiz-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import "./landing-page.css";

export const LandingPage: React.FC = () => {
  const { setPlayerName } = useQuiz();
  const [name, setName] = React.useState("");

  const handleStartQuiz = () => {
    if (name.trim()) {
      setPlayerName(name);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleStartQuiz();
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0e27 0%, #1a2a5e 25%, #0f1a3a 50%, #1a1f3a 75%, #0a0e27 100%)",
      }}
    >
      {/* Animated Blue Tech Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tech-grid"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="60"
                height="60"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle cx="30" cy="30" r="1.5" fill="#00d4ff" opacity="0.6" />
              <circle cx="0" cy="0" r="1" fill="#0099ff" opacity="0.4" />
              <circle cx="60" cy="60" r="1" fill="#0099ff" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
        </svg>
      </div>

      {/* Animated Blue Blobs Background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      {/* Floating Tech Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 border border-cyan-500 rounded-lg opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 left-40 w-16 h-16 border-2 border-blue-400 rounded-full opacity-15 animate-pulse animation-delay-2000"></div>

      {/* School Header */}
      <div className="absolute top-0 left-0 right-0 p-4 text-center bg-gradient-to-b from-black via-blue-900/20 to-transparent">
        <h1
          className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-wider mb-2 animate-pulse"
          style={{ textShadow: "0 0 30px rgba(0,212,255,0.5)" }}
        >
          ✨ SKY HEIGHTS ACADEMY ✨
        </h1>
        <div className="h-1 w-40 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 pt-24">
        <Card className="w-full max-w-md shadow-2xl border-cyan-500/50 bg-slate-950 bg-slate-950 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 shadow-lg shadow-cyan-500/30">
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
              Quiz Master
            </CardTitle>
            <CardDescription className="text-gray-300">
              Test your knowledge with our Python quiz!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-cyan-300"
              >
                Enter Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-slate-950 border-cyan-500/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/50 focus:ring-2 transition-all"
                autoFocus
              />
            </div>
            <Button
              onClick={handleStartQuiz}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-6 text-lg font-semibold border border-cyan-300/30 shadow-lg shadow-cyan-500/50 transition-all hover:shadow-cyan-500/80"
            >
              Start Quiz
            </Button>
            <div className="text-sm text-gray-400 space-y-2 border-t border-cyan-500/20 pt-4">
              <p className="font-semibold text-cyan-300">About This Quiz:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>20 Python questions</li>
                <li>Multiple choice format</li>
                <li>Instant feedback</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits Section with Animations */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-blue-950/50 to-transparent py-4 overflow-hidden border-t border-cyan-500/30">
        <div className="credits-marquee">
          <div className="credits-content">
            <span className="credit-item blink">
              ✨ Created by: Abhishek ✨
            </span>
            <span className="credit-separator">•</span>
            <span className="credit-item blink">Arnav</span>
            <span className="credit-separator">•</span>
            <span className="credit-item blink">Modi</span>
            <span className="credit-separator">•</span>
            <span className="credit-item blink">✨ SKY HEIGHTS ACADEMY ✨</span>
            <span className="credit-separator">•</span>
            <span className="credit-item blink">
              ✨ Created by: Abhishek ✨
            </span>
            <span className="credit-separator">•</span>
            <span className="credit-item blink">Arnav</span>
            <span className="credit-separator">•</span>
            <span className="credit-item blink">Modi</span>
            <span className="credit-separator">•</span>
            <span className="credit-item blink">✨ SKY HEIGHTS ACADEMY ✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};
