import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const prompt = `
You are a certified nutritionist and fitness coach.

Rules:
- Safe advice only
- No extreme dieting
- No medical diagnosis
- Keep answers short and practical

User:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return res.json({ response });

  } catch (error) {
    console.log("Gemini Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};