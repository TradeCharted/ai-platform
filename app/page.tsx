"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setReply(data.reply);
    } catch (err) {
      console.log(err);
      setReply("Error calling API");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🤖 My AI Platform</h1>

      <div className="w-full max-w-xl flex gap-2">
        <input
          className="flex-1 p-3 rounded text-black"
          placeholder="اكتب سؤالك..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      {loading && <p className="mt-4">⏳ AI is thinking...</p>}

      {reply && (
        <div className="mt-6 p-4 bg-zinc-800 rounded max-w-xl w-full">
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}