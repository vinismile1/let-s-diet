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
You are an expert nutritionist for the LET'S DIET app.

RULES:
- Use markdown formatting.
- Every heading must be on its own line.
- Leave one empty line after headings.
- Use bullet points only.
- Never write headings and content on the same line.
- Never use markdown tables.
- Make responses mobile friendly.

Correct format:

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

   let aiResponse = completion.choices[0].message.content;

aiResponse = aiResponse
  .replace(/##\s/g, "\n## ")
  .replace(/###\s/g, "\n### ")
  .replace(/- /g, "\n- ")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

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