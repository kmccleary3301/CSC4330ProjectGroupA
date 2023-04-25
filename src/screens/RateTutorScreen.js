
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import StarRating from 'react-native-star-rating-widget';
import NavBarContainer from '../../NavBar';
import EditProfileScreen from "./EditProfileScreen";
import { Firestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { StorageError } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { AuthProvider, useAuthValue } from '../../AuthContext';
//import "firebase/firestore";

async function get_tutors() {
	try {
		const tutors = await getDocs(collection(db, 'tutor'));
		tutors.forEach((doc_get) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc_get.id, " => ", doc_get.data());
		});
	} catch (error) {
		console.error('Error adding appointment request: ', error);
	}
}


const RateTutorScreen = function({route, navigation_param}) {
	const {test_argument} = route.params;
	//const tutors = firebase.firestore().collection('users').get();
	console.log("RateTutorScreen called with argument:", test_argument);
	get_tutors();

  const navigation = useNavigation();  
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [userProfile, setUserProfile] = useState({});
	const [rating, setRating] = useState(0);
  const { currentUser } = useAuthValue();
  const user = currentUser;

	const submit_rating = () => {

	};

  

  const handleUpdateProfile = (updatedUserProfile) => {
    setUserProfile(updatedUserProfile);
  };
  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', { userProfile, onUpdateProfile: handleUpdateProfile })
  };

  const profilePicture = require('../assets/icons/profileAvatar.png');



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title]}>RATE TUTOR SCREEN</Text>
        <View style={styles.profileContainer}>
          <View style={styles.pictureContainer}>
            <Image style={styles.profilePic} source={profilePicture} />
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfo}>{userProfile.firstName} {userProfile.lastName}</Text>
            <Text style={styles.profileInfo}>{userProfile.pronouns}</Text>
              <Text style={styles.profileInfo}>{userProfile.email}</Text>
              <Text style={styles.userType}>{userProfile.userType}</Text>
            
            {/* <Text style={styles.school}>{userProfile.school}</Text> */}
          </View>
        </View>
				<StarRating
					rating={rating}
					onChange={setRating}
				/>
				<Text style={styles.rating}>{rating}</Text>
  
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
          <Text style={[styles.subjects, {marginTop: 7}]}>Loading...</Text>
        )}
  
        <Pressable
          style={[styles.button, styles.editProfileButton]}
          onPress={submit_rating}>
          <Text style={styles.buttonText}>Submit</Text>
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
	rating: {
    fontSize: 25,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
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

export default RateTutorScreen;