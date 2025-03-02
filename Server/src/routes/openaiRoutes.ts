import express from "express";
import { generateTaskDescription } from "../services/openaiService";

const router = express.Router();

router.post("/generate-description", async (req:any, res:any) => {
    try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ error: "Task title is required" });
  
      const description = await generateTaskDescription(title);
      res.json({ description });
  
    } catch (error) {
      console.error("Error in OpenAI Route:", error);
      res.status(500).json({ error: "Failed to generate description" });
    }
  });
  
export default router;
