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

        <Picker
          style={[styles.picker, { paddingLeft: 5 }]}
          selectedValue={userType}
          onValueChange={setUserType}
          prompt="I am a..."
          mode="dropdown"
        >
          <Picker.Item label="I am a..." value="" />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Tutor" value="tutor" />
          <Picker.Item label="Administrator" value="administrator" />
        </Picker>

        <TextInput
          style={styles.inputField}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          autoCapitalize="none"/>
        <TextInput
          style={styles.inputField}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          autoCapitalize="none"/>
        <TextInput
          style={styles.inputField}
          onChangeText={setConfirmPassword}
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

