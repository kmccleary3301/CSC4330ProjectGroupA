import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility.ts';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles.ts';
import { signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthValue } from '../AuthContext';

const LoginScreen = () => {


  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setTimeActive } = useAuthValue();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  // login user then checks if verified, if verified, navigate to home page,
  //   if not, redirect to login page
  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigation.navigate('LoginScreen')
            })
            .catch(err => alert(err.message))
        } else {
          setTimeActive(true)
          navigation.navigate('HomeScreen')
        }
      })
      .catch(err => {
        setError('Email or password is incorrect')
        console.log(err)
      })
  };

  return (
    <form onSubmit={login} name='login_form'>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={{ width: 300, height: 200 }}>
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
            onChange={e => setEmail(e.target.value)}
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputField}
              placeholder='Password'
              value={password}
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
          </View>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
          // onPress={() => navigation.navigate('HomeScreen')}

          >
            <button type='submit'><Text style={styles.buttonText}>Login</Text></button>
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
    </form>
  );
};

LoginScreen.navigationOptions = ({ navigation }) => ({
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


export default LoginScreen;
