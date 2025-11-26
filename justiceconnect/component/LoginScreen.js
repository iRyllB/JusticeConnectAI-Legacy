// components/LoginScreen.js
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { loginLocalUser } from "../localdb/userDB";
import LoginScreenUI from "./ui/LoginScreenUI";

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

      navigation.replace("Homepage");
    } catch (err) {
      setErrorMessage({
        ...errors,
        password: "Invalid username or password",
      });
    }
  };

  return (
    <LoginScreenUI
      username={username}
      password={password}
      errorMessage={errorMessage}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onLoginPress={handleLogin}
      onBack={() => navigation.goBack()}
      onSignup={() => navigation.navigate("Signup")}
    />
  );
}
