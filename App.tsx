import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import MySplashScreen from './screens/MySplashScreen';
import AppContent from './AppContent';

async function loadFonts() {
  await Font.loadAsync({
    Vikendi: require('./assets/fonts/Vikendi.otf'),
    SF: require('./assets/fonts/SF.ttf'),
    SFBold: require('./assets/fonts/SFBold.ttf'),
    ...Ionicons.font,
  });
}

function App(): React.ReactElement {
  const [hideSplashScreen, setHideSplashScreen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);

    SplashScreen.preventAutoHideAsync().catch(() => {});

    loadFonts()
      .then(() => {
        setFontsLoaded(true);
        SplashScreen.hideAsync().catch(() => {});
      })
      .catch(console.error);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || !hideSplashScreen) {
    return <MySplashScreen />;
  }

  return (
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  );
}

export default App;