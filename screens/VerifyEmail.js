import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthValue } from '../AuthContext';
import { auth } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
//import styles from '../styles.ts';

const blue = '#182640';
const tan = '#FAE8CD'; 
const lightBlue = '#C9D3FF'; 

const VerifyEmail = () => {
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(60);
  const { timeActive, setTimeActive } = useAuthValue();
  const navigate = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate.navigate('RegisterInfoScreen'); // Navigate the user to the next step of registration once verification has been confirmed
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      }).catch((err) => {
        alert(err.message);
      });
  };

  return (
    <View style={styles.center}>
      <View style={styles.verifyEmail}>
        <Text style={styles.title}>Verify your Email Address</Text>
        <Text style={styles.text}>
          <Text style={styles.strong}>A Verification email has been sent to:</Text>
          {'\n'}
          <Text>{currentUser?.email}</Text>
        </Text>
        <Text style={styles.text}>
          Follow the instruction in the email to verify your account
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={resendEmailVerification}
          disabled={timeActive}
        >
          <Text style={styles.buttonText}>
            Resend Email {timeActive && time}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const externalOptions = {
  headerTransparent: true,
  headerTintColor: 'tan',
  headerTitle: '',
  headerShadowVisible: false,
};

VerifyEmail.navigationOptions = ({ navigation }) => ({
  ...externalOptions,
  // headerLeft: () => (
  //   <TouchableOpacity onPress={() => navigation.goBack()}>
  //     <View style={{ marginLeft: 20, marginTop: 10 }}>
  //       <Image
  //         source={require('../assets/icons/back.png')}
  //         style={{ width: 30, height: 30 }}
  //       />
  //     </View>
  //   </TouchableOpacity>
  // ),
});

export default VerifyEmail;


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue,
  },
  verifyEmail: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: tan,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: tan,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: tan,
  },
  strong: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: tan
  },
  buttonText: {
    color: tan,
    fontSize: 16,
    textAlign: 'center',
  },
});