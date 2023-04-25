import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Picker
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles.js';
import { auth, db } from '../../firebase';
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useAuthValue } from '../../AuthContext.js';
import { subjectList } from '../utils/subjectList.js';


  const SubjectAddScreen = ({ navigation }) => {
    const {currentUser} = useAuthValue();    
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const user = currentUser;

    const handleSubjectSelection = (value) => {
      if (selectedSubjects.includes(value)) {
        setSelectedSubjects((prev) => prev.filter((subject) => subject !== value));
      } else {
        setSelectedSubjects((prev) => [...prev, value]);
      }
    };
  
    const handleSaveChanges = async () => {
      try {
        const type = user?.displayName;
        await updateDoc(doc(db, type, user?.uid), { selectedSubjects });        
          navigation.navigate('HomeScreen');        
      } catch (err) {
        console.log(err);
        alert('Error saving changes.');
      }
    };
    
    const renderPicker = () => {
      return (
        <Picker
          selectedValue={''}
          onValueChange={(value) => handleSubjectSelection(value)}
        >
          <Picker.Item label="Select a subject" value="" />
          {subjectList.map((subject) => (
            <Picker.Item
              key={subject.value || subject}
              label={subject.value || subject}
              value={subject.value || subject}
            />
          ))}
        </Picker>
      );
    };
  

  return (
    <View style={[styles.container, { justifyContent: 'start', paddingTop: 120, marginTop: 0 }]}>
      <View style={[styles.logoContainer, { marginTop: 0, paddingTop: 0 }]}>
        <View style={{ width: 200, height: 100, marginTop: 5 }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={require('../assets/logos/tan.png')}
          />
        </View>
      </View>
      <Text style={[styles.title, { textAlign: 'center', marginBottom: 0, paddingBottom: 0 }]}>Subjects of Interest</Text>
      <View style={styles.registerBody}>
      <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 16 }]}>
          Lastly, you'll just need to add your subjects of {''}
          {user?.displayName === 'student' || user?.displayName === 'tutor'
          ? 'interest' : 'expertise'}.
          </Text>
        {selectedSubjects.map((subject) => (
        <Text key={subject}>{subject}</Text>
      ))}
      {selectedSubjects.length < 5 && renderPicker()}
      <TouchableOpacity onPress={handleSaveChanges}>
        <Text>Save Changes</Text>
      </TouchableOpacity>

        
        
      </View>
    </View>
  );
};


SubjectAddScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('InitialScreen')}>
      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Image
          source={require('../assets/icons/back.png')}
          style={{ width: 30, height: 30 }}
        />
      </View>
    </TouchableOpacity>
  ),
});

export default SubjectAddScreen;


// These are old, but may need to be used in other files

// const handleSubmission = () => {
  //   // Store selected subjects in Firebase
  //   firebase.firestore().collection('selectedSubjects').add({
  //     subjects: selectedSubjects
  //   })
  //     .then(() => {
  //       alert('Selected subjects stored in Firebase!');
  //       setSelectedSubjects([]);
  //     })
  //     .catch(error => {
  //       console.error('Error storing selected subjects:', error);
  //       alert('Error storing selected subjects');
  //     });
  // };
    // let handleSubjectChange = (e) => {
    //   setSubjects(e.target.value)
    // }

    // const handleSubjectMax = (subject) => {
    //   if (userSubjects.length >= 5) {
    //     alert("You have already added the maximum number of subjects.");
    //     return;
    //   }

    //   if (!userSubjects.includes(subject)) {
    //     const updatedUserSubjects = [...userSubjects, subject];
    //     setUserSubjects(updatedUserSubjects);
    //     setShowDropdown(false);
    //   } else {
    //     alert(`You have already added "${subject}" as one of your subjects.`);
    //   }
    // };
  //     const handleNext = () => {

  //       navigation.navigate('HomeScreen');
  //     };

  //       const updatecurrentUser = e => {
  //   e.preventDefault();
  //   handleSaveChanges(
  //     firstName,
  //     lastName,
  //     email,
  //     pronouns,
      
  //   ).then(() => {
  //     navigation.navigate('ProfileScreen')
  //   });
  // }

  // const handleSaveChanges = async (firstName,lastName,email,pronouns) => {
  //     try {
  //       await updateDoc(doc(db, "users", user?.uid), {
  //         firstName,
  //         lastName,
  //         email,
  //         pronouns          
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       alert(`Error saving changes.`);
  //     }
  //   };
