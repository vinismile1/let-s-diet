import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const completion = await client.chat.completions.create({
      // Replace this with a working model from your OpenRouter account
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content: `
You are a certified nutritionist and fitness coach for the LET'S DIET application.

Rules:
- Use markdown formatting.
- Use headings and bullet points.
- Keep answers concise and easy to read.
- Give safe and practical advice.
- Avoid medical diagnosis.
- Avoid dangerous diets.
`
        },
        {
          role: "user",
          content: message,
        },
      ],

      max_tokens: 500,
      temperature: 0.7,
    });

    const response =
      completion?.choices?.[0]?.message?.content;

    if (!response) {
      return res.status(500).json({
        error: "No response returned from AI model.",
      });
    }

    return res.json({
      response,
    });
  } catch (error) {
    console.log("OPENROUTER ERROR:");
    console.log(error);

    return res.status(500).json({
      error:
        error?.error?.message ||
        error?.message ||
        "Failed to generate AI response",
    });
  }
};