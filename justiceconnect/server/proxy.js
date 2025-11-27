import express from "express";
import fetch from "node-fetch"; // node-fetch v3 (ESM)
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
      console.error('[proxy] Missing GROQ_API_KEY');
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

    if (!response.ok) {
      console.error('[proxy] Groq API error:', data);
      return res.status(response.status).json({
        error: "Groq API returned an error",
        details: data,
      });
    }

    console.log('[proxy] Groq API response:', data);
    res.json({
      output_text: data.output_text || "No response from Groq AI.",
      raw: data,
    });

  } catch (err) {
    console.error('[proxy] Network or other error:', err);
    res.status(500).json({
      error: "Error calling Groq AI",
      details: err.message || err.toString(),
    });
  }
});

// Listen on all network interfaces, not just localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[proxy] Server running and listening on all network interfaces`);
  console.log(`[proxy] Access via PC IP: http://192.168.1.6:${PORT}/groq`);
});
