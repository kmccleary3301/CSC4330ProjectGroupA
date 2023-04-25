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
import styles from '../../styles';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import NavBarContainer from '../../NavBar';
import { BarChart } from 'react-native-chart-kit';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useAuthValue } from '../../AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';


import AptRequestScreen from './AptRequestScreen';
import { useUserType } from '../../UserTypeContext';




const blue = '#182640';
const tan = '#FAE8CD';
const lightBlue = '#C9D3FF';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuthValue();
  const [userProfile, setUserProfile] = useState('');
  const [availabilities, setAvailabilities] = useState([]);

  const user = currentUser;
  const getLocalDate = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  };

  const { userType } = useUserType();

  useEffect(() => {
    const getUserProfile = async () => {
      const type = user?.displayName;
      const docRef = doc(db, type, user?.uid);
      const docSnap = await getDoc(docRef);
      setUserProfile(docSnap.data());
      fetchAvailabilities();
    };
    getUserProfile();
  }, []);

  const fetchAvailabilities = async () => {
    // Get the user's selectedSubjects
    const selectedSubjects = userProfile.selectedSubjects;
  
    if (selectedSubjects && selectedSubjects.length > 0) {
      // Query the appointments collection for open appointments with matching subjects
      const appointmentsRef = collection(db, 'appointments');
      const q = query(appointmentsRef, where('status', '==', 'open'), where('subjects', 'array-contains-any', selectedSubjects));
      const querySnapshot = await getDocs(q);
  
      // Process and store the appointment data
      const fetchedAvailabilities = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= getLocalDate();
      });
  
      setAvailabilities(fetchedAvailabilities);
    } else {
      // Handle the case when the selectedSubjects array is undefined or empty
      // You might want to show a message to the user or provide a default list of items
    }
  };

  const [selectedDate, setSelectedDate] = useState(getLocalDate());
  const [appointments, setAppointments] = useState([]);

  const formattedSelectedDate = selectedDate.toISOString().substring(0, 10);

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
  
       // Filter the availabilities for the selected date
  const filteredAppointments = availabilities.filter((availability) => {
    const availabilityDate = new Date(availability.date);
    return availabilityDate.toISOString().substring(0, 10) === localDate.toISOString().substring(0, 10);
  });

  setAppointments(filteredAppointments);
},
[setOpen, setSelectedDate, availabilities]
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 20, marginTop: -45 }]}>Welcome back, {(userProfile.firstName)}</Text>
        <Text style={[styles.title, { fontSize: 20, marginTop: -25 }]}> {userType === 'student'
          ? 'Select an Appointment:'
          : 'Upcoming Appointments'}</Text>
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
        <Text style={[styles.title, { fontSize: 18, marginTop: 100, fontFamily: 'SF' }]}>
          {selectedDate.toDateString() === new Date().toDateString() ? "Today, " : ""}
          {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
    marginTop: 30,
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