export async function getGeminiResponse(userMessage) {
  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  // First, try with a possibly valid newer model
  const modelName = "gemini-2.5-flash";  // try this

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `The user wrote: "${userMessage}". Reply with sentiment (positive, neutral, negative) + explanation.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini API Response:", data);

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    // If no proper content, maybe the model name is invalid
    if (data.error) {
      console.warn("Gemini error:", data.error);

      // Option: try listing models
      const listResp = await fetch(
        `https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`
      );
      const listData = await listResp.json();
      console.log("ListModels response:", listData);

      return `⚠️ Model error: ${data.error.message}`;
    }

    return "⚠️ No response from Gemini";
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    return "❌ Error: Could not fetch response";
  }
}
