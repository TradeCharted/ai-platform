export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: message }] }
        ],
      }),
    }
  );

  const data = await response.json();

  return Response.json({
    reply:
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response",
  });
}