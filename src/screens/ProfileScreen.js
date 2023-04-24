
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import NavBarContainer from '../../NavBar';
import EditProfileScreen from "./EditProfileScreen";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { StorageError } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { AuthProvider, useAuthValue } from '../../AuthContext';




const ProfileScreen = () => {
  const navigation = useNavigation();  
  const [userProfile, setUserProfile] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);
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


  const handleUpdateProfile = (updatedUserProfile) => {
    setUserProfile(updatedUserProfile);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', { userProfile, onUpdateProfile: handleUpdateProfile })
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title]}>My Profile</Text>
  
        <View style={styles.profileContainer}>
          <View style={styles.pictureContainer}>
            <Image style={styles.profilePic} source={userProfile.profilePicture} />
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfo}>{userProfile.firstName} {[userProfile.pronouns]}</Text>
  
            <Text style={styles.profileInfo}>{userProfile.email}</Text>
            <Text style={styles.userType}>{userProfile.userType}</Text>
  
            <Text style={styles.school}>{userProfile.school}</Text>
          </View>
        </View>
  
        <Text style={styles.subtitle}>My Subjects:</Text>
        {userProfile.selectedSubjects ? (
          <View style={styles.subjectsContainer}>
            {userProfile.selectedSubjects.map((subject, index) => (
              <Text key={index} style={styles.subjects}>
                {subject}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={{ color: "white" }}>Loading...</Text>
        )}
  
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
    marginTop: 50,    //subject to change if styling changes are made
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
    fontSize: 25,
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInfoContainer: {
    marginLeft: 10,
  },
  subjectsContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // couldnt get image imports so temporary placeholder
  profilePic: {
    width: 105,
    height: 105,
    borderRadius: 25,
    marginTop: 8,
  },
  pictureContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },

});

export default ProfileScreen;