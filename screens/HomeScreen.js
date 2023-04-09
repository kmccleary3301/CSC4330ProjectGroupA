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
  import NavBarContainer from '../NavBar';
  import { BarChart } from 'react-native-chart-kit';
  import { StyleSheet } from 'react-native';


  const HomeScreen = () => {
    const navigation = useNavigation();
    //issues here with calender icon
    return (
        <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: 20, marginTop: -35} ]}>Select an Appointment:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name= "calendar" size={45} color= "tan" style={{ marginRight: 30, marginTop: -35 }}/>
          <Text style={[styles.title, {fontSize: 20, marginTop: -90, marginLeft: 60, fontFamily: 'SF'} ]}>Change Date:</Text>
        </View> 
        <Text style={[styles.title, {fontSize: 18, marginTop: 100, fontFamily: 'SF'}]}>Today, {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</Text>
        
        <View style={sStyles.table}>
          <View style={sStyles.tableRow}>
            <Text style={sStyles.headerEntry}>Instructor Name</Text>
            <Text style={sStyles.headerEntry}>Rating</Text>
            <Text style={sStyles.headerEntry}>Subject</Text>
            <Text style={sStyles.headerEntry}>Time Slot</Text>
          </View>
          <View style={sStyles.tableRow}>
            <Text style={sStyles.entry}>David Sorenti</Text>
            <Text style={sStyles.entry}>4.9/5</Text>
            <Text style={sStyles.entry}>Geography</Text>
            <Text style={sStyles.entry}>3:30-4:30</Text>
          </View>
          <View style={sStyles.tableRow}>
            <Text style={sStyles.entry}>Jessica Juarez</Text>
            <Text style={sStyles.entry}>4.65/5</Text>
            <Text style={sStyles.entry}>Calculus</Text>
            <Text style={sStyles.entry}>3:30-4:30</Text>
          </View>
          <View style={sStyles.tableRow}>
            <Text style={sStyles.entry}>James Dunsen</Text>
            <Text style={sStyles.entry}>3.90/5</Text>
            <Text style={sStyles.entry}>Astronomy</Text>
            <Text style={sStyles.entry}>3:30-4:30</Text>
          </View>
          <View style={sStyles.tableRow}>
            <Text style={sStyles.entry}>Michael Bergeron</Text>
            <Text style={sStyles.entry}>4.25/5</Text>
            <Text style={sStyles.entry}>Comp Sci</Text>
            <Text style={sStyles.entry}>3:30-4:30</Text>
        </View>
        </View>
      </View>
      <NavBarContainer />
    </View>
      
    );
  };

  const sStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'tan',
      fontFamily: 'SF',
    },
    table: {
      marginTop: 70,
      width: '90%',
      borderWidth: 1,
      borderColor: 'black',
    },
    tableRow: {
      flexDirection: 'row',
    },
    headerEntry: {
      backgroundColor: 'white',
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 5,
      fontSize: 10,
      height: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
      flex: 1,
      minWidth: 85,
      maxWidth: 85,
    },
    entry: {
      backgroundColor: 'tan',
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 5,
      fontSize: 10,
      height: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
      flex: 1,
      minWidth: 85,
      maxWidth: 85,
    },
  });
  
  

export default HomeScreen;