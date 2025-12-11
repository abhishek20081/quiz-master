import type { Question, QuizSet } from "@shared/schema";

// Quiz questions for SET A - General Knowledge
const setAQuestions: Question[] = [
  { id: 1, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: 2 },
  { id: 2, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1 },
  { id: 3, question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correctAnswer: 2 },
  { id: 4, question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correctAnswer: 3 },
  { id: 5, question: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2 },
  { id: 6, question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctAnswer: 2 },
  { id: 7, question: "Which country is home to the kangaroo?", options: ["New Zealand", "South Africa", "Australia", "India"], correctAnswer: 2 },
  { id: 8, question: "What is the largest mammal in the world?", options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], correctAnswer: 1 },
  { id: 9, question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correctAnswer: 2 },
  { id: 10, question: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], correctAnswer: 2 },
  { id: 11, question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctAnswer: 1 },
  { id: 12, question: "What is the smallest country in the world?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], correctAnswer: 2 },
  { id: 13, question: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Oxygen", "Carbon"], correctAnswer: 1 },
  { id: 14, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2 },
  { id: 15, question: "How many bones are in the adult human body?", options: ["186", "206", "226", "246"], correctAnswer: 1 },
  { id: 16, question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctAnswer: 1 },
  { id: 17, question: "What year was the first iPhone released?", options: ["2005", "2006", "2007", "2008"], correctAnswer: 2 },
  { id: 18, question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], correctAnswer: 2 },
  { id: 19, question: "Which blood type is known as the universal donor?", options: ["A", "B", "AB", "O"], correctAnswer: 3 },
  { id: 20, question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correctAnswer: 1 },
];

// Quiz questions for SET B - Science and Technology
const setBQuestions: Question[] = [
  { id: 1, question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"], correctAnswer: 0 },
  { id: 2, question: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correctAnswer: 0 },
  { id: 3, question: "Who is known as the father of modern physics?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], correctAnswer: 1 },
  { id: 4, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctAnswer: 0 },
  { id: 5, question: "What is the chemical formula for water?", options: ["H2O", "CO2", "NaCl", "O2"], correctAnswer: 0 },
  { id: 6, question: "Which programming language is known as the 'mother of all languages'?", options: ["Java", "Python", "C", "FORTRAN"], correctAnswer: 2 },
  { id: 7, question: "What is the unit of electrical resistance?", options: ["Volt", "Ampere", "Ohm", "Watt"], correctAnswer: 2 },
  { id: 8, question: "Who invented the telephone?", options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"], correctAnswer: 2 },
  { id: 9, question: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Heart", "Skin"], correctAnswer: 3 },
  { id: 10, question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Read And Modify"], correctAnswer: 1 },
  { id: 11, question: "What is the boiling point of water at sea level?", options: ["90°C", "100°C", "110°C", "120°C"], correctAnswer: 1 },
  { id: 12, question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Stephen Hawking", "Albert Einstein", "Max Planck"], correctAnswer: 2 },
  { id: 13, question: "What is the study of fungi called?", options: ["Botany", "Mycology", "Zoology", "Ecology"], correctAnswer: 1 },
  { id: 14, question: "Which gas makes up most of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 2 },
  { id: 15, question: "What is the nearest star to Earth?", options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"], correctAnswer: 2 },
  { id: 16, question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Dinitrogen Acid", "Deoxyribose Nucleic Acid", "Dynamic Nucleic Acid"], correctAnswer: 0 },
  { id: 17, question: "Who invented the World Wide Web?", options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"], correctAnswer: 2 },
  { id: 18, question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], correctAnswer: 2 },
  { id: 19, question: "What is the most abundant element in the universe?", options: ["Helium", "Oxygen", "Carbon", "Hydrogen"], correctAnswer: 3 },
  { id: 20, question: "What year was the first computer virus created?", options: ["1971", "1981", "1991", "2001"], correctAnswer: 0 },
];

export interface IStorage {
  getQuizSet(setId: string): Promise<QuizSet | undefined>;
  getAllQuizSets(): Promise<{ id: string; name: string; questionCount: number }[]>;
}

export class MemStorage implements IStorage {
  private quizSets: Map<string, QuizSet>;

  constructor() {
    this.quizSets = new Map();
    this.quizSets.set("A", {
      id: "A",
      name: "SET A - General Knowledge",
      questions: setAQuestions,
    });
    this.quizSets.set("B", {
      id: "B",
      name: "SET B - Science & Technology",
      questions: setBQuestions,
    });
  }

  async getQuizSet(setId: string): Promise<QuizSet | undefined> {
    return this.quizSets.get(setId);
  }

  async getAllQuizSets(): Promise<{ id: string; name: string; questionCount: number }[]> {
    return Array.from(this.quizSets.values()).map((set) => ({
      id: set.id,
      name: set.name,
      questionCount: set.questions.length,
    }));
  }
}

export const storage = new MemStorage();
