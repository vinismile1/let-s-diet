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
  <div className="
  mt-8
  bg-white
  border
  border-orange-200
  p-8
  rounded-2xl
  shadow-lg
">
    <h2 className="text-xl font-bold mb-4 text-amber-700">
      AI Response
    </h2>

    <div className="
  prose
  prose-lg
  max-w-none
  prose-headings:text-orange-600
  prose-strong:text-gray-800
  prose-li:my-1
">
     <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    p: ({ children }) => (
      <p className="mb-4 leading-7">{children}</p>
    ),
    li: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-orange-600 mt-6 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-4 mb-3">
        {children}
      </h3>
    ),
  }}
>
  {response}
</ReactMarkdown>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AIConsult;