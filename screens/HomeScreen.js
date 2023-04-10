import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    Platform,
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import NavBarContainer from '../NavBar';
import { BarChart } from 'react-native-chart-kit';
import { StyleSheet } from 'react-native';
//import DatePicker from 'react-native-date-picker';


const isWeb = Platform.OS === 'web';

let DatePicker;

if (isWeb) {
  //DatePicker = require('react-datepicker').default;
} else {
  DatePicker = require('react-native-date-picker').DatePicker;
}


const blue = '#182640';
const tan = '#FAE8CD'; 

  const HomeScreen = ({ navigation }) => {
  
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showError, setShowError] = useState(false);

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const handleConfirm = (selectedDate) => {
    setOpen(false)
    setDate(selectedDate)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const appointments = [
    { id: 1, name: 'David Sorenti', rating: '4.9/5', subject: 'Geography', time: '3:30-4:30' },
    { id: 2, name: 'Jessica Juarez', rating: '4.65/5', subject: 'Calculus', time: '3:30-4:30' },
    { id: 3, name: 'James Dunsen', rating: '3.90/5', subject: 'Astronomy', time: '3:30-4:30' },
    { id: 4, name: 'Michael Bergeron', rating: '4.25/5', subject: 'Comp Sci', time: '3:30-4:30' },
  ];

  const onSelectAppointment = () => {
    if (selectedEntry === null) {
      setShowError(true);
    } else {
      setShowError(false);
      const selectedAppointment = appointments.find(
        (appointment) => appointment.id === selectedEntry
      );
      navigation.navigate('AptRequestScreen', { appointment: selectedAppointment });
    }
  };

  const onSearchBySubject = () => {
    navigation.navigate('SubjectSearchScreen');
  };

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    
    //issues here with calender icon
    return (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={[styles.title, { fontSize: 20, marginTop: -35 }]}>Select an Appointment:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setOpen(true)}>
            <Ionicons name="calendar" size={45} color="#FAE8CD" />
            </TouchableOpacity>
            <View>
      <Text>Selected date: {date.toLocaleDateString()}</Text>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        maximumDate={new Date("2023-12-31")}
        minimumDate={new Date("2023-01-01")}
        androidVariant="iosClone"
        minuteInterval={5}
        mode="date"
        locale="en"
        textColor="#000000"
        timeZoneOffsetInMinutes={undefined}
        dividerHeight={1}
        is24hourSource="device"
        title="Select a date"
        confirmText="Confirm"
        cancelText="Cancel"
        theme="auto"
      />
    </View>
            </View>

            <Text style={[styles.title, { fontSize: 18, marginTop: 100, fontFamily: 'SF' }]}>{selectedDate === new Date().toISOString().split('T')[0] ? "Today, " : ""}{new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>

      
            <View style={sStyles.table}>
              <View style={sStyles.tableRow}> {/* Correctly close the table header row here */}
                <Text style={sStyles.headerEntry}>Instructor Name</Text>
                <Text style={sStyles.headerEntry}>Rating</Text>
                <Text style={sStyles.headerEntry}>Subject</Text>
                <Text style={sStyles.headerEntry}>Time Slot</Text>
              </View>
              {appointments.map((appointment, index) => (
                <TouchableOpacity
                  key={appointment.id}
                  style={[
                    sStyles.tableRow,
                    { backgroundColor: selectedEntry === appointment.id ? 'lightblue' : tan },
                  ]}
                  onPress={() => setSelectedEntry(appointment.id)}
                >
                  <Text style={sStyles.entry}>{appointment.name}</Text>
                  <Text style={sStyles.entry}>{appointment.rating}</Text>
                  <Text style={sStyles.entry}>{appointment.subject}</Text>
                  <Text style={sStyles.entry}>{appointment.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
      
            {showError && (
              <Text style={{ color: 'red', marginTop: 10 }}>You must select an appointment first</Text>
            )}

            <TouchableOpacity onPress={onSearchBySubject} style={sStyles.link}>
              <Text style={sStyles.linkText}>Search by subject instead</Text>
            </TouchableOpacity>
      
            <TouchableOpacity onPress={onSelectAppointment} style={sStyles.selectButton}>
              <Text style={sStyles.selectButtonText}>Select</Text>
            </TouchableOpacity>
      
            
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
      width: '96%',
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
      paddingHorizontal: 4,
      paddingVertical: 8,
      paddingTop: 11,
      fontSize: 10,
      height: 35,
      textAlign: 'center',
      textAlignVertical: 'center',
      flex: 1,
      minWidth: 94,
      maxWidth: 94,

    },
    entry: {
      backgroundColor: '#FAE8CD',
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 2,
      fontSize: 10,
      height: 35,
      textAlign: 'center',
      textAlignVertical: 'center',
      flex: 1,
      minWidth: 94,
      maxWidth: 94,
      paddingVertical:9,
      
    },
    button: {
        width: '40%',
        height: 50,
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 2,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
    
      buttonText: {
        color: tan,
        fontWeight: 'bold',
        fontFamily: 'SFBold',
        fontSize: 24,
        marginTop: -1,
        marginBottom: -1,
      },
    
      linkContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center',
      },
    
      linkText: {
        color: tan,
        fontFamily: 'SF',
        fontSize: 16,
      },
    
      link: {
        color: tan,
        fontWeight: 'bold',
        marginTop: 25,
        fontFamily: 'SF',
      },
      selectButton: {
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 4,
        marginTop: 25,
        backgroundColor: blue,
        paddingHorizontal: 20,
        paddingVertical: 10,
        //borderRadius: 5,
        },
        selectButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        },
  });
  
  

export default HomeScreen;