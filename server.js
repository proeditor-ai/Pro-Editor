import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route that receives prompts from the frontend
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    res.json({ output: response.output[0].content[0].text });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Simple test route
app.get("/", (req, res) => {
  res.send("✅ Pro Editor backend is running successfully!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
