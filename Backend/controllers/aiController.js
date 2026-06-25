import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const askAI = async (req, res) => {
  try {
    console.log(
      "GEMINI KEY EXISTS:",
      !!process.env.GEMINI_API_KEY
    );

    const { message } = req.body;

    console.log("Message:", message);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
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
    console.log("Gemini Error Full:", error);
    console.log(
      "Gemini Error Message:",
      error.message
    );

    res.status(500).json({
      error: error.message,
    });
  }
};