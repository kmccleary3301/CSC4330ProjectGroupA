import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InitialScreen from '../screens/InitialScreen';
import MySplashScreen from '../screens/MySplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import SubjectSearchScreen from '../screens/SubjectSearchScreen';
import AptRequestScreen from '../screens/AptRequestScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import RegisterInfoScreen from '../screens/RegisterInfoScreen';
import SubjectAddScreen from '../screens/SubjectAddScreen';
import VerifyEmail from '../screens/VerifyEmail';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    /*
    <Stack.Navigator initialRouteName='InitialScreen'>
      
      <Stack.Screen name="MySplashScreen"      component={MySplashScreen}      options={{headerShown: false}}/>
      <Stack.Screen name="InitialScreen"       component={InitialScreen}       options={{headerShown: false}}/>
      <Stack.Screen name="LoginScreen"         component={LoginScreen}         options={getScreenOptions('external')}/>
      <Stack.Screen name="RegisterScreen"      component={RegisterScreen}      options={getScreenOptions('external')}/>
      <Stack.Screen name="SubjectAddScreen"    component={SubjectAddScreen}    options={getScreenOptions('external')}/>
      <Stack.Screen name="HomeScreen"          component={HomeScreen}          options={getScreenOptions('internal')}/>
      <Stack.Screen name="RegisterInfoScreen"  component={RegisterInfoScreen}  options={getScreenOptions('external')}/>
      <Stack.Screen name="VerifyEmail"         component={VerifyEmail}         options={getScreenOptions('external')}/>
      <Stack.Screen name="SubjectSearchScreen" component={SubjectSearchScreen} options={getScreenOptions('internal')}/>
      <Stack.Screen name="ProfileScreen"       component={ProfileScreen}       options={getScreenOptions('internal')}/>
      <Stack.Screen name="EditProfileScreen"   component={EditProfileScreen}   options={getScreenOptions('internal')}/>
      <Stack.Screen name="AptRequestScreen"    component={AptRequestScreen}    options={getScreenOptions('internal')}/>
      <Stack.Screen name="AppointmentsScreen"  component={AppointmentsScreen}  options={getScreenOptions('internal')}/>
      
    </Stack.Navigator>
    */

    <Stack.Navigator initialRouteName='InitialScreen'>
      
      <Stack.Screen name="MySplashScreen"      component={MySplashScreen}/>
      <Stack.Screen name="InitialScreen"       component={InitialScreen}/>
      <Stack.Screen name="LoginScreen"         component={LoginScreen}/>
      <Stack.Screen name="RegisterScreen"      component={RegisterScreen}/>
      <Stack.Screen name="SubjectAddScreen"    component={SubjectAddScreen}/>
      <Stack.Screen name="HomeScreen"          component={HomeScreen}/>
      <Stack.Screen name="RegisterInfoScreen"  component={RegisterInfoScreen}/>
      <Stack.Screen name="VerifyEmail"         component={VerifyEmail}/>
      <Stack.Screen name="SubjectSearchScreen" component={SubjectSearchScreen}/>
      <Stack.Screen name="ProfileScreen"       component={ProfileScreen}/>
      <Stack.Screen name="EditProfileScreen"   component={EditProfileScreen}/>
      <Stack.Screen name="AptRequestScreen"    component={AptRequestScreen}/>
      <Stack.Screen name="AppointmentsScreen"  component={AppointmentsScreen}/>
      
    </Stack.Navigator>
  );
};

export default AuthStack;
