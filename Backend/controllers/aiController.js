import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export const askAI = async (req, res) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional nutritionist and fitness coach for the LET'S DIET application.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
   console.error("OpenAI Error:", error);

res.status(500).json({
  message: error.message,
  error: error,
});
  }
};