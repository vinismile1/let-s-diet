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

    // Validation
    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const completion = await client.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content: `
You are a professional nutritionist and fitness coach for the LET'S DIET application.

Rules:
- Give safe and practical advice.
- Do not provide medical diagnoses.
- Do not recommend dangerous diets.
- Encourage balanced nutrition.
- Keep responses concise and easy to understand.

Formatting Rules:
- Use Markdown formatting.
- Use headings and bullet points only.
- Do NOT use markdown tables.
- Keep responses mobile friendly.
- Leave blank lines between sections.

Example:

## Breakfast

- Oats
- Banana
- Milk

## Lunch

- Rice
- Lentils
- Salad
`,
        },
        {
          role: "user",
          content: message,
        },
      ],

      max_tokens: 700,
      temperature: 0.7,
    });

    const aiResponse =
      completion?.choices?.[0]?.message?.content
        ?.replace(/\\n/g, "\n")
        ?.trim();

    if (!aiResponse) {
      return res.status(500).json({
        error: "No response returned from AI model.",
      });
    }

    return res.json({
      response: aiResponse,
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