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


const SubjectAddScreen = ({ navigation }) => {




  const [email, setEmail] = useState('');
  
  const [userType, setUserType] = useState('');

  const [pronouns, setPronouns] = useState('');

  const handleNext = () => {
    // Perform registration logic and navigate to the next screen
   navigation.navigate('HomeScreen');
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
          Lastly, you'll just need to add your subjects of interest.
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
        
        <TouchableOpacity onPress={handleNext}
          style={[styles.button, styles.loginButton, { width: '50%' }]}
        >
          <Text style={styles.buttonText}>Finish</Text>
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


SubjectAddScreen.navigationOptions = ({ navigation }) => ({
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

export default SubjectAddScreen;
