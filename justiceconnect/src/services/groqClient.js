// src/services/groqClient.js
import { PROXY_URL, GROQ_API_KEY } from '@env';
import { Platform } from 'react-native';

// Determine base URL dynamically
const BASE_URL = (() => {
  if (PROXY_URL) return PROXY_URL;
  if (Platform.OS === 'android') return 'http://192.168.1.6:3000'; // replace with your PC IP
  return 'http://localhost:3000';
})();

export async function generateGroqResponse({ prompt, model = 'gemma2-9b-it', max_output_tokens = 200 }) {
  const target = `${BASE_URL}/groq`; // always call the proxy
  const headers = { 'Content-Type': 'application/json' };

  try {
    if (!BASE_URL) {
      throw new Error('PROXY_URL is missing. Set it in your .env file.');
    }

    console.debug('[groqClient] calling target:', target);
    console.debug('[groqClient] headers:', Object.keys(headers));

    const res = await fetch(target, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model, prompt, max_output_tokens }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => null);
      const err = new Error(`Groq API returned ${res.status}: ${res.statusText} ${text || ''}`);
      err.status = res.status;
      throw err;
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error('[groqClient] Failed to fetch:', e.message || e);
    e.requestTarget = target;
    throw e;
  }
}

export default { generateGroqResponse };
