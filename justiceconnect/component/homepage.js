import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function HomeScreen() {
  const [message, setMessage] = useState("");

  const handleHamburger = () => {
    Alert.alert("Hamburger", "hamburger successfully opened");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1}}>
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
              <Text style={styles.navSubtitle}>Philippine Law AI · English</Text>
            </View>
          </View>

          <View style={styles.navRight}></View>
        </View>

        {/* MAIN CONTENT */}
        <View style={styles.centerContent}>
          <Image source={require("../assets/mainlogo.png")} style={styles.mainLogo} />

          <Text style={styles.welcome}>Welcome to JusticeConnect</Text>
          <Text style={styles.description}>Ask me anything about Philippine law</Text>

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

        {/* CHAT INPUT ONLY moves up on keyboard */}
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F4F8FF",
  },

  /* NAVBAR */
  navbar: {
    width: "100%",
    height: 70,
    backgroundColor: "#0B3C6C",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  navLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuBtn: {
    marginRight: 15,
  },

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

  navRight: {
    width: 30,
    height: 30,
  },

  /* MAIN CONTENT */
  centerContent: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 25, // leave some bottom padding for spacing from chatbox
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

  /* GRID */
  grid: {
    width: "88%",
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

  /* CHAT INPUT */
  chatBoxWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: "transparent",
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
});
