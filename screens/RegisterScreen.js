import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Picker} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles.ts';
import { tailwind } from 'tailwind-rn';
import useTailwind from 'tailwind-rn/dist/use-tailwind.js';
import {auth, db} from "../firebase";
import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {


  //const tw = useTailwind();

  const [name, setName] = useState ('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error , setError] = useState('');
  const [userType, setUserType] = useState('');

  const validatePassword = () => {
    let isValid = true
    // check to see if they are not empty
    if (password !== '' && confirmPassword !== ''){
        // check to see if they match
        if (password !== confirmPassword) {
            isValid = false
            setError('Passwords do not match')
        }
    }
    return isValid
}

const addProfile = async (name, email) => {
  const user = auth.currentUser;
  try {
      await setDoc(doc(db, "users", user?.uid), {
          uid: user.uid,
          name,
          email,
      });
  }   catch (err) {
      console.error(err);
      alert(err.message);
  }
};


// const handleRegister = e => {
//   e.preventDefault()
//   setError('')
//   if(validatePassword()) {
//       // use firebase to create user
//       createUserWithEmailAndPassword(auth, email, password)
//       .then(() => {
//           sendEmailVerification(auth.currentUser)
//           .then(() => {
//               //setTimeActive(true)
//               navigation.navigate('VerifyEmail')
//           })
//       }).catch(err => setError(err.message))
//       .then (() => {
//           updateProfile(auth.currentUser, {displayName: name})
//       }).catch(err => alert(err.message))
//       .then (() => {
//           addProfile(name, email)
//       }).catch(err => setError(err.message))
//   }
//   setEmail('')
//   setPassword('')
//   setConfirmPassword('')
// };

const handleRegister = (e) => {
  e.preventDefault();
  setError('');

  if (validatePassword()) {
    // use firebase to create user
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          updateProfile(auth.currentUser, { displayName: name });
          addProfile(name, email);
          navigation.navigate('VerifyEmail');
        });
      })
      .catch((err) => setError(err.message));
  }

  setEmail('');
  setPassword('');
  setConfirmPassword('');
};


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
      <form onSubmit={handleRegister} name='registration_form'>
      <Text style={[styles.title, { textAlign: 'center', marginBottom: 0, paddingBottom: 0 }]}>Register</Text>
      <View style={styles.registerBody}>
        <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 16 }]}>
          Create a new account with your university email.
        </Text>
        <Picker
          style={[styles.picker, { paddingLeft: 5 }]}
          selectedValue={userType}
          onValueChange={(itemValue) => setUserType(itemValue)}
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
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputField}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputField}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
        />
        
        <TouchableOpacity
          style={[styles.button, styles.loginButton, { width: '50%' }]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={[styles.linkContainer, { marginTop: 16 }]}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </form>
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
