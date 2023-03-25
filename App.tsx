import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import LoginRegister from './screens/LoginRegister';
import MySplashScreen from './screens/MySplashScreen';

const Stack = createNativeStackNavigator();

async function loadFonts() {
  await Font.loadAsync({
    Vikendi: require('./assets/fonts/Vikendi.otf'),
    SF: require('./assets/fonts/SF.ttf'),
    ...Ionicons.font,
  });
}

export default function App() {
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
      <Stack.Navigator initialRouteName='LoginRegister'>
        <Stack.Screen name="LoginRegister" component={LoginRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
