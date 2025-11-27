import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { GROQ_API_KEY, PROXY_URL } from '@env'; // Make sure you have .env file with your key and proxy URL
import { generateGroqResponse } from '../services/groqClient';

export default function AIChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Build prompt from conversation
  const buildPrompt = (msgHistory, newMsg) => {
    let promptText = "";
    msgHistory.forEach(msg => {
      promptText += msg.role === 'user' ? `User: ${msg.content}\n` : `AI: ${msg.content}\n`;
    });
    promptText += `User: ${newMsg}\nAI:`;
    return promptText;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const promptText = buildPrompt(messages, userMessage.content);

      // If you prefer, use a local proxy to keep your API key private. Otherwise, call GROQ directly.
      const target = PROXY_URL || 'https://api.groq.ai/v1/generate';

      // Use centralized groqClient; it will call the proxy or the direct Groq endpoint depending on PROXY_URL
      const data = await generateGroqResponse({ prompt: promptText, model: 'gemma2-9b-it', max_output_tokens: 200 });
      const assistantMessage = { role: 'assistant', content: data.output_text || 'No response from AI.' };
      setMessages(prev => [...prev, assistantMessage]);
      scrollRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('[AIChatScreen] Error calling generateGroqResponse:', error);
      if (error.requestTarget) {
        console.error('[AIChatScreen] Request target:', error.requestTarget);
      }
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Unable to get AI response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollRef}
        contentContainerStyle={{ paddingVertical: 10 }}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : styles.assistantBubble
            ]}
          >
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask a legal question..."
          onSubmitEditing={sendMessage}
        />
        <Button title={loading ? '...' : 'Send'} onPress={sendMessage} disabled={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f8f8f8' },
  chatContainer: { flex: 1, marginBottom: 10 },
  messageBubble: { padding: 10, borderRadius: 8, marginVertical: 4, maxWidth: '80%' },
  userBubble: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
  assistantBubble: { backgroundColor: '#e0e0e0', alignSelf: 'flex-start' },
  messageText: { color: '#000' },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginRight: 5 },
});
