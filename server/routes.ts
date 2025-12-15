import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get all available quiz sets
  app.get("/api/quiz/sets", async (_req, res) => {
    try {
      const sets = await storage.getAllQuizSets();
      res.json(sets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz sets" });
    }
  });

  // Get a specific quiz set with questions
  app.get("/api/quiz/set/:setId", async (req, res) => {
    try {
      const { setId } = req.params;
      const quizSet = await storage.getQuizSet(setId.toUpperCase());
      
      if (!quizSet) {
        res.status(404).json({ error: "Quiz set not found" });
        return;
      }

      res.json(quizSet);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz set" });
    }
  });

  // Get leaderboard for a quiz set
  app.get("/api/leaderboard/:setId", async (req, res) => {
    try {
      const { setId } = req.params;
      const entries = await storage.getLeaderboard(setId.toUpperCase());
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Add score to leaderboard
  app.post("/api/leaderboard/:setId", async (req, res) => {
    try {
      const { setId } = req.params;
      const { name, score } = req.body;

      if (!name || score === undefined) {
        res.status(400).json({ error: "Name and score are required" });
        return;
      }

      await storage.addLeaderboardEntry(setId.toUpperCase(), name, score);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to add leaderboard entry" });
    }
  });

  return httpServer;
}
