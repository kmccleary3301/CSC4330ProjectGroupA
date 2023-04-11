import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import NavBarContainer from '../NavBar';
import { BarChart } from 'react-native-chart-kit';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import AptRequestScreen from './AptRequestScreen';

const blue = '#182640';
const tan = '#FAE8CD'; 
const lightBlue = '#C9D3FF';

 const HomeScreen = () => {
   const navigation = useNavigation();

   const getLocalDate = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  };
  
  const [selectedDate, setSelectedDate] = useState(getLocalDate());

   const mockAppointments = [
    {
      date: '2023-04-06',
      appointments: [
        { id: 1, name: 'David Sorenti', rating: '4.9/5', subject: 'Geography', time: '3:30-4:30' },
        { id: 2, name: 'Jessica Juarez', rating: '4.65/5', subject: 'Calculus', time: '3:30-4:30' },
        { id: 3, name: 'James Dunsen', rating: '3.90/5', subject: 'Astronomy', time: '3:30-4:30' },
        { id: 4, name: 'Michael Bergeron', rating: '4.25/5', subject: 'Comp Sci', time: '3:30-4:30' },
      ],
    },
    {
      date: '2023-04-07',
      appointments: [
        { id: 5, name: 'Emma Johnson', rating: '4.5/5', subject: 'Biology', time: '3:30-4:30' },
        { id: 6, name: 'Sophia Turner', rating: '4.8/5', subject: 'History', time: '3:30-4:30' },
      ],
    },
    {
      date: '2023-04-10',
      appointments: [
        { id: 7, name: 'Oliver Smith', rating: '4.3/5', subject: 'Physics', time: '3:30-4:30' },
        { id: 8, name: 'Liam Brown', rating: '4.7/5', subject: 'Algebra', time: '3:30-4:30' },
        { id: 9, name: 'Charlotte Jones', rating: '4.6/5', subject: 'Chemistry', time: '3:30-4:30' },
      ],
    },
    {
      date: '2023-04-11',
      appointments: [
        { id: 10, name: 'Noah Williams', rating: '4.9/5', subject: 'English', time: '3:30-4:30' },
        { id: 11, name: 'Mia Davis', rating: '4.8/5', subject: 'Spanish', time: '3:30-4:30' },
        { id: 12, name: 'Lucas Miller', rating: '4.7/5', subject: 'French', time: '3:30-4:30' },
        { id: 13, name: 'Elijah Wilson', rating: '4.6/5', subject: 'German', time: '3:30-4:30' },
        { id: 14, name: 'Ava Taylor', rating: '4.5/5', subject: 'Latin', time: '3:30-4:30' },
        { id: 15, name: 'Logan Anderson', rating: '4.4/5', subject: 'Italian', time: '3:30-4:30' },
       { id: 16, name: 'Mason Thomas', rating: '4.3/5', subject: 'Russian', time: '3:30-4:30' },
       { id: 17, name: 'Ethan Jackson', rating: '4.2/5', subject: 'Japanese', time: '3:30-4:30' },
       { id: 18, name: 'Emily Moore', rating: '4.1/5', subject: 'Chinese', time: '3:30-4:30' },
       { id: 19, name: 'Daniel Harris', rating: '4.0/5', subject: 'Korean', time: '3:30-4:30' },
      ],
    },
  ];

  const formattedSelectedDate = selectedDate.toISOString().substring(0, 10);

  


  const dateAppointments = mockAppointments.find(
    (appointmentDate) => appointmentDate.date === formattedSelectedDate
  );
  
  const appointments = dateAppointments ? dateAppointments.appointments : [];
  console.log('Selected date:', formattedSelectedDate);
  console.log('Appointments:', appointments);
  console.log('Selected appointment ID:', selectedAppointmentId);


   const [selectedEntry, setSelectedEntry] = useState(null);
   const [showError, setShowError] = useState(false);

   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);


   const onSelectAppointment = () => {
    if (selectedAppointmentId === null) {
      setShowError(true);
    } else {
      setShowError(false);
      const selectedAppointment = appointments.find(
        (appointment) => appointment.id === selectedAppointmentId
      );
      navigation.navigate('AptRequestScreen', { appointment: selectedAppointment });
      setSelectedAppointmentId(null);
    }
  };

  const onAppointmentPress = (appointmentId) => {
    setShowError(false);
    setSelectedAppointmentId(appointmentId);
  };

   const onSearchBySubject = () => {
    navigation.navigate('SubjectSearchScreen');
   };


   const [open, setOpen] = useState(false);

   const onDismissSingle = React.useCallback(() => {
    setOpen(false);
   }, [setOpen]);

   const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      const localDate = new Date(params.date.getTime() - params.date.getTimezoneOffset() * 60000);
      setSelectedDate(localDate);
    },
    [setOpen, setSelectedDate]
  );

    return (
        <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: 20, marginTop: -35} ]}>Select an Appointment:</Text>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Text style={[styles.title, { fontSize: 20, marginTop: -92, marginLeft: 60, fontFamily: 'SF' }]}>Change Date:</Text>
          <TouchableOpacity onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          <Ionicons name="calendar" size={45} color='#FAE8CD' style={{ marginRight: 30, marginTop: -35 }} />
          </TouchableOpacity>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={selectedDate}
            onConfirm={onConfirmSingle}
          />
         
        </View>
        <Text style={[styles.title, {fontSize: 18, marginTop: 100, fontFamily: 'SF'}]}>
          {selectedDate.toDateString() === new Date().toDateString() ? "Today, " : ""}
          {selectedDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
        </Text>
        
        <ScrollView style={sStyles.table} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={sStyles.tableRow}>
        <View style={sStyles.headerEntry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Instructor Name</Text>
        </View>
        <View style={sStyles.headerEntry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Rating</Text>
        </View>
        <View style={sStyles.headerEntry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Subject</Text>
        </View>
        <View style={sStyles.headerEntry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Time Slot</Text>
        </View>
      </View>
      {appointments.map((appointment) => (
    <TouchableOpacity
      key={appointment.id}
      onPress={() => onAppointmentPress(appointment.id)}
    >
      <View
        style={
          selectedAppointmentId === appointment.id
            ? sStyles.selectedRow
            : sStyles.tableRow
        }
      >
        <View style={selectedAppointmentId === appointment.id ? sStyles.selectedEntry : sStyles.entry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.name}</Text>
        </View>
        <View style={selectedAppointmentId === appointment.id ? sStyles.selectedEntry : sStyles.entry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.rating}</Text>
        </View>
        <View style={selectedAppointmentId === appointment.id ? sStyles.selectedEntry : sStyles.entry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.subject}</Text>
        </View>
        <View style={selectedAppointmentId === appointment.id ? sStyles.selectedEntry : sStyles.entry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ))}
        </ScrollView>
        <Button
          mode="contained"
          style={sStyles.button}
          contentStyle={sStyles.buttonContent}
          onPress={onSelectAppointment}
          color={blue}
        >
          <Text style={sStyles.buttonText}>Select</Text>
        </Button>
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
    fontFamily: 'Vikendi',
    },
    table: {
    marginTop: 70,
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    maxHeight: '50%',
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
    height: 40,
    width: '25%',
    justifyContent: 'center',
    },
    entry: {
    backgroundColor: tan,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    fontSize: 10,
    height: 40,
    width: '25%',
    justifyContent: 'center',
    },
    selectedEntry: {
    backgroundColor: lightBlue,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    fontSize: 10,
    height: 40,
    width: '25%',
    justifyContent: 'center',
    },
    selectedRow: {
    backgroundColor: lightBlue,
    flexDirection: 'row',
    },
    button: {
    width: '32%',
    height: '8%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4.5,
    //padding: 0,
    //alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: blue,
    },
    buttonText: {
    color: tan,
    fontSize: 20,
    fontFamily: 'SF',
    //fontWeight: 'bold',
    },
    buttonContent: {
    //height: 50,
    },
    });
  
  

export default HomeScreen;