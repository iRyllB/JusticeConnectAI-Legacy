import OpenAI from 'openai';
import { EXPO_PUBLIC_OPENAI_API_KEY, PROXY_URL } from '@env';
import { Platform } from 'react-native';

let client = null;
if (EXPO_PUBLIC_OPENAI_API_KEY) {
  // Server-side or native usage is fine
  client = new OpenAI({ apiKey: EXPO_PUBLIC_OPENAI_API_KEY });
}

export async function askAI(message) {
  // If we have a client (native/dev server-side), use SDK
  if (client && Platform.OS !== 'web') {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }]
    });
    return response.choices?.[0]?.message?.content || '';
  }

  // Otherwise, call a proxy endpoint (recommended for web)
  const proxy = PROXY_URL || '/api/openai';
  if (!proxy) throw new Error('Missing PROXY_URL or EXPO_PUBLIC_OPENAI_API_KEY');

  const res = await fetch(proxy, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI proxy error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  return data.text || data.result || '';
}
