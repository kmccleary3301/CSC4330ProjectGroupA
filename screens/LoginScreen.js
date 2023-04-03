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
import styles from '../styles';
import {auth} from '../firebase';
import {useAuthValue} from '../AuthContext';
//import { tailwind } from 'tailwind-rn';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const {setTimeActive} = useAuthValue();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigation.navigate('VerifyEmail')
        })
      .catch(err => alert(err.message))
      }else{
        navigation.navigate('MySplashScreen')
      }
    })
    .catch(err => setError(err.message))
  };


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
        <form onSubmit={login} name='login_form'>
        <TextInput
          style={styles.inputField}
          placeholder='Email'
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputField}
            placeholder='Password'
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
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
        </View></form>
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
