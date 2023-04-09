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
import HomeScreen from './screens/HomeScreen';

import { useAccessibilityInfo } from '@react-native-community/hooks';
import TailwindProvider from 'tailwind-rn';
import useTailwind from 'tailwind-rn';

//import TailwindProvider from './node_modules/tailwind-rn/dist/tailwind-provider'; // Modify this path based on your folder structure
//import useTailwind from './node_modules/tailwind-rn/dist/use-tailwind'; // Modify this path based on your folder structure

import { useNavigation } from '@react-navigation/native';
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
    const [drawerOpen, setDrawerOpen] = useState(false);


  const blue = '#182640';
  const tan = '#FAE8CD';  

  //const navigation = useNavigation();

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

  //const navigation = useNavigation();

  if (!fontsLoaded || !hideSplashScreen) {
    return <MySplashScreen />;
  }

 
  return (
   //<TailwindProvider utilities={myUtilities}>
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
      <Stack.Navigator initialRouteName='InitialScreen'>
        <Stack.Screen name="MySplashScreen" component={MySplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="InitialScreen" component={InitialScreen}
          options={{headerShown: false}}
          
        />
        <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTransparent: true,
          headerTintColor: 'tan',
          headerTitle: '',
          headerShadowVisible: false,
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.navigate('InitialScreen')}>
          //     <View style={{ marginLeft: 20, marginTop: 10 }}>
          //       <Image
          //         source={require('./assets/icons/back.png')}
          //         style={{ width: 20, height: 20 }}
          //       />
          //     </View>
          //   </TouchableOpacity>
          // ),
        }}
      />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}
        options={{
          headerTransparent: true,
          headerTintColor: 'tan',
          headerTitle: '',
          headerShadowVisible: false,
        }} />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}
          
          options={{
            headerTransparent: false,
            headerTintColor: '#D2B48C',
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#fae8cd'},
            headerTitle: () => (
                <Image
                    source={require('./assets/logos/blue.png')}
                    style={{width: 70, height: 70, marginTop: -15}}/>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('AppointmentsScreen')}>
                <Image
                    source={require('./assets/icons/menu.png')}
                    />
              </TouchableOpacity>
            ),
            
          }}
        />
      <Stack.Screen 
          name="AppointmentsScreen" 
          component={AppointmentsScreen}
          
          options={{
            headerTransparent: false,
            headerTintColor: '#D2B48C',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#fae8cd' },
            headerTitle: '',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <AppHeader onHamburgerPress={() => setDrawerOpen(true)} />
            ),
          }}
          />
      


      </Stack.Navigator>
    </NavigationContainer>
    </Drawer>
    
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