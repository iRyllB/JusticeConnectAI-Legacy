// src/screens/HomeScreen.js
import React, { useState, useRef } from 'react';
import { PROXY_URL as ENV_PROXY_URL } from '@env';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeScreenUI from '../components/ui/HomeScreenUI.js';
import { generateGroqResponse } from '../services/groqClient';
import SidebarLogic from '../components/Sidebar.js';

// Use PROXY_URL from environment (fallback to dev host)
const PROXY_URL = ENV_PROXY_URL || 'http://192.168.1.6:3000/groq';

export default function HomeScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('english');
  const [currentChatId, setCurrentChatId] = useState('');
  const [chats, setChats] = useState([]);
  const [isFreeMode, setIsFreeMode] = useState(false);
  const [user, setUser] = useState({ email: 'demo@example.com', user_metadata: { name: 'John Doe' } });
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const navigation = useNavigation();

  // Sidebar & Language handlers
  const handleHamburger = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);
  const handleLanguageChange = (lang) => setLanguage(lang);
  const handleLogout = () => {
    setIsFreeMode(true);
    handleCloseSidebar();
  };
  const handleLoadChat = (chat) => {
    setCurrentChatId(chat.id);
    handleCloseSidebar();
  };
  const handleDeleteChat = (chatId) => setChats((prev) => prev.filter((c) => c.id !== chatId));
  const handleNewChat = () => {
    const newChat = { id: Math.random().toString(), userId: user.email, messages: [], language, updatedAt: new Date().toISOString() };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  };

  // Build prompt
  const buildPrompt = (msgHistory = [], overridePrompt = null) => {
    let promptText = '';
    (msgHistory || []).forEach((msg) => {
      promptText += msg.role === 'user' ? `User: ${msg.content}\n` : `AI: ${msg.content}\n`;
    });
    if (overridePrompt) promptText += `User: ${overridePrompt}\n`;
    promptText += 'AI:';
    return promptText;
  };

  const fetchAIResponse = async (userMsg, overridePrompt = null) => {
    try {
      const payloadPrompt = buildPrompt([...messages, userMsg], overridePrompt);
      const data = await generateGroqResponse({ prompt: payloadPrompt, model: 'gemma2-9b-it', max_output_tokens: 200 });

      // Show either output_text or raw JSON for debugging
      const aiContent = data.output_text || JSON.stringify(data.raw, null, 2);

      const aiMsg = { role: 'assistant', content: aiContent };
      setMessages((prev) => [...prev, aiMsg]);
      scrollRef.current?.scrollToEnd({ animated: true });
    } catch (err) {
      console.error('[HomeScreen] fetchAIResponse error:', err);
      if (err.requestTarget) console.error('[HomeScreen] request target:', err.requestTarget);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: Unable to get AI response.' }]);
    }
  };

  const sendMessageToAI = async () => {
    if (!message.trim()) return;
    const userMsg = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMsg]);
    setMessage('');
    setLoading(true);
    await fetchAIResponse(userMsg);
    setLoading(false);
  };

  const sendCategoryPrompt = async (category) => {
    const prompts = {
      'Labor Rights': 'Explain the labor rights of workers in the Philippines in simple terms.',
      Property: 'Provide a brief overview of property law in the Philippines.',
      'Family Law': 'Explain family law in the Philippines simply.',
      'Traffic Law': 'Explain traffic law rules and penalties in the Philippines.',
    };
    const prompt = prompts[category];
    if (!prompt) return;

    const userMsg = { role: 'user', content: category };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    await fetchAIResponse(userMsg, prompt);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeScreenUI
        message={message}
        setMessage={setMessage}
        handleHamburger={handleHamburger}
        navigation={navigation}
        language={language}
        isFreeMode={isFreeMode}
        user={user}
        messages={messages || []}
        sendMessageToAI={sendMessageToAI}
        loading={loading}
        scrollRef={scrollRef}
        sendCategoryPrompt={sendCategoryPrompt}
      />

      <SidebarLogic
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        language={language}
        onLanguageChange={handleLanguageChange}
        isFreeMode={isFreeMode}
        onLogout={handleLogout}
        onLoadChat={handleLoadChat}
        onDeleteChat={handleDeleteChat}
        onNewChat={handleNewChat}
        chats={chats}
        currentChatId={currentChatId}
        user={user}
      />
    </View>
  );
}
