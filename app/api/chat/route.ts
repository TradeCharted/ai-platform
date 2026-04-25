export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log("MESSAGE RECEIVED:", message);

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: message,
        stream: false,
      }),
    });

    const data = await response.json();

    console.log("OLLAMA RESPONSE:", data);

    return Response.json({
      reply: data.response,
    });
  } catch (err) {
    console.error("API ERROR:", err);

    return Response.json({
      reply: "Server error - check terminal",
    });
  }
}