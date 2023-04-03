import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import LoginRegister from './screens/LoginRegister';
import MySplashScreen from './screens/MySplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Navigation } from './navigation';

const Stack = createNativeStackNavigator();

async function loadFonts() {
  await Font.loadAsync({
    Vikendi: require('./assets/fonts/Vikendi.otf'),
    SF: require('./assets/fonts/SF.ttf'),
    SFBold: require('./assets/fonts/sfc-bold.ttf'),
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
        <Stack.Screen name="LoginRegister" component={LoginRegister}
        options={{headerShown: false}} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerTransparent: true,
            headerTintColor: '#D2B48C',
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}
        options={{
          headerTransparent: true,
          headerTintColor: '#D2B48C',
          headerTitle: '',
          headerShadowVisible: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
