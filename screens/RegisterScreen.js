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
import styles from '../styles.ts';
import {auth, db} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {doc, setDoc} from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error , setError] = useState('');

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const handleRegister = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res.user)
          })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const addProfile = async (name, email) => {
    const user = auth.currentUser;
    try {
      //users in name of doc
      // user?.uid is looking for user id
        await setDoc(doc(db, "users", user?.uid), {
            uid: user.uid, //set uid if its not there
            name,
            email,
        });
    }   catch (err) {
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
          onValueChange={(itemValue) => setUserType(itemValue)}
          prompt="I am a..."
          mode="dropdown"
        >
          <Picker.Item label="I am a..." value="" />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Tutor" value="tutor" />
          <Picker.Item label="Administrator" value="administrator" />
        </Picker>


        <form onSubmit={handleRegister} name='registration_form'>
        <input
          style={styles.inputField}
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          
          autoCapitalize="none"
        />
        <input
          style={styles.inputField}
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          
          autoCapitalize="none"
        />
        <input
          style={styles.inputField}
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirm Password"
          autoCapitalize="none"
        />
       
        <TouchableOpacity
          style={[styles.button, styles.loginButton, { width: '50%' }]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
         </form>
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

