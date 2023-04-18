//just need to implement the profile picture!!


import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import NavBarContainer from '../NavBar';
import EditProfileScreen from "./EditProfileScreen";



const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userProfile, setUserProfile] = useState({
    name: "Mike Tiger",
    email:"mtiger1@lsu.edu",
    pronouns:"He/his/him",
    userType:"Student",
    school:"Lousiana State University",
    subject1: "Astronomy",
    subject2: "Calculus",
    subject3: "Computer Science",
    subject4: "English",
    subject5: "Geology",
  });

  const handleUpdateProfile = (updatedUserProfile) => {
    setUserProfile(updatedUserProfile);
  }


  const handleEditProfile = () => {
     navigation.navigate('EditProfileScreen', {userProfile: userProfile})
  };

  const profilePic = require('../assets/icons/profileAvatar.png');


  return (
    <View style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={[styles.title]}>My Profile</Text>    
        
      <View style={styles.profileContainer}>  
        <Image style={styles.profilePic} source={profilePic} />
          <Text style={styles.profileInfo}>{userProfile.name}                {[userProfile.pronouns]}</Text>
          <Text style={styles.profileInfo}>{userProfile.email}</Text>
          <Text style={styles.userType}>{userProfile.userType}</Text>
          <Text style={styles.school}>{userProfile.school}</Text>
        </View>
        <Text style={styles.subtitle}>My Subjects:</Text>
        <View style={styles.subjectsContainor}>
          <Text style={styles.subjects}>{userProfile.subject1}</Text>
          <Text style={styles.subjects}>{userProfile.subject2}</Text>
          <Text style={styles.subjects}>{userProfile.subject3}</Text>
          <Text style={styles.subjects}>{userProfile.subject4}</Text>
          <Text style={styles.subjects}>{userProfile.subject5}</Text>
       </View>
      <Pressable
          style={[styles.button, styles.editProfileButton]}
          onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
    </View>
    <NavBarContainer />
  </View>
  
  );
};



const blue = '#182640';
const tan = '#FAE8CD'; 

const styles = StyleSheet.create({
    button: {
      width: 175,
      height: 50,
      marginTop: 75,    //subject to change if styling changes are made
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
    editProfileButton: {
      backgroundColor: blue,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 30,
      borderColor: tan,
      borderWidth: 4,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#182640',
      paddingTop: 120,
    },
    title: {
      fontSize: 20,
      marginTop: -75,
      fontWeight: 'bold',
      color: tan,
      fontFamily: 'Vikendi',
      marginBottom: 30,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: tan,
      fontFamily: 'Vikendi',
      marginTop: 50,
    },
    profileInfo: {
      marginBottom: 5,
      fontWeight: 'bold',
      color: tan,
      fontFamily: 'SF',
      fontSize: 17,
    },
    userType: {
      color: tan,
      fontFamily: 'SF',
      fontSize: 17,
      marginBottom: 5,
    }, 
    school: {
      color: tan,
      fontFamily: 'SF',
      fontSize: 17,
    },
    subjects: {
      color: tan,
      fontFamily: 'SF',
      fontSize: 17,
      marginBottom: 15,
    }, 
    pronouns: {
      color: tan,
      fontFamily: 'SF',
      fontSize: 17,
    },
    profileContainor: {
      alignItems: 'flex-start', 
      justifyContent: 'center',
    },
    subjectsContainor: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // couldnt get image imports so temporary placeholder
    profilePic: {
      width: 50, 
      height: 50,
      borderRadius: 25, // Set border radius to half og width/height to make it circular
      backgroundColor: 'pink'
    },
    pictureContainor: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

});

export default ProfileScreen;