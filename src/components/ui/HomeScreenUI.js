import React from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreenUI({
  message,
  setMessage,
  handleHamburger,
  navigation,
  language,
  isFreeMode,
  user,
  messages = [], // default to empty array
  sendMessageToAI,
  loading,
  scrollRef,
  sendCategoryPrompt
}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F8FF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.page}>
            {/* NAVBAR */}
            <View style={styles.navbar}>
              <View style={styles.navLeft}>
                <TouchableOpacity onPress={handleHamburger} style={styles.menuBtn}>
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                </TouchableOpacity>
                <View>
                  <Text style={styles.navTitle}>JusticeConnect</Text>
                  <Text style={styles.navSubtitle}>
                    {isFreeMode ? "Guest Mode" : `Philippine Law AI · ${language}`}
                  </Text>
                </View>
              </View>
            </View>

            {/* CATEGORY GRID */}
            <View style={styles.grid}>
              { ["Labor Rights","Property","Family Law","Traffic Law"].map((cat, idx) => {
                const isDark = idx % 2 === 0;
                // Safe wrapper to prevent crash
                const safeSendCategory = sendCategoryPrompt || ((category) => console.warn("sendCategoryPrompt is undefined!", category));

                return (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.box, { backgroundColor: isDark ? "#0B3C6C" : "#F5C629" }]}
                    onPress={() => safeSendCategory(cat)}
                  >
                    <Text style={isDark ? styles.boxText : styles.boxTextDark}>{cat}</Text>
                  </TouchableOpacity>
                );
              }) }
            </View>

            {/* CHAT MESSAGES */}
            <ScrollView
              style={styles.chatScroll}
              ref={scrollRef}
              contentContainerStyle={{ padding: 10 }}
              keyboardShouldPersistTaps="handled"
            >
              {loading && (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>AI is typing...</Text>
                </View>
              )}

              {(messages || []).map((msg, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.messageBubble,
                    msg.role === "user" ? styles.userBubble : styles.assistantBubble
                  ]}
                >
                  <Text style={styles.messageText}>{msg.content}</Text>
                </View>
              ))}
            </ScrollView>

            {/* CHAT INPUT */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 10}
              style={styles.chatBoxWrapper}
            >
              <View style={styles.chatBox}>
                <TextInput
                  style={styles.chatInput}
                  placeholder="What would you like to know?"
                  placeholderTextColor="#777"
                  value={message}
                  onChangeText={setMessage}
                  returnKeyType="send"
                  onSubmitEditing={sendMessageToAI}
                  editable={!loading}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={sendMessageToAI} disabled={loading}>
                  <Text style={styles.sendArrow}>{loading ? "..." : "➤"}</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F4F8FF" },
  navbar: { width: "100%", height: 70, backgroundColor: "#0B3C6C", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  navLeft: { flexDirection: "row", alignItems: "center", paddingLeft: 10 },
  menuBtn: { marginRight: 10 }, 
  line: { width: 26, height: 3, backgroundColor: "white", marginVertical: 2, borderRadius: 2 },
  navTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  navSubtitle: { color: "#E0E8F0", fontSize: 11, marginTop: 1 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 10 },
  box: { width: "48%", paddingVertical: 18, borderRadius: 12, marginBottom: 15, alignItems: "center" },
  boxText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  boxTextDark: { color: "#0B3C6C", fontSize: 15, fontWeight: "bold" },
  chatScroll: { flex: 1 },
  loadingContainer: { padding: 8, alignSelf: "flex-start", marginVertical: 4, backgroundColor: "#e0e0e0", borderRadius: 12 },
  loadingText: { color: "#555", fontStyle: "italic" },
  messageBubble: { padding: 10, borderRadius: 12, marginVertical: 4, maxWidth: "80%" },
  userBubble: { backgroundColor: "#007bff", alignSelf: "flex-end" },
  assistantBubble: { backgroundColor: "#e0e0e0", alignSelf: "flex-start" },
  messageText: { color: "#000" },
  chatBoxWrapper: { paddingHorizontal: 15, paddingBottom: 10 },
  chatBox: { flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 12, paddingHorizontal: 15, paddingVertical: 10, elevation: 2 },
  chatInput: { flex: 1, fontSize: 14, color: "#000" },
  sendBtn: { backgroundColor: "#0B3C6C", width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  sendArrow: { color: "white", fontSize: 18, fontWeight: "bold" },
});
