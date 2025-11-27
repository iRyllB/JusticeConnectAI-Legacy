// api/openai.js
// Vercel serverless function to proxy OpenAI requests
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'Missing OPENAI_API_KEY environment variable' });

  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Missing message in body' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
        max_tokens: 300
      })
    });

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ text: data?.choices?.[0]?.message?.content || '' });
  } catch (err) {
    console.error('[vercel/api/openai] error:', err);
    return res.status(500).json({ error: 'OpenAI request failed', details: err.message });
  }
}
