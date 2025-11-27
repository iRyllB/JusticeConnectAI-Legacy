import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform } from 'react-native';
import HomeScreen from './GetStarted';
import LandingScreenUI from '../components/ui/LandingScreenUI';

export default function LandingScreen() {
  const [showHome, setShowHome] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => setShowHome(true));
    }, 2002);

    return () => clearTimeout(timer);
  }, []);

  if (showHome) return <HomeScreen />;

  return <LandingScreenUI fadeAnim={fadeAnim} />;
}
