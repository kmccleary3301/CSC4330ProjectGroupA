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
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useAuthValue } from '../../AuthContext'

const RegisterInfoScreen = ({ navigation }) => {



  const { currentUser } = useAuthValue();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');

  const profileInfo = e => {
    e.preventDefault();
    addProfileInfo(firstName, lastName, pronouns)
      .then(() => {
        navigation.navigate('SubjectAddScreen')
      });
  }

  const addProfileInfo = async (firstName, lastName, pronouns) => {
    const user = auth.currentUser;
    try {
      await updateDoc(doc(db, "users", user?.uid), {
        firstName,
        lastName,
        pronouns,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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
      <Text style={[styles.title, { textAlign: 'center', marginBottom: 0, paddingBottom: 0 }]}>Register</Text>
      <View style={styles.registerBody}>
        <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 16 }]}>
          We just need a few more things before your account is created.
        </Text>
        <form onSubmit={profileInfo}>
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
            style={[styles.picker, { paddingLeft: 5 }]}
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
          </Picker>

          <TouchableOpacity onPress={profileInfo}
            style={[styles.button, styles.loginButton, { width: '50%' }]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </form>
        <View style={[styles.linkContainer, { marginTop: 16 }]}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


RegisterInfoScreen.navigationOptions = ({ navigation }) => ({
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

export default RegisterInfoScreen;
