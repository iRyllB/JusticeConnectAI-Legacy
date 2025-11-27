import { PROXY_URL } from '@env';
import { Platform } from 'react-native';

// Determine base URL dynamically
const BASE_URL = PROXY_URL
  ? PROXY_URL // full path for Vercel
  : Platform.OS === 'android'
  ? 'http://10.0.2.2:3000' // Android emulator local proxy
  : 'http://localhost:3000'; // local proxy for iOS simulator / web

export async function generateGroqResponse({ prompt, model = 'gemma2-9b-it', max_output_tokens = 200 }) {
  // Append /groq only for local proxy
  const target = PROXY_URL;  // no extra /groq appended

  try {
    console.debug('[groqClient] calling target:', target);

    const res = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt, max_output_tokens }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(`Groq API returned ${res.status}: ${res.statusText} ${text || ''}`);
    }

    return await res.json();
  } catch (e) {
    console.error('[groqClient] Failed to fetch:', e.message || e);
    e.requestTarget = target;
    throw e;
  }
}

export default { generateGroqResponse };
