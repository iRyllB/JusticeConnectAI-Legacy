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
import { createLocalUser } from "../localdb/userDB";
import SuccessOverlay from "../component/overlays/SuccessOverlay";

export default function SignupScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

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
      setOverlayVisible(true);
    } catch (err) {
      setErrorMessage({ ...errors, email: err.message });
    }
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    navigation.replace("Login");
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

          <Text style={styles.title}>Register</Text>

          {/* Username */}
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />
          {errorMessage.username && (
            <Text style={styles.errorText}>{errorMessage.username}</Text>
          )}

          {/* Email */}
          <Text style={styles.label}>Email / Phone:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          {errorMessage.email && (
            <Text style={styles.errorText}>{errorMessage.email}</Text>
          )}

          {/* Password */}
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

          {/* Confirm Password */}
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
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={styles.eyeText}>
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </Text>
            </TouchableOpacity>
          </View>

          {errorMessage.confirmPassword && (
            <Text style={styles.errorText}>{errorMessage.confirmPassword}</Text>
          )}

          {/* Signup Button */}
          <TouchableOpacity style={styles.mainButton} onPress={handleSignup}>
            <Text style={styles.mainButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          {/* ⭐ NEW — Sign In Link ⭐ */}
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <Text style={{ color: "#000" }}>
              Already have an account?{" "}
              <Text
                style={{ color: "#0B3C6C", fontWeight: "bold" }}
                onPress={() => navigation.navigate("Login")}
              >
                Sign In
              </Text>
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* Overlay */}
      <SuccessOverlay
        visible={overlayVisible}
        onClose={closeOverlay}
        title="Registration Successful!"
        buttonText="Login"
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  eyeButton: { paddingHorizontal: 10 },
  eyeText: { fontSize: 20 },
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
