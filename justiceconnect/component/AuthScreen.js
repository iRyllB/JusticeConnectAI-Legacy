// component/AuthScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AuthScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const mode = route.params?.mode || "login";

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../assets/mainlogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>
        {mode === "signup" ? "Get Started" : "Welcome"}
      </Text>

      {/* ---------- SIGN UP SCREEN ---------- */}
      {mode === "signup" && (
        <>
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Phone:</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Password:</Text>
          <TextInput secureTextEntry style={styles.input} />

          <Text style={styles.label}>Confirm Password:</Text>
          <TextInput secureTextEntry style={styles.input} />

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.replace("Auth", { mode: "login" })}
            >
              Sign In
            </Text>
          </Text>
        </>
      )}

      {/* ---------- LOGIN SCREEN ---------- */}
      {mode === "login" && (
        <>
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} />

          <View style={styles.passwordRow}>
            <Text style={styles.label}>Password:</Text>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot?</Text>
            </TouchableOpacity>
          </View>

          <TextInput secureTextEntry style={styles.input} />

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Don’t have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.replace("Auth", { mode: "signup" })}
            >
              Sign Up
            </Text>
          </Text>
        </>
      )}

      {/* Spacer to prevent overlap with bottom nav bar */}
      <View style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    backgroundColor: "#F0F8FF",
    justifyContent: "flex-start",
  },
  backBtn: {
    marginBottom: 5,
  },
  backText: {
    fontSize: 22,
    color: "#0B3C6C",
  },
  logo: {
    width: 120, // increased from 100
    height: 120, // increased from 100
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: "#0B3C6C",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#333",
    marginTop: 8,
    marginLeft: 3,
  },
  input: {
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    padding: 10,
    marginTop: 3,
  },
  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginRight: 3,
  },
  forgotText: {
    color: "red",
    fontSize: 11,
  },
  mainButton: {
    backgroundColor: "#0B3C6C",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 8,
    color: "#333",
    fontSize: 13,
  },
  googleBtn: {
    flexDirection: "row",
    backgroundColor: "#0B3C6C",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  googleBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 13,
  },
  link: {
    color: "#0B3C6C",
    fontWeight: "bold",
  },
});
