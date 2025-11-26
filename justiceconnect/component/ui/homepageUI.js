// component/ui/HomeScreenUI.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function HomeScreenUI({
  message,
  setMessage,
  handleHamburger,
  navigation,
  language,
  isFreeMode,
  user
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
                    {isFreeMode
                      ? "Guest Mode"
                      : `Philippine Law AI · ${language}`}
                  </Text>
                </View>
              </View>

              <View style={styles.navRight}></View>
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {/* MAIN CONTENT */}
              <View style={styles.centerContent}>
                <Image
                  source={require("../../assets/mainlogo.png")}
                  style={styles.mainLogo}
                />

                <Text style={styles.welcome}>Welcome to JusticeConnect</Text>

                <Text style={styles.description}>
                  Ask me anything about Philippine law
                </Text>

                {/* CATEGORY GRID */}
                <View style={styles.grid}>
                  <TouchableOpacity style={[styles.box, { backgroundColor: "#0B3C6C" }]}>
                    <Text style={styles.boxText}>Labor Rights</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.box, { backgroundColor: "#F5C629" }]}>
                    <Text style={styles.boxTextDark}>Property</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.box, { backgroundColor: "#F5C629" }]}>
                    <Text style={styles.boxTextDark}>Family Law</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.box, { backgroundColor: "#0B3C6C" }]}>
                    <Text style={styles.boxText}>Traffic Law</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
                  multiline={false}
                  returnKeyType="send"
                />
                <TouchableOpacity style={styles.sendBtn}>
                  <Text style={styles.sendArrow}>➤</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            {/* BACK */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>{"<"} Back</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F4F8FF" },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
  },

  navbar: {
    width: "100%",
    height: 70,
    backgroundColor: "#0B3C6C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },

  menuBtn: { marginRight: 10 },

  line: {
    width: 26,
    height: 3,
    backgroundColor: "white",
    marginVertical: 2,
    borderRadius: 2,
  },

  navTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  navSubtitle: {
    color: "#E0E8F0",
    fontSize: 11,
    marginTop: 1,
  },

  navRight: { width: 30, height: 30 },

  centerContent: {
    alignItems: "center",
    paddingVertical: 25,
  },

  mainLogo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },

  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },

  description: {
    fontSize: 13,
    color: "#555",
    marginBottom: 25,
  },

  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  box: {
    width: "48%",
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  boxText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  boxTextDark: {
    color: "#0B3C6C",
    fontSize: 15,
    fontWeight: "bold",
  },

  chatBoxWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  chatBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
  },

  chatInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  sendBtn: {
    backgroundColor: "#0B3C6C",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  sendArrow: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  backBtn: {
    position: "absolute",
    bottom: 100,
    left: 18,
    right: 18,
    alignItems: "center",
  },

  backText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0B3C6C",
  },
});
