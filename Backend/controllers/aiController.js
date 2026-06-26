import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAI = async (req, res) => {
  try {
    console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key missing in environment variables",
      });
    }

    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log("Message:", message);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const prompt = `
You are a certified nutritionist and fitness coach.

Rules:
- Do NOT give extreme diets
- Do NOT give medical diagnosis
- Avoid unsafe calorie restrictions
- Always suggest balanced meals
- If user asks unsafe weight loss methods, refuse politely

User Question:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = result?.response?.text?.();

    if (!response) {
      return res.status(500).json({
        error: "No response from AI model",
      });
    }

    return res.json({ response });

  } catch (error) {
    console.log("Gemini Error Full:", error);
    console.log("Gemini Error Message:", error.message);

    return res.status(500).json({
      error: error.message,
    });
  }
};