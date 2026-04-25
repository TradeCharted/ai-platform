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

    console.log("API RESPONSE:", data);

    setReply(data.reply);
  } catch (err) {
    console.log("ERROR:", err);
    setReply("Error calling API");
  }

  setLoading(false);
};