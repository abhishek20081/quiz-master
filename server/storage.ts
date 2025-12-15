import type { Question, QuizSet } from "@shared/schema";

const setAQuestions: Question[] = [
  {
    id: "1",
    question: "Python was developed by:",
    options: [
      "James Gosling",
      "Guido van Rossum",
      "Dennis Ritchie",
      "Tim Berners-Lee",
    ],
    correctAnswer: 1,
  },
  {
    id: "2",
    question: "Python was released in the year:",
    options: ["1990", "1989", "1991", "2000"],
    correctAnswer: 2,
  },
  {
    id: "3",
    question: "Python is:",
    options: [
      "High-level language",
      "Low-level language",
      "Machine language",
      "Assembly language",
    ],
    correctAnswer: 0,
  },
  {
    id: "4",
    question: "The smallest unit in a Python program is called:",
    options: ["Identifier", "Token", "Literal", "Character"],
    correctAnswer: 1,
  },
  {
    id: "5",
    question: "Which of the following is not a Python token?",
    options: ["Identifiers", "Keywords", "Operators", "Modules"],
    correctAnswer: 3,
  },
  {
    id: "6",
    question: "Which of the following is NOT a Python keyword?",
    options: ["while", "for", "goto", "break"],
    correctAnswer: 2,
  },
  {
    id: "7",
    question: "Which of the following is a valid identifier?",
    options: ["1value", "value_1", "for", "value-1"],
    correctAnswer: 1,
  },
  {
    id: "8",
    question: "A literal in Python means:",
    options: ["A keyword", "A fixed value", "A variable", "A function name"],
    correctAnswer: 1,
  },
  {
    id: "9",
    question: "Which of the following is not a numeric literal?",
    options: ["25", "3.14", '"25"', "0b1010"],
    correctAnswer: 2,
  },
  {
    id: "10",
    question: "In Python, a string literal can be enclosed in:",
    options: [
      "Single quotes",
      "Double quotes",
      "Triple quotes",
      "All of these",
    ],
    correctAnswer: 3,
  },
];

const setBQuestions: Question[] = [
  {
    id: "11",
    question: "Which operator is used for floor division?",
    options: ["/", "//", "%", "**"],
    correctAnswer: 1,
  },
  {
    id: "12",
    question: "The operator used for exponentiation (power) is:",
    options: ["^", "**", "*", "%"],
    correctAnswer: 1,
  },
  {
    id: "13",
    question: "Which of the following is a relational operator?",
    options: ["and", "or", ">=", "not"],
    correctAnswer: 2,
  },
  {
    id: "14",
    question: "Which of the following is used to write a comment in Python?",
    options: ["/", "/* */", "#", "--"],
    correctAnswer: 2,
  },
  {
    id: "15",
    question: "What will be the output of print(type(True))?",
    options: [
      "<class 'bool'>",
      "<class 'int'>",
      "<class 'str'>",
      "<class 'float'>",
    ],
    correctAnswer: 0,
  },
  {
    id: "16",
    question: "Python is a case-sensitive language.",
    options: ["True", "False"],
    correctAnswer: 0,
  },
  {
    id: "17",
    question: "Indentation in Python is used for:",
    options: [
      "Decoration",
      "Separating lines",
      "Defining blocks of code",
      "None of these",
    ],
    correctAnswer: 2,
  },
  {
    id: "18",
    question: "Which of these is a valid string literal?",
    options: ["'Hello", '"Hello"', "Hello", '""Hello""'],
    correctAnswer: 1,
  },
  {
    id: "19",
    question: "Which of the following represents a Boolean literal?",
    options: ["yes", "TRUE", "True", '"True"'],
    correctAnswer: 2,
  },
  {
    id: "20",
    question: "Which symbol is used for modulo operator?",
    options: ["/", "%", "//", "**"],
    correctAnswer: 1,
  },
];

class MemStorage {
  private quizSets = new Map<string, QuizSet>();
  private leaderboard: Map<
    string,
    { name: string; score: number; timestamp: Date }[]
  > = new Map();

  constructor() {
    this.quizSets.set("A", {
      id: "A",
      name: "SET A - Python Fundamentals",
      questions: setAQuestions,
    });

    this.quizSets.set("B", {
      id: "B",
      name: "SET B - Python Operators",
      questions: setBQuestions,
    });
  }

  async getQuizSet(setId: string): Promise<QuizSet | undefined> {
    return this.quizSets.get(setId);
  }

  async getAllQuizSets(): Promise<
    { id: string; name: string; questionCount: number }[]
  > {
    return Array.from(this.quizSets.values()).map((set) => ({
      id: set.id,
      name: set.name,
      questionCount: set.questions.length,
    }));
  }

  async addLeaderboardEntry(
    setId: string,
    name: string,
    score: number,
  ): Promise<void> {
    const entries = this.leaderboard.get(setId) || [];
    entries.push({ name, score, timestamp: new Date() });
    entries.sort((a, b) => b.score - a.score);
    if (entries.length > 100) entries.pop();
    this.leaderboard.set(setId, entries);
  }

  async getLeaderboard(
    setId: string,
  ): Promise<{ name: string; score: number; timestamp: Date }[]> {
    return this.leaderboard.get(setId) || [];
  }
}

export const storage = new MemStorage();
