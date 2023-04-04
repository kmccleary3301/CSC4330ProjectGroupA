import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility.ts';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles.ts';
import { tailwind } from 'tailwind-rn';
import useTailwind from 'tailwind-rn/dist/use-tailwind.js';

const LoginScreen = () => {

  const tw = useTailwind();

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={{ width: 350, height: 250 }}>
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
      <Text style={styles.title}>Log In</Text>
     
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
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.link}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

LoginScreen.navigationOptions = ({ navigation }) => ({
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

export default LoginScreen;
