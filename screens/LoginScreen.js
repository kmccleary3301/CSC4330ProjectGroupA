import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility.ts';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>LOGO</Text>
      </View>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputField}
            placeholder='Password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize='none'
            secureTextEntry={!passwordVisibility}
          />
          <TouchableOpacity
            onPress={handlePasswordVisibility}
            style={styles.passwordVisibilityContainer}
          >
            <Text style={styles.passwordVisibilityText}>
              {passwordVisibility ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Login pressed')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Forgot your password?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.link}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
