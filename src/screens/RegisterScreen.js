import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Picker, 
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthValue } from '../../AuthContext'
//import { useUserType } from '../../UserTypeContext.js';

const RegisterScreen = ({ navigation }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const { setTimeActive } = useAuthValue();

  const validatePassword = () => {
    let isValid = true
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.')
      isValid = false
    }
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        alert('Passwords do not match.')
        isValid = false
      }
    }
    return isValid;
  };
    
  const handleRegister = e => {
    e.preventDefault()
    if (validatePassword()) {    
      // Create a new user with email and password using firebase      
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigation.navigate('VerifyEmail')
            })
        }).catch(err => setError(err.message))
        .then(() => {
          updateProfile(auth.currentUser, {displayName: userType})
        }).catch(err => alert(err.message))
        .then(() => {
          addProfile(email, userType, pronouns, lastName, firstName)
        }).catch(err => setError(err.message))
      setUserType('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  }

  const addProfile = async ( email, userType, pronouns, lastName, firstName) => {
    const user = auth.currentUser;
    try {
      const userDocRef = doc(db, userType, user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,        
        userType,
        email,
      });
      await updateDoc(userDocRef, {
        firstName,
        lastName,
        pronouns,        
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  

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
      <Text style={[styles.title, { textAlign: 'center', marginBottom: 0, paddingBottom: 0 }]}>Register</Text>
      <View style={styles.registerBody}>
        <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 16 }]}>
          Create a new account with your university email.
        </Text>
        <TextInput
            style={styles.inputField}
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            placeholder="First Name"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputField}
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            placeholder="Last Name"
            autoCapitalize="none"
          />
          <Picker
            style={styles.picker}
            selectedValue={pronouns}
            onValueChange={(itemValue) => setPronouns(itemValue)}
            prompt="My pronouns are..."
            mode="dropdown"
          >
            <Picker.Item label="My pronouns are..." value="" />
            <Picker.Item label="He/him" value="He/him" />
            <Picker.Item label="She/her" value="She/her" />
            <Picker.Item label="They/them" value="They/them" />
            <Picker.Item label="He/they" value="He/they" />
            <Picker.Item label="She/they" value="She/they" />
            <Picker.Item label="Other" value="Other" />

          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={userType}
            onChange={e => setUserType(e.target.value)}
            prompt="I am a..."
            mode="dropdown"
          >
            <Picker.Item label="I am a..." value="" />
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Tutor" value="tutor" />            
          </Picker>

          <TextInput
            style={styles.inputField}
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            autoCapitalize="none"/>
          <TextInput
            style={styles.inputField}
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            autoCapitalize="none"/>
          <TextInput
            style={styles.inputField}
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
            autoCapitalize="none"/>

          <TouchableOpacity
            style={[styles.button, styles.loginButton, { width: '50%' }]}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        <View style={[styles.linkContainer, { marginTop: 16 }]}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


RegisterScreen.navigationOptions = ({ navigation }) => ({
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

export default RegisterScreen;

const blue = '#182640';
const tan = '#FAE8CD';  

const styles = StyleSheet.create({
  inputField: {
    height: 35,
    borderColor: tan,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: tan,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'SF',
  },
  picker: {
    height: 35,
    borderColor: tan,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: tan,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'SF',
    paddingLeft: 5,
  },
  boop: {
    marginTop: 20, // Decreased marginTop to move Francis Bacon text upward
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: blue,
    paddingTop: 120,
  },

  registerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },

  registerBody: {
    width: '80%',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
    marginTop: 20,
  },

  

  button: {
    width: '40%',
    height: 50,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    color: tan,
    fontWeight: 'bold',
    fontFamily: 'SFBold',
    fontSize: 24,
    marginTop: -1,
    marginBottom: -1,
  },

  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },

  linkText: {
    color: tan,
    fontFamily: 'SF',
  },

  link: {
    color: tan,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'SF',
  },
 
  logoWrapper: {
    width: "50%",
    aspectRatio: 1,
  },
  logo: {
    width: 200,
    height: 300,
    marginTop: 30, // Keep the same marginTop for the logo
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 30, // Keep the same marginTop for the logo
  },

  title: {
    position: 'absolute',
    top: 60, // Increased top value to move the title more downward
    zIndex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },
  welcomeBackTitle: {
    position: 'absolute',
    top: 100, // Adjust this value according to your needs
    zIndex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },
 
  inputContainer: {
    marginTop: 20,
    width: '80%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },

  passwordVisibilityContainer: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
  errorText: {
    color: 'red',
    fontFamily: 'SF',
    marginTop: 10,
  },
  
  headerButton: {
    width: '40%',
    height: 50,
    marginTop: 20,
    borderRadius: 60,
    borderColor: tan,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerButtonText: {
    color: tan,
    fontWeight: 'bold',
    fontFamily: 'SFBold',
    fontSize: 20,
    marginTop: -5,
    marginBottom: -5,
  },
  loginButton: {
    width: '40%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4.5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 150,
  },
  backButton: {
  position: 'absolute',
  top: '50%',
  left: 20,
  width: '120%',
  transform: [{translateY: -50}],
  color: tan,

  },

});