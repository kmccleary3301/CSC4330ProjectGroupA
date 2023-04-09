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
  import { BarChart } from 'react-native-chart-kit';



  const HomeScreen = () => {
    const navigation = useNavigation();
    //issues here with calender icon
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: 30, marginTop: -45} ]}>Select an Appointment:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name= "calendar" size={45} color= "tan" style={{ marginRight: 30, marginTop: -35 }}/>
          <Text style={[styles.title, {fontSize: 20, marginTop: -90, marginLeft: 60, fontFamily: 'SF'} ]}>Change Date:</Text>
        </View> 
        <Text style={[styles.title, {fontSize: 18, marginTop: 100, fontFamily: 'SF'}]}>Today, {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</Text>
        
        <table style={{ marginTop: 70, height: 300, width: "75%", border: '1px solid black', borderCollapse: 'collapse' }}>
          <tr>
            <th style={{ backgroundColor: 'white', border: '1px solid black', padding: '5px' }}>Instructor Name</th>
            <th style={{ backgroundColor: 'white', border: '1px solid black', padding: '5px' }}>Rating</th>
            <th style={{ backgroundColor: 'white', border: '1px solid black', padding: '5px' }}>Subject</th>
            <th style={{ backgroundColor: 'white', border: '1px solid black', padding: '5px' }}>Time Slot</th>
          </tr>
          <tr>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>David Sorenti</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>4.9/5</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>Geography</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>3:30-4:30</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>Jessica Juarez</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>4.65/5</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>Calculus</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>3:30-4:30</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>James Dunsen</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>3.90/5</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>Astronomy</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>3:30-4:30</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>Michael Bergeron</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>4.25/5</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>Comp Sci</td>
            <td style={{ backgroundColor: 'tan', border: '1px solid black', padding: '5px' }}>3:30-4:30</td>
          </tr>
        </table>

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