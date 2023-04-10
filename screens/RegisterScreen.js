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
//import { tailwind } from 'tailwind-rn';
//import useTailwind from 'tailwind-rn/dist/use-tailwind.js';


const RegisterScreen = ({ navigation }) => {


  //const tw = useTailwind();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleRegister = () => {
    // Perform registration logic here
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
          onChangeText={setEmail}
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
