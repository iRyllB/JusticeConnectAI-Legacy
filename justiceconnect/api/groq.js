// api/groq.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: "Missing GROQ_API_KEY" });
  }

  const { prompt, model = "gemma2-9b-it", max_output_tokens = 200 } = req.body;

  try {
    const response = await fetch("https://api.groq.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, prompt, max_output_tokens }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Groq API returned an error", details: data });
    }

    res.status(200).json({ output_text: data.output_text || "No response", raw: data });
  } catch (err) {
    res.status(500).json({ error: "Error calling Groq AI", details: err.message });
  }
}
