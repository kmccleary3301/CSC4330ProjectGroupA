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
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

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

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
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

export default RegisterScreen;
