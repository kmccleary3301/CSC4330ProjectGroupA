import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import NavBarContainer from '../NavBar';



const EditProfileScreen = ({ route }) => {
    const { userProfile } = route.params;
    const navigation = useNavigation();
    const [userSubjects, setUserSubjects] = useState([]);
    

    const handleCancel = () => {
        navigation.goBack();
    }
    const handleSaveChanges = () => {
      const updatedUserProfile = {
        ...userProfile,
        subjects: userSubjects ?? []
      };
      navigation.goBack(null, {userProfile: updatedUserProfile});
   };


   const handleDeleteSubject = (index) => {
    const updatedSubjects = [...userSubjects];
    updatedSubjects.splice(index, 1);
    if (updatedSubjects !== undefined && updatedSubjects !== null) {
      setUserSubjects(updatedSubjects);
    }
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
            <Text style={styles.profileInfoLabel}>Name: </Text>
            <Text style={styles.profileInfoValue}>{userProfile.name}</Text>
          </View>

          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfoLabel}>Email: </Text>
            <Text style={styles.profileInfoValue}>{userProfile.email}</Text>
          </View>

          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfoLabel}>Pronouns: </Text>
            <Text style={styles.profileInfoValue}>{userProfile.pronouns}</Text>
          </View>






          <Text style={styles.subtitle}>My Subjects: </Text>
          <View style={styles.subjectsContainor}>
            <View style={styles.subjectContainor}>
              <Text style={styles.subjects}>{userProfile.subject1}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteSubject(0)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
            </View>
            <View style={styles.subjectContainor}>
              <Text style={styles.subjects}>{userProfile.subject2}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteSubject(1)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
            </View> 
            <View style={styles.subjectContainor}>
              <Text style={styles.subjects}>{userProfile.subject3}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteSubject(2)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
            </View> 
            <View style={styles.subjectContainor}>
              <Text style={styles.subjects}>{userProfile.subject4}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteSubject(3)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
            </View>
            <View style={styles.subjectContainor}>
              <Text style={styles.subjects}>{userProfile.subject5}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteSubject(4)}>
                <Text style={styles.deleteButtonText}>-</Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            style={[styles.button, styles.saveChangesButton]}
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

  const horizontalLine = {
    borderWidth: 1,
    borderColor: 'tan',
    marginVertical: 10,
  };
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#182640',
          paddingTop: 120,
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
      button: {
        width: 175,
        height: 50,
        marginTop: 50, //subject to change as page evolves
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
        deleteButtonText: {
          color: tan,
          fontSize: 20,
          fontFamily: 'SF',
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
        marginTop: 75,
      },
      subjectsContainor: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      subjects: {
        color: tan,
        fontFamily: 'SF',
        fontSize: 17,
      }, 
      profileInfoValue: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: tan,
        fontFamily: 'SF',
        fontSize: 17,
      },
      profileInfoLabel: {
        marginBottom: 5,
        color: tan,
        fontFamily: 'SF',
        fontSize: 17,
        marginRight: 50,
      },
      profileInfoContainer: {
        flexDirection:'row', 
        marginVertical: 8,
        marginLeft: 16,
      }
  });
  
  
  export default EditProfileScreen;