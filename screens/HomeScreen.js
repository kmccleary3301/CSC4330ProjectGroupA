import React, { useState, useEffect } from 'react';
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
import {useAuthValue} from '../AuthContext';
import {signOut} from 'firebase/auth';
import {auth, db} from '../firebase';
import {getDoc, doc} from 'firebase/firestore';


import AptRequestScreen from './AptRequestScreen';
import { useUserType } from '../UserTypeContext';




const blue = '#182640';
const tan = '#FAE8CD'; 
const lightBlue = '#C9D3FF';

 const HomeScreen = () => {
   const navigation = useNavigation();
   const {currentUser} = useAuthValue();
   const [userProfile, setUserProfile] = useState('');
   const user = currentUser;
   const getLocalDate = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  };

  const { userType } = useUserType();

  useEffect(() => {
    const getUserProfile = async () => {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      setUserProfile(docSnap.data())
      //console.log("data:", userProfile.firstName);
      };
    getUserProfile();
  }, []);
  
  const [selectedDate, setSelectedDate] = useState(getLocalDate());

   const mockAppointments = [
    {
    date: '2023-04-22',
    appointments: [
      { id: 20, name: 'William White', rating: '4.9/5', subject: 'Geography', time: '3:30-4:30' },
      { id: 21, name: 'Alexander Walker', rating: '4.8/5', subject: 'Calculus', time: '3:30-4:30' },
      { id: 22, name: 'Harper Thompson', rating: '4.7/5', subject: 'Astronomy', time: '3:30-4:30' },
      { id: 23, name: 'Jacob Martin', rating: '4.6/5', subject: 'Comp Sci', time: '3:30-4:30' },
      { id: 24, name: 'Isabella Clark', rating: '4.5/5', subject: 'Biology', time: '3:30-4:30' },
      { id: 25, name: 'Ella Lee', rating: '4.4/5', subject: 'History', time: '3:30-4:30' },
      { id: 26, name: 'Benjamin Hernandez', rating: '4.3/5', subject: 'Physics', time: '3:30-4:30' },
      { id: 27, name: 'Michael Rodriguez', rating: '4.2/5', subject: 'Algebra', time: '3:30-4:30' },
      { id: 28, name: 'Evelyn Lewis', rating: '4.1/5', subject: 'Chemistry', time: '3:30-4:30' },
      { id: 29, name: 'Liam Hall', rating: '4.0/5', subject: 'English', time: '3:30-4:30' },
      { id: 30, name: 'Abigail Scott', rating: '3.9/5', subject: 'Spanish', time: '3:30-4:30' },
    ],
  }];

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
      <Text style={[styles.title, {fontSize: 20, marginTop: -55} ]}>Hello,{userProfile.firstName}</Text>
        <Text style={[styles.title, {fontSize: 20, marginTop: -35} ]}> {userType === 'student'
          ? 'Select an Appointment:'
          : 'Upcoming appointments'}</Text>
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