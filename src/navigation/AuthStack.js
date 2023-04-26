import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';

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
import AdminTutorEditScreen from '../screens/AdminTutorEditScreen';
import AdminStudentEditScreen from '../screens/AdminStudentEditScreen';
import RateTutorScreen from '../screens/RateTutorScreen';
import RegisterInfoScreen from '../screens/RegisterInfoScreen';
import TutorInfo from '../screens/TutorInfo';
import TutorsListScreen from '../screens/TutorsListScreen';
import SubjectAddScreen from '../screens/SubjectAddScreen';
import VerifyEmail from '../screens/VerifyEmail';
import ScheduleAvailabilityScreen from '../screens/ScheduleAvailabilityScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';


import { db, auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();

  const blue = '#182640';
  const tan = '#FAE8CD';

  const HAMBURGER ={
    headerRight: () => (
      <View style={{paddingHorizontal: 20, flexDirection: "row", justifyContent: 'space-between', padding: 5}}>
        <Ionicons name="bug-outline" color={blue} size={32} 
          onPress={() => {
            navigation.navigate('AdminTutorEditScreen');
          }}
        />
        <Ionicons name="exit-outline" color={blue} size={32} 
          onPress={() => {
            signOut(auth);
            navigation.navigate("InitialScreen");
          }}
        />
        <Ionicons name="reorder-three" color={blue} size={32} 
          onPress={() => console.log(auth)}
        />
        
      </View>
    ),
    headerStyle: {
      backgroundColor: tan,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleContainerStyle: { paddingHorizontal: 10 } 
  };
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

    <Stack.Navigator 
      initialRouteName='InitialScreen' style={{fill:tan}}>
      <Stack.Screen name="MySplashScreen"      component={MySplashScreen} options={HAMBURGER}/>
      <Stack.Screen name="InitialScreen"       component={InitialScreen} options={HAMBURGER}/>
      <Stack.Screen name="LoginScreen"         component={LoginScreen} options={HAMBURGER}/>
      <Stack.Screen name="RegisterScreen"      component={RegisterScreen} options={HAMBURGER}/>
      <Stack.Screen name="SubjectAddScreen"    component={SubjectAddScreen} options={HAMBURGER}/>
      <Stack.Screen name="HomeScreen"          component={HomeScreen} options={HAMBURGER}/>
      <Stack.Screen name="RegisterInfoScreen"  component={RegisterInfoScreen} options={HAMBURGER}/>
      <Stack.Screen name="TutorInfo"           component={TutorInfo} options={HAMBURGER}/>
      <Stack.Screen name="RateTutorScreen"     component={RateTutorScreen} options={HAMBURGER}/>
      <Stack.Screen name="TutorsListScreen"    component={TutorsListScreen} options={HAMBURGER}/>
      <Stack.Screen name="AdminTutorEditScreen"component={AdminTutorEditScreen} options={HAMBURGER}/>
      
      <Stack.Screen name="AdminStudentEditScreen"component={AdminStudentEditScreen} options={HAMBURGER}/>
      <Stack.Screen name="VerifyEmail"         component={VerifyEmail} options={HAMBURGER}/>
      <Stack.Screen name="SubjectSearchScreen" component={SubjectSearchScreen} options={HAMBURGER}/>
      <Stack.Screen name="ProfileScreen"       component={ProfileScreen} options={HAMBURGER}/>
      <Stack.Screen name="EditProfileScreen"   component={EditProfileScreen} options={HAMBURGER}/>
      <Stack.Screen name="AptRequestScreen"    component={AptRequestScreen} options={HAMBURGER}/>
      <Stack.Screen name="AppointmentsScreen"  component={AppointmentsScreen} options={HAMBURGER}/>
      <Stack.Screen name="ScheduleAvailabilityScreen"  component={ScheduleAvailabilityScreen} options={HAMBURGER}/>
      
    </Stack.Navigator>
  );
};

export default AuthStack;
