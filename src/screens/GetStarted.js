// src/screens/GetStarted.js
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import GetStartedUI from '../components/ui/GetStartedUI';

export default function HomeAndAuthScreen() {
  const navigation = useNavigation();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <GetStartedUI
      showAuth={showAuth}
      setShowAuth={setShowAuth}
      navigation={navigation}
    />
  );
}
