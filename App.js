import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

import VerifyEmail from './src/screens/VerifyEmail';
import { AuthProvider } from './AuthContext';
import { db, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { UserTypeProvider } from './UserTypeContext';
import { getDoc, doc } from 'firebase/firestore';


export default function App() {
  const [hideSplashScreen, setHideSplashScreen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [initialUserType, setInitialUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const userData = await getDoc(userRef);
        const userType = userData.data()?.userType;
        setInitialUserType(userType);
      }
      setLoading(false);
    })});
    /*
    const timer = setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);

    SplashScreen.preventAutoHideAsync().catch(() => { });

    loadFonts()
      .then(() => {
        setFontsLoaded(true);
        SplashScreen.hideAsync().catch(() => { });
      })
      .catch(console.error);

    return () => clearTimeout(timer);
  }, []);
  if (!fontsLoaded || !hideSplashScreen) {
    return <MySplashScreen />;
  }
  */

  return (
    <NavigationContainer>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <AuthStack>
          <AppStack />
        </AuthStack>
      </AuthProvider>
    </NavigationContainer>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/


