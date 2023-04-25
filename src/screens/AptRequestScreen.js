import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBarContainer from '../../NavBar';
import { useAuthValue } from '../../AuthContext';
//import { sendAppointmentNotification } from '../../functions';
import { signOut } from 'firebase/auth';
import { auth, db, functions } from '../../firebase';
import { setDoc, getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
// const admin = require('firebase-admin');
// admin.initializeApp();

const tan = '#FAE8CD';
const blue = '#182640';

const AptRequestScreen = ({ route }) => {
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();
  const [appointment, setAppointment] = useState('');
  const {currentUser} = useAuthValue();
  const user = currentUser;

  const sendAppointment = async( appointment) => {
    try{
    const appointmentRef = doc(db, 'appointments', appointment.uid)
    await setDoc({
      studentID: user?.uid,
      tutorID: '789012',      
      location: 'Library',
    });
    const studentRef = doc(db,'student', user?.uid);
    await updateDoc(studentRef, {
    appointment: appointmentRef.id
  });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

  const onCancel = () => {
    navigation.goBack();
  };

  
    

   
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Request appointment?</Text>
        <TouchableOpacity onPress={sendAppointment} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>

        <View style={styles.table}>
          <View style={styles.headerRow}>
            {["Instructor Name", "Rating", "Subject", "Time Slot"].map((header, index) => (
              <View key={index} style={styles.headerEntry}>
                <View style={styles.headerTextWrapper}>
                  <Text style={styles.headerText}>{header}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.dataRow}>
            {[
              appointment.name,
              appointment.rating,
              appointment.subject,
              appointment.time,
            ].map((data, index) => (
              <View key={index} style={styles.dataEntry}>
                <View style={styles.dataTextWrapper}>
                  <Text style={styles.tableText}>{data}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.notesTitle}>Notes for the instructor:</Text>
        <TextInput
          style={styles.notesInput}
          onChangeText={setNotes}
          value={notes}
          placeholder="Write any material or concepts you need help with"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendAppointment} style={styles.confirmButton}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.warningText}>
          Keep in mind, once the instructor accepts this request, failure to show
          up will result in consequences
        </Text>

      </View>

      <NavBarContainer />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40, // Add padding to adjust space
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: tan,
    marginBottom: 20,
    fontFamily: 'Vikendi'
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    marginBottom: 20,
  },
  table: {
    width: '96%',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerEntry: {
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    flexGrow: 1,
    flexBasis: 85,
    height: 40,
    fontSize: 13,
  },
  headerTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataEntry: {
    backgroundColor: tan,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    flexGrow: 1,
    flexBasis: 85,
    height: 40,
  },
  dataTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataRow: {
    flexDirection: 'row',
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    marginBottom: 10,
  },
  notesInput: {
    backgroundColor: tan,
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
    height: 100,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4,
  },
  confirmButton: {
    backgroundColor: blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4,
  },
  buttonText: {
    color: tan,
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 11,
    //fontWeight: 'bold',
    marginHorizontal: -10,
  },
  tableText: {
    fontSize: 11,
    fontWeight: 'bold',
  },

});

export default AptRequestScreen;  