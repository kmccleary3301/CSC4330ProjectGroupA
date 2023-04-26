import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import NavBarContainer from '../../NavBar';
import { StyleSheet } from 'react-native';
import { auth, db } from '../../firebase';
import {doc, setDoc, getDoc, query, collection, where, getDocs} from "firebase/firestore";
import { useAuthValue } from "../../AuthContext";
import { Button } from 'react-native-paper';

const blue = '#182640';
const tan = '#FAE8CD';
const lightBlue = '#C9D3FF';

const AppointmentsScreen = () => {
  const navigation = useNavigation();
  const {currentUser} = useAuthValue();
  const user = currentUser;
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Your mock data for future and past appointments

  const test_entry = {
    id: 2,
    name: 'TEST ENTRY',
    rating: 4.5,
    subject: 'Math',
    time: '10:00 AM',
    date: '2020-12-01',
    duration: '1 hour',
    location: 'Online',
    status: 'Pending',
    appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
  };

  const futureAppointments_template = [
    // ...

    // Example appointment object
    {
      id: 2,
      name: 'Jane Doe',
      rating: 4.5,
      subject: 'Math',
      time: '10:00 AM',
      date: '2020-12-01',
      duration: '1 hour',
      location: 'Online',
      status: 'Pending',
      appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
    },
    {
      id: 3,
      name: 'James Dunsen',
      rating: 4.5,
      subject: 'Astronomy',
      time: '10:00 AM',
      date: '2023-24-02',
      duration: '1 hour',
      location: 'Online',
      status: 'Pending',
      appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
    },
    {
      id: 4,
      name: 'Michael Bergeron',
      rating: 4.5,
      subject: 'Comp Sci',
      time: '10:00 AM',
      date: '2023-24-02',
      duration: '1 hour',
      location: 'Online',
      status: 'Pending',
      appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
    },
    {
      id: 5,
      name: 'Hailey Martinez',
      rating: 4.5,
      subject: 'English',
      time: '10:00 AM',
      date: '2023-01-03',
      duration: '1 hour',
      location: 'Online',
      status: 'Pending',
      appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
    },

  ];

  const pastAppointments_template = [
    // ...
    {
      id: 1,
      name: 'Jessica Doe',
      rating: 4.5,
      subject: 'English',
      time: '10:00 AM',
      date: '2020-12-01',
      duration: '1 hour',
      location: 'Online',
      status: 'Completed',
      appointmentNotes: 'I am illiterate.',
    },

    {
      id: 2,
      name: 'Jessica Juarez',
      rating: 4,
      subject: 'Calculus',
      time: '10:00 AM',
      date: '2023-23-03',
      duration: '1 hour',
      location: 'Online',
      status: 'Completed',
      appointmentNotes: 'I am illiterate.',
    },
    {
      id: 3,
      name: 'Michael Bergeron',
      rating: 4.5,
      subject: 'Comp Sci',
      time: '10:00 AM',
      date: '2023-24-02',
      duration: '1 hour',
      location: 'Online',
      status: 'Pending',
      appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
    },
    {
      id: 4,
      name: 'Michael Bergeron',
      rating: 4.5,
      subject: 'Comp Sci',
      time: '10:00 AM',
      date: '2023-24-02',
      duration: '1 hour',
      location: 'Online',
      status: 'Pending',
      appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
    },
    {
      id: 5,
      name: 'Michael Bergeron',
      rating: 4.5,
      subject: 'Comp Sci',
      time: '10:00 AM',
      date: '2023-24-02',
      duration: '1 hour',
      location: 'Online',
      status: 'Pending',
      appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
    },

  ];

  // Function to handle rating
  const handleRating = (appointmentId, rating) => {
    // Update the appointment rating in your state/database
  };

  const navigateToHistory = () => {
    navigation.navigate('HistoryScreen');
  };

  const onAppointmentPress = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };
  const [pastAppointments, setPastAppointments] = useState(pastAppointments_template);

  setTimeout(function(){
    console.log("Calling delayed action");
    pastAppointments.push(test_entry);
    setPastAppointments([...pastAppointments]);
  }, 10000);

  const [futureAppointments, setFutureAppointments] = useState([]);

  const get_single_appt = async function(appt_data){
    const student_data = await getDoc(doc(db, 'student', appt_data["student_id"]));
    const appt_entry = {
      student_name: student_data.data()["firstName"]+" "+student_data.data()["lastName"],
      date: appt_data["date"],
      subject: appt_data["subject"],
      time: appt_data["time"],
      tutor_id: appt_data["tutor_id"]
    }
    const new_appts = futureAppointments;
    new_appts.push(appt_entry);
    setFutureAppointments([...new_appts]);
  }

  const get_future_appointments = async function(){
    if (futureAppointments.length > 0) { return; }
    var q, querySnapshot;
    if (user?.displayName == "tutor"){
      q = query(collection(db, "appointments"), where("tutor_id", "==", user?.uid));
      querySnapshot = await getDocs(q);
    } else {
      q = query(collection(db, "appointments"), where("student_id", "==", user?.uid));
      querySnapshot = await getDocs(q);
    }
    querySnapshot.forEach((doc_get) => {
        var get_data = doc_get.data();
        console.log(doc_get.id, "=>", doc_get.data());
        get_single_appt(get_data);
        //const appointment_entry = {name: student_data.data()["fir"]};
        //get_data[field] = new_value;
        //setDoc(doc(db, 'student', doc_get.id), get_data);
    });
  }

  get_future_appointments();

  return (
    <View style={{ flex: 1 }}>

      <View style={[styles.container, { alignItems: 'center' }]}>
        <Text style={[styles.title, { fontSize: 20, marginTop: -45 }]}>My Appointments:</Text>

        {/* My Appointments Table */}
        <ScrollView style={sStyles.table} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={sStyles.tableRow}>
            <View style={sStyles.headerEntry}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Instructor Name</Text>
            </View>
            <View style={sStyles.headerEntry}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Date</Text>
            </View>
            <View style={sStyles.headerEntry}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Subject</Text>
            </View>
            <View style={sStyles.headerEntry}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Time Slot</Text>
            </View>
          </View>
          {futureAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.tutor_id}
              onPress={() => onAppointmentPress(appointment.tutor_id)}
            >
              <View
                style={
                  selectedAppointmentId === appointment.tutor_id
                    ? sStyles.selectedRow
                    : sStyles.tableRow
                }
              >
                <View style={selectedAppointmentId === appointment.tutor_id ? sStyles.selectedEntry : sStyles.entry}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.student_name}</Text>
                </View>
                <View style={selectedAppointmentId === appointment.tutor_id ? sStyles.selectedEntry : sStyles.entry}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.date}</Text>
                </View>
                <View style={selectedAppointmentId === appointment.tutor_id ? sStyles.selectedEntry : sStyles.entry}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.subject}</Text>
                </View>
                <View style={selectedAppointmentId === appointment.tutor_id ? sStyles.selectedEntry : sStyles.entry}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Text style={[styles.title, { fontSize: 20, marginTop: -45 }]}>Past Appointments:</Text>

        {/* Past Appointments Table */}
        <ScrollView style={sStyles.table} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={sStyles.tableRow}>
            <View style={sStyles.headerEntry}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Instructor Name</Text>
            </View>
            <View style={sStyles.headerEntry}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Date</Text>
            </View>
            <View style={sStyles.headerEntry}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Subject</Text>
            </View>
            <View style={sStyles.headerEntry}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Rating</Text>
            </View>
          </View>
          {pastAppointments.map((appointment) => (
            <TouchableOpacity
              style={{ marginBottom: 0, paddingBottom: 0 }}
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
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.date}</Text>
                </View>
                <View style={selectedAppointmentId === appointment.id ? sStyles.selectedEntry : sStyles.entry}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.subject}</Text>
                </View>
                <View style={selectedAppointmentId === appointment.id ? sStyles.selectedEntry : sStyles.entry}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {/* <TouchableOpacity onPress={navigateToHistory}>
          <Text style={{ color: blue, fontSize: 16, marginBottom: 20, marginTop: 10,  textDecorationLine: 'underline' }}>See all history</Text>
      </TouchableOpacity> */}

        </ScrollView>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}>
            <Text style={{ color: 'beige', fontSize: 16, fontFamily: 'SF', marginTop: 10 }}>See all history</Text>
          </TouchableOpacity>
        </View>
      </View>
      <NavBarContainer />
    </View>
  );
};

const sStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },
  table: {
    marginTop: -60,
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    maxHeight: 200,
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
    width: 100,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4.5,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: blue,
  },
  buttonText: {
    color: tan,
    fontSize: 20,
    fontFamily: 'SF',
  },
  buttonContent: {
    height: 50,
  },
});


export default AppointmentsScreen;
