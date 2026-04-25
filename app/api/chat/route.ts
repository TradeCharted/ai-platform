export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log("DEBUG:", JSON.stringify(data, null, 2));

  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "AI did not return a response";

  return Response.json({ reply });
}