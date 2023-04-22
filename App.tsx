import React, { useState, useEffect } from 'react';
import { StyleSheet, View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import InitialScreen from './screens/InitialScreen';
import MySplashScreen from './screens/MySplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import HomeScreen from './screens/HomeScreen';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import AppHeader from './AppHeader';
import SubjectSearchScreen from './screens/SubjectSearchScreen';
import AptRequestScreen from './screens/AptRequestScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import RegisterInfoScreen from './screens/RegisterInfoScreen';
import SubjectAddScreen from './screens/SubjectAddScreen';


import VerifyEmail from './screens/VerifyEmail';
import { AuthProvider } from './AuthContext';
import {db,auth} from './firebase';
import {onAuthStateChanged} from 'firebase/auth';
import { UserTypeProvider } from './UserTypeContext';

import { getDoc, doc } from 'firebase/firestore';

import { useAccessibilityInfo } from '@react-native-community/hooks';


import { useNavigation } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

const blue = '#182640';
const tan = '#FAE8CD'; 
const lightBlue = '#C9D3FF'; 


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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [initialUserType, setInitialUserType] = useState<string | null>(null);
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
    });

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

    const getScreenOptions = (type: 'internal' | 'external', overrides = {}) => {
      const internalOptions = {
        headerTransparent: false,
        headerTintColor: '#D2B48C',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#fae8cd' },
        headerTitle: '',
        headerTitleAlign: 'center',
        header: (props) => (
          <AppHeader
            style
            back={false}
            headerBg="#fae8cd"
            iconColor="#182640"
            tintColor
            title="Home"
            menu
            right="menu"
            onMenuPress={() => setDrawerOpen(true)}
            onLogoutPress={() => console.log('Logout')}
            {...props}
          />
        ),
      };
  
      const externalOptions = {
        headerTransparent: true,
        headerTintColor: 'tan',
        headerTitle: '',
        headerShadowVisible: false,
      };
      
  
      const baseOptions = type === 'internal' ? internalOptions : externalOptions;
  
      return {
        ...baseOptions,
        ...overrides,
      };
    };
  
    
  
  return (
    
    <UserTypeProvider initialUserType={initialUserType}>
   <Drawer
    type="overlay"
    content={
      <SideMenu
        onClose={() => setDrawerOpen(false)}
        onLogout={() => console.log('Logout')}
        onHelpCenter={() => console.log('Help Center')}
        onPrivacyPolicy={() => console.log('Privacy Policy')}
        onSettings={() => console.log('Settings')}
      />
    }
    open={drawerOpen}
    tapToClose={true}
    openDrawerOffset={0.2}
    panCloseMask={0.2}
    closedDrawerOffset={-3}
    styles={{ drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 } }}
    tweenHandler={ratio => ({
      main: { opacity: 1 },
      mainOverlay: { opacity: ratio / 2, backgroundColor: 'black' },
    })}
  >
    <NavigationContainer>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
      <Stack.Navigator initialRouteName='InitialScreen'>
        <Stack.Screen name="MySplashScreen" component={MySplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="InitialScreen" component={InitialScreen}
          options={{headerShown: false}}    
        />
        <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={getScreenOptions('external')}
      />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}
        options={getScreenOptions('external')} />
        <Stack.Screen name="SubjectAddScreen" component={SubjectAddScreen}
        options={getScreenOptions('external')} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={getScreenOptions('internal')}
        />
        <Stack.Screen name="RegisterInfoScreen" component={RegisterInfoScreen}
        options={getScreenOptions('external')} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail}
        options={getScreenOptions('external')} />

          <Stack.Screen
            name="SubjectSearchScreen"
            component={SubjectSearchScreen}
            options={getScreenOptions('internal')}
          />
        <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
        />
        <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
        />
        <Stack.Screen
            name="AptRequestScreen"
            component={AptRequestScreen}
            options={getScreenOptions('internal')}
          />
          <Stack.Screen
            name="AppointmentsScreen"
            component={AppointmentsScreen}
            options={getScreenOptions('internal')}
          />
          
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
    </Drawer>
    </UserTypeProvider>
    
  );
}



export default App;


