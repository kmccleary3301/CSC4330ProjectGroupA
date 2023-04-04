import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import styles from '../styles';
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import * as Font from 'expo-font'
  import { Ionicons } from '@expo/vector-icons';


  const HomeScreen = () => {
    const navigation = useNavigation();
    //issues here with calender icon
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: 25, marginTop: -45} ]}>Select an Appointment:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.title, {fontSize: 15, marginTop: -90, marginLeft: -10, fontFamily: 'SF'} ]}>Change Date:</Text>
        </View>
        <Text style={[styles.title, {fontSize: 18, marginTop: 100, fontFamily: 'SF'}]}>Today, {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</Text>

      </View>
    );
  };




//   function HomeScreen({ navigation }) {
//     return (
//         <View>
//             <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//             <Text>Home</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('My Appointments')}>
//             <Text>My Appointments</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//             <Text>Profile</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('More')}>
//             <Text>Home</Text>
//             </TouchableOpacity>
//         </View>
//     )
//   }
export default HomeScreen;
