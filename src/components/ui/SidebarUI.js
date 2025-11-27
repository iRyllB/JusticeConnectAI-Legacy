import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function SidebarUI({
  slideAnim,
  activeTab,
  setActiveTab,
  languages,
  getPreviewText,
  formatDate,
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
  return (
    <Animated.View
      style={[
        styles.sidebar,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* User */}
      {!isFreeMode && user && (
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.username}>
              {user.user_metadata?.name || "User"}
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
      )}

      {/* Tabs */}
      {!isFreeMode && (
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab("language")}
            style={[
              styles.tabButton,
              activeTab === "language" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "language" && styles.activeTabText,
              ]}
            >
              Language
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("history")}
            style={[
              styles.tabButton,
              activeTab === "history" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "history" && styles.activeTabText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <ScrollView style={{ flex: 1 }}>
        {isFreeMode ? (
          <View style={styles.freeMode}>
            <Text style={styles.freeTitle}>Free Mode</Text>
            <Text style={styles.freeText}>
              Sign in to unlock chat history and language preferences
            </Text>
            <Text style={styles.freeWarning}>
              ⚠ Your conversations are not saved in free mode
            </Text>
          </View>
        ) : activeTab === "language" ? (
          <View style={styles.languageTab}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => {
                  onLanguageChange(lang.code);
                  onClose();
                }}
                style={[
                  styles.languageButton,
                  language === lang.code && styles.languageSelected,
                ]}
              >
                <Text style={styles.flag}>{lang.flag}</Text>
                <Text style={styles.languageLabel}>{lang.label}</Text>

                {language === lang.code && (
                  <Text style={styles.check}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.historyTab}>
            <TouchableOpacity onPress={onNewChat} style={styles.newChatButton}>
              <Text style={styles.newChatText}>New Chat</Text>
            </TouchableOpacity>

            {chats.length === 0 ? (
              <View style={styles.emptyHistory}>
                <Text style={styles.emptyText}>No chat history yet</Text>
              </View>
            ) : (
              chats.map((chat) => (
                <TouchableOpacity
                  key={chat.id}
                  style={[
                    styles.chatItem,
                    currentChatId === chat.id && styles.activeChat,
                  ]}
                  onPress={() => {
                    onLoadChat(chat);
                    onClose();
                  }}
                >
                  <Text style={styles.chatPreview}>
                    {getPreviewText(chat.messages)}
                  </Text>

                  <View style={styles.chatMeta}>
                    <Text style={styles.chatDate}>
                      {formatDate(chat.updatedAt)}
                    </Text>
                    <Text style={styles.chatLang}>{chat.language}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                  >
                    <Text style={styles.deleteText}>X</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      {!isFreeMode && (
        <View style={styles.footer}>
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
}


//
// ----- THEME ----
//
const theme = {
  main: "#0B3C6C",
  accent: "#F5C629",
  background: "#F0F8FF",
  text: "#0B3C6C",
  subtext: "#4B5563",
  card: "#DCEAF8",
  elevated: "#C7D9EA",
};

//
// ----- STYLES ----
//
const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: theme.background,
    zIndex: 50,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  header: {
    backgroundColor: theme.main,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  closeButton: { padding: 4 },
  closeText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 18 },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.elevated,
    backgroundColor: theme.card,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.main,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { color: "#FFFFFF", fontWeight: "bold" },
  username: { fontSize: 16, color: theme.main, fontWeight: "bold" },
  userEmail: { fontSize: 12, color: theme.subtext },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.elevated,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: theme.accent,
  },
  tabText: {
    marginLeft: 6,
    color: theme.subtext,
    fontWeight: "500",
  },
  activeTabText: { color: theme.main, fontWeight: "bold" },
  freeMode: { padding: 16, alignItems: "center" },
  freeTitle: { color: theme.main, fontSize: 16, fontWeight: "bold" },
  freeText: { color: theme.subtext, textAlign: "center", marginTop: 8 },
  freeWarning: { color: theme.subtext, marginTop: 6, fontSize: 12 },
  languageTab: { padding: 16 },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: theme.elevated,
    borderRadius: 8,
    marginBottom: 10,
  },
  languageSelected: {
    backgroundColor: theme.accent,
  },
  flag: { fontSize: 18, marginRight: 8 },
  languageLabel: { flex: 1, color: theme.main, fontWeight: "600" },
  check: { color: theme.main, fontWeight: "bold" },
  historyTab: { padding: 16 },
  newChatButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.main,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  newChatText: { color: "#FFFFFF", marginLeft: 8, fontWeight: "bold" },
  emptyHistory: { alignItems: "center", padding: 32 },
  emptyText: { color: theme.subtext, marginTop: 8 },
  chatItem: {
    padding: 12,
    backgroundColor: theme.card,
    borderRadius: 10,
    marginBottom: 10,
  },
  activeChat: {
    backgroundColor: theme.accent,
  },
  chatPreview: { color: theme.main, fontWeight: "500" },
  chatMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  chatDate: { color: theme.subtext, fontSize: 10 },
  chatLang: { color: theme.subtext, fontSize: 10 },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
  },
  deleteText: { color: theme.main, fontWeight: "bold" },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.elevated,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    justifyContent: "center",
  },
  logoutText: { color: "#B91C1C", marginLeft: 8, fontWeight: "bold" },
});
