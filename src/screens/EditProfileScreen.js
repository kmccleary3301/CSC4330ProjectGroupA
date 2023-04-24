import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBarContainer from '../../NavBar';
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import ProfileScreen from "./ProfileScreen";
import { AuthProvider, useAuthValue } from '../../AuthContext';





const EditProfileScreen = () => {
  const [userProfile, setUserProfile] = useState({});
  const navigation = useNavigation();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [selectedPronoun, setSelectedPronoun] = useState("");
  const [currentSelectedSubject, setCurrentSelectedSubject] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { currentUser } = useAuthValue();
  const user = currentUser;




  useEffect(() => {
    const getUserProfile = async () => {
      const type = user?.displayName;
      const docRef = doc(db, type, user?.uid);      
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();      
        setSelectedSubjects(data.selectedSubjects);   
      setUserProfile(data);
    };
  
    getUserProfile();
  }, [user]);


  const handlePronounsPress = () => {
    setShowPicker(true);
  };

  
  const handlePronounChange = (itemValue, itemIndex) => {
    setSelectedPronoun(itemValue);
    setShowPicker(false);
    setUserProfile(prevState => ({
      ...prevState,
      pronouns: itemValue,
    }));
  };


  const handleSubjectChange = (subject) => {
    setCurrentSelectedSubject(subject);

    // if (selectedSubjects.length >= 5) {
    //     alert("You have already added the maximum number of subjects.");
    //     return;
    // }

    if (!selectedSubjects.includes(subject)) {
        const updatedUserSubjects = [...selectedSubjects, subject];
        setSelectedSubjects(updatedUserSubjects);
        setShowDropdown(false);
    } else {
        alert(`You have already added "${subject}" as one of your subjects.`);
    }
};





const handleSaveChanges = async () => {
  try {
    const user = auth.currentUser;
    await updateDoc(doc(db, 'student', user?.uid),
      { firstName, lastName, email, pronouns, selectedSubjects });
    setUserProfile(prevState => ({
      ...prevState,
      firstName: firstName,
      lastName: lastName,
      email: email,
      pronouns: pronouns,
      selectedSubjects: selectedSubjects,
    }));

  } catch (err) {
    console.log(err);
    alert('Error saving changes.');
  }
};






  // should alphabetize them for sure
  const subjects = [
    'Accounting',
    'Anthropology',
    'Art History',
    'Astronomy',
    'Biology',
    'Business Administration',
    'Chemistry',
    'Communications',
    'Computer Science',
    'Creative Writing',
    'Criminal Justice',
    'Digital Media',
    'Economics',
    'Education',
    'Engineering',
    'English',
    'English Literature',
    'Environmental Science',
    'Film Studies',
    'French',
    'Geography',
    'Global Studies',
    'History',
    'International Relations',
    'Journalism',
    'Law',
    'Linguistics',
    'Marketing',
    'Mathematics',
    'Mechanical Engineering',
    'Music',
    'Neuroscience',
    'Philosophy',
    'Physics',
    'Political Science',
    'Psychology',
    'Public Health',
    'Religious Studies',
    'Social Work',
    'Sociology',
    'Spanish',
    'Statistics',
    'Sustainability Studies',
    'Theater',
    'Theology',
    'Urban Studies',
    'Visual Arts',
    'Womens Studies'
  ];


  const pronounsPicker = [
    "She/Her",
    "He/Him",
    "They/Them",
    "Other"
  ];
  


  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCancel = () => {
    navigation.goBack();
  }




  const handleDeleteSubject = (index) => {
    const updatedSubjects = [...selectedSubjects];
    updatedSubjects.splice(index, 1);
    setSelectedSubjects(updatedSubjects.filter(subject => subject !== ''));
  };




  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={styles.cancelContainer}>
          <Pressable
            onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>

        <View style={styles.profileInfoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.profileInfoLabel}>First Name:          </Text>
            <TextInput
              style={styles.profileInfoValue}
              value={userProfile.firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileInfoLabel}>Last Name:          </Text>
            <TextInput
              style={styles.profileInfoValue}
              value={userProfile.lastName}
              onChangeText={(text) => setLastName(text)}

            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileInfoLabel}>Email:    </Text>
            <TextInput
              style={styles.profileInfoValue}
              value={userProfile.email}
              onChangeText={(text) => setEmail(text)}
              
            />
          </View>

          <View style={styles.nameContainer}>
          <Text style={styles.profileInfoLabel}>Pronouns: </Text>
          <Pressable onPress={handlePronounsPress}>
            <Text style={styles.profileInfoValue}>{userProfile.pronouns}</Text>
          </Pressable>
        </View>
      </View>
        {showPicker && (
        <Picker
          selectedValue={selectedPronoun}
          onValueChange={handlePronounChange}
        >
          {pronounsPicker.map((pronoun, index) => (
            <Picker.Item key={index} label={pronoun} value={pronoun} />
          ))}
        </Picker>
        )}

        <Text style={styles.subtitle}>My Subjects: </Text>

        <View style={styles.subjectsContainer}>
          {selectedSubjects.filter(subject => subject !== '').map((subject, index) => (
            <View key={index} style={styles.subjectContainer}>
              <Pressable onPress={() => handleDeleteSubject(index)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
              <Text style={styles.subjectsText}>{subject}</Text>
            </View>
          ))}
          <View>
            <View style={styles.subjectContainer}>
              <Pressable onPress={() => toggleDropdown()}>
                <Text style={styles.deleteButtonText}>+</Text>
              </Pressable>
              {showDropdown ? (
                <Picker selectedValue={currentSelectedSubject} onValueChange={handleSubjectChange}>
                {subjects.map((subject, index) => (
                    <Picker.Item key={index} label={subject} value={subject} />
                ))}
                </Picker>
              ) : (
                <Text style={styles.subjectsText}>Add course</Text>
              )}
            </View>
          </View>
        </View>




        <Pressable
          style={[styles.saveChangesButton, styles.saveChangesButton]}
          onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save changes</Text>
        </Pressable>
      </View>
      <NavBarContainer />
    </View>
  );
};

const blue = '#182640';
const tan = '#FAE8CD';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#182640',
    paddingTop: 45,
  },
  cancelText: {
    fontFamily: 'SF',
    fontSize: 15,
    color: tan,
    backgroundColor: blue,
    padding: 5,
  },
  cancelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 16,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveChangesButton: {
    width: 175,
    height: 50,
    marginTop: 0, //subject to change as page evolves
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
  deleteButtonText: {
    color: tan,
    fontSize: 20,
    fontFamily: 'SF',
    marginRight: 35,
  },
  value: {
    color: 'tan',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
    marginTop: 40,
  },
  subjectsContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 60,
  },
  subjectsText: {
    color: tan,
    fontFamily: 'SF',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  profileInfoValue: {
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'SF',
    fontSize: 17,
    textAlign: 'center'
  },
  profileInfoLabel: {
    color: tan,
    fontFamily: 'SF',
    fontSize: 17,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  profileInfoContainer: {
    marginTop: 30,
  }
});


export default EditProfileScreen;