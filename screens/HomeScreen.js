import React, { useState } from 'react';
import {
    View,
    Text,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import styles from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

  const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
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
