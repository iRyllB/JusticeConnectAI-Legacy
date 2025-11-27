// src/services/groqClient.js - Centralized Groq API caller
import { PROXY_URL, GROQ_API_KEY } from '@env';
import { Platform } from 'react-native';

export async function generateGroqResponse({ prompt, model = 'gemma2-9b-it', max_output_tokens = 200 }) {
  const target = PROXY_URL || 'https://api.groq.ai/v1/generate';
  const headers = { 'Content-Type': 'application/json' };
  if (!PROXY_URL && GROQ_API_KEY) headers['Authorization'] = `Bearer ${GROQ_API_KEY}`;

  try {
    // If running in a web browser, prefer using the proxy; direct calls may fail due to CORS
    if (Platform?.OS === 'web' && !PROXY_URL) {
      throw new Error('Direct calls to Groq API from a browser will likely be blocked by CORS. Set PROXY_URL to your proxy endpoint and restart the app.');
    }
    console.debug('[groqClient] calling target:', target);
    console.debug('[groqClient] headers:', Object.keys(headers));

    const res = await fetch(target, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model, prompt, max_output_tokens }),
    });

    // Check network errors
    if (!res.ok) {
      const text = await res.text().catch(() => null);
      const err = new Error(`Groq API returned ${res.status}: ${res.statusText} ${text || ''}`);
      err.status = res.status;
      throw err;
    }

    const data = await res.json();
    return data;
  } catch (e) {
    // Re-throw with additional context for debugging
    console.error('[groqClient] Failed to fetch:', e.message || e);
    // Attach the request target so callers can examine
    e.requestTarget = PROXY_URL || 'https://api.groq.ai/v1/generate';
    throw e;
  }
}

export default { generateGroqResponse };
