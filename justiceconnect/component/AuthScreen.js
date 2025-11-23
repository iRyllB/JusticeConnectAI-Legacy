import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  createLocalUser,
  loginLocalUser,
} from "../localdb/userDB";
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

import SuccessOverlay from "../component/overlays/SuccessOverlay";

export default function AuthScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const mode = route.params?.mode || "login";

  // Input fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error messages
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Overlay state
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayMode, setOverlayMode] = useState(""); // "signup" or "login"

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

  // -----------------------------
  // SIGNUP
  // -----------------------------
  const handleSignup = async () => {
    let hasError = false;
    let errors = { username: "", email: "", password: "", confirmPassword: "" };

    if (!username) {
      errors.username = "Username required";
      hasError = true;
    }

    if (!email) {
      errors.email = "Email or phone required";
      hasError = true;
    } else if (!validateEmail(email) && !validatePhone(email)) {
      errors.email = "Enter valid email or phone number";
      hasError = true;
    }

    if (!password) {
      errors.password = "Password required";
      hasError = true;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password required";
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    setErrorMessage(errors);
    if (hasError) return;

    try {
      await createLocalUser({ username, email, password });
      setOverlayMode("signup");   // Show "Registration Successful"
      setOverlayVisible(true);
    } catch (err) {
      setErrorMessage({ ...errors, email: err.message });
    }
  };

  // -----------------------------
  // LOGIN
  // -----------------------------
  const handleLogin = async () => {
    let errors = { username: "", email: "", password: "", confirmPassword: "" };
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
      setOverlayMode("login");    // Show "Login Successful"
      setOverlayVisible(true);
    } catch (err) {
      setErrorMessage({
        ...errors,
        password: "Invalid username or password",
      });
    }
  };

  // -----------------------------
  // Overlay button logic
  // -----------------------------
  const handleOverlayClose = () => {
    setOverlayVisible(false);

    if (overlayMode === "signup") {
      navigation.replace("Auth", { mode: "login" });
    } else if (overlayMode === "login") {
      navigation.replace("Home");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#E9F3FF" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>{"<"}</Text>
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={require("../assets/mainlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            {mode === "signup" ? "Register" : "Welcome"}
          </Text>

          {/* SIGNUP */}
          {mode === "signup" && (
            <>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
              {errorMessage.username && (
                <Text style={styles.errorText}>{errorMessage.username}</Text>
              )}

              <Text style={styles.label}>Email / Phone:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
              {errorMessage.email && (
                <Text style={styles.errorText}>{errorMessage.email}</Text>
              )}

              <Text style={styles.label}>Password:</Text>
              <TextInput
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              {errorMessage.password && (
                <Text style={styles.errorText}>{errorMessage.password}</Text>
              )}

              <Text style={styles.label}>Confirm Password:</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  <Text style={styles.eyeText}>
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
              {errorMessage.confirmPassword && (
                <Text style={styles.errorText}>
                  {errorMessage.confirmPassword}
                </Text>
              )}

              <TouchableOpacity
                style={styles.mainButton}
                onPress={handleSignup}
              >
                <Text style={styles.mainButtonText}>SIGN UP</Text>
              </TouchableOpacity>
            </>
          )}

          {/* LOGIN */}
          {mode === "login" && (
            <>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
              {errorMessage.username && (
                <Text style={styles.errorText}>{errorMessage.username}</Text>
              )}

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

              <TouchableOpacity
                style={styles.mainButton}
                onPress={handleLogin}
              >
                <Text style={styles.mainButtonText}>LOGIN</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* SUCCESS OVERLAY */}
      <SuccessOverlay
        visible={overlayVisible}
        onClose={handleOverlayClose}
        title={
          overlayMode === "signup"
            ? "Registration Successful!"
            : "Login Successful!"
        }
        buttonText={overlayMode === "signup" ? "Login" : "Continue"}
      />
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
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
  },
  backBtn: { marginBottom: 10 },
  backText: { fontSize: 24, color: "#0B3C6C" },
  logo: {
    width: 115,
    height: 115,
    alignSelf: "center",
    marginTop: 5,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  eyeButton: { paddingHorizontal: 10 },
  eyeText: { fontSize: 20 },
  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  forgotText: { color: "red", fontSize: 12, marginTop: 2 },
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
