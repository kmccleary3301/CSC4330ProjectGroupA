import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';


/*
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MomentsScreen from '../screens/MomentsScreen';
import SettingsScreen from '../screens/SettingsScreen';
*/


//import Drawer from 'react-native-drawer';
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
import TutorInfo from '../screens/TutorInfo';
import SubjectAddScreen from '../screens/SubjectAddScreen';
import VerifyEmail from '../screens/VerifyEmail';

import SideMenu from '../../SideMenu';
import AppHeader from '../../AppHeader';

import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator 
      initialRouteName="InitialScreen"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
      },
    }}>
      <Drawer.Screen name="MySplashScreen"      component={MySplashScreen}/>
      <Drawer.Screen name="InitialScreen"       component={InitialScreen}/>
      <Drawer.Screen name="LoginScreen"         component={LoginScreen}/>
      <Drawer.Screen name="RegisterScreen"      component={RegisterScreen}/>
      <Drawer.Screen name="TutorInfo"           component={TutorInfo}/>
      <Drawer.Screen name="SubjectAddScreen"    component={SubjectAddScreen}/>
      <Drawer.Screen name="HomeScreen"          component={HomeScreen}/>
      <Drawer.Screen name="RegisterInfoScreen"  component={RegisterInfoScreen}/>
      <Drawer.Screen name="VerifyEmail"         component={VerifyEmail}/>
      <Drawer.Screen name="SubjectSearchScreen" component={SubjectSearchScreen}/>
      <Drawer.Screen name="ProfileScreen"       component={ProfileScreen}/>
      <Drawer.Screen name="EditProfileScreen"   component={EditProfileScreen}/>
      <Drawer.Screen name="AptRequestScreen"    component={AptRequestScreen}/>
      <Drawer.Screen name="AppointmentsScreen"  component={AppointmentsScreen}/>
    </Drawer.Navigator>
  );
};

export default AuthStack;
