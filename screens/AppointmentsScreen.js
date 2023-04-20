import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import NavBarContainer from '../NavBar';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AllHistoryScreen from './AllHistoryScreen';


const blue = '#182640';
const tan = '#FAE8CD'; 
const lightBlue = '#C9D3FF';

const StarRating = ({ rating, onRatingPress }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const starName = i <= rating ? 'star' : 'star-outline';
    const starColor = i <= rating ? 'Blue' : '#BFBFBF';

    stars.push(
      <TouchableOpacity key={i} onPress={() => onRatingPress(i)}>
        <Ionicons name={starName} size={15} color={starColor} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={sStyles.ratingRow}>
      {stars.map((star, index) => (
        <View key={index}>{star}</View>
      ))}
    </View>
  );
};

const AppointmentsScreen = () => {
  const navigation = useNavigation();

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [pastAppointmentsList, setPastAppointmentsList] = useState(pastAppointments);

  // Your mock data for future and past appointments
  const futureAppointments = [
    // ...

    // Example appointment object
        {
            id: 1,
            name: 'David Sorenti',
            rating: 4.5,
            subject: 'Geography',
            time: '3:30-4:30',
            date: '2023-18-02',
            duration: '1 hour',
            location: 'Online',
            status: 'Pending',
            appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
        },
        {
          id: 2,
          name: 'Jessica Juarez',
          rating: 4.5,
          subject: 'Calculus',
          time: '2:30-3:30',
          date: '2023-23-02',
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
        time: '10:30-11:30',
        date: '2023-24-02',
        duration: '1 hour',
        location: 'Online',
        status: 'Pending',
        appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
    },
    {
      id: 4,
      name: 'Michael Burgeron',
      rating: 4.5,
      subject: 'Comp Sci',
      time: '12:30-1:00',
      date: '2023-29-02',
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
    time: '10:30-11:30',
    date: '2023-01-03',
    duration: '1 hour',
    location: 'Online',
    status: 'Pending',
    appointmentNotes: 'I need help with Calculus II, specifically integration techniques.',
},

  ];

  const pastAppointments = [
    // ...
    {
        id: 1,
        name: 'David Sorenti',
        rating: 4.5,
        subject: 'Geography',
        time: '10:00 AM',
        date: '2023-18-02',
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
        date: '2023-22-02',
        duration: '1 hour',
        location: 'Online',
        status: 'Completed',
        appointmentNotes: 'I am illiterate.',
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
        date: '2023-29-02',
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

  // Function to handle rating
  const handleRating = (appointmentId, rating) => {
    // Update the appointment rating in your state/database
    // Create a new array of past appointments with the updated rating
    const updatedAppointments = pastAppointmentsList.map((appointment) => {
      if (appointment.id === appointmentId) {
        // If this is the selected appointment, update the rating
        return {
          ...appointment,
          rating: rating,
        };
      } else {
        return appointment;
      }
    });
  
    // Set the state variable with the new array of past appointments
    setPastAppointmentsList(updatedAppointments);
  };

  const navigateToHistory = () => {
    navigation.navigate('AllHistoryScreen');
  };

  const onAppointmentPress = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  return (
    <View style={{ flex: 1 }}>  
      <View style={[styles.container,{ alignItems: 'center' }]}>
        <Text style={[styles.title, { fontSize: 20,   marginTop: -45 }]}>My Appointments:</Text>

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
          <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 13 }}>{appointment.subject}</Text>
        </View>
        <View style={selectedAppointmentId === appointment.id ? sStyles.selectedEntry : sStyles.entry}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{appointment.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ))}
        </ScrollView>
        </View>
        <View style={[styles.container,{ alignItems: 'center' }]}> 
        <Text style={[styles.title, { fontSize: 20,   marginTop: -45 }]}>Past Appointments:</Text>

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
          <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 13 }}>{appointment.subject}</Text>
        </View>
        <View style={selectedAppointmentId === appointment.id ? sStyles.selectedEntry : sStyles.entry}>
        <StarRating
          rating={appointment.rating}
          onRatingPress={(rating) => handleRating(appointment.id, rating)}
        />
        </View>
      </View>
    </TouchableOpacity>
  ))}
        
        </ScrollView>
          <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={navigateToHistory}>
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
        marginTop: -60,
        width: '90%',
        borderWidth: 1,
        borderColor: 'black',
        maxHeight: 240,
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
        ratingRow: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        },
        });


export default AppointmentsScreen;
