import React from "react";
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

  const userProfile = {
    name: "John Doe",
    email:"johndoe@ex.com",
    //more fields to come
  };


  const handleEditProfile = () => {
     navigation.navigate('EditProfileScreen', {userProfile})
  };

  return (
    <View style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={[styles.title]}>My Profile</Text>

      <View style={styles.profileContainor}>
        {/* Display user profile information */}
        <Text style={styles.profileInfo}>{userProfile.name}</Text>
        <Text style={styles.profileInfo}>{userProfile.email}</Text>

      <Pressable
          style={[styles.button, styles.editProfileButton]}
          onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
    </View>
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
      marginTop: 470,
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
    },
    subtitle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: tan,
      fontFamily: 'Vikendi',
    },
    profileContainor: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    profileInfo: {
      marginBottom: 5,
      fontWeight: 'bold',
      color: tan,
      fontFamily: 'SF',
      fontSize: 13,
      textAlign: "left",
    },
    positionAndSubjects: {
      color: tan,
      fontFamily: 'SF',
      fontSize: 13,
    }, 
    pronouns: {
      color: tan,
      fontFamily: 'SF',
      fontSize: 11,
    },
});

export default ProfileScreen;