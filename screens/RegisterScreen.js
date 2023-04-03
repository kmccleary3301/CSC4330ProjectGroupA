import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, Link } from '@react-navigation/native';
import styles from '../styles';

import {useState} from "react";
import {auth, db} from "../firebase";
import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
//import {useAuthValue} from '../AuthContext';
import {doc, setDoc} from "firebase/firestore";

function RegisterScreen() {
  const [name, setName] = useState ('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error , setError] = useState('');
  const navigation = useNavigation();
  //const {setTimeActive} = useAuthValue();

  // function to validate password and confirm password inputs
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

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
        // use firebase to create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                setTimeActive(true)
                navigation.navigate('VerifyEmail')
            })
        }).catch(err => setError(err.message))
        .then (() => {
            updateProfile(auth.currentUser, {displayName: name})
        }).catch(err => alert(err.message))
        .then (() => {
            addProfile(name, email)
        }).catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
};

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


const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Register</Text>
      </View>
      <form onSubmit={register} name='registration_form'>
      <View style={styles.loginBody}>
        <Text style={styles.loginSubtitle}>
          Enter your @lsu.edu email address to verify your account
        </Text>

        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => console.log('Verify email')} // Replace this with your email verification logic
        >
          <Text style={styles.loginButtonText}>Verify</Text>
        </TouchableOpacity>
        </View>
    </form>
    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={styles.loginLink}>
        Already have an account? Login here
        <Link to='LoginScreen'>login</Link>
      </Text>
    </TouchableOpacity>
  </KeyboardAvoidingView>
);
};

RegisterScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Image
          source={require('../assets/icons/back.png')}
          style={{ width: 30, height: 30, tintColor: '#D2B48C' }}
        />
      </View>
    </TouchableOpacity>
  ),
});
}
export default RegisterScreen;
