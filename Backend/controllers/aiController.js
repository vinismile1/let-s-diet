import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a professional nutritionist and fitness coach for the LET'S DIET application.

Provide safe, practical, and concise fitness and nutrition advice.

User Question:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
      response,
    });
  } catch (error) {
    console.log("Gemini Error:", error);

    res.status(500).json({
      message: "AI service unavailable",
    });
  }
};