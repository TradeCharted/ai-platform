"use client";

import { useState } from "react";

type Msg = {
  role: "user" | "ai";
  content: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;

    // إضافة رسالة المستخدم
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      // إضافة رد AI
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error connecting to AI" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-6">
      
      <h1 className="text-3xl font-bold mb-6">
        🤖 My AI Platform
      </h1>

      {/* Chat box */}
      <div className="w-full max-w-xl flex flex-col gap-3 flex-1">

        <div className="flex flex-col gap-3 overflow-y-auto flex-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded max-w-[80%] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 self-end"
                  : "bg-zinc-800 self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {loading && (
          <p className="text-gray-400">⏳ AI is thinking...</p>
        )}

        {/* input */}
        <div className="flex gap-2 mt-4">
          <input
            className="flex-1 p-3 rounded text-black bg-white"
            placeholder="اكتب رسالتك..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}