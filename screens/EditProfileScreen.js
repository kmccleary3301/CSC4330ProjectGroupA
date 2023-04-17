import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import NavBarContainer from '../NavBar';



const EditProfileScreen = ({ route }) => {
  const { userProfile, onUpdateProfile } = route.params; // Get userProfile and onUpdateProfile from route params
  const navigation = useNavigation();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [pronouns, setPronouns] = useState(userProfile.pronouns);
  const [userSubjects, setUserSubjects] = useState([]);



  const handleCancel = () => {
    navigation.goBack();
  }

  const handleSaveChanges = () => {
    const updatedUserProfile = {
      ...userProfile,
      name: name,
      email: email,
      pronouns: pronouns,
      subjects: userSubjects ?? []
    };
    onUpdateProfile(updatedUserProfile); // Call onUpdateProfile with the updated userProfile
    navigation.goBack();
  };

  const handleDeleteSubject = (index) => {
    const updatedSubjects = [...userSubjects];
    updatedSubjects.splice(index, 1);
    setUserSubjects(updatedSubjects);
  };
  
  

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>

          <View style={styles.cancelContainor}>
            <Pressable
              onPress = {handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>

          <View style={styles.profileInfoContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.profileInfoLabel}>Name:          </Text>
              <TextInput
              style={styles.profileInfoValue}
              value={name}
              onChangeText={setName}
            />
            </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileInfoLabel}>Email:    </Text>
            <TextInput
              style={styles.profileInfoValue}
              value={email}
              onChangeText={setEmail}
          />          
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileInfoLabel}>Pronouns: </Text>
            <TextInput
            style={styles.profileInfoValue}
            value={pronouns}
            onChangeText={setPronouns}
          />          
          </View>
          </View>



          <Text style={styles.subtitle}>My Subjects: </Text>
          
          <View style={styles.subjectsContainor}>
          {userProfile.subject1 && (
            <View style={styles.subjectContainor}>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteSubject(0)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
              <Text style={styles.subjectsText}>{userProfile.subject1}</Text>
            </View>
          )}
          {userProfile.subject2 && (
            <View style={styles.subjectContainor}>
              <Pressable
                onPress={() => handleDeleteSubject(1)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
              <Text style={styles.subjectsText}>{userProfile.subject2}</Text>
            </View>
          )}
          {userProfile.subject3 && (
            <View style={styles.subjectContainor}>
              <Pressable
                onPress={() => handleDeleteSubject(2)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
              <Text style={styles.subjectsText}>{userProfile.subject3}</Text>
            </View>
          )}
          {userProfile.subject4 && (
            <View style={styles.subjectContainor}>
              <Pressable
                onPress={() => handleDeleteSubject(3)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
              <Text style={styles.subjectsText}>{userProfile.subject4}</Text>
            </View>
          )}
          {userProfile.subject5 && (
            <View style={styles.subjectContainor}>
              <Pressable
                onPress={() => handleDeleteSubject(4)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
              <Text style={styles.subjectsText}>{userProfile.subject5}</Text>
            </View>
          )}
                  
        <View style={styles.subjectContainor}>
          <Pressable
            onPress={() => handleAddSubject}>
            <Text style={styles.deleteButtonText}>+</Text>
          </Pressable>
          <Text style={styles.subjectsText}>Add course</Text>
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
      cancelContainor: {
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
        marginTop: 50, //subject to change as page evolves
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
      saveChangesButton: {
        backgroundColor: blue,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 4,
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
      subjectsContainor: {
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
      subjectContainor: {
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