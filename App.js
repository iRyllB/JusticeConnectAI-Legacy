// App.js
import * as React from 'react';
import { Platform } from 'react-native';
import { PROXY_URL as ENV_PROXY_URL, GROQ_API_KEY as ENV_GROQ_KEY } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from './src/components/ErrorBoundary';
import GlobalErrorOverlay from './src/components/GlobalErrorOverlay';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// SCREENS
import LandingScreen from './src/screens/LandingScreen';
import GetStarted from './src/screens/GetStarted';
import Homepage from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import AIChatScreen from './src/screens/AIChatScreen'; // <- New Groq AI chat screen

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    console.info('[App] Platform:', Platform.OS);
    console.info('[App] PROXY_URL present:', !!ENV_PROXY_URL);
    console.info('[App] GROQ_API_KEY present:', !!ENV_GROQ_KEY);
  }, []);
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <GlobalErrorOverlay />
      <Stack.Navigator initialRouteName="Landing">

        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={GetStarted}
          options={{ headerShown: false }}
        />

        {/* LOGIN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* SIGNUP */}
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        {/* AFTER LOGIN / GUEST */}
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }}
        />

        {/* NEW: AI Chat Screen */}
        <Stack.Screen
          name="AIChat"
          component={AIChatScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
