import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginLocalUser } from "../localdb/userDB";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    let errors = { username: "", password: "" };
    let hasError = false;

    if (!username) {
      errors.username = "Username required";
      hasError = true;
    }
    if (!password) {
      errors.password = "Password required";
      hasError = true;
    }

    setErrorMessage(errors);
    if (hasError) return;

    try {
      await loginLocalUser({ username, password });

      // ✅ Directly go to Homepage
      navigation.replace("Homepage");
    } catch (err) {
      setErrorMessage({
        ...errors,
        password: "Invalid username or password",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#E9F3FF" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>{"<"}</Text>
          </TouchableOpacity>

          {/* Logo */}
          <Image source={require("../assets/mainlogo.png")} style={styles.logo} />

          <Text style={styles.title}>Welcome</Text>

          {/* Username */}
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />
          {errorMessage.username && (
            <Text style={styles.errorText}>{errorMessage.username}</Text>
          )}

          {/* Password */}
          <View style={styles.passwordRow}>
            <Text style={styles.label}>Password:</Text>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>

          <TextInput
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          {errorMessage.password && (
            <Text style={styles.errorText}>{errorMessage.password}</Text>
          )}

          {/* LOGIN */}
          <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
            <Text style={styles.mainButtonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* ⭐ NEW — Sign Up Link ⭐ */}
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <Text style={{ color: "#000" }}>
              Don't have an account?{" "}
              <Text
                style={{ color: "#0B3C6C", fontWeight: "bold" }}
                onPress={() => navigation.navigate("Signup")}
              >
                Sign Up
              </Text>
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    backgroundColor: "#E9F3FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#E9F3FF",
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
  },
  backBtn: { marginBottom: 10 },
  backText: { fontSize: 24, color: "#0B3C6C" },
  logo: {
    width: 115,
    height: 115,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
    color: "#0B3C6C",
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
    color: "#444",
  },
  input: {
    backgroundColor: "#DFE3EB",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  forgotText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
  mainButton: {
    backgroundColor: "#0B3C6C",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 18,
    alignItems: "center",
  },
  mainButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  errorText: { color: "red", fontSize: 12, marginTop: 2 },
});
