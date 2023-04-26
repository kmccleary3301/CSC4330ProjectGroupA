import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NavBarContainer from '../../NavBar';
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

  const getLocalDate = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  };

  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getLocalDate());
  const [appointments, setAppointments] = useState([]);

  const formattedSelectedDate = selectedDate.toISOString().substring(0, 10);

  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState(null);

  const user = currentUser;
  const { userType } = useUserType();

  const [layout, setLayout] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const type = user?.displayName;
      const docRef = doc(db, type, user?.uid);
      const docSnap = await getDoc(docRef);
      setUserProfile(docSnap.data());
      console.log('User Profile:', docSnap.data());
      // Call fetchAvailabilities() after setting the userProfile
      fetchAvailabilities();
    };
    getUserProfile();
    const handleLayout = () => {
      setLayout({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    };
    Dimensions.addEventListener('change', handleLayout);
    return () => {
      Dimensions.removeEventListener('change', handleLayout);
    };
  }, []);

  useEffect(() => {
    if (userProfile) {
      fetchAvailabilities();
    }
  }, [userProfile]);
  

  const text = 'Schedule Availability';
  const adjustment = 1.2; // Change this value to adjust the font size
  const minButtonWidthPercentage = 0.2;
  const maxButtonWidthPercentage = 0.8;

  const maxWidth = 400; // Set a maximum width for the button
  const maxFontSize = 30; // Set a maximum font size for the text

  const fontSize = Math.min(maxFontSize, layout.width / Math.max(text.length, 1) * adjustment);
  const buttonWidth = Math.min(maxButtonWidthPercentage * layout.width, layout.width, maxWidth);

  const styles = getStyles({ buttonWidth, fontSize });


  const fetchAvailabilities = async () => {
    // Check if userProfile and userProfile.selectedSubjects exist
    if (userProfile && userProfile.selectedSubjects) {
      const selectedSubjects = userProfile.selectedSubjects.map(subject => subject.toLowerCase());
  
      if (selectedSubjects && selectedSubjects.length > 0) {
        const tutorsRef = collection(db, 'availabilities');
        const q = query(tutorsRef, where('selectedSubjects', 'array-contains-any', selectedSubjects));
        const querySnapshot = await getDocs(q);
  
        const fetchedAvailabilities = querySnapshot.docs.map(doc => {
          const availabilityData = doc.data();
          const firstName = availabilityData.firstName;
          const lastName = availabilityData.lastName;
          const rating = availabilityData.rating;
          const startTime = availabilityData.startTime;
          const endTime = availabilityData.endTime;
          const selectedSubjects = availabilityData.selectedSubjects;
        
          return {
            ...availabilityData,
            id: doc.id,
            firstName: firstName,
            lastName: lastName,
            rating: rating,
            startTime: startTime,
            endTime: endTime,
            selectedSubjects: selectedSubjects,
          };
        });
        console.log('Fetched Availabilities:', fetchedAvailabilities);
        setAvailabilities(fetchedAvailabilities);
  
        // Filter the availabilities based on the selected date
        const filteredAppointments = fetchedAvailabilities.filter((availability) => {
          const availabilityDate = availability.date.toDate();
          return availabilityDate.toISOString().substring(0, 10) === formattedSelectedDate;
        });
        console.log('Filtered Appointments:', filteredAppointments);
        setAppointments(filteredAppointments);
      } else {
        // Handle the case when the selectedSubjects array is undefined or empty
        // You might want to show a message to the user or provide a default list of items
      }
    } else {
      console.log("User profile or selected subjects not found");
    }
  };
  
    const onSelectAvailability = () => {
    if (selectedAvailabilityId === null) {
    setShowError(true);
    } else {
    setShowError(false);
    const selectedAvailability = appointments.find(
    (availability) => availability.id === selectedAvailabilityId
    );
    navigation.navigate('AptRequestScreen', { availability: selectedAvailability });
    setSelectedAvailabilityId(null);
    }
    };
    
    const onAvailabilityPress = (availabilityId) => {
    setShowError(false);
    setSelectedAvailabilityId(availabilityId);
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
  },
  [setOpen, setSelectedDate, availabilities]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 20 }]}>
          Welcome back, {userProfile.firstName}
        </Text>
        {userProfile.userType === 'tutor' && (
          <Button
            onPress={() => navigation.navigate('ScheduleAvailabilityScreen')}
            style={[styles.scheduleButton, { width: buttonWidth }]}
          >
            <Text style={[styles.scheduleButtonText, { fontSize: fontSize }]}>
              Schedule Availability
            </Text>
          </Button>
        )}
        <Text
          style={[
            styles.title,
            { fontSize: 20, marginTop: userType === 'tutor' ? 5 : 25 },
          ]}
        >
          {userType === 'student'
            ? 'Select an Availability:'
            : 'Upcoming Availabilities:'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.title,
              { fontSize: 20, fontFamily: 'SF', marginBottom: 20 },
            ]}
          >
            Change Date:
          </Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            uppercase={false}
            mode="outlined"
          >
            <Ionicons
              name="calendar"
              size={45}
              color="#FAE8CD"
              style={{ marginLeft: 20, marginTop: 10 }}
            />
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
        <Text
          style={[
            styles.title,
            { fontSize: 18, fontFamily: 'SF', marginTop: 10 },
          ]}
        >
          {selectedDate.toDateString() === new Date().toDateString()
            ? 'Today, '
            : ''}
          {selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
        {appointments.length === 0 ? (
          <Text style={styles.noAppointmentsText}>
            No availabilities for today
          </Text>
        ) : (
          <>
            <ScrollView
              style={styles.table}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View style={styles.tableRow}>
                <View style={styles.headerEntry}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}
                  >
                    Instructor Name
                  </Text>
                </View>
                <View style={styles.headerEntry}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}
                  >
                    Rating
                  </Text>
                </View>
                <View style={styles.headerEntry}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}
                  >
                    Subject
                  </Text>
                </View>
                <View style={styles.headerEntry}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}
                  >
                    Time Slot
                  </Text>
                </View>
              </View>
              {appointments.map((availability) => {
                const displayName =
                  availability.firstName.length +
                    availability.lastName.length >
                  16
                    ? `${availability.firstName.charAt(0)}. ${availability.lastName}`
                    : `${availability.firstName} ${availability.lastName}`;
  
                return ( <TouchableOpacity
                  key={availability.id}
                  onPress={() => onAvailabilityPress(availability.id)}
                >
                  <View
                    style={
                      selectedAvailabilityId === availability.id
                        ? styles.selectedRow
                        : styles.tableRow
                    }
                  >
                    <View
                      style={
                        selectedAvailabilityId === availability.id
                          ? styles.selectedEntry
                          : styles.entry
                      }
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}
                      >
                        {displayName}
                      </Text>
                    </View>
                    <View
                      style={
                        selectedAvailabilityId === availability.id
                          ? styles.selectedEntry
                          : styles.entry
                      }
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}
                      >
                        {availability.rating}
                      </Text>
                    </View>
                    <View
                      style={
                        selectedAvailabilityId === availability.id
                          ? styles.selectedEntry
                          : styles.entry
                      }
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}
                      >
                        {availability.selectedSubjects}
                      </Text>
                    </View>
                    <View
                      style={
                        selectedAvailabilityId === availability.id
                          ? styles.selectedEntry
                          : styles.entry
                      }
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}
                      >
                        {availability.startTime} - {availability.endTime}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={onSelectAvailability}
            color={blue}
          >
            <Text style={styles.buttonText}>Select</Text>
          </Button>
        </>
      )}
    </View>
    <NavBarContainer />
  </View>
);
          };
     

const getStyles = ({ buttonWidth, fontSize }) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
    marginTop: 30,
  },
  table: {
    marginTop: 20,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    maxHeight: '40%',
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
    width: '28%',
    height: '8%',
    maxWidth: 150,
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
  scheduleButton: {
    width: buttonWidth,
    height: '8%',
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4.5,
    paddingTop: 5,
    //padding: 0,
    //alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: tan,
  },
  scheduleButtonText: {
    color: blue,
    fontSize: fontSize,
    fontFamily: 'Vikendi',
    lineHeight: fontSize,
    //fontWeight: 'bold',
  },
  buttonText: {
    color: tan,
    fontSize: 24,
    fontFamily: 'SF',
    fontWeight: 'bold',
  },
  buttonContent: {
    //height: 50,
  },
  noAppointmentsText: {
    color: tan,
    fontSize: 20,
    fontFamily: 'Vikendi',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
});



export default HomeScreen;