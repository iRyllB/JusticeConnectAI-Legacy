// component/GetStarted.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeAndAuthScreen() {
  const navigation = useNavigation();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <View style={styles.container}>
      {!showAuth ? (
        <View style={styles.centered}>
          <Image
            source={require('../assets/mainlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>JUSTICE</Text>
          <Text style={styles.subtitle}>CONNECT</Text>

          <Text style={styles.description}>
            Your smart link to justice.{"\n"}“Smart answers. Stronger decisions.”
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowAuth(true)}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.centered}>
          <Image
            source={require('../assets/mainlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.authTitle}>Ready to Connect?</Text>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate("Auth", { mode: "login" })}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => navigation.navigate("Auth", { mode: "signup" })}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.guestBtn}>
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 30 }}
            onPress={() => setShowAuth(false)}
          >
            <Text style={{ color: '#0B3C6C' }}>{'<'} Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 20,
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F5C629',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0B3C6C',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#0B3C6C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B3C6C',
    marginBottom: 30,
  },
  loginBtn: {
    backgroundColor: '#F5C629',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    marginBottom: 12,
  },
  loginText: {
    color: '#0B3C6C',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpBtn: {
    backgroundColor: '#0B3C6C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    marginBottom: 12,
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  orText: {
    marginVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  guestBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0B3C6C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  guestText: {
    color: '#0B3C6C',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
