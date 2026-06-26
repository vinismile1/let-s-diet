import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AIConsult = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        {
          message,
        }
      );

      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
      setResponse("Failed to get AI response.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-amber-600 mb-6">
          Diet AI Consultant
        </h1>

        <textarea
          className="w-full border p-4 rounded-xl h-40"
          placeholder="Ask anything about diet, fitness or nutrition..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={askAI}
          className="mt-4 bg-amber-500 text-white px-6 py-3 rounded-xl"
        >
          Ask AI
        </button>

        {loading && (
          <p className="mt-6">Thinking...</p>
        )}

       {response && (
  <div className="mt-8 space-y-6">

    {response.split("## ").filter(Boolean).map((section, index) => {
      const lines = section.split("\n").filter(line => line.trim());

      const title = lines[0];
      const items = lines.slice(1).map(item =>
        item.replace("-", "").trim()
      );

      const emojiMap = {
        Breakfast: "🍳",
        Lunch: "🥗",
        Dinner: "🍽",
        Snacks: "🍎",
        Beverages: "🥤",
        Tips: "💡",
      };

      return (
        <div
          key={index}
          className="
            bg-white
            rounded-2xl
            shadow-md
            border border-orange-100
            p-6
          "
        >
          <h2 className="text-2xl font-bold text-orange-600 mb-3">
            {emojiMap[title] || "🥗"} {title}
          </h2>

          <div className="border-b border-gray-200 mb-4"></div>

          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="
                  bg-orange-50
                  rounded-xl
                  px-4
                  py-3
                  text-gray-700
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
)}

      </div>
    </div>
  );
};

export default AIConsult;