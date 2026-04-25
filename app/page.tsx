"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMessage = message;
    setMessage("");

    setChat((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "ai", text: "Error calling AI" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6">🤖 My AI Platform</h1>

      <div className="w-full max-w-xl flex gap-2 mb-4">
        <input
          className="flex-1 p-3 border rounded"
          placeholder="اكتب سؤالك..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      <div className="w-full max-w-xl space-y-3">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`p-3 rounded border ${
              c.role === "user" ? "bg-blue-100" : "bg-white"
            }`}
          >
            <b>{c.role === "user" ? "You" : "AI"}:</b> {c.text}
          </div>
        ))}
      </div>

      {loading && <p className="mt-4">⏳ Thinking...</p>}
    </div>
  );
}