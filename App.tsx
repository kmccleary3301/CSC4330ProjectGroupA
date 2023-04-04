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

import { useAccessibilityInfo } from '@react-native-community/hooks';

import TailwindProvider from './node_modules/tailwind-rn/dist/tailwind-provider'; // Modify this path based on your folder structure
import useTailwind from './node_modules/tailwind-rn/dist/use-tailwind'; // Modify this path based on your folder structure


// import  TailwindProvider from 'tailwind-rn';
 import utilities from './tailwind.json';






const Stack = createNativeStackNavigator();



async function loadFonts() {
  await Font.loadAsync({
    Vikendi: require('./assets/fonts/Vikendi.otf'),
    SF: require('./assets/fonts/SF.ttf'),
    SFBold: require('./assets/fonts/SFBold.ttf'),
    ...Ionicons.font,
  });
}

function App(): React.ReactElement{
  const [hideSplashScreen, setHideSplashScreen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const blue = '#182640';
  const tan = '#FAE8CD';  


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

  // const MyTailwindProvider = ({ children }: { children: React.ReactNode }) => (
  //   <>{TailwindProvider({ theme: {}, children })}</>
  // );

  return (
   <TailwindProvider utilities={myUtilities}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginRegister'>
        <Stack.Screen name="LoginRegister" component={LoginRegister}
        options={{headerShown: false}} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerTransparent: true,
            headerTintColor: 'tan',
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}
        options={{
          headerTransparent: true,
          headerTintColor: 'tan',
          headerTitle: '',
          headerShadowVisible: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </TailwindProvider>
    
  );
}

export default App;


const myUtilities = {
  'bg-red-500': {
    style: {
      backgroundColor: '#F56565',
    },
  },
  'h-12': {
    style: {
      height: 48,
    },
  },
  'w-12': {
    style: {
      width: 48,
    },
  },
  'text-white': {
    style: {
      color: '#FFFFFF',
    },
  },
};