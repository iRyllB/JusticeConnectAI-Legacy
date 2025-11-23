import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './GetStarted';

const { width } = Dimensions.get('window');

export default function LandingScreen() {
  const [showHome, setShowHome] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowHome(true));
    }, 2000); // 2s before fade out

    return () => clearTimeout(timer);
  }, []);

  if (showHome) return <HomeScreen />;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar style="dark" />
      <Image
        source={require('../assets/mainlogo.png')} // your logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>JUSTICE</Text>
      <Text style={styles.subtitle}>CONNECT</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F0F8FF',
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    width:width*0.4,
    height:width*0.4,
    marginBottom:30
  },
  title:{
    fontSize:32,
    fontWeight:'bold',
    color:'#F5C629'
  },
  subtitle:{
    fontSize:32,
    fontWeight:'bold',
    color:'#0B3C6C'
  }
});
