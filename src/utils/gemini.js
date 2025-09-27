export async function getGeminiResponse(userMessage) {
  const GEMINI_API_KEY ="AIzaSyBGSMLievN7fz-gVSu9h0WNCCo677DdEfE"; // replace with your Gemini API key

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `Analyze the sentiment of this text and return sentiment + score: ${userMessage}` }
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}
