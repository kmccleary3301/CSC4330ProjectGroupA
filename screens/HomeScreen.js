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

  const HomeScreen = () => {
    const navigation = useNavigation();
    //issues here with calender icon
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: 25, marginTop: -45} ]}>Select an Appointment:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image name="tan" color =""/>
          <Text style={[styles.title, {fontSize: 15, marginTop: -90, marginLeft: -10, fontFamily: 'SF'} ]}>Change Date:</Text>
        </View>
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
