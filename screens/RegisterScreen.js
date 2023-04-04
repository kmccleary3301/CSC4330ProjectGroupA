
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
//import useTailwind from 'tailwind-rn';
import styles from '../styles.ts';
import useTailwind from 'tailwind-rn/dist/use-tailwind.js';
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = ({ navigation }) => {


  //const tw = useTailwind();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Perform registration logic here
  };

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={[styles.registerTitle, { textAlign: 'center' }]}>Register</Text>
      <View style={styles.registerBody}>
        <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 16 }]}>
          Create a new account
        </Text>
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
          style={[styles.button, { marginTop: 16 }]}
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

export default RegisterScreen;
