import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBarContainer from '../NavBar';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import ProfileScreen from "./ProfileScreen";
import { AuthProvider, useAuthValue } from '../AuthContext';
import { async } from "@firebase/util";
import { last } from "rxjs";





const EditProfileScreen = ({ route }) => {
  const {currentUser} = useAuthValue();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [pronouns, setPronouns] = useState();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [subject1, setSubject1] = useState(currentUser.subject1);
  const [subject2, setSubject2] = useState(currentUser.subject2);
  const [subject3, setSubject3] = useState(currentUser.subject3);
  const [subject4, setSubject4] = useState(currentUser.subject4);
  const [subject5, setSubject5] = useState(currentUser.subject5);

  
  const user = auth.currentUser;

  const [userSubjects, setUserSubjects] = useState([
    currentUser.subject1,
    currentUser.subject2,
    currentUser.subject3,
    currentUser.subject4,
    currentUser.subject5,
  ]);


  const handleSubjectChange = (subject) => {
    if (userSubjects.length >= 5) {
      alert("You have already added the maximum number of subjects.");
      return;
    }

    if (!userSubjects.includes(subject)) {
      const updatedUserSubjects = [...userSubjects, subject];
      setUserSubjects(updatedUserSubjects);
      setShowDropdown(false);
    } else {
      alert(`You have already added "${subject}" as one of your subjects.`);
    }
  };

  const updatecurrentUser = e => {
    e.preventDefault();
    handleSaveChanges(
      firstName,
      lastName,
      email,
      pronouns,
      subject1,
      subject2,
      subject3,
      subject4,
      subject5
    ).then(() => {
      navigation.navigate('ProfileScreen')
    });
  }

  const handleSaveChanges = async (
    firstName,
    lastName,
    email,
    pronouns,
    subject1,
    subject2,
    subject3,
    subject4,
    subject5
    ) => {
      try {
        await updateDoc(doc(db, "users", user?.uid), {
          firstName,
          lastName,
          email,
          pronouns,
          subjects: [subject1, subject2, subject3, subject4, subject5]
        });
      } catch (err) {
        console.log(err);
        alert(`Error saving changes.`);
      }
    };
  // const handleSaveChanges = async (
  //   name,
  //   email,
  //   pronouns,
  //   subject1,
  //   subject2,
  //   subject3,
  //   subject4,
  //   subject5) => {
  //   const filteredSubjects = userSubjects.filter(subject => subject !== ''); // Filter out empty strings
  //   const updatedcurrentUser = {
  //     ...currentUser,
  //     name: name,
  //     email: email,
  //     pronouns: pronouns,
  //     subject1: filteredSubjects[0] || "",
  //     subject2: filteredSubjects[1] || "",
  //     subject3: filteredSubjects[2] || "",
  //     subject4: filteredSubjects[3] || "",
  //     subject5: filteredSubjects[4] || "",
  //   }
  //   try {
  //     await updateDoc(doc(db, "users", user?.uid), {
  //       name,
  //       email,
  //       pronouns,
  //       subject1,
  //       subject2,
  //       subject3,
  //       subject4,
  //       subject5,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  //   // await updatecurrentUser(updatedcurrentUser);
  //   // onUpdateProfile(updatedcurrentUser);
  //   navigation.goBack();
  // };






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


  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCancel = () => {
    navigation.goBack();
  }




  const handleDeleteSubject = (index) => {
    const updatedSubjects = [...userSubjects];
    updatedSubjects.splice(index, 1);
    setUserSubjects(updatedSubjects.filter(subject => subject !== ''));
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
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileInfoLabel}>Last Name:          </Text>
            <TextInput
              style={styles.profileInfoValue}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileInfoLabel}>Email:    </Text>
            <TextInput
              style={styles.profileInfoValue}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={currentUser.email}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileInfoLabel}>Pronouns: </Text>
            <TextInput
              style={styles.profileInfoValue}
              value={pronouns}
              onChange={e => setPronouns(e.target.value)}
              placeholder={currentUser.pronouns}
            />
          </View>
        </View>



        <Text style={styles.subtitle}>My Subjects: </Text>

        <View style={styles.subjectsContainer}>
          {userSubjects.filter(subject => subject !== '').map((subject, index) => (
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
                <Picker selectedValue={selectedSubject} onValueChange={handleSubjectChange}>
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
    marginTop: 30, //subject to change as page evolves
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