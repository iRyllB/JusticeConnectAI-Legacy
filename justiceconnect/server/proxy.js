// server/proxy.js
import express from "express";
import fetch from "node-fetch"; // keep node-fetch v3 (ESM)
import cors from "cors";
import 'dotenv/config';

const app = express();
const PORT = 3000;

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

app.use(cors());
app.use(express.json());

app.post("/groq", async (req, res) => {
  try {
    const { model, prompt, max_output_tokens } = req.body;
    if (!GROQ_API_KEY) {
      console.error('Missing GROQ_API_KEY. Set it in .env or as an environment variable.');
      return res.status(500).json({ error: 'Missing GROQ_API_KEY' });
    }

    const response = await fetch("https://api.groq.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || "gemma2-9b-it",
        prompt,
        max_output_tokens: max_output_tokens || 200,
      }),
    });

    const data = await response.json();

    // Make sure to return text to the mobile app
    res.json({
      output_text: data.output_text || "No response from Groq AI.",
      raw: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error calling Groq AI." });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
