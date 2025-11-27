import React, { useState } from 'react';
import { Animated, Dimensions, Platform } from 'react-native';
import SidebarUI from './ui/SidebarUI';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SidebarLogic({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  isFreeMode,
  onLogout,
  onLoadChat,
  onDeleteChat,
  onNewChat,
  chats,
  currentChatId,
  user,
}) {
  const [activeTab, setActiveTab] = useState('language');
  const slideAnim = useState(new Animated.Value(-SCREEN_WIDTH))[0];

  const languages = [
    { code: 'english', label: 'English', flag: '🇬🇧' },
    { code: 'tagalog', label: 'Tagalog', flag: '🇵🇭' },
    { code: 'bisaya', label: 'Bisaya', flag: '🇵🇭' },
  ];

  // Animate sidebar open/close
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [isOpen]);

  const getPreviewText = (messages) => {
    if (!messages || messages.length === 0) return 'New conversation';
    const firstUserMessage = messages.find((m) => m.role === 'user');
    return firstUserMessage?.content.substring(0, 50) + '...' || 'New conversation';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <SidebarUI
      slideAnim={slideAnim}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      languages={languages}
      getPreviewText={getPreviewText}
      formatDate={formatDate}
      onClose={onClose}
      language={language}
      onLanguageChange={onLanguageChange}
      isFreeMode={isFreeMode}
      onLogout={onLogout}
      onLoadChat={onLoadChat}
      onDeleteChat={onDeleteChat}
      onNewChat={onNewChat}
      chats={chats}
      currentChatId={currentChatId}
      user={user}
    />
  );
}
